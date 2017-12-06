import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { translate3d } from './utils'

class Card extends Component {
  constructor (props) {
    super(props)
    this.state = { initialPosition: { x: 0, y: 0 } }
    this.setInitialPosition = this.setInitialPosition.bind(this)
  }
  setInitialPosition () {
    const card = ReactDOM.findDOMNode(this)
    const initialPosition = {
      x: 0,//Math.round((this.props.containerSize.x - card.offsetWidth) / 2),
      y: 0,//Math.round((this.props.containerSize.y - card.offsetHeight) / 2)
    }
    this.setState({ initialPosition })
  }

  componentDidMount () {
    this.setInitialPosition()
    window.addEventListener('resize', this.setInitialPosition)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.setInitialPosition)
  }

  render () {
    const { initialPosition, initialPosition: { x, y } } = this.state
    const { className = 'inactive', beingSwiped, swipeDirection } = this.props
    var style = {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      transformOrigin: 'bottom center',
      cursor: 'pointer',
      ...translate3d(x, y, beingSwiped, initialPosition),
      zIndex: this.props.index,
      ...this.props.style
    }

    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        swipeDirection: swipeDirection
      });
    });

    return (
      <div style={style}>
        {children}
      </div>
    )
  }
}

export default Card
