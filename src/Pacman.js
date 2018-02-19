import { Game, Gear, Loader, SpriteBatch, Keyboard } from '../render'
import ClassicMaze from './maze/ClassicMaze'
import pacmanEntity from './entities/PacmanEntity'
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
        this.tileset = this.tiles.split(1, 8)[0]
        Pacman.GLOBALS.tileset = this.tileset
        Pacman.GLOBALS.maze = ClassicMaze
        this.sb = new SpriteBatch(Pacman.context)
        this.gearStack.init()
    },
    update(){
        this.gearStack.update()
    },
    render(){
        Pacman.context.fillRect(0,0,224,288)
        this.sb.begin()
        ClassicMaze.render(this.sb)
        this.gearStack.render(this.sb)
        this.sb.end();
    },
    gears: {
        pacmanEntity,
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
    pacmanEntity,
}

export default Pacman