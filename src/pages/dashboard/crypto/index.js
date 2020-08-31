// import React from 'react'
// import { Helmet } from 'react-helmet'
// // import UserMenu from 'components/layout/TopBar/UserMenu/index'
// import { Radio, AutoComplete, Input, Icon, Popover, Row, Col } from 'antd'
// import { Map, TileLayer, Marker, Popup, WMSTileLayer, LayersControl } from 'react-leaflet'
// import L from 'leaflet'
// import { MapData, CreatData } from "../../../components/system/Auth/Login/PostData";
// import 'react-leaflet-fullscreen-control'
// import data1 from './data1'

// const myIcon = L.icon({
//   iconUrl: 'blue.png',
//   iconSize: [25, 30],
//   iconAnchor: [12.5, 41],
//   popupAnchor: [0, -41]
// })
// const writhIcon = L.icon({
//   iconUrl: 'writh.png',
//   iconSize: [25, 30],
//   iconAnchor: [12.5, 41],
//   popupAnchor: [0, -41]
// })
// const greenIcon = L.icon({
//   iconUrl: 'icongreen.png',
//   iconSize: [25, 30],
//   iconAnchor: [12.5, 41],
//   popupAnchor: [0, -41]
// })

// const yelloIcon = L.icon({
//   iconUrl: 'yello.png',
//   iconSize: [25, 30],
//   iconAnchor: [12.5, 41],
//   popupAnchor: [0, -41]
// })

// const orangeIcon = L.icon({
//   iconUrl: 'orange.png',
//   iconSize: [25, 30],
//   iconAnchor: [12.5, 41],
//   popupAnchor: [0, -41]
// })

// const redIcon = L.icon({
//   iconUrl: 'iconred.png',
//   iconSize: [25, 30],
//   iconAnchor: [12.5, 41],
//   popupAnchor: [0, -41]
// })

// const blackIcon = L.icon({
//   iconUrl: 'back.png',
//   iconSize: [25, 30],
//   iconAnchor: [12.5, 41],
//   popupAnchor: [0, -41]
// })

// const greenplushIcon = L.icon({
//   iconUrl: 'greenplus.png',
//   iconSize: [25, 30],
//   iconAnchor: [12.5, 41],
//   popupAnchor: [0, -41]
// })

// class DashboardCrypto extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       geojson: [],
//       lat: 13.520531624809204,
//       lng: 100.00699460506439,
//       submit: '',
//       clickTag: ''
//     };
//     localStorage.clear()
//     this.baseMaps = [
//       {
//         name: 'Google Satellite',
//         url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
//         // minZoom: 2,
//         // maxZoom: 19,
//         attribution: '&copy; Google',
//         type: 'tile',
//         checked: true
//       },
//       {
//         name: 'OpenStreet Map',
//         url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//         attribution: '&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
//         type: 'tile',
//       }
//     ];
//   }

//   componentDidMount() {
//     const data = sessionStorage.getItem('userData')
//     const dataJson = JSON.parse(data)
//     console.log(dataJson, 'บอริ่ง');
//     const id = dataJson.user.orgId

//     CreatData(id, dataJson.token)
//       .then((result) => {
//         this.setState({
//           items: result
//         })
//       });

//     MapData(id, dataJson.token)
//       .then((result) => {
//         this.setState({
//           geojson: result.features
//         })
//       })
//   }

//   checkIdItems = (e) => {
//     if (e.target.value === 1) {
//       // eslint-disable-next-line react/no-unused-state
//       this.setState({ clickTag: 'pingpong-normal' })
//     } else if (e.target.value === 2) {
//       // eslint-disable-next-line react/no-unused-state
//       this.setState({ clickTag: 'pingpong-risk' })
//     } else if (e.target.value === 3) {
//       // eslint-disable-next-line react/no-unused-state
//       this.setState({ clickTag: 'pingpong-0' })
//     } else if (e.target.value === 4) {
//       // eslint-disable-next-line react/no-unused-state
//       this.setState({ clickTag: 'pingpong-1' })
//     } else if (e.target.value === 5) {
//       // eslint-disable-next-line react/no-unused-state
//       this.setState({ clickTag: 'pingpong-2' })
//     } else if (e.target.value === 6) {
//       // eslint-disable-next-line react/no-unused-state
//       this.setState({ clickTag: 'pingpong-3' })
//     } else if (e.target.value === 7) {
//       // eslint-disable-next-line react/no-unused-state
//       this.setState({ clickTag: 'pingpong-black' })
//     }
//   }

//   renderBaseLayerControl() {
//     return (
//       <LayersControl position="topleft">
//         {this.baseMaps.map(({ name, url, attribution, type, layer, format, checked = false }) => {
//           return type === 'wms' ? (
//             <LayersControl.BaseLayer key={name} name={name} checked={checked}>
//               <WMSTileLayer
//                 layers={layer}
//                 format={format}
//                 transparent={false}
//                 url={url}
//                 attribution={attribution}
//               />
//             </LayersControl.BaseLayer>
//           ) : (
//             <LayersControl.BaseLayer key={name} name={name} checked={checked}>
//               <TileLayer
//                 attribution={attribution}
//                 url={url}
//               />
//             </LayersControl.BaseLayer>
//             );
//         })}
//       </LayersControl>
//     );
//   }

//   render() {
//     const { geojson, items, lat, lng, submit, clickTag } = this.state
//     const tawat = geojson.map(object => object.geometry)
//     const mark = data1.map(item => item.geometry)
//     const aa12 = data1.map(item => item.properties)
//     const housename = aa12.map(object => object.villageName)
//     const mySet = new Set(housename)
//     const set1 = mySet.add()
//     console.log(set1,'มาสิ');
//     console.log(housename,'บ้านนนนนนนนนนนน');
//     const position = [lat, lng]
//     console.log(items, tawat,mark, 'พอไหม');

//     const content = (
//       <div>
//         <p>FBS ≤ 100 mg/dl</p>
//         <p>BP ≤ 120/80 mmHg</p>
//       </div>
//       );
//     const content1 = (
//       <div>
//         <p>FBS ≤ 100 {"<"} 125 mg/dl</p>
//         <p>BP ≤ 120/80 {"<"} 139/89 mmHg</p>
//       </div>
//         );
//     const content2 = (
//       <div>
//         <p>FBS ≤ 125 mg/dl</p>
//         <p>BP ≤ 139/89 mmHg</p>
//       </div>
//     );
//     const content3 = (
//       <div>
//         <p>FBS ≤ 126 {"<"} 154 mg/dl</p>
//         <p>BP ≤ 140/90 {"<"} 159/99 mmHg</p>
//         <p>HbA1C {"<"} 7 %</p>
//       </div>
//       );
//     const content4 = (
//       <div>
//         <p>FBS ≤ 155 {"<"} 182 mg/dl</p>
//         <p>BP ≤ 160/100 {"<"} 179/109 mmHg</p>
//         <p>HbA1C 7 {"<"} 8 %</p>
//       </div>
//       );
//     const content5 = (
//       <div>
//         <p>FBS ≥ 183 mg/dl</p>
//         <p>BP ≥ 180/110  mmHg</p>
//         <p>HbA1C {">"} 8 %</p>
//       </div>
//       );
//     const content6 = (
//       <div>
//         <p>FBS ≥ 183 mg/dl</p>
//         <p>BP ≥ 180/110  mmHg</p>
//         <p>HbA1C {">"} 8 %</p>
//         <p>โรคหัวใจ</p>
//         <p>หลอดเลือดสมอง</p>
//         <p>ไต/ตา/เท้า</p>
//       </div>
//       );

//     function refreshPage() {
//       window.location.reload(false);
//     }

