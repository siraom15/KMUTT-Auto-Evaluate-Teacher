document.addEventListener("DOMContentLoaded", function () {
  // Your popup script logic goes here
  let computeButton = document.getElementById("compute");
  computeButton.addEventListener("click", function () {
    // get min and max
    let min = parseInt(document.getElementById("min").value);
    let max = parseInt(document.getElementById("max").value);
    let numberOfItem = parseInt(document.getElementById("numberOfItem").value);
    // send message to content.js
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { message: "start", start: min, end: max, numberOfItem: numberOfItem },
        function (response) {}
      );
    });
  });
});
