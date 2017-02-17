/* exported utils */
var utils = (function() {
    function _pluralize(count, word) {
        return count === 1 ? word : word + 's';
    }

    //uuid 생성 출처:http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    function _guid() {
        function s4() {
            return ((1 + Math.random()) * 0x10000 || 0).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    return {
        pluralize: _pluralize,
        guid: _guid
    };
}());
