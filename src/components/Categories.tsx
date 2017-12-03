import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import { FilterActionType } from '../actions/types';
import Button from './Button';
import * as T from '../types';
import './styles/SearchPosts.css';

interface VehicleProps {
  name: string;
  selectCategory: (category: string) => void;
}
interface Props {
  categories: Array<string>;
  selectCategory: (category: string) => void;
}

const Cat = (props: VehicleProps) => {
  const getDestination = () => `/${props.name}`;
  return (
    <Button
      type="submit"
      className="button"
      onClick={() => props.selectCategory(props.name)}
    >
      <Link to={getDestination()}>{props.name}</Link>
    </Button>
  );
};

const Categories = (props: Props) => {
  return (
    <div style={{ flex: 1, backgroundColor: 'white' }}>
      Categories:
        {props.categories.map((cat) =>
        <Cat key={cat} name={cat} selectCategory={props.selectCategory} />)}
    </div>
  );
};

const mapStateToProps = (state: T.RootState) => ({
  categories: state.categoryState.categories.map((c: T.Category) => c.name),
});
const mapDispatchToProps = (dispatch: Dispatch<FilterActionType>) => ({
  selectCategory: (category: string) => dispatch(actions.applyFilter(category)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Categories);
