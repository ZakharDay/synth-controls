import { join, dirname } from 'node:path'

import index from './src/index.html'
import elementsReact from './src/elements-react.html'

const PORT = 3000
const SRC_DIR = './src'

async function processHtmlFile(filePath) {
  const file = Bun.file(filePath)

  if (!(await file.exists())) {
    return new Response('404 Not Found', { status: 404 })
  }

  const htmlContent = await file.text()
  const currentDir = dirname(filePath)

  const rewriter = new HTMLRewriter().on('include-partial', {
    async element(el) {
      const srcAttr = el.getAttribute('src')
      if (srcAttr) {
        const partialPath = join(currentDir, srcAttr)
        try {
          const partialHtml = await Bun.file(partialPath).text()
          el.replace(partialHtml, { html: true })
        } catch (err) {
          console.error(`[Dev Server] Failed to load partial: ${partialPath}`)
          el.replace(`<!-- Error loading partial: ${srcAttr} -->`, {
            html: true
          })
        }
      }
    }
  })

  const transformedHtml = await rewriter
    .transform(new Response(htmlContent))
    .text()

  return new Response(transformedHtml, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  })
}

Bun.serve({
  port: PORT,
  routes: {
    '/': index,
    '/elements-html': () =>
      processHtmlFile(join(SRC_DIR, 'elements-html.html')),
    '/elements-react': elementsReact,

    // // Одиночные сегменты (/about -> src/about.html)
    // '/:page': (req) => {
    //   const pageName = req.params.page
    //   return processHtmlFile(join(SRC_DIR, `${pageName}.html`))
    // },

    // Вложенные пути и статические ассеты (js, css, картинки)
    '/*': async (req) => {
      const url = new URL(req.url)

      const potentialHtmlPath = join(SRC_DIR, `${url.pathname}.html`)
      if (await Bun.file(potentialHtmlPath).exists()) {
        return processHtmlFile(potentialHtmlPath)
      }

      const assetPath = join(SRC_DIR, url.pathname)
      const assetFile = Bun.file(assetPath)

      if (await assetFile.exists()) {
        return new Response(assetFile)
      }

      return new Response('404 Not Found', { status: 404 })
    }
  }
})

console.log(`🚀 Development server running at http://localhost:${PORT}`)
