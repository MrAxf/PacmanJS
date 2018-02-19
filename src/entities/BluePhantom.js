import Phantom from './Phantom'
import Pacman from '../Pacman'
import RedPhantom from './RedPhantom';
import { Vector2D } from '../../render'

const BluePhantom = Phantom(6, {x: 27,y: 34}, {x: 13.5, y: 14}, 
    (self, {i,j}) => {
        const pacmanPosition = {x: Math.floor(Pacman.GLOBALS.pacmanEntity.x), y: Math.floor(Pacman.GLOBALS.pacmanEntity.y)}
        let vector
        if(Pacman.GLOBALS.pacmanEntity.direction == Pacman.GLOBALS.UP) vector = new Vector2D(pacmanPosition.x, pacmanPosition.y - 2, Math.floor(RedPhantom.x), Math.floor(RedPhantom.y))
        else if(Pacman.GLOBALS.pacmanEntity.direction == Pacman.GLOBALS.RIGHT) vector = new Vector2D(pacmanPosition.x + 2, pacmanPosition.y, Math.floor(RedPhantom.x), Math.floor(RedPhantom.y))
        else if(Pacman.GLOBALS.pacmanEntity.direction == Pacman.GLOBALS.DOWN) vector = new Vector2D(pacmanPosition.x, pacmanPosition.y + 2, Math.floor(RedPhantom.x), Math.floor(RedPhantom.y))
        else if(Pacman.GLOBALS.pacmanEntity.direction == Pacman.GLOBALS.LEFT) vector = new Vector2D(pacmanPosition.x - 2, pacmanPosition.y, Math.floor(RedPhantom.x), Math.floor(RedPhantom.y))
        self.calculateDirection({x: Math.floor(self.x) + (vector.x * 2), y: Math.floor(self.y) + (vector.y * 2)}, {i,j})
    })

export default BluePhantom