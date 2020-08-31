import React from 'react'
import { Helmet } from 'react-helmet'
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import Chart from "react-apexcharts";
// import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

class Oxygen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      options: {
        yaxis: [
          {
            title: {
              text: 'อัตราการหายใจ',
            },
            labels: {
              show: false,
              formatter: value => {
                return `${value || '-'} ครั้ง/นาที`
              },
            },
            min: 10,
            max: 130,
          },
          {
            opposite: true,
            title: {
              text: 'ความอิ่มตัวของออกซิเจนในเลือด',
            },
            labels: {
              show: false,
              formatter: value => {
                return `${value || '-'}%`
              },
            },
            min: 80,
            max: 100,
          },
        ],
        xaxis: {
          labels: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
          dataLabels: {
            enabled: true,
          },
        },
        tooltip: {
          x: {
            show: true,
          },
        },
        chart: {
          toolbar: {
            show: false,
          },
        },
        colors: ['#c10015', '#5855d6'],
        stroke: {
          curve: 'smooth',
          width: 4,
        },
        fill: {
          type: 'solid',
          opacity: [0.35, 0.2],
        },
      },
      series: [
        {
          name: 'อัตราการหายใจ',
          data: [75, 50 || null],
        },
        {
          name: 'ความอิ่มตัวของออกซิเจนในเลือด',
          data: [80, 90 || null],
        },
      ],
    }
  }

  render() {
    const { options, series } = this.state
    const { healthdetail } = this.props
    console.log(healthdetail, 'pongssklkjrnmklgm')

    return (
      <div>
        <Helmet title="Dashboard" />
        <div id="chart">
          <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
      </div>
    )
  }
}

export default Oxygen
