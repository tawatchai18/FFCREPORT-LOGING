import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Footer from 'components/layout/Footer'
import { AutoComplete, Input, Icon, Row, Button, Form, Popover } from 'antd'
import L from 'leaflet'
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
  // UserDatamap,
  // houseMap,
  haveLocat,
  editemarker,
  editemarkersubmit,
} from '../../../components/system/Auth/Login/PostData'
// import data1 from './data1'
import 'leaflet-draw/dist/leaflet.draw.css'

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
      // house: [],
      person: [],
      houseaddress: [],
      haveLocation: [],
      lat: 13.520531624809204,
      lng: 100.00699460506439,
      submit: '',
      // visible: false,
      visible1: false,
      selectedVillage: null,
      isLoaded: false,
      error: null,
      showDraggableMarker: false,
      editeDraggableMarker: true,
      villageDrag: null,
      noDrag: null,
      idhouse: [],
      updatehouse: [],
      dragMarkerLatlng: [13.52, 100],
      draggable: false,
      newid: '',
      edithouse: [],
      newlatlng: [],
      // markerdata: false
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

  onClose = () => {
    this.setState({
      // visible: false,
      selectedVillage: null,
    })
  }

  handleVisibleChange = visible1 => {
    this.setState({ visible1 })
  }

  showDraggable = d => {
    this.setState({
      showDraggableMarker: true,
      villageDrag: d.villageName,
      noDrag: d.no,
      idhouse: d,
    })
  }

  editeDraggable = d => {
    this.setState({
      draggable: true,
      villageDrag: d.villageName,
      noDrag: d.no,
      idhouse: d,
    })
  }

  onDrag = event => {
    this.setState({
      // eslint-disable-next-line no-underscore-dangle
      dragMarkerLatlng: event.target._latlng,
    })
  }

  onDragle = (event, item, id) => {
    console.log(item.properties, 'id')
    // console.log(item,'test');
    // eslint-disable-next-line react/no-access-state-in-setstate
    const { geojson } = this.state
    // eslint-disable-next-line no-underscore-dangle
    const newlat = event.target._latlng.lat
    // eslint-disable-next-line no-underscore-dangle
    const newlng = event.target._latlng.lng
    item.geometry.coordinates[1] = newlat
    item.geometry.coordinates[0] = newlng
    // eslint-disable-next-line camelcase
    const geojson_tmp = geojson
    console.log(geojson_tmp, 'tmp')
    geojson_tmp[id].geometry.coordinates[1] = newlat
    geojson_tmp[id].geometry.coordinates[0] = newlng

    this.setState({
      geojson: geojson_tmp,
      newid: item.properties.id,
      edithouse: item.properties,
      newlatlng: item.geometry.coordinates,
    })
    console.log(newlat, newlng, 'newlatlng')
  }

  editnewmarker = (geojson, newid, edithouse, newlatlng, draggable) => {
    console.log(draggable, 'grable')
    // console.log(edithouse,'popoties');
    // console.log(newid,'id');
    // console.log(geojson,'geojson')
    const data = sessionStorage.getItem('userData')
    const dataJson = JSON.parse(data)
    const id = dataJson.user.orgId
    // const houseid = idhouse.id
    editemarkersubmit(id, dataJson.token, newid, geojson, edithouse, newlatlng).then(
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
    // eslint-disable-next-line no-alert
    alert('ต้องการแก้ไขพิกัด')
    return window.location.reload()
  }

  submitok = (idhouse, dragMarkerLatlng) => {
    const data = sessionStorage.getItem('userData')
    const dataJson = JSON.parse(data)
    const id = dataJson.user.orgId
    const houseid = idhouse.id
    editemarker(id, dataJson.token, houseid, idhouse, dragMarkerLatlng).then(
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
    // eslint-disable-next-line no-alert
    alert('ok')
    return window.location.reload()
  }

  handleRemove = () => {
    this.setState({
      showDraggableMarker: null,
    })
  }

  handleDelete = () => {
    this.setState({
      editeDraggableMarker: true,
    })
  }

  handleValidSubmit(value) {
    console.log(value, 'dr.pong')
    console.log(value, 'values')
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
      // house,
      // visible,
      visible1,
      houseaddress,
      haveLocation,
      showDraggableMarker,
      editeDraggableMarker,
      villageDrag,
      noDrag,
      idhouse,
      updatehouse,
      dragMarkerLatlng,
      draggable,
      newid,
      edithouse,
      newlatlng,
    } = this.state
    const onsubmit = this.handleValidSubmit
    // console.log(edithouse,'บ้าน');
    console.log(updatehouse, 'havavava')
    const aa12 = geojson.map(item => item.properties)
    // const housenovillage = houseaddress.map(object => object.properties)
    const position = [lat, lng]
    console.log(geojson, 'mapapapapap')
    console.log(selectedVillage, person)
    console.log(houseaddress, editeDraggableMarker, 'themask')

    function refreshPage() {
      window.location.reload()
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

    // const Search = () => {
    //   return (
    //     <AutoComplete
    //       style={{ width: 250, Color: '#000' }}
    //       onChange={onsubmit}
    //       dataSource={haveLocation.map(d => d.no + d.villageName)}
    //       defaultValue={submit}
    //       placeholder="บ้านเลขที่ / หมู่บ้าน"
    //       filterOption={(inputValue, option) =>
    //         option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    //       }
    //     >
    //       <Input
    //         suffix={<Icon type="search" onClick={refreshPage} className="certain-category-icon" />}
    //         allowClear
    //       />
    //     </AutoComplete>
    //   )
    // }

    const content = haveLocation.map(d => {
      return (
        <Form layout="vertical" onChange={onsubmit}>
          <Row gutter={16}>
            <Button
              style={{ width: 260 }}
              onClick={() => this.showDraggable(d)}
              onChange={onsubmit}
            >
              {d.no}&nbsp;{d.villageName}
            </Button>
          </Row>
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
        <Map style={{ height: '70vh' }} center={position} zoom={14}>
          <FullscreenControl position="topleft" />
          {this.renderBaseLayerControl()}
          {editeDraggableMarker &&
            geojson.map((item, id) => {
              const markerdata = [item.geometry.coordinates[1], item.geometry.coordinates[0]]
              let markerIcon1 = myIcon
              if (submit) {
                if (item.properties.no + item.properties.villageName === submit) {
                  markerIcon1 = greenIcon
                }
              }
              return (
                <Marker
                  key="draggable-marker"
                  marker_index={`draggable-marker ${id}`}
                  draggable={draggable}
                  onDragend={e => this.onDragle(e, item, id)}
                  // ondragend={e => this.setState({ datalatlng : e })}
                  position={markerdata}
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
                    {draggable === true && (
                      <Row>
                        <Button
                          onClick={() =>
                            this.editnewmarker(newid, geojson, edithouse, newlatlng, draggable)
                          }
                        >
                          บันทึก
                        </Button>
                        &nbsp;
                        <Button onClick={this.handleDelete}>ยกเลิก</Button>
                      </Row>
                    )}
                  </Popup>
                </Marker>
              )
            })}
          {showDraggableMarker && (
            <Marker
              key="draggable-marker"
              marker_index="draggable-marker"
              style={{ position: 'absolute', zIndex: 4000 }}
              position={dragMarkerLatlng}
              draggable
              onDragend={this.onDrag}
              icon={greenIcon}
              onChange={this.zoomIn}
            >
              <Popup>
                <span>
                  <p>หมู่บ้าน:{villageDrag}</p>
                  <p>บ้านเลขที่:{noDrag}</p>
                </span>
                <Row>
                  <Button onClick={() => this.submitok(idhouse, dragMarkerLatlng)}>บันทึก</Button>
                  &nbsp;
                  <Button onClick={this.handleRemove}>ยกเลิก</Button>
                </Row>
              </Popup>
            </Marker>
          )}
          <Popover
            // title={<Search />}
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
          <Button
            style={{
              position: 'absolute',
              marginTop: 240,
              left: 10,
              padding: 10,
              width: 35,
              zIndex: 400,
            }}
            onClick={this.editeDraggable}
          >
            <i className="fe fe-edit-3" />
          </Button>
        </Map>
        {/* <div className="row">
          <div className="card">
            <div className="col-xl-4 col-lg-12">
              <Button>เพิ่ม</Button>
              <Button>แก้ไข</Button>
            </div>
          </div>
          <div className="col-xl-8 col-lg-12">
            <Map style={{ height: '70vh' }} center={position} zoom={14}>
              <FullscreenControl position="topleft" />
              {this.renderBaseLayerControl()}
              {editeDraggableMarker && geojson.map((item,id) => {
                const markerdata = [item.geometry.coordinates[1],item.geometry.coordinates[0]]
                let markerIcon1 = myIcon
                if (submit) {
                  if (item.properties.no + item.properties.villageName === submit) {
                    markerIcon1 = greenIcon
                  }
                }
                  return (
                    <Marker
                      key="draggable-marker"
                      marker_index={`draggable-marker ${id}`}
                      draggable={draggable}
                      onDragend={(e)=>this.onDragle(e,item,id)}
                      // ondragend={e => this.setState({ datalatlng : e })}
                      position={markerdata}
                      icon={markerIcon1}
                    >
                      <Popup>
                        <span>
                          <p>หมู่บ้าน:{item.properties.villageName}</p>
                          <p>บ้านเลขที่:{item.properties.no}</p>
                          <p>{item.geometry.coordinates[1]},{item.geometry.coordinates[0]}</p>
                        </span>
                        {draggable === true && (
                          <Row>
                            <Button onClick={() => this.editnewmarker(newid, geojson, edithouse,newlatlng, draggable)}>บันทึก</Button>
                            &nbsp;
                            <Button onClick={this.handleDelete}>ยกเลิก</Button>
                          </Row>
                        )}
                      </Popup>
                    </Marker>
                  )
                })}
              {showDraggableMarker && (
                <Marker
                  key="draggable-marker"
                  marker_index="draggable-marker"
                  style={{ position: 'absolute', zIndex: 4000 }}
                  position={dragMarkerLatlng}
                  draggable
                  onDragend={this.onDrag}
                  icon={greenIcon}
                  onChange={this.zoomIn}
                >
                  <Popup>
                    <span>
                      <p>หมู่บ้าน:{villageDrag}</p>
                      <p>บ้านเลขที่:{noDrag}</p>
                    </span>
                    <Row>
                      <Button onClick={() => this.submitok(idhouse, dragMarkerLatlng)}>บันทึก</Button>
                      &nbsp;
                      <Button onClick={this.handleRemove}>ยกเลิก</Button>
                    </Row>
                  </Popup>
                </Marker>
              )}
              <Popover
                // title={<Search />}
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
              <Button
                style={{
                  position: 'absolute',
                  marginTop: 240,
                  left: 10,
                  padding: 10,
                  width: 35,
                  zIndex: 400,
                }}
                onClick={this.editeDraggable}
              >
                <i className="fe fe-edit-3" />
              </Button>
            </Map>
          </div>
        </div> */}
        <br />
        <Footer />
      </div>
    )
  }
}
export default Editmark
