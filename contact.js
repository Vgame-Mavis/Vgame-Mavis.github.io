const menuButton = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

fetch('site.json').then(response => response.json()).then(settings => {
  const contact = settings.contact || {};
  const form = document.querySelector('#inquiry-form');
  if (contact.form_endpoint) form.action = contact.form_endpoint;
  if (settings.site_name) document.title = `Contact | ${settings.site_name}`;
  document.querySelectorAll('[data-display-name]').forEach(element => { if (settings.display_name) element.textContent = settings.display_name; });
  if (settings.role) document.querySelector('#contact-role').textContent = settings.role;
  if (contact.email) {
    const emailLink = document.querySelector('#sales-email');
    emailLink.href = `mailto:${contact.email}`;
    emailLink.textContent = `${contact.email} ↗`;
  }
  if (contact.whatsapp_number) document.querySelector('#direct-whatsapp').href = `https://wa.me/${contact.whatsapp_number}`;
  if (contact.whatsapp_display) document.querySelector('#direct-whatsapp strong').textContent = contact.whatsapp_display;
  if (contact.line) {
    document.querySelector('#direct-line').href = `https://line.me/ti/p/~${contact.line}`;
    document.querySelector('#direct-line strong').textContent = contact.line;
  }
  if (contact.wechat) document.querySelector('#direct-wechat strong').textContent = contact.wechat;
  if (contact.telegram) {
    document.querySelector('#direct-telegram').href = `https://t.me/${contact.telegram.replace(/^@/, '')}`;
    document.querySelector('#direct-telegram strong').textContent = contact.telegram;
  }
}).catch(() => {});

const selectedProduct = new URLSearchParams(location.search).get('product');
if (selectedProduct) {
  const subject = document.querySelector('#subject');
  const message = document.querySelector('#message');
  const productSelect = document.querySelector('#product');
  if (subject) subject.value = `Inquiry about ${selectedProduct}`;
  if (message) message.value = `I would like to discuss ${selectedProduct}.\n\nMarket / country:\nVenue or project type:\nPlayer configuration:\nEstimated quantity:\nTarget schedule:\nOther requirements:`;
  if (productSelect) {
    const option = document.createElement('option');
    option.value = selectedProduct;
    option.textContent = selectedProduct;
    option.selected = true;
    productSelect.append(option);
  }
}
