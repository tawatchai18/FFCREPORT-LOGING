import React from 'react'
import { Helmet } from 'react-helmet'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class ADL extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     user: []
  //   }
  // }

  // componentDidMount() {
  //   // กราฟ ปิรามิด
  //   fetch(`http://localhost:7000/report/elderlyrat`)
  //     .then(res => res.json())
  //     .then(json => {
  //       this.setState({
  //         user: json
  //       });
  //     }
  //     )
  // }

  render() {
    // const { user } = this.state
    const { submit, namehospital, user } = this.props
    const active = user.byActive
    if (active !== undefined) {
      const data1 = active.map(object => ({
        name: object.name,
        y: object.peple,
      }))

      Highcharts.setOptions({
        lang: {
          thousandsSep: ',',
        },
      })

      const pieChartelderly = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
        },
        credits: {
          enabled: false,
        },
        colors: ['rgb(144, 237, 125)', 'rgb(247, 163, 92)', '#FF4560', '#333333'],
        title: {
          text:
            namehospital !== ''
              ? `กลุ่มผู้สูงอายุ 60 ปีขึ้นไป</b></br><br/>(ที่ได้รับการประเมิน ADL แล้ว)</b></br><br/>${namehospital}`
              : `กลุ่มผู้สูงอายุ 60 ปีขึ้นไป</b></br><br/>(ที่ได้รับการประเมิน ADL แล้ว)</br></br><br/>หน่วยงานทั้งหมด`,
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            },
          },
        },
        series: [
          {
            name: 'จำนวน',
            colorByPoint: true,
            data: data1,
          },
        ],
      }
      return (
        <div>
          {/* {(pieChartelderly !== 0) && ()} */}
          <HighchartsReact
            highcharts={Highcharts}
            options={pieChartelderly}
            onChange={submit}
            style={{ width: '100%', height: '400px' }}
          />
          <div className="d-flex flex-wrap">
            <div className="mr-4 mb-2">
              <div className="text-nowrap text-uppercase text-gray-4">
                <div
                  className="air__utils__donut air__utils__donut"
                  style={{ borderColor: 'rgb(144, 237, 125)' }}
                />
                ติดสังคม
              </div>
              <div className="font-weight-bold font-size-18 text-dark">
                {user.OK.toLocaleString()}
              </div>
            </div>
            <div className="mr-4 mb-2">
              <div className="text-nowrap text-uppercase text-gray-4">
                <div
                  className="air__utils__donut air__utils__donut"
                  style={{ borderColor: 'rgb(247, 163, 92)' }}
                />
                ติดบ้าน
              </div>
              <div className="font-weight-bold font-size-18 text-dark">
                {user.MID.toLocaleString()}
              </div>
            </div>
            <div className="mr-4 mb-2">
              <div className="text-nowrap text-uppercase text-gray-4">
                <div
                  className="air__utils__donut air__utils__donut"
                  style={{ borderColor: '#FF4560' }}
                />
                ติดเตียง
              </div>
              <div className="font-weight-bold font-size-18 text-dark">
                {user.VERYHI.toLocaleString()}
              </div>
            </div>
            {/* <div className="mr-4 mb-2">
              <div className="text-nowrap text-uppercase text-gray-4">
                <div className="air__utils__donut air__utils__donut" style={{ borderColor: '#333333' }} />
                ไม่ระบุ
              </div>
              <div className="font-weight-bold font-size-18 text-dark">{user.UNKNOWN.toLocaleString()}</div>
            </div> */}
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

export default ADL
