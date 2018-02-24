const layout = [
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
]
for(let i = 1; i < layout.length - 1; i++){
  for(let j = 1; j < layout[i].length - 1; j++){
    if(
      layout[i-1][j] > 0 && layout[i][j+1] > 0 ||
      layout[i-1][j] > 0 && layout[i][j-1] > 0 ||
      layout[i+1][j] > 0 && layout[i][j+1] > 0 ||
      layout[i+1][j] > 0 && layout[i][j-1] > 0 
    ) console.log(`[[${i},${j}], 'auto'],`)
  }
}