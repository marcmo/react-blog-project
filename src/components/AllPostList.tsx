import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  PostType,
  RootState,
  Columns,
} from '../types';
import * as actions from '../actions';
import { postTemplate } from '../components/Util';
import ConnectedPostItem from './PostItem';
import './styles/PostList.css';

interface Props {
  createNewPost: (args: actions.NewPostArgs, category: string) => void;
  removePost: (id: string) => void;
  posts: PostType[];
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
const AllPostList = ({ posts, createNewPost, removePost }: Props) => (
  <div className="stories">
    <StoriesHeader columns={COLUMNS} />
    <div>
      {posts.filter((p: PostType) => !p.deleted).map((post: PostType) => <ConnectedPostItem
        key={post.id}
        postId={post.id}
        columns={COLUMNS}
      />)}
    </div>
    <button
      className="button"
      onClick={(e) => createNewPost({ title: 'new stuff', author: 'Chuck' }, 'none')}
    >
      Add Post
    </button>
  </div>
);

export function mapDispatchToProps(dispatch: Dispatch<actions.PostListAction>) {
  return {
    createNewPost: (args: actions.NewPostArgs, category: string) => dispatch(
      actions.addPost(postTemplate(args.title, args.author, category))),
    removePost: (id: string) => dispatch(actions.removePost(id)),
  };
}

// selectors
function getPosts(state: RootState): PostType[] {
  const res = state.postState.ids
    .map((id: string) => state.postState.entities[id]);
  return res;
}

const mapStateToPropsList = (state: RootState) => ({
  posts: getPosts(state),
});

const ConnectedAllPostList = connect(mapStateToPropsList, mapDispatchToProps)(AllPostList);
export default ConnectedAllPostList;
