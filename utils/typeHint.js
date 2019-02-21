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

function typeHint(value, acceptTypes) {
    var argumentsLength = arguments.length;

    if (argumentsLength < 2) {
        console.log('請至少輸入兩個參數: 第一個為欲被檢查的值，第二個為可接受的型態');
        return;
    }

    var typeList = ['string',
            'number',
            'boolean',
            'function',
            'undefined',
            'null',
            'object',
            'array'
        ],
        acceptTypesArray = [],
        objectErrorMessage = '',
        showType = typeof value;

    if (typeof acceptTypes === 'string') {
        switch (acceptTypes) {
            case 'string':
            case 'number':
            case 'boolean':
            case 'function':
            case 'undefined':
                if (typeof value !== acceptTypes) {
                    console.warn(_create_errorMessage(acceptTypes, typeof value));
                    console.warn('沒有設定預設值，將回傳false');
                    return false;
                }
                break;

            case 'null':
            case 'object':
            case 'array':
                if (typeof value !== 'object') {
                    objectErrorMessage = _create_errorMessage(acceptTypes, showType);
                } else {
                    switch (acceptTypes) {
                        case 'null':
                            if (value) {
                                showType = value instanceof Array ? 'array' : 'object';
                                objectErrorMessage = _create_errorMessage(acceptTypes, showType);
                            }
                            break;
                        case 'object':
                            if (!value) {
                                showType = 'null';
                                objectErrorMessage = _create_errorMessage(acceptTypes, showType);
                            } else if (value instanceof Array) {
                                showType = 'array';
                                objectErrorMessage = _create_errorMessage(acceptTypes, showType);
                            }
                            break;
                        case 'array':
                            if (!value) {
                                showType = 'null';
                                objectErrorMessage = _create_errorMessage(acceptTypes, showType);
                            } else if (!(value instanceof Array)) {
                                showType = 'object';
                                objectErrorMessage = _create_errorMessage(acceptTypes, showType);
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
                console.warn('第二個參數 acceptTypes 僅可為' + typeList.join(', ') + ', 目前的值為' + acceptTypes + ', 將回傳false');
                return false;
        }
        return value;
    } else if (typeof acceptTypes === 'object' && acceptTypes instanceof Array) {

    } else {
        if (acceptTypes === null) {
            showType = 'null';
        } else {
            showType = typeof acceptTypes;
        }
        console.warn('第二個參數 acceptTypes 僅可為字串或array, 傳入的值為' + showType);
        return;
    }

    function _create_errorMessage(acceptTypes, showType) {
        return '型別錯誤: 想要的型別為 ' + acceptTypes + ' , 傳入的值的型別為' + showType;
    }
}

var result = typeHint('[]', 'string');
console.log(result);