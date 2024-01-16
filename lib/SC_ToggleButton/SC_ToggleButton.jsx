import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

export default class SC_ToggleButton extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { text, isOn, handleClick } = this.props

    const classes = classnames({
      SC_ToggleButton: true,
      active: isOn
    })

    return (
      <div className={classes} onClick={handleClick}>
        {text}
      </div>
    )
  }
}

SC_ToggleButton.propTypes = {
  text: PropTypes.string,
  isOn: PropTypes.bool,
  handleClick: PropTypes.func.isRequired
}
