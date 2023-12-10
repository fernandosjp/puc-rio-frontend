import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// ==============================|| VALUE SPENT AREA CHART ||============================== //

const ValueSpentChart = ({ data }) => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);
  const [series, setSeries] = useState([]);
  const budget = 4000;

  useEffect(() => {
    setSeries([
      {
        name: 'Budget limit',
        type: 'line',
        data: Array(data['data'].length).fill(budget)
      },
      {
        name: 'Value in USD',
        type: 'area',
        data: data['data']
      }
    ]);
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.error.main, theme.palette.primary[200]],
      xaxis: {
        categories: data['categories'],
        labels: {
          style: {
            colors: [secondary]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: 11
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      stroke: {
        width: [2],
        curve: 'smooth',
        dashArray: [10, 0]
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      }
    }));
  }, [primary, secondary, line, theme, data]);

  return <ReactApexChart options={options} series={series} type="line" height={450} />;
};

ValueSpentChart.propTypes = {
  data: PropTypes.object
};

export default ValueSpentChart;
