import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Redirect } from 'react-router';
import * as T from '../types';
import { postTemplate } from '../components/Util';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import SingleInput from '../components/SingleInput';
import * as actions from '../actions';

interface Props {
  createComment: (comment: T.CommentType) => actions.AddComment;
  exit: () => any;
  onCloseModal: () => void;
  post: T.PostType;
}
interface State {
  body: string;
  votes?: number;
  doRedirect: boolean;
}

class CreateCommentForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      body: '',
      doRedirect: false,
    };
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
      body: '',
    });
  }

  handleDescriptionChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({ body: (event.target as HTMLTextAreaElement).value });
  }

  handleFormSubmit = (e: any) => {
    e.preventDefault();
    this.setState({ doRedirect: true });
    this.props.createComment(
      T.createComment(this.props.post.id, this.state.body),
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
            <TextArea
              title={'Comment Content'}
              rows={5}
              resize={false}
              content={this.state.body ? this.state.body : ''}
              name={'currentCommentInfo'}
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

const mapStateToProps = (state: T.RootState) => ({});
const mapDispatchToProps = (dispatch: Dispatch<actions.PostListAction>) => ({
  createComment: (comment: T.CommentType) => dispatch(actions.createAddCommentAction(comment)),
  exit: () => dispatch(actions.createDeselectedPostAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateCommentForm);
