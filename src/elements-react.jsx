import React from 'react'
import { createRoot } from 'react-dom/client'

import Button from './components/Button/Button.jsx'
import ToggleButton from './components/ToggleButton/ToggleButton.jsx'
import ToggleButtonSet from './components/ToggleButtonSet/ToggleButtonSet.jsx'
import Knob from './components/Knob/Knob.jsx'
import Slider from './components/Slider/Slider.jsx'
// import Sequencer from './components/Sequencer/Sequencer.jsx'

function initButton() {
  const ButtonContainer = document.getElementById('ButtonContainer')
  const ButtonRoot = createRoot(ButtonContainer)

  ButtonRoot.render(
    <div className="wrapper">
      <Button text="Button" handleClick={() => console.log('Click')} />
    </div>
  )
}

function initToggleButton() {
  const ToggleButtonContainer = document.getElementById('ToggleButtonContainer')
  const ToggleButtonRoot = createRoot(ToggleButtonContainer)

  ToggleButtonRoot.render(
    <div className="wrapper">
      <ToggleButton
        text="Toggle"
        active={false}
        handleClick={() => console.log('Click')}
      />
    </div>
  )
}

function initToggleButtonSet() {
  const ToggleButtonSetContainer = document.getElementById(
    'ToggleButtonSetContainer'
  )

  const ToggleButtonSetRoot = createRoot(ToggleButtonSetContainer)

  ToggleButtonSetRoot.render(
    <ToggleButtonSet
      name="Toggle Button Set"
      property="none"
      value="none"
      options={['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']}
      handleClick={() => console.log('Click')}
    />
  )
}

function initKnob() {
  const KnobContainer = document.getElementById('KnobContainer')
  const KnobRoot = createRoot(KnobContainer)

  KnobRoot.render(
    <Knob
      name="Knob"
      property="none"
      min={-10}
      max={10}
      value={0}
      handleChange={() => console.log('Click')}
    />
  )
}

function initSlider() {
  const SliderContainer = document.getElementById('SliderContainer')
  const SliderRoot = createRoot(SliderContainer)

  SliderRoot.render(
    <Slider
      name="Slider"
      min={0}
      max={100}
      step={1}
      property="none"
      value="none"
      handleChange={() => console.log('Click')}
    />
  )
}

document.addEventListener('DOMContentLoaded', () => {
  initButton()
  initToggleButton()
  initToggleButtonSet()
  initKnob()
  initSlider()

  // const SequencerContainer = document.getElementById('SequencerContainer')
  // const SequencerRoot = createRoot(SequencerContainer)

  // const notes = ['A1', 'B1', 'C1']

  // // prettier-ignore
  // const steps = [
  //   '0:0:0', '0:0:2', '0:1:0', '0:1:2',
  //   '0:2:0', '0:2:2', '0:3:0', '0:3:2',
  //   '1:0:0', '1:0:2', '1:1:0', '1:1:2',
  //   '1:2:0', '1:2:2', '1:3:0', '1:3:2'
  // ]

  // const sequence = {
  //   A1: ['0:0:0', '0:1:0', '0:2:0', '0:3:0', '1:0:0', '1:1:0', '1:2:0', '1:3:0']
  // }

  // SequencerRoot.render(
  //   <Sequencer
  //     notes={notes}
  //     steps={steps}
  //     sequence={sequence}
  //     handleClick={() => {
  //       console.log('Click')
  //     }}
  //   />
  // )
})
