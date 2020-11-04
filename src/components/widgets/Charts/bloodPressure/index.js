import React from 'react'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import ReactApexChart from 'react-apexcharts'

class BloodPressure extends React.Component {
  render() {
    const { items, error, isLoaded } = this.props

    if (error) {
      return <div>Error: {error.message}</div>
    }
    if (isLoaded) {
      return <div>Loading...</div>
    }

    if (items === undefined) {
      return <div>no data</div>
    }
    if (items.length === 0) {
      return <div>nodata0</div>
    }
    if (items.code === 404) {
      return <div>no data</div>
    }

    const bloodPressures = items.filter(item => item.bloodPressure !== undefined)

    let systolic1
    if (Array.isArray(bloodPressures)) {
      systolic1 = bloodPressures.map(item => {
        if (item.bloodPressure) {
          return item.bloodPressure.systolic
        }
        return 0
      })
    } else {
      systolic1 = Array.from([null])
    }

    let diastolic1
    if (Array.isArray(bloodPressures)) {
      diastolic1 = bloodPressures.map(item => {
        if (item.bloodPressure) {
          return item.bloodPressure.diastolic
        }
        return 0
      })
    } else {
      diastolic1 = Array.from([null])
    }

    const times = bloodPressures.map(item => moment(item.endTime).format('DD MMMM YYYY HH:mm:ss'))
    console.log(diastolic1, systolic1, times, 'log this')
    const options = {
      yaxis: [
        {
          // title: {
          //   text: 'ความดันตัวบน',
          // },
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
          // title: {
          //   text: 'ความดันตัวล่าง',
          // },
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
        categories: times,
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
