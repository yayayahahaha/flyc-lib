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

    var acceptTypesArray = [];

    if (typeof acceptTypes === 'string') {
        switch (acceptTypes) {
            case 'string':
            case 'number':
            case 'boolean':
            case 'function':
            case 'undefined':
                if (typeof value !== acceptTypes) {
                    console.warn('型別錯誤: 想要的型別為 ' + acceptTypes + ' , 傳入的值的型別為' + typeof value);
                    console.warn('沒有設定預設值，將回傳false');
                    return false;
                }
                break;

            case 'null':
            case 'object':
            case 'array':
                var objectErrorMessage = '',
                    showType = typeof value;
                if (typeof value !== 'object') {
                    objectErrorMessage = '型別錯誤: 想要的型別為 ' + acceptTypes + ' , 傳入的值的型別為' + showType;
                } else {
                    switch (acceptTypes) {
                        case 'null':
                            if (value) {
                                showType = value instanceof Array ? 'array' : 'object';
                                objectErrorMessage = '型別錯誤: 想要的型別為 ' + acceptTypes + ' , 傳入的值的型別為' + showType;
                            }
                            break;
                        case 'object':
                            if (!value) {
                                showType = 'null';
                                objectErrorMessage = '型別錯誤: 想要的型別為 ' + acceptTypes + ' , 傳入的值的型別為' + showType;
                            } else if (value instanceof Array) {
                                showType = 'array';
                                objectErrorMessage = '型別錯誤: 想要的型別為 ' + acceptTypes + ' , 傳入的值的型別為' + showType;
                            }
                            break;
                        case 'array':
                            if (!value) {
                                showType = 'null';
                                objectErrorMessage = '型別錯誤: 想要的型別為 ' + acceptTypes + ' , 傳入的值的型別為' + showType;
                            } else if (!(value instanceof Array)) {
                                showType = 'object';
                                objectErrorMessage = '型別錯誤: 想要的型別為 ' + acceptTypes + ' , 傳入的值的型別為' + showType;
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
                break;
        }
    }
}

var result = typeHint([], 'array');
console.log(result);