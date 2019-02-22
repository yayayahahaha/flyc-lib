/*
    string
    number
    boolean
    object
    function
    array
    undefined

    null

    Date
    RegExp
    Error
*/

var typeList = ['string',
        'number',
        'boolean',
        'function',
        'undefined',
        'null',
        'object',
        'array'
    ];

// 傳入的參數可接受多種type
function multipleTypeMap(value, types) {
    if (!(types instanceof Array)) {
        console.log('第二個參數types 僅可接受陣列格式');
        return;
    }

    var status = 0,
        message = '',
        showType = typeofValue(value),
        match = types.reduce(function(resultsArray, type) {
        resultsArray.push(singleTypeMap(value, type))
        return resultsArray;
    }, []).reduce(function(match, result) {
        return match || !!result.status;
    }, false);

    status = match ? 1 : 0;
    message = match ? 'success' : '格式錯誤，希望的格式是 ' + types.join(', ') + ', 傳進來的是: ' + showType;
    return {
        status: status,
        message: message,
        meta: {
            value: value,
            types: types
        }
    };
}

// 傳入的參數僅可接受一種type
function singleTypeMap(value, type) {
    var showType = '',
        errorMessage = '';
    if (typeof type !== 'string') {
        return {
            status: 0,
            message: 'type 僅能接受字串格式: ' + typeof type,
            meta: {}
        };
    }
    switch (type) {
        case 'string':
        case 'number':
        case 'boolean':
        case 'function':
        case 'undefined':
            if (typeof value !== type) {
                // 錯誤訊息
                showType = typeof value;

                if (showType === 'object') {
                    showType = !value
                        ? 'null'
                        : value instanceof Array
                            ? 'array'
                            : 'object';
                }

                errorMessage = _createErrorMessage(type, showType);
                return {
                    status: 0,
                    message: errorMessage,
                    meta: {
                        value: value,
                        type: type
                    }
                };
            }
            break;

        case 'null':
        case 'object':
        case 'array':
            if (typeof value !== 'object') {
                // 錯誤訊息
                showType = typeof value;
                errorMessage = _createErrorMessage(type, showType);
            } else {
                showType = typeofValue(value);
                if (showType !== type) {
                    errorMessage = _createErrorMessage(type, showType);
                }
            }

            if (errorMessage) {
                return {
                    status: 0,
                    message: errorMessage,
                    meta: {
                        value: value,
                        type: type
                    }
                };
            }
            break;
        default:
            return {
                status: 0,
                message: '第二個參數 type 值僅可為' + typeList.join(', ') + ', 目前的值為' + type + ', 將回傳失敗訊息',
                meta: {
                    value: value,
                    type: type
                }
            };
    }

    return {
        status: 1,
        message: 'success',
        meta: {
            value: value,
            type: type
        }
    }
    function _createErrorMessage(acceptType, getType) {
        return '格式錯誤，希望的格式是' + acceptType + ', 傳入的是' + getType;
    }
}

// 主要用來區分null, array 和object
function typeofValue(value) {
    switch (typeof value) {
        case 'object':
            if (!value) {
                return 'null';
            } else if (value instanceof Array) {
                return 'array';
            } else {
                return 'object';
            }
        default:
        // case 'string':
        // case 'number':
        // case 'boolean':
        // case 'function':
        // case 'undefined':
            return typeof value;
    }
}

// var result = multipleTypeMap(123, ['string', 'object', 'array', 'null']);
var result = singleTypeMap([], 'object');
var result2 = singleTypeMap([], 'null');
var result3 = singleTypeMap([], 'array');
console.log(result);
console.log(result2);
console.log(result3);