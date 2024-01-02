let count = 1;
let goodCounter = 0;
let badCounter = 0;

const storedData = localStorage.getItem("selectedList");
console.log(storedData);
document.addEventListener("DOMContentLoaded", function () {
    
    fullCardSetCount = JSON.parse(storedData).length;

    updateCounter();
    updateCard(storedData);
});

function updateCounter(){
    let counter = document.querySelector(".counter");
    counter.innerHTML = count + "/" + fullCardSetCount;
}

function nextOnClick(){
    if(count > fullCardSetCount-1){
        count=fullCardSetCount;
    }else{
    count++;
    }

    updateCounter()
    updateCard(storedData)
}

function rotateDiv(classType) {
    const div = document.querySelector('.card');

    if (!div.contains(event.target)) {
        return;
    }
    div.classList.toggle(classType);

    event.stopPropagation();

}


function updateCard(storedData){

    if (storedData) {
        const selectedList = JSON.parse(storedData);
        const frontContentElement = document.querySelector(".cardContent.front");
        const backContentElement = document.querySelector(".cardContent.back");
      
        frontContentElement.innerText = selectedList[count-1][0];
        backContentElement.innerText = selectedList[count-1][1];
    
    } else {
      console.log("Brak danych w localStorage");
    }
    
}

function correctAnswer(){
    if(checkAnswerSum(goodCounter,badCounter)){
        console.log("Za duzo punktow");
    }else{
    goodCounter++;
    const correctAnswerElement = document.querySelector(".correctScore");

    correctAnswerElement.innerText = "Correct: " + goodCounter;

    nextOnClick()
    rotateDiv('cardRotated', event);
}
}

function incorrectAnswer(){
    if(checkAnswerSum(goodCounter,badCounter)){
        console.log("Za duzo punktow");
    }else{
    badCounter++;
    const badAnswerElement = document.querySelector(".incorrectScore");

    badAnswerElement.innerText = "Incorrect: " + badCounter;
    nextOnClick()
    rotateDiv('cardRotated', event);
    }
}

function checkAnswerSum(goodCounter,badCounter){
    console.log(count);
    if(goodCounter + badCounter == fullCardSetCount){
        if(!document.querySelector(".restartButton")){
            let scoreboardDisplay = document.querySelector(".scoreboard");
            let restartButton = document.createElement("button");
            restartButton.setAttribute("class","restartButton");
            restartButton.innerHTML='<i class="material-icons w3-spin">refresh</i>'
            restartButton.addEventListener("click", function(){
                count=1;
                goodCounter=0;
                console.log(goodCounter);
                badCounter=0;

                let correctAnswerElement = document.querySelector(".correctScore");
                correctAnswerElement.innerText = "Correct: " + goodCounter;
                
                let badAnswerElement = document.querySelector(".incorrectScore");
                badAnswerElement.innerText = "Incorrect: " + badCounter;

                updateCounter();
                updateCard(storedData)
            })
            scoreboardDisplay.appendChild(restartButton);
        }
        return true;
    }
    return false
}
