import { Game, Gear, Loader, SpriteBatch, Keyboard } from '../render'
import ClassicMaze from './maze/ClassicMaze'
import PacmanEntity from './entities/PacmanEntity'
import RedPhantom from './entities/RedPhantom'
import PinkPhantom from './entities/PinkPhantom'
import BluePhantom from './entities/BluePhantom'
import OrangePhantom from './entities/OrangePhantom'

const mainGear = new Gear({
    load(){
        return {
            tiles: Loader.loadTextureFromUrl(`${window.location.origin}/assets/tileset.png`)
        }
    },
    init(){
        this.paused = false
        this.pausedTime = 0
        this.acumulateTime = 0

        this.tileset = this.tiles.split(1, 8)[0]
        Pacman.GLOBALS.tileset = this.tileset
        Pacman.GLOBALS.maze = ClassicMaze
        this.sb = new SpriteBatch(Pacman.context)
        this.gearStack.init()

        this.pauseGame(5)
    },
    update(){
        if(this.paused){
            this.acumulateTime += Pacman.deltaTime
            if(this.acumulateTime >= this.pausedTime){
                this.paused = false
                this.acumulateTime = 0
            }
            return
        }
        this.gearStack.update()
    },
    render(){
        Pacman.context.fillRect(0,0,224,288)
        this.sb.begin()
        ClassicMaze.render(this.sb)
        this.gearStack.render(this.sb)
        this.sb.end();
    },
    methods: {
        pauseGame(time){
            this.paused = true
            this.pausedTime = time
            this.acumulateTime = 0
        },
    },
    gears: {
        PacmanEntity,
        RedPhantom,
        PinkPhantom,
        BluePhantom,
        OrangePhantom,
    }
})

const Pacman = new Game({container_id:"pacman", width: 224, height: 288}, mainGear)
Pacman.GLOBALS = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
    PacmanEntity,
}

export default Pacman