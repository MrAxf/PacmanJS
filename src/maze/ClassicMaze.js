import Maze from "./Maze"

const ClassicMaze = new Maze(
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0],
        [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
        [0,3,0,1,1,0,2,0,1,1,1,0,2,0,0,2,0,1,1,1,0,2,0,1,1,0,3,0],
        [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
        [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
        [0,2,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,2,0],
        [0,2,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,2,0],
        [0,2,2,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,2,2,0],
        [0,0,0,0,0,0,2,0,0,0,0,0,1,0,0,1,0,0,0,0,0,2,0,0,0,0,0,0],
        [1,1,1,1,1,0,2,0,0,0,0,0,1,0,0,1,0,0,0,0,0,2,0,1,1,1,1,1],
        [1,1,1,1,1,0,2,0,0,1,1,1,1,1,1,1,1,1,1,0,0,2,0,1,1,1,1,1],
        [1,1,1,1,1,0,2,0,0,1,0,0,0,1,1,0,0,0,1,0,0,2,0,1,1,1,1,1],
        [0,0,0,0,0,0,2,0,0,1,0,1,1,1,1,1,1,0,1,0,0,2,0,0,0,0,0,0],
        [1,1,1,1,1,1,2,1,1,1,0,1,1,1,1,1,1,0,1,1,1,2,1,1,1,1,1,1],
        [0,0,0,0,0,0,2,0,0,1,0,1,1,1,1,1,1,0,1,0,0,2,0,0,0,0,0,0],
        [1,1,1,1,1,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,1,1,1,1,1],
        [1,1,1,1,1,0,2,0,0,1,1,1,1,1,1,1,1,1,1,0,0,2,0,1,1,1,1,1],
        [1,1,1,1,1,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,1,1,1,1,1],
        [0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0],
        [0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0],
        [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
        [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
        [0,3,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,3,0],
        [0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0],
        [0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0],
        [0,2,2,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,2,2,0],
        [0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0],
        [0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0],
        [0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ],
    [
        [[1,1], 'auto'],
        [[1,6], 'auto'],
        [[1,12], 'auto'],
        [[1,15], 'auto'],
        [[1,21], 'auto'],
        [[1,26], 'auto'],
        [[5,1], 'auto'],
        [[5,6], 'auto'],
        [[5,9], 'auto'],
        [[5,12], 'auto'],
        [[5,15], 'auto'],
        [[5,18], 'auto'],
        [[5,21], 'auto'],
        [[5,26], 'auto'],
        [[8,1], 'auto'],
        [[8,6], 'auto'],
        [[8,9], 'auto'],
        [[8,12], 'auto'],
        [[8,15], 'auto'],
        [[8,18], 'auto'],
        [[8,21], 'auto'],
        [[8,26], 'auto'],
        [[11,9], 'auto'],
        [[11,12], [1,3]],
        [[11,15], [1,3]],
        [[11,18], 'auto'],
        [[14,6], 'auto'],
        [[14,9], 'auto'],
        [[14,18], 'auto'],
        [[14,21], 'auto'],
        [[17,9], 'auto'],
        [[17,18], 'auto'],
        [[20,1], 'auto'],
        [[20,6], 'auto'],
        [[20,9], 'auto'],
        [[20,12], 'auto'],
        [[20,15], 'auto'],
        [[20,18], 'auto'],
        [[20,21], 'auto'],
        [[20,26], 'auto'],
        [[23,1], 'auto'],
        [[23,3], 'auto'],
        [[23,6], 'auto'],
        [[23,9], 'auto'],
        [[23,12], [1,3]],
        [[23,15], [1,3]],
        [[23,18], 'auto'],
        [[23,21], 'auto'],
        [[23,24], 'auto'],
        [[23,26], 'auto'],
        [[26,1], 'auto'],
        [[26,3], 'auto'],
        [[26,6], 'auto'],
        [[26,9], 'auto'],
        [[26,12], 'auto'],
        [[26,15], 'auto'],
        [[26,18], 'auto'],
        [[26,21], 'auto'],
        [[26,24], 'auto'],
        [[26,26], 'auto'],
        [[29,1], 'auto'],
        [[29,12], 'auto'],
        [[29,15], 'auto'],
        [[29,26], 'auto'],
    ],
    {x: 13.5, y: 26},
    {x: 13.5, y: 15}
)

export default ClassicMaze