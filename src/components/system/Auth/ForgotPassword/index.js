import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
// import TopBer from 'components/layout/TopBar'
import Footer from 'components/layout/Footer'
import { AutoComplete, Input, Icon, Row, Button } from 'antd'
// lat+lng/ length
// import swal from 'sweetalert';
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
  haveLocat,
  editemarker,
  editemarkersubmit,
} from 'components/system/Auth/Login/PostData'

const myIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.0.1/dist/images/marker-icon-2x.png',
  iconSize: [25, 40],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

const redIcon = L.icon({
  iconUrl: 'redicon.png',
  iconSize: [35, 40],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      geojson: [],
      person: [],
      haveLocation: [],
      // lat: 13.52,
      // lng: 100,
      lat: '',
      lng: '',
      submit: '',
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
      // novsvillageName:[],
      // namevillagevsnoedite:[],
      hover: false,
      functionupdate: false,
      functionedite: false,
      zoomLevel: 14,
      selectedMarker: null,
      search: '',
      searchedite: '',
      filtersearchs: [],
      filtersearchedite: [],
      // latlngcenter: [],
      latlngcenter: {
        bbox: [],
      },
      MarkerImg: myIcon,
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
    // this.handleValidSubmit = this.handleValidSubmit.bind(this)
  }

  componentDidMount() {
    const { search, searchedite } = this.state
    const data = sessionStorage.getItem('userData')
    const dataJson = JSON.parse(data)
    const id = dataJson.user.orgId

    MapData(id, dataJson.token).then(
      result => {
        const ansX = (result.bbox[2] + result.bbox[0]) / 2
        const ansY = (result.bbox[3] + result.bbox[1]) / 2
        console.log(ansX, ansY, 'test')
        const a = result.features.map(d => ({
          [d.properties.no + d.properties.villageName]: d.properties,
        }))
        if (a?.length > 0) {
          const b = Object.assign(...a)
          const c = Object.keys(b)
            .map(d => d.indexOf(searchedite) > -1 && b[d])
            .filter(d => d)
          this.setState({
            geojson: result.features,
            latlngcenter: result,
            filtersearchedite: c,
            isLoaded: true,
            lat: ansY,
            lng: ansX,
          })
        }
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
        const a = result?.map(d => ({ [d.no + d.villageName]: d }))
        if (a?.length > 0) {
          const b = Object.assign(...a)
          const c = Object.keys(b)
            .map(d => d.indexOf(search) > -1 && b[d])
            .filter(d => d)
          this.setState({
            haveLocation: result,
            filtersearchs: c,
            isLoaded: true,
          })
        }
      },
      error => {
        this.setState({
          isLoaded: true,
          error,
        })
      },
    )
  }

  // setStore = d => {
  //   localStorage.setItem('userUnit', JSON.stringify(d))
  // }

  clickeditesearch = e => {
    const { geojson } = this.state
    const a = geojson?.map(d => ({ [d.properties.no + d.properties.villageName]: d.properties }))
    if (a?.length > 0) {
      const b = Object.assign(...a)
      const c = Object.keys(b)
        .map(d => d.indexOf(e.target.value) > -1 && b[d])
        .filter(d => d)
      this.setState({
        filtersearchedite: c,
      })
    }
    this.setState({ searchedite: e.target.value })
  }

  clicksearch = e => {
    const { haveLocation } = this.state
    const a = haveLocation?.map(d => ({ [d.no + d.villageName]: d }))

    if (a?.length > 0) {
      const b = Object.assign(...a)
      const c = Object.keys(b)
        .map(d => d.indexOf(e.target.value) > -1 && b[d])
        .filter(d => d)
      this.setState({
        filtersearchs: c,
      })
    }
    this.setState({ search: e.target.value })
  }

  showDraggable = item => {
    const { dragMarkerLatlng } = this.state
    this.setState({
      lat: dragMarkerLatlng[0],
      lng: dragMarkerLatlng[1],
      zoomLevel: 20,
      showDraggableMarker: true,
      villageDrag: item.villageName,
      noDrag: item.no,
      idhouse: item.id,
      submit: '',
    })
  }

  editeDraggable = d => {
    this.setState({
      zoomLevel: 20,
      selectedMarker: d.id,
      lng: d.location.coordinates[0],
      lat: d.location.coordinates[1],
      villageDrag: d.villageName,
      noDrag: d.no,
      idhouse: d,
      submit: '',
    })
  }

  onDrag = event => {
    this.setState({
      // eslint-disable-next-line no-underscore-dangle
      dragMarkerLatlng: event.target._latlng,
    })
  }

  onDragle = (event, item, id) => {
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
    geojson_tmp[id].geometry.coordinates[1] = newlat
    geojson_tmp[id].geometry.coordinates[0] = newlng

    this.setState({
      geojson: geojson_tmp,
      newid: item.properties.id,
      edithouse: item.properties,
      newlatlng: item.geometry.coordinates,
    })
  }

  editnewmarker = (geojson, newid, edithouse, newlatlng, draggable) => {
    console.log(draggable, 'grable')
    const data = sessionStorage.getItem('userData')
    const dataJson = JSON.parse(data)
    const id = dataJson.user.orgId
    let txt
    // eslint-disable-next-line no-alert
    if (window.confirm('ต้องการแก้ไขพิกัด')) {
      txt = 'คุณต้องการแก้ไขพิกัด'
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
    } else {
      txt = this.setState({ showDraggableMarker: true })
    }
    // eslint-disable-next-line no-alert
    alert(txt)
    return window.location.reload()
  }

  submitok = (idhouse, dragMarkerLatlng) => {
    const data = sessionStorage.getItem('userData')
    const dataJson = JSON.parse(data)
    const id = dataJson.user.orgId
    const houseid = idhouse.id
    let txt
    // eslint-disable-next-line no-alert
    if (window.confirm('ต้องการแก้ไขพิกัด')) {
      txt = 'คุณต้องการแก้ไขพิกัด'
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
    } else {
      txt = this.setState({ showDraggableMarker: null })
    }
    // eslint-disable-next-line no-alert
    alert(txt)
    return window.location.reload()
  }

  handleRemove = () => {
    this.setState({
      showDraggableMarker: null,
      zoomLevel: 14,
    })
  }

  handleDelete = () => {
    this.setState({
      // editeDraggableMarker: true,
      zoomLevel: 14,
      selectedMarker: true,
    })
  }

  updateLocation = () => {
    // const datano = haveLocation.map(item => item.no + item.villageName)
    this.setState({
      // novsvillageName: datano,
      hover: Boolean,
      functionupdate: true,
      functionedite: false,
      zoomLevel: 14,
      submit: '',
      search: '',
      searchedite: '',
      selectedMarker: true,
    })
  }

  editeLocation = aa12 => {
    console.log(aa12)
    // const data = aa12.map(item => item.no + item.villageName)
    this.setState({
      // namevillagevsnoedite: data,
      functionedite: true,
      functionupdate: false,
      zoomLevel: 14,
      submit: '',
      search: '',
      searchedite: '',
      showDraggableMarker: null,
    })
  }

  setCenterMap = (newlat, newlng) => {
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
      isLoaded,
      error,
      selectedVillage,
      person,
      zoomLevel,
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
      latlngcenter,
      // novsvillageName,
      // namevillagevsnoedite,
      MarkerImg,
      hover,
      functionupdate,
      functionedite,
      selectedMarker,
      search,
      searchedite,
      filtersearchs,
      filtersearchedite,
    } = this.state
    console.log(updatehouse, isLoaded, error)
    const aa12 = geojson.map(item => item.properties)
    const position = [lat, lng]
    console.log(lat, lng, 'position')
    console.log(latlngcenter.bbox, '234')
    //  const ansX=(latlngcenter.bbox[2] + latlngcenter.bbox[0])/2
    //  const ansY = (latlngcenter.bbox[3] + latlngcenter.bbox[1])/2
    //  console.log(ansX,ansY,'test');
    //  console.log(latlngcenter.bbox[2] - latlngcenter.bbox[0]+latlngcenter.bbox[0],'????')
    //  console.log(latlngcenter.bbox[3] - latlngcenter.bbox[1],'how to')
    console.log(selectedVillage, person)
    //  console.log(geojson.map(item => [item.geometry.coordinates[1],item.geometry.coordinates[0]]),'pllp')

    function refreshPage() {
      window.location.reload()
    }

    const Complete = () => {
      return (
        <AutoComplete
          style={{ width: 350, Color: '#000' }}
          onSelect={val => {
            return this.setState({
              submit: val,
              functionedite: '',
              functionupdate: '',
            })
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
    return (
      <div style={{ marginLeft: 30, marginRight: 30 }}>
        <div className="row">
          <div className="col-xl-2 col-lg-12">
            <img
              src="resources/images/LOGO_Color.png"
              alt="..."
              style={{ width: 82, height: 82 }}
            />
          </div>
          <div className="col-xl-8 col-lg-12" />
          <div className="col-xl-2 col-lg-12">
            <div className="text-center font-size-18 pt-4 mb-auto">
              <Link to="/dashboard/elderly" className="font-weight-bold text-blue">
                <i className="fe fe-arrow-left align" />
                ย้อนกลับ
              </Link>
            </div>
          </div>
        </div>
        {/* <TopBer /> */}
        <Helmet title="Dashboard: Updatemaeker" />
        <div className="air__utils__heading" style={{ marginLeft: 150 }}>
          <h5>เพิ่ม / แก้ไข พิกัด</h5>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-6">
            <Button
              type="primary"
              style={{ width: 200 }}
              onClick={() => this.updateLocation(haveLocation)}
            >
              เพิ่มพิกัด
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" style={{ width: 200 }} onClick={() => this.editeLocation(aa12)}>
              แก้ไขพิกัด
            </Button>
          </div>
          <div className="col-xl-6 col-lg-6">
            <Complete />
          </div>
          <div className="col-xl-2 col-lg-6" />
        </div>
        <br />
        <div className="row" style={{ height: '70vh' }}>
          <div className="col-xl-4 col-lg-6">
            {functionupdate && hover && (
              <Input
                style={{ width: 420 }}
                placeholder="ค้นหา"
                value={search}
                onChange={this.clicksearch}
                suffix={<Icon type="search" className="certain-category-icon" />}
                allowClear
              />
            )}
            {functionedite && !functionupdate && (
              // ค้นหาของอัพเดทพิกัด
              <Input
                style={{ width: 420 }}
                placeholder="ค้นหา"
                value={searchedite}
                onChange={this.clickeditesearch}
                suffix={<Icon type="search" className="certain-category-icon" />}
                allowClear
              />
            )}
            <div className="height-350">
              <Scrollbars
                autoHide
                renderThumbVertical={({ ...props }) => (
                  <div
                    {...props}
                    style={{
                      width: '5px',
                      borderRadius: 'inherit',
                      backgroundColor: 'rgba(195, 190, 220, 0.4)',
                      left: '1px',
                    }}
                  />
                )}
              >
                {functionupdate &&
                  hover &&
                  filtersearchs.map(item => (
                    <div>
                      <Button style={{ width: 420 }} onClick={() => this.showDraggable(item)}>
                        {item.no}&nbsp;&nbsp;{item.villageName}
                      </Button>
                    </div>
                  ))}
                {functionedite &&
                  !functionupdate &&
                  filtersearchedite.map(d => (
                    <div>
                      <Button style={{ width: 420 }} onClick={() => this.editeDraggable(d)}>
                        {d.no}&nbsp;{d.villageName}
                      </Button>
                    </div>
                  ))}
              </Scrollbars>
            </div>
            {/* </div> */}
          </div>
          <div className="col-xl-8 col-lg-6">
            <div className="card">
              <Map style={{ height: '70vh' }} center={position} zoom={zoomLevel}>
                <FullscreenControl position="topleft" />
                {this.renderBaseLayerControl()}
                {editeDraggableMarker &&
                  geojson.map((item, id) => {
                    const markerdata = [item.geometry.coordinates[1], item.geometry.coordinates[0]]
                    let markerIcon1 = MarkerImg
                    if (submit) {
                      if (item.properties.no + item.properties.villageName === submit) {
                        this.setCenterMap(
                          item.geometry.coordinates[1],
                          item.geometry.coordinates[0],
                        )
                        markerIcon1 = redIcon
                      }
                    }
                    let isDraggable = false
                    if (item.properties.id === selectedMarker) {
                      isDraggable = true
                      markerIcon1 = redIcon
                    }
                    return (
                      <Marker
                        key="draggable-marker"
                        marker_index={`draggable-marker ${id}`}
                        draggable={isDraggable}
                        onDragend={e => this.onDragle(e, item, id)}
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
                          {isDraggable === true && (
                            <Row>
                              <Button
                                onClick={() =>
                                  this.editnewmarker(
                                    newid,
                                    geojson,
                                    edithouse,
                                    newlatlng,
                                    draggable,
                                  )
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
                    icon={redIcon}
                    onChange={this.zoomIn}
                  >
                    <Popup>
                      <span>
                        <p>หมู่บ้าน:{villageDrag}</p>
                        <p>บ้านเลขที่:{noDrag}</p>
                      </span>
                      <Row>
                        <Button onClick={() => this.submitok(idhouse, dragMarkerLatlng)}>
                          บันทึก
                        </Button>
                        &nbsp;
                        <Button onClick={this.handleRemove}>ยกเลิก</Button>
                      </Row>
                    </Popup>
                  </Marker>
                )}
              </Map>
            </div>
          </div>
        </div>
        <br />
        <Footer />
      </div>
    )
  }
}

export default ForgotPassword
