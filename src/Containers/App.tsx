import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import 'spectre.css/dist/spectre.min.css';
import * as ReactModal from 'react-modal';
import { RootState, Category } from '../types';
import PostList from '../components/PostList';
import EditForm from '../components/EditForm';
import Categories from '../components/Categories';
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right';
import * as actions from '../actions';
import './App.css';

const logo = require('../logo.svg');

interface Props {
  initialFetchPostsAndCategories: () => any;
  deselectedPost: () => any;
  selectedPostId: string | null;
  categories: Array<Category>;
}
interface State {
  loadingFood: boolean;
  input: string;
}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      loadingFood: false,
      input: '',
    };
  }
  componentDidMount() {
    this.props.initialFetchPostsAndCategories();
  }

  closeFoodModal = () => {
    console.warn('closeFoodModal');
  }
  updateInput = (i: string) => {
    this.setState((prevState) => ({
      input: i,
    }));
  }

  handleCloseModal = () => {
    this.props.deselectedPost();
  }

  render() {
    return (
      <div className="app">
        <div className="interactions">
          <Categories />
        </div>
        <PostList />
        <ReactModal
          isOpen={this.props.selectedPostId != null}
          onRequestClose={this.handleCloseModal}
          contentLabel="Modal"
        >
          <button onClick={this.handleCloseModal}>Close</button>
          <EditForm/>
        </ReactModal>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  selectedPostId: state.postState.selectedPostId,
  categories: state.categoryState.categories,
});
const mapDispatchToProps = (dispatch: Dispatch<actions.UpdatePostListActionType>) => ({
  initialFetchPostsAndCategories: () => {
    dispatch(actions.fetchPosts());
    dispatch(actions.fetchCategories());
  },
  deselectedPost: () => dispatch(actions.deselectedPost()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
