const correctInputCost = /\$?\d+\.\d*/;
const correctInputPerson = /\d+/;

const errorText = document.getElementById('error');

const btns = document.querySelectorAll('.tip__percentage');
const customInput = document.getElementById('input-custom');
const customBtn = document.querySelector('.btn-custom');

const perPersonShow = document.getElementById('per-person');
const totalPersonShow = document.getElementById('per-person-total');

const tipPerPerson = (amount, people, percentage) => ((amount * percentage) / people).toFixed(2);
const totalPerPerson = (amount, people, percentage) => ((amount + (amount * percentage)) / people).toFixed(2);



const billContent = document.querySelector('.bill__content')
function errorAmount(is) {
    is ? billContent.classList.add('error-content') : billContent.classList.remove('error-content');
}
const peopleContent = document.querySelector('.people__content');
function errorCount(is) {
    if (is) {
        peopleContent.classList.add('error-content');
        errorText.style.display = 'block';
    }  else { peopleContent.classList.remove('error-content'); errorText.style.display = 'none';}
}



function allCorrect(amount, people) {
    let isCorret = true;
    if (!amount.trim()  ||  !correctInputCost.test(amount) || parseFloat(amount) <= 0) {
        errorAmount(true); isCorret = false; 
    }  else {errorAmount(false);}

    if (!people.trim() || !correctInputPerson.test(people) || parseInt(amount) <= 0) {
        errorCount(true); isCorret = false;
    } else {errorCount(false);}
    return isCorret;
}

function getData(event) {
    event.preventDefault();
    const btnClicket = event.currentTarget;
    btns.forEach(btn => btn.classList.remove('btn-select'));
    btnClicket.classList.add('btn-select');



    const amount = document.getElementById('cost-food').value;
    const people = document.getElementById('count-people').value;
    const percentage = btnClicket.dataset.percentage;
    if (percentage === 'custom') {
        btnClicket.style.display = 'none';
        customInput.style.display = 'block';
        return
    } else {
        customBtn.style.display = 'block';
        customInput.value = '';
        customInput.style.display = 'none';
    }



    if (allCorrect(amount, people)) {
        perPersonShow.textContent = `$${tipPerPerson(parseFloat(amount), parseInt(people), parseFloat(percentage))}`;
        totalPersonShow.textContent = `$${totalPerPerson(parseFloat(amount), parseInt(people), parseFloat(percentage))}`
    }

}



btns.forEach(btn => {
    btn.addEventListener('click', getData)
})







customBtn.addEventListener('click', )