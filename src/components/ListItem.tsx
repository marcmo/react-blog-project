import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Post, RootState, Columns } from '../types';
import { Link } from 'react-router-dom';
import Trash from 'react-icons/lib/ti/trash';
import Pencile from 'react-icons/lib/ti/pencil';
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
  const { title, id, author, comments, voteScore } = post;
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
    <div className="container">
      <div className="columns">
        <div className={columns.title.className}>
          <Link to={getDestination()}>{title}</Link>
        </div>
        <div className={columns.author.className}>
          {author}
        </div>
        <div className={columns.comments.className}>
          {comments.length}
        </div>
        <div className={columns.date.className}>
          {formatTimestamp(post.timestamp * 1000)}
        </div>
        <div className={columns.votes.className}>
          <div className="vote circle">
            <div className="increment up" onClick={() => incrementVote(id)} />
            <div className="increment down" onClick={() => decrementVote(id)} />
            <div className="count">{voteScore}</div>
          </div>
        </div>
        <div className={columns.edit.className}>
          <Link to={getEditDestination()}>
            <button type="submit" className="btn-icon">
              <Pencile size={25} />
            </button>
          </Link>
        </div>
        <div className={columns.delete.className}>
          <button type="submit" className="btn-icon" onClick={onSubmitDelete}>
            <Trash size={25} />
          </button>
        </div>
      </div>
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
