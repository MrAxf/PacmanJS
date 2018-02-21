import Pacman from '../Pacman'

class Maze{
    constructor(layout, intersections, pacmanSpawn, jailDoor){
        this.layout = layout
        this.intersections = new Map()
        this.balls_count = 0
        this.pacmanSpawn = pacmanSpawn
        this.jailDoor = jailDoor

        for (let i = 0; i < this.layout.length; i++) {
            for (let j = 0; j < this.layout[i].length; j++) {
                if(this.layout[i][j] >= 2) this.balls_count++
            }
        }

        this.balls_total = this.balls_count

        for (let i = 0; i < intersections.length; i++) {
            const point = intersections[i][0]
            let directions = intersections[i][1]

            if(directions == 'auto'){
                const [row, col] = point
                directions = []
                if(this.layout[row-1][col] > 0) directions.push(0)
                if(this.layout[row][col+1] > 0) directions.push(1)
                if(this.layout[row+1][col] > 0) directions.push(2)
                if(this.layout[row][col-1] > 0) directions.push(3)
            }

            this.intersections.set(JSON.stringify(point), directions)
        }
    }

    consumeBall(i,j){
        const cell = this.layout[i][j]
        if(this.layout[i][j] >= 2){
            this.layout[i][j] = 1
            this.balls_count--
            Pacman.GLOBALS.POINTS += 50
            if(cell == 3) Pacman.GLOBALS.POINTS += 50
        }
        return cell
    }

    render(sb){
        for (let i = 0; i < this.layout.length; i++) {
            for (let j = 0; j < this.layout[i].length; j++) {
                if(this.layout[i][j]==0) sb.drawTexture(Pacman.GLOBALS.tileset[0], j*8, 24 + (i*8))
                else if(this.layout[i][j]==2) sb.drawTexture(Pacman.GLOBALS.tileset[2], j*8, 24 + (i*8))
                else if(this.layout[i][j]==3) sb.drawTexture(Pacman.GLOBALS.tileset[3], j*8, 24 + (i*8))
            }
        }
    }
}

Maze.BLOCKS = {
    WALL: 0,
    EMPTY: 1,
    BALL: 2,
    SUPER_BALL: 3
}

export default Maze