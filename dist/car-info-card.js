const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let r=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=s.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&s.set(i,e))}return e}toString(){return this.cssText}};const a=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new r(s,e,i)},n=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:o,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,g=globalThis,p=g.trustedTypes,_=p?p.emptyScript:"",m=g.reactiveElementPolyfillSupport,f=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!o(e,t),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&l(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:r}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const a=s?.call(this);r?.call(this,t),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const e=this.properties,t=[...h(e),...d(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(t)i.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=t.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=s;const a=r.fromAttribute(t,e.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(e,t,i,s=!1,r){if(void 0!==e){const a=this.constructor;if(!1===s&&(r=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??y)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:r},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==r||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[f("elementProperties")]=new Map,$[f("finalized")]=new Map,m?.({ReactiveElement:$}),(g.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,x=e=>e,A=w.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,L="?"+S,C=`<${L}>`,H=document,M=()=>H.createComment(""),V=e=>null===e||"object"!=typeof e&&"function"!=typeof e,O=Array.isArray,P="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,N=/>/g,Q=RegExp(`>|${P}(?:([^\\s"'>=/]+)(${P}*=${P}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,U=/"/g,j=/^(?:script|style|textarea|title)$/i,Z=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),R=Z(1),W=Z(2),D=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),I=new WeakMap,q=H.createTreeWalker(H,129);function K(e,t){if(!O(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(t):t}const G=(e,t)=>{const i=e.length-1,s=[];let r,a=2===t?"<svg>":3===t?"<math>":"",n=z;for(let t=0;t<i;t++){const i=e[t];let o,l,c=-1,h=0;for(;h<i.length&&(n.lastIndex=h,l=n.exec(i),null!==l);)h=n.lastIndex,n===z?"!--"===l[1]?n=T:void 0!==l[1]?n=N:void 0!==l[2]?(j.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=Q):void 0!==l[3]&&(n=Q):n===Q?">"===l[0]?(n=r??z,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,o=l[1],n=void 0===l[3]?Q:'"'===l[3]?U:B):n===U||n===B?n=Q:n===T||n===N?n=z:(n=Q,r=void 0);const d=n===Q&&e[t+1].startsWith("/>")?" ":"";a+=n===z?i+C:c>=0?(s.push(o),i.slice(0,c)+E+i.slice(c)+S+d):i+S+(-2===c?t:d)}return[K(e,a+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class J{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,a=0;const n=e.length-1,o=this.parts,[l,c]=G(e,t);if(this.el=J.createElement(l,i),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=q.nextNode())&&o.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(E)){const t=c[a++],i=s.getAttribute(e).split(S),n=/([.?@])?(.*)/.exec(t);o.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?ie:"?"===n[1]?se:"@"===n[1]?re:te}),s.removeAttribute(e)}else e.startsWith(S)&&(o.push({type:6,index:r}),s.removeAttribute(e));if(j.test(s.tagName)){const e=s.textContent.split(S),t=e.length-1;if(t>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],M()),q.nextNode(),o.push({type:2,index:++r});s.append(e[t],M())}}}else if(8===s.nodeType)if(s.data===L)o.push({type:2,index:r});else{let e=-1;for(;-1!==(e=s.data.indexOf(S,e+1));)o.push({type:7,index:r}),e+=S.length-1}r++}}static createElement(e,t){const i=H.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,s){if(t===D)return t;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const a=V(t)?void 0:t._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),void 0===a?r=void 0:(r=new a(e),r._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(t=X(e,r._$AS(e,t.values),r,s)),t}class Y{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??H).importNode(t,!0);q.currentNode=s;let r=q.nextNode(),a=0,n=0,o=i[0];for(;void 0!==o;){if(a===o.index){let t;2===o.type?t=new ee(r,r.nextSibling,this,e):1===o.type?t=new o.ctor(r,o.name,o.strings,this,e):6===o.type&&(t=new ae(r,this,e)),this._$AV.push(t),o=i[++n]}a!==o?.index&&(r=q.nextNode(),a++)}return q.currentNode=H,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),V(e)?e===F||null==e||""===e?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==D&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>O(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==F&&V(this._$AH)?this._$AA.nextSibling.data=e:this.T(H.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=J.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new Y(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=I.get(e.strings);return void 0===t&&I.set(e.strings,t=new J(e)),t}k(e){O(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const r of e)s===t.length?t.push(i=new ee(this.O(M()),this.O(M()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=x(e).nextSibling;x(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(e,t=this,i,s){const r=this.strings;let a=!1;if(void 0===r)e=X(this,e,t,0),a=!V(e)||e!==this._$AH&&e!==D,a&&(this._$AH=e);else{const s=e;let n,o;for(e=r[0],n=0;n<r.length-1;n++)o=X(this,s[i+n],t,n),o===D&&(o=this._$AH[n]),a||=!V(o)||o!==this._$AH[n],o===F?e=F:e!==F&&(e+=(o??"")+r[n+1]),this._$AH[n]=o}a&&!s&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}}class se extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==F)}}class re extends te{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??F)===D)return;const i=this._$AH,s=e===F&&i!==F||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const ne=w.litHtmlPolyfillSupport;ne?.(J,ee),(w.litHtmlVersions??=[]).push("3.3.3");const oe=globalThis;class le extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let r=s._$litPart$;if(void 0===r){const e=i?.renderBefore??null;s._$litPart$=r=new ee(t.insertBefore(M(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}}le._$litElement$=!0,le.finalized=!0,oe.litElementHydrateSupport?.({LitElement:le});const ce=oe.litElementPolyfillSupport;ce?.({LitElement:le}),(oe.litElementVersions??=[]).push("4.2.2");const he=["#d32f2f","#f57c00","#fbc02d","#c0ca33","#7cb342","#2e7d32"],de=e=>Array.isArray(e)?5===e.length?[...e,he[5]]:e:he,ue=["charging"],ge=[3.7,11,50],pe=(e,t,i)=>{e.dispatchEvent(new CustomEvent(t,{detail:i,bubbles:!0,composed:!0}))};var _e={"card.battery_missing":"Battery level entity {entity} not found","card.battery_not_numeric":"The battery level entity does not report a number ({state}). Please select the battery level sensor in %.","card.charging":"charging","card.description":"Car card for electric cars, plug-in hybrids and combustion cars: battery or fuel gauge, charging bolt and configurable values.","card.fuel":"Fuel level {level} %","card.fuel_missing":"Fuel level entity {entity} not found","card.fuel_needs_capacity":"The fuel level is reported in {unit}. Please enter the tank size in the editor to show it in %.","card.fuel_not_numeric":"The fuel level entity does not report a number ({state}). Please select the fuel level sensor.","card.fuel_unknown":"Fuel level unknown","card.hint":"Please select the battery level (electric car) or the fuel level (combustion car) in the editor.","card.not_found":"not found","card.soc":"Battery level {soc} %","card.soc_unknown":"Battery level unknown","drive.auto":"Automatic","drive.combustion":"Combustion","drive.electric":"Electric","drive.hybrid":"Plug-in hybrid","editor.add_note":"Select an entity to add a value.","editor.charging":"Charging","editor.charging_note":"The bolt is green while the car is charging. Its pulse and glow get stronger with higher charging power (4 levels).","editor.colors":"Battery segment colors","editor.entities":"Entities","editor.full_color":"Full (100 %)","editor.general":"General","editor.left":"left","editor.move_down":"Move down","editor.move_up":"Move up","editor.other_sensors":"More sensors of this device","editor.quick_note":"Tick a value to add it. The matching entity of the selected device is filled in automatically; if none is found, pick one in the new row.","editor.remove":"Remove","editor.reset_colors":"Default colors","editor.right":"right","editor.switch_side":"Other side","editor.values":"Values around the car","editor.values_note":"General values are shown on the left, charging values on the right; other values fill up the shorter side. ⇄ moves a value to the other side.","helper.charging_state":"Without a charging state, the car counts as charging while the charging power is above 0.","helper.charging_states":"Default: charging","helper.device":"Only shows the entities of this device in the pickers below and fills empty fields automatically.","helper.drive":"Automatic: battery level only = electric, fuel level only = combustion, both = hybrid.","helper.fuel_capacity":"Only needed if the fuel level is reported in litres or gallons.","helper.image":"Leave empty to use the vehicle selected above.","helper.language":"Language of the card and editor texts. Values are always formatted by Home Assistant.","helper.silhouette":"Built-in drawing. A custom image below replaces it.","label.battery":"Battery level (electric car, hybrid)","label.charging_power":"Charging power","label.charging_state":"Charging state","label.charging_states":"States that count as charging","label.device":"Device (optional)","label.drive":"Drive","label.entity":"Entity","label.fuel":"Fuel level (combustion car, hybrid)","label.fuel_capacity":"Tank size","label.icon":"Icon (empty = entity icon)","label.image":"Custom image (URL, e.g. /local/car.png)","label.language":"Language","label.name":"Name","label.plate":"Licence plate","label.power_1":"Level 1 up to","label.power_2":"Level 2 up to","label.power_3":"Level 3 up to (level 4 above)","label.show_name":"Show name","label.show_plate":"Show licence plate","label.silhouette":"Vehicle","label.value_name":"Label (empty = entity name)","language.auto":"Automatic (Home Assistant language)","language.name":"English","silhouette.hatchback":"Hatchback","silhouette.race":"Formula race car","silhouette.sedan":"Sedan","silhouette.suv":"SUV","silhouette.tractor":"Tractor","silhouette.van":"Van","silhouette.vintage":"Vintage car","value.charging_power_value":"Charging power","value.charging_state_value":"Charging state","value.charging_type":"Charging type","value.fuel_level_value":"Fuel level","value.fuel_range":"Fuel range","value.odometer":"Odometer","value.oil_level":"Oil level","value.outside_temperature":"Outside temperature","value.range":"Range","value.service":"Next service","value.target_temperature":"Target temperature","value.time_to_full":"Time to full","value.total_range":"Total range"};const me={en:_e,de:{"card.battery_missing":"Ladestand-Entität {entity} nicht gefunden","card.battery_not_numeric":"Die Ladestand-Entität liefert keine Zahl ({state}). Bitte den Sensor für den Ladestand in % wählen.","card.charging":"lädt","card.description":"Auto-Karte für E-Autos, Plug-in-Hybride und Verbrenner: Batterie- oder Tankanzeige, Lade-Blitz und frei wählbare Werte.","card.fuel":"Tankfüllstand {level} %","card.fuel_missing":"Tankfüllstand-Entität {entity} nicht gefunden","card.fuel_needs_capacity":"Der Tankfüllstand kommt in {unit}. Bitte im Editor den Tankinhalt eintragen, damit er in % angezeigt wird.","card.fuel_not_numeric":"Die Tankfüllstand-Entität liefert keine Zahl ({state}). Bitte den Sensor für den Tankfüllstand wählen.","card.fuel_unknown":"Tankfüllstand unbekannt","card.hint":"Bitte im Editor den Ladestand (E-Auto) oder den Tankfüllstand (Verbrenner) wählen.","card.not_found":"nicht gefunden","card.soc":"Ladestand {soc} %","card.soc_unknown":"Ladestand unbekannt","drive.auto":"Automatisch","drive.combustion":"Verbrenner","drive.electric":"Elektro","drive.hybrid":"Plug-in-Hybrid","editor.add_note":"Entität wählen, um einen Wert hinzuzufügen.","editor.charging":"Laden","editor.charging_note":"Der Blitz ist grün, solange das Auto lädt. Puls und Leuchten werden mit steigender Ladeleistung stärker (4 Stufen).","editor.colors":"Farben der Batteriesegmente","editor.entities":"Entitäten","editor.full_color":"Voll (100 %)","editor.general":"Allgemein","editor.left":"links","editor.move_down":"Nach unten","editor.move_up":"Nach oben","editor.other_sensors":"Weitere Sensoren dieses Geräts","editor.quick_note":"Wert anhaken, um ihn hinzuzufügen. Die passende Entität des gewählten Geräts wird automatisch eingetragen; wird keine gefunden, in der neuen Zeile eine wählen.","editor.remove":"Entfernen","editor.reset_colors":"Standardfarben","editor.right":"rechts","editor.switch_side":"Andere Seite","editor.values":"Werte rund um das Auto","editor.values_note":"Allgemeine Werte stehen links, Werte zum Laden rechts; andere Werte füllen die kürzere Seite auf. ⇄ setzt einen Wert auf die andere Seite.","helper.charging_state":"Ohne Ladezustand gilt das Auto als ladend, sobald die Ladeleistung über 0 liegt.","helper.charging_states":"Standard: charging","helper.device":"Zeigt in den Auswahlfeldern unten nur die Entitäten dieses Geräts und füllt leere Felder automatisch.","helper.drive":"Automatisch: nur Ladestand = Elektro, nur Tankfüllstand = Verbrenner, beides = Hybrid.","helper.fuel_capacity":"Nur nötig, wenn der Tankfüllstand in Litern oder Gallonen kommt.","helper.image":"Leer lassen, um das oben gewählte Fahrzeug zu zeigen.","helper.language":"Sprache der Texte von Karte und Editor. Werte formatiert immer Home Assistant.","helper.silhouette":"Eingebaute Zeichnung. Ein eigenes Bild darunter ersetzt sie.","label.battery":"Ladestand (E-Auto, Hybrid)","label.charging_power":"Ladeleistung","label.charging_state":"Ladezustand","label.charging_states":"Zustände, die als Laden gelten","label.device":"Gerät (optional)","label.drive":"Antrieb","label.entity":"Entität","label.fuel":"Tankfüllstand (Verbrenner, Hybrid)","label.fuel_capacity":"Tankinhalt","label.icon":"Symbol (leer = Symbol der Entität)","label.image":"Eigenes Bild (URL, z. B. /local/auto.png)","label.language":"Sprache","label.name":"Name","label.plate":"Kennzeichen","label.power_1":"Stufe 1 bis","label.power_2":"Stufe 2 bis","label.power_3":"Stufe 3 bis (darüber Stufe 4)","label.show_name":"Name anzeigen","label.show_plate":"Kennzeichen anzeigen","label.silhouette":"Fahrzeug","label.value_name":"Bezeichnung (leer = Name der Entität)","language.auto":"Automatisch (Sprache von Home Assistant)","language.name":"Deutsch","silhouette.hatchback":"Kompaktwagen","silhouette.race":"Formel-Rennwagen","silhouette.sedan":"Limousine","silhouette.suv":"SUV","silhouette.tractor":"Traktor","silhouette.van":"Transporter","silhouette.vintage":"Oldtimer","value.charging_power_value":"Ladeleistung","value.charging_state_value":"Ladezustand","value.charging_type":"Ladetyp","value.fuel_level_value":"Tankfüllstand","value.fuel_range":"Reichweite Tank","value.odometer":"Kilometerstand","value.oil_level":"Ölstand","value.outside_temperature":"Außentemperatur","value.range":"Reichweite","value.service":"Nächster Service","value.target_temperature":"Klima-Solltemperatur","value.time_to_full":"Restzeit bis voll","value.total_range":"Gesamtreichweite"}},fe=Object.keys(me);function ve(e,t,i={},s){let r=me[function(e,t){if(t&&"auto"!==t&&me[t])return t;const i=String(e&&(e.locale&&e.locale.language||e.language)||"en").toLowerCase();if(me[i])return i;const s=i.split("-")[0];return me[s]?s:"en"}(e,s)][t]??_e[t];if(void 0!==r){for(const[e,t]of Object.entries(i))r=r.replace(`{${e}}`,t);return r}}const ye=(e,t,i,s)=>W`
  <circle class="tyre" cx=${e} cy=${t} r=${i}></circle>
  <circle class="rim" cx=${e} cy=${t} r=${s}></circle>
`,be=(e,t,i,s)=>{const r=.71*s;return W`
    <circle class="tyre" cx=${e} cy=${t} r=${i}></circle>
    <circle class="rim" cx=${e} cy=${t} r=${s}></circle>
    <path class="spokes" d="M${e-s} ${t} H${e+s} M${e} ${t-s} V${t+s}
      M${e-r} ${t-r} L${e+r} ${t+r} M${e-r} ${t+r} L${e+r} ${t-r}"></path>
    <circle class="hub" cx=${e} cy=${t} r="3"></circle>
  `},$e=(e=180)=>W`<ellipse class="shadow" cx="200" cy="142" rx=${e} ry="5"></ellipse>`,we={suv:{battery:{left:50,top:58,width:42},draw:()=>W`
      ${$e()}
      <path class="body" d="M28 112 V88 Q28 72 44 68 L60 64 L70 36 Q74 26 86 26 H238 Q252 26 262 34
        L300 62 L352 70 Q372 74 374 92 V112 Q374 120 366 120 H338
        A33 33 0 0 0 272 120 H128 A33 33 0 0 0 62 120 H36 Q28 120 28 112 Z"></path>
      <path class="window" d="M80 34 H164 V62 H70 Z M172 34 H236 Q246 34 254 40 L284 62 H172 Z"></path>
      <path class="line" d="M168 64 V112 M262 66 Q266 90 262 112"></path>
      <path class="line" d="M64 84 H370"></path>
      <rect class="light front" x="356" y="78" width="16" height="7" rx="3"></rect>
      <rect class="light rear" x="29" y="76" width="9" height="10" rx="3"></rect>
      <path class="mirror" d="M286 56 l10 -2 l2 8 l-9 1 Z"></path>
      ${ye(305,120,26,14)}
      ${ye(95,120,26,14)}
    `},sedan:{battery:{left:50,top:62,width:40},draw:()=>W`
      ${$e()}
      <path class="body" d="M24 112 V92 Q24 80 38 78 L96 74 Q118 46 140 44 H236 Q252 44 262 52
        L292 74 L356 80 Q376 84 376 100 V112 Q376 120 368 120 H330
        A25 25 0 0 0 280 120 H120 A25 25 0 0 0 70 120 H32 Q24 120 24 112 Z"></path>
      <path class="window" d="M108 72 Q124 52 142 50 H184 V72 Z M192 50 H234 Q246 50 254 56 L276 72 H192 Z"></path>
      <path class="line" d="M188 74 V114 M60 88 H370"></path>
      <rect class="light front" x="360" y="86" width="15" height="6" rx="3"></rect>
      <rect class="light rear" x="25" y="84" width="8" height="8" rx="3"></rect>
      <path class="mirror" d="M276 66 l10 -2 l2 7 l-9 1 Z"></path>
      ${ye(305,120,22,12)}
      ${ye(95,120,22,12)}
    `},hatchback:{battery:{left:50,top:58,width:40},draw:()=>W`
      ${$e(160)}
      <path class="body" d="M50 112 V82 Q50 62 62 56 L84 36 Q90 30 100 30 H220 Q232 30 242 38
        L280 66 L330 74 Q350 78 352 96 V112 Q352 120 344 120 H314
        A25 25 0 0 0 264 120 H136 A25 25 0 0 0 86 120 H58 Q50 120 50 112 Z"></path>
      <path class="window" d="M90 40 Q94 36 102 36 H158 V64 H72 Z M166 36 H218 Q228 36 236 42 L262 64 H166 Z"></path>
      <path class="line" d="M162 66 V112 M56 80 H348"></path>
      <rect class="light front" x="336" y="82" width="14" height="6" rx="3"></rect>
      <rect class="light rear" x="51" y="68" width="8" height="12" rx="3"></rect>
      <path class="mirror" d="M262 58 l10 -2 l2 7 l-9 1 Z"></path>
      ${ye(289,120,22,12)}
      ${ye(111,120,22,12)}
    `},van:{battery:{left:50,top:58,width:42},draw:()=>W`
      ${$e()}
      <path class="body" d="M22 112 V36 Q22 22 36 22 H262 Q276 22 284 32 L318 66 L360 74
        Q378 78 378 96 V112 Q378 120 370 120 H340
        A25 25 0 0 0 290 120 H120 A25 25 0 0 0 70 120 H30 Q22 120 22 112 Z"></path>
      <path class="window" d="M34 32 H120 V62 H34 Z M128 32 H220 V62 H128 Z
        M228 32 H262 Q270 32 276 38 L300 62 H228 Z"></path>
      <path class="line" d="M124 64 V112 M224 64 V112 M28 80 H372"></path>
      <rect class="light front" x="362" y="82" width="14" height="7" rx="3"></rect>
      <rect class="light rear" x="23" y="68" width="8" height="14" rx="3"></rect>
      <path class="mirror" d="M300 54 l10 -2 l2 8 l-9 1 Z"></path>
      ${ye(315,120,22,12)}
      ${ye(95,120,22,12)}
    `},race:{battery:{left:50,top:64,width:30},draw:()=>W`
      ${$e(185)}
      <rect class="body" x="16" y="38" width="44" height="9" rx="2"></rect>
      <rect class="body" x="18" y="34" width="6" height="34" rx="2"></rect>
      <path class="strut" d="M40 47 V82"></path>
      <path class="body" d="M40 108 V90 Q42 80 54 78 L206 74 Q226 60 252 58 H278 Q292 60 300 72
        L330 88 L386 104 Q394 108 386 113 L300 116 H60 Q40 116 40 108 Z"></path>
      <path class="body" d="M196 76 L216 50 Q222 42 232 42 H244 L250 60 Z"></path>
      <path class="line" d="M120 96 H300"></path>
      <circle class="helmet" cx="264" cy="54" r="11"></circle>
      <path class="strut" d="M242 62 Q264 40 296 64"></path>
      <rect class="body" x="330" y="120" width="66" height="6" rx="2"></rect>
      <rect class="body" x="390" y="108" width="6" height="18" rx="2"></rect>
      ${ye(92,112,32,15)}
      ${ye(318,116,27,13)}
    `},tractor:{battery:{left:64,top:59,width:25},draw:()=>W`
      ${$e(140)}
      <rect class="body" x="92" y="10" width="116" height="8" rx="3"></rect>
      <path class="body" d="M102 88 V22 Q102 16 108 16 H194 Q200 16 200 22 V88 Z"></path>
      <path class="window" d="M114 26 H188 V68 H114 Z"></path>
      <path class="body" d="M194 62 H304 Q320 62 322 78 V108 Q322 114 316 114 H194 Z"></path>
      <path class="line" d="M308 72 V108 M314 72 V108"></path>
      <rect class="mirror" x="260" y="30" width="7" height="34" rx="2"></rect>
      <rect class="light front" x="314" y="66" width="8" height="8" rx="2"></rect>
      <path class="body" d="M91 82 A52 52 0 0 1 189 82 L185 86 A48 48 0 0 0 95 86 Z"></path>
      ${ye(140,100,44,22)}
      ${ye(288,120,24,11)}
    `},vintage:{battery:{left:50,top:60,width:34},draw:()=>W`
      ${$e(170)}
      ${be(46,82,16,9)}
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
      ${be(100,116,26,16)}
      ${be(300,116,26,16)}
    `}},xe=Object.keys(we),Ae="suv",ke=/fuel|tank|kraftstoff|benzin|diesel|petrol|gasoline/,Ee=e=>Ce(e,/range|reichweite|autonomy|distance.?to.?empty|\bdte\b/)&&("distance"===Se(e)||["km","mi"].includes(Le(e))),Se=e=>e.attributes.device_class,Le=e=>e.attributes.unit_of_measurement,Ce=(e,t)=>t.test((e=>`${e.entity_id} ${e.attributes.friendly_name||""}`.toLowerCase())(e)),He={battery:{match:e=>("battery"===Se(e)||"%"===Le(e)&&Ce(e,/batter|akku|soc\b|state_of_charge|charge_level|ladestand/))&&!Ce(e,/limit|target|ziel|min|max|12.?v|aux|starter/),prefer:e=>"battery"===Se(e)},charging_power:{match:e=>"power"===Se(e)||["W","kW"].includes(Le(e)),prefer:e=>Ce(e,/charg|lade/)},charging_state:{match:e=>Array.isArray(e.attributes.options)?e.attributes.options.includes("charging"):"battery_charging"===Se(e)||Ce(e,/charging_state|charging_status|charge_state|ladezustand|ladestatus/)&&"battery"!==Se(e)&&!Ce(e,/batter/),prefer:e=>Array.isArray(e.attributes.options)},odometer:{match:e=>Ce(e,/odometer|mileage|total.?distance|distance.?total|kilometerstand|kilometer_stand|km_stand|gesamtkilometer|tachostand/)},range:{match:e=>Ee(e)&&!Ce(e,ke)&&!Ce(e,/total|gesamt|combined|kombiniert/),prefer:e=>Ce(e,/electric|elektr|\bev\b|ev_|battery|batterie/)},fuel:{match:e=>(["%","L","l","gal"].includes(Le(e))||["volume","volume_storage"].includes(Se(e)))&&Ce(e,ke)&&!Ce(e,/range|reichweite|consumption|verbrauch|price|preis|cost|kosten|capacity|kapazit|distance|economy/),prefer:e=>"%"===Le(e)},fuel_range:{match:e=>Ee(e)&&Ce(e,ke)},total_range:{match:e=>Ee(e)&&Ce(e,/total|gesamt|combined|kombiniert/)},service:{match:e=>Ce(e,/service|inspection|inspektion|wartung|maintenance|oil.?change|ölwechsel|oelwechsel/)&&!Ce(e,/oil.?level|ölstand|oelstand/)},oil_level:{match:e=>Ce(e,/oil.?level|ölstand|oelstand|motoröl|motoroel|engine.?oil/)&&!Ce(e,/change|wechsel|service/)},outside_temperature:{match:e=>("temperature"===Se(e)||["°C","°F"].includes(Le(e)))&&Ce(e,/outside|outdoor|ambient|exterior|außen|aussen/)},charging_power_value:{match:e=>("power"===Se(e)||["W","kW"].includes(Le(e)))&&Ce(e,/charg|lade/)},time_to_full:{match:e=>Ce(e,/time.?to.?full|time.?until.?full|minutes.?to.?full|remaining.?charg|charg\w*.?time.?remaining|charging.?time|charge.?complete|charging.?end|vollladung|ladedauer|restladezeit|ladeende/)},charging_type:{match:e=>Ce(e,/charging.?type|charge.?type|charger.?type|plug.?type|ladetyp|ladeart/)},target_temperature:{match:e=>("temperature"===Se(e)||["°C","°F"].includes(Le(e)))&&Ce(e,/target|soll|setpoint|set.?temp|desired/)}},Me={electric:["odometer","range","charging_power_value","time_to_full","charging_state_value","charging_type","target_temperature"],combustion:["odometer","range","fuel_range","fuel_level_value","service","oil_level","outside_temperature","target_temperature"],hybrid:["odometer","range","fuel_range","total_range","charging_power_value","time_to_full","charging_state_value","charging_type","service","target_temperature"]};new Set(Object.values(Me).flat());const Ve=e=>Me[e]||Me.electric;function Oe(e,t){const i=!!Pe(e,"battery",t),s=!!Pe(e,"fuel",t);return i&&s?"hybrid":s?"combustion":"electric"}function Pe(e,t,i,s=[]){const r=He[(e=>({charging_state_value:"charging_state",fuel_level_value:"fuel"}[e]||e))(t)];if(!r||!e)return;const a=(i||Object.keys(e.states).filter(e=>e.startsWith("sensor."))).map(t=>e.states[t]).filter(e=>e&&!s.includes(e.entity_id)&&r.match(e));if(!a.length)return;return((r.prefer?a.filter(r.prefer):[])[0]||a[0]).entity_id}function ze(e,t){if(!t||!e||!e.entities)return;const i=Object.values(e.entities).filter(e=>e.device_id===t).map(e=>e.entity_id);return i.length?i:void 0}function Te(e){const t=function(e){if(!e||!e.devices||!e.entities)return;let t,i=0;for(const s of Object.keys(e.devices)){const r=ze(e,s);if(!r)continue;const a=t=>Pe(e,t,r)?1:0;if(!a("battery")&&!a("fuel"))continue;if(!a("odometer")&&!a("range")&&!a("fuel_range"))continue;const n=2*a("odometer")+2*Math.max(a("range"),a("fuel_range"))+a("charging_power_value")+a("charging_state");n>i&&(t=s,i=n)}return t}(e);if(!t)return{entities:{},values:[]};const i=ze(e,t),s=Be(e,i),r=Ne(e,i,[],Oe(e,i)),a=e.devices[t];return{name:a.name_by_user||a.name,device:t,entities:s,values:r}}function Ne(e,t,i=[],s="electric"){const r=[],a=[];for(const n of Ve(s)){if(i.includes(n))continue;const s=Pe(e,n,t,a);s&&(r.push({type:n,entity:s}),a.push(s))}return r}const Qe=["battery","fuel","charging_power","charging_state"];function Be(e,t){const i=Oe(e,t),s="combustion"===i?["fuel"]:"hybrid"===i?Qe:["battery","charging_power","charging_state"],r={};for(const i of s){const s=Pe(e,i,t);s&&(r[i]=s)}return r}const Ue=["odometer","range","total_range","target_temperature","outside_temperature"],je=["charging_power_value","time_to_full","charging_state_value","charging_type","fuel_level_value","fuel_range","service","oil_level"];function Ze(e){return je.includes(e.type)?"right":Ue.includes(e.type)?"left":void 0}function Re(e){const t=e.map(e=>"left"===e.position||"right"===e.position?e.position:Ze(e));let i=t.filter(e=>"left"===e).length,s=t.filter(e=>"right"===e).length;return t.map(e=>e||(i<=s?(i+=1,"left"):(s+=1,"right")))}const We=["electric","combustion","hybrid"],De=["0–20 %","20–40 %","40–60 %","60–80 %","80–100 %"],Fe=["charging","connect_cable","ready_for_charging","conserving","discharging","charging_interrupted"],Ie=[{name:"name",selector:{text:{}}},{name:"show_name",selector:{boolean:{}}},{name:"show_plate",selector:{boolean:{}}},{name:"silhouette",selector:{select:{mode:"dropdown",options:[]}}},{name:"image",selector:{text:{}}},{name:"language",selector:{select:{mode:"dropdown",options:[]}}}],qe=[{name:"device",selector:{device:{entity:[{domain:"sensor"}]}}}],Ke=[{name:"drive",selector:{select:{mode:"dropdown",options:[]}}},{name:"fuel_capacity",selector:{number:{min:0,max:500,step:1,mode:"box",unit_of_measurement:"L"}}}],Ge=[{name:"battery",selector:{entity:{filter:{domain:"sensor"}}}},{name:"fuel",selector:{entity:{filter:{domain:"sensor"}}}},{name:"charging_power",selector:{entity:{filter:{domain:"sensor"}}}},{name:"charging_state",selector:{entity:{filter:{domain:["sensor","binary_sensor"]}}}},{name:"plate",selector:{entity:{}}}],Je=e=>({name:e,selector:{number:{min:0,max:1e3,step:.1,mode:"box",unit_of_measurement:"kW"}}}),Xe=[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}}],Ye=(e,t)=>Array.isArray(e)&&Array.isArray(t)&&e.length===t.length&&e.every((e,i)=>e===t[i]),et=e=>null==e||""===e;class tt extends le{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}connectedCallback(){super.connectedCallback(),async function(){if((!customElements.get("ha-form")||!customElements.get("ha-entity-picker"))&&window.loadCardHelpers)try{const e=await window.loadCardHelpers(),t=await e.createCardElement({type:"entities",entities:[]});t&&t.constructor.getConfigElement&&await t.constructor.getConfigElement()}catch(e){}}().then(()=>this.requestUpdate())}setConfig(e){this._config={...e,entities:{...e.entities||{}},values:(e.values||[]).map(e=>"string"==typeof e?{entity:e}:{...e})}}_commit(e){const t={...e};for(const e of["name","image","device"])et(t[e])&&delete t[e];(et(t.drive)||"auto"===t.drive)&&delete t.drive,!et(t.fuel_capacity)&&Number(t.fuel_capacity)>0?t.fuel_capacity=Number(t.fuel_capacity):delete t.fuel_capacity,(et(t.silhouette)||t.silhouette===Ae)&&delete t.silhouette,(et(t.language)||"auto"===t.language)&&delete t.language,!0===t.show_name&&delete t.show_name,!0===t.show_plate&&delete t.show_plate;const i={};for(const[e,s]of Object.entries(t.entities||{}))et(s)||(i[e]=s);t.entities=i,t.charging_states&&t.charging_states.length&&!Ye(t.charging_states,ue)||delete t.charging_states,t.power_levels&&!Ye(t.power_levels,ge)||delete t.power_levels,t.colors&&!Ye(de(t.colors).map(e=>e.toLowerCase()),he)||delete t.colors,t.values=(t.values||[]).map(e=>{const t={entity:e.entity||""};return et(e.type)||(t.type=e.type),et(e.name)||(t.name=e.name),et(e.icon)||(t.icon=e.icon),"left"!==e.position&&"right"!==e.position||(t.position=e.position),t}),t.values.length||delete t.values,this._config={...e},pe(this,"config-changed",{config:t})}_generalChanged(e){e.stopPropagation();const t=e.detail.value;this._commit({...this._config,name:t.name,show_name:t.show_name,show_plate:t.show_plate,silhouette:t.silhouette,image:t.image,language:t.language})}_deviceChanged(e){e.stopPropagation();const t=e.detail.value.device,i={...this._config.entities};let s=this._config.values;const r=this._entitiesOfDevice(t);if(r){const e=e=>et(e)||!r.includes(e),t=Be(this.hass,r);for(const s of Qe)e(i[s])&&(t[s]?i[s]=t[s]:et(i[s])||delete i[s]);s=s.map(t=>{if(!t.type||!e(t.entity))return t;const i=Pe(this.hass,t.type,r);return i?{...t,entity:i}:t});const a=s.map(e=>e.type).filter(Boolean),n=We.includes(this._config.drive)?this._config.drive:Oe(this.hass,r);s=[...s,...Ne(this.hass,r,a,n)]}this._commit({...this._config,device:t,entities:i,values:s})}_toggleStandard(e,t){const i=this._config.values.filter(t=>t.type!==e);if(t){const t=i.map(e=>e.entity),s=Pe(this.hass,e,this._deviceEntities(),t)||"";i.push({type:e,entity:s})}this._commit({...this._config,values:i})}_otherSensors(){const e=this._deviceEntities();if(!e)return[];const t=[...Object.values(this._config.entities),...this._config.values.map(e=>e.entity)];return e.filter(e=>/^(sensor|binary_sensor)\./.test(e)&&this.hass.states[e]&&!t.includes(e)).map(e=>({id:e,name:this._shortName(e)})).sort((e,t)=>e.name.localeCompare(t.name))}_isOtherValue(e){return this._config.values.some(t=>t.entity===e&&!t.type)}_toggleOther(e,t){const i=t?[...this._config.values,{entity:e}]:this._config.values.filter(t=>!(t.entity===e&&!t.type));this._commit({...this._config,values:i})}_shortName(e){const t=this.hass.states[e],i=t&&t.attributes.friendly_name||e,s=this.hass.entities&&this.hass.entities[e],r=s&&this.hass.devices&&this.hass.devices[s.device_id],a=r&&(r.name_by_user||r.name);return a&&i.startsWith(a+" ")?i.slice(a.length+1):i}_driveChanged(e){e.stopPropagation();const t=e.detail.value;this._commit({...this._config,drive:t.drive,fuel_capacity:t.fuel_capacity})}_drive(){const e=this._config;if(We.includes(e.drive))return e.drive;const{battery:t,fuel:i}=e.entities;return t&&i?"hybrid":i?"combustion":"electric"}_driveSchema(){const e=["auto",...We].map(e=>({value:e,label:this._t(`drive.${e}`)}));return Ke.filter(e=>"fuel_capacity"!==e.name||"electric"!==this._drive()).map(t=>"drive"===t.name?{...t,selector:{select:{mode:"dropdown",options:e}}}:t)}_entitiesChanged(e){e.stopPropagation(),this._commit({...this._config,entities:{...e.detail.value}})}_chargingChanged(e){e.stopPropagation();const t=e.detail.value,i=[t.power_1,t.power_2,t.power_3].map((e,t)=>Number.isFinite(Number(e))&&!et(e)?Number(e):ge[t]);this._commit({...this._config,charging_states:t.charging_states||[],power_levels:i})}_valueChanged(e,t){t.stopPropagation();const i=[...this._config.values];i[e]={...t.detail.value},this._commit({...this._config,values:i})}_moveValue(e,t){const i=[...this._config.values],s=e+t;s<0||s>=i.length||([i[e],i[s]]=[i[s],i[e]],this._commit({...this._config,values:i}))}_switchSide(e,t){const i=[...this._config.values],s="left"===t?"right":"left",{position:r,...a}=i[e];i[e]=Ze(a)===s?a:{...a,position:s},this._commit({...this._config,values:i})}_removeValue(e){const t=this._config.values.filter((t,i)=>i!==e);this._commit({...this._config,values:t})}_addValue(e){e.stopPropagation();const t=e.detail.value&&e.detail.value.entity;t&&(this._commit({...this._config,values:[...this._config.values,{entity:t}]}),e.target.data={})}_colorChanged(e,t){const i=[...de(this._config.colors)];i[e]=t.target.value,this._commit({...this._config,colors:i})}_resetColors(){const{colors:e,...t}=this._config;this._commit(t)}_t(e,t){return ve(this.hass,e,t,this._config&&this._config.language)}_label=e=>"name"===e.name&&e._value?this._t("label.value_name"):this._t(`label.${e.name}`)||e.name;_helper=e=>this._t(`helper.${e.name}`);_deviceEntities(){return this._entitiesOfDevice(this._config.device)}_entitiesOfDevice(e){if(!e||!this.hass||!this.hass.entities)return;const t=Object.values(this.hass.entities).filter(t=>t.device_id===e).map(e=>e.entity_id);return t.length?t:void 0}_filterSchema(e,t=[]){const i=this._deviceEntities();if(!i)return e;const s=[...new Set([...i,...t.filter(Boolean)])];return e.map(e=>e.selector&&e.selector.entity?{...e,selector:{entity:{...e.selector.entity,include_entities:s}}}:e)}_generalSchema(){const e=xe.map(e=>({value:e,label:this._t(`silhouette.${e}`)||e})),t=[{value:"auto",label:this._t("language.auto")},...fe.map(e=>({value:e,label:me[e]["language.name"]}))];return Ie.map(i=>"silhouette"===i.name?{...i,selector:{select:{mode:"dropdown",options:e}}}:"language"===i.name?{...i,selector:{select:{mode:"dropdown",options:t}}}:i)}_chargingSchema(){const e=this.hass&&this._config.entities.charging_state?this.hass.states[this._config.entities.charging_state]:void 0,t=e&&Array.isArray(e.attributes.options)?e.attributes.options:[],i=this._config.charging_states||ue;return[{name:"charging_states",selector:{select:{multiple:!0,custom_value:!0,mode:"list",options:[...new Set([...t,...Fe,...i])].map(e=>({value:e,label:e}))}}},{type:"grid",name:"",schema:[Je("power_1"),Je("power_2"),Je("power_3")]}]}_form(e,t,i){return R`<ha-form
      .hass=${this.hass}
      .data=${t}
      .schema=${e}
      .computeLabel=${this._label}
      .computeHelper=${this._helper}
      @value-changed=${i}
    ></ha-form>`}render(){if(!this._config||!this.hass)return F;const e=this._config,t=e.power_levels||ge,i=de(e.colors),s=Xe.map(e=>"name"===e.name?{...e,_value:!0}:e),r=this._drive(),a="combustion"===r?["battery","charging_power","charging_state"]:("electric"!==r||e.drive,[]),n=this._filterSchema(Ge.filter(e=>!a.includes(e.name)),Object.values(e.entities)),o=Re(e.values);return R`
      <div class="section">
        <h3>${this._t("editor.general")}</h3>
        ${this._form(this._generalSchema(),{name:e.name||"",show_name:!1!==e.show_name,show_plate:!1!==e.show_plate,silhouette:e.silhouette||Ae,image:e.image||"",language:e.language||"auto"},this._generalChanged)}
      </div>

      <div class="section">
        <h3>${this._t("editor.entities")}</h3>
        ${this._form(qe,{device:e.device||""},this._deviceChanged)}
        ${this._form(this._driveSchema(),{drive:e.drive||"auto",fuel_capacity:e.fuel_capacity},this._driveChanged)}
        ${this._form(n,e.entities,this._entitiesChanged)}
      </div>

      ${"combustion"===this._drive()?F:R`<div class="section">
        <h3>${this._t("editor.charging")}</h3>
        <p class="note">${this._t("editor.charging_note")}</p>
        ${this._form(this._chargingSchema(),{charging_states:e.charging_states||ue,power_1:t[0],power_2:t[1],power_3:t[2]},this._chargingChanged)}
      </div>`}

      <div class="section">
        <h3>${this._t("editor.values")}</h3>
        <div class="quick">
          ${Ve(this._drive()).map(t=>R`
              <label>
                <input
                  type="checkbox"
                  data-type=${t}
                  .checked=${e.values.some(e=>e.type===t)}
                  @change=${e=>this._toggleStandard(t,e.target.checked)}
                />
                ${this._t(`value.${t}`)}
              </label>
            `)}
        </div>
        <p class="note">${this._t("editor.quick_note")}</p>
        <p class="note">${this._t("editor.values_note")}</p>
        ${e.values.map((t,i)=>R`
            <div class="value-row">
              <div class="value-head">
                <span class="badge">${this._t("left"===o[i]?"editor.left":"editor.right")} · ${i+1}</span>
                <span class="spacer"></span>
                ${this._iconButton("M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z",this._t("editor.move_up"),0===i,()=>this._moveValue(i,-1))}
                ${this._iconButton("M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",this._t("editor.move_down"),i===e.values.length-1,()=>this._moveValue(i,1))}
                ${this._iconButton("M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z",this._t("editor.switch_side"),!1,()=>this._switchSide(i,o[i]))}
                ${this._iconButton("M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",this._t("editor.remove"),!1,()=>this._removeValue(i))}
              </div>
              ${this._form(this._filterSchema(s,[t.entity]),t,e=>this._valueChanged(i,e))}
            </div>
          `)}
        ${this._renderOtherSensors(e)}
        <div class="add">
          ${this._form(this._filterSchema([{name:"entity",selector:{entity:{}}}]),{},this._addValue)}
          <span class="note">${this._t("editor.add_note")}</span>
        </div>
      </div>

      <div class="section">
        <h3>${this._t("editor.colors")}</h3>
        <div class="colors">
          ${i.map((e,t)=>R`
              <label class="color">
                <input
                  type="color"
                  .value=${/^#[0-9a-f]{6}$/i.test(e)?e:"#000000"}
                  @change=${e=>this._colorChanged(t,e)}
                />
                <span>${De[t]||this._t("editor.full_color")}</span>
              </label>
            `)}
        </div>
        <button class="text-button" @click=${this._resetColors} ?disabled=${!e.colors}>
          ${this._t("editor.reset_colors")}
        </button>
      </div>
    `}_renderOtherSensors(e){const t=e.values.filter(e=>!e.type&&e.entity&&this.hass.states[e.entity]).map(e=>({id:e.entity,name:this._shortName(e.entity)})),i=this._deviceEntities()||[],s=[...t.filter(e=>i.includes(e.id)),...this._otherSensors()];return s.length?R`
      <h4>${this._t("editor.other_sensors")}</h4>
      <div class="quick other">
        ${s.map(e=>R`
            <label title=${e.id}>
              <input
                type="checkbox"
                data-entity=${e.id}
                .checked=${this._isOtherValue(e.id)}
                @change=${t=>this._toggleOther(e.id,t.target.checked)}
              />
              ${e.name}
            </label>
          `)}
      </div>
    `:F}_iconButton(e,t,i,s){return R`<button
      class="icon-button"
      title=${t}
      aria-label=${t}
      ?disabled=${i}
      @click=${s}
    >
      <svg viewBox="0 0 24 24"><path d=${e}></path></svg>
    </button>`}static get styles(){return a`
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
      .quick {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 6px 12px;
        margin-bottom: 8px;
      }
      h4 {
        font-size: 0.9rem;
        font-weight: 500;
        margin: 16px 0 6px;
      }
      .quick label {
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
      }
      .quick input {
        width: 18px;
        height: 18px;
        accent-color: var(--primary-color, #03a9f4);
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
    `}}customElements.get("car-info-card-editor")||customElements.define("car-info-card-editor",tt);const it=["unknown","unavailable","none",""],st={x:12,y:12,w:180,h:76,gap:6,segments:5},rt=["electric","combustion","hybrid"],at="M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M12,10H6V5H12M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14C17,12.89 16.1,12 15,12H14V5C14,3.89 13.1,3 12,3H6C4.89,3 4,3.89 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23Z";class nt extends le{static get properties(){return{hass:{attribute:!1},_config:{state:!0}}}static getConfigElement(){return document.createElement("car-info-card-editor")}static getStubConfig(e){return Te(e)}setConfig(e){if(!e)throw new Error("Invalid configuration.");if(void 0!==e.entities&&"object"!=typeof e.entities)throw new Error("entities must be an object.");if(e.language&&"auto"!==e.language&&!fe.includes(e.language))throw new Error(`language must be auto or one of: ${fe.join(", ")}.`);if(e.drive&&"auto"!==e.drive&&!rt.includes(e.drive))throw new Error(`drive must be auto or one of: ${rt.join(", ")}.`);if(e.silhouette&&!we[e.silhouette])throw new Error(`silhouette must be one of: ${xe.join(", ")}.`);if(e.values&&!Array.isArray(e.values))throw new Error("values must be a list.");if(e.colors&&(!Array.isArray(e.colors)||![5,6].includes(e.colors.length)))throw new Error("colors must contain 5 segment colors and optionally a 6th color for fully charged.");this._config={show_name:!0,show_plate:!0,values:[],...e,entities:{...e.entities||{}},values:(e.values||[]).map(e=>"string"==typeof e?{entity:e}:e)}}_t(e,t){return ve(this.hass,e,t,this._config&&this._config.language)}getCardSize(){return 5}getGridOptions(){return{columns:12,min_columns:6}}_stateObj(e){return e&&this.hass?this.hass.states[e]:void 0}_isAvailable(e){return e&&!it.includes(String(e.state).toLowerCase())}_formatState(e){if(!this._isAvailable(e))return"–";if(this.hass.formatEntityState)return this.hass.formatEntityState(e);const t=e.attributes.unit_of_measurement;return t?`${e.state} ${t}`:e.state}_soc(){return this._percent(this._config.entities.battery)}_fuel(){return this._percent(this._config.entities.fuel,this._config.fuel_capacity)}_percent(e,t){const i=this._stateObj(e);if(!this._isAvailable(i))return;let s=parseFloat(i.state);if(!Number.isFinite(s))return;if("%"!==(i.attributes.unit_of_measurement||"%").trim()){if(!(t>0))return;s=s/t*100}return Math.min(100,Math.max(0,s))}_drive(){const e=this._config.drive;if(rt.includes(e))return e;const{battery:t,fuel:i}=this._config.entities;return t&&i?"hybrid":i?"combustion":"electric"}_powerKw(){const e=this._stateObj(this._config.entities.charging_power);if(!this._isAvailable(e))return 0;const t=parseFloat(e.state);if(!Number.isFinite(t))return 0;const i=(e.attributes.unit_of_measurement||"kW").trim();return"W"===i?t/1e3:"MW"===i?1e3*t:t}_isCharging(){if("combustion"===this._drive())return!1;const e=this._config.entities.charging_state;if(e){const t=this._stateObj(e);if(!t)return!1;if(e.startsWith("binary_sensor.")&&!this._config.charging_states)return"on"===t.state;return(this._config.charging_states||ue).includes(t.state)}return this._powerKw()>0}_chargeLevel(){if(!this._isCharging())return 0;const e=this._powerKw(),t=this._config.power_levels||ge,i=t.findIndex(t=>e<=t);return-1===i?t.length+1:i+1}_moreInfo(e){e&&pe(this,"hass-more-info",{entityId:e})}render(){if(!this._config||!this.hass)return F;const e=this._config;if(!e.entities.battery&&!e.entities.fuel)return R`<ha-card>
        <div class="hint">
          ${this._t("card.hint")}
        </div>
      </ha-card>`;const t=this._drive(),i=this._soc(),s=this._fuel(),r=this._chargeLevel(),a="combustion"===t?s:i,n="combustion"===t?e.entities.fuel:e.entities.battery,o=e.values.filter(e=>e.entity),{left:l,right:c}=function(e){const t=Re(e);return{left:e.filter((e,i)=>"left"===t[i]),right:e.filter((e,i)=>"right"===t[i])}}(o),h=this._stateObj(e.entities.plate),d=!1!==e.show_name&&!!e.name,u=!1!==e.show_plate&&this._isAvailable(h);return R`
      <ha-card>
        ${d||u?R`<div class="header">
              <span class="name">${d?e.name:""}</span>
              ${u?R`<span class="plate">${h.state}</span>`:F}
            </div>`:F}
        <div class="layout ${o.length?"":"no-values"}">
          <div class="values left">${l.map(e=>this._renderValue(e))}</div>
          <div class="center">
            <div class="car">
              ${e.image?R`<img src=${e.image} alt="" />`:this._renderCar()}
              <div
                class="battery level-${r}"
                style=${this._batteryStyle()}
                data-drive=${t}
                @click=${()=>this._moreInfo(n)}
              >
                ${"combustion"===t?this._renderTank(s):this._renderBattery(i,r,"hybrid"===t?s:null)}
              </div>
            </div>
            <div class="soc">${void 0===a?"–":`${Math.round(a)} %`}</div>
            ${"hybrid"===t?this._renderFuelLine(s):F}
            ${this._renderBatteryProblem(t)}
            ${"combustion"===t?F:this._renderStatus(r)}
          </div>
          <div class="values right">${c.map(e=>this._renderValue(e))}</div>
        </div>
      </ha-card>
    `}_batteryStyle(){const e=this._config.image?we[Ae].battery:this._silhouette().battery;return`left:${e.left}%;top:${e.top}%;width:${e.width}%`}_renderStatus(e){const t=this._config.entities,i=this._stateObj(t.charging_state),s=[];if(i&&s.push(this._formatState(i)),e>0){const e=this._stateObj(t.charging_power);this._isAvailable(e)&&s.push(this._formatState(e))}return s.length?R`<div
      class="status ${e>0?"charging":""}"
      @click=${()=>this._moreInfo(t.charging_state||t.charging_power)}
    >
      ${s.join(" · ")}
    </div>`:F}_renderBatteryProblem(e){const t=[],i=(e,i)=>{const s=this._config.entities[e],r=this._stateObj(s);r?this._isAvailable(r)&&!Number.isFinite(parseFloat(r.state))?t.push(this._t(`card.${i}_not_numeric`,{state:this._formatState(r)})):"fuel"!==e||!this._isAvailable(r)||"%"===(r.attributes.unit_of_measurement||"%").trim()||this._config.fuel_capacity>0||t.push(this._t("card.fuel_needs_capacity",{unit:r.attributes.unit_of_measurement})):t.push(this._t(`card.${i}_missing`,{entity:s}))};return"combustion"!==e&&i("battery","battery"),"electric"!==e&&i("fuel","fuel"),t.map(e=>R`<div class="problem">${e}</div>`)}_renderFuelLine(e){return R`<div class="fuel-line" @click=${()=>this._moreInfo(this._config.entities.fuel)}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${at}></path></svg>
      ${void 0===e?"–":`${Math.round(e)} %`}
    </div>`}_entityName(e){const t=e.attributes.friendly_name||e.entity_id,i=this.hass.entities&&this.hass.entities[e.entity_id],s=i&&i.device_id&&this.hass.devices&&this.hass.devices[i.device_id],r=s&&(s.name_by_user||s.name);return r&&t.startsWith(r+" ")&&t.length>r.length+1?t.slice(r.length+1):t}_renderValue(e){const t=this._stateObj(e.entity),i=e.name||(t?this._entityName(t):e.entity);return R`
      <div class="value" @click=${()=>this._moreInfo(e.entity)}>
        ${e.icon?R`<ha-icon class="icon" .icon=${e.icon}></ha-icon>`:t?R`<ha-state-icon
              class="icon"
              .hass=${this.hass}
              .stateObj=${t}
            ></ha-state-icon>`:F}
        <div class="text">
          <span class="label">${i}</span>
          <span class="state">${t?this._formatState(t):this._t("card.not_found")}</span>
        </div>
      </div>
    `}_segments(e,t,i=0){const s=de(this._config.colors),r=void 0!==e&&Math.round(e)>=100,a=st.segments,n=(t.w-t.gap*(a-1))/a,o=100/a,l=void 0===e?-1:Math.min(a-1,Math.floor(e/o));return s.slice(0,a).map((c,h)=>{const d=r?s[a]:c,u=t.x+h*(n+t.gap),g=void 0===e?0:Math.min(1,Math.max(0,(e-h*o)/o)),p=i>0&&h===l;return W`
        <rect class="track" x=${u} y=${t.y} width=${n} height=${t.h} rx="4"></rect>
        ${g>0?W`<rect class="seg ${p?"active":""}" x=${u} y=${t.y}
              width=${n*g} height=${t.h} rx="4" fill=${d}></rect>`:F}
        ${p&&g<1?W`<rect class="seg-next" x=${u+n*g} y=${t.y}
              width=${n*(1-g)} height=${t.h} rx="4" fill=${d}></rect>`:F}
      `})}_renderTank(e){return R`
      <svg
        viewBox="0 0 220 100"
        role="img"
        class="tank"
        aria-label=${void 0===e?this._t("card.fuel_unknown"):this._t("card.fuel",{level:Math.round(e)})}
      >
        <rect class="shell-bg" x="4" y="4" width="212" height="92" rx="14"></rect>
        ${this._segments(e,{x:14,y:14,w:192,h:72,gap:6})}
        <rect class="shell" x="4" y="4" width="212" height="92" rx="14"></rect>
        <path class="pump" transform="translate(74 14) scale(3)" d=${at}></path>
      </svg>
    `}_fuelBar(e){const t=de(this._config.colors),i=st.segments,s=void 0===e?"none":Math.round(e)>=100?t[i]:t[Math.min(i-1,Math.floor(e/(100/i)))];return W`
      <rect class="shell-bg fuel-plate" x="0" y="102" width="206" height="36" rx="12"></rect>
      <path class="pump small" transform="translate(6 108) scale(1.2)" d=${at}></path>
      <rect class="track" x="36" y="114" width="164" height="16" rx="8"></rect>
      ${e?W`<rect class="fuel-fill" x="36" y="114" width=${164*e/100} height="16" rx="8" fill=${s}></rect>`:F}
    `}_renderBattery(e,t,i=null){const s=this._segments(e,st,t);return R`
      <svg
        viewBox=${null===i?"0 0 220 100":"0 0 220 140"}
        role="img"
        aria-label=${void 0===e?this._t("card.soc_unknown"):this._t("card.soc",{soc:Math.round(e)})+(t>0?`, ${this._t("card.charging")}`:"")}
      >
        <rect class="shell-bg" x="4" y="4" width="196" height="92" rx="12"></rect>
        ${s}
        <rect class="shell" x="4" y="4" width="196" height="92" rx="12"></rect>
        <rect class="cap" x="202" y="34" width="12" height="32" rx="4"></rect>
        <g class="bolt">
          <path
            d="M114 8 L78 56 H100 L90 92 L128 42 H106 Z"
            stroke-linejoin="round"
          ></path>
        </g>
        ${null===i?F:this._fuelBar(i)}
      </svg>
    `}_silhouette(){return we[this._config.silhouette]||we[Ae]}_renderCar(){const e=we[this._config.silhouette]?this._config.silhouette:Ae;return R`
      <svg class="car-svg" viewBox="0 0 400 150" aria-hidden="true" data-silhouette=${e}>
        ${we[e].draw()}
      </svg>
    `}static get styles(){return a`
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
      .pump {
        fill: var(--cic-bolt-off);
        stroke: var(--cic-bg);
        stroke-width: 1.2;
        paint-order: stroke;
      }
      .fuel-plate {
        stroke: var(--cic-text);
        stroke-width: 2;
        stroke-opacity: 0.35;
      }
      .pump.small {
        fill: var(--cic-secondary);
        stroke: none;
      }
      .fuel-line {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.95rem;
        font-weight: 500;
        color: var(--cic-secondary);
        cursor: pointer;
      }
      .fuel-line svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
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
        .values {
          align-self: start;
        }
        .values.right {
          text-align: left;
        }
        .values.right .value {
          flex-direction: row;
        }
      }
    `}}var ot;customElements.get("car-info-card")||(customElements.define("car-info-card",nt),window.customCards=window.customCards||[],window.customCards.push({type:"car-info-card",name:"Car Info Card",description:(ot="card.description",ve({language:navigator.language||"en"},ot)),preview:!0}),console.info("%c CAR-INFO-CARD %c 0.4.2 ","color:#fff;background:#2e7d32;font-weight:600","color:#2e7d32;background:#fff"));
