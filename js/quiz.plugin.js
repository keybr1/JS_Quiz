(function() {
  this.QuizPlugin = function() {
    // default
    let defaults = {
      data: [],
      parentSelector: null,
    }

    if (arguments[0] && typeof arguments[0] === 'object') {
      this.options = extendDefaullts(defaults, arguments[0]);
    }
    // default + system
    // init
    this.init();
  };

  function extendDefaullts(source, properties) {
    let property;
    for(property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property]
      }
    }
    return source;
  }

  QuizPlugin.prototype.renderWrapper = function() {
    const { parentSelector } = this.options;
    parentSelector.innerHTML = `
      <div class="quiz">
        <div class="quiz-questions"></div>  
        <div class="quiz-indicator">1/10</div>
        <div class="quiz-results"></div>
        <div class="quiz-controls">
          <button class="button-next" disabled>Next</button>
          <button class="button-restart">New QUIZ</button>
        </div>
      </div>
    `;

    this.options.selector = {
        quiz: parentSelector.querySelector('.quiz'),
        questions: parentSelector.querySelector('.quiz-questions'),
        indicator: parentSelector.querySelector('.quiz-indicator'),
        results: parentSelector.querySelector('.quiz-results'),
        btnNext: parentSelector.querySelector('.button-next'),
        btnRestart: parentSelector.querySelector('.button-restart'),
    }
  }
  QuizPlugin.prototype.renderQuestions = function(index) {

    const { selector, data } = this.options;

    this.renderIndicator(index + 1);

    selector.questions.dataset.currStep = index;

    const renderAnswers = () => data[index].answers
      .map((answer) => `
        <li>
          <label>
            <input class='answer-input' type="radio" name=${index} value=${answer.id}>
            ${answer.value}
          </label>
        </li>
        `)
      .join('');

      selector.questions.innerHTML = `
      <div class="quiz-questions-item">
        <div class="quiz-questions-item__question">${data[index].question}</div>
        <ul class="quiz-questions-item__answers">${renderAnswers()}</ul>
      </div>
    `
  };


QuizPlugin.prototype.renderResults = function() {
    let content = '';
    const { options } = this;

    const getClassName = (answer, questionIndex) => {
      let className = '';

      if(!answer.correct && answer.id === options.localResults[questionIndex]) {
        className = 'answer--invalid';
      } else if (answer.correct) {
        className = 'answer--valid';
      }

      return className;
    }

    const getAnswers = (questionIndex) => options.data[questionIndex].answers
      .map(answer => `<li class=${getClassName(answer, questionIndex)}>${answer.value}</li>`)
      .join('');

    options.data.forEach((question, index) => {
      content += `
      <div class="quiz-results-item">
        <div class="quiz-results-item__question">${question.question}</div>
        <ul class="quiz-results-item__answers">${getAnswers(index)}</ul>
      </div>
      `;
    })
    options.selector.results.innerHTML = content;
  };

QuizPlugin.prototype.renderIndicator = function(currStep) {
    
    this.options.selector.indicator.innerHTML = `${currStep}/${this.options.data.length}`;
  };

QuizPlugin.prototype.addListeners = function() {
  const { selector } =  this.options;

  selector.quiz.addEventListener('change', e => {
    // logic of answer
    if(e.target.classList.contains('answer-input')) {
      this.options.localResults[e.target.name] = e.target.value;
      selector.btnNext.disabled = false;
    }
  });

  selector.quiz.addEventListener('click', e => {
    // btns next and restart
    if(e.target.classList.contains('button-next')) {
      const nextQuestionIndex = +selector.questions.dataset.currStep + 1;
      
      if(this.options.data.length === nextQuestionIndex) {
        // переход к результатам
        selector.questions.classList.add('questions--hidden');
        selector.indicator.classList.add('indicator--hidden');
        selector.results.classList.add('results--visible');
        selector.btnNext.classList.add('button-next--hidden');
        selector.btnRestart.classList.add('button-restart--visible');

        this.renderResults();
      } else {
        // переход к след вопросу
        this.renderQuestions(nextQuestionIndex);
      }

      this.options.selector.btnNext.disabled = true;
    }

    if(e.target.classList.contains('button-restart')) {
      this.options.localResults = {};
      selector.results.innerHTML = '';

      selector.questions.classList.remove('questions--hidden');
      selector.indicator.classList.remove('indicator--hidden');
      selector.results.classList.remove('results--visible');
      selector.btnNext.classList.remove('button-next--hidden');
      selector.btnRestart.classList.remove('button-restart--visible');

      this.renderQuestions(0)
    }
  });
};


  QuizPlugin.prototype.init = function() {
    const { data, parentSelector} = this.options;
    if(!parentSelector) {
      throw Error(`Element ${parentSelector} did not find`)
    }

    if(!data.length) {
      throw Error(`Data did not find`)
    }
    
    this.options.localResults = {};
    this.renderWrapper();
    this.addListeners();
    this.renderQuestions(0)
  }

}())