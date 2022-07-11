"use strict";

!function () {
  "use strict";

  var e = "off-canvas"; 

  function l(t) {
    t.className = e;
  }

  function c() {
    var e = document.querySelector(".off-canvas-overlay");
    e && e.remove();
  }

  function r() {
    0 === e.length ? window.requestAnimationFrame(r) : document.getElementsByClassName(e)[0].style.top = window.pageYOffset.toString() + "px";
  }

  var i = document.querySelector("body"),
      a = document.querySelector(".icon-open-container"),
      u = document.querySelector(".off-canvas");
  a.addEventListener("click", function () {
    var e = [document.querySelector(".icon-close")];
    (function (e) {
      !function (e) {
        e.className = "off-canvas show", e.style.visibility = "visible";
      }(e), function () {
        var e = document.createElement("div");
        e.className = "off-canvas-overlay", document.body.appendChild(e);
      }(), r();
    })(u, i), function (e, n, r) {
      {
        var _t3 = document.querySelector(".off-canvas-overlay");

        e.push(_t3);
      }

      for (var _i = 0; _i < e.length; _i++) {
        e[_i].addEventListener("click", function () {
          l(n), c();
        });
      }
    }(e, u, i);
  });
}();
//# sourceMappingURL=all.js.map