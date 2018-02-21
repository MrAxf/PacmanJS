import Phantom from './Phantom'
import Pacman from '../Pacman'
import RedPhantom from './RedPhantom'
import { Vector2D } from '../../render'
import PacmanEntity from './PacmanEntity'

const BluePhantom = Phantom(6, {x: 27,y: 34}, () => ({x: Pacman.GLOBALS.maze.jailDoor.x - 2, y: Pacman.GLOBALS.maze.jailDoor.y + 2}), 
    (self, {i,j}) => {
        const pacmanPosition = {x: Math.floor(PacmanEntity.x), y: Math.floor(PacmanEntity.y)}
        let vector
        if(PacmanEntity.direction == Pacman.GLOBALS.UP) vector = new Vector2D(pacmanPosition.x, pacmanPosition.y - 2, Math.floor(RedPhantom.x), Math.floor(RedPhantom.y))
        else if(PacmanEntity.direction == Pacman.GLOBALS.RIGHT) vector = new Vector2D(pacmanPosition.x + 2, pacmanPosition.y, Math.floor(RedPhantom.x), Math.floor(RedPhantom.y))
        else if(PacmanEntity.direction == Pacman.GLOBALS.DOWN) vector = new Vector2D(pacmanPosition.x, pacmanPosition.y + 2, Math.floor(RedPhantom.x), Math.floor(RedPhantom.y))
        else if(PacmanEntity.direction == Pacman.GLOBALS.LEFT) vector = new Vector2D(pacmanPosition.x - 2, pacmanPosition.y, Math.floor(RedPhantom.x), Math.floor(RedPhantom.y))
        self.calculateDirection({x: Math.floor(self.x) + (vector.x * 2), y: Math.floor(self.y) + (vector.y * 2)}, {i,j})
    },
    self => {
        if((Pacman.GLOBALS.maze.balls_total - Pacman.GLOBALS.maze.balls_count) >= 30){
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
    }
)

export default BluePhantom