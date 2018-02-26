import React, { PureComponent } from "react"
import style from './MainMenu.css'

class MainMenu extends PureComponent {
  state = {
    size: this.props.size,
  }

  setSize = (e) => {
    this.setState({
      size: parseInt(e.target.value, 10),
    })
  }

  startGame = () => {
    const { onStartGame } = this.props
    const { size } = this.state
    onStartGame(size)
  }

  render () {
    const { size } = this.state
    return (
      <div className={style.root}>
        <div className={style.row}>
          Крестики-нолики пять-в-ряд
        </div>
        <div className={style.row}>
          Size:
          <input className={style.size} value={size} onChange={this.setSize} type="number"/>
        </div>
        <div className={style.row}>
          <button className={style.newGame} onClick={this.startGame}>
            New Game
          </button>
        </div>
      </div>
    )
  }
}

export default MainMenu


