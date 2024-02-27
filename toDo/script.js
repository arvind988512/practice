const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const gramsRange = document.getElementById("grams");
const kilogramsRange = document.getElementById("kilograms");

function addTask() {
  if (!inputBox.value) return alert("Please enter something");

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

  document.getElementById("grams-count").textContent = `${gramsValue.toFixed(
    1
  )} grams`;
  document.getElementById(
    "kilograms-count"
  ).textContent = `${kilogramsValue.toFixed(1)} kg`;

  const totalGrams = gramsValue + kilogramsValue * 1000;
  const displayText =
    totalGrams >= 1000
      ? `Total Qty: ${(totalGrams / 1000).toFixed(1)} kg`
      : `Total Qty: ${totalGrams} grams`;
  document.getElementById("total-display").textContent = displayText;
}

function getTotalQuantity() {
  const gramsValue = parseInt(gramsRange.value);
  const kilogramsValue = parseFloat(kilogramsRange.value);

  const totalGrams = gramsValue + kilogramsValue * 1000;
  return totalGrams >= 1000
    ? `${(totalGrams / 1000).toFixed(1)} kg`
    : `${totalGrams} grams`;
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

document.addEventListener("DOMContentLoaded", () => {
  const myButton = document.getElementById("myButton");
  const handleKeyDown = (event) =>
    (event.key === "Enter" || event.keyCode === 13) && myButton.click();
  document.addEventListener("keydown", handleKeyDown);

  document
    .getElementById("list-container")
    .addEventListener("click", handleTaskClick);
});

showTask();
refreshEverything();
