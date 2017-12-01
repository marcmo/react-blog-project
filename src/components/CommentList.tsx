import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  CommentType,
  PostType,
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
  comments: CommentType[];
}

const COMMENT_COLUMNS: CommentColumns = {
  body: {
    label: 'body',
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
