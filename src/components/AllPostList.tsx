import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  PostType,
  RootState,
  Columns,
} from '../types';
import * as actions from '../actions';
import * as R from 'ramda';
import * as ReactModal from 'react-modal';
import { postTemplate } from '../components/Util';
import CreatePostForm from '../components/CreatePostForm';
import ConnectedPostItem from './PostItem';
import { log } from '../lib/Logging';
import './styles/PostList.css';

interface Props {
  removePost: (id: string) => actions.RemovePost;
  posts: PostType[];
}

const COLUMNS: Columns = {
  title: {
    label: 'Title',
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
    label: 'Votes',
    className: 'column col-1 story',
  },
  edit: {
    className: 'column col-1 story',
  },
  delete: {
    className: 'column col-1 story',
  },
};

interface State {
  modalIsOpen: boolean;
  criteria: 'Title' | 'Votes' | 'Date' | 'Title' | 'Author' | 'Comments';
  down: boolean;
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
class AllPostList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      criteria: 'Votes',
      down: true,
    };
  }
  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }
  // {this.props.posts.filter((p: PostType) => !p.deleted).map((post: PostType) => <ConnectedPostItem
  getSortFunction = (p: PostType) => {
    log.d(`getSortFunction for ${this.state.criteria}`);
    switch (this.state.criteria) {
      case 'Title':
        return p.title;
      case 'Votes':
        return p.voteScore;
      case 'Date':
        return p.timestamp;
      case 'Author':
        return p.author;
      case 'Comments':
        return p.comments.length;
      default:
        return p.voteScore;
    }
  }
  reverseIfNeeded = (ps: any) => (
    (this.state.down) ? ps : R.reverse(ps)
  )
  render() {
    return (
      <div className="stories">
        <div className="stories-header">
          {Object.keys(COLUMNS).map((key) =>
            <div
              key={key}
              className={COLUMNS[key].className}
            >
              <button
                className="buttonWithout"
                onClick={(e) => this.setState((prevState: State) => ({ criteria: COLUMNS[key].label, down: !prevState.down }))}
              >
                {COLUMNS[key].label}
              </button>
            </div>,
          )}
        </div>
        <div>
          {R.map((post) =>
            <ConnectedPostItem
              key={post.id}
              postId={post.id}
              columns={COLUMNS}
            />, this.reverseIfNeeded(R.sortBy((p) => this.getSortFunction(p), R.reject((p) => p.deleted, this.props.posts))))}
        </div>
        <button
          className="button"
          onClick={(e) => this.openModal()}
        >
          Add Post
        </button>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="New Post Modal"
        >
          <CreatePostForm onCloseModal={this.closeModal} />
        </ReactModal>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<actions.PostListAction>) => ({
  removePost: (id: string) => dispatch(actions.removePost(id)),
});

// selectors
function getPosts(state: RootState): PostType[] {
  const res = state.postState.ids
    .map((id: string) => state.postState.entities[id]);
  return res;
}

const mapStateToPropsList = (state: RootState) => ({
  posts: getPosts(state),
});

const ConnectedAllPostList = connect(mapStateToPropsList, mapDispatchToProps)(AllPostList);
export default ConnectedAllPostList;
