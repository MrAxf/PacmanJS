import Phantom from './Phantom'
import Pacman from '../Pacman'

const PinkPhantom = Phantom(5, {x: 2,y: 0}, {x: 13.5, y: 14}, 
    (self, {i,j}) => {
        let targePoint = {x: Pacman.GLOBALS.pacmanEntity.x, y: Pacman.GLOBALS.pacmanEntity.y}
        if(Pacman.GLOBALS.pacmanEntity.direction == Pacman.GLOBALS.UP) targePoint.y -= 4
        else if(Pacman.GLOBALS.pacmanEntity.direction == Pacman.GLOBALS.RIGHT) targePoint.x += 4
        else if(Pacman.GLOBALS.pacmanEntity.direction == Pacman.GLOBALS.DOWN) targePoint.y += 4
        else if(Pacman.GLOBALS.pacmanEntity.direction == Pacman.GLOBALS.LEFT) targePoint.x -= 4
        self.calculateDirection(targePoint, {i,j})
    })

export default PinkPhantom