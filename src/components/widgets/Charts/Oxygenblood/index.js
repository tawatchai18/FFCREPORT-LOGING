import React from 'react'
// import { Helmet } from 'react-helmet'
import moment from 'moment'
import ReactApexChart from 'react-apexcharts'

class Oxygen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { items, error, isLoaded } = this.props
    // console.log(items,'itemssssu');

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

    // const weigths = items.filter(item => item.weight !== undefined)

    const bloodPressures = items.filter(item => item.bloodPressure !== undefined)
    const times = bloodPressures.map(item => moment(item.endTime).format('L'))

    // console.log(bloodPressures.map(it => it.sugarLab),'มมมมม');
    let SugarLabs
    if (Array.isArray(bloodPressures)) {
      SugarLabs = bloodPressures.map(item => {
        if (item.sugarLab) {
          return item.sugarLab
        }
        return 0
      })
    }
    // console.log(SugarLabs,'test sugar');

    let respiratoryRates
    if (Array.isArray(bloodPressures)) {
      respiratoryRates = bloodPressures.map(item => {
        if (item.respiratoryRate) {
          return item.respiratoryRate
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
              return `${value} mg/dl(มิลลิกรัมต่อเดซิลิตร)`
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
              return `${value} ครั้ง/วินาที`
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
    }
    const series = [
      {
        name: 'ค่าน้ำตาลในเลือด',
        data: SugarLabs,
      },
      {
        name: 'อัตราการหายใจ',
        data: respiratoryRates,
      },
    ]

    return (
      <div id="chart">
        <ReactApexChart options={options} series={series} type="area" height={350} />
      </div>
    )
  }
}

export default Oxygen
