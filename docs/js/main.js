document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(15, 23, 42, 0.95)';
                navLinks.style.backdropFilter = 'blur(10px)';
                navLinks.style.padding = '1rem';
                navLinks.style.borderRadius = '0 0 var(--radius-lg) var(--radius-lg)';
            }
        });
    }

    // Copy to Clipboard
    const copyBtn = document.querySelector('.copy-btn');
    const codeElement = document.querySelector('code');

    if (copyBtn && codeElement) {
        copyBtn.addEventListener('click', () => {
             const textToCopy = codeElement.textContent.replace('git clone ', '').trim(); // Clean up if needed, or copy full
             navigator.clipboard.writeText(codeElement.textContent).then(() => {
                 const originalIcon = copyBtn.innerHTML;
                 copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
                 copyBtn.style.color = '#4ade80';
                 
                 setTimeout(() => {
                     copyBtn.innerHTML = originalIcon;
                     copyBtn.style.color = '';
                 }, 2000);
             });
        });
    }

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
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

