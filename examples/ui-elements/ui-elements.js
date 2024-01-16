import '../../utilities/vars.css'
import '../../utilities/basics.css'
import '../../utilities/fonts.css'

import './ui-elements.css'

import '../../lib/SC_ToggleButton/SC_ToggleButton.css'
import '../../lib/SC_Button/SC_Button.css'
import '../../lib/SC_ButtonSet/SC_ButtonSet.css'
import '../../lib/SC_Knob/SC_Knob.css'
import '../../lib/SC_Sequencer/SC_Sequencer.css'
import '../../lib/SC_Slider/SC_Slider.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import SC_ToggleButton from '../../lib/SC_ToggleButton/SC_ToggleButton.jsx'
import SC_Button from '../../lib/SC_Button/SC_Button.jsx'
import SC_ButtonSet from '../../lib/SC_ButtonSet/SC_ButtonSet.jsx'
import SC_Knob from '../../lib/SC_Knob/SC_Knob.jsx'
import SC_Slider from '../../lib/SC_Slider/SC_Slider.jsx'
import SC_Sequencer from '../../lib/SC_Sequencer/SC_Sequencer.jsx'

document.addEventListener('DOMContentLoaded', () => {
  // prettier-ignore
  const SC_ToggleButtonContainer = document.getElementById('SC_ToggleButtonContainer')
  const SC_ButtonContainer = document.getElementById('SC_ButtonContainer')
  const SC_ButtonSetContainer = document.getElementById('SC_ButtonSetContainer')
  const SC_KnobContainer = document.getElementById('SC_KnobContainer')
  const SC_SliderContainer = document.getElementById('SC_SliderContainer')
  const SC_SequencerContainer = document.getElementById('SC_SequencerContainer')

  const SC_ToggleButtonRoot = createRoot(SC_ToggleButtonContainer)
  const SC_ButtonRoot = createRoot(SC_ButtonContainer)
  const SC_ButtonSetRoot = createRoot(SC_ButtonSetContainer)
  const SC_KnobRoot = createRoot(SC_KnobContainer)
  const SC_SliderRoot = createRoot(SC_SliderContainer)
  const SC_SequencerRoot = createRoot(SC_SequencerContainer)

  SC_ToggleButtonRoot.render(
    <div className="wrapper">
      <SC_ToggleButton
        text="Toggle"
        isOn={false}
        handleClick={() => console.log('Click')}
      />

      <SC_ToggleButton
        text="Toggle"
        isOn={true}
        handleClick={() => console.log('Click')}
      />
    </div>
  )

  SC_ButtonRoot.render(
    <div className="wrapper">
      <SC_Button text="Button" handleClick={() => console.log('Click')} />
    </div>
  )

  SC_ButtonSetRoot.render(
    <SC_ButtonSet
      name="Button Set"
      property="none"
      value="none"
      options={['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']}
      handleClick={() => console.log('Click')}
    />
  )

  SC_KnobRoot.render(
    <SC_Knob
      name="Knob"
      property="none"
      min={-10}
      max={10}
      value={0}
      handleChange={() => console.log('Click')}
    />
  )

  SC_SliderRoot.render(
    <SC_Slider
      name="Slider"
      min={0}
      max={100}
      step={1}
      property="none"
      value="none"
      handleChange={() => console.log('Click')}
    />
  )

  const notes = ['A1', 'B1', 'C1']

  // prettier-ignore
  const steps = [
    '0:0:0', '0:0:2', '0:1:0', '0:1:2',
    '0:2:0', '0:2:2', '0:3:0', '0:3:2',
    '1:0:0', '1:0:2', '1:1:0', '1:1:2',
    '1:2:0', '1:2:2', '1:3:0', '1:3:2'
  ]

  const sequence = {
    A1: ['0:0:0', '0:1:0', '0:2:0', '0:3:0', '1:0:0', '1:1:0', '1:2:0', '1:3:0']
  }

  SC_SequencerRoot.render(
    <SC_Sequencer
      notes={notes}
      steps={steps}
      sequence={sequence}
      handleClick={() => {
        console.log('Click')
      }}
    />
  )
})
