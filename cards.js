const testList = [["test","test1"],
                  ["cos","cos2"],
                  ["cat","kot"]
]


const testList2 = [["dog","pies"],
                  ["cow","krowa"],
                ["giraffe","zyrafa"]];
                
const lists = [testList, testList2]


function saveValuesToFile(selectedList) {
  localStorage.setItem("selectedList", JSON.stringify(selectedList));
}


let pageDisplay = document.querySelector(".content");

for (let i=0; i<lists.length; i++){
    let newContaner = document.createElement("div");
    newContaner.setAttribute("class","cardContainer");
    document.addEventListener("click", function(e){
      const target = e.target.closest(".cardContainer");
      const selectedElements = document.querySelectorAll(".cardContainer.selected");
    
      if (target) {
        selectedElements.forEach((element) => {
          element.classList.remove("selected");
        });
        target.classList.add("selected");

      const selectedListIndex = Array.from(target.parentNode.children).indexOf(target);
      const selectedList = lists[selectedListIndex];

        saveValuesToFile(selectedList);
      }
})
  for (let j=0; j<lists[i].length; j++){
    let subValue = lists[i][j];
    subLi = document.createElement('div');
    subLi.innerText = subValue;
    newContaner.appendChild(subLi);

  }
  pageDisplay.append(newContaner);
}


