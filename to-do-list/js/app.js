// Select the Elements
const clear = document.getElementById('clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');
const plus = document.getElementById('add');

// Date
const now = new Date();
const options = {weekday : "long", month : "short", day : "numeric"}; 
dateElement.innerHTML = now.toLocaleDateString('en-US', options);

// Variables
let id = 0;
let record = [];

if (localStorage.getItem('TODO') != null) {
    console.log(localStorage.getItem('TODO'));
    record = JSON.parse(localStorage.getItem('TODO'));
}

// Display the List Items on the UI
function loadList() {
    for (let key in record) {
        const check = record[key].check;
        const itemName = record[key].name;
        let item;
        // Condition for whether the checkbox should be ticked or crossed
        if (check) {
            item =  `<li class="list-group-item d-flex justify-content-between">
                        <div class="d-flex flex-column">
                            <span class="text">${itemName}</span>
                        </div>
                        <div>
                            <button class="btn btn-outline-info btn-sm" id="${id}" job="complete">
                                <i class="fas fa-times" id="${id}"></i>
                            </button>
                            <button type="button" class="btn btn-outline-danger btn-sm mx-2" id="${id}" job="delete">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </li>`;
        } else {
            item = `<li class="list-group-item d-flex justify-content-between">
                        <div class="d-flex flex-column">
                            <span class="text">${itemName}</span>
                        </div>
                        <div>
                            <button class="btn btn-outline-info btn-sm" id="${id}" job="complete">
                                <i class="fas fa-check" id="${id}"></i>
                            </button>
                            <button type="button" class="btn btn-outline-danger btn-sm mx-2" id="${id}" job="delete">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </li>`;
        }
        list.insertAdjacentHTML('beforeend', item);
    }
}
loadList();

// Add a New List Item
document.addEventListener('keyup', function(event) {
    let itemName, item, id;
    if (event.keyCode === 13) {
        // Only if the input is not empty
        if (input.value) {
            itemName = input.value;
            if (record.length > 0) {
                id = record.length;
            } else {
                id = 0;
            }
            item = `<li class="list-group-item d-flex justify-content-between">
                        <div class="d-flex flex-column">
                            <span class="text">${itemName}</span>
                        </div>
                        <div>
                            <button class="btn btn-outline-info btn-sm" id="${id}" job="complete">
                                <i class="fas fa-check" id="${id}"></i>
                            </button>
                            <button type="button" class="btn btn-outline-danger btn-sm mx-2" id="${id}" job="delete">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </li>`;
            list.insertAdjacentHTML('beforeend', item);
            record.push({name: itemName, id: id, done: false, trash: false});
            localStorage.setItem('TODO', JSON.stringify(record));
            //console.log(record);
            id++;
        }
        // Clear the input value
        input.value = '';
    }
});

plus.addEventListener('click', function(event) {
    let itemName, item, id;
        // Only if the input is not empty
        if (input.value) {
            itemName = input.value;
            if (record.length > 0) {
                id = record.length;
            } else {
                id = 0;
            }
            item = `<li class="list-group-item d-flex justify-content-between">
                        <div class="d-flex flex-column">
                            <span class="text">${itemName}</span>
                        </div>
                        <div>
                            <button class="btn btn-outline-info btn-sm" id="${id}" job="complete">
                                <i class="fas fa-check" id="${id}"></i>
                            </button>
                            <button type="button" class="btn btn-outline-danger btn-sm mx-2" id="${id}" job="delete">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </li>`;
            list.insertAdjacentHTML('beforeend', item);
            record.push({name: itemName, id: id, done: false, trash: false});
            localStorage.setItem('TODO', JSON.stringify(record));
            //console.log(record);
            id++;
        }
        // Clear the input value
        input.value = '';
});

// What Happens When the Checkbox or Trash Button are Clicked
list.addEventListener('click', function(event) {
    const element = event.target;
    const children = element.childNodes;
    if (children[1].classList.contains('fa-check')) {
        element.parentNode.parentNode.querySelector('span.text').style.textDecoration = 'line-through';
        children[1].classList.toggle('fa-check');
        children[1].classList.toggle('fa-times');
        for (let key in record) {
            if (record[key].id == element.id) {
                record[key].done = true;
                //console.log(record);
            }
        }
    } else if (children[1].classList.contains('fa-times')) {
        element.parentNode.parentNode.querySelector('span.text').style.textDecoration = 'none';
        children[1].classList.toggle('fa-times');
        children[1].classList.toggle('fa-check');
        for (let key in record) {
            if (record[key].id == element.id) {
                record[key].done = false;
                //console.log(record);
            }
        }
    } else if (children[1].classList.contains('fa-trash-alt')) {
        element.parentNode.parentNode.remove(element.parentNode);
        for (let key in record) {
            if (record[key].id == element.id) {
                record[key].trash = true;
                record.splice(key, 1);
            }
        }
        //console.log(record);
        for (let key in record) {
            record[key].id = key;
        }
        //console.log(record);
    }
    localStorage.removeItem('TODO');
    localStorage.setItem('TODO', JSON.stringify(record));
});

// Clear the Local Storage
clear.addEventListener('click', function() {
    localStorage.removeItem('TODO');
    location.reload();
});





