import React from 'react'
// import { Redirect } from 'react-router-dom';
// import { Helmet } from 'react-helmet'
// import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import { Radio, AutoComplete, Input, Icon, Popover } from 'antd'
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  WMSTileLayer,
  LayersControl,
  withLeaflet,
} from 'react-leaflet'
import ReactLeafletSearch from 'react-leaflet-search'
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

class PingPong extends React.Component {
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
    const ReactLeafletSearchComponent = withLeaflet(ReactLeafletSearch)
    console.log(items, tawat, mark, 'พอไหม')

    const content = (
      <div>
        <p>FBS ≤ 100 mg/dl</p>
        <p>BP ≤ 120/80 mmHg</p>
      </div>
    )
    const content1 = (
      <div>
        <p>FBS = 100-125 mg/dl</p>
        <p>BP = 120/80 - 139/89 mmHg</p>
      </div>
    )
    const content2 = (
      <div>
        <p>FBS ≤ 125 mg/dl</p>
        <p>BP ≤ 139/89 mmHg</p>
      </div>
    )
    const content3 = (
      <div>
        <p>FBS = 126-154 mg/dl</p>
        <p>BP = 140/90 - 159/99 mmHg</p>
        <p>HbA1C7</p>
      </div>
    )

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
          <Radio value={1}>
            ปกติ&nbsp;{' '}
            <Popover content={content} title="กลุ่มปกติ">
              <img src="circle.png" alt="" width="20" height="20" />
            </Popover>
          </Radio>
          <Radio value={2}>
            กลุ่มเสี่ยง&nbsp;
            <Popover content={content1} title="กลุ่มเสี่ยง">
              <img src="circlegreen.png" alt="" width="20" height="20" />
            </Popover>
          </Radio>
          <Radio value={3}>
            ป่วย 0&nbsp;
            <Popover content={content2} title="กลุ่มป่วย 0">
              <img src="circlegreenplush.png" alt="" width="20" height="20" />
            </Popover>
          </Radio>
          <Radio value={4}>
            ป่วย 1&nbsp;
            <Popover content={content3} title="กลุ่มป่วย 1">
              <img src="circleyello.png" alt="" width="20" height="20" />
            </Popover>
          </Radio>
          <Radio value={5}>
            ป่วย 2&nbsp;
            <Popover content={content3} title="กลุ่มป่วย 2">
              <img src="circleorange.png" alt="" width="20" height="20" />
            </Popover>
          </Radio>
          <Radio value={6}>
            ป่วย 3&nbsp;
            <Popover content={content3} title="กลุ่มป่วย 3">
              <img src="circlered.png" alt="" width="20" height="20" />
            </Popover>
          </Radio>
          <Radio value={7}>
            มีโรคแทรกซ้อน&nbsp;
            <Popover content={content3} title="กลุ่มป่วยมีโรคแทรกซ้อน">
              <img src="circleblack.png" alt="" width="20" height="20" />
            </Popover>
          </Radio>
        </Radio.Group>
        <br />
        <br />
        <br />
        <Complete />
        <br />
        <br />
        <br />
        <Map
          style={{ width: '80vw', height: '80vh' }}
          center={position}
          zoom={14}
          fullscreenControl
        >
          <ReactLeafletSearchComponent
            // customProvider={this.provider}
            position="topleft"
            inputPlaceholder="Custom placeholder"
            search={aa12.map(object => object.no + object.villageName)}
            zoom={15}
            popUp={this.customPopup}
            searchBounds={aa12.map(object => object.no + object.villageName)}
          />
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
            } else if (clickTag === item.properties.tag[0] && clickTag === 'pingpong-normal') {
              markerIcon1 = writhIcon
            } else if (clickTag === item.properties.tag[0] && clickTag === 'pingpong-risk') {
              markerIcon1 = greenIcon
            } else if (clickTag === item.properties.tag[0] && clickTag === 'pingpong-0') {
              markerIcon1 = greenplushIcon
            } else if (clickTag === item.properties.tag[0] && clickTag === 'pingpong-1') {
              markerIcon1 = yelloIcon
            } else if (clickTag === item.properties.tag[0] && clickTag === 'pingpong-2') {
              markerIcon1 = orangeIcon
            } else if (clickTag === item.properties.tag[0] && clickTag === 'pingpong-3') {
              markerIcon1 = redIcon
            } else if (clickTag === item.properties.tag[0] && clickTag === 'pingpong-black') {
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
export default PingPong
