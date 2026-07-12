// 只读渲染层:读 /data/wiki-map.json + /data/wiki-prose.json,渲成 DeepWiki 式页面。不改数据管线。
(() => {
  const $ = (id) => document.getElementById(id);
  const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9一-龥]+/g, '-').replace(/^-|-$/g, '') || 'sec';

  const I18N = {
    en: { filter: 'Search…', toggle: '中文', select: 'Select a page from the left.', srcfiles: 'Relevant source files', onpage: 'On this page', empty: '(no prose yet)' },
    zh: { filter: '搜索…', toggle: 'EN', select: '从左侧选择一页。', srcfiles: '相关源文件', onpage: '本页目录', empty: '(暂无正文)' },
  };
  let lang = localStorage.getItem('wiki-lang') || 'en';
  const t = (k) => I18N[lang][k];
  let wikiMap = null, wikiProse = null, current = null;

  // 4 System Architecture pages get the rich meta-chapter (summary + narrative). Map id → file.
  const META_FILE = {
    'monorepo-structure': 'monorepo',
    'core-application': 'core-application',
    'microservices-architecture': 'microservices',
    'data-flow': 'data-flow',
  };
  let metaById = {};

  function diagramToMermaid(d) {
    const nodes = d.nodes || {}, lines = ['flowchart TD'], seen = new Set();
    const emit = (id) => { if (seen.has(id)) return; seen.add(id); lines.push(`  ${id}["${String(nodes[id] ?? id).replace(/"/g, "'")}"]`); };
    for (const id of Object.keys(nodes)) emit(id);
    for (const e of (d.edges || [])) { if (!e || e.length < 2) continue; emit(e[0]); emit(e[1]); lines.push(e[2] ? `  ${e[0]} -->|${String(e[2]).replace(/[|"]/g, '/')}| ${e[1]}` : `  ${e[0]} --> ${e[1]}`); }
    return lines.join('\n');
  }
  async function renderDiagrams(container, diagrams) {
    let i = 0;
    for (const d of (diagrams || [])) {
      if (!d || (!Object.keys(d.nodes || {}).length && !(d.edges || []).length)) continue;
      const wrap = document.createElement('div'); wrap.className = 'diagram-block';
      const cap = document.createElement('div'); cap.className = 'dia-cap'; cap.textContent = `Diagram ${++i}`;
      const host = document.createElement('div'); wrap.appendChild(cap); wrap.appendChild(host); container.appendChild(wrap);
      try { const { svg } = await window.mermaid.render(`m-${Date.now()}-${i}`, diagramToMermaid(d)); host.innerHTML = svg; }
      catch { host.innerHTML = `<pre>${escapeHtml(diagramToMermaid(d))}</pre>`; }
    }
  }

  // 引用药丸 [icon] path [17-23]
  const citeChip = (ref) => {
    const m = ref.match(/^(.+?):L?(\d+)(?:-L?(\d+))?$/);
    if (!m) return `<span class="cite"><span class="path">${escapeHtml(ref)}</span></span>`;
    const ln = m[3] ? `${m[2]}-${m[3]}` : m[2];
    return `<span class="cite"><span class="gh">◆</span><span class="path">${escapeHtml(m[1])}</span><span class="ln">${ln}</span></span>`;
  };
  function renderText(text) {
    const out = []; let buf = [];
    const flush = () => { if (buf.length) { out.push(window.marked ? window.marked.parse(buf.join('\n')) : `<p>${escapeHtml(buf.join('\n'))}</p>`); buf = []; } };
    for (const line of String(text).split('\n')) {
      if (/^\s*Sources:/i.test(line)) {
        flush();
        const refs = line.replace(/^\s*Sources:\s*/i, '').split(/[,;]/).map(s => s.trim()).filter(Boolean);
        out.push(`<div class="sources-line"><span class="lbl">Sources</span>${refs.map(citeChip).join(' ')}</div>`);
      } else buf.push(line);
    }
    flush();
    return out.join('\n');
  }

  // Prose-first render for the 4 System Architecture meta chapters:
  // scope → Purpose and Scope (summary) → source files → [h2 + narrative + table] → diagrams last.
  function renderMetaChapter(mp, prose, anchorLabel) {
    current = mp.page;
    document.querySelectorAll('#nav-list li').forEach((li) => li.classList.toggle('active', li.dataset.page === mp.page));
    const c = $('content-inner'); c.innerHTML = '';

    const h = document.createElement('h1'); h.className = 'chapter-title'; h.textContent = mp.title || mp.page; c.appendChild(h);
    if (mp.scope) { const sub = document.createElement('div'); sub.className = 'chapter-sub'; sub.textContent = mp.scope; c.appendChild(sub); }

    if (mp.summary) {
      const hh = document.createElement('h2'); hh.textContent = 'Purpose and Scope'; c.appendChild(hh);
      const div = document.createElement('div'); div.className = 'page-summary'; div.innerHTML = renderText(mp.summary); c.appendChild(div);
    }

    const srcFiles = Object.keys(mp.source_files || {});
    if (srcFiles.length) {
      const box = document.createElement('details'); box.className = 'srcbox';
      const sum = document.createElement('summary'); sum.textContent = `${t('srcfiles')}`;
      const files = document.createElement('div'); files.className = 'files';
      files.innerHTML = srcFiles.slice(0, 80).map((f) => `<span class="f">${escapeHtml(f)}</span>`).join('');
      box.appendChild(sum); box.appendChild(files); c.appendChild(box);
    }

    for (const sec of (prose || [])) {
      if (sec.section && sec.section !== '(intro)' && sec.section !== 'Overview') {
        const hh = document.createElement('h2'); hh.textContent = sec.section; c.appendChild(hh);
      }
      if (sec.narrative) { const nd = document.createElement('div'); nd.className = 'section-narrative'; nd.innerHTML = renderText(sec.narrative); c.appendChild(nd); }
      const div = document.createElement('div'); div.innerHTML = renderText(sec.text || ''); c.appendChild(div);
    }

    renderDiagrams(c, mp.diagrams);   // visual evidence, after the prose

    const toc = [];
    c.querySelectorAll('h2, h3').forEach((el) => { const id = slug(el.textContent) + '-' + toc.length; el.id = id; toc.push({ id, label: el.textContent, lvl: el.tagName }); });
    buildToc(toc, mp.title || mp.page);
    if (anchorLabel) { requestAnimationFrame(() => scrollToHeading(anchorLabel)); } else { $('content').scrollTop = 0; }
    location.hash = encodeURIComponent(mp.id || mp.page);
  }

  function renderChapter(page, anchorLabel) {
    const meta = metaById[page.id];
    if (meta) return renderMetaChapter(meta.page, meta.prose, anchorLabel);
    current = page.page;
    document.querySelectorAll('#nav-list li').forEach((li) => li.classList.toggle('active', li.dataset.page === page.page));
    const c = $('content-inner'); c.innerHTML = '';
    const h = document.createElement('h1'); h.className = 'chapter-title'; h.textContent = page.title || page.page; c.appendChild(h);
    if (page.scope) { const sub = document.createElement('div'); sub.className = 'chapter-sub'; sub.textContent = page.scope; c.appendChild(sub); }

    const srcFiles = Object.keys(page.source_files || {});
    if (srcFiles.length) {
      const box = document.createElement('details'); box.className = 'srcbox';   // 默认折叠(对齐 DeepWiki)
      const sum = document.createElement('summary'); sum.textContent = `${t('srcfiles')}`;
      const files = document.createElement('div'); files.className = 'files';
      files.innerHTML = srcFiles.slice(0, 80).map((f) => `<span class="f">${escapeHtml(f)}</span>`).join('');
      box.appendChild(sum); box.appendChild(files); c.appendChild(box);
    }
    renderDiagrams(c, page.diagrams);

    const sections = (wikiProse && wikiProse[page.page]) || [];
    if (!sections.length) { const p = document.createElement('p'); p.style.color = '#8a8a86'; p.textContent = t('empty'); c.appendChild(p); }
    for (const sec of sections) {
      if (sec.section && sec.section !== '(intro)' && sec.section !== 'Overview') {
        const hh = document.createElement('h2'); hh.textContent = sec.section; c.appendChild(hh);
      }
      const div = document.createElement('div'); div.innerHTML = renderText(sec.text || ''); c.appendChild(div);
    }
    // TOC = 扫渲染后的 h2/h3
    const toc = [];
    c.querySelectorAll('h2, h3').forEach((el) => { const id = slug(el.textContent) + '-' + toc.length; el.id = id; toc.push({ id, label: el.textContent, lvl: el.tagName }); });
    buildToc(toc, page.title || page.page);
    if (anchorLabel) { requestAnimationFrame(() => scrollToHeading(anchorLabel)); } else { $('content').scrollTop = 0; }
    location.hash = encodeURIComponent(page.id || page.page);
  }

  function buildToc(items, pageTitle) {
    const list = $('toc-list'); list.innerHTML = ''; $('toc-title').textContent = t('onpage');
    if (pageTitle) {                                     // 顶部页标题(粗,点击回顶) —— 对齐 DeepWiki
      const li = document.createElement('li'); li.className = 'page-title'; li.textContent = pageTitle;
      li.onclick = () => $('content').scrollTo({ top: 0, behavior: 'smooth' });
      list.appendChild(li);
    }
    for (const it of items) {
      const li = document.createElement('li'); li.textContent = it.label; li.dataset.target = it.id; if (it.lvl === 'H3') li.className = 'h3';
      li.onclick = () => document.getElementById(it.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      list.appendChild(li);
    }
    $('toc').style.visibility = 'visible';
    setupScrollSpy();
  }

  // 右侧 On this page 随滚动高亮当前小节(scrollspy) —— 对齐 DeepWiki
  let spyObserver = null;
  function setupScrollSpy() {
    if (spyObserver) spyObserver.disconnect();
    const heads = [...$('content-inner').querySelectorAll('h2, h3')];
    const lis = [...$('toc-list').querySelectorAll('li[data-target]')];
    if (!heads.length || !lis.length) return;
    const visible = new Set();
    spyObserver = new IntersectionObserver((entries) => {
      for (const e of entries) { if (e.isIntersecting) visible.add(e.target.id); else visible.delete(e.target.id); }
      let current = null;
      for (const h of heads) if (visible.has(h.id)) { current = h.id; break; }
      if (!current) { for (const h of heads) { if (h.getBoundingClientRect().top < 120) current = h.id; else break; } }
      for (const li of lis) li.classList.toggle('active', li.dataset.target === current);
    }, { root: $('content'), rootMargin: '-74px 0px -68% 0px', threshold: 0 });
    heads.forEach(h => spyObserver.observe(h));
  }

  const META_GROUPS = new Set(['System Architecture']);   // 渲成分组标题 + 缩进页
  function navPageItem(p, cls) {
    const li = document.createElement('li'); li.className = cls; li.dataset.page = p.page;
    li.textContent = p.title || p.page; li.onclick = () => renderChapter(p);
    $('nav-list').appendChild(li);
  }
  function navAnchors(p) {                                // 子系统 → 缩进锚点(点击滚到该 h2)
    for (const label of (p.navSections || [])) {
      const li = document.createElement('li'); li.className = 'subanchor'; li.textContent = label;
      li.onclick = () => { if (current !== p.page) { renderChapter(p, label); } else scrollToHeading(label); };
      $('nav-list').appendChild(li);
    }
  }
  function buildNav() {
    const list = $('nav-list'); list.innerHTML = '';
    const pages = wikiMap.pages || [];
    // 保序按 category 分连续段(pages 已按 taxonomy 排)
    const groups = [];
    for (const p of pages) { const cat = p.category || 'Pages'; const last = groups[groups.length - 1]; if (last && last.cat === cat) last.pages.push(p); else groups.push({ cat, pages: [p] }); }
    for (const { cat, pages: ps } of groups) {
      if (META_GROUPS.has(cat)) {                         // System Architecture:分组标题 + 缩进页
        const head = document.createElement('li'); head.className = 'top'; head.textContent = cat; list.appendChild(head);
        for (const p of ps) { navPageItem(p, 'page'); }
      } else if (cat === 'Overview') {                    // Overview:顶层可点
        for (const p of ps) navPageItem(p, 'top clickable');
      } else {                                            // 领域:顶层加粗可点 + 子系统锚点
        for (const p of ps) { navPageItem(p, 'top clickable domain'); navAnchors(p); }
      }
    }
  }
  function scrollToHeading(label) {
    const els = $('content-inner').querySelectorAll('h2');
    for (const el of els) if (el.textContent === label) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
  }

  function applyLang() {
    $('search').placeholder = t('filter'); $('lang-toggle').textContent = t('toggle'); $('toc-title').textContent = t('onpage');
    if (!current && $('placeholder')) $('placeholder').textContent = t('select');
    document.documentElement.lang = lang === 'zh' ? 'zh' : 'en';
  }
  function applyTheme() {
    const dark = localStorage.getItem('wiki-theme') === 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    if ($('theme-toggle')) $('theme-toggle').textContent = dark ? '☀️' : '🌙';
  }
  function wireUI() {
    $('lang-toggle').onclick = () => { lang = lang === 'en' ? 'zh' : 'en'; localStorage.setItem('wiki-lang', lang); applyLang(); };
    if ($('theme-toggle')) $('theme-toggle').onclick = () => { localStorage.setItem('wiki-theme', localStorage.getItem('wiki-theme') === 'dark' ? 'light' : 'dark'); applyTheme(); };
    $('search').oninput = (e) => { const q = e.target.value.trim().toLowerCase(); document.querySelectorAll('#nav-list li.page, #nav-list li.top.clickable, #nav-list li.subanchor').forEach((li) => li.classList.toggle('hidden', q && !li.textContent.toLowerCase().includes(q))); };
  }

  async function main() {
    wireUI(); applyLang(); applyTheme();
    try {
      const [m, p] = await Promise.all([
        fetch('/data/wiki-map.json').then((r) => r.json()),
        fetch('/data/wiki-prose.json').then((r) => r.json()).catch(() => ({})),
      ]);
      wikiMap = m; wikiProse = p;
      // Load the 4 System Architecture meta chapters (prose-first content). Missing → falls through.
      const metaEntries = await Promise.all(Object.entries(META_FILE).map(([id, f]) =>
        fetch(`/data/wiki-meta/${f}.json`).then((r) => (r.ok ? r.json() : null)).catch(() => null).then((ch) => [id, ch])));
      metaById = Object.fromEntries(metaEntries.filter(([, ch]) => ch && ch.page));
    } catch (e) { $('content-inner').innerHTML = `<div class="placeholder">无法加载数据:${escapeHtml(e.message)}<br>用 <code>npm run wiki:serve</code> 启动。</div>`; return; }
    $('repo-name').textContent = wikiMap.repo || 'Code Wiki';
    $('side-head').textContent = wikiMap.derived_from || wikiMap.generated_at || '';
    buildNav();
    const wanted = decodeURIComponent((location.hash || '').replace(/^#/, ''));
    const pages = wikiMap.pages || [];
    const target = pages.find((p) => (p.id || p.page) === wanted) || pages[0];
    if (target) renderChapter(target); else $('content-inner').innerHTML = `<div class="placeholder">${escapeHtml(t('empty'))}</div>`;
  }
  main();
})();
