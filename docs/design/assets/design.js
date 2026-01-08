/* Design Lab — interactive exhibits (no dependencies) */

const $ = (sel) => document.querySelector(sel);

function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

// ---------- Exhibit 1: hierarchy/proximity demo ----------
function initPrinciples(){
  const titleSize = $('#ctlTitleSize');
  const bodySize = $('#ctlBodySize');
  const spacing = $('#ctlSpacing');
  const emphasis = $('#ctlEmphasis');

  const valTitleSize = $('#valTitleSize');
  const valBodySize = $('#valBodySize');
  const valSpacing = $('#valSpacing');

  const demo = $('#demoCard');
  const demoTitle = $('#demoTitle');
  const demoBody = $('#demoBody');
  const demoBadge = $('#demoBadge');

  if(!titleSize || !demo) return;

  function apply(){
    const ts = Number(titleSize.value);
    const bs = Number(bodySize.value);
    const sp = Number(spacing.value);
    const em = emphasis.value;

    valTitleSize.textContent = `${ts}px`;
    valBodySize.textContent = `${bs}px`;
    valSpacing.textContent = `${sp}px`;

    demoTitle.style.fontSize = `${ts}px`;
    demoBody.style.fontSize = `${bs}px`;

    demo.style.padding = `${sp}px`;
    demoTitle.style.marginTop = `${Math.round(sp * 0.7)}px`;
    demoTitle.style.marginBottom = `${Math.round(sp * 0.35)}px`;
    demoBody.style.marginBottom = `${Math.round(sp * 0.8)}px`;

    // Emphasis changes contrast + badge prominence
    if(em === 'subtle'){
      demo.style.background = 'rgba(255,255,255,.025)';
      demo.style.borderColor = 'rgba(255,255,255,.10)';
      demoBadge.style.background = 'rgba(255,255,255,.06)';
      demoBadge.style.borderColor = 'rgba(255,255,255,.14)';
    } else if(em === 'balanced'){
      demo.style.background = 'rgba(255,255,255,.03)';
      demo.style.borderColor = 'rgba(255,255,255,.12)';
      demoBadge.style.background = 'rgba(34,197,94,.18)';
      demoBadge.style.borderColor = 'rgba(34,197,94,.35)';
    } else {
      demo.style.background = 'rgba(79,70,229,.12)';
      demo.style.borderColor = 'rgba(79,70,229,.35)';
      demoBadge.style.background = 'rgba(245,158,11,.22)';
      demoBadge.style.borderColor = 'rgba(245,158,11,.45)';
    }
  }

  [titleSize, bodySize, spacing, emphasis].forEach(el => el.addEventListener('input', apply));
  apply();
}

// ---------- Exhibit 2: typography playground ----------
function initTypography(){
  const ctlFontSize = $('#ctlFontSize');
  const ctlLineHeight = $('#ctlLineHeight');
  const ctlMeasure = $('#ctlMeasure');
  const ctlParagraph = $('#ctlParagraph');

  const valFontSize = $('#valFontSize');
  const valLineHeight = $('#valLineHeight');
  const valMeasure = $('#valMeasure');

  const typeDemo = $('#typeDemo');
  const metricLine = $('#metricLine');
  const metricRec = $('#metricRec');

  if(!ctlFontSize || !typeDemo) return;

  function apply(){
    const fs = Number(ctlFontSize.value);
    const lh = Number(ctlLineHeight.value);
    const measure = Number(ctlMeasure.value);
    const style = ctlParagraph.value;

    valFontSize.textContent = `${fs}px`;
    valLineHeight.textContent = `${lh.toFixed(2)}`;
    valMeasure.textContent = `${measure}ch`;

    typeDemo.style.fontSize = `${fs}px`;
    typeDemo.style.lineHeight = `${lh}`;
    typeDemo.style.maxWidth = `${measure}ch`;

    if(style === 'plain'){
      typeDemo.style.letterSpacing = '0';
      typeDemo.style.wordSpacing = '0';
    } else if(style === 'comfortable'){
      typeDemo.style.letterSpacing = '0.01em';
      typeDemo.style.wordSpacing = '0.02em';
    } else {
      typeDemo.style.letterSpacing = '-0.005em';
      typeDemo.style.wordSpacing = '0';
    }

    metricLine.textContent = `${measure}ch`;
    const ok = measure >= 45 && measure <= 75;
    metricRec.textContent = ok ? 'Within 45–75ch' : (measure < 45 ? 'Too short (try 45–75ch)' : 'Too long (try 45–75ch)');
  }

  [ctlFontSize, ctlLineHeight, ctlMeasure, ctlParagraph].forEach(el => el.addEventListener('input', apply));
  apply();
}

