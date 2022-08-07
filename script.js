const request = new XMLHttpRequest();
request.open('GET','./question.json');
request.send();

const question = document.querySelector('.question');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
const submit = document.querySelector('#submit');
const answers = document.querySelectorAll('.answer');
const showScore = document.querySelector('#showScore');

let questionCount = 0;
let score = 0;

// to get response
request.addEventListener('load', function() {
    const quizDB = JSON.parse(this.responseText);
    
    const loadQuestion = () => {

        const  questionList = quizDB[questionCount];

        question.innerHTML = questionList.question;

        option1.innerHTML = questionList.a;
        option2.innerHTML = questionList.b;
        option3.innerHTML = questionList.c;
        option4.innerHTML = questionList.d;

    }

    loadQuestion();

    const getCheckAnswer = () => {
        let answer;
        answers.forEach((curAnsElm) => {
            if(curAnsElm.checked) {
                answer = curAnsElm.id;
            }
        })
        return answer;
    }

    const deselectAll = () => {
        answers.forEach( (curAnsElm) =>  curAnsElm.checked = false )
    }

    submit.addEventListener('click',() => {
        const checkedAnswer = getCheckAnswer();
        //console.log(checkedAnswer)

        if(checkedAnswer === quizDB[questionCount].ans) {
            score++;
        }

        questionCount++;

        deselectAll();

        if(questionCount < quizDB.length) {
            loadQuestion();
        } else {

            showScore.innerHTML = `
                <h3>You scored ${score}/${quizDB.length}</h3>
                <button class="btn" onclick="location.reload()"> Play Again</button>
            `;
            showScore.classList.remove('scoreArea');
        }
    }); 

});