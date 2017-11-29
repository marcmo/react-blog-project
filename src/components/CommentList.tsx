import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  Comment,
  Post,
  RootState,
  CommentColumns,
  createComment,
} from '../types';
import * as actions from '../actions';
import * as R from 'ramda';
import { postTemplate } from '../components/Util';
import ConnetedCommentItem from './CommentItem';
import './styles/CommentList.css';

interface Props {
  comments: Comment[];
}

const COMMENT_COLUMNS: CommentColumns = {
  id: {
    label: 'id',
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
const CommentList = ({ comments }: Props) => (
  <div className="stories">
    <StoriesHeader columns={COMMENT_COLUMNS} />
    <div>
      {comments.map((comment: Comment) => <ConnetedCommentItem
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

const matchPostId = (postId: string) => ((comment: Comment) => {
  return comment.parentId === postId;
});
// selectors
function getCommentsForPost(state: RootState, post: Post): Comment[] {
  return R.filter(matchPostId(post.id), state.postState.comments);
}

interface OwnProps {
  post: Post;
}
const mapStateToPropsList = (state: RootState, ownProps: OwnProps) => ({
  comments: getCommentsForPost(state, ownProps.post),
});

export default connect(mapStateToPropsList, mapDispatchToProps)(CommentList);
