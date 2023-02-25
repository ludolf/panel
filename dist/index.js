/*! For license information please see index.js.LICENSE.txt */
(()=>{var e={385:function(e){var t;t=()=>(()=>{var e={"./src/interpret.js":(e,t,s)=>{const{Types:r,Errors:n,Interruptions:i,InterpretError:a,Interrupt:o,Void:c}=s("./src/lang.js");class l{constructor(e={}){this.variables=[new Map],this.imports=e}clear(){this.variables=[new Map],this.imports&&Object.entries(this.imports).forEach((([e,t])=>this.variables[0].set(e,t)))}hasVariable(e){for(let t=this.variables.length-1;t>=0;t--){if(this.variables[t].has(e))return!0;if(this.variables[t].has("$")&&this.variables[t].get("$").hasAttribute(e))return!0}return!1}getVariable(e){for(let t=this.variables.length-1;t>=0;t--){if(this.variables[t].has(e))return this.variables[t].get(e);if(this.variables[t].has("$")){const s=this.variables[t].get("$");if(s.hasAttribute(e))return s.attribute(e)}}return!1}setVariable(e,t,s=!1){if(s)return void this.variables[this.variables.length-1].set(e,t);let r=!1;for(let s=this.variables.length-1;s>=0;s--)if(this.variables[s].has(e)){this.variables[s].set(e,t),r=!0;break}r||(this.variables.length||this.clear(),this.variables[this.variables.length-1].set(e,t))}pushScope(){this.variables.push(new Map)}popScope(){this.variables.pop()}}class u{constructor(e,t){this.maxSteps=e,this.isInterruptedFn=t,this.steps=0}step(e){if(this.isInterruptedFn&&this.isInterruptedFn())throw new o(i.USER_SUSSPEND);if(this.steps++,this.steps>this.maxSteps)throw new a(n.EXECUTION_STEPS_EXCEEDED,e)}reset(e=null){this.steps=0,e&&(this.maxSteps=e)}}e.exports=class{constructor(e={},t,s=1e5){this.variables=new l(e),this.stepper=new u(s,t&&t.isInterrupted)}async execute(e){return this.variables.clear(),this.stepper.reset(),await this.executeBlock(e,!1)}async executeBlock(e,t=!0){let s;t&&this.variables.pushScope();for(let t of e.statements)s=await this.executeStatement(t);return t&&this.variables.popScope(),s||new c}async executeStatement(e){return this.stepper.step(e.source),e.isExpression?await this.executeExpression(e):e.isAssignment?await this.executeAssignment(e):e.isWhile?await this.executeWhile(e):e.isIf?await this.executeIf(e):e}async executeExpression(e,t=null){if(this.stepper.step(e.source),!e.parts)throw new a(n.EMPTY_EXPRESSION,e.source);let s=[...e.parts];return await this.executeExpressionParts(s,t)}async executeExpressionParts(e,t=null){let s=u("&");if(s){const i=await this.executeExpressionParts(e.slice(0,s),t);if(i.type!==r.BOOLEAN)throw new a(n.WRONG_BI_OPERATOR_SUBJECTS,i.source);if(!i.value)return i;const o=await this.executeExpressionParts(e.slice(s+1),t);if(o.type!==r.BOOLEAN)throw new a(n.WRONG_BI_OPERATOR_SUBJECTS,o.source);return o}if(s=u("|"),s){const i=await this.executeExpressionParts(e.slice(0,s),t);if(i.type!==r.BOOLEAN)throw new a(n.WRONG_BI_OPERATOR_SUBJECTS,i.source);if(i.value)return i;const o=await this.executeExpressionParts(e.slice(s+1),t);if(o.type!==r.BOOLEAN)throw new a(n.WRONG_BI_OPERATOR_SUBJECTS,o.source);return o}let i=!1;for(;(s=o())>-1;){const o=e[s];if(t&&!o.isObjectAccess&&!o.isArrayAccess)throw new a(n.ACCESS_OPERATOR_EXPECTED,o.source);try{if(o.isUni){const t=await this.executeExpressionPart(e[s+1]);if(!t.type)throw new a(n.WRONG_UNI_OPERATOR_SUBJECT,o.source);e[s]=o.apply(t),e=c(e,s+1)}else if(o.isBi){const t=await this.executeExpressionPart(e[s-1]),r=await this.executeExpressionPart(e[s+1]);if(!t.type||!r.type)throw new a(n.WRONG_BI_OPERATOR_SUBJECTS,o.source);if(t.type!==r.type)throw new a(n.UNMATCHING_BI_OPERATOR_SUBJECTS,o.source);e[s]=o.apply(t,r),e=c(e,s-1,s+1)}else if(o.isArrayAccess){const u=await this.executeExpressionPart(e[s-1]);if(r.ARRAY!==u.type)throw new a(n.EXPECTED_ARRAY,o.source);if(t&&u.protected())throw new a(n.PROTECTED_FROM_MODIFICATION,o.source);const h=await Promise.all(o.indexes.map((e=>this.executeExpressionPart(e))));if(e[s]=o.apply(u,h,t&&l()?t:null),!e[s])throw new a(n.ATTRIBUTE_NOT_FOUND,o.source);e=c(e,s-1),i=!0}else if(o.isObjectAccess){const r=await this.executeExpressionPart(e[s-1]);if(!r.isObject)throw new a(n.EXPECTED_OBJECT,o.source);if(t&&r.protected())throw new a(n.PROTECTED_FROM_MODIFICATION,o.source);if(e[s]=o.apply(r,t&&l()?t:null),!e[s])throw new a(n.ATTRIBUTE_NOT_FOUND,o.source);e=c(e,s-1),i=!0}else{if(!o.isCall)throw new a(n.UNKNOWN_OPERATOR,o.source);{const t=await this.executeExpressionPart(e[s-1]),r=await Promise.all(o.params.map((e=>this.executeExpressionPart(e))));e[s]=await this.executeFunctionCall(t,r),e=c(e,s-1)}}}catch(e){if(!e.isLangError)throw new a(n.UNKNOWN_ERROR,o.source,e);if(!e.isInterpretError)throw new a(e.id,o.source,e.arg1,e.arg2);throw e}}if(t&&!i)throw new a(n.ACCESS_OPERATOR_EXPECTED,e[0].source);return await this.executeExpressionPart(e[0]);function o(){let t=-1,s=Number.MIN_SAFE_INTEGER;for(let r=0;r<e.length;r++){const n=e[r];n.isOperator&&(s<n.precedence||n.isUni&&s===n.precedence)&&(t=r,s=n.precedence)}return t}function c(e,...t){return e.filter(((e,s)=>!t.includes(s)))}function l(){return 2===e.length}function u(t){for(let s=0;s<e.length;s++)if(e[s].isBi&&e[s].op===t)return s}}async executeExpressionPart(e){if(this.stepper.step(e.source),e.isReference){if(!this.variables.hasVariable(e.varName))throw new a(n.UNREFERENCED_VARIABLE,e.source-e.varName.length,e.varName);return this.variables.getVariable(e.varName)}if(e.isExpression)return await this.executeExpression(e);if(r.ARRAY===e.type){const t=e.value;for(let e=0;e<t.length;e++)t[e]=await this.executeExpressionPart(t[e])}else if(r.OBJECT===e.type){const t=e.value;for(let s of Object.keys(t))t[s]=await this.executeExpressionPart(t[s]),(t[s].isObject||t[s].isFunction)&&(t[s].parent=e)}return e}async executeFunctionCall(e,t){if(e.isNative){return await e.call(...t)||new c}if(!t&&e.args||t.length!==e.args.length)throw new a(n.FUNC_ARGUMENTS_MISHMASH,e.source);let s=0;this.variables.pushScope();for(let r of e.args)this.variables.setVariable(r,t[s++],!0);e.parent&&this.variables.setVariable("$",e.parent,!0);try{return await this.executeBlock(e.body,!1)}finally{this.variables.popScope()}}async executeAssignment(e){if(!e.left||!e.right)throw new a(n.WRONG_ASSIGNMENT,e.source);const t=await this.executeExpressionPart(e.right);if(e.left.isVariable){const s=this.variables.getVariable(e.left.name);if(s.protected&&s.protected())throw new a(n.PROTECTED_FROM_MODIFICATION,e.left.source);this.variables.setVariable(e.left.name,t)}else{if(!e.left.isExpression)throw new a(n.WRONG_ASSIGNEE_TYPE);await this.executeExpression(e.left,t)}}async executeWhile(e){if(!e.condition||!e.condition.isExpression)throw new a(n.WRONG_CONDITION,e.source);for(;;){const t=await this.executeExpressionPart(e.condition);if(t.type!==r.BOOLEAN)throw new a(n.WRONG_CONDITION_VALUE,t.source);if(!t.value)break;await this.executeBlock(e.body)}}async executeIf(e){if(!e.condition||!e.condition.isExpression)throw new a(n.WRONG_CONDITION,e.source);const t=await this.executeExpressionPart(e.condition);if(t.type!==r.BOOLEAN)throw new a(n.WRONG_CONDITION_VALUE,t.source);t.value?await this.executeBlock(e.body):e.elseBody&&await this.executeBlock(e.elseBody)}}},"./src/lang.js":e=>{const t=["size","velikost","größe"],s={INVALID_UNI_OPERATOR:"INVALID_UNI_OPERATOR",INVALID_BI_OPERATOR:"INVALID_BI_OPERATOR",UNEXPECTED_END:"UNEXPECTED_END",UNEXPECTED_SYMBOL:"UNEXPECTED_SYMBOL",EXPECTED_SYMBOL:"EXPECTED_SYMBOL",UNREFERENCED_VARIABLE:"UNREFERENCED_VARIABLE",UNEXPEXTED_KEYWORD:"UNEXPEXTED_KEYWORD",INVALID_IDENTIFIER:"INVALID_IDENTIFIER",UNEVEN_OPERATORS:"UNEVEN_OPERATORS",EXPEXTED_FUNCTION:"EXPEXTED_FUNCTION",EXPEXTED_STATEMENT_END:"EXPEXTED_STATEMENT_END",ARRAY_INDEX_NOT_NUMBER:"ARRAY_INDEX_NOT_NUMBER",ARRAY_INDEX_MISSING:"ARRAY_INDEX_MISSING",ARRAY_INDEX_OUT_BOUNDS:"ARRAY_INDEX_OUT_BOUNDS",FUNC_ARGUMENTS_MISHMASH:"FUNC_ARGUMENTS_MISHMASH",ATTRIBUTE_ALREADY_EXISTS:"ATTRIBUTE_ALREADY_EXISTS",ATTRIBUTE_NOT_FOUND:"ATTRIBUTE_NOT_FOUND",ELEMENT_NOT_FOUND:"ELEMENT_NOT_FOUND",EMPTY_EXPRESSION:"EMPTY_EXPRESSION",UNKNOWN_OPERATOR:"UNKNOWN_OPERATOR",OPERATOR_NOT_APPLICABLE:"OPERATOR_NOT_APPLICABLE",ACCESS_OPERATOR_EXPECTED:"ACCESS_OPERATOR_EXPECTED",WRONG_UNI_OPERATOR_SUBJECT:"WRONG_UNI_OPERATOR_SUBJECT",WRONG_BI_OPERATOR_SUBJECTS:"WRONG_BI_OPERATOR_SUBJECTS",UNMATCHING_BI_OPERATOR_SUBJECTS:"UNMATCHING_BI_OPERATOR_SUBJECTS",EXPECTED_ARRAY:"EXPECTED_ARRAY",EXPECTED_OBJECT:"EXPECTED_OBJECT",EXPECTED_IDENTIFIER:"EXPECTED_IDENTIFIER",WRONG_ASSIGNMENT:"WRONG_ASSIGNMENT",WRONG_ASSIGNEE_TYPE:"WRONG_ASSIGNEE_TYPE",READONLY_ATTRIBUTE:"READONLY_ATTRIBUTE",WRONG_CONDITION:"WRONG_CONDITION",WRONG_CONDITION_VALUE:"WRONG_CONDITION_VALUE",EXECUTION_STEPS_EXCEEDED:"EXECUTION_STEPS_EXCEEDED",PARSER_STEPS_EXCEEDED:"PARSER_STEPS_EXCEEDED",PROTECTED_FROM_MODIFICATION:"PROTECTED_FROM_MODIFICATION",DIVISION_BY_ZERO:"DIVISION_BY_ZERO",UNKNOWN_ERROR:"UNKNOWN_ERROR"},r={NUMBER:"NUMBER",BOOLEAN:"BOOLEAN",STRING:"STRING",ARRAY:"ARRAY",OBJECT:"OBJECT",FUNCTION:"FUNCTION",VOID:"VOID"};class n extends Error{constructor(e,t,s,r){super(e),this.message=`${e} ${s?`"${s}"`:""} ${r?`"${r}"`:""}`,this.id=e,this.arg1=s,this.arg2=r,this.position=t,this.isLangError=!0}}class i{constructor(e){this.isExpression=!1,this.isAssignment=!1,this.isWhile=!1,this.isIf=!1,this.source=e}}class a{constructor(e,t=-1){this.op=e,this.isOperator=!0,this.precedence=t}}class o{constructor(e,t,s=r.OBJECT){this.value=e,this.type=s,this.isObject=!0,this.parent=null,this.source=t,this.eq=new p((e=>new h(function(e,t){const s=Object.keys(e.value),r=Object.keys(t.value);if(s.length!==r.length)return!1;for(k of s)if(!e.value[k].eq.call(t.value[k]))return!1;return!0}(this,e)))),this.ne=new p((e=>new h(!this.eq.call(e).value)))}attribute(e,t){const s=this[e]?this[e]:this.value[e];return t&&this.value[e]&&(this.value[e]=t),s||(this.parent?this.parent.attribute(e):void 0)}hasAttribute(e){return this[e]||this.value[e]||this.parent&&this.parent.hasAttribute(e)}protected(){return this.isProtected||this.parent&&this.parent.protected()}}class c extends o{constructor(e,t,s){super(e,t,s),this.eq=new p((e=>new h(this.value===e.value))),this.ne=new p((e=>new h(this.value!==e.value)))}}class l extends c{constructor(e,t){super(e,t,r.NUMBER),this.mult=new p((e=>new l(this.value*e.value))),this.div=new p((e=>new l(this.value/e.value))),this.mod=new p((e=>new l(this.value%e.value))),this.plus=new p((e=>new l(this.value+e.value))),this.minus=new p((e=>new l(this.value-e.value))),this.lt=new p((e=>new h(this.value<e.value))),this.le=new p((e=>new h(this.value<=e.value))),this.gt=new p((e=>new h(this.value>e.value))),this.ge=new p((e=>new h(this.value>=e.value))),this.neg=new p((()=>new l(-this.value))),this.sum=new p(((...e)=>new l(e.reduce(((e,t)=>e+t.value),this.value))))}}class u extends c{constructor(e,s){super(e,s,r.STRING),this.concat=new p((e=>new u(this.value+e.value))),this.length=new p((()=>new l(this.value.length))),this.plus=this.concat;for(let e of t)this[e]=new l(this.value.length)}}class h extends c{constructor(e,t){super(e,t,r.BOOLEAN),this.and=new p((e=>new h(this.value&&e.value))),this.or=new p((e=>new h(this.value||e.value))),this.xor=new p((e=>new h(this.value?!e.value:e.value))),this.nand=new p((e=>new h(!(this.value&&e.value)))),this.neg=new p((()=>new h(!this.value))),this.mult=this.and,this.plus=this.or}}class E extends c{constructor(e,s){super(e,s,r.ARRAY),this.concat=new p((e=>new E(this.value.concat(e.value)))),this.plus=this.concat;for(let e of t)this[e]=new l(this.value.length);this.eq=new p((e=>{if(!e||!e.value)return new h(!1);if(this.value.length!==e.value.length)return new h(!1);for(let t=0;t<this.value.length;t++)if(!this.value[t].eq||!this.value[t].eq.isNative||!this.value[t].eq.call(e.value[t]).value)return new h(!1);return new h(!0)})),this.ne=new p((e=>new h(!this.eq.call(e).value)))}element(e,t){return e.reduce(((r,i,a)=>{const o=Math.ceil(i.value);if(o<0||o>=r.value.length)throw new n(s.ARRAY_INDEX_OUT_BOUNDS);const c=r.value[o];return t&&a===e.length-1&&(r.value[o]=t),c}),this)}attribute(e,r){if(t.includes(e.toLowerCase())){if(r)throw new n(s.READONLY_ATTRIBUTE);return new l(this.value.length)}return super.attribute(e,r)}hasAttribute(e){return t.includes(e.toLowerCase())||super.attribute(e,newValue)}}class p{constructor(e,t){this.type=r.FUNCTION,this.func=e,this.isNative=!0,this.source=t}call(...e){return this.func(...e)}}e.exports={Keywords:{TRUE:["true","pravda","wahr"],FALSE:["false","nepravda","unwahr"],IF:["if","pokud","falls"],ELSE:["else","jinak","sonst"],WHILE:["while","dokud","soweit"]},Errors:s,Interruptions:{USER_SUSSPEND:"USER_SUSSPEND"},Types:r,SizeKeywords:t,WhileKeywords:["while","dokud","solange"],IfKeywords:["if","pokud","falls"],ElseKeywords:["else","jinak","sonst"],Block:class{constructor(e,t){this.statements=e,this.source=t}},Assignment:class extends i{constructor(e,t,s){super(s),this.isAssignment=!0,this.left=e,this.right=t}},While:class extends i{constructor(e,t,s){super(s),this.isWhile=!0,this.condition=e,this.body=t}},If:class extends i{constructor(e,t,s,r){super(r),this.isIf=!0,this.condition=e,this.body=t,this.elseBody=s}},Expression:class extends i{constructor(e,t){super(t),this.isExpression=!0,this.parts=e}},Variable:class{constructor(e,t){this.isVariable=!0,this.name=e,this.source=t}},UniOperator:class extends a{constructor(e,t){super(e),this.isUni=!0,this.precedence=this.getPrecedence(),this.source=t}apply(e){const t=function(t){switch(t){case"!":case"-":return e.neg;default:throw new n(s.INVALID_UNI_OPERATOR,null,this.op)}}(this.op);if(!t||!t.call)throw new n(s.OPERATOR_NOT_APPLICABLE,null,this.op);return t.call()}getPrecedence(){switch(this.op){case"!":case"-":return 14}}},BiOperator:class extends a{constructor(e,t){super(e),this.isBi=!0,this.precedence=this.getPrecedence(),this.source=t}apply(e,t){const i=function(t){switch(t){case"*":return e.mult;case"/":return e.div;case"%":return e.mod;case"+":return e.plus;case"-":return e.minus;case"<":return e.lt;case"<=":return e.le;case">":return e.gt;case">=":return e.ge;case"=":return e.eq;case"!=":return e.ne;case"&":return e.and;case"|":return e.or;default:throw new n(s.INVALID_BI_OPERATOR,null,this.op)}}(this.op);if(!i||!i.call){if("="===this.op)return new h(!1);throw new n(s.OPERATOR_NOT_APPLICABLE,null,this.op)}if("/"===this.op&&r.NUMBER===t.type&&0===t.value)throw new n(s.DIVISION_BY_ZERO,null,this.op);return i.call(t)}getPrecedence(){switch(this.op){case"*":case"/":case"%":return 12;case"+":case"-":return 11;case"<":case"<=":case">":case">=":return 9;case"=":case"!=":return 8;case"&":return 4;case"|":return 3}}},ArrayAccess:class extends a{constructor(e,t){super("[]",17),this.isAccess=!0,this.isArrayAccess=!0,this.indexes=e,this.source=t}apply(e,t,s){return e.element(t,s)}},ObjectAccess:class extends a{constructor(e,t){super(".",17),this.isAccess=!0,this.isObjectAccess=!0,this.attrName=e,this.source=t}apply(e,t){return e.attribute(this.attrName,t)}},FunctionCall:class extends a{constructor(e,t){super("()",17),this.isAccess=!0,this.isCall=!0,this.params=e,this.source=t}},VarReference:class{constructor(e,t){this.isReference=!0,this.varName=e,this.source=t}},ParseError:class extends n{constructor(e,t,s,r){super(e,t,s,r),this.isParseError=!0}},InterpretError:class extends n{constructor(e,t,s,r){super(e,t,s,r),this.isInterpretError=!0}},Interrupt:class{constructor(e){this.id=e,this.isLangInterruption=!0}},Object:o,Number:l,String:u,Boolean:h,Array:E,Function:class{constructor(e,t,s){this.type=r.FUNCTION,this.body=e,this.args=t,this.isFunction=!0,this.source=s,this.eq=new p((e=>new h(!1))),this.ne=new p((e=>new h(!0)))}},NativeFunction:p,Void:class extends c{constructor(e){super(null,e,r.VOID),this.eq=new p((e=>new h(!1))),this.ne=new p((e=>new h(!1)))}}}},"./src/ludolfc.js":(e,t,s)=>{const r=s("./src/lang.js"),n=s("./src/parser.js"),i=s("./src/interpret.js");e.exports={LudolfC:class{constructor(e={},t={}){this.parser=new n,this.interpret=new i(e,t)}async execute(e){try{const t=this.parser.parse(e);return await this.interpret.execute(t)}catch(t){if(t.isLangError&&(t.position||0===t.position)){const{line:s,col:r}=function(e,t){let s=1,r=1;for(let n=0;n<e.length&&n<=t;n++)r++,"\n"===e[n]&&(s++,r=1);return r=Math.max(1,r-1),{line:s,col:r}}(e,t.position);t.line=s,t.col=r}throw t}}hasVariable(e){return this.interpret.variables.hasVariable(e)}getVariable(e){return this.interpret.variables.getVariable(e)}},lang:r}},"./src/parser.js":(e,t,s)=>{const{Errors:r,Keywords:n,WhileKeywords:i,IfKeywords:a,ElseKeywords:o,Block:c,Assignment:l,While:u,If:h,Expression:E,Variable:p,UniOperator:w,BiOperator:f,ArrayAccess:d,ObjectAccess:O,FunctionCall:N,VarReference:v,ParseError:g,Object:T,Number:_,String:R,Boolean:b,Array:A,Function:P,Void:I}=s("./src/lang.js"),m=["!","-"],y=["*","/","%","+","-","<","<=",">",">=","=","!=","&","|"],S="ěščřžťďýáíéúůüöäñĚŠČŘŽŤĎÝÁÍÉÚŮÜÖÄÑß",C=`[a-zA-Z_${S}][a-zA-Z0-9_${S}]*`,x=`\\((\\s*(${C})\\s*(,\\s*(${C}))*)?\\s*\\)\\s*{(.|\\s)*\\}`;class D{constructor(e,t=0){this.code=e+"\n",this.pos=0,this.startingAt=t}move(e=1){this.pos+=e}currentChar(){return this.code[this.pos]}remaining(e){return this.code.substring(this.pos,Math.min(e?this.pos+e:this.code.length-1,this.code.length-1))}next(e=1){return this.code.substring(Math.min(this.pos+1,this.code.length-1),Math.min(this.pos+1+e,this.code.length-1))}finished(){return this.pos>=this.code.length}absPos(){return this.pos+this.startingAt-1}}function B(e,t=!1){for(;!e.finished()&&/\s/.test(e.currentChar())&&(!t||"\n"!==e.currentChar());)e.move()}function L(e,t){const s=new RegExp(t);for(;!e.finished()&&!s.test(e.currentChar());)e.move()}function U(e){return e=e.toLowerCase(),Object.values(n).some((t=>t.includes(e)))||i.includes(e)||a.includes(e)}function M(e){return"\n"!==e&&/\s+/g.test(e)}function X(e){return M(e)||F(e)||"("===e||")"===e||"["===e||"]"===e||"{"===e||"}"===e||"."===e||","===e||y.some((t=>t.startsWith(e)))||m.some((t=>t.startsWith(e)))}function F(e){return"\n"===e||";"===e}function Y(e){return'"'===e||"“"===e||"”"===e||"'"===e}function k(e,t){return t===e||"”"===e&&"“"===t}function V(e){return new RegExp(`^${C}$`).test(e)}function W(e){return i.some((t=>new RegExp(`^\\s*${t}\\s(.*)\\s{`).test(e)))}function G(e){return a.some((t=>new RegExp(`^\\s*${t}\\s(.*)\\s{`).test(e)))}function j(e){return o.some((t=>new RegExp(`^\\s*${t}\\s+{`).test(e)))}e.exports=class{constructor(){this.steps=0,this.maxSteps=1e6}parse(e){return this.steps=0,this.parseBlock(new D(e))}parseBlock(e){const t=[];for(;!e.finished();){const s=this.parseStatement(e);s&&t.push(s)}return new c(t,e.absPos())}parseStatement(e){this._stepper();let t="",s=null,n=!1;const i={arrays:0,objects:0};for(;!e.finished();e.move()){this._stepper();const o=e.currentChar();if(a=e.remaining(),new RegExp("^//").test(a))L(e,"\\n");else{if(!n&&Y(o)){let s=o;do{t+=s,e.move(),s=e.currentChar()}while(!e.finished()&&!k(s,o))}if(s||!M(o)||!M(t.charAt(t.length-1))){if(s&&o!==s)throw new g(r.EXPECTED_SYMBOL,e.absPos(),s,o);if("="!==s||o!==s){if("["===o&&i.arrays++,"]"===o&&i.arrays--,"{"===o&&i.objects++,"}"===o&&i.objects--,F(o)&&!i.arrays&&!i.objects){e.move();break}if(W(e.remaining())){if(t.length)throw new g(r.UNEXPECTED_SYMBOL,e.absPos(),t);B(e),L(e,"\\s");const s=this.parseWhile(e);if(B(e,!0),!F(e.currentChar()))throw new g(r.EXPEXTED_STATEMENT_END,e.absPos());return s}if(G(e.remaining())){if(t.length)throw new g(r.UNEXPECTED_SYMBOL,t);B(e),L(e,"\\s");const s=this.parseIf(e);if(B(e,!0),j(e.remaining())&&(B(e),L(e,"\\s"),s.elseBody=this.parseBody(e),B(e,!0)),!F(e.currentChar()))throw new g(r.EXPEXTED_STATEMENT_END,e.absPos());if(!s.elseBody&&(B(e),j(e.remaining())&&(B(e),L(e,"\\s"),s.elseBody=this.parseBody(e),B(e,!0),!F(e.currentChar()))))throw new g(r.EXPEXTED_STATEMENT_END,e.absPos());return s}if(":"!==o||i.objects){if(n){const s=this.parseExpression(e,i);if(t=t.trim(),V(t)){const r=new p(t,e.absPos());return new l(r,s,e.absPos())}{const n=this.parseExpression(new D(t,e.absPos()-t.length),{});if(!n||n.parts.some((e=>e.isOperator&&!e.isAccess)))throw new g(r.INVALID_IDENTIFIER,e.absPos(),t);return new l(n,s,e.absPos())}}t+=o}else{if(!t.trim().length)throw new g(r.UNEXPECTED_SYMBOL,e.absPos(),o);if(U(t.trim()))throw new g(r.UNEXPEXTED_KEYWORD,e.absPos(),o);s="="}}else n=!0,s=null}}}var a;if(t.length)return this.parseExpression(new D(t,e.absPos()-t.length),{})}parseExpression(e,t,s=null){this._stepper();const n=[];for(;!e.finished();){this._stepper();const l=e.currentChar();if(M(l)){e.move();continue}if(F(l)||")"===l||"]"===l||"}"===l||","===l){if(!(")"!==l&&"]"!==l&&"}"!==l||(s||s===l)&&n.length))throw new g(r.UNEXPECTED_SYMBOL,e.absPos(),l);if(n.length){if(n[n.length-1].isOperator&&!n[n.length-1].isAccess)throw new g(r.UNEVEN_OPERATORS,e.absPos());return new E(n,e.absPos())}e.move();continue}if(a=e.remaining(),new RegExp(`^${x}`).test(a)){if(n.length&&!n[n.length-1].isOperator)throw new g(r.UNEXPECTED_SYMBOL,e.absPos(),l);const t=this.parseFunction(e);n.push(t);continue}if("{"===l){if(!o())throw new g(r.UNEXPECTED_SYMBOL,e.absPos(),l);e.move();const s=this.readAttributes(e,")");if(B(e),"}"===e.currentChar()){const r=new T(s,e.absPos());for(let e of Object.values(s))e.isObject&&(e.parent=r);n.push(r),e.move(),t.objects--;continue}throw new g(r.UNEXPECTED_SYMBOL,e.absPos(),e.currentChar(),"}")}if("("===l){if(e.move(),c()){const t=this.readList(e,")");if(B(e),")"!==e.currentChar())throw new g(r.UNEXPECTED_SYMBOL,e.absPos(),e.currentChar(),")");var i=new N(t,e.absPos());n.push(i),e.move()}else{const s=this.parseExpression(e,t,!0);if(n.push(s),B(e),")"!==e.currentChar())throw new g(r.EXPECTED_SYMBOL,e.absPos(),")");e.move()}continue}if("."===l&&c()){e.move();const t=this.readIdentifier(e);n.push(new O(t,e.absPos()));continue}if("["===l){if(e.move(),c()){const t=this.readList(e,"]");if(B(e),!t.length)throw new g(r.ARRAY_INDEX_MISSING,e.absPos());if("]"!==e.currentChar())throw new g(r.UNEXPECTED_SYMBOL,e.absPos(),e.currentChar(),"]");if(t.some((e=>!e.isExpression||!e.parts.length)))throw new g(r.ARRAY_INDEX_NOT_NUMBER,e.absPos());e.move(),n.push(new d(t,e.absPos()))}else{const s=this.readList(e,"]");if(B(e),"]"!==e.currentChar())throw new g(r.UNEXPECTED_SYMBOL,e.absPos(),e.currentChar(),"]");n.push(new A(s,e.absPos())),e.move(),t.arrays--}continue}if(o()){if(m.includes(l)){if(n.push(new w(l,e.absPos())),e.move(),M(e.currentChar()))throw new g(r.UNEXPECTED_SYMBOL,e.absPos(),e.currentChar());continue}}else if(c()){const t=e.remaining(2);if(y.includes(t)){n.push(new f(t,e.absPos())),e.move(t.length);continue}if(y.includes(l)){n.push(new f(l,e.absPos())),e.move();continue}}if(n.length&&(!n[n.length-1].isOperator||n[n.length-1].isAccess))throw new g(r.UNEXPECTED_SYMBOL,e.absPos(),e.currentChar());const u=this.parseMemberExpression(e);n.push(u)}var a;function o(){return!n.length||n[n.length-1].isOperator&&!n[n.length-1].isAccess}function c(){return n.length&&(!n[n.length-1].isOperator||n[n.length-1].isAccess)}}parseMemberExpression(e){this._stepper();let t="";for(;!e.finished();e.move()){this._stepper();const i=e.currentChar();if(X(i)){if("."===i&&/^(0|([1-9][0-9]*))$/.test(t)&&/[0-9]/.test(e.next())){t+=i;continue}if(n.TRUE.includes(t.toLowerCase()))return new b(!0,e.absPos());if(n.FALSE.includes(t.toLowerCase()))return new b(!1,e.absPos());if(s=t,!isNaN(s)&&!isNaN(parseFloat(s)))return new _(t.includes(".")?parseFloat(t):parseInt(t),e.absPos());if(V(t)||"$"===t)return new v(t,e.absPos());throw new g(r.UNEXPECTED_SYMBOL,e.absPos(),t)}if(Y(i))return e.move(),new R(this.readString(e,i),e.absPos());t+=i}var s}readList(e,t){if(B(e),t===e.currentChar())return[];{const s=[];do{const r=this.parseExpression(e,{},t);s.push(r),B(e)}while(","===e.currentChar()&&!e.finished());return s}}readAttributes(e){if(B(e),"}"===e.currentChar())return{};{const t={};let s=!0;do{s||e.move(),s=!1,B(e);const n=this.readIdentifier(e);if(t[n])throw new g(r.ATTRIBUTE_ALREADY_EXISTS,e.absPos(),n);if(B(e),":"!==e.currentChar())throw new g(r.EXPECTED_SYMBOL,e.absPos(),":",e.currentChar());e.move();const i=this.parseExpression(e,{},"}");t[n]=i,B(e)}while(","===e.currentChar()&&!e.finished());return t}}parseWhile(e){const t=this.readUntilBodyOpens(e),s=this.parseExpression(new D(t,e.absPos()-t.length),{},null),r=this.parseBody(e);return new u(s,r,e.absPos())}parseIf(e){const t=this.readUntilBodyOpens(e),s=this.parseExpression(new D(t,e.absPos()-t.length),{},null),r=this.parseBody(e);return new h(s,r,null,e.absPos())}parseFunction(e){const t=this.readArguments(e),s=this.parseBody(e);return new P(s,t,e.absPos())}readArguments(e){if(B(e),"("!==e.currentChar())throw new g(r.EXPECTED_SYMBOL,e.absPos(),"(",e.currentChar());e.move(),B(e);const t=[];let s=!0;for(;(","===e.currentChar()||")"!==e.currentChar())&&!e.finished();){s||e.move(),s=!1;const r=this.readIdentifier(e);t.push(r),B(e)}if(")"!==e.currentChar())throw new g(r.EXPECTED_SYMBOL,e.absPos(),")",e.currentChar());return e.move(),t}parseBody(e){if(B(e),"{"!==e.currentChar())throw new g(r.EXPECTED_SYMBOL,e.absPos(),"{",e.currentChar());e.move(),B(e);let t="",s=0;for(;(s||"}"!==e.currentChar())&&!e.finished();){const r=e.currentChar();t+=r,e.move(),"{"===r&&s++,"}"===r&&s--}if("}"!==e.currentChar())throw new g(r.EXPECTED_SYMBOL,e.absPos(),"}",e.currentChar());return e.move(),/^\s*$/.test(t)?new c([new I(e.absPos())],e.absPos()):this.parseBlock(new D(t,e.absPos()-t.length))}readString(e,t){let s="";for(;!e.finished();e.move()){const r=e.currentChar();if(k(r,t))return e.move(),s;s+=r}throw new g(r.UNEXPECTED_END,e.absPos())}readIdentifier(e){let t="";for(;!e.finished();e.move()){const s=e.currentChar();if(!M(s)){if(!new RegExp(`^${C}$`).test(t+s))break;t+=s}}if(t)return t;throw new g(r.EXPECTED_IDENTIFIER,e.absPos())}readUntilBodyOpens(e){let t=0,s=0,n="";for(;!e.finished();e.move()){const i=e.currentChar();if(Y(i))n+=this.readString(e,i);else{if("("===i)s++;else if(")"===i)s--;else if("{"===i){if(!t&&!s)break;t++}else if("}"===i&&(t--,t<0))throw new g(r.UNEXPECTED_SYMBOL,e.absPos(),i);n+=i}}if(n)return n}_stepper(){if(this.steps++,this.steps>this.maxSteps)throw new g(r.PARSER_STEPS_EXCEEDED,source.absPos())}}}},t={},s=function s(r){var n=t[r];if(void 0!==n)return n.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,s),i.exports}("./src/ludolfc.js");return s})(),e.exports=t()}},t={};function s(r){var n=t[r];if(void 0!==n)return n.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,s),i.exports}(()=>{"use strict";var e=s(385);const t=11,r=Math.floor(t/2),n=1,i=20,a=30,o=40,c=r,l=r,u=r,h=r-1;function E(e){return"VOID"===e.type?"":"ARRAY"===e.type?"["+e.value.map(E)+"]":"OBJECT"===e.type?"{"+Object.keys(e.value).map((t=>t+":"+E(e.value[t])))+"}":"BOOLEAN"===e.type?e.value?"<b>✓</b>":"<b>✗</b>":"STRING"===e.type?e.value:null!==e.value&&void 0!==e.value?E(e.value):e.isFunction?"[function]":"string"==typeof e?e:JSON.stringify(e)}const p=[];for(let e=0;e<t;e++)p[e]=[];for(let e=2;e<t-2;e++)for(let s=2;s<t-2;s++)p[e][s]=f(s,e,a,p[e][s]);for(let e=0;e<t;e++)for(let s=0;s<t;s++)p[e][s]=f(s,e,o,p[e][s]);p[c][l]=i,p[u][h]=0;const w=[];function f(e,s,n,i){let c=1;if(n===o){const r=Math.abs(e-(t-1)/2),n=Math.abs(s-(t-1)/2);c=Math.max(r,n)/15}else if(n===a&&(c=.3,e>r-2&&e<r+2||s>r-2&&s<r+2))return i;return Math.round(.3*Math.random()+c)?n:i}p.forEach(((e,t)=>w[t]=[...e]));const d={raw:p,mapped:function(t){const s=t.map((t=>n(t.map((t=>new e.lang.Number(t)))))),r=n(s);return r.isMap=!0,r;function n(t){const s=new e.lang.Array(t);return s.isProtected=!0,s}}(p),reset:()=>p.forEach(((e,t)=>e.map(((e,s)=>p[t][s]=e))))},O=1,N={x:u,y:h},v=new e.lang.Object({x:new e.lang.Number(N.x),y:new e.lang.Number(N.y)}),g={move:null},T={trapped:!1,charging:!1,energy:10},_=new e.lang.Number(T.energy);function R(){return T.charging=!1,!T.trapped}function b(){a===d.raw[N.x][N.y]&&(T.trapped=!0),T.energy-=O,_.value=T.energy}const A={position:v,positionRaw:N,energy:_,status:T,callback:g,up:new e.lang.NativeFunction((async()=>{console.debug("Robot up",JSON.stringify(N)),R()&&(N.y>=t-1||(N.y++,v.value.y.value++,b(),g.move&&await g.move()))})),down:new e.lang.NativeFunction((async()=>{console.debug("Robot down",JSON.stringify(N)),R()&&(N.y<=0||(N.y--,v.value.y.value--,b(),g.move&&await g.move()))})),right:new e.lang.NativeFunction((async()=>{console.debug("Robot right",JSON.stringify(N)),R()&&(N.x>=t-1||(N.x++,v.value.x.value++,b(),g.move&&await g.move()))})),left:new e.lang.NativeFunction((async()=>{console.debug("Robot left",JSON.stringify(N)),R()&&(N.x<=0||(N.x--,v.value.x.value--,b(),g.move&&await g.move()))})),avoid:new e.lang.NativeFunction((async()=>{console.debug("Robot avoid",JSON.stringify(N)),T.trapped=!1,g.move&&await g.move()})),charge:new e.lang.NativeFunction((async()=>{console.debug("Robot charge",JSON.stringify(N)),o===d.raw[N.x][N.y]&&(T.charging=!0,T.energy+=5,_.value=T.energy,d.raw[N.x][N.y]=0,g.move&&await g.move())})),reset:()=>{N.x=u,N.y=h,v.value.x.value=N.x,v.value.y.value=N.y,T.trapped=!1,T.energy=10}},P=new e.lang.Object(A);P.isRobot=!0,P.isProtected=!0,A.nahoru=A.up,A.hoch=A.up,A["dolů"]=A.down,A.runter=A.down,A.doprava=A.right,A.rechts=A.right,A.doleva=A.left,A.links=A.left,A.poloha=A.position,A.vyhnout=A.avoid,A.vermeiden=A.avoid,A["dobít"]=A.charge,A.aufladen=A.charge,A.energie=A.energy;const I={raw:A,mapped:P,reset:A.reset},m=I.raw,y={x:c,y:l},S=new e.lang.Object({x:new e.lang.Number(y.x),y:new e.lang.Number(y.y)}),C={position:()=>console.log("robot is not in the same position"),energy:()=>console.log("not enough energy"),start:()=>console.log("rocket is starting!!!")},x={position:S,positionRaw:y,callback:C,start:new e.lang.NativeFunction((async()=>(console.debug("Rocket start",m.status.energy),m.position.x!==y.x||m.position.y!==y.y?await C.position():m.status.energy<20?await C.energy():void await C.start())))},D=new e.lang.Object(x);D.isRocket=!0,D.isProtected=!0,x.poloha=x.position;const B={raw:x,mapped:D},L=document.getElementById("map"),U=document.getElementById("result");async function M(e,...t){if(!t||!t[0])return;t.some(r)&&F(1===t.length);const s=t.filter((e=>!r(e))).map((e=>E(e))).join(" ");function r(e){return e.isMap||e.isRobot||e.isRocket}console.log("display",s),U.innerHTML=s,await k(e)}async function X(...e){M(500,...e)}function F(e=!0){e&&Y();const t=d.raw,s=I.raw;s.status.charging&&X(s.status.energy);const r=t.length;let u="";for(let e=r-1;e>=0;e--){u+="<tr>";for(let c=0;c<r;c++){const l=E(c,e)&&!p(c,e)?n:t[c][e],w=l===n&&s.status.trapped?"trapped":l===n&&s.status.charging?"charging":"";u+=`<td class="map-cell map-${c}-${e} map-value-${h=l,h===n?"robot":h===i?"rocket":h===a?"pitfall":h===o?"energy":"sand"} ${w} `,0!==c&&0!==e&&c!==r-1&&e!==r-1||(u+="side "),0===c&&0===e?u+="corner bottom-left":0===e&&c===r-1?u+="corner bottom-right":e===r-1&&0===c?u+="corner top-left":e===r-1&&c===r-1&&(u+="corner top-right"),u+='">&nbsp;</td>'}u+="</tr>"}var h;function E(e,t){return e===s.positionRaw.x&&t===s.positionRaw.y}function p(e,t){return e===c&&t===l}L.innerHTML=u}function Y(){L.classList.remove("universe"),U.innerHTML="",L.innerHTML=""}function k(e=500){return new Promise((t=>setTimeout(t,e)))}I.raw.callback.move=async()=>{F(),await k()},B.raw.callback.start=async()=>{await M(1e3,"...1..."),await M(1e3,"🥳🚀🏠"),Y(),L.classList.add("universe")};let V=(localStorage.getItem("localization")||navigator.language||"en").substring(0,2);const W={en:'i := 3\nwhile i > 0 {\n  Display(i, "...")\n  i := i - 1\n}\nDisplay(Map)',de:'i := 3\nsolange i > 0 {\n  Anzeigen(i, "...")\n  i := i - 1\n}\nAnzeigen(Map)',cs:'i := 3\ndokud i > 0 {\n  Zobraz(i, "...")\n  i := i - 1\n}\nZobraz(Map)'};function G(){document.querySelectorAll(".localization:not(."+V+")").forEach((e=>e.classList.remove("current"))),document.querySelectorAll(".localization."+V).forEach((e=>e.classList.add("current")))}G();const j=()=>W[V],$=new e.lang.NativeFunction(((...e)=>X(...e))),J={Display:$,Zobraz:$,Anzeigen:$,Map:d.mapped,Mapa:d.mapped,Karte:d.mapped,Rocket:B.mapped,Raketa:B.mapped,Rakete:B.mapped,Ludolf:I.mapped};let H=!1;const K={isInterrupted:()=>H},q=new e.LudolfC(J,K),z=document.getElementById("code"),Z=document.getElementById("position"),Q=document.getElementById("errorMarker"),ee=document.querySelector(".line-numbers"),te=document.getElementById("display"),se=document.getElementById("result"),re=document.getElementById("runButton"),ne=document.querySelectorAll(".controls .char"),ie=document.getElementById("map");let ae,oe,ce=!1;function le(){const e=z.value.split("\n").length;ee.innerHTML=Array(e).fill("<span></span>").join("")}function ue(e){e=e.replace("&lt;","<").replace("&gt;",">");const t=z.selectionStart,s=z.selectionEnd;z.value=z.value.substring(0,t)+e+z.value.substring(s),z.selectionEnd=t+1,z.focus()}function he(){const e=z.value,t=z.selectionEnd;let s=1,r=1;for(let n=0;n<e.length&&n<t;n++)r++,"\n"===e[n]&&(s++,r=1);Z.innerHTML=s+":"+r}function Ee(e,t){if(pe(),!e||!t)return;ae=e,oe=t;let{top:s}=a(ee);const{left:r}=a(z);s+=ee.childNodes[0].offsetHeight*(e-1);const n=Q.offsetWidth,i=Q.cloneNode(!0);function a(e){let t=0,s=0;for(;null!==e;)t+=e.offsetTop,s+=e.offsetLeft,e=e.offsetParent;return{top:t,left:s}}i.id=Q.id+"-copy",i.style.visibility="visible",i.style.letterSpacing=4*n+"px",i.style.top=s+"px",i.style.left=r+n+(n*t-3*n)+"px",Q.parentNode.insertBefore(i,Q)}function pe(){const e=document.getElementById(Q.id+"-copy");e&&e.remove(),ae=null,oe=null}function we(){localStorage.setItem("ludolfcCode",z.value)}function fe(){const e=localStorage.getItem("ludolfcCode");z.value=e||j()}function de(){te.style.height=te.offsetWidth+"px",ae&&oe&&Ee(ae,oe)}re.addEventListener("click",(async()=>{if(ce)H=!0;else{ce=!0,pe(),Y(),we(),re.classList.remove("run"),re.classList.add("stop"),ie.classList.remove("interrupted"),d.reset(),I.reset(),se.classList.contains("error")&&se.classList.remove("error");try{X(await q.execute(z.value))}catch(e){if(ie.classList.add("interrupted"),e.isLangInterruption)return void(se.innerHTML+='\n<div class="error">❌⛔❌</div>');if(console.error(e),se.classList.contains("error")||se.classList.add("error"),e.isLangError){const t=e.line||0,s=e.col||0;se.innerHTML=(e.isParseError?"PARSE ":"")+"ERROR"+(t&&s?" (ln "+t+", col "+s+")":"")+":<br>"+e.message,Ee(t,e.col)}else se.innerHTML="ERROR "+e}finally{re.classList.add("run"),re.classList.remove("stop"),H=!1,ce=!1}}})),fe(),le(),z.addEventListener("keyup",(e=>{he(),le(),pe(),we()})),z.addEventListener("keydown",(e=>{"Tab"===e.key&&(ue("  "),e.preventDefault())})),z.addEventListener("mouseup",(e=>he())),ne.forEach((e=>e.addEventListener("click",(t=>ue(e.innerHTML))))),de(),addEventListener("resize",(e=>de())),document.querySelectorAll(".localization-control").forEach((e=>e.addEventListener("click",(()=>{var t;t=e.getAttribute("lang"),V=t||"en",localStorage.setItem("localization",V),G(),fe()}))))})()})();