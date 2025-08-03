// Calculator JavaScript
let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';
let shouldResetDisplay = false;

// Function to append numbers and operators to display
function appendToDisplay(value) {
    const displayElement = document.getElementById('display');
    
    if (shouldResetDisplay) {
        displayElement.value = '';
        shouldResetDisplay = false;
    }
    
    // Prevent multiple decimal points
    if (value === '.' && displayElement.value.includes('.')) {
        return;
    }
    
    // Prevent multiple operators in a row
    if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(displayElement.value.slice(-1))) {
        displayElement.value = displayElement.value.slice(0, -1) + value;
        return;
    }
    
    displayElement.value += value;
    
    // Add visual feedback
    addButtonFeedback();
}

// Function to clear the display
function clearDisplay() {
    const displayElement = document.getElementById('display');
    displayElement.value = '';
    displayElement.classList.remove('error');
    currentInput = '';
    operator = '';
    previousInput = '';
    shouldResetDisplay = false;
    
    // Add visual feedback
    addButtonFeedback();
}

// Function to delete the last character
function deleteLast() {
    const displayElement = document.getElementById('display');
    displayElement.value = displayElement.value.slice(0, -1);
    displayElement.classList.remove('error');
    
    // Add visual feedback
    addButtonFeedback();
}

// Function to calculate the result
function calculateResult() {
    const displayElement = document.getElementById('display');
    let expression = displayElement.value;
    
    if (expression === '') {
        return;
    }
    
    try {
        // Replace × with * for evaluation
        expression = expression.replace(/×/g, '*');
        
        // Validate the expression to prevent code injection
        if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
            throw new Error('Invalid characters');
        }
        
        // Evaluate the expression
        let result = eval(expression);
        
        // Handle division by zero and other edge cases
        if (!isFinite(result)) {
            throw new Error('Invalid calculation');
        }
        
        // Round to prevent floating point precision issues
        result = Math.round(result * 100000000) / 100000000;
        
        displayElement.value = result.toString();
        shouldResetDisplay = true;
        
        // Add success animation
        displayElement.style.background = 'rgba(144, 238, 144, 0.9)';
        setTimeout(() => {
            displayElement.style.background = 'rgba(255, 255, 255, 0.9)';
        }, 300);
        
    } catch (error) {
        // Show error state
        displayElement.value = 'Error';
        displayElement.classList.add('error');
        shouldResetDisplay = true;
        
        // Auto-clear error after 2 seconds
        setTimeout(() => {
            clearDisplay();
        }, 2000);
    }
    
    // Add visual feedback
    addButtonFeedback();
}

// Function to add visual feedback to buttons
function addButtonFeedback() {
    // This function can be extended for additional visual effects
    console.log('Button pressed');
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers and operators
    if ('0123456789+-*/.'.includes(key)) {
        event.preventDefault();
        if (key === '*') {
            appendToDisplay('×');
        } else {
            appendToDisplay(key);
        }
    }
    
    // Enter or equals for calculation
    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculateResult();
    }
    
    // Backspace for delete
    if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
    
    // Escape or Delete for clear
    if (key === 'Escape' || key === 'Delete') {
        event.preventDefault();
        clearDisplay();
    }
});

// Add click sound effect (optional)
function playClickSound() {
    // Create audio context for click sound
    if (typeof(AudioContext) !== "undefined" || typeof(webkitAudioContext) !== "undefined") {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.1);
    }
}

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Play click sound (optional)
            // playClickSound();
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Advanced calculator functions (can be extended)
const AdvancedCalculator = {
    // Memory functions
    memory: 0,
    
    memoryStore: function(value) {
        this.memory = parseFloat(value) || 0;
    },
    
    memoryRecall: function() {
        return this.memory;
    },
    
    memoryClear: function() {
        this.memory = 0;
    },
    
    memoryAdd: function(value) {
        this.memory += parseFloat(value) || 0;
    },
    
    // Scientific functions (for future enhancement)
    sin: function(x) {
        return Math.sin(x * Math.PI / 180);
    },
    
    cos: function(x) {
        return Math.cos(x * Math.PI / 180);
    },
    
    tan: function(x) {
        return Math.tan(x * Math.PI / 180);
    },
    
    sqrt: function(x) {
        return Math.sqrt(x);
    },
    
    pow: function(x, y) {
        return Math.pow(x, y);
    },
    
    log: function(x) {
        return Math.log10(x);
    },
    
    ln: function(x) {
        return Math.log(x);
    }
};

// Initialize calculator
console.log('Calculator initialized successfully!');
console.log('Keyboard shortcuts:');
console.log('- Numbers and operators: Direct input');
console.log('- Enter/= : Calculate');
console.log('- Backspace: Delete last');
console.log('- Escape/Delete: Clear all');
