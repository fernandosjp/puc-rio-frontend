import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

// material-ui
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// assets
import { DeleteOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'created_at',
    align: 'center',
    disablePadding: false,
    label: 'Created at'
  },
  {
    id: 'id',
    align: 'center',
    disablePadding: false,
    label: 'ID'
  },
  {
    id: 'description',
    align: 'center',
    disablePadding: true,
    label: 'Description'
  },
  {
    id: 'category',
    align: 'center',
    disablePadding: true,
    label: 'Category'
  },
  {
    id: 'value_usd',
    align: 'center',
    disablePadding: true,
    label: 'Value USD'
  },
  {
    id: 'value_brl',
    align: 'center',
    disablePadding: true,
    label: 'Value BRL'
  },
  {
    id: 'action',
    align: 'center',
    disablePadding: false,
    label: 'Actions'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE ||============================== //

export default function ExpensesTable() {
  const [order] = useState('desc');
  const [orderBy] = useState('created_at');
  const [selected] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/expense_all')
      .then((res) => setExpenseList(res.data.expenses), [expenseList])
      .catch((error) => console.log(error));
  }, [expenseList]);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {expenseList.map((row, index) => {
              console.log('Expense desc: ' + row.description);
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;
              // Function to delete a expense
              const deleteProduct = () => {
                if (window.confirm(`Do you want to DELETE expense?`)) {
                  axios
                    .delete(`http://localhost:5000/expenses?id=${row.id}`)
                    .then((response) => {
                      console.log('Resource deleted successfully:', response.data);
                      alert(response.data.message);
                      // return (
                      //   <Alert variant="border" color="success">
                      //     response.data.message
                      //   </Alert>
                      // );
                    })
                    .catch((error) => {
                      console.error('Error deleting resource:', error);
                    });
                }
              };
              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <TableCell align="center">{row.created_at}</TableCell>
                  <TableCell component="th" id={labelId} scope="row" align="center">
                    <Link color="secondary" component={RouterLink} to="">
                      {row.id}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">{row.category}</TableCell>
                  <TableCell align="right">
                    <NumberFormat
                      value={row.value_usd}
                      displayType="text"
                      thousandSeparator
                      decimalScale={2}
                      fixedDecimalScale
                      prefix="US$ "
                    />
                  </TableCell>
                  <TableCell align="right">
                    <NumberFormat
                      value={row.value_brl}
                      displayType="text"
                      thousandSeparator
                      decimalScale={2}
                      fixedDecimalScale
                      prefix="R$ "
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton shape="rounded" color="error" onClick={deleteProduct}>
                      <DeleteOutlined />
                    </IconButton>
                    <IconButton shape="rounded" color="yellow" onClick={deleteProduct}>
                      <EditOutlined />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
