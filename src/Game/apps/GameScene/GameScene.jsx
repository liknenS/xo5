import React, { Component } from 'react'
import { SCREENS } from 'constant/screens'
import Pano from './apps/Pano'
import styles from './GameScene.css'

type SceneItem = 0 | 'X' | 'O'
type Matr<T> = Array<Array<T>>
type Pair = [number, number]

const generateScene: number => Matr<SceneItem> = size =>
  Array(size)
    .fill()
    .map(a => Array(size).fill(0))
const LINE_LEN_TO_WIN = 5

const CHECK_DIR: Matr<number> = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]

const checkWin = (scene: Matr<SceneItem>, coords: Pair) => {
  const size: number = scene.length
  const [y, x]: Pair = coords
  const checkSymbol: SceneItem = scene[y][x]
  const sameByDirs = CHECK_DIR.map(dir => {
    let i = 0
    const path = []
    let [ny, nx] = dir.map((dif, c) => coords[c] + i * dif)
    while (nx >= 0 && ny >= 0 && nx < size && ny < size && checkSymbol === scene[ny][nx]) {
      i++
      path.push({ x: nx, y: ny })
      ;[ny, nx] = dir.map((dif, c) => coords[c] + i * dif)
    }
    return { count: i - 1, path }
  })
  for (let i = 0; i < 4; i++) {
    if (sameByDirs[i].count + sameByDirs[i + 4].count >= LINE_LEN_TO_WIN - 1) {
      return [...sameByDirs[i].path, ...sameByDirs[i + 4].path, { x, y }]
    }
  }
  return false
}

const USER_SYMBOL = {
  x: 'X',
  o: 'O',
}

class GameScene extends Component {
  componentWillMount() {
    this.initGame()
  }

  initGame = () => {
    const { size } = this.props
    this.setState({
      scene: generateScene(size),
      turn: USER_SYMBOL.x,
      winPath: false,
    })
  }

  onClickPane = ({ x, y }) => {
    const { scene, turn, winPath } = this.state
    if (scene[y][x] || winPath) {
      return
    }
    scene[y][x] = turn
    const path = checkWin(scene, [y, x])
    if (path) {
      this.setState({
        winPath: path,
        scene,
      })
      return
    }
    this.setState({
      scene,
      turn: turn === USER_SYMBOL.x ? USER_SYMBOL.o : USER_SYMBOL.x,
    })
  }
  renderPane = () => {
    const { size } = this.props
    const { scene, winPath } = this.state

    const items = scene.reduce((acc, r, y) => {
      return acc.concat(
        r.map((value, x) => (
          <Pano key={`${y}-${x}`} {...{ value, y, x, count: size, onClick: this.onClickPane, winPath }} />
        )),
      )
    }, [])
    return <div className={styles.gamePane}>{items}</div>
  }

  onBackToMenu = () => {
    const { changeScreen } = this.props
    changeScreen(SCREENS.menu)
  }

  render() {
    const { turn, winPath } = this.state
    return (
      <div className={styles.root}>
        <div className={styles.status}>
          <button className={styles.button} onClick={this.onBackToMenu}>
            Main Menu
          </button>
          <button className={styles.button} onClick={this.initGame}>
            Restart
          </button>
        </div>
        {this.renderPane()}
        <div className={styles.turn}>
          {winPath ? 'Winner' : 'Turn'} : {turn}
        </div>
      </div>
    )
  }
}

export default GameScene
