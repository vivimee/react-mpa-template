/* eslint-disable */

(function (doc, win) {
  const docEl = doc.documentElement;
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  const recalc = function () {
    const { clientWidth } = docEl;
    if (!clientWidth) return;
    if (clientWidth >= 750) {
      docEl.style.fontSize = '100px';
      window.__root_font_size__ = 100;
    } else {
      const p = 100 * (clientWidth / 750);
      docEl.style.fontSize = `${p}px`;
      window.__root_font_size__ = p;
    }
  };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  recalc();
}(document, window));
