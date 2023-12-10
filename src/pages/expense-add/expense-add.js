// material-ui
import { Button, TextField, Stack } from '@mui/material';

// assets
import { PlusCircleOutlined } from '@ant-design/icons';

// project import
import MainCard from 'components/MainCard';
import CategorySelect from 'components/CategorySelect';

import axios from 'axios';
import { useState } from 'react';
import { Grid } from '../../../node_modules/@mui/material/index';

// third-party
import NumberFormat from 'react-number-format';

// ==============================|| SAMPLE PAGE ||============================== //

const AddExpense = () => {
  const [inputs, setInputs] = useState({
    created_at: '',
    description: '',
    category: '',
    value: ''
  });

  const handleChange = (event) => {
    function parseLocaleNumber(stringNumber) {
      var thousandSeparator = '.';
      var decimalSeparator = ',';

      return parseFloat(stringNumber.replace('US$', '').replace(thousandSeparator, '').replace(decimalSeparator, '.'));
    }

    let isNumber = Boolean(false);
    event.target.id == 'value' ? (isNumber = true) : (isNumber = false);

    setInputs((values) => {
      return { ...values, [event.target.id]: isNumber ? parseLocaleNumber(event.target.value) : event.target.value };
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    alert(JSON.stringify(inputs));
    axios
      .post('http://localhost:5000/expenses', inputs, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log(response);
        alert('New expense added with success!');
        setInputs({
          created_at: '',
          description: '',
          category: '',
          value: ''
        });
      })
      .catch((error) => {
        console.error('Error deleting resource:', error);
        alert(`Error saving expense. Try again in a few minnutes. \n${error}`);
      });
  }
  return (
    <Grid container>
      <Grid item xs={5} style={{ minWidth: 400 }}>
        <MainCard>
          <form onSubmit={handleSubmit} id="expense-form">
            <Stack spacing={3}>
              <TextField
                id="created_at"
                placeholder="Date"
                value={inputs.created_at}
                type="date"
                helperText="Date"
                onChange={handleChange}
              />
              <TextField
                id="description"
                placeholder="Description"
                value={inputs.description}
                helperText="Description"
                onChange={handleChange}
              />
              <CategorySelect id="category" value={inputs.category} onChange={handleChange} />
              <NumberFormat
                id="value"
                placeholder="Value"
                value={inputs.value}
                type="float"
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                helperText="Value"
                prefix="US$"
                onChange={handleChange}
                customInput={TextField}
              />
              <Button variant="outlined" color="success" startIcon={<PlusCircleOutlined />} type="submit">
                Add Expense
              </Button>
            </Stack>
          </form>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default AddExpense;
