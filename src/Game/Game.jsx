import React, { PureComponent } from 'react'
import MainMenu from './apps/MainMenu'
import GameScene from './apps/GameScene'
import style from './Game.css'
import { SCREENS } from 'constant/screens'

const COMPONENTS = {
  [SCREENS.menu]: MainMenu,
  [SCREENS.gameScene]: GameScene,
}

console.log(style)

class Game extends PureComponent {
  state = {
    screen: SCREENS.menu,
    size: 15,
  }
  changeScreen = screen => {
    this.setState({
      screen,
    })
  }

  startGame = size => {
    console.log(size)
    this.setState({
      size,
      screen: SCREENS.gameScene,
    })
  }
  render() {
    const { screen, size } = this.state
    const Component = COMPONENTS[screen]
    return (
      <div className={style.root}>
        <Component changeScreen={this.changeScreen} onStartGame={this.startGame} size={size} />
      </div>
    )
  }
}

export default Game
