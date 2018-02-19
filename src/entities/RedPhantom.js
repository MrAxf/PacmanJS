import Phantom from './Phantom'
import Pacman from '../Pacman'

const RedPhantom = Phantom(4, {x: 25,y: 0}, {x: 13.5, y: 14}, 
    (self, {i,j}) => {
        self.calculateDirection({x: Pacman.GLOBALS.pacmanEntity.x, y: Pacman.GLOBALS.pacmanEntity.y}, {i,j})
    })

export default RedPhantom