function initDropdowns(dropdownSelector) {
  document.querySelectorAll(dropdownSelector).forEach(dropdown => {
    const details = dropdown.querySelector('.dropdown__details');
    const content = dropdown.querySelector('.dropdown__content');
    if (!details || !content) return;

    setDropdownMaxHeight(dropdown, details, content);

    details.addEventListener('toggle', () => setDropdownMaxHeight(dropdown, details, content));
  });
}

function setDropdownMaxHeight(dropdown, details, content) {
  if (!dropdown || !details || !content) return;
  if (details.open) {
    dropdown.style.setProperty('--dropdown-max-height', content.scrollHeight + 'px');
  } else {
    dropdown.style.removeProperty('--dropdown-max-height');
  }
}

initDropdowns('.dropdown');
