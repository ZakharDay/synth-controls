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
    type: 'sawtooth',
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
  const synthNode = new Tone.PolySynth(synthSettings).toDestination()

  const part = new Tone.Part(
    (time, value) => {
      synthNode.triggerAttackRelease(value.notes, '4n', time)
    },
    [
      { time: '0:0', notes: ['C4', 'E4', 'G4'] },
      { time: '0:1', notes: ['A3', 'C4', 'E4'] },
      { time: '0:3', notes: ['F3', 'A3', 'C4'] }
    ]
  )

  part.loop = true
  part.loopEnd = '1:0'
  part.start(0)

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
