import * as Tone from 'tone'

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

const autoFilterSettings = {
  wet: 0.6,
  type: 'sine',
  frequency: 1,
  depth: 1,
  baseFrequency: 200,
  octaves: 2.6,
  filter: {
    type: 'lowpass',
    frequency: 100,
    rolloff: -12,
    Q: 1
  }
}

function initWebAudio() {
  Tone.start()
}

function initAndStartSynth() {
  const synthNode = new Tone.Synth(synthSettings)

  const autoFilterNode = new Tone.AutoFilter(autoFilterSettings)
    .start()
    .toDestination()

  synthNode.connect(autoFilterNode)

  // prettier-ignore
  const seq = new Tone.Sequence(
      (time, note) => {
        synthNode.triggerAttackRelease(note, 0.1, time)
        // subdivisions are given as subarrays
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
