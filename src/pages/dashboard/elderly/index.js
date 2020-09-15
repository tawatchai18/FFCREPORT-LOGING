import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Radio, AutoComplete, Input, Icon, Row, Col, Drawer, Divider, Button } from 'antd'
import { Map, TileLayer, Marker, Popup, WMSTileLayer, LayersControl } from 'react-leaflet'
import L from 'leaflet'
import 'react-leaflet-fullscreen/dist/styles.css'
import FullscreenControl from 'react-leaflet-fullscreen'
import {
  MapData,
  CreatData,
  UserDatamap,
  houseMap,
} from '../../../components/system/Auth/Login/PostData'
// import 'react-leaflet-fullscreen-control'
import data1 from './data1'

const myIcon = L.icon({
  iconUrl: 'blue.png',
  iconSize: [0, 0],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

const greenIcon = L.icon({
  iconUrl: 'icongreen.png',
  iconSize: [35, 40],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
  // iconSize: [25, 30],
  // iconAnchor: [12.5, 41],
  // popupAnchor: [0, -41],
})

const yelloIcon = L.icon({
  iconUrl: 'yello.png',
  iconSize: [35, 40],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

const redIcon = L.icon({
  iconUrl: 'iconred.png',
  iconSize: [35, 40],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

class Elderly extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      geojson: [],
      houseaddress: [],
      house: [],
      lat: 13.520531624809204,
      lng: 100.00699460506439,
      submit: '',
      clickTag: '',
      visible: false,
      // selectedVillage: null
    }
    localStorage.clear()
    this.baseMaps = [
      {
        name: 'Google Satellite',
        url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
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

  setStore = d => {
    console.log('setstore')
    console.log(d, 'llll')
    localStorage.setItem('userUnit', JSON.stringify(d))
  }

  showDrawer = item => {
    const data = sessionStorage.getItem('userData')
    const dataJson = JSON.parse(data)
    const id = dataJson.user.orgId
    const houseid = item.properties.id
    console.log(item, 'kffk')
    console.log('show drawer')
    console.log(item.properties.id)
    this.setState({
      visible: true,
      // selectedVillage : item.properties.id
    })

    UserDatamap(id, dataJson.token, houseid).then(result => {
      this.setState({
        house: result,
      })
    })

    houseMap(id, dataJson.token, houseid).then(result => {
      this.setState({
        houseaddress: result.features,
      })
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
      // selectedVillage : null
    })
  }

  checkIdItems = e => {
    if (e.target.value === 1) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ clickTag: 'pingpong-normal' })
    } else if (e.target.value === 2) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ clickTag: 'pingpong-risk' })
    } else if (e.target.value === 3) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ clickTag: 'pingpong-0' })
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
    const { geojson, items, lat, lng, submit, clickTag, house, visible, houseaddress } = this.state
    const housenovillage = houseaddress.map(object => object.properties)
    const tawat = geojson.map(object => object.geometry)
    const aa12 = data1.map(item => item.properties)
    const monentFun = moment()
    const position = [lat, lng]
    console.log(items, tawat, houseaddress, 'พอไหม')

    function refreshPage() {
      window.location.reload(false)
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
          {/* <Input suffix={<Icon type="search" className="certain-category-icon" />} allowClear /> */}
        </AutoComplete>
      )
    }
    return (
      <div>
        <Helmet title="Dashboard: Crypto" />
        <div className="air__utils__heading">
          <h5>ผู้สูงอายุ</h5>
        </div>
        <Row>
          <Col span={8}>
            <Radio.Group onChange={this.checkIdItems}>
              <Radio value={1}>
                ติดสังคม&nbsp;
                <img src="home.png" alt="" width="20" height="20" />
              </Radio>
              <Radio value={2}>
                ติดบ้าน&nbsp;
                <img src="bed.png" alt="" width="20" height="20" />
              </Radio>
              <Radio value={3}>
                ติดเตียง&nbsp;
                <img src="social.png" alt="" width="20" height="20" />
              </Radio>
            </Radio.Group>
          </Col>
          <Col span={8} />
          <Col span={8}>
            {' '}
            <Complete />
          </Col>
        </Row>
        <br />
        <br />
        <Map
          style={{ width: '81vw', height: '70vh' }}
          center={position}
          zoom={14}
          // fullscreenControl
        >
          <FullscreenControl position="topleft" />
          {this.renderBaseLayerControl()}
          {data1.map(item => {
            console.log(item, 'iteml[fkmol')
            let markerIcon1 = myIcon
            if (submit) {
              if (
                item.properties.no + item.properties.villageName === submit &&
                item.properties.tag[0] === 'pingpong-normal'
              ) {
                markerIcon1 = greenIcon
              } else if (
                item.properties.no + item.properties.villageName === submit &&
                item.properties.tag[0] === 'pingpong-risk'
              ) {
                markerIcon1 = yelloIcon
              } else if (
                item.properties.no + item.properties.villageName === submit &&
                item.properties.tag[0] === 'pingpong-0'
              ) {
                markerIcon1 = redIcon
              }
            } else if (clickTag === item.properties.tag[0] && clickTag === 'pingpong-normal') {
              markerIcon1 = greenIcon
            } else if (clickTag === item.properties.tag[0] && clickTag === 'pingpong-risk') {
              markerIcon1 = yelloIcon
            } else if (clickTag === item.properties.tag[0] && clickTag === 'pingpong-0') {
              markerIcon1 = redIcon
            }
            return (
              // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
              <Marker
                onMouseOver={e => {
                  e.target.openPopup()
                }}
                onMouseOut={e => {
                  e.target.closePopup()
                }}
                onClick={() => this.showDrawer(item)}
                position={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}
                icon={markerIcon1}
              >
                <Popup>
                  <span>
                    <p>หมู่บ้าน:{item.properties.villageName}</p>
                    <p>บ้านเลขที่:{item.properties.no}</p>
                    <p>tag:{item.properties.tag}</p>
                  </span>
                </Popup>
                <Drawer
                  title={`${housenovillage.map(obj => obj.no)} ${housenovillage.map(
                    obj => obj.villageName,
                  )}`}
                  // title={`${houseaddress.no} ${houseaddress.villageName}`}
                  placement="right"
                  onClose={this.onClose}
                  visible={visible}
                  getContainer={false}
                  style={{ position: 'absolute', overflow: 'hidden', width: 240 }}
                >
                  <span>
                    {house.map(d => {
                      return (
                        <div>
                          <Row>
                            <Col>
                              <Link to="/dashboard/userdetail">
                                <Button onClick={() => this.setStore(d)}>
                                  {d.firstname}&nbsp;{d.lastname}&nbsp;อายุ&nbsp;
                                  {monentFun.diff(d.birthDate, 'years')}&nbsp;ปี
                                </Button>
                              </Link>
                              {/* <Link to="/dashboard/userdetail">{d.firstname}&nbsp;{d.lastname}&nbsp;อายุ&nbsp;{monentFun.diff(d.birthDate, 'years')}&nbsp;ปี</Link> */}
                            </Col>
                          </Row>
                          <Divider />
                        </div>
                      )
                    })}
                  </span>
                </Drawer>
              </Marker>
            )
          })}
        </Map>
      </div>
    )
  }
}
export default Elderly
