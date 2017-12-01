import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { formatTimestamp } from './Util';
import * as T from '../types';
import CommentList from '../components/CommentList';
import Button from './Button';
import * as actions from '../actions';

export interface Props {
  post: T.PostType;
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

  render() {
    const { title } = this.props.post;
    return (
      <div className="container">
        <div className="columns">
          <div className="column col-xs-6">
            <span className="h4">{title}</span>
          </div>
          <div className="column col-xs-6">
            {formatTimestamp(this.props.post.timestamp * 1000)}
          </div>
        </div>
        <div className="divider text-left" data-content="content" />
        <div className="columns">
          <div className="column col-xs-12">
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
      </div>
    );
  }
}

interface OwnProps {
  post: T.PostType;
}
const mapStateToProps = (state: T.RootState, props: OwnProps) => ({
  post: props.post,
});

const mapDispatchToProps = (dispatch: Dispatch<actions.PostListAction>) => ({
  incrementVote: (id: string) => dispatch(actions.incrementPopularity(id)),
  decrementVote: (id: string) => dispatch(actions.decrementPopularity(id)),
  deletePost: (selectedId: string) => dispatch(actions.removePost(selectedId)),
  addComment: (comment: T.CommentType) => dispatch(actions.createAddCommentAction(comment)),
  fetchPostComments: (id: string) => dispatch(actions.fetchCommentsAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
