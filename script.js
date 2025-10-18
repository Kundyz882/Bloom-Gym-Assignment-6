document.addEventListener("DOMContentLoaded", () => {

  // ---- Dynamic Managers Cards ----

  const managers = [
    { name: "Anna Petrova", role: "Cardio Fitness Manager", phone: "+7 (777) 123-45-67", email: "anna.petrova@bloomgym.com" },
    { name: "Michael Kim", role: "Yoga Hall Manager", phone: "+7 (700) 987-65-43", email: "michael.kim@bloomgym.com" },
    { name: "Sofia Lee", role: "High Heels Dance Manager", phone: "+7 (701) 555-22-11", email: "sofia.lee@bloomgym.com" },
    { name: "David Brown", role: "Strength Training Manager", phone: "+7 (702) 444-33-22", email: "david.brown@bloomgym.com" }
  ];

  managers.forEach(manager => {
    console.log(`Manager: ${manager.name}`);
  });

  const managersGrid = document.querySelector(".managers-grid");
  if (managersGrid) {
    managersGrid.innerHTML = "";
    managers.forEach(manager => {
      const card = document.createElement("div");
      card.classList.add("contact-card");
      card.innerHTML = `
        <h3>${manager.name}</h3>
        <p>${manager.role}</p>
        <p>&#128222; ${manager.phone}</p>
        <p>&#128233; ${manager.email}</p>
      `;
      managersGrid.appendChild(card);
    });
  }

  // ---- Popup Form ----
  const openPopupBtn = document.getElementById("openPopup");
  const popup = document.getElementById("popupForm");
  const closeBtn = document.querySelector(".popup .close");

  if (openPopupBtn && popup && closeBtn) {
    openPopupBtn.addEventListener("click", () => popup.style.display = "flex");
    closeBtn.addEventListener("click", () => popup.style.display = "none");
    window.addEventListener("click", (event) => {
      if (event.target === popup) popup.style.display = "none";
    });
  }

  // ---- FAQ Accordion ----
  const titles = document.querySelectorAll(".accordion-title");
  titles.forEach(title => {
    title.addEventListener("click", () => {
      const content = title.nextElementSibling;
      if (!content) return;
      document.querySelectorAll(".accordion-content").forEach(c => c.classList.remove("open"));
      content.classList.toggle("open");
    });
  });

  // ---- Date/Time Display ----
  function updateDateTime() {
    const dateTimeEl = document.getElementById('dateTime');
    if (!dateTimeEl) return;
    const now = new Date();
    const options = { 
      year:'numeric', month:'long', day:'numeric', 
      hour:'2-digit', minute:'2-digit', second:'2-digit', 
      hour12:true 
    };
    dateTimeEl.textContent = now.toLocaleString('en-US', options);
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // ---- Read More Section ----
  const readMoreButtons = document.querySelectorAll('.read-more-btn');

  for (let i = 0; i < readMoreButtons.length; i++) {
    readMoreButtons[i].addEventListener('click', () => {
      const card = readMoreButtons[i].closest('.program-card'); 
      const moreText = card.querySelector('.more-text');       
      if (!moreText) return;


      if (moreText.style.display === 'block') {
        moreText.style.display = 'none';
        readMoreButtons[i].textContent = 'Read More';
      } else {
        moreText.style.display = 'block';
        moreText.style.color = "#a32c2c";
        readMoreButtons[i].textContent = 'Read Less';
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // ---- Rating ----
  const stars = document.querySelectorAll(".star");
  let rating = 0;
  stars.forEach(star => star.addEventListener("click", () => {
    rating = star.dataset.value;
    stars.forEach(s => s.classList.toggle("active", s.dataset.value <= rating));
  }));

  // ---- Reset Form Button ----
  const resetBtn = document.getElementById('resetForm');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      clearErrors();
      currentStep = 0;
      showStep(currentStep);
    });
  }
    // ---- Keyboard Event Handling ----
  const menuLinks = document.querySelectorAll('.navbar-nav .nav-link');
  menuLinks.forEach(link => link.setAttribute('tabindex', '0'));
  let currentIndex = 0;
  menuLinks[currentIndex].focus();
  document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % menuLinks.length;
      menuLinks[currentIndex].focus();
    } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + menuLinks.length) % menuLinks.length;
      menuLinks[currentIndex].focus();
    } else if (key === 'Enter') {
      e.preventDefault();
      window.location.href = menuLinks[currentIndex].href;
    }
  });

  // ---- Form Validation ----
  const form = document.querySelector("form");
  const steps = document.querySelectorAll(".form-step");
  let currentStep = 0;

  function showError(input, msg) {
    const error = document.createElement("small");
    error.className = "error";
    error.style.color = "#e75480";
    error.textContent = msg;
    input.insertAdjacentElement("afterend", error);
  }

  function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.remove());
  }

  function validateStep(stepIndex) {
    clearErrors();
    let valid = true;
    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    if (stepIndex === 0 && name && name.value.trim() === "") {
      showError(name, "Please enter your full name.");
      valid = false;
    }

    if (stepIndex === 1) {
      if (phone && !/^\d{10,}$/.test(phone.value.trim())) {
        showError(phone, "Enter a valid phone number (10+ digits).");
        valid = false;
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showError(email, "Enter a valid email address.");
        valid = false;
      }
    }

    if (stepIndex === 2 && message && message.value.trim() === "") {
      showError(message, "Please enter a message.");
      valid = false;
    }

    return valid;
  }
  
  //--- Multi-step Integration---
  function showStep(index) {
    steps.forEach((step, i) => step.classList.toggle("active", i === index));
  }

  document.querySelectorAll(".next-btn").forEach(btn =>
    btn.addEventListener("click", () => {
      if (validateStep(currentStep) && currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    })
  );

  document.querySelectorAll(".back-btn").forEach(btn =>
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    })
  );

  showStep(currentStep);

  // ---- Switch Statements for Greeting ----
  const welcome = document.getElementById("welcomeMessage");
  const nowHour = new Date().getHours();
  let greeting = "";
  switch(true){
    case (nowHour>=5 && nowHour<12): greeting="Good Morning!"; break;
    case (nowHour>=12 && nowHour<18): greeting="Good Afternoon!"; break;
    case (nowHour>=18 && nowHour<22): greeting="Good Evening!"; break;
    default: greeting="Good Night!";
  }
  if(welcome) welcome.textContent = `${greeting}`;

  // ---- Sound on Form Submission ----
  if (form) {
    const successSound = new Audio('success.mp3'); 
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (validateStep(currentStep)) {
        successSound.play();
        alert("Form submitted successfully!");
        form.reset();
        currentStep = 0;
        showStep(currentStep);
      }
    });
  }

  //-----Animations----

  //--Navbar Animation ---
   window.addEventListener("load", () => {
  const navbar = document.querySelector(".navbar");
  navbar.style.opacity = "0";
  navbar.style.transform = "translateY(-50px)";
  navbar.style.transition = "all 0.8s ease";
    setTimeout(() => {
    navbar.style.opacity = "1";
    navbar.style.transform = "translateY(0)";
  }, 200);
  });
 
  // ---- Change Background Color + Animation  ---- 
  const changeColorBtn = document.getElementById("changeColorBtn");
  if (changeColorBtn) {
    const colors = ['#f4c2c2', '#b3e5fc', '#c8e6c9', '#fff9c4', '#d1c4e9', '#ffccbc'];
    let currentColor = 0;
    changeColorBtn.addEventListener("click", () => {
      document.body.style.backgroundColor = colors[currentColor];
      currentColor = (currentColor + 1) % colors.length;
    
      changeColorBtn.style.transform = "scale(1.1)";
      changeColorBtn.style.transition = "transform 0.3s ease";
      setTimeout(() => changeColorBtn.style.transform = "scale(1)", 300);
    });
  }

