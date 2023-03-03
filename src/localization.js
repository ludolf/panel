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
Errors.de[lang.Errors.INVALID_UNI_OPERATOR] = 'Ungültiger Operator'
Errors.de[lang.Errors.INVALID_BI_OPERATOR] = 'Ungültiger Operator'
Errors.de[lang.Errors.UNEXPECTED_END] = 'Unerwartetes Ende'
Errors.de[lang.Errors.UNEXPECTED_SYMBOL] = 'Unerwartetes Symbol'
Errors.de[lang.Errors.EXPECTED_SYMBOL] = 'Erwartetes Symbol'
Errors.de[lang.Errors.UNREFERENCED_VARIABLE] = 'Nicht referenzierte Variable'
Errors.de[lang.Errors.UNEXPECTED_KEYWORD] = 'Unerwartetes Schlüsselwort'
Errors.de[lang.Errors.INVALID_IDENTIFIER] = 'Ungültige Kennung'
Errors.de[lang.Errors.UNEVEN_OPERATORS] = 'Ungerade Operatoren'
Errors.de[lang.Errors.EXPECTED_FUNCTION] = 'Erwartete Funktion'
Errors.de[lang.Errors.EXPECTED_STATEMENT_END] = 'Erwartetes Ende der Anweisung'
Errors.de[lang.Errors.ARRAY_INDEX_NOT_NUMBER] = 'Array-Index ist keine Zahl'
Errors.de[lang.Errors.ARRAY_INDEX_MISSING] = 'Array-Index fehlt'
Errors.de[lang.Errors.ARRAY_INDEX_OUT_BOUNDS] = 'Array-Index ist außerhalb der Grenzen'
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
Errors.de[lang.Errors.UNMATCHING_BI_OPERATOR_SUBJECTS] = 'Operator-Themen stimmen nicht überein'
Errors.de[lang.Errors.EXPECTED_ARRAY] = 'Array erwartet'
Errors.de[lang.Errors.EXPECTED_OBJECT] = 'Objekt erwartet'
Errors.de[lang.Errors.EXPECTED_IDENTIFIER] = 'Bezeichner erwartet'
Errors.de[lang.Errors.WRONG_ASSIGNMENT] = 'Falsche Zuordnung'
Errors.de[lang.Errors.WRONG_ASSIGNEE_TYPE] = 'Falscher Empfängertyp'
Errors.de[lang.Errors.READONLY_ATTRIBUTE] = 'Schreibgeschütztes Attribut'
Errors.de[lang.Errors.WRONG_CONDITION] = 'Falsche Bedingung'
Errors.de[lang.Errors.WRONG_CONDITION_VALUE] = 'Falscher Bedingungswert'
Errors.de[lang.Errors.EXECUTION_STEPS_EXCEEDED] = 'Energiemangel'
Errors.de[lang.Errors.PARSER_STEPS_EXCEEDED] = 'Parsing erschöpft'
Errors.de[lang.Errors.PROTECTED_FROM_MODIFICATION] = 'Vor Änderungen geschützt'
Errors.de[lang.Errors.DIVISION_BY_ZERO] = 'Division durch Null'
Errors.de[lang.Errors.UNKNOWN_ERROR] = 'Fehler'
Errors.cs[lang.Errors.INVALID_UNI_OPERATOR] = 'Neplatný operátor'
Errors.cs[lang.Errors.INVALID_BI_OPERATOR] = 'Neplatný operátor'
Errors.cs[lang.Errors.UNEXPECTED_END] = 'Neočekávaný konec'
Errors.cs[lang.Errors.UNEXPECTED_SYMBOL] = 'Neočekávaný symbol'
Errors.cs[lang.Errors.EXPECTED_SYMBOL] = 'Očekávaný symbol'
Errors.cs[lang.Errors.UNREFERENCED_VARIABLE] = 'Neznámá proměnná'
Errors.cs[lang.Errors.UNEXPECTED_KEYWORD] = 'Neočekávané klíčové slovo'
Errors.cs[lang.Errors.INVALID_IDENTIFIER] = 'Neplatný identifikátor'
Errors.cs[lang.Errors.UNEVEN_OPERATORS] = 'Neplatní operátoři'
Errors.cs[lang.Errors.EXPECTED_FUNCTION] = 'Očekávána funkce'
Errors.cs[lang.Errors.EXPECTED_STATEMENT_END] = 'Očekávaný konec výpisu'
Errors.cs[lang.Errors.ARRAY_INDEX_NOT_NUMBER] = 'Index pole není číslo'
Errors.cs[lang.Errors.ARRAY_INDEX_MISSING] = 'Chybí index pole'
Errors.cs[lang.Errors.ARRAY_INDEX_OUT_BOUNDS] = 'Index pole je mimo rozsah'
Errors.cs[lang.Errors.FUNC_ARGUMENTS_MISHMASH] = 'Funkční argumenty mišmaš'
Errors.cs[lang.Errors.ATTRIBUTE_ALREADY_EXISTS] = 'Atribut již existuje'
Errors.cs[lang.Errors.ATTRIBUTE_NOT_FOUND] = 'Atribut nenalezen'
Errors.cs[lang.Errors.ELEMENT_NOT_FOUND] = 'Prvek nenalezen'
Errors.cs[lang.Errors.EMPTY_EXPRESSION] = 'Prázdný výraz'
Errors.cs[lang.Errors.UNKNOWN_OPERATOR] = 'Neznámý operátor'
Errors.cs[lang.Errors.OPERATOR_NOT_APPLICABLE] = 'Operátor nelze použít'
Errors.cs[lang.Errors.ACCESS_OPERATOR_EXPECTED] = 'Očekává se přístupový operátor'
Errors.cs[lang.Errors.WRONG_UNI_OPERATOR_SUBJECT] = 'Nesprávný operand'
Errors.cs[lang.Errors.WRONG_BI_OPERATOR_SUBJECTS] = 'Nesprávný operand'
Errors.cs[lang.Errors.UNMATCHING_BI_OPERATOR_SUBJECTS] = 'Typ operandů se neshoduje'
Errors.cs[lang.Errors.EXPECTED_ARRAY] = 'Očekáváno pole'
Errors.cs[lang.Errors.EXPECTED_OBJECT] = 'Očekáván objekt'
Errors.cs[lang.Errors.EXPECTED_IDENTIFIER] = 'Očekáván identifikátor'
Errors.cs[lang.Errors.WRONG_ASSIGNMENT] = 'Chybné přiřazení'
Errors.cs[lang.Errors.WRONG_ASSIGNEE_TYPE] = 'Chybný typ příjemce'
Errors.cs[lang.Errors.READONLY_ATTRIBUTE] = 'Atribut pouze pro čtení'
Errors.cs[lang.Errors.WRONG_CONDITION] = 'Chybná podmínka'
Errors.cs[lang.Errors.WRONG_CONDITION_VALUE] = 'Chybná hodnota podmínky'
Errors.cs[lang.Errors.EXECUTION_STEPS_EXCEEDED] = 'Energie vyčerpána'
Errors.cs[lang.Errors.PARSER_STEPS_EXCEEDED] = 'Analýza vyčerpána'
Errors.cs[lang.Errors.PROTECTED_FROM_MODIFICATION] = 'Chráněno před změnami'
Errors.cs[lang.Errors.DIVISION_BY_ZERO] = 'Dělení nulou'
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