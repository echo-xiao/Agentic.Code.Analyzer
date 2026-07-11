// 只读渲染层:读 /data/wiki-map.json + /data/wiki-prose.json,渲成 DeepWiki 式页面。
// 不改任何数据管线;链跑完产出自生成版后(同 schema),刷新即显示新内容。
(() => {
  const $ = (id) => document.getElementById(id);
  const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ── UI 双语(仅站点 chrome;正文保持生成的英文)──
  const I18N = {
    en: { chapters: 'Chapters', filter: 'filter chapters…', toggle: '中文', select: 'Select a chapter from the left.', modules: 'Modules', empty: '(no prose yet — run wiki:gen)' },
    zh: { chapters: '章节', filter: '筛选章节…', toggle: 'EN', select: '从左侧选择一个章节。', modules: '模块', empty: '(还没有正文 — 先跑 wiki:gen)' },
  };
  let lang = localStorage.getItem('wiki-lang') || 'en';
  const t = (k) => I18N[lang][k];

  let wikiMap = null, wikiProse = null, current = null;

  // ── {nodes,edges,subgraphs} → mermaid flowchart 文本(数据里存的是解析后结构,还原成图)──
  function diagramToMermaid(d) {
    const nodes = d.nodes || {};
    const lines = ['flowchart TD'];
    const seen = new Set();
    const emit = (id) => { if (seen.has(id)) return; seen.add(id); lines.push(`  ${id}["${String(nodes[id] ?? id).replace(/"/g, "'")}"]`); };
    for (const id of Object.keys(nodes)) emit(id);
    for (const e of (d.edges || [])) {
      if (!e || e.length < 2) continue;
      emit(e[0]); emit(e[1]);
      lines.push(e[2] ? `  ${e[0]} -->|${String(e[2]).replace(/[|"]/g, '/')}| ${e[1]}` : `  ${e[0]} --> ${e[1]}`);
    }
    return lines.join('\n');
  }

  async function renderDiagrams(container, diagrams) {
    let i = 0;
    for (const d of (diagrams || [])) {
      if (!d || (!Object.keys(d.nodes || {}).length && !(d.edges || []).length)) continue;
      const wrap = document.createElement('div');
      wrap.className = 'diagram-block';
      const cap = document.createElement('div'); cap.className = 'dia-cap'; cap.textContent = `diagram ${++i}`;
      wrap.appendChild(cap);
      const host = document.createElement('div');
      wrap.appendChild(host);
      container.appendChild(wrap);
      try {
        const { svg } = await window.mermaid.render(`m-${Date.now()}-${i}`, diagramToMermaid(d));
        host.innerHTML = svg;
      } catch (e) { host.innerHTML = `<pre>${escapeHtml(diagramToMermaid(d))}</pre>`; }
    }
  }

  // Sources: 行单独样式;其余走 marked
  function renderText(text) {
    const out = []; let buf = [];
    const flush = () => { if (buf.length) { out.push(window.marked.parse(buf.join('\n'))); buf = []; } };
    for (const line of String(text).split('\n')) {
      if (/^\s*Sources:/i.test(line)) { flush(); out.push(`<span class="sources-line">${escapeHtml(line.trim())}</span>`); }
      else buf.push(line);
    }
    flush();
    return out.join('\n');
  }

  function renderChapter(page) {
    current = page.page;
    document.querySelectorAll('#nav-list li.page').forEach((li) => li.classList.toggle('active', li.dataset.page === page.page));
    const c = $('content'); c.innerHTML = '';
    const h = document.createElement('h1'); h.className = 'chapter-title'; h.textContent = page.title || page.page; c.appendChild(h);
    if (page.scope || (page.modules && page.modules.length)) {
      const meta = document.createElement('div'); meta.className = 'chapter-meta';
      const bits = [];
      if (page.scope) bits.push(escapeHtml(page.scope));
      if (page.modules && page.modules.length) bits.push(`${t('modules')}: ` + page.modules.slice(0, 8).map((m) => `<code>${escapeHtml(m)}</code>`).join(' '));
      meta.innerHTML = bits.join(' · '); c.appendChild(meta);
    }
    renderDiagrams(c, page.diagrams);
    const sections = (wikiProse && wikiProse[page.page]) || [];
    if (!sections.length) { const p = document.createElement('p'); p.style.color = '#6b7280'; p.textContent = t('empty'); c.appendChild(p); }
    for (const sec of sections) {
      if (sec.section && sec.section !== '(intro)' && sec.section !== 'Overview') {
        const hh = document.createElement('h2'); hh.textContent = sec.section; c.appendChild(hh);
      }
      const div = document.createElement('div'); div.innerHTML = renderText(sec.text || ''); c.appendChild(div);
    }
    c.scrollTop = 0;
    location.hash = encodeURIComponent(page.id || page.page);
  }

  function buildNav() {
    const list = $('nav-list'); list.innerHTML = '';
    const pages = wikiMap.pages || [];
    // 按 category 分组(有就分,没有就平铺)
    const groups = new Map();
    for (const p of pages) { const cat = p.category || ''; if (!groups.has(cat)) groups.set(cat, []); groups.get(cat).push(p); }
    for (const [cat, ps] of groups) {
      if (cat) { const c = document.createElement('li'); c.className = 'cat'; c.textContent = cat; list.appendChild(c); }
      for (const p of ps) {
        const li = document.createElement('li'); li.className = 'page'; li.dataset.page = p.page;
        li.textContent = p.title || p.page;
        li.onclick = () => renderChapter(p);
        list.appendChild(li);
      }
    }
  }

  function applyLang() {
    $('side-title').textContent = t('chapters');
    $('search').placeholder = t('filter');
    $('lang-toggle').textContent = t('toggle');
    if (!current) $('placeholder') && ($('placeholder').textContent = t('select'));
    document.documentElement.lang = lang === 'zh' ? 'zh' : 'en';
  }

  function wireUI() {
    $('lang-toggle').onclick = () => { lang = lang === 'en' ? 'zh' : 'en'; localStorage.setItem('wiki-lang', lang); applyLang(); };
    $('search').oninput = (e) => {
      const q = e.target.value.trim().toLowerCase();
      document.querySelectorAll('#nav-list li.page').forEach((li) => li.classList.toggle('hidden', q && !li.textContent.toLowerCase().includes(q)));
    };
  }

  async function main() {
    wireUI(); applyLang();
    try {
      const [m, p] = await Promise.all([
        fetch('/data/wiki-map.json').then((r) => r.json()),
        fetch('/data/wiki-prose.json').then((r) => r.json()).catch(() => ({})),
      ]);
      wikiMap = m; wikiProse = p;
    } catch (e) {
      $('content').innerHTML = `<div class="placeholder">无法加载 /data/wiki-map.json —— 确认用 <code>npm run wiki:serve</code> 启动(不是直接双击 html)。<br>${escapeHtml(e.message)}</div>`;
      return;
    }
    $('repo-name').textContent = wikiMap.repo || 'Code Wiki';
    $('derived').textContent = wikiMap.derived_from || '';
    buildNav();
    // 深链或默认首章
    const wanted = decodeURIComponent((location.hash || '').replace(/^#/, ''));
    const pages = wikiMap.pages || [];
    const target = pages.find((p) => (p.id || p.page) === wanted) || pages[0];
    if (target) renderChapter(target); else $('content').innerHTML = `<div class="placeholder">${escapeHtml(t('empty'))}</div>`;
  }

  main();
})();
