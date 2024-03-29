export default function stringify(obj) {
    return 'VOID' === obj.type ? '' :
           'ARRAY' === obj.type ? '[' + obj.value.map(stringify) + ']' :
           'OBJECT' === obj.type ? '{' + Object.keys(obj.value).map(k => k + ': ' + stringify(obj.value[k])).join(', ') + '}' :
           'BOOLEAN' === obj.type ? (obj.value ? '<b>✓</b>' : '<b>✗</b>') :
           'STRING' === obj.type ? obj.value :
           (obj.value !== null && obj.value !== undefined) ? stringify(obj.value) :
           obj.isFunction ? '⚙️' :
           typeof obj === 'string' ? obj :
           JSON.stringify(obj)
}