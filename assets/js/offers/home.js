$(document).ready(function() {
    $(".recaptcha-area").removeClass("d-none");
    csrf = $("input[name=_token]").val();
    $("select[name=home_owner]").change(function() {
        if ($(this, " option:selected").val() == 1) {
            $("input[name=home_value]").removeClass("d-none")
        } else if ($(this, " option:selected").val() == 2) {
            $("input[name=home_value]").addClass("d-none");
        }
    });

    $("#btnProposal").click(function() {
        $("#price").addClass("d-none")
        $("#loading").fadeIn();
        $("#paymentcard").addClass("d-none")
        $(".total span").text("");
        $(".policy_no span").text("");



        var clino = $("#clino").val();
        var home_value = $("#home_value").val();
        var cliid = $("#cliid").val();
        var identity = $("#identity").val();
        var item_value = $("#item_value").val();
        var recaptcha = $("#g-recaptcha-response").val()

        var home_owner = $("#owner option:selected").val()
        var build = $("#build option:selected").val()

        grecaptcha.reset();

        var DATA = {
            clino: clino,
            cliid: cliid,
            identity: identity,
            home_value: home_value,
            item_value: item_value,
            home_owner: home_owner,
            build: build,
            _token: csrf,
            recaptcha: recaptcha,
        }

        $.ajax({
            url: "/" + language + "/getOfferHome",
            method: "POST",
            data: DATA,
            success: function(response) {
                $("#loading").fadeOut();
                if (response.status === false) {
                    if (response.messages) {
                        response.messages.map(function(message) {
                            swalFire(
                                response.title,
                                message,
                                response.type,
                            )
                        });
                    } else {
                        swalFire(
                            response.title,
                            response.message,
                            response.type,
                        )
                    }
                }
                if (response.status === true) {
                    $("#price").removeClass("d-none")
                    $("#total span").html(response.data.price);
                    $("#policy_no span").text(response.data.proposal_number);
                    $('html, body').animate({
                        scrollTop: $("#price").offset().top
                    }, 1000);
                }

            }
        })
    });

});