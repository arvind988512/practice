const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const gramsRange = document.getElementById("grams");
const kilogramsRange = document.getElementById("kilograms");

function addTask() {
  if (inputBox.value === "") {
    alert("Please enter something");
  } else {
    const li = document.createElement("li");
    const span = document.createElement("span");

    li.textContent = `${inputBox.value} - ${getTotalQuantity()}`;
    span.innerHTML = "\u00d7";

    li.appendChild(span);
    listContainer.appendChild(li);
  }

  inputBox.value = "";
  saveData();
}

function handleTaskClick(event) {
  const clickedElement = event.target;

  if (clickedElement.tagName === "LI") {
    clickedElement.classList.toggle("checked");
  } else if (clickedElement.tagName === "SPAN") {
    const parentLi = clickedElement.closest("li");
    if (parentLi) {
      parentLi.remove();
    }
  }

  saveData();
}

function updateQuantity() {
  const gramsValue = parseInt(gramsRange.value);
  const kilogramsValue = parseFloat(kilogramsRange.value);

  document.getElementById("grams-count").textContent = `${gramsValue} grams`;
  document.getElementById("kilograms-count").textContent = `${kilogramsValue.toFixed(1)} kg`;

  const totalGrams = gramsValue + kilogramsValue * 1000;

  let displayText;

  if (totalGrams >= 1000) {
    const totalKilograms = totalGrams / 1000;
    displayText = `Total Qty: ${totalKilograms.toFixed(1)} kg`;
  } else {
    displayText = `Total Qty: ${totalGrams} grams`;
  }

  document.getElementById("total-display").textContent = displayText;
}

function getTotalQuantity() {
  const gramsValue = parseInt(gramsRange.value);
  const kilogramsValue = parseFloat(kilogramsRange.value);

  const totalGrams = gramsValue + kilogramsValue * 1000;

  if (totalGrams >= 1000) {
    const totalKilograms = totalGrams / 1000;
    return `${totalKilograms.toFixed(1)} kg`;
  } else {
    return `${totalGrams} grams`;
  }
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

function clearTasks() {
  listContainer.innerHTML = "";
}

function refreshEverything() {
  clearTasks();
  showTask();
}

document.addEventListener("DOMContentLoaded", function () {
  var myButton = document.getElementById("myButton");
  function handleKeyDown(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
      myButton.click();
    }
  }
  document.addEventListener("keydown", handleKeyDown);

  document.getElementById("list-container").addEventListener("click", function(event) {
    handleTaskClick(event);
  });
});

showTask();
refreshEverything();
