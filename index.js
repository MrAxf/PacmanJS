import Pacman from './src/Pacman'
import { Game, Gear, Keyboard } from './render'

Pacman.fitCanvasToConatiner()
Pacman.addInputManagers(Keyboard)
Pacman.start()