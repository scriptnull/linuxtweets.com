import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import {tweets} from './tweets.json';
import TweetEmbed from './tweet-embed.js'

class App extends React.Component {
  static getAllTweets() {
    return _.map(
      tweets,
      (tweet) => {
        let urlParts = tweet.url.split('/');
        let id = urlParts[urlParts.length - 1];
        return id;
      }
    );
  }
  constructor(props) {
    super(props);

    this.state = {
      tweetIndex: (parseInt(localStorage.getItem('com.linuxtweets.tweetIndex')) || -1) + 1
    };

    if (this.state.tweetIndex >= tweets.length)
      this.state.tweetIndex = 0

    // save current tweetIndex for incrementing on next load
    localStorage.setItem('com.linuxtweets.tweetIndex', this.state.tweetIndex)
  }
  nextTweet() {
    if (this.state.tweetIndex === tweets.length - 1) return

    this.setState(
      (prevState) => {
        // compute index of next tweet
        const newIndex = prevState.tweetIndex + 1

        // store it in localStorage
        localStorage.setItem('com.linuxtweets.tweetIndex', newIndex)

        // update state
        return {
          tweetIndex: newIndex
        }
      }
    );
  }
  previousTweet() {
    if (this.state.tweetIndex === 0) return

    this.setState(
      (prevState) => {
        // compute index of next tweet
        const newIndex = prevState.tweetIndex - 1

        // store it in localStorage
        localStorage.setItem('com.linuxtweets.tweetIndex', newIndex)

        // update state
        return {
          tweetIndex: newIndex
        }
      }
    )
  }
  render() {
    return (
      <div>
        <br />
          <span className="intro">
            Linux lessons from curated tweets
          </span>
        <br/>
        <a onClick={this.previousTweet.bind(this)} href="#">Previous</a>
        &nbsp;
        <a onClick={this.nextTweet.bind(this)} href="#">Next</a>
        <br />
        <span>({this.state.tweetIndex + 1}/{tweets.length})</span>
        <TweetEmbed id={App.getAllTweets()[this.state.tweetIndex]} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
