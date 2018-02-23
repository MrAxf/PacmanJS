import AxfMaze from './AxfMaze';
import ClassicMaze from './ClassicMaze'

const mazes = {
  "classic": ClassicMaze,
  "axf": AxfMaze,
}

const GetMaze = () => mazes[window.mazeName]

export default GetMaze