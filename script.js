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
    
    // Helper function to get random response from array
    function getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Create a unique identifier for the message to ensure variety
    const messageHash = lowerMessage.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
    
    // Check if this is a portfolio-related question
    const isPortfolioQuestion = 
        lowerMessage.includes('priyal') || 
        lowerMessage.includes('portfolio') || 
        lowerMessage.includes('skill') || 
        lowerMessage.includes('project') || 
        lowerMessage.includes('experience') || 
        lowerMessage.includes('contact') || 
        lowerMessage.includes('email') || 
        lowerMessage.includes('work') || 
        lowerMessage.includes('background') || 
        lowerMessage.includes('education') || 
        lowerMessage.includes('study') || 
        lowerMessage.includes('university') || 
        lowerMessage.includes('tech') || 
        lowerMessage.includes('ai') || 
        lowerMessage.includes('machine learning') || 
        lowerMessage.includes('software');
    
    // Portfolio-specific responses
    if (isPortfolioQuestion) {
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('greetings')) {
            const greetings = [
                "Hello! 👋 I'm Priyal's AI assistant. How can I help you learn more about their portfolio?",
                "Hi there! 😊 I'm here to tell you about Priyal's amazing work in AI and software engineering.",
                "Hey! Welcome to Priyal's portfolio. I'm their AI assistant - what would you like to know?",
                "Greetings! I'm Priyal's virtual assistant. Ask me anything about their skills and projects!",
                "Hello! Nice to meet you! I'm Priyal's AI helper. What interests you about their portfolio?"
            ];
            return getRandomResponse(greetings);
        } 
        
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('programming') || lowerMessage.includes('language')) {
            const skills = [
                "Priyal has skills in Python, TensorFlow, PyTorch, Machine Learning, Deep Learning, Computer Vision, NLP, and Data Science. They're currently learning more in their first year!",
                "Priyal is proficient in Python, TensorFlow, PyTorch, and various AI/ML frameworks. As a first-year student, they're rapidly expanding their technical expertise!",
                "Priyal specializes in AI technologies including Python, TensorFlow, PyTorch, Computer Vision, and NLP. They're passionate about mastering these tools!",
                "Priyal's technical stack includes Python, TensorFlow, PyTorch, Machine Learning algorithms, and Data Science tools. They're always learning new technologies!",
                "Priyal works with cutting-edge AI tools: Python for development, TensorFlow/PyTorch for deep learning, and specializes in computer vision and NLP applications."
            ];
            return getRandomResponse(skills);
        } 
        
        if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('build') || lowerMessage.includes('create') || lowerMessage.includes('develop')) {
            const projects = [
                "Priyal is working on AI projects including image recognition, chatbots with NLP, and predictive analytics. As a first-year student, they're building their portfolio with exciting projects!",
                "Priyal has developed AI image recognition systems, intelligent chatbots, and predictive analytics models. Check out their projects section for more details!",
                "Priyal's portfolio includes AI chatbot development, computer vision projects, and machine learning models for data analysis. They're just getting started!",
                "Priyal is passionate about AI projects! They've worked on image recognition, NLP chatbots, and predictive analytics - all showcased in their portfolio.",
                "Priyal's current projects feature advanced AI applications: from computer vision systems to conversational AI chatbots and data-driven predictive models."
            ];
            return getRandomResponse(projects);
        } 
        
        if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('university')) {
            const experience = [
                "Priyal is a first-year B.Tech student in AIML at Chhatrapati Shivaji Maharaj University. They're passionate about AI and actively participating in hackathons and developing innovative solutions.",
                "Priyal is currently in their first year of B.Tech in Artificial Intelligence and Machine Learning at Chhatrapati Shivaji Maharaj University. They're eager to make an impact in AI!",
                "As a first-year AIML student at Chhatrapati Shivaji Maharaj University, Priyal is building a strong foundation in AI while participating in hackathons and collaborative projects.",
                "Priyal is a dedicated first-year student pursuing B.Tech in AIML. They're actively engaged in AI communities and working on innovative solutions.",
                "Priyal studies Artificial Intelligence and Machine Learning at Chhatrapati Shivaji Maharaj University. They're in their first year and already showing great promise in the field!"
            ];
            return getRandomResponse(experience);
        } 
        
        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('connect') || lowerMessage.includes('linkedin') || lowerMessage.includes('github') || lowerMessage.includes('twitter')) {
            const contact = [
                "You can contact Priyal at priyal.jain@example.com or check out their LinkedIn, GitHub, and Twitter profiles!",
                "Reach out to Priyal via email at priyal.jain@example.com. You can also find them on LinkedIn, GitHub, and Twitter!",
                "Priyal's email is priyal.jain@example.com. Don't forget to check their social media profiles on LinkedIn, GitHub, and Twitter!",
                "For inquiries, email Priyal at priyal.jain@example.com. Connect with them professionally on LinkedIn or see their code on GitHub!",
                "Get in touch with Priyal through email (priyal.jain@example.com) or follow their professional journey on LinkedIn, GitHub, and Twitter!"
            ];
            return getRandomResponse(contact);
        } 
        
        if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you') || lowerMessage.includes('later') || lowerMessage.includes('talk')) {
            const goodbyes = [
                "Goodbye! 👋 Feel free to chat again if you have more questions about Priyal's portfolio.",
                "See you later! Don't hesitate to come back and ask more about Priyal's work.",
                "Take care! Priyal's portfolio is always here if you want to learn more.",
                "Bye for now! Thanks for chatting about Priyal's AI journey.",
                "Until next time! Priyal's portfolio has lots more to discover."
            ];
            return getRandomResponse(goodbyes);
        } 
        
        if (lowerMessage.includes('name') || lowerMessage.includes('who') || lowerMessage.includes('your') || lowerMessage.includes('you')) {
            const names = [
                "I'm Priyal Jain's AI assistant! Priyal is a first-year Software Engineering student passionate about AI and machine learning.",
                "My name is Priyal's AI Assistant! I help visitors learn about Priyal's portfolio and AI projects.",
                "I'm the AI assistant for Priyal Jain, a talented first-year student specializing in software engineering and AI.",
                "You can call me Priyal's AI Helper! Priyal is a first-year B.Tech student focused on AI and machine learning.",
                "I'm Priyal's digital assistant, here to showcase their work in artificial intelligence and software development."
            ];
            return getRandomResponse(names);
        } 
        
        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('appreciate')) {
            const thanks = [
                "You're welcome! 😊 Is there anything else you'd like to know about Priyal's portfolio?",
                "Happy to help! Priyal's work is impressive - feel free to ask more questions.",
                "No problem at all! Priyal is passionate about AI. What else interests you?",
                "Glad I could help! Priyal's portfolio has so much more to explore.",
                "My pleasure! Priyal's journey in AI is just beginning - ask away!"
            ];
            return getRandomResponse(thanks);
        }
        
        // Portfolio-specific default responses
        const portfolioDefaults = [
            "That's interesting! Tell me more about what you're looking for in Priyal's portfolio.",
            "I'm here to help! Priyal specializes in AI and machine learning. What specific aspect interests you?",
            "Great question! Priyal is building an impressive portfolio. Would you like to know about their skills, projects, or experience?",
            "I love that you're interested in Priyal's work! They're passionate about AI innovation. What would you like to explore?",
            "Thanks for chatting! Priyal is a talented first-year student. Ask me about their projects, skills, or background!",
            "That's a good point! Priyal is always learning new things in AI. What particular area are you curious about?",
            "Excellent question! Priyal's journey in AI is just beginning. Would you like details about their current projects?",
            "I appreciate your interest! Priyal combines software engineering with AI expertise. What would you like to discuss?"
        ];
        return getRandomResponse(portfolioDefaults);
    }
    
    // General conversation responses for any topic
    else {
        // Greetings
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('greetings')) {
            const generalGreetings = [
                "Hello! 👋 How can I help you today?",
                "Hi there! 😊 What can I assist you with?",
                "Hey! Nice to meet you! What's on your mind?",
                "Greetings! I'm here to help with any questions you have!",
                "Hello! I'm an AI assistant. How can I be of service?"
            ];
            return getRandomResponse(generalGreetings);
        }
        
        // Questions about AI/ML
        if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('machine learning') || lowerMessage.includes('ml')) {
            const aiResponses = [
                "AI is fascinating! Artificial Intelligence involves creating systems that can perform tasks that typically require human intelligence. What aspect interests you?",
                "Machine Learning is a subset of AI where systems learn from data without being explicitly programmed. It's powering many modern applications!",
                "AI and ML are revolutionizing industries! From computer vision to natural language processing, the possibilities are endless.",
                "I'm designed with AI capabilities! AI can help with problem-solving, pattern recognition, and automating complex tasks.",
                "That's a great topic! AI includes machine learning, deep learning, computer vision, and natural language processing. What would you like to know more about?"
            ];
            return getRandomResponse(aiResponses);
        }
        
        // Programming/Tech questions
        if (lowerMessage.includes('programming') || lowerMessage.includes('code') || lowerMessage.includes('javascript') || lowerMessage.includes('python') || lowerMessage.includes('web') || lowerMessage.includes('software')) {
            const techResponses = [
                "Programming is amazing! Whether it's Python, JavaScript, or other languages, coding lets you build incredible things. What are you working on?",
                "I love talking about programming! Different languages have different strengths - Python for AI, JavaScript for web development, and so on.",
                "Software development is creative and logical! From web apps to AI systems, there's always something new to learn and build.",
                "That's a great field! Programming involves problem-solving, creativity, and continuous learning. What programming language are you interested in?",
                "Code is powerful! It can create websites, apps, AI systems, and solve real-world problems. What kind of programming interests you?"
            ];
            return getRandomResponse(techResponses);
        }
        
        // General knowledge questions
        if (lowerMessage.includes('what') || lowerMessage.includes('how') || lowerMessage.includes('why') || lowerMessage.includes('when') || lowerMessage.includes('where')) {
            const knowledgeResponses = [
                "That's an interesting question! While I'm focused on helping with Priyal's portfolio, I can try to point you in the right direction for general knowledge.",
                "Great question! For detailed answers on that topic, I'd recommend checking reliable sources or doing some research. What specifically are you curious about?",
                "I appreciate your curiosity! That's a complex topic with many aspects. What particular angle interests you most?",
                "Excellent question! The answer can vary depending on context. Would you like me to help you explore this topic further?",
                "That's worth exploring! While I specialize in portfolio information, I can suggest some general approaches to finding answers to questions like this."
            ];
            return getRandomResponse(knowledgeResponses);
        }
        
        // Thanks and appreciation
        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('appreciate')) {
            const generalThanks = [
                "You're very welcome! 😊 Is there anything else I can help you with?",
                "Happy to help! Don't hesitate to ask if you have more questions.",
                "No problem at all! I'm here whenever you need assistance.",
                "Glad I could help! Feel free to ask anything else.",
                "My pleasure! I'm always ready to assist with any questions."
            ];
            return getRandomResponse(generalThanks);
        }
        
        // Goodbyes
        if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you') || lowerMessage.includes('later')) {
            const generalGoodbyes = [
                "Goodbye! 👋 Have a great day!",
                "See you later! Take care!",
                "Bye for now! Come back anytime.",
                "Until next time! Stay curious!",
                "Farewell! I'm here if you need me again."
            ];
            return getRandomResponse(generalGoodbyes);
        }
        
        // General conversational responses
        const generalResponses = [
            "That's interesting! Tell me more about what you're thinking.",
            "I see! I'm here to help with any questions you might have.",
            "Great topic! What specifically would you like to know about that?",
            "I appreciate you sharing that! Is there something particular you'd like to discuss?",
            "Thanks for chatting! I'm an AI assistant ready to help with various topics.",
            "That's a good point! I'd be happy to discuss this further with you.",
            "I understand! What aspect of this interests you the most?",
            "Excellent observation! Would you like to explore this topic more?",
            "That's worth considering! What are your thoughts on this?",
            "I agree that's important! How can I help you with this?",
            "That's fascinating! What made you interested in this topic?",
            "Good question! While I can provide general information, for specific details you might want to consult experts in that field.",
            "I can help with that! What specific information are you looking for?",
            "That's a complex topic! Would you like me to break it down for you?",
            "I'm glad you brought that up! What would you like to know more about?"
        ];
        
        // Use hash to ensure different questions get different responses
        const responseIndex = Math.abs(messageHash) % generalResponses.length;
        return generalResponses[responseIndex];
    }
}

// Remove the automatic welcome message - let users initiate conversation
// setTimeout(() => {
//     addMessage("Hi there! 👋 I'm Priyal's AI assistant. Ask me about their skills, projects, or experience!", 'bot');
// }, 1000);

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