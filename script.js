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
