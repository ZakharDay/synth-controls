import * as Tone from 'tone'

function initWebAudio() {
  Tone.start()
}

function initAndStartSynth() {
  const sampler = new Tone.Sampler({
    urls: {
      C2: 'C2.mp3',
      D2: 'D2.mp3',
      E2: 'E2.mp3',
      F2: 'F2.mp3',
      G2: 'G2.mp3'
    },
    baseUrl: 'https://tonejs.github.io/audio/casio/',
    onload: () => {
      // sampler.triggerAttackRelease(['C1', 'E1', 'G1', 'B1'], 0.5)
    }
  }).toDestination()

  // prettier-ignore
  Tone.loaded().then(() => {
    const seq = new Tone.Sequence(
      (time, note) => {
        sampler.triggerAttackRelease(note, 0.1, time)
      },
      [
        'C2', 'D2', 'E2', 'F2', 'G2',
      ]
    ).start(0)
  })

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
