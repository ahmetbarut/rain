$(document).ready(function () {
    csrf = $("input[name=_token]").val();
    $(".recaptcha-area").removeClass("d-none");
    $("#btnProposal").click(function () {
        var recaptcha = $("#g-recaptcha-response").val()
        var clino = $("input[name=clino]").val();
        var cliid = $("input[name=cliid]").val();
        var identity = $("#identity").val();
        var travel_type = $("select[name=travel_type]").val();
        var country_travel = $("select[name=country_travel]").val();
        var startDate = $("input[name=startDate]").val();
        var endDate = $("input[name=endDate]").val();
        var jobs = $("select[name=jobs]").val();

        $("#loading").fadeIn();

        grecaptcha.reset();

        $.ajax({
            url: "/" + language + "/getOfferTravel",
            method: "POST",
            data: {
                clino: clino,
                cliid: cliid,
                identity: identity,
                travel_type: travel_type,
                country_travel: country_travel,
                startDate: startDate,
                endDate: endDate,
                jobs: jobs,
                _token: csrf,
                recaptcha: recaptcha,

            },
            success: function (response) {
                $("#loading").fadeOut();
                if (response.status === false) {
                    if (response.messages) {
                        response.messages.map(function (message) {
                            swalFire(
                                response.title,
                                message,
                                response.type,
                            );
                        });
                    } else {
                        swalFire(
                            response.title,
                            response.message,
                            response.type,
                        );
                    }
                } else {
                    $("#price").removeClass("d-none")
                    $(".total span").text(response.data.price);
                    $(".policy_no span").text(response.data.proposal_number);
                }
            }
        })

    });

})
