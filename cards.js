const testList = [["example","przykład"],
                  ["word","słowo"],
                  ["dictionary","słownik"],
                  ["book","książka"],
                  ["comics","komiks"],
                  ["newspaper","gazeta"],
                  ["ad","reklama"],
                  ["power supply","zasilacz"],
                  ["memory","pamięć"],
                  ["motherboard","płyta główna"],
]


const testList2 = [["dog","pies"],
                  ["cow","krowa"],
                ["giraffe","zyrafa"]];
                
const lists = [testList, testList2]


function saveValuesToFile(selectedList) {
  localStorage.setItem("selectedList", JSON.stringify(selectedList));
}

function clickSelectionHandler(e){
  console.log(e);
  const target = e.target.closest(".cardContainerContent");      
  const selectedElements = document.querySelectorAll(".cardContainerContent.selected2");
      
  if (target) {
    selectedElements.forEach((element) => {
      element.classList.remove("selected2");
      
    })
    target.classList.add("selected2");
  }
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
    subLi.setAttribute("class","cardContainerContent")
    subLi.addEventListener("click", clickSelectionHandler)
      
    subLi.innerText = subValue[0] + " " + subValue[1];
    newContaner.appendChild(subLi);
  }
  pageDisplay.append(newContaner);
}

function addWord(){
  const selectedSet = document.querySelector(".cardContainer.selected");
  
  if (selectedSet) {
    const selectedParentListIndex = Array.from(selectedSet.parentNode.children).indexOf(selectedSet);

    let newWord = document.createElement('div');
    newWord.setAttribute("class","cardContainerContent")
    newWord.addEventListener("click", clickSelectionHandler)
    selectedSet.appendChild(newWord);

    const addedWord = prompt("Add words:");

    if (addedWord !== null) {
      const addedWordArray = addedWord.split(" ");

      if (addedWordArray.length === 2) {
            newWord.innerHTML = addedWordArray[0] + " " + addedWordArray[1]
            lists[selectedParentListIndex].push([addedWordArray[0], addedWordArray[1]]);
            console.log(lists);                    
            saveValuesToFile(lists[selectedParentListIndex]);
          } else {
              alert("Błędna składnia - między parą słów powinna być spacja");
          }
      }
  } else {
      alert("Brak zaznaczenia strony");
  }

}

function deleteWord(){
  const selectedSet = document.querySelector(".cardContainer.selected");
  const selectedContainer = document.querySelector(".cardContainerContent.selected2");
  
  
  if (selectedContainer) {
    const selectedParentListIndex = Array.from(selectedSet.parentNode.children).indexOf(selectedSet);
    const selectedListIndex = Array.from(selectedContainer.parentNode.children).indexOf(selectedContainer);
    
    selectedContainer.remove();
    lists[selectedParentListIndex].splice(selectedListIndex,1);

    console.log(lists[selectedParentListIndex]);
    saveValuesToFile(lists[selectedParentListIndex]);
  }

}

function editWord() {
  const selectedSet = document.querySelector(".cardContainer.selected");
  const selectedContainer = document.querySelector(".cardContainerContent.selected2");
  
  
  if (selectedContainer) {
    const selectedParentListIndex = Array.from(selectedSet.parentNode.children).indexOf(selectedSet);
    const selectedListIndex = Array.from(selectedContainer.parentNode.children).indexOf(selectedContainer);

    const editedWord = prompt("Edit the word:", selectedContainer.innerHTML);

    if (editedWord !== null) {
      const editedWordArray = editedWord.split(" ");

      if (editedWordArray.length === 2) {
            lists[selectedParentListIndex][selectedListIndex] = [editedWordArray[0], editedWordArray[1]];
                      
            saveValuesToFile(lists[selectedParentListIndex]);
            
            selectedContainer.innerText = editedWord;
          } else {
              alert("Błędna składnia - między parą słów powinna być spacja");
          }
      }
  } else {
      alert("Brak zaznaczenia strony");
  }
}
