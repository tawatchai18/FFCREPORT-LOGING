import React from 'react'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import ReactApexChart from 'react-apexcharts'

class Heartrate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

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
    const times = bloodPressures.map(item => moment(item.endTime).format('L'))

    let pulseRate1
    if (Array.isArray(bloodPressures)) {
      pulseRate1 = bloodPressures.map(item => {
        if (item.pulseRate) {
          return item.pulseRate
        }
        return 0
      })
    } else {
      pulseRate1 = Array.from([null])
    }

    let bodyTemperature1
    if (Array.isArray(bloodPressures)) {
      bodyTemperature1 = bloodPressures.map(item => {
        if (item.bodyTemperature) {
          return item.bodyTemperature
        }
        return 0
      })
    } else {
      pulseRate1 = Array.from([null])
    }

    const options = {
      yaxis: [
        {
          // title: {
          //   text: 'อุณหภูมิ',
          // },
          labels: {
            show: false,
            formatter: value => {
              return `${value || '-'} °C`
            },
          },
          min: 0,
          max: 130,
        },
        {
          opposite: true,
          // title: {
          //   text: 'อัตราการเต้นของหัวใจ',
          // },
          labels: {
            show: false,
            formatter: value => {
              return `${value || '-'} ครั้ง/นาที`
            },
          },
          min: 0,
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
        categories: times,
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
