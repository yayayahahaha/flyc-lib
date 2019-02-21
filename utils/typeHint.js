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
                console.warn(_create_errorMessage(type, typeof value));
                return false;
            }
            break;

        case 'null':
        case 'object':
        case 'array':
            if (typeof value !== 'object') {
                objectErrorMessage = _create_errorMessage(type, showType);
            } else {
                switch (type) {
                    case 'null':
                        if (value) {
                            showType = value instanceof Array ? 'array' : 'object';
                            objectErrorMessage = _create_errorMessage(type, showType);
                        }
                        break;
                    case 'object':
                        if (!value) {
                            showType = 'null';
                            objectErrorMessage = _create_errorMessage(type, showType);
                        } else if (value instanceof Array) {
                            showType = 'array';
                            objectErrorMessage = _create_errorMessage(type, showType);
                        }
                        break;
                    case 'array':
                        if (!value) {
                            showType = 'null';
                            objectErrorMessage = _create_errorMessage(type, showType);
                        } else if (!(value instanceof Array)) {
                            showType = 'object';
                            objectErrorMessage = _create_errorMessage(type, showType);
                        }
                        break;
                }
            }

            if (objectErrorMessage) {
                objectErrorMessage += '\n沒有設定預設值，將回傳false';
                console.log(objectErrorMessage);
                return false;
            }
            break;
        default:
            return {
                status: 0,
                message: '第二個參數 type 值僅可為' + typeList.join(', ') + ', 目前的值為' + type + ', 將回傳失敗訊息'
            };
    }
}

var result = singleTypeMap('value', 'string');
console.log(result);