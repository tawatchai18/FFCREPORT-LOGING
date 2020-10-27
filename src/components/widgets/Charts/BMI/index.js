import React from 'react'
import { Popover, Table } from 'antd'
import ReactApexChart from 'react-apexcharts'

class BMI extends React.Component {
  componentDidMount() {}

  render() {
    const { healthdetail, error, isLoaded } = this.props

    if (error) {
      return <div>Error: {error.message}</div>
    }
    if (isLoaded) {
      return <div>Loading...</div>
    }

    const weigths = healthdetail.weight
    const heightSquared = ((healthdetail.height / 100) * healthdetail.height) / 100
    const bmi = weigths / heightSquared
    let bmisuccess = Math.round(bmi * 100) / 100
    if (Number.isNaN(bmisuccess)) {
      bmisuccess = 0
    }

    let message
    if (bmisuccess === 0) {
      message = <h>no data</h>
    } else if (bmisuccess < 18.5) {
      message = <h style={{ color: '#63fe44f2' }}>ผอม</h>
    } else if (bmisuccess >= 18.5 && bmisuccess <= 22.99) {
      message = <h style={{ color: '#16af47e6' }}>น้ำหนักปกติ</h>
    } else if (bmisuccess >= 23 && bmisuccess <= 24.99) {
      message = <h style={{ color: '#f0ff00f2' }}>น้ำหนักเกิน</h>
    } else if (bmisuccess >= 25 && bmisuccess <= 29.99) {
      message = <h style={{ color: '#ffb600f2' }}>อ้วน</h>
    } else if (bmisuccess >= 30) {
      message = <h style={{ color: '#ff000099' }}>อ้วนมาก</h>
    }

    const series = [bmisuccess]
    const options = {
      chart: {
        type: 'radialBar',
        offsetY: -20,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: '#e7e7e7',
            strokeWidth: '97%',
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: '#999',
              opacity: 1,
              blur: 2,
            },
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              formatter(val) {
                return val
              },
              offsetY: -2,
              fontSize: '30px',
            },
          },
        },
      },
      grid: {
        padding: {
          top: -10,
        },
      },
      fill: {
        colors: [
          ({ value }) => {
            if (value < 18.5) {
              return '#63fe44f2'
              // eslint-disable-next-line no-else-return
            } else if (value >= 18.5 && value <= 22.99) {
              return '#16af47e6'
            } else if (value >= 23 && value <= 24.99) {
              return '#f0ff00f2'
            } else if (value >= 25 && value <= 29.99) {
              return '#ffb600f2'
            }
            return '#ff000099'
          },
        ],
      },
      // fill: {
      //   type: 'gradient',
      //   gradient: {
      //     shade: 'light',
      //     colors:['red'],
      //     shadeIntensity: 0.4,
      //     inverseColors: false,
      //     opacityFrom: 1,
      //     opacityTo: 1,
      //     stops: [0, 50, 53, 91]
      //   },
      // },
    }
    const dataSource = [
      {
        key: '1',
        name: 'น้อยกว่า 18.50',
        age: 'ผอม',
        // ans: ' ผอม ซึ่งอาจจะเกิดจากการได้รับสารอาหารไม่เพียงพอ วิธีแก้ไข ต้องรับประทานอาหารที่มีคุณภาพและมีปริมาณพลังงานเพียงพอ และออกกำลังกายอย่างเหมาะสม'
      },
      {
        key: '2',
        name: '18.50 - 22.99',
        age: 'น้ำหนักปกติ',
        // ans: 'ปกติ มีปริมาณไขมันอยู่ในเกณฑ์ปกติ มักจะไม่ค่อยมีโรคร้าย อุบัติการณ์ของโรคเบาหวานความดันโลหิตสูงต่ำกว่าผู้ที่อ้วนกว่า'
      },
      {
        key: '3',
        name: '23 - 24.99',
        age: 'น้ำหนักเกิน',
        // ans: 'น้ำหนักเกิน เป็นกลุ่มผู้ที่มีความอ้วนอยู่บ้าง หากประวัติคนในครอบครัวเคยเป็นโรคเบาหวานและความดันโลหิตสูง ก็ถือว่ายังมีความเสี่ยงมากกว่าคนปกติ'
      },
      {
        key: '4',
        name: '25 - 29.99',
        age: 'อ้วน',
        // ans: 'อ้วน มีความเสี่ยงต่อโรคเบาหวาน โรคความดันโลหิตสูง โรคหัวใจ และโรคหลอดเลือด ควรลดอาหารหวานข้าว และอาหารที่มีใขมันสูง'
      },
      {
        key: '5',
        name: 'มากกว่า 30',
        age: 'อ้วนมาก',
        // ans: 'อ้วนมาก ค่อนข้างอันตราย เพราะเข้าเกณฑ์อ้วนมาก เสี่ยงต่อการ เกิดโรคร้ายแรงที่แฝงมากับความอ้วน หากค่า BMI อยู่ในระดับนี้ จะต้องระวังการรับประทานไขมัน และควรออกกำลังกายอย่างสม่ำเสมอ'
      },
    ]

    const columns = [
      {
        title: 'BMI kg/m2',
        dataIndex: 'name',
        key: 'BMI kg/m2',
      },
      {
        title: 'อยู่ในเกณท์',
        dataIndex: 'age',
        key: 'age',
      },
      // {
      //   title: '',
      //   dataIndex: 'ans',
      //   key: 'ans',
      // },
    ]

    const content = (
      <div>
        <Table
          style={{ width: 500 }}
          pagination={false}
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    )

    return (
      <div className="card air__utils__cardMarked air__utils__cardMarked--primary">
        <div className="card-header card-header-flex">
          <div className="d-flex flex-column justify-content-center mr-auto">
            <h5 className="mb-0">ค่าดัชนีมวลกาย(BMI):&nbsp;&nbsp;{message}</h5>
          </div>
          <div className="d-flex flex-column justify-content-center">
            <Popover placement="bottomRight" content={content} title="ค่าดัชนีมวลกาย">
              <button type="button" className="btn btn-light">
                {/* <i className="fe fe-more-vertical" /> */}
                รายละเอียด
              </button>
            </Popover>
          </div>
        </div>
        <div className="card-body">
          <div id="chart">
            <ReactApexChart options={options} series={series} type="radialBar" />
          </div>
        </div>
      </div>
    )
  }
}

export default BMI
