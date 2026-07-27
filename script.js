const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const authPanels = Array.from(document.querySelectorAll('.auth-panel'));
const dashboardSection = document.querySelector('.dashboard-section');
const authSection = document.querySelector('.auth-section');

const switchView = (viewName) => {
  authPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.view === viewName);
  });
};

const openDashboard = () => {
  if (dashboardSection) {
    dashboardSection.classList.add('is-visible');
    dashboardSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (authSection) {
    authSection.style.display = 'none';
  }
};

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('[data-switch]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = link.dataset.switch;
    if (target === 'dashboard') {
      openDashboard();
    } else if (target === 'login') {
      if (authSection) {
        authSection.style.display = 'block';
        authSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (dashboardSection) {
        dashboardSection.classList.remove('is-visible');
      }
      switchView('login');
    } else {
      switchView(target);
    }
  });
});

document.querySelectorAll('.auth-submit').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const action = button.dataset.action;
    if (action === 'dashboard') {
      openDashboard();
    } else {
      switchView(action);
    }
  });
});

document.querySelectorAll('[data-switch="login"]').forEach((link) => {
  link.addEventListener('click', () => {
    if (authSection) {
      authSection.style.display = 'block';
      authSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (dashboardSection) {
      dashboardSection.classList.remove('is-visible');
    }
    switchView('login');
  });
});

if (authPanels.length) {
  switchView('login');
}
