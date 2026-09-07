// ============================================================
// 1. NAVBAR STICKY + SCROLL EFFECT
// ============================================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ============================================================
// 2. MENU MOBILE (HAMBURGER)
// ============================================================
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
});

// Fechar menu ao clicar em um link (mobile)
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
    });
});

// Fechar menu ao clicar fora (opcional)
document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && nav.classList.contains('open')) {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
    }
});

// ============================================================
// 3. ANIMAÇÃO DE NÚMEROS (COUNTER)
// ============================================================
const numberItems = document.querySelectorAll('.number-item__value');

function animateNumbers() {
    numberItems.forEach(item => {
        const target = parseInt(item.getAttribute('data-count'), 10);
        const duration = 2000; // ms
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easing ease-out
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            item.textContent = current.toLocaleString('pt-BR');
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                item.textContent = target.toLocaleString('pt-BR');
            }
        }
        requestAnimationFrame(updateCounter);
    });
}

// Disparar quando a seção numbers entrar na tela
const numbersSection = document.querySelector('.numbers');
let numbersAnimated = false;

const observerNumbers = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !numbersAnimated) {
            numbersAnimated = true;
            animateNumbers();
        }
    });
}, { threshold: 0.4 });

observerNumbers.observe(numbersSection);

// ============================================================
// 4. REVEAL AO SCROLL (fade + slide-up)
// ============================================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

// Adicionar classe 'reveal' a certos elementos (já feito no HTML?)
// Vamos aplicar a todos os .section-title, .specialty-card, etc.
document.querySelectorAll('.section-title, .specialty-card, .team-card, .blog-card, .step, .about__content, .about__image, .testimonial-card, .faq-item').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ============================================================
// 5. CAROUSEL DE DEPOIMENTOS
// ============================================================
const track = document.getElementById('testimonialsTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const slides = track.querySelectorAll('.testimonial-card');
let slidesPerView = 3;

function getSlidesPerView() {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 992) return 2;
    return 3;
}

function updateCarousel() {
    slidesPerView = getSlidesPerView();
    const totalSlides = slides.length;
    const maxIndex = totalSlides - slidesPerView;
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    const gap = 24; // mesmo gap do CSS
    const slideWidth = slides[0].offsetWidth;
    const offset = currentIndex * (slideWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;
}

// Inicializar
updateCarousel();

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    const maxIndex = slides.length - getSlidesPerView();
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }
});

// Ajustar no redimensionamento
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateCarousel();
    }, 200);
});

// ============================================================
// 6. FAQ ACCORDION
// ============================================================
document.querySelectorAll('.faq-item__question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isActive = item.classList.contains('active');

        // Fechar todos
        document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ============================================================
// 7. FORMULÁRIO DE AGENDAMENTO (envio simulado)
// ============================================================
const form = document.getElementById('appointmentForm');
const successMsg = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validação simples
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const especialidade = document.getElementById('especialidade').value;
    const profissional = document.getElementById('profissional').value;
    const data = document.getElementById('data').value;

    if (!nome || !email || !telefone || !especialidade || !profissional || !data) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Simular envio
    successMsg.classList.remove('hidden');
    form.reset();

    // Esconder mensagem após 5s
    setTimeout(() => {
        successMsg.classList.add('hidden');
    }, 6000);
});

// ============================================================
// 8. BOTÃO WHATSAPP
// ============================================================
const whatsappBtn = document.getElementById('whatsappBtn');
const numeroWhats = '5511999999999'; // NÚMERO FICTÍCIO (substitua)

whatsappBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const mensagem = encodeURIComponent('Olá! Gostaria de agendar uma consulta na VITALIS.');
    window.open(`https://wa.me/${numeroWhats}?text=${mensagem}`, '_blank');
});

// ============================================================
// 9. NAVEGAÇÃO SUAVE PARA ÂNCORAS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            const offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// ============================================================
// 10. DESTAQUE DO LINK ATIVO NA NAVBAR (SCROLL)
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

function highlightNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNav);

// ============================================================
// 11. (OPCIONAL) ANIMAÇÃO DE ENTRADA PARA BADGES HERO
// ============================================================
document.querySelectorAll('.badge').forEach((badge, i) => {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(10px)';
    setTimeout(() => {
        badge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        badge.style.opacity = '1';
        badge.style.transform = 'translateY(0)';
    }, 300 + i * 200);
});

console.log('VITALIS — Site carregado com sucesso!');