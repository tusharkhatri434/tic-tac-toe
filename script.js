document.addEventListener('DOMContentLoaded',function (){

    const board = document.getElementById('game-board');
    const winnerID = document.getElementById('winner');
    const resetBtn = document.getElementById('resetBtn');
    const userName = document.getElementById('userName');
    let userInput = 'X';
    const valuesInside = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];

    function render(){
        board.innerHTML = "";
        valuesInside.forEach((row,rowIndex)=>{
            row.forEach((cell,colIndex)=>{
                const element = document.createElement('div');
                element.classList.add('cell');
                element.dataset.row = rowIndex;
                element.dataset.col = colIndex;
                element.textContent = cell;
                element.addEventListener('click', handleCellClick);
                board.appendChild(element);
                // winnerID.innerHTML = '';

            });
        });
    }


    function handleCellClick(event) {
      const row = parseInt(event.target.dataset.row);
      const col = parseInt(event.target.dataset.col);


      
      if(valuesInside[row][col]== " "){
        valuesInside[row][col] = userInput;
        userInput = userInput === "X" ? "O" : "X";
        render();

        const winner = checkWinner();
        console.log(winner);
        if(winner){
          const heading = document.createElement('h2');
          let palyer = winner === "X" ? "X" : "O";
          heading.textContent = `WIN PLAYER - ${palyer}`;
            winnerID.style.display = "flex";
          userName.appendChild(heading);
          // resetGame();
        }
        else if(isBoardFull()){
            const heading = document.createElement("h2");
            heading.textContent = "MATCH Tie";
            winnerID.style.display = "flex";
            userName.appendChild(heading);
            // resetGame();
        }

      }
    }
   
    function checkWinner(){
           
        for (let i = 0; i < 3; i++) {

            if(valuesInside[i][0]===valuesInside[i][1] && valuesInside[i][1]===valuesInside[i][2] && valuesInside[i][0]!==" "){
                return valuesInside[i][0];
            }
            if(valuesInside[0][i]===valuesInside[1][i] && valuesInside[1][i]===valuesInside[2][i] && valuesInside[0][i]!==" "){
                return valuesInside[0][i];
            }
            if(valuesInside[0][0]===valuesInside[1][1] && valuesInside[1][1]===valuesInside[2][2] && valuesInside[0][0]!==" "){
              return valuesInside[0][0];
            }
            if(valuesInside[0][2]===valuesInside[1][1] && valuesInside[1][1]===valuesInside[2][0] && valuesInside[0][2]!==" "){
              return valuesInside[0][2];
            }
        }

        return null;
    }

     function isBoardFull(){
        for(let i = 0; i < 3; i++){
            for(let j = i; j < 3; j++){
                if(valuesInside[i][j]===" "){
                    return false;
                }
            }
        }

        return true;
     }

     function reset() {
       for (let index = 0; index < 3; index++) {
         for (let j = 0; j < 3; j++) {
           valuesInside[index][j] = " ";
         }
       }
     }

     resetBtn.addEventListener("click", (e) => {
       e.preventDefault();
       reset();
       render();
       userName.innerText = "";
       winnerID.style.display = "none";
     });

    render();
});

