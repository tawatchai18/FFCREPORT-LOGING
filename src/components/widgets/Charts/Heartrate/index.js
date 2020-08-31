import React from 'react'
import { Helmet } from 'react-helmet'
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import Chart from "react-apexcharts";
// import ApexCharts from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

class Heartrate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { healthdetail, items } = this.props
    console.log(healthdetail, items, 'hartbeat')
    let pulseRate1
    if (Array.isArray(items)) {
      pulseRate1 = items.map(item => item.pulseRate)
    } else {
      pulseRate1 = Array.from([null])
    }
    let bodyTemperature1
    if (Array.isArray(items)) {
      bodyTemperature1 = items.map(item => item.bodyTemperature)
    } else {
      bodyTemperature1 = Array.from([null])
    }

    const options = {
      yaxis: [
        {
          title: {
            text: 'อุณหภูมิ',
          },
          labels: {
            show: false,
            formatter: value => {
              return `${value || '-'} °C`
            },
          },
          min: 10,
          max: 130,
        },
        {
          opposite: true,
          title: {
            text: 'อัตราการเต้นของหัวใจ',
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
      colors: ['#fa9402', '#0c7aff'],
      stroke: {
        curve: 'smooth',
        width: 4,
      },
      fill: {
        type: 'solid',
        opacity: [0.35, 0.2],
      },
    }
    const series = [
      {
        name: 'อุณหภูมิ',
        data: bodyTemperature1,
      },
      {
        name: 'อัตราการเต้นของหัวใจ',
        data: pulseRate1,
      },
    ]

    return (
      <div>
        <Helmet title="Dashboard" />
        <div id="chart">
          <ReactApexChart options={options} series={series} type="area" />
        </div>
      </div>
    )
  }
}

export default Heartrate
