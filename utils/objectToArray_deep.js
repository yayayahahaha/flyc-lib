function objectToArray_deep(obj) {
  return Object.keys(obj).sort(function(a, b) {
    return a.localeCompare(b);
  }).reduce(function(array, key, index) {
    var value = obj[key];
    if (typeof value === 'object' && value) {
      value = objectToArray_deep(value);
    }
    array.push({
      key: key,
      value: value,
    });
    return array;
  }, []);
}

export {
  objectToArray_deep
}