document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("welcomeModal");
    const closeBtn = document.getElementById("closeBtnIcon");

    // 2 Seconds ka delay
    setTimeout(() => {
        modal.style.display = "flex";
        setTimeout(() => { modal.style.opacity = "1"; }, 10);
        document.body.style.overflow = "hidden"; // Scroll Lock
    }, 2000);

    const closeModal = () => {
        modal.style.opacity = "0";
        setTimeout(() => {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // Scroll Unlock
        }, 400);
    };

    closeBtn.addEventListener("click", closeModal);

    // Background click to close
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
});





// Mobile Menu Toggle Logic
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Toggle Icon between Bars and X
    const icon = mobileMenu.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("welcomeModal");
    const closeBtn = document.getElementById("closeBtn");
    const closeIcon = document.querySelector(".close-icon");

    // Page load hone ke 1 seconds baad dikhayen
    setTimeout(() => {
        modal.style.display = "flex";
    }, 1000);

    const closeModal = () => {
        modal.style.opacity = "0";
        setTimeout(() => modal.style.display = "none", 300);
    };

    closeBtn.addEventListener("click", closeModal);
    closeIcon.addEventListener("click", closeModal);

    // FIX: Screen (Background Overlay) par click karne se hat jaye
    modal.addEventListener("click", (e) => {
        // Agar click 'modal-overlay' par hua hai (content ke bahar), toh band ho jaye
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });
});

// Close menu when a link is clicked (for mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        // Toggle Icon between Bars and X
        const icon = mobileMenu.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
});





let currentIdx = 0;
const slides = document.querySelectorAll('.hero-slide');
const dotsWrapper = document.querySelector('.dots-wrapper');
let timer;

// Automatically create dots based on number of slides
function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsWrapper.appendChild(dot);
    });
}

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    const dots = document.querySelectorAll('.dot');
    dots.forEach(d => d.classList.remove('active'));

    if (index >= slides.length) currentIdx = 0;
    else if (index < 0) currentIdx = slides.length - 1;
    else currentIdx = index;

    slides[currentIdx].classList.add('active');
    if (dots[currentIdx]) dots[currentIdx].classList.add('active');
}

function goToSlide(index) {
    clearInterval(timer);
    currentIdx = index;
    showSlide(currentIdx);
    startTimer();
}

function changeSlide(n) {
    clearInterval(timer);
    showSlide(currentIdx + n);
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        showSlide(currentIdx + 1);
    }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    createDots();
    showSlide(0);
    startTimer();
});





// 1. All 13 Places Itineraries Data
const tourData = {
    kedarnath: { title: "Kedarnath Dham Yatra", plan: [{ day: "Day 1", desc: "Haridwar to Guptkashi." }, { day: "Day 2", desc: "Kedarnath Trek Start." }, { day: "Day 3", desc: "Darshan & Return Trek." }] },
    spiti: { title: "Spiti Valley Expedition", plan: [{ day: "Day 1", desc: "Kaza Local Exploration." }, { day: "Day 2", desc: "Hikkim (Highest Post Office)." }, { day: "Day 3", desc: "Chandratal Lake Camping." }] },
    nainital: { title: "Nainital Lake Tour", plan: [{ day: "Day 1", desc: "Naini Lake Boating & Mall Road." }, { day: "Day 2", desc: "Bhimtal & Sattal Visit." }, { day: "Day 3", desc: "Snow View Point." }] },
    goa: { title: "Goa Beach Blast", plan: [{ day: "Day 1", desc: "North Goa Beaches & Party." }, { day: "Day 2", desc: "South Goa Temples & Churches." }, { day: "Day 3", desc: "Water Sports at Baga." }] },
    ooty: { title: "Ooty & Coonoor Magic", plan: [{ day: "Day 1", desc: "Ooty Botanical Garden." }, { day: "Day 2", desc: "Doddabetta Peak Sightseeing." }, { day: "Day 3", desc: "Coonoor Tea Factory." }] },
    haridwar: { title: "Haridwar-Rishikesh Spiritual", plan: [{ day: "Day 1", desc: "Har Ki Pauri Ganga Aarti." }, { day: "Day 2", desc: "Rishikesh Ram Jhula & Laxman Jhula." }, { day: "Day 3", desc: "Yoga Center Visit." }] },
    rameshwaram: { title: "Rameshwaram Divine Tour", plan: [{ day: "Day 1", desc: "Ramanathaswamy Temple." }, { day: "Day 2", desc: "Dhanushkodi Ghost Town Visit." }, { day: "Day 3", desc: "Pamban Bridge View." }] }
};

