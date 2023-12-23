const testList = {"test" : "test1",
                  "cos" : "cos2",
                  "cat":"kot"
}


let pageDisplay = document.querySelector(".content");

for (let i in testList){
    let subValue = i + " " + testList[i];
    subLi = document.createElement('div');
    subLi.innerText = subValue;
    pageDisplay.appendChild(subLi);
  }