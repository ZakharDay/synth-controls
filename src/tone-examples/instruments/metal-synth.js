import * as Tone from 'tone'

const synthSettings = {
  volume: 0.8,
  portamento: 0,
  envelope: {
    attack: 0.01,
    attackCurve: 'exponential',
    decay: 0.3,
    decayCurve: 'exponential',
    sustain: 0.9,
    release: 0.01,
    releaseCurve: 'exponential'
  }
}

function initWebAudio() {
  Tone.start()
}

function initAndStartSynth() {
  const synthNode = new Tone.MetalSynth(synthSettings).toDestination()

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
