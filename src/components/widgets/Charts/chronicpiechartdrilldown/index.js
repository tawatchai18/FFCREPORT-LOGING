import React from 'react'
import { Helmet } from 'react-helmet'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import drilldow from 'highcharts/modules/drilldown'
import { Table, Collapse } from 'antd'

const { Panel } = Collapse

drilldow(Highcharts)
class Chart4 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickData: '',
      displayTable: [],
    }
  }

  render() {
    function callback(key) {
      console.log(key)
    }

    const { clickData, displayTable } = this.state

    const { submit, namehospital, chronicdilldown } = this.props
    const pp = chronicdilldown.group
    const po = chronicdilldown.drilldown
    if (pp !== undefined) {
      if (po !== undefined) {
        if (clickData !== '') {
          const displayTableTmp = []

          const test = pp.find(el => {
            return el.name === clickData
          })
          if (test) {
            const dataKey = test.drilldown
            const dataVal = po.find(el => {
              return el.name === dataKey
            })
            dataVal.data.map(item => {
              return displayTableTmp.push({ name: item.name, y: item.id })
            })
          }
          if (JSON.stringify(displayTableTmp) !== JSON.stringify(displayTable)) {
            this.setState({ displayTable: displayTableTmp })
          }
        }
        const chronic = pp.filter(member => {
          return member.y > 0
        })
        const chronicpie = chronic.map(object => ({
          name: object.name,
          y: object.y,
          drilldown: object.drilldown,
        }))

        // slice ให้ show แค่ลำดับที่ 0 -20
        const chronicslice = chronicpie.slice(0, 20)
        const chronictable = pp.map(object => ({
          name: object.name,
          y: object.y,
          drilldown: object.drilldown,
        }))

        const chronic1 = po.map(object => ({
          name: object.name,
          id: object.id,
          data: object.drilldown,
          data1: object.data,
        }))
        const p = chronic1.map(element => element.data1)
        p.forEach(index => {
          index.map(item => ({
            name: item.name,
            y: item.y,
          }))
        })
        const columns = [
          {
            title: 'ชื่อ',
            dataIndex: 'name',
            key: '1',
          },
          {
            title: 'จำนวน',
            dataIndex: 'y',
            key: '2',
            render: value => {
              return <span>{value.toLocaleString('en-US')}</span>
            },
          },
        ]

        Highcharts.setOptions({
          lang: {
            thousandsSep: ',',
            drillUpText: '◁ Back',
          },
        })

        const optionspyramid = {
          chart: {
            type: 'pie',
            style: {
              fontFamily: "'Kanit', sans-serif",
            },
            events: {
              click: e => {
                const event = e.path[2].toString()
                if (event.includes('SVG', 'rect', 0)) {
                  this.setState({ clickData: '' })
                }
              },
              drilldown: e => {
                this.setState({ clickData: e.point.name })
              },
            },
          },
          title: {
            text:
              namehospital !== ''
                ? `จำนวนผู้ป่วยโรคเรื้อรังแยกตามกลุ่มโรค</b></br><br/>${namehospital}`
                : 'จำนวนผู้ป่วยโรคเรื้อรังแยกตามกลุ่มโรค',
          },
          plotOptions: {
            series: {
              dataLabels: {
                enabled: true,
                format: '{point.name}',
              },
            },
          },

          tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>',
          },
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
            },
            // showInLegend: true
          },
          credits: {
            enabled: false,
          },
          series: [
            {
              name: 'จำนวน',
              colorByPoint: true,
              data: chronicslice,
            },
          ],
          drilldown: {
            series: chronic1,
          },
        }
        return (
          <div>
            <br />
            <br />
            <HighchartsReact
              allowPointSelect={false}
              highcharts={Highcharts}
              options={optionspyramid}
              onChange={submit}
            />
            <br />
            <br />
            {clickData === '' && (
              <Collapse onChange={callback}>
                <Panel defaultActiveKey="1" header="จำนวนผู้ป่วยโรคเรื้อรังแยกตามกลุ่มโรค" key="1">
                  <Table dataSource={chronictable} columns={columns} bordered />
                </Panel>
              </Collapse>
            )}
            {displayTable !== [] && clickData !== '' && (
              <Collapse onChange={callback}>
                <Panel defaultActiveKey="2" header={clickData} key="2">
                  <Table dataSource={displayTable} columns={columns} bordered />
                </Panel>
              </Collapse>
            )}
          </div>
        )
      }
    }
    return (
      <div>
        <Helmet title="Dashboard" />
      </div>
    )
  }
}

export default Chart4
