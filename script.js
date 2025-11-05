// Preloader
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  gsap.to(pre, { autoAlpha: 0, duration: 0.7, ease: 'power2.out', onComplete: () => pre.remove() });
});

// Mobile nav toggle
const toggleBtn = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobileNav');
toggleBtn?.addEventListener('click', () => mobileNav.classList.toggle('show'));
mobileNav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href.startsWith('#') && href !== '#') {
      e.preventDefault();
      // Close mobile menu
      mobileNav.classList.remove('show');
      // Smooth scroll with offset
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Smooth scroll for desktop nav - navbar stays visible (sticky)
document.querySelectorAll('.nav a').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href.startsWith('#') && href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        // Scroll with offset to account for sticky navbar
        const offset = 80;
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a, .mobile-nav a');
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.clientHeight;
    if (window.scrollY >= top - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Close mobile nav on scroll (with delay to allow smooth scroll)
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    if (mobileNav?.classList.contains('show')) {
      mobileNav.classList.remove('show');
    }
  }, 300);
});

// Particles.js init
document.addEventListener('DOMContentLoaded', () => {
  if (window.particlesJS) {
    particlesJS('bg-particles', {
      particles: {
        number: { value: 70, density: { enable: true, value_area: 900 } },
        color: { value: ['#0a84ff', '#7c3aed', '#6aa8ff'] },
        shape: { type: 'circle' },
        opacity: { value: 0.6, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 140, color: '#4f6cae', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 1.1, random: true, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
        modes: { grab: { distance: 180, line_linked: { opacity: 0.6 } }, push: { particles_nb: 3 } }
      },
      retina_detect: true
    });
  }
});

// Typing effect
(function typingEffect(){
  const el = document.getElementById('typing');
  if (!el) return;
  const phrases = [
    'Full Stack Developer | Java Enthusiast | Machine Learning Explorer',
    'Java | React | Hibernate | MySQL',
    'Building fast, beautiful, and intelligent web apps'
  ];
  let idx = 0; let ch = 0; let deleting = false;
  function tick(){
    const full = phrases[idx];
    ch += deleting ? -1 : 1;
    el.textContent = full.substring(0, ch);
    if (!deleting && ch === full.length) { setTimeout(() => deleting = true, 1100); }
    if (deleting && ch === 0) { deleting = false; idx = (idx + 1) % phrases.length; }
    const delay = deleting ? 35 : 55;
    setTimeout(tick, delay);
  }
  tick();
})();

// GSAP global intro animations
window.addEventListener('DOMContentLoaded', () => {
  gsap.from('.avatar-wrap', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' });
  gsap.from('.intro h1', { y: 14, opacity: 0, duration: 0.6, delay: 0.1 });
  gsap.from('.intro h2', { y: 14, opacity: 0, duration: 0.6, delay: 0.25 });
  gsap.from('.cta .btn, .cta .socials a', { y: 16, opacity: 0, duration: 0.6, delay: 0.35, stagger: 0.08 });

  // ScrollTrigger animations
  if (gsap && gsap.registerPlugin) gsap.registerPlugin(ScrollTrigger);

  gsap.from('.about-photo', {
    x: -30, opacity: 0, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '.about-section', start: 'top 70%' }
  });
  gsap.from('.about-text', {
    x: 30, opacity: 0, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '.about-section', start: 'top 70%' }
  });

  gsap.utils.toArray('.edu-card').forEach((card, i) => {
    gsap.from(card, {
      y: 20, opacity: 0, duration: 0.6, delay: i * 0.08,
      scrollTrigger: { trigger: card, start: 'top 80%' }
    });
  });

  gsap.from('.skills-grid .skill', {
    opacity: 0, y: 16, duration: 0.5, stagger: 0.06,
    scrollTrigger: { trigger: '.skills-grid', start: 'top 75%' }
  });

  gsap.from('.projects-grid .project-card', {
    opacity: 0, y: 20, duration: 0.6, stagger: 0.1,
    scrollTrigger: { trigger: '.projects-grid', start: 'top 75%' }
  });

  gsap.from('.contact-section .form-wrap', {
    opacity: 0, y: 18, duration: 0.6,
    scrollTrigger: { trigger: '.contact-section', start: 'top 75%' }
  });
});

// Contact form -> WhatsApp redirect
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const status = document.getElementById('formStatus');
  const phone = '919959732476';
  const text = `Hello, I'm ${name}. Email: ${email}.%0A%0A${encodeURIComponent(message)}`;
  status.textContent = '✅ Message sent to WhatsApp!';
  setTimeout(() => {
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  }, 400);
  (e.target).reset();
});

// Back to top
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 600) toTop?.classList.add('show'); else toTop?.classList.remove('show');
});
toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Footer particles (simple bubbles)
(function footerBubbles(){
  const canvas = document.getElementById('footerParticles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const DPR = window.devicePixelRatio || 1;
  const bubbles = [];
  function resize(){
    canvas.width = canvas.clientWidth * DPR;
    canvas.height = canvas.clientHeight * DPR;
  }
  function create(){
    for (let i=0;i<30;i++) {
      bubbles.push({
        x: Math.random()*canvas.width,
        y: canvas.height + Math.random()*120,
        r: 2 + Math.random()*4,
        s: 0.2 + Math.random()*0.6,
        a: 0.2 + Math.random()*0.5
      });
    }
  }
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    bubbles.forEach(b => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(106,168,255,${b.a})`;
      ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
      ctx.fill();
      b.y -= b.s; if (b.y < -10) { b.y = canvas.height + 10; b.x = Math.random()*canvas.width; }
    });
    requestAnimationFrame(draw);
  }
  const ro = new ResizeObserver(() => { resize(); });
  ro.observe(canvas);
  resize(); create(); draw();
})();

// Custom cursor (desktop)
(function customCursor(){
  if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) return;
  const ring = document.querySelector('.cursor');
  const dot = document.querySelector('.cursor-dot');
  if (!ring || !dot) return;
  let x = window.innerWidth/2, y = window.innerHeight/2;
  let tx = x, ty = y;
  const setX = gsap.quickSetter(ring, 'x', 'px');
  const setY = gsap.quickSetter(ring, 'y', 'px');
  const setDX = gsap.quickSetter(dot, 'x', 'px');
  const setDY = gsap.quickSetter(dot, 'y', 'px');
  window.addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; });
  gsap.ticker.add(() => {
    tx += (x - tx) * 0.18;
    ty += (y - ty) * 0.18;
    setX(tx); setY(ty); setDX(x); setDY(y);
  });
  function hoverScale(v){ gsap.to(ring, { scale: v, duration: 0.2, ease: 'power2.out' }); }
  document.querySelectorAll('a, button, .btn, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => hoverScale(1.8));
    el.addEventListener('mouseleave', () => hoverScale(1));
  });
})();

// Sasi Bot Chat Widget
(function sasiBot(){
  const toggle = document.getElementById('chatToggle');
  const widget = document.getElementById('chatWidget');
  const closeBtn = document.getElementById('chatClose');
  const newChatBtn = document.getElementById('chatNew');
  const body = document.getElementById('chatBody');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatMessage');
  const pill = document.getElementById('chatPill');
  if (!toggle || !widget || !closeBtn || !body || !form || !input) return;

  function show(){
    widget.classList.add('show');
    toggle.setAttribute('aria-expanded', 'true');
    input.focus();
    greet();
  }
  function hide(){
    widget.classList.remove('show');
    toggle.setAttribute('aria-expanded', 'false');
  }
  function newChat(){
    body.innerHTML = '';
    greeted = false;
    greet();
    input.focus();
  }
  toggle.addEventListener('click', () => {
    if (widget.classList.contains('show')) hide(); else show();
  });
  closeBtn.addEventListener('click', hide);
  newChatBtn?.addEventListener('click', newChat);

  let greeted = false;
  function greet(){
    if (greeted) return; greeted = true;
    botMsg("Hello! I'm Sasi Bot, a helpful assistant specialized in Full Stack Development. I can answer questions about Madduri Sasindra's background, skills, projects, internships, and career goals.\n\nHow can I help you today? You can ask about:\n• Personal background and education\n• Technical skills and technologies\n• Projects (Fraud Detection, Farmer-to-Customer, Coffee Website)\n• Internship experience\n• AI tools and prompt engineering\n• Contact information" );
  }

  function scrollBottom(){ body.scrollTop = body.scrollHeight; }
  function msgEl(text, who){
    const el = document.createElement('div');
    el.className = `msg ${who}`;
    // Convert URLs to clickable links and preserve line breaks
    const html = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>').replace(/\n/g, '<br>');
    el.innerHTML = html;
    body.appendChild(el);
    scrollBottom();
  }
  const userMsg = (t) => msgEl(t, 'user');
  const botMsg = (t) => msgEl(t, 'bot');

  // Knowledge base (keyword intents)
  const kb = [
    // New Self Introduction & Personal Background (updated)
    { patterns: ['tell me about yourself','about yourself','about you','introduce','who are you'], answer: "My name is Sasindra, and I am a 2025 graduate in CSE from Krishna Chaitanya Institute of Technology & Sciences, Markapur. I have completed a Full Stack Web Development course from TAP Academy, where I worked on several frontend projects using HTML, CSS, and JavaScript, and hosted them on GitHub. I also worked as a freelance web designer for an SAP training institute, which helped me improve my practical experience and client communication. I am passionate about building clean and responsive websites and exploring AI tools like Claude, Wind Surf, Perplexity, Lovable, Leopard, etc., and I am currently looking for an opportunity to start my career as a Web Developer and contribute my skills to a growing organization. Thank you." },
    { patterns: ['inspired you to become a full stack','why full stack','become a full stack'], answer: "I enjoy both design and logic—creating websites that are beautiful on the front end and powerful on the back end. Full stack lets me handle both sides and bring complete ideas to life." },
    { patterns: ['keep yourself updated','updated with new technologies','how do you keep updated'], answer: "I explore AI tools daily, follow tech creators on LinkedIn and YouTube, and read documentation for frameworks like React, Spring Boot, and emerging AI technologies." },
    { patterns: ['key strengths','your strengths','strengths'], answer: "I’m a quick learner, self‑motivated, and consistent. I enjoy solving problems creatively and working on innovative projects." },
    { patterns: ['weakness','weaknesses'], answer: "Sometimes I focus too much on perfecting design details, but I’m improving my balance between speed and quality." },
    { patterns: ['handle challenges','challenges in a project'], answer: "I break challenges into smaller tasks, research solutions, and experiment with approaches until I find the best one." },
    { patterns: ['future career goals','future goals','career goals'], answer: "Become a professional full stack developer with expertise in AI integration and work on projects that merge web development with AI." },
    { patterns: ['why should we hire you','hire you'], answer: "I combine full stack skills with hands‑on projects and a strong interest in AI. I’m adaptable, eager to learn, and focused on real‑world solutions." },
    { patterns: ['what is prompt engineering','prompt engineering','about prompt'], answer: "Prompt engineering is crafting effective prompts to guide AI models like ChatGPT. I explore optimizing responses and integrating AI features into web apps." },
    { patterns: ['use ai tools','ai tools daily','ai in daily work'], answer: "I use AI tools to boost productivity—generating design ideas, debugging code, writing documentation, and learning new technologies faster." },
    { patterns: ['hello','hii','hi'], answer: "Hii I hope you are doing well! How can i help you today?" },


    // Project-Based HR — Fraud Detection
    { patterns: ['final year project','tell me about your final year project'], answer: "My final year project is ‘Online Fraud Transaction Detection using Machine Learning’. It identifies fraudulent financial transactions using ML (Python, Scikit‑learn, XGBoost, Pandas, NumPy, Matplotlib, Seaborn, Joblib, Streamlit)." },
    { patterns: ['what problem does your project solve','problem does your project solve'], answer: "Detects fraudulent transactions in real time to prevent financial loss, improving security in online payment systems using predictive modeling." },
    { patterns: ['what algorithm did you use','algorithm did you use','which algorithm'], answer: "I used supervised learning algorithms such as XGBoost and Random Forest to classify transactions as legitimate or fraudulent." },
    { patterns: ['challenges did you face','challenges you faced'], answer: "Imbalanced datasets and improving model accuracy. I used oversampling techniques and tuned hyperparameters to address them." },
    { patterns: ['technologies used in your project','project technologies','tech stack project'], answer: "Python 3.10.0; Libraries: Scikit‑learn, XGBoost, Pandas, NumPy, Matplotlib, Seaborn, Joblib; Framework: Streamlit; Tools: Jupyter Notebook." },
    { patterns: ['how does your fraud detection system work','how your fraud detection works','how it works'], answer: "The model takes transaction details as input, processes the data, and predicts whether it’s genuine or fraudulent based on trained ML patterns." },
    { patterns: ['deploy your ml model','how do you deploy','deployment'], answer: "I used Streamlit for deployment. It provides an interactive web interface to visualize predictions and insights." },

    // Coffee Website
    { patterns: ['coffee website project','tell me about your coffee website','coffee project'], answer: "I created a Coffee Shop Website using HTML, CSS, and JavaScript with an attractive home page, menu section, and contact form. It’s fully responsive with smooth animations and a creative cafe‑themed UI." },
    { patterns: ['features did you add','unique features coffee','what features coffee'], answer: "CSS animations, hover effects, responsive layouts, and a clean dark coffee‑themed color palette." },
    { patterns: ['what did you learn from this project','learn from coffee project'], answer: "Responsive design principles, cross‑browser compatibility, and creating engaging UX with animations." },

    // Farmer-to-Customer
    { patterns: ['farmer to customer','farmer-to-customer interface','farmer customer'], answer: "A website connecting farmers directly with customers, removing middlemen. Built with HTML, CSS, and JavaScript—showcase products, manage sales, and connect with buyers." },
    { patterns: ['your role in the project','role in project'], answer: "I designed and developed the complete frontend: home page, product catalog, and contact forms with responsive, user‑friendly UI." },
    { patterns: ['challenges did you face farmer','challenges farmer project'], answer: "Maintaining responsiveness across devices and smooth navigation; solved using CSS Flexbox and JavaScript event handling." },
    { patterns: ['main goal of this website','goal of the website'], answer: "Help farmers reach customers directly, improving transparency and fair pricing while promoting digital agriculture." },

    // General project/skills
    { patterns: ['showcase your skills','how do these projects showcase','showcase skills'], answer: "They demonstrate frontend (HTML, CSS, JS, React) and backend (Java, MySQL) skills, ML integration, and responsive, practical web apps." },
    { patterns: ['plans for future projects','future projects'], answer: "Build AI‑integrated web apps and explore how prompt engineering and ML can enhance user experiences in full stack projects." },
    { patterns: ['manage multiple projects','multiple projects'], answer: "I set timelines, use GitHub for version control, and follow a task‑based approach with documentation." },
    { patterns: ['collaborate with others','collaboration'], answer: "I communicate via GitHub and Google Meet, share updates, and ensure clarity on roles and responsibilities." },
    { patterns: ['currently exploring','currently learning','what are you learning'], answer: "Exploring AI tools and prompt engineering—using LLMs like ChatGPT for automation, content creation, and productivity in dev workflows." },
    { patterns: ['ai interests support your web development','ai support web development','ai support dev'], answer: "AI helps automate repetitive tasks, generate UI ideas, and learn advanced topics faster—making development more efficient and creative." },
    { patterns: ['where are you from','from where','location','based','btm layout','bangalore'], answer: "I’m from Andhra Pradesh, India, and currently based in Bangalore, BTM Layout." },
    { patterns: ['strength','strengths','your strengths'], answer: "My strengths are consistency, curiosity to learn new technologies, teamwork, and strong problem-solving ability." },
    { patterns: ['weakness','weaknesses'], answer: "I sometimes spend too much time perfecting my projects, but I’m learning to balance speed and quality." },
    { patterns: ['stay updated','updated with technology','how do you stay updated'], answer: "I explore GitHub, LinkedIn tech posts, and YouTube tutorials on full‑stack tools and frameworks." },
    { patterns: ['why cse','why computer science','choose computer science'], answer: "I’ve always been curious about how websites and apps work. CSE gave me the foundation to turn that curiosity into real projects." },
    { patterns: ['hobbies'], answer: "Coding, exploring AI tools, video editing, and designing creative websites." },
    { patterns: ['describe yourself','one line'], answer: "A passionate full stack developer who believes in learning by building." },
    { patterns: ['motivates','motivation'], answer: "Seeing people use something I built and finding it useful motivates me to keep creating." },
    { patterns: ['handle stress','stress'], answer: "I take short breaks, listen to music, and then focus on solving the problem step by step." },
    { patterns: ['why should we hire you','hire you'], answer: "I have strong hands‑on experience with full‑stack development, internship experience, and the passion to keep improving." },
    { patterns: ['communication skills'], answer: "I have good communication and presentation skills developed through my internship and college projects." },
    { patterns: ['future goals','goals'], answer: "To become a senior full stack developer and contribute to building scalable and innovative applications." },
    { patterns: ['success'], answer: "Success means continuously learning, improving, and achieving goals step by step." },
    { patterns: ['work environment','environment'], answer: "A collaborative environment that encourages creativity and learning new technologies." },
    
  { patterns: ['business', 'about business', 'brand info'], answer: "We help businesses and individuals build professional, responsive, and creative websites that align with their goals." },

  { patterns: ['target audience', 'who is your audience'], answer: "Our target audience includes students, startups, freelancers, and business owners who want to establish an online presence." },

  { patterns: ['type of website', 'what type of website'], answer: "We create personal portfolios, business websites, e-commerce stores, and institute or training websites." },

  { patterns: ['color theme', 'design style', 'website design'], answer: "We offer customized design themes — modern, minimal, creative, or business-focused — based on client preferences." },

  { patterns: ['logo', 'need logo'], answer: "Yes, we design creative and professional logos as part of our branding services." },

  { patterns: ['animations', 'interactive', 'motion effects'], answer: "We add smooth animations, hover effects, and interactive transitions to make your website engaging and modern." },

  { patterns: ['features', 'website features'], answer: "Your website can include contact forms, portfolios, blogs, payment gateways, social links, and more based on your needs." },

  { patterns: ['responsive', 'mobile', 'seo optimized'], answer: "All our websites are fully responsive, SEO-friendly, and optimized for all devices." },

  { patterns: ['social media', 'social links', 'connect instagram'], answer: "We integrate LinkedIn, WhatsApp, Instagram, and GitHub links for easy client and customer connection." },

  { patterns: ['content', 'photos', 'videos', 'text'], answer: "You can provide your own content, or we can create professional visuals and copy for you." },

  { patterns: ['portfolio', 'projects showcase'], answer: "We include dedicated portfolio sections with project details, visuals, and links to GitHub or live demos." },

  { patterns: ['timeline', 'project duration', 'how long'], answer: "Most projects are completed within 1 to 3 weeks depending on the complexity and client feedback." },

  { patterns: ['budget', 'price', 'cost'], answer: "Our pricing is flexible and based on project scope — we offer affordable plans for students, startups, and small businesses." },

  { patterns: ['communication', 'contact method', 'talk'], answer: "You can reach us easily via WhatsApp, Email, or LinkedIn for updates and support." },

  { patterns: ['sample', 'demo', 'preview'], answer: "We provide a free demo or sample layout before full development to ensure design satisfaction." },

  { patterns: ['maintenance', 'support', 'after service'], answer: "Yes, we offer ongoing maintenance, updates, and technical support after project completion." },

  { patterns: ['seo', 'marketing', 'digital promotion'], answer: "We also provide SEO optimization, branding, and digital marketing services to boost online presence." },

  { patterns: ['work environment','environment'], answer: "A collaborative environment that encourages creativity and learning new technologies." },

  { patterns: ['progress', 'update', 'project status'], answer: "We share weekly progress reports or milestone updates, depending on your preference." },

  { patterns: ['collaboration', 'involve', 'participate'], answer: "Clients can be fully involved in the design process, giving feedback and suggestions at every step." },

  { patterns: ['tools', 'technologies', 'tech stack'], answer: "We use HTML, CSS, JavaScript, React, and other modern tools for frontend; and PHP or Node.js for backend." },

  { patterns: ['vertex solutions', 'about vertex', 'who are you'], answer: "Vertex Solutions is a creative tech startup offering web development, graphic design, branding, and automation services." },

  { patterns: ['ai', 'prompt engineering', 'chatbot'], answer: "We explore AI tools, prompt engineering, and chatbot creation to integrate smart automation into client solutions." },

  { patterns: ['portfolio website', 'personal website'], answer: "We design stunning portfolio websites for students and professionals with animations, contact forms, and project showcases." },
   { patterns: ['project name', 'what is your project', 'name of project'], answer: "My project name is 'Online Fraud Transaction Detection using Machine Learning'." },

  { patterns: ['project description', 'describe project', 'about project'], answer: "This project focuses on detecting fraudulent transactions in online payment systems using advanced machine learning algorithms to ensure secure digital transactions." },

  { patterns: ['objective', 'aim', 'goal of project'], answer: "The main objective of this project is to identify and prevent fraudulent financial transactions in real-time using data-driven machine learning models." },

  { patterns: ['motivation', 'why this project', 'why did you choose this project'], answer: "The motivation behind this project is the rapid increase in online fraud during the COVID-19 period, which highlighted the need for intelligent fraud detection systems." },

  { patterns: ['technologies used', 'tools used', 'what technologies used'], answer: "The project is built using Python, Streamlit, Scikit-learn, Pandas, and NumPy for data analysis and machine learning model building." },

  { patterns: ['language used', 'programming language'], answer: "The main programming language used for this project is Python 3.10.0." },

  { patterns: ['machine learning algorithm', 'which algorithm used', 'model used'], answer: "We used machine learning algorithms such as Logistic Regression, Random Forest, and XGBoost to classify transactions as genuine or fraudulent." },

  { patterns: ['dataset', 'data used', 'source of data'], answer: "The dataset used for training and testing contains transactional data with attributes like amount, location, and transaction type, which help in identifying fraud patterns." },

  { patterns: ['data preprocessing', 'how data cleaned', 'data handling'], answer: "Data preprocessing involved handling missing values, removing outliers, scaling numerical data, and encoding categorical variables for model training." },

  { patterns: ['model training', 'how you trained model', 'training phase'], answer: "The model was trained using supervised learning on labeled transaction data to distinguish between fraudulent and non-fraudulent transactions." },

  { patterns: ['accuracy', 'model performance', 'results'], answer: "The model achieved around 96% accuracy in detecting fraudulent transactions, showing high reliability in identifying anomalies." },

  { patterns: ['streamlit', 'deployment', 'frontend'], answer: "We used Streamlit to build an interactive web interface where users can input transaction details and instantly get fraud detection results." },

  { patterns: ['real time detection', 'live fraud detection'], answer: "Yes, the system can analyze transaction data in real-time and predict whether a transaction is suspicious or safe." },

  { patterns: ['features', 'project features'], answer: "Key features include fraud detection dashboard, visualization of transaction patterns, real-time prediction, and detailed fraud reports." },

  { patterns: ['visualization', 'graphs', 'charts'], answer: "Matplotlib and Seaborn were used to visualize transaction patterns, correlations, and fraud probability distributions." },

  { patterns: ['modules', 'project modules'], answer: "The project consists of modules like Data Collection, Data Preprocessing, Model Training, Fraud Prediction, and Web Deployment." },

  { patterns: ['result', 'output', 'project output'], answer: "The output displays whether the given transaction is 'Fraudulent' or 'Legitimate' based on trained model predictions." },

  { patterns: ['future scope', 'future improvement', 'future work'], answer: "In the future, this system can be integrated with banking systems for real-time fraud alerts and improved using deep learning models." },

  { patterns: ['application', 'real life use', 'usage'], answer: "This project can be used in online banking systems, e-commerce payment gateways, and digital wallets to prevent financial fraud." },

  { patterns: ['challenges', 'problems faced'], answer: "The main challenges were imbalanced datasets, feature selection, and tuning model parameters for high precision and recall." },

  { patterns: ['accuracy improvement', 'optimization', 'how improved'], answer: "Accuracy was improved by using XGBoost and Random Forest algorithms along with hyperparameter tuning techniques." },

  { patterns: ['dataset size', 'data records'], answer: "The dataset consisted of thousands of records of transactions with labeled fraud and non-fraud cases." },

  { patterns: ['output interface', 'user interface'], answer: "The user interface is designed using Streamlit, providing a clean, interactive dashboard for testing transactions." },

  { patterns: ['python libraries', 'libraries used'], answer: "We used Python libraries such as Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, and Streamlit." },

  { patterns: ['learning type', 'type of learning'], answer: "The project uses supervised machine learning since the model is trained on labeled data." },

  { patterns: ['testing', 'evaluation', 'model testing'], answer: "The model was evaluated using metrics such as Accuracy, Precision, Recall, F1-score, and ROC-AUC curve." },

  { patterns: ['innovation', 'unique idea'], answer: "The project’s unique feature is real-time fraud prediction integrated with an interactive web-based dashboard." },

  { patterns: ['team size', 'individual project'], answer: "This was an individual project handled by me, covering the entire workflow from data preprocessing to deployment." },

  { patterns: ['learning outcome', 'what you learned'], answer: "I learned how to handle real-world datasets, apply ML algorithms, and deploy models using Streamlit." },

  { patterns: ['project duration', 'how many days'], answer: "The project took approximately 3 weeks to complete, including data analysis, model building, and testing." },

  { patterns: ['fraud detection', 'how detect fraud'], answer: "Fraud detection is done by analyzing transaction features and identifying unusual patterns that differ from normal behavior." },

  { patterns: ['limitations', 'drawbacks'], answer: "The system requires frequent dataset updates to maintain accuracy as fraud patterns change over time." },

  { patterns: ['deployment platform', 'hosting'], answer: "The model was deployed locally using Streamlit, but it can also be hosted on platforms like Heroku or AWS." },

  { patterns: ['project domain', 'field'], answer: "The project falls under the domain of Machine Learning and Financial Security." },

  { patterns: ['tools used', 'software used'], answer: "Tools used include Jupyter Notebook for model building and Streamlit for frontend deployment." },
  // 🎯 MAIN ACADEMIC PROJECT
  { patterns: ['final year project', 'main project', 'btech project'], answer: "My final year project is 'Online Fraud Transaction Detection using Machine Learning'." },

  { patterns: ['online fraud detection', 'fraud detection project', 'fraud transaction project'], answer: "This project uses machine learning algorithms like Random Forest and XGBoost to detect and prevent fraudulent online transactions in real time." },

  { patterns: ['project objective', 'goal of fraud project'], answer: "The goal of the project is to identify fraudulent activities in online payments and provide secure transaction systems." },

  { patterns: ['tools used in fraud project', 'technologies used in fraud detection'], answer: "Technologies used: Python, Scikit-learn, Pandas, NumPy, Streamlit, and Matplotlib." },

  // 🌾 FARMER TO CUSTOMER PROJECT
  { patterns: ['farmer project', 'farmer to customer project', 'agriculture website'], answer: "The 'Farmer to Customer' project is a responsive website connecting farmers directly with consumers to sell fresh products without middlemen." },

  { patterns: ['farmer project technologies', 'farmer website tech'], answer: "The Farmer to Customer website is built using HTML, CSS, and JavaScript with an interactive and mobile-responsive design." },

  { patterns: ['farmer project features', 'farmer website features'], answer: "Features include product listings, farmer verification, payment options, and a blog section for farming tips." },

  // ☕ COFFEE WEBSITE PROJECT
  { patterns: ['coffee website', 'coffee project'], answer: "The Coffee Website project is a frontend e-commerce design that showcases coffee products with animated visuals and a modern UI." },

  { patterns: ['coffee project technologies', 'coffee site tech'], answer: "It is built using HTML, CSS, and JavaScript, focusing on UI animations and responsive layout." },

  { patterns: ['coffee project goal', 'purpose of coffee website'], answer: "The goal is to create a visually appealing web interface for a coffee business, suitable for online marketing and sales." },

  // 💼 PORTFOLIO WEBSITE
  { patterns: ['portfolio project', 'portfolio website', 'personal website'], answer: "My portfolio website showcases my skills, projects, certifications, and contact details with an animated landing page and responsive design." },

  { patterns: ['portfolio technologies', 'portfolio tools'], answer: "It is built using HTML, CSS, and JavaScript, and includes creative animations and contact integration with WhatsApp, LinkedIn, and GitHub." },

  // 🚀 VERTEX SOLUTIONS STARTUP
  { patterns: ['vertex solutions', 'about vertex', 'vertex project'], answer: "Vertex Solutions is my startup offering services like web development, logo design, thumbnail creation, resume building, and IT interview question support." },

  { patterns: ['vertex services', 'vertex work', 'vertex offerings'], answer: "Vertex Solutions provides portfolio creation, graphic design, resume building, video editing, photo editing, and website development for students and businesses." },

  // 🧠 AI TOOLS HUB
  { patterns: ['ai tools hub', 'ai tools project'], answer: "The AI Tools Hub website lists and categorizes trending AI tools with descriptions and links, helping users explore automation platforms easily." },

  { patterns: ['ai tools technologies', 'ai hub tech'], answer: "The AI Tools Hub is designed using HTML, CSS, and JavaScript with creative card-based animations and category filtering." },

  // 📚 PR ACADEMY WEBSITE
  { patterns: ['pr academy', 'training website', 'education project'], answer: "The PR Academy website is a responsive educational platform featuring sections like Home, Courses, Testimonials, and Contact." },

  { patterns: ['pr academy tech', 'training site tools'], answer: "It is built using HTML, CSS, and JavaScript with smooth navigation, modern UI, and responsive design." },

  // 🏢 BUSINESS WEBSITE PROJECT
  { patterns: ['business website', 'company website', 'client business site'], answer: "This project is a professional business website designed for startups, featuring landing pages, service details, portfolios, and contact sections." },

  { patterns: ['business website features', 'business project tech'], answer: "It includes background photos, animated sections, service descriptions, client showcases, and a contact form with social media integration." },

  // 🎨 3D ART GALLERY PROJECT
  { patterns: ['3d art gallery', 'virtual gallery', 'art project'], answer: "The Virtual 3D Art Gallery allows users to walk through a digital exhibition using arrow keys, view artworks, and read artist details." },

  { patterns: ['3d art tech', 'gallery tools'], answer: "It is built using HTML, CSS, JavaScript, and GSAP for 3D effects, with parallax scrolling and smooth transitions." },

  // 🌐 PROJECT MART PLATFORM
  { patterns: ['project mart', 'project selling website'], answer: "Project Mart is an online platform for developers to upload and sell their coding projects to students and clients." },

  { patterns: ['project mart tech', 'project mart stack'], answer: "Frontend: HTML, CSS, JS; Backend: PHP; it includes authentication, developer dashboard, and project upload functionality." },

  // 🤖 PROMPT ENGINEERING LEARNING
  { patterns: ['prompt engineering', 'ai prompt', 'ai learning'], answer: "I am also exploring Prompt Engineering — learning how to train and fine-tune AI chatbots to respond effectively to various user queries." },

  // 🧩 SKILL DEVELOPER WEBSITE
  { patterns: ['skill developer', '3d flip website'], answer: "Skill Developer is a 3D flip animated website targeting IT job aspirants, offering resources like interview questions, resume services, and portfolios." },

  // 🧠 COMMUNICATION & LEARNING
  { patterns: ['learning', 'skills', 'communication'], answer: "I am continuously improving my technical and communication skills while preparing for IT job interviews." },

  // 🔚 SUMMARY
  { patterns: ['all projects', 'list of projects', 'your projects'], answer: "My projects include: Online Fraud Detection, Farmer to Customer, Coffee Website, Portfolio Website, Vertex Solutions, PR Academy, AI Tools Hub, Project Mart, 3D Art Gallery, and Skill Developer." },

  { patterns: ['conclusion', 'final result'], answer: "The system effectively detects fraudulent transactions with high accuracy, helping improve online transaction security." },
  { patterns: ['feedback', 'review', 'testimonial'], answer: "We encourage all clients to share their feedback and testimonials, which help us improve and grow together." },



    // Frontend Q16–Q40
    { patterns: ['what is html','html stands for','about html'], answer: "HTML stands for HyperText Markup Language. It defines the structure and content of a webpage using tags." },
    { patterns: ['semantic elements','semantic html'], answer: "Semantic elements have meaningful names like <header>, <footer>, <article>, <section> which make code more readable and accessible." },
    { patterns: ['difference between div and span','div vs span','div and span'], answer: "<div> is a block‑level container; <span> is inline." },
    { patterns: ['what are attributes','html attributes'], answer: "Attributes provide additional information about HTML elements, like src, href, or alt." },
    { patterns: ['responsive layout','make responsive','responsiveness'], answer: "Use media queries, Bootstrap grid system, and flexible units like %, rem, and vh/vw." },
    { patterns: ['what is css','css used for'], answer: "CSS is used to style and layout web pages — controlling colors, fonts, spacing, and layout." },
    { patterns: ['padding and margin','difference padding margin'], answer: "Padding is space inside an element; margin is space outside it." },
    { patterns: ['z-index'], answer: "z-index determines the stacking order of elements along the z-axis." },
    { patterns: ['flexbox'], answer: "Flexbox is a CSS layout model for aligning and distributing space among items in a container." },
    { patterns: ['css grid','grid system css'], answer: "CSS Grid is a two‑dimensional layout system for creating complex web layouts easily." },
    { patterns: ['what is javascript','about javascript','js is'], answer: "JavaScript is a scripting language that makes web pages interactive and dynamic." },
    { patterns: ['variables in javascript','js variables','var let const'], answer: "Variables store data values, declared using var, let, or const." },
    { patterns: ['difference between == and ===','== vs ==='], answer: "== checks value only (loose equality); === checks both value and type (strict)." },
    { patterns: ['javascript data types','js data types'], answer: "Number, String, Boolean, Object, Undefined, Null, and Symbol." },
    { patterns: ['what is dom','dom'], answer: "The DOM represents HTML as a tree structure so JavaScript can manipulate it." },
    { patterns: ['events in javascript','js events'], answer: "Events are user actions like click, hover, or input that can trigger JavaScript functions." },
    { patterns: ['what is react','about react'], answer: "React is a JavaScript library for building user interfaces using reusable components." },
    { patterns: ['react components','what are components'], answer: "Components are independent, reusable pieces of UI that return JSX." },
    { patterns: ['what is jsx','jsx'], answer: "JSX is a JavaScript syntax extension that lets you write HTML-like markup inside JavaScript." },
    { patterns: ['virtual dom','what is virtual dom'], answer: "The virtual DOM is a lightweight copy of the real DOM that React uses to optimize rendering." },
    { patterns: ['state and props','difference state props'], answer: "Props are read‑only inputs to a component; state holds data that can change over time." },
    { patterns: ['hooks in react','react hooks','usestate','useeffect'], answer: "Hooks like useState and useEffect let you use state and lifecycle features in functional components." },
    { patterns: ['what is bootstrap','bootstrap used for'], answer: "Bootstrap is a front‑end framework for responsive, mobile‑first web development." },
    { patterns: ['grid system in bootstrap','bootstrap grid'], answer: "Bootstrap uses a 12‑column grid system to structure responsive designs." },
    { patterns: ['difference inline internal external css','inline internal external css'], answer: "Inline CSS is inside tags; internal CSS is inside a <style> tag; external CSS is in a .css file." },

    // General short intents
    { patterns: ['resume','cv'], answer: "You can download my resume from the Home section (Download Resume button)." },
    { patterns: ['skills'], answer: "Key skills: HTML, CSS, JavaScript, Java, Hibernate, J2EE, JSP, React, Bootstrap, MySQL." },
    { patterns: ['projects'], answer: "Projects: Fraud Transaction Detection, Farmer to Customer Interface, Coffee Website." },
    { patterns: ['contact','email','phone'], answer: "Contact Details:\n📱 WhatsApp: https://wa.me/919959732476\n📞 Phone: +91 9959732476\n📧 Email: sasindragandla@gmail.com\n📍 Location: Bangalore, BTM Layout" },
    { patterns: ['linkedin','github'], answer: "LinkedIn: linkedin.com/in/sasindra-madduri\nGitHub: github.com/sasindra143" }
  ];

  // Enhanced matching with synonyms and fuzzy matching
  const synonyms = {
    'resume': ['cv', 'curriculum vitae', 'biodata'],
    'skills': ['abilities', 'capabilities', 'expertise', 'technologies'],
    'projects': ['work', 'portfolio', 'applications', 'apps'],
    'contact': ['email', 'phone', 'reach', 'get in touch', 'phone number'],
    'about': ['about yourself', 'tell me about', 'who are you', 'introduce'],
    'experience': ['work experience', 'background', 'internship'],
    'education': ['qualification', 'degree', 'college', 'university'],
    'html': ['html5', 'hypertext'],
    'css': ['stylesheet', 'styling'],
    'javascript': ['js', 'ecmascript'],
    'react': ['reactjs', 'react.js'],
    'bootstrap': ['bootstrap framework'],
    'machine learning': ['ml', 'ai', 'artificial intelligence'],
    'fraud': ['fraudulent', 'fraud detection'],
    'deploy': ['deployment', 'hosting', 'publish']
  };

  function normalizeText(text) {
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function expandSynonyms(text) {
    const normalized = normalizeText(text);
    const words = normalized.split(/\s+/);
    const expanded = new Set(words);
    words.forEach(word => {
      Object.entries(synonyms).forEach(([key, values]) => {
        if (values.includes(word) || word === key) {
          expanded.add(key);
          values.forEach(v => expanded.add(v));
        }
      });
    });
    return Array.from(expanded);
  }

  function calculateSimilarity(query, pattern) {
    const qWords = normalizeText(query).split(/\s+/);
    const pWords = normalizeText(pattern).split(/\s+/);
    let matches = 0;
    qWords.forEach(qw => {
      if (pWords.some(pw => pw.includes(qw) || qw.includes(pw))) matches++;
    });
    return matches / Math.max(qWords.length, pWords.length);
  }

  function handle(inputText){
    const q = inputText.trim().toLowerCase();
    if (!q) return;
    
    // single-word quick intents (fast path)
    const normalize = (s) => s.replace(/[^a-z0-9]/g, '');
    const firstToken = normalize(q.split(/\s+/)[0] || '');
    const oneWordMap = {
      resume: "You can download my resume from the Home section (Download Resume button).",
      skills: "Key skills: HTML, CSS, JavaScript, Java, Hibernate, J2EE, JSP, React, Bootstrap, MySQL.",
      projects: "Projects: Fraud Transaction Detection, Farmer to Customer Interface, Coffee Website.",
      contact: "Contact Details:\n📱 WhatsApp: https://wa.me/919959732476\n📞 Phone: +91 9959732476\n📧 Email: sasindragandla@gmail.com\n📍 Location: Bangalore, BTM Layout",
      linkedin: "LinkedIn: linkedin.com/in/sasindra-madduri",
      github: "GitHub: github.com/sasindra143",
      html: "HTML defines the structure of web pages using tags.",
      css: "CSS styles and lays out web pages (colors, fonts, spacing, layout).",
      javascript: "JavaScript makes web pages interactive and dynamic.",
      js: "JavaScript makes web pages interactive and dynamic.",
      react: "React is a JS library for building UIs with reusable components.",
      bootstrap: "Bootstrap is a front‑end framework with a responsive 12‑column grid.",
      grid: "CSS Grid is a two‑dimensional layout system for complex layouts.",
      flexbox: "Flexbox aligns and distributes space among items in a container.",
      dom: "DOM is the tree representation of HTML used for JS manipulation.",
      hooks: "Hooks (useState, useEffect) enable state and lifecycle in function components.",
      jsx: "JSX lets you write HTML‑like markup inside JavaScript.",
      virtualdom: "Virtual DOM is a lightweight copy React uses to optimize rendering.",
      fraud: "Final Year Project: Online Fraud Transaction Detection using ML (Python, SKLearn, XGBoost, Streamlit).",
      coffee: "Coffee Website: Responsive HTML/CSS/JS site with animations and menu/contact.",
      farmer: "Farmer‑to‑Customer: Site connecting farmers directly with customers (HTML/CSS/JS).",
      strengths: "Strengths: quick learner, self‑motivated, consistent, creative problem‑solver.",
      weaknesses: "Weakness: sometimes over‑perfecting design; improving balance of speed and quality.",
      prompt: "Prompt engineering: crafting prompts to guide AI like ChatGPT effectively.",
      ai: "I use AI tools for ideas, debugging, docs, and faster learning.",
      deploy: "Deployment: Streamlit app to visualize predictions and insights."
    };
    if (firstToken && oneWordMap[firstToken]) {
      botMsg(oneWordMap[firstToken]);
      return;
    }

    // Enhanced matching: exact substring match (highest priority)
    for (const item of kb) {
      if (item.patterns.some(p => q.includes(p) || normalizeText(p).includes(normalizeText(q)))) {
        botMsg(item.answer);
        return;
      }
    }

    // Fuzzy matching with similarity scoring
    const expanded = expandSynonyms(q);
    let best = { score: 0, answer: null, item: null };
    
    for (const item of kb) {
      let score = 0;
      for (const pattern of item.patterns) {
        const patternNorm = normalizeText(pattern);
        const sim = calculateSimilarity(q, pattern);
        if (sim > 0.5) score += sim * 2; // boost similarity matches
        
        // Check if any expanded synonym matches
        const patternWords = patternNorm.split(/\s+/);
        expanded.forEach(word => {
          if (patternWords.some(pw => pw.includes(word) || word.includes(pw))) {
            score += 1.5;
          }
        });
        
        // Direct word match
        if (q.includes(patternNorm) || patternNorm.includes(q)) {
          score += 3;
        }
      }
      
      if (score > best.score) {
        best = { score, answer: item.answer, item };
      }
    }

    // If we found a good match
    if (best.score > 1.5) {
      botMsg(best.answer);
      return;
    }

    // Final fallback - ask for clarification with contact details
    botMsg("I'm not sure I understood your question clearly. Could you please explain in detail what you'd like to know?\n\nI can help you with:\n• Personal background and education\n• Technical skills (HTML, CSS, JS, React, Java, MySQL, Python, ML)\n• Projects (Fraud Detection, Farmer-to-Customer, Coffee Website)\n• Internship experience\n• AI tools and prompt engineering\n• Contact information\n\nFor immediate assistance, please reach out to Sasindra directly:\n📱 WhatsApp: https://wa.me/919959732476\n📞 Phone: +91 9959732476\n📧 Email: sasindragandla@gmail.com\n\nFeel free to ask more specifically, and I'll provide a detailed answer!");
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    if (!text.trim()) return;
    userMsg(text);
    input.value = '';
    setTimeout(() => handle(text), 300);
  });

  // Optional: open on first load after small delay (commented)
  // setTimeout(show, 1200);

  // Hide tagline pill once opened or after a while
  function hidePill(){ pill && (pill.style.display = 'none'); }
  toggle.addEventListener('click', hidePill);
  setTimeout(hidePill, 8000);
})();

// GSAP registration
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

// Preloader: hide after window load with GSAP fade
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  gsap.to(preloader, { autoAlpha: 0, duration: 0.6, ease: 'power2.out', onComplete: () => preloader.remove() });
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
  });
  navList.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    navList.classList.remove('show');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Removed duplicate - handled above for nav links specifically

const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-list a'));
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 120;
  let current = sections[0]?.id;
  sections.forEach((sec) => {
    if (scrollPos >= sec.offsetTop) current = sec.id;
  });
  navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
});

// Back to Top
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    const show = window.scrollY > 400;
    backToTop.classList.toggle('show', show);
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Typing animation
(function typingEffect() {
  const el = document.getElementById('typing');
  if (!el) return;
  const phrases = [
    'Full Stack Developer',
    'Java Enthusiast',
    'Machine Learning Explorer'
  ];
  let i = 0, j = 0, deleting = false;
  const tick = () => {
    const phrase = phrases[i];
    j = deleting ? j - 1 : j + 1;
    el.textContent = phrase.slice(0, Math.max(0, j));
    const atEnd = j === phrase.length;
    const atStart = j === 0;
    let delay = deleting ? 60 : 100;
    if (atEnd) { deleting = true; delay = 1200; }
    if (atStart && deleting) { deleting = false; i = (i + 1) % phrases.length; delay = 300; }
    setTimeout(tick, delay);
  };
  tick();
})();

// Particles.js configuration (soft bubbles)
if (window.particlesJS) {
  particlesJS('particles-js', {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 900 } },
      color: { value: ['#2f80ed', '#56ccf2'] },
      shape: { type: 'circle' },
      opacity: { value: 0.25 },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 140, color: '#56ccf2', opacity: 0.15, width: 1 },
      move: { enable: true, speed: 1.1, direction: 'none', out_mode: 'out' }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: false }, resize: true },
      modes: { grab: { distance: 160, line_linked: { opacity: 0.25 } } }
    },
    retina_detect: true
  });
}

// GSAP entrance animations
if (window.gsap) {
  gsap.from('.avatar', { y: 20, autoAlpha: 0, duration: 0.8, delay: 0.2 });
  gsap.from('.title', { y: 18, autoAlpha: 0, duration: 0.8, delay: 0.3 });
  gsap.from('.subtitle', { y: 18, autoAlpha: 0, duration: 0.8, delay: 0.4 });
  gsap.from('.cta', { y: 18, autoAlpha: 0, duration: 0.8, delay: 0.5 });

  // Scroll-triggered animations
  const revealUp = (targets) => {
    gsap.utils.toArray(targets).forEach((el) => {
      gsap.from(el, {
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
  };
  revealUp('.about-photo, .about-text, .timeline-item, .skill, .project-card, .contact-form, .contact-map');

  // Education glowing line parallax
  if (window.ScrollTrigger) {
    gsap.to('.timeline-line', {
      boxShadow: '0 0 24px rgba(86,204,242,.8)',
      scrollTrigger: { trigger: '.education-section', start: 'top center', end: 'bottom center', scrub: true }
    });
  }

  // Skills stagger
  gsap.from('.skills-grid .skill', {
    scale: 0.9,
    autoAlpha: 0,
    duration: 0.4,
    ease: 'back.out(1.6)',
    stagger: 0.07,
    scrollTrigger: { trigger: '.skills-section', start: 'top 75%' }
  });
}

// Contact form -> WhatsApp redirect + success message
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = /** @type {HTMLInputElement} */ (document.getElementById('name')).value.trim();
    const email = /** @type {HTMLInputElement} */ (document.getElementById('email')).value.trim();
    const message = /** @type {HTMLTextAreaElement} */ (document.getElementById('message')).value.trim();
    if (!name || !email || !message) return;
    const text = `Hello, I am ${name}.%0AEmail: ${encodeURIComponent(email)}%0A%0A${encodeURIComponent(message)}`;
    const phone = '919959732476';
    const url = `https://wa.me/${phone}?text=${text}`;
    window.open(url, '_blank', 'noopener');
    const status = document.getElementById('formStatus');
    if (status) {
      status.hidden = false;
      gsap.fromTo(status, { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 });
      setTimeout(() => { status.hidden = true; }, 3000);
    }
    contactForm.reset();
  });
}



// Basic helpers and initialization
document.addEventListener('DOMContentLoaded', function(){
  // Preloader handling
  window.setTimeout(()=>{
    gsap.to('#preloader',{autoAlpha:0,display:'none',duration:0.6});
    initAnimations();
  }, 900); // simulate loading

  // Mobile menu toggle
  document.querySelector('.menu-toggle').addEventListener('click', ()=>{
    const ul = document.querySelector('nav ul');
    ul.style.display = (ul.style.display === 'flex')? 'none' : 'flex';
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  // Back to top
  const back = document.getElementById('back-to-top');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 400) back.style.display = 'block'; else back.style.display = 'none';
  });
  back.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

  // Contact form -> open WhatsApp link with message
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('message').value.trim();
    const text = `Hello Madduri,%0AName: ${name}%0AEmail: ${email}%0AMessage: ${msg}`;
    const waUrl = `https://wa.me/919959732476?text=${text}`;
    // show quick success animation
    gsap.to(form,{autoAlpha:0.6,duration:0.3}).then(()=>{
      window.open(waUrl,'_blank');
      gsap.to(form,{autoAlpha:1,duration:0.6});
    });
  });

  // particles config
  if(window.particlesJS){
    particlesJS('particles-js',{
      particles:{
        number:{value:60,density:{enable:true,value_area:800}},
        color:{value:'#60a5fa'},
        shape:{type:'circle'},
        opacity:{value:0.6},
        size:{value:3,random:true},
        move:{enable:true,speed:1.5}
      },
      interactivity:{detect_on:'canvas',events:{onhover:{enable:true,mode:'repulse'}}}
    });
  }

});

