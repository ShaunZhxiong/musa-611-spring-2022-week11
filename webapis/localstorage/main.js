/*
  When the page first loads we read the current value of the personName local
  storage key. If there's a value set to that key, then we show the value in the
  greeting on the page.

  We do all this by using the localStorage object, which is available globally
  in any front-end scripts.
*/
const personNameEls = document.querySelectorAll('.person-name');
const personNameInput = document.querySelector('#person-name-input');
const changeNameButton = document.querySelector('#change-name-button');
changeNameButton.addEventListener('click', () => {
  saveNameToLocalStorage();
  showNameFromLocalStorage();
});


const saveNameToLocalStorage = function() {
  const newPersonName = personNameInput.value;
  localStorage.setItem('personName', newPersonName);
};


const showNameFromLocalStorage = function() {
  const personName = localStorage.getItem('personName');
  if (personName) {
    for (const el of personNameEls) {
      el.innerHTML = personName;
    }
  }
};


showNameFromLocalStorage();
