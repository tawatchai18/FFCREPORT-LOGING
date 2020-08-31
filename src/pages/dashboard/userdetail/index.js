import React from 'react'
import _ from 'lodash'
import { Helmet } from 'react-helmet'
import { Collapse, Col } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import moment from 'moment'
import BloodPressure from 'components/widgets/Charts/bloodPressure'
import Oxygen from 'components/widgets/Charts/Oxygenblood'
import Heartrate from 'components/widgets/Charts/Heartrate'
import { userDetail } from '../../../components/system/Auth/Login/PostData'

const { Panel } = Collapse

function callback(key) {
  console.log(key)
}

class UserDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    const sessionValue = localStorage.getItem('userUnit')
    const data = sessionStorage.getItem('userData')
    const personid = JSON.parse(sessionValue)
    console.log(personid, 'idef')
    const personuser = personid.id
    const dataJson = JSON.parse(data)
    const id = dataJson.user.orgId

    userDetail(id, dataJson.token, personuser).then(result => {
      this.setState({
        items: result,
      })
    })
  }

  myFunction = () => {
    let text = ' '
    let i
    // eslint-disable-next-line no-plusplus
    for (i = 0; i < 5; i++) {
      text += `${i}`
    }
    return text
  }

  render() {
    const { items } = this.state
    console.log(items, 'ข้อมูลการบริการ')
    const sessionValue = localStorage.getItem('userUnit')
    const personid = JSON.parse(sessionValue)
    console.log(personid.relationships, 'ครอบครัว')
    const realationships = personid.relationships.filter(item => item.id)
    console.log(realationships, 'มาดิว่ะ')
    const listItems = realationships.map(item => (
      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-wrap align-items-center">
            <Col span={4}>
              <img src="resources/images/content/hands.png" alt="Hands" />
            </Col>
            <div className="mr-auto">
              <p>ชื่อ: {item.name}</p>
              <p>ความสัมพันธ์: {item.relate}</p>
              <p>อายุ: {item.age}</p>
            </div>
          </div>
        </div>
      </div>
    ))
    // console.log(items.map(item => item.bloodPressure),'How Toooo......');
    const health = _.last(items)
    const healthdetail = Object(health)
    // console.log(healthdetail,'llkkhj');
    const user = JSON.parse(sessionValue)
    const monentFun = moment()
    // eslint-disable-next-line no-new-object
    const myCar = new Object(user.chronics)
    console.log(myCar, 'โรครุมเร้าหรือหรอและ')
    const Car = myCar.map(ite => ite.disease)
    const compost = _.uniqBy(Car.map(obj => obj.translation), 'th')
    console.log(compost, 'กระทำที')
    const chronic = compost.map(d => {
      return (
        <div>
          <p style={{ textAlign: 'left' }}>{d.th}</p>
        </div>
      )
    })

    let userMessage
    if (myCar.length > 0) {
      userMessage = chronic
    } else {
      userMessage = <p style={{ textAlign: 'left' }}>ไม่มีโรค</p>
    }

    const syntom12 = healthdetail.syntom
    const suggestion12 = healthdetail.suggestion

    let syntom1
    if (healthdetail.syntom !== undefined) {
      syntom1 = syntom12
    } else {
      syntom1 = <p style={{ textAlign: 'left' }}>-</p>
    }

    let suggestion1
    if (healthdetail.suggestion !== undefined) {
      suggestion1 = suggestion12
    } else {
      suggestion1 = <p style={{ textAlign: 'left' }}>-</p>
    }

    return (
      <div>
        <Helmet title="Apps: Profile" />
        <div className="air__utils__heading">
          <h5>Profile</h5>
        </div>

        <div className="d-flex flex-wrap flex-column align-items-center">
          <div className="air__utils__avatar air__utils__avatar--size64 mb-3">
            {healthdetail.photosUrl}
          </div>
          <div className="text-center">
            <div className="text-dark font-weight-bold font-size-18">
              {user.firstname}&nbsp;&nbsp;{user.lastname}
            </div>
            <div className="text-uppercase font-size-12 mb-3">
              อายุ&nbsp;{monentFun.diff(user.birthDate, 'years')}&nbsp;ปี
            </div>
          </div>
          <br />
          {/* <Row gutter={24}>
            <Col span={4}>
              <p>โรค :</p>
            </Col>
            <Col span={16}>
              <button
                style={{ width: 400 }}
                type="button"
                className="btn btn-primary btn-with-addon"
              >
                {userMessage}
              </button>
            </Col>
          </Row>
          <br />
          <Row gutter={24}>
            <Col span={4}>
              <p>อาการ :</p>
            </Col>
            <Col span={16}>
              <button
                style={{ width: 400 }}
                type="button"
                className="btn btn-primary btn-with-addon"
              >
                {syntom1}
              </button>
            </Col>
          </Row>
          <br />
          <Row gutter={24}>
            <Col span={5}>
              <p>ข้อเสนอแนะ :</p>
            </Col>
            <Col span={16}>
              <button
                style={{ width: 400 }}
                type="button"
                className="btn btn-primary btn-with-addon"
              >
                {suggestion1}
              </button>
            </Col>
          </Row> */}
          <br />
          <div className="row">
            <div className="col-lg-6">
              <div className="card text-white bg-primary">
                <div className="card-body" style={{ width: 150 }}>
                  <center>
                    <div className="d-flex flex-wrap align-items-center">
                      <div>
                        <p>น้ำหนัก:</p>
                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <p>{healthdetail.weight}</p>
                    </div>
                  </center>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card text-white bg-primary">
                <div className="card-body" style={{ width: 180 }}>
                  <div className="d-flex flex-wrap align-items-center">
                    <div>
                      <p>ส่วนสูง:</p>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <p>{healthdetail.height}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-xl-4 col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="mr-auto">
                    <p className="text-uppercase text-dark font-weight-bold font-size-18 mb-1">
                      โรค :
                    </p>
                    {/* <p className="text-gray-5 mb-0">คุณมีโรคประจำตัวหรือไม่</p> */}
                  </div>
                  <p className="text-primary font-weight-bold font-size-18 mb-0">{userMessage}</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="mr-auto">
                    <p className="text-uppercase text-dark font-weight-bold font-size-18 mb-1">
                      อาการ :
                    </p>
                    {/* <p className="text-gray-5 mb-0">มีอาการอะไรบ้าง</p> */}
                  </div>
                  <p className="text-primary font-weight-bold font-size-18 mb-0">{syntom1}</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-wrap align-items-center">
                  <div className="mr-auto">
                    <p className="text-uppercase text-dark font-weight-bold font-size-18 mb-1">
                      ข้อเสนอแนะ :
                    </p>
                    {/* <p className="text-gray-5 mb-0"></p> */}
                  </div>
                  <p className="text-primary font-weight-bold font-size-18 mb-0">{suggestion1}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-12">
            <div className="card">
              <div className="card-header card-header-flex flex-column">
                <div className="d-flex flex-wrap pt-3 pb-4 mb-3">
                  {/* <div className="mr-5"> */}
                  <div className="text-dark font-size-18 font-weight-bold">ความสัมพันธ์</div>
                  {/* </div> */}
                </div>
              </div>
              <div className="card-body">
                <div className="height-300">
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
                    {listItems}
                  </Scrollbars>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap flex-column align-items-center">
          <Collapse onChange={callback} style={{ width: 500, backgroundColor: 'azure' }}>
            <Panel header="อุณหภูมิ และ อัตราการเต้นของหัวใจ" key="1">
              <Heartrate healthdetail={healthdetail} items={items} />
            </Panel>
          </Collapse>
        </div>
        <br />
        <div className="d-flex flex-wrap flex-column align-items-center">
          <Collapse onChange={callback} style={{ width: 500, backgroundColor: 'azure' }}>
            <Panel header="ความดันโลหิต" key="3">
              <BloodPressure healthdetail={healthdetail} items={items} />
            </Panel>
          </Collapse>
        </div>
        <br />
        <div className="d-flex flex-wrap flex-column align-items-center">
          <Collapse onChange={callback} style={{ width: 500, backgroundColor: 'azure' }}>
            <Panel header="การหายใจ และ ความอิ่มตัวของออกซิเจนในเลือด" key="3">
              <Oxygen healthdetail={healthdetail} />
            </Panel>
          </Collapse>
        </div>
      </div>
    )
  }
}
export default UserDetail
