document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.buranshh-header__menu-btn');
  const menu = document.querySelector('.buranshh-mobile-menu');

  if (!button || !menu) return;

  button.addEventListener('click', () => {
    menu.classList.toggle('is-open');

    const expanded =
      button.getAttribute('aria-expanded') === 'true';

    button.setAttribute(
      'aria-expanded',
      (!expanded).toString()
    );
  });
});