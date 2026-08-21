const fallbackProducts = [
  { title: 'Fatal Harpoon', category: 'fish', series: 'FISH SERIES', players: '2–10 Players', image: 'https://www.vgamesystem.com/wp-content/uploads/Fish_Series/VGAME-Fatal-Harpoon_logo-1.png', url: 'https://www.vgamesystem.com/fatal-harpoon/', published: true },
  { title: 'Bird’s Paradise 2 USA', category: 'bird', series: 'BIRD SERIES', players: '4–10 Players', image: 'https://www.vgamesystem.com/wp-content/uploads/Bird_Series/VGAME-Birds-Paradise-2-USA-LOGO.png', url: 'https://www.vgamesystem.com/birds-paradise-2-usa/', published: true },
  { title: 'Insect Doctor', category: 'insect', series: 'INSECT SERIES', players: '4–10 Players', image: 'https://www.vgamesystem.com/wp-content/uploads/Bird_Series/VGAME-Insect-Doctor_logo-768x554-1.png', url: 'https://www.vgamesystem.com/insect-doctor/', published: true },
  { title: 'Insect Pirates', category: 'insect', series: 'INSECT SERIES', players: '4–10 Players', image: 'https://www.vgamesystem.com/wp-content/uploads/Bird_Series/Fish-Game_Insect-Pirates_VGAME_500.png', url: 'https://www.vgamesystem.com/insect-pirates/', published: true }
];

const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));

function renderProducts(products) {
  const grid = document.querySelector('#product-grid');
  const visible = products.filter(product => product.published !== false);
  grid.innerHTML = visible.map((product, index) => `
    <article class="product-card reveal visible" data-category="${escapeHtml(product.category)}">
      <a href="${escapeHtml(product.url)}" target="_blank" rel="noopener">
        <div class="product-media"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)} artwork" loading="lazy"><span>${String(index + 1).padStart(2, '0')}</span></div>
        <div class="product-info"><p>${escapeHtml(product.series)}</p><h3>${escapeHtml(product.title)}</h3><b>${escapeHtml(product.players)} ↗</b></div>
      </a>
    </article>`).join('');
}

function applySiteSettings(settings) {
  const setText = (selector, value) => { if (value) document.querySelector(selector).textContent = value; };
  if (settings.site_name) document.title = settings.site_name;
  document.querySelectorAll('[data-site-name]').forEach(element => { if (settings.display_name) element.textContent = settings.display_name; });
  setText('#site-role', settings.role?.toUpperCase());
  setText('#hero-title-line-1', settings.hero_title_line_1);
  setText('#hero-title-line-2', settings.hero_title_line_2);
  setText('#hero-intro', settings.hero_intro);
  setText('#hero-product', settings.hero_product);
  if (settings.hero_image) document.querySelector('#hero-image').src = settings.hero_image;
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
  setLink('#contact-email', '#contact-email-link', contact.email, `mailto:${contact.email}`);
  setLink('#contact-whatsapp', '#contact-whatsapp-link', contact.whatsapp_display, `https://wa.me/${contact.whatsapp_number}`);
  setLink('#contact-line', '#contact-line-link', contact.line, `https://line.me/ti/p/~${contact.line}`);
  setText('#contact-wechat', contact.wechat);
  const telegramHandle = String(contact.telegram || '').replace(/^@/, '');
  setLink('#contact-telegram', '#contact-telegram-link', contact.telegram, `https://t.me/${telegramHandle}`);
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
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 30), { passive: true });
const menuBtn = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
menuBtn.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }));
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  document.querySelectorAll('[data-category]').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
}));
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
loadContent();
