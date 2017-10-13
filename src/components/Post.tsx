import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { formatTimestamp } from './Util';
import { PostState, Post, RootState, Columns } from '../types';
import * as actions from '../actions';

export interface Props {
  post: Post;
  incrementVote: (id: string) => any;
  decrementVote: (id: string) => any;
  deletePost: (selectedId: string) => any;
}
const handleChange = (event: any) => {
  return;
};
interface State {
  doRedirect: boolean;
}
class PostItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      doRedirect: false,
    };
  }
  handleFormSubmit = (e: any) => {
    this.setState({ doRedirect: true });
    e.preventDefault();
  }

  render() {
    const { title, id, author, deleted, comments, voteScore } = this.props.post;
    return (
      <div className="container">
        <div className="columns">
          <div className="column col-xs-6">
            <span className="h4">{this.props.post.title}</span>
          </div>
          <div className="column col-xs-6">
            {formatTimestamp(this.props.post.timestamp * 1000)}
          </div>
        </div>
        <div className="divider text-left" data-content="content"/>
        <div className="columns">
          <div className="column col-xs-12">
            <span>{this.props.post.body}</span>
          </div>
        </div>
        <div className="divider"/>
        <Link to="/">Back</Link>
        {this.state.doRedirect && (
          <Redirect to={'/'} />
        )}
      </div>
    );
  }
}

function getPost(state: RootState, postId: string) {
  return state.postState.entities[postId];
}

interface OwnProps {
  post: Post;
}
const mapStateToProps = (state: RootState, props: OwnProps) => ({
  post: props.post,
});

const mapDispatchToProps = (dispatch: Dispatch<actions.PostListAction>) => ({
  incrementVote: (id: string) => dispatch(actions.incrementPopularity(id)),
  decrementVote: (id: string) => dispatch(actions.decrementPopularity(id)),
  deletePost: (selectedId: string) => dispatch(actions.removePostRemote(selectedId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
