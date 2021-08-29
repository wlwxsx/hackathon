
function windowClear() {
  window.localStorage.clear();
  window.localStorage.removeItem(1);
  window.localStorage.removeItem("title");
}

//button to clear local storage and close extension
let clearAllButton = document.getElementById('clearAll');
clearAllButton.addEventListener('click', function () {
  windowClear();
  window.close();
})

if ("title" in localStorage) {
  for (let i = 0; i < JSON.parse(window.localStorage.getItem("title")).length; i++) {
    addToList(i);
  }
}

let button = document.getElementById('saveTabs');
let windowsData;
//an array containing an object of all the tab titles and their corresponding urls  
let allWindowsTabs = [];

//windowInfoArray is the array of window objects 
function logTabsForWindows(windowInfo) {
  if (window.localStorage.getItem(1) === null) {
    allWindowsTabs.push(windowInfo);
  }
  else if (allWindowsTabs.length === 0) {
    allWindowsTabs = JSON.parse(window.localStorage.getItem(1));
    allWindowsTabs.push(windowInfo);
  }
  else {
    allWindowsTabs.push(windowInfo);
  }

  //one key value pair but all the things are stored in the value
  window.localStorage.setItem(1, JSON.stringify(allWindowsTabs));
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

button.addEventListener('click', function () {
  getTabs();
  const inputbox = document.getElementById('create-name');

  if (inputbox.style.display == "none") {
    inputbox.style.display = "block";
  } else {
    inputbox.style.display = "none";
  }
})

//----------------------------------------------------------------------
let submitbutton = document.getElementById('submit');
let inputName = [];

submitbutton.addEventListener('click', function () {
  let input = document.getElementById("current").value;

  if (window.localStorage.getItem("title") === null) {
    inputName = [input];
  }
  else if (inputName.length === 0) {
    inputName = JSON.parse(window.localStorage.getItem("title"));
    inputName.push(input);
  }
  else {
    inputName.push(input);
  }

  window.localStorage.setItem("title", JSON.stringify(inputName));

  addToList(JSON.parse(window.localStorage.getItem("title")).length - 1);
})
//----------------------------------------------------------------------

function addToList(x) {
  var list1 = document.getElementById('workspace-list');
  var workspaceName = JSON.parse(window.localStorage.getItem("title"))[x]
  var workspace = workspaceName + "1";
  var urlList = workspaceName + "2";

  document.getElementById('workspace-list').innerHTML += '<li id =' + workspace + '><a href="#">' + workspaceName + '</a></li>'; //works!
  document.getElementById(workspace).innerHTML += '<ul id = ' + urlList + '>' + '</ul>';

  let window1tabs = JSON.parse(window.localStorage.getItem(1))[x].tabs;

  for (let i = 0; i < window1tabs.length; i++) {
    document.getElementById(urlList).innerHTML += '<li><a href="' + window1tabs[i].url + '" target = "_blank">' + window1tabs[i].title + '</a></li>';
  }
}