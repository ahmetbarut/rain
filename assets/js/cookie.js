$(document).ready(function() {
    var cookieStore = localStorage.getItem('cookieData');
    if (!cookieStore || !JSON.parse(localStorage.getItem("cookieData")).isConfirmed) {
        $('.cookie_contract').show();
    }
    $('#cookie-contract-btn').click(function() {
        var cookieData = { isConfirmed: true };
        localStorage.setItem("cookieData", JSON.stringify(cookieData));

        $('.cookie_contract').hide();

    });

});