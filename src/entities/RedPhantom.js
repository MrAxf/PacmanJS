import Phantom from './Phantom'
import Pacman from '../Pacman'
import PacmanEntity from './PacmanEntity'

const RedPhantom = Phantom("red", {x: 25,y: 0}, () => ({x: Pacman.GLOBALS.maze.jailDoor.x, y: Pacman.GLOBALS.maze.jailDoor.y - 1}), 
    (self, {i,j}) => {
        self.calculateDirection({x: PacmanEntity.x, y: PacmanEntity.y}, {i,j})
    },
    self => self.inJail = false
)

export default RedPhantom