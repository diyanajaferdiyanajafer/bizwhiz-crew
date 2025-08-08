// Quiz questions array with mood values
const quizQuestions = [
    {
        id: 'q1',
        question: 'How would you describe your energy level today?',
        options: [
            {
                text: 'I feel very energetic and ready to go😎',
                value: 4,
                moods: { happy: 2, neutral: 0.5 }
            },
            {
                text: 'I have a decent amount of energy😌',
                value: 3,
                moods: { neutral: 1.5, happy: 0.5 }
            },
            {
                text: 'I feel a bit tired and low on energy😢',
                value: 2,
                moods: { bored: 1.5, sad: 0.5 }
            },
            {
                text: 'I feel completely drained and exhausted🥵',
                value: 1,
                moods: { sad: 1.5, angry: 0.5 }
            }
        ]
    },
    {
        id: 'q2',
        question: 'How often did you smile or laugh today?',
        options: [
            {
                text: 'Many times, I felt very happy😂',
                value: 4,
                moods: { happy: 2, neutral: 0.5 }
            },
            {
                text: 'A few times, I had some good moments😁',
                value: 3,
                moods: { neutral: 1.5, happy: 0.5 }
            },
            {
                text: 'Not much, I didn\'t feel like it🥺',
                value: 2,
                moods: { sad: 1.5, bored: 0.5 }
            },
            {
                text: 'Not at all, I haven\'t smiled today😭',
                value: 1,
                moods: { sad: 2, angry: 1 }
            }
        ]
    },
    {
        id: 'q3',
        question: 'How do you feel about your interactions with others today?',
        options: [
            {
                text: 'I enjoyed my interactions and felt connected🥳',
                value: 4,
                moods: { happy: 2, neutral: 0.5 }
            },
            {
                text: 'They were mostly neutral or fine☺️',
                value: 3,
                moods: { neutral: 2 }
            },
            {
                text: 'I felt a bit isolated or misunderstood☹️',
                value: 2,
                moods: { sad: 1, angry: 0.5, bored: 0.5 }
            },
            {
                text: 'I avoided interactions and felt lonely😣',
                value: 1,
                moods: { sad: 1.5, angry: 1 }
            }
        ]
    },
    {
        id: 'q4',
        question: 'How would you rate your general sense of well-being?',
        options: [
            {
                text: 'I feel excellent and optimistic about things🤩',
                value: 4,
                moods: { happy: 2, neutral: 0.5 }
            },
            {
                text: 'I feel alright, no major complaints😉',
                value: 3,
                moods: { neutral: 2 }
            },
            {
                text: 'I feel a bit down or unwell🫠',
                value: 2,
                moods: { sad: 1.5, bored: 0.5 }
            },
            {
                text: 'I feel distressed and very low☹️',
                value: 1,
                moods: { sad: 1.5, angry: 1 }
            }
        ]
    },
    {
        id: 'q5',
        question: 'How motivated are you to do your tasks or hobbies today?',
        options: [
            {
                text: 'Very motivated, I\'m excited to get things done🦾',
                value: 4,
                moods: { happy: 2, neutral: 0.5 }
            },
            {
                text: 'Somewhat motivated, I\'ll do what I need to👍',
                value: 3,
                moods: { neutral: 1.5 }
            },
            {
                text: 'Not very motivated, it\'s hard to start🫠',
                value: 2,
                moods: { bored: 2, sad: 0.5 }
            },
            {
                text: 'I have no motivation at all😑',
                value: 1,
                moods: { sad: 1, angry: 1, bored: 1 }
            }
        ]
    }
];

// Initialize mood scores
const moodScores = {
    happy: 0,
    sad: 0,
    angry: 0,
    bored: 0,
    neutral: 0
};

// Generate questions when the page loads
window.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('moodQuizForm');
    form.innerHTML = ''; // Clear existing questions

    quizQuestions.forEach((q, index) => {
        const questionGroup = document.createElement('div');
        questionGroup.className = 'question-group';
        
        questionGroup.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            <div class="answer-options">
                ${q.options.map(opt => `
                    <label>
                        <input type="radio" name="${q.id}" value="${opt.value}">
                        ${opt.text}
                    </label>
                `).join('')}
            </div>
        `;
        
        form.appendChild(questionGroup);
    });

    // Add submit button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'submit-btn';
    submitBtn.textContent = 'Submit and Discover My Mood';
    form.appendChild(submitBtn);
});

// Handle form submission
document.getElementById('moodQuizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Reset scores
    Object.keys(moodScores).forEach(mood => moodScores[mood] = 0);

    let answeredQuestions = 0;

    // Calculate scores based on answers
    quizQuestions.forEach(q => {
        const selectedAnswer = document.querySelector(`input[name="${q.id}"]:checked`);
        
        if (selectedAnswer) {
            answeredQuestions++;
            const value = parseInt(selectedAnswer.value);
            const option = q.options.find(opt => opt.value === value);
            
            // Add mood scores from the selected option
            Object.entries(option.moods).forEach(([mood, score]) => {
                moodScores[mood] += score;
            });
        }
    });

    // Check if all questions are answered
    if (answeredQuestions < quizQuestions.length) {
        alert("Please answer all the questions before submitting.");
        return;
    }

    // Normalize scores
    const totalScore = Object.values(moodScores).reduce((a, b) => a + b, 0);
    Object.keys(moodScores).forEach(mood => {
        moodScores[mood] = (moodScores[mood] / totalScore) * 100;
    });

    // Find dominant mood
    const dominantMood = Object.entries(moodScores).reduce((a, b) => a[1] > b[1] ? a : b)[0];

    // Create result message
    const resultDiv = document.getElementById('result');
    let moodMessage = '<div class="mood-results">';
    moodMessage += '<h2>Your Mood Analysis</h2>';
    moodMessage += '<div class="mood-bars">';
    
    Object.entries(moodScores)
        .sort((a, b) => b[1] - a[1])
        .forEach(([mood, score]) => {
            moodMessage += `
                <div class="mood-bar">
                    <div class="mood-label">${mood.charAt(0).toUpperCase() + mood.slice(1)}</div>
                    <div class="mood-progress">
                        <div class="mood-fill" style="width: ${score.toFixed(1)}%"></div>
                    </div>
                    <div class="mood-percentage">${score.toFixed(1)}%</div>
                </div>`;
        });
    
    moodMessage += '</div>';
    moodMessage += `<p class="dominant-mood">Your dominant mood appears to be <strong>${dominantMood.toUpperCase()}</strong></p>`;
    moodMessage += '</div>';

    resultDiv.innerHTML = moodMessage;
    resultDiv.style.display = 'block';

    // Store results in localStorage
    localStorage.setItem('moodResults', JSON.stringify({
        timestamp: new Date().toISOString(),
        scores: moodScores,
        dominantMood: dominantMood
    }));
});
