import React from 'react'
import { Helmet } from 'react-helmet'
import { AutoComplete, Input, Icon, Row, Col, Select, Form, InputNumber } from 'antd'
import { Map, TileLayer, Marker, Popup, WMSTileLayer, LayersControl } from 'react-leaflet'
import L from 'leaflet'
import { MapData, CreatData } from '../../../components/system/Auth/Login/PostData'
import 'react-leaflet-fullscreen-control'
import data1 from './data1'

const { Option } = Select

const myIcon = L.icon({
  iconUrl: 'blue.png',
  iconSize: [0, 0],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, 0],
  // iconSize: [25, 30],
  // iconAnchor: [12.5, 41],
  // popupAnchor: [0, -41]
})
const writhIcon = L.icon({
  iconUrl: 'writh.png',
  iconSize: [25, 30],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})
const greenIcon = L.icon({
  iconUrl: 'icongreen.png',
  iconSize: [25, 30],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

const yelloIcon = L.icon({
  iconUrl: 'yello.png',
  iconSize: [25, 30],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

const orangeIcon = L.icon({
  iconUrl: 'orange.png',
  iconSize: [25, 30],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

const redIcon = L.icon({
  iconUrl: 'iconred.png',
  iconSize: [25, 30],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

const blackIcon = L.icon({
  iconUrl: 'back.png',
  iconSize: [25, 30],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

const greenplushIcon = L.icon({
  iconUrl: 'greenplus.png',
  iconSize: [25, 30],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

class pingpong extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      geojson: [],
      lat: 13.520531624809204,
      lng: 100.00699460506439,
      submit: '',
      clickTag: '',
      click: '',
      checkVillage: '',
    }
    localStorage.clear()
    this.baseMaps = [
      {
        name: 'Google Satellite',
        url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        // minZoom: 2,
        // maxZoom: 19,
        attribution: '&copy; Google',
        type: 'tile',
        checked: true,
      },
      {
        name: 'OpenStreet Map',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
        type: 'tile',
      },
    ]
  }

  componentDidMount() {
    const data = sessionStorage.getItem('userData')
    const dataJson = JSON.parse(data)
    console.log(dataJson, 'บอริ่ง')
    const id = dataJson.user.orgId

    CreatData(id, dataJson.token).then(result => {
      this.setState({
        items: result,
      })
    })

    MapData(id, dataJson.token).then(result => {
      this.setState({
        geojson: result.features,
      })
    })
  }

  checkIdItems = e => {
    console.log('asdfghjkl')
    console.log(e)
    if (e === 7) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ clickTag: 'pingpong-normal', click: 'ปกติ' })
    } else if (e === 6) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ clickTag: 'pingpong-risk', click: 'ดูแลตัวเองได้' })
    } else if (e === 5) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ clickTag: 'pingpong-0', click: 'กลุ่มเสี่ยงสูง' })
    } else if (e === 4) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ clickTag: 'pingpong-1', click: 'ป่วย(อ่อน)' })
    } else if (e === 3) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ clickTag: 'pingpong-2', click: 'ป่วย(ปานกลาง)' })
    } else if (e === 2) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ clickTag: 'pingpong-3', click: 'ป่วย(รุนแรง)' })
    } else if (e === 1) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ clickTag: 'pingpong-black', click: 'ป่วยรุนแรง(โรคแทรกซ้อน)' })
    }
  }

  checkVillage = e => {
    console.log('villageclick')
    console.log(e)
    if (e) {
      this.setState({ checkVillage: 'pingpong-normal' })
    } else if (e) {
      this.setState({ checkVillage: 'pingpong-risk' })
    } else if (e) {
      this.setState({ checkVillage: 'pingpong-0' })
    } else if (e) {
      this.setState({ checkVillage: 'pingpong-1' })
    } else if (e) {
      this.setState({ checkVillage: 'pingpong-2' })
    } else if (e) {
      this.setState({ checkVillage: 'pingpong-3' })
    } else if (e) {
      this.setState({ checkVillage: 'pingpong-black' })
    }
  }

  renderBaseLayerControl() {
    return (
      <LayersControl position="topleft">
        {this.baseMaps.map(({ name, url, attribution, type, layer, format, checked = false }) => {
          return type === 'wms' ? (
            <LayersControl.BaseLayer key={name} name={name} checked={checked}>
              <WMSTileLayer
                layers={layer}
                format={format}
                transparent={false}
                url={url}
                attribution={attribution}
              />
            </LayersControl.BaseLayer>
          ) : (
            <LayersControl.BaseLayer key={name} name={name} checked={checked}>
              <TileLayer attribution={attribution} url={url} />
            </LayersControl.BaseLayer>
          )
        })}
      </LayersControl>
    )
  }

  render() {
    const { geojson, items, lat, lng, submit, clickTag, click, checkVillage } = this.state
    const tawat = geojson.map(object => object.geometry)
    const mark = data1.map(item => item.geometry)
    const aa12 = data1.map(item => item.properties)
    const housename = aa12.map(object => object.villageName)
    const mySet = new Set(housename)
    const set1 = Array.from(mySet)
    console.log(set1, 'มาสิ')
    const position = [lat, lng]
    console.log(items, tawat, mark, click, checkVillage, 'พอไหม')

    function refreshPage() {
      window.location.reload(false)
    }

    const MakeItem = X => {
      return <Option value={X}>{X}</Option>
    }

    const FormSizeDemo = () => {
      return (
        <>
          <Form labelCol={{ span: 2 }} wrapperCol={{ span: 20 }} layout="horizontal">
            <Form.Item label="กลุ่ม">
              <Select onChange={this.checkIdItems} defaultValue={click}>
                <Select.Option value={1}>
                  <img src="circleblack.png" alt="" width="20" height="20" />{' '}
                  ป่วยรุนแรง(โรคแทรกซ้อน)
                </Select.Option>
                <Select.Option value={2}>
                  <img src="circlered.png" alt="" width="20" height="20" /> ป่วย(รุนแรง)
                </Select.Option>
                <Select.Option value={3}>
                  <img src="circleorange.png" alt="" width="20" height="20" /> ป่วย(ปานกลาง)
                </Select.Option>
                <Select.Option value={4}>
                  <img src="circleyello.png" alt="" width="20" height="20" /> ป่วย(อ่อน)
                </Select.Option>
                <Select.Option value={5}>
                  <img src="circlegreenplush.png" alt="" width="20" height="20" /> กลุ่มเสี่ยงสูง
                </Select.Option>
                <Select.Option value={6}>
                  <img src="circlegreen.png" alt="" width="20" height="20" /> ดูแลตัวเองได้
                </Select.Option>
                <Select.Option value={7}>
                  <img src="circle.png" alt="" width="20" height="20" />
                  ปกติ
                </Select.Option>
                <Select.Option value={8}>ไม่ได้ตรวจ</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </>
      )
    }

    const Complete = () => {
      return (
        <AutoComplete
          style={{ width: 350, Color: '#000' }}
          onSelect={val => {
            this.setState({ submit: val })
          }}
          dataSource={aa12.map(object => object.no + object.villageName)}
          defaultValue={submit}
          placeholder="บ้านเลขที่ / หมู่บ้าน"
          filterOption={(inputValue, option) =>
            option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        >
          <Input
            suffix={<Icon type="search" onClick={refreshPage} className="certain-category-icon" />}
            allowClear
          />
        </AutoComplete>
      )
    }
    return (
      <div>
        <Helmet title="Dashboard: Crypto" />
        <div className="air__utils__heading">
          <Row>
            <Col span={23}>
              <h5>ปิงปองจราจร 7 สี</h5>
            </Col>
          </Row>
        </div>
        <Row>
          <Col span={16} />
          <Col span={8}>
            <Complete />
          </Col>
        </Row>
        <Row>
          <p style={{ color: 'red' }}>ประเมินความเสี่ยง DM/HT</p>
          <Col span={10}>
            <FormSizeDemo />
          </Col>
          <Col span={8}>
            <Form layout="inline">
              <Form.Item label="หมู่บ้าน">
                <Select style={{ width: 300 }} onChange={this.checkVillage}>
                  {set1.map(MakeItem)}
                </Select>
              </Form.Item>
            </Form>
          </Col>
          <Col span={6}>
            <Form layout="inline">
              <Form.Item label="อายุ">
                <InputNumber min={1} max={100} defaultValue={30} />
                &nbsp; ขึ้นไป
              </Form.Item>
            </Form>
          </Col>
        </Row>
        {/* <Complete /> */}
        <br />
        <Map
          style={{ width: '81vw', height: '70vh' }}
          center={position}
          zoom={14}
          fullscreenControl
        >
          {this.renderBaseLayerControl()}
          {data1.map(item => {
            let markerIcon1 = myIcon
            if (submit) {
              if (
                item.properties.no + item.properties.villageName === submit &&
                item.properties.tag[0] === 'pingpong-normal'
              ) {
                markerIcon1 = writhIcon
              } else if (
                item.properties.no + item.properties.villageName === submit &&
                item.properties.tag[0] === 'pingpong-risk'
              ) {
                markerIcon1 = greenIcon
              } else if (
                item.properties.no + item.properties.villageName === submit &&
                item.properties.tag[0] === 'pingpong-0'
              ) {
                markerIcon1 = greenplushIcon
              } else if (
                item.properties.no + item.properties.villageName === submit &&
                item.properties.tag[0] === 'pingpong-1'
              ) {
                markerIcon1 = yelloIcon
              } else if (
                item.properties.no + item.properties.villageName === submit &&
                item.properties.tag[0] === 'pingpong-2'
              ) {
                markerIcon1 = orangeIcon
              } else if (
                item.properties.no + item.properties.villageName === submit &&
                item.properties.tag[0] === 'pingpong-3'
              ) {
                markerIcon1 = redIcon
              } else if (
                item.properties.no + item.properties.villageName === submit &&
                item.properties.tag[0] === 'pingpong-black'
              ) {
                markerIcon1 = blackIcon
              }
            }
            // if (submit) {
            //   if (item.properties.villageName === submit) {
            //     markerIcon1 = writhIcon
            //   }
            // }
            else if (
              clickTag === item.properties.tag[0] &&
              clickTag === 'pingpong-normal' &&
              click === 'ปกติ'
            ) {
              markerIcon1 = writhIcon
            } else if (
              clickTag === item.properties.tag[0] &&
              clickTag === 'pingpong-risk' &&
              click === 'ดูแลตัวเองได้'
            ) {
              markerIcon1 = greenIcon
            } else if (
              clickTag === item.properties.tag[0] &&
              clickTag === 'pingpong-0' &&
              click === 'กลุ่มเสี่ยงสูง'
            ) {
              markerIcon1 = greenplushIcon
            } else if (
              clickTag === item.properties.tag[0] &&
              clickTag === 'pingpong-1' &&
              click === 'ป่วย(อ่อน)'
            ) {
              markerIcon1 = yelloIcon
            } else if (
              clickTag === item.properties.tag[0] &&
              clickTag === 'pingpong-2' &&
              click === 'ป่วย(ปานกลาง)'
            ) {
              markerIcon1 = orangeIcon
            } else if (
              clickTag === item.properties.tag[0] &&
              clickTag === 'pingpong-3' &&
              click === 'ป่วย(รุนแรง)'
            ) {
              markerIcon1 = redIcon
            } else if (
              clickTag === item.properties.tag[0] &&
              clickTag === 'pingpong-black' &&
              click === 'ป่วยรุนแรง(โรคแทรกซ้อน)'
            ) {
              markerIcon1 = blackIcon
            } else if (
              checkVillage === item.properties.tag[0] &&
              checkVillage === 'pingpong-normal'
            ) {
              markerIcon1 = writhIcon
            } else if (
              checkVillage === item.properties.tag[0] &&
              checkVillage === 'pingpong-risk'
            ) {
              markerIcon1 = greenIcon
            } else if (checkVillage === item.properties.tag[0] && checkVillage === 'pingpong-0') {
              markerIcon1 = greenplushIcon
            } else if (checkVillage === item.properties.tag[0] && checkVillage === 'pingpong-1') {
              markerIcon1 = yelloIcon
            } else if (checkVillage === item.properties.tag[0] && checkVillage === 'pingpong-2') {
              markerIcon1 = orangeIcon
            } else if (checkVillage === item.properties.tag[0] && checkVillage === 'pingpong-3') {
              markerIcon1 = redIcon
            } else if (
              checkVillage === item.properties.tag[0] &&
              checkVillage === 'pingpong-black'
            ) {
              markerIcon1 = blackIcon
            }
            return (
              <Marker
                position={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}
                icon={markerIcon1}
              >
                <Popup>
                  <span>
                    <p>หมู่บ้าน:{item.properties.villageName}</p>
                    <p>บ้านเลขที่:{item.properties.no}</p>
                    <p>tag:{item.properties.tag}</p>
                    <p>รพ.สต.:{item.properties.id}</p>
                  </span>
                </Popup>
              </Marker>
            )
          })}
        </Map>
      </div>
    )
  }
}
export default pingpong
