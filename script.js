document.addEventListener('DOMContentLoaded', () => {
  // Año dinámico
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Menú móvil
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
  }

  // Dropdowns por clic (si en el futuro usas .has-dropdown)
  const dropdowns = document.querySelectorAll('.has-dropdown');
  dropdowns.forEach(item => {
    const btn = item.querySelector('.dropdown-btn') || item.querySelector(':scope > a');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      dropdowns.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const ob = other.querySelector('.dropdown-btn') || other.querySelector(':scope > a');
          ob?.setAttribute('aria-expanded', 'false');
        }
      });

      const isActive = item.classList.toggle('active');
      btn.setAttribute('aria-expanded', String(isActive));
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      dropdowns.forEach(item => item.classList.remove('active'));
      document.querySelectorAll('.dropdown-btn[aria-expanded="true"]')
        .forEach(b => b.setAttribute('aria-expanded', 'false'));
    }
  });

  // Formulario (simulación)
  const btnEnviar = document.getElementById('btnEnviar');
  btnEnviar?.addEventListener('click', () => {
    const nombre = document.getElementById('nombre')?.value?.trim() || '';
    const correo = document.getElementById('correo')?.value?.trim() || '';
    const msj = document.getElementById('mensaje')?.value?.trim() || '';

    if (!nombre || !correo || !msj) {
      alert('Por favor completa todos los campos.');
      return;
    }
    alert(`Gracias, ${nombre}. Te contactaremos a ${correo}.`);
  });

  // Modal perfiles equipo
  const modal = document.getElementById('profileModal');
  const modalBody = document.getElementById('profileModalBody');
  if (modal && modalBody) {
    const closeBtn = modal.querySelector('.profile-modal-close');
    const backdrop = modal.querySelector('.profile-modal-backdrop');

    document.querySelectorAll('.portrait-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.person;
        const content = document.getElementById('profile-' + id);
        if (!content) return;

        modalBody.innerHTML = content.innerHTML;

        const linkedinUrl = card.dataset.linkedin;
        if (linkedinUrl) {
          const link = document.createElement('a');
          link.href = linkedinUrl;
          link.target = '_blank';
          link.rel = 'noopener';
          link.className = 'profile-linkedin';
          link.innerHTML = '<i class="fab fa-linkedin-in"></i> Ver perfil completo en LinkedIn';
          modalBody.appendChild(link);
        }

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
      });
    });

    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      modalBody.innerHTML = '';
    };

    closeBtn?.addEventListener('click', closeModal);
    backdrop?.addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }

  // ===== Acordeón por sección (ÚNICO, robusto) =====
  document.querySelectorAll('.acc-toggle').forEach((btn) => {
    const panelId = btn.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;
    const label = btn.querySelector('.acc-label');

    if (!panel) {
      console.warn('[ACORDEÓN] No encuentro el panel con id:', panelId);
      return;
    }

    // estado inicial según el HTML (hidden = cerrado)
    const isOpen = !panel.hasAttribute('hidden');
    btn.setAttribute('aria-expanded', String(isOpen));
    if (label) label.textContent = isOpen ? 'Ocultar' : 'Ver';

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const nowOpen = btn.getAttribute('aria-expanded') !== 'true';

      btn.setAttribute('aria-expanded', String(nowOpen));
      if (label) label.textContent = nowOpen ? 'Ocultar' : 'Ver';

      if (nowOpen) panel.removeAttribute('hidden');
      else panel.setAttribute('hidden', '');
    });
  });

});
