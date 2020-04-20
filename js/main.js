const form = document.querySelector('#form'); //Получаем форму
const addNewTask = document.querySelector('#addNewTask'); // Получаем кнопку для добавления задачь
const listTasks = document.querySelector('#list-tasks'); // Получаем ul
const listEmpty = document.querySelector('.listEmpty'); // Получаем "Список пуст"

// Слушаем отправку формы, отменяем стандартное поведение браузера и добавляем задачу
form.addEventListener('submit', function(e) {
    event.preventDefault();
    // Получаем значение из инпута и убираем лишние пробелы
    const taskValue = addNewTask.value.trim();
    // Получаем ul для вставки задач
    const listTasks = document.querySelector('#list-tasks');
    // Шаблон для вставки задачи в HTML
    const taskHTML = `<li class="list-group-item d-flex justify-content-between">
    <span class="task-title">${taskValue}</span>
    <div>
        <button type="button" data-action="done-task" class="btn btn-light align-self-end">Готово</button>
        <button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button>
    </div>
    </li>`;
    // Добавляем в HTML пекред закрывающим тегом
    listTasks.insertAdjacentHTML('beforeend', taskHTML);
    // очищаем список 
    addNewTask.value = '';
    // фокусим его =)
    addNewTask.focus();
    toggleEmptyList();

    showNotifycation('add');

})

// Функция показа сообщения список пуст
function toggleEmptyList() {
    // Если у родителя длина потомков больше 1
    if (listTasks.children.length > 1) {
        // Меняем стили окна "Список пуст" - скрываем его
        listEmpty.style = 'display: none;';
        // Если у родителя дляна потомков меньше 2
    } else if (listTasks.children.length < 2) {
        // Меняем стили окна "Список пуст" - показываем его 
        listEmpty.style = 'display: flex;';
    }

}



listTasks.addEventListener('click', function() {
    // const btnDelete = document.querySelector('.btn-delete');
    if (event.target.getAttribute('data-action') == 'delete-task') {
        const liElement = event.target.closest('.list-group-item');
        liElement.remove();
        toggleEmptyList();

        showNotifycation('del');
    } else if (event.target.getAttribute('data-action') == 'done-task') {
        // Находим родителя
        const liElement = event.target.closest('.list-group-item');
        // Удаляем кнопку Готово
        event.target.remove();
        // Добавляев класс, для li которая меняет цвет
        liElement.classList.add('list-group-item-secondary', 'order-1');
        // Добавляем такой же клас как и родителю, что б изменить цвет
        liElement.querySelector('button').classList.add('list-group-item-secondary');
        // Добавляем класс, перечеркнутый текст
        liElement.querySelector('span').classList.add('strike');

        showNotifycation('done');
    }
})


// Функция показа сообщений о событии
function showNotifycation(status) {
    // Получаем элемент для сообщений
    const notifycation = document.querySelector('#notifycation');
    // Создаем div элемент 
    const divElement = document.createElement('div');

    // Проверяем какой статус был выполнен и выводим сообщение
    switch (status) {
        case 'add':
            // Добавляем сласс
            divElement.classList.add('alert', 'alert-warning');
            // Добавляем текст
            divElement.innerHTML = 'Задача добавлена!'
            break;
        case 'del':
            divElement.classList.add('alert', 'alert-danger');
            divElement.innerHTML = 'Задача удалена!'
            break;
        case 'done':
            divElement.classList.add('alert', 'alert-success');
            divElement.innerHTML = 'Задача выполнена!'
            break;
    }

    // Выводим сообщение сразу перед закрывающим тегом
    notifycation.insertAdjacentElement('beforeend', divElement);

    // функция для плавного скрытия  созданого элемента
    setInterval(function() {
        divElement.style = 'opacity: 0';
    }, 2000)

    // Удаляем созданый элемент
    setInterval(function() {
        divElement.remove();
    }, 3000)

}