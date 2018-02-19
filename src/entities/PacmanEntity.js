import { Gear, Keyboard } from '../../render'
import Pacman from '../Pacman'
import Maze from '../maze/Maze'

const pacmanEntity = new Gear({
    init(){
        this.frame = Pacman.GLOBALS.tileset[1]

        this.x = 13.5
        this.y = 26
        this.xRounded = 13.5
        this.yRounded = 26

        this.v = 5

        this.direction = Pacman.GLOBALS.LEFT
        this.nextDirection = Pacman.GLOBALS.LEFT
    },
    update(){
        if(Pacman.input.isKeyDown(Keyboard.KEYS.UP_ARROW)) this.nextDirection = Pacman.GLOBALS.UP
        else if(Pacman.input.isKeyDown(Keyboard.KEYS.DOWN_ARROW)) this.nextDirection = Pacman.GLOBALS.DOWN
        else if(Pacman.input.isKeyDown(Keyboard.KEYS.LEFT_ARROW)) this.nextDirection = Pacman.GLOBALS.LEFT
        else if(Pacman.input.isKeyDown(Keyboard.KEYS.RIGHT_ARROW)) this.nextDirection = Pacman.GLOBALS.RIGHT
        this.updatePosition()
    },
    render(sb){
        sb.drawTexture(this.frame, this.xRounded*8, this.yRounded*8)
    },
    methods:{
        updatePosition(){

            if((this.direction + this.nextDirection)%2 == 0) this.direction = this.nextDirection

            if(this.direction == Pacman.GLOBALS.UP) this.y -= this.v * Pacman.deltaTime
            else if(this.direction == Pacman.GLOBALS.RIGHT) this.x += this.v * Pacman.deltaTime
            else if(this.direction == Pacman.GLOBALS.DOWN) this.y += this.v * Pacman.deltaTime
            else if(this.direction == Pacman.GLOBALS.LEFT) this.x -= this.v * Pacman.deltaTime

            this.fixPosition()

            this.xRounded = Math.round(this.x * 10) / 10
            this.yRounded = Math.round(this.y * 10) / 10

            this.changeDirection()
        },
        changeDirection(){
            const {i,j} = this.getTile()

            Pacman.GLOBALS.maze.consumeBall(i,j)

            if(this.direction == this.nextDirection) return

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
        fixPosition(){
            const {i,j} = this.getTile()

            if(this.direction == 0 && Pacman.GLOBALS.maze.layout[i][j] == Maze.BLOCKS.WALL) this.y = Math.ceil(this.y)
            else if(this.direction == 1 && Pacman.GLOBALS.maze.layout[i][j+1] == Maze.BLOCKS.WALL) this.x = Math.floor(this.x)
            else if(this.direction == 2 && Pacman.GLOBALS.maze.layout[i+1][j] == Maze.BLOCKS.WALL) this.y = Math.floor(this.y)
            else if(this.direction == 3 && Pacman.GLOBALS.maze.layout[i][j] == Maze.BLOCKS.WALL) this.x = Math.ceil(this.x)

            if(this.x < -1) this.x = 28
            if(this.x > 28) this.x = -1
        },
        getTile(){
            return {i:Math.floor(this.y - 3), j: Math.floor(this.x)}
        }
    }
})

export default pacmanEntity