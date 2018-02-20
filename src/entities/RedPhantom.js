import Phantom from './Phantom'
import Pacman from '../Pacman'

const RedPhantom = Phantom(4, {x: 25,y: 0}, () => ({x: Pacman.GLOBALS.maze.jailDoor.x, y: Pacman.GLOBALS.maze.jailDoor.y - 1}), 
    (self, {i,j}) => {
        self.calculateDirection({x: Pacman.GLOBALS.pacmanEntity.x, y: Pacman.GLOBALS.pacmanEntity.y}, {i,j})
    },
    self => self.inJail = false
)

export default RedPhantom