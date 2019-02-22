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
    ],
    showType = '',
    errorMessage = '';

// 傳入的參數可接受多種type
function multipleTypeMap(value, types) {
    if (!(types instanceof Array)) {
        console.log('第二個參數types 僅可接受陣列格式');
        return;
    }

    types.forEach(function(acceptType) {
        var result = singleTypeMap(value, acceptType);
        console.log(result);
    });

}

// 傳入的參數僅可接受一種type
function singleTypeMap(value, type) {
    if (typeof type !== 'string') {
        return {
            status: 0,
            message: 'type 僅能接受字串格式: ' + typeof type
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
                    message: errorMessage
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
                switch (type) {
                    case 'null':
                        if (value) {
                            // 錯誤訊息
                            showType = value instanceof Array ? 'array' : 'object';
                            errorMessage = _createErrorMessage(type, showType);
                        }
                        break;
                    case 'object':
                        if (!value) {
                            // 錯誤訊息
                            showType = 'null';
                            errorMessage = _createErrorMessage(type, showType);
                        } else if (value instanceof Array) {
                            // 錯誤訊息
                            showType = 'array';
                            errorMessage = _createErrorMessage(type, showType);
                        }
                        break;
                    case 'array':
                        if (!value) {
                            // 錯誤訊息
                            showType = 'null';
                            errorMessage = _createErrorMessage(type, showType);
                        } else if (!(value instanceof Array)) {
                            // 錯誤訊息
                            showType = 'object';
                            errorMessage = _createErrorMessage(type, showType);
                        }
                        break;
                }
            }

            if (errorMessage) {
                return {
                    status: 0,
                    message: errorMessage
                };
            }
            break;
        default:
            return {
                status: 0,
                message: '第二個參數 type 值僅可為' + typeList.join(', ') + ', 目前的值為' + type + ', 將回傳失敗訊息'
            };
    }

    return {
        status: 1,
        message: 'success'
    }
    function _createErrorMessage(acceptType, getType) {
        return '格式錯誤，希望的格式是' + acceptType + ', 傳入的是' + getType;
    }
}

var result = multipleTypeMap({}, ['array']);
console.log(result);