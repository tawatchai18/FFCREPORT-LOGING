import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Footer from 'components/layout/Footer'
import { Radio, AutoComplete, Input, Icon, Row, Col, Drawer, Divider, Button } from 'antd'
import { Map, TileLayer, Marker, Popup, WMSTileLayer, LayersControl } from 'react-leaflet'
import L from 'leaflet'
import FullscreenControl from 'react-leaflet-fullscreen'
import {
  MapData,
  // CreatData,
  UserDatamap,
  houseMap,
} from '../../../components/system/Auth/Login/PostData'

const myIcon = L.icon({
  iconUrl: 'blue.png',
  iconSize: [0, 0],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

// const BlueIcon = L.icon({
//   iconUrl: 'blue.png',
//   iconSize: [25, 30],
//   iconAnchor: [12.5, 41],
//   popupAnchor: [0, -41],
// })

const greenIcon = L.icon({
  iconUrl: 'icongreen.png',
  iconSize: [35, 40],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

const yelloIcon = L.icon({
  iconUrl: 'yello.png',
  iconSize: [35, 40],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

const redIcon = L.icon({
  iconUrl: 'redicon.png',
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
      // lat: 13.52,
      // lng: 100,
      lat: '',
      lng: '',
      submit: '',
      clickTag: '',
      visible: false,
      zoomLevel: 14,
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
    // console.log(dataJson, 'บอริ่ง')
    const id = dataJson.user.orgId

    // CreatData(id, dataJson.token).then(result => {
    //   this.setState({
    //     items: result,
    //   })
    // })

    MapData(id, dataJson.token).then(result => {
      const ansX = (result.bbox[2] + result.bbox[0]) / 2
      const ansY = (result.bbox[3] + result.bbox[1]) / 2
      this.setState({
        geojson: result.features,
        lat: ansY,
        lng: ansX,
      })
    })
  }

  setStore = d => {
    // console.log('setstore')
    // console.log(d, 'llll')
    localStorage.setItem('userUnit', JSON.stringify(d))
  }

  showDrawer = item => {
    const data = sessionStorage.getItem('userData')
    const dataJson = JSON.parse(data)
    const id = dataJson.user.orgId
    const houseid = item.properties.id
    // console.log(item, 'kffk')
    // console.log('show drawer')
    // console.log(item.properties.id)
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
        // houseaddress: result.features,
        houseaddress: result,
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
      this.setState({ clickTag: 'elder-activities-ok', submit: '', zoomLevel: 14 })
    } else if (e.target.value === 2) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ clickTag: 'elder-activities-mid', submit: '', zoomLevel: 14 })
    } else if (e.target.value === 3) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ clickTag: 'elder-activities-very_hi', submit: '', zoomLevel: 14 })
    }
    //   else if (e.target.value === 4) {
    //   // eslint-disable-next-line react/no-unused-state
    //   this.setState({ clickTag: '', submit:'' })
    // }
  }

  setCenterMap = (newlat, newlng) => {
    // console.log(newlat, newlng,'newnwreteuii');
    const { lat, lng } = this.state
    if (lat !== newlat) {
      this.setState({
        lat: newlat,
        zoomLevel: 20,
      })
    }
    if (lng !== newlng) {
      this.setState({
        lng: newlng,
        zoomLevel: 20,
      })
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
      lat,
      lng,
      submit,
      clickTag,
      house,
      visible,
      houseaddress,
      zoomLevel,
    } = this.state
    const aa12 = geojson.map(item => item.properties)
    const monentFun = moment()
    const position = [lat, lng]

    function refreshPage() {
      window.location.reload(false)
    }

    const Complete = () => {
      return (
        <AutoComplete
          style={{ width: 350, Color: '#000' }}
          onSelect={val => {
            this.setState({ submit: val, clickTag: '' })
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
        <div className="row">
          <div className="col-lg-4">
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
              {/* <Radio value={4}>
                ทั้งหมด&nbsp;
                <img src="home.png" alt="" width="20" height="20" />
              </Radio> */}
            </Radio.Group>
          </div>
          <div className="col-lg-4" />
          <br />
          <div className="col-lg-4">
            <Complete />
          </div>
        </div>
        <br />
        <br />
        <Map
          style={{ height: '70vh' }}
          center={position}
          zoom={zoomLevel}
          // fullscreenControl
        >
          <FullscreenControl position="topleft" />
          {this.renderBaseLayerControl()}
          {geojson.map(item => {
            let markerIcon1 = myIcon
            // if (submit) {
            // if (
            //   item.properties.no + item.properties.villageName === submit
            // ) {
            //   markerIcon1 = redIcon
            if (item.properties.no + item.properties.villageName === submit) {
              this.setCenterMap(item.geometry.coordinates[1], item.geometry.coordinates[0])
              markerIcon1 = redIcon
            }
            // else if ([item.geometry.coordinates[1], item.geometry.coordinates[0]] && clickTag === '') {
            //   markerIcon1 = BlueIcon
            // }
            else if (clickTag === item.properties.tags.find(obj => obj === 'elder-activities-ok')) {
              markerIcon1 = greenIcon
            } else if (
              clickTag === item.properties.tags.find(obj => obj === 'elder-activities-mid')
            ) {
              markerIcon1 = yelloIcon
            } else if (
              clickTag === item.properties.tags.find(obj => obj === 'elder-activities-very_hi')
            ) {
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
                    {/* <p>tag:{item.properties.tags}</p> */}
                  </span>
                </Popup>
                <Drawer
                  // title={`${housenovillage.map(obj => obj.no)} ${housenovillage.map(
                  //   obj => obj.villageName,
                  // )}`}
                  title={`${houseaddress.no} ${houseaddress.villageName}`}
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
        <br />
        <Footer />
      </div>
    )
  }
}
export default Elderly
