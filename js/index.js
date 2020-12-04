// const
const DATA = [
  {
    question: 'Question 1',
    answers: [
      {
        id: '1',
        value: 'Answer 1',
        correct: true
      },
      {
        id: '2',
        value: 'Answer 2',
        correct: false
      },
      {
        id: '3',
        value: 'Answer 3  ',
        correct: false
      },
    ]
  },
  {
    question: 'Question 2',
    answers: [
      {
        id: '4',
        value: 'Answer 4',
        correct: false
      },
      {
        id: '5',
        value: 'Answer 5',
        correct: true
      }
    ]
  },
  {
    question: 'Question 3',
    answers: [
      {
        id: '6',
        value: 'Answer 6',
        correct: true
      },
      {
        id: '7',
        value: 'Answer 7',
        correct: false
      }
    ]
  }
]

let localResults = {};

const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const indicator = document.getElementById('indicator');
const results = document.getElementById('results');
const btnNext = document.getElementById('next');
const btnRestart = document.getElementById('restart');

const renderQuestions = (index) => {
  renderIndicator(index + 1);

  questions.dataset.currStep = index;

  const renderAnswers = () => DATA[index].answers
    .map((answer) => `
      <li>
        <label>
          <input class='answer-input' type="radio" name=${index} value=${answer.id}>
          ${answer.value}
        </label>
      </li>
        `)
    .join('');

  questions.innerHTML = `
    <div class="quiz-questions-item">
      <div class="quiz-questions-item__question">${DATA[index].question}</div>
      <ul class="quiz-questions-item__answers">${renderAnswers()}</ul>
    </div>
  `
};
const renderResults = () => {
  let content = '';

  const getClassName = (answer, questionIndex) => {
    let className = '';

    if(!answer.correct && answer.id === localResults[questionIndex]) {
      className = 'answer--invalid';
    } else if (answer.correct) {
      className = 'answer--valid';
    }

    return className;
  }

  const getAnswers = (questionIndex) => DATA[questionIndex].answers
    .map(answer => `<li class=${getClassName(answer, questionIndex)}>${answer.value}</li>`)
    .join('');

  DATA.forEach((question, index) => {
    content += `
    <div class="quiz-results-item">
      <div class="quiz-results-item__question">${question.question}</div>
      <ul class="quiz-results-item__answers">${getAnswers(index)}</ul>
    </div>
    `;
  })
  results.innerHTML = content;
}

const renderIndicator = (currStep) => {
  indicator.innerHTML = `${currStep}/${DATA.length}`;
};

quiz.addEventListener('change', e => {
  // logic of answer
  if(e.target.classList.contains('answer-input')) {
    localResults[e.target.name] = e.target.value;
    btnNext.disabled = false;
  }
});

quiz.addEventListener('click', e => {
  // btns next and restart
  if(e.target.classList.contains('button-next')) {
    const nextQuestionIndex = +questions.dataset.currStep + 1;
    
    if(DATA.length === nextQuestionIndex) {
      // переход к результатам
      questions.classList.add('questions--hidden');
      indicator.classList.add('indicator--hidden');
      results.classList.add('results--visible');
      btnNext.classList.add('button-next--hidden');
      btnRestart.classList.add('button-restart--visible');

      renderResults();
    } else {
      // переход к след вопросу
      renderQuestions(nextQuestionIndex);
    }

    btnNext.disabled = true;
  }

  if(e.target.classList.contains('button-restart')) {
    localResults = {};
    results.innerHTML = '';

    questions.classList.remove('questions--hidden');
    indicator.classList.remove('indicator--hidden');
    results.classList.remove('results--visible');
    btnNext.classList.remove('button-next--hidden');
    btnRestart.classList.remove('button-restart--visible');

    renderQuestions(0)
  }
});
renderQuestions(0)