
// default
chrome.runtime.onInstalled.addListener(() => {
  // opens a tab with information
  chrome.tabs.create({url:'\options.html'},function(){})
});




function logTabsForWindows(windowInfoArray) { //windowInfoArray is the array of window objects 
  document.getElementById('url').innerHTML = windowInfoArray[0].tabs[0].url;
  
  // for (windowInfo of windowInfoArray) { //windowInfo = window objects
  //   console.log(`Window: ${windowInfo.id}`);
  //   console.log(windowInfo.tabs.map(tab => tab.url));
  // }
}
function onError(error) {
  console.log(`Error: ${error}`);
}

function getTabs(){
  let getting = chrome.windows.getAll({
    populate: true,
    windowTypes: ["normal"]
  });
  getting.then(logTabsForWindows, onError);
}


let button = document.getElementById('saveTabs');


inputName = null
button.addEventListener('click', function(){
  getTabs();  
  const inputbox = document.getElementById('create-name');
    if (inputbox.style.display == "none") {
      inputbox.style.display = "block";
  } else {
      inputbox.style.display = "none";
  }

})
let submitbutton = document.getElementById('submit');
submitbutton.addEventListener('click', function(){
    let input = document.getElementById("current").value;
    alert(input)
    inputName = input;
    addToList()
})


function addToList(){


    var list = document.getElementById('workspace-list');
    var entry = document.createElement("ul");
    var tempurl = document.getElementById('url');
    entry.appendChild(document.createTextNode(inputName));
    list.appendChild(entry);
    tempurl.appendChild(document.createTextNode(inputName));
    list.appendChild(entry);
    
    document.getElementById('workspace-list').innerHTML += '<ul>' +list+'<ul>';

    alert("test")
}


