import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Comment, RootState, CommentColumns } from '../types';
import { Link } from 'react-router-dom';
import * as b from 'react-icons/lib/fa';
// import Pencil from 'react-icons/lib/ti/pencil';
import Button from './Button';
import { formatTimestamp } from './Util';
import * as actions from '../actions';
import './styles/ListItem.css';

export interface Props {
  key: string;
  comment: Comment;
  incrementVote: (id: string) => any;
  decrementVote: (id: string) => any;
  columns: CommentColumns;
}
const CommentItem = ({ columns, comment, incrementVote, decrementVote }: Props) => {
  const { id, author, voteScore } = comment;
  const getEditDestination = () => {
    return `/edit/${id}`;
  };
  const getDestination = () => {
    return `/${id}`;
  };
  return (
    <div className="container">
      <div className="columns">
        <div className={columns.id.className}>
          <Link to={getDestination()}>{id}</Link>
        </div>
        <div className={columns.author.className}>
          {author}
        </div>
        <div className={columns.date.className}>
          {formatTimestamp(comment.timestamp * 1000)}
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
              <b.FaPencil size={25} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

interface OwnProps {
  comment: Comment;
  columns: CommentColumns;
}
const mapStateToProps = (state: RootState, props: OwnProps) => ({
  comment: props.comment,
  columns: props.columns,
});

const mapDispatchToProps = (dispatch: any) => ({
  incrementVote: (id: string) => dispatch(actions.incrementPopularity(id)),
  decrementVote: (id: string) => dispatch(actions.decrementPopularity(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