// --- Welcome message typing effect ---
  const text = " Welcome to Bloom GYM!";
  let i = 0;

  function typeText() {
    if (i < text.length) {
      welcome.textContent += text.charAt(i);
      i++;
      setTimeout(typeText, 80);
    }
  }
  typeText();

  // --- Home Page: Fade-in animation for sections---
  const fadeElements = document.querySelectorAll(
    ".grid-sidebar, .grid-main, .big-photo"
  );

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeElements.forEach(el => observer.observe(el));

   // --- Image hover animation ---
  const images = document.querySelectorAll(".big-photo");
  images.forEach(img => {
    img.addEventListener("mouseenter", () => {
      img.style.transform = "scale(1.05)";
      img.style.transition = "transform 0.3s ease";
    });
    img.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1)";
    });
  });

  
  // --- Gallery Page: Smooth Carousel Animation  ---
  window.addEventListener("load", () => {
    const carousel = document.getElementById("gymCarousel");
    if (!carousel) return;

    const fadeInImages = imgs => {
      imgs.forEach(img => {
        img.style.opacity = "0";
        img.style.transform = "scale(0.92)";
        img.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        setTimeout(() => {
          img.style.opacity = "1";
          img.style.transform = "scale(1)";
        }, 100);
      });
    };

    const activeSlide = carousel.querySelector(".carousel-item.active img");
    if (activeSlide) fadeInImages([activeSlide]);


    carousel.addEventListener("slid.bs.carousel", () => {
      const imgs = carousel.querySelectorAll(".carousel-item.active img");
      fadeInImages(imgs);
    });
  });

});