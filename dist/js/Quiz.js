export default function Quiz(questions) {
  this.questions = questions;
  this.score = 0;
  this.currentQuestion = 0;
}

Quiz.prototype.getCurrentQuestion = function() {
  return this.questions[this.currentQuestion];
}

Quiz.prototype.nextQuestion = function() {
  this.currentQuestion++;
}

Quiz.prototype.isQuizDone = function () {
  return this.currentQuestion === this.questions.length;
}

Quiz.prototype.guess = function(userGuess) {
  const currentQuestion = this.questions[this.currentQuestion];
  if (currentQuestion.isCorrect(userGuess)) {
    this.score++;
  }
  this.nextQuestion();
}

Quiz.prototype.reset = function () {
  this.currentQuestion = 0;
  this.score = 0;
}