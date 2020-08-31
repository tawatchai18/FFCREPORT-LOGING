import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Menu, Dropdown, Avatar, Badge } from 'antd'
import styles from './style.module.scss'

@connect(({ user }) => ({ user }))
class ProfileMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      redirectToReferrer: false,
    }
    this.logout = this.logout.bind(this)
  }
  // state = {
  //   count: 7,
  // }

  // logout = () => {
  //   const { dispatch } = this.props
  //   dispatch({
  //     type: 'user/LOGOUT',
  //   })
  // }
  logout() {
    sessionStorage.getItem('userData', '')
    sessionStorage.clear()
    // eslint-disable-next-line react/no-unused-state
    this.setState({ redirectToReferrer: true })
  }

  render() {
    if (this.redirectToReferrer) {
      return <Redirect to="/" />
    }
    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <a href="/" onClick={this.logout}>
            <i className={`${styles.menuIcon} fe fe-log-out`} />
            Logout
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      // <a href="/" onClick={this.logout} className="logout">ออกจากระบบ</a>
      <Dropdown overlay={menu} trigger={['click']} onVisibleChange={this.addCount}>
        <div className={styles.dropdown}>
          <Badge>
            <Avatar className={styles.avatar} shape="square" size="large" icon="user" />
          </Badge>
        </div>
      </Dropdown>
    )
  }
}

export default ProfileMenu
