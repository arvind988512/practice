const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const gramsRange = document.getElementById("grams");
const kilogramsRange = document.getElementById("kilograms");
const myButton = document.getElementById("myButton");

function addTask() {
  console.log("addTask");
  if (!inputBox.value.trim()) {
    alert("Please enter something");
    return;
  }

  const li = document.createElement("li");
  li.textContent = `${inputBox.value} - ${getTotalQuantity()}`;
  li.innerHTML += "<span>\u00d7</span>";
  listContainer.appendChild(li);

  inputBox.value = "";
  saveData();
}

function handleTaskClick(event) {
  const clickedElement = event.target;
  const parentLi = clickedElement.closest("li");

  if (parentLi) {
    if (clickedElement.tagName === "LI") parentLi.classList.toggle("checked");
    else if (clickedElement.tagName === "SPAN") parentLi.remove();

    saveData();
  }
}

function updateQuantity() {
  const gramsValue = parseInt(gramsRange.value);
  const kilogramsValue = parseFloat(kilogramsRange.value);

  document.getElementById("grams-count").textContent = `${gramsValue} gms`;
  document.getElementById(
    "kilograms-count"
  ).textContent = `${kilogramsValue.toFixed(1)} kg`;

  const totalGrams = gramsValue + kilogramsValue * 1000;
  const displayText =
    totalGrams >= 1000
      ? `Total Qty: ${(totalGrams / 1000).toFixed(2)} kg`
      : `Total Qty: ${totalGrams} gms`;
  document.getElementById("total-display").textContent = displayText;
}

function getTotalQuantity() {
  const gramsValue = parseInt(gramsRange.value);
  const kilogramsValue = parseFloat(kilogramsRange.value);

  const totalGrams = gramsValue + kilogramsValue * 1000;
  return totalGrams >= 1000
    ? `${(totalGrams / 1000).toFixed(1)} kg`
    : `${totalGrams} gms`;
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

function clearTasks() {
  listContainer.innerHTML = "";
  saveData();
}

function handleKeyDown(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    event.preventDefault();
    myButton.click();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", handleKeyDown);
  listContainer.addEventListener("click", handleTaskClick);
});

function handleKeyDown(event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    event.preventDefault();
    addTask();
  }
}

showTask();
