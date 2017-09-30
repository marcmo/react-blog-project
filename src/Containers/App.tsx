import * as React from 'react';
import PostList from '../components/PostList';
import SearchPosts from '../components/SearchPosts';
import './App.css';

const logo = require('../logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="interactions">
          <SearchPosts />
        </div>
        <PostList />
      </div>
    );
  }
}

export default App;
