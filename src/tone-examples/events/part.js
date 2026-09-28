import * as Tone from 'tone'

const synthSettings = {
  volume: 0.8,
  detune: 0,
  portamento: 0,
  envelope: {
    attack: 0.1,
    decay: 1,
    sustain: 0.6,
    release: 0.1
  },
  oscillator: {
    type: 'sawtooth',
    modulationType: 'sine',
    phase: 0,
    harmonicity: 0
  }
}

// Целые ноты
// const sequence = [
//   {
//     time: '0:0:0',
//     noteName: 'C3',
//     duration: '1m',
//     velocity: 1
//   },
//   {
//     time: '1:0:0',
//     noteName: 'G4',
//     duration: '1m',
//     velocity: 1
//   }
// ]

// Четвертные ноты играются в четвертные интервалы
// const sequence = [
//   {
//     time: '0:0:0',
//     noteName: 'C3',
//     duration: '4n',
//     velocity: 1
//   },
//   {
//     time: '0:1:0',
//     noteName: 'E3',
//     duration: '4n',
//     velocity: 1
//   },
//   {
//     time: '0:2:0',
//     noteName: 'G3',
//     duration: '4n',
//     velocity: 1
//   },
//   {
//     time: '0:3:0',
//     noteName: 'B4',
//     duration: '4n',
//     velocity: 1
//   },
//   {
//     time: '1:0:0',
//     noteName: 'G4',
//     duration: '4n',
//     velocity: 1
//   },
//   {
//     time: '1:1:0',
//     noteName: 'E4',
//     duration: '4n',
//     velocity: 1
//   },
//   {
//     time: '1:2:0',
//     noteName: 'C4',
//     duration: '4n',
//     velocity: 1
//   },
//   {
//     time: '1:3:0',
//     noteName: 'E4',
//     duration: '4n',
//     velocity: 1
//   }
// ]

// Шестнадцатые ноты
const sequence = [
  {
    time: '0:0:0',
    noteName: 'C3',
    duration: '4n',
    velocity: 1
  },
  {
    time: '0:0:1',
    noteName: 'E3',
    duration: '4n',
    velocity: 1
  },
  {
    time: '0:0:2',
    noteName: 'G3',
    duration: '4n',
    velocity: 1
  },
  {
    time: '0:0:3',
    noteName: 'B4',
    duration: '4n',
    velocity: 1
  },
  {
    time: '0:1:0',
    noteName: 'G4',
    duration: '4n',
    velocity: 1
  },
  {
    time: '0:1:1',
    noteName: 'E4',
    duration: '4n',
    velocity: 1
  },
  {
    time: '0:1:2',
    noteName: 'C4',
    duration: '4n',
    velocity: 1
  },
  {
    time: '0:1:3',
    noteName: 'E4',
    duration: '4n',
    velocity: 1
  },
  {
    time: '0:2:0',
    noteName: 'C3',
    duration: '4n',
    velocity: 1
  },
  {
    time: '0:2:1',
    noteName: 'E3',
    duration: '4n',
    velocity: 1
  },
  {
    time: '0:2:2',
    noteName: 'G3',
    duration: '4n',
    velocity: 1
  },
  {
    time: '0:2:3',
    noteName: 'B4',
    duration: '4n',
    velocity: 1
  },
  {
    time: '0:3:0',
    noteName: 'G4',
    duration: '4n',
    velocity: 1
  },
  {
    time: '0:3:1',
    noteName: 'E4',
    duration: '4n',
    velocity: 1
  },
  {
    time: '0:3:2',
    noteName: 'C4',
    duration: '4n',
    velocity: 1
  },
  {
    time: '0:3:3',
    noteName: 'E4',
    duration: '4n',
    velocity: 1
  },
  //
  {
    time: '1:0:0',
    noteName: 'C3',
    duration: '4n',
    velocity: 1
  },
  {
    time: '1:0:1',
    noteName: 'E3',
    duration: '4n',
    velocity: 1
  },
  {
    time: '1:0:2',
    noteName: 'G3',
    duration: '4n',
    velocity: 1
  },
  {
    time: '1:0:3',
    noteName: 'B4',
    duration: '4n',
    velocity: 1
  },
  {
    time: '1:1:0',
    noteName: 'G4',
    duration: '4n',
    velocity: 1
  },
  {
    time: '1:1:1',
    noteName: 'E4',
    duration: '4n',
    velocity: 1
  },
  {
    time: '1:1:2',
    noteName: 'C4',
    duration: '4n',
    velocity: 1
  },
  {
    time: '1:1:3',
    noteName: 'E4',
    duration: '4n',
    velocity: 1
  },
  {
    time: '1:2:0',
    noteName: 'C3',
    duration: '4n',
    velocity: 1
  },
  {
    time: '1:2:1',
    noteName: 'E3',
    duration: '4n',
    velocity: 1
  },
  {
    time: '1:2:2',
    noteName: 'G3',
    duration: '4n',
    velocity: 1
  },
  {
    time: '1:2:3',
    noteName: 'B4',
    duration: '4n',
    velocity: 1
  },
  {
    time: '1:3:0',
    noteName: 'G4',
    duration: '4n',
    velocity: 1
  },
  {
    time: '1:3:1',
    noteName: 'E4',
    duration: '4n',
    velocity: 1
  },
  {
    time: '1:3:2',
    noteName: 'C4',
    duration: '4n',
    velocity: 1
  },
  {
    time: '1:3:3',
    noteName: 'E4',
    duration: '4n',
    velocity: 1
  }
]

