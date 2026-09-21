import { join, dirname } from 'node:path'

import index from './src/index.html'
import elementsReact from './src/elements-react.html'

import amSynth from './src/tone-examples/instruments/am-synth.html'
import duoSynth from './src/tone-examples/instruments/duo-synth.html'
import fmSynth from './src/tone-examples/instruments/fm-synth.html'
import membraneSynth from './src/tone-examples/instruments/membrane-synth.html'
import metalSynth from './src/tone-examples/instruments/metal-synth.html'
import monoSynth from './src/tone-examples/instruments/mono-synth.html'
import noiseSynth from './src/tone-examples/instruments/noise-synth.html'
import pluckSynth from './src/tone-examples/instruments/pluck-synth.html'
import polySynth from './src/tone-examples/instruments/poly-synth.html'
import sampler from './src/tone-examples/instruments/sampler.html'
import toneSynth from './src/tone-examples/instruments/tone-synth.html'

import autoFilterEffect from './src/tone-examples/effects/auto-filter-effect.html'
import autoPannerEffect from './src/tone-examples/effects/auto-panner-effect.html'
import autoWahEffect from './src/tone-examples/effects/auto-wah-effect.html'
import bitCrusherEffect from './src/tone-examples/effects/bit-crusher-effect.html'
import chebyshevEffect from './src/tone-examples/effects/chebyshev-effect.html'
import chorusEffect from './src/tone-examples/effects/chorus-effect.html'
import distortionEffect from './src/tone-examples/effects/distortion-effect.html'
import feedbackDelayEffect from './src/tone-examples/effects/feedback-delay-effect.html'
import freeverbEffect from './src/tone-examples/effects/freeverb-effect.html'
import frequencyShifterEffect from './src/tone-examples/effects/frequency-shifter-effect.html'
import jcReverbEffect from './src/tone-examples/effects/jc-reverb-effect.html'
import phaserEffect from './src/tone-examples/effects/phaser-effect.html'
import pingPongDelayEffect from './src/tone-examples/effects/ping-pong-delay-effect.html'
import pitchShifterEffect from './src/tone-examples/effects/pitch-shifter-effect.html'
import reverbEffect from './src/tone-examples/effects/reverb-effect.html'
import stereoWidenerEffect from './src/tone-examples/effects/stereo-widener-effect.html'
import tremoloEffect from './src/tone-examples/effects/tremolo-effect.html'
import vibratoEffect from './src/tone-examples/effects/vibrato-effect.html'

import channel from './src/tone-examples/components/channel.html'

import effectsChaining from './src/tone-examples/sound-design/effects-chaining.html'

import loop from './src/tone-examples/events/loop.html'
import pattern from './src/tone-examples/events/pattern.html'
import sequence from './src/tone-examples/events/sequence.html'

import button from './src/tone-examples/user-interfaces/button.html'
import toggleButton from './src/tone-examples/user-interfaces/toggle-button.html'
import toggleButtonSet from './src/tone-examples/user-interfaces/toggle-button-set.html'
import slider from './src/tone-examples/user-interfaces/slider.html'
import pianoKeyboard from './src/tone-examples/user-interfaces/piano-keyboard.html'
import computerKeyboard from './src/tone-examples/user-interfaces/computer-keyboard.html'

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
    '/elements-html.html': () =>
      processHtmlFile(join(SRC_DIR, 'elements-html.html')),
    '/elements-react.html': elementsReact,
    '/tone-examples/instruments/am-synth.html': amSynth,
    '/tone-examples/instruments/duo-synth.html': duoSynth,
    '/tone-examples/instruments/fm-synth.html': fmSynth,
    '/tone-examples/instruments/membrane-synth.html': membraneSynth,
    '/tone-examples/instruments/metal-synth.html': metalSynth,
    '/tone-examples/instruments/mono-synth.html': monoSynth,
    '/tone-examples/instruments/noise-synth.html': noiseSynth,
    '/tone-examples/instruments/pluck-synth.html': pluckSynth,
    '/tone-examples/instruments/poly-synth.html': polySynth,
    '/tone-examples/instruments/sampler.html': sampler,
    '/tone-examples/instruments/tone-synth.html': toneSynth,
    '/tone-examples/effects/auto-filter-effect.html': autoFilterEffect,
    '/tone-examples/effects/auto-panner-effect.html': autoPannerEffect,
    '/tone-examples/effects/auto-wah-effect.html': autoWahEffect,
    '/tone-examples/effects/bit-crusher-effect.html': bitCrusherEffect,
    '/tone-examples/effects/chebyshev-effect.html': chebyshevEffect,
    '/tone-examples/effects/chorus-effect.html': chorusEffect,
    '/tone-examples/effects/distortion-effect.html': distortionEffect,
    '/tone-examples/effects/feedback-delay-effect.html': feedbackDelayEffect,
    '/tone-examples/effects/freeverb-effect.html': freeverbEffect,
    '/tone-examples/effects/frequency-shifter-effect.html':
      frequencyShifterEffect,
    '/tone-examples/effects/jc-reverb-effect.html': jcReverbEffect,
    '/tone-examples/effects/phaser-effect.html': phaserEffect,
    '/tone-examples/effects/ping-pong-delay-effect.html': pingPongDelayEffect,
    '/tone-examples/effects/pitch-shifter-effect.html': pitchShifterEffect,
    '/tone-examples/effects/reverb-effect.html': reverbEffect,
    '/tone-examples/effects/stereo-widener-effect.html': stereoWidenerEffect,
    '/tone-examples/effects/tremolo-effect.html': tremoloEffect,
    '/tone-examples/effects/vibrato-effect.html': vibratoEffect,
    '/tone-examples/components/channel.html': channel,
    '/tone-examples/sound-design/effects-chaining.html': effectsChaining,
    '/tone-examples/events/loop.html': loop,
    '/tone-examples/events/pattern.html': pattern,
    '/tone-examples/events/sequence.html': sequence,
    '/tone-examples/user-interfaces/button.html': button,
    '/tone-examples/user-interfaces/toggle-button.html': toggleButton,
    '/tone-examples/user-interfaces/toggle-button-set.html': toggleButtonSet,
    '/tone-examples/user-interfaces/slider.html': slider,
    '/tone-examples/user-interfaces/piano-keyboard.html': pianoKeyboard,
    '/tone-examples/user-interfaces/computer-keyboard.html': computerKeyboard,

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
