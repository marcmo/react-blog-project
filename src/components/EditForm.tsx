import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { Post, Category, RootState, Entity } from '../types';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import SingleInput from '../components/SingleInput';
import * as actions from '../actions';

interface Props {
  post: Post;
  categories: Array<Category>;
  updatePost: (postId: string, args: actions.UpdatedPostContent) => any;
  exit: () => any;
}
// augment inteface for our state type
declare module '../actions' {
  interface UpdatedPostContent {
    doRedirect: boolean;
  }
}

class EditForm extends React.Component<Props, actions.UpdatedPostContent> {
  constructor(props: Props) {
    super(props);

    this.state = {
      timestamp: props.post.timestamp,
      title: props.post.title,
      body: props.post.body,
      category: props.post.category,
      doRedirect: false,
    };
  }

  getOptions = () => {
    return this.props.categories
      .map((category: Category) => category.name)
      .filter((name: string) => name !== 'SHOW_ALL');
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
      timestamp: 0,
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
    this.props.updatePost(this.props.post.id, this.state);
    this.handleClearForm(e);
    this.props.exit();
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
              content={this.state.body ? this.state.body : ''}
              name={'currentPetInfo'}
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
          <Redirect to={'/'}/>
        )}
      </div>
    );
  }
}

function getPost(state: RootState, postId: string) {
  return state.postState.entities[postId];
}

const mapStateToProps = (state: RootState) => ({
  categories: state.categoryState.categories,
});
const mapDispatchToProps = (dispatch: Dispatch<actions.PostListAction>) => ({
  updatePost: (id: string, args: actions.UpdatedPostContent) => dispatch(actions.editPost(id, args)),
  exit: () => dispatch(actions.deselectedPost()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditForm);
