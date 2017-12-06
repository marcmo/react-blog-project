import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  PostType,
  RootState,
  Columns,
} from '../types';
import * as actions from '../actions';
import * as ReactModal from 'react-modal';
import { postTemplate } from '../components/Util';
import CreatePostForm from '../components/CreatePostForm';
import ConnectedPostItem from './PostItem';
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
interface State {
  modalIsOpen: boolean;
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
    };
  }
  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }
  render() {
    return (
      <div className="stories">
        <StoriesHeader columns={COLUMNS} />
        <div>
          {this.props.posts.filter((p: PostType) => !p.deleted).map((post: PostType) => <ConnectedPostItem
            key={post.id}
            postId={post.id}
            columns={COLUMNS}
          />)}
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
          <CreatePostForm onCloseModal={this.closeModal}/>
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
