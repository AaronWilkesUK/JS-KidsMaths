const addLink = document.getElementById("add");
const subtractLink = document.getElementById("subtract");
const multiplyLink = document.getElementById("multiply");
const divideLink = document.getElementById("divide");
const answerOne = document.getElementById("answer-one");
const answerTwo = document.getElementById("answer-two");
const answerThree = document.getElementById("answer-three");
const numberOne = document.getElementById("number-one");
const numberTwo = document.getElementById("number-two");
const operator = document.getElementById("operator");
const score = document.getElementById("score");
const total = document.getElementById("total");
const reset = document.getElementById("reset");
const sound = document.getElementById("answerSound");

const correctSound = "../sounds/correct.mp3";
const wrongSound = "../sounds/wrong.mp3";

let globalOperator = "+";
let globalAnswer = 0;
let globalTotal = 0;
let globalScore = 0;

const MathsGame = {
    selectAdd() {
        subtractLink.classList.remove("selected");
        multiplyLink.classList.remove("selected");
        divideLink.classList.remove("selected");
        addLink.classList.add("selected");
        globalOperator = "+";
        this.getNewQuestion();
    },
    selectSubtract() {
        addLink.classList.remove("selected");
        multiplyLink.classList.remove("selected");
        divideLink.classList.remove("selected");
        subtractLink.classList.add("selected");
        globalOperator = "-";
        this.getNewQuestion();
    },
    selectMultiply() {
        subtractLink.classList.remove("selected");
        addLink.classList.remove("selected");
        divideLink.classList.remove("selected");
        multiplyLink.classList.add("selected");
        globalOperator = "*";
        this.getNewQuestion();
    },
    selectDivide() {
        subtractLink.classList.remove("selected");
        addLink.classList.remove("selected");
        multiplyLink.classList.remove("selected");
        divideLink.classList.add("selected");
        globalOperator = "/";
        this.getNewQuestion();
    },
    getNewQuestion() {
        let answers = [];
        operator.innerHTML = globalOperator;
        let number_one = this.generateRandomNumber(13);
        let number_two = this.generateRandomNumber(13);
        let random_answer_one = this.generateRandomNumber(13);
        let random_answer_two = this.generateRandomNumber(13);
        
        switch(globalOperator) {
            case "+":
                globalAnswer = number_one + number_two;
                answers = [globalAnswer, random_answer_one, random_answer_two];
                answers = this.shuffleAnswers(answers);
                this.displayNumbers(number_one, number_two);
                this.displayAnswers(answers);
                break;
            case "-":
                if(number_one < number_two) {
                    let tmp = number_two;
                    number_two = number_one;
                    number_one = tmp;
                }
                globalAnswer = number_one - number_two;
                answers = [globalAnswer, random_answer_one, random_answer_two];
                answers = this.shuffleAnswers(answers);
                this.displayNumbers(number_one, number_two);
                this.displayAnswers(answers);
                break;
            case "*":
                globalAnswer = number_one * number_two;
                answers = [globalAnswer, random_answer_one, random_answer_two];
                answers = this.shuffleAnswers(answers);
                this.displayNumbers(number_one, number_two);
                this.displayAnswers(answers);
                break;
            case "/":
                if(number_one < number_two) {
                    let tmp = number_two;
                    number_two = number_one;
                    number_one = tmp;
                }
                globalAnswer = (number_one / number_two) >> 0;
                answers = [globalAnswer, random_answer_one, random_answer_two];
                answers = this.shuffleAnswers(answers);
                this.displayNumbers(number_one, number_two);
                this.displayAnswers(answers);
                break;
        }
    },
    generateRandomNumber(maxNum) {
        const randomNum = (Math.floor(Math.random() * (maxNum + 1)));
        return randomNum > 0 ? randomNum : randomNum + 1;
    },
    shuffleAnswers(answers) {
        let shuffled = [];
        for(i = answers.length; i--;) {
            shuffled = [...shuffled, answers.splice(Math.floor(Math.random() * (i + 1)), 1)[0]];
        }
        return shuffled;
    },
    displayNumbers(number_one, number_two) {
        numberOne.innerHTML = number_one;
        numberTwo.innerHTML = number_two;
    },
    displayAnswers(answers) {
        answerOne.innerHTML = answers[0];
        answerTwo.innerHTML = answers[1];
        answerThree.innerHTML = answers[2];
    },
    updateScores() {
        total.innerHTML = globalTotal;
        score.innerHTML = globalScore;
        this.saveScores();
    },
    resetScores() {
        globalScore = 0;
        globalTotal = 0;
        this.updateScores();
    },
    rightAnswer() {
        sound.src = correctSound;
        sound.play();
        globalTotal++;
        globalScore++;
        this.updateScores();
        this.getNewQuestion();
    },
    wrongAnswer() {
        sound.src = wrongSound;
        sound.play();
        globalTotal++;
        this.updateScores();
        this.getNewQuestion();
    },
    saveScores() {
        const scores = [globalScore, globalTotal];
        localStorage.setItem("mathsforkids", JSON.stringify(scores));
    },
    loadScores() {
        const scores = JSON.parse(localStorage.getItem("mathsforkids"));
        if(scores !== null) {
            globalTotal = scores[0] || 0;
            globalScore = scores[1] || 0;
            this.updateScores();
        }
    },
}

document.addEventListener("DOMContentLoaded", () => {
    addLink && addLink.addEventListener("click", (e) => {
        MathsGame.selectAdd()
    })
    subtractLink && subtractLink.addEventListener("click", (e) => {
        MathsGame.selectSubtract()
    })
    multiplyLink && multiplyLink.addEventListener("click", (e) => {
        MathsGame.selectMultiply()
    })
    divideLink && divideLink.addEventListener("click", (e) => {
        MathsGame.selectDivide()
    })
    answerOne && answerOne.addEventListener("click", (e) => {
        if(answerOne.innerHTML == globalAnswer) {
            MathsGame.rightAnswer();
        } else {
            MathsGame.wrongAnswer();
        }
    })
    answerTwo && answerTwo.addEventListener("click", (e) => {
        if(answerTwo.innerHTML == globalAnswer) {
            MathsGame.rightAnswer();
        } else {
            MathsGame.wrongAnswer();
        }
    })
    answerThree && answerThree.addEventListener("click", (e) => {
        if(answerThree.innerHTML == globalAnswer) {
            MathsGame.rightAnswer();
        } else {
            MathsGame.wrongAnswer();
        }
    })
    reset && reset.addEventListener("click", (e) => {
        MathsGame.resetScores();
    })
    MathsGame.loadScores();
    MathsGame.getNewQuestion();
})