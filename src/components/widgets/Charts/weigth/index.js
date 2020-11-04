import React from 'react'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import ReactApexChart from 'react-apexcharts'

class Weigth extends React.Component {
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
      return <div>no data</div>
    }
    if (items.code === 404) {
      return <div>no data</div>
    }

    const weigths = items.filter(item => item.weight !== undefined)
    const heights1 = items.filter(item => item.height !== undefined)
    // const times = items.map(item => moment(item.endTime).format('L'))
    const times = items.map(item => moment(item.endTime).format('DD MMMM YYYY HH:mm:ss'))

    let weights
    if (Array.isArray(weigths)) {
      weights = weigths.map(item => {
        if (item.weight) {
          return item.weight
        }
        return 0
      })
    }

    // let Times
    // if(Array.isArray(items)){
    //   Times = items.map((item) => {
    //     if(item.bloodPressure){
    //       return  moment(item.bloodPressure.endTime).format('L')
    //     }
    //     return 0;})
    // }

    let heights
    if (Array.isArray(heights1)) {
      heights = heights1.map(item => {
        if (item.height) {
          return item.height
        }
        return 0
      })
    }

    const options = {
      yaxis: [
        {
          // title: {
          //   text: 'ค่าน้ำตาลในเลือด',
          // },
          labels: {
            show: false,
            formatter: value => {
              return `${value} กิโลกรัม`
            },
          },
          min: 0,
          max: 500,
        },
        {
          opposite: true,
          labels: {
            show: false,
            formatter: value => {
              return `${value} เซนติเมตร`
            },
          },
          min: 0,
          max: 500,
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
        name: 'น้ำหนัก',
        data: weights,
      },
      {
        name: 'ส่วนสูง',
        data: heights,
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

export default Weigth