// 2. Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.tour-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active Class Toggle
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        cards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            if (filterValue === 'all' || categories.includes(filterValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Filter buttons par event listener
const filterButtons = document.querySelectorAll('.filter-btn');
const scrollContainer = document.querySelector('.tours-scroll-container');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-filter');

        // 1. Filter logic: Cards ko hide/show karna
        const cards = document.querySelectorAll('.tour-card');
        cards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            if (filterValue === 'all' || categories.includes(filterValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // 2. SMOOTH SCROLL RESET (Ye aapka main fix hai) ✅
        // Jaise hi filter badle, slider ko wapas 0 (start) par le jao
        scrollContainer.scrollTo({
            left: 0,
            behavior: 'smooth'
        });

        // 3. Active button class update karna
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// 3. Open Itinerary (Updated to show 13 places)
function openItinerary(tourId) {
    const modal = document.getElementById("itineraryModal");
    const body = document.getElementById("modalBody");
    const data = tourData[tourId];

    if (data) {
        let html = `<h2 style="color:#000;">${data.title}</h2><br>`;
        data.plan.forEach(item => {
            html += `
                <div class="itinerary-day" style="margin-bottom:12px; border-left:4px solid rgb(0,255,255); padding-left:12px;">
                    <h4 style="margin-bottom:2px;">${item.day}</h4>
                    <p style="font-size:14px; color:#666;">${item.desc}</p>
                </div>`;
        });

        const waMsg = `Hello Yatra Vats, I'm interested in ${data.title}. Please share details.`;
        html += `<a href="https://wa.me/916263777672?text=${encodeURIComponent(waMsg)}" class="btn-book" style="display:block; margin-top:20px; text-decoration:none; text-align:center; padding:12px; background:#25D366; color:#fff; border-radius:5px; font-weight:bold;">Chat with Expert</a>`;

        body.innerHTML = html;
        modal.style.display = "block";
    }
}

function closeModal() { document.getElementById("itineraryModal").style.display = "none"; }

function scrollSlider(direction) {
    const container = document.querySelector('.tours-scroll-container');
    const firstCard = document.querySelector('.tour-card');

    if (!firstCard) return; // Agar cards nahi hain toh return kar jaye

    // 1. Ek card ki poori width calculate karein (including gap)
    const cardWidth = firstCard.offsetWidth + 20; // 20px aapka CSS gap hai

    // 2. Container ko sahi direction mein scroll karein
    container.scrollBy({
        left: direction * cardWidth,
        behavior: 'smooth'
    });
}





function focusQueryForm() {
    // 1. Niche Query Form tak scroll karega
    const querySection = document.getElementById('inquiry_feedback');
    if (querySection) {
        querySection.scrollIntoView({ behavior: 'smooth' });

        // 2. Thoda wait karega scroll khatam hone ka, phir input focus karega
        setTimeout(() => {
            const nameInput = document.getElementById('username');
            if (nameInput) {
                nameInput.focus();
            }
        }, 800); // 800ms scroll animation ke liye
    }
}





function changeVlog(videoId) {
    // Change the iframe source
    const iframe = document.getElementById('mainVlogFrame');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

    // Update active thumbnail styling
    const thumbs = document.querySelectorAll('.thumb-item');
    thumbs.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.getAttribute('onclick').includes(videoId)) {
            thumb.classList.add('active');
        }
    });
}





var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        },
    },
});





document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', (e) => {
        // Page jump rokne ke liye
        e.preventDefault();

        const faqCard = button.parentElement;
        const isOpen = faqCard.classList.contains('active');

        // Sabhi open FAQs ko band karne ke liye (Optional - for clean look)
        document.querySelectorAll('.faq-card').forEach(card => {
            card.classList.remove('active');
            card.querySelector('.faq-answer').style.maxHeight = null;
        });

        // Current FAQ ko toggle karein
        if (!isOpen) {
            faqCard.classList.add('active');
            const answer = faqCard.querySelector('.faq-answer');
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});





// 1. Inquiry Form Logic (WhatsApp)
const queryForm = document.getElementById('queryForm');
if (queryForm) {
    queryForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = this.querySelectorAll('input')[0].value;
        const phone = this.querySelectorAll('input')[1].value;
        const dest = this.querySelector('select').value;
        const msg = this.querySelector('textarea').value;

        const waLink = `https://wa.me/916263777672?text=New%20Inquiry!%0AName:%20${name}%0APhone:%20${phone}%0ADestination:%20${dest}%0AMessage:%20${msg}`;

        window.open(waLink, '_blank');
        this.reset();
    });
}

// 2. Feedback Form Logic (Success Message)
const feedbackForm = document.getElementById('feedbackForm');
const feedbackMsg = document.getElementById('feedbackMessage');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Show Success Message 🎊
        feedbackMsg.style.display = 'block';

        // Visual feedback: make the form look "submitted"
        this.style.opacity = '0.3';
        this.style.pointerEvents = 'none';

        // Optional: Hide the message after 5 seconds
        setTimeout(() => {
            feedbackMsg.style.display = 'none';
            this.style.opacity = '1';
            this.style.pointerEvents = 'all';
            this.reset();
        }, 5000);
    });
}
