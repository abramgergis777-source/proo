/* ============================================================
   ⚡ ملف الجافاسكريبت الرئيسي - بورتفوليو فاخر
   ============================================================ */

/* ============================================================
   🖱️ الكيرسور المخصص
   ============================================================ */
const cursorDot  = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

// تتبع حركة الماوس
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// تأخير حركة الحلقة الخارجية للكيرسور
function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// تكبير الكيرسور عند الـ hover على العناصر التفاعلية
document.querySelectorAll('a, button, .skill-card, .project-card, .social-icon')
  .forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.style.transform  = 'translate(-50%, -50%) scale(2.5)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1.6)';
      cursorRing.style.opacity   = '0.4';
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.style.transform  = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorRing.style.opacity   = '0.7';
    });
  });

/* ============================================================
   🌟 خلفية الجزيئات (Canvas)
   ============================================================ */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

let particles = [];

// ✏️ ممكن تغير عدد الجزيئات - كلما زاد زادت الكثافة (max 150)
const PARTICLE_COUNT = 80;

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      // ✏️ لو غيرت اللون الرئيسي في CSS غير كمان هنا
      color: `rgba(201, 168, 76, ${Math.random() * 0.4 + 0.1})`,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    // رسم الجزيء
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    // رسم الخطوط بين الجزيئات القريبة
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = p.x - particles[j].x;
      const dy   = p.y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(201, 168, 76, ${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    // تحريك الجزيء
    p.x += p.vx;
    p.y += p.vy;

    // ارتداد من الحواف
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  });

  requestAnimationFrame(drawParticles);
}

initParticles();
drawParticles();

/* ============================================================
   🔝 شريط التنقل - التأثير عند التمرير
   ============================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ============================================================
   📱 قائمة الموبايل
   ============================================================ */
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks   = document.querySelectorAll('.mob-link');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const isOpen = mobileMenu.classList.contains('open');
  // تأثير مرئي على الزرار
  const spans = menuBtn.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// إغلاق المنيو عند الضغط على أي لينك
mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = menuBtn.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});

/* ============================================================
   🎭 تغيير الألقاب تلقائياً في الهيرو
   ✏️ غير الألقاب دي لألقابك الحقيقية
   ============================================================ */
const titles = [
  'مطور واجهات',      // ✏️ اللقب الأول
  'مصمم رقمي',        // ✏️ اللقب الثاني
  'Full-Stack Dev',   // ✏️ اللقب الثالث
  'مبدع في الكود',    // ✏️ اللقب الرابع - ممكن تضيف أكتر
];

let titleIndex = 0;
const titleEl  = document.getElementById('titleRotate');

function rotateTitle() {
  titleIndex = (titleIndex + 1) % titles.length;

  // تأثير الاختفاء
  titleEl.style.opacity   = '0';
  titleEl.style.transform = 'translateY(-10px)';

  setTimeout(() => {
    titleEl.textContent = titles[titleIndex];
    titleEl.style.opacity   = '1';
    titleEl.style.transform = 'translateY(0)';
    titleEl.style.transition = 'all 0.4s ease';
  }, 300);
}

// تغيير كل 3 ثواني
setInterval(rotateTitle, 3000);

/* ============================================================
   📊 عداد الأرقام في الهيرو
   ============================================================ */
function animateCounter(el, target, duration = 2000) {
  let start     = 0;
  const step    = target / (duration / 16);
  const counter = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(counter);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

// تشغيل العداد مرة واحدة عند ظهور القسم
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      document.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
      });
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ============================================================
   👁️ تأثير الظهور عند التمرير (Reveal on Scroll)
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // تأخير تدريجي لكل عنصر
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
});

revealEls.forEach(el => revealObserver.observe(el));

/* ============================================================
   💪 شريط المهارات - يتحرك عند الظهور
   ============================================================ */
const skillFills   = document.querySelectorAll('.skill-fill');
let skillsAnimated = false;

const skillsSection  = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      animateSkills();
    }
  });
}, { threshold: 0.2 });

if (skillsSection) skillsObserver.observe(skillsSection);

function animateSkills() {
  // تحريك المهارات المرئية حالياً
  document.querySelectorAll('.skills-content.active .skill-fill').forEach((fill, i) => {
    setTimeout(() => {
      fill.style.width = fill.getAttribute('data-width') + '%';
    }, i * 150);
  });
}

/* ============================================================
   🗂️ تابات المهارات
   ============================================================ */
