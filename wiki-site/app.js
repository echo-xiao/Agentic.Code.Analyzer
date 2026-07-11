// 只读渲染层:读 /data/wiki-map.json + /data/wiki-prose.json,渲成 DeepWiki 式页面。
// 不改任何数据管线;链跑完产出自生成版后(同 schema),刷新即显示新内容。
(() => {
  const $ = (id) => document.getElementById(id);
  const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9一-龥]+/g, '-').replace(/^-|-$/g, '') || 'sec';

  const I18N = {
    en: { filter: 'Search…', toggle: '中文', select: 'Select a chapter from the left.', srcfiles: 'Relevant source files', onpage: 'On this page', empty: '(no prose yet — run wiki:gen)' },
    zh: { filter: '搜索…', toggle: 'EN', select: '从左侧选择一个章节。', srcfiles: '相关源文件', onpage: '本页目录', empty: '(还没有正文 — 先跑 wiki:gen)' },
  };
  let lang = localStorage.getItem('wiki-lang') || 'en';
  const t = (k) => I18N[lang][k];

  let wikiMap = null, wikiProse = null, current = null;

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
      const wrap = document.createElement('div'); wrap.className = 'diagram-block';
      const cap = document.createElement('div'); cap.className = 'dia-cap'; cap.textContent = `Diagram ${++i}`;
      const host = document.createElement('div');
      wrap.appendChild(cap); wrap.appendChild(host); container.appendChild(wrap);
      try { const { svg } = await window.mermaid.render(`m-${Date.now()}-${i}`, diagramToMermaid(d)); host.innerHTML = svg; }
      catch (e) { host.innerHTML = `<pre>${escapeHtml(diagramToMermaid(d))}</pre>`; }
    }
  }

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
    $('crumb').textContent = page.title || page.page;
    document.querySelectorAll('#nav-list li.page').forEach((li) => li.classList.toggle('active', li.dataset.page === page.page));
    const c = $('content'); c.innerHTML = '';

    const h = document.createElement('h1'); h.className = 'chapter-title'; h.textContent = page.title || page.page; c.appendChild(h);
    if (page.scope || (page.modules && page.modules.length)) {
      const sub = document.createElement('div'); sub.className = 'chapter-sub';
      const bits = [];
      if (page.scope) bits.push(escapeHtml(page.scope));
      if (page.modules && page.modules.length) bits.push(page.modules.slice(0, 6).map((m) => `<code>${escapeHtml(m)}</code>`).join(' '));
      sub.innerHTML = bits.join(' &nbsp;·&nbsp; '); c.appendChild(sub);
    }

    // Relevant source files 盒子(DeepWiki 招牌)
    const srcFiles = Object.keys(page.source_files || {});
    if (srcFiles.length) {
      const box = document.createElement('details'); box.className = 'srcbox'; box.open = true;
      const sum = document.createElement('summary'); sum.textContent = `${t('srcfiles')} (${srcFiles.length})`;
      const files = document.createElement('div'); files.className = 'files';
      files.innerHTML = srcFiles.slice(0, 60).map((f) => `<span class="f">${escapeHtml(f)}</span>`).join('');
      box.appendChild(sum); box.appendChild(files); c.appendChild(box);
    }

    renderDiagrams(c, page.diagrams);

    // 正文 + 收集右侧 TOC
    const toc = [];
    const sections = (wikiProse && wikiProse[page.page]) || [];
    if (!sections.length) { const p = document.createElement('p'); p.style.color = '#656d76'; p.textContent = t('empty'); c.appendChild(p); }
    for (const sec of sections) {
      if (sec.section && sec.section !== '(intro)' && sec.section !== 'Overview') {
        const id = slug(sec.section);
        const hh = document.createElement('h2'); hh.id = id; hh.textContent = sec.section; c.appendChild(hh);
        toc.push({ id, label: sec.section });
      }
      const div = document.createElement('div'); div.innerHTML = renderText(sec.text || ''); c.appendChild(div);
    }
    buildToc(toc);
    c.scrollTop = 0;
    location.hash = encodeURIComponent(page.id || page.page);
  }

  function buildToc(items) {
    const list = $('toc-list'); list.innerHTML = '';
    $('toc-title').textContent = t('onpage');
    for (const it of items) {
      const li = document.createElement('li'); li.textContent = it.label;
      li.onclick = () => document.getElementById(it.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      list.appendChild(li);
    }
    $('toc').style.visibility = items.length ? 'visible' : 'hidden';
  }

  function buildNav() {
    const list = $('nav-list'); list.innerHTML = '';
    const pages = wikiMap.pages || [];
    const groups = new Map();
    for (const p of pages) { const cat = p.category || ''; if (!groups.has(cat)) groups.set(cat, []); groups.get(cat).push(p); }
    let n = 0;
    for (const [cat, ps] of groups) {
      if (cat) { const c = document.createElement('li'); c.className = 'cat'; c.textContent = cat; list.appendChild(c); }
      for (const p of ps) {
        n++;
        const li = document.createElement('li'); li.className = 'page'; li.dataset.page = p.page;
        li.innerHTML = `<span class="num">${n}</span><span>${escapeHtml(p.title || p.page)}</span>`;
        li.onclick = () => renderChapter(p);
        list.appendChild(li);
      }
    }
    $('side-foot').textContent = `${pages.length} chapters`;
  }

  function applyLang() {
    $('search').placeholder = t('filter');
    $('lang-toggle').textContent = t('toggle');
    $('toc-title').textContent = t('onpage');
    if (!current && $('placeholder')) $('placeholder').textContent = t('select');
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
      $('content').innerHTML = `<div class="placeholder">无法加载 /data/wiki-map.json —— 用 <code>npm run wiki:serve</code> 启动(别直接双击 html)。<br>${escapeHtml(e.message)}</div>`;
      return;
    }
    $('repo-name').textContent = wikiMap.repo || 'Code Wiki';
    buildNav();
    const wanted = decodeURIComponent((location.hash || '').replace(/^#/, ''));
    const pages = wikiMap.pages || [];
    const target = pages.find((p) => (p.id || p.page) === wanted) || pages[0];
    if (target) renderChapter(target); else $('content').innerHTML = `<div class="placeholder">${escapeHtml(t('empty'))}</div>`;
  }

  main();
})();
