!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},t={},i=n.parcelRequired7c6;null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in t){var n=t[e];delete t[e];var i={id:e,exports:{}};return o[e]=i,n.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){t[e]=n},n.parcelRequired7c6=i);var r=i("iU1Pc"),c=0,a=0,l=0;document.querySelector(".form").addEventListener("submit",(function(n){n.preventDefault();var o=n.currentTarget.elements,t=o.delay,i=o.step,u=o.amount;c=0,a=Number(t.value),l=Number(i.value),setInterval((function(){var n,o,t,i;(c+=1)>u.value||((n=c,o=a,t=Math.random()>.3,i={position:n,delay:o},new Promise((function(e,n){setTimeout((function(){t?e(i):n(i)}),o)}))).then((function(n){var o=n.position,t=n.delay;console.log("✅ Fulfilled promise ".concat(o," in ").concat(t,"ms")),e(r).Notify.success("✅ Fulfilled promise ".concat(o," in ").concat(t,"ms"))})).catch((function(n){var o=n.position,t=n.delay;console.log("❌ Rejected promise ".concat(o," in ").concat(t,"ms")),e(r).Notify.failure("❌ Rejected promise ".concat(o," in ").concat(t,"ms"))})),a+=l)}),l)}))}();
//# sourceMappingURL=03-promises.c7b56dfe.js.map