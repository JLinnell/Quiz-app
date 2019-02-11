let questionNumber = 0;
let score = 0;

//generate question html
function generateQuestion() {
    if (questionNumber < STORE.length) {
        return `<div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
    } else {
        renderResults();
        restartQuiz();
        $('.questionNumber').text(10);
    }
}

function updateQuestionNumber() {
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
}

function updateScore() {
    score++;
    $('.score').text(score);
}

function startQuiz() {
    $('.quizStart').on('click', '.startButton', function (event) {
        $('.quizStart').remove();
        $('.questionAnswerForm').css('display', 'flex');
        $('.questionNumber').text(1);
    });
}

function renderQuestion() {
    $('.questionAnswerForm').html(generateQuestion());
}

function selectedAnswer() {
    $('form').on('submit', function (event) {
        event.preventDefault();
        let selected = $('input:checked');
        let answer = selected.val();
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        if (answer === correctAnswer) {
            selected.parent().addClass('correct');
            correctAnswerFeedback();
            updateScore();
        } else {
            selected.parent().addClass('wrong');
            wrongAnswerFeedback();
        }
    });
}

//user feedback for correct answer
function correctAnswerFeedback() {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.questionAnswerForm').html(`<div class="correctFeedback"></div><p>You are on fire!</p><button type=button class="nextButton">Next</button></div>`);
   
}



function wrongAnswerFeedback() {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.questionAnswerForm').html(`<div class="wrongFeedback"></div><p>OOOOH....so close!<br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}


function renderResults() {
    if (score >= 8) {
        $('.questionAnswerForm').html(`<div class="results"><h3>You've done it!</h3><img src="https://media1.tenor.com/images/a957a2c1888df55afb097f24912ac8d4/tenor.gif?itemid=3957023" alt="hampster eating tiny birthday cake" /><p>You got ${score} / 10</p><p>Your score takes the cake!</p><button class="restartButton">Restart Quiz</button></div>`);
    } else if (score < 8 && score >= 5) {
        $('.questionAnswerForm').html(
        `<div class="results">
           <h3>Almost there!</h3>
            <img src=https://media.giphy.com/media/DB612L1xX9W8w/giphy.gif alt="grandma blowing dentures out instead of candles"/>
            <p>You got ${score} / 10</p>
            <p>If you study a pinch more, passing will be a cakewalk!
        <button class="restartButton">Restart Quiz</button></div>`);
    } else {
        $('.questionAnswerForm').html(
          `<div class="results">
            <h3>Maybe just stick to <em>eating</em> the desserts!</h3>
              <img src="https://thumbs.gfycat.com/GlamorousShadyKid-size_restricted.gif" alt="person dropping cake"/>
              <p>You got ${score} / 10</p>
              <p>With just a dash of studying, this quiz will be a piece of cake!</p>
              <button class="restartButton">Restart Quiz</button>
          </div>`);
    }
}

//what happens when the user clicks next
function renderNextQuestion() {
    $('main').on('click', '.nextButton', function (event) {
        updateQuestionNumber();
        renderQuestion();
        selectedAnswer();
    });
}

//restart quiz function - reloads page to start quiz over
function restartQuiz() {
    $('main').on('click', '.restartButton', function (event) {
      location.reload();
    });
}

//run quiz functions
function createQuiz() {
    startQuiz();
    renderQuestion();
    selectedAnswer();
    renderNextQuestion();
}

$(createQuiz);