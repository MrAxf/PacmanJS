import Maze from "./Maze"

const AxfMaze = new Maze(
    [
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,0,1,1],
        [0,0,0,2,0,0,0,0,2,0,0,0,2,0,0,2,0,0,0,2,0,0,0,0,2,0,0,0],
        [1,1,1,2,0,1,1,0,2,0,1,0,2,0,0,2,0,1,0,2,0,1,1,0,2,1,1,1],
        [0,0,0,2,0,0,0,0,2,0,0,0,2,0,0,2,0,0,0,2,0,0,0,0,2,0,0,0],
        [1,1,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1,1],
        [1,1,0,2,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,2,0,1,1],
        [0,0,0,2,0,0,2,0,1,1,1,0,2,0,0,2,0,1,1,1,0,2,0,0,2,0,0,0],
        [0,3,2,2,2,2,2,0,1,1,1,0,2,2,2,2,0,1,1,1,0,2,2,2,2,2,3,0],
        [0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
        [0,2,0,1,1,0,2,0,0,2,2,2,2,0,0,2,2,2,2,0,0,2,0,1,1,0,2,0],
        [0,2,0,1,1,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,1,1,0,2,0],
        [0,2,0,1,1,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,1,1,0,2,0],
        [0,2,0,0,0,0,2,0,0,2,0,0,2,2,2,2,0,0,2,0,0,2,0,0,0,0,2,0],
        [0,2,2,2,2,2,2,2,2,2,0,0,2,0,0,2,0,0,2,2,2,2,2,2,2,2,2,0],
        [0,0,0,0,0,0,2,0,0,1,0,0,2,0,0,2,0,0,1,0,0,2,0,0,0,0,0,0],
        [1,1,1,1,1,0,2,0,0,1,1,1,1,1,1,1,1,1,1,0,0,2,0,1,1,1,1,1],
        [1,1,1,1,1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,1,1,1,1,1],
        [0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0],
        [1,1,1,1,1,1,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,1,1,1,1,1,1],
        [0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0],
        [1,1,1,1,1,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,1,1,1,1,1],
        [0,0,0,0,0,0,2,0,0,2,2,2,2,0,0,2,2,2,2,0,0,2,0,0,0,0,0,0],
        [0,3,2,2,2,2,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,2,2,2,2,3,0],
        [0,2,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,2,0],
        [0,2,0,1,1,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,1,1,0,2,0],
        [0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,2,0],
        [0,2,0,0,2,2,2,0,1,1,0,1,1,1,1,1,1,0,1,1,0,2,2,2,0,0,2,0],
        [0,2,0,0,2,0,0,0,1,1,0,1,1,1,1,1,1,0,1,1,0,0,0,2,0,0,2,0],
        [0,2,2,2,2,0,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,0,2,2,2,2,0],
        [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
    ],
    [
        [[1,1], 'auto'],
        [[1,3], 'auto'],
        [[1,8], 'auto'],
        [[1,12], 'auto'],
        [[1,15], 'auto'],
        [[1,19], 'auto'],
        [[1,24], 'auto'],
        [[1,26], 'auto'],
        [[2,2], 'auto'],
        [[2,4], 'auto'],
        [[2,7], 'auto'],
        [[2,9], 'auto'],
        [[2,11], 'auto'],
        [[2,16], 'auto'],
        [[2,18], 'auto'],
        [[2,20], 'auto'],
        [[2,23], 'auto'],
        [[2,25], 'auto'],
        [[3,3], 'auto'],
        [[3,24], 'auto'],
        [[4,2], 'auto'],
        [[4,4], 'auto'],
        [[4,7], 'auto'],
        [[4,9], 'auto'],
        [[4,11], 'auto'],
        [[4,13], 'auto'],
        [[4,14], 'auto'],
        [[4,16], 'auto'],
        [[4,18], 'auto'],
        [[4,20], 'auto'],
        [[4,23], 'auto'],
        [[4,25], 'auto'],
        [[5,1], 'auto'],
        [[5,3], 'auto'],
        [[5,6], 'auto'],
        [[5,8], 'auto'],
        [[5,12], 'auto'],
        [[5,15], 'auto'],
        [[5,19], 'auto'],
        [[5,21], 'auto'],
        [[5,24], 'auto'],
        [[5,26], 'auto'],
        [[6,1], 'auto'],
        [[6,4], 'auto'],
        [[6,5], 'auto'],
        [[6,7], 'auto'],
        [[6,11], 'auto'],
        [[6,13], 'auto'],
        [[6,14], 'auto'],
        [[6,16], 'auto'],
        [[6,20], 'auto'],
        [[6,22], 'auto'],
        [[6,23], 'auto'],
        [[6,26], 'auto'],
        [[7,2], 'auto'],
        [[7,4], 'auto'],
        [[7,5], 'auto'],
        [[7,8], 'auto'],
        [[7,9], 'auto'],
        [[7,10], 'auto'],
        [[7,13], 'auto'],
        [[7,14], 'auto'],
        [[7,17], 'auto'],
        [[7,18], 'auto'],
        [[7,19], 'auto'],
        [[7,22], 'auto'],
        [[7,23], 'auto'],
        [[7,25], 'auto'],
        [[8,1], 'auto'],
        [[8,3], 'auto'],
        [[8,6], 'auto'],
        [[8,8], 'auto'],
        [[8,9], 'auto'],
        [[8,10], 'auto'],
        [[8,12], 'auto'],
        [[8,15], 'auto'],
        [[8,17], 'auto'],
        [[8,18], 'auto'],
        [[8,19], 'auto'],
        [[8,21], 'auto'],
        [[8,24], 'auto'],
        [[8,26], 'auto'],
        [[9,2], 'auto'],
        [[9,5], 'auto'],
        [[9,11], 'auto'],
        [[9,13], 'auto'],
        [[9,14], 'auto'],
        [[9,16], 'auto'],
        [[9,22], 'auto'],
        [[9,25], 'auto'],
        [[10,3], 'auto'],
        [[10,4], 'auto'],
        [[10,9], 'auto'],
        [[10,12], 'auto'],
        [[10,15], 'auto'],
        [[10,18], 'auto'],
        [[10,23], 'auto'],
        [[10,24], 'auto'],
        [[11,3], 'auto'],
        [[11,4], 'auto'],
        [[11,10], 'auto'],
        [[11,17], 'auto'],
        [[11,23], 'auto'],
        [[11,24], 'auto'],
        [[12,3], 'auto'],
        [[12,4], 'auto'],
        [[12,23], 'auto'],
        [[12,24], 'auto'],
        [[13,2], 'auto'],
        [[13,5], 'auto'],
        [[13,7], 'auto'],
        [[13,8], 'auto'],
        [[13,12], 'auto'],
        [[13,15], 'auto'],
        [[13,19], 'auto'],
        [[13,20], 'auto'],
        [[13,22], 'auto'],
        [[13,25], 'auto'],
        [[14,1], 'auto'],
        [[14,6], 'auto'],
        [[14,9], 'auto'],
        [[14,13], 'auto'],
        [[14,14], 'auto'],
        [[14,18], 'auto'],
        [[14,21], 'auto'],
        [[14,26], 'auto'],
        [[15,5], 'auto'],
        [[15,7], 'auto'],
        [[15,8], 'auto'],
        [[15,10], 'auto'],
        [[15,11], 'auto'],
        [[15,13], 'auto'],
        [[15,14], 'auto'],
        [[15,16], 'auto'],
        [[15,17], 'auto'],
        [[15,19], 'auto'],
        [[15,20], 'auto'],
        [[15,22], 'auto'],
        [[16,1], 'auto'],
        [[16,2], 'auto'],
        [[16,3], 'auto'],
        [[16,4], 'auto'],
        [[16,9], 'auto'],
        [[16,12], 'auto'],
        [[16,15], 'auto'],
        [[16,18], 'auto'],
        [[16,23], 'auto'],
        [[16,24], 'auto'],
        [[16,25], 'auto'],
        [[16,26], 'auto'],
        [[17,1], 'auto'],
        [[17,2], 'auto'],
        [[17,3], 'auto'],
        [[17,4], 'auto'],
        [[17,23], 'auto'],
        [[17,24], 'auto'],
        [[17,25], 'auto'],
        [[17,26], 'auto'],
        [[18,5], 'auto'],
        [[18,7], 'auto'],
        [[18,20], 'auto'],
        [[18,22], 'auto'],
        [[19,6], 'auto'],
        [[19,12], 'auto'],
        [[19,15], 'auto'],
        [[19,21], 'auto'],
        [[20,5], 'auto'],
        [[20,7], 'auto'],
        [[20,11], 'auto'],
        [[20,16], 'auto'],
        [[20,20], 'auto'],
        [[20,22], 'auto'],
        [[21,11], 'auto'],
        [[21,16], 'auto'],
        [[22,5], 'auto'],
        [[22,9], 'auto'],
        [[22,12], 'auto'],
        [[22,15], 'auto'],
        [[22,18], 'auto'],
        [[22,22], 'auto'],
        [[23,1], 'auto'],
        [[23,6], 'auto'],
        [[23,10], 'auto'],
        [[23,17], 'auto'],
        [[23,21], 'auto'],
        [[23,26], 'auto'],
        [[24,2], 'auto'],
        [[24,5], 'auto'],
        [[24,7], 'auto'],
        [[24,8], 'auto'],
        [[24,10], 'auto'],
        [[24,17], 'auto'],
        [[24,19], 'auto'],
        [[24,20], 'auto'],
        [[24,22], 'auto'],
        [[24,25], 'auto'],
        [[25,6], 'auto'],
        [[25,9], 'auto'],
        [[25,18], 'auto'],
        [[25,21], 'auto'],
        [[26,5], 'auto'],
        [[26,7], 'auto'],
        [[26,20], 'auto'],
        [[26,22], 'auto'],
        [[27,4], 'auto'],
        [[27,6], 'auto'],
        [[27,8], 'auto'],
        [[27,9], 'auto'],
        [[27,11], 'auto'],
        [[27,12], 'auto'],
        [[27,13], 'auto'],
        [[27,14], 'auto'],
        [[27,15], 'auto'],
        [[27,16], 'auto'],
        [[27,18], 'auto'],
        [[27,19], 'auto'],
        [[27,21], 'auto'],
        [[27,23], 'auto'],
        [[28,2], 'auto'],
        [[28,3], 'auto'],
        [[28,5], 'auto'],
        [[28,7], 'auto'],
        [[28,8], 'auto'],
        [[28,9], 'auto'],
        [[28,11], 'auto'],
        [[28,12], 'auto'],
        [[28,13], 'auto'],
        [[28,14], 'auto'],
        [[28,15], 'auto'],
        [[28,16], 'auto'],
        [[28,18], 'auto'],
        [[28,19], 'auto'],
        [[28,20], 'auto'],
        [[28,22], 'auto'],
        [[28,24], 'auto'],
        [[28,25], 'auto'],
        [[29,1], 'auto'],
        [[29,4], 'auto'],
        [[29,6], 'auto'],
        [[29,7], 'auto'],
        [[29,8], 'auto'],
        [[29,9], 'auto'],
        [[29,11], 'auto'],
        [[29,12], 'auto'],
        [[29,13], 'auto'],
        [[29,14], 'auto'],
        [[29,15], 'auto'],
        [[29,16], 'auto'],
        [[29,18], 'auto'],
        [[29,19], 'auto'],
        [[29,20], 'auto'],
        [[29,21], 'auto'],
        [[29,23], 'auto'],
        [[29,26], 'auto'],
    ],
    {x: 13.5, y: 19},
    {x: 13.5, y: 29},
    "axfMaze"
)

export default AxfMaze