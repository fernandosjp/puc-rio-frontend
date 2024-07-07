import { useEffect, useState } from 'react';
import axios from 'axios';

// material-ui
import { Box, Grid, Typography } from '@mui/material';

// project import
import ValueSpentChart from './ValueSpentChart';
import TransactionsChart from './TransactionsChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [expenseStats, setExpenseStats] = useState({
    total_value_usd: 0,
    total_value_usd_perc: 0,
    total_value_brl: 0,
    total_value_brl_perc: 0,
    total_transactions: 0,
    total_transactions_perc: 0
  });
  const [statsSeries, setStatsSeries] = useState({
    transactions: { data: [0, 0, 0, 0], categories: [0, 0, 0, 0] },
    value_usd: { data: [0, 0, 0, 0], categories: [0, 0, 0, 0] },
    value_brl: { data: [0, 0, 0, 0], categories: [0, 0, 0, 0] }
  });

  // Cards Data
  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/expense_stats')
      .then((res) => setExpenseStats(res.data))
      .catch((error) => console.log(error));
  }, []);

  // Graphs Data
  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/expense_stats_timeseries')
      .then((res) => setStatsSeries(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>

      <Grid item xs={4}>
        <AnalyticEcommerce
          title="Total Spent in USD"
          count={parseFloat(expenseStats['total_value_usd'])}
          percentage={parseFloat(expenseStats['total_value_usd_perc'])}
          isLoss={expenseStats['total_value_usd_perc'] < 0}
          isMoney={true}
        />
      </Grid>
      <Grid item xs={4}>
        <AnalyticEcommerce
          title="Total Spent in BRL"
          count={parseFloat(expenseStats['total_value_brl'])}
          percentage={parseFloat(expenseStats['total_value_brl_perc'])}
          isLoss={expenseStats['total_value_brl_perc'] < 0}
          isMoney={true}
        />
      </Grid>
      <Grid item xs={4}>
        <AnalyticEcommerce
          title="Total Transactions"
          count={parseFloat(expenseStats['total_transactions'])}
          percentage={parseFloat(expenseStats['total_transactions_perc'])}
          isLoss={expenseStats['total_transactions'] < 0}
          isMoney={false}
        />
      </Grid>

      <Grid item xs={12} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}

      <Grid item xs={6}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Total Spent in USD per Month</Typography>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <ValueSpentChart data={statsSeries['value_usd']} budget={4000} />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={6}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Total Spent in BRL per Month</Typography>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <ValueSpentChart data={statsSeries['value_brl']} budget={20000} />
          </Box>
        </MainCard>
      </Grid>

      <Grid item xs={12} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 3 */}
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Total Transactions per Month</Typography>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <TransactionsChart data={statsSeries['transactions']} />
          </Box>
        </MainCard>
      </Grid>
      {/* <Grid item xs={6}>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <Typography variant="h5">{JSON.stringify(statsSeries)}</Typography>
          </Box>
        </MainCard>
      </Grid> */}
    </Grid>
  );
};

export default DashboardDefault;
