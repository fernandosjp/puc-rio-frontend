// material-ui
import { Grid } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import ExpensesTable from './ExpensesTable';

// ==============================|| SAMPLE PAGE ||============================== //

const ExpensesPage = () => {
  return (
    <Grid container rowSpacing={0.5} columnSpacing={1.0}>
      <Grid item xs={8} style={{ minWidth: 600 }}>
        <MainCard content={false}>
          <ExpensesTable />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default ExpensesPage;
