const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "What is the highest mountain in the world?",
      choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
      answer: "Everest",
    },
    {
      question: "What is the largest country by area?",
      choices: ["Russia", "China", "Canada", "United States"],
      answer: "Russia",
    },
    {
      question: "Which is the largest planet in our solar system?",
      choices: ["Earth", "Jupiter", "Mars"],
      answer: "Jupiter",
    },
    {
      question: "What is the capital of Canada?",
      choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
      answer: "Ottawa",
    },
  ];
  
  function renderQuestions() {
    const questionsElement = document.getElementById('questions');
    const savedProgress = JSON.parse(sessionStorage.getItem('progress')) || [];
  
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const questionElement = document.createElement("div");
      const questionText = document.createTextNode(question.question);
      questionElement.appendChild(questionText);
  
      for (let j = 0; j < question.choices.length; j++) {
        const choice = question.choices[j];
        const choiceElement = document.createElement("input");
        choiceElement.setAttribute("type", "radio");
        choiceElement.setAttribute("name", `question-${i}`);
        choiceElement.setAttribute("value", choice);
  
        // Retain user selection after page refresh
        if (savedProgress[i] === choice) {
          choiceElement.setAttribute("checked", true);
        }
  
        const choiceText = document.createTextNode(choice);
        questionElement.appendChild(choiceElement);
        questionElement.appendChild(choiceText);
      }
  
      questionsElement.appendChild(questionElement);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const scoreDisplay = document.getElementById('score');
    const submitBtn = document.getElementById('submit');
  
    renderQuestions();
  
    // Save progress in session storage when an option is selected
    document.getElementById('questions').addEventListener('change', () => {
      const progress = [];
      for (let i = 0; i < questions.length; i++) {
        const selectedOption = document.querySelector(`input[name="question-${i}"]:checked`);
        progress[i] = selectedOption ? selectedOption.value : null;
      }
      sessionStorage.setItem('progress', JSON.stringify(progress));
    });
  
    submitBtn.addEventListener('click', () => {
      let score = 0;
      const progress = JSON.parse(sessionStorage.getItem('progress')) || [];
  
      for (let i = 0; i < questions.length; i++) {
        if (progress[i] === questions[i].answer) {
          score++;
        }
      }
      scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;
      localStorage.setItem('score', score);
    });
  });
  