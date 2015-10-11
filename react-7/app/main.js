import 'fetch';

import React from 'react';
import ReactDOM from 'react-dom';

import RepoList from './repo_list';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>React Workshop 7</h1>
        <RepoList />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('content'));