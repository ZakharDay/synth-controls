import * as Tone from 'tone'

let synthNode, pianoKeyboardButtons

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
    release: 1.5,
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
  synthNode.triggerAttackRelease(note, '4n')
}

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton')

  pianoKeyboardButtons = document
    .getElementById('pianoKeyboard')
    .querySelectorAll('.Button')

  startButton.addEventListener('click', () => {
    initWebAudio()
    initAndStartSynth()
  })

  pianoKeyboardButtons.forEach((button) => {
    button.addEventListener('click', () => {
      playNote(button.innerText)
    })
  })
})
