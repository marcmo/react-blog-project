import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { PostState, Post, RootState, Columns } from '../types';
import { ButtonInline } from './Button';
import * as fns from 'date-fns';
import * as actions from '../actions';
import './styles/ListItem.css';

export interface Props {
  key: string;
  post: Post;
  incrementVote: (id: string) => any;
  decrementVote: (id: string) => any;
  columns: Columns;
}
const formatTimestamp = (unixtime: number): string => {
  const d: Date = new Date(unixtime / 1000);
  return `${fns.format(d, 'MM/DD/YY')} (${fns.distanceInWordsToNow(d)})`;
};
const PostItem = ({ columns, post, incrementVote, decrementVote }: Props) => {
  const { title, id, author, deleted, comments, voteScore } = post;
  return (
    <div className="story">
      <span style={{ width: columns.title.width }}>
        {title}
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
  incrementVote: (id: string) => dispatch(actions.incrementPopularity(id)),
  decrementVote: (id: string) => dispatch(actions.decrementPopularity(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
