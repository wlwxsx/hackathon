
// default
  // chrome.runtime.onInstalled.addListener(() => {
  //   // opens a tab with information
  //   chrome.tabs.create({url:'\options.html'},function(){})
  // });
function windowClear() {
  window.localStorage.clear();
  window.localStorage.removeItem(1);
  window.localStorage.removeItem("title");
}
//windowClear();
    
//button to clear ? mb works???
let clearAllButton = document.getElementById('clearAll');
clearAllButton.addEventListener('click', function(){
  windowClear();
})


if ("title" in localStorage) {
    alert("length of local storage 'title': " + JSON.parse(window.localStorage.getItem("title")).length);
    for (let i = 0; i < JSON.parse(window.localStorage.getItem("title")).length; i++){
      addToList(i);
      alert("for loop repetitions:" + i);
    }
} 


let button = document.getElementById('saveTabs');
  //button.addEventListener("click", getTabs);
  
let windowsData;
let allWindowsTabs = [];
  //an array containing an object of all the tab titles and their corresponding urls  

function logTabsForWindows(windowInfo) { //windowInfoArray is the array of window objects 
  
    if (window.localStorage.getItem(1) === null){
      alert("if1");
      allWindowsTabs.push(windowInfo);      
    }
    else if (allWindowsTabs.length === 0){
      alert("if2");
      allWindowsTabs = JSON.parse(window.localStorage.getItem(1));
      alert(allWindowsTabs);

      allWindowsTabs.push(windowInfo);
      alert(allWindowsTabs);
    }
    else{
      alert("if3");
      allWindowsTabs.push(windowInfo);
      
    }

    window.localStorage.setItem(1, JSON.stringify(allWindowsTabs)); //one key value pair but all the things are stored in the value
}

function onError(error) {
  alert(`Error: ${error}`);
}

function getTabs() {
  let getting = chrome.windows.getCurrent({
    populate: true,
    windowTypes: ["normal"]
  });
  getting.then(logTabsForWindows, onError);
}



  

  // inputName = null
button.addEventListener('click', function(){
    const inputbox = document.getElementById('create-name');
      if (inputbox.style.display == "none") {
        inputbox.style.display = "block";
    } else {
        inputbox.style.display = "none";
    }
})

 
  //----------------------------------------------------------------------
let submitbutton = document.getElementById('submit');
let inputName=[];

submitbutton.addEventListener('click', function(){
    getTabs();  
    let input = document.getElementById("current").value;
      
    if (window.localStorage.getItem("title") === null){
      // alert("if1");
        inputName = [input];
        
    }
    else if (inputName.length === 0){
      // alert("if2");
        
      inputName = JSON.parse(window.localStorage.getItem("title"));
        // alert(inputName);
        // alert(typeof(inputName));
        
      inputName.push(input);
        // alert(inputName);
    }        
    else{
        // alert("if3");
        // alert(inputName);
      inputName.push(input);
    }

    window.localStorage.setItem("title", JSON.stringify(inputName));
      //window.localStorage.setItem("title", inputName);

    addToList(JSON.parse(window.localStorage.getItem("title")).length-1);
      //addToList(window.localStorage.getItem("title").length-1);

 })
  //----------------------------------------------------------------------

function addToList(x){
    

    var list1 = document.getElementById('workspace-list');
    // var entry = document.createElement("li");
    // entry.appendChild(document.createTextNode(inputName));
    // list1.appendChild(entry);
    var workspaceName = JSON.parse(window.localStorage.getItem("title"))[x]
    var workspace = workspaceName+ "1";
    var urlList = workspaceName +"2";
    document.getElementById('workspace-list').innerHTML += '<li id ='+ workspace +'><a href="#">'+workspaceName+'</a></li>'; //works!
    document.getElementById(workspace).innerHTML += '<ul id = '+ urlList +'>' +'</ul>';


    
    let window1tabs = JSON.parse(window.localStorage.getItem(1))[x].tabs;
    


    for (let i = 0; i < window1tabs.length; i++){
      document.getElementById(urlList).innerHTML += '<li><a href="'+ window1tabs[i].url +'" target = "_blank">' + window1tabs[i].title +'</a></li>';
    }

}
 
  
  
  
  
  