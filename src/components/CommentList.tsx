import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  CommentType,
  PostType,
  RootState,
  CommentColumns,
} from '../types';
import * as actions from '../actions';
import * as R from 'ramda';
import ConnetedCommentItem from './CommentItem';
import './styles/CommentList.css';

interface Props {
  comments: CommentType[];
}

const COMMENT_COLUMNS: CommentColumns = {
  body: {
    label: 'body',
    className: 'column col-4 comment',
  },
  author: {
    label: 'Author',
    className: 'column col-1 comment',
  },
  comments: {
    label: 'Comments',
    className: 'column col-1 comment',
  },
  date: {
    label: 'Date',
    className: 'column col-3 comment',
  },
  votes: {
    className: 'column col-1 comment',
  },
  edit: {
    className: 'column col-1 comment',
  },
  delete: {
    className: 'column col-1 comment',
  },
};

const CommentList = ({ comments }: Props) => (
  <div className="stories">
    <div>
      {comments.map((comment: CommentType) => <ConnetedCommentItem
        key={comment.id}
        comment={comment}
        columns={COMMENT_COLUMNS}
      />)}
    </div>
  </div>
);

export function mapDispatchToProps(dispatch: Dispatch<actions.PostListAction>) {
  return {};
}

const matchPostId = (postId: string) => ((comment: CommentType) => {
  return comment.parentId === postId;
});
// selectors
function getCommentsForPost(state: RootState, post: PostType): CommentType[] {
  return R.sortBy(R.prop('timestamp'), R.filter(matchPostId(post.id), state.postState.comments));
}

interface OwnProps {
  post: PostType;
}
const mapStateToPropsList = (state: RootState, ownProps: OwnProps) => ({
  comments: getCommentsForPost(state, ownProps.post),
});

export default connect(mapStateToPropsList, mapDispatchToProps)(CommentList);