// GSAP animations
function initAnimations(){
  gsap.registerPlugin(ScrollTrigger);

  // Hero animations
  gsap.from('.profile-circle img',{scale:0.8,autoAlpha:0,duration:1.1,ease:'expo'});
  gsap.from('#typed-heading',{y:30,autoAlpha:0,duration:1.1,delay:0.2});
  gsap.from('.subtitle',{y:20,autoAlpha:0,duration:1,delay:0.4});
  gsap.from('.cta',{y:10,autoAlpha:0,duration:1,delay:0.6});

  // About
  gsap.from('.about-img',{x:-60,autoAlpha:0,duration:0.9,scrollTrigger:{trigger:'#about',start:'top 80%'}});
  gsap.from('.about-content',{x:60,autoAlpha:0,duration:0.9,scrollTrigger:{trigger:'#about',start:'top 80%'}});

  // Timeline
  gsap.from('.timeline-item',{y:40,autoAlpha:0,duration:0.7,stagger:0.15,scrollTrigger:{trigger:'#education',start:'top 80%'}});

  // Skills
  gsap.from('.skill',{scale:0.9,autoAlpha:0,duration:0.6,stagger:0.08,scrollTrigger:{trigger:'#skills',start:'top 80%'}});

  // Projects
  gsap.from('.project-card',{y:30,autoAlpha:0,duration:0.8,stagger:0.12,scrollTrigger:{trigger:'#projects',start:'top 80%'}});

  // Footer
  gsap.from('.footer-inner',{y:20,autoAlpha:0,duration:0.8,scrollTrigger:{trigger:'.footer',start:'top 90%'}});

  // Typing effect (simple)
  startTypingEffect();
}

// Simple typing effect for heading/subtitle
function startTypingEffect(){
  const heading = document.getElementById('typed-heading');
  const subtitle = document.getElementById('typed-sub');
  const text = "Hello, I'm Madduri Sasindra 👋";
  const sub = "Full Stack Developer | Java Enthusiast | Machine Learning Explorer";
  heading.innerText = '';
  subtitle.innerText = '';
  let i=0,j=0;
  const t1 = setInterval(()=>{ if(i<text.length){ heading.innerText += text[i++]; } else clearInterval(t1)},40);
  const t2 = setTimeout(()=>{
    const t3 = setInterval(()=>{ if(j<sub.length){ subtitle.innerText += sub[j++]; } else clearInterval(t3)},20);
  }, (text.length*40)+200);
}

// Simple image rotation for profile circle
const img = document.querySelector('.profile-circle img');
if(img) img.addEventListener('mouseover', ()=> gsap.to(img,{rotation:6,duration:0.6,ease:'power1.out'}));
if(img) img.addEventListener('mouseleave', ()=> gsap.to(img,{rotation:0,duration:0.6,ease:'power1.out'}));


// tiny helper: ensure elements referenced after DOM ready
setTimeout(()=>{},100);
