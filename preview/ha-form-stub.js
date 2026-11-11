// Vereinfachter Ersatz für das HA-Element ha-form, nur für Vorschau und Tests.
// Bildet die verwendeten Selektoren mit nativen Eingabefeldern nach; das
// Aussehen entspricht NICHT dem echten Home-Assistant-Editor.
class StubHaForm extends HTMLElement {
  set hass(v) { this._hass = v; this._render(); }
  set data(v) { this._data = v || {}; this._render(); }
  get data() { return this._data; }
  set schema(v) { this._schema = v; this._render(); }
  set computeLabel(f) { this._label = f; }
  set computeHelper(f) { this._helper = f; }

  _emit(name, value) {
    const data = { ...this._data, [name]: value };
    this.dispatchEvent(new CustomEvent("value-changed", { detail: { value: data }, bubbles: true, composed: true }));
  }

  _field(s) {
    const label = (this._label && this._label(s)) || s.name;
    const helper = this._helper && this._helper(s);
    const wrap = document.createElement("label");
    wrap.className = "f";
    wrap.dataset.name = s.name;
    const cap = document.createElement("span");
    cap.className = "cap";
    cap.textContent = label + (s.required ? " *" : "");
    wrap.append(cap);
    const val = this._data[s.name];
    const sel = s.selector || {};
    let input;
    if (sel.entity) {
      input = document.createElement("select");
      const dom = sel.entity.filter?.domain;
      const ids = Object.keys(this._hass?.states || {}).filter((id) => !dom || id.startsWith(dom + "."));
      input.append(new Option("– keine –", ""));
      ids.forEach((id) => input.append(new Option(id, id)));
      input.value = val || "";
      input.onchange = () => this._emit(s.name, input.value || undefined);
    } else if (sel.boolean) {
      input = document.createElement("input");
      input.type = "checkbox";
      input.checked = !!val;
      input.onchange = () => this._emit(s.name, input.checked);
      wrap.classList.add("row");
    } else if (sel.number) {
      input = document.createElement("input");
      input.type = "number";
      input.step = sel.number.step ?? 1;
      input.value = val ?? "";
      input.onchange = () => this._emit(s.name, input.value === "" ? undefined : Number(input.value));
    } else if (sel.select?.multiple) {
      input = document.createElement("div");
      input.className = "multi";
      const cur = new Set(val || []);
      for (const o of sel.select.options) {
        const l = document.createElement("label");
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.value = o.value;
        cb.checked = cur.has(o.value);
        cb.onchange = () => this._emit(s.name,
          [...input.querySelectorAll("input:checked")].map((c) => c.value));
        l.append(cb, " " + o.label);
        input.append(l);
      }
    } else {
      input = document.createElement("input");
      input.type = "text";
      input.value = val ?? "";
      input.onchange = () => this._emit(s.name, input.value);
    }
    wrap.append(input);
    if (helper) {
      const h = document.createElement("span");
      h.className = "help";
      h.textContent = helper;
      wrap.append(h);
    }
    return wrap;
  }

  _render() {
    if (!this._schema || !this._data) return;
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    const root = this.shadowRoot;
    root.innerHTML = `<style>
      :host{display:block;font-size:14px}
      .f{display:flex;flex-direction:column;gap:3px;margin:6px 0}
      .f.row{flex-direction:row-reverse;justify-content:flex-end;align-items:center;gap:8px}
      .cap{font-size:12px;color:var(--secondary-text-color)}
      .help{font-size:11px;color:var(--secondary-text-color)}
      input[type=text],input[type=number],select{font:inherit;padding:7px 8px;border-radius:4px;
        border:1px solid var(--divider-color);background:var(--card-background-color);color:var(--primary-text-color)}
      .grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
      input,select{min-width:0;box-sizing:border-box}
      .multi{display:flex;flex-wrap:wrap;gap:4px 14px;color:var(--primary-text-color)}
    </style>`;
    for (const s of this._schema) {
      if (s.type === "grid") {
        const g = document.createElement("div");
        g.className = "grid";
        s.schema.forEach((c) => g.append(this._field(c)));
        root.append(g);
      } else {
        root.append(this._field(s));
      }
    }
  }
}
customElements.define("ha-form", StubHaForm);