// ---------- Exhibit 3: spacing scale generator ----------
function initSpacing(){
  const ctlBase = $('#ctlBase');
  const ctlRatio = $('#ctlRatio');
  const ctlSteps = $('#ctlSteps');

  const valBase = $('#valBase');
  const valRatio = $('#valRatio');
  const valSteps = $('#valSteps');

  const scaleList = $('#scaleList');

  if(!ctlBase || !scaleList) return;

  function apply(){
    const base = Number(ctlBase.value);
    const ratio = Number(ctlRatio.value);
    const steps = Number(ctlSteps.value);

    valBase.textContent = `${base}px`;
    valRatio.textContent = `${ratio.toFixed(2)}×`;
    valSteps.textContent = `${steps}`;

    const values = [];
    for(let i=0;i<steps;i++){
      const v = Math.round(base * Math.pow(ratio, i));
      values.push(v);
    }

    const max = Math.max(...values);
    scaleList.innerHTML = values.map(v => {
      const w = Math.round((v / max) * 100);
      return `
        <div class="scale-row">
          <div class="scale-chip">${v}px</div>
          <div class="scale-bar" aria-hidden="true"><div style="width:${w}%"></div></div>
        </div>
      `;
    }).join('');
  }

  [ctlBase, ctlRatio, ctlSteps].forEach(el => el.addEventListener('input', apply));
  apply();
}

// ---------- Color utilities ----------
function hexToRgb(hex){
  const h = hex.replace('#','').trim();
  if(h.length === 3){
    const r = parseInt(h[0]+h[0], 16);
    const g = parseInt(h[1]+h[1], 16);
    const b = parseInt(h[2]+h[2], 16);
    return {r,g,b};
  }
  const r = parseInt(h.slice(0,2), 16);
  const g = parseInt(h.slice(2,4), 16);
  const b = parseInt(h.slice(4,6), 16);
  return {r,g,b};
}

function rgbToHex({r,g,b}){
  const to = (n) => n.toString(16).padStart(2,'0');
  return `#${to(clamp(Math.round(r),0,255))}${to(clamp(Math.round(g),0,255))}${to(clamp(Math.round(b),0,255))}`;
}

function mix(a, b, t){
  // linear mix in sRGB (good enough for this exhibit)
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  };
}

function relLuminance({r,g,b}){
  // WCAG relative luminance
  const srgb = [r,g,b].map(v => v/255).map(c => (c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4)));
  return 0.2126*srgb[0] + 0.7152*srgb[1] + 0.0722*srgb[2];
}

