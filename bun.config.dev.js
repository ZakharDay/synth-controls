import { join, dirname } from 'node:path'

import index from './src/index.html'
import elementsReact from './src/elements-react.html'

import amSynth from './src/synths/am-synth.html'
import toneSynth from './src/synths/tone-synth.html'

import autoFilterEffect from './src/effects/auto-filter-effect.html'
import autoPannerEffect from './src/effects/auto-panner-effect.html'
import autoWahEffect from './src/effects/auto-wah-effect.html'
import bitCrusherEffect from './src/effects/bit-crusher-effect.html'
import chebyshevEffect from './src/effects/chebyshev-effect.html'
import chorusEffect from './src/effects/chorus-effect.html'
import distortionEffect from './src/effects/distortion-effect.html'
import feedbackDelayEffect from './src/effects/feedback-delay-effect.html'
import freeverbEffect from './src/effects/freeverb-effect.html'
import frequencyShifterEffect from './src/effects/frequency-shifter-effect.html'
import jcReverbEffect from './src/effects/jc-reverb-effect.html'
import phaserEffect from './src/effects/phaser-effect.html'
import pingPongDelayEffect from './src/effects/ping-pong-delay-effect.html'
import pitchShifterEffect from './src/effects/pitch-shifter-effect.html'
import reverbEffect from './src/effects/reverb-effect.html'
import stereoWidenerEffect from './src/effects/stereo-widener-effect.html'
import tremoloEffect from './src/effects/tremolo-effect.html'
import vibratoEffect from './src/effects/vibrato-effect.html'

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
    '/synths/am-synth': amSynth,
    '/synths/tone-synth': toneSynth,
    '/effects/auto-filter-effect': autoFilterEffect,
    '/effects/auto-panner-effect': autoPannerEffect,
    '/effects/auto-wah-effect': autoWahEffect,
    '/effects/bit-crusher-effect': bitCrusherEffect,
    '/effects/chebyshev-effect': chebyshevEffect,
    '/effects/chorus-effect': chorusEffect,
    '/effects/distortion-effect': distortionEffect,
    '/effects/feedback-delay-effect': feedbackDelayEffect,
    '/effects/freeverb-effect': freeverbEffect,
    '/effects/frequency-shifter-effect': frequencyShifterEffect,
    '/effects/jc-reverb-effect': jcReverbEffect,
    '/effects/phaser-effect': phaserEffect,
    '/effects/ping-pong-delay-effect': pingPongDelayEffect,
    '/effects/pitch-shifter-effect': pitchShifterEffect,
    '/effects/reverb-effect': reverbEffect,
    '/effects/stereo-widener-effect': stereoWidenerEffect,
    '/effects/tremolo-effect': tremoloEffect,
    '/effects/vibrato-effect': vibratoEffect,

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
