import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import {tweets} from './tweets.json';

const TwitterOEmbedEndpoint = 'https://publish.twitter.com/oembed';

function Header(props) {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
}

function Footer(props) {
  return (
    <footer>
      Built with &lt;3 by <a href="https://github.com/scriptnull">@scriptnull</a>
    </footer>
  )
}

class TweetBoard extends React.Component {
  componentDidMount() {
    this.createTweet(this.props.tweet);
  }
  componentWillUpdate(nextProps, nextState) {
    this.createTweet(nextProps.tweet);
  }
  createTweet(id) {
    this.tweetDiv.innerHTML = '';
    if (window.twttr) {
      window.twttr.widgets.createTweet(id, this.tweetDiv, { theme: 'dark'});
    }
  }
  render() {
    return <div ref={(tweetDiv) => { this.tweetDiv = tweetDiv }}></div>;
  }
}

class App extends React.Component {
  static getAllTweets() {
    return _.map(
      _.shuffle(tweets),
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
      tweetIndex: 0
    };
  }
  nextTweet() {
    this.setState(
      (prevState) => {
        return {
          tweetIndex: prevState.tweetIndex + 1
        }
      }
    );
  }
  render() {
    return (
      <div>
        <Header title="linuxtweets" />
        <TweetBoard tweet={App.getAllTweets()[this.state.tweetIndex]} />
        <button onClick={this.nextTweet.bind(this)}>Next Tweet</button>
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
