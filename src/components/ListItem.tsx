import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { PostState, Post, RootState, Columns } from '../types';
import { withRouter, Route, Link } from 'react-router-dom';
import Button from './Button';
import { formatTimestamp } from './Util';
import * as actions from '../actions';
import './styles/ListItem.css';

export interface Props {
  key: string;
  post: Post;
  incrementVote: (id: string) => any;
  decrementVote: (id: string) => any;
  selectedPost: (selectedId: string) => any;
  deletePost: (selectedId: string) => any;
  columns: Columns;
}
const PostItem = ({ columns, post, incrementVote, decrementVote, selectedPost, deletePost }: Props) => {
  const { title, id, author, deleted, comments, voteScore } = post;
  const onSubmit = () => {
    selectedPost(id);
  };
  const onSubmitDelete = () => {
    deletePost(id);
  };
  const getEditDestination = () => {
    return `/edit/${id}`;
  };
  const getDestination = () => {
    return `/${id}`;
  };
  return (
    <div className="story">
      <span style={{ width: columns.title.width }}>
        <Link to={getDestination()}>{title}</Link>
      </span>
      <span style={{ width: columns.author.width }}>
        {author}
      </span>
      <span style={{ width: columns.comments.width }}>
        {comments.length}
      </span>
      <span style={{ width: columns.date.width }}>
        {formatTimestamp(post.timestamp * 1000)}
      </span>
      <span style={{ width: columns.votes.width }}>
        <div className="vote circle">
          <div className="increment up" onClick={() => incrementVote(id)} />
          <div className="increment down" onClick={() => decrementVote(id)} />
          <div className="count">{voteScore}</div>
        </div>
      </span>
      <span style={{ width: columns.edit.width }}>
        <Link to={getEditDestination()}>Edit</Link>
      </span>
      <span style={{ width: columns.delete.width }}>
        <Button type="submit" className="btn btn-link float-left" onClick={onSubmitDelete}>
          Delete
        </Button>
      </span>
    </div>
  );
};

function getPost(state: RootState, postId: string) {
  return state.postState.entities[postId];
}

interface OwnProps {
  postId: string;
  columns: Columns;
}
const mapStateToProps = (state: RootState, props: OwnProps) => ({
  post: getPost(state, props.postId),
  columns: props.columns,
});

const mapDispatchToProps = (dispatch: Dispatch<actions.PostListAction>) => ({
  incrementVote: (id: string) => dispatch(actions.incrementPopularityRemote(id)),
  decrementVote: (id: string) => dispatch(actions.decrementPopularityRemote(id)),
  selectedPost: (selectedId: string) => dispatch(actions.selectedPost(selectedId)),
  deletePost: (selectedId: string) => dispatch(actions.removePostRemote(selectedId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
