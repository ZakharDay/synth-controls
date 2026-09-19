import { join, dirname } from 'node:path'

const htmlPartialPlugin = {
  name: 'html-partial-plugin',
  setup({ onLoad }) {
    onLoad({ filter: /\.html$/ }, async (args) => {
      const html = await Bun.file(args.path).text()
      const baseDir = dirname(args.path)

      const rewriter = new HTMLRewriter().on('include-partial', {
        async element(el) {
          const srcAttr = el.getAttribute('src')
          if (srcAttr) {
            const partialPath = join(baseDir, srcAttr)

            try {
              const partialHtml = await Bun.file(partialPath).text()
              el.replace(partialHtml, { html: true })
            } catch (err) {
              console.error(`❌ Error reading partial: ${partialPath}`)
            }
          }
        }
      })

      const flattenedHtml = await rewriter.transform(new Response(html)).text()

      return {
        contents: flattenedHtml,
        loader: 'html'
      }
    })
  }
}

await Bun.build({
  entrypoints: ['./src/index.html', './src/elements-react.html'],
  outdir: './dist',
  plugins: [htmlPartialPlugin]
})
