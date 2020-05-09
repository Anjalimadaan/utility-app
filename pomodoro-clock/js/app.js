// ELEMENTS
// Buttons
const resetBtn = document.getElementById('reset');
const startBtn = document.getElementById('start');
// Display
const countTime = document.getElementById('num');
const countBreak = document.getElementById('breakNum');
// Minus Buttons
const minusTime = document.getElementById('minus5Clock');
const minusBreak = document.getElementById('minus5Break');
// Plus Buttons
const plusTime = document.getElementById('plus5Clock');
const plusBreak = document.getElementById('plus5Break');
// The counters of the display
let breakTime = parseInt(countBreak.textContent);
let count = parseInt(countTime.textContent);
// Heading
const timeType = document.getElementById('time-type');
// Audio
const buzzer = document.getElementById('buzzer');
// Number
const num = document.getElementById('numb');

num.style.display = 'none';
resetBtn.style.display = 'none';

let arr = [];


// EVENT LISTENERS
minusTime.addEventListener('click', minus5);
plusTime.addEventListener('click', plus5);
minusBreak.addEventListener('click', minus5Break);
plusBreak.addEventListener('click', plus5Break);
startBtn.addEventListener('click', function() {
    const counter = setInterval(timer, 1000);
    count *= 60;
    breakTime *= 60;
    function timer() {
        let startBreak;
        // Hide the variables
        document.querySelectorAll('.remove-display').forEach(el => el.classList.add('removeDisplay'));
        countBreak.style.display = 'none';
        timeType.style.display = 'inline';
        timeType.textContent = 'Session Time: ';
        count -= 1;
        if (count === 0) {
            buzzer.play();
            clearInterval(counter);
            startBreak = setInterval(breakTimer, 1000);
            timeType.textContent = 'Break Time: ';
            countTime.style.display = 'none';
            countBreak.style.display = 'inline';
        }
        if ((count % 60) >= 10) {
            countTime.textContent = Math.floor(count / 60) + ':' + (count % 60);
        } else {
            countTime.textContent = Math.floor(count / 60) + ':' + '0' + (count % 60);
        }
        function breakTimer() {
            timeType.textContent = 'Break Time: ';
            countBreak.classList.remove('removeDisplay');
            breakTime -= 1;
            countBreak.textContent = breakTime;
            if (breakTime === 0) {
                arr.push(1);
                let n = arr.length;
                console.log(n);
                buzzer.play();
                clearInterval(startBreak);
                countBreak.style.display = 'none';
                timeType.style.display= 'none';
                resetBtn.style.display = 'inline';
                num.style.display = 'inline';
                num.textContent = `Number of Pomodoros Completed: ${n}`;
            }
            if ((breakTime % 60) >= 10) {
                countBreak.textContent = Math.floor(breakTime / 60) + ':' + (breakTime % 60);
            } else {
                countBreak.textContent = Math.floor(breakTime / 60) + ':' + '0' + (breakTime % 60);
            }
        }
    }
});
resetBtn.addEventListener('click', function() {
    count = 25;
    breakTime = 5;
    countTime.textContent = count;
    countBreak.textContent = breakTime;
    document.querySelectorAll('.remove-display').forEach(el => el.classList.remove('removeDisplay'));
    countTime.style.display = 'inline';
    countBreak.style.display = 'inline';
    resetBtn.style.display = 'none';
});


// FUNCTIONS
function minus5() {
    if (count > 5) {
        count -= 5;
        countTime.textContent = count;
    }
}

function minus5Break() {
    if (breakTime > 5) {
        breakTime -= 5;
        countBreak.textContent = breakTime;
    }
}

function plus5() {
    count += 5;
    countTime.textContent = count;
}

function plus5Break() {
    breakTime += 5;
    countBreak.textContent = breakTime;
}





