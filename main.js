const correctInputCost = /\$?\d+\.?\d{1,2}/;
const correctInputPerson = /\d+/;

const errorText = document.getElementById('error');

const btns = document.querySelectorAll('.tip__percentage');

const customBtn = document.querySelector('.btn-custom');

const perPersonShow = document.getElementById('per-person');
const totalPersonShow = document.getElementById('per-person-total');

const reset = document.getElementById('reset');

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

    if (!people.trim() || !correctInputPerson.test(people) || parseInt(people) <= 0) {
        errorCount(true); isCorret = false;
    } else {errorCount(false);}
    return isCorret;
}

function getData(event) {
    event.preventDefault();
    const btnClicket = event.currentTarget;
    btns.forEach(btn => btn.classList.remove('btn-select'));
    if (!btnClicket.classList.contains('btn-custom')) {
        btnClicket.classList.add('btn-select');
    }

    const percentage = btnClicket.dataset.percentage;
    if (percentage === 'custom') {
        return
    }

    const amount = document.getElementById('cost-food').value;
    const people = document.getElementById('count-people').value;


    if (allCorrect(amount, people)) {
        enableReset();
        perPersonShow.textContent = `$${tipPerPerson(parseFloat(amount), parseInt(people), parseFloat(percentage))}`;
        totalPersonShow.textContent = `$${totalPerPerson(parseFloat(amount), parseInt(people), parseFloat(percentage))}`
    }

}



btns.forEach(btn => {
    btn.addEventListener('click', getData)
})



const isCorrectPercentage  = /[\d]+%?/;

function getCustomInput(e) {
    const value = e.target.value.trim();

    if (!isCorrectPercentage.test(value)) {
        e.target.classList.add('input-error');
        return;
    }

    e.target.classList.remove('input-error');

    const percentage = parseFloat(value.replace('%', '')) / 100;

    const amount = document.getElementById('cost-food').value;
    const people = document.getElementById('count-people').value;

    btns.forEach(btn => btn.classList.remove('btn-select'));
    e.target.classList.add('btn-select');

    if (allCorrect(amount, people)) {
        enableReset();
        perPersonShow.textContent = `$${tipPerPerson(parseFloat(amount), parseInt(people), percentage)}`;
        totalPersonShow.textContent = `$${totalPerPerson(parseFloat(amount), parseInt(people), percentage)}`;
    }
}

function enableReset() {
  reset.disabled = false;
}


customBtn.addEventListener('input', getCustomInput);


function resetAll() {
    reset.disabled = true;
    btns.forEach(btn => btn.classList.remove('btn-select'));
    errorText.style.display = 'none';
    document.getElementById('cost-food').value = '';
    document.getElementById('count-people').value = '';
    customBtn.value = '';
    perPersonShow.textContent = `$0.00`;
    totalPersonShow.textContent = `$0.00`;
}


reset.addEventListener('click', () => {
    resetAll();
})


document.addEventListener('DOMContentLoaded', resetAll)