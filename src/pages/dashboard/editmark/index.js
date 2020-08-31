import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
// import moment from 'moment'
import Footer from 'components/layout/Footer'
import { AutoComplete, Input, Icon, Drawer, Row, Col, Divider, Button, Form } from 'antd'
import {
  Map,
  TileLayer,
  Marker,
  WMSTileLayer,
  LayersControl,
  Popup,
  FeatureGroup,
} from 'react-leaflet'
import L from 'leaflet'
import 'react-leaflet-fullscreen/dist/styles.css'
import FullscreenControl from 'react-leaflet-fullscreen'
import {
  MapData,
  UserDatamap,
  houseMap,
  haveLocat,
} from '../../../components/system/Auth/Login/PostData'
import data1 from './data1'
import 'leaflet-draw/dist/leaflet.draw.css'
import EditControl from './EditControl'

const myIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.0.1/dist/images/marker-icon-2x.png',
  iconSize: [25, 40],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

const greenIcon = L.icon({
  iconUrl: 'icongreen.png',
  iconSize: [35, 40],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

const mapStateToProps = ({ settings }) => ({ settings })
@connect(mapStateToProps)
class Editmark extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      geojson: [],
      house: [],
      person: [],
      houseaddress: [],
      haveLocation: [],
      lat: 13.520531624809204,
      lng: 100.00699460506439,
      submit: '',
      open: false,
      visible: false,
      selectedVillage: null,
      isLoaded: false,
      error: null,
    }
    this.baseMaps = [
      {
        name: 'GoogleSatellite',
        url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        attribution: '&copy; Google',
        type: 'tile',
        checked: true,
      },
      {
        name: 'OpenStreetMap',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
        type: 'tile',
      },
    ]
    this.mapOptions = {
      zoomControl: false,
      attributionControl: false,
      center: [-29.0529434318608, 152.01910972595218],
      zoom: 10,
      layers: [this.basemaps],
    }
  }

  componentDidMount() {
    const data = sessionStorage.getItem('userData')
    const dataJson = JSON.parse(data)
    const id = dataJson.user.orgId

    MapData(id, dataJson.token).then(
      result => {
        this.setState({
          geojson: result,
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

    haveLocat(id, dataJson.token).then(
      result => {
        this.setState({
          haveLocation: result,
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

  showopen = () => {
    this.setState({
      open: true,
    })
  }

  Close = () => {
    this.setState({
      open: false,
    })
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
      lat,
      lng,
      submit,
      isLoaded,
      error,
      open,
      selectedVillage,
      person,
      house,
      visible,
      houseaddress,
      haveLocation,
    } = this.state
    console.log(haveLocation, 'havavava')
    const aa12 = data1.map(item => item.properties)
    const housenovillage = houseaddress.map(object => object.properties)
    // const monentFun = moment()
    const position = [lat, lng]
    // const ReactLeafletSearchComponent = withLeaflet(ReactLeafletSearch);
    console.log(geojson, 'mapapapapap')
    console.log(selectedVillage, person)
    console.log(data1, houseaddress, housenovillage, 'ข้อมูลdata1')
    console.log(house, 'lllll')

    function refreshPage() {
      window.location.reload(false)
    }

    const Openhousenomark = () => {
      return (
        <>
          <Button type="primary" onClick={this.showopen}>
            เพิ่มพิกัด
          </Button>
          <Drawer
            title="บ้านที่ไม่ระบุพิกัด"
            width={320}
            onClose={this.Close}
            visible={open}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button onClick={this.onClose} type="primary">
                  Submit
                </Button>
              </div>
            }
          >
            {haveLocation.map(d => {
              return (
                <Form layout="vertical" hideRequiredMark>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Button style={{ width: 260 }}>
                        {d.no}&nbsp;{d.villageName}
                      </Button>
                    </Col>
                  </Row>
                  <Divider />
                </Form>
              )
            })}
          </Drawer>
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
          <h5>แก้ไข</h5>
        </div>
        <Complete />
        &nbsp;&nbsp;
        <Openhousenomark />
        <br />
        <br />
        <center>
          <Map style={{ width: '81vw', height: '70vh' }} center={position} zoom={14}>
            <FullscreenControl position="topleft" />
            {this.renderBaseLayerControl()}
            {data1.map(item => {
              let markerIcon1 = myIcon
              if (submit) {
                if (
                  item.properties.no + item.properties.villageName ===
                  submit
                  // item.properties.tag[0] === 'pingpong-normal'
                ) {
                  markerIcon1 = greenIcon
                }
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
                      title={`${housenovillage.map(obj => obj.no)} ${housenovillage.map(
                        obj => obj.villageName,
                      )}`}
                      placement="right"
                      onClose={this.onClose}
                      visible={visible}
                      getContainer={false}
                      style={{
                        position: 'absolute',
                        overflow: 'hidden',
                        width: 240,
                        border: '0px solid ',
                      }}
                    >
                      <span>
                        {house.map(d => {
                          return (
                            <div className="text-left">
                              <Link to="/dashboard/userdetail">
                                <Button onClick={() => this.setStore(d)}>
                                  {d.firstname}&nbsp;{d.lastname}
                                  {/* &nbsp;อายุ&nbsp;
                                  {monentFun.diff(d.birthDate, 'years')}&nbsp;ปี */}
                                </Button>
                              </Link>
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
            <FeatureGroup>
              <EditControl
                position="topleft"
                onEdited={e => console.log(e)}
                edit={{ remove: true }}
                draw={{
                  marker: true,
                  circle: false,
                  rectangle: false,
                  polygon: false,
                  polyline: false,
                  circlemarker: false,
                }}
              />
            </FeatureGroup>
          </Map>
        </center>
        <br />
        <Footer />
      </div>
    )
  }
}
export default Editmark
