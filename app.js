import React, {Component} from 'react';
import ReactDOM from 'react-dom';

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

class App extends Component {
  render() {
    return (
      <div>
        <Header title="linuxtweets" />
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
