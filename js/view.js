/*  exported view */
var view = (function() {
    "use strict";
    var $newTodo = $("#new-todo"),
        $todoList = $("#todo-list"),
        $main = $("#main"),
        $footer = $("#footer"),
        $toggleAll = $("#toggle-all"),
        $clearCompleted,
        $li,
        $todoCount,
        $inputEdit,
        appendHandler,
        completeHandler,
        toggleAllHandler,
        removeHandler,
        clearCompletedHandler,
        editHandler,
        todoTemplate = Handlebars.compile($('#todo-template').html()),
        footerTemplate = Handlebars.compile($('#footer-template').html());

    const ENTER_KEY = 13,
        ESC_KEY = 27;

    function _bindEvents(event, handler) {
        switch (event) {
        case "addTodo":
            appendHandler = handler;
            $newTodo.on("keydown", onKeyDownNewTodo);
            break;
        case "completeTodo":
            completeHandler = handler;
            $todoList.on("change", ".toggle", onChangeToggle);
            break;
        case "toggleAll":
            toggleAllHandler = handler;
            $toggleAll.on("change", onChangeToggleAll);
            break;
        case "removeTodo":
            removeHandler = handler;
            $todoList.on("click", ".destroy", onClickDestory);
            break;
        case "clearCompleted":
            clearCompletedHandler = handler;
            $footer.on("click", "#clear-completed", onClickClearCompleted);
            break;
        case "edit":
            editHandler = handler;
            $todoList.on("dblclick", "label", onDblClickLabel)
                .on("keydown", ".edit", onKeyDownEdit)
                .on("blur", ".edit", onBlurEdit);
        }
    }

    function _renderTodoList(todoList) {
        if (todoList.length > 0) {
            $todoList.html(todoTemplate(todoList));
            toggleContent(true);
        }
    }

    function _appendTodo(todo) {
        $todoList.append(todoTemplate(todo));
        $newTodo.val("");
    }

    function _completeTodo(target) {
        target.toggleClass("completed");
    }

    function _renderFooter(footerAll) {
        if (footerAll.todoCount <= 0) {
            return;
        }
        $footer.html(footerTemplate(footerAll));
        $clearCompleted = $("#clear-completed");
        $todoCount = $("#todo-count");
        toggleClearCompleted(footerAll.completedTodoCount);
        toggleContent(true);
        _changeToggleAll(footerAll.activeTodoCount);
    }

    function _changeFooter(footerAll, activeTodoCount) {
        if (footerAll.todoCount > 0) {
            toggleClearCompleted(footerAll.completedTodoCount);
            $todoCount.html(activeTodoCount);
        }
        toggleContent(footerAll.todoCount);
    }

    function _toggleAll(isChecked, todoLi) {
        if (isChecked === undefined) {
            return;
        }
        todoLi.each(function(i, v) {
            $(v).toggleClass("completed", isChecked)
                .find(".toggle")
                .prop("checked", isChecked);
        });
    }

    function _changeToggleAll(activeTodoCount) {
        $toggleAll.prop("checked", activeTodoCount === 0);
    }

    function _detachTodo(todo) {
        todo.detach();
    }

    function _clearCompletedTodo(todoCount, clearTodoList) {
        _detachTodo(clearTodoList);
        toggleClearCompleted(false);
        if (!todoCount) {
            toggleContent(false);
        }
    }

    function toggleClearCompleted(completedTodoCount) {
        if (completedTodoCount === undefined) {
            return;
        }
        $clearCompleted.toggleClass("hide", !completedTodoCount);
    }

    function _editTodo(title, target) {
        var $label = target.find("label");
        if (target.data("cancel")) {
            target.data("cancel", false);
            $inputEdit.val($label.html());
        } else {
            $label.html(title);
        }
        target.removeClass("editing");
    }

    function toggleContent(visible) {
        if (visible === undefined) {
            return;
        }
        $main.toggleClass("hide", !visible);
        $footer.toggleClass("hide", !visible);
    }

    function onKeyDownNewTodo(e) {
        if (e.keyCode === ENTER_KEY) {
            appendHandler($newTodo.val());
        }
    }

    function onChangeToggle() {
        $li = $(this).closest("li");
        completeHandler($li.data("id"), $li);
    }

    function onChangeToggleAll() {
        toggleAllHandler($(this).prop("checked"), $todoList.find("li"));
    }

    function onClickDestory() {
        $li = $(this).closest("li");
        removeHandler($li.data("id"), $li);
    }

    function onClickClearCompleted() {
        clearCompletedHandler($(".completed"));
    }

    function onDblClickLabel() {
        $li = $(this).closest("li")
                     .addClass("editing");
        $inputEdit = $li.find(".edit")
                        .focus();
    }

    function onKeyDownEdit(e) {
        if (e.keyCode === ENTER_KEY) {
            $(this).blur();
        } else if (e.keyCode === ESC_KEY) {
            $li.data("cancel", true);
            $(this).blur();
        }
    }

    function onBlurEdit() {
        editHandler($li.data("id"), $inputEdit.val(), $li, $li.data("cancel"));
    }

    return {
        bindEvents: _bindEvents,
        renderTodoList: _renderTodoList,
        appendTodo: _appendTodo,
        completeTodo: _completeTodo,
        renderFooter: _renderFooter,
        changeFooter: _changeFooter,
        toggleAll: _toggleAll,
        changeToggleAll: _changeToggleAll,
        detachTodo: _detachTodo,
        clearCompletedTodo: _clearCompletedTodo,
        editTodo: _editTodo
    };
}());
