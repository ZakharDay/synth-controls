import { join, dirname } from 'node:path'

const PORT = 3000
const SRC_DIR = './src'

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url)
    let filePath = join(SRC_DIR, url.pathname)

    // If the path ends in a slash or is empty, default to index.html
    if (url.pathname === '/' || url.pathname.endsWith('/')) {
      filePath = join(filePath, 'index.html')
    }

    const file = Bun.file(filePath)

    // 1. Handle missing files gracefully
    if (!(await file.exists())) {
      return new Response('404 Not Found', { status: 404 })
    }

    // 2. If it's an HTML file, process the <include-partial> tags dynamically
    if (filePath.endsWith('.html')) {
      const htmlContent = await file.text()
      const currentDir = dirname(filePath)

      const rewriter = new HTMLRewriter().on('include-partial', {
        async element(el) {
          const srcAttr = el.getAttribute('src')
          if (srcAttr) {
            // Resolve path relative to the current HTML file
            const partialPath = join(currentDir, srcAttr)
            try {
              const partialHtml = await Bun.file(partialPath).text()
              el.replace(partialHtml, { html: true })
            } catch (err) {
              console.error(
                `[Dev Server] Failed to load partial: ${partialPath}`
              )
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

    // 3. Fallback: serve regular assets (JS, TS, CSS, images) directly from /src
    // Bun automatically detects and assigns the correct Content-Type header
    return new Response(file)
  }
})

console.log(`🚀 Development server running at http://localhost:${PORT}`)
