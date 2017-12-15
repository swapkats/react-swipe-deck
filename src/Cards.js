import React, { cloneElement } from 'react'
import ReactDOM from 'react-dom'
import { DIRECTIONS } from './utils'
// import './style.css'

class SwipeCards extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      alertLeft: false,
      alertRight: false,
      alertTop: false,
      alertBottom: false,
      containerSize: { x: 0, y: 0 }
    }
    this.removeCard = this.removeCard.bind(this)
    // this.setSize = this.setSize.bind(this)
  }
  removeCard (side, cardId) {
    const { children, onEnd } = this.props
    setTimeout(() => this.setState({ [`alert${side}`]: false }), 300)

    if (children.length === (this.state.index + 1) && onEnd) onEnd()

    this.setState({
      index: this.state.index + 1,
      [`alert${side}`]: true
    })
  }

  componentDidMount () {
    // this.setSize()
    // window.addEventListener('resize', this.setSize)
  }
   componentWillUnmount () {
    // window.removeEventListener('resize', this.setSize)
  }

  // setSize () {
  //   const container = ReactDOM.findDOMNode(this)
  //   const containerSize = {
  //     x: container.offsetWidth,
  //     y: container.offsetHeight
  //   }
  //   this.setState({ containerSize })
  // }

  render () {
    const { index, containerSize } = this.state
    const { children, className, onSwipeTop, onSwipeBottom, size, cardSize } = this.props
    // if (!containerSize.x || !containerSize.y) return  <div className={className} />

    const _cards = children.reduce((memo, c, i) => {
      if (index > i) return memo
      const props = {
        key: i,
        containerSize,
        index: children.length - index,
        ...DIRECTIONS.reduce((m, d) =>
          ({ ...m, [`onOutScreen${d}`]: () => this.removeCard(d) }), {}),
        active: index === i
      }
      return [ cloneElement(c, props), ...memo ]
    }, [])

    return (
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        width: size[0],
        height: size[1]
      }}>
        <div style={{
          position: 'absolute',
          width: cardSize[0],
          height: cardSize[1],
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          {_cards}
        </div>
      </div>
    )
  }
}

SwipeCards.defaultProps = {
  size: [300, 300],
  cardSize: [200, 200]
}

export default SwipeCards
