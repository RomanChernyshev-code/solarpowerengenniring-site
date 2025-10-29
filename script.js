 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/script.js b/script.js
index c7856b0c919f488ed3beb22c5ddf4e60f702ad77..5797419abddd9cd77586ddc49db42f50ddfb3ecc 100644
--- a/script.js
+++ b/script.js
@@ -1,42 +1,144 @@
 const navLinks = document.querySelector('.nav-links');
 const menuToggle = document.querySelector('.menu-toggle');
+const navbar = document.querySelector('.navbar');
 const yearEl = document.getElementById('year');
 
 if (menuToggle && navLinks) {
     menuToggle.setAttribute('aria-expanded', 'false');
 
     menuToggle.addEventListener('click', () => {
         navLinks.classList.toggle('open');
         const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
         menuToggle.setAttribute('aria-expanded', String(!expanded));
     });
 
     navLinks.querySelectorAll('a').forEach((link) => {
         link.addEventListener('click', () => {
             navLinks.classList.remove('open');
             menuToggle.setAttribute('aria-expanded', 'false');
         });
     });
 }
 
 const smoothLinks = document.querySelectorAll('a[href^="#"]');
 
 smoothLinks.forEach((link) => {
     link.addEventListener('click', (event) => {
         const targetId = link.getAttribute('href').slice(1);
         if (!targetId) {
             return;
         }
 
         const target = document.getElementById(targetId);
 
         if (target) {
             event.preventDefault();
             target.scrollIntoView({ behavior: 'smooth' });
         }
     });
 });
 
+const handleNavbarState = () => {
+    if (!navbar) {
+        return;
+    }
+
+    const shouldShrink = window.scrollY > 40;
+    navbar.classList.toggle('scrolled', shouldShrink);
+};
+
+handleNavbarState();
+window.addEventListener('scroll', handleNavbarState, { passive: true });
+
+const revealElements = document.querySelectorAll('[data-reveal]');
+const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
+
+if (revealElements.length && !prefersReducedMotion) {
+    const observer = new IntersectionObserver(
+        (entries, obs) => {
+            entries.forEach((entry) => {
+                if (entry.isIntersecting) {
+                    entry.target.classList.add('is-visible');
+                    obs.unobserve(entry.target);
+                }
+            });
+        },
+        {
+            threshold: 0.15,
+            rootMargin: '0px 0px -10% 0px',
+        }
+    );
+
+    revealElements.forEach((element) => observer.observe(element));
+} else {
+    revealElements.forEach((element) => element.classList.add('is-visible'));
+}
+
+const instagramGrid = document.querySelector('[data-instagram-grid]');
+
+if (instagramGrid) {
+    const instagramPosts = [
+        {
+            image: 'https://images.unsplash.com/photo-1584467735871-bc179c0c12a5?auto=format&fit=crop&w=800&q=80',
+            title: 'Світлини зі зборів у Конча-Заспі — ранкове плавання та силова робота.',
+            likes: '1 482',
+            url: 'https://www.instagram.com/brigantina.club/',
+        },
+        {
+            image: 'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=800&q=80',
+            title: 'Фехтувальний табір для юніорів: нові комбінації та командні вправи.',
+            likes: '2 036',
+            url: 'https://www.instagram.com/brigantina.club/',
+        },
+        {
+            image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80',
+            title: 'Перша команда готується до етапу Кубка світу — контрольні старти.',
+            likes: '3 210',
+            url: 'https://www.instagram.com/brigantina.club/',
+        },
+        {
+            image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80',
+            title: 'Лазер-ран: відпрацьовуємо точність стрільби та прискорення на фініші.',
+            likes: '1 904',
+            url: 'https://www.instagram.com/brigantina.club/',
+        },
+        {
+            image: 'https://images.unsplash.com/photo-1542219550-37153d387c34?auto=format&fit=crop&w=800&q=80',
+            title: 'Команда після перемоги на міжнародному турнірі у Варшаві.',
+            likes: '4 512',
+            url: 'https://www.instagram.com/brigantina.club/',
+        },
+        {
+            image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
+            title: 'Індивідуальні заняття з тренером: розбір тактики та технічних нюансів.',
+            likes: '1 126',
+            url: 'https://www.instagram.com/brigantina.club/',
+        },
+    ];
+
+    const likeIcon =
+        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5A4.5 4.5 0 0 1 6.5 4 5 5 0 0 1 12 6.09 5 5 0 0 1 17.5 4 4.5 4.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.54Z"/></svg>';
+
+    instagramPosts.forEach((post) => {
+        const postEl = document.createElement('a');
+        postEl.className = 'instagram-post';
+        postEl.href = post.url;
+        postEl.target = '_blank';
+        postEl.rel = 'noopener';
+        postEl.innerHTML = `
+            <img src="${post.image}" alt="${post.title}">
+            <div class="instagram-post-content">
+                <p class="instagram-post-title">${post.title}</p>
+                <div class="instagram-post-meta">
+                    ${likeIcon}
+                    <span>${post.likes}</span>
+                </div>
+            </div>
+        `;
+        instagramGrid.appendChild(postEl);
+    });
+}
+
 if (yearEl) {
     yearEl.textContent = new Date().getFullYear();
 }
 
EOF
)
