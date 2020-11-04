import React from 'react'
import _ from 'lodash'
import { Helmet } from 'react-helmet'
import { Col, Tabs } from 'antd'
// import { Tabs } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import moment from 'moment'
import BloodPressure from 'components/widgets/Charts/bloodPressure'
import Oxygen from 'components/widgets/Charts/Oxygenblood'
import Heartrate from 'components/widgets/Charts/Heartrate'
import BMI from 'components/widgets/Charts/BMI'
import Weigth from 'components/widgets/Charts/weigth'
import { userDetail } from '../../../components/system/Auth/Login/PostData'

const { TabPane } = Tabs

class UserDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      healthcareservice: [],
      isLoaded: false,
      error: null,
    }
  }

  componentDidMount() {
    const sessionValue = localStorage.getItem('userUnit')
    const data = sessionStorage.getItem('userData')
    const personid = JSON.parse(sessionValue)
    const personuser = personid.id
    const dataJson = JSON.parse(data)
    const id = dataJson.user.orgId

    userDetail(id, dataJson.token, personuser).then(
      result => {
        this.setState({
          healthcareservice: result,
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

  calAge = val => {
    const diff = moment(val).diff(moment(), 'milliseconds')
    const duration = moment.duration(diff)
    return duration
  }

  render() {
    const { healthcareservice, isLoaded, error } = this.state

    // if (error) {
    //   return <div>Error: {error.message}</div>
    // }
    // if (isLoaded) {
    //   return <div>Loading...</div>
    // }
    const health = _.last(healthcareservice)
    const healthdetail = Object(health)
    const sessionValue = localStorage.getItem('userUnit')

    let user
    if (!user) {
      user = JSON.parse(sessionValue)
    } else {
      user = <div>Loading...</div>
    }

    let realationships1
    if (user.relationships !== undefined) {
      realationships1 = user.relationships.filter(item => item.id)
    } else {
      realationships1 = <div>Loading...</div>
    }
    const listItems = realationships1.map(item => {
      let relates
      if (item.relate === 'Father') {
        relates = 'พ่อ'
      } else if (item.relate === 'Mother') {
        relates = 'แม่'
      } else if (item.relate === 'Married') {
        relates = 'แต่งงาน'
      } else if (item.relate === 'Child') {
        relates = 'ลูก'
      }
      return (
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-wrap align-items-center">
              <Col span={4}>
                <img src="resources/images/content/hands.png" alt="Hands" />
              </Col>
              <div className="mr-auto">
                <p>ชื่อ: {item.name}</p>
                <p>ความสัมพันธ์: {relates}</p>
              </div>
            </div>
          </div>
        </div>
      )
    })

    // const monentFun = moment()
    const birthDate = this.calAge(user.birthDate)
    // eslint-disable-next-line no-underscore-dangle
    const year = String(birthDate._data.years).replace('-', '')
    // eslint-disable-next-line no-underscore-dangle
    const month = String(birthDate._data.months).replace('-', '')
    // eslint-disable-next-line no-underscore-dangle
    const day = String(birthDate._data.days).replace('-', '')
    // eslint-disable-next-line no-new-object
    const myCar = new Object(user.chronics)
    const Car = myCar.map(ite => ite.disease)
    const compost = _.uniqBy(
      Car.map(obj => obj.translation),
      'th',
    )
    // const weigths = healthdetail.weight
    // const heightSquared = healthdetail.height/100 * healthdetail.height/100
    // const bmi = weigths/heightSquared
    // const bmisuccess = Math.round(bmi * 100) / 100
    const chronic = compost.map(d => {
      return (
        <div>
          <p style={{ textAlign: 'left' }}>{d.th}</p>
        </div>
      )
    })

    let bmisuccess
    if (healthdetail !== undefined) {
      const weigths = healthdetail.weight
      const heightSquared = ((healthdetail.height / 100) * healthdetail.height) / 100
      const bmi = weigths / heightSquared
      bmisuccess = Math.round(bmi * 100) / 100
    } else if (healthdetail === undefined) {
      bmisuccess = <p>-</p>
    }

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
              {user.prename}&nbsp;{user.firstname}&nbsp;&nbsp;{user.lastname}
            </div>
            <div className="text-uppercase font-size-12 mb-3">
              อายุ&nbsp;{`${year} ปี ${month} เดือน ${day} วัน`}
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-lg-4">
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
            <div className="col-lg-4">
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
            <div className="col-lg-4">
              <div className="card text-white bg-primary">
                <div className="card-body" style={{ width: 180 }}>
                  <div className="d-flex flex-wrap align-items-center">
                    <div>
                      <p>BMI:</p>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <p> {bmisuccess}</p>
                    {/* <p>{message}</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="card-container">
          <Tabs type="card">
            <TabPane tab="รายละเอียดผู้ดูแลรักษา" key="1">
              <br />
              <br />
              <div className="row">
                <div className="col-xl-5 col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex flex-wrap align-items-center">
                        <div className="mr-auto">
                          <p className="text-uppercase text-dark font-weight-bold font-size-18 mb-1">
                            โรค :
                          </p>
                          <p />
                        </div>
                        <p className="text-primary font-weight-bold font-size-16 mb-0">
                          {userMessage}
                        </p>
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
                        </div>
                        <p className="text-primary font-weight-bold font-size-16 mb-0">{syntom1}</p>
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
                        </div>
                        <p className="text-primary font-weight-bold font-size-16 mb-0">
                          {suggestion1}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-12">
                  <BMI healthdetail={healthdetail} isLoaded={isLoaded} error={error} />
                </div>
              </div>
              <div className="row">
                <div className="col-xl-6 col-lg-12">
                  <div className="card air__utils__cardMarked air__utils__cardMarked--primary">
                    <div className="card-header card-header-flex">
                      <div className="d-flex flex-column justify-content-center mr-auto">
                        <h5 className="mb-0">ความดันโลหิต</h5>
                      </div>
                    </div>
                    <div className="card-body">
                      <BloodPressure
                        healthdetail={healthdetail}
                        items={healthcareservice}
                        isLoaded={isLoaded}
                        error={error}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12">
                  <div className="card air__utils__cardMarked air__utils__cardMarked--primary">
                    <div className="card-header card-header-flex">
                      <div className="d-flex flex-column justify-content-center mr-auto">
                        <h5 className="mb-0">อุณหภูมิ และ อัตราการเต้นของหัวใจ</h5>
                      </div>
                    </div>
                    <div className="card-body">
                      <Heartrate
                        healthdetail={healthdetail}
                        items={healthcareservice}
                        isLoaded={isLoaded}
                        error={error}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-6 col-lg-12">
                  <div className="card air__utils__cardMarked air__utils__cardMarked--primary">
                    <div className="card-header card-header-flex">
                      <div className="d-flex flex-column justify-content-center mr-auto">
                        <h5 className="mb-0">อัตราการหายใจ และ ค่าน้ำตาลในเลือด</h5>
                      </div>
                    </div>
                    <div className="card-body">
                      <Oxygen
                        healthdetail={healthdetail}
                        items={healthcareservice}
                        isLoaded={isLoaded}
                        error={error}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12">
                  <div className="card air__utils__cardMarked air__utils__cardMarked--primary">
                    <div className="card-header card-header-flex">
                      <div className="d-flex flex-column justify-content-center mr-auto">
                        <h5 className="mb-0">น้ำหนัก ส่วนสูง</h5>
                      </div>
                    </div>
                    <div className="card-body">
                      <Weigth
                        healthdetail={healthdetail}
                        items={healthcareservice}
                        isLoaded={isLoaded}
                        error={error}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="ความสัมพันธ์" key="2">
              <div className="col-xl-12 col-lg-12">
                <div className="card air__utils__cardMarked air__utils__cardMarked--primary">
                  <div className="card-header card-header-flex flex-column">
                    <div className="d-flex flex-wrap pt-3 pb-4 mb-3">
                      <div className="text-dark font-size-18 font-weight-bold">ความสัมพันธ์</div>
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
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}
export default UserDetail
