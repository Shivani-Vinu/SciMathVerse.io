const containerDiv = document.getElementById('container');
const paper = document.getElementById('paper');
const can = document.getElementById('cans');
const plastic = document.getElementById('plastic');
const banana = document.getElementById('general');
const aTrash = [paper, can, plastic, banana];
const value = { PAPER: "paper", PLASTIC: "plastic", GENERAL: "general", CANS: "cans" };
const spawnInterval = 250;
const lifespan = 5000;
let score1 = 0;
const bins = document.getElementById('Bins');
const scoreboard = document.getElementById('scoreboard');

function makeDraggable(clone) {
    let offsetX, offsetY;
    let isDragging = false;

    clone.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - clone.getBoundingClientRect().left;
        offsetY = e.clientY - clone.getBoundingClientRect().top;
        clone.style.cursor = 'grabbing';
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            clone.style.cursor = 'grab';
            

            setTimeout(() => {
              if (containerDiv.contains(clone)) {
                containerDiv.removeChild(clone); // Check if clone is a child of containerDiv
            }
            }, lifespan);
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const newX = e.clientX - offsetX - containerDiv.getBoundingClientRect().left;
            const newY = e.clientY - offsetY - containerDiv.getBoundingClientRect().top;

            const maxX = containerDiv.clientWidth - clone.offsetWidth;
            const maxY = containerDiv.clientHeight - clone.offsetHeight;

            // Constrain the element's movement within the container
            const clampedX = Math.min(maxX, Math.max(0, newX));
            const clampedY = Math.min(maxY, Math.max(0, newY));

            // Update the element's position
            clone.style.left = clampedX + 'px';
            clone.style.top = clampedY + 'px';
        }
    });
}

function trashspawn() {
    let num = Math.floor(Math.random() * aTrash.length);
    let obj = aTrash[num];
    const clone = obj.cloneNode(true);
    let isBeingDragged = false;

    // Make the cloned element visible
    clone.style.display = 'block';
    clone.style.position = 'absolute';
    clone.style.cursor = 'grab';

    // Set position for the cloned element within the path
    const containerWidth = 750;
    const containerHeight = 180;
    const maxX = containerWidth - clone.offsetWidth;
    const maxY = containerHeight - clone.offsetHeight;

    clone.style.position = 'absolute';
    clone.style.left = Math.floor(Math.random() * maxX) + 'px';
    clone.style.top = Math.floor(Math.random() * maxY) + 180 + 'px';

    makeDraggable(clone);

    containerDiv.appendChild(clone);

    // Set the "isBeingDragged" flag when the element is grabbed
    clone.addEventListener('mousedown', () => {
        isBeingDragged = true;
    });

    // Clear the "isBeingDragged" flag when the drag ends
    document.addEventListener('mouseup', () => {
        isBeingDragged = false;
    });

    // Start the deletion timer only if the element is not being dragged
    setTimeout(() => {
        if (!isBeingDragged) {
            if (containerDiv.contains(clone)) {
                containerDiv.removeChild(clone); // Check if clone is a child of containerDiv
            }
        }
    }, lifespan);
}

setInterval(trashspawn, spawnInterval);




bins.addEventListener('dragover', (e) => {
    e.preventDefault();
});

bins.addEventListener('drop', (e) => {
    e.preventDefault();
    const binName = e.target.id.toUpperCase(); // Convert binName to uppercase
    const draggedElement = document.querySelector('.container > img');

    if (draggedElement) {
        const trashType = draggedElement.id.toUpperCase(); // Convert trashType to uppercase
        if (binName === trashType) {
            // Correct bin, add to score
            score1 += 1;
        } else {
            // Incorrect bin, do nothing with the score
        }

        // Update the scoreboard
        scoreboard.textContent = `Score: ${score1}`;

        // Remove the dropped element
        draggedElement.remove();
    }
});


const phSpeedometer = document.getElementById("phSpeedometer");
        const phValue = document.getElementById("phValue");
        const substanceName = document.getElementById("substanceName");
        const substanceType = document.getElementById("substanceType");

        phSpeedometer.addEventListener("dragover", function(e) {
            e.preventDefault();
        });

        phSpeedometer.addEventListener("drop", function(e) {
            e.preventDefault();
            const ph = e.dataTransfer.getData("text");
            const name = e.dataTransfer.getData("name");
            phValue.textContent = ph === '0' ? '0' : (ph === '7' ? 'Neutral' : ph);
            phSpeedometer.style.backgroundColor = getPhColor(ph);
            substanceName.textContent = name;
            substanceType.textContent = ph === '0' ? "Acidic" : (ph === '7' ? "Neutral" : (ph <= 7 ? "Acidic" : "Basic"));
        });

        const draggableItems = document.querySelectorAll(".draggable");

        draggableItems.forEach(item => {
            item.addEventListener("dragstart", function(e) {
                e.dataTransfer.setData("text", item.getAttribute("data-ph"));
                e.dataTransfer.setData("name", item.getAttribute("data-name"));
            });
        });

        function getPhColor(ph) {
            const colors = [
                "red", "pink", "orange", "beige", "yellow", "limegreen", "green", "darkgreen",
                "turquoise", "paleblue", "blue", "darkblue", "violet", "purple"
            ];
            // Ensure pH is within the valid range (0 to 14)
            ph = Math.min(14, Math.max(0, ph));
            return colors[Math.round(ph)];
        }
        // ...
        const quizData = [
            {
              question: "In which year the term ‘Sustainable Development’ came into existence?",
              options: ["1987", "1980", "1978", "1992"],
              answer: "1980"
            },
            {
              question: "What is the full form of SDG (by the UN)?",
              options: ["Sustainable Development Goals", "Summing division geometry", "Saving development goose", "Sustaining democracy goals"],
              answer: "Sustainable Development Goals"
            },
            {
              question: "Which planet is known as the Red Planet?",
              options: ["Mars", "Venus", "Jupiter", "Saturn"],
              answer: "Mars"
            },
            {
                question: "How many SDG goals are there?",
                options: ["15", "7", "17", "12"],
                answer: "17"
            },
            {
                question: "What is the normal ph level ( neutral) ?",
                options: ["4", "9", "7", "0"],
                answer: "7"
            },
            {
                question: "Which gas is most present on the earths atmosphere?",
                options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"],
                answer: "Nitrogen"
            }
          ];
          
          let currentQuestion = 0;
          let score = 0;
          
          const questionElement = document.getElementById("question");
          const optionsElement = document.getElementById("options");
          const checkButton = document.getElementById("checkButton");
          const nextButton = document.getElementById("nextButton");
          const answerFeedback = document.getElementById("answerFeedback");
          const scoreElement = document.getElementById("score"); // Define scoreElement
          
          checkButton.addEventListener("click", checkAnswer);
          nextButton.addEventListener("click", loadNextQuestion);
          
          function loadQuestion() {
            const question = quizData[currentQuestion];
            questionElement.innerText = question.question;
            optionsElement.innerHTML = "";
          
            for (const option of question.options) {
              const optionItem = document.createElement("li");
          
              // Add a checkbox for each option
              const checkbox = document.createElement("input");
              checkbox.type = "checkbox";
              checkbox.className = "option-checkbox";
              optionItem.appendChild(checkbox);
          
              optionItem.innerHTML += option; // Display the option text
          
              optionsElement.appendChild(optionItem);
            }
          
            answerFeedback.innerText = ""; // Clear previous feedback
            nextButton.disabled = true; // Disable the "Next" button
          }
          
          function checkAnswer() {
            const question = quizData[currentQuestion];
            const checkboxes = document.querySelectorAll(".option-checkbox");
            let selectedAnswer = null;
          
            checkboxes.forEach((checkbox, index) => {
              if (checkbox.checked) {
                selectedAnswer = question.options[index];
              }
            });
          
            if (selectedAnswer === question.answer) {
              answerFeedback.innerText = "Correct! +1 point";
              score++;
            } else {
              answerFeedback.innerText = `Wrong! The correct answer is: ${question.answer}`;
            }
          
            // Disable checkboxes after checking
            checkboxes.forEach((checkbox) => {
              checkbox.disabled = true;
            });
          
            // Update the score
            scoreElement.innerText = `Score: ${score}`;
            nextButton.disabled = false; // Enable the "Next" button
          }
          
          function loadNextQuestion() {
            if (currentQuestion < quizData.length - 1) {
              currentQuestion++;
              loadQuestion();
          
              // Clear the answer feedback and enable checkboxes for the new question
              answerFeedback.innerText = "";
              const checkboxes = document.querySelectorAll(".option-checkbox");
              checkboxes.forEach((checkbox) => {
                checkbox.checked = false;
                checkbox.disabled = false;
              });
            } else {
              questionElement.innerText = "Quiz completed!";
              optionsElement.innerHTML = "";
              checkButton.disabled = true;
              nextButton.disabled = true;
              answerFeedback.innerText = `Final Score: ${score}`;
            }
          }
          
          loadQuestion();
          
          
  

  
