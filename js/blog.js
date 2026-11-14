/* =========================================================
   BLOG STRATIA — comportamenti dell'indice e dell'articolo
   (testata e menu mobile sono gestiti da servizi.js)
========================================================= */
(function () {
  "use strict";

  function track(name, data) {
    try { if (window.umami) window.umami.track(name, data); } catch (e) {}
  }

  var y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- barra di avanzamento lettura ---------- */
  var bar = document.getElementById("readProgress");
  var article = document.querySelector("article.post .prose");
  if (bar && article) {
    var ticking = false;
    var fired = { 50: false, 90: false };
    function update() {
      var rect = article.getBoundingClientRect();
      var total = rect.height - window.innerHeight * 0.6;
      var done = Math.min(Math.max(-rect.top + window.innerHeight * 0.2, 0), total);
      var pct = total > 0 ? (done / total) * 100 : 0;
      bar.style.width = pct.toFixed(1) + "%";
      [50, 90].forEach(function (m) {
        if (!fired[m] && pct >= m) {
          fired[m] = true;
          var d = document.querySelector("article.post");
          track("blog_lettura_" + m, { articolo: d ? d.getAttribute("data-slug") : "" });
        }
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- condivisione ---------- */
  document.querySelectorAll(".share").forEach(function (box) {
    var url = box.getAttribute("data-share-url");
    var title = box.getAttribute("data-share-title");
    var copy = box.querySelector("[data-copy]");
    var nativeBtn = box.querySelector("[data-native]");

    box.querySelectorAll("a[data-net]").forEach(function (a) {
      a.addEventListener("click", function () {
        track("blog_condivisione", { rete: a.getAttribute("data-net") });
      });
    });

    if (copy) {
      copy.addEventListener("click", function () {
        function done() {
          var old = copy.textContent;
          copy.textContent = "Link copiato ✓";
          setTimeout(function () { copy.textContent = old; }, 2200);
          track("blog_condivisione", { rete: "copia-link" });
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done, fallback);
        } else { fallback(); }
        function fallback() {
          var t = document.createElement("textarea");
          t.value = url; t.setAttribute("readonly", "");
          t.style.position = "fixed"; t.style.opacity = "0";
          document.body.appendChild(t); t.select();
          try { document.execCommand("copy"); done(); } catch (e) {}
          document.body.removeChild(t);
        }
      });
    }

    if (nativeBtn && navigator.share) {
      nativeBtn.hidden = false;
      nativeBtn.addEventListener("click", function () {
        navigator.share({ title: title, url: url }).then(function () {
          track("blog_condivisione", { rete: "nativa" });
        }, function () {});
      });
    }
  });

  /* ---------- filtro per tema nell'indice ---------- */
  var filter = document.querySelector(".filter");
  if (filter) {
    var cards = document.querySelectorAll(".post-card");
    var none = document.getElementById("noResults");
    function apply(tag) {
      var shown = 0;
      cards.forEach(function (c) {
        var text = c.getAttribute("data-tags") || "";
        var ok = !tag || text.indexOf("|" + tag + "|") > -1;
        c.hidden = !ok;
        if (ok) shown++;
      });
      filter.querySelectorAll(".chip").forEach(function (b) {
        b.classList.toggle("is-on", b.getAttribute("data-filter") === tag);
      });
      if (none) none.hidden = shown > 0;
    }
    filter.addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      var tag = b.getAttribute("data-filter");
      apply(tag);
      track("blog_filtro", { tema: tag || "tutti" });
    });
    var q = new URLSearchParams(window.location.search).get("tema");
    if (q) apply(q);
  }
})();
