let contador = 1;
function eventoMenu() {
  const menu = document.querySelector("#menu");
  const btnMnu = document.querySelector("#btnMnu");
  if (contador == 1) {
    //menu.style='left: 0';
    menu.style.transform = "translateX(-0%)";
    contador = 0;
    btnMnu.innerHTML = "x";
  } else {
    //menu.style='left:-100%';
    menu.style.transform = "translateX(-120%)";
    contador = 1;
    btnMnu.innerHTML = "≡";
  }
}

window.onload = function () {
  document
    .getElementById("frmContacto")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      // these IDs from the previous steps
      emailjs.sendForm("contact_service", "contact_form", this).then(
        () => {
          console.log("SUCCESS!");
          clearForm();
        },
        (error) => {
          console.log("FAILED...", error);
        }
      );
    });
};

function clearForm() {
  let formulario = document.getElementById("frmContacto");
  formulario.reset();
}
