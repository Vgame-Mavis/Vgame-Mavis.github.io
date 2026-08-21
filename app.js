const fallbackProducts = [
  { title: 'Fatal Harpoon', category: 'fish', series: 'FISH SERIES', players: '2–10 Players', summary: 'An ocean-themed multi-player system for early-stage product and venue discussions.', focus: 'Multi-player format', published: true },
  { title: 'Bird’s Paradise 2 USA', category: 'bird', series: 'BIRD SERIES', players: '4–10 Players', summary: 'A bird-themed entertainment system presented for configuration and market inquiries.', focus: 'Theme-led experience', published: true },
  { title: 'Insect Doctor', category: 'insect', series: 'INSECT SERIES', players: '4–10 Players', summary: 'A character-driven insect theme for commercial amusement project conversations.', focus: 'Character theme', published: true },
  { title: 'Insect Pirates', category: 'insect', series: 'INSECT SERIES', players: '4–10 Players', summary: 'A multi-player insect adventure concept for venue and integration discussions.', focus: 'Project configuration', published: true }
];

const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));

function renderProducts(products) {
  const grid = document.querySelector('#product-grid');
  const visible = products.filter(product => product.published !== false);
  grid.innerHTML = visible.map((product, index) => {
    const inquiry = `contact.html?product=${encodeURIComponent(product.title)}`;
    return `<article class="product-card product-${escapeHtml(product.category)} reveal visible" data-category="${escapeHtml(product.category)}">
      <div class="product-visual" aria-hidden="true"><span>${String(index + 1).padStart(2, '0')}</span><i></i><b>${escapeHtml(product.category).slice(0, 2).toUpperCase()}</b></div>
      <div class="product-info"><p>${escapeHtml(product.series)}</p><h3>${escapeHtml(product.title)}</h3><div class="product-tags"><span>${escapeHtml(product.players)}</span><span>${escapeHtml(product.focus || 'Project inquiry')}</span></div><p class="product-summary">${escapeHtml(product.summary || '')}</p><a href="${inquiry}">Discuss this system ↗</a></div>
    </article>`;
  }).join('');
}

function applySiteSettings(settings) {
  const setText = (selector, value) => { const element = document.querySelector(selector); if (element && value) element.textContent = value; };
  if (settings.site_name) document.title = settings.site_name;
  document.querySelectorAll('[data-site-name]').forEach(element => { if (settings.display_name) element.textContent = settings.display_name; });
  setText('#site-role', settings.role?.toUpperCase());
  setText('#hero-title-line-1', settings.hero_title_line_1);
  setText('#hero-title-line-2', settings.hero_title_line_2);
  setText('#hero-intro', settings.hero_intro);
  setText('#contact-intro', settings.contact_intro);
  setText('#site-disclaimer', settings.disclaimer);

  const contact = settings.contact || {};
  if (!contact.publish_contact) return;
  const setLink = (textSelector, linkSelector, value, href) => {
    const textElement = document.querySelector(textSelector);
    const linkElement = document.querySelector(linkSelector);
    if (textElement && value) textElement.textContent = value;
    if (linkElement && href) linkElement.href = href;
  };
  setLink('#contact-email', '#contact-email-link', contact.email, contact.email ? `mailto:${contact.email}` : '');
  setLink('#contact-whatsapp', '#contact-whatsapp-link', contact.whatsapp_display, contact.whatsapp_number ? `https://wa.me/${contact.whatsapp_number}` : '');
  setLink('#contact-line', '#contact-line-link', contact.line, contact.line ? `https://line.me/ti/p/~${contact.line}` : '');
  setText('#contact-wechat', contact.wechat);
  const telegramHandle = String(contact.telegram || '').replace(/^@/, '');
  setLink('#contact-telegram', '#contact-telegram-link', contact.telegram, telegramHandle ? `https://t.me/${telegramHandle}` : '');
  const actionLabel = document.querySelector('#contact-action span');
  if (actionLabel && contact.cta_label) actionLabel.textContent = contact.cta_label;
}

async function loadContent() {
  try {
    const [siteResponse, productsResponse] = await Promise.all([fetch('site.json'), fetch('products.json')]);
    if (!siteResponse.ok || !productsResponse.ok) throw new Error('Content request failed');
    applySiteSettings(await siteResponse.json());
    renderProducts(await productsResponse.json());
  } catch (error) {
    renderProducts(fallbackProducts);
  }
}

const header = document.querySelector('[data-header]');
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 24), { passive: true });
const menuBtn = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
menuBtn.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }));
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  document.querySelectorAll('[data-category]').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
}));
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
loadContent();
