document.addEventListener('DOMContentLoaded', function () {

  const url = './php/form.php';
  [].forEach.call( document.querySelectorAll('#tel'), function(input) {
    let keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)
  });

  const form = document.querySelector('#enroll_form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    sendForm(url, form);
  })

  const submitBtn = document.querySelector('#submit_btn');
  const btnText = document.querySelector('.submit_btn__text');
  const btnSpinner = document.querySelector('.enroll-spinner');

  async function sendForm(url, form) {
    submitBtn.setAttribute('disabled', 'disabled')
    btnText.style.display = 'none';
    btnSpinner.style.display = 'block';

    const result = await fetch(url, {
      method: 'POST',
      body: new FormData(form),
    })

    if (result.status === 200) {
      new AWN().modal(`
      <b style="font-family: 'Roboto', sans-serif; font-size: 23px">Спасибо!</b>
      <br>
      <br>
      <span style="font-family: 'Roboto', sans-serif; font-size: 20px">Ваша заявка была отправлена администратору, скоро он с Вами свяжется</span>`)
      submitBtn.removeAttribute('disabled')
      btnText.style.display = 'inline';
      btnSpinner.style.display = 'none';
    }
  }

})