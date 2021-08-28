
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

  button.addEventListener("click", getTabs);
