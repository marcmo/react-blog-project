import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  Post,
  RootState,
  Columns,
} from '../types';
import * as actions from '../actions';
import { postTemplate } from '../components/Util';
import ConnectedPostItem from './ListItem';
import './styles/PostList.css';

interface Props {
  createNewPost: (args: actions.NewPostArgs) => void;
  removePost: (id: string) => void;
  posts: Post[];
}

const COLUMNS: Columns = {
  title: {
    label: 'Title',
    className: 'column col-4 story',
  },
  author: {
    label: 'Author',
    className: 'column col-1 story',
  },
  comments: {
    label: 'Comments',
    className: 'column col-1 story',
  },
  date: {
    label: 'Date',
    className: 'column col-3 story',
  },
  votes: {
    className: 'column col-1 story',
  },
  edit: {
    className: 'column col-1 story',
  },
  delete: {
    className: 'column col-1 story',
  },
};

const StoriesHeader = ({ columns }: any) => (
  <div className="stories-header">
    {Object.keys(columns).map((key) =>
      <div
        key={key}
        className={columns[key].className}
      >
        {columns[key].label}
      </div>,
    )}
  </div>
);
const PostList = ({ posts, createNewPost, removePost }: Props) => (
  <div className="stories">
    <StoriesHeader columns={COLUMNS} />
    <div>
      {posts.filter((p: Post) => !p.deleted).map((post: Post) => <ConnectedPostItem
        key={post.id}
        postId={post.id}
        columns={COLUMNS}
      />)}
    </div>
    <button
      className="button"
      onClick={(e) => createNewPost({ title: 'new stuff', author: 'Chuck' })}
    >
      Add Post
    </button>
  </div>
);

export function mapDispatchToProps(dispatch: Dispatch<actions.PostListAction>) {
  return {
    // TODO make udacity configurable
    createNewPost: (args: actions.NewPostArgs) => dispatch(
      actions.addPost(postTemplate(args.title, args.author, 'udacity'))),
    removePost: (id: string) => dispatch(actions.removePost(id)),
  };
}

const matchFilter = (filter: string) => ((post: Post) => {
  return 'SHOW_ALL' === filter || post.category === filter;
});
// selectors
function getPosts(state: RootState): Post[] {
  const filter = state.categoryState.filter;
  const res = state.postState.ids
    .map((id: string) => state.postState.entities[id])
    .filter(matchFilter(filter));
  return res;
}

const mapStateToPropsList = (state: RootState) => ({
  posts: getPosts(state),
});

const ConnectedTodoList = connect(mapStateToPropsList, mapDispatchToProps)(PostList);
export default ConnectedTodoList;