// Тестовая мелодия
// const sequence = [
//   {
//     time: '0:0:0',
//     noteName: 'C3',
//     duration: '4n',
//     velocity: 1
//   },
//   {
//     time: '0:0:2',
//     noteName: 'A3',
//     duration: '1n',
//     velocity: 1
//   },
//   {
//     time: '0:1:0',
//     noteName: 'E3',
//     duration: '4n',
//     velocity: 1
//   },
//   {
//     time: '0:2:0',
//     noteName: 'G3',
//     duration: '4n',
//     velocity: 1
//   },
//   {
//     time: '0:3:0',
//     noteName: 'C3',
//     duration: '4n',
//     velocity: 1
//   },
//   {
//     time: '0:3:1',
//     noteName: 'E3',
//     duration: '4n',
//     velocity: 1
//   },
//   {
//     time: '0:3:2',
//     noteName: 'G3',
//     duration: '4n',
//     velocity: 1
//   },
//   {
//     time: '1:0:0',
//     noteName: 'D3',
//     duration: '4n',
//     velocity: 1
//   },
//   {
//     time: '1:1:0',
//     noteName: 'G3',
//     duration: '4n',
//     velocity: 1
//   },
//   {
//     time: '1:1:2',
//     noteName: 'E4',
//     duration: '4n',
//     velocity: 0.7
//   },
//   {
//     time: '1:1:3',
//     noteName: 'D4',
//     duration: '4n',
//     velocity: 0.8
//   },
//   {
//     time: '1:2:0',
//     noteName: 'C3',
//     duration: '4n',
//     velocity: 1
//   },
//   {
//     time: '1:3:0',
//     noteName: 'G3',
//     duration: '4n',
//     velocity: 1
//   },
//   {
//     time: '1:3:2',
//     noteName: 'C4',
//     duration: '4n',
//     velocity: 1
//   }
// ]

function initWebAudio() {
  Tone.start()
}

function initAndStartSynth() {
  const synthNode = new Tone.Synth(synthSettings).toDestination()

  // Создаём партию, добавляем в неё ноты
  const part = new Tone.Part((time, note) => {
    synthNode.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  }, sequence).start(0)

  // Указываем длительность партии
  part.loopEnd = '2m'

  // Включаем зацикливание
  part.loop = true

  const transport = Tone.getTransport()
  transport.bpm.value = 120
  transport.start()
}

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton')

  startButton.addEventListener('click', () => {
    initWebAudio()
    initAndStartSynth()
  })
})