function contrastRatio(hex1, hex2){
  const L1 = relLuminance(hexToRgb(hex1));
  const L2 = relLuminance(hexToRgb(hex2));
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ---------- Exhibit 4a: palette builder ----------
function initPalette(){
  const ctlBrand = $('#ctlBrand');
  const ctlPaletteSteps = $('#ctlPaletteSteps');
  const ctlPaletteMode = $('#ctlPaletteMode');

  const valBrand = $('#valBrand');
  const valPaletteSteps = $('#valPaletteSteps');
  const palette = $('#palette');

  if(!ctlBrand || !palette) return;

  function apply(){
    const brand = ctlBrand.value;
    const steps = Number(ctlPaletteSteps.value);
    const mode = ctlPaletteMode.value;

    valBrand.textContent = brand;
    valPaletteSteps.textContent = `${steps}`;

    const brandRgb = hexToRgb(brand);
    const white = {r:255,g:255,b:255};
    const black = {r:0,g:0,b:0};

    let colors = [];
    if(mode === 'tints'){
      for(let i=0;i<steps;i++){
        const t = i/(steps-1);
        colors.push(rgbToHex(mix(brandRgb, white, t)));
      }
    } else if(mode === 'shades'){
      for(let i=0;i<steps;i++){
        const t = i/(steps-1);
        colors.push(rgbToHex(mix(brandRgb, black, t)));
      }
    } else {
      const half = Math.floor(steps/2);
      const left = [];
      for(let i=half;i>=1;i--){
        const t = i/half;
        left.push(rgbToHex(mix(brandRgb, white, t)));
      }
      const right = [];
      for(let i=1;i<=half;i++){
        const t = i/half;
        right.push(rgbToHex(mix(brandRgb, black, t)));
      }
      colors = [...left, brand, ...right];
      // If steps is even, trim to requested length
      colors = colors.slice(0, steps);
    }

    // Ensure grid looks nice: set columns via CSS variable-ish by inline style
    palette.style.gridTemplateColumns = `repeat(${Math.min(colors.length, 9)}, 1fr)`;

    palette.innerHTML = colors.map((hex, idx) => {
      const text = contrastRatio(hex, '#ffffff') >= 4.5 ? '#ffffff' : '#0b1020';
      const label = (mode === 'both') ? `${idx+1}` : `${idx+1}`;
      return `
        <button class="swatch" type="button" data-hex="${hex}" title="Copy ${hex}" style="background:${hex}; color:${text}">
          <div class="top" aria-hidden="true"></div>
          <div class="meta"><span>${label}</span><span>${hex}</span></div>
        </button>
      `;
    }).join('');

    palette.querySelectorAll('.swatch').forEach(btn => {
      btn.addEventListener('click', async () => {
        const hex = btn.getAttribute('data-hex');
        try{
          await navigator.clipboard.writeText(hex);
          btn.querySelector('.meta').innerHTML = `<span>Copied</span><span>${hex}</span>`;
          setTimeout(() => {
            btn.querySelector('.meta').innerHTML = `<span>Copy</span><span>${hex}</span>`;
          }, 900);
        } catch {
          // Clipboard may be unavailable; fall back to prompt
          window.prompt('Copy color:', hex);
        }
      });
    });
  }

  [ctlBrand, ctlPaletteSteps, ctlPaletteMode].forEach(el => el.addEventListener('input', apply));
  apply();
}

// ---------- Exhibit 4b: contrast checker ----------
function initContrast(){
  const ctlText = $('#ctlText');
  const ctlBg = $('#ctlBg');
  const ctlWeight = $('#ctlWeight');
  const ctlSize = $('#ctlSize');

  const valText = $('#valText');
  const valBg = $('#valBg');

  const sample = $('#contrastSample');
  const ratioEl = $('#contrastRatio');
  const aaEl = $('#contrastAA');
  const aaaEl = $('#contrastAAA');
  const hintEl = $('#contrastHint');

  if(!ctlText || !sample) return;

  function badge(pass){
    return `<span class="badge ${pass ? 'pass' : 'fail'}">${pass ? 'PASS' : 'FAIL'}</span>`;
  }

  function apply(){
    const text = ctlText.value;
    const bg = ctlBg.value;
    const weight = ctlWeight.value;
    const size = ctlSize.value;

    valText.textContent = text;
    valBg.textContent = bg;

    sample.style.color = text;
    sample.style.background = bg;

    const ratio = contrastRatio(text, bg);
    ratioEl.textContent = `${ratio.toFixed(2)}:1`;

    // WCAG thresholds
    const isLarge = size === 'large' || (weight === 'bold' && size === 'small');
    const aa = isLarge ? 3.0 : 4.5;
    const aaa = isLarge ? 4.5 : 7.0;

    const passAA = ratio >= aa;
    const passAAA = ratio >= aaa;

    aaEl.innerHTML = `${badge(passAA)} <span class="muted">(needs ≥ ${aa}:1)</span>`;
    aaaEl.innerHTML = `${badge(passAAA)} <span class="muted">(needs ≥ ${aaa}:1)</span>`;

    if(passAAA){
      hintEl.textContent = 'Great: this pairing is strong even for smaller text.';
    } else if(passAA){
      hintEl.textContent = 'Good for most text. For tiny labels, consider increasing contrast further.';
    } else {
      hintEl.textContent = 'Try darkening text or lightening the background until AA passes.';
    }
  }

  [ctlText, ctlBg, ctlWeight, ctlSize].forEach(el => el.addEventListener('input', apply));
  apply();
}

// ---------- Exhibit 5: microcopy improver ----------
function initMicrocopy(){
  const input = $('#microInput');
  const analyze = $('#microAnalyze');
  const reset = $('#microReset');
  const out = $('#microOut');

  if(!input || !analyze || !out) return;

  const starter = input.value;

  function suggest(text){
    const t = (text || '').trim();
    const suggestions = [];

    const lower = t.toLowerCase();

    if(t.length < 18) suggestions.push('Add context: what exactly happened?');
    if(/error|failed|problem|issue|wrong/.test(lower) && !/because|due to|try|check|please/.test(lower)){
      suggestions.push('Add a next step (retry, check input, contact support).');
    }
    if(/cannot|can\'t|unable/.test(lower) && !/right now|at the moment|currently/.test(lower)){
      suggestions.push('If it’s temporary, say so (e.g., “right now”).');
    }
    if(/success/.test(lower) && !/what\s+next|you\s+can|now/.test(lower)){
      suggestions.push('For success messages, tell users what they can do next.');
    }
    if(/\b(id|code|exception|stack)\b/.test(lower)){
      suggestions.push('Avoid internal jargon; keep technical details behind a “Details” link.');
    }
    if(!/[.!?]$/.test(t)) suggestions.push('End with punctuation for readability.');

    // Provide a rewritten example using a simple template
    let rewrite = t;
    if(/save/.test(lower) && /not/.test(lower)){
      rewrite = 'We couldn’t save your changes. Please check your connection and try again.';
    } else if(/error/.test(lower) || /failed/.test(lower)){
      rewrite = 'That didn’t work. Please try again—if the problem continues, contact support.';
    } else if(t.length < 18){
      rewrite = `${t}${t ? ' ' : ''}Please try again.`.trim();
    }

    return { suggestions, rewrite };
  }

  function render(){
    const {suggestions, rewrite} = suggest(input.value);
    const list = suggestions.length
      ? `<ul>${suggestions.map(s => `<li>${s}</li>`).join('')}</ul>`
      : `<div class="muted">Looks good: clear and actionable.</div>`;

    out.innerHTML = `
      <div><strong>Suggested rewrite</strong></div>
      <div class="callout" style="margin-top:8px">${escapeHtml(rewrite)}</div>
      <div style="margin-top:10px"><strong>Notes</strong></div>
      ${list}
    `;
  }

  analyze.addEventListener('click', render);
  reset.addEventListener('click', () => {
    input.value = starter;
    out.innerHTML = '';
  });
}

function escapeHtml(str){
  return String(str)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#039;');
}

// ---------- Boot ----------
initPrinciples();
initTypography();
initSpacing();
initPalette();
initContrast();
initMicrocopy();
