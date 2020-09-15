import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import _ from 'lodash'
import classNames from 'classnames'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Layout } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import style from './style.module.scss'
import UserMenu from '../TopBar/UserMenu/index'

const { Sider } = Layout
const mapStateToProps = ({ menuleft, settings }) => ({
  menuDataleft: menuleft.menuDataleft,
  settings,
  flyoutActive:
    (settings.menuType === 'flyout' ||
      settings.menuType === 'compact' ||
      settings.isMenuCollapsed) &&
    !settings.isMobileView,
})

@withRouter
@connect(mapStateToProps)
class MenuLeft extends React.Component {
  state = {
    activeSubmenu: '',
    activeItem: '',
    renderedFlyoutItems: {},
  }

  flyoutTimers = {}

  currentLocation = ''

  componentDidMount() {
    this.setActiveItems(this.props)
  }

  componentWillReceiveProps(newProps) {
    const { pathname } = newProps.location
    if (this.currentLocation !== pathname) {
      this.setActiveItems(newProps)
      this.currentLocation = pathname
    }
  }

  toggleSettings = () => {
    const { dispatch, settings } = this.props
    const { isSidebarOpen } = settings
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isSidebarOpen',
        value: !isSidebarOpen,
      },
    })
  }

  toggleMenu = () => {
    const { dispatch, settings } = this.props
    const { isMenuCollapsed } = settings
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isMenuCollapsed',
        value: !isMenuCollapsed,
      },
    })
  }

  toggleMobileMenu = () => {
    const { dispatch, settings } = this.props
    const { isMobileMenuOpen } = settings
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isMobileMenuOpen',
        value: !isMobileMenuOpen,
      },
    })
  }

  handleSubmenuClick = key => {
    const { activeSubmenu } = this.state
    const { flyoutActive } = this.props
    if (flyoutActive) {
      return
    }
    this.setState({
      activeSubmenu: activeSubmenu === key ? '' : key,
    })
  }

  handleFlyoutOver = (event, key, items) => {
    const { flyoutActive } = this.props
    if (flyoutActive) {
      clearInterval(this.flyoutTimers[key])
      const item = event.currentTarget
      const itemDimensions = item.getBoundingClientRect()
      const element = this.renderFlyoutMenu(items, key, itemDimensions)
      this.setState(state => ({
        renderedFlyoutItems: {
          ...state.renderedFlyoutItems,
          [key]: element,
        },
      }))
    }
  }

  handleFlyoutOut = key => {
    const { flyoutActive } = this.props
    if (flyoutActive) {
      this.flyoutTimers[key] = setTimeout(() => {
        this.setState(state => {
          delete state.renderedFlyoutItems[key]
          return {
            renderedFlyoutItems: {
              ...state.renderedFlyoutItems,
            },
          }
        })
      }, 100)
    }
  }

  handleFlyoutContainerOver = key => {
    clearInterval(this.flyoutTimers[key])
  }

  renderFlyoutMenu = (items, key, itemDimensions) => {
    const { settings } = this.props
    // const { activeItem } = this.state
    const left = `${itemDimensions.left + itemDimensions.width - 10}px`
    const top = `${itemDimensions.top}px`

    return (
      <div
        style={{ left, top }}
        className={classNames(style.air__menuFlyout, {
          [style.air__menuFlyoutLeft]: settings.menuLayoutType === 'left',
          [style.air__menuFlyout__black]: settings.flyoutMenuColor === 'dark',
          [style.air__menuFlyout__white]: settings.flyoutMenuColor === 'white',
          [style.air__menuFlyout__gray]: settings.flyoutMenuColor === 'gray',
        })}
        key={key}
      >
        {/* <ul
          className={style.air__menuLeft__list}
          onMouseEnter={() => this.handleFlyoutContainerOver(key)}
          onMouseLeave={() => this.handleFlyoutOut(key)}
        >
          {items.map(item => {
            return (
              <li
                className={classNames(style.air__menuLeft__item, {
                  [style.air__menuLeft__item__active]: activeItem === item.key,
                })}
                key={item.key}
              >
                <Link to={item.url} className={style.air__menuLeft__link}>
                  {item.icon && <i className={`${item.icon} ${style.air__menuLeft__icon}`} />}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul> */}
      </div>
    )
  }

  setActiveItems = props => {
    const { menuDataleft = [] } = props
    if (!menuDataleft.length) {
      return
    }
    const flattenItems = (items, key) =>
      items.reduce((flattenedItems, item) => {
        flattenedItems.push(item)
        if (Array.isArray(item[key])) {
          return flattenedItems.concat(flattenItems(item[key], key))
        }
        return flattenedItems
      }, [])
    const activeItem = _.find(flattenItems(menuDataleft, 'children'), [
      'url',
      props.location.pathname,
    ])
    const activeSubmenu = menuDataleft.reduce((key, parent) => {
      if (Array.isArray(parent.children)) {
        parent.children.map(child => {
          if (child.key === activeItem.key) {
            key = parent
          }
          return ''
        })
      }
      return key
    })
    if (activeItem && activeSubmenu) {
      this.setState({
        activeItem: activeItem.key,
        activeSubmenu: activeSubmenu.key,
      })
    } else {
      this.setState({
        activeItem: null,
        activeSubmenu: null,
      })
    }
  }

  generateMenuItems = () => {
    const { menuDataleft = [] } = this.props
    const { activeSubmenu, activeItem } = this.state

    const menuItem = item => {
      const { key, title, icon, url } = item
      if (item.category) {
        return (
          <li className={style.air__menuLeft__category} key={Math.random()}>
            <span>{title}</span>
          </li>
        )
      }
      return (
        <li
          className={classNames(style.air__menuLeft__item, {
            [style.air__menuLeft__item__active]: activeItem === key,
          })}
          key={key}
        >
          {item.url && (
            <Link to={url} className={style.air__menuLeft__link}>
              {icon && <i className={`${icon} ${style.air__menuLeft__icon}`} />}
              <span>{title}</span>
            </Link>
          )}
          {!item.url && (
            <a href="javascript: void(0);" className={style.air__menuLeft__link}>
              {icon && <i className={`${icon} ${style.air__menuLeft__icon}`} />}
              <span>{title}</span>
            </a>
          )}
        </li>
      )
    }

    const submenuItem = item => {
      return (
        <li
          className={classNames(style.air__menuLeft__item, style.air__menuLeft__submenu, {
            [style.air__menuLeft__submenu__active]: activeSubmenu === item.key,
          })}
          key={item.key}
        >
          <a
            href="javascript: void(0);"
            className={style.air__menuLeft__link}
            onClick={() => this.handleSubmenuClick(item.key)}
            onMouseEnter={event => this.handleFlyoutOver(event, item.key, item.children)}
            onFocus={event => this.handleFlyoutOver(event, item.key, item.children)}
            onMouseLeave={() => this.handleFlyoutOut(item.key)}
            onBlur={() => this.handleFlyoutOut(item.key)}
          >
            <i className={`${item.icon} ${style.air__menuLeft__icon}`} />
            <span>{item.title}</span>
            {item.count && (
              <span className="badge text-white bg-blue-light float-right mt-1 px-2">
                {item.count}
              </span>
            )}
          </a>
          <ul className={style.air__menuLeft__list}>
            {item.children.map(sub => {
              if (sub.children) {
                return submenuItem(sub)
              }
              return menuItem(sub)
            })}
          </ul>
        </li>
      )
    }

    return menuDataleft.map(item => {
      if (item.children) {
        return submenuItem(item)
      }
      return menuItem(item)
    })
  }

  render() {
    const { settings } = this.props
    const { renderedFlyoutItems } = this.state
    const sessionValue = sessionStorage.getItem('userData')
    // console.log(sessionValue,'How Toooo......');
    const bon = JSON.parse(sessionValue)
    // console.log(bon.user.roles[0],'สวัสดีวันจันท');

    const items = this.generateMenuItems()
    return (
      <Sider width="auto">
        <TransitionGroup>
          {Object.keys(renderedFlyoutItems).map(item => {
            return (
              <CSSTransition key={item} timeout={0} classNames="air__menuFlyout__animation">
                {renderedFlyoutItems[item]}
              </CSSTransition>
            )
          })}
        </TransitionGroup>
        <div
          className={classNames(style.air__menuLeft, {
            [style.air__menuLeft__mobileToggled]: settings.isMobileMenuOpen,
            [style.air__menuLeft__toggled]: settings.isMenuCollapsed,
            [style.air__menuLeft__unfixed]: settings.isMenuUnfixed,
            [style.air__menuLeft__shadow]: settings.isMenuShadow,
            [style.air__menuLeft__flyout]: settings.menuType === 'flyout',
            [style.air__menuLeft__compact]: settings.menuType === 'compact',
            [style.air__menuLeft__blue]: settings.menuColor === 'blue',
            [style.air__menuLeft__white]: settings.menuColor === 'white',
            [style.air__menuLeft__gray]: settings.menuColor === 'gray',
            [style.air__menuFlyout__black]:
              settings.flyoutMenuColor === 'dark' && settings.menuType !== 'default',
            [style.air__menuFlyout__white]:
              settings.flyoutMenuColor === 'white' && settings.menuType !== 'default',
            [style.air__menuFlyout__gray]:
              settings.flyoutMenuColor === 'gray' && settings.menuType !== 'default',
          })}
        >
          <div className={style.air__menuLeft__outer} style={{ backgroundColor: '#f2f4f8' }}>
            <a
              href="javascript: void(0);"
              className={style.air__menuLeft__mobileToggleButton}
              onClick={this.toggleMobileMenu}
            >
              <span />
            </a>
            <a
              href="javascript: void(0);"
              className={style.air__menuLeft__toggleButton}
              onClick={this.toggleMenu}
            >
              <span />
              <span />
            </a>
            <br />
            <a href="javascript: void(0);" className={style.air__menuLeft__logo}>
              <img
                src="resources/images/LOGO_Color.png"
                alt="..."
                style={{ width: 80, marginTop: -32 }}
              />
              {/* <div className={style.air__menuLeft__logo__name}>AIR UI</div>
              <div className={style.air__menuLeft__logo__descr}>Admin Template</div> */}
            </a>
            <a href="javascript: void(0);" className={style.air__menuLeft__user}>
              <div className={style.air__menuLeft__user__avatar}>
                <UserMenu />
              </div>
              <div className={style.air__menuLeft__user__name}>{bon.user.name}</div>
              <div className={style.air__menuLeft__user__role}>{bon.user.roles[0]}</div>
            </a>
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
              <div id="menu-left-container" className={style.air__menuLeft__container}>
                <ul className={style.air__menuLeft__list}>
                  {/* <li className={style.air__menuLeft__category}>
                    <span>Information</span>
                  </li>
                  <li className={style.air__menuLeft__item}>
                    <a
                      href="javascript: void(0);"
                      className={style.air__menuLeft__link}
                      onClick={this.toggleSettings}
                    >
                      <i className={`fe fe-settings ${style.air__menuLeft__icon}`} />
                      <span>Settings</span>
                    </a>
                  </li>
                  <li className={style.air__menuLeft__item}>
                    <a
                      href="https://docs.airuitemplate.com/"
                      className={style.air__menuLeft__link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={`fe fe-compass ${style.air__menuLeft__icon}`} />
                      <span>Documentation</span>
                    </a>
                  </li> */}
                  {items}
                </ul>
              </div>
            </Scrollbars>
          </div>
        </div>
        <a
          href="javascript: void(0);"
          className={style.air__menuLeft__backdrop}
          onClick={this.toggleMobileMenu}
        />
      </Sider>
    )
  }
}

export default MenuLeft
