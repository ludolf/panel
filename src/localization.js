import { lang } from 'ludolfc'

let locale = (localStorage.getItem('localization') || navigator.language || 'en').substring(0, 2)

const Snippets = {
  en: `i := 3
while i > 0 {
Display(i, "...")
i := i - 1
}
Display(Map)`,
  de: `i := 3
solange i > 0 {
Anzeigen(i, "...")
i := i - 1
}
Anzeigen(Map)`,
  cs: `i := 3
dokud i > 0 {
Zobraz(i, "...")
i := i - 1
}
Zobraz(Map)`,
}

const Errors = {en:[], de:[], cs:[]}
Errors.en[lang.Errors.INVALID_UNI_OPERATOR] = 'Invalid operator'
Errors.en[lang.Errors.INVALID_BI_OPERATOR] = 'Invalid operator'
Errors.en[lang.Errors.UNEXPECTED_END] = 'Unexpected end'
Errors.en[lang.Errors.UNEXPECTED_SYMBOL] = 'Unexpected symbol'
Errors.en[lang.Errors.EXPECTED_SYMBOL] = 'Expected symbol'
Errors.en[lang.Errors.UNREFERENCED_VARIABLE] = 'Unreferenced variable'
Errors.en[lang.Errors.UNEXPECTED_KEYWORD] = 'Unexpected keyword'
Errors.en[lang.Errors.INVALID_IDENTIFIER] = 'Invalid identifier'
Errors.en[lang.Errors.UNEVEN_OPERATORS] = 'Uneven operators'
Errors.en[lang.Errors.EXPECTED_FUNCTION] = 'Expected function'
Errors.en[lang.Errors.EXPECTED_STATEMENT_END] = 'Expected statement end'
Errors.en[lang.Errors.ARRAY_INDEX_NOT_NUMBER] = 'Array index is not a number'
Errors.en[lang.Errors.ARRAY_INDEX_MISSING] = 'Array index is missing'
Errors.en[lang.Errors.ARRAY_INDEX_OUT_BOUNDS] = 'Array index is out of bounds'
Errors.en[lang.Errors.FUNC_ARGUMENTS_MISHMASH] = 'Function arguments mishmash'
Errors.en[lang.Errors.ATTRIBUTE_ALREADY_EXISTS] = 'Attribute already exists'
Errors.en[lang.Errors.ATTRIBUTE_NOT_FOUND] = 'Attribute not found'
Errors.en[lang.Errors.ELEMENT_NOT_FOUND] = 'Element not found'
Errors.en[lang.Errors.EMPTY_EXPRESSION] = 'Empty expression'
Errors.en[lang.Errors.UNKNOWN_OPERATOR] = 'Unknown operator'
Errors.en[lang.Errors.OPERATOR_NOT_APPLICABLE] = 'Operator not applicable'
Errors.en[lang.Errors.ACCESS_OPERATOR_EXPECTED] = 'Access operator expected'
Errors.en[lang.Errors.WRONG_UNI_OPERATOR_SUBJECT] = 'Wrong operator subject'
Errors.en[lang.Errors.WRONG_BI_OPERATOR_SUBJECTS] = 'Wrong operator subject'
Errors.en[lang.Errors.UNMATCHING_BI_OPERATOR_SUBJECTS] = 'Operator subjects do not match'
Errors.en[lang.Errors.EXPECTED_ARRAY] = 'Expected an array'
Errors.en[lang.Errors.EXPECTED_OBJECT] = 'Expected an object'
Errors.en[lang.Errors.EXPECTED_IDENTIFIER] = 'Expected an identifier'
Errors.en[lang.Errors.WRONG_ASSIGNMENT] = 'Wrong assignment'
Errors.en[lang.Errors.WRONG_ASSIGNEE_TYPE] = 'Wrong assignee type'
Errors.en[lang.Errors.READONLY_ATTRIBUTE] = 'Read-only attribute'
Errors.en[lang.Errors.WRONG_CONDITION] = 'Wrong condition'
Errors.en[lang.Errors.WRONG_CONDITION_VALUE] = 'Wrong condition value'
Errors.en[lang.Errors.EXECUTION_STEPS_EXCEEDED] = 'Run out of power'
Errors.en[lang.Errors.PARSER_STEPS_EXCEEDED] = 'Parsing exhausted'
Errors.en[lang.Errors.PROTECTED_FROM_MODIFICATION] = 'Protected from modification'
Errors.en[lang.Errors.DIVISION_BY_ZERO] = 'Division by zero'
Errors.en[lang.Errors.UNKNOWN_ERROR] = 'Error'
Errors.de[lang.Errors.INVALID_UNI_OPERATOR] = 'Ung??ltiger Operator'
Errors.de[lang.Errors.INVALID_BI_OPERATOR] = 'Ung??ltiger Operator'
Errors.de[lang.Errors.UNEXPECTED_END] = 'Unerwartetes Ende'
Errors.de[lang.Errors.UNEXPECTED_SYMBOL] = 'Unerwartetes Symbol'
Errors.de[lang.Errors.EXPECTED_SYMBOL] = 'Erwartetes Symbol'
Errors.de[lang.Errors.UNREFERENCED_VARIABLE] = 'Nicht referenzierte Variable'
Errors.de[lang.Errors.UNEXPECTED_KEYWORD] = 'Unerwartetes Schl??sselwort'
Errors.de[lang.Errors.INVALID_IDENTIFIER] = 'Ung??ltige Kennung'
Errors.de[lang.Errors.UNEVEN_OPERATORS] = 'Ungerade Operatoren'
Errors.de[lang.Errors.EXPECTED_FUNCTION] = 'Erwartete Funktion'
Errors.de[lang.Errors.EXPECTED_STATEMENT_END] = 'Erwartetes Ende der Anweisung'
Errors.de[lang.Errors.ARRAY_INDEX_NOT_NUMBER] = 'Array-Index ist keine Zahl'
Errors.de[lang.Errors.ARRAY_INDEX_MISSING] = 'Array-Index fehlt'
Errors.de[lang.Errors.ARRAY_INDEX_OUT_BOUNDS] = 'Array-Index ist au??erhalb der Grenzen'
Errors.de[lang.Errors.FUNC_ARGUMENTS_MISHMASH] = 'Mischmasch der Funktionsargumente'
Errors.de[lang.Errors.ATTRIBUTE_ALREADY_EXISTS] = 'Attribut existiert bereits'
Errors.de[lang.Errors.ATTRIBUTE_NOT_FOUND] = 'Attribut nicht gefunden'
Errors.de[lang.Errors.ELEMENT_NOT_FOUND] = 'Element nicht gefunden'
Errors.de[lang.Errors.EMPTY_EXPRESSION] = 'Leerer Ausdruck'
Errors.de[lang.Errors.UNKNOWN_OPERATOR] = 'Unbekannter Operator'
Errors.de[lang.Errors.OPERATOR_NOT_APPLICABLE] = 'Operator nicht zutreffend'
Errors.de[lang.Errors.ACCESS_OPERATOR_EXPECTED] = 'Zugriffsoperator erwartet'
Errors.de[lang.Errors.WRONG_UNI_OPERATOR_SUBJECT] = 'Falscher Operand des Operators'
Errors.de[lang.Errors.WRONG_BI_OPERATOR_SUBJECTS] = 'Falscher Operator Operand'
Errors.de[lang.Errors.UNMATCHING_BI_OPERATOR_SUBJECTS] = 'Operator-Themen stimmen nicht ??berein'
Errors.de[lang.Errors.EXPECTED_ARRAY] = 'Array erwartet'
Errors.de[lang.Errors.EXPECTED_OBJECT] = 'Objekt erwartet'
Errors.de[lang.Errors.EXPECTED_IDENTIFIER] = 'Bezeichner erwartet'
Errors.de[lang.Errors.WRONG_ASSIGNMENT] = 'Falsche Zuordnung'
Errors.de[lang.Errors.WRONG_ASSIGNEE_TYPE] = 'Falscher Empf??ngertyp'
Errors.de[lang.Errors.READONLY_ATTRIBUTE] = 'Schreibgesch??tztes Attribut'
Errors.de[lang.Errors.WRONG_CONDITION] = 'Falsche Bedingung'
Errors.de[lang.Errors.WRONG_CONDITION_VALUE] = 'Falscher Bedingungswert'
Errors.de[lang.Errors.EXECUTION_STEPS_EXCEEDED] = 'Energiemangel'
Errors.de[lang.Errors.PARSER_STEPS_EXCEEDED] = 'Parsing ersch??pft'
Errors.de[lang.Errors.PROTECTED_FROM_MODIFICATION] = 'Vor ??nderungen gesch??tzt'
Errors.de[lang.Errors.DIVISION_BY_ZERO] = 'Division durch Null'
Errors.de[lang.Errors.UNKNOWN_ERROR] = 'Fehler'
Errors.cs[lang.Errors.INVALID_UNI_OPERATOR] = 'Neplatn?? oper??tor'
Errors.cs[lang.Errors.INVALID_BI_OPERATOR] = 'Neplatn?? oper??tor'
Errors.cs[lang.Errors.UNEXPECTED_END] = 'Neo??ek??van?? konec'
Errors.cs[lang.Errors.UNEXPECTED_SYMBOL] = 'Neo??ek??van?? symbol'
Errors.cs[lang.Errors.EXPECTED_SYMBOL] = 'O??ek??van?? symbol'
Errors.cs[lang.Errors.UNREFERENCED_VARIABLE] = 'Nezn??m?? prom??nn??'
Errors.cs[lang.Errors.UNEXPECTED_KEYWORD] = 'Neo??ek??van?? kl????ov?? slovo'
Errors.cs[lang.Errors.INVALID_IDENTIFIER] = 'Neplatn?? identifik??tor'
Errors.cs[lang.Errors.UNEVEN_OPERATORS] = 'Neplatn?? oper??to??i'
Errors.cs[lang.Errors.EXPECTED_FUNCTION] = 'O??ek??v??na funkce'
Errors.cs[lang.Errors.EXPECTED_STATEMENT_END] = 'O??ek??van?? konec v??pisu'
Errors.cs[lang.Errors.ARRAY_INDEX_NOT_NUMBER] = 'Index pole nen?? ????slo'
Errors.cs[lang.Errors.ARRAY_INDEX_MISSING] = 'Chyb?? index pole'
Errors.cs[lang.Errors.ARRAY_INDEX_OUT_BOUNDS] = 'Index pole je mimo rozsah'
Errors.cs[lang.Errors.FUNC_ARGUMENTS_MISHMASH] = 'Funk??n?? argumenty mi??ma??'
Errors.cs[lang.Errors.ATTRIBUTE_ALREADY_EXISTS] = 'Atribut ji?? existuje'
Errors.cs[lang.Errors.ATTRIBUTE_NOT_FOUND] = 'Atribut nenalezen'
Errors.cs[lang.Errors.ELEMENT_NOT_FOUND] = 'Prvek nenalezen'
Errors.cs[lang.Errors.EMPTY_EXPRESSION] = 'Pr??zdn?? v??raz'
Errors.cs[lang.Errors.UNKNOWN_OPERATOR] = 'Nezn??m?? oper??tor'
Errors.cs[lang.Errors.OPERATOR_NOT_APPLICABLE] = 'Oper??tor nelze pou????t'
Errors.cs[lang.Errors.ACCESS_OPERATOR_EXPECTED] = 'O??ek??v?? se p????stupov?? oper??tor'
Errors.cs[lang.Errors.WRONG_UNI_OPERATOR_SUBJECT] = 'Nespr??vn?? operand'
Errors.cs[lang.Errors.WRONG_BI_OPERATOR_SUBJECTS] = 'Nespr??vn?? operand'
Errors.cs[lang.Errors.UNMATCHING_BI_OPERATOR_SUBJECTS] = 'Typ operand?? se neshoduje'
Errors.cs[lang.Errors.EXPECTED_ARRAY] = 'O??ek??v??no pole'
Errors.cs[lang.Errors.EXPECTED_OBJECT] = 'O??ek??v??n objekt'
Errors.cs[lang.Errors.EXPECTED_IDENTIFIER] = 'O??ek??v??n identifik??tor'
Errors.cs[lang.Errors.WRONG_ASSIGNMENT] = 'Chybn?? p??i??azen??'
Errors.cs[lang.Errors.WRONG_ASSIGNEE_TYPE] = 'Chybn?? typ p????jemce'
Errors.cs[lang.Errors.READONLY_ATTRIBUTE] = 'Atribut pouze pro ??ten??'
Errors.cs[lang.Errors.WRONG_CONDITION] = 'Chybn?? podm??nka'
Errors.cs[lang.Errors.WRONG_CONDITION_VALUE] = 'Chybn?? hodnota podm??nky'
Errors.cs[lang.Errors.EXECUTION_STEPS_EXCEEDED] = 'Energie vy??erp??na'
Errors.cs[lang.Errors.PARSER_STEPS_EXCEEDED] = 'Anal??za vy??erp??na'
Errors.cs[lang.Errors.PROTECTED_FROM_MODIFICATION] = 'Chr??n??no p??ed zm??nami'
Errors.cs[lang.Errors.DIVISION_BY_ZERO] = 'D??len?? nulou'
Errors.cs[lang.Errors.UNKNOWN_ERROR] = 'Chyba'

function localize() {
    document.querySelectorAll('.localization:not(.'+locale+')').forEach(l => l.classList.remove('current'))
    document.querySelectorAll('.localization.'+locale).forEach(l => l.classList.add('current'))
}
localize()

function changeLocale(lang) {
    locale = lang || 'en'
    localStorage.setItem('localization', locale)
    localize()
}

const snippet = () => Snippets[locale]

const errorMsg = id => Errors[locale]?.[id] || Errors['en']?.[id] || id

export { snippet, changeLocale, errorMsg }