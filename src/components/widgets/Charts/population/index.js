import React from 'react'
import { Helmet } from 'react-helmet'
import moment from 'moment-timezone'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class Population extends React.Component {
  render() {
    const { submit, pyramid01, namehospital } = this.props
    const myArrStr = pyramid01.byAge
    console.log(myArrStr, 'lkjhgfๅๅ')

    if (myArrStr !== undefined) {
      const age = myArrStr.map(item => {
        return item.age
      })
      const female = myArrStr.map(item => {
        return item.female
      })
      const male = myArrStr.map(item => -Math.abs(item.male))
      const date = moment(pyramid01.date).tz('Asia/Bangkok')
      const othor = pyramid01.undefinedAge + pyramid01.undefinedSex

      Highcharts.setOptions({
        lang: {
          thousandsSep: ',',
        },
      })

      // ปิรามิดประชากร ทั้งหมด
      const optionspyramid = {
        chart: {
          type: 'bar',
          style: {
            fontFamily: "'Kanit', sans-serif",
          },
          // plotBackgroundImage: 'resources/images/bg_pop.png'
        },
        credits: {
          enabled: false,
        },
        colors: ['#008FFB', '#FF4560'],
        title: {
          text:
            namehospital !== ''
              ? `<h1>พีระมิดประชากร</h1></b></b></br><br/><h>${namehospital}</h>`
              : '<h1>พีระมิดประชากรทั้งหมด</h1>',
        },
        subtitle: {
          text: null,
        },
        xAxis: [
          {
            categories: age,
            reversed: false,
            labels: {
              step: 1,
            },
          },
          {
            // อายุอีกฝั่ง
            opposite: true,
            reversed: false,
            categories: age,

            linkedTo: 0,
            labels: {
              step: 1,
            },
          },
        ],
        yAxis: {
          title: {
            text: null,
          },
          labels: {
            formatter() {
              return Math.abs(this.value)
            },
          },
        },
        plotOptions: {
          series: {
            stacking: 'normal',
          },
        },
        lang: {
          thousandsSep: ',',
        },
        tooltip: {
          formatter() {
            return (
              `<b>${this.series.name}, ช่วงอายุ ${this.point.category}</b><br/>` +
              `จำนวน:${Highcharts.numberFormat(Math.abs(this.point.y), 0)}`
            )
          },
        },
        series: [
          {
            name: 'ชาย',
            data: male,
          },
          {
            name: 'หญิง',
            data: female,
          },
        ],
      }

      return (
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={optionspyramid}
            onChange={submit}
            style={{ width: '100%', height: '400px' }}
          />
          <div className="d-flex flex-wrap">
            <div className="mr-5 mb-2">
              <div className="text-nowrap text-uppercase text-gray-4">
                <div
                  className="air__utils__donut air__utils__donut"
                  style={{ borderColor: '#008ffb' }}
                />
                ชาย
              </div>
              <div className="font-weight-bold font-size-18 text-dark">
                {pyramid01.male.toLocaleString()}
              </div>
            </div>
            <div className="mr-5 mb-2">
              <div className="text-nowrap text-uppercase text-gray-4">
                <div className="air__utils__donut air__utils__donut--danger" />
                หญิง
              </div>
              <div className="font-weight-bold font-size-18 text-dark">
                {pyramid01.female.toLocaleString()}
              </div>
            </div>
            <div className="mr-5 mb-2">
              <div className="text-nowrap text-uppercase text-gray-4">
                <div
                  className="air__utils__donut air__utils__donut"
                  style={{ borderColor: '#333333' }}
                />
                ไม่ระบุ
              </div>
              <div className="font-weight-bold font-size-18 text-dark">
                {othor.toLocaleString()}
              </div>
            </div>
            <div className="mr-5 mb-2">
              <div className="text-nowrap text-uppercase text-gray-4">
                <div className="air__utils__donut air__utils__donut--success" />
                ประชากรทั้งหมด
              </div>
              <div className="font-weight-bold font-size-18 text-dark">
                {pyramid01.total.toLocaleString()}
              </div>
            </div>
            {/* <div className="mr-5 mb-2">
              <div className="text-nowrap text-uppercase text-gray-4">
                <div className="air__utils__donut air__utils__donut--success" />
                รพ.สต. ทั้งหมด
              </div>
              <div className="font-weight-bold font-size-18 text-dark">{length.toLocaleString()}</div>
            </div> */}
            <div className="mr-5 mb-2">
              <div className="text-nowrap text-uppercase text-gray-4">
                <div
                  className="air__utils__donut air__utils__donut"
                  style={{ borderColor: '#ffff99' }}
                />
                รายงานเมื่อ
              </div>
              <div className="font-weight-bold font-size-18 text-dark">
                {date.format('DD MMMM YYYY HH:mm:ss')}
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Helmet title="Dashboard" />
      </div>
    )
  }
}

export default Population
