import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Button from './Button';
import './SearchPosts.css';

const applyQueryState = (query: string) => () => ({
  query
});

interface Props {
  onFetchPosts(): any;
  onFetchCategories: () => any;
}
interface State {
  query: string;
  hasError: boolean;
}

class SearchStories extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      query: '',
      hasError: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ hasError: true });
    console.error(error, errorInfo);
    // logErrorToMyService(error, info);
  }

  onSubmit = (event: any) => {
    const { query } = this.state;
    if (query) {
      this.props.onFetchPosts();
      this.setState(applyQueryState(''));
    }
    event.preventDefault();
  }

  onChange = (event: any) => {
    const { value } = event.target;
    this.setState(applyQueryState(value));
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
        <h1>Something went wrong in SearchPost</h1>
        </div>
      );
    }
        // <input
        //   type="text"
        //   value={this.state.query}
        //   onChange={this.onChange}
        // />
    return (
      <form onSubmit={this.onSubmit}>
        <Button type="submit" className="button" onClick={this.onSubmit}>
          Search
        </Button>
        <Button type="submit" className="button" onClick={this.props.onFetchCategories}>
          Fetch Categories
        </Button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  onFetchPosts: () => dispatch(actions.fetchPosts()),
  onFetchCategories: () => dispatch(actions.fetchCategories()),
});

export default connect(
  null,
  mapDispatchToProps
)(SearchStories);
