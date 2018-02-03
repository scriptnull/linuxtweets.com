import React from 'react'

export default class Footer extends React.Component {
  constructor (props) {
    super(props)
    this.tips = [
      {
        message: <span>Built with &hearts; from the seats of BMTC</span>
      },
      {
        message: <span>Use arrow keys to navigate</span>
      }
    ]

    this.state = {
      tipIndex: 0
    }

    this.nextTip = this.nextTip.bind(this)
  }
  nextTip () {
    this.setState((prevState) => {
      let newIndex = (prevState.tipIndex + 1) % this.tips.length

      return {
        tipIndex: newIndex
      }
    })
  }
  componentDidMount () {
    this.interval = setInterval(() => this.nextTip(), 4000)
  }
  componentWillUnmount () {
    clearInterval(this.interval)
  }
  render () {
    return (
      <div className='footer'>
        {this.tips[this.state.tipIndex] && this.tips[this.state.tipIndex].message}
      </div>
    )
  }
}
