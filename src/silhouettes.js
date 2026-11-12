import { svg } from "lit";

// Own, generic side views (front on the right) on a 400 × 150 canvas.
// None of them copies a real car model. `battery` places the battery
// overlay in percent of the image: horizontal centre, vertical centre, width.

const wheel = (cx, cy, r, rim) => svg`
  <circle class="tyre" cx=${cx} cy=${cy} r=${r}></circle>
  <circle class="rim" cx=${cx} cy=${cy} r=${rim}></circle>
`;

const spokedWheel = (cx, cy, r, rim) => {
  const d = rim * 0.71;
  return svg`
    <circle class="tyre" cx=${cx} cy=${cy} r=${r}></circle>
    <circle class="rim" cx=${cx} cy=${cy} r=${rim}></circle>
    <path class="spokes" d="M${cx - rim} ${cy} H${cx + rim} M${cx} ${cy - rim} V${cy + rim}
      M${cx - d} ${cy - d} L${cx + d} ${cy + d} M${cx - d} ${cy + d} L${cx + d} ${cy - d}"></path>
    <circle class="hub" cx=${cx} cy=${cy} r="3"></circle>
  `;
};

const shadow = (rx = 180) => svg`<ellipse class="shadow" cx="200" cy="142" rx=${rx} ry="5"></ellipse>`;

export const SILHOUETTES = {
  suv: {
    battery: { left: 50, top: 58, width: 42 },
    draw: () => svg`
      ${shadow()}
      <path class="body" d="M28 112 V88 Q28 72 44 68 L60 64 L70 36 Q74 26 86 26 H238 Q252 26 262 34
        L300 62 L352 70 Q372 74 374 92 V112 Q374 120 366 120 H338
        A33 33 0 0 0 272 120 H128 A33 33 0 0 0 62 120 H36 Q28 120 28 112 Z"></path>
      <path class="window" d="M80 34 H164 V62 H70 Z M172 34 H236 Q246 34 254 40 L284 62 H172 Z"></path>
      <path class="line" d="M168 64 V112 M262 66 Q266 90 262 112"></path>
      <path class="line" d="M64 84 H370"></path>
      <rect class="light front" x="356" y="78" width="16" height="7" rx="3"></rect>
      <rect class="light rear" x="29" y="76" width="9" height="10" rx="3"></rect>
      <path class="mirror" d="M286 56 l10 -2 l2 8 l-9 1 Z"></path>
      ${wheel(305, 120, 26, 14)}
      ${wheel(95, 120, 26, 14)}
    `,
  },

  sedan: {
    battery: { left: 50, top: 62, width: 40 },
    draw: () => svg`
      ${shadow()}
      <path class="body" d="M24 112 V92 Q24 80 38 78 L96 74 Q118 46 140 44 H236 Q252 44 262 52
        L292 74 L356 80 Q376 84 376 100 V112 Q376 120 368 120 H330
        A25 25 0 0 0 280 120 H120 A25 25 0 0 0 70 120 H32 Q24 120 24 112 Z"></path>
      <path class="window" d="M108 72 Q124 52 142 50 H184 V72 Z M192 50 H234 Q246 50 254 56 L276 72 H192 Z"></path>
      <path class="line" d="M188 74 V114 M60 88 H370"></path>
      <rect class="light front" x="360" y="86" width="15" height="6" rx="3"></rect>
      <rect class="light rear" x="25" y="84" width="8" height="8" rx="3"></rect>
      <path class="mirror" d="M276 66 l10 -2 l2 7 l-9 1 Z"></path>
      ${wheel(305, 120, 22, 12)}
      ${wheel(95, 120, 22, 12)}
    `,
  },

  hatchback: {
    battery: { left: 50, top: 58, width: 40 },
    draw: () => svg`
      ${shadow(160)}
      <path class="body" d="M50 112 V82 Q50 62 62 56 L84 36 Q90 30 100 30 H220 Q232 30 242 38
        L280 66 L330 74 Q350 78 352 96 V112 Q352 120 344 120 H314
        A25 25 0 0 0 264 120 H136 A25 25 0 0 0 86 120 H58 Q50 120 50 112 Z"></path>
      <path class="window" d="M90 40 Q94 36 102 36 H158 V64 H72 Z M166 36 H218 Q228 36 236 42 L262 64 H166 Z"></path>
      <path class="line" d="M162 66 V112 M56 80 H348"></path>
      <rect class="light front" x="336" y="82" width="14" height="6" rx="3"></rect>
      <rect class="light rear" x="51" y="68" width="8" height="12" rx="3"></rect>
      <path class="mirror" d="M262 58 l10 -2 l2 7 l-9 1 Z"></path>
      ${wheel(289, 120, 22, 12)}
      ${wheel(111, 120, 22, 12)}
    `,
  },

  van: {
    battery: { left: 50, top: 58, width: 42 },
    draw: () => svg`
      ${shadow()}
      <path class="body" d="M22 112 V36 Q22 22 36 22 H262 Q276 22 284 32 L318 66 L360 74
        Q378 78 378 96 V112 Q378 120 370 120 H340
        A25 25 0 0 0 290 120 H120 A25 25 0 0 0 70 120 H30 Q22 120 22 112 Z"></path>
      <path class="window" d="M34 32 H120 V62 H34 Z M128 32 H220 V62 H128 Z
        M228 32 H262 Q270 32 276 38 L300 62 H228 Z"></path>
      <path class="line" d="M124 64 V112 M224 64 V112 M28 80 H372"></path>
      <rect class="light front" x="362" y="82" width="14" height="7" rx="3"></rect>
      <rect class="light rear" x="23" y="68" width="8" height="14" rx="3"></rect>
      <path class="mirror" d="M300 54 l10 -2 l2 8 l-9 1 Z"></path>
      ${wheel(315, 120, 22, 12)}
      ${wheel(95, 120, 22, 12)}
    `,
  },

  race: {
    battery: { left: 34, top: 64, width: 28 },
    draw: () => svg`
      ${shadow(185)}
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
      ${wheel(92, 112, 32, 15)}
      ${wheel(318, 116, 27, 13)}
    `,
  },

  tractor: {
    battery: { left: 62, top: 62, width: 32 },
    draw: () => svg`
      ${shadow(170)}
      <rect class="body" x="62" y="8" width="122" height="8" rx="3"></rect>
      <path class="body" d="M70 78 V20 Q70 16 74 16 H172 Q176 16 176 20 V78 Z"></path>
      <path class="window" d="M82 26 H164 V70 H82 Z"></path>
      <path class="body" d="M140 76 H336 Q352 76 354 92 V108 Q354 114 348 114 H140 Z"></path>
      <path class="line" d="M336 84 V108 M342 84 V108 M348 86 V106"></path>
      <rect class="mirror" x="300" y="38" width="7" height="38" rx="2"></rect>
      <rect class="light front" x="346" y="80" width="8" height="8" rx="2"></rect>
      <path class="body" d="M61 86 A52 52 0 0 1 159 86 L156 90 A48 48 0 0 0 64 90 Z"></path>
      ${wheel(110, 104, 42, 22)}
      ${wheel(312, 122, 22, 11)}
    `,
  },

  vintage: {
    battery: { left: 50, top: 60, width: 34 },
    draw: () => svg`
      ${shadow(170)}
      ${spokedWheel(46, 82, 16, 9)}
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
      ${spokedWheel(100, 116, 26, 16)}
      ${spokedWheel(300, 116, 26, 16)}
    `,
  },
};

export const SILHOUETTE_NAMES = Object.keys(SILHOUETTES);
export const DEFAULT_SILHOUETTE = "suv";
