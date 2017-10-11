import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import PostList from '../components/PostList';
import SearchPosts from '../components/SearchPosts';
import Categories from '../components/Categories';
import * as actions from '../actions';
import './App.css';

const logo = require('../logo.svg');

interface Props {
  initialFetchPostsAndCategories: () => any;
}
class App extends React.Component<Props, object> {

  componentDidMount() {
    this.props.initialFetchPostsAndCategories();
  }

  render() {
    return (
      <div className="app">
        <div className="interactions">
          <SearchPosts />
        </div>
        <div className="interactions">
          <Categories />
        </div>
        <PostList />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<actions.UpdatePostListActionType>) => ({
  initialFetchPostsAndCategories: () => {
    dispatch(actions.fetchPosts());
    dispatch(actions.fetchCategories());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(App);
