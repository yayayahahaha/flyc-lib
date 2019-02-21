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
                errorMessage = 'something error message';
                return {
                    status: 0,
                    message: errorMessage
                };
            }
            break;

        case 'null':
        case 'object':
        case 'array':
            if (typeof value !== 'object') {} else {
                switch (type) {
                    case 'null':
                        if (value) {
                            // 錯誤訊息
                            showType = value instanceof Array ? 'array' : 'object';
                            errorMessage = 'something error message';
                        }
                        break;
                    case 'object':
                        if (!value) {
                            // 錯誤訊息
                            showType = 'null';
                            errorMessage = 'something error message';
                        } else if (value instanceof Array) {
                            // 錯誤訊息
                            showType = 'array';
                            errorMessage = 'something error message';
                        }
                        break;
                    case 'array':
                        if (!value) {
                            // 錯誤訊息
                            showType = 'null';
                            errorMessage = 'something error message';
                        } else if (!(value instanceof Array)) {
                            // 錯誤訊息
                            showType = 'object';
                            errorMessage = 'something error message';
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
}

var result = singleTypeMap('value', 'number');
console.log(result);