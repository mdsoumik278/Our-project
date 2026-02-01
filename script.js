document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const bazarList = document.getElementById('bazarList');
    const itemCount = document.getElementById('itemCount');
    const clearAll = document.getElementById('clearAll');

    let items = JSON.parse(localStorage.getItem('bazarItems')) || [];

    function updateStats() {
        const count = items.length;
        itemCount.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;
    }

    function saveItems() {
        localStorage.setItem('bazarItems', JSON.stringify(items));
        updateStats();
    }

    function renderItems() {
        bazarList.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            if (item.completed) li.classList.add('completed');

            li.innerHTML = `
                <div class="checkbox ${item.completed ? 'checked' : ''}" data-index="${index}"></div>
                <span data-index="${index}">${item.text}</span>
                <button class="delete-btn" data-index="${index}">×</button>
            `;

            bazarList.appendChild(li);
        });
        updateStats();
    }

    function addItem() {
        const text = itemInput.value.trim();
        if (text) {
            items.push({ text, completed: false });
            itemInput.value = '';
            saveItems();
            renderItems();
        }
    }

    addButton.addEventListener('click', addItem);

    itemInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addItem();
    });

    bazarList.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (index === undefined) return;

        if (e.target.classList.contains('delete-btn')) {
            items.splice(index, 1);
        } else {
            items[index].completed = !items[index].completed;
        }
        saveItems();
        renderItems();
    });

    clearAll.addEventListener('click', () => {
        if (items.length > 0 && confirm('Clear all items?')) {
            items = [];
            saveItems();
            renderItems();
        }
    });

    renderItems();
});
