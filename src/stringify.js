export default function stringify(obj) {
    return 'VOID' === obj.type ? '' :
           'ARRAY' === obj.type ? '[' + obj.value.map(stringify) + ']' :
           'OBJECT' === obj.type ? '{' + Object.keys(obj.value).map(k => k + ':' + stringify(obj.value[k])) + '}' :
           'BOOLEAN' === obj.type ? (obj.value ? '✓' : '✗') :
           'STRING' === obj.type ? obj.value :
           (obj.value !== null && obj.value !== undefined) ? stringify(obj.value) :
           obj.isFunction ? '[function]' : JSON.stringify(obj)
}