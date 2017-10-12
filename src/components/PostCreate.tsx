import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import {
  PostState,
  Post,
  RootState,
} from '../types';
import * as actions from '../actions';

interface Props {
  onAddPost: (data: actions.NewPostArgs) => any;
  // onAddPost: (title: string) => Dispatch<actions.PostListAction>;
}

interface State {
  value: actions.NewPostArgs;
}

class PostCreate extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: {
        title: '',
        author: 'nobody',
      }
    };
  }

  private onChangeName(event: any) {
    this.setState({ value: event.target.value });
  }

  private onCreatePost(event: any) {
    this.props.onAddPost(this.state.value);
    this.setState({
      value: {
        title: '',
        author: 'nobody',
      }
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onCreatePost}>
          <input
            type="text"
            placeholder="Add Post..."
            value={this.state.value.title}
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
  onAddPost: (data: actions.NewPostArgs) => dispatch(actions.addPost(data)),
});

export default connect(null, mapDispatchToProps)(PostCreate);
