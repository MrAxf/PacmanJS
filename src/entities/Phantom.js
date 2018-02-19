import { Gear, Vector2D, SpriteBatch } from '../../render'
import Pacman from '../Pacman'
import Maze from '../maze/Maze'

const Phantom = (sprite, patrolPoint, spawnPoint, onHuntMode) => new Gear({
    init(){
        this.mode = 'Patrol'
        this.sprite = sprite

        this.x = spawnPoint.x
        this.y = spawnPoint.y
        this.xRound = spawnPoint.x
        this.yRound = spawnPoint.y

        this.patrolPoint = patrolPoint

        this.v = 5

        this.direction = Pacman.GLOBALS.LEFT
        this.nextDirection = Pacman.GLOBALS.LEFT
        this.nextDirectionCalculated = false

        this.onHuntModeCb= onHuntMode
    },
    update(){
        if(this.direction == Pacman.GLOBALS.UP) this.y -= this.v * Pacman.deltaTime
        else if(this.direction == Pacman.GLOBALS.RIGHT) this.x += this.v * Pacman.deltaTime
        else if(this.direction == Pacman.GLOBALS.DOWN) this.y += this.v * Pacman.deltaTime
        else if(this.direction == Pacman.GLOBALS.LEFT) this.x -= this.v * Pacman.deltaTime

        this.xRounded = Math.round(this.x * 10) / 10
        this.yRounded = Math.round(this.y * 10) / 10

        this.changeDirection()

        if(this.x < -1) this.x = 28
        if(this.x > 28) this.x = -1
    },
    render(sb){
        sb.drawTexture(Pacman.GLOBALS.tileset[this.sprite], this.xRounded*8, this.yRounded*8)
    },
    methods:{
        calculateDirection(targetPoint, {i,j}){
            const allDirections = Pacman.GLOBALS.maze.intersections.get(JSON.stringify([i,j]))
            const index = allDirections.indexOf((this.direction + 2)%4)
            const directions = (index != -1) ? allDirections.filter(e => e != allDirections[index]) : allDirections

            if(directions.lenght == 1){
                this.nextDirection = directions[0]
                this.nextDirectionCalculated = true
            }
            else{
                let min = Number.MAX_VALUE
                let targetDirection = 0
                for (let n = 0; n < directions.length; n++) {
                    const direction = directions[n]
                    if(direction == Pacman.GLOBALS.UP) {
                        const distance = (new Vector2D(Math.floor(this.x), Math.floor(this.y) - 1, targetPoint.x, targetPoint.y)).magnitude()
                        if(distance < min){
                            min = distance
                            targetDirection = direction
                        }
                    }
                    else if(direction == Pacman.GLOBALS.RIGHT){
                        const distance = (new Vector2D(Math.floor(this.x) + 1, Math.floor(this.y), targetPoint.x, targetPoint.y)).magnitude()
                        if(distance < min){
                            min = distance
                            targetDirection = direction
                        }
                    }
                    else if(direction == Pacman.GLOBALS.DOWN){
                        const distance = (new Vector2D(Math.floor(this.x), Math.floor(this.y) + 1, targetPoint.x, targetPoint.y)).magnitude()
                        if(distance < min){
                            min = distance
                            targetDirection = direction
                        }
                    }
                    else if(direction == Pacman.GLOBALS.LEFT){
                        const distance = (new Vector2D(Math.floor(this.x) - 1, Math.floor(this.y), targetPoint.x, targetPoint.y)).magnitude()
                        if(distance < min){
                            min = distance
                            targetDirection = direction
                        }
                    }
                }
                this.nextDirection = targetDirection
                this.nextDirectionCalculated = true
            }
        },
        changeDirection(){
            const {i,j} = this.getTile()

            if(!Pacman.GLOBALS.maze.intersections.has(JSON.stringify([i,j]))){
                this.nextDirectionCalculated = false
                return
            }

            if(!this.nextDirectionCalculated){
                this[`on${this.mode}Mode`]({i,j})
            }

            if(this.nextDirection == Pacman.GLOBALS.UP && Pacman.GLOBALS.maze.layout[i-1][j] > 0 && this.xRounded % 1 <= 0.3){
                this.x = Math.floor(this.x)
                this.direction = this.nextDirection
            }
            else if(this.nextDirection == Pacman.GLOBALS.RIGHT && Pacman.GLOBALS.maze.layout[i][j+1] > 0 && this.yRounded % 1 <= 0.3){
                this.y = Math.floor(this.y)
                this.direction = this.nextDirection
            }
            else if(this.nextDirection == Pacman.GLOBALS.DOWN && Pacman.GLOBALS.maze.layout[i+1][j] > 0 && this.xRounded % 1 <= 0.3){
                this.x = Math.floor(this.x)
                this.direction = this.nextDirection
            }
            else if(this.nextDirection == Pacman.GLOBALS.LEFT && Pacman.GLOBALS.maze.layout[i][j-1] > 0 && this.yRounded % 1 <= 0.3){
                this.y = Math.floor(this.y)
                this.direction = this.nextDirection
            }
        },
        getTile(){
            return {i:Math.floor(this.y - 3), j: Math.floor(this.x)}
        },
        onPatrolMode({i,j}){
            this.calculateDirection(this.patrolPoint, {i,j})
        },
        onPanicMode({i,j}){
            const allDirections = Pacman.GLOBALS.maze.intersections.get(JSON.stringify([i,j]))
            this.nextDirection = allDirections[Math.floor(Math.random()*allDirections.length)]
            this.nextDirectionCalculated = true
        },
        onHuntMode({i,j}){
            this.onHuntModeCb(this, {i,j})
        }
    }
})

export default Phantom