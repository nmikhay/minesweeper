
const gameContainer = document.querySelector('.gameContainer');


let containerWidth = "400px";
let containerHeight = "400px";
gameContainer.setAttribute("style",`width:${containerWidth} ; height:${containerHeight}`);


let totalBoxes = 100;
let rowLenght= 10;
let boxes= [];
let totalBombs= 20;
let isGameOver = false;
let stopGame= false;
let flags=0;
let score = 0;

function createBoard(){
   
    const bombsArray = new Array(totalBombs).fill('bomb');
    const emptyArray = new Array(totalBoxes-totalBombs).fill('empty');

    const gameArray2= shuffle((bombsArray.concat(emptyArray)));  

    for (let i=0; i<totalBoxes;i++){
        let box = document.createElement("div");
        box.setAttribute("id",i);
        box.classList.add(gameArray2[i])
        gameContainer.appendChild(box);
        boxes.push(box);

        box.addEventListener('click',(e)=>{
            click(e.target);        
        })

        box.addEventListener('contextmenu',(e)=>{
            e.preventDefault();
            addFlag(e.target);
        })
    }
    calculateTotal();
}


createBoard();

const click = (box) => {
    let currentId = box.id;
    if (isGameOver) {
      return;
    }
  
    if (box.classList.contains('checked') || box.classList.contains('flag')) {
      return;
    }
  
    if (box.classList.contains('bomb')) {
      isGameOver = true;
      gameOver(box);
      return;
    } else {
      let total = parseInt(box.getAttribute('data'), 10);
      if (total !== 0) {
        score++;
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = score;
        box.classList.add('checked');
        box.innerHTML = total;
        return;
      }
      massClick(box, currentId);
    }
    box.classList.add('checked');
  };
  
const clickSecond = (box)=>{

    let currentId = box.id;
    if (isGameOver){
        return
    }

    if ( box.classList.contains('checked')|| box.classList.contains('flag')){
        return
    }

    else{
        let total = box.getAttribute('data') ;
        if (total!=0){
            score++;
            box.classList.add('checked');
            box.innerHTML= total; 
            return
        } 
        massClick(box, currentId);
    }
    box.classList.add('checked');
}
function gameOver(box){
    box.innerHTML= '💣';
    isGameOver = true;
    const lost = document.querySelector(".lost");
    lost.classList.toggle("hidden");
    const button = document.querySelector(".button");
    button.classList.toggle("hidden");
    button.addEventListener("click", ()=>{
        location.reload()
    })

    for (let box of boxes){
        if(box.classList.contains('bomb')){
            box.innerHTML= '💣';
            box.classList.remove("bomb")
            box.classList.add('checked');
        }
    }
}

function addFlag(box){
   
    if(isGameOver){
        return
    }
    if(!box.classList.contains('checked') && flags<totalBombs ){
        if(!box.classList.contains('flag')){
            box.classList.add('flag');
            box.innerHTML='🚩';
            flags++
            gameWin();
        }else{
            box.classList.remove('flag')
            box.innerHTML='';
            flags--;
        }
    }

}

function gameWin(){

    let contest = 0;
    for (let i=0; i<boxes.length;i++){
        if(boxes[i].classList.contains('flag') && boxes[i].classList.contains('bomb')){
            contest++
        }
        if(contest === totalBombs){
            stopGame= true;
            const win = document.querySelector(".won");
            win.classList.toggle("hidden");
            const button = document.querySelector(".button");
            button.classList.toggle("hidden");
            button.addEventListener("click", ()=>{
                location.reload()
            })
        }
    }
   
}

function massClick(box, currentId){
   
    const isLeftEdge = (currentId % rowLenght === 0);
    const isRightEdge = (currentId % rowLenght === (rowLenght-1));

        setTimeout(()=>{
        if(currentId>0 && !isLeftEdge){
            const newId = boxes[parseInt(currentId) -1].id
            const newBox= document.getElementById(newId);
            clickSecond(newBox)
        }
        
        if(currentId<89 ){
            const newId = boxes[parseInt(currentId) +rowLenght].id
            const newBox= document.getElementById(newId);
            clickSecond(newBox)
        }
        if(currentId>10){
            const newId = boxes[parseInt(currentId -rowLenght)].id
            const newBox= document.getElementById(newId);
            clickSecond(newBox)
        }
        if(currentId<98 && !isRightEdge){
            const newId = boxes[parseInt(currentId) +1].id
            const newBox= document.getElementById(newId);
            clickSecond(newBox)
        }
        if(currentId>11 && !isLeftEdge){
            const newId = boxes[parseInt(currentId) -1 -rowLenght].id
            const newBox= document.getElementById(newId);
            clickSecond(newBox)
        }
        if(currentId<90 && !isLeftEdge){
            const newId = boxes[parseInt(currentId) -1 +rowLenght].id
            const newBox= document.getElementById(newId);
            clickSecond(newBox)
        }
        if(currentId<88 && !isRightEdge ){
            const newId = boxes[parseInt(currentId) +1 +rowLenght].id
            const newBox= document.getElementById(newId);
            clickSecond(newBox)
        }
        if(currentId>9 && !isRightEdge){
            const newId = boxes[parseInt(currentId) +1 -rowLenght].id
            const newBox= document.getElementById(newId);
            clickSecond(newBox)
        }

    },5)

}

function calculateTotal() {
    for (let i = 0; i < boxes.length; i++) {
      let total = 0;
      const isLeftEdge = i % rowLenght === 0;
      const isRightEdge = (i + 1) % rowLenght === 0;
  
      if (boxes[i].classList.contains('empty')) {
        if (i > 0 && !isLeftEdge && boxes[i - 1].classList.contains('bomb')) {
          total++;
        }
        if (i < totalBoxes - 1 && !isRightEdge && boxes[i + 1].classList.contains('bomb')) {
          total++;
        }
        if (i >= rowLenght && boxes[i - rowLenght].classList.contains('bomb')) {
          total++;
        }
        if (i < totalBoxes - rowLenght && boxes[i + rowLenght].classList.contains('bomb')) {
          total++;
        }
        if (i >= rowLenght && !isLeftEdge && boxes[i - 1 - rowLenght].classList.contains('bomb')) {
          total++;
        }
        if (i >= rowLenght && !isRightEdge && boxes[i + 1 - rowLenght].classList.contains('bomb')) {
          total++;
        }
        if (i < totalBoxes - rowLenght && !isLeftEdge && boxes[i - 1 + rowLenght].classList.contains('bomb')) {
          total++;
        }
        if (i < totalBoxes - rowLenght && !isRightEdge && boxes[i + 1 + rowLenght].classList.contains('bomb')) {
          total++;
        }
        boxes[i].setAttribute('data', total);
      }
    }
  }
  


function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;
      while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  function startTimer(duration, display) {
    let timer = duration;
    let minutes, seconds;
    let intervalID = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
  
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      display.textContent = minutes + ":" + seconds;

      if(isGameOver){
        clearInterval(intervalID);
      }
      if(stopGame){
        clearInterval(intervalID);
      }
  
      if (--timer < 0) {
        clearInterval(intervalID);
        // alert("Game Over!");
        isGameOver = true;
        const timeOver = document.querySelector(".timeOver");
        timeOver.classList.toggle("hidden");
        const button = document.querySelector(".button");
        button.classList.toggle("hidden");
        button.addEventListener("click", ()=>{
            location.reload()
        })
      }
    }, 1000);
  }
  
  window.onload = function () {
    let timeout = 120; // unit: seconds
    let display = document.querySelector("#time");
    startTimer(timeout, display);
  };



  


  
  
  