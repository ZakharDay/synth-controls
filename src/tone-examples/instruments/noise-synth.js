import * as Tone from 'tone'

const synthSettings = {
  volume: 0.8,
  noise: 'brown', // https://tonejs.github.io/docs/15.1.22/classes/Noise.html#type
  envelope: {
    attack: 0.01,
    attackCurve: 'exponential',
    decay: 0.6,
    decayCurve: 'exponential',
    sustain: 0.3,
    release: 0.05,
    releaseCurve: 'exponential'
  }
}

function initWebAudio() {
  Tone.start()
}

function initAndStartSynth() {
  const synthNode = new Tone.NoiseSynth(synthSettings).toDestination()

  // prettier-ignore
  const seq = new Tone.Sequence(
    (time, duration) => {
      synthNode.triggerAttackRelease(duration, time)
      // subdivisions are given as subarrays
    },
    [
      '8n',  '8n',  '8n',  '8n',
      '4n',  '16n', '4n',  '16n',
      '1n',  '1n',  '1n',  '1n',
      '16n', '64n', '16n', '64n'
    ],
    '2n'
  ).start(0)

  const transport = Tone.getTransport()
  transport.bpm.value = 60 // 480 // 800
  transport.start()
}

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton')

  startButton.addEventListener('click', () => {
    initWebAudio()
    initAndStartSynth()
  })
})
