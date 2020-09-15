import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
// import { Scrollbars } from 'react-custom-scrollbars'
// import moment from 'moment'
import Footer from 'components/layout/Footer'
import { AutoComplete, Input, Icon, Drawer, Row, Col, Divider, Button, Form, Popover } from 'antd'
import L from 'leaflet'
import 'react-leaflet-fullscreen/dist/styles.css'
import FullscreenControl from 'react-leaflet-fullscreen'
import {
  Map,
  TileLayer,
  Marker,
  WMSTileLayer,
  LayersControl,
  Popup,
  // FeatureGroup,
} from 'react-leaflet'
import {
  MapData,
  UserDatamap,
  houseMap,
  haveLocat,
  editemarker,
} from '../../../components/system/Auth/Login/PostData'
import data1 from './data1'
import 'leaflet-draw/dist/leaflet.draw.css'
// import EditControl from './EditControl'

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
      visible: false,
      visible1: false,
      selectedVillage: null,
      isLoaded: false,
      error: null,
      showDraggableMarker: false,
      villageDrag: null,
      noDrag: null,
      idhouse: [],
      updatehouse: [],
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
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
  }

  componentDidMount() {
    const data = sessionStorage.getItem('userData')
    const dataJson = JSON.parse(data)
    const id = dataJson.user.orgId

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
          // houseaddress: result.features,
          houseaddress: result,
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

  handleVisibleChange = visible1 => {
    this.setState({ visible1 })
  }

  showDraggable = d => {
    console.log('asdfghjk')
    console.log(d)
    this.setState({
      showDraggableMarker: true,
      villageDrag: d.villageName,
      noDrag: d.no,
      idhouse: d,
    })
  }

  submitok = (idhouse, e) => {
    console.log(idhouse, e, 'มีไอดีไหม')
    const data = sessionStorage.getItem('userData')
    const dataJson = JSON.parse(data)
    const id = dataJson.user.orgId
    const houseid = idhouse.id
    editemarker(id, dataJson.token, houseid, idhouse, e).then(
      result => {
        this.setState({
          updatehouse: result,
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

  handleRemove = () => {
    console.log('ลบ remove')
    this.setState({
      showDraggableMarker: null,
    })
  }

  handleValidSubmit(value) {
    console.log(value, 'แวรู่')
    const { haveLocation } = this.state
    console.log(haveLocation, 'lololocation')
    haveLocation.find(item => {
      return item.no + item.villageName === value
    })
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
      selectedVillage,
      person,
      house,
      visible,
      visible1,
      houseaddress,
      haveLocation,
      showDraggableMarker,
      villageDrag,
      noDrag,
      idhouse,
      updatehouse,
    } = this.state
    const onsubmit = this.handleValidSubmit
    console.log(showDraggableMarker, '1234567677')
    console.log(haveLocation, idhouse, updatehouse, 'havavava')
    const aa12 = data1.map(item => item.properties)
    const housenovillage = houseaddress.map(object => object.properties)
    // const monentFun = moment()
    const position = [lat, lng]
    console.log(geojson, 'mapapapapap')
    console.log(selectedVillage, person)
    console.log(houseaddress, 'themask')
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

    const Search = () => {
      return (
        <AutoComplete
          style={{ width: 250, Color: '#000' }}
          // onSelect={val => {
          //   this.setState({ submit: val })
          // }}
          onChange={onsubmit}
          dataSource={haveLocation.map(d => d.no + d.villageName)}
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

    const content = haveLocation.map(d => {
      return (
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Button
                style={{ width: 260 }}
                onClick={() => this.showDraggable(d)}
                onChange={onsubmit}
              >
                {d.no}&nbsp;{d.villageName}
              </Button>
            </Col>
          </Row>
          <Divider />
        </Form>
      )
    })
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
        <br />
        <br />
        <center>
          <Map style={{ width: '81vw', height: '70vh' }} center={position} zoom={14}>
            <FullscreenControl position="topleft" />
            {this.renderBaseLayerControl()}
            {/* {geojson.map(item => { */}
            {data1.map(item => {
              let markerIcon1 = myIcon
              if (submit) {
                if (item.properties.no + item.properties.villageName === submit) {
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
                      // title={`${houseaddress.no} ${houseaddress.villageName}`}
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
            {showDraggableMarker && (
              <Marker
                style={{ position: 'absolute', zIndex: 400 }}
                position={[13.52, 100]}
                draggable
                // onDrag={e => console.log(e.latlng,e.latlng.lat,'latlongggggggg122345678')}
                ondrag={e => this.submitok(idhouse, e)}
                icon={greenIcon}
              >
                <Popup>
                  <span>
                    <p>หมู่บ้าน:{villageDrag}</p>
                    <p>บ้านเลขที่:{noDrag}</p>
                    <p>tag:</p>
                  </span>
                  <Row>
                    {/* <Button onClick={this.submitok(idhouse)}>บันทึก</Button>&nbsp; */}
                    <Button onClick={this.handleRemove}>ยกเลิก</Button>
                  </Row>
                </Popup>
              </Marker>
            )}
            <Popover
              title={<Search />}
              trigger="click"
              visible={visible1}
              onVisibleChange={this.handleVisibleChange}
              overlayStyle={{
                height: '50vh',
                overflowY: 'auto',
              }}
              content={content}
            >
              <Button
                style={{
                  position: 'absolute',
                  marginTop: 280,
                  left: 10,
                  padding: 10,
                  width: 35,
                  zIndex: 400,
                }}
              >
                <i className="icmn-plus" />
              </Button>
            </Popover>
          </Map>
        </center>
        <br />
        <Footer />
      </div>
    )
  }
}
export default Editmark
