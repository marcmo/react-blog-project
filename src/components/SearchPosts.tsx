import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Button from './Button';

const applyQueryState = (query: string) => () => ({
  query
});

interface Props {
  onFetchPosts(query: string): any;
}
interface State {
  query: string;
}

class SearchStories extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      query: '',
    };
  }

  onSubmit = (event: any) => {
    const { query } = this.state;
    if (query) {
      this.props.onFetchPosts(query);
      this.setState(applyQueryState(''));
    }
    event.preventDefault();
  }

  onChange = (event: any) => {
    const { value } = event.target;
    this.setState(applyQueryState(value));
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          value={this.state.query}
          onChange={this.onChange}
        />
        <Button type="submit" className="button" onClick={this.onSubmit}>
          Search
        </Button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  onFetchPosts: (query: string) => dispatch(actions.fetchPosts(query)),
});

export default connect(
  null,
  mapDispatchToProps
)(SearchStories);
