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
  entrypoints: [
    './src/index.html',
    './src/elements-html.html',
    './src/elements-react.html',
    './src/tone-examples/instruments/am-synth.html',
    './src/tone-examples/instruments/duo-synth.html',
    './src/tone-examples/instruments/fm-synth.html',
    './src/tone-examples/instruments/membrane-synth.html',
    './src/tone-examples/instruments/metal-synth.html',
    './src/tone-examples/instruments/mono-synth.html',
    './src/tone-examples/instruments/noise-synth.html',
    './src/tone-examples/instruments/pluck-synth.html',
    './src/tone-examples/instruments/poly-synth.html',
    './src/tone-examples/instruments/sampler.html',
    './src/tone-examples/instruments/tone-synth.html',
    './src/tone-examples/effects/auto-filter-effect.html',
    './src/tone-examples/effects/auto-panner-effect.html',
    './src/tone-examples/effects/auto-wah-effect.html',
    './src/tone-examples/effects/bit-crusher-effect.html',
    './src/tone-examples/effects/chebyshev-effect.html',
    './src/tone-examples/effects/chorus-effect.html',
    './src/tone-examples/effects/distortion-effect.html',
    './src/tone-examples/effects/feedback-delay-effect.html',
    './src/tone-examples/effects/freeverb-effect.html',
    './src/tone-examples/effects/frequency-shifter-effect.html',
    './src/tone-examples/effects/jc-reverb-effect.html',
    './src/tone-examples/effects/phaser-effect.html',
    './src/tone-examples/effects/ping-pong-delay-effect.html',
    './src/tone-examples/effects/pitch-shifter-effect.html',
    './src/tone-examples/effects/reverb-effect.html',
    './src/tone-examples/effects/stereo-widener-effect.html',
    './src/tone-examples/effects/tremolo-effect.html',
    './src/tone-examples/effects/vibrato-effect.html',
    './src/tone-examples/components/channel.html',
    './src/tone-examples/sound-design/effects-chaining.html',
    './src/tone-examples/events/loop.html',
    './src/tone-examples/events/pattern.html',
    './src/tone-examples/events/sequence.html',
    './src/tone-examples/user-interfaces/button.html',
    './src/tone-examples/user-interfaces/toggle-button.html',
    './src/tone-examples/user-interfaces/toggle-button-set.html',
    './src/tone-examples/user-interfaces/slider.html',
    './src/tone-examples/user-interfaces/piano-keyboard.html',
    './src/tone-examples/user-interfaces/computer-keyboard.html'
  ],
  outdir: './dist',
  root: './src',
  plugins: [htmlPartialPlugin]
})
