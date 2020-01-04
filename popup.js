chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    message.innerText = request.source;
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "main.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
        if (chrome.runtime.lastError.message.indexOf("Extension manifest must request permission to access this host.") != -1) {
            message.innerText = 'Not a Facebook page';
        } else {
            message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
    }
  });

}

window.onload = onWindowLoad;
