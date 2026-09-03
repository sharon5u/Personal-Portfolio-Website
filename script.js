// Highlights the nav link for whichever section is currently in view.
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length) return;

  const setCurrent = (id) => {
    navLinks.forEach((link) => {
      const isMatch = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('current', isMatch);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      // Pick the entry closest to the top of the viewport that's visible.
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        setCurrent(visible[0].target.id);
      }
    },
    {
      // Counts a section as "current" once it's near the top third of the screen.
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
});

// Flips the "book cover" open to reveal the projects grid, and lets it be
// closed again by flipping back.
document.addEventListener('DOMContentLoaded', () => {
  const cover = document.getElementById('bookCover');
  const openBtn = document.getElementById('seeWorkBtn');
  const closeBtn = document.getElementById('bookCloseBtn');

  if (!cover || !openBtn) return;

  const openBook = () => {
    cover.classList.add('is-open');

    const handleOpenEnd = (event) => {
      if (event.propertyName !== 'transform') return;
      cover.classList.add('is-hidden');
      cover.removeEventListener('transitionend', handleOpenEnd);
    };
    cover.addEventListener('transitionend', handleOpenEnd);

    openBtn.setAttribute('aria-expanded', 'true');
  };

  const closeBook = () => {
    // Make the cover visible again first (still flipped away), then let the
    // transform transition play back to 0deg on the next frame so it's
    // animated rather than snapping shut instantly.
    cover.classList.remove('is-hidden');
    requestAnimationFrame(() => {
      cover.classList.remove('is-open');
    });

    openBtn.setAttribute('aria-expanded', 'false');
  };

  openBtn.addEventListener('click', openBook);
  if (closeBtn) {
    closeBtn.addEventListener('click', closeBook);
  }
});
