// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear();

// Menú móvil
const navToggle = document.getElementById('navToggle');
const mainNav   = document.getElementById('mainNav');
navToggle?.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

// Dropdowns por clic (robusto: button o anchor)
document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.has-dropdown');

  dropdowns.forEach(item => {
    const btn = item.querySelector('.dropdown-btn') || item.querySelector(':scope > a');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Cierra otros abiertos
      dropdowns.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const ob = other.querySelector('.dropdown-btn') || other.querySelector(':scope > a');
          ob?.setAttribute('aria-expanded','false');
        }
      });

      const isActive = item.classList.toggle('active');
      btn.setAttribute('aria-expanded', String(isActive));
    });
  });

  // Cerrar al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      dropdowns.forEach(item => item.classList.remove('active'));
      document.querySelectorAll('.dropdown-btn[aria-expanded="true"]')
        .forEach(b => b.setAttribute('aria-expanded','false'));
    }
  });
});

// Simulación de envío de formulario
document.getElementById('btnEnviar')?.addEventListener('click', ()=>{
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const msj    = document.getElementById('mensaje').value.trim();
  if(!nombre || !correo || !msj){
    alert('Por favor completa todos los campos.');
    return;
  }
  alert(`Gracias, ${nombre}. Te contactaremos a ${correo}.`);
});
// --- Modal perfiles equipo ---
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('profileModal');
  const modalBody = document.getElementById('profileModalBody');
  if (!modal || !modalBody) return; // por si la página no tiene sección equipo

  const closeBtn = modal.querySelector('.profile-modal-close');
  const backdrop = modal.querySelector('.profile-modal-backdrop');

  // Abrir modal al hacer clic en la tarjeta de retrato
  document.querySelectorAll('.portrait-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.person; // yesica / jonatan / leydi
      const content = document.getElementById('profile-' + id);
      if (!content) return;

      // Insertar contenido del perfil oculto
      modalBody.innerHTML = content.innerHTML;

      // Si tiene data-linkedin, crear botón
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

      // Mostrar modal
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  // Función para cerrar modal
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modalBody.innerHTML = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
});

