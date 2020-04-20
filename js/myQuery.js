$().ready(function() {

    function showNotification(text, type) {
        const noty = new Noty({
            layout: 'topRight',
            container: '.notifycation',
            timeout: 1000,
            closeWith: ['click'],
            visibilityControl: true,
            type: type,
            text: text,
        }).show();
    }


    $('#form').on('submit', function(e) {
        e.preventDefault();

        $('#list-tasks').append(`<li class="list-group-item d-flex justify-content-between">
        <span class="task-title">${$('#addNewTask').val()/*Не знаю нужно ли тут использовать trim()*/}</span>
        <div>
            <button type="button" data-action="done-task" class="btn btn-light align-self-end">Готово</button>
            <button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button>
        </div>
        </li>`);

        $('#addNewTask').val('').focus();
        toogleEmptyList();

        showNotification('Задача добавлена!', 'warning');
    })

    $('#list-tasks').on('click', function() {

        if ($(event.target).attr('data-action') == 'delete-task') {
            $(event.target).closest('.list-group-item').remove();
            showNotification('Задача удалена!', 'error');

        } else if ($(event.target).attr('data-action') == 'done-task') {
            $(event.target).closest('.list-group-item').addClass('list-group-item-secondary').children('span').addClass('strike');
            event.target.remove();
            showNotification('Задача выполнена!', 'success');
        }
        toogleEmptyList();

    })


    function toogleEmptyList() {
        if ($('#list-tasks').children().length > 1) {
            $('.listEmpty').hide();
        } else if ($('#list-tasks').children().length < 2) {
            $('.listEmpty').show();
        }
    }
})