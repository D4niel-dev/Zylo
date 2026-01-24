document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle Icon
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Dropdown Click Toggle for Mobile
    const dropdownTriggers = document.querySelectorAll('.dropdown > a');
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // Only toggle on small screens (mobile)
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Stop the link from navigating
                const dropdown = trigger.closest('.dropdown');
                dropdown.classList.toggle('open');
            }
        });
    });



    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Guard against invalid selectors (e.g., just "#" or empty)
            if (!href || href === '#' || href.length < 2) {
                return; // Do nothing for invalid hrefs
            }
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open (using class-based toggle)
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    // Reset hamburger icon
                    const icon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;
                    if (icon) {
                        icon.classList.remove('fa-xmark');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
    // FAQ Toggle
    const faqToggle = document.getElementById('faq-toggle');
    if (faqToggle) {
        faqToggle.addEventListener('click', () => {
            document.querySelectorAll('.faq-hidden').forEach(el => {
                el.style.display = 'block';
                // Small animation for reveal
                el.style.opacity = '0';
                el.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    el.style.transition = 'all 0.4s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 10);
            });
            faqToggle.style.display = 'none';
        });
    }
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const icon = themeToggle ? themeToggle.querySelector('i') : null;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        htmlEl.setAttribute('data-theme', 'light');
        if (icon) {
             icon.classList.remove('fa-sun');
             icon.classList.add('fa-moon');
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme');
            if (currentTheme === 'light') {
                htmlEl.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                htmlEl.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
});

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW Registered'))
            .catch(err => console.log('SW Fail:', err));
    });
}


// Typewriter Animation
const typeText = document.getElementById('typewriter-text');
if (typeText) {
    const commands = [
        { os: 'Windows', prompt: 'C:\\> ', cmd: 'git clone https://github.com/D4niel-dev/Zylo-Beta-1.3.2' },
        { os: 'Linux', prompt: '$ ', cmd: 'git clone https://github.com/D4niel-dev/Zylo-Beta-1.3.2' },
        { os: 'Mac', prompt: '% ', cmd: 'git clone https://github.com/D4niel-dev/Zylo-Beta-1.3.2' }
    ];
    
    let cmdIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function type() {
        if (isWaiting) return;

        const current = commands[cmdIndex];
        const fullText = current.prompt + current.cmd;

        if (isDeleting) {
            typeText.textContent = fullText.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                cmdIndex = (cmdIndex + 1) % commands.length;
            }
        } else {
            typeText.textContent = fullText.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === fullText.length) {
                isDeleting = true;
                isWaiting = true;
                setTimeout(() => {
                    isWaiting = false;
                    type(); 
                }, 3000); // Wait 3s before deleting
                return;
            }
        }

        // Typing speed vs Deleting speed
        const speed = isDeleting ? 30 : 60; 
        setTimeout(type, speed);
    }

    type();
}

// OS Selector Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('os-modal-overlay');
    const triggerBox = document.getElementById('install-trigger');
    const iconTriggers = document.querySelectorAll('.os-icon-trigger');
    const closeBtn = document.querySelector('.close-modal-btn');
    const osBtns = document.querySelectorAll('.os-btn');
    const modalCmd = document.getElementById('modal-cmd');
    
    // Commands
    const commands = {
        windows: `git clone https://github.com/D4niel-dev/Zylo-Beta-1.3.2
cd Zylo-Beta-1.3.2
pip install -r requirements.txt
python main.pyw`,
        mac: `git clone https://github.com/D4niel-dev/Zylo-Beta-1.3.2
cd Zylo-Beta-1.3.2
pip install -r requirements.txt
python3 main.pyw`,
        linux: `git clone https://github.com/D4niel-dev/Zylo-Beta-1.3.2
cd Zylo-Beta-1.3.2
pip install -r requirements.txt
python3 main.pyw`
    };

    function openModal(defaultOS = 'windows') {
        if (!modalOverlay) return;
        
        // Set active OS button
        osBtns.forEach(btn => {
            if (btn.dataset.os === defaultOS) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Set command
        if (modalCmd) modalCmd.textContent = commands[defaultOS];
        
        modalOverlay.classList.add('open');
    }

    function closeModal() {
        if (modalOverlay) modalOverlay.classList.remove('open');
    }

    if (triggerBox) {
        triggerBox.addEventListener('click', () => openModal('windows'));
    }

    iconTriggers.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation(); 
            openModal(icon.dataset.os);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    // Close on outside click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // OS Button Selection
    osBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            osBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update command
            const os = btn.dataset.os;
            if (modalCmd) {
                modalCmd.textContent = commands[os];
            }
        });
    });





    // Copy inside modal (Click on text)
    if (modalCmd) {
        modalCmd.addEventListener('click', () => {
             const textToCopy = modalCmd.textContent;
             navigator.clipboard.writeText(textToCopy).then(() => {
                 // visual feedback
                 modalCmd.classList.add('success');
                 
                 setTimeout(() => {
                     modalCmd.classList.remove('success');
                 }, 2000);
             }).catch(err => {
                 console.error('Failed to copy!', err);
             });
        });
    }
});

