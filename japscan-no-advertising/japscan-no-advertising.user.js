// ==UserScript==
// @name         japscan-no-advertising
// @version      1.0.2
// @description  Remove the advertising page at the end of a chapter
// @author       m7r-227
// @licence      MIT
// @icon         https://cdn.japscan.cc/img/favicon.png
// @match        https://www.japscan.cc/lecture-en-ligne/*
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    // remove the last page from the pagination
    $('nav#pagination a.pagi:last').remove();
    // if we're on the new last page
    if ($('nav#pagination a.pagi:last').prop('href') === $('a#active').prop('href')) {
        // remove the next button
        $('a#next_link').parent().remove();
        // replace the image link with that of the next chapter
        $('a#img_link').prop('href', $('a#next_chapter').prop('href'));
    }
})();