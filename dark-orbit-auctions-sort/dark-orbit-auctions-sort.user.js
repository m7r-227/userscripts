// ==UserScript==
// @name         dark-orbit-auctions-sort
// @version      1.0.0
// @description  Allows to sort the auction list
// @author       m7r-227
// @icon         http://darkorbit.com/favicon.ico
// @match        https://*.darkorbit.com/indexInternal.es?action=internalAuction*
// @require      https://code.jquery.com/jquery-1.12.1.js
// @require      http://code.jquery.com/ui/1.12.1/jquery-ui.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

(function () {
    'use strict';
    
    // get the saved list or initialize it to an empty array
    let sortedAuctions;
    try {
        sortedAuctions = JSON.parse(GM_getValue('sorted-auctions', '[]'));
    } catch (err) {
        sortedAuctions = [];
    }

    if (sortedAuctions.length > 0) {
        sortedAuctions.forEach(function (itemkey, i) {
            let $tr = $(`tr[itemkey="${itemkey}"]:first`);
            if (i % 2 === 0) {
                $tr.addClass('evenRow');
            } else {
                $tr.removeClass('evenRow');
            }
            $tr.appendTo($('.jspPane:first'));
        });
    } else {
        // if the list is empty, save the default state
        saveState();
    }

    // Make the auction list sortable
    $('.jspPane:first').sortable({
        stop: saveState
    });

    // add a button to reset the list
    $('<div/>', {
        text: 'RESET',
        class: 'auction_subtab',
        click: function () {
            GM_deleteValue('sorted-auctions');
            location.reload(true);
        }
    }).insertAfter($('#auction_history'));

    // remove some margin-right to make it fits in
    $('.auction_subtab').css('margin-right', '0');

    // Save the current state of the auction list
    function saveState() {
        let sortedAuctions = $('.jspPane:first tr[itemkey]').map((i, el) => {
            return el.getAttribute('itemkey');
        }).toArray();
        GM_setValue('sorted-auctions', sortedAuctions);
    }
})();