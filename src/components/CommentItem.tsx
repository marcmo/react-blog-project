import * as React from 'react';
import { connect } from 'react-redux';
import { CommentType, RootState, CommentColumns } from '../types';
import { Link } from 'react-router-dom';
import * as FA from 'react-icons/lib/fa';
// import Pencil from 'react-icons/lib/ti/pencil';
import { formatTimestamp } from './Util';
import * as actions from '../actions';
import './styles/CommentItem.css';

export interface Props {
  key: string;
  comment: CommentType;
  incrementVote: (comment: CommentType) => any;
  decrementVote: (comment: CommentType) => any;
  deleteComment: (commentId: string) => any;
  columns: CommentColumns;
}
const CommentItem = ({ columns, comment, incrementVote, decrementVote, deleteComment }: Props) => {
  const { id, body, author, voteScore } = comment;
  const getEditDestination = () => {
    return `/edit/${id}`;
  };
  return (
    <div className="container">
      <div className="columns">
        <div className={columns.body.className}>
          <span>{body}</span>
        </div>
        <div className={columns.author.className}>
          {author}
        </div>
        <div className={columns.date.className}>
          {formatTimestamp(comment.timestamp * 1000)}
        </div>
        <div className={columns.votes.className}>
          <div className="vote circle">
            <div className="increment up" onClick={() => incrementVote(comment)} />
            <div className="increment down" onClick={() => decrementVote(comment)} />
            <div className="count">{voteScore}</div>
          </div>
        </div>
        <div className={columns.edit.className}>
          <Link to={getEditDestination()}>
            <button type="submit" className="btn-icon">
              <FA.FaPencil size={25} />
            </button>
          </Link>
        </div>
        <div className={columns.delete.className}>
          <button type="submit" className="btn-icon" onClick={() => deleteComment(id)}>
            <FA.FaTrash size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

interface OwnProps {
  comment: CommentType;
  columns: CommentColumns;
}
const mapStateToProps = (state: RootState, props: OwnProps) => ({
  comment: props.comment,
  columns: props.columns,
});

const mapDispatchToProps = (dispatch: any) => ({
  incrementVote: (comment: CommentType) => dispatch(actions.incrementPopularityComment(comment)),
  decrementVote: (comment: CommentType) => dispatch(actions.decrementPopularityComment(comment)),
  deleteComment: (selectedId: string) => dispatch(actions.deleteComment(selectedId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
