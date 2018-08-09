var triviaGame = {
  questions: [
  {
    q: "Who is 'The One'?",
    c: ["Morpheus", "Trinity", "Neo", "Agent Smith"],
    a: 2,
    isCorrect: false,
  },
  {
    q: "What color pill allows someone to exit the matrix?",
    c: ["Green", "Red", "Blue", "Orange"],
    a: 1,
    isCorrect: false,
  },
  {
    q: "What is Neo's real name?",
    c: ["James Smith", "Pete Anderson", "Anderson", "Jameson"],
    a: 2,
    isCorrect: false,
  },
  {
    q: "What is the name of the ship that Morpheus commands?",
    c: ["choice 1", "choice 2", "choice 3", "choice 4"],
    a: 1,
    isCorrect: false,
  },
  {
    q: "What are the control programs inside the matrix called?",
    c: ["Commanders", "Controllers", "Spies", "Agents"],
    a: 3,
    isCorrect: false,
  },
  {
    q: "How do you exit the matrix once you have been unplugged?",
    c: ["Phone Call", "Toilet Flush", "Through the Worm Hole", "Backdoor"],
    a: 0,
    isCorrect: false,
  },
  {
    q: "question 7",
    c: ["choice 1", "choice 2", "choice 3", "choice 4"],
    a: 2,
    isCorrect: false,
  },
  {
    q: "question 8",
    c: ["choice 1", "choice 2", "choice 3", "choice 4"],
    a: 2,
    isCorrect: false,
  },
  {
    q: "question 9",
    c: ["choice 1", "choice 2", "choice 3", "choice 4"],
    a: 1,
    isCorrect: false,
  },
  {
    q: "question 10",
    c: ["choice 1", "choice 2", "choice 3", "choice 4"],
    a: 3,
    isCorrect: false,
  }
],
questCount : 0,
correct : false,
isAnswered : false,
correctAnswer : [],
incorrectAnswer : [],


reset: function(){
  questCount = 0;
},
postQuestion: function(){
  $("#question").empty();
  var questionP = $("<p>" + this.questions[this.questCount].q + "</p>");
  $("#question").append(questionP);
},
postChoices: function(){
  $("#choices").empty();
  for (var i = 0; i < this.questions[this.questCount].c.length; i++) {
    var btn = $("<button>");
    btn.addClass("button");
    btn.attr("data-choiceid", i);
    btn.text(this.questions[this.questCount].c[i]);
    $("#choices").append(btn);
    // $("#choices").append("<button" ">" + this.questions[questNum].c[i] + "</button");

  }
},
postAnswer: function(){
  $("#answer").empty();
  $("#question").empty();
  $("#choices").empty();
  if(this.correct){
    $("#answer").append("<p>congrats you are correct</p>");
    console.log("congrats you are correct");
  }
  else if (!this.correct){
    var tmpIndex = parseInt(this.questions[this.questCount].a);
    console.log("the correct answer is " + this.questions[this.questCount].c[tmpIndex]);
    $("#answer").append("<p>the correct answer: " + this.questions[this.questCount].c[tmpIndex] + "</p>");

  }
  this.questCount++;
},
checkAnswer: function(userAnswer){
  if(userAnswer === this.questions[this.questCount].a){
    this.correct = true;
    this.questions[this.questCount].isCorrect = true;
    this.correctAnswer.push(this.questions[this.questCount]);
  }
  else if (userAnswer !== this.questions[this.questCount].a){
    this.correct = false;
    this.questions[this.questCount].isCorrect = false;
    this.incorrectAnswer.push(this.questions[this.questCount]);

  }
},
postResult: function(){
  var grade = this.correctAnswer.length / this.questions.length;
  grade = grade.toFixed(2);
  grade = grade * 100;
  $("#answer").empty();

  $("#result").append("<p>grade: " + grade + "%</p>");
  $("#result").append("<p>correct: " + this.correctAnswer.length + "</p>");
  $("#result").append("<p>incorrect: " + this.incorrectAnswer.length + "</p>");

},
checkFinish: function(){
  if(this.questCount > 9){
    $("#question").empty();
    $("#choices").empty();
    this.postResult();
    stop();
  }
}
}

$(document).on("click", '.button', function(){
  var userAnswer = $(this).attr("data-choiceid");
  userAnswer = parseInt(userAnswer);
  triviaGame.checkAnswer(userAnswer);
  triviaGame.postAnswer();
  triviaGame.checkFinish();
  stop();
  run();
});

var number = 30;
var intervalId;
function run() {
  $("#start").empty();
  number = 30;
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000);
   setTimeout(function(){
     triviaGame.postQuestion();
     triviaGame.postChoices();

   }, 3000);
  // setTimeout(triviaGame.postChoices, 1000);

}
function decrement() {
  number--;
  $("#time-left").html("<h2>Time Remaining: \n" + number + "</h2>");
  if (number === 0) {
    triviaGame.checkAnswer();
    triviaGame.postAnswer();
    triviaGame.checkFinish();
    stop();
    run();
  }
}
function stop() {
  clearInterval(intervalId);
}
$("#start").on("click", function(){
  run();
})
// run();
