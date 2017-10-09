import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { PostState, Post, RootState, Columns } from '../types';
import * as actions from '../actions';
import ConnectedPostItem from './ListItem';
import './PostList.css';

export interface Props {
  postsAsIds: string[];
  addPost: (t: string, id: string) => void;
  removePost: (id: string) => void;
  onUpdateCategory: (id: string, s: string) => void;
}

const COLUMNS: Columns = {
  title: {
    label: 'Title',
    width: '40%',
  },
  author: {
    label: 'Author',
    width: '15%',
  },
  comments: {
    label: 'Comments',
    width: '10%',
  },
  date: {
    label: 'Date',
    width: '25%',
  },
  votes: {
    width: '10%',
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
const PostList = ({ postsAsIds, addPost, removePost, onUpdateCategory }: Props) => (
  <div className="stories">
    <StoriesHeader columns={COLUMNS} />
    <button
      className="shopping-list"
      onClick={(e) => addPost('new stuff', 'Chuck')}
    >
      Add Post
    </button>
    <div>
      {postsAsIds.map((postId: string) => <ConnectedPostItem
        key={postId}
        postId={postId}
        columns={COLUMNS}
      />)}
    </div>
  </div>
);

export function mapDispatchToProps(dispatch: Dispatch<actions.PostListAction>) {
  return {
    addPost: (post: string, id: string) => dispatch(actions.addPost(post, id)),
    removePost: (id: string) => dispatch(actions.removePost(id)),
    onUpdateCategory: (id: string, cat: string) => dispatch(actions.updateCategory(id, cat)),
  };
}

// selectors
function getPostsAsIds(state: RootState): string[] {
  const res = state.postState.ids
    .map((id: string) => state.postState.entities[id])
    // .filter(VISIBILITY_FILTERS[state.filterState.filter])
    .map((post: Post) => {
      return post.id;
    });
  return res;
}

function mapStateToPropsList(state: RootState) {
  return {
    postsAsIds: getPostsAsIds(state),
  };
}

const ConnectedTodoList = connect(mapStateToPropsList, mapDispatchToProps)(PostList);
export default ConnectedTodoList;
