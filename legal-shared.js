/* ============================================================
   ClassMitra — Shared script for legal pages
============================================================ */

/* NAV TOGGLE */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* LOGO CLICK -> GO HOME (TOP) */
function goHomeTop() {
  window.location.href = "index.html";
}
const logoTop = document.getElementById("logoHomeTop");
const logoBottom = document.getElementById("logoHomeBottom");
if (logoTop) logoTop.addEventListener("click", goHomeTop);
if (logoBottom) logoBottom.addEventListener("click", goHomeTop);

/* TABLE OF CONTENTS — SCROLL SPY */
(function () {
  const tocLinks = document.querySelectorAll(".legal-toc-list a");
  if (!tocLinks.length) return;

  const sections = Array.from(tocLinks)
    .map((link) => {
      const id = link.getAttribute("href").replace("#", "");
      return document.getElementById(id);
    })
    .filter(Boolean);

  function setActive(id) {
    tocLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + id);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length > 0) {
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActive(top.target.id);
      }
    },
    { rootMargin: "-90px 0px -60% 0px", threshold: 0 },
  );

  sections.forEach((sec) => observer.observe(sec));

  tocLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("href").replace("#", "");
      const target = document.getElementById(id);
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  });
})();
