import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import Footer from 'components/layout/Footer'
import { Radio, AutoComplete, Input, Icon, Drawer, Row, Col, Divider, Button } from 'antd'
import { Map, TileLayer, Marker, WMSTileLayer, LayersControl, Popup } from 'react-leaflet'
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

const redIcon = L.icon({
  iconUrl: 'iconred.png',
  iconSize: [35, 40],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

const violetIcon = L.icon({
  iconUrl: 'violet.png',
  iconSize: [35, 40],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

const mapStateToProps = ({ settings }) => ({ settings })
@connect(mapStateToProps)
class Symptom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      geojson: [],
      house: [],
      person: [],
      houseaddress: [],
      lat: 13.520531624809204,
      lng: 100.00699460506439,
      submit: '',
      clickTag: '',
      visible: false,
      selectedVillage: null,
      isLoaded: false,
      error: null,
    }
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
    const id = dataJson.user.orgId
    // eslint-disable-next-line react/destructuring-assignment

    CreatData(id, dataJson.token).then(
      result => {
        this.setState({
          items: result,
          isLoaded: true,
        })
      },
      error => {
        this.setState({
          isLoaded: true,
          error,
        })
      },
    )

    MapData(id, dataJson.token).then(
      result => {
        this.setState({
          geojson: result.features,
          isLoaded: true,
        })
      },
      error => {
        this.setState({
          isLoaded: true,
          error,
        })
      },
    )
  }

  toggleSettings = () => {
    const { dispatch, settings } = this.props
    const { isSidebarOpen } = settings
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isSidebarOpen',
        value: !isSidebarOpen,
      },
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
    this.setState(
      {
        visible: true,
        selectedVillage: item.properties.id,
        isLoaded: true,
      },
      error => {
        this.setState({
          isLoaded: true,
          error,
        })
      },
    )

    UserDatamap(id, dataJson.token, houseid).then(
      result => {
        this.setState({
          house: result,
          isLoaded: true,
        })
      },
      error => {
        this.setState({
          isLoaded: true,
          error,
        })
      },
    )

    houseMap(id, dataJson.token, houseid).then(
      result => {
        this.setState({
          houseaddress: result.features,
          isLoaded: true,
        })
      },
      error => {
        this.setState({
          isLoaded: true,
          error,
        })
      },
    )
  }

  onClose = () => {
    this.setState({
      visible: false,
      selectedVillage: null,
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
    } else if (e.target.value === 4) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ clickTag: 'pingpong-1' })
    } else if (e.target.value === 5) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ clickTag: 'pingpong-2' })
    } else if (e.target.value === 6) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ clickTag: 'pingpong-3' })
    } else if (e.target.value === 7) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ clickTag: 'pingpong-black' })
    }
  }

  renderBaseLayerControl() {
    return (
      <LayersControl position="bottomleft">
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
    const {
      geojson,
      items,
      lat,
      lng,
      submit,
      isLoaded,
      error,
      clickTag,
      selectedVillage,
      person,
      house,
      visible,
      houseaddress,
    } = this.state
    const tawat = geojson.map(object => object.geometry)
    const aa12 = data1.map(item => item.properties)
    const housenovillage = houseaddress.map(object => object.properties)
    const monentFun = moment()
    const position = [lat, lng]
    console.log(items, tawat, selectedVillage, person)
    console.log(houseaddress, ';l;;;kmiuygtfhgdstfygh')
    console.log(data1, houseaddress, 'ข้อมูลdata1')
    console.log(house, 'lllll')

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
        </AutoComplete>
      )
    }
    if (error) {
      return <div>Error: {error.message}</div>
    }
    if (!isLoaded) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <Helmet title="Dashboard: Crypto" />
        <div className="air__utils__heading">
          <h5>สุขภาวะ/อาการ</h5>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-12">
            <Radio.Group onChange={this.checkIdItems}>
              <Radio value={1}>ผู้ป่วยเรื้อรัง</Radio>
              <Radio value={2}>ผู้พิการ</Radio>
            </Radio.Group>
          </div>
          <div className="col-xl-2 col-lg-12" />
          <div className="col-xl-4 col-lg-12">
            <Complete />
          </div>
        </div>
        {/* <Row>
          <Col span={8}>
            <Radio.Group onChange={this.checkIdItems}>
              <Radio value={1}>ผู้ป่วยเรื้อรัง</Radio>
              <Radio value={2}>ผู้พิการ</Radio>
            </Radio.Group>
          </Col>
          <Col span={8} />
          <Col span={8}>
            {' '}
            <Complete />
          </Col>
        </Row> */}
        <br />
        <br />
        <Map
          style={{ height: '70vh' }}
          center={position}
          zoom={14}
          // fullscreenControl
        >
          <FullscreenControl position="topleft" />
          {this.renderBaseLayerControl()}
          {data1.map(item => {
            let markerIcon1 = myIcon
            if (submit) {
              if (
                item.properties.no + item.properties.villageName === submit &&
                item.properties.tag[0] === 'pingpong-normal'
              ) {
                markerIcon1 = redIcon
              } else if (
                item.properties.no + item.properties.villageName === submit &&
                item.properties.tag[0] === 'pingpong-risk'
              ) {
                markerIcon1 = violetIcon
              }
            } else if (clickTag === item.properties.tag[0] && clickTag === 'pingpong-normal') {
              markerIcon1 = redIcon
            } else if (clickTag === item.properties.tag[0] && clickTag === 'pingpong-risk') {
              markerIcon1 = violetIcon
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
                <div className="site-drawer-render-in-current-wrapper">
                  <Drawer
                    // title={`${houseaddress.no} ${houseaddress.villageName}`}
                    title={`${housenovillage.map(obj => obj.no)} ${housenovillage.map(
                      obj => obj.villageName,
                    )}`}
                    placement="right"
                    onClose={this.onClose}
                    visible={visible}
                    getContainer={false}
                    style={{ position: 'absolute', overflow: 'hidden', width: 240 }}
                  >
                    <span>
                      {house.map(d => {
                        return (
                          <div className="site-drawer-render-in-current-wrapper">
                            <Row>
                              <Col>
                                <Link to="/dashboard/userdetail">
                                  <Button onClick={() => this.setStore(d)}>
                                    {d.firstname}&nbsp;{d.lastname}&nbsp;อายุ&nbsp;
                                    {monentFun.diff(d.birthDate, 'years')}&nbsp;ปี
                                  </Button>
                                </Link>
                              </Col>
                            </Row>
                            <Divider />
                          </div>
                        )
                      })}
                    </span>
                  </Drawer>
                </div>
              </Marker>
            )
          })}
        </Map>
        <br />
        <Footer />
      </div>
    )
  }
}
export default Symptom
