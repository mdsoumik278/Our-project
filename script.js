// DOM Elements
const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const warningMessage = document.getElementById('warningMessage');
const typedValue = document.getElementById('typedValue');

/**
 * Handle Add Button Click
 */
function handleAddItem() {
    const value = itemInput.value.trim();

    if (value) {
        // Hide warning if it was showing
        warningMessage.style.display = 'none';

        // Show the value in console as requested
        typedValue.textContent = value;

        // Clear the input after adding
        itemInput.value = '';

        // Return focus to input
        itemInput.focus();
    } else {
        // Show warning when input is empty
        warningMessage.style.display = 'block';
    }
}



// Event Listeners
addButton.addEventListener('click', handleAddItem);

// Allow pressing "Enter" key to add item as well (Modern UX)
itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleAddItem();
    }
});
