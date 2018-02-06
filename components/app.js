import React from 'react'
import ReactDOM from 'react-dom'

import SequentialJsonDataSource from '../data-sources/sequential-json.js'
import extractTweetId from '../utils/extractTweetId.js'

import {tweets} from '../tweets.json'

import Footer from './footer.js'
import TweetEmbed from 'react-tweet-embed'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.previousTweet = this.previousTweet.bind(this)
    this.nextTweet = this.nextTweet.bind(this)
    this.onKeyBoardShortcut = this.onKeyBoardShortcut.bind(this)

    this.dataSource = new SequentialJsonDataSource(tweets,
      {
        storage: window.localStorage,
        circular: true
      }
    )

    this.state = {
      tweetNowAt: this.dataSource.nowAt(),
      totalTweets: this.dataSource.total(),
      tweetId: extractTweetId(this.dataSource.current()),
      tweetBoardOpts: {
        theme: 'dark'
      }
    }
  }
  componentWillMount () {
    document.addEventListener('keydown', this.onKeyBoardShortcut)
  }
  componentWillUnmount () {
    document.removeEventListener('keydown', this.onKeyBoardShortcut)
  }
  previousTweet () {
    this.setState(
      (prevState) => {
        let tweet = this.dataSource.previous()

        if (!tweet) {
          this.dataSource.reset()
          tweet = this.dataSource.current()
        }

        // update state
        return {
          tweetNowAt: this.dataSource.nowAt(),
          tweetId: extractTweetId(tweet)
        }
      }
    )

    window.ga('send', {
      hitType: 'event',
      eventCategory: 'Tweet',
      eventAction: 'previousTweet',
      eventLabel: process.env.MODE === 'production' ? 'production' : 'dev'
    })
  }
  nextTweet () {
    this.setState(
      (prevState) => {
        let tweet = this.dataSource.next()

        if (!tweet) {
          this.dataSource.reset()
          tweet = this.dataSource.current()
        }

        // update state
        return {
          tweetNowAt: this.dataSource.nowAt(),
          tweetId: extractTweetId(tweet)
        }
      }
    )

    window.ga('send', {
      hitType: 'event',
      eventCategory: 'Tweet',
      eventAction: 'nextTweet',
      eventLabel: process.env.MODE === 'production' ? 'production' : 'dev'
    })
  }
  onKeyBoardShortcut (event) {
    switch (event.key) {
      case 'ArrowLeft':
        this.previousTweet()
        break
      case 'ArrowRight':
        this.nextTweet()
        break
      default:
        break
    }
  }
  render () {
    return (
      <div>
        <div className='app'>
          <br />
          <span className='intro'>
              Linux lessons from curated tweets
            </span>
          <br />
          <a onClick={this.previousTweet} href='#'>&lt;==</a>
          &nbsp;
          <a onClick={this.nextTweet} href='#'>==&gt;</a>
          <br />
          <span>({this.state.tweetNowAt}/{this.state.totalTweets})</span>
          <TweetEmbed id={this.state.tweetId} options={this.state.tweetBoardOpts} />
        </div>
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
