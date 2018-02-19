import Phantom from './Phantom'
import Pacman from '../Pacman'
import { Vector2D } from '../../render'

const OrangePhantom = Phantom(7, {x: 0,y: 34}, {x: 13.5, y: 14}, 
    (self, {i,j}) => {
        const distance = (new Vector2D(Math.floor(self.x), Math.floor(self.y), Math.floor(Pacman.GLOBALS.pacmanEntity.x), Math.floor(Pacman.GLOBALS.pacmanEntity.y))).magnitude()
        if(distance < 8) self.calculateDirection(self.patrolPoint, {i,j})
        else self.calculateDirection({x: Pacman.GLOBALS.pacmanEntity.x, y: Pacman.GLOBALS.pacmanEntity.y}, {i,j})
    })

export default OrangePhantom