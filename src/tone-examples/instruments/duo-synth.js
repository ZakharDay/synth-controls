import * as Tone from 'tone'

const synthSettings = {
  volume: 0.8,
  detune: 0,
  portamento: 0.2,
  harmonicity: 0.01,
  voice0: {
    volume: 0.8,
    detune: 0,
    portamento: 0.1,
    // filter: {
    //   type: 'lowpass',
    //   frequency: 300,
    //   detune: -300,
    //   gain: 0.8,
    //   rolloff: -48,
    //   sampleTime: 0.01
    // },
    filterEnvelope: {
      baseFrequency: 'C8',
      octaves: 4,
      attack: 0.01,
      attackCurve: 'exponential',
      decay: 0.5,
      decayCurve: 'exponential',
      sustain: 0.6,
      release: 0.4,
      releaseCurve: 'exponential'
    },
    envelope: {
      attack: 0.1,
      attackCurve: 'exponential',
      decay: 0.6,
      decayCurve: 'exponential',
      sustain: 0.6,
      release: 0.4,
      releaseCurve: 'exponential'
    },
    oscillator: {
      type: 'sine',
      modulationType: 'triangle',
      // partialCount: 0,
      // partials: [],
      phase: 0,
      harmonicity: 0.5
    }
  },
  voice1: {
    volume: 0.8,
    detune: 0,
    portamento: 0,
    filter: {
      type: 'lowpass',
      frequency: 300,
      detune: -300,
      gain: 0.8,
      rolloff: -48,
      sampleTime: 0.01
    },
    filterEnvelope: {
      baseFrequency: 'C2',
      octaves: 4,
      attack: 0.2,
      attackCurve: 'exponential',
      decay: 0.4,
      decayCurve: 'exponential',
      sustain: 0.5,
      release: 0.4,
      releaseCurve: 'exponential'
    },
    envelope: {
      attack: 0.2,
      attackCurve: 'exponential',
      decay: 0.4,
      decayCurve: 'exponential',
      sustain: 0.6,
      release: 0.1,
      releaseCurve: 'exponential'
    },
    oscillator: {
      type: 'sawtooth',
      modulationType: 'sine',
      // partialCount: 0,
      // partials: [],
      phase: 0,
      harmonicity: 0.5
    }
  }
}

function initWebAudio() {
  Tone.start()
}

function initAndStartSynth() {
  const synthNode = new Tone.DuoSynth(synthSettings).toDestination()

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
