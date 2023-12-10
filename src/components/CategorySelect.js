import PropTypes from 'prop-types';
import * as React from 'react';
// import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const CategorySelect = ({ id, onChange }) => {
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
    // TODO: understand why ID is not working as intended and fix
    event.target.id = id;
    onChange(event);
  };

  return (
    <Select id="category" value={category} onChange={handleChange} label="Category" displayEmpty minwidth={120}>
      <MenuItem value="" sx={{ color: 'text.secondary' }}>
        Select Category
      </MenuItem>
      <MenuItem value={'Housing'}>Housing</MenuItem>
      <MenuItem value={'Food at home'}>Food at home</MenuItem>
      <MenuItem value={'Transportation'}>Transportation</MenuItem>
      <MenuItem value={'Restaurants'}>Restaurants</MenuItem>
      <MenuItem value={'Travel'}>Travel</MenuItem>
      <MenuItem value={'Other'}>Other</MenuItem>
    </Select>
  );
};

CategorySelect.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func
};

export default CategorySelect;
