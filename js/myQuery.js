$().ready(function() {

    // const noti = new Noty({
    //     layout: 'topRight',
    //     container: '.notifycation',
    //     timeout: 1000,
    //     closeWith: ['click'],
    //     visibilityControl: true,
    // });

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


        // noti.show().setType('warning').setText('Задача добавлена!');

        // Эти обьекты удали
        const noti = new Noty({
            layout: 'topRight',
            container: '.notifycation',
            timeout: 1000,
            closeWith: ['click'],
            visibilityControl: true,
            type: 'warning',
            text: 'Задача добавлена!',
        }).show();
    })

    $('#list-tasks').on('click', function() {

        if ($(event.target).attr('data-action') == 'delete-task') {
            $(event.target).closest('.list-group-item').remove();
            // noti.show().setType('error').setText('Задача удалена!');

            // Эти обьекты удали
            const noti = new Noty({
                layout: 'topRight',
                container: '.notifycation',
                timeout: 1000,
                closeWith: ['click'],
                visibilityControl: true,
                type: 'error',
                text: 'Задача удалена!',
            }).show();

        } else if ($(event.target).attr('data-action') == 'done-task') {
            $(event.target).closest('.list-group-item').addClass('list-group-item-secondary').children('span').addClass('strike');
            event.target.remove();
            // noti.show().setType('success').setText('Задача выполнена!');

            // Эти обьекты удали
            const noti = new Noty({
                layout: 'topRight',
                container: '.notifycation',
                timeout: 1000,
                closeWith: ['click'],
                visibilityControl: true,
                type: 'success',
                text: 'Задача выполнена!',
            }).show();
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