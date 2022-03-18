///////////////////////////////////
///////////////////////////////////
////////function darkmode//////////
///////////////////////////////////
///////////////////////////////////
const toggleButton = document.querySelector(`header button`);

toggleButton.addEventListener(`click`, () => {
    const element = document.body;
   element.classList.toggle(`darkmode`);

   if(toggleButton.textContent === `Darkmode`){
    toggleButton.textContent = `Lichtmode`;
   } 
   else{
    toggleButton.textContent = `Darkmode`;
   }
  });

///////////////////////////////////
///////////////////////////////////
//////function error message///////
///////////////////////////////////
///////////////////////////////////
const form = document.querySelector("form:first-of-type");
const buttonVet = document.getElementById("Vet verliezen");
const buttonSpier = document.getElementById("Spieren opbouwen");
const buttonAankomen = document.getElementById("Aankomen");
const buttonConditie = document.getElementById("Conditie verbeteren");
const error = document.querySelector("h3");


form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (buttonVet.checked == true) {
        form.submit();
    } else if (buttonSpier.checked == true) {
        form.submit();
    } else if (buttonAankomen.checked == true) {
        form.submit();
    } else if (buttonConditie.checked == true) {
        form.submit();
    } else {
        error.innerHTML = "Je hebt nog geen doel gekozen";
    }
});

const deleteRequired = () => {
    document.getElementById("Vet verliezen").removeAttribute("required");
}

deleteRequired();