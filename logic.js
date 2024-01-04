//ustawienie domyślnych wartości do liczników
let count = 1;
let goodCounter = 0;
let badCounter = 0;

const storedData = sessionStorage.getItem("selectedList");

//zabezpieczenia aby wczytane dane od razu pokazały się na ekranie
document.addEventListener("DOMContentLoaded", function () {
    
    fullCardSetCount = JSON.parse(storedData).length;

    updateCounter();
    updateCard(storedData,count);
});

//aktualizacja licznika kart
function updateCounter(){
    let counter = document.querySelector(".counter");
    counter.innerHTML = count + "/" + fullCardSetCount;
}

//przeskoczenie do kolejnej karty
function nextOnClick(){
    if(count > fullCardSetCount-1){
        count=fullCardSetCount;
    }else{
    count++;
    }

    updateCounter()
    updateCard(storedData,count)
}

//animacja odwracania karty
function rotateDiv(classType) {
    const div = document.querySelector('.card');

    if (!div.contains(event.target)) {
        return;
    }
    div.classList.toggle(classType);

    event.stopPropagation();

}

//aktualizacja zawartości karty
function updateCard(storedData,count){

    if (storedData) {
        const selectedList = JSON.parse(storedData);
        const frontContentElement = document.querySelector(".cardContent.front");
        const backContentElement = document.querySelector(".cardContent.back");
      
        frontContentElement.innerText = selectedList[count-1][0];
        backContentElement.innerText = selectedList[count-1][1];
    
    } else {
      console.log("No data in localStorage");
    }
    
}

//aktualizacja przy dobrej odpowiedzi
function correctAnswer(){
    if(!checkAnswerSum(goodCounter,badCounter)){
        goodCounter++;
        const correctAnswerElement = document.querySelector(".correctScore");

        correctAnswerElement.innerText = "Correct: " + goodCounter;

        nextOnClick()
        rotateDiv('cardRotated', event);
}

}
//aktualizacja przy złej odpowiedzi
function incorrectAnswer(){
    if(!checkAnswerSum(goodCounter,badCounter)){
    badCounter++;
    const badAnswerElement = document.querySelector(".incorrectScore");

    badAnswerElement.innerText = "Incorrect: " + badCounter;
    nextOnClick()
    rotateDiv('cardRotated', event);
    }
}

//restart wszystkich wartości do początkowych, pozwala jeszcze raz przejść każdą kartę
function resetFlashCards(){
    count=1;
    goodCounter=0;
    badCounter=0
    let correctAnswerElement = document.querySelector(".correctScore");
    correctAnswerElement.innerText = "Correct: " + goodCounter;
    
    let badAnswerElement = document.querySelector(".incorrectScore");
    badAnswerElement.innerText = "Incorrect: " + badCounter;
    
    let restartButton = document.querySelector(".restartButton")
    restartButton.style.display = "none";
}

//sprawdzenie czy wartość nie przekracza granic
function checkAnswerSum(goodCounter,badCounter){
    if(goodCounter + badCounter == fullCardSetCount){
        //utworzenie przycisku do restartu
        if(!document.querySelector(".restartButton")){
            let scoreboardDisplay = document.querySelector(".scoreboard");
            let restartButton = document.createElement("button");
            restartButton.setAttribute("class","restartButton");
            restartButton.innerHTML='<i class="material-icons w3-spin">refresh</i>'
            restartButton.addEventListener("click", function(){              
                resetFlashCards();
                updateCounter();
                updateCard(storedData,count);
            })
            scoreboardDisplay.appendChild(restartButton);
        }
        //jeśli przycisk istnieje jest on pokazywany
        let restartButton = document.querySelector(".restartButton")
        restartButton.style.display = "block";
        console.log("Points limit");
        return true;
    }
    return false
}

