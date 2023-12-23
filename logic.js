let count = 1;

function nextOnClick(){
    count++;
    let counter = document.querySelector(".counter");
    counter.innerHTML = count + "/4";
}

function prevOnClick(){
    if(count<=1){
        count=1;
    }else{
        count--;
    }
    let counter = document.querySelector(".counter");
    counter.innerHTML = count + "/4";
  
}

function rotateDiv() {
    const div = document.querySelector('.card');
    div.classList.toggle('cardRotated');
}
