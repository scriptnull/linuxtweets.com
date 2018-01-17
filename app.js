import React from 'react';
import ReactDOM from 'react-dom';

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
    return [
      '949911946186260480',
      '947508058250285056',
      '947503039564279808',
      '947501358843772929',
      '947166377466519552',
      '942446681844416513',
      '941907622512410624',
      '941904820713111552',
      '941691338092814336',
      '941672595987894273',
      '941010545301491719',
      '941008941990887424',
      '940943395614101504',
      '940938813039304704',
      '938252505720406016',
      '938259136050954240',
      '937715887259377664',
    ];
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
