import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { PostState, Post, RootState, Columns } from '../types';
import * as actions from '../actions';
import ConnectedPostItem from './ListItem';
import './styles/PostList.css';

interface Props {
  addPost: (args: actions.NewPostArgs) => void;
  removePost: (id: string) => void;
  posts: Post[];
}

const COLUMNS: Columns = {
  title: {
    label: 'Title',
    width: '40%',
  },
  author: {
    label: 'Author',
    width: '10%',
  },
  comments: {
    label: 'Comments',
    width: '6%',
  },
  date: {
    label: 'Date',
    width: '25%',
  },
  votes: {
    width: '5%',
  },
  edit: {
    width: '7%',
  },
  delete: {
    width: '7%',
  },
};

const StoriesHeader = ({ columns }: any) => (
  <div className="stories-header">
    {Object.keys(columns).map((key) =>
      <span
        key={key}
        style={{ width: columns[key].width }}
      >
        {columns[key].label}
      </span>
    )}
  </div>
);
const PostList = ({ posts, addPost, removePost }: Props) => (
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
      onClick={(e) => addPost({title: 'new stuff', author: 'Chuck'})}
    >
      Add Post
    </button>
  </div>
);

export function mapDispatchToProps(dispatch: Dispatch<actions.PostListAction>) {
  return {
    addPost: (args: actions.NewPostArgs) => dispatch(actions.addPost(args)),
    removePost: (id: string) => dispatch(actions.removePostRemote(id)),
  };
}

const matchFilter = (filter: string) => ( (post: Post) => {
  return 'SHOW_ALL' === filter || post.category === filter;
});
const deletedFilter = () => ( (post: Post) => {
  return post.deleted;
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
