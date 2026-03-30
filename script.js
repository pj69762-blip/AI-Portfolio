// Smooth scroll for social links (if they become anchor links)
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // If it's an anchor link, prevent default and scroll smoothly
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Animate sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Add hover effect for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Chatbot functionality
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

// Debug: Check if elements exist
console.log('Chatbot elements:', {
    toggle: chatbotToggle,
    container: chatbotContainer,
    close: chatbotClose,
    input: chatbotInput,
    send: chatbotSend,
    messages: chatbotMessages
});

// Toggle chatbot
if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        console.log('Toggle clicked');
        chatbotContainer.classList.toggle('hidden');
    });
}

// Close chatbot
if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        console.log('Close clicked');
        chatbotContainer.classList.add('hidden');
    });
}

// Send message
function sendMessage() {
    console.log('sendMessage called');
    const message = chatbotInput.value.trim();
    if (message) {
        console.log('Sending message:', message);
        addMessage(message, 'user');
        chatbotInput.value = '';
        setTimeout(() => {
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 500);
    }
}

if (chatbotSend) {
    chatbotSend.addEventListener('click', () => {
        console.log('Send button clicked');
        sendMessage();
    });
}

if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            console.log('Enter pressed');
            sendMessage();
        }
    });
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Bot responses
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello! I'm Priyal's AI assistant. How can I help you learn more about their portfolio?";
    } else if (lowerMessage.includes('skills') || lowerMessage.includes('technologies')) {
        return "Priyal has skills in Python, TensorFlow, PyTorch, Machine Learning, Deep Learning, Computer Vision, NLP, and Data Science. They're currently learning more in their first year!";
    } else if (lowerMessage.includes('projects')) {
        return "Priyal is working on AI projects including image recognition, chatbots with NLP, and predictive analytics. As a first-year student, they're building their portfolio with exciting projects!";
    } else if (lowerMessage.includes('experience')) {
        return "Priyal is a first-year B.Tech student in AIML at Chhatrapati Shivaji Maharaj University. They're passionate about AI and actively participating in hackathons and developing innovative solutions.";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
        return "You can contact Priyal at priyal.jain@example.com or check out their LinkedIn, GitHub, and Twitter profiles!";
    } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
        return "Goodbye! Feel free to chat again if you have more questions about Priyal's portfolio.";
    } else {
        return "That's interesting! I'm still learning, but Priyal is passionate about AI and software engineering. What specific aspect of their work would you like to know more about?";
    }
}

// Initialize with welcome message
setTimeout(() => {
    addMessage("Hi there! 👋 I'm Priyal's AI assistant. Ask me about their skills, projects, or experience!", 'bot');
}, 1000);

// Skill tags animation
document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.style.animation = 'fadeInUp 0.6s ease forwards';
});

// Add keyframes for animations (via CSS injection for dynamic effects)
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Typing effect for the subtitle (optional)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Apply typing effect to the profile subtitle
const subtitle = document.querySelector('.profile-info p');
if (subtitle) {
    const originalText = subtitle.textContent;
    typeWriter(subtitle, originalText, 80);
}

// Contact button click effect
document.querySelector('.contact-btn')?.addEventListener('click', function(e) {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
});

// Lazy load images (for performance)
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));