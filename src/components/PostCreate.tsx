import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { PostState, Post, RootState } from '../types';
import * as actions from '../actions';

interface Props {
  onAddPost: (title: string) => any;
  // onAddPost: (title: string) => Dispatch<actions.PostListAction>;
}

interface State {
  value: string;
}

class PostCreate extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: '',
    };

    this.onCreatePost = this.onCreatePost.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
  }

  private onChangeName(event: any) {
    this.setState({ value: event.target.value });
  }

  private onCreatePost(event: any) {
    this.props.onAddPost(this.state.value);
    this.setState({ value: '' });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onCreatePost}>
          <input
            type="text"
            placeholder="Add Post..."
            value={this.state.value}
            onChange={this.onChangeName}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

function getPost(state: RootState, postId: string) {
  return state.postState.entities[postId];
}

const mapDispatchToProps = (dispatch: Dispatch<actions.PostListAction>) => ({
  onAddPost: (title: string) => dispatch(actions.doAddPostWithNotification(uuid(), name)),
});

export default connect(null, mapDispatchToProps)(PostCreate);
