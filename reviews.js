/* ==========================================================================
   GINGER SPICY GIRLS — review rendering, modal & lightbox
   Reads from REVIEWS (js/reviews-data.js). Works on index.html (preview)
   and reviews.html (full grid + sort).
   ========================================================================== */

(function () {
  function chiliString(count) {
    return "\ud83c\udf36\ufe0f".repeat(count);
  }

  function escapeHTML(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function cardHTML(review) {
    return (
      '<article class="review-card" data-slug="' + review.slug + '">' +
        '<div class="thumb">' +
          '<img src="' + review.cover + '" alt="' + escapeHTML(review.name) + '" loading="lazy">' +
          '<span class="chilirow">' + chiliString(review.chilis) + '</span>' +
        '</div>' +
        '<div class="body">' +
          '<div class="loc">' + escapeHTML(review.location) + '</div>' +
          '<h3>' + escapeHTML(review.name) + '</h3>' +
          '<p class="teaser">' + escapeHTML(review.teaser) + '</p>' +
          '<button class="readmore" data-slug="' + review.slug + '">Read the full review &rarr;</button>' +
        '</div>' +
      '</article>'
    );
  }

  function renderGrid(containerId, list) {
    var el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = list.map(cardHTML).join("");
    el.querySelectorAll(".readmore, .thumb").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var card = trigger.closest(".review-card");
        openModal(card.getAttribute("data-slug"));
      });
    });
  }

  function sortedReviews(order) {
    var list = REVIEWS.slice();
    list.sort(function (a, b) {
      var da = new Date(a.date), db = new Date(b.date);
      return order === "oldest" ? da - db : db - da;
    });
    return list;
  }

  /* ---- modal ---- */
  function buildModalShell() {
    if (document.getElementById("reviewModal")) return;
    var overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "reviewModal";
    overlay.innerHTML =
      '<div class="modal-card">' +
        '<button class="modal-close" id="modalClose" aria-label="Close">&times;</button>' +
        '<div class="modal-gallery" id="modalGallery"></div>' +
        '<div class="modal-body">' +
          '<div class="loc" id="modalLoc"></div>' +
          '<h3 id="modalName"></h3>' +
          '<div class="chilirow" id="modalChilis"></div>' +
          '<div class="text" id="modalText"></div>' +
          '<div class="actions">' +
            '<a class="btn btn-solid" id="modalIgLink" target="_blank" rel="noopener">Find them on Instagram</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.id = "lightbox";
    lightbox.innerHTML = '<img id="lightboxImg" src="" alt="">';
    document.body.appendChild(lightbox);

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeModal();
    });
    document.getElementById("modalClose").addEventListener("click", closeModal);
    lightbox.addEventListener("click", function () { lightbox.classList.remove("open"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeModal();
        lightbox.classList.remove("open");
      }
    });
  }

  function openModal(slug) {
    var review = REVIEWS.find(function (r) { return r.slug === slug; });
    if (!review) return;
    buildModalShell();

    document.getElementById("modalLoc").textContent = review.location;
    document.getElementById("modalName").textContent = review.name;
    document.getElementById("modalChilis").textContent = chiliString(review.chilis);
    document.getElementById("modalText").textContent = review.text;

    var igLink = document.getElementById("modalIgLink");
    igLink.textContent = "View " + review.instagram + " on Instagram";
    igLink.href = "https://www.instagram.com/" + review.instagram.replace("@", "");

    var gallery = document.getElementById("modalGallery");
    gallery.innerHTML = review.gallery.map(function (src) {
      return '<img src="' + src + '" alt="' + escapeHTML(review.name) + '" loading="lazy">';
    }).join("");
    gallery.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("click", function () {
        document.getElementById("lightboxImg").src = img.src;
        document.getElementById("lightbox").classList.add("open");
      });
    });

    document.getElementById("reviewModal").classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    var overlay = document.getElementById("reviewModal");
    if (overlay) overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  /* expose for inline use / sort control */
  window.GSG = {
    renderGrid: renderGrid,
    sortedReviews: sortedReviews,
    openModal: openModal,
    chiliString: chiliString
  };
})();
