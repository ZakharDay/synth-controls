import * as Tone from 'tone'

let synthNode

const keyToNote = {
  a: 'C4',
  w: 'C#4',
  s: 'D4',
  e: 'D#4',
  d: 'E4',
  f: 'F4',
  t: 'F#4',
  g: 'G4',
  y: 'G#4',
  h: 'A4',
  u: 'A#4',
  j: 'B4',
  k: 'C5',
  o: 'C#5',
  l: 'D5',
  p: 'D#5'
}

const synthSettings = {
  volume: 0.8,
  detune: 0,
  portamento: 0.05,
  envelope: {
    attack: 0.05,
    attackCurve: 'exponential',
    decay: 0.2,
    decayCurve: 'exponential',
    sustain: 0.2,
    release: 0.1,
    releaseCurve: 'exponential'
  },
  oscillator: {
    type: 'triangle',
    modulationType: 'sine',
    // partialCount: 0,
    // partials: [],
    phase: 0,
    harmonicity: 0.5
  }
}

function initWebAudio() {
  Tone.start()
}

function initAndStartSynth() {
  synthNode = new Tone.Synth(synthSettings).toDestination()

  const transport = Tone.getTransport()
  transport.bpm.value = 60
  transport.start()
}

function playNote(note) {
  synthNode.triggerAttackRelease(note, '16n', Tone.now())
}

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton')

  startButton.addEventListener('click', () => {
    initWebAudio()
    initAndStartSynth()
  })

  window.addEventListener('keydown', (e) => {
    // const note = keyToNote[e.key.toLowerCase()]
    const key = e.key.toLowerCase()
    const note = keyToNote[key]
    console.log(key, note)

    if (note) {
      playNote(note)
    }
  })
})
