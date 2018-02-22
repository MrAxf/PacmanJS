import Pacman from '../Pacman'

class Maze{
    constructor(layout, intersections, pacmanSpawn, jailDoor, spriteSheet){
        this.layout = layout
        this.intersections = new Map()
        this.balls_count = 0
        this.pacmanSpawn = pacmanSpawn
        this.jailDoor = jailDoor
        this.spriteSheet = spriteSheet

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

    transformForTilemap(n){
        if (n >= 1) return 1
        return n
    }

    render(sb){
        let row, col = 0
        for (let i = 0; i < this.layout.length; i++) {
            for (let j = 0; j < this.layout[i].length; j++) {
                if(this.layout[i][j]==0){
                    const a = (i == 0) ? 1 : this.transformForTilemap(this.layout[i-1][j])
                    const b = (j == this.layout[i].length - 1) ? 1 : this.transformForTilemap(this.layout[i][j+1])
                    const c = (i == this.layout.length - 1) ? 1 : this.transformForTilemap(this.layout[i+1][j])
                    const d = (j == 0) ? 1 : this.transformForTilemap(this.layout[i][j-1])
                    const cords = Maze.TILE_MAP[JSON.stringify([a, b, c, d])]
                    row = cords[0]
                    col = cords[1]
                } 
                else{
                    const cords = Maze.TILE_MAP[this.layout[i][j]]
                    row = cords[0]
                    col = cords[1]
                } 
                sb.drawTexture(Pacman.GLOBALS.tileset[row][col], j*8, 24 + (i*8))
            }
        }
        const cords = Maze.TILE_MAP["jail"]
        row = cords[0]
        col = cords[1]
        sb.drawTexture(Pacman.GLOBALS.tileset[row][col], Math.floor(this.jailDoor.x)*8, this.jailDoor.y*8)
        sb.drawTexture(Pacman.GLOBALS.tileset[row][col], Math.ceil(this.jailDoor.x)*8, this.jailDoor.y*8)
    }
}

Maze.BLOCKS = {
    WALL: 0,
    EMPTY: 1,
    BALL: 2,
    SUPER_BALL: 3
}

Maze.TILE_MAP = {
    "[1,0,1,0]": [0,0],
    "[0,1,0,1]": [0,1],
    2: [0,2],
    3: [0,3],
    "[0,1,1,0]": [1,0],
    "[0,0,1,1]": [1,1],
    "[1,0,0,1]": [1,2],
    "[1,1,0,0]": [1,3],
    "[0,1,0,0]": [2,0],
    "[0,0,1,0]": [2,1],
    "[0,0,0,1]": [2,2],
    "[1,0,0,0]": [2,3],
    "[0,0,0,0]": [3,0],
    "jail": [3,1],
    1: [3,2],
    "[0,1,1,1]": [4,0],
    "[1,0,1,1]": [4,1],
    "[1,1,0,1]": [4,2],
    "[1,1,1,0]": [4,3],
}

export default Maze