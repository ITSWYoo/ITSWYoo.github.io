/*  exported model */
var model = (function() {
    "use strict";

    const STORAGE_NAME = "todos-jquery";
    var _todoList;

    function _manageLocalStorage(todo) {
        var store = localStorage.getItem(STORAGE_NAME);
        if (arguments.length > 0) {
            return localStorage.setItem(STORAGE_NAME, JSON.stringify(todo));
        }
        _todoList = (store && JSON.parse(store)) || [];
        return _todoList;
    }

    _todoList = _manageLocalStorage();

    function _create(title, guid, createCallback) {
        var todo;
        title = title || "";
        createCallback = createCallback || function() {};

        todo = {
            id: guid,
            title: title.trim(),
            completed: false
        };

        _todoList.push(todo);
        _manageLocalStorage(_todoList);
        createCallback(todo, _getFooterAll(), getFooterActive());
    }

    function _update(id, updateCallback) {
        id = id || "";
        updateCallback = updateCallback || function() {};

        _todoList.some(function(v) {
            if (v.id === id) {
                v.completed = !v.completed;
                return true;
            }
        });

        _manageLocalStorage(_todoList);
        updateCallback(_getFooterAll(), getFooterActive());
    }

    function _remove(id, removeCallback) {
        id = id || "";
        removeCallback = removeCallback || function() {};

        _todoList.some(function(v, i) {
            if (v.id === id) {
                _todoList.splice(i, 1);
                return true;
            }
        });

        _manageLocalStorage(_todoList);
        removeCallback(_getFooterAll(), getFooterActive());
    }

    function _updateAll(isChecked, updateAllCallback) {
        _todoList.forEach(function(v) {
            v.completed = isChecked;
        });
        _manageLocalStorage(_todoList);
        updateAllCallback(_getFooterAll(), getFooterActive());
    }

    function _clearCompleted(clearCompltedCallback) {
        _todoList = getActiveTodos();
        _manageLocalStorage(_todoList);
        clearCompltedCallback(_todoList.length);
    }

    function _edit(id, title, editCallback) {
        _todoList.some(function(v) {
            if (v.id === id) {
                v.title = title;
                return true;
            }
        });
        _manageLocalStorage(_todoList);
        editCallback(_getFooterAll(), getFooterActive());
    }

    function getActiveTodos() {
        return _todoList.filter(function(todo) {
            return !todo.completed;
        });
    }

    function getCompletedTodos() {
        return _todoList.filter(function(todo) {
            return todo.completed;
        });
    }

    function _getFooterAll() {
        return {
            todoCount: _todoList.length,
            activeTodoCount: getActiveTodos().length,
            activeTodoWord: utils.pluralize(getActiveTodos().length, "item"),
            completedTodoCount: getCompletedTodos().length
        };
    }

    function getFooterActive() {
        var footerHTML, activeTodosCount;
        activeTodosCount = getActiveTodos().length;
        footerHTML = "<strong>" + activeTodosCount + " </strong>";
        footerHTML += utils.pluralize(activeTodosCount, "item") + " left";
        return footerHTML;
    }

    return {
        todoList: _todoList,
        manageLocalStorage: _manageLocalStorage,
        create: _create,
        update: _update,
        updateAll: _updateAll,
        remove: _remove,
        clearCompleted: _clearCompleted,
        edit: _edit,
        getFooterAll: _getFooterAll
    };
}());
