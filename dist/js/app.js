import Question from "./Question.js";
import Quiz from "./Quiz.js";

const App = (() => {
  // cache the DOM
  const quizEl = document.querySelector(".jabquiz");
  const quizQuestionEl = document.querySelector(".question");
  const trackerEl = document.querySelector(".tracker");
  const taglineEl = document.querySelector(".tagline");
  const choicesEl = document.querySelector(".choices");
  const progressInnerEl = document.querySelector(".progress-inner");
  const nextButtonEl = document.querySelector(".next");
  const restartButtonEl = document.querySelector(".restart");

  const q1 = new Question(
    "Inside which HTML tag do we use to link JavaScript code?",
    ["javascript", "js", "script", "link"],
    2
  );
  const q2 = new Question(
    'How do you call a function named "myFunction"?',
    [
      "call myFunction",
      "myFunction()",
      "call function myFunction",
      "Call.myFunction()"
    ],
    1
  );
  const q3 = new Question(
    "How can you add a comment in a JavaScript?",
    [
      "//This is a comment",
      "'This is a comment'",
      "!-- This is a comment",
      "#This is a comment"
    ],
    0
  );
  const q4 = new Question(
    "When you want to use JavaScript to manipulate the currently displayed Web page, the Web page's JavaScript object name is: ",
    ["Frame", "Document", "Window", "browser_window"],
    1
  );
  const q5 = new Question(
    "A named element in a JavaScript program that is used to store and retrieve data is a _____.",
    ["Method", "assignment", "string", "variable"],
    3
  );

  const quiz = new Quiz([q1, q2, q3, q4, q5]);

  const listeners = () => {
    nextButtonEl.addEventListener("click", () => {
      const selectedAnswer = document.querySelector('input[name="choice"]:checked')
      if (selectedAnswer) {
        const key = Number(selectedAnswer.getAttribute("data-order"));
        quiz.guess(key);
        renderAll();
      }
    });

    restartButtonEl.addEventListener("click", () => {
      quiz.reset();
      renderAll();
      nextButtonEl.style.display = "inline-block";
      choicesEl.style.display = "flex";
    });
  }

  const setValue = (elem, value) => {
    elem.innerHTML = value;
  };

  const renderQuestion = () => {
    const question = quiz.getCurrentQuestion().question;
    setValue(quizQuestionEl, question);
  };

  const renderChoices = () => {
    let markup = "";
    const currentChoices = quiz.getCurrentQuestion().choices;
    currentChoices.forEach((elem, index) => {
      markup += `
        <li class="choice">
          <input type="radio" name="choice" class="input" data-order="${index}" id="choice-${index}" />
          <label for="choice-${index}" class="label">
            <i></i>
            <span>${elem}</span>
          </label>
        </li>
      `;
    })
    setValue(choicesEl, markup);
  };


  const renderTracker = () => {
    const index = quiz.currentQuestion;
    setValue(trackerEl, `${index+1} of ${quiz.questions.length}`);
  }

  const getPercentage = (num1, num2) => {
    return num1 / num2 * 100;
  }

  const launch = (width, maxPercent) => {
    let loadingBar = setInterval(() => {
      if (width > maxPercent) {
        clearInterval(loadingBar);
      }
      else {
        width++;
        progressInnerEl.style.width = `${width}%`;
      }
    }, 5);
  }

  const renderProgress = () => {
    const currentWidth = getPercentage((quiz.currentQuestion + 1) , quiz.questions.length);
    launch(0, currentWidth);

  }

  const renderEndScreen = () => {
    setValue(quizQuestionEl, 'Great Job!');
    setValue(taglineEl, 'Complete!');
    setValue(trackerEl, `Your score: ${getPercentage(quiz.score, quiz.questions.length)}%`);
    choicesEl.style.display = "none";
    nextButtonEl.style.display = "none";
    renderProgress();
  }
  

  const renderAll = () => {
    if (quiz.isQuizDone()) {
      // render end screen
      renderEndScreen();
    } else {
      //1. render questions
      renderQuestion();
      //2. render choices
      renderChoices();
      //3. render tracker
      renderTracker();
      // render progress
      renderProgress();
    }
  };

  return {
    renderAll: renderAll,
    listeners: listeners
  }
})();

App.renderAll();
App.listeners();