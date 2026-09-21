import * as Tone from 'tone'

const synthSettings = {
  volume: 0.8,
  detune: 0,
  portamento: 0.01,
  harmonicity: 0,
  modulation: {
    type: 'sawtooth',
    modulationType: 'sine',
    // partialCount: 0,
    // partials: [],
    phase: 0,
    harmonicity: 0
  },
  modulationEnvelope: {
    attack: 0.01,
    attackCurve: 'exponential',
    decay: 0.9,
    decayCurve: 'exponential',
    sustain: 0.1,
    release: 0.01,
    releaseCurve: 'exponential'
  },
  oscillator: {
    type: 'sawtooth',
    modulationType: 'sine',
    // partialCount: 0,
    // partials: [],
    phase: 0,
    harmonicity: 0
  },
  envelope: {
    attack: 0.01,
    attackCurve: 'exponential',
    decay: 0.9,
    decayCurve: 'exponential',
    sustain: 0.1,
    release: 0.9,
    releaseCurve: 'exponential'
  }
}

function initWebAudio() {
  Tone.start()
}

function initAndStartSynth() {
  const synthNode = new Tone.AMSynth(synthSettings).toDestination()

  // prettier-ignore
  const seq = new Tone.Sequence(
    (time, note) => {
      synthNode.triggerAttackRelease(note, 0.1, time)
    },
    [
      'C4', 'E4', 'G4', 'A4', 'C4', 'E4', 'G4', 'A4',
      ['C4', 'C4'], ['E4', 'E4'], ['G4', 'G4'], ['A4', 'A4'], ['C4', 'C4'], ['E4', 'E4'], ['G4', 'G4'], ['A4', 'A4'],
      ['C4', null, null, null], [null, null, 'E4', null], [null, null, 'G4', null], [null, null, null, null],
      ['C4', 'C4', 'C4', 'C4'], ['E4', 'E4', 'E4', 'E4'], ['G4', 'G4', 'G4', 'G4'], ['A4', 'A4', 'A4', 'A4']
    ]
  ).start(0)

  const transport = Tone.getTransport()
  transport.bpm.value = 60
  transport.start()
}

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton')

  startButton.addEventListener('click', () => {
    initWebAudio()
    initAndStartSynth()
  })
})
