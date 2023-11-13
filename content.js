// content.js
console.log("Content script loaded on the matching page.");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "start") {
    console.log("Start message received!");
    // Your DOM manipulation logic goes here
    let start = request.start;
    let end = request.end;
    let numberOfItem = request.numberOfItem;
    evaluate({ start, end, numberOfItem });
    sendResponse({ message: "done" });
  }
});

// Your DOM manipulation logic goes here

function getRandomNumber(start, end) {
  // Ensure that start and end are valid numbers
  if (typeof start !== "number" || typeof end !== "number") {
    throw new Error("Both start and end must be numbers");
  }

  // Swap start and end if start is greater than end
  if (start > end) {
    [start, end] = [end, start];
  }
  const randomNumber = Math.floor(Math.random() * (end - start + 1)) + start;

  return randomNumber;
}

const evaluate = ({ start, end, numberOfItem }) => {
  let pattern = "RBL${0}_${1}";
  for (let i = 0; i < numberOfItem; i++) {
    let random = getRandomNumber(Math.abs(5 - start), Math.abs(5 - end));
    let updatePattern = pattern.replace("${0}", i).replace("${1}", random);
    try {
      let selectedDOM = document.getElementById(updatePattern);
      selectedDOM.checked = true;
      console.log("Checked: " + updatePattern);
    } catch (e) {}
  }
};
