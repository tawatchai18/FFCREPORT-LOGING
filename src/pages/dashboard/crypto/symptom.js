import React from 'react'
// import { Redirect } from 'react-router-dom';
// import { Helmet } from 'react-helmet'
// import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import { Radio, AutoComplete, Input, Icon } from 'antd'
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Map, TileLayer, Marker, Popup, WMSTileLayer, LayersControl } from 'react-leaflet'
import L from 'leaflet'
import { MapData, CreatData } from '../../../components/system/Auth/Login/PostData'
import 'react-leaflet-fullscreen-control'
import data1 from './data1'

const myIcon = L.icon({
  iconUrl: 'blue.png',
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

const violetIcon = L.icon({
  iconUrl: 'violet.png',
  iconSize: [25, 30],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
})

class Symptom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      geojson: [],
      lat: 13.520531624809204,
      lng: 100.00699460506439,
      submit: '',
      clickTag: '',
    }
    localStorage.clear()
    this.baseMaps = [
      {
        name: 'OpenStreet Map',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
        type: 'tile',
        checked: true,
      },

      {
        name: 'Google Satellite',
        url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        attribution: '&copy; Google',
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
      <LayersControl position="topright">
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
    const { geojson, items, lat, lng, submit, clickTag } = this.state
    const tawat = geojson.map(object => object.geometry)
    const mark = data1.map(item => item.geometry)
    const aa12 = data1.map(item => item.properties)
    const position = [lat, lng]
    console.log(mark, 'ยังไง')
    console.log(items, tawat, 'พอไหม')

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
          dataSource={aa12.map(object => object.no + object.villageName).filter((_, i) => i <= 30)}
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
      <div style={{ width: '100%', height: '100%' }}>
        <br />
        {/* <Complete />
        <br /><br /><br /> */}
        {/* <p>ปิงปองจราจร 7 สี</p> */}
        <Radio.Group onChange={this.checkIdItems}>
          <Radio value={1}>ผู้ป่วยเรื้อรัง</Radio>
          <Radio value={2}>ผู้พิการ</Radio>
          {/* <Radio value={3}>ติดสังคม&nbsp;<img src="circlegreenplush.png" alt="" width="20" height="20" /></Radio> */}
        </Radio.Group>
        <br />
        <br />
        <br />
        <Complete />
        <br />
        <br />
        <br />
        <Map
          style={{ width: '80vw', height: '100vh' }}
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
                markerIcon1 = violetIcon
              } else if (
                item.properties.no + item.properties.villageName === submit &&
                item.properties.tag[0] === 'pingpong-risk'
              ) {
                markerIcon1 = redIcon
              }
            } else if (clickTag === item.properties.tag[0] && clickTag === 'pingpong-normal') {
              markerIcon1 = violetIcon
            } else if (clickTag === item.properties.tag[0] && clickTag === 'pingpong-risk') {
              markerIcon1 = redIcon
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
export default Symptom
