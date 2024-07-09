let num1, num2, startTime, endTime;
let streak = 0;
let maxStreak = getCookie("maxStreak") ? parseInt(getCookie("maxStreak")) : 0;

function generateQuestion() {
    const digits = parseInt(document.getElementById('digits').value);
    const operation = document.getElementById('operation').value;

    num1 = Math.floor(Math.random() * Math.pow(10, digits));
    num2 = Math.floor(Math.random() * Math.pow(10, digits));

    // Ensure num2 is not zero for division
    if (operation === "/") {
        num2 = num2 === 0 ? 1 : num2;
        // Make num1 a multiple of num2 to ensure integer result
        num1 = num1 - (num1 % num2);
    }

    document.getElementById('question').innerText = `${num1} ${operation} ${num2} = ?`;
    document.getElementById('answer').value = '';
    document.getElementById('result').innerText = '';
    startTime = new Date();
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const operation = document.getElementById('operation').value;
    let correctAnswer;

    switch (operation) {
        case "*":
            correctAnswer = num1 * num2;
            break;
        case "/":
            correctAnswer = num1 / num2;
            break;
        case "+":
            correctAnswer = num1 + num2;
            break;
        case "-":
            correctAnswer = num1 - num2;
            break;
    }

    endTime = new Date();
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2);

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
    document.getElementById('time-taken').innerText = `Time Taken: ${timeTaken} seconds`;
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
