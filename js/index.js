// const
const DATA1 = [
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

const DATA2 = [
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
]


new QuizPlugin({
  data: DATA1,
  parentSelector: document.getElementById('quiz-1'),
});

new QuizPlugin({
  data: DATA2,
  parentSelector: document.getElementById('quiz-2'),
});