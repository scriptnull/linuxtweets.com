import React from 'react'

export default class Footer extends React.Component {
  constructor (props) {
    super(props)
    this.tips = [
      <span>
        Built with &hearts; from the seats of&nbsp;
        <a className='white-text' target='_blank' href='https://en.wikipedia.org/wiki/Bangalore_Metropolitan_Transport_Corporation'>
        BMTC
        </a>
      </span>,
      <span>Use arrow keys to navigate the lessons</span>,
      <span>Your progress is saved on your browser</span>,
      <span>Next lesson loads automatically on every visit</span>
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
        {this.tips[this.state.tipIndex]}&nbsp;
      </div>
    )
  }
}
