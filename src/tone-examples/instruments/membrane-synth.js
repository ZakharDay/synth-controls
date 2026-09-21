import * as Tone from 'tone'

const synthSettings = {
  volume: 0.8,
  octaves: 8, // https://tonejs.github.io/docs/15.1.22/classes/MembraneSynth.html#octaves
  pitchDecay: 0.01 // https://tonejs.github.io/docs/15.1.22/classes/MembraneSynth.html#pitchDecay
}

function initWebAudio() {
  Tone.start()
}

function initAndStartSynth() {
  const synthNode = new Tone.MembraneSynth(synthSettings).toDestination()

  // prettier-ignore
  const seq = new Tone.Sequence(
    (time, note) => {
      synthNode.triggerAttackRelease(note, 0.1, time)
      // subdivisions are given as subarrays
    },
    [
      'C2', 'C2', 'C2', 'C2', 'C2', 'C2', 'C2', 'C2',
      ['C2', 'C2'], ['C2', 'C2'], ['C2', 'C2'], ['C2', 'C2'], ['C2', 'C2'], ['C2', 'C2'], ['C2', 'C2'], ['C2', 'C2'],
      ['C2', null, null, null], [null, null, 'C2', null], [null, null, 'C2', null], [null, null, null, null],
      ['C2', 'C2', 'C2', 'C2'], ['C2', 'C2', 'C2', 'C2'], ['C2', 'C2', 'C2', 'C2'], ['C2', 'C2', 'C2', 'C2']
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
