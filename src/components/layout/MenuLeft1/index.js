import React from 'react'
import { Layout, Menu } from 'antd'
import DashboardCrypto from 'pages/dashboard/crypto'

const { Sider, Content, Header } = Layout

class MenuLeft1 extends React.Component {
  render() {
    return (
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
            <Menu.Item key="4">nav 4</Menu.Item>
            <Menu.Item key="5">nav 5</Menu.Item>
            <Menu.Item key="6">nav 6</Menu.Item>
            <Menu.Item key="7">nav 7</Menu.Item>
            <Menu.Item key="8">nav 8</Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
              <DashboardCrypto />
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
export default MenuLeft1
