const form = document.forms['addTask'],
    inputTast = form.elements['task'],
    listTasks = document.getElementById('list-tasks'),
    clearButton = form.elements['clear'];

const tasks = JSON.parse(localStorage.getItem('key')) || [];

function localStorageSave() {
    localStorage.setItem('key', JSON.stringify(tasks));
}

function generationId() {
    return `id${Math.floor(Math.random() * 1e8).toString()}`
}

function createList(task) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center';
    li.id = 'list-tasks';
    li.insertAdjacentHTML('afterbegin', `<p class="text-left align-items-center paragraph-task" data-id=${task.id}>${task.text}
    </p>
    <div class="ml-auto d-flex">
    <i class="fas fa-edit edit-item"></i>
    <i class="fas fa-check succsess-item ml-3"></i>
    <i class="fas fa-trash-alt delete-item ml-3"></i>
    </div>`);

    return li;
}

function renderList() {
    listTasks.textContent = '';
    for (let i = 0; i < tasks.length; i++) {
        listTasks.insertAdjacentElement('beforeend', createList(tasks[i]));
    }
    showAndHideEmptyList();
    clearButton.addEventListener('click', clearTasks);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!inputTast.value) {
        inputTast.classList.add('is-invalid');
        inputTast.addEventListener('keydown', invalideInput);
    } else {
        inputTast.removeEventListener('keydown', invalideInput);
        tasks.push({
            id: generationId(),
            text: inputTast.value
        });

        localStorageSave();
        renderList();
    }
    form.reset();
});

function invalideInput() {
    inputTast.classList.remove('is-invalid');
}

function editTask(e) {
    let target = event.target;
    let editParagraph = target.closest('li').querySelector('p');
    editParagraph.setAttribute('contenteditable', 'true');
    editParagraph.style = 'border-bottom: 1px solid #9ec6f1';
    editParagraph.focus();
}

function saveTask(id, valueTask) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].text = valueTask;
            break;
        }
    }

    localStorageSave();
}

function deleteTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks.splice(i, 1);
            break;
        }
    }

    localStorageSave();
}

listTasks.addEventListener('click', function() {
    let target = event.target;
    if (target.closest('.delete-item')) {
        let parent = target.closest('.list-group-item').querySelector('p');
        let id = parent.dataset.id;
        deleteTask(id);
        target.closest('.list-group-item').remove();
        showAndHideEmptyList();
    } else if (target.closest('.succsess-item')) {
        succsessTask();
    } else if (target.closest('.edit-item')) {
        target.closest('.edit-item').className = 'fas fa-save save-item';
        editTask();
    } else if (target.closest('.save-item')) {
        let editParagraph = target.closest('li').querySelector('p');
        editParagraph.setAttribute('contenteditable', 'false');
        target.closest('.save-item').className = 'fas fa-edit edit-item';
        editParagraph.style = '';
        let id = editParagraph.dataset.id;
        let valueTask = editParagraph.textContent;
        saveTask(id, valueTask);
    }
});

function clearTasks() {
    tasks.splice(0, tasks.length);
    renderList();
    showAndHideEmptyList();
    localStorage.removeItem('key');
    clearButton.removeEventListener('click', clearTasks);
}


function succsessTask(e) {
    let target = event.target;
    target.closest('.list-group-item').classList.add('list-group-item-secondary');
    target.closest('.list-group-item').firstChild.classList.add('.strike');
    target.closest('.succsess-item').remove();
    localStorageSave();
}


function createEmptyList() {
    let liEmpty = document.createElement('li');
    liEmpty.className = 'list-group-item d-flex align-items-center justify-content-center flex-column clear-list bm-3';
    liEmpty.insertAdjacentHTML('afterbegin', `<div>
    <img src="img/empty-list.svg" alt="Списов пуст" width="64">
    </div>
    <p class="text-center font-weight-normal clear-list_paragraph">
        Список пуст
    </p>`);

    return liEmpty;

}

function showAndHideEmptyList() {
    if (listTasks.children.length <= 0) {
        listTasks.insertAdjacentElement('afterbegin', createEmptyList());
    }
}

renderList();