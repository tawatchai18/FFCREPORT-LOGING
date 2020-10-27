import React, { Component, Suspense } from 'react'
import { Redirect } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { Form, Input, Button } from 'antd'
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation'
import { Button, Label, Col, Row } from 'reactstrap'
import swal from 'sweetalert'
import style from '../style.module.scss'
import { PostData, Data } from './PostData'

let temp = null

class Login extends Component {
  constructor() {
    super()
    this.state = {
      id: '', // เพิ่ม state id
      username: '',
      password: '',
      redirectToReferrer: false,
      loading: false,
    }
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  // eslint-disable-next-line consistent-return
  createTable = () => {
    const table = []
    if (!temp || temp === null) {
      Data().then(result => {
        temp = result
        temp.forEach(element => {
          table.push(<option value={element.id}>{element.name}</option>)
        })
        // eslint-disable-next-line react/no-unused-state
        this.setState({ loading: true })
        return table
      })
    } else {
      temp.forEach(element => {
        table.push(<option value={element.id}>{element.name}</option>)
      })

      return table
    }
  }

  handleValidSubmit() {
    if (this.state) {
      // ดึงตัวแปรออกมาจาก state ให้ใช้ง่ายๆ
      const { id, username, password } = this.state
      // ส่งตัวแปรเข้า PostData น่าจะใช้แค่ username กับ password ปะ???
      PostData('handleValidSubmit', { username, password }, id).then(result => {
        const responseJson = result
        if (responseJson.user) {
          localStorage.setItem('userdata', JSON.stringify(responseJson))
          sessionStorage.setItem('userData', JSON.stringify(responseJson))
          // eslint-disable-next-line react/no-unused-state
          this.setState({ redirectToReferrer: true })
        } else if (result.code === 401) {
          swal({
            // title: "Are you sure?",
            text: 'ชื่อผู้ใช้ หรือ รหัสไม่ตรงกับในระบบ กรุณาลองใช้ใหม่อีกครั้ง',
            icon: 'warning',
          })
          // eslint-disable-next-line no-alert
          // alert('ชื่อผู้ใช้ หรือ รหัสไม่ตรงกับในระบบ กรุณาลองใช้ใหม่อีกครั้ง', result.code)
        }
      })
    }
  }

  // eslint-disable-next-line react/sort-comp
  onChange(e) {
    const idOption = e.target.value
    this.setState({ [e.target.name]: e.target.value })
    Data().then(d => {
      let data = ''
      // eslint-disable-next-line no-return-assign
      d.filter(dd => (dd.id === idOption ? (data = dd.name) : {}))
      localStorage.setItem('idOpn', data)
    })
  }

  render() {
    const { loading, redirectToReferrer } = this.state
    if (redirectToReferrer) {
      return <Redirect to="/dashboard/elderly" />
    }

    if (sessionStorage.getItem('userData')) {
      return <Redirect to="/dashboard/elderly" />
    }

    return (
      <div className={style.auth}>
        <div className="pt-5 pb-5 d-flex align-items-end mt-auto">
          <div className="text-dark font-size-30 mb-2 text-center" style={{ color: '#1b55e3' }}>
            เข้าสู่ระบบ
          </div>
          {/* <img src="resources/images/air-logo.png" alt="AIR UI Logo" /> */}
          {/* <div className="air__utils__logo__text">
            <div className="air__utils__logo__name text-uppercase text-dark font-size-21">
              AIR UI
            </div>
            <div className="air__utils__logo__descr text-uppercase font-size-12 text-gray-6">
              Admin template
            </div>
          </div> */}
        </div>
        <div>
          <center>
            <h style={{ color: 'red' }}>
              เนื่องจากข้อมูลเป็นความลับของหน่วยงาน ระบบขอตรวจสอบการเข้าถึง
            </h>
            <br />
            <h style={{ color: 'red' }}>โดย user/password เป็นของระบบฐานข้อมูล JHCIS เดิม</h>
          </center>
        </div>
        <br />
        <div className={`${style.container} pl-5 pr-5 pt-5 pb-5 bg-white`}>
          {/* <div className="text-dark font-size-30 mb-2 text-center">Log In</div> */}
          {/* <div className="text-muted text-center mb-4">
            Login and password - admin@mediatec.org / mediatec
          </div> */}
          <AvForm
            style={{ fontSize: 18 }}
            onValidSubmit={this.handleValidSubmit}
            onInvalidSubmit={this.handleInvalidSubmit}
          >
            <AvGroup>
              <Label for="example">รพ.สต.</Label>
              {/* เปลี่ยน name เป็น id */}
              <AvInput type="select" name="id" onChange={this.onChange} loading={loading} required>
                <option value="" disabled>
                  --- รพ.สต. ---
                </option>
                <Suspense fallback={<div />}>{this.createTable()}</Suspense>
              </AvInput>
              <AvFeedback>กรุณาเลือก รพ.สต.</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="example">ชือผู้ใช้</Label>
              <AvInput name="username" placeholder="username" onChange={this.onChange} required />
              <AvFeedback>กรุณากรอกชื่อผู้ใช้</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="example">รหัสผ่าน</Label>
              <AvInput
                type="password"
                name="password"
                id="examplePassword"
                placeholder="password"
                onChange={this.onChange}
                required
              />
              <AvFeedback>กรุณากรอกรหัสผ่าน</AvFeedback>
            </AvGroup>
            <Row>
              <Col>
                <center>
                  <Button color="primary">เข้าสู่ระบบ</Button>
                </center>
                {/* <Link to="/signup">
                  <Button style={{ marginLeft: 10 }} color="primary" className="px-4">สมัครใช้งาน</Button>
                </Link> */}
              </Col>
              {/* <Col xs="4" className="text-right">
                <Link to="/ForgotPassword">
                  <Button color="link" className="px-0">ลืมรหัสผ่าน</Button>
                </Link>
              </Col> */}
            </Row>
          </AvForm>
          {/* <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit} className="mb-4">
            <Form.Item>
              {form.getFieldDecorator('email', {
                initialValue: 'admin@mediatec.org',
                rules: [{ required: true, message: 'Please input your e-mail address' }],
              })(<Input size="large" placeholder="Email" />)}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('password', {
                initialValue: 'mediatec',
                rules: [{ required: true, message: 'Please input your password' }],
              })(<Input size="large" type="password" placeholder="Password" />)}
            </Form.Item>
            <Button
              type="primary"
              size="large"
              className="text-center btn btn-success w-100 font-weight-bold font-size-18"
              htmlType="submit"
              loading={loading}
            >
              Log In
            </Button>
          </Form> */}
          {/* <Link
            to="/system/register"
            className={`${style.googleSign} font-weight-bold font-size-18 text-dark btn btn-outline-light w-100 mb-3`}
            style={{ backgroundImage: 'url(resources/images/icons/google-logo.svg)' }}
          >
            Log in with Google
          </Link>
          <div className="text-center">
            <Link to="/system/forgot-password" className="text-blue font-weight-bold font-size-18">
              Forgot password?
            </Link>
          </div>
        </div>
        <div className="text-center font-size-18 pt-4 mb-auto">
          <span className="mr-2">Don&apos;t have an account?</span>
          <Link to="/system/register" className="font-weight-bold text-blue text-underlined">
            <u>Sign Up</u>
          </Link> */}
        </div>
        <div className="mt-auto pb-5 pt-5">
          {/* <ul
            className={`${style.footerNav} list-unstyled d-flex mb-2 flex-wrap justify-content-center`}
          >
            <li>
              <a href="javascript: void(0);">Terms of Use</a>
            </li>
            <li>
              <a href="javascript: void(0);">Compliance</a>
            </li>
            <li>
              <a href="javascript: void(0);">Support</a>
            </li>
            <li>
              <a href="javascript: void(0);">Contacts</a>
            </li>
          </ul> */}
          <div className="text-gray-4 text-center">
            Copyright © 2019 NSTDA National Science and Technology Development Agency
          </div>
        </div>
      </div>
    )
  }
}

export default Login
