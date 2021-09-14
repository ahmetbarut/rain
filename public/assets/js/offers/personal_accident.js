$(document).ready(function() {
    $(".recaptcha-area").removeClass("d-none");
    var csrf = $("input[name=_token]").val();
    $("#btnProposal").click(function() {
        $("#loading").fadeIn();

        data = {
            cliid: $("#cliid").val(),
            clino: $("#clino").val(),
            identity: $("#identity").val(),
            job: $("select[name=job]").val(),
            limit: $("select[name=limit]").val(),
            ex_50090: $("input[name=ex_50090]").is(":checked"),
            ex_50091: $("input[name=ex_50091]").is(":checked"),
            ex_50092: $("input[name=ex_50092]").is(":checked"),
            ex_50093: $("input[name=ex_50093]").is(":checked"),
            ex_50094: $("input[name=ex_50094]").is(":checked"),
            ex_50095: $("input[name=ex_50095]").is(":checked"),
            ex_50096: $("input[name=ex_50096]").is(":checked"),
            ex_51114: $("input[name=ex_51114]").is(":checked"),
            is_hks: $("input[name=is_hks]").is(":checked"),
            _token: csrf,
            recaptcha: $("#g-recaptcha-response").val(),
        }
        grecaptcha.reset();

        $.ajax({
            method: "POST",
            data: data,
            url: "/" + language + "/getOfferAccident",
            success: function(response) {
                $("#loading").fadeOut();
                if (response.status === false) {
                    if (response.messages) {
                        response.messages.map(function(message) {
                            swalFire(
                                response.title,
                                message,
                                response.type
                            );
                        });
                    }
                }
                if (response.status === true) {
                    $("#price").removeClass("d-none")
                    $(".total span").text(response.data.price);
                    $(".policy_no span").text(response.data.proposal_number);
                    $('html, body').animate({
                        scrollTop: $("#price").offset().top
                    }, 1000);

                }
            }
        })
    });
});