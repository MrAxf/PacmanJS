import Phantom from './Phantom'
import Pacman from '../Pacman'
import PacmanEntity from './PacmanEntity'

const PinkPhantom = Phantom("pink", {x: 2,y: 0}, () => ({x: Pacman.GLOBALS.maze.jailDoor.x, y: Pacman.GLOBALS.maze.jailDoor.y + 2}), 
    (self, {i,j}) => {
        let targePoint = {x: PacmanEntity.x, y: PacmanEntity.y}
        if(PacmanEntity.direction == Pacman.GLOBALS.UP){
            targePoint.y -= 4
            targePoint.x -= 4
        }
        else if(PacmanEntity.direction == Pacman.GLOBALS.RIGHT) targePoint.x += 4
        else if(PacmanEntity.direction == Pacman.GLOBALS.DOWN) targePoint.y += 4
        else if(PacmanEntity.direction == Pacman.GLOBALS.LEFT) targePoint.x -= 4
        self.calculateDirection(targePoint, {i,j})
    },
    self => {
        let movement = self.v * Pacman.deltaTime
        if(movement > 0.1) movement = 0.1

        self.y -= movement
        self.yRounded = Math.round(self.y * 10) / 10

        if(Math.floor(self.y) == (Pacman.GLOBALS.maze.jailDoor.y - 1) && self.yRounded % 1 <= 0.2) {
            self.y = Pacman.GLOBALS.maze.jailDoor.y - 1
            self.yRounded = Pacman.GLOBALS.maze.jailDoor.y - 1

            self.inJail = false
        }   
    }
)

export default PinkPhantom