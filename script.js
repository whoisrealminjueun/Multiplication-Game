
let num1, num2;
let streak = 0;
let maxStreak = getCookie("maxStreak") ? parseInt(getCookie("maxStreak")) : 0;

function generateQuestion() {
    num1 = Math.floor(Math.random() * 90) + 10;
    num2 = Math.floor(Math.random() * 90) + 10;
    document.getElementById('question').innerText = `${num1} × ${num2} = ?`;
    document.getElementById('answer').value = '';
    document.getElementById('result').innerText = '';
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const correctAnswer = num1 * num2;

    if (userAnswer === correctAnswer) {
        document.getElementById('result').innerText = 'Correct!';
        document.getElementById('result').style.color = 'green';
        streak++;
        if (streak > maxStreak) {
            maxStreak = streak;
            setCookie("maxStreak", maxStreak, 365);
        }
    } else {
        document.getElementById('result').innerText = `Incorrect. The correct answer is ${correctAnswer}.`;
        document.getElementById('result').style.color = 'red';
        streak = 0;
    }
    updateMaxStreak();
}

function addToAnswer(num) {
    document.getElementById('answer').value += num;
}

function clearAnswer() {
    document.getElementById('answer').value = '';
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function updateMaxStreak() {
    document.getElementById('max-streak').innerText = `Max Streak: ${maxStreak}`;
}

// Generate the first question when the page loads
window.onload = function() {
    generateQuestion();
    updateMaxStreak();
};
