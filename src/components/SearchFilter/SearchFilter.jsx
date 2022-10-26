import { useDispatch } from 'react-redux';
import { FilterLabel, FilterInput } from './SearchFilter.styled';
import { setFilter } from 'redux/filterSlice';

export const SearchFilter = () => {
  const dispatch = useDispatch();
  const handleInput = e => {
    const { value } = e.target;
    dispatch(setFilter(value.toLowerCase()));
  };
  return (
    <>
      <FilterLabel htmlFor="filter">Find contacts by name</FilterLabel>
      <FilterInput type="text" id="filter" onChange={handleInput} />
    </>
  );
};
