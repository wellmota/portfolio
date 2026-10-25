/* Finby — photos for consórcio goals and for the success and empty moments.
   Free Unsplash photos (Unsplash License); authors and links in img/photos/CREDITS.md.
   Each file is pre-cropped to its largest use in the app at 3x: goals 360×360 (64px cards),
   success screens 780×540 (260×180), empty state 600×360 (200×120), friends 480×352 (92×68).
   FB.art(kind) → <img> that fills its frame (object-fit: cover). FB.artKinds lists the kinds. */
(function () {
  const FB = (window.FB = window.FB || {});
  /* resolved from this script, so pages outside the app (case boards) load the same files */
  const BASE = new URL('img/photos/', document.currentScript.src).href;
  const KINDS = ['beach', 'graduation', 'path', 'fireworks', 'cinema', 'campfire', 'celebrate', 'invite', 'payout', 'friends', 'empty'];

  FB.art = function (kind) {
    const k = KINDS.includes(kind) ? kind : 'empty';
    return `<img class="art-photo" src="${BASE}${k}.webp" alt="" decoding="async" draggable="false">`;
  };
  FB.artKinds = KINDS;
})();
