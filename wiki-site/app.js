// 只读渲染层:读 /data/wiki-map.json + /data/wiki-prose.json,渲成文档式页面。不改数据管线。
// B 结构(读者问题驱动):左栏 = wikiMap.nav 轴带编号树(section→subsection→page,N/N.M/N.M.K),
// 每页独立路由。点叶子只渲该页,右侧 On this page = 该页各节(h2/h3)。旧数据无 nav 时回退 category 分组。
(() => {
  const $ = (id) => document.getElementById(id);
  const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9一-龥]+/g, '-').replace(/^-|-$/g, '') || 'sec';

  const I18N = {
    en: { filter: 'Search…', toggle: '中文', select: 'Select a page from the left.', srcfiles: 'Relevant source files', onpage: 'On this page', empty: '(no prose yet)', files: 'source files' },
    zh: { filter: '搜索…', toggle: 'EN', select: '从左侧选择一页。', srcfiles: '相关源文件', onpage: '本页目录', empty: '(暂无正文)', files: '相关文件' },
  };
  let lang = localStorage.getItem('wiki-lang') || 'en';
  const t = (k) => I18N[lang][k];

  let wikiMap = null, wikiProse = null;
  let pageById = new Map();      // id → WikiPage
  let numbers = new Map();       // nav 节点 id → "N"/"N.M"/"N.M.K"
  let currentId = null;          // 当前页 id
  const collapsed = new Set();   // 折叠的 section id

  // ── nav 编号(与 src/wiki/nav.ts 同逻辑)──────────────────────────────────────
  const BAND = ['overview', 'architecture', 'feature', 'operations', 'reference'];
  const bandRank = (n) => { const i = n.axis ? BAND.indexOf(n.axis) : -1; return i < 0 ? BAND.length : i; };
  const bandSort = (nodes) => nodes.map((n, i) => ({ n, i })).sort((a, b) => bandRank(a.n) - bandRank(b.n) || a.i - b.i).map((x) => x.n);
  function assignNumbers(nav) {
    const out = new Map();
    const walk = (nodes, prefix) => {
      (prefix === '' ? bandSort(nodes) : nodes).forEach((node, idx) => {
        const num = prefix === '' ? `${idx + 1}` : `${prefix}.${idx + 1}`;
        out.set(node.id, num);
        if (node.children && node.children.length) walk(node.children, num);
      });
    };
    walk(nav, '');
    return out;
  }
  // 回退:无 nav 时按 category 分组(== 旧行为)
  function navFromCategories() {
    const order = [], byCat = new Map();
    for (const p of (wikiMap.pages || [])) {
      const cat = p.category || 'Pages';
      if (!byCat.has(cat)) { byCat.set(cat, []); order.push(cat); }
      byCat.get(cat).push({ kind: 'page', id: p.id, title: p.title });
    }
    return order.map((cat) => ({ kind: 'section', id: 'cat-' + slug(cat), title: cat, children: byCat.get(cat) }));
  }
  const getNav = () => (wikiMap.nav && wikiMap.nav.length) ? wikiMap.nav : navFromCategories();

  // ── 图 / 引用 / 文本(沿用)──────────────────────────────────────────────────
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
  const citeChip = (ref) => {
    const m = ref.match(/^(.+?):L?(\d+)(?:-L?(\d+))?$/);
    if (!m) return `<span class="cite"><span class="path">${escapeHtml(ref)}</span></span>`;
    const ln = m[3] ? `${m[2]}-${m[3]}` : m[2];
    const inner = `<span class="gh">◆</span><span class="path">${escapeHtml(m[1])}</span><span class="ln">${ln}</span>`;
    if (wikiMap && wikiMap.repo_url && wikiMap.repo_sha) {
      const anchor = m[3] ? `#L${m[2]}-L${m[3]}` : `#L${m[2]}`;
      const href = `${wikiMap.repo_url}/blob/${wikiMap.repo_sha}/${m[1]}${anchor}`;
      return `<a class="cite" href="${escapeHtml(href)}" target="_blank" rel="noopener" title="${escapeHtml(m[1])}${anchor}">${inner}</a>`;
    }
    return `<span class="cite">${inner}</span>`;
  };
  function renderText(text) {
    const out = []; let buf = [];
    const flush = () => { if (buf.length) { out.push(window.marked ? window.marked.parse(buf.join('\n')) : `<p>${escapeHtml(buf.join('\n'))}</p>`); buf = []; } };
    for (const line of String(text).split('\n')) {
      if (/^\s*Sources:/i.test(line)) {
        flush();
        const refs = line.replace(/^\s*Sources:\s*/i, '').split(/[,;]/).map((s) => s.trim()).filter(Boolean);
        out.push(`<div class="sources-line"><span class="lbl">Sources</span>${refs.map(citeChip).join(' ')}</div>`);
      } else buf.push(line);
    }
    flush();
    return out.join('\n');
  }

  // ── 索引 ─────────────────────────────────────────────────────────────────────
  function buildIndex() {
    pageById = new Map();
    for (const p of (wikiMap.pages || [])) pageById.set(p.id, p);
    numbers = assignNumbers(getNav());
  }
  function firstPageId() {
    let found = null;
    const walk = (nodes) => { for (const n of bandSort(nodes)) { if (found) return; if (n.kind === 'page') { found = n.id; return; } if (n.children) walk(n.children); } };
    walk(getNav());
    return found;
  }
  // 展开某页的所有祖先 section
  function expandAncestors(id) {
    const path = [];
    const dfs = (nodes, trail) => {
      for (const n of nodes) {
        if (n.kind === 'page') { if (n.id === id) { path.push(...trail); return true; } }
        else if (n.children && dfs(n.children, [...trail, n.id])) return true;
      }
      return false;
    };
    dfs(getNav(), []);
    for (const sid of path) collapsed.delete(sid);
  }

  // ── 左栏:轴带编号树(flat <li> + padding 缩进)────────────────────────────────
  function buildNav() {
    const list = $('nav-list'); list.innerHTML = '';
    const render = (nodes, depth) => {
      for (const node of (depth === 0 ? bandSort(nodes) : nodes)) {
        const li = document.createElement('li');
        const num = numbers.get(node.id) || '';
        li.style.paddingLeft = (10 + depth * 14) + 'px';
        if (node.kind === 'page') {
          li.className = 'page' + (node.id === currentId ? ' active' : '');
          li.innerHTML = `<span class="cx"></span><span class="num">${num}</span>${escapeHtml(node.title)}`;
          li.onclick = () => navigate(node.id);
          list.appendChild(li);
        } else {
          const hasKids = node.children && node.children.length;
          const isColl = collapsed.has(node.id);
          li.className = 'top clickable';
          li.innerHTML = `<span class="cx">${hasKids ? (isColl ? '▸' : '▾') : ''}</span><span class="num">${num}</span>${escapeHtml(node.title)}`;
          li.onclick = () => { if (collapsed.has(node.id)) collapsed.delete(node.id); else collapsed.add(node.id); buildNav(); };
          list.appendChild(li);
          if (hasKids && !isColl) render(node.children, depth + 1);
        }
      }
    };
    render(getNav(), 0);
    applyFilter();
  }

  // ── 渲单页 ───────────────────────────────────────────────────────────────────
  function renderPage(p) {
    const c = $('content-inner'); c.innerHTML = '';
    const h = document.createElement('h1'); h.className = 'chapter-title'; h.textContent = p.title; c.appendChild(h);
    const nFiles = Object.keys(p.source_files || {}).length;
    const sub = document.createElement('div'); sub.className = 'chapter-sub';
    sub.textContent = `${numbers.get(p.id) || ''} · ${p.category} · ${nFiles} ${t('files')}`; c.appendChild(sub);

    const srcFiles = Object.keys(p.source_files || {});
    if (srcFiles.length) {
      const box = document.createElement('details'); box.className = 'srcbox';
      const s = document.createElement('summary'); s.textContent = t('srcfiles');
      const files = document.createElement('div'); files.className = 'files';
      files.innerHTML = srcFiles.slice(0, 60).map((f) => `<span class="f">${escapeHtml(f)}</span>`).join('');
      box.appendChild(s); box.appendChild(files); c.appendChild(box);
    }

    const sections = (wikiProse && wikiProse[p.page]) || [];
    if (!sections.length) { const d = document.createElement('div'); d.className = 'placeholder'; d.textContent = t('empty'); c.appendChild(d); }
    for (const sec of sections) {
      const name = sec.section;
      if (name && name !== '(intro)' && name !== 'Overview' && name !== p.title) {
        const h2 = document.createElement('h2'); h2.textContent = name; c.appendChild(h2);
      }
      if (sec.narrative) { const nd = document.createElement('div'); nd.className = 'section-narrative'; nd.innerHTML = renderText(sec.narrative); c.appendChild(nd); }
      const div = document.createElement('div'); div.innerHTML = renderText(sec.text || ''); c.appendChild(div);
    }
    renderDiagrams(c, p.diagrams);

    const toc = [];
    c.querySelectorAll('h2, h3').forEach((el) => { const id = slug(el.textContent) + '-' + toc.length; el.id = id; toc.push({ id, label: el.textContent, lvl: el.tagName }); });
    buildToc(toc, p.title);
  }

  function navigate(id) {
    const p = pageById.get(id); if (!p) return;
    currentId = id;
    expandAncestors(id);
    renderPage(p);
    buildNav();
    location.hash = encodeURIComponent(id);
    $('content').scrollTop = 0;
  }

  // ── 右栏 On this page ────────────────────────────────────────────────────────
  function buildToc(items, pageTitle) {
    const list = $('toc-list'); list.innerHTML = ''; $('toc-title').textContent = t('onpage');
    if (pageTitle) {
      const li = document.createElement('li'); li.className = 'page-title'; li.textContent = pageTitle;
      li.onclick = () => $('content').scrollTo({ top: 0, behavior: 'smooth' });
      list.appendChild(li);
    }
    for (const it of items) {
      const li = document.createElement('li'); li.textContent = it.label; li.dataset.target = it.id; if (it.lvl === 'H3') li.className = 'h3';
      li.onclick = () => document.getElementById(it.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      list.appendChild(li);
    }
    $('toc').style.visibility = items.length ? 'visible' : 'hidden';
    setupScrollSpy();
  }
  let spyObserver = null;
  function setupScrollSpy() {
    if (spyObserver) spyObserver.disconnect();
    const heads = [...$('content-inner').querySelectorAll('h2, h3')];
    const lis = [...$('toc-list').querySelectorAll('li[data-target]')];
    if (!heads.length || !lis.length) return;
    const visible = new Set();
    spyObserver = new IntersectionObserver((entries) => {
      for (const e of entries) { if (e.isIntersecting) visible.add(e.target.id); else visible.delete(e.target.id); }
      let cur = null;
      for (const hh of heads) if (visible.has(hh.id)) { cur = hh.id; break; }
      if (!cur) { for (const hh of heads) { if (hh.getBoundingClientRect().top < 120) cur = hh.id; else break; } }
      for (const li of lis) li.classList.toggle('active', li.dataset.target === cur);
    }, { root: $('content'), rootMargin: '-74px 0px -68% 0px', threshold: 0 });
    heads.forEach((hh) => spyObserver.observe(hh));
  }

  // ── UI ───────────────────────────────────────────────────────────────────────
  let searchQ = '';
  function applyFilter() {
    document.querySelectorAll('#nav-list li').forEach((li) => li.classList.toggle('hidden', !!searchQ && !li.textContent.toLowerCase().includes(searchQ)));
  }
  function applyLang() {
    $('search').placeholder = t('filter'); $('lang-toggle').textContent = t('toggle'); $('toc-title').textContent = t('onpage');
    if (!currentId && $('placeholder')) $('placeholder').textContent = t('select');
    document.documentElement.lang = lang === 'zh' ? 'zh' : 'en';
  }
  function applyTheme() {
    const dark = localStorage.getItem('wiki-theme') === 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    if ($('theme-toggle')) $('theme-toggle').textContent = dark ? '☀️' : '🌙';
  }
  function wireUI() {
    $('lang-toggle').onclick = () => { lang = lang === 'en' ? 'zh' : 'en'; localStorage.setItem('wiki-lang', lang); applyLang(); if (currentId) navigate(currentId); };
    if ($('theme-toggle')) $('theme-toggle').onclick = () => { localStorage.setItem('wiki-theme', localStorage.getItem('wiki-theme') === 'dark' ? 'light' : 'dark'); applyTheme(); };
    $('search').oninput = (e) => {
      searchQ = e.target.value.trim().toLowerCase();
      if (searchQ) collapsed.clear();   // 搜索时全展开
      buildNav();
    };
    window.addEventListener('hashchange', () => {
      const w = decodeURIComponent((location.hash || '').replace(/^#/, ''));
      if (w && w !== currentId && pageById.has(w)) navigate(w);
    });
  }

  async function main() {
    wireUI(); applyLang(); applyTheme();
    try {
      const [m, p] = await Promise.all([
        fetch('/data/wiki-map.json').then((r) => r.json()),
        fetch('/data/wiki-prose.json').then((r) => r.json()).catch(() => ({})),
      ]);
      wikiMap = m; wikiProse = p;
    } catch (e) { $('content-inner').innerHTML = `<div class="placeholder">无法加载数据:${escapeHtml(e.message)}<br>用 <code>npm run wiki:serve</code> 启动。</div>`; return; }
    $('repo-name').textContent = wikiMap.repo || 'Code Wiki';
    $('side-head').textContent = wikiMap.derived_from || wikiMap.generated_at || '';
    buildIndex();
    const wanted = decodeURIComponent((location.hash || '').replace(/^#/, ''));
    const target = pageById.has(wanted) ? wanted : (pageById.has('overview') ? 'overview' : firstPageId());
    if (target) navigate(target); else { buildNav(); $('content-inner').innerHTML = `<div class="placeholder">${escapeHtml(t('empty'))}</div>`; }
  }
  main();
})();
