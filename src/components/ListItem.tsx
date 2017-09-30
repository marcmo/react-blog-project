import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { PostState, Post, RootState } from '../types';
import { ButtonInline } from './Button';
import * as actions from '../actions';
import './ListItem.css';

export interface Props {
  key: string;
  post: Post;
  onTogglePost: (id: string) => any;
  columns: any;
}

const PostItem = ({ columns, post, onTogglePost }: Props) => {
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
      <span style={{ width: columns.points.width }}>
        {voteScore}
      </span>
      <span style={{ width: columns.archive.width }}>
        <ButtonInline onClick={() => onTogglePost(id)}>
          Archive
        </ButtonInline>
      </span>
    </div>
  );
};

function getPost(state: RootState, postId: string) {
  return state.postState.entities[postId];
}

const mapStateToProps = (state: RootState, props: any) => ({
  post: getPost(state, props.postId),
  columns: props.columns,
});

const mapDispatchToProps = (dispatch: Dispatch<actions.PostListAction>) => ({
  onTogglePost: (id: string) => dispatch(actions.removePost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
