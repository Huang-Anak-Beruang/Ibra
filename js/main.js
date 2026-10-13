/**
 * PORTFOLIO IBRA MAULANA IRDAMSYAH
 * High-Precision Industrial Electrical Engineering Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initScrollEffects();
  initProjectFilters();
  initVideoFilters();
  initProjectModals();
  initClipboardActions();
  initContactForm();
  initCvModal();
  initLightbox();
});

/* -------------------------------------------------------------
 * 1. THEME TOGGLE (Dark Mode Default <-> Clean Light Mode)
 * ------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check persisted preference or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, themeIcon);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme, themeIcon);
    });
  }
}

function updateThemeIcon(theme, iconEl) {
  if (!iconEl) return;
  if (theme === 'light') {
    // Show Moon icon for switching back to dark
    iconEl.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
      </svg>`;
    iconEl.setAttribute('aria-label', 'Switch to Dark Mode');
  } else {
    // Show Sun icon for switching to light
    iconEl.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2"/><path d="M12 20v2"/>
        <path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/>
        <path d="M2 12h2"/><path d="M20 12h2"/>
        <path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
      </svg>`;
    iconEl.setAttribute('aria-label', 'Switch to Light Mode');
  }
}

/* -------------------------------------------------------------
 * 2. MOBILE NAVIGATION
 * ------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const navLinks = document.getElementById('nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('mobile-open');
      }
    });
  }
}

/* -------------------------------------------------------------
 * 3. NAVBAR SCROLL EFFECTS & SCROLLSPY
 * ------------------------------------------------------------- */
function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Navbar elevation
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scrollspy active state
    let currentSection = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/* -------------------------------------------------------------
 * 4. PROJECT FILTERING
 * ------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 5. TECHNICAL SPECIFICATION MODAL DATABASE
 * ------------------------------------------------------------- */
