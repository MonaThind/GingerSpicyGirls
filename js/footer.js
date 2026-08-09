/* ==========================================================================
   GINGER SPICY GIRLS — shared site footer
   Edit this ONE file to change the footer on every page of the site.
   Each page just needs: <div id="site-footer"></div> + <script src="js/footer.js">
   ========================================================================== */

(function () {
  var INSTAGRAM_URL = "https://www.instagram.com/gingerspicygirls?igsh=NWQ3czFib2l0cjV4";
  var EMAIL = "Gingerspicygirls@gmail.com";
  var YEAR = new Date().getFullYear();

  var html =
    '<footer class="site-footer">' +
      '<div class="wrap">' +
        '<div class="footer-top">' +
          '<div class="footer-brand">' +
            '<img src="images/logo.jpg" alt="Ginger Spicy Girls logo">' +
            '<div>' +
              '<div class="name">Ginger Spicy Girls</div>' +
              '<div class="tag">We Bite. We Sip. We Judge. We Repeat.</div>' +
            '</div>' +
          '</div>' +
          '<div class="footer-links">' +
            '<div class="footer-col">' +
              '<h4>Explore</h4>' +
              '<a href="index.html">Home</a>' +
              '<a href="reviews.html">Reviews</a>' +
              '<a href="contact.html">Contact</a>' +
            '</div>' +
            '<div class="footer-col">' +
              '<h4>Find us</h4>' +
              '<a href="' + INSTAGRAM_URL + '" target="_blank" rel="noopener">@gingerspicygirls</a>' +
              '<a href="mailto:' + EMAIL + '">' + EMAIL + '</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>&copy; ' + YEAR + ' Ginger Spicy Girls. All opinions our own (and unfiltered).</span>' +
          '<span>Serving spice, sass &amp; side dishes.</span>' +
        '</div>' +
      '</div>' +
    '</footer>';

  function inject() {
    document.getElementById("site-footer").innerHTML = html;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
