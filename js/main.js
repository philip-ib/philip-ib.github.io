/**
 * Portfolio v4 — Vanilla JavaScript
 *
 * Five responsibilities:
 * 1. Mobile menu toggle (hamburger + overlay + panel)
 * 2. Scroll-reveal animations (IntersectionObserver on .reveal)
 * 3. Skill bar fill animation (triggers when About section enters viewport)
 * 4. Active nav link highlighting (based on which section is visible)
 * 5. Dynamic project card rendering (from projectsData global)
 */

document.addEventListener('DOMContentLoaded', function () {
  initMobileMenu();
  initScrollReveal();
  initSkillBars();
  initNavHighlight();
  renderProjects();
});

/* ========================================================================
   1. Mobile Menu Toggle
   ======================================================================== */

function initMobileMenu() {
  var menuBtn = document.getElementById('menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  var overlay = document.getElementById('menu-overlay');

  if (!menuBtn || !mobileMenu || !overlay) return;

  function isOpen() {
    return !mobileMenu.classList.contains('hidden');
  }

  function openMenu() {
    mobileMenu.classList.remove('hidden');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    menuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileMenu.classList.add('hidden');
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  menuBtn.addEventListener('click', function () {
    if (isOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking the dark overlay
  overlay.addEventListener('click', closeMenu);

  // Close when a menu link is clicked
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) {
      closeMenu();
      menuBtn.focus();
    }
  });
}

/* ========================================================================
   2. Scroll-Reveal Animations
   ======================================================================== */

var revealObserver;

function initScrollReveal() {
  revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  observeRevealElements();
}

/**
 * Observe all .reveal elements that haven't been observed yet.
 * Called once on page load, and again after dynamic project rendering.
 */
function observeRevealElements() {
  document.querySelectorAll('.reveal').forEach(function (el) {
    if (!el.hasAttribute('data-reveal-observer')) {
      el.setAttribute('data-reveal-observer', '');
      revealObserver.observe(el);
    }
  });
}

/* ========================================================================
   3. Skill Bar Fill Animation
   ======================================================================== */

function initSkillBars() {
  var aboutSection = document.getElementById('about');
  if (!aboutSection) return;

  var animated = false;

  var skillObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !animated) {
          animated = true;

          // Animate all skill-fill bars to their target widths
          document.querySelectorAll('.skill-fill').forEach(function (bar) {
            var targetWidth = bar.getAttribute('data-width');
            if (targetWidth) {
              // Use requestAnimationFrame to ensure the initial 0% width
              // is rendered before transitioning to the target
              requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                  bar.style.width = targetWidth + '%';
                });
              });
            }
          });

          // Stop observing once animated
          skillObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  skillObserver.observe(aboutSection);
}

/* ========================================================================
   4. Active Nav Link Highlighting
   ======================================================================== */

function initNavHighlight() {
  var sections = document.querySelectorAll('section[id]');
  if (sections.length === 0) return;

  // Map section ids to their nav links
  var navLinks = {};
  ['about', 'projects', 'socials'].forEach(function (id) {
    var link = document.querySelector('a[href="#' + id + '"]');
    if (link) {
      navLinks[id] = link;
    }
  });

  var linkIds = Object.keys(navLinks);
  if (linkIds.length === 0) return;

  function resetAllLinks() {
    linkIds.forEach(function (id) {
      navLinks[id].style.color = '';
    });
  }

  function highlightLink(id) {
    if (navLinks[id]) {
      navLinks[id].style.color = 'var(--accent)';
    }
  }

  var navObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          resetAllLinks();
          highlightLink(entry.target.id);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '-80px 0px 0px 0px', // Offset for 64px navbar + buffer
    }
  );

  sections.forEach(function (section) {
    if (navLinks[section.id]) {
      navObserver.observe(section);
    }
  });
}

/* ========================================================================
   5. Dynamic Project Card Rendering
   ======================================================================== */

function renderProjects() {
  var grid = document.getElementById('projects-grid');
  if (!grid || typeof projectsData === 'undefined') return;

  var html = '';

  projectsData.forEach(function (project, idx) {
    var num = String(idx + 1).padStart(2, '0');
    var delay = idx * 100;

    // Build tag pills
    var tagsHtml = '';
    project.tags.forEach(function (tag) {
      tagsHtml +=
        '<span class="text-xs px-2 py-0.5 rounded-md"' +
        ' style="background: #ffffff06; color: var(--text-secondary); border: 1px solid #ffffff0d;">' +
        tag +
        '</span>';
    });

    html +=
      '<div class="reveal rounded-2xl overflow-hidden card-glow"' +
      ' style="background: var(--surface); border: 1px solid var(--border); transition-delay: ' + delay + 'ms;">' +

      /* Image area */
      '<div class="relative overflow-hidden h-48">' +
      '<img src="' + project.image + '" alt="' + project.title + '"' +
      ' class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"' +
      ' style="filter: brightness(0.7);" loading="lazy">' +
      '<div class="absolute inset-0" style="background: linear-gradient(180deg, transparent 60%, var(--surface) 100%);"></div>' +
      '<span class="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-md"' +
      ' style="background: var(--bg); color: var(--accent); border: 1px solid var(--border-visible);">' + num + '</span>' +
      '</div>' +

      /* Card body */
      '<div class="p-5">' +
      '<h3 class="font-bold text-lg mb-2" style="color: var(--text-primary);">' + project.title + '</h3>' +
      '<p class="text-sm leading-relaxed mb-4" style="color: var(--text-secondary);">' + project.description + '</p>' +

      /* Tags */
      '<div class="flex flex-wrap gap-1.5 mb-4">' + tagsHtml + '</div>' +

      /* Link */
      '<a href="' + project.link + '"' +
      ' class="inline-flex items-center gap-1 text-sm font-medium no-underline transition-colors duration-200"' +
      ' style="color: var(--accent);">' +
      'View Project <span class="text-xs">&rarr;</span>' +
      '</a>' +
      '</div>' +

      '</div>';
  });

  grid.innerHTML = html;

  // Observe newly rendered .reveal elements for scroll animation
  observeRevealElements();
}
