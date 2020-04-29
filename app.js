// Select the Elements
// Select the Elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// Class Names
const check = 'fa-check-circle';
const uncheck = 'fa-circle-thin';
const line = 'line-thro';

// Variables
let record, id;

// Get item from local storage
let data = localStorage.getItem('TODO');

// Check whether data is empty or not
if (data) {
    record = JSON.parse(data);
    id = record.legth;
    loadList(record);
} else {
    record = [];
    id = 0;
}

// Load items to the UI
function loadList(array) {
    array.forEach(function(current) {
        addToDo(current.name, current.id, current.done, current.trash)
    });
}

// Clear the local storage
clear.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
})

// Add item to local storage
//localStorage.setItem('TODO', JSON.stringify(record));

// Display the Date
const today = new Date();
const options = {weekday: 'long', month: 'short', day: 'numeric'};

dateElement.innerHTML = today.toLocaleDateString('en-US', options);

// Add to do 
function addToDo(toDo, id, done, trash) {
    if (trash) { return; } 
    const isDone = done ? check : uncheck;
    const lineThrough = done? line: '';
    const position = 'beforeend';
    const item = `<li class="item">
                    <i class="fa ${isDone} check" job="complete" aria-hidden="true" id="${id}"></i>
                    <p class="text ${lineThrough}">${toDo}</p>
                    <i class="fa fa-trash-o garbage" job="delete" aria-hidden="true" id="${id}"></i>
                  </li>`;
    list.insertAdjacentHTML(position, item);
}

// Add an item to the list when the enter key is pressed
document.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        const itemName = input.value;
        // If the input isn't empty
        if (itemName) {
            addToDo(itemName, id, false, false);
            record.push({
                name: itemName,
                id: id,
                done: false,
                trash: false
            });

            // Add item to local storage
            localStorage.setItem('TODO', JSON.stringify(record));

            id ++;
        }
        input.value = '';
    }
})

// Complete a to do item
function completeToDo(element) {
    element.classList.toggle(uncheck);
    element.classList.toggle(check);
    element.parentNode.querySelector('.text').classList.toggle(line);

    record[element.id].done = record[element.id].done ? false : true;
}

// Remove a to do item
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    record[element.id].trash = true;
}

//  Target the items created dynamically
list.addEventListener('click', function() {
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if (elementJob === 'complete') {
        completeToDo(element);
    } else if (elementJob === 'delete') {
        removeToDo(element);
    }

    // Add item to local storage
    localStorage.setItem('TODO', JSON.stringify(record));
});





