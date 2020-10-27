import React from 'react'
import { Helmet } from 'react-helmet'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Table, Collapse } from 'antd'

const { Panel } = Collapse

class Chronicpiechart extends React.Component {
  render() {
    function callback(key) {
      console.log(key)
    }
    const { submit, namehospital, chronic } = this.props
    const pp = chronic.byIcd10

    if (pp !== undefined) {
      const result = pp.filter(member => {
        return member.y > 0
      })
      const chronicpiechart = result.map(object => ({
        name: object.name,
        y: object.y,
      }))
      const chronicslice = chronicpiechart.slice(0, 20)
      console.log(chronicpiechart.slice(0, 20), 'keysSorted')

      const chronicpie = pp.map(object => ({
        name: object.name,
        y: object.y,
      }))
      const columns = [
        {
          title: 'ชื่อ',
          dataIndex: 'name',
          key: '1',
        },
        {
          title: 'จำนวน',
          dataIndex: 'y',
          key: '1',
          render: value => {
            return <span>{value.toLocaleString('en-US')}</span>
          },
        },
      ]

      Highcharts.setOptions({
        lang: {
          thousandsSep: ',',
        },
      })
      const pieChartchronics = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
        },
        credits: {
          enabled: false,
        },
        colors: ['rgb(144, 237, 125)', 'rgb(247, 163, 92)', '#FF4560', '#333333', '#008FFB'],
        title: {
          // text: `ผู้ป่วยโรคเรื้อรัง</br></b><br/>${hospital}`
          text:
            namehospital !== ''
              ? `จำนวนผู้ป่วยโรคเรื้อรังแยกตามรายโรค</b></br><br/>${namehospital}`
              : 'จำนวนผู้ป่วยโรคเรื้อรังแยกตามรายโรค',
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b>',
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
            },
            // showInLegend: true
          },
        },
        series: [
          {
            name: 'จำนวน',
            colorByPoint: true,
            data: chronicslice,
          },
        ],
      }

      return (
        <div>
          <br />
          <br />
          <HighchartsReact highcharts={Highcharts} options={pieChartchronics} onChange={submit} />
          <Collapse onChange={callback}>
            <Panel header="จำนวนผู้ป่วยโรคเรื้อรังแยกตามรายโรค(กดดูรายละเอียด)" key="1">
              <Table dataSource={chronicpie} columns={columns} bordered />
            </Panel>
          </Collapse>
        </div>
      )
    }
    return (
      <div>
        <Helmet title="Dashboard: Analytics" />
      </div>
    )
  }
}

export default Chronicpiechart
