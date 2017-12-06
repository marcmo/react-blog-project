import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { PostType, Category, RootState } from '../types';
import { postTemplate } from '../components/Util';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import SingleInput from '../components/SingleInput';
import * as actions from '../actions';

interface Props {
  categories: Array<Category>;
  createNewPost: (args: actions.NewPostArgs, category: string, body: string) => actions.AddPost;
  updatePost: (postId: string, args: actions.UpdatePostInfo) => any;
  exit: () => any;
  onCloseModal: () => void;
}
interface State {
  title: string;
  body: string;
  category: string;
  votes?: number;
  doRedirect: boolean;
}

class CreatePostForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      category: 'none',
      doRedirect: false,
    };
  }

  getOptions = () => {
    return this.props.categories
      .map((category: Category) => category.name);
  }
  handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleClearForm = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.setState({
      title: '',
      body: '',
      category: '',
    });
  }

  handleDescriptionChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({ body: (event.target as HTMLTextAreaElement).value });
  }

  handleTitleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({ title: (event.target as HTMLTextAreaElement).value });
  }

  handleCategorySelect = (e: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({ category: (e.target as HTMLTextAreaElement).value });
  }

  handleFormSubmit = (e: any) => {
    e.preventDefault();
    this.setState({ doRedirect: true });
    this.props.createNewPost(
      { title: this.state.title, author: 'Chuck' },
      this.state.category,
      this.state.body,
    );
    this.handleClearForm(e);
    this.props.exit();
    this.props.onCloseModal();
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <SingleInput
              inputType={'text'}
              title={'Title'}
              name={'name'}
              controlFunc={this.handleTitleChange}
              content={this.state.title ? this.state.title : ''}
              placeholder={'title'}
            />
            <Select
              title={'Category'}
              name={'Category'}
              controlFunc={this.handleCategorySelect}
              options={this.getOptions()}
              selectedOption={this.state.category ? this.state.category : 'Choose category'}
            />
            <TextArea
              title={'Post Content'}
              rows={5}
              resize={false}
              content={this.state.body}
              name={'currentPostInfo'}
              controlFunc={this.handleDescriptionChange}
              placeholder={'...some content'}
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary float-right"
            value="Submit"
          />
          <button
            className="btn btn-link float-left"
            onClick={this.handleClearForm}
          >
            Clear form
          </button>
        </form>
        {this.state.doRedirect && (
          <Redirect to={'/'} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  categories: state.categoryState.categories,
});
const mapDispatchToProps = (dispatch: Dispatch<actions.PostListAction>) => ({
  createNewPost: (args: actions.NewPostArgs, category: string, body: string) => dispatch(
    actions.addPost(postTemplate(args.title, args.author, category, body))),
  updatePost: (id: string, args: actions.UpdatePostInfo) =>
    dispatch(actions.editPost(
      id,
      args.category ? args.category : 'none',
      args.title ? args.title : '',
      args.body ? args.body : '')),
  exit: () => dispatch(actions.createDeselectedPostAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePostForm);
