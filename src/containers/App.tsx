import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  withRouter,
  BrowserRouter,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import 'spectre.css/dist/spectre.min.css';
import * as T from '../types';
import PostList from '../components/PostList';
import AllPostList from '../components/AllPostList';
import EditForm from '../components/EditForm';
import NotFound from '../components/NotFound';
import Post from '../components/Post';
import EditCommentForm from '../components/EditCommentForm';
import Categories from '../components/Categories';
import { UpdatePostListActionType } from '../actions/types';
import * as actions from '../actions';
import './App.css';

interface Props {
  posts: T.PostType[];
  comments: T.CommentType[];
  initialFetchPostsAndCategories: () => any;
  deselectedPost: () => any;
  selectedPostId: string | null;
  categories: Array<T.Category>;
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

  updateInput = (i: string) => {
    this.setState((prevState) => ({
      input: i,
    }));
  }

  handleCloseModal = () => {
    this.props.deselectedPost();
  }

  renderRoute = (post: T.PostType) => (
    <Route
      key={post.id}
      exact={true}
      path={`/${post.category}/${post.id}`}
      render={() => <Post post={post} />}
    />
  )
  renderEditRoute = (post: T.PostType) => (
    <Route
      key={`edit-${post.id}`}
      exact={true}
      path={`/edit/${post.id}`}
      render={() => <EditForm post={post} />}
    />
  )
  renderEditComment = (comment: T.CommentType) => (
    <Route
      key={comment.id}
      exact={true}
      path={`/edit/${comment.id}`}
      render={() => <EditCommentForm comment={comment} />}
    />
  )

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <ul>
            <li><Link to="/">All Posts</Link></li>
          </ul>
          <div className="interactions">
            <Categories />
          </div>
          <Switch>
            <Route
              exact={true}
              path="/"
              component={AllPostList}
            />
            {this.props.posts.map((p: T.PostType) => this.renderEditRoute(p))}
            {this.props.posts.map((p: T.PostType) => this.renderRoute(p))}
            {this.props.comments.map((c: T.CommentType) => this.renderEditComment(c))}
            <Route
              exact={true}
              path="/:category"
              component={PostList}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

function getPosts(state: T.RootState): T.PostType[] {
  const res = state.postState.ids
    .map((id: string) => state.postState.entities[id]);
  return res;
}
const mapStateToProps = (state: T.RootState) => ({
  selectedPostId: state.postState.selectedPostId,
  categories: state.categoryState.categories,
  posts: getPosts(state),
  comments: state.postState.comments,
});
const mapDispatchToProps = (dispatch: Dispatch<UpdatePostListActionType>) => ({
  initialFetchPostsAndCategories: () => {
    dispatch(actions.createFetchPostsAction());
    dispatch(actions.createFetchCategoriesAction());
  },
  deselectedPost: () => dispatch(actions.createDeselectedPostAction()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(App));
