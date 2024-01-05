//utworzenie domyślnego setu słów
let lists = []
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


//sprawdzanie czy localStorage istnieje i na podstawie tego ustawianie wartości w kartach
if(localStorage.getItem("selectedList") !== null){
  lists=JSON.parse(localStorage.getItem("selectedList"))
}else{
  lists = [testList, testList2]
}

//zapisywanie wartości do sessionStorage i localStorage
function saveValuesToFile(selectedList, type) {
  if(type == "session"){
    sessionStorage.setItem("selectedList", JSON.stringify(selectedList));
  }else if(type == "local"){
    localStorage.setItem("selectedList", JSON.stringify(selectedList));
  }
}

//obsługa zaznaczania danej karty
function clickSelectionHandler(e){
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


//na podstawie danych w liście powstają kontenery ze słowami
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

      //dodanie zaznaczonej listy w całości do localStorage i dodanie tylko wbranego kontenera do sessionStorage 
      saveValuesToFile(lists,"local");
      saveValuesToFile(lists[selectedListIndex], "session")
      }
})

//dodanie słów do każdego kontenera
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

//dodawanie słowa do konkretengo kontenera
function addWord(){
  const selectedSet = document.querySelector(".cardContainer.selected");
  
  if (selectedSet) {
    const selectedParentListIndex = Array.from(selectedSet.parentNode.children).indexOf(selectedSet);

    let newWord = document.createElement('div');
    newWord.setAttribute("class","cardContainerContent")
    newWord.addEventListener("click", clickSelectionHandler)
    selectedSet.appendChild(newWord);

    const addedWord = prompt("Add words:");
    //walidacja inputu oraz zapis do storage'ów
    if (addedWord !== null) {
      const addedWordArray = addedWord.split(";");

      if (addedWordArray.length === 2) {
            newWord.innerHTML = addedWordArray[0] + " " + addedWordArray[1]
            lists[selectedParentListIndex].push([addedWordArray[0], addedWordArray[1]]);                  
            saveValuesToFile(lists, "local");
            saveValuesToFile(lists[selectedParentListIndex],"session")
          } else {
              alert("Syntax error - words should be seperated by ;");
          }
      }
  } else {
    alert("No element selected");
  }

}

//usuwanie konktetnego słowa w konkretnym kontenerze
function deleteWord(){
  const selectedSet = document.querySelector(".cardContainer.selected");
  const selectedContainer = document.querySelector(".cardContainerContent.selected2");
  
  
  if (selectedContainer) {
    const selectedParentListIndex = Array.from(selectedSet.parentNode.children).indexOf(selectedSet);
    const selectedListIndex = Array.from(selectedContainer.parentNode.children).indexOf(selectedContainer);
    
    //usuwanie widoczengo kontenera oraz miejsca na tablic
    selectedContainer.remove();
    lists[selectedParentListIndex].splice(selectedListIndex,1);
    saveValuesToFile(lists, "local");
    saveValuesToFile(lists[selectedParentListIndex],"session")
  
  }else{
    alert("No element selected");
  }

}

//edcja konktetnego słowa w konkretnym kontenerze
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
                      
            saveValuesToFile(lists, "local");
            saveValuesToFile(lists[selectedParentListIndex],"session")
            selectedContainer.innerText = editedWord;
          } else {
              alert("Syntax error");
          }
      }
  } else {
      alert("No element selected");
  }
}
