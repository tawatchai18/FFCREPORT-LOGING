import React from 'react'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import ReactApexChart from 'react-apexcharts'
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import Chart from "react-apexcharts";
// import ApexCharts from 'apexcharts'

class BloodPressure extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { healthdetail, items } = this.props
    let systolic1
    if (Array.isArray(items)) {
      systolic1 = items.map(item => item.bloodPressure.systolic)
      console.log('abcd')
      console.log(systolic1)
    } else {
      systolic1 = Array.from([null])
    }
    let diastolic1
    if (Array.isArray(items)) {
      diastolic1 = items.map(item => item.bloodPressure.diastolic)
    } else {
      systolic1 = Array.from([null])
    }
    // console.log(healthdetail.endTime,'timeline');
    const time = moment(healthdetail.endTime).format('llll')
    console.log(time, 'moment')
    // console.log(healthdetail,'pongssklkjrnmklgm');

    const options = {
      yaxis: [
        {
          title: {
            text: 'ความดันตัวบน',
          },
          labels: {
            show: false,
            formatter: value => {
              return `${value || '-'} มิลลิเมตรปรอท`
            },
          },
          min: 0,
          max: 250,
        },
        {
          opposite: true,
          title: {
            text: 'ความดันตัวล่าง',
          },
          labels: {
            show: false,
            formatter: value => {
              return `${value || '-'} มิลลิเมตรปรอท`
            },
          },
          min: 0,
          max: 250,
        },
      ],
      xaxis: {
        labels: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        categories: [time],
      },
      tooltip: {
        x: {
          show: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      chart: {
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      colors: ['#4cd565', '#5ac8fb'],
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
        name: 'ความดันตัวบน',
        data: systolic1,
      },
      {
        name: 'ความดันตัวล่าง',
        data: diastolic1,
      },
    ]
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

export default BloodPressure
