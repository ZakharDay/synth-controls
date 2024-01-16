import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import SC_ToggleButton from '../SC_ToggleButton/SC_ToggleButton.jsx'

export default class SC_SequencerRow extends PureComponent {
  constructor(props) {
    super(props)
  }

  checkToggleState = (option, events) => {
    const { name } = this.props
    let toggleState = false

    events.forEach((event, i) => {
      if (event.time === option && event.noteName === name) {
        toggleState = true
      }
    })

    return toggleState
  }

  handleChange = (value) => {
    const { property, handleChange } = this.props
    handleChange(property, value)
  }

  render() {
    const { name, options, value } = this.props
    const buttonElements = []

    options.forEach((option, i) => {
      buttonElements.push(
        <SC_ToggleButton
          text={name}
          isOn={this.checkToggleState(option, value)}
          handleClick={() => this.handleChange(option)}
          key={i}
        />
      )
    })

    return <div className="SC_SequencerRow">{buttonElements}</div>
  }
}

SC_SequencerRow.propTypes = {
  name: PropTypes.string.isRequired,
  property: PropTypes.array.isRequired,
  // value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
}