const projectDetailsDB = {
  etap: {
    title: 'Analisis Aliran Daya dan Hubung Singkat menggunakan ETAP',
    badge: 'Power Systems & Grid Analysis',
    problem: 'Jaringan sistem tenaga industri dan fasilitas pembangkit rentan mengalami penurunan tegangan (voltage drop), kelebihan pembebanan pada trafo dan kabel, serta risiko kerusakan fatal saat terjadi arus gangguan hubung singkat jika kapasitas pemutus sirkuit (breaker) tidak dihitung dengan presisi.',
    solution: 'Merancang pemodelan Single Line Diagram (SLD) pada software ETAP (v19, 21, 24), memasukkan parameter impedansi teknis komponen, serta mengeksekusi simulasi Load Flow untuk mengevaluasi profil tegangan dan Short Circuit untuk memvalidasi breaking capacity peralatan proteksi.',
    features: [
      'Pemodelan Single Line Diagram (SLD) jaringan daya industri.',
      'Load Flow Analysis untuk mengidentifikasi bus marginal/critical.',
      'Short Circuit Analysis (3-Phase Fault & Line-to-Ground) standar IEC/ANSI.',
      'Sesi teknis pemecahan masalah kompleks berbasis Forum Group Discussion (FGD).'
    ],
    tech: ['ETAP v19', 'ETAP v21', 'ETAP v24', 'Power System Calculation'],
    role: 'Electrical Power System Analyst & FGD Participant',
    process: '1. Pengumpulan data kapasitas generator, transformator, dan beban.\n2. Konstruksi SLD pada lembar kerja ETAP.\n3. Eksekusi simulasi Load Flow dan pemetaan tegangan bus.\n4. Simulasi arus hubung singkat untuk menentukan kapasitas peralatan proteksi.\n5. Pembahasan skenario perbaikan sistem pada sesi FGD.',
    result: 'Menghasilkan profil tegangan jaringan yang stabil dan rekomendasi parameter proteksi yang sesuai standar teknis industri. [Detail angka efisiensi/losses: Belum diisi].',
    links: '[File Studi Kasus ETAP / Dokumentasi Teknis]'
  },

  turbin: {
    title: 'Riset Turbin Angin untuk Energi Berkelanjutan di Sektor Migas',
    badge: 'Renewable Energy & Oil and Gas',
    problem: 'Tingginya konsumsi energi fosil dan emisi karbon pada fasilitas operasional Oil & Gas (terutama area lepas pantai/offshore) yang membutuhkan alternatif sumber energi mandiri dan ramah lingkungan.',
    solution: 'Mengevaluasi kelayakan implementasi teknologi turbin angin offshore maupun darat untuk menyuplai kebutuhan daya operasional fasilitas migas secara berkelanjutan dan efisien.',
    features: [
      'Analisis potensi kecepatan angin di wilayah operasional migas.',
      'Studi kelayakan integrasi energi terbarukan pada beban fasilitas.',
      'Konsep mitigasi emisi karbon operasional industri hulu/hilir migas.'
    ],
    tech: ['Analisis Sistem Tenaga', 'Studi Kelayakan EBT', 'Riset Literatur Migas'],
    role: 'Technical Researcher',
    process: '1. Identifikasi beban daya spesifik fasilitas migas.\n2. Analisis profil potensi angin lepas pantai.\n3. Perhitungan estimasi suplai daya hibrida turbin angin.\n4. Penyusunan sintesis studi dan laporan evaluasi kelayakan.',
    result: 'Dokumen riset kelayakan integrasi turbin angin untuk mereduksi konsumsi bahan bakar fosil pada fasilitas migas. [Proyeksi efisiensi daya: Belum diisi].',
    links: '[Dokumen Paper Riset / Draft Publikasi]'
  },

  plc: {
    title: 'Sistem Monitoring Rangkaian Automatic Liquid Filling System',
    badge: 'Industrial Automation & PLC',
    problem: 'Proses pengisian cairan skala industri tanpa kontrol sekuensial yang andal sering menimbulkan ketidakakuratan takaran volume, tumpahan cairan, dan kesulitan mendeteksi status mesin saat terjadi gangguan.',
    solution: 'Merancang program Ladder Diagram pada Cx-Programmer (PLC Omron) untuk mengendalikan aktuator (pompa/katup) dan sensor level secara otomatis, dilengkapi antarmuka pemantauan status proses.',
    features: [
      'Logika kontrol sekuensial otomatis (Start -> Detect -> Fill -> Stop).',
      'Integrasi sensor level cairan dan posisi wadah.',
      'Sistem interlocking keselamatan dan Emergency Stop.',
      'Pemantauan status operasi mesin secara real-time.'
    ],
    tech: ['Cx-Programmer', 'PLC Omron', 'Ladder Diagram Logic', 'SCADA Monitoring'],
    role: 'Control System Designer & Logic Programmer',
    process: '1. Pemetaan alur operasional dan tabel pengalamatan I/O PLC.\n2. Penulisan Ladder Diagram (Timer, Counter, Interlock) pada Cx-Programmer.\n3. Simulasi internal logika kontrol dan mitigasi benturan sinyal.\n4. Integrasi ke sistem pemantauan status.',
    result: 'Sistem pengisian cairan berjalan stabil secara sekuensial dan otomatis sesuai parameter timing. [Kapasitas botol/menit: Belum diisi].',
    links: '[File Project .cxp / Video Simulasi]'
  },

  greenschool: {
    title: 'Miniatur Green School Terintegrasi PLTS dan Sistem Parkir Otomatis',
    badge: 'Renewable Energy & Microcontroller',
    problem: 'Kebutuhan media percontohan infrastruktur bangunan ramah lingkungan yang mandiri energi dan memiliki fasilitas otomasi cerdas yang dapat dioperasikan secara andal.',
    solution: 'Mengimplementasikan panel surya (PLTS) sebagai sumber daya mandiri serta mikrokontroler Arduino untuk mengendalikan palang parkir otomatis berbasis sensor deteksi.',
    features: [
      'Pembangkit Listrik Tenaga Surya (PLTS) skala purwarupa.',
      'Sistem palang parkir otomatis berbasis servo/motor.',
      'Integrasi sensor pendeteksi kendaraan real-time.'
    ],
    tech: ['Panel Surya (PLTS)', 'Arduino IDE / Microcontroller', 'Sensor Deteksi', 'Power Circuit'],
    role: 'Hardware Integrator & Programmer',
    process: '1. Perancangan struktur mekanik miniatur.\n2. Perakitan sirkuit daya PLTS dan modul regulator baterai.\n3. Pemrograman mikrokontroler Arduino untuk pembacaan sensor dan servo parkir.\n4. Pengujian operasional terpadu.',
    result: 'Purwarupa berhasil beroperasi secara mandiri memanfaatkan daya surya dengan respons sensor gerbang parkir yang akurat.',
    links: '[Dokumentasi Purwarupa & Kode Arduino]'
  },

  kicad: {
    title: 'Perancangan Konverter Daya DC-DC & Rangkaian Flip-Flop (KiCAD)',
    badge: 'Hardware & PCB Layout Design',
    problem: 'Kebutuhan regulasi tegangan DC yang stabil dan efisien untuk perangkat instrumentasi industri membutuhkan sirkuit daya yang terisolasi dengan tata letak PCB yang meminimalkan noise.',
    solution: 'Merancang skematik sirkuit elektronika daya (Buck, Boost, Buck-Boost Converter) dan rangkaian logika dasar Flip-Flop, serta merancang layout PCB 2-layer siap cetak pada KiCAD.',
    features: [
      'Modul Buck Converter (penurun tegangan DC-DC).',
      'Modul Boost Converter (penaiktaraf tegangan DC-DC).',
      'Modul Buck-Boost Converter fleksibel.',
      'Rangkaian bistable multivibrator / Flip-Flop digital.'
    ],
    tech: ['KiCAD (Eeschema & Pcbnew)', 'PSIM', 'Power Electronics', 'PCB Routing'],
    role: 'Hardware & PCB Layout Designer',
    process: '1. Kalkulasi komponen pasif (induktor, kapasitor switching).\n2. Pembuatan skematik rangkaian pada KiCAD Eeschema.\n3. Penugasan footprint dan perancangan tata letak komponen.\n4. Routing jalur tembaga daya dan verifikasi DRC (Design Rule Check).',
    result: 'Desain PCB bebas dari error DRC dan siap difabrikasi dalam format file Gerber standar industri.',
    links: '[File Gerber & Skematik KiCAD]'
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalBadge = document.getElementById('modal-badge');
  const modalProblem = document.getElementById('modal-problem');
  const modalSolution = document.getElementById('modal-solution');
  const modalFeatures = document.getElementById('modal-features');
  const modalTech = document.getElementById('modal-tech');
  const modalRole = document.getElementById('modal-role');
  const modalProcess = document.getElementById('modal-process');
  const modalResult = document.getElementById('modal-result');
  const modalLinks = document.getElementById('modal-links');

  const detailButtons = document.querySelectorAll('.view-detail-btn');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectDetailsDB[projKey];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalBadge.textContent = data.badge;
      modalProblem.textContent = data.problem;
      modalSolution.textContent = data.solution;
      modalRole.textContent = data.role;
      modalResult.textContent = data.result;
      modalLinks.textContent = data.links;

      // Render Features
      modalFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');

      // Render Tech Pills
      modalTech.innerHTML = data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

      // Render Process
      modalProcess.innerHTML = data.process.split('\n').map(p => `<p style="margin-bottom: 0.35rem;">${p}</p>`).join('');

      // Open Modal
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* -------------------------------------------------------------
 * 6. CLIPBOARD HELPERS & TOAST NOTIFICATION
 * ------------------------------------------------------------- */
function initClipboardActions() {
  const copyBtns = document.querySelectorAll('.copy-trigger');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Tersalin ke clipboard: ${textToCopy}`);
      }).catch(() => {
        showToast('Gagal menyalin teks.');
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* -------------------------------------------------------------
 * 7. CONTACT FORM INTERACTION
 * ------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const msgInput = document.getElementById('form-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = msgInput ? msgInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast('Harap lengkapi semua kolom pesan.');
        return;
      }

      // Format WhatsApp / Mailto fallback or notification
      const subject = encodeURIComponent(`Inquiry Portofolio dari ${name}`);
      const body = encodeURIComponent(`Halo Ibra,\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`);
      
      showToast('Pesan disiapkan! Membuka aplikasi email Anda...');
      
      setTimeout(() => {
        window.location.href = `mailto:ibra.maulana.irdamsyah@gmail.com?subject=${subject}&body=${body}`;
        contactForm.reset();
      }, 1000);
    });
  }
}

/* Print CV Trigger */
window.printPortfolioCV = function() {
  window.print();
};

/* -------------------------------------------------------------
 * 8. CV PDF VIEWER MODAL
 * ------------------------------------------------------------- */
function initCvModal() {
  const cvModal = document.getElementById('cv-modal');
  const openNavBtn = document.getElementById('nav-cv-preview-btn');
  const openHeroBtn = document.getElementById('hero-cv-preview-btn');
  const closeBtn = document.getElementById('cv-modal-close-btn');

  const openModal = () => {
    if (cvModal) {
      cvModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (cvModal) {
      cvModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (openNavBtn) openNavBtn.addEventListener('click', openModal);
  if (openHeroBtn) openHeroBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModal && cvModal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* -------------------------------------------------------------
 * 9. SCHEMATIC & IMAGE LIGHTBOX MODAL
 * ------------------------------------------------------------- */
function initLightbox() {
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const targetImg = trigger.getAttribute('data-img');
      const fallbackImg = trigger.getAttribute('data-fallback');
      const caption = trigger.getAttribute('data-caption') || 'Pratinjau Diagram Teknis';

      if (lightboxModal && lightboxImg) {
        // Test if primary image loads, else fallback
        const testImg = new Image();
        testImg.onload = () => {
          lightboxImg.src = targetImg;
        };
        testImg.onerror = () => {
          lightboxImg.src = fallbackImg;
        };
        testImg.src = targetImg;

        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* -------------------------------------------------------------
 * 10. VIDEO SHOWCASE CATEGORY FILTERING
 * ------------------------------------------------------------- */
function initVideoFilters() {
  const filterBtns = document.querySelectorAll('[data-video-filter]');
  const videoCards = document.querySelectorAll('.video-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-video-filter');

      videoCards.forEach(card => {
        const category = card.getAttribute('data-video-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}


