const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let a=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new a(s,t,i)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:o,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:g}=Object,u=globalThis,p=u.trustedTypes,m=p?p.emptyScript:"",_=u.reactiveElementPolyfillSupport,f=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!o(t,e),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);a?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),a=t.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const r=a.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const r=this.constructor;if(!1===s&&(a=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??y)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==a||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[f("elementProperties")]=new Map,$[f("finalized")]=new Map,_?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,x=t=>t,A=w.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",L=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+L,H=`<${C}>`,M=document,k=()=>M.createComment(""),P=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,V="[ \t\n\f\r]",Q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,N=/>/g,U=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,T=/"/g,j=/^(?:script|style|textarea|title)$/i,Z=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),R=Z(1),D=Z(2),I=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),F=new WeakMap,q=M.createTreeWalker(M,129);function K(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,s=[];let a,r=2===e?"<svg>":3===e?"<math>":"",n=Q;for(let e=0;e<i;e++){const i=t[e];let o,l,c=-1,h=0;for(;h<i.length&&(n.lastIndex=h,l=n.exec(i),null!==l);)h=n.lastIndex,n===Q?"!--"===l[1]?n=z:void 0!==l[1]?n=N:void 0!==l[2]?(j.test(l[2])&&(a=RegExp("</"+l[2],"g")),n=U):void 0!==l[3]&&(n=U):n===U?">"===l[0]?(n=a??Q,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,o=l[1],n=void 0===l[3]?U:'"'===l[3]?T:B):n===T||n===B?n=U:n===z||n===N?n=Q:(n=U,a=void 0);const d=n===U&&t[e+1].startsWith("/>")?" ":"";r+=n===Q?i+H:c>=0?(s.push(o),i.slice(0,c)+S+i.slice(c)+L+d):i+L+(-2===c?e:d)}return[K(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,r=0;const n=t.length-1,o=this.parts,[l,c]=G(t,e);if(this.el=J.createElement(l,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&o.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[r++],i=s.getAttribute(t).split(L),n=/([.?@])?(.*)/.exec(e);o.push({type:1,index:a,name:n[2],strings:i,ctor:"."===n[1]?it:"?"===n[1]?st:"@"===n[1]?at:et}),s.removeAttribute(t)}else t.startsWith(L)&&(o.push({type:6,index:a}),s.removeAttribute(t));if(j.test(s.tagName)){const t=s.textContent.split(L),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],k()),q.nextNode(),o.push({type:2,index:++a});s.append(t[e],k())}}}else if(8===s.nodeType)if(s.data===C)o.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(L,t+1));)o.push({type:7,index:a}),t+=L.length-1}a++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===I)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const r=P(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=X(t,a._$AS(t,e.values),a,s)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);q.currentNode=s;let a=q.nextNode(),r=0,n=0,o=i[0];for(;void 0!==o;){if(r===o.index){let e;2===o.type?e=new tt(a,a.nextSibling,this,t):1===o.type?e=new o.ctor(a,o.name,o.strings,this,t):6===o.type&&(e=new rt(a,this,t)),this._$AV.push(e),o=i[++n]}r!==o?.index&&(a=q.nextNode(),r++)}return q.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),P(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Y(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new J(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new tt(this.O(k()),this.O(k()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const a=this.strings;let r=!1;if(void 0===a)t=X(this,t,e,0),r=!P(t)||t!==this._$AH&&t!==I,r&&(this._$AH=t);else{const s=t;let n,o;for(t=a[0],n=0;n<a.length-1;n++)o=X(this,s[i+n],e,n),o===I&&(o=this._$AH[n]),r||=!P(o)||o!==this._$AH[n],o===W?t=W:t!==W&&(t+=(o??"")+a[n+1]),this._$AH[n]=o}r&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class at extends et{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??W)===I)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(J,tt),(w.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;class lt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new tt(e.insertBefore(k(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}lt._$litElement$=!0,lt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:lt});const ct=ot.litElementPolyfillSupport;ct?.({LitElement:lt}),(ot.litElementVersions??=[]).push("4.2.2");const ht=["#d32f2f","#f57c00","#fbc02d","#c0ca33","#7cb342","#2e7d32"],dt=t=>Array.isArray(t)?5===t.length?[...t,ht[5]]:t:ht,gt=["charging"],ut=[3.7,11,50],pt=(t,e,i)=>{t.dispatchEvent(new CustomEvent(e,{detail:i,bubbles:!0,composed:!0}))};var mt={"card.battery_missing":"Battery level entity {entity} not found","card.battery_not_numeric":"The battery level entity does not report a number ({state}). Please select the battery level sensor in %.","card.charging":"charging","card.description":"Electric car card with a 5-segment battery, charging bolt and configurable values.","card.hint":"Please select the battery level entity (entities.battery) in the editor.","card.not_found":"not found","card.soc":"Battery level {soc} %","card.soc_unknown":"Battery level unknown","editor.add_note":"Select an entity to add a value.","editor.charging":"Charging","editor.charging_note":"The bolt is green while the car is charging. Its pulse and glow get stronger with higher charging power (4 levels).","editor.colors":"Battery segment colors","editor.entities":"Entities","editor.full_color":"Full (100 %)","editor.general":"General","editor.left":"left","editor.move_down":"Move down","editor.move_up":"Move up","editor.remove":"Remove","editor.reset_colors":"Default colors","editor.right":"right","editor.values":"Values around the car","editor.values_note":"The first half is shown on the left, the second half on the right.","helper.charging_state":"Without a charging state, the car counts as charging while the charging power is above 0.","helper.charging_states":"Default: charging","helper.device":"Only shows the entities of this device in the pickers below.","helper.image":"Leave empty to use the vehicle selected above.","helper.language":"Language of the card and editor texts. Values are always formatted by Home Assistant.","helper.silhouette":"Built-in drawing. A custom image below replaces it.","label.battery":"Battery level (required)","label.charging_power":"Charging power","label.charging_state":"Charging state","label.charging_states":"States that count as charging","label.device":"Device (optional)","label.entity":"Entity","label.icon":"Icon (empty = entity icon)","label.image":"Custom image (URL, e.g. /local/car.png)","label.language":"Language","label.name":"Name","label.plate":"Licence plate","label.power_1":"Level 1 up to","label.power_2":"Level 2 up to","label.power_3":"Level 3 up to (level 4 above)","label.show_name":"Show name","label.show_plate":"Show licence plate","label.silhouette":"Vehicle","label.value_name":"Label (empty = entity name)","language.auto":"Automatic (Home Assistant language)","language.name":"English","silhouette.hatchback":"Hatchback","silhouette.race":"Formula race car","silhouette.sedan":"Sedan","silhouette.suv":"SUV","silhouette.tractor":"Tractor","silhouette.van":"Van","silhouette.vintage":"Vintage car"};const _t={en:mt,de:{"card.battery_missing":"Ladestand-Entität {entity} nicht gefunden","card.battery_not_numeric":"Die Ladestand-Entität liefert keine Zahl ({state}). Bitte den Sensor für den Ladestand in % wählen.","card.charging":"lädt","card.description":"Auto-Karte mit Batterie in 5 Segmenten, Lade-Blitz und frei wählbaren Werten.","card.hint":"Bitte im Editor die Entität für den Ladestand (entities.battery) wählen.","card.not_found":"nicht gefunden","card.soc":"Ladestand {soc} %","card.soc_unknown":"Ladestand unbekannt","editor.add_note":"Entität wählen, um einen Wert hinzuzufügen.","editor.charging":"Laden","editor.charging_note":"Der Blitz ist grün, solange das Auto lädt. Puls und Leuchten werden mit steigender Ladeleistung stärker (4 Stufen).","editor.colors":"Farben der Batteriesegmente","editor.entities":"Entitäten","editor.full_color":"Voll (100 %)","editor.general":"Allgemein","editor.left":"links","editor.move_down":"Nach unten","editor.move_up":"Nach oben","editor.remove":"Entfernen","editor.reset_colors":"Standardfarben","editor.right":"rechts","editor.values":"Werte rund um das Auto","editor.values_note":"Die erste Hälfte steht links, die zweite rechts.","helper.charging_state":"Ohne Ladezustand gilt das Auto als ladend, sobald die Ladeleistung über 0 liegt.","helper.charging_states":"Standard: charging","helper.device":"Zeigt in den Auswahlfeldern unten nur die Entitäten dieses Geräts.","helper.image":"Leer lassen, um das oben gewählte Fahrzeug zu zeigen.","helper.language":"Sprache der Texte von Karte und Editor. Werte formatiert immer Home Assistant.","helper.silhouette":"Eingebaute Zeichnung. Ein eigenes Bild darunter ersetzt sie.","label.battery":"Ladestand (Pflicht)","label.charging_power":"Ladeleistung","label.charging_state":"Ladezustand","label.charging_states":"Zustände, die als Laden gelten","label.device":"Gerät (optional)","label.entity":"Entität","label.icon":"Symbol (leer = Symbol der Entität)","label.image":"Eigenes Bild (URL, z. B. /local/auto.png)","label.language":"Sprache","label.name":"Name","label.plate":"Kennzeichen","label.power_1":"Stufe 1 bis","label.power_2":"Stufe 2 bis","label.power_3":"Stufe 3 bis (darüber Stufe 4)","label.show_name":"Name anzeigen","label.show_plate":"Kennzeichen anzeigen","label.silhouette":"Fahrzeug","label.value_name":"Bezeichnung (leer = Name der Entität)","language.auto":"Automatisch (Sprache von Home Assistant)","language.name":"Deutsch","silhouette.hatchback":"Kompaktwagen","silhouette.race":"Formel-Rennwagen","silhouette.sedan":"Limousine","silhouette.suv":"SUV","silhouette.tractor":"Traktor","silhouette.van":"Transporter","silhouette.vintage":"Oldtimer"}},ft=Object.keys(_t);function vt(t,e,i={},s){let a=_t[function(t,e){if(e&&"auto"!==e&&_t[e])return e;const i=String(t&&(t.locale&&t.locale.language||t.language)||"en").toLowerCase();if(_t[i])return i;const s=i.split("-")[0];return _t[s]?s:"en"}(t,s)][e]??mt[e];if(void 0!==a){for(const[t,e]of Object.entries(i))a=a.replace(`{${t}}`,e);return a}}const yt=(t,e,i,s)=>D`
  <circle class="tyre" cx=${t} cy=${e} r=${i}></circle>
  <circle class="rim" cx=${t} cy=${e} r=${s}></circle>
`,bt=(t,e,i,s)=>{const a=.71*s;return D`
    <circle class="tyre" cx=${t} cy=${e} r=${i}></circle>
    <circle class="rim" cx=${t} cy=${e} r=${s}></circle>
    <path class="spokes" d="M${t-s} ${e} H${t+s} M${t} ${e-s} V${e+s}
      M${t-a} ${e-a} L${t+a} ${e+a} M${t-a} ${e+a} L${t+a} ${e-a}"></path>
    <circle class="hub" cx=${t} cy=${e} r="3"></circle>
  `},$t=(t=180)=>D`<ellipse class="shadow" cx="200" cy="142" rx=${t} ry="5"></ellipse>`,wt={suv:{battery:{left:50,top:58,width:42},draw:()=>D`
      ${$t()}
      <path class="body" d="M28 112 V88 Q28 72 44 68 L60 64 L70 36 Q74 26 86 26 H238 Q252 26 262 34
        L300 62 L352 70 Q372 74 374 92 V112 Q374 120 366 120 H338
        A33 33 0 0 0 272 120 H128 A33 33 0 0 0 62 120 H36 Q28 120 28 112 Z"></path>
      <path class="window" d="M80 34 H164 V62 H70 Z M172 34 H236 Q246 34 254 40 L284 62 H172 Z"></path>
      <path class="line" d="M168 64 V112 M262 66 Q266 90 262 112"></path>
      <path class="line" d="M64 84 H370"></path>
      <rect class="light front" x="356" y="78" width="16" height="7" rx="3"></rect>
      <rect class="light rear" x="29" y="76" width="9" height="10" rx="3"></rect>
      <path class="mirror" d="M286 56 l10 -2 l2 8 l-9 1 Z"></path>
      ${yt(305,120,26,14)}
      ${yt(95,120,26,14)}
    `},sedan:{battery:{left:50,top:62,width:40},draw:()=>D`
      ${$t()}
      <path class="body" d="M24 112 V92 Q24 80 38 78 L96 74 Q118 46 140 44 H236 Q252 44 262 52
        L292 74 L356 80 Q376 84 376 100 V112 Q376 120 368 120 H330
        A25 25 0 0 0 280 120 H120 A25 25 0 0 0 70 120 H32 Q24 120 24 112 Z"></path>
      <path class="window" d="M108 72 Q124 52 142 50 H184 V72 Z M192 50 H234 Q246 50 254 56 L276 72 H192 Z"></path>
      <path class="line" d="M188 74 V114 M60 88 H370"></path>
      <rect class="light front" x="360" y="86" width="15" height="6" rx="3"></rect>
      <rect class="light rear" x="25" y="84" width="8" height="8" rx="3"></rect>
      <path class="mirror" d="M276 66 l10 -2 l2 7 l-9 1 Z"></path>
      ${yt(305,120,22,12)}
      ${yt(95,120,22,12)}
    `},hatchback:{battery:{left:50,top:58,width:40},draw:()=>D`
      ${$t(160)}
      <path class="body" d="M50 112 V82 Q50 62 62 56 L84 36 Q90 30 100 30 H220 Q232 30 242 38
        L280 66 L330 74 Q350 78 352 96 V112 Q352 120 344 120 H314
        A25 25 0 0 0 264 120 H136 A25 25 0 0 0 86 120 H58 Q50 120 50 112 Z"></path>
      <path class="window" d="M90 40 Q94 36 102 36 H158 V64 H72 Z M166 36 H218 Q228 36 236 42 L262 64 H166 Z"></path>
      <path class="line" d="M162 66 V112 M56 80 H348"></path>
      <rect class="light front" x="336" y="82" width="14" height="6" rx="3"></rect>
      <rect class="light rear" x="51" y="68" width="8" height="12" rx="3"></rect>
      <path class="mirror" d="M262 58 l10 -2 l2 7 l-9 1 Z"></path>
      ${yt(289,120,22,12)}
      ${yt(111,120,22,12)}
    `},van:{battery:{left:50,top:58,width:42},draw:()=>D`
      ${$t()}
      <path class="body" d="M22 112 V36 Q22 22 36 22 H262 Q276 22 284 32 L318 66 L360 74
        Q378 78 378 96 V112 Q378 120 370 120 H340
        A25 25 0 0 0 290 120 H120 A25 25 0 0 0 70 120 H30 Q22 120 22 112 Z"></path>
      <path class="window" d="M34 32 H120 V62 H34 Z M128 32 H220 V62 H128 Z
        M228 32 H262 Q270 32 276 38 L300 62 H228 Z"></path>
      <path class="line" d="M124 64 V112 M224 64 V112 M28 80 H372"></path>
      <rect class="light front" x="362" y="82" width="14" height="7" rx="3"></rect>
      <rect class="light rear" x="23" y="68" width="8" height="14" rx="3"></rect>
      <path class="mirror" d="M300 54 l10 -2 l2 8 l-9 1 Z"></path>
      ${yt(315,120,22,12)}
      ${yt(95,120,22,12)}
    `},race:{battery:{left:34,top:64,width:28},draw:()=>D`
      ${$t(185)}
      <rect class="body" x="16" y="38" width="44" height="9" rx="2"></rect>
      <rect class="body" x="18" y="34" width="6" height="34" rx="2"></rect>
      <path class="strut" d="M40 47 V82"></path>
      <path class="body" d="M40 108 V90 Q42 80 54 78 L150 74 Q170 60 196 58 H222 Q236 60 244 72
        L300 86 L386 104 Q394 108 386 113 L300 116 H60 Q40 116 40 108 Z"></path>
      <path class="body" d="M140 76 L160 50 Q166 42 176 42 H188 L194 60 Z"></path>
      <path class="line" d="M120 96 H300"></path>
      <circle class="helmet" cx="206" cy="54" r="11"></circle>
      <path class="strut" d="M184 62 Q206 40 238 64"></path>
      <rect class="body" x="330" y="120" width="66" height="6" rx="2"></rect>
      <rect class="body" x="390" y="108" width="6" height="18" rx="2"></rect>
      ${yt(92,112,32,15)}
      ${yt(318,116,27,13)}
    `},tractor:{battery:{left:64,top:59,width:25},draw:()=>D`
      ${$t(140)}
      <rect class="body" x="92" y="10" width="116" height="8" rx="3"></rect>
      <path class="body" d="M102 88 V22 Q102 16 108 16 H194 Q200 16 200 22 V88 Z"></path>
      <path class="window" d="M114 26 H188 V68 H114 Z"></path>
      <path class="body" d="M194 62 H304 Q320 62 322 78 V108 Q322 114 316 114 H194 Z"></path>
      <path class="line" d="M308 72 V108 M314 72 V108"></path>
      <rect class="mirror" x="260" y="30" width="7" height="34" rx="2"></rect>
      <rect class="light front" x="314" y="66" width="8" height="8" rx="2"></rect>
      <path class="body" d="M91 82 A52 52 0 0 1 189 82 L185 86 A48 48 0 0 0 95 86 Z"></path>
      ${yt(140,100,44,22)}
      ${yt(288,120,24,11)}
    `},vintage:{battery:{left:50,top:60,width:34},draw:()=>D`
      ${$t(170)}
      ${bt(46,82,16,9)}
      <rect class="body" x="64" y="18" width="146" height="6" rx="3"></rect>
      <path class="body" d="M70 76 V30 Q70 24 76 24 H198 Q204 24 204 30 V76 Z"></path>
      <path class="window" d="M80 32 H130 V64 H80 Z M138 32 H194 V64 H138 Z"></path>
      <path class="line" d="M208 30 L216 70"></path>
      <path class="body" d="M60 104 V82 Q60 74 68 74 H214 L226 70 H330 Q342 70 344 80 V104 Z"></path>
      <rect class="window" x="336" y="66" width="10" height="38" rx="2"></rect>
      <path class="body" d="M58 104 Q66 80 100 80 Q132 80 142 104 Z"></path>
      <path class="body" d="M260 104 Q268 80 300 80 Q336 80 352 104 Z"></path>
      <rect class="body" x="132" y="102" width="136" height="5" rx="2"></rect>
      <circle class="light front" cx="352" cy="72" r="7"></circle>
      ${bt(100,116,26,16)}
      ${bt(300,116,26,16)}
    `}},xt=Object.keys(wt),At="suv",Et=["0–20 %","20–40 %","40–60 %","60–80 %","80–100 %"],St=["charging","connect_cable","ready_for_charging","conserving","discharging","charging_interrupted"],Lt=[{name:"name",selector:{text:{}}},{name:"show_name",selector:{boolean:{}}},{name:"show_plate",selector:{boolean:{}}},{name:"silhouette",selector:{select:{mode:"dropdown",options:[]}}},{name:"image",selector:{text:{}}},{name:"language",selector:{select:{mode:"dropdown",options:[]}}}],Ct=[{name:"device",selector:{device:{entity:[{domain:"sensor"}]}}}],Ht=[{name:"battery",required:!0,selector:{entity:{filter:{domain:"sensor"}}}},{name:"charging_power",selector:{entity:{filter:{domain:"sensor"}}}},{name:"charging_state",selector:{entity:{filter:{domain:"sensor"}}}},{name:"plate",selector:{entity:{}}}],Mt=t=>({name:t,selector:{number:{min:0,max:1e3,step:.1,mode:"box",unit_of_measurement:"kW"}}}),kt=[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}],Pt=(t,e)=>Array.isArray(t)&&Array.isArray(e)&&t.length===e.length&&t.every((t,i)=>t===e[i]),Ot=t=>null==t||""===t;class Vt extends lt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}connectedCallback(){super.connectedCallback(),async function(){if((!customElements.get("ha-form")||!customElements.get("ha-entity-picker"))&&window.loadCardHelpers)try{const t=await window.loadCardHelpers(),e=await t.createCardElement({type:"entities",entities:[]});e&&e.constructor.getConfigElement&&await e.constructor.getConfigElement()}catch(t){}}().then(()=>this.requestUpdate())}setConfig(t){this._config={...t,entities:{...t.entities||{}},values:(t.values||[]).map(t=>"string"==typeof t?{entity:t}:{...t})}}_commit(t){const e={...t};for(const t of["name","image","device"])Ot(e[t])&&delete e[t];(Ot(e.silhouette)||e.silhouette===At)&&delete e.silhouette,(Ot(e.language)||"auto"===e.language)&&delete e.language,!0===e.show_name&&delete e.show_name,!0===e.show_plate&&delete e.show_plate;const i={};for(const[t,s]of Object.entries(e.entities||{}))Ot(s)||(i[t]=s);e.entities=i,e.charging_states&&e.charging_states.length&&!Pt(e.charging_states,gt)||delete e.charging_states,e.power_levels&&!Pt(e.power_levels,ut)||delete e.power_levels,e.colors&&!Pt(dt(e.colors).map(t=>t.toLowerCase()),ht)||delete e.colors,e.values=(e.values||[]).map(t=>{const e={entity:t.entity};return Ot(t.name)||(e.name=t.name),Ot(t.icon)||(e.icon=t.icon),e}),e.values.length||delete e.values,this._config={...t},pt(this,"config-changed",{config:e})}_generalChanged(t){t.stopPropagation();const e=t.detail.value;this._commit({...this._config,name:e.name,show_name:e.show_name,show_plate:e.show_plate,silhouette:e.silhouette,image:e.image,language:e.language})}_deviceChanged(t){t.stopPropagation(),this._commit({...this._config,device:t.detail.value.device})}_entitiesChanged(t){t.stopPropagation(),this._commit({...this._config,entities:{...t.detail.value}})}_chargingChanged(t){t.stopPropagation();const e=t.detail.value,i=[e.power_1,e.power_2,e.power_3].map((t,e)=>Number.isFinite(Number(t))&&!Ot(t)?Number(t):ut[e]);this._commit({...this._config,charging_states:e.charging_states||[],power_levels:i})}_valueChanged(t,e){e.stopPropagation();const i=[...this._config.values];i[t]={...e.detail.value},this._commit({...this._config,values:i})}_moveValue(t,e){const i=[...this._config.values],s=t+e;s<0||s>=i.length||([i[t],i[s]]=[i[s],i[t]],this._commit({...this._config,values:i}))}_removeValue(t){const e=this._config.values.filter((e,i)=>i!==t);this._commit({...this._config,values:e})}_addValue(t){t.stopPropagation();const e=t.detail.value&&t.detail.value.entity;e&&(this._commit({...this._config,values:[...this._config.values,{entity:e}]}),t.target.data={})}_colorChanged(t,e){const i=[...dt(this._config.colors)];i[t]=e.target.value,this._commit({...this._config,colors:i})}_resetColors(){const{colors:t,...e}=this._config;this._commit(e)}_t(t,e){return vt(this.hass,t,e,this._config&&this._config.language)}_label=t=>"name"===t.name&&t._value?this._t("label.value_name"):this._t(`label.${t.name}`)||t.name;_helper=t=>this._t(`helper.${t.name}`);_deviceEntities(){const t=this._config.device;if(!t||!this.hass||!this.hass.entities)return;const e=Object.values(this.hass.entities).filter(e=>e.device_id===t).map(t=>t.entity_id);return e.length?e:void 0}_filterSchema(t,e=[]){const i=this._deviceEntities();if(!i)return t;const s=[...new Set([...i,...e.filter(Boolean)])];return t.map(t=>t.selector&&t.selector.entity?{...t,selector:{entity:{...t.selector.entity,include_entities:s}}}:t)}_generalSchema(){const t=xt.map(t=>({value:t,label:this._t(`silhouette.${t}`)||t})),e=[{value:"auto",label:this._t("language.auto")},...ft.map(t=>({value:t,label:_t[t]["language.name"]}))];return Lt.map(i=>"silhouette"===i.name?{...i,selector:{select:{mode:"dropdown",options:t}}}:"language"===i.name?{...i,selector:{select:{mode:"dropdown",options:e}}}:i)}_chargingSchema(){const t=this.hass&&this._config.entities.charging_state?this.hass.states[this._config.entities.charging_state]:void 0,e=t&&Array.isArray(t.attributes.options)?t.attributes.options:[],i=this._config.charging_states||gt;return[{name:"charging_states",selector:{select:{multiple:!0,custom_value:!0,mode:"list",options:[...new Set([...e,...St,...i])].map(t=>({value:t,label:t}))}}},{type:"grid",name:"",schema:[Mt("power_1"),Mt("power_2"),Mt("power_3")]}]}_form(t,e,i){return R`<ha-form
      .hass=${this.hass}
      .data=${e}
      .schema=${t}
      .computeLabel=${this._label}
      .computeHelper=${this._helper}
      @value-changed=${i}
    ></ha-form>`}render(){if(!this._config||!this.hass)return W;const t=this._config,e=t.power_levels||ut,i=dt(t.colors),s=kt.map(t=>"name"===t.name?{...t,_value:!0}:t),a=this._filterSchema(Ht,Object.values(t.entities)),r=Math.ceil(t.values.length/2);return R`
      <div class="section">
        <h3>${this._t("editor.general")}</h3>
        ${this._form(this._generalSchema(),{name:t.name||"",show_name:!1!==t.show_name,show_plate:!1!==t.show_plate,silhouette:t.silhouette||At,image:t.image||"",language:t.language||"auto"},this._generalChanged)}
      </div>

      <div class="section">
        <h3>${this._t("editor.entities")}</h3>
        ${this._form(Ct,{device:t.device||""},this._deviceChanged)}
        ${this._form(a,t.entities,this._entitiesChanged)}
      </div>

      <div class="section">
        <h3>${this._t("editor.charging")}</h3>
        <p class="note">${this._t("editor.charging_note")}</p>
        ${this._form(this._chargingSchema(),{charging_states:t.charging_states||gt,power_1:e[0],power_2:e[1],power_3:e[2]},this._chargingChanged)}
      </div>

      <div class="section">
        <h3>${this._t("editor.values")}</h3>
        <p class="note">${this._t("editor.values_note")}</p>
        ${t.values.map((e,i)=>R`
            <div class="value-row">
              <div class="value-head">
                <span class="badge">${this._t(i<r?"editor.left":"editor.right")} · ${i+1}</span>
                <span class="spacer"></span>
                ${this._iconButton("M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z",this._t("editor.move_up"),0===i,()=>this._moveValue(i,-1))}
                ${this._iconButton("M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",this._t("editor.move_down"),i===t.values.length-1,()=>this._moveValue(i,1))}
                ${this._iconButton("M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",this._t("editor.remove"),!1,()=>this._removeValue(i))}
              </div>
              ${this._form(this._filterSchema(s,[e.entity]),e,t=>this._valueChanged(i,t))}
            </div>
          `)}
        <div class="add">
          ${this._form(this._filterSchema([{name:"entity",selector:{entity:{}}}]),{},this._addValue)}
          <span class="note">${this._t("editor.add_note")}</span>
        </div>
      </div>

      <div class="section">
        <h3>${this._t("editor.colors")}</h3>
        <div class="colors">
          ${i.map((t,e)=>R`
              <label class="color">
                <input
                  type="color"
                  .value=${/^#[0-9a-f]{6}$/i.test(t)?t:"#000000"}
                  @change=${t=>this._colorChanged(e,t)}
                />
                <span>${Et[e]||this._t("editor.full_color")}</span>
              </label>
            `)}
        </div>
        <button class="text-button" @click=${this._resetColors} ?disabled=${!t.colors}>
          ${this._t("editor.reset_colors")}
        </button>
      </div>
    `}_iconButton(t,e,i,s){return R`<button
      class="icon-button"
      title=${e}
      aria-label=${e}
      ?disabled=${i}
      @click=${s}
    >
      <svg viewBox="0 0 24 24"><path d=${t}></path></svg>
    </button>`}static get styles(){return r`
      :host {
        display: block;
      }
      .section {
        margin-bottom: 24px;
      }
      h3 {
        font-size: 1rem;
        font-weight: 500;
        margin: 0 0 8px;
      }
      .note {
        color: var(--secondary-text-color);
        font-size: 0.85rem;
        margin: 0 0 8px;
      }
      .value-row {
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 8px;
        padding: 4px 12px 12px;
        margin-bottom: 8px;
      }
      .value-head {
        display: flex;
        align-items: center;
        gap: 2px;
      }
      .spacer {
        flex: 1;
      }
      .badge {
        font-size: 0.75rem;
        color: var(--secondary-text-color);
      }
      .icon-button {
        background: none;
        border: none;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        padding: 6px;
        cursor: pointer;
        color: var(--secondary-text-color);
      }
      .icon-button:hover:not([disabled]) {
        background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      }
      .icon-button[disabled] {
        opacity: 0.3;
        cursor: default;
      }
      .icon-button svg {
        width: 24px;
        height: 24px;
        fill: currentColor;
      }
      .add {
        margin-top: 8px;
      }
      .colors {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 8px;
      }
      .color {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        font-size: 0.75rem;
        color: var(--secondary-text-color);
      }
      .color input {
        width: 48px;
        height: 32px;
        padding: 0;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 6px;
        background: none;
        cursor: pointer;
      }
      .text-button {
        background: none;
        border: none;
        color: var(--primary-color, #03a9f4);
        font: inherit;
        font-weight: 500;
        padding: 6px 0;
        cursor: pointer;
      }
      .text-button[disabled] {
        color: var(--disabled-text-color, #bdbdbd);
        cursor: default;
      }
    `}}customElements.get("car-info-card-editor")||customElements.define("car-info-card-editor",Vt);const Qt=["unknown","unavailable","none",""],zt=12,Nt=12,Ut=180,Bt=76,Tt=6,jt=5;class Zt extends lt{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static getConfigElement(){return document.createElement("car-info-card-editor")}static getStubConfig(t){const e=(t?Object.values(t.states):[]).find(t=>t.entity_id.startsWith("sensor.")&&"battery"===t.attributes.device_class);return{name:"Auto",entities:{battery:e?e.entity_id:""},values:[]}}setConfig(t){if(!t)throw new Error("Invalid configuration.");if(void 0!==t.entities&&"object"!=typeof t.entities)throw new Error("entities must be an object.");if(t.language&&"auto"!==t.language&&!ft.includes(t.language))throw new Error(`language must be auto or one of: ${ft.join(", ")}.`);if(t.silhouette&&!wt[t.silhouette])throw new Error(`silhouette must be one of: ${xt.join(", ")}.`);if(t.values&&!Array.isArray(t.values))throw new Error("values must be a list.");if(t.colors&&(!Array.isArray(t.colors)||![5,6].includes(t.colors.length)))throw new Error("colors must contain 5 segment colors and optionally a 6th color for fully charged.");this._config={show_name:!0,show_plate:!0,values:[],...t,entities:{...t.entities||{}},values:(t.values||[]).map(t=>"string"==typeof t?{entity:t}:t)}}_t(t,e){return vt(this.hass,t,e,this._config&&this._config.language)}getCardSize(){return 5}getGridOptions(){return{columns:12,min_columns:6}}_stateObj(t){return t&&this.hass?this.hass.states[t]:void 0}_isAvailable(t){return t&&!Qt.includes(String(t.state).toLowerCase())}_formatState(t){if(!this._isAvailable(t))return"–";if(this.hass.formatEntityState)return this.hass.formatEntityState(t);const e=t.attributes.unit_of_measurement;return e?`${t.state} ${e}`:t.state}_soc(){const t=this._stateObj(this._config.entities.battery);if(!this._isAvailable(t))return;const e=parseFloat(t.state);return Number.isFinite(e)?Math.min(100,Math.max(0,e)):void 0}_powerKw(){const t=this._stateObj(this._config.entities.charging_power);if(!this._isAvailable(t))return 0;const e=parseFloat(t.state);if(!Number.isFinite(e))return 0;const i=(t.attributes.unit_of_measurement||"kW").trim();return"W"===i?e/1e3:"MW"===i?1e3*e:e}_isCharging(){const t=this._config.entities.charging_state;if(t){const e=this._stateObj(t),i=this._config.charging_states||gt;return!!e&&i.includes(e.state)}return this._powerKw()>0}_chargeLevel(){if(!this._isCharging())return 0;const t=this._powerKw(),e=this._config.power_levels||ut,i=e.findIndex(e=>t<=e);return-1===i?e.length+1:i+1}_moreInfo(t){t&&pt(this,"hass-more-info",{entityId:t})}render(){if(!this._config||!this.hass)return W;const t=this._config;if(!t.entities.battery)return R`<ha-card>
        <div class="hint">
          ${this._t("card.hint")}
        </div>
      </ha-card>`;const e=this._soc(),i=this._chargeLevel(),s=t.values,a=Math.ceil(s.length/2),r=s.slice(0,a),n=s.slice(a),o=this._stateObj(t.entities.plate),l=!1!==t.show_name&&!!t.name,c=!1!==t.show_plate&&this._isAvailable(o);return R`
      <ha-card>
        ${l||c?R`<div class="header">
              <span class="name">${l?t.name:""}</span>
              ${c?R`<span class="plate">${o.state}</span>`:W}
            </div>`:W}
        <div class="layout ${s.length?"":"no-values"}">
          <div class="values left">${r.map(t=>this._renderValue(t))}</div>
          <div class="center">
            <div class="car">
              ${t.image?R`<img src=${t.image} alt="" />`:this._renderCar()}
              <div
                class="battery level-${i}"
                style=${this._batteryStyle()}
                @click=${()=>this._moreInfo(t.entities.battery)}
              >
                ${this._renderBattery(e,i)}
              </div>
            </div>
            <div class="soc">${void 0===e?"–":`${Math.round(e)} %`}</div>
            ${this._renderBatteryProblem()}
            ${this._renderStatus(i)}
          </div>
          <div class="values right">${n.map(t=>this._renderValue(t))}</div>
        </div>
      </ha-card>
    `}_batteryStyle(){const t=this._config.image?wt[At].battery:this._silhouette().battery;return`left:${t.left}%;top:${t.top}%;width:${t.width}%`}_renderStatus(t){const e=this._config.entities,i=this._stateObj(e.charging_state),s=[];if(i&&s.push(this._formatState(i)),t>0){const t=this._stateObj(e.charging_power);this._isAvailable(t)&&s.push(this._formatState(t))}return s.length?R`<div
      class="status ${t>0?"charging":""}"
      @click=${()=>this._moreInfo(e.charging_state||e.charging_power)}
    >
      ${s.join(" · ")}
    </div>`:W}_renderBatteryProblem(){const t=this._config.entities.battery,e=this._stateObj(t);let i;return e?this._isAvailable(e)&&!Number.isFinite(parseFloat(e.state))&&(i=this._t("card.battery_not_numeric",{state:this._formatState(e)})):i=this._t("card.battery_missing",{entity:t}),i?R`<div class="problem">${i}</div>`:W}_entityName(t){const e=t.attributes.friendly_name||t.entity_id,i=this.hass.entities&&this.hass.entities[t.entity_id],s=i&&i.device_id&&this.hass.devices&&this.hass.devices[i.device_id],a=s&&(s.name_by_user||s.name);return a&&e.startsWith(a+" ")&&e.length>a.length+1?e.slice(a.length+1):e}_renderValue(t){const e=this._stateObj(t.entity),i=t.name||(e?this._entityName(e):t.entity);return R`
      <div class="value" @click=${()=>this._moreInfo(t.entity)}>
        ${t.icon?R`<ha-icon class="icon" .icon=${t.icon}></ha-icon>`:e?R`<ha-state-icon
              class="icon"
              .hass=${this.hass}
              .stateObj=${e}
            ></ha-state-icon>`:W}
        <div class="text">
          <span class="label">${i}</span>
          <span class="state">${e?this._formatState(e):this._t("card.not_found")}</span>
        </div>
      </div>
    `}_renderBattery(t,e){const i=dt(this._config.colors),s=void 0!==t&&Math.round(t)>=100,a=(Ut-Tt*(jt-1))/jt,r=100/jt,n=void 0===t?-1:Math.min(jt-1,Math.floor(t/r)),o=i.slice(0,jt).map((o,l)=>{const c=s?i[jt]:o,h=zt+l*(a+Tt),d=void 0===t?0:Math.min(1,Math.max(0,(t-l*r)/r)),g=e>0&&l===n;return D`
        <rect class="track" x=${h} y=${Nt} width=${a} height=${Bt} rx="4"></rect>
        ${d>0?D`<rect class="seg ${g?"active":""}" x=${h} y=${Nt}
              width=${a*d} height=${Bt} rx="4" fill=${c}></rect>`:W}
        ${g&&d<1?D`<rect class="seg-next" x=${h+a*d} y=${Nt}
              width=${a*(1-d)} height=${Bt} rx="4" fill=${c}></rect>`:W}
      `});return R`
      <svg
        viewBox="0 0 220 100"
        role="img"
        aria-label=${void 0===t?this._t("card.soc_unknown"):this._t("card.soc",{soc:Math.round(t)})+(e>0?`, ${this._t("card.charging")}`:"")}
      >
        <rect class="shell-bg" x="4" y="4" width="196" height="92" rx="12"></rect>
        ${o}
        <rect class="shell" x="4" y="4" width="196" height="92" rx="12"></rect>
        <rect class="cap" x="202" y="34" width="12" height="32" rx="4"></rect>
        <g class="bolt">
          <path
            d="M114 8 L78 56 H100 L90 92 L128 42 H106 Z"
            stroke-linejoin="round"
          ></path>
        </g>
      </svg>
    `}_silhouette(){return wt[this._config.silhouette]||wt[At]}_renderCar(){const t=wt[this._config.silhouette]?this._config.silhouette:At;return R`
      <svg class="car-svg" viewBox="0 0 400 150" aria-hidden="true" data-silhouette=${t}>
        ${wt[t].draw()}
      </svg>
    `}static get styles(){return r`
      :host {
        --cic-text: var(--primary-text-color, #212121);
        --cic-secondary: var(--secondary-text-color, #727272);
        --cic-bg: var(--ha-card-background, var(--card-background-color, #fff));
        --cic-bolt-off: #9e9e9e;
        --cic-bolt-on: #43a047;
      }
      ha-card {
        display: block;
        container-type: inline-size;
        padding: 16px;
        color: var(--cic-text);
        box-sizing: border-box;
      }
      .hint {
        color: var(--cic-secondary);
        text-align: center;
        padding: 16px 0;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }
      .name {
        font-size: 1.25rem;
        font-weight: 500;
      }
      .plate {
        font-family: var(--code-font-family, monospace);
        font-size: 0.85rem;
        letter-spacing: 0.08em;
        padding: 2px 8px;
        border: 2px solid var(--cic-text);
        border-radius: 4px;
        white-space: nowrap;
      }
      .layout {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.7fr) minmax(0, 1fr);
        gap: 12px;
        align-items: center;
      }
      .layout.no-values {
        grid-template-columns: minmax(0, 1fr);
      }
      .layout.no-values .values {
        display: none;
      }
      .values {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .values.right {
        text-align: right;
      }
      .value {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        min-width: 0;
      }
      .values.right .value {
        flex-direction: row-reverse;
      }
      .icon {
        color: var(--state-icon-color, var(--cic-secondary));
        --mdc-icon-size: 22px;
        flex: none;
      }
      .text {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      /* Long labels and values wrap onto a second line, then get cut off */
      .label,
      .state {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        overflow: hidden;
        overflow-wrap: break-word;
      }
      .label {
        font-size: 0.75rem;
        line-height: 1.25;
        color: var(--cic-secondary);
      }
      .state {
        font-size: 1rem;
        line-height: 1.25;
        font-weight: 500;
      }
      .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 0;
      }
      .car {
        position: relative;
        width: 100%;
      }
      .car img,
      .car-svg {
        display: block;
        width: 100%;
        height: auto;
      }
      .car-svg .body {
        fill: var(--cic-secondary);
        fill-opacity: 0.18;
        stroke: var(--cic-secondary);
        stroke-width: 2;
        stroke-linejoin: round;
      }
      .car-svg .window {
        fill: var(--cic-secondary);
        fill-opacity: 0.35;
      }
      .car-svg .line {
        fill: none;
        stroke: var(--cic-secondary);
        stroke-opacity: 0.4;
        stroke-width: 1.5;
      }
      .car-svg .light.front {
        fill: #fdd835;
        fill-opacity: 0.8;
      }
      .car-svg .light.rear {
        fill: #e53935;
        fill-opacity: 0.8;
      }
      .car-svg .mirror {
        fill: var(--cic-secondary);
        fill-opacity: 0.5;
      }
      .car-svg .tyre {
        fill: var(--cic-secondary);
        fill-opacity: 0.85;
      }
      .car-svg .rim {
        fill: var(--cic-bg);
        stroke: var(--cic-secondary);
        stroke-width: 3;
      }
      .car-svg .spokes {
        fill: none;
        stroke: var(--cic-secondary);
        stroke-width: 2;
      }
      .car-svg .hub {
        fill: var(--cic-secondary);
      }
      .car-svg .strut {
        fill: none;
        stroke: var(--cic-secondary);
        stroke-width: 4;
        stroke-linecap: round;
      }
      .car-svg .helmet {
        fill: var(--cic-secondary);
        fill-opacity: 0.55;
        stroke: var(--cic-secondary);
        stroke-width: 2;
      }
      .car-svg .shadow {
        fill: var(--cic-secondary);
        fill-opacity: 0.15;
      }
      .battery {
        position: absolute;
        left: 50%;
        top: 58%;
        width: 42%;
        transform: translate(-50%, -50%);
        cursor: pointer;
      }
      .battery svg {
        display: block;
        width: 100%;
        height: auto;
        overflow: visible;
      }
      .shell-bg {
        fill: var(--cic-bg);
      }
      .shell,
      .cap {
        fill: none;
        stroke: var(--cic-text);
        stroke-width: 4;
      }
      .cap {
        fill: var(--cic-text);
      }
      /* Empty part of the battery: neutral, so no segment color shows through */
      .track {
        fill: var(--cic-track, #9e9e9e);
        fill-opacity: 0.18;
      }
      .bolt path {
        fill: var(--cic-bolt-off);
        stroke: var(--cic-bg);
        stroke-width: 5;
        paint-order: stroke;
        transform-box: fill-box;
        transform-origin: center;
      }
      .soc {
        font-size: 1.6rem;
        font-weight: 600;
        line-height: 1.2;
        margin-top: 4px;
      }
      .problem {
        font-size: 0.8rem;
        color: var(--error-color, #db4437);
        text-align: center;
        margin-bottom: 2px;
      }
      .status {
        font-size: 0.85rem;
        color: var(--cic-secondary);
        text-align: center;
        cursor: pointer;
      }
      .status.charging {
        color: var(--cic-bolt-on);
        font-weight: 500;
      }

      /* Charging: green bolt, pulse and size by charging power */
      .battery:not(.level-0) .bolt path {
        fill: var(--cic-bolt-on);
        animation: cic-pulse var(--cic-speed) ease-in-out infinite;
      }
      .battery:not(.level-0) .seg.active,
      .battery:not(.level-0) .seg-next {
        animation: cic-blink var(--cic-speed) ease-in-out infinite;
      }
      .seg-next {
        opacity: 0;
      }
      .level-1 {
        --cic-speed: 2.4s;
        --cic-glow: 3px;
        --cic-scale: 0.9;
      }
      .level-2 {
        --cic-speed: 1.6s;
        --cic-glow: 6px;
        --cic-scale: 1;
      }
      .level-3 {
        --cic-speed: 1s;
        --cic-glow: 9px;
        --cic-scale: 1.08;
      }
      .level-4 {
        --cic-speed: 0.6s;
        --cic-glow: 12px;
        --cic-scale: 1.15;
      }
      @keyframes cic-pulse {
        0%,
        100% {
          transform: scale(var(--cic-scale));
          filter: drop-shadow(0 0 1px var(--cic-bolt-on));
        }
        50% {
          transform: scale(calc(var(--cic-scale) * 1.06));
          filter: drop-shadow(0 0 var(--cic-glow) var(--cic-bolt-on));
        }
      }
      @keyframes cic-blink {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.35;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .battery .bolt path,
        .battery .seg.active,
        .battery .seg-next {
          animation: none !important;
          transform: scale(var(--cic-scale, 1));
        }
        .battery .seg-next {
          opacity: 0.5;
        }
      }

      /* Narrow card: car on top, values below in two columns */
      @container (max-width: 440px) {
        .layout {
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        }
        .center {
          grid-column: 1 / -1;
          grid-row: 1;
        }
        .values.right {
          text-align: left;
        }
        .values.right .value {
          flex-direction: row;
        }
      }
    `}}var Rt;customElements.get("car-info-card")||(customElements.define("car-info-card",Zt),window.customCards=window.customCards||[],window.customCards.push({type:"car-info-card",name:"Car Info Card",description:(Rt="card.description",vt({language:navigator.language||"en"},Rt)),preview:!0}),console.info("%c CAR-INFO-CARD %c 0.2.1 ","color:#fff;background:#2e7d32;font-weight:600","color:#2e7d32;background:#fff"));
