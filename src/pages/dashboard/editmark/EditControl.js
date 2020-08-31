/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
import { PropTypes } from 'prop-types'
import Draw from 'leaflet-draw' // eslint-disable-line
// eslint-disable-next-line import/no-extraneous-dependencies
import isEqual from 'lodash-es/isEqual'

import { MapControl, withLeaflet } from 'react-leaflet'
import leaflet, { Map, Control } from 'leaflet'

const eventHandlers = {
  onEdited: 'draw:edited',
  onDrawStart: 'draw:drawstart',
  onDrawStop: 'draw:drawstop',
  onDrawVertex: 'draw:drawvertex',
  onEditStart: 'draw:editstart',
  onEditMove: 'draw:editmove',
  onEditResize: 'draw:editresize',
  onEditVertex: 'draw:editvertex',
  onEditStop: 'draw:editstop',
  onDeleted: 'draw:deleted',
  onDeleteStart: 'draw:deletestart',
  onDeleteStop: 'draw:deletestop',
}

class EditControl extends MapControl {
  static propTypes = {
    ...Object.keys(eventHandlers).reduce((acc, val) => {
      acc[val] = PropTypes.func
      return acc
    }, {}),
    onCreated: PropTypes.func,
    onMounted: PropTypes.func,
    draw: PropTypes.shape({
      polyline: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      polygon: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      rectangle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      circle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      marker: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    }),
    edit: PropTypes.shape({
      edit: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      remove: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      poly: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      allowIntersection: PropTypes.bool,
    }),
    position: PropTypes.oneOf(['topright', 'topleft', 'bottomright', 'bottomleft']),
    leaflet: PropTypes.shape({
      map: PropTypes.instanceOf(Map),
      layerContainer: PropTypes.shape({
        addLayer: PropTypes.func.isRequired,
        removeLayer: PropTypes.func.isRequired,
      }),
    }),
  }

  // eslint-disable-next-line class-methods-use-this
  createLeafletElement(props) {
    return createDrawElement(props)
  }

  onDrawCreate = e => {
    const { onCreated } = this.props
    const { layerContainer } = this.props.leaflet

    layerContainer.addLayer(e.layer)
    // eslint-disable-next-line no-unused-expressions
    onCreated && onCreated(e)
  }

  componentDidMount() {
    super.componentDidMount()
    const { map } = this.props.leaflet
    const { onMounted } = this.props

    // eslint-disable-next-line guard-for-in
    // eslint-disable-next-line no-restricted-syntax
    // eslint-disable-next-line guard-for-in
    for (const key in eventHandlers) {
      map.on(eventHandlers[key], evt => {
        const handlers = Object.keys(eventHandlers).filter(
          handler => eventHandlers[handler] === evt.type,
        )
        if (handlers.length === 1) {
          const handler = handlers[0]
          this.props[handler] && this.props[handler](evt)
        }
      })
    }

    map.on(leaflet.Draw.Event.CREATED, this.onDrawCreate)

    // eslint-disable-next-line no-unused-expressions
    onMounted && onMounted(this.leafletElement)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    const { map } = this.props.leaflet

    map.off(leaflet.Draw.Event.CREATED, this.onDrawCreate)

    // eslint-disable-next-line no-restricted-syntax
    for (const key in eventHandlers) {
      if (this.props[key]) {
        map.off(eventHandlers[key], this.props[key])
      }
    }
  }

  componentDidUpdate(prevProps) {
    // super updates positions if thats all that changed so call this first
    super.componentDidUpdate(prevProps)

    if (isEqual(this.props.draw, prevProps.draw) || this.props.position !== prevProps.position) {
      return false
    }

    const { map } = this.props.leaflet

    this.leafletElement.remove(map)
    this.leafletElement = createDrawElement(this.props)
    this.leafletElement.addTo(map)

    return null
  }
}

function createDrawElement(props) {
  const { layerContainer } = props.leaflet
  const { draw, edit, position } = props
  const options = {
    edit: {
      ...edit,
      featureGroup: layerContainer,
    },
  }

  if (draw) {
    options.draw = { ...draw }
  }

  if (position) {
    options.position = position
  }

  return new Control.Draw(options)
}

export default withLeaflet(EditControl)
