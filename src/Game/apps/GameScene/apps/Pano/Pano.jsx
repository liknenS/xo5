import React, { PureComponent } from "react"
import classnames from 'classnames/bind'
import styles from './Pano.css'
const cx = classnames.bind(styles)

const SIZE = 600

class Pano extends PureComponent {
  onClick = () => {
    const { x, y, onClick } = this.props
    onClick({ x, y })
  }
  render () {
    const { count, value, winPath, x, y  } = this.props
    const style = {
      height: SIZE/count - 2,
      width: SIZE/count - 2,
      fontSize: SIZE/count * 0.7,
    }
    let win = false
    if (winPath && winPath.some(p => x === p.x && y ===p.y )) {
      win = true
    }

    return (
      <div className={cx('root', { win })} style={style} onClick={this.onClick}>
        {value ? value : null }
      </div>
    )
  }
}

export default Pano
