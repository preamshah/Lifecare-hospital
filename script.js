const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded', 'false');
}));

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const form = document.getElementById('appointmentForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get('name');
  const phone = data.get('phone');
  const date = data.get('date');
  const department = data.get('department');
  const message = data.get('message') || 'No additional message';

  const text = `Appointment Request
Patient: ${name}
Phone: ${phone}
Preferred Date: ${date}
Department: ${department}
Message: ${message}`;

  const note = document.getElementById('formNote');
  note.textContent = 'Request prepared. Calling the hospital is recommended to confirm availability.';

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => {});
  }

  setTimeout(() => {
    window.location.href = 'tel:+9779807755466';
  }, 300);
});


const whatsappToggle = document.getElementById('whatsappToggle');
const whatsappPanel = document.getElementById('whatsappPanel');
const closeWhatsapp = document.getElementById('closeWhatsapp');

function setWhatsappPanel(open) {
  if (!whatsappPanel || !whatsappToggle) return;
  whatsappPanel.classList.toggle('open', open);
  whatsappPanel.setAttribute('aria-hidden', String(!open));
  whatsappToggle.setAttribute('aria-expanded', String(open));
}

whatsappToggle?.addEventListener('click', () => {
  const open = !whatsappPanel.classList.contains('open');
  setWhatsappPanel(open);
});

closeWhatsapp?.addEventListener('click', () => setWhatsappPanel(false));

document.addEventListener('click', (e) => {
  if (!whatsappPanel || !whatsappToggle) return;
  const insidePanel = whatsappPanel.contains(e.target);
  const onToggle = whatsappToggle.contains(e.target);
  if (!insidePanel && !onToggle) setWhatsappPanel(false);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setWhatsappPanel(false);
});
