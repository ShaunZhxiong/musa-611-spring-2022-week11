const button = document.querySelector('#alert-button');

button.addEventListener('click', () => {
  alert(`${lang.greeting}! ${lang.bathroomQuestion}?`);
});