const tabBtns = document.querySelectorAll('.tab-btn');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');

    // تحديث الأزرار
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // تحديث المحتوى
    document.querySelectorAll('.skills-content').forEach(content => {
      content.classList.remove('active');
    });

    const activeContent = document.getElementById('tab-' + tab);
    if (activeContent) {
      activeContent.classList.add('active');

      // تحريك شريط المهارات للتاب الجديد
      setTimeout(() => {
        activeContent.querySelectorAll('.skill-fill').forEach((fill, i) => {
          fill.style.width = '0';
          setTimeout(() => {
            fill.style.width = fill.getAttribute('data-width') + '%';
          }, i * 150 + 100);
        });
      }, 50);

      // تأثير الظهور للكاردات الجديدة
      activeContent.querySelectorAll('.skill-card').forEach((card, i) => {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.transition = 'all 0.4s ease';
          card.style.opacity    = '1';
          card.style.transform  = 'translateY(0)';
        }, i * 100);
      });
    }
  });
});

/* ============================================================
   🖱️ تحديث النافلينك النشط عند التمرير
   ============================================================ */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

/* ============================================================
   📞 فورم التواصل
   ============================================================ */
const sendBtn     = document.getElementById('sendBtn');
const formSuccess = document.getElementById('formSuccess');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name    = document.getElementById('nameInput').value.trim();
    const email   = document.getElementById('emailInput').value.trim();
    const subject = document.getElementById('subjectInput').value.trim();
    const msg     = document.getElementById('msgInput').value.trim();

    // تحقق بسيط من البيانات
    if (!name || !email || !msg) {
      // تأثير اهتزاز للفورم
      const form = document.getElementById('contactForm');
      form.style.animation = 'shake 0.4s ease';
      setTimeout(() => form.style.animation = '', 400);

      // تلوين الحقول الفارغة
      if (!name)  document.getElementById('nameInput').style.borderColor  = '#ef4444';
      if (!email) document.getElementById('emailInput').style.borderColor = '#ef4444';
      if (!msg)   document.getElementById('msgInput').style.borderColor   = '#ef4444';

      return;
    }

    // إعادة اللون الطبيعي
    ['nameInput', 'emailInput', 'subjectInput', 'msgInput'].forEach(id => {
      document.getElementById(id).style.borderColor = '';
    });

    // تأثير التحميل
    sendBtn.textContent = 'جاري الإرسال...';
    sendBtn.disabled    = true;
    sendBtn.style.opacity = '0.7';

    // محاكاة الإرسال (2 ثانية)
    // ✏️ هنا ممكن تضيف كود الإرسال الحقيقي (API أو EmailJS مثلاً)
    setTimeout(() => {
      sendBtn.textContent  = 'إرسال الرسالة';
      sendBtn.disabled     = false;
      sendBtn.style.opacity = '1';

      // مسح الفورم
      document.getElementById('nameInput').value    = '';
      document.getElementById('emailInput').value   = '';
      document.getElementById('subjectInput').value = '';
      document.getElementById('msgInput').value     = '';

      // عرض رسالة النجاح
      formSuccess.style.display = 'block';
      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 5000);
    }, 2000);
  });
}

// إزالة اللون الأحمر عند الكتابة
['nameInput', 'emailInput', 'subjectInput', 'msgInput'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', () => el.style.borderColor = '');
});

// تأثير اهتزاز CSS
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}
`;
document.head.appendChild(shakeStyle);

/* ============================================================
   🔝 زرار الرجوع للأعلى
   ============================================================ */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   📅 سنة الفوتر تلقائية
   ============================================================ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   🖼️ التعامل مع صورة الـ Hero - لو مش موجودة
   ============================================================ */
const heroPhoto       = document.getElementById('heroPhoto');
const photoPlaceholder = document.getElementById('photoPlaceholder');

if (heroPhoto) {
  heroPhoto.addEventListener('error', () => {
    heroPhoto.style.display    = 'none';
    if (photoPlaceholder) {
      photoPlaceholder.style.display = 'flex';
    }
  });
}

/* ============================================================
   ✨ تأثير Parallax خفيف على الهيرو
   ============================================================ */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroSection = document.querySelector('.hero');

  if (heroSection && scrollY < window.innerHeight) {
    const heroContent = heroSection.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
      heroContent.style.opacity   = `${1 - scrollY / 600}`;
    }
  }
});

/* ============================================================
   🔗 Smooth Scroll لكل الروابط الداخلية
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('✨ Portfolio loaded successfully!');