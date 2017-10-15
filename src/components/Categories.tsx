import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions';
import { FilterActionType } from '../actions/types';
import Button from './Button';
import { RootState, Category } from '../types';
import './styles/SearchPosts.css';

interface VehicleProps {
  name: string;
  selectCategory: (category: string) => void;
}
interface Props {
  categories: Array<string>;
  selectCategory: (category: string) => void;
}

const Vehicle = (props: VehicleProps) => (
  <Button type="submit" className="button" onClick={() => props.selectCategory(props.name)}>
    {props.name}
  </Button>
);

const Categories = (props: Props) => {
  return (
    <div style={{ flex: 1, backgroundColor: 'white' }}>
      Categories:
        {props.categories.map((cat) =>
        <Vehicle key={cat} name={cat} selectCategory={props.selectCategory} />)}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  categories: state.categoryState.categories.map((c: Category) => c.name),
});
const mapDispatchToProps = (dispatch: Dispatch<FilterActionType>) => ({
  selectCategory: (category: string) => dispatch(actions.applyFilter(category)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
