import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { formatTimestamp } from './Util';
import * as FA from 'react-icons/lib/fa';
import * as T from '../types';
import CommentList from '../components/CommentList';
import Button from './Button';
import * as R from 'ramda';
import * as actions from '../actions';

export interface Props {
  post: T.PostType;
  commentsCount: number;
  incrementVote: (id: string) => any;
  decrementVote: (id: string) => any;
  deletePost: (selectedId: string) => any;
  addComment: (comment: T.CommentType) => any;
  fetchPostComments: (id: string) => any;
}
interface State {
  doRedirect: boolean;
}
class Post extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      doRedirect: false,
    };
  }

  componentDidMount() {
    this.props.fetchPostComments(this.props.post.id);
  }

  handleFormSubmit = (e: any) => {
    this.setState({ doRedirect: true });
    e.preventDefault();
  }

  getEditDestination = () => `/edit/${this.props.post.id}`;
  contentStyle = {
    paddingTop: 10,
    paddingBottom: 100,
  };
  render() {
    const { title } = this.props.post;
    return (
      <div className="container">
        <div className="divider text-right" data-content="content" />
        <div className="columns">
          <div className="column col-xs-7">
            <span className="h4">{title}</span>
          </div>
          <div className="column col-xs-3">
            {formatTimestamp(this.props.post.timestamp * 1000)}
          </div>
          <div className="column col-xs-2">
            {this.props.commentsCount} comments
          </div>
        </div>
        <div className="columns">
          <div className="column col-xs-12" style={this.contentStyle}>
            <span>{this.props.post.body}</span>
          </div>
        </div>
        <div className="divider" />
        <Link to="/">Back</Link>
        {this.state.doRedirect && (
          <Redirect to={'/'} />
        )}
        <div className="divider" />
        <div>
          <CommentList post={this.props.post} />
        </div>
        <Button type="submit" className="button" onClick={() => this.props.addComment(T.createComment(this.props.post.id, 'uuhu'))}>
          Add Comment
        </Button>
        <Link to={this.getEditDestination()}>
          <button type="submit" className="btn-icon">
            <FA.FaPencil size={25} />
          </button>
        </Link>
        <Link to="/">
          <Button type="submit" className="button" onClick={() => this.props.deletePost(this.props.post.id)}>
            Delete
          </Button>
        </Link>
        <div className="divider text-left" data-content="vote" />
        <div className="vote circle">
          <div className="increment up" onClick={() => this.props.incrementVote(this.props.post.id)} />
          <div className="increment down" onClick={() => this.props.decrementVote(this.props.post.id)} />
          <div className="count">{this.props.post.voteScore}</div>
        </div>
      </div>
    );
  }
}

interface OwnProps {
  post: T.PostType;
}
const matchPostId = (postId: string) => ((comment: T.CommentType) => {
  return comment.parentId === postId;
});
function getCommentCount(state: T.RootState, post: T.PostType): number {
  return R.filter(matchPostId(post.id), state.postState.comments).length;
}
const mapStateToProps = (state: T.RootState, props: OwnProps) => ({
  post: props.post,
  commentsCount: getCommentCount(state, props.post),
});

const mapDispatchToProps = (dispatch: Dispatch<actions.PostListAction>) => ({
  incrementVote: (id: string) => dispatch(actions.incrementPopularity(id)),
  decrementVote: (id: string) => dispatch(actions.decrementPopularity(id)),
  deletePost: (selectedId: string) => dispatch(actions.removePost(selectedId)),
  addComment: (comment: T.CommentType) => dispatch(actions.createAddCommentAction(comment)),
  fetchPostComments: (id: string) => dispatch(actions.fetchCommentsAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
