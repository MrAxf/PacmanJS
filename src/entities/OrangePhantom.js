import Phantom from './Phantom'
import Pacman from '../Pacman'
import { Vector2D } from '../../render'

const OrangePhantom = Phantom(7, {x: 0,y: 34}, () => ({x: Pacman.GLOBALS.maze.jailDoor.x + 2, y: Pacman.GLOBALS.maze.jailDoor.y + 2}), 
    (self, {i,j}) => {
        const distance = (new Vector2D(Math.floor(self.x), Math.floor(self.y), Math.floor(Pacman.GLOBALS.pacmanEntity.x), Math.floor(Pacman.GLOBALS.pacmanEntity.y))).magnitude()
        if(distance < 8) self.calculateDirection(self.patrolPoint, {i,j})
        else self.calculateDirection({x: Pacman.GLOBALS.pacmanEntity.x, y: Pacman.GLOBALS.pacmanEntity.y}, {i,j})
    },
    self => {
        let movement = self.v * Pacman.deltaTime
        if(movement > 0.1) movement = 0.1

        if(self.x != Pacman.GLOBALS.maze.jailDoor.x){
            self.x += movement
            self.xRounded = Math.round(self.x * 10) / 10

            if(self.x > (Pacman.GLOBALS.maze.jailDoor.x - 0.1) && self.x < (Pacman.GLOBALS.maze.jailDoor.x + 0.1)) {
                self.x = Pacman.GLOBALS.maze.jailDoor.x
                self.xRounded = Pacman.GLOBALS.maze.jailDoor.x
            }
        }
        else {
            self.y -= movement
            self.yRounded = Math.round(self.y * 10) / 10

            if(Math.floor(self.y) == (Pacman.GLOBALS.maze.jailDoor.y - 1) && self.yRounded % 1 <= 0.2) {
                self.y = Pacman.GLOBALS.maze.jailDoor.y - 1
                self.yRounded = Pacman.GLOBALS.maze.jailDoor.y - 1

                self.inJail = false
            }
        }
    }
)

export default OrangePhantom