// material-ui
import {
  Grid
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ExpensesTable from './ExpensesTable';

// ==============================|| SAMPLE PAGE ||============================== //

const ExpensesPage = () => (
  <Grid container rowSpacing={0.5} columnSpacing={1.0}>
    <MainCard content={false}>
      <ExpensesTable />
    </MainCard>
  </Grid>
);

export default ExpensesPage;
