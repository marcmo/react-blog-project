import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { CommentType, Category, RootState } from '../types';
import TextArea from '../components/TextArea';
import * as actions from '../actions';

interface Props {
  comment: CommentType;
  categories: Array<Category>;
  updateComment: (postId: string, timestamp: number, args: actions.UpdateCommentInfo) => any;
  exit: () => any;
}
interface State {
  timestamp?: number;
  body?: string;
  votes?: number;
  doRedirect: boolean;
}

class EditCommentForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      timestamp: props.comment.timestamp,
      body: props.comment.body,
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
      body: '',
    });
  }

  handleDescriptionChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({ body: (event.target as HTMLTextAreaElement).value });
  }

  handleFormSubmit = (e: any) => {
    e.preventDefault();
    this.setState({ doRedirect: true });
    this.props.updateComment(this.props.comment.id, Date.now(), this.state);
    this.handleClearForm(e);
    this.props.exit();
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleFormSubmit}>
          <div>
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
  updateComment: (id: string, timestamp: number, args: actions.UpdatePostInfo) =>
    dispatch(actions.editComment(
      id,
      timestamp,
      args.body ? args.body : '')),
  exit: () => dispatch(actions.createDeselectedPostAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditCommentForm);
