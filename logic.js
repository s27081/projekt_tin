let count = 1;

const storedData = localStorage.getItem("selectedList");

let fullCardSetCount = JSON.parse(storedData).length;

function nextOnClick(){
    if(count > fullCardSetCount-1){
        count=fullCardSetCount;
    }else{
    count++;
    }

    let counter = document.querySelector(".counter");
    counter.innerHTML = count + "/" + fullCardSetCount;
    updateCard(storedData)
}

function prevOnClick(){
    if(count<=1){
        count=1;
    }else{
        count--;
    }
    let counter = document.querySelector(".counter");
    counter.innerHTML = count +"/" + fullCardSetCount;
    updateCard(storedData)
};
  

function rotateDiv(classType) {
    const div = document.querySelector('.card');
    div.classList.toggle(classType);

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

let goodCounter = 0;
let badCounter = 0;

function correctAnswer(){
    if(checkAnswerSum(goodCounter,badCounter)){
        console.log("Za duzo punktow");
    }else{
    goodCounter++;
    const correctAnswerElement = document.querySelector(".correctScore");

    correctAnswerElement.innerText = "Correct: " + goodCounter;

    nextOnClick()
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
    }
}

function checkAnswerSum(goodCounter,badCounter){
    if(goodCounter + badCounter == fullCardSetCount){
        return true;
    }
    return false;
}
