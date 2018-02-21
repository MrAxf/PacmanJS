import { Gear, Keyboard, Rectangle } from '../../render'
import Pacman from '../Pacman'
import Maze from '../maze/Maze'
import RedPhantom from './RedPhantom';
import PinkPhantom from './PinkPhantom';
import BluePhantom from './BluePhantom';
import OrangePhantom from './OrangePhantom';

const PacmanEntity = new Gear({
    init(){
        this.frame = Pacman.GLOBALS.tileset[1]

        this.x = Pacman.GLOBALS.maze.pacmanSpawn.x
        this.y = Pacman.GLOBALS.maze.pacmanSpawn.y
        this.xRounded = Pacman.GLOBALS.maze.pacmanSpawn.x
        this.yRounded = Pacman.GLOBALS.maze.pacmanSpawn.y

        this.v = 5

        this.direction = Pacman.GLOBALS.LEFT
        this.nextDirection = Pacman.GLOBALS.LEFT
    },
    update(){
        const prevX = this.x
        const prevY = this.y

        if(Pacman.input.isKeyDown(Keyboard.KEYS.UP_ARROW)) this.nextDirection = Pacman.GLOBALS.UP
        else if(Pacman.input.isKeyDown(Keyboard.KEYS.DOWN_ARROW)) this.nextDirection = Pacman.GLOBALS.DOWN
        else if(Pacman.input.isKeyDown(Keyboard.KEYS.LEFT_ARROW)) this.nextDirection = Pacman.GLOBALS.LEFT
        else if(Pacman.input.isKeyDown(Keyboard.KEYS.RIGHT_ARROW)) this.nextDirection = Pacman.GLOBALS.RIGHT
        
        this.updatePosition()
        
        this.checkEntityColision()
    },
    render(sb){
        sb.drawTexture(this.frame, this.xRounded*8, this.yRounded*8)
    },
    methods:{
        updatePosition(){

            if((this.direction + this.nextDirection)%2 == 0) this.direction = this.nextDirection
            
            let movement = this.v * Pacman.deltaTime
            if(movement > 0.1) movement = 0.1

            if(this.direction == Pacman.GLOBALS.UP) this.y -= movement
            else if(this.direction == Pacman.GLOBALS.RIGHT) this.x += movement
            else if(this.direction == Pacman.GLOBALS.DOWN) this.y += movement
            else if(this.direction == Pacman.GLOBALS.LEFT) this.x -= movement

            this.fixPosition()

            this.xRounded = Math.round(this.x * 10) / 10
            this.yRounded = Math.round(this.y * 10) / 10

            this.changeDirection()
        },
        changeDirection(){
            const {i,j} = this.getTile()

            if(Pacman.GLOBALS.maze.consumeBall(i,j) == 3) this.$emit('enterPanic')

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

            if(this.direction == Pacman.GLOBALS.UP && Pacman.GLOBALS.maze.layout[i][j] == Maze.BLOCKS.WALL) this.y = Math.ceil(this.y)
            else if(this.direction == Pacman.GLOBALS.RIGHT && Pacman.GLOBALS.maze.layout[i][j+1] == Maze.BLOCKS.WALL) this.x = Math.floor(this.x)
            else if(this.direction == Pacman.GLOBALS.DOWN && Pacman.GLOBALS.maze.layout[i+1][j] == Maze.BLOCKS.WALL) this.y = Math.floor(this.y)
            else if(this.direction == Pacman.GLOBALS.LEFT && Pacman.GLOBALS.maze.layout[i][j] == Maze.BLOCKS.WALL) this.x = Math.ceil(this.x)

            if(this.x < -1) this.x = 28
            if(this.x > 28) this.x = -1
        },
        getTile(){
            return {i:Math.floor(this.y - 3), j: Math.floor(this.x)}
        },
        collides(entity){
            if(
                (this.x + 1 >= entity.x && entity.x +1 >= this.x) &&
                (this.y + 1 >= entity.y && entity.y +1 >= this.y)
            ) return true
            return false
        },
        checkEntityColision(){
            if(this.collides(RedPhantom)) RedPhantom.onPacmanCollision()
            if(this.collides(PinkPhantom)) PinkPhantom.onPacmanCollision()
            if(this.collides(BluePhantom)) BluePhantom.onPacmanCollision()
            if(this.collides(OrangePhantom)) OrangePhantom.onPacmanCollision()
        },
        softReset(){
            this.x = Pacman.GLOBALS.maze.pacmanSpawn.x
            this.y = Pacman.GLOBALS.maze.pacmanSpawn.y
            this.xRounded = Pacman.GLOBALS.maze.pacmanSpawn.x
            this.yRounded = Pacman.GLOBALS.maze.pacmanSpawn.y

            this.direction = Pacman.GLOBALS.LEFT
            this.nextDirection = Pacman.GLOBALS.LEFT
        },
    }
})

export default PacmanEntity