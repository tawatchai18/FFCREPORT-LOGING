import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import Switch from 'react-router-transition-switch'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'
import Layout from 'layouts'
import NotFoundPage from 'pages/system/404'
import Loader from 'components/layout/Loader'
import UserDetail from 'pages/dashboard/userdetail'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />,
  })

const routes = [
  // Dashboards
  {
    path: '/dashboard/analytics',
    Component: loadable(() => import('pages/dashboard/analytics')),
    exact: true,
  },
  {
    path: '/dashboard/crypto',
    Component: loadable(() => import('pages/dashboard/crypto')),
    exact: true,
  },
  {
    path: '/dashboard/elderly',
    Component: loadable(() => import('pages/dashboard/elderly')),
    exact: true,
  },
  {
    path: '/dashboard/symptom',
    Component: loadable(() => import('pages/dashboard/symptom')),
    exact: true,
  },
  {
    path: '/dashboard/editmark',
    Component: loadable(() => import('pages/dashboard/editmark')),
    exact: true,
  },
  {
    path: '/dashboard/userdetail',
    Component: loadable(() => import('pages/dashboard/userdetail')),
    exact: true,
  },
  {
    path: '/system/editeupdatemarker',
    Component: loadable(() => import('pages/system/editeupdatemarker')),
    exact: true,
  },
  // {
  //   path: '/dashboard/pingpong',
  //   Component: loadable(() => import('pages/dashboard/pingpong')),
  //   exact: true,
  // },
  {
    path: '/system/login',
    Component: loadable(() => import('pages/system/login')),
    exact: true,
  },
]

const mapStateToProps = ({ settings }) => ({ settings })

@connect(mapStateToProps)
class Router extends React.Component {
  render() {
    const {
      history,
      settings: { routerAnimation },
    } = this.props
    return (
      <ConnectedRouter history={history}>
        <Layout>
          <Switch
            render={props => {
              const {
                children,
                location: { pathname },
              } = props
              return (
                <SwitchTransition>
                  <CSSTransition
                    key={pathname}
                    classNames={routerAnimation}
                    timeout={routerAnimation === 'none' ? 0 : 300}
                  >
                    {children}
                  </CSSTransition>
                </SwitchTransition>
              )
            }}
          >
            <Route path="/dashboard/userdetail" key="dashboarduserdetail" component={UserDetail} />
            <Route exact path="/" render={() => <Redirect to="/dashboard/analytics" />} />
            {routes.map(({ path, Component, exact }) => (
              <Route path={path} key={path} exact={exact}>
                <Component />
              </Route>
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
      </ConnectedRouter>
    )
  }
}
export default Router
