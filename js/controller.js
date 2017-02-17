/*  exported controller */
var controller = (function() {
    "use strict";

    function _init() {
        Handlebars.registerHelper('eq', function(a, b, options) {
            return a === b ? options.fn(this) : options.inverse(this);
        });

        view.renderTodoList(model.todoList);
        view.renderFooter(model.getFooterAll());
        view.bindEvents("addTodo", pushTodo);
        view.bindEvents("completeTodo", completeTodo);
        view.bindEvents("toggleAll", toggleAll);
        view.bindEvents("removeTodo", removeTodo);
        view.bindEvents("clearCompleted", clearCompletedTodo);
        view.bindEvents("edit", editTodo);
    }

    function pushTodo(title) {
        if (title.trim() === "") {
            return;
        }
        model.create(title, utils.guid(), function(todo, footerAll, footerActive) {
            view.appendTodo(todo);
            if (footerAll.todoCount > 1) {
                view.changeFooter(footerAll, footerActive);
            } else {
                view.renderFooter(footerAll);
            }
        });
    }

    function completeTodo(id, target) {
        model.update(id, function(footerAll, footerActive) {
            view.completeTodo(target);
            view.changeFooter(footerAll, footerActive);
            view.changeToggleAll(footerAll.activeTodoCount);
        });
    }

    function toggleAll(isChecked, target) {
        model.updateAll(isChecked, function(footerAll, footerActive) {
            view.toggleAll(isChecked, target);
            view.changeFooter(footerAll, footerActive);
        });
    }

    function removeTodo(id, target) {
        model.remove(id, function(footerAll, footerActive) {
            view.detachTodo(target);
            view.changeFooter(footerAll, footerActive);
        });
    }

    function clearCompletedTodo(target) {
        model.clearCompleted(function(todoListLength) {
            view.clearCompletedTodo(todoListLength, target);
        });
    }

    function editTodo(id, title, target, isCanceled) {
        if (title.trim() === "") {
            model.remove(id, function(footerAll, footerActive) {
                view.detachTodo(target);
                view.changeFooter(footerAll, footerActive);
            });
        } else if (isCanceled) {
            view.editTodo(title, target);
        } else {
            model.edit(id, title, function() {
                view.editTodo(title, target);
            });
        }
    }

    return {
        init: _init
    };
}());
