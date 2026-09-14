/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var pe=()=>({checkValidity(t){let e=t.input,o={message:"",isValid:!0,invalidKeys:[]};if(!e)return o;let r=!0;if("checkValidity"in e&&(r=e.checkValidity()),r)return o;if(o.isValid=!1,"validationMessage"in e&&(o.message=e.validationMessage),!("validity"in e))return o.invalidKeys.push("customError"),o;for(let i in e.validity){if(i==="valid")continue;let a=i;e.validity[a]&&o.invalidKeys.push(a)}return o}});/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var me=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var ui=Object.defineProperty,pi=Object.getOwnPropertyDescriptor,yo=t=>{throw TypeError(t)},s=(t,e,o,r)=>{for(var i=r>1?void 0:r?pi(e,o):e,a=t.length-1,n;a>=0;a--)(n=t[a])&&(i=(r?n(e,o,i):n(i))||i);return r&&i&&ui(e,o,i),i},Co=(t,e,o)=>e.has(t)||yo("Cannot "+o),xo=(t,e,o)=>(Co(t,e,"read from private field"),o?o.call(t):e.get(t)),Lo=(t,e,o)=>e.has(t)?yo("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),Ao=(t,e,o,r)=>(Co(t,e,"write to private field"),r?r.call(t,o):e.set(t,o),o);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var fe=globalThis,we=fe.ShadowRoot&&(fe.ShadyCSS===void 0||fe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,We=Symbol(),So=new WeakMap,Kt=class{constructor(e,o,r){if(this._$cssResult$=!0,r!==We)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o,o=this.t;if(we&&e===void 0){let r=o!==void 0&&o.length===1;r&&(e=So.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&So.set(o,e))}return e}toString(){return this.cssText}},zo=t=>new Kt(typeof t=="string"?t:t+"",void 0,We),A=(t,...e)=>{let o=t.length===1?t[0]:e.reduce((r,i,a)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[a+1],t[0]);return new Kt(o,t,We)},Eo=(t,e)=>{if(we)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of e){let r=document.createElement("style"),i=fe.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=o.cssText,t.appendChild(r)}},je=we?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(let r of e.cssRules)o+=r.cssText;return zo(o)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var{is:mi,defineProperty:fi,getOwnPropertyDescriptor:wi,getOwnPropertyNames:gi,getOwnPropertySymbols:vi,getPrototypeOf:bi}=Object,ge=globalThis,$o=ge.trustedTypes,yi=$o?$o.emptyScript:"",Ci=ge.reactiveElementPolyfillSupport,Gt=(t,e)=>t,Zt={toAttribute(t,e){switch(e){case Boolean:t=t?yi:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},ve=(t,e)=>!mi(t,e),_o={attribute:!0,type:String,converter:Zt,reflect:!1,useDefault:!1,hasChanged:ve};Symbol.metadata??=Symbol("metadata"),ge.litPropertyMetadata??=new WeakMap;var ct=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=_o){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){let r=Symbol(),i=this.getPropertyDescriptor(e,r,o);i!==void 0&&fi(this.prototype,e,i)}}static getPropertyDescriptor(e,o,r){let{get:i,set:a}=wi(this.prototype,e)??{get(){return this[o]},set(n){this[o]=n}};return{get:i,set(n){let l=i?.call(this);a?.call(this,n),this.requestUpdate(e,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_o}static _$Ei(){if(this.hasOwnProperty(Gt("elementProperties")))return;let e=bi(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Gt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Gt("properties"))){let o=this.properties,r=[...gi(o),...vi(o)];for(let i of r)this.createProperty(i,o[i])}let e=this[Symbol.metadata];if(e!==null){let o=litPropertyMetadata.get(e);if(o!==void 0)for(let[r,i]of o)this.elementProperties.set(r,i)}this._$Eh=new Map;for(let[o,r]of this.elementProperties){let i=this._$Eu(o,r);i!==void 0&&this._$Eh.set(i,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let o=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let i of r)o.unshift(je(i))}else e!==void 0&&o.push(je(e));return o}static _$Eu(e,o){let r=o.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,o=this.constructor.elementProperties;for(let r of o.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Eo(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,r){this._$AK(e,r)}_$ET(e,o){let r=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,r);if(i!==void 0&&r.reflect===!0){let a=(r.converter?.toAttribute!==void 0?r.converter:Zt).toAttribute(o,r.type);this._$Em=e,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,o){let r=this.constructor,i=r._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let a=r.getPropertyOptions(i),n=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:Zt;this._$Em=i;let l=n.fromAttribute(o,a.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(e,o,r,i=!1,a){if(e!==void 0){let n=this.constructor;if(i===!1&&(a=this[e]),r??=n.getPropertyOptions(e),!((r.hasChanged??ve)(a,o)||r.useDefault&&r.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,o,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:r,reflect:i,wrapped:a},n){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??o??this[e]),a!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(o=void 0),this._$AL.set(e,o)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[i,a]of r){let{wrapped:n}=a,l=this[i];n!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,a,l)}}let e=!1,o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(o)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(e){}firstUpdated(e){}};ct.elementStyles=[],ct.shadowRootOptions={mode:"open"},ct[Gt("elementProperties")]=new Map,ct[Gt("finalized")]=new Map,Ci?.({ReactiveElement:ct}),(ge.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ye=globalThis,ko=t=>t,be=Ye.trustedTypes,Oo=be?be.createPolicy("lit-html",{createHTML:t=>t}):void 0,Ke="$lit$",dt=`lit$${Math.random().toFixed(9).slice(2)}$`,Ge="?"+dt,xi=`<${Ge}>`,zt=document,Qt=()=>zt.createComment(""),te=t=>t===null||typeof t!="object"&&typeof t!="function",Ze=Array.isArray,Do=t=>Ze(t)||typeof t?.[Symbol.iterator]=="function",Xe=`[ 	
\f\r]`,Jt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Po=/-->/g,Ro=/>/g,At=RegExp(`>|${Xe}(?:([^\\s"'>=/]+)(${Xe}*=${Xe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Mo=/'/g,To=/"/g,Bo=/^(?:script|style|textarea|title)$/i,Je=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),z=Je(1),Io=Je(2),qo=Je(3),B=Symbol.for("lit-noChange"),S=Symbol.for("lit-nothing"),Fo=new WeakMap,St=zt.createTreeWalker(zt,129);function Vo(t,e){if(!Ze(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Oo!==void 0?Oo.createHTML(e):e}var No=(t,e)=>{let o=t.length-1,r=[],i,a=e===2?"<svg>":e===3?"<math>":"",n=Jt;for(let l=0;l<o;l++){let c=t[l],h,u,p=-1,f=0;for(;f<c.length&&(n.lastIndex=f,u=n.exec(c),u!==null);)f=n.lastIndex,n===Jt?u[1]==="!--"?n=Po:u[1]!==void 0?n=Ro:u[2]!==void 0?(Bo.test(u[2])&&(i=RegExp("</"+u[2],"g")),n=At):u[3]!==void 0&&(n=At):n===At?u[0]===">"?(n=i??Jt,p=-1):u[1]===void 0?p=-2:(p=n.lastIndex-u[2].length,h=u[1],n=u[3]===void 0?At:u[3]==='"'?To:Mo):n===To||n===Mo?n=At:n===Po||n===Ro?n=Jt:(n=At,i=void 0);let m=n===At&&t[l+1].startsWith("/>")?" ":"";a+=n===Jt?c+xi:p>=0?(r.push(h),c.slice(0,p)+Ke+c.slice(p)+dt+m):c+dt+(p===-2?l:m)}return[Vo(t,a+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},ee=class t{constructor({strings:e,_$litType$:o},r){let i;this.parts=[];let a=0,n=0,l=e.length-1,c=this.parts,[h,u]=No(e,o);if(this.el=t.createElement(h,r),St.currentNode=this.el.content,o===2||o===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=St.nextNode())!==null&&c.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let p of i.getAttributeNames())if(p.endsWith(Ke)){let f=u[n++],m=i.getAttribute(p).split(dt),w=/([.?@])?(.*)/.exec(f);c.push({type:1,index:a,name:w[2],strings:m,ctor:w[1]==="."?Ce:w[1]==="?"?xe:w[1]==="@"?Le:$t}),i.removeAttribute(p)}else p.startsWith(dt)&&(c.push({type:6,index:a}),i.removeAttribute(p));if(Bo.test(i.tagName)){let p=i.textContent.split(dt),f=p.length-1;if(f>0){i.textContent=be?be.emptyScript:"";for(let m=0;m<f;m++)i.append(p[m],Qt()),St.nextNode(),c.push({type:2,index:++a});i.append(p[f],Qt())}}}else if(i.nodeType===8)if(i.data===Ge)c.push({type:2,index:a});else{let p=-1;for(;(p=i.data.indexOf(dt,p+1))!==-1;)c.push({type:7,index:a}),p+=dt.length-1}a++}}static createElement(e,o){let r=zt.createElement("template");return r.innerHTML=e,r}};function Et(t,e,o=t,r){if(e===B)return e;let i=r!==void 0?o._$Co?.[r]:o._$Cl,a=te(e)?void 0:e._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(t),i._$AT(t,o,r)),r!==void 0?(o._$Co??=[])[r]=i:o._$Cl=i),i!==void 0&&(e=Et(t,i._$AS(t,e.values),i,r)),e}var ye=class{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:o},parts:r}=this._$AD,i=(e?.creationScope??zt).importNode(o,!0);St.currentNode=i;let a=St.nextNode(),n=0,l=0,c=r[0];for(;c!==void 0;){if(n===c.index){let h;c.type===2?h=new Dt(a,a.nextSibling,this,e):c.type===1?h=new c.ctor(a,c.name,c.strings,this,e):c.type===6&&(h=new Ae(a,this,e)),this._$AV.push(h),c=r[++l]}n!==c?.index&&(a=St.nextNode(),n++)}return St.currentNode=zt,i}p(e){let o=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,o),o+=r.strings.length-2):r._$AI(e[o])),o++}},Dt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,r,i){this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=Et(this,e,o),te(e)?e===S||e==null||e===""?(this._$AH!==S&&this._$AR(),this._$AH=S):e!==this._$AH&&e!==B&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Do(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==S&&te(this._$AH)?this._$AA.nextSibling.data=e:this.T(zt.createTextNode(e)),this._$AH=e}$(e){let{values:o,_$litType$:r}=e,i=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=ee.createElement(Vo(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(o);else{let a=new ye(i,this),n=a.u(this.options);a.p(o),this.T(n),this._$AH=a}}_$AC(e){let o=Fo.get(e.strings);return o===void 0&&Fo.set(e.strings,o=new ee(e)),o}k(e){Ze(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,r,i=0;for(let a of e)i===o.length?o.push(r=new t(this.O(Qt()),this.O(Qt()),this,this.options)):r=o[i],r._$AI(a),i++;i<o.length&&(this._$AR(r&&r._$AB.nextSibling,i),o.length=i)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){let r=ko(e).nextSibling;ko(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},$t=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,r,i,a){this.type=1,this._$AH=S,this._$AN=void 0,this.element=e,this.name=o,this._$AM=i,this.options=a,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=S}_$AI(e,o=this,r,i){let a=this.strings,n=!1;if(a===void 0)e=Et(this,e,o,0),n=!te(e)||e!==this._$AH&&e!==B,n&&(this._$AH=e);else{let l=e,c,h;for(e=a[0],c=0;c<a.length-1;c++)h=Et(this,l[r+c],o,c),h===B&&(h=this._$AH[c]),n||=!te(h)||h!==this._$AH[c],h===S?e=S:e!==S&&(e+=(h??"")+a[c+1]),this._$AH[c]=h}n&&!i&&this.j(e)}j(e){e===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ce=class extends $t{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===S?void 0:e}},xe=class extends $t{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==S)}},Le=class extends $t{constructor(e,o,r,i,a){super(e,o,r,i,a),this.type=5}_$AI(e,o=this){if((e=Et(this,e,o,0)??S)===B)return;let r=this._$AH,i=e===S&&r!==S||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,a=e!==S&&(r===S||i);i&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ae=class{constructor(e,o,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){Et(this,e)}},Uo={M:Ke,P:dt,A:Ge,C:1,L:No,R:ye,D:Do,V:Et,I:Dt,H:$t,N:xe,U:Le,B:Ce,F:Ae},Li=Ye.litHtmlPolyfillSupport;Li?.(ee,Dt),(Ye.litHtmlVersions??=[]).push("3.3.3");var Ho=(t,e,o)=>{let r=o?.renderBefore??e,i=r._$litPart$;if(i===void 0){let a=o?.renderBefore??null;r._$litPart$=i=new Dt(e.insertBefore(Qt(),a),a,void 0,o??{})}return i._$AI(t),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Qe=globalThis,wt=class extends ct{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ho(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};wt._$litElement$=!0,wt.finalized=!0,Qe.litElementHydrateSupport?.({LitElement:wt});var Ai=Qe.litElementPolyfillSupport;Ai?.({LitElement:wt});(Qe.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var M=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Si={attribute:!0,type:String,converter:Zt,reflect:!1,hasChanged:ve},zi=(t=Si,e,o)=>{let{kind:r,metadata:i}=o,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r==="setter"&&((t=Object.create(t)).wrapped=!0),a.set(o.name,t),r==="accessor"){let{name:n}=o;return{set(l){let c=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,c,t,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,t,l),l}}}if(r==="setter"){let{name:n}=o;return function(l){let c=this[n];e.call(this,l),this.requestUpdate(n,c,t,!0,l)}}throw Error("Unsupported decorator location: "+r)};function d(t){return(e,o)=>typeof o=="object"?zi(t,e,o):((r,i,a)=>{let n=i.hasOwnProperty(a);return i.constructor.createProperty(a,r),n?Object.getOwnPropertyDescriptor(i,a):void 0})(t,e,o)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function j(t){return d({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var _t=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function P(t,e){return(o,r,i)=>{let a=n=>n.renderRoot?.querySelector(t)??null;if(e){let{get:n,set:l}=typeof r=="object"?o:i??(()=>{let c=Symbol();return{get(){return this[c]},set(h){this[c]=h}}})();return _t(o,r,{get(){let c=n.call(this);return c===void 0&&(c=a(this),(c!==null||this.hasUpdated)&&l.call(this,c)),c}})}return _t(o,r,{get(){return a(this)}})}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var Ei=A`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden],
  :host([hidden]) {
    display: none !important;
  }
`,$i=/;\s+$/;function _i(t){return t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`)}function Wo(t){let{property:e,value:o,element:r}=t;if(o){let i=r.getAttribute("style")||"";i&&(i.match($i)||(i+=";"),i+=" ");let a=`${e}: ${o}`;return i.includes(a)?void 0:`${i}${a};`}return null}var Se,F=class extends wt{constructor(){super(),Lo(this,Se,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,o)=>{if(this.internals?.states)try{o?this.internals.states.add(e):this.internals.states.delete(e)}catch(r){if(String(r).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw r}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let t=this.constructor;for(let[e,o]of t.elementProperties)o.default==="inherit"&&o.initial!==void 0&&typeof e=="string"&&this.customStates.set(`initial-${e}-${o.initial}`,!0)}static get styles(){let t=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[Ei,...t]}connectedCallback(){super.connectedCallback(),this.didSSR||this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `)),this.didSSR&&this.updateComplete.then(()=>{this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `))})}attributeChangedCallback(t,e,o){xo(this,Se)||(this.constructor.elementProperties.forEach((r,i)=>{r.reflect&&this[i]!=null&&this.initialReflectedProperties.set(i,this[i])}),Ao(this,Se,!0)),super.attributeChangedCallback(t,e,o)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,o)=>{t.has(o)&&this[o]==null&&(this[o]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(e){if(this.didSSR&&!this.hasUpdated){let o=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});o.error=e,this.dispatchEvent(o)}throw e}}setStyle(t,e){if(!this.style){let o=Wo({property:_i(t),value:e,element:this});o&&this.setAttribute("style",o);return}this.style[t]=e}setStyleProperty(t,e){if(!this.style){let o=Wo({property:t,value:e,element:this});o&&this.setAttribute("style",o);return}this.style.setProperty(t,e)}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};Se=new WeakMap;s([d()],F.prototype,"dir",2);s([d()],F.prototype,"lang",2);s([d({type:Boolean,reflect:!0,attribute:"did-ssr"})],F.prototype,"didSSR",2);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var ki=()=>({observedAttributes:["custom-error"],checkValidity(t){let e={message:"",isValid:!0,invalidKeys:[]};return t.customError&&(e.message=t.customError,e.isValid=!1,e.invalidKeys=["customError"]),e}}),I=class extends F{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=t=>{t.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new me))},this.handleInteraction=t=>{let e=this.emittedEvents;e.includes(t.type)||e.push(t.type),e.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},"addEventListener"in this&&this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[ki()]}static get observedAttributes(){let t=new Set(super.observedAttributes||[]);for(let e of this.validators)if(e.observedAttributes)for(let o of e.observedAttributes)t.add(o);return[...t]}connectedCallback(){super.connectedCallback(),this.didSSR&&!this.hasUpdated?this.updateComplete.then(()=>{this.updateValidity()}):this.updateValidity(),this.assumeInteractionOn.forEach(t=>{this.addEventListener?.(t,this.handleInteraction)})}firstUpdated(...t){super.firstUpdated(...t),this.updateValidity()}willUpdate(t){if(!!1&&t.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),t.has("value")||t.has("disabled")||t.has("defaultValue")){let e=this.value;this.updateFormValue(e)}t.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!!1&&!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),super.willUpdate(t),this.didSSR&&!this.hasUpdated?this.updateComplete.then(()=>this.updateValidity()):this.updateValidity()}updateFormValue(t){if(Array.isArray(t)){if(this.name){let e=new FormData;for(let o of t)e.append(this.name,o);this.setValue(e,e)}}else this.setValue(t,t)}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(t){t?this.setAttribute("form",t):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...t){let e=t[0],o=t[1],r=t[2];r||(r=this.validationTarget),this.internals.setValidity(e,o,r||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){let t=!!this.required,e=this.internals.validity.valid,o=this.hasInteracted;this.customStates.set("required",t),this.customStates.set("optional",!t),this.customStates.set("invalid",!e),this.customStates.set("valid",e),this.customStates.set("user-invalid",!e&&o),this.customStates.set("user-valid",e&&o)}setCustomValidity(t){if(!t){this.customError=null,this.setValidity({});return}this.customError=t,this.setValidity({customError:!0},t,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(t){this.disabled=t,this.updateValidity()}formStateRestoreCallback(t,e){this.didSSR&&!this.hasUpdated?this.updateComplete.then(()=>{this.value=t,e==="restore"&&this.resetValidity(),this.updateValidity()}):(this.value=t,e==="restore"&&this.resetValidity(),this.updateValidity())}setValue(...t){let[e,o]=t;this.internals.setFormValue(e,o)}get allValidators(){let t=this.constructor.validators||[],e=this.validators||[];return[...t,...e]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}let t=this.allValidators;if(!t?.length)return;let e={customError:!!this.customError},o=this.validationTarget||this.input||void 0,r="";for(let i of t){let{isValid:a,message:n,invalidKeys:l}=i.checkValidity(this);a||(r||(r=n),l?.length>=0&&l.forEach(c=>e[c]=!0))}r||(r=this.validationMessage),this.setValidity(e,r,o)}};I.formAssociated=!0;s([d({reflect:!0})],I.prototype,"name",2);s([d({type:Boolean})],I.prototype,"disabled",2);s([d({state:!0,attribute:!1})],I.prototype,"valueHasChanged",2);s([d({state:!0,attribute:!1})],I.prototype,"hasInteracted",2);s([d({attribute:"custom-error",reflect:!0})],I.prototype,"customError",2);s([d({attribute:!1,state:!0,type:Object})],I.prototype,"validity",1);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var jo={small:"s",medium:"m",large:"l"},Xo=new Set;function gt(t,e){e in jo&&!Xo.has(`${t}:${e}`)&&(Xo.add(`${t}:${e}`),console.warn(`[${t}] size="${e}" is deprecated. Use size="${jo[e]}" instead. The long-form value will be removed in the next major version.`))}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var Bt=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=o=>{let r=o.target;(this.slotNames.includes("[default]")&&!r.name||r.name&&this.slotNames.includes(r.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return this.host.childNodes?[...this.host.childNodes].some(t=>{if(t.nodeType===Node.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===Node.ELEMENT_NODE){let e=t;if(e.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1}):!1}hasNamedSlot(t){return this.host.querySelector?.(`:scope > [slot="${t}"]`)!==null}test(t,e){return e&&this.host.didSSR&&!this.host.hasUpdated?!!this.host[e]:t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){let t=this.host.shadowRoot;t&&"addEventListener"in t&&t.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){let t=this.host.shadowRoot;t&&"removeEventListener"in t&&t.removeEventListener("slotchange",this.handleSlotChange)}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var vt=A`
  :host([size='xs']) {
    font-size: var(--wa-font-size-xs);
  }

  :host([size='s']),
  :host([size='small']) {
    font-size: var(--wa-font-size-s);
  }

  :host([size='m']),
  :host([size='medium']) {
    font-size: var(--wa-font-size-m);
  }

  :host([size='l']),
  :host([size='large']) {
    font-size: var(--wa-font-size-l);
  }

  :host([size='xl']) {
    font-size: var(--wa-font-size-xl);
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var Yo=A`
  @layer wa-component {
    :host {
      display: inline-block;

      /* Workaround because Chrome doesn't like :host(:has()) below
       * https://issues.chromium.org/issues/40062355
       * Firefox doesn't like this nested rule, so both are needed */
      &:has(wa-badge) {
        position: relative;
      }
    }

    /* Apply relative positioning only when needed to position wa-badge
     * This avoids creating a new stacking context for every button */
    :host(:has(wa-badge)) {
      position: relative;
    }
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    transition-property: background, border, box-shadow, color, opacity, transform;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    transform-origin: center;
    cursor: pointer;
    padding: 0 var(--wa-form-control-padding-inline);
    font-family: inherit;
    font-size: inherit;
    font-weight: var(--wa-font-weight-action);
    height: var(--wa-form-control-height);
    width: 100%;

    background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));

    border-color: transparent;
    color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-form-control-border-radius));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-form-control-border-radius));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-form-control-border-radius));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-form-control-border-radius));
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
  }

  /* Hover and active transforms */
  .button:not(.disabled):not(.loading) {
    @media (hover: hover) {
      &:hover {
        transform: var(--wa-button-transform-hover);
      }
    }
    &:active {
      transform: var(--wa-button-transform-active);
    }

    @media (prefers-reduced-motion: reduce) {
      &:hover,
      &:active {
        transform: none;
      }
    }
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='outlined']) {
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled-outlined']) {
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='accent']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
        var(--wa-color-mix-active)
      );
    }
  }

  /* Focus states */
  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled state */
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;

    /* When disabled, prevent mouse events from bubbling up from children */
    .button {
      pointer-events: none;
    }
  }

  /* Keep it last so Safari doesn't stop parsing this block */
  .button::-moz-focus-inner {
    border: 0;
  }

  /* Icon buttons */
  .button.is-icon-button {
    outline-offset: 2px;
    width: var(--wa-form-control-height);
    aspect-ratio: 1;
  }

  /* Icon buttons with a caret need to grow to fit both the icon and the caret */
  .button.is-icon-button.caret {
    width: auto;
    aspect-ratio: auto;
    min-width: var(--wa-form-control-height);
  }

  /* Pill modifier */
  :host([pill]) .button {
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-border-radius-pill));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-border-radius-pill));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-border-radius-pill));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-border-radius-pill));
  }

  /*
   * Label
   */

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .label {
    display: inline-block;
  }

  .is-icon-button .label {
    display: flex;
    justify-content: center;
  }

  .label::slotted(wa-icon) {
    align-self: center;
  }

  /*
   * Caret modifier
   */

  wa-icon[part='caret'] {
    display: flex;
    align-self: center;
    align-items: center;

    &::part(svg) {
      width: 0.875em;
      height: 0.875em;
    }

    .button:has(&) .end {
      display: none;
    }
  }

  /*
   * Loading modifier
   */

  .loading {
    position: relative;
    cursor: wait;

    .start,
    .label,
    .end,
    .caret {
      /* Hidden with opacity, not visibility, so the label stays in the accessibility tree */
      opacity: 0;

      /* Unlike visibility: hidden, opacity leaves the content clickable */
      pointer-events: none;
    }

    wa-spinner {
      --indicator-color: currentColor;
      --track-color: color-mix(in oklab, currentColor, transparent 90%);

      position: absolute;
      font-size: 1em;
      height: 1em;
      width: 1em;
      top: calc(50% - 0.5em);
      left: calc(50% - 0.5em);
    }
  }

  /*
   * Badges
   */

  .button ::slotted(wa-badge) {
    border-color: var(--wa-color-surface-default);
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  :host(:dir(rtl)) ::slotted(wa-badge) {
    translate: -50% -50%;
  }

  /*
  * Button spacing
  */

  slot[name='start']::slotted(*) {
    margin-inline-end: 0.75em;
  }

  slot[name='end']::slotted(*),
  .button:not(.visually-hidden-label) [part='caret'] {
    margin-inline-start: 0.75em;
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var ze=A`
  :where(:root),
  .wa-neutral,
  :host([variant='neutral']) {
    --wa-color-fill-loud: var(--wa-color-neutral-fill-loud);
    --wa-color-fill-normal: var(--wa-color-neutral-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-neutral-fill-quiet);
    --wa-color-border-loud: var(--wa-color-neutral-border-loud);
    --wa-color-border-normal: var(--wa-color-neutral-border-normal);
    --wa-color-border-quiet: var(--wa-color-neutral-border-quiet);
    --wa-color-on-loud: var(--wa-color-neutral-on-loud);
    --wa-color-on-normal: var(--wa-color-neutral-on-normal);
    --wa-color-on-quiet: var(--wa-color-neutral-on-quiet);
  }

  .wa-brand,
  :host([variant='brand']) {
    --wa-color-fill-loud: var(--wa-color-brand-fill-loud);
    --wa-color-fill-normal: var(--wa-color-brand-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-brand-fill-quiet);
    --wa-color-border-loud: var(--wa-color-brand-border-loud);
    --wa-color-border-normal: var(--wa-color-brand-border-normal);
    --wa-color-border-quiet: var(--wa-color-brand-border-quiet);
    --wa-color-on-loud: var(--wa-color-brand-on-loud);
    --wa-color-on-normal: var(--wa-color-brand-on-normal);
    --wa-color-on-quiet: var(--wa-color-brand-on-quiet);
  }

  .wa-success,
  :host([variant='success']) {
    --wa-color-fill-loud: var(--wa-color-success-fill-loud);
    --wa-color-fill-normal: var(--wa-color-success-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-success-fill-quiet);
    --wa-color-border-loud: var(--wa-color-success-border-loud);
    --wa-color-border-normal: var(--wa-color-success-border-normal);
    --wa-color-border-quiet: var(--wa-color-success-border-quiet);
    --wa-color-on-loud: var(--wa-color-success-on-loud);
    --wa-color-on-normal: var(--wa-color-success-on-normal);
    --wa-color-on-quiet: var(--wa-color-success-on-quiet);
  }

  .wa-warning,
  :host([variant='warning']) {
    --wa-color-fill-loud: var(--wa-color-warning-fill-loud);
    --wa-color-fill-normal: var(--wa-color-warning-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-warning-fill-quiet);
    --wa-color-border-loud: var(--wa-color-warning-border-loud);
    --wa-color-border-normal: var(--wa-color-warning-border-normal);
    --wa-color-border-quiet: var(--wa-color-warning-border-quiet);
    --wa-color-on-loud: var(--wa-color-warning-on-loud);
    --wa-color-on-normal: var(--wa-color-warning-on-normal);
    --wa-color-on-quiet: var(--wa-color-warning-on-quiet);
  }

  .wa-danger,
  :host([variant='danger']) {
    --wa-color-fill-loud: var(--wa-color-danger-fill-loud);
    --wa-color-fill-normal: var(--wa-color-danger-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-danger-fill-quiet);
    --wa-color-border-loud: var(--wa-color-danger-border-loud);
    --wa-color-border-normal: var(--wa-color-danger-border-normal);
    --wa-color-border-quiet: var(--wa-color-danger-border-quiet);
    --wa-color-on-loud: var(--wa-color-danger-on-loud);
    --wa-color-on-normal: var(--wa-color-danger-on-normal);
    --wa-color-on-quiet: var(--wa-color-danger-on-quiet);
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function _(t,e){let o={waitUntilFirstUpdate:!1,...e};return(r,i)=>{let{update:a}=r,n=Array.isArray(t)?t:[t];r.update=function(l){n.forEach(c=>{let h=c;if(l.has(h)){let u=l.get(h),p=this[h];u!==p&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[i](u,p)}}),a.call(this,l)}}}var to=new Set,It=new Map,ht,eo="ltr",oo="en",Ko=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Ko){let t=new MutationObserver(Go);eo=document.documentElement.dir||"ltr",oo=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function oe(...t){t.map(e=>{let o=e.$code.toLowerCase();It.has(o)?It.set(o,Object.assign(Object.assign({},It.get(o)),e)):It.set(o,e),ht||(ht=e)}),Go()}function Go(){Ko&&(eo=document.documentElement.dir||"ltr",oo=document.documentElement.lang||navigator.language),[...to.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}var Ee=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){to.add(this.host)}hostDisconnected(){to.delete(this.host)}dir(){return`${this.host.dir||eo}`.toLowerCase()}lang(){let e=`${this.host.lang||oo}`.toLowerCase().replace(/_/g,"-");try{return new Intl.Locale(e),e}catch{return ht?ht.$code.toLowerCase():"en"}}getTranslationData(e){var o,r;let i;try{i=new Intl.Locale(e.replace(/_/g,"-"))}catch{return{locale:void 0,language:"",region:"",primary:void 0,secondary:void 0}}let a=i.language.toLowerCase(),n=(r=(o=i.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&r!==void 0?r:"",l=It.get(`${a}-${n}`),c=It.get(a);return{locale:i,language:a,region:n,primary:l,secondary:c}}exists(e,o){var r;let{primary:i,secondary:a}=this.getTranslationData((r=o.lang)!==null&&r!==void 0?r:this.lang());return o=Object.assign({includeFallback:!1},o),!!(i&&i[e]||a&&a[e]||o.includeFallback&&ht&&ht[e])}term(e,...o){let{primary:r,secondary:i}=this.getTranslationData(this.lang()),a;if(r&&r[e])a=r[e];else if(i&&i[e])a=i[e];else if(ht&&ht[e])a=ht[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof a=="function"?a(...o):a}date(e,o){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),o).format(e)}number(e,o){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),o).format(e)}relativeTime(e,o,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(e,o)}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var Zo={$code:"en",$name:"English",$dir:"ltr",am:"AM",autosizeColumn:"Autosize column",captions:"Captions",carousel:"Carousel",chooseDate:"Choose date",chooseDecade:"Choose decade",chooseMonth:"Choose month",chooseTime:"Choose time",chooseYear:"Choose year",clearEntry:"Clear entry",clearFilter:"Clear filter",clearSort:"Clear sort",close:"Close",closeCalendar:"Close calendar",closeTimeInput:"Close time picker",collapseRow:"Collapse row",columnMenu:"Column options",columnMovedToPosition:(t,e,o)=>`${t} moved to position ${e} of ${o}`,columns:"Columns",compactPageXOfY:(t,e)=>`${t} of ${e}`,copied:"Copied",copy:"Copy",createOption:t=>`Create "${t}"`,currentlyPlaying:"currently playing",currentValue:"Current value",date:"Date",datePickerKeyboardHelp:"Use arrow keys to change values; press Alt+Down Arrow to open the calendar.",day:"Day",dayPeriod:"AM/PM",decrement:"Decrement",deselectAllRows:"Deselect all rows",dropFileHere:"Drop file here or click to browse",dropFilesHere:"Drop files here or click to browse",empty:"Empty",endDate:"End date",enterFullscreen:"Enter fullscreen",error:"Error",exitFullscreen:"Exit fullscreen",expandRow:"Expand row",filterByColumn:t=>`Filter by ${t}`,filterFrom:"From",filterMax:"Max",filterMin:"Min",filterTo:"To",firstPage:"First page",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hideColumn:"Hide column",hidePassword:"Hide password",hour:"Hour",incompleteDate:"Enter a valid date.",increment:"Increment",jumpBackwardX:t=>`Jump back ${t} pages`,jumpForwardX:t=>`Jump forward ${t} pages`,lastPage:"Last page",loading:"Loading",minute:"Minute",month:"Month",moreOptions:"More Options",mute:"Mute",nextDecade:"Next decade",nextMonth:"Next month",nextPage:"Next page",nextSlide:"Next slide",nextVideo:"Next Video",nextYear:"Next year",noData:"No data",noResults:"No matching results",now:"Now",numCharacters:t=>t===1?"1 character":`${t} characters`,numCharactersRemaining:t=>t===1?"1 character remaining":`${t} characters remaining`,numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,numRowsCopied:t=>t===1?"1 row copied":`${t} rows copied`,numRowsSelected:t=>t===1?"1 row selected":`${t} rows selected`,pageXOfY:(t,e)=>`Page ${t} of ${e}`,pagination:"Pagination",pause:"Pause",pauseAnimation:"Pause animation",pictureInPicture:"Picture in picture",pinLeft:"Pin left",pinRight:"Pin right",play:"Play",playAnimation:"Play animation",playbackSpeed:"Playback speed",playlist:"Playlist",pm:"PM",previousDecade:"Previous decade",previousMonth:"Previous month",previousPage:"Previous page",previousSlide:"Previous slide",previousVideo:"Previous video",previousYear:"Previous year",progress:"Progress",rangeTooLong:t=>t===1?"Select a range no longer than 1 day":`Select a range no longer than ${t} days`,rangeTooShort:t=>t===1?"Select a range at least 1 day long":`Select a range at least ${t} days long`,readonly:"Read-only",remove:"Remove",resetColumns:"Reset columns",resize:"Resize",resizeColumn:"Resize column",rowsPerPage:"Rows per page",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",search:"Search",second:"Second",seek:"Seek",seekProgress:(t,e)=>`${t} of ${e}`,selectAColorFromTheScreen:"Select a color from the screen",selectAllRows:"Select all rows",selected:"Selected",selectedDateLabel:t=>`Selected: ${t}`,selectedRangeLabel:t=>`Selected range: ${t}`,selectGroup:"Select group",selectionCleared:"Selection cleared",selectRow:"Select row",showingNofMRows:(t,e)=>`Showing ${t} of ${e} rows`,showingXtoYofZ:(t,e,o)=>`${t}\u2013${e} of ${o}`,showPassword:"Show password",slideNum:t=>`Slide ${t}`,sortAscending:"Sort ascending",sortColumn:"Sort column",sortDescending:"Sort descending",startDate:"Start date",time:"Time",timeInputKeyboardHelp:"Use arrow keys to change values; press Alt+Down Arrow to open the time picker.",today:"Today",toggleColorFormat:"Toggle color format",unmute:"Unmute",unpin:"Unpin",unpinColumn:"Unpin column",videoPlayer:"Video player",volume:"Volume",year:"Year",zoomIn:"Zoom in",zoomOut:"Zoom out"};oe(Zo);var Jo=Zo;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var W=class extends Ee{lang(){return this.host.didSSR&&!this.host.hasUpdated?this.host.lang||"en":super.lang()}};oe(Jo);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var G={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},qt=t=>(...e)=>({_$litDirective$:t,values:e}),bt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,r){this._$Ct=e,this._$AM=o,this._$Ci=r}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var q=qt(class extends bt{constructor(t){if(super(t),t.type!==G.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(let r in e)e[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(e)}let o=t.element.classList;for(let r of this.st)r in e||(o.remove(r),this.st.delete(r));for(let r in e){let i=!!e[r];i===this.st.has(r)||this.nt?.has(r)||(i?(o.add(r),this.st.add(r)):(o.remove(r),this.st.delete(r)))}return B}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var V=t=>t??S;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var tr=Symbol.for(""),Oi=t=>{if(t?.r===tr)return t?._$litStatic$};var ro=(t,...e)=>({_$litStatic$:e.reduce((o,r,i)=>o+(a=>{if(a._$litStatic$!==void 0)return a._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${a}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(r)+t[i+1],t[0]),r:tr}),Qo=new Map,io=t=>(e,...o)=>{let r=o.length,i,a,n=[],l=[],c,h=0,u=!1;for(;h<r;){for(c=e[h];h<r&&(a=o[h],(i=Oi(a))!==void 0);)c+=i+e[++h],u=!0;h!==r&&l.push(a),n.push(c),h++}if(h===r&&n.push(e[r]),u){let p=n.join("$$lit$$");(e=Qo.get(p))===void 0&&(n.raw=n,Qo.set(p,e=n)),o=l}return t(e,...o)},$e=io(z),es=io(Io),os=io(qo);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var b=class extends I{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new Bt(this,"[default]","start","end"),this.localize=new W(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="m",this.withCaret=!1,this.withStart=!1,this.withEnd=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button"}static get validators(){return[...super.validators,pe()]}handleSizeChange(){gt(this.localName,this.size)}constructLightDOMButton(){let t=document.createElement("button");for(let e of this.attributes)e.name!=="style"&&t.setAttribute(e.name,e.value);return t.type=this.type,t.style.position="absolute !important",t.style.width="0 !important",t.style.height="0 !important",t.style.clipPath="inset(50%) !important",t.style.overflow="hidden !important",t.style.whiteSpace="nowrap !important",this.name&&(t.name=this.name),t.value=this.value||"",t}handleClick(t){if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}if(this.type!=="submit"&&this.type!=="reset"||!this.getForm())return;let o=this.constructLightDOMButton();this.parentElement?.append(o),o.click(),o.remove()}handleInvalid(){this.dispatchEvent(new me)}handleLabelSlotChange(){let t=this.labelSlot.assignedNodes({flatten:!0}),e=!1,o=!1,r=!1,i=!1;[...t].forEach(a=>{if(a.nodeType===Node.ELEMENT_NODE){let n=a;n.localName==="wa-icon"?(o=!0,e||(e=n.label!==void 0)):i=!0}else a.nodeType===Node.TEXT_NODE&&(a.textContent?.trim()||"").length>0&&(r=!0)}),this.isIconButton=o&&!r&&!i,this.customStates.set("icon-button",this.isIconButton),this.isIconButton&&!e&&console.warn('Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.updateValidity()}handleHrefChange(){this.customStates.set("link",this.isLink())}handleLoadingChange(){this.customStates.set("loading",this.loading)}setValue(...t){}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){let t=this.isLink(),e=t?ro`a`:ro`button`;return $e`
      <${e}
        part="base button"
        class=${q({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()==="rtl","has-label":this.hasSlotController.test("[default]"),"has-start":this.hasSlotController.test("start","withStart"),"has-end":this.hasSlotController.test("end","withEnd"),"is-icon-button":this.isIconButton})}
        ?disabled=${V(t?void 0:this.disabled)}
        type=${V(t?void 0:this.type)}
        title=${this.title}
        name=${V(t?void 0:this.name)}
        value=${V(t?void 0:this.value)}
        href=${V(t?this.href:void 0)}
        target=${V(t?this.target:void 0)}
        download=${V(t?this.download:void 0)}
        rel=${V(t&&this.rel?this.rel:void 0)}
        role=${V(t?void 0:"button")}
        aria-disabled=${V(t&&this.disabled?"true":void 0)}
        aria-busy=${this.loading?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret?$e`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:""}
        ${this.loading?$e`<wa-spinner part="spinner"></wa-spinner>`:""}
      </${e}>
    `}};b.shadowRootOptions={...I.shadowRootOptions,delegatesFocus:!0};b.css=[Yo,ze,vt];s([P(".button")],b.prototype,"button",2);s([P("slot:not([name])")],b.prototype,"labelSlot",2);s([j()],b.prototype,"invalid",2);s([j()],b.prototype,"isIconButton",2);s([d()],b.prototype,"title",2);s([d({reflect:!0})],b.prototype,"variant",2);s([d({reflect:!0})],b.prototype,"appearance",2);s([d({reflect:!0})],b.prototype,"size",2);s([_("size")],b.prototype,"handleSizeChange",1);s([d({attribute:"with-caret",type:Boolean,reflect:!0})],b.prototype,"withCaret",2);s([d({attribute:"with-start",type:Boolean})],b.prototype,"withStart",2);s([d({attribute:"with-end",type:Boolean})],b.prototype,"withEnd",2);s([d({type:Boolean})],b.prototype,"disabled",2);s([d({type:Boolean,reflect:!0})],b.prototype,"loading",2);s([d({type:Boolean,reflect:!0})],b.prototype,"pill",2);s([d()],b.prototype,"type",2);s([d({reflect:!0})],b.prototype,"name",2);s([d({reflect:!0})],b.prototype,"value",2);s([d({reflect:!0})],b.prototype,"href",2);s([d()],b.prototype,"target",2);s([d()],b.prototype,"rel",2);s([d()],b.prototype,"download",2);s([d({attribute:"formaction"})],b.prototype,"formAction",2);s([d({attribute:"formenctype"})],b.prototype,"formEnctype",2);s([d({attribute:"formmethod"})],b.prototype,"formMethod",2);s([d({attribute:"formnovalidate",type:Boolean})],b.prototype,"formNoValidate",2);s([d({attribute:"formtarget"})],b.prototype,"formTarget",2);s([_("disabled",{waitUntilFirstUpdate:!0})],b.prototype,"handleDisabledChange",1);s([_("href")],b.prototype,"handleHrefChange",1);s([_("loading",{waitUntilFirstUpdate:!0})],b.prototype,"handleLoadingChange",1);b=s([M("wa-button")],b);b.disableWarning?.("change-in-update");/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var er=A`
  :host {
    --track-width: 2px;
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-color: var(--wa-color-brand-fill-loud);
    --speed: 2s;
    --size: 1em;

    /*
      Resizing a spinner element using anything but font-size will break the animation because the animation uses em
      units. Therefore, if a spinner is used in a flex container without \`flex: none\` applied, the spinner can
      grow/shrink and break the animation. The use of \`flex: none\` on the host element prevents this by always having
      the spinner sized according to its actual dimensions.
    */
    flex: none;
    display: inline-flex;
    width: var(--size);
    height: var(--size);
  }

  svg {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    animation: spin var(--speed) linear infinite;
  }

  .track,
  .indicator {
    --radius: calc(var(--size) / 2 - var(--track-width) / 2);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
    r: var(--radius);
    fill: none;
    stroke-width: var(--track-width);
  }

  .track {
    stroke: var(--track-color);
  }

  .indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: calc(0.597 * var(--circumference)), calc(0.796 * var(--circumference));
    stroke-dashoffset: calc(-0.04 * var(--circumference));
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: calc(0.008 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.278 * var(--circumference));
    }
    100% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.987 * var(--circumference));
    }
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var ao=class extends F{constructor(){super(...arguments),this.localize=new W(this)}render(){return z`
      <svg
        part="base spinner"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" />
        <circle class="indicator" />
      </svg>
    `}};ao.css=er;ao=s([M("wa-spinner")],ao);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var or=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var rr=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var ir=A`
  :host {
    --primary-color: currentColor;
    --primary-opacity: 1;
    --secondary-color: currentColor;
    --secondary-opacity: 0.4;
    --rotate-angle: 0deg;

    box-sizing: content-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: -0.125em;
  }

  /* #region Canvas — the box the icon is centered within (mirrors Font Awesome's icon canvas). Orthogonal to font-size. */

  /* Fixed width (default): 1.25em × 1em (20 × 16px) */
  :host(:not([canvas])),
  :host([canvas='fixed']) {
    width: 1.25em;
    height: 1em;
    min-width: 1.25em; /* <-- this is what Safari respects for intrinsic */
    min-height: 1em;
  }

  /* Auto: hug the icon's width. \`auto-width\` is the deprecated alias for canvas="auto". */
  :host([canvas='auto']),
  :host([auto-width]:not([canvas])) {
    width: auto;
    height: 1em;
  }

  /* Square: 1.25em × 1.25em (20 × 20px) */
  :host([canvas='square']) {
    width: 1.25em;
    height: 1.25em;
    min-width: 1.25em;
    min-height: 1.25em;
  }

  /* Roomy: 1.5em × 1.5em (24 × 24px) */
  :host([canvas='roomy']) {
    width: 1.5em;
    height: 1.5em;
    min-width: 1.5em;
    min-height: 1.5em;
  }

  /* #endregion */

  svg {
    /* NOTE: Avoid setting fill here. A stylesheet rule beats SVG presentation attributes, breaking stroke-based
       libraries like Lucide (fill="none" stroke="currentColor") and attribute-based mutators (issue #1733). The default
       library applies fill="currentColor" in its mutator instead. */
    height: 1em;
    overflow: visible;
    width: auto;

    /* Duotone colors with path-specific opacity fallback */
    path[data-duotone-primary] {
      color: var(--primary-color);
      opacity: var(--path-opacity, var(--primary-opacity));
    }

    path[data-duotone-secondary] {
      color: var(--secondary-color);
      opacity: var(--path-opacity, var(--secondary-opacity));
    }
  }

  /* Rotation */
  :host([rotate]) {
    transform: rotate(var(--rotate-angle, 0deg));
  }

  /* Flipping */
  :host([flip='x']) {
    transform: scaleX(-1);
  }
  :host([flip='y']) {
    transform: scaleY(-1);
  }
  :host([flip='both']) {
    transform: scale(-1, -1);
  }

  /* Rotation and Flipping combined */
  :host([rotate][flip='x']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleX(-1);
  }
  :host([rotate][flip='y']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleY(-1);
  }
  :host([rotate][flip='both']) {
    transform: rotate(var(--rotate-angle, 0deg)) scale(-1, -1);
  }

  /* #region Animations — ported from Font Awesome 7.3 (--fa-* props mapped to wa-icon's --* names) */

  :host([animation='beat']) {
    animation-name: beat;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='bounce']) {
    animation-name: bounce;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
  }

  :host([animation='fade']) {
    animation-name: fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='beat-fade']) {
    animation-name: beat-fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='flip']) {
    animation-name: flip;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1.5s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='flip-360']) {
    animation-name: flip-360;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='shake']) {
    animation-name: shake;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.75s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='spin']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-pulse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, steps(8));
  }

  /* spin-reverse is FA's reverse modifier expressed as a standalone value; reverse any spin via --animation-direction: reverse */
  :host([animation='spin-reverse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, reverse);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap']) {
    animation-name: spin-snap;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 3s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap-4']) {
    animation-name: spin-snap-4;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2.4s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap-8']) {
    animation-name: spin-snap-8;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 4s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='buzz']) {
    animation-name: buzz;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.6s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='wag']) {
    animation-name: wag;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.9s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
    transform-origin: bottom center;
  }

  :host([animation='float']) {
    animation-name: float;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 3s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
    will-change: transform;
  }

  :host([animation='swing']) {
    animation-name: swing;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1.2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
    transform-origin: top center;
  }

  :host([animation='jello']) {
    animation-name: jello;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.9s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
  }

  @media (prefers-reduced-motion: reduce) {
    :host([animation='beat']),
    :host([animation='bounce']),
    :host([animation='fade']),
    :host([animation='beat-fade']),
    :host([animation='flip']),
    :host([animation='flip-360']),
    :host([animation='shake']),
    :host([animation='spin']),
    :host([animation='spin-pulse']),
    :host([animation='spin-reverse']),
    :host([animation='spin-snap']),
    :host([animation='spin-snap-4']),
    :host([animation='spin-snap-8']),
    :host([animation='buzz']),
    :host([animation='wag']),
    :host([animation='float']),
    :host([animation='swing']),
    :host([animation='jello']) {
      animation: none !important;
      transition: none !important;
    }
  }

  /* #endregion */

  /* #region Keyframes — ported verbatim from Font Awesome 7.3 */

  @keyframes beat {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(calc(1.25 * var(--beat-scale, 1.25)));
    }
    45% {
      transform: scale(calc(1.22 * var(--beat-scale, 1.22)));
    }
    65% {
      transform: scale(calc(1.25 * var(--beat-scale, 1.25)));
    }
    90% {
      transform: scale(1);
    }
  }

  @keyframes bounce {
    0% {
      transform: scale(1, 1) translateY(0);
      /* No fallback by design (ported from FA 7.3): the first segment uses the user's --animation-timing or the CSS
         initial ease, while the explicit cubic-beziers on later stops drive the bounce physics. */
      animation-timing-function: var(--animation-timing);
    }
    14% {
      transform: scale(var(--bounce-start-scale-x, 1.06), var(--bounce-start-scale-y, 0.94))
        translateY(var(--bounce-anticipation, 3px));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    32% {
      transform: scale(var(--bounce-jump-scale-x, 0.94), var(--bounce-jump-scale-y, 1.12))
        translateY(calc(-1 * var(--bounce-height, 0.5em)));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    52% {
      transform: scale(1, 1) translateY(calc(-1 * var(--bounce-height, 0.5em) * 1.1));
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    70% {
      transform: scale(var(--bounce-land-scale-x, 1.06), var(--bounce-land-scale-y, 0.92)) translateY(0);
      animation-timing-function: cubic-bezier(0.33, 0.33, 0.66, 1);
    }
    85% {
      transform: scale(0.98, 1.04) translateY(calc(-2px * var(--bounce-rebound, 1)));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }

  @keyframes fade {
    0% {
      opacity: 1;
      transform: scale(1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    40% {
      opacity: var(--fade-opacity, 0.4);
      transform: scale(0.98);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes beat-fade {
    0% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    25% {
      opacity: calc(var(--beat-fade-opacity, 0.4) + 0.4);
      transform: scale(var(--beat-fade-scale, 1.28));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    45% {
      opacity: 1;
      transform: scale(var(--beat-fade-scale, 1.25));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    65% {
      opacity: calc(var(--beat-fade-opacity, 0.4) + 0.4);
      transform: scale(var(--beat-fade-scale, 1.28));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    100% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
    }
  }

  @keyframes flip {
    0% {
      transform: perspective(2em) scale(1) rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    8% {
      transform: perspective(2em) scale(var(--flip-anticipation-scale, 0.95))
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    35% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.6));
      animation-timing-function: linear;
    }
    65% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.5));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    92% {
      transform: perspective(2em) scale(1)
        rotate3d(
          var(--flip-x, 0),
          var(--flip-y, 1),
          var(--flip-z, 0),
          calc(var(--flip-angle, -360deg) * var(--flip-overshoot, 1.04))
        );
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -360deg));
    }
  }

  @keyframes flip-360 {
    0% {
      transform: perspective(2em) scale(1) rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    8% {
      transform: perspective(2em) scale(var(--flip-anticipation-scale, 0.95))
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    50% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.6));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    80% {
      transform: perspective(2em) scale(1)
        rotate3d(
          var(--flip-x, 0),
          var(--flip-y, 1),
          var(--flip-z, 0),
          calc(var(--flip-angle, -360deg) * var(--flip-overshoot, 1.04))
        );
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -360deg));
    }
  }

  @keyframes shake {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    8% {
      transform: rotate(35deg) translateX(1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    20% {
      transform: rotate(-22deg) translateX(-1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    35% {
      transform: rotate(15deg) translateX(1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    50% {
      transform: rotate(-9deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    65% {
      transform: rotate(5deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    78% {
      transform: rotate(-3deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    90% {
      transform: rotate(1deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    12% {
      transform: rotate(60deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    16.67% {
      transform: rotate(60deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    28.67% {
      transform: rotate(120deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    33.33% {
      transform: rotate(120deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    45.33% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    62% {
      transform: rotate(240deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    66.67% {
      transform: rotate(240deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    78.67% {
      transform: rotate(300deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    83.33% {
      transform: rotate(300deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    95.33% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap-4 {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    15% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    25% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    40% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    65% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    75% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    90% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap-8 {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    9% {
      transform: rotate(45deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    12.5% {
      transform: rotate(45deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    21.5% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    25% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    34% {
      transform: rotate(135deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    37.5% {
      transform: rotate(135deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    46.5% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    59% {
      transform: rotate(225deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    62.5% {
      transform: rotate(225deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    71.5% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    75% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    84% {
      transform: rotate(315deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    87.5% {
      transform: rotate(315deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    96.5% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes buzz {
    0% {
      transform: translateX(0) rotate(0deg);
      animation-timing-function: cubic-bezier(0.1, 0, 0.9, 1);
    }
    5% {
      transform: translateX(var(--buzz-distance, 4px)) rotate(0.5deg);
    }
    10% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px))) rotate(-0.5deg);
    }
    15% {
      transform: translateX(var(--buzz-distance, 4px)) rotate(0.3deg);
    }
    20% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px))) rotate(-0.3deg);
    }
    25% {
      transform: translateX(calc(var(--buzz-distance, 4px) * 0.7)) rotate(0.2deg);
    }
    30% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px) * 0.7)) rotate(-0.2deg);
    }
    35% {
      transform: translateX(calc(var(--buzz-distance, 4px) * 0.4)) rotate(0.1deg);
    }
    40% {
      transform: translateX(0) rotate(0deg);
    }
    100% {
      transform: translateX(0) rotate(0deg);
    }
  }

  @keyframes wag {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    12% {
      transform: rotate(var(--wag-angle, 12deg));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    24% {
      transform: rotate(2deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    36% {
      transform: rotate(calc(var(--wag-angle, 12deg) * 0.85));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    48% {
      transform: rotate(1deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    58% {
      transform: rotate(calc(var(--wag-angle, 12deg) * 0.6));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    68% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    15% {
      transform: translateY(calc(-0.4 * var(--float-height, 6px))) translateX(var(--float-drift, 1px))
        rotate(var(--float-tilt, 1deg)) scale(1, 1);
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    35% {
      transform: translateY(calc(-1 * var(--float-height, 6px))) translateX(0) rotate(0deg)
        scale(var(--float-stretch-x, 0.98), var(--float-stretch-y, 1.03));
      animation-timing-function: cubic-bezier(0.5, 0, 0.5, 0);
    }
    50% {
      transform: translateY(calc(-0.92 * var(--float-height, 6px))) translateX(calc(-0.5 * var(--float-drift, 1px)))
        rotate(calc(-0.5 * var(--float-tilt, 1deg))) scale(0.995, 1.01);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    70% {
      transform: translateY(calc(-0.3 * var(--float-height, 6px))) translateX(calc(-1 * var(--float-drift, 1px)))
        rotate(calc(-1 * var(--float-tilt, 1deg))) scale(1, 1);
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    90% {
      transform: translateY(calc(0.05 * var(--float-height, 6px))) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: translateY(0) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
    }
  }

  @keyframes swing {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    8% {
      transform: rotate(var(--swing-angle, 22deg));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    18% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.85));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    28% {
      transform: rotate(calc(var(--swing-angle, 22deg) * 0.65));
      animation-timing-function: cubic-bezier(0.35, 0, 0.65, 1);
    }
    38% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.45));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    48% {
      transform: rotate(calc(var(--swing-angle, 22deg) * 0.25));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    56% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.1));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    64% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes jello {
    0% {
      transform: scale(1, 1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    12% {
      transform: scale(var(--jello-scale-x, 1.15), calc(2 - var(--jello-scale-x, 1.15)));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    24% {
      transform: scale(calc(2 - var(--jello-scale-y, 1.12)), var(--jello-scale-y, 1.12));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    36% {
      transform: scale(
        calc(1 + (var(--jello-scale-x, 1.15) - 1) * 0.5),
        calc(2 - (1 + (var(--jello-scale-x, 1.15) - 1) * 0.5))
      );
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    48% {
      transform: scale(
        calc(2 - (1 + (var(--jello-scale-y, 1.12) - 1) * 0.3)),
        calc(1 + (var(--jello-scale-y, 1.12) - 1) * 0.3)
      );
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    58% {
      transform: scale(1.02, 0.98);
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    68% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  /* #endregion */
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var Pi="",no="";function ar(){return Pi.replace(/\/$/,"")}function Ri(t){no=t}function nr(){if(!no){let t=document.querySelector("[data-fa-kit-code]");t&&Ri(t.getAttribute("data-fa-kit-code")||"")}return no}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var sr="7.3.0";function Mi(t,e,o){let r="solid";return e==="chisel"&&(r="chisel-regular"),e==="etch"&&(r="etch-solid"),e==="graphite"&&(r="graphite-thin"),e==="jelly"&&(r="jelly-regular",o==="duo-regular"&&(r="jelly-duo-regular"),o==="fill-regular"&&(r="jelly-fill-regular")),e==="jelly-duo"&&(r="jelly-duo-regular"),e==="jelly-fill"&&(r="jelly-fill-regular"),e==="notdog"&&(o==="solid"&&(r="notdog-solid"),o==="duo-solid"&&(r="notdog-duo-solid")),e==="notdog-duo"&&(r="notdog-duo-solid"),e==="slab"&&((o==="solid"||o==="regular")&&(r="slab-regular"),o==="press-regular"&&(r="slab-press-regular")),e==="slab-press"&&(r="slab-press-regular"),e==="slab-duo"&&(r="slab-duo-regular"),e==="slab-press-duo"&&(r="slab-press-duo-regular"),e==="thumbprint"&&(r="thumbprint-light"),e==="utility"&&(r="utility-semibold"),e==="utility-duo"&&(r="utility-duo-semibold"),e==="utility-fill"&&(r="utility-fill-semibold"),e==="whiteboard"&&(r="whiteboard-semibold"),e==="mosaic"&&(r="mosaic-solid"),e==="pixel"&&(r="pixel-regular"),e==="vellum"&&(r="vellum-solid"),e==="classic"&&(o==="thin"&&(r="thin"),o==="light"&&(r="light"),o==="regular"&&(r="regular"),o==="solid"&&(r="solid")),e==="duotone"&&(o==="thin"&&(r="duotone-thin"),o==="light"&&(r="duotone-light"),o==="regular"&&(r="duotone-regular"),o==="solid"&&(r="duotone")),e==="sharp"&&(o==="thin"&&(r="sharp-thin"),o==="light"&&(r="sharp-light"),o==="regular"&&(r="sharp-regular"),o==="solid"&&(r="sharp-solid")),e==="sharp-duotone"&&(o==="thin"&&(r="sharp-duotone-thin"),o==="light"&&(r="sharp-duotone-light"),o==="regular"&&(r="sharp-duotone-regular"),o==="solid"&&(r="sharp-duotone-solid")),e==="brands"&&(r="brands"),r}function Ti(t,e,o){let r=Mi(t,e,o),i=ar();if(i)return`${i}/${r}/${t}.svg`;let a=nr();return a.length>0?`https://ka-p.fontawesome.com/releases/v${sr}/svgs/${r}/${t}.svg?token=${encodeURIComponent(a)}`:`https://ka-f.fontawesome.com/releases/v${sr}/svgs/${r}/${t}.svg`}var Fi={name:"default",resolver:(t,e="classic",o="solid")=>Ti(t,e,o),mutator:(t,e)=>{if(t.hasAttribute("fill")||t.setAttribute("fill","currentColor"),e?.family&&!t.hasAttribute("data-duotone-initialized")){let{family:o,variant:r}=e;if(o==="duotone"||o==="sharp-duotone"||o==="notdog-duo"||o==="notdog"&&r==="duo-solid"||o==="jelly-duo"||o==="jelly"&&r==="duo-regular"||o==="utility-duo"||o==="slab-duo"||o==="slab-press-duo"||o==="thumbprint"){let i=[...t.querySelectorAll("path")],a=i.find(l=>!l.hasAttribute("opacity")),n=i.find(l=>l.hasAttribute("opacity"));if(!a||!n)return;if(a.setAttribute("data-duotone-primary",""),n.setAttribute("data-duotone-secondary",""),e.swapOpacity&&a&&n){let l=n.getAttribute("opacity")||"0.4";a.style.setProperty("--path-opacity",l),n.style.setProperty("--path-opacity","1")}t.setAttribute("data-duotone-initialized","")}}}},lr=Fi;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function Di(t){return`data:image/svg+xml,${encodeURIComponent(t)}`}var so={solid:{backward:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M236.3 107.1C247.9 96 265 92.9 279.7 99.2C294.4 105.5 304 120 304 136L304 272.3L476.3 107.2C487.9 96 505 92.9 519.7 99.2C534.4 105.5 544 120 544 136L544 504C544 520 534.4 534.5 519.7 540.8C505 547.1 487.9 544 476.3 532.9L304 367.7L304 504C304 520 294.4 534.5 279.7 540.8C265 547.1 247.9 544 236.3 532.9L44.3 348.9C36.5 341.3 32 330.9 32 320C32 309.1 36.5 298.7 44.3 291.1L236.3 107.1z"/></svg>',"backward-step":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M491 100.8C478.1 93.8 462.3 94.5 450 102.6L192 272.1L192 128C192 110.3 177.7 96 160 96C142.3 96 128 110.3 128 128L128 512C128 529.7 142.3 544 160 544C177.7 544 192 529.7 192 512L192 367.9L450 537.5C462.3 545.6 478 546.3 491 539.3C504 532.3 512 518.8 512 504.1L512 136.1C512 121.4 503.9 107.9 491 100.9z"/></svg>',"angles-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M77.3 256 214.7 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256zm192 0L406.7 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L269.3 256z"/></svg>',"angles-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M434.7 256 297.3 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 256zm-192 0L105.3 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256z"/></svg>',check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',"closed-captioning":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M64 192C64 156.7 92.7 128 128 128L512 128C547.3 128 576 156.7 576 192L576 448C576 483.3 547.3 512 512 512L128 512C92.7 512 64 483.3 64 448L64 192zM216 272L248 272C252.4 272 256 275.6 256 280C256 293.3 266.7 304 280 304C293.3 304 304 293.3 304 280C304 249.1 278.9 224 248 224L216 224C185.1 224 160 249.1 160 280L160 360C160 390.9 185.1 416 216 416L248 416C278.9 416 304 390.9 304 360C304 346.7 293.3 336 280 336C266.7 336 256 346.7 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 280C208 275.6 211.6 272 216 272zM384 280C384 275.6 387.6 272 392 272L424 272C428.4 272 432 275.6 432 280C432 293.3 442.7 304 456 304C469.3 304 480 293.3 480 280C480 249.1 454.9 224 424 224L392 224C361.1 224 336 249.1 336 280L336 360C336 390.9 361.1 416 392 416L424 416C454.9 416 480 390.9 480 360C480 346.7 469.3 336 456 336C442.7 336 432 346.7 432 360C432 364.4 428.4 368 424 368L392 368C387.6 368 384 364.4 384 360L384 280z"/></svg>',"closed-captioning-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M39 39.1C48.4 29.7 63.6 29.7 72.9 39.1L161.8 128L512 128C547.3 128 576 156.7 576 192L576 448C576 473.5 561.1 495.4 539.6 505.8L601 567.1C610.4 576.5 610.4 591.7 601 601C591.6 610.3 576.4 610.4 567.1 601L39 73.1C29.7 63.7 29.7 48.5 39 39.1zM384 350.1L384 279.9C384 275.5 387.6 271.9 392 271.9L424 271.9C428.4 271.9 432 275.5 432 279.9C432 293.2 442.7 303.9 456 303.9C469.3 303.9 480 293.2 480 279.9C480 249 454.9 223.9 424 223.9L392 223.9C361.1 223.9 336 249 336 279.9L336 302.1L384 350.1zM445.5 411.6C465.7 403.2 480 383.2 480 359.9C480 346.6 469.3 335.9 456 335.9C442.7 335.9 432 346.6 432 359.9C432 364.3 428.4 367.9 424 367.9L401.8 367.9L445.5 411.6zM162.3 264.1C160.8 269.1 160 274.5 160 280L160 360C160 390.9 185.1 416 216 416L248 416C266.1 416 282.1 407.5 292.4 394.2L410.2 512L128 512C92.7 512 64 483.3 64 448L64 192C64 184.2 65.4 176.7 68 169.8L162.3 264.1zM256.1 357.9C256 358.6 256 359.3 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 309.8L256.1 357.9z"/></svg>',compress:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M160 64c0-17.7-14.3-32-32-32S96 46.3 96 64l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 320c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0z"/></svg>',ellipsis:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M96 320C96 289.1 121.1 264 152 264C182.9 264 208 289.1 208 320C208 350.9 182.9 376 152 376C121.1 376 96 350.9 96 320zM264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320zM488 264C518.9 264 544 289.1 544 320C544 350.9 518.9 376 488 376C457.1 376 432 350.9 432 320C432 289.1 457.1 264 488 264z"/></svg>',"ellipsis-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z"/></svg>',expand:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 96C110.3 96 96 110.3 96 128L96 224C96 241.7 110.3 256 128 256C145.7 256 160 241.7 160 224L160 160L224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L128 96zM160 416C160 398.3 145.7 384 128 384C110.3 384 96 398.3 96 416L96 512C96 529.7 110.3 544 128 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480L160 416zM416 96C398.3 96 384 110.3 384 128C384 145.7 398.3 160 416 160L480 160L480 224C480 241.7 494.3 256 512 256C529.7 256 544 241.7 544 224L544 128C544 110.3 529.7 96 512 96L416 96zM544 416C544 398.3 529.7 384 512 384C494.3 384 480 398.3 480 416L480 480L416 480C398.3 480 384 494.3 384 512C384 529.7 398.3 544 416 544L512 544C529.7 544 544 529.7 544 512L544 416z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',forward:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M403.7 107.1C392.1 96 375 92.9 360.3 99.2C345.6 105.5 336 120 336 136L336 272.3L163.7 107.2C152.1 96 135 92.9 120.3 99.2C105.6 105.5 96 120 96 136L96 504C96 520 105.6 534.5 120.3 540.8C135 547.1 152.1 544 163.7 532.9L336 367.7L336 504C336 520 345.6 534.5 360.3 540.8C375 547.1 392.1 544 403.7 532.9L595.7 348.9C603.6 341.4 608 330.9 608 320C608 309.1 603.5 298.7 595.7 291.1L403.7 107.1z"/></svg>',file:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>',"file-audio":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>',"file-code":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>',"file-excel":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>',"file-image":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>',"file-pdf":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>',"file-powerpoint":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>',"file-video":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>',"file-word":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>',"file-zipper":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>',"forward-step":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M21 36.8c12.9-7 28.7-6.3 41 1.8L320 208.1 320 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 384c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-144.1-258 169.6c-12.3 8.1-28 8.8-41 1.8S0 454.7 0 440L0 72C0 57.3 8.1 43.8 21 36.8z"/></svg>',gauge:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm320 96c0-26.9-16.5-49.9-40-59.3L280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 172.7c-23.5 9.5-40 32.5-40 59.3 0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>',gear:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',"picture-in-picture":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M448 32c35.3 0 64 28.7 64 64l0 112-64 0 0-112-384 0 0 320 144 0 0 64-144 0-6.5-.3c-30.1-3.1-54.1-27-57.1-57.1L0 416 0 96C0 62.9 25.2 35.6 57.5 32.3L64 32 448 32zm16 224c26.5 0 48 21.5 48 48l0 128c0 26.5-21.5 48-48 48l-160 0c-26.5 0-48-21.5-48-48l0-128c0-26.5 21.5-48 48-48l160 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',"play-circle":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg>',plus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',upload:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',volume:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM441.1 107c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C443.3 170.7 464 210.9 464 256s-20.7 85.3-53.2 111.8c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5c43.2-35.2 70.9-88.9 70.9-149s-27.7-113.8-70.9-149zm-60.5 74.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>',"volume-low":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM380.6 181.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>',"volume-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM367 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{calendar:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z"/></svg>',"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',clock:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320zM64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},Bi={name:"system",resolver:(t,e="classic",o="solid")=>{let i=so[o][t]??so.regular[t]??so.regular["circle-question"];return i?Di(i):""},mutator:t=>{t.hasAttribute("fill")||t.setAttribute("fill","currentColor")}},cr=Bi;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var Ii="classic",qi=[lr,cr],dr=new Set;function hr(t){dr.add(t)}function ur(t){dr.delete(t)}function _e(t){return qi.find(e=>e.name===t)}function pr(){return Ii}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var{I:Xs}=Uo;var mr=(t,e)=>e===void 0?t?._$litType$!==void 0:t?._$litType$===e;var fr=t=>t.strings===void 0;var Vi={},wr=(t,e=Vi)=>t._$AH=e;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var re=Symbol(),ke=Symbol(),lo,co=new Map,T=class extends F{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.rotate=0,this.resolveIcon=async(t,e)=>{let o;if(e?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=z`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;let r=this.shadowRoot.querySelector("[part='svg']");return typeof e.mutator=="function"&&e.mutator(r,this),this.svg}try{if(o=await fetch(t,{mode:"cors"}),!o.ok)return o.status===410?re:ke}catch{return ke}try{let r=document.createElement("div");r.innerHTML=await o.text();let i=r.firstElementChild;if(i?.tagName?.toLowerCase()!=="svg")return re;lo||(lo=new DOMParser);let n=lo.parseFromString(i.outerHTML,"text/html").body.querySelector("svg");return n?(n.part.add("svg"),document.adoptNode(n)):re}catch{return re}}}connectedCallback(){super.connectedCallback(),hr(this)}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),ur(this)}async getIconSource(){let t=_e(this.library),e=this.family||pr();if(this.name&&t){let o=this.canvas==="auto"||this.autoWidth,r;try{r=await t.resolver(this.name,e,this.variant,o)}catch{r=void 0}return{url:r,fromLibrary:!0}}return{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){let{url:t,fromLibrary:e}=await this.getIconSource(),o=e?_e(this.library):void 0;if(!t){this.svg=null;return}let r=co.get(t);r||(r=this.resolveIcon(t,o),co.set(t,r));let i=await r;i===ke&&co.delete(t);let a=await this.getIconSource();if(t===a.url){if(mr(i)){this.svg=i;return}switch(i){case ke:case re:this.svg=null,this.dispatchEvent(new or);break;default:this.svg=i.cloneNode(!0),o?.mutator?.(this.svg,this),this.dispatchEvent(new rr)}}}willUpdate(t){return this.style||this.setStyleProperty("--rotate-angle",`${this.rotate}deg`),super.willUpdate(t)}updated(t){super.updated(t);let e=_e(this.library);this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`);let o=this.shadowRoot?.querySelector("svg");o&&e?.mutator?.(o,this)}render(){return this.hasUpdated?this.svg:z`<svg part="svg" width="16" height="16" viewBox="0 0 16 16"></svg>`}};T.css=ir;s([j()],T.prototype,"svg",2);s([d({reflect:!0})],T.prototype,"name",2);s([d({reflect:!0})],T.prototype,"family",2);s([d({reflect:!0})],T.prototype,"variant",2);s([d({reflect:!0})],T.prototype,"canvas",2);s([d({attribute:"auto-width",type:Boolean,reflect:!0})],T.prototype,"autoWidth",2);s([d({attribute:"swap-opacity",type:Boolean,reflect:!0})],T.prototype,"swapOpacity",2);s([d()],T.prototype,"src",2);s([d()],T.prototype,"label",2);s([d({reflect:!0})],T.prototype,"library",2);s([d({type:Number,reflect:!0})],T.prototype,"rotate",2);s([d({type:String,reflect:!0})],T.prototype,"flip",2);s([d({type:String,reflect:!0})],T.prototype,"animation",2);s([_("label")],T.prototype,"handleLabelChange",1);s([_(["family","name","library","variant","src","autoWidth","canvas","swapOpacity"],{waitUntilFirstUpdate:!0})],T.prototype,"setIcon",1);T=s([M("wa-icon")],T);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *//*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var gr=A`
  :host {
    --current-text-color: var(--wa-color-brand-on-loud);

    display: block;
    color: var(--wa-color-text-normal);
    -webkit-user-select: none;
    user-select: none;

    position: relative;
    display: flex;
    align-items: center;
    font: inherit;
    padding: 0.5em 1em 0.5em 0.25em;
    border-radius: var(--wa-border-radius-s);
    line-height: var(--wa-line-height-condensed);
    transition: var(--wa-transition-fast) background-color var(--wa-transition-easing);
    cursor: pointer;
  }

  :host(:focus) {
    outline: none;
  }

  @media (hover: hover) {
    :host(:not(:state(disabled), :state(current)):is(:state(hover), :hover)) {
      background-color: var(--wa-color-neutral-fill-normal);
      color: var(--wa-color-neutral-on-normal);
    }
  }

  :host(:state(current)),
  :host(:state(disabled):state(current)) {
    background-color: var(--wa-form-control-activated-color);
    color: var(--current-text-color);
    opacity: 1;
  }

  :host(:state(disabled)) {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .label {
    flex: 1 1 auto;
    display: inline-block;
  }

  .check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--wa-font-size-smaller);
    visibility: hidden;
    width: 2em;
  }

  :host(:state(selected)) .check {
    visibility: visible;
  }

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .start::slotted(*) {
    margin-inline-end: 0.5em;
  }

  .end::slotted(*) {
    margin-inline-start: 0.5em;
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function ie(t,e=0){if(!t||!globalThis.Node)return"";if(typeof t[Symbol.iterator]=="function")return(Array.isArray(t)?t:[...t]).map(i=>ie(i,--e)).join("");let o=t;if(o.nodeType===Node.TEXT_NODE)return o.textContent??"";if(o.nodeType===Node.ELEMENT_NODE){let r=o;if(r.hasAttribute("slot")||r.matches("style, script"))return"";if(r instanceof HTMLSlotElement){let i=r.assignedNodes({flatten:!0});if(i.length>0)return ie(i,--e)}return e>-1?ie(r,--e):r.textContent??""}return o.hasChildNodes()?ie(o.childNodes,--e):""}var Z=class extends F{constructor(){super(...arguments),this.localize=new W(this),this.cachedDefaultLabel="",this.isInitialized=!1,this.isDefaultLabelDirty=!0,this.current=!1,this.value="",this.disabled=!1,this.selected=!1,this.defaultSelected=!1,this._label="",this.handleHover=t=>{t.type==="mouseenter"?this.customStates.set("hover",!0):t.type==="mouseleave"&&this.customStates.set("hover",!1)}}set label(t){let e=this._label;this._label=t||"",this._label!==e&&this.requestUpdate("label",e)}get label(){return this._label?this._label:this.defaultLabel}get defaultLabel(){return(this.isDefaultLabelDirty||!this.cachedDefaultLabel)&&this.updateDefaultLabel(),this.cachedDefaultLabel}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false"),this.addEventListener("mouseenter",this.handleHover),this.addEventListener("mouseleave",this.handleHover)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mouseenter",this.handleHover),this.removeEventListener("mouseleave",this.handleHover)}handleDefaultSlotChange(){this.isDefaultLabelDirty=!0,this.isInitialized?(customElements.whenDefined("wa-select").then(()=>{let t=this.closest("wa-select");t&&t.handleDefaultSlotChange?.()}),customElements.whenDefined("wa-combobox").then(()=>{let t=this.closest("wa-combobox");t&&t.handleDefaultSlotChange?.()})):this.isInitialized=!0}willUpdate(t){t.has("defaultSelected")&&(this.didSSR&&this.hasUpdated||!this.didSSR)&&this.syncDefaultSelected(),super.willUpdate(t)}syncDefaultSelected(){if("closest"in this&&!this.closest("wa-combobox, wa-select")?.hasInteracted&&this.defaultSelected){let t=this.selected;this.selected=this.defaultSelected,this.requestUpdate("selected",t)}}updated(t){t.has("disabled")&&(this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.customStates.set("disabled",this.disabled)),t.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.customStates.set("selected",this.selected)),t.has("value")&&(typeof this.value!="string"&&(this.value=String(this.value)),this.handleDefaultSlotChange()),t.has("current")&&this.customStates.set("current",this.current),super.updated(t)}async firstUpdated(t){if(super.firstUpdated(t),this.didSSR&&!this.hasUpdated?(await this.updateComplete,this.syncDefaultSelected()):this.syncDefaultSelected(),this.selected&&!this.defaultSelected){let e=this.closest("wa-select, wa-combobox");e&&!e.hasInteracted&&(await customElements.whenDefined(e?.localName),await e.updateComplete,e.selectionChanged?.())}}updateDefaultLabel(){let t=this.cachedDefaultLabel;this.cachedDefaultLabel=ie(this).trim(),this.isDefaultLabelDirty=!1;let e=this.cachedDefaultLabel!==t;return!this._label&&e&&this.requestUpdate("label",t),e}render(){let t=this.selected;return this.didSSR&&!this.hasUpdated?(this.updateComplete.then(()=>{this.requestUpdate()}),S):z`
      ${t?z`<wa-icon
            part="checked-icon"
            class="check"
            name="check"
            library="system"
            variant="solid"
            aria-hidden="true"
          ></wa-icon>`:z`<span part="checked-icon" class="check" aria-hidden="true"></span>`}
      <slot part="start" name="start" class="start"></slot>
      <slot part="label" class="label" @slotchange=${this.handleDefaultSlotChange}></slot>
      <slot part="end" name="end" class="end"></slot>
    `}};Z.css=gr;s([P(".label")],Z.prototype,"defaultSlot",2);s([j()],Z.prototype,"current",2);s([d({reflect:!0})],Z.prototype,"value",2);s([d({type:Boolean})],Z.prototype,"disabled",2);s([d({type:Boolean,attribute:!1})],Z.prototype,"selected",2);s([d({type:Boolean,attribute:"selected"})],Z.prototype,"defaultSelected",2);s([d()],Z.prototype,"label",1);Z=s([M("wa-option")],Z);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *//*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var vr=A`
  :host {
    --tag-max-size: 10ch;
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);
  }

  /* Add ellipses to multi select options */
  :host wa-tag::part(content) {
    display: initial;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: var(--tag-max-size);
  }

  :host .disabled [part~='combobox'] {
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  :host .enabled:is(.open, :focus-within) [part~='combobox'] {
    outline-color: var(--wa-color-focus);
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;

    /* Pass through from select to the popup */
    --show-duration: inherit;
    --hide-duration: inherit;

    &::part(popup) {
      z-index: 900;
    }

    &[data-current-placement^='top']::part(popup) {
      transform-origin: bottom;
    }

    &[data-current-placement^='bottom']::part(popup) {
      transform-origin: top;
    }
  }

  /* Combobox */
  .combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    align-items: center;
    justify-content: start;

    min-height: var(--wa-form-control-height);

    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    color: var(--wa-form-control-value-color);
    cursor: pointer;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    overflow: hidden;
    padding: 0 var(--wa-form-control-padding-inline);
    position: relative;
    vertical-align: middle;
    transition:
      background-color var(--wa-transition-normal),
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

    /* Pills */
    :host([pill]) & {
      border-radius: var(--wa-border-radius-pill);
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .combobox {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  .display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    line-height: var(--wa-form-control-value-line-height);
    color: var(--wa-form-control-value-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
    }
  }

  /* Manage spacing when tags are present */
  :host([multiple]) {
    --_padding-with-tags: calc(var(--wa-form-control-height) * 0.1 - var(--wa-form-control-border-width));

    & .combobox:has(.tags wa-tag) {
      padding-block: var(--_padding-with-tags);
      padding-inline-start: var(--_padding-with-tags);
    }
  }

  /* Visually hide the display input when multiple is enabled */
  :host([multiple]) .combobox:has(.tags wa-tag) .display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .value-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    padding: 0;
    margin: 0;
  }

  .tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.25em;

    &::slotted(wa-tag) {
      cursor: pointer !important;
    }

    .disabled &,
    .disabled &::slotted(wa-tag) {
      cursor: not-allowed !important;
    }
  }

  /* Start and End */

  .start,
  .end {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
  }

  .end::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  .start::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  :host([multiple]) .combobox:has(.tags wa-tag) .start::slotted(*) {
    margin-inline-start: calc(var(--wa-form-control-padding-inline) - var(--_padding-with-tags));
  }

  /* Clear button */
  [part~='clear-button'] {
    flex: 0 0 auto;
    display: inline-flex;
    align-self: stretch;
    align-items: center;
    justify-content: center;
    inline-size: 1.5em;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    background: none;
    padding: 0;
    transition: color var(--wa-transition-normal);
    cursor: pointer;
    /* The box is wider than the glyph, so overhang half that growth on each side. Keeps the glyph
       on the same trailing axis as the segmented-field pickers' clear buttons. */
    margin-inline-start: calc(var(--wa-form-control-padding-inline) - 0.125em);
    margin-inline-end: -0.125em;

    &:focus {
      outline: none;
    }

    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:active {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
    }
  }

  /* Expand icon */
  .expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
    transition: rotate var(--wa-transition-slow) var(--wa-transition-easing);
    rotate: 0deg;
    margin-inline-start: var(--wa-form-control-padding-inline);

    .open & {
      rotate: -180deg;
    }
  }

  /* Listbox */
  .listbox {
    display: block;
    position: relative;
    font: inherit;
    box-shadow: var(--wa-shadow-m);
    background: var(--wa-color-surface-raised);
    border-color: var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
    padding: 0.25em;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);

    &::slotted(wa-divider) {
      --spacing: 0.5em;
    }
  }

  /* Space options with half the listbox's padding */
  .listbox slot:not([name]) {
    display: flex;
    flex-direction: column;
    gap: 0.125em;
  }

  slot:not([name])::slotted(small) {
    display: block;
    font-size: var(--wa-font-size-smaller);
    font-weight: var(--wa-font-weight-semibold);
    color: var(--wa-color-text-quiet);
    padding-block: 0.5em;
    padding-inline: 2.25em;
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function Ni(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}function ho(t,e,o="vertical",r="smooth"){let i=Ni(t,e),a=i.top+e.scrollTop,n=i.left+e.scrollLeft,l=e.scrollLeft,c=e.scrollLeft+e.offsetWidth,h=e.scrollTop,u=e.scrollTop+e.offsetHeight;(o==="horizontal"||o==="both")&&(n<l?e.scrollTo({left:n,behavior:r}):n+t.clientWidth>c&&e.scrollTo({left:n-e.offsetWidth+t.clientWidth,behavior:r})),(o==="vertical"||o==="both")&&(a<h?e.scrollTo({top:a,behavior:r}):a+t.clientHeight>u&&e.scrollTo({top:a-e.offsetHeight+t.clientHeight,behavior:r}))}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var Oe=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var Pe=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var Re=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var Me=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var br=class extends Event{constructor(){super("wa-clear",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var kt=[];function Te(t){Vt(t),kt.push(t)}function Vt(t){for(let e=kt.length-1;e>=0;e--)if(kt[e]===t){kt.splice(e,1);break}}function Fe(t){return kt.length>0&&kt[kt.length-1]===t}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var yr=(t={})=>{let{validationElement:e,validationProperty:o}=t;e||typeof document<"u"&&"createElement"in document&&(e=Object.assign(document.createElement("input"),{required:!0})),o||(o="value");let r={observedAttributes:["required"],message:e?.validationMessage,checkValidity(i){let a={message:"",isValid:!0,invalidKeys:[]};return(i.required??i.hasAttribute("required"))&&!i[o]&&(a.message=typeof r.message=="function"?r.message(i):r.message||"",a.isValid=!1,a.invalidKeys.push("valueMissing")),a}};return r};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var De=A`
  :host {
    display: flex;
    flex-direction: column;
  }

  /* Treat wrapped labels, inputs, and hints as direct children of the host element */
  [part~='form-control'] {
    display: contents;
  }

  /* Label */
  :is([part~='form-control-label'], [part~='label']):has(*:not(:empty)),
  :is([part~='form-control-label'], [part~='label']).has-label {
    display: inline-flex;
    color: var(--wa-form-control-label-color);
    font-weight: var(--wa-form-control-label-font-weight);
    line-height: var(--wa-form-control-label-line-height);
    margin-block-end: 0.5em;
  }

  :host([required]) :is([part~='form-control-label'], [part~='label'])::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
    color: var(--wa-form-control-required-content-color);
  }

  /* Help text */
  [part~='hint'] {
    display: block;
    color: var(--wa-form-control-hint-color);
    font-weight: var(--wa-form-control-hint-font-weight);
    line-height: var(--wa-form-control-hint-line-height);
    margin-block-start: 0.5em;
    font-size: var(--wa-font-size-smaller);

    &:not(.has-slotted, .has-hint, .has-count) {
      display: none;
    }
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function Nt(t,e){return new Promise(o=>{function r(i){i.target===t&&(t.removeEventListener(e,r),o())}t.addEventListener(e,r)})}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function Ut(t,e){return new Promise(o=>{let r=new AbortController,{signal:i}=r;if(t.classList.contains(e))return;t.classList.add(e);let a=!1,n=()=>{a||(a=!0,t.classList.remove(e),o(),r.abort())};t.addEventListener("animationend",n,{once:!0,signal:i}),t.addEventListener("animationcancel",n,{once:!0,signal:i}),requestAnimationFrame(()=>{!a&&t.getAnimations().length===0&&n()})})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ae=class extends bt{constructor(e){if(super(e),this.it=S,e.type!==G.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===S||e==null)return this._t=void 0,this.it=e;if(e===B)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let o=[e];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}};ae.directiveName="unsafeHTML",ae.resultType=1;var Cr=qt(ae);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var y=class extends I{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.cachedOptions=null,this.hasSlotController=new Bt(this,"hint","label"),this.localize=new W(this),this.selectionOrder=new Map,this.typeToSelectString="",this.slotChangePending=!1,this.displayLabel="",this.selectedOptions=[],this.name="",this._defaultValue=null,this.size="m",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.required=!1,this.getTag=t=>z`
        <wa-tag
          part="tag"
          exportparts="
            base:tag__base,
            content:tag__content,
            remove-button:tag__remove-button,
            remove-button__base:tag__remove-button__base
          "
          ?pill=${this.pill}
          size=${this.size}
          with-remove
          data-value=${t.value}
          @wa-remove=${e=>this.handleTagRemove(e,t)}
        >
          ${t.label}
        </wa-tag>
      `,this.handleDocumentFocusIn=t=>{let e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{let e=t.target,o=e.closest('[part~="clear-button"]')!==null,r=e.closest("wa-button")!==null;if(!(o||r)){if(t.key==="Escape"&&this.open&&Fe(this)&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),t.key==="Enter"||t.key===" "&&this.typeToSelectString===""){if(t.preventDefault(),t.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){let i=this.getAllOptions(),a=i.indexOf(this.currentOption),n=Math.max(0,a);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;t.key==="ArrowDown"?(n=a+1,n>i.length-1&&(n=0)):t.key==="ArrowUp"?(n=a-1,n<0&&(n=i.length-1)):t.key==="Home"?n=0:t.key==="End"&&(n=i.length-1),this.setCurrentOption(i[n])}if(t.key?.length===1||t.key==="Backspace"){let i=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if(t.key==="Backspace")return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),t.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(let a of i)if(a.label.toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(a);break}}}},this.handleDocumentMouseDown=t=>{let e=t.composedPath();this&&!e.includes(this)&&this.hide()}}static get validators(){let t=[yr({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...t]}get validationTarget(){return this.valueInput}set defaultValue(t){this._defaultValue=this.convertDefaultValue(t)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}rawValuesEqual(t,e){return t==null&&e==null?!0:t==null||e==null||t.length!==e.length?!1:t.every((o,r)=>o===e[r])}convertDefaultValue(t){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(t)&&(t=t[0]),t}set value(t){let e=this.value;t instanceof FormData&&(t=t.getAll(this.name)),t!=null&&!Array.isArray(t)&&(t=[t]);let o=this._value;this._value=t??null,this.rawValuesEqual(o,this._value)||(this.valueHasChanged=!0,this.requestUpdate("value",e))}get value(){let t=this._value??this.defaultValue??null;t!=null&&(t=Array.isArray(t)?t:[t]),this.optionValues=new Set(this.getAllOptions().filter(o=>!o.disabled).map(o=>o.value));let e=t;return t!=null&&(e=t.filter(o=>this.optionValues.has(o)),e=this.multiple?e:e[0],e=e??null),e}handleSizeChange(){gt(this.localName,this.size)}connectedCallback(){super.connectedCallback(),this.processSlotChange(),this.open=!1}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.cachedOptions=null}updateDefaultValue(){let e=this.getAllOptions().filter(o=>o.hasAttribute("selected")||o.defaultSelected);if(e.length>0){let o=e.map(r=>r.value);this._defaultValue=this.multiple?o:o[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),Te(this),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),Vt(this),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.displayInput.setSelectionRange(0,0)}handleLabelClick(){this.displayInput.focus()}handleComboboxClick(t){t.preventDefault()}handleComboboxMouseDown(t){let o=t.composedPath().some(r=>r instanceof Element&&r.tagName.toLowerCase()==="wa-button");this.disabled||o||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){t.stopPropagation(),this.handleDocumentKeyDown(t)}handleClearClick(t){t.stopPropagation(),this.hasInteracted=!0,this.valueHasChanged=!0,this.value!==null&&(this.displayLabel="",this.selectionOrder.clear(),this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new br),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){let o=t.target.closest("wa-option");o&&!o.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(o):this.setSelectedOptions(o),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){this.slotChangePending||(this.slotChangePending=!0,queueMicrotask(()=>{this.slotChangePending=!1,this.processSlotChange()}))}processSlotChange(){if(customElements.get("wa-option")||customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange()),this.didSSR&&!this.hasUpdated){this.updateComplete.then(()=>{this.handleDefaultSlotChange()});return}this.cachedOptions=null;let t=this.getAllOptions();this.updateDefaultValue();let e=this.value;if(e==null||!this.valueHasChanged&&!this.hasInteracted){this.selectionChanged();return}Array.isArray(e)||(e=[e]);let o=t.filter(r=>e.includes(r.value));this.setSelectedOptions(o)}handleTagRemove(t,e){if(t.stopPropagation(),this.disabled)return;this.hasInteracted=!0,this.valueHasChanged=!0;let o=e;if(!o){let r=t.target.closest("wa-tag[data-value]");if(r){let i=r.dataset.value;o=this.selectedOptions.find(a=>a.value===i)}}o&&(this.toggleOptionSelection(o,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this.cachedOptions?this.cachedOptions:this?.querySelectorAll?(this.cachedOptions=[...this.querySelectorAll("wa-option")],this.cachedOptions):[]}getFirstOption(){return this.querySelector("wa-option")}setCurrentOption(t){this.getAllOptions().forEach(o=>{o.current=!1,o.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus({preventScroll:!0}),this.open&&!this.listbox.hidden&&ho(t,this.listbox,"vertical","auto"))}setSelectedOptions(t){let e=this.getAllOptions(),o=Array.isArray(t)?t:[t];e.forEach(r=>{o.includes(r)||(r.selected=!1)}),o.length&&o.forEach(r=>r.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){e===!0||e===!1?t.selected=e:t.selected=!t.selected,this.selectionChanged()}selectionChanged(){let e=this.getAllOptions().filter(n=>{if(!this.hasInteracted&&!this.valueHasChanged){let l=this.defaultValue,c=Array.isArray(l)?l:[l];return n.hasAttribute("selected")||n.defaultSelected||n.selected||c?.includes(n.value)}return n.selected}),o=new Set(e.map(n=>n.value));for(let n of this.selectionOrder.keys())o.has(n)||this.selectionOrder.delete(n);let i=(this.selectionOrder.size>0?Math.max(...this.selectionOrder.values()):-1)+1;for(let n of e)this.selectionOrder.has(n.value)||this.selectionOrder.set(n.value,i++);this.selectedOptions=e.sort((n,l)=>{let c=this.selectionOrder.get(n.value)??0,h=this.selectionOrder.get(l.value)??0;return c-h});let a=new Set(this.selectedOptions.map(n=>n.value));if(a.size>0||this._value){let n=this._value;if(this._value==null){let l=this.defaultValue??[];this._value=Array.isArray(l)?l:[l]}this._value=this._value?.filter(l=>!this.optionValues?.has(l))??null,this._value?.unshift(...a),this.requestUpdate("value",n)}if(this.multiple)this.placeholder&&!this.value?.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{let n=this.selectedOptions[0];this.displayLabel=n?.label??""}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){let o=this.getTag(t,e);return o?typeof o=="string"?Cr(o):o:null}else if(e===this.maxOptionsVisible)return z`
          <wa-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
            >+${this.selectedOptions.length-e}</wa-tag
          >
        `;return null})}updated(t){super.updated(t),(t.has("value")||t.has("displayLabel"))&&this.customStates.set("blank",!this.value&&!this.displayLabel)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){let t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value],o=t.filter(r=>e.includes(r.value));this.setSelectedOptions(o),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption());let t=new Oe;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await Ut(this.popup.popup,"show"),this.currentOption&&ho(this.currentOption,this.listbox,"vertical","auto"),this.dispatchEvent(new Re)}else{let t=new Pe;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.removeOpenListeners(),await Ut(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.dispatchEvent(new Me)}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,Nt(this,"wa-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,Nt(this,"wa-after-hide")}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}formResetCallback(){this.selectionOrder.clear(),this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){let t=this.hasSlotController.test("label","withLabel"),e=this.hasSlotController.test("hint","withHint"),o=this.label?!0:!!t,r=this.hint?!0:!!e,i=(this.hasUpdated||!1)&&this.withClear&&!this.disabled&&(this.displayLabel||this.value&&this.value.length>0);return z`
      <div
        part="form-control"
        class=${q({"form-control":!0,"form-control-has-label":o})}
      >
        <label
          id="label"
          part="form-control-label label"
          class=${q({label:!0,"has-label":o})}
          aria-hidden=${o?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${q({select:!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple})}
            placement=${this.placement}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
              @click=${this.handleComboboxClick}
            >
              <slot part="start" name="start" class="start"></slot>

              <input
                part="display-input"
                class="display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                ?required=${this.required}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-invalid=${!this.validity.valid}
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="hint"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
              />

              <!-- Tags need to wait for first hydration before populating otherwise it will create a hydration mismatch. -->
              ${this.multiple&&this.hasUpdated?z`<div part="tags" class="tags" @wa-remove=${this.handleTagRemove}>${this.tags}</div>`:""}

              <input
                class="value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
              />

              ${i?z`
                    <button
                      part="clear-button"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="end" part="end" class="end"></slot>

              <slot name="expand-icon" part="expand-icon" class="expand-icon">
                <wa-icon library="system" name="chevron-down" variant="solid"></wa-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
            >
              <slot @slotchange=${this.handleDefaultSlotChange}></slot>
            </div>
          </wa-popup>
        </div>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${q({"has-slotted":r})}
          aria-hidden=${r?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};y.css=[vr,De,vt];s([P(".select")],y.prototype,"popup",2);s([P(".combobox")],y.prototype,"combobox",2);s([P(".display-input")],y.prototype,"displayInput",2);s([P(".value-input")],y.prototype,"valueInput",2);s([P(".listbox")],y.prototype,"listbox",2);s([j()],y.prototype,"displayLabel",2);s([j()],y.prototype,"currentOption",2);s([j()],y.prototype,"selectedOptions",2);s([d({reflect:!0})],y.prototype,"name",2);s([d({attribute:!1})],y.prototype,"defaultValue",1);s([d({attribute:"value",reflect:!1})],y.prototype,"value",1);s([d({reflect:!0})],y.prototype,"size",2);s([_("size")],y.prototype,"handleSizeChange",1);s([d()],y.prototype,"placeholder",2);s([d({type:Boolean,reflect:!0})],y.prototype,"multiple",2);s([d({attribute:"max-options-visible",type:Number})],y.prototype,"maxOptionsVisible",2);s([d({type:Boolean})],y.prototype,"disabled",2);s([d({attribute:"with-clear",type:Boolean})],y.prototype,"withClear",2);s([d({type:Boolean,reflect:!0})],y.prototype,"open",2);s([d({reflect:!0})],y.prototype,"appearance",2);s([d({type:Boolean,reflect:!0})],y.prototype,"pill",2);s([d()],y.prototype,"label",2);s([d({reflect:!0})],y.prototype,"placement",2);s([d({attribute:"hint"})],y.prototype,"hint",2);s([d({attribute:"with-label",type:Boolean})],y.prototype,"withLabel",2);s([d({attribute:"with-hint",type:Boolean})],y.prototype,"withHint",2);s([d({type:Boolean,reflect:!0})],y.prototype,"required",2);s([d({attribute:!1})],y.prototype,"getTag",2);s([_("disabled",{waitUntilFirstUpdate:!0})],y.prototype,"handleDisabledChange",1);s([_("value",{waitUntilFirstUpdate:!0})],y.prototype,"handleValueChange",1);s([_("open",{waitUntilFirstUpdate:!0})],y.prototype,"handleOpenChange",1);y=s([M("wa-select")],y);y.disableWarning?.("change-in-update");/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var xr=class extends Event{constructor(){super("wa-remove",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var Lr=A`
  @layer wa-component {
    :host {
      display: inline-flex;
      gap: 0.5em;
      border-radius: var(--wa-border-radius-m);
      align-items: center;
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
      border-style: var(--wa-border-style);
      border-width: var(--wa-border-width-s);
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      font-size: inherit;
      line-height: 1;
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
      height: calc(var(--wa-form-control-height) * 0.8);
      line-height: calc(var(--wa-form-control-height) - var(--wa-form-control-border-width) * 2);
      padding: 0 0.75em;
    }

    /* Appearance modifiers */
    :host([appearance='outlined']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }

    :host([appearance='filled']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: transparent;
    }

    :host([appearance='filled-outlined']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }

    :host([appearance='accent']) {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
  }

  .content {
    font-size: var(--wa-font-size-smaller);
  }

  [part='remove-button'] {
    line-height: 1;
  }

  [part='remove-button']::part(base) {
    padding: 0;
    height: 1em;
    width: 1em;
    color: currentColor;
  }

  @media (hover: hover) {
    :host(:hover) > [part='remove-button']::part(base) {
      background-color: transparent;
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
    }
  }

  :host(:active) > [part='remove-button']::part(base) {
    background-color: transparent;
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
  }

  /*
   * Pill modifier
   */
  :host([pill]) {
    border-radius: var(--wa-border-radius-pill);
  }
`;/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var ut=class extends F{constructor(){super(...arguments),this.localize=new W(this),this.variant="neutral",this.appearance="filled-outlined",this.size="m",this.pill=!1,this.withRemove=!1}handleSizeChange(){gt(this.localName,this.size)}handleRemoveClick(){this.dispatchEvent(new xr)}render(){return z`
      <slot part="content" class="content"></slot>

      ${this.withRemove?z`
            <wa-button
              part="remove-button"
              exportparts="base:remove-button__base"
              class="remove"
              appearance="plain"
              size=${this.size}
              @click=${this.handleRemoveClick}
              tabindex="-1"
            >
              <wa-icon name="xmark" library="system" variant="solid" label=${this.localize.term("remove")}></wa-icon>
            </wa-button>
          `:""}
    `}};ut.css=[Lr,ze,vt];s([d({reflect:!0})],ut.prototype,"variant",2);s([d({reflect:!0})],ut.prototype,"appearance",2);s([d({reflect:!0})],ut.prototype,"size",2);s([_("size")],ut.prototype,"handleSizeChange",1);s([d({type:Boolean,reflect:!0})],ut.prototype,"pill",2);s([d({attribute:"with-remove",type:Boolean})],ut.prototype,"withRemove",2);ut=s([M("wa-tag")],ut);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var Ar=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var Sr=A`
  :host {
    --arrow-color: black;
    --arrow-size: var(--wa-tooltip-arrow-size);
    --popup-border-width: 0px;
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45) to calculate the length of the arrow after rotation.
     *
     * The diamond will be translated inward by --arrow-base-offset, the border thickness, to centralise it on
     * the inner edge of the popup border. This also means we need to increase the size of the arrow by the
     * same amount to compensate.
     *
     * A diamond shaped clipping mask is used to avoid overlap of popup content. This extends slightly inward so
     * the popup border is covered with no sub-pixel rounding artifacts. The diamond corners are mitred at 22.5º
     * to properly merge any arrow border with the popup border. The constant 1.4142 is derived from 1 + tan(22.5).
     *
     */
    --arrow-base-offset: var(--popup-border-width);
    --arrow-size-diagonal: calc((var(--arrow-size) + var(--arrow-base-offset)) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));
    --arrow-size-div: calc(var(--arrow-size-diagonal) * 2);
    --arrow-clipping-corner: calc(var(--arrow-base-offset) * 1.4142);

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);

    /* Clear UA styles for [popover] */
    :where(&) {
      inset: unset;
      padding: unset;
      margin: unset;
      width: unset;
      height: unset;
      color: unset;
      background: unset;
      border: unset;
      overflow: unset;
    }
  }

  .popup-fixed {
    position: fixed;
  }

  .popup:not(.popup-active) {
    display: none;
  }

  .arrow {
    position: absolute;
    width: var(--arrow-size-div);
    height: var(--arrow-size-div);
    background: var(--arrow-color);
    z-index: 3;
    clip-path: polygon(
      var(--arrow-clipping-corner) 100%,
      var(--arrow-base-offset) calc(100% - var(--arrow-base-offset)),
      calc(var(--arrow-base-offset) - 2px) calc(100% - var(--arrow-base-offset)),
      calc(100% - var(--arrow-base-offset)) calc(var(--arrow-base-offset) - 2px),
      calc(100% - var(--arrow-base-offset)) var(--arrow-base-offset),
      100% var(--arrow-clipping-corner),
      100% 100%
    );
    rotate: 45deg;
  }

  :host([data-current-placement|='left']) .arrow {
    rotate: -45deg;
  }

  :host([data-current-placement|='right']) .arrow {
    rotate: 135deg;
  }

  :host([data-current-placement|='bottom']) .arrow {
    rotate: 225deg;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge-visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: 899;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }

  /* Built-in animations */
  .show {
    animation: show var(--show-duration) ease;
  }

  .hide {
    animation: show var(--hide-duration) ease reverse;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .show-with-scale {
    animation: show-with-scale var(--show-duration) ease;
  }

  .hide-with-scale {
    animation: show-with-scale var(--hide-duration) ease reverse;
  }

  @keyframes show-with-scale {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
`;var it=Math.min,J=Math.max,se=Math.round,le=Math.floor,at=t=>({x:t,y:t}),Ui={left:"right",right:"left",bottom:"top",top:"bottom"};function uo(t,e,o){return J(t,it(e,o))}function Ot(t,e){return typeof t=="function"?t(e):t}function yt(t){return t.split("-")[0]}function Pt(t){return t.split("-")[1]}function po(t){return t==="x"?"y":"x"}function Ie(t){return t==="y"?"height":"width"}function nt(t){let e=t[0];return e==="t"||e==="b"?"y":"x"}function qe(t){return po(nt(t))}function $r(t,e,o){o===void 0&&(o=!1);let r=Pt(t),i=qe(t),a=Ie(i),n=i==="x"?r===(o?"end":"start")?"right":"left":r==="start"?"bottom":"top";return e.reference[a]>e.floating[a]&&(n=ne(n)),[n,ne(n)]}function _r(t){let e=ne(t);return[Be(t),e,Be(e)]}function Be(t){return t.includes("start")?t.replace("start","end"):t.replace("end","start")}var zr=["left","right"],Er=["right","left"],Hi=["top","bottom"],Wi=["bottom","top"];function ji(t,e,o){switch(t){case"top":case"bottom":return o?e?Er:zr:e?zr:Er;case"left":case"right":return e?Hi:Wi;default:return[]}}function kr(t,e,o,r){let i=Pt(t),a=ji(yt(t),o==="start",r);return i&&(a=a.map(n=>n+"-"+i),e&&(a=a.concat(a.map(Be)))),a}function ne(t){let e=yt(t);return Ui[e]+t.slice(e.length)}function Xi(t){var e,o,r,i;return{top:(e=t.top)!=null?e:0,right:(o=t.right)!=null?o:0,bottom:(r=t.bottom)!=null?r:0,left:(i=t.left)!=null?i:0}}function mo(t){return typeof t!="number"?Xi(t):{top:t,right:t,bottom:t,left:t}}function Rt(t){let{x:e,y:o,width:r,height:i}=t;return{width:r,height:i,top:o,left:e,right:e+r,bottom:o+i,x:e,y:o}}function Or(t,e,o){let{reference:r,floating:i}=t,a=nt(e),n=qe(e),l=Ie(n),c=yt(e),h=a==="y",u=r.x+r.width/2-i.width/2,p=r.y+r.height/2-i.height/2,f=r[l]/2-i[l]/2,m;switch(c){case"top":m={x:u,y:r.y-i.height};break;case"bottom":m={x:u,y:r.y+r.height};break;case"right":m={x:r.x+r.width,y:p};break;case"left":m={x:r.x-i.width,y:p};break;default:m={x:r.x,y:r.y}}let w=Pt(e);return w&&(m[n]+=f*(w==="end"?1:-1)*(o&&h?-1:1)),m}async function Pr(t,e){var o;e===void 0&&(e={});let{x:r,y:i,platform:a,rects:n,elements:l,strategy:c}=t,{boundary:h="clippingAncestors",rootBoundary:u="viewport",elementContext:p="floating",altBoundary:f=!1,padding:m=0}=Ot(e,t),w=mo(m),C=l[f?p==="floating"?"reference":"floating":p],v=Rt(await a.getClippingRect({element:(o=await(a.isElement==null?void 0:a.isElement(C)))==null||o?C:C.contextElement||await(a.getDocumentElement==null?void 0:a.getDocumentElement(l.floating)),boundary:h,rootBoundary:u,strategy:c})),L=p==="floating"?{x:r,y:i,width:n.floating.width,height:n.floating.height}:n.reference,E=await(a.getOffsetParent==null?void 0:a.getOffsetParent(l.floating)),$=await(a.isElement==null?void 0:a.isElement(E))&&await(a.getScale==null?void 0:a.getScale(E))||{x:1,y:1},U=Rt(a.convertOffsetParentRelativeRectToViewportRelativeRect?await a.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:L,offsetParent:E,strategy:c}):L);return{top:(v.top-U.top+w.top)/$.y,bottom:(U.bottom-v.bottom+w.bottom)/$.y,left:(v.left-U.left+w.left)/$.x,right:(U.right-v.right+w.right)/$.x}}var Yi=50,Rr=async(t,e,o)=>{let{placement:r="bottom",strategy:i="absolute",middleware:a=[],platform:n}=o,l=n.detectOverflow?n:{...n,detectOverflow:Pr},c=await(n.isRTL==null?void 0:n.isRTL(e)),h=await n.getElementRects({reference:t,floating:e,strategy:i}),{x:u,y:p}=Or(h,r,c),f=r,m=0,w={};for(let g=0;g<a.length;g++){let C=a[g];if(!C)continue;let{name:v,fn:L}=C,{x:E,y:$,data:U,reset:O}=await L({x:u,y:p,initialPlacement:r,placement:f,strategy:i,middlewareData:w,rects:h,platform:l,elements:{reference:t,floating:e}});u=E??u,p=$??p,w[v]={...w[v],...U},O&&m<Yi&&(m++,typeof O=="object"&&(O.placement&&(f=O.placement),O.rects&&(h=O.rects===!0?await n.getElementRects({reference:t,floating:e,strategy:i}):O.rects),{x:u,y:p}=Or(h,f,c)),g=-1)}return{x:u,y:p,placement:f,strategy:i,middlewareData:w}},Mr=t=>({name:"arrow",options:t,async fn(e){let{x:o,y:r,placement:i,rects:a,platform:n,elements:l,middlewareData:c}=e,{element:h,padding:u=0}=Ot(t,e)||{};if(h==null)return{};let p=mo(u),f={x:o,y:r},m=qe(i),w=Ie(m),g=await n.getDimensions(h),C=m==="y",v=C?"top":"left",L=C?"bottom":"right",E=C?"clientHeight":"clientWidth",$=a.reference[w]+a.reference[m]-f[m]-a.floating[w],U=f[m]-a.reference[m],O=await(n.getOffsetParent==null?void 0:n.getOffsetParent(h)),H=O?O[E]:0;(!H||!await(n.isElement==null?void 0:n.isElement(O)))&&(H=l.floating[E]||a.floating[w]);let X=$/2-U/2,et=H/2-g[w]/2-1,D=it(p[v],et),Xt=it(p[L],et),Yt=H-g[w]-Xt,ot=H/2-g[w]/2+X,Y=uo(D,ot,Yt),xt=!c.arrow&&Pt(i)!=null&&ot!==Y&&a.reference[w]/2-(ot<D?D:Xt)-g[w]/2<0,lt=xt?ot<D?ot-D:ot-Yt:0;return{[m]:f[m]+lt,data:{[m]:Y,centerOffset:ot-Y-lt,...xt&&{alignmentOffset:lt}},reset:xt}}});var Tr=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o,r;let{placement:i,middlewareData:a,rects:n,initialPlacement:l,platform:c,elements:h}=e,{mainAxis:u=!0,crossAxis:p=!0,fallbackPlacements:f,fallbackStrategy:m="bestFit",fallbackAxisSideDirection:w="none",flipAlignment:g=!0,...C}=Ot(t,e);if((o=a.arrow)!=null&&o.alignmentOffset)return{};let v=yt(i),L=nt(l),E=yt(l)===l,$=await(c.isRTL==null?void 0:c.isRTL(h.floating)),U=f||(E||!g?[ne(l)]:_r(l)),O=w!=="none";!f&&O&&U.push(...kr(l,g,w,$));let H=[l,...U],X=await c.detectOverflow(e,C),et=[],D=((r=a.flip)==null?void 0:r.overflows)||[];if(u&&et.push(X[v]),p){let Y=$r(i,n,$);et.push(X[Y[0]],X[Y[1]])}if(D=[...D,{placement:i,overflows:et}],!et.every(Y=>Y<=0)){var Xt,Yt;let Y=(((Xt=a.flip)==null?void 0:Xt.index)||0)+1,xt=H[Y];if(xt&&(!(p==="alignment"?L!==nt(xt):!1)||D.every(K=>nt(K.placement)===L?K.overflows[0]>0:!0)))return{data:{index:Y,overflows:D},reset:{placement:xt}};let lt=(Yt=D.filter(Lt=>Lt.overflows[0]<=0).sort((Lt,K)=>Lt.overflows[1]-K.overflows[1])[0])==null?void 0:Yt.placement;if(!lt)switch(m){case"bestFit":{var ot;let Lt=(ot=D.filter(K=>{if(O){let ft=nt(K.placement);return ft===L||ft==="y"}return!0}).map(K=>[K.placement,K.overflows.filter(ft=>ft>0).reduce((ft,hi)=>ft+hi,0)]).sort((K,ft)=>K[1]-ft[1])[0])==null?void 0:ot[0];Lt&&(lt=Lt);break}case"initialPlacement":lt=l;break}if(i!==lt)return{reset:{placement:lt}}}return{}}}};var Ki=new Set(["left","top"]);async function Gi(t,e){let{placement:o,platform:r,elements:i}=t,a=await(r.isRTL==null?void 0:r.isRTL(i.floating)),n=yt(o),l=Pt(o),c=nt(o)==="y",h=Ki.has(n)?-1:1,u=a&&c?-1:1,p=Ot(e,t),{mainAxis:f,crossAxis:m,alignmentAxis:w}=typeof p=="number"?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return l&&typeof w=="number"&&(m=l==="end"?w*-1:w),c?{x:m*u,y:f*h}:{x:f*h,y:m*u}}var Fr=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var o,r;let{x:i,y:a,placement:n,middlewareData:l}=e,c=await Gi(e,t);return n===((o=l.offset)==null?void 0:o.placement)&&(r=l.arrow)!=null&&r.alignmentOffset?{}:{x:i+c.x,y:a+c.y,data:{...c,placement:n}}}}},Dr=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){let{x:o,y:r,placement:i,platform:a}=e,{mainAxis:n=!0,crossAxis:l=!1,limiter:c={fn:L=>{let{x:E,y:$}=L;return{x:E,y:$}}},...h}=Ot(t,e),u={x:o,y:r},p=await a.detectOverflow(e,h),f=nt(i),m=po(f),w=u[m],g=u[f],C=(L,E)=>uo(E+p[L==="y"?"top":"left"],E,E-p[L==="y"?"bottom":"right"]);n&&(w=C(m,w)),l&&(g=C(f,g));let v=c.fn({...e,[m]:w,[f]:g});return{...v,data:{x:v.x-o,y:v.y-r,enabled:{[m]:n,[f]:l}}}}}};var Br=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){let{placement:o,rects:r,platform:i,elements:a}=e,{apply:n=()=>{},...l}=Ot(t,e),c=await i.detectOverflow(e,l),h=yt(o),u=Pt(o),p=nt(o)==="y",{width:f,height:m}=r.floating,w,g;h==="top"||h==="bottom"?(w=h,g=u===(await(i.isRTL==null?void 0:i.isRTL(a.floating))?"start":"end")?"left":"right"):(g=h,w=u==="end"?"top":"bottom");let C=m-c.top-c.bottom,v=f-c.left-c.right,L=it(m-c[w],C),E=it(f-c[g],v),$=e.middlewareData.shift,U=!$,O=L,H=E;$!=null&&$.enabled.x&&(H=v),$!=null&&$.enabled.y&&(O=C),U&&!u&&(p?H=f-2*J(c.left,c.right):O=m-2*J(c.top,c.bottom)),await n({...e,availableWidth:H,availableHeight:O});let X=await i.getDimensions(a.floating);return f!==X.width||m!==X.height?{reset:{rects:!0}}:{}}}};function Ve(){return typeof window<"u"}function Tt(t){return qr(t)?(t.nodeName||"").toLowerCase():"#document"}function N(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function st(t){var e;return(e=(qr(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function qr(t){return Ve()?t instanceof Node||t instanceof N(t).Node:!1}function Q(t){return Ve()?t instanceof Element||t instanceof N(t).Element:!1}function mt(t){return Ve()?t instanceof HTMLElement||t instanceof N(t).HTMLElement:!1}function Ir(t){return!Ve()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof N(t).ShadowRoot}function ce(t){let{overflow:e,overflowX:o,overflowY:r,display:i}=tt(t);return/auto|scroll|overlay|hidden|clip/.test(e+r+o)&&i!=="inline"&&i!=="contents"}function Vr(t){return/^(table|td|th)$/.test(Tt(t))}function de(t){try{if(t.matches(":popover-open"))return!0}catch{}try{return t.matches(":modal")}catch{return!1}}var Zi=/transform|translate|scale|rotate|perspective|filter/,Ji=/paint|layout|strict|content/,Mt=t=>!!t&&t!=="none",fo;function Ht(t){let e=Q(t)?tt(t):t;return Mt(e.transform)||Mt(e.translate)||Mt(e.scale)||Mt(e.rotate)||Mt(e.perspective)||!Ne()&&(Mt(e.backdropFilter)||Mt(e.filter))||Zi.test(e.willChange||"")||Ji.test(e.contain||"")}function Nr(t){let e=Ct(t);for(;mt(e)&&!Wt(e);){if(Ht(e))return e;if(de(e))return null;e=Ct(e)}return null}function Ne(){return fo==null&&(fo=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),fo}function Wt(t){return/^(html|body|#document)$/.test(Tt(t))}function tt(t){return N(t).getComputedStyle(t)}function he(t){return Q(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function Ct(t){if(Tt(t)==="html")return t;let e=t.assignedSlot||t.parentNode||Ir(t)&&t.host||st(t);return Ir(e)?e.host:e}function Ur(t){let e=Ct(t);return Wt(e)?(t.ownerDocument||t).body:mt(e)&&ce(e)?e:Ur(e)}function pt(t,e,o){var r;e===void 0&&(e=[]),o===void 0&&(o=!0);let i=Ur(t),a=i===((r=t.ownerDocument)==null?void 0:r.body),n=N(i);if(a){let l=Ue(n);return e.concat(n,n.visualViewport||[],ce(i)?i:[],l&&o?pt(l):[])}else return e.concat(i,pt(i,[],o))}function Ue(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function jr(t){let e=tt(t),o=parseFloat(e.width)||0,r=parseFloat(e.height)||0,i=mt(t),a=i?t.offsetWidth:o,n=i?t.offsetHeight:r,l=se(o)!==a||se(r)!==n;return l&&(o=a,r=n),{width:o,height:r,$:l}}function go(t){return Q(t)?t:t.contextElement}function jt(t){let e=go(t);if(!mt(e))return at(1);let o=e.getBoundingClientRect(),{width:r,height:i,$:a}=jr(e),n=(a?se(o.width):o.width)/r,l=(a?se(o.height):o.height)/i;return(!n||!Number.isFinite(n))&&(n=1),(!l||!Number.isFinite(l))&&(l=1),{x:n,y:l}}var Qi=at(0);function Xr(t){let e=N(t);return!Ne()||!e.visualViewport?Qi:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function ta(t,e,o){return e===void 0&&(e=!1),!!o&&e&&o===N(t)}function Ft(t,e,o,r){e===void 0&&(e=!1),o===void 0&&(o=!1);let i=t.getBoundingClientRect(),a=go(t),n=at(1);e&&(r?Q(r)&&(n=jt(r)):n=jt(t));let l=ta(a,o,r)?Xr(a):at(0),c=(i.left+l.x)/n.x,h=(i.top+l.y)/n.y,u=i.width/n.x,p=i.height/n.y;if(a&&r){let f=N(a),m=Q(r)?N(r):r,w=f,g=Ue(w);for(;g&&m!==w;){let C=jt(g),v=g.getBoundingClientRect(),L=tt(g),E=v.left+(g.clientLeft+parseFloat(L.paddingLeft))*C.x,$=v.top+(g.clientTop+parseFloat(L.paddingTop))*C.y;c*=C.x,h*=C.y,u*=C.x,p*=C.y,c+=E,h+=$,w=N(g),g=Ue(w)}}return Rt({width:u,height:p,x:c,y:h})}function He(t,e){let o=he(t).scrollLeft;return e?e.left+o:Ft(st(t)).left+o}function Yr(t,e){let o=t.getBoundingClientRect(),r=o.left+e.scrollLeft-He(t,o),i=o.top+e.scrollTop;return{x:r,y:i}}function ea(t){let{elements:e,rect:o,offsetParent:r,strategy:i}=t,a=i==="fixed",n=st(r),l=e?de(e.floating):!1;if(r===n||l&&a)return o;let c={scrollLeft:0,scrollTop:0},h=at(1),u=at(0),p=mt(r);if((p||!a)&&((Tt(r)!=="body"||ce(n))&&(c=he(r)),p)){let m=Ft(r);h=jt(r),u.x=m.x+r.clientLeft,u.y=m.y+r.clientTop}let f=n&&!p&&!a?Yr(n,c):at(0);return{width:o.width*h.x,height:o.height*h.y,x:o.x*h.x-c.scrollLeft*h.x+u.x+f.x,y:o.y*h.y-c.scrollTop*h.y+u.y+f.y}}function oa(t){return t.getClientRects?Array.from(t.getClientRects()):[]}function ra(t){let e=he(t),o=t.ownerDocument.body,r=J(t.scrollWidth,t.clientWidth,o.scrollWidth,o.clientWidth),i=J(t.scrollHeight,t.clientHeight,o.scrollHeight,o.clientHeight),a=-e.scrollLeft+He(t),n=-e.scrollTop;return tt(o).direction==="rtl"&&(a+=J(t.clientWidth,o.clientWidth)-r),{width:r,height:i,x:a,y:n}}var ia=25;function aa(t,e,o){o===void 0&&(o="viewport");let r=o==="layoutViewport",i=N(t),a=st(t),n=i.visualViewport,l=a.clientWidth,c=a.clientHeight,h=0,u=0;if(n){let f=!Ne()||e==="fixed";r?f||(h=-n.offsetLeft,u=-n.offsetTop):(l=n.width,c=n.height,f&&(h=n.offsetLeft,u=n.offsetTop))}if(He(a)<=0){let f=a.ownerDocument,m=f.body,w=getComputedStyle(m),g=f.compatMode==="CSS1Compat"&&parseFloat(w.marginLeft)+parseFloat(w.marginRight)||0,C=Math.abs(a.clientWidth-m.clientWidth-g),v=getComputedStyle(a).scrollbarGutter==="stable both-edges"?C/2:C;v<=ia&&(l-=v)}return{width:l,height:c,x:h,y:u}}function na(t,e){let o=Ft(t,!0,e==="fixed"),r=o.top+t.clientTop,i=o.left+t.clientLeft,a=jt(t),n=t.clientWidth*a.x,l=t.clientHeight*a.y,c=i*a.x,h=r*a.y;return{width:n,height:l,x:c,y:h}}function Hr(t,e,o){let r;if(e==="viewport"||e==="layoutViewport")r=aa(t,o,e);else if(e==="document")r=ra(st(t));else if(Q(e))r=na(e,o);else{let i=Xr(t);r={x:e.x-i.x,y:e.y-i.y,width:e.width,height:e.height}}return Rt(r)}function sa(t,e){let o=e.get(t);if(o)return o;let r=pt(t,[],!1).filter(l=>Q(l)&&Tt(l)!=="body"),i=null,a=tt(t).position==="fixed",n=a?Ct(t):t;for(;Q(n)&&!Wt(n);){let l=tt(n),c=Ht(n),h=i?i.position:a?"fixed":"";!c&&(h==="fixed"||h==="absolute"&&l.position==="static")?r=r.filter(p=>p!==n):i=l,n=Ct(n)}return e.set(t,r),r}function la(t){let{element:e,boundary:o,rootBoundary:r,strategy:i}=t,n=[...o==="clippingAncestors"?de(e)?[]:sa(e,this._c):[].concat(o),r],l=Hr(e,n[0],i),c=l.top,h=l.right,u=l.bottom,p=l.left;for(let f=1;f<n.length;f++){let m=Hr(e,n[f],i);c=J(m.top,c),h=it(m.right,h),u=it(m.bottom,u),p=J(m.left,p)}return{width:h-p,height:u-c,x:p,y:c}}function ca(t){let{width:e,height:o}=jr(t);return{width:e,height:o}}function da(t,e,o){let r=mt(e),i=st(e),a=o==="fixed",n=Ft(t,!0,a,e),l={scrollLeft:0,scrollTop:0},c=at(0);if((r||!a)&&((Tt(e)!=="body"||ce(i))&&(l=he(e)),r)){let f=Ft(e,!0,a,e);c.x=f.x+e.clientLeft,c.y=f.y+e.clientTop}!r&&i&&(c.x=He(i));let h=i&&!r&&!a?Yr(i,l):at(0),u=n.left+l.scrollLeft-c.x-h.x,p=n.top+l.scrollTop-c.y-h.y;return{x:u,y:p,width:n.width,height:n.height}}function wo(t){return tt(t).position==="static"}function Wr(t,e){if(!mt(t)||tt(t).position==="fixed")return null;if(e)return e(t);let o=t.offsetParent;return st(t)===o&&(o=o.ownerDocument.body),o}function Kr(t,e){let o=N(t);if(de(t))return o;if(!mt(t)){let i=Ct(t);for(;i&&!Wt(i);){if(Q(i)&&!wo(i))return i;i=Ct(i)}return o}let r=Wr(t,e);for(;r&&Vr(r)&&wo(r);)r=Wr(r,e);return r&&Wt(r)&&wo(r)&&!Ht(r)?o:r||Nr(t)||o}var ha=async function(t){let e=this.getOffsetParent||Kr,o=this.getDimensions,r=await o(t.floating);return{reference:da(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function ua(t){return tt(t).direction==="rtl"}var ue={convertOffsetParentRelativeRectToViewportRelativeRect:ea,getDocumentElement:st,getClippingRect:la,getOffsetParent:Kr,getElementRects:ha,getClientRects:oa,getDimensions:ca,getScale:jt,isElement:Q,isRTL:ua};function Gr(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function pa(t,e,o){let r=null,i,a=st(t);function n(){var u;clearTimeout(i),(u=r)==null||u.disconnect(),r=null}function l(u,p){u===void 0&&(u=!1),p===void 0&&(p=1),n();let f=t.getBoundingClientRect(),{left:m,top:w,width:g,height:C}=f;if(u||e(),!g||!C)return;let v=le(w),L=le(a.clientWidth-(m+g)),E=le(a.clientHeight-(w+C)),$=le(m),O={rootMargin:-v+"px "+-L+"px "+-E+"px "+-$+"px",threshold:J(0,it(1,p))||1},H=!0;function X(et){let D=et[0].intersectionRatio;if(!Gr(f,t.getBoundingClientRect()))return l();if(D!==p){if(!H)return l();D?l(!1,D):i=setTimeout(()=>{l(!1,1e-7)},1e3)}H=!1}try{r=new IntersectionObserver(X,{...O,root:a.ownerDocument})}catch{r=new IntersectionObserver(X,O)}r.observe(t)}let c=N(t),h=()=>l(o);return c.addEventListener("resize",h),l(!0),()=>{c.removeEventListener("resize",h),n()}}function Zr(t,e,o,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:a=!0,elementResize:n=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:c=!1}=r,h=go(t),u=i||a?[...h?pt(h):[],...e?pt(e):[]]:[];u.forEach(v=>{i&&v.addEventListener("scroll",o),a&&v.addEventListener("resize",o)});let p=h&&l?pa(h,o,a):null,f=-1,m=null;n&&(m=new ResizeObserver(v=>{let[L]=v;L&&L.target===h&&m&&e&&(m.unobserve(e),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var E;(E=m)==null||E.observe(e)})),o()}),h&&!c&&m.observe(h),e&&m.observe(e));let w,g=c?Ft(t):null;c&&C();function C(){let v=Ft(t);g&&!Gr(g,v)&&o(),g=v,w=requestAnimationFrame(C)}return o(),()=>{var v;u.forEach(L=>{i&&L.removeEventListener("scroll",o),a&&L.removeEventListener("resize",o)}),p?.(),(v=m)==null||v.disconnect(),m=null,c&&cancelAnimationFrame(w)}}var Jr=Fr;var Qr=Dr,ti=Tr,vo=Br;var ei=Mr;var oi=(t,e,o)=>{let r=new Map,i=o??{},a={...ue,...i.platform,_c:r};return Rr(t,e,{...i,platform:a})};function ri(t){return ma(t)}function bo(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function ma(t){for(let e=t;e;e=bo(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=bo(t);e;e=bo(e)){if(!(e instanceof Element))continue;let o=getComputedStyle(e);if(o.display!=="contents"&&(o.position!=="static"||Ht(o)||e.tagName==="BODY"))return e}return null}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function ii(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var fa=!!globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),x=class extends F{constructor(){super(...arguments),this.localize=new W(this),this.SUPPORTS_POPOVER=!1,this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom"),r=0,i=0,a=0,n=0,l=0,c=0,h=0,u=0;o?t.top<e.top?(r=t.left,i=t.bottom,a=t.right,n=t.bottom,l=e.left,c=e.top,h=e.right,u=e.top):(r=e.left,i=e.bottom,a=e.right,n=e.bottom,l=t.left,c=t.top,h=t.right,u=t.top):t.left<e.left?(r=t.right,i=t.top,a=e.left,n=e.top,l=t.right,c=t.bottom,h=e.left,u=e.bottom):(r=e.right,i=e.top,a=t.left,n=t.top,l=e.right,c=e.bottom,h=t.left,u=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${a}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.SUPPORTS_POPOVER=fa,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||ii(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||!this.isConnected||(this.popup?.showPopover?.(),this.cleanup=Zr(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl||!this.popup)return;let t=[Jr({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(vo({apply:({rects:r})=>{let i=this.sync==="width"||this.sync==="both",a=this.sync==="height"||this.sync==="both";this.popup.style.width=i?`${r.reference.width}px`:"",this.popup.style.height=a?`${r.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let e;this.SUPPORTS_POPOVER&&!ii(this.anchor)&&this.boundary==="scroll"&&(e=pt(this.anchorEl).filter(r=>r instanceof Element)),this.flip&&t.push(ti({boundary:this.flipBoundary||e,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(Qr({boundary:this.shiftBoundary||e,padding:this.shiftPadding})),this.autoSize?t.push(vo({boundary:this.autoSizeBoundary||e,padding:this.autoSizePadding,apply:({availableWidth:r,availableHeight:i})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${i}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${r}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(ei({element:this.arrowEl,padding:this.arrowPadding}));let o=this.SUPPORTS_POPOVER?r=>ue.getOffsetParent(r,ri):ue.getOffsetParent;oi(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.SUPPORTS_POPOVER?"absolute":"fixed",platform:{...ue,getOffsetParent:o}}).then(({x:r,y:i,middlewareData:a,placement:n})=>{let l=this.localize.dir()==="rtl",c={top:"bottom",right:"left",bottom:"top",left:"right"}[n.split("-")[0]];if(this.setAttribute("data-current-placement",n),Object.assign(this.popup.style,{left:`${r}px`,top:`${i}px`}),this.arrow){let h=a.arrow.x,u=a.arrow.y,p="",f="",m="",w="";if(this.arrowPlacement==="start"){let g=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";p=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",f=l?g:"",w=l?"":g}else if(this.arrowPlacement==="end"){let g=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";f=l?"":g,w=l?g:"",m=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(w=typeof h=="number"?"calc(50% - var(--arrow-size-diagonal))":"",p=typeof u=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(w=typeof h=="number"?`${h}px`:"",p=typeof u=="number"?`${u}px`:"");Object.assign(this.arrowEl.style,{top:p,right:f,bottom:m,left:w,[c]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new Ar)}render(){return z`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${q({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${q({popup:!0,"popup-active":this.active,"popup-fixed":!this.SUPPORTS_POPOVER,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?z`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};x.css=Sr;s([P(".popup")],x.prototype,"popup",2);s([P(".arrow")],x.prototype,"arrowEl",2);s([d({attribute:!1,type:Boolean})],x.prototype,"SUPPORTS_POPOVER",2);s([d()],x.prototype,"anchor",2);s([d({type:Boolean,reflect:!0})],x.prototype,"active",2);s([d({reflect:!0})],x.prototype,"placement",2);s([d()],x.prototype,"boundary",2);s([d({type:Number})],x.prototype,"distance",2);s([d({type:Number})],x.prototype,"skidding",2);s([d({type:Boolean})],x.prototype,"arrow",2);s([d({attribute:"arrow-placement"})],x.prototype,"arrowPlacement",2);s([d({attribute:"arrow-padding",type:Number})],x.prototype,"arrowPadding",2);s([d({type:Boolean})],x.prototype,"flip",2);s([d({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],x.prototype,"flipFallbackPlacements",2);s([d({attribute:"flip-fallback-strategy"})],x.prototype,"flipFallbackStrategy",2);s([d({type:Object})],x.prototype,"flipBoundary",2);s([d({attribute:"flip-padding",type:Number})],x.prototype,"flipPadding",2);s([d({type:Boolean})],x.prototype,"shift",2);s([d({type:Object})],x.prototype,"shiftBoundary",2);s([d({attribute:"shift-padding",type:Number})],x.prototype,"shiftPadding",2);s([d({attribute:"auto-size"})],x.prototype,"autoSize",2);s([d()],x.prototype,"sync",2);s([d({type:Object})],x.prototype,"autoSizeBoundary",2);s([d({attribute:"auto-size-padding",type:Number})],x.prototype,"autoSizePadding",2);s([d({attribute:"hover-bridge",type:Boolean})],x.prototype,"hoverBridge",2);x=s([M("wa-popup")],x);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *//*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var ai=A`
  :host {
    --height: var(--wa-form-control-toggle-size);
    --width: calc(var(--height) * 1.75);
    --thumb-size: 0.75em;

    display: inline-flex;
    line-height: var(--wa-form-control-value-line-height);
  }

  label {
    position: relative;
    display: flex;
    align-items: center;
    font: inherit;
    color: var(--wa-form-control-value-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch {
    flex: 0 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--height);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    transition-property: translate, background, border-color, box-shadow;
    transition-duration: var(--wa-transition-normal);
    transition-timing-function: var(--wa-transition-easing);
  }

  :host([did-ssr]:not(:defined)) .switch {
    transition-property: unset;
    transition-duration: unset;
    transition-timing-function: unset;
  }

  .switch .thumb {
    aspect-ratio: 1 / 1;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--wa-form-control-border-color);
    border-radius: 50%;
    translate: calc((var(--width) - var(--height)) / -2);
    transition: inherit;
  }
  .switch .thumb:dir(rtl) {
    translate: calc((var(--width) - var(--height)) / 2);
  }

  .input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Focus */
  label:not(.disabled) .input:focus-visible ~ [part~='control'] {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Checked */
  .checked .switch {
    background-color: var(--wa-form-control-activated-color);
    border-color: var(--wa-form-control-activated-color);
  }

  .checked .switch .thumb {
    background-color: var(--wa-color-surface-default);
    translate: calc((var(--width) - var(--height)) / 2);
  }
  .checked .switch .thumb:dir(rtl) {
    translate: calc((var(--width) - var(--height)) / -2);
  }

  /* Disabled */
  label:has(> :disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [part~='label'] {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) [part~='label']::after {
    content: var(--wa-form-control-required-content);
    color: var(--wa-form-control-required-content-color);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }

  @media (forced-colors: active) {
    :checked:enabled + .switch:hover .thumb,
    :checked + .switch .thumb {
      background-color: ButtonText;
    }
  }
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ni=qt(class extends bt{constructor(t){if(super(t),t.type!==G.PROPERTY&&t.type!==G.ATTRIBUTE&&t.type!==G.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!fr(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===B||e===S)return e;let o=t.element,r=t.name;if(t.type===G.PROPERTY){if(e===o[r])return B}else if(t.type===G.BOOLEAN_ATTRIBUTE){if(!!e===o.hasAttribute(r))return B}else if(t.type===G.ATTRIBUTE&&o.getAttribute(r)===e+"")return B;return wr(t),e}});/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var R=class extends I{constructor(){super(...arguments),this.hasSlotController=new Bt(this,"hint"),this.localize=new W(this),this.title="",this.name=null,this._value=this.getAttribute("value")??null,this.size="m",this.disabled=!1,this._checked=null,this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint="",this.withHint=!1}static get validators(){return[...super.validators,pe()]}get value(){return this._value??"on"}set value(t){this._value=t}handleSizeChange(){gt(this.localName,this.size)}get checked(){return this.valueHasChanged?!!this._checked:this._checked??this.defaultChecked}set checked(t){this._checked=!!t,this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleKeyDown(t){let e=this.localize.dir()==="rtl";t.key==="ArrowLeft"&&(t.preventDefault(),this.checked=e,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})),t.key==="ArrowRight"&&(t.preventDefault(),this.checked=!e,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}willUpdate(t){super.willUpdate(t),(t.has("value")||t.has("checked")||t.has("defaultChecked")||t.has("disabled"))&&this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){if(this.didSSR&&!this.hasUpdated){this.updateComplete.then(()=>{this.handleValueOrCheckedChange()});return}this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked),this.customStates.set("checked",this.checked),this.updateValidity()}handleDisabledChange(){this.updateValidity()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}setValue(t,e){if(!this.checked){this.internals.setFormValue(null,null);return}this.internals.setFormValue(t??"on",e)}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}render(){let t=this.hasSlotController.test("hint","withHint"),e=this.hint?!0:!!t,o=this.didSSR&&!this.hasUpdated?this.checked:this.defaultChecked,r=this.didSSR&&!this.hasUpdated?null:ni(this.checked);return z`
      <label
        part="base switch"
        class=${q({checked:this.checked,disabled:this.disabled})}
      >
        <input
          class="input"
          type="checkbox"
          title=${this.title}
          name=${V(this.name)}
          value=${V(this.value)}
          .checked=${V(r)}
          ?checked=${o}
          ?disabled=${this.disabled}
          ?required=${this.required}
          role="switch"
          aria-checked=${this.checked?"true":"false"}
          aria-describedby="hint"
          @click=${this.handleClick}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch">
          <span part="thumb" class="thumb"></span>
        </span>

        <slot part="label" class="label"></slot>
      </label>

      <slot
        id="hint"
        name="hint"
        part="hint"
        class=${q({"has-slotted":e})}
        aria-hidden=${e?"false":"true"}
        >${this.hint}</slot
      >
    `}};R.shadowRootOptions={...I.shadowRootOptions,delegatesFocus:!0};R.css=[De,vt,ai];s([P('input[type="checkbox"]')],R.prototype,"input",2);s([d()],R.prototype,"title",2);s([d({reflect:!0})],R.prototype,"name",2);s([d({reflect:!0})],R.prototype,"value",1);s([d({reflect:!0})],R.prototype,"size",2);s([_("size")],R.prototype,"handleSizeChange",1);s([d({type:Boolean})],R.prototype,"disabled",2);s([d({type:Boolean,attribute:!1})],R.prototype,"checked",1);s([d({type:Boolean,attribute:"checked",reflect:!0})],R.prototype,"defaultChecked",2);s([d({type:Boolean,reflect:!0})],R.prototype,"required",2);s([d({attribute:"hint"})],R.prototype,"hint",2);s([d({attribute:"with-hint",type:Boolean})],R.prototype,"withHint",2);s([_(["checked","defaultChecked"])],R.prototype,"handleStateChange",1);s([_("disabled",{waitUntilFirstUpdate:!0})],R.prototype,"handleDisabledChange",1);R=s([M("wa-switch")],R);R.disableWarning?.("change-in-update");/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *//*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var si=A`
  :host {
    --max-width: 30ch;

    /** These styles are added so we don't interfere in the DOM. */
    display: inline-block;
    position: absolute;

    /** Defaults for inherited CSS properties */
    color: var(--wa-tooltip-content-color);
    font-size: var(--wa-tooltip-font-size);
    line-height: var(--wa-tooltip-line-height);
    text-align: start;
    white-space: normal;
  }

  .tooltip {
    --arrow-size: var(--wa-tooltip-arrow-size);
    --arrow-color: var(--wa-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: 1000;
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--wa-tooltip-border-radius);
    background-color: var(--wa-tooltip-background-color);
    border: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    padding: 0.25em 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  .tooltip {
    --popup-border-width: var(--wa-tooltip-border-width);

    /* Inset box-shadow, not a border: Safari seams a clip-path edge that runs along a border. */
    &::part(arrow) {
      box-shadow: inset calc(-1 * var(--wa-tooltip-border-width)) calc(-1 * var(--wa-tooltip-border-width)) 0 0
        var(--wa-tooltip-border-color);
    }
  }
`;var li="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";var ci=(t=21)=>{let e="",o=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)e+=li[o[t]&63];return e};/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */function di(t=""){return`${t}${ci()}`}/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */var k=class extends F{constructor(){super(...arguments),this.dismissedByPress=!1,this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.dismissedByPress=!1,this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{if(this.hasTrigger("click")){this.open?this.hide():this.show();return}this.hasTrigger("manual")||this.lightDismiss()},this.handleFocus=()=>{this.dismissedByPress||this.hasTrigger("focus")&&this.show()},this.handleMouseDown=()=>{this.hasTrigger("click")||this.hasTrigger("manual")||this.lightDismiss()},this.handleDocumentKeyDown=t=>{this.hasTrigger("manual")||t.key==="Escape"&&this.open&&Fe(this)&&(t.preventDefault(),t.stopPropagation(),this.hide())},this.handleDocumentClick=t=>{this.hasTrigger("manual")||this.anchor&&t.composedPath().includes(this.anchor)||this.hide()},this.handleMouseOver=()=>{this.dismissedByPress||this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=t=>{let e=t.relatedTarget,o=!!(e&&this.anchor?.contains(e)),r=!!(e&&this.contains(e));o||r||(this.dismissedByPress=!1,this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>{this.hide()},this.hideDelay)))}}connectedCallback(){super.connectedCallback(),typeof document<"u"&&(this.eventController.signal.aborted&&(this.eventController=new AbortController),this.addEventListener("mouseout",this.handleMouseOut),this.dismissedByPress=!1,this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=di("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange())}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("click",this.handleDocumentClick),Vt(this),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(t){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition()),super.firstUpdated(t)}lightDismiss(){clearTimeout(this.hoverTimeout),this.dismissedByPress=!0,this.hide()}hasTrigger(t){return this.trigger.split(" ").includes(t)}addToAriaLabelledBy(t,e){let r=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);r.includes(e)||(r.push(e),t.setAttribute("aria-labelledby",r.join(" ")))}removeFromAriaLabelledBy(t,e){let i=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(a=>a!==e);i.length>0?t.setAttribute("aria-labelledby",i.join(" ")):t.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;let t=new Oe;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.hasTrigger("manual")||(document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),document.addEventListener("click",this.handleDocumentClick,{signal:this.eventController.signal}),Te(this)),this.body.hidden=!1,this.popup.active=!0,await Ut(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new Re)}else{let t=new Pe;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("click",this.handleDocumentClick),Vt(this),await Ut(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new Me)}}handleForChange(){let t=this.getRootNode?.();if(!t)return;let e=this.for?t.getElementById?.(this.for):null,o=this.anchor;if(e===o)return;this.dismissedByPress=!1;let{signal:r}=this.eventController;e&&(this.addToAriaLabelledBy(e,this.id),e.addEventListener("blur",this.handleBlur,{capture:!0,signal:r}),e.addEventListener("focus",this.handleFocus,{capture:!0,signal:r}),e.addEventListener("click",this.handleClick,{signal:r}),e.addEventListener("mousedown",this.handleMouseDown,{signal:r}),e.addEventListener("mouseover",this.handleMouseOver,{signal:r}),e.addEventListener("mouseout",this.handleMouseOut,{signal:r})),o&&(this.removeFromAriaLabelledBy(o,this.id),o.removeEventListener("blur",this.handleBlur,{capture:!0}),o.removeEventListener("focus",this.handleFocus,{capture:!0}),o.removeEventListener("click",this.handleClick),o.removeEventListener("mousedown",this.handleMouseDown),o.removeEventListener("mouseover",this.handleMouseOver),o.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=e}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,Nt(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,Nt(this,"wa-after-hide")}render(){return z`
      <wa-popup
        part="base tooltip"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${q({tooltip:!0,"tooltip-open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        flip
        shift
        ?arrow=${!this.withoutArrow}
        hover-bridge
        .anchor=${this.anchor}
      >
        <div part="body" class="body">
          <slot></slot>
        </div>
      </wa-popup>
    `}};k.css=si;k.dependencies={"wa-popup":x};s([P("slot:not([name])")],k.prototype,"defaultSlot",2);s([P(".body")],k.prototype,"body",2);s([P("wa-popup")],k.prototype,"popup",2);s([d()],k.prototype,"placement",2);s([d({type:Boolean,reflect:!0})],k.prototype,"disabled",2);s([d({type:Number})],k.prototype,"distance",2);s([d({type:Boolean,reflect:!0})],k.prototype,"open",2);s([d({type:Number})],k.prototype,"skidding",2);s([d({attribute:"show-delay",type:Number})],k.prototype,"showDelay",2);s([d({attribute:"hide-delay",type:Number})],k.prototype,"hideDelay",2);s([d()],k.prototype,"trigger",2);s([d({attribute:"without-arrow",type:Boolean,reflect:!0})],k.prototype,"withoutArrow",2);s([d()],k.prototype,"for",2);s([j()],k.prototype,"anchor",2);s([_("open",{waitUntilFirstUpdate:!0})],k.prototype,"handleOpenChange",1);s([_("for")],k.prototype,"handleForChange",1);s([_(["distance","placement","skidding"])],k.prototype,"handleOptionsChange",1);s([_("disabled")],k.prototype,"handleDisabledChange",1);k=s([M("wa-tooltip")],k);/*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license */