//     const Complete = () => {
//       return (
//         <AutoComplete
//           style={{ width: 350, Color: '#000' }}
//           onSelect={(val) => {
//             this.setState({ submit: val })
//           }
//           }
//           dataSource={aa12.map(object => object.no + object.villageName)}
//           defaultValue={submit}
//           placeholder="บ้านเลขที่ / หมู่บ้าน"
//           filterOption={(inputValue, option) =>
//             option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
//           }
//         >
//           <Input suffix={<Icon type="search" onClick={refreshPage} className="certain-category-icon" />} allowClear />
//           {/* <Input suffix={<Icon type="search" className="certain-category-icon" />} allowClear /> */}
//         </AutoComplete>
//       );
//     }
//     return (
//       <div>
//         <Helmet title="Dashboard: Crypto" />
//         <div className="air__utils__heading">
//           <Row>
//             <Col span={23}>
//               <h5>ปิงปองจราจร 7 สี</h5>
//             </Col>
//             {/* <Col span={1}>
//               <UserMenu />
//             </Col> */}
//           </Row>
//         </div>
//         <Row>
//           <Col span={24}>
//             <Radio.Group onChange={this.checkIdItems}>
//               <Radio value={1}>ปกติ&nbsp; <Popover content={content} title="กลุ่มปกติ"><img src="circle.png" alt="" width="20" height="20" /></Popover></Radio>
//               <Radio value={2}>กลุ่มเสี่ยง&nbsp;<Popover content={content1} title="กลุ่มเสี่ยง"><img src="circlegreen.png" alt="" width="20" height="20" /></Popover></Radio>
//               <Radio value={3}>ป่วย 0&nbsp;<Popover content={content2} title="กลุ่มป่วย 0"><img src="circlegreenplush.png" alt="" width="20" height="20" /></Popover></Radio>
//               <Radio value={4}>ป่วย 1&nbsp;<Popover content={content3} title="กลุ่มป่วย 1"><img src="circleyello.png" alt="" width="20" height="20" /></Popover></Radio>
//               <Radio value={5}>ป่วย 2&nbsp;<Popover content={content4} title="กลุ่มป่วย 2"><img src="circleorange.png" alt="" width="20" height="20" /></Popover></Radio>
//               <Radio value={6}>ป่วย 3&nbsp;<Popover content={content5} title="กลุ่มป่วย 3"><img src="circlered.png" alt="" width="20" height="20" /></Popover></Radio>
//               <Radio value={7}>มีโรคแทรกซ้อน&nbsp;<Popover content={content6} title="กลุ่มป่วยมีโรคแทรกซ้อน"><img src="circleblack.png" alt="" width="20" height="20" /></Popover></Radio>
//             </Radio.Group>
//             <Complete />
//           </Col>
//         </Row>
//         <br /><br />
//         <Map
//           style={{ width: '81vw', height: '70vh' }}
//           center={position}
//           zoom={14}
//           fullscreenControl
//         >
//           {this.renderBaseLayerControl()}
//           {data1.map((item) => {
//             // console.log(item,'ฝนแข้ว');
//             let markerIcon1 = myIcon;
//             if (submit) {
//               if (item.properties.no + item.properties.villageName === submit && item.properties.tag[0] === "pingpong-normal") {
//                 markerIcon1 = writhIcon
//               } else if (item.properties.no + item.properties.villageName === submit && item.properties.tag[0] === "pingpong-risk") {
//                 markerIcon1 = greenIcon
//               } else if (item.properties.no + item.properties.villageName === submit && item.properties.tag[0] === "pingpong-0") {
//                 markerIcon1 = greenplushIcon
//               } else if (item.properties.no + item.properties.villageName === submit && item.properties.tag[0] === "pingpong-1") {
//                 markerIcon1 = yelloIcon
//               } else if (item.properties.no + item.properties.villageName === submit && item.properties.tag[0] === "pingpong-2") {
//                 markerIcon1 = orangeIcon
//               } else if (item.properties.no + item.properties.villageName === submit && item.properties.tag[0] === "pingpong-3") {
//                 markerIcon1 = redIcon
//               } else if (item.properties.no + item.properties.villageName === submit && item.properties.tag[0] === "pingpong-black") {
//                 markerIcon1 = blackIcon
//               }
//             } else if (clickTag === item.properties.tag[0] && clickTag === "pingpong-normal") {
//                 markerIcon1 = writhIcon
//               } else if (clickTag === item.properties.tag[0] && clickTag === "pingpong-risk") {
//                 markerIcon1 = greenIcon
//               } else if (clickTag === item.properties.tag[0] && clickTag === "pingpong-0") {
//                 markerIcon1 = greenplushIcon
//               } else if (clickTag === item.properties.tag[0] && clickTag === "pingpong-1") {
//                 markerIcon1 = yelloIcon
//               } else if (clickTag === item.properties.tag[0] && clickTag === "pingpong-2") {
//                 markerIcon1 = orangeIcon
//               } else if (clickTag === item.properties.tag[0] && clickTag === "pingpong-3") {
//                 markerIcon1 = redIcon
//               } else if (clickTag === item.properties.tag[0] && clickTag === "pingpong-black") {
//                 markerIcon1 = blackIcon
//               }
//               return(
//                 <Marker
//                   position={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}
//                   icon={markerIcon1}
//                 >
//                   <Popup>
//                     <span>
//                       <p>หมู่บ้าน:{item.properties.villageName}</p>
//                       <p>บ้านเลขที่:{item.properties.no}</p>
//                       <p>tag:{item.properties.tag}</p>
//                     </span>
//                   </Popup>
//                 </Marker>
//               )
//           }
//           )}
//         </Map>
//       </div>
//     )

//   }
// }
// export default DashboardCrypto

import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {
  AutoComplete,
  Input,
  Icon,
  Row,
  Col,
  Select,
  Form,
  InputNumber,
  Divider,
  Drawer,
  Button,
} from 'antd'
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

const { Option } = Select

const myIcon = L.icon({
  iconUrl: 'blue.png',
  // iconSize: [0,0],
  // iconAnchor: [12.5, 41],
  // popupAnchor: [0, 0]
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

class DashboardCrypto extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      geojson: [],
      lat: 13.520531624809204,
      lng: 100.00699460506439,
      submit: '',
      clickTag: '',
      click: '',
      checkVillage: '',
      clicknum: '',
      villageName: [],
      coordinates: [],
      house: [],
      houseaddress: [],
      icon: myIcon,
      visible: false,
    }
    localStorage.clear()
    this.baseMaps = [
      {
        name: 'Google Satellite',
        url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        // minZoom: 2,
        // maxZoom: 19,
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
    const houseid = item.id
    console.log(item, 'kffk')
    console.log('show drawer')
    console.log(item.id)
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

  checkIdItems = e => {
    if (e === 7) {
      const properties = data1.map(item => item.properties)
      const villageName = properties.filter(d => d.tag.indexOf('pingpong-normal') >= 0 && d)
      const coordinates = villageName.map(d => ({ ...d, icon: writhIcon }))
      // console.log(villageName)
      this.setState({
        clickTag: 'pingpong-normal',
        click: 'ปกติ',
        villageName,
        coordinates,
        icon: writhIcon,
        submit: villageName.no + villageName.villageName,
      })
    } else if (e === 6) {
      const properties = data1.map(item => item.properties)
      console.log(properties, 'มหานที')
      const villageName = properties.filter(d => d.tag.indexOf('pingpong-risk') >= 0 && d)
      const coordinates = villageName.map(d => ({ ...d, icon: greenIcon }))
      // console.log(villageName)
      this.setState({
        clickTag: 'pingpong-risk',
        click: 'ดูแลตัวเองได้',
        villageName,
        coordinates,
        icon: greenIcon,
      })
    } else if (e === 5) {
      const properties = data1.map(item => item.properties)
      const villageName = properties.filter(d => d.tag.indexOf('pingpong-0') >= 0 && d)
      const coordinates = villageName.map(d => ({ ...d, icon: greenplushIcon }))
      this.setState({
        clickTag: 'pingpong-0',
        click: 'กลุ่มเสี่ยงสูง',
        villageName,
        coordinates,
        icon: greenplushIcon,
      })
    } else if (e === 4) {
      const properties = data1.map(item => item.properties)
      const villageName = properties.filter(d => d.tag.indexOf('pingpong-1') >= 0 && d)
      const coordinates = villageName.map(d => ({ ...d, icon: yelloIcon }))
      // console.log(villageName)
      this.setState({
        clickTag: 'pingpong-1',
        click: 'ป่วย(อ่อน)',
        villageName,
        coordinates,
        icon: yelloIcon,
      })
    } else if (e === 3) {
      const properties = data1.map(item => item.properties)
      const villageName = properties.filter(d => d.tag.indexOf('pingpong-2') >= 0 && d)
      const coordinates = villageName.map(d => ({ ...d, icon: orangeIcon }))
      // console.log(villageName)
      this.setState({
        clickTag: 'pingpong-2',
        click: 'ป่วย(ปานกลาง)',
        villageName,
        coordinates,
        icon: orangeIcon,
      })
    } else if (e === 2) {
      const properties = data1.map(item => item.properties)
      const villageName = properties.filter(d => d.tag.indexOf('pingpong-3') >= 0 && d)
      const coordinates = villageName.map(d => ({ ...d, icon: redIcon }))
      this.setState({
        clickTag: 'pingpong-3',
        click: 'ป่วย(รุนแรง)',
        villageName,
        coordinates,
        icon: redIcon,
      })
    } else if (e === 1) {
      const properties = data1.map(item => item.properties)
      const villageName = properties.filter(d => d.tag.indexOf('pingpong-black') >= 0 && d)
      const coordinates = villageName.map(d => ({ ...d, icon: blackIcon }))
      this.setState({
        clickTag: 'pingpong-black',
        click: 'ป่วยรุนแรง(โรคแทรกซ้อน)',
        villageName,
        coordinates,
        icon: blackIcon,
      })
    }
  }

  checkVillage = e => {
    const { villageName, icon } = this.state
    const villageNameArr = villageName.filter(d => d.villageName === e)
    const coordinates = villageNameArr.map(d => ({ ...d, icon }))
    this.setState({ coordinates })
  }

  clicknum = value => {
    console.log('changed', value)
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
    const {
      geojson,
      items,
      lat,
      lng,
      submit,
      clickTag,
      clicknum,
      click,
      checkVillage,
      villageName,
      coordinates,
      houseaddress,
      house,
      visible,
    } = this.state
    const monentFun = moment()
    const housenovillage = houseaddress.map(object => object.properties)
    const tawat = geojson.map(object => object.geometry)
    const mark = data1.map(item => item.geometry)
    const aa12 = data1.map(item => item.properties)
    const housename = aa12.map(object => object.villageName)
    console.log(housename, clickTag, clicknum, 'uuuu')
    const vln = villageName.map(item => item.villageName)
    const mySet = new Set(vln)
    const set1 = Array.from(mySet)
    // console.log(set1, 'มาสิ');
    const position = [lat, lng]
    console.log(items, tawat, mark, click, checkVillage, 'พอไหม')

    function refreshPage() {
      window.location.reload(false)
    }

    console.log(coordinates, villageName)

    const MakeItem = X => {
      return <Option value={X}>{X}</Option>
    }

    const FormSizeDemo = () => {
      return (
        <>
          <Form labelCol={{ span: 2 }} wrapperCol={{ span: 20 }} layout="horizontal">
            <Form.Item label="กลุ่ม">
              <Select onChange={this.checkIdItems} defaultValue={click}>
                <Select.Option value={1}>
                  <img src="circleblack.png" alt="" width="20" height="20" />{' '}
                  ป่วยรุนแรง(โรคแทรกซ้อน)
                </Select.Option>
                <Select.Option value={2}>
                  <img src="circlered.png" alt="" width="20" height="20" /> ป่วย(รุนแรง)
                </Select.Option>
                <Select.Option value={3}>
                  <img src="circleorange.png" alt="" width="20" height="20" /> ป่วย(ปานกลาง)
                </Select.Option>
                <Select.Option value={4}>
                  <img src="circleyello.png" alt="" width="20" height="20" /> ป่วย(อ่อน)
                </Select.Option>
                <Select.Option value={5}>
                  <img src="circlegreenplush.png" alt="" width="20" height="20" /> กลุ่มเสี่ยงสูง
                </Select.Option>
                <Select.Option value={6}>
                  <img src="circlegreen.png" alt="" width="20" height="20" /> ดูแลตัวเองได้
                </Select.Option>
                <Select.Option value={7}>
                  <img src="circle.png" alt="" width="20" height="20" />
                  ปกติ
                </Select.Option>
                <Select.Option value={8}>ไม่ได้ตรวจ</Select.Option>
              </Select>
            </Form.Item>
          </Form>
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
    return (
      <div>
        <Helmet title="Dashboard: Crypto" />
        <div className="air__utils__heading">
          <Row>
            <Col span={23}>
              <h5>ปิงปองจราจร 7 สี</h5>
            </Col>
          </Row>
        </div>
        <Row>
          <Col span={16} />
          <Col span={8}>
            <Complete />
          </Col>
        </Row>
        <Row>
          <p style={{ color: 'red' }}>ประเมินความเสี่ยง DM/HT</p>
          <Col span={10}>
            <FormSizeDemo />
          </Col>
          <Col span={8}>
            <Form layout="inline">
              <Form.Item label="หมู่บ้าน">
                <Select style={{ width: 300 }} onChange={this.checkVillage}>
                  {set1.map(MakeItem)}
                </Select>
              </Form.Item>
            </Form>
          </Col>
          <Col span={6}>
            <Form layout="inline">
              <Form.Item label="อายุ">
                <InputNumber min={30} max={100} defaultValue={30} onChange={this.clicknum} />
                &nbsp; ขึ้นไป
              </Form.Item>
            </Form>
          </Col>
        </Row>
        {/* <Complete /> */}
        <br />
        <Map
          style={{ width: '81vw', height: '70vh' }}
          center={position}
          zoom={14}
          // fullscreenControl
        >
          <FullscreenControl position="topleft" />
          {this.renderBaseLayerControl()}
          {coordinates.map(item => {
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
                position={[item.location.coordinates[1], item.location.coordinates[0]]}
                icon={item.icon}
              >
                <Popup>
                  <span>
                    <p>หมู่บ้าน:{item.villageName}</p>
                    <p>บ้านเลขที่:{item.no}</p>
                    <p>tag:{item.tag}</p>
                    <p>รพ.สต.:{item.id}</p>
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
export default DashboardCrypto
