const addButton = document.getElementById("add-button");
const newItemInput = document.getElementById("new-item");
const todoList = document.getElementById("todo-list");
const itemTemplate = document.getElementById("item-template");

let items = [];

// Load existing items from localStorage
function loadItems() {
    const savedItems = localStorage.getItem("todo-items");
    items = savedItems ? JSON.parse(savedItems) : [];
    refreshList();
}

// Save items to localStorage
function saveItems() {
    localStorage.setItem("todo-items", JSON.stringify(items));
}

// Add a new item
function addItem() {
    const description = newItemInput.value.trim();
    if (description) {
        items.push({ description });
        saveItems();
        refreshList();
        newItemInput.value = "";
    }
}
//
// Update an item
function updateItem(index, newDescription) {
    items[index].description = newDescription;
    saveItems();
}

// Delete an item
function deleteItem(index) {
    items.splice(index, 1);
    saveItems();
    refreshList();
}

// Refresh the list
function refreshList() {
    todoList.innerHTML = "";
    items.forEach((item, index) => {
        const itemElement = itemTemplate.content.cloneNode(true);
        const descriptionInput = itemElement.querySelector(".item-description");
        const updateButton = itemElement.querySelector(".update-btn");
        const deleteButton = itemElement.querySelector(".delete-btn");

        descriptionInput.value = item.description;

        // Update button click
        updateButton.addEventListener("click", () => {
            const newDescription = descriptionInput.value.trim();
            if (newDescription) {
                updateItem(index, newDescription);
                refreshList();
            }
        });

        // Delete button click
        deleteButton.addEventListener("click", () => deleteItem(index));

        todoList.appendChild(itemElement);
    });
}

addButton.addEventListener("click", addItem);
document.addEventListener("DOMContentLoaded", loadItems);
