import { join, dirname } from 'node:path'
import { BunPlugin } from 'bun'

const htmlPartialPlugin = {
  name: 'html-partial-plugin',
  setup({ onLoad }) {
    onLoad({ filter: /\.html$/ }, async (args) => {
      let html = await Bun.file(args.path).text()
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

      // const header = await Bun.file(
      //   './src/components/Button/Button.html'
      // ).text()

      // html = html.replace('<!-- include: header -->', header)

      // return {
      //   contents: html,
      //   loader: 'html'
      // }

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

// // bun.config.prod.js
// import { join, dirname } from 'node:path'
// import { unlink } from 'node:fs/promises'

// const originalEntry = './src/index.html'
// const tempEntry = './src/__temp_index.html' // Safe temp file in the same directory

// // 1. Read the original HTML file
// let htmlContent = await Bun.file(originalEntry).text()
// const baseDir = dirname(originalEntry)

// // 2. Process all <include-partial> tags ahead of time
// const rewriter = new HTMLRewriter().on('include-partial', {
//   async element(el) {
//     const srcAttr = el.getAttribute('src')
//     if (srcAttr) {
//       const partialPath = join(baseDir, srcAttr)
//       try {
//         const partialHtml = await Bun.file(partialPath).text()
//         el.replace(partialHtml, { html: true })
//       } catch (err) {
//         console.error(`❌ Error reading partial: ${partialPath}`)
//       }
//     }
//   }
// })

// const flattenedHtml = await rewriter.transform(new Response(htmlContent)).text()

// // 3. Write the flat HTML to a temporary file next to the original asset files
// await Bun.write(tempEntry, flattenedHtml)

// try {
//   // 4. Run the standard Bun build pointing to the temporary entry point
//   await Bun.build({
//     entrypoints: [tempEntry],
//     outdir: './dist',
//     minify: true,
//     target: 'browser',
//     naming: '[name].[ext]' // Ensures the output file name matches your template
//   })

//   // 5. Rename the compiled asset back to index.html in the dist directory
//   const distTempFile = Bun.file('./dist/__temp_index.html')
//   if (await distTempFile.exists()) {
//     await Bun.write('./dist/index.html', distTempFile)
//     await unlink('./dist/__temp_index.html')
//   }

//   console.log(
//     '✨ Production build completed successfully! No partial tags remain.'
//   )
// } catch (error) {
//   console.error('❌ Build failed:', error)
// } finally {
//   // 6. Clean up the source temporary file no matter what happens
//   const tempFile = Bun.file(tempEntry)
//   if (await tempFile.exists()) {
//     await unlink(tempEntry)
//   }
// }
