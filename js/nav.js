/* ==========================================================================
   GINGER SPICY GIRLS — shared site navigation
   Edit this ONE file to change the nav on every page of the site.
   Each page just needs: <div id="site-nav"></div> + <script src="js/nav.js">
   ========================================================================== */

(function () {
  var NAV_LINKS = [
    { href: "index.html",    label: "Home" },
    { href: "reviews.html",  label: "Reviews" },
    { href: "contact.html",  label: "Contact" }
  ];

  var INSTAGRAM_URL = "https://www.instagram.com/gingerspicygirls?igsh=NWQ3czFib2l0cjV4";

  function currentFile() {
    var path = window.location.pathname.split("/").pop();
    return path === "" ? "index.html" : path;
  }

  function buildNav() {
    var here = currentFile();

    var linksHTML = NAV_LINKS.map(function (link) {
      var isCurrent = link.href === here;
      return '<a href="' + link.href + '"' + (isCurrent ? ' aria-current="page"' : '') + '>' + link.label + '</a>';
    }).join("");

    var html =
      '<nav class="site-nav">' +
        '<div class="wrap">' +
          '<a class="nav-brand" href="index.html">' +
            '<img src="images/logo.jpg" alt="Ginger Spicy Girls logo">' +
            '<span>Ginger Spicy Girls</span>' +
          '</a>' +
          '<button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
          '<div class="nav-links" id="navLinks">' +
            linksHTML +
            '<a class="nav-ig" href="' + INSTAGRAM_URL + '" target="_blank" rel="noopener">' +
              '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 2.2.27 3 .8a4.9 4.9 0 0 1 1.78 1.78c.53.8.75 1.83.8 3C22.5 9.1 22.5 9.5 22.5 12.7v.6c0 3.2 0 3.6-.07 4.85-.05 1.17-.27 2.2-.8 3a4.9 4.9 0 0 1-1.78 1.78c-.8.53-1.83.75-3 .8-1.25.07-1.65.07-4.85.07h-.6c-3.2 0-3.6 0-4.85-.07-1.17-.05-2.2-.27-3-.8a4.9 4.9 0 0 1-1.78-1.78c-.53-.8-.75-1.83-.8-3C1.5 15.9 1.5 15.5 1.5 12.3v-.6c0-3.2 0-3.6.07-4.85.05-1.17.27-2.2.8-3A4.9 4.9 0 0 1 4.15 2.07c.8-.53 1.83-.75 3-.8C8.4 1.2 8.8 1.2 12 1.2v1zm0 3.05a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5zm0 2a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm6.9-.35a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z"/></svg>' +
              '<span>Follow us</span>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</nav>';

    document.getElementById("site-nav").innerHTML = html;

    var toggle = document.querySelector(".nav-toggle");
    var links = document.getElementById("navLinks");
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildNav);
  } else {
    buildNav();
  }
})();
