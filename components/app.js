import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'underscore'
import {tweets} from '../tweets.json'
import TweetEmbed from './tweet-embed.js'
import SequentialJsonDataSource from '../data-sources/sequential-json.js'

let extractTweetId = (tweet) => {
  let urlParts = tweet.url.split('/')
  let id = urlParts[urlParts.length - 1]
  return id
}

class App extends React.Component {
  static getAllTweets () {
    return _.map(tweets, extractTweetId)
  }
  constructor (props) {
    super(props)

    this.previousTweet = this.previousTweet.bind(this)
    this.nextTweet = this.nextTweet.bind(this)

    this.dataSource = new SequentialJsonDataSource(tweets,
      {
        storage: window.localStorage,
        circular: true
      }
    )

    this.state = {
      tweetNowAt: this.dataSource.nowAt(),
      totalTweets: this.dataSource.total(),
      tweetId: extractTweetId(this.dataSource.current())
    }
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
  }
  render () {
    return (
      <div>
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
        <TweetEmbed id={this.state.tweetId} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
