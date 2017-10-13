import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';
import 'spectre.css/dist/spectre.min.css';
import * as ReactModal from 'react-modal';
import { RootState, Category, Post } from '../types';
import PostList from '../components/PostList';
import EditForm from '../components/EditForm';
import PostItem from '../components/Post';
import Categories from '../components/Categories';
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right';
import * as actions from '../actions';
import './App.css';

const logo = require('../logo.svg');

interface Props {
  posts: Post[];
  initialFetchPostsAndCategories: () => any;
  deselectedPost: () => any;
  selectedPostId: string | null;
  categories: Array<Category>;
}
interface State {
  input: string;
}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      input: '',
    };
  }
  componentDidMount() {
    this.props.initialFetchPostsAndCategories();
  }

  closeFoodModal = () => {
    console.warn('closeFoodModal');
  }
  updateInput = (i: string) => {
    this.setState((prevState) => ({
      input: i,
    }));
  }

  handleCloseModal = () => {
    this.props.deselectedPost();
  }

  renderRoute = (post: Post) => (
    <Route
      exact={true}
      path={`/${post.id}`}
      render={() => <PostItem post={post} />}
    />
  )
  renderEditRoute = (post: Post) => (
    <Route
      exact={true}
      path={`/edit/${post.id}`}
      render={() => <EditForm post={post} />}
    />
  )

  render() {
    return (
      <div className="container">
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
        <Route
          exact={true}
          path="/"
          render={() =>
            <div>
              <PostList />
              <div className="interactions">
                <Categories />
              </div>
            </div>
          }
        />
        {this.props.posts.map((p: Post) => this.renderEditRoute(p))}
        {this.props.posts.map((p: Post) => this.renderRoute(p))}
      </div>
    );
  }
}

function getPosts(state: RootState): Post[] {
  const filter = state.categoryState.filter;
  const res = state.postState.ids
    .map((id: string) => state.postState.entities[id]);
  return res;
}
const mapStateToProps = (state: RootState) => ({
  selectedPostId: state.postState.selectedPostId,
  categories: state.categoryState.categories,
  posts: getPosts(state),
});
const mapDispatchToProps = (dispatch: Dispatch<actions.UpdatePostListActionType>) => ({
  initialFetchPostsAndCategories: () => {
    dispatch(actions.fetchPosts());
    dispatch(actions.fetchCategories());
  },
  deselectedPost: () => dispatch(actions.deselectedPost()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
