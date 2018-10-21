// ==UserScript==
// @name         lexiflaire
// @version      1.0.0
// @description  Allows to make screenshot
// @author       m7r-227
// @licence      MIT
// @icon         http://www.lexiflaire.com/static/favicon.ico
// @match        http://www.lexiflaire.com/core
// @require      https://html2canvas.hertzen.com/dist/html2canvas.min.js
// @grant        none
// ==/UserScript==

const button = document.createElement('button');
button.classList.add('neu_button', 'btn_sm');
button.style.marginTop = '1rem'
button.textContent = 'Screenshot';

button.addEventListener('click', function () {
    const msg = document.querySelector('#msg');
    if (msg !== null) {
        html2canvas(msg).then(function (canvas) {
            const url = canvas.toDataURL();

            const date = new Date();
            const title = 'lexiflaire-' + date.toLocaleTimeString() + '-' + date.toLocaleDateString();

            const a = document.createElement('a');
            a.href = url;
            a.download = title;
            document.body.appendChild(a);
            a.click();
            a.remove();
        }).catch(console.error);
    } else {
        console.error('#msg missing');
    }
});

document.body.appendChild(button);