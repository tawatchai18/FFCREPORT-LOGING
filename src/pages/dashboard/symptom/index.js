import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import Footer from 'components/layout/Footer'
import { Radio, AutoComplete, Input, Icon, Drawer, Button } from 'antd'
import { Map, TileLayer, Marker, WMSTileLayer, LayersControl, Popup } from 'react-leaflet'
import L from 'leaflet'
import FullscreenControl from 'react-leaflet-fullscreen'
import {
  MapData,
  CreatData,
  UserDatamap,
  houseMap,
} from '../../../components/system/Auth/Login/PostData'
// import 'react-leaflet-fullscreen-control'

// import data1 from './data1'

const myIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [0, 0],
  iconAnchor: [0, 0],
  popupAnchor: [0, 0],
  shadowSize: [0, 0],
})

const redIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [20, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const violetIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [20, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const mapStateToProps = ({ settings }) => ({ settings })
@connect(mapStateToProps)
class Symptom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      geojson: [],
      house: [],
      // person: [],
      houseaddress: [],
      lat: '',
      lng: '',
      // lat: 13.520531624809204,
      // lng: 100.00699460506439,
      submit: '',
      clickTag: '',
      visible: false,
      selectedVillage: null,
      isLoaded: false,
      error: null,
      zoomLevel: 14,
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
        const ansX = (result.bbox[2] + result.bbox[0]) / 2
        const ansY = (result.bbox[3] + result.bbox[1]) / 2
        this.setState({
          geojson: result.features,
          isLoaded: true,
          lat: ansY,
          lng: ansX,
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
    // console.log('setstore')
    // console.log(d, 'llll')
    localStorage.setItem('userUnit', JSON.stringify(d))
  }

  showDrawer = item => {
    const data = sessionStorage.getItem('userData')
    const dataJson = JSON.parse(data)
    const id = dataJson.user.orgId
    const houseid = item.properties.id
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
        // console.log(result, 'address')
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
      this.setState({ clickTag: 'chronic', submit: '', zoomLevel: 14 })
    } else if (e.target.value === 2) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ clickTag: 'disable', submit: '', zoomLevel: 14 })
    }
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
      items,
      lat,
      lng,
      submit,
      isLoaded,
      error,
      clickTag,
      selectedVillage,
      // person,
      house,
      visible,
      houseaddress,
      zoomLevel,
    } = this.state
    // const aa12 = geojson.map(item => item.properties)
    // const housenovillage = houseaddress.map(object => object.properties)
    const monentFun = moment()
    const position = [lat, lng]
    const titleno = houseaddress.map(it => it.properties.no)
    const titlevillageName = houseaddress.map(it => it.properties.villageName)
    console.log(items, selectedVillage)
    // console.log(houseaddress.map(item => item.properties.no + item.properties.villageName),housenovillage, ';l;;;kmiuygtfhgdstfygh')

    function refreshPage() {
      window.location.reload(false)
    }

    const Complete = () => {
      return (
        <AutoComplete
          style={{ width: 350, Color: '#000' }}
          onSelect={val => {
            this.setState({ submit: val, clickTag: '', zoomLevel: 20 })
          }}
          dataSource={geojson.map(object => object.properties.no + object.properties.villageName)}
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
        <Helmet title="สุขภาวะ/อาการ" />
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
        <br />
        <br />
        <Map style={{ height: '70vh' }} center={position} zoom={zoomLevel}>
          <FullscreenControl position="topleft" />
          {this.renderBaseLayerControl()}
          {geojson.map(item => {
            let markerIcon1 = myIcon
            // if (submit) {
            // if (item.properties.no + item.properties.villageName === submit) {
            //   markerIcon1 = redIcon
            // }
            if (item.properties.no + item.properties.villageName === submit) {
              this.setCenterMap(item.geometry.coordinates[1], item.geometry.coordinates[0])
              markerIcon1 = redIcon
            } else if (clickTag === item.properties.tags.find(obj => obj === 'chronic')) {
              markerIcon1 = redIcon
            } else if (clickTag === item.properties.tags.find(obj => obj === 'disable')) {
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
                    <p>
                      {item.geometry.coordinates[1]},{item.geometry.coordinates[0]}
                    </p>
                  </span>
                </Popup>
                <div className="site-drawer-render-in-current-wrapper">
                  <Drawer
                    title={`${titleno} ${titlevillageName}`}
                    // title={`${houseaddress.no} ${houseaddress.villageName}`}
                    // title={`${houseaddress.map(obj => obj.no)} ${houseaddress.map(
                    //   obj => obj.villageName,
                    // )}`}
                    placement="right"
                    onClose={this.onClose}
                    visible={visible}
                    getContainer={false}
                    style={{ position: 'absolute', overflow: 'hidden', width: 240 }}
                  >
                    {house.map(d => {
                      let aa123
                      const apex = monentFun.diff(d.birthDate, 'years')
                      if (apex >= 1) {
                        aa123 = (
                          <Button
                            onClick={() => this.setStore(d)}
                            style={{ width: 220, height: 50 }}
                          >
                            {d.firstname}&nbsp;{d.lastname}&nbsp;อายุ&nbsp;
                            {apex}&nbsp;ปี
                          </Button>
                        )
                      } else {
                        aa123 = null
                      }
                      return (
                        <div>
                          <Link to="/dashboard/userdetail">{aa123}</Link>
                        </div>
                      )
                    })}
                    {/* <span>
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
                    </span> */}
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
