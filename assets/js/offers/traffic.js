$(document).ready(function() {
    $("#brandid, #modelid, #year").addClass("d-none");
    csrf = $("input[type=hidden]").val();
    $("#btnProposal").prop("disabled", true);
    $("#plateNo").prop("disabled", true);
    $("#usagetype").change(function() {
        $("#brandid select option, #modelid select option").prop("disabled", false).remove();
        var usageType = $(this, "option:selected").val()
        $("#year").removeClass("d-none");
        $("#year select").change(function() {
            let year = $(this, "option:selected").val();

            $.post("/" + language + "/getBrand", { usagetype: usageType, year: year, _token: csrf }, function(response) {
                $("#loading").fadeOut();

                if (response.status === true) {
                    $("#brandid").removeClass("d-none");
                    $("#brandid select").prepend(`
                        <option selected disabled>${response.keyword}</option>
                    `)
                    response.data.map(function(elements) {
                        $("select[name=brandid]").prepend(`
                        <option value="${elements.markakodu}">${elements.marka}</option>
                    `)
                    });
                } else {
                    if (response.type == "message") {
                        $("#brandid ").removeClass("d-none");
                        $("#brandid select option").remove();
                        $("#brandid select").append(`<option selected disabled>${response.message}</option>`);
                        return;
                    } else {
                        swalFire(
                            response.title,
                            response.message,
                            response.type,
                        );
                    }
                }
            });
        })
    });
    $("#year select").change(function() {
        $("#loading").fadeIn();
        $("#modelid").addClass("d-none");
        $("#brandid select option").prop("disabled", false).prop("selected", true).remove();
        $("#btnProposal").prop("disabled", true);

    });
    $("#brandid select").change(function() {
        $("#loading").fadeIn();
        $("#modelid select option").prop("disabled", false).remove();
        $("#modelid").removeClass("d-none");
        $("#btnProposal").prop("disabled", false);

        var brandid = $(this, "option:selected").val()
        var year = $("#year select").val();
        $.post("/" + language + "/getModel", { id: brandid, year: year, _token: csrf }, function(response) {
            $("#loading").fadeOut();

            if (response.status === true) {
                $("#modelid select").prepend(`
                        <option selected disabled>${response.keyword}</option>
                    `)
                response.data.map(function(data) {
                    $("#modelid select").prepend(`
                        <option value="${data.tipkodu}">${data.tip}</option>
                    `)
                });
            } else {
                swalFire(
                    response.title,
                    response.message,
                    response.type
                );
            }
        })
    });
    $("#modelid").change(function() {
        $(".recaptcha-area").removeClass("d-none")
    });
    $("#btnProposal").click(function() {
        $("#loading").fadeIn();
        $("#paymentcard").addClass("d-none")
        $(".total span").text("");
        $(".policy_no span").text("");
        var product_no = $("input[name=product_no]").val();
        var clino = $("#clino").val();
        var cliid = $("#cliid").val();
        var identity = $("#identity").val();

        var plate1 = $("#plate1 option:selected").val()
        var plateNo = $("#plateNo").val()
        var usagetype = $("#usagetype").val()
        var year = $("#year option:selected").val()
        var brandid = $("#brandid option:selected").val()
        var modelid = $("#modelid option:selected").val()
        var recaptcha = $("#g-recaptcha-response").val()
        grecaptcha.reset();

        var DATA = {
            clino: clino,
            cliid: cliid,
            identity: identity,
            plate1: plate1,
            plateNo: plateNo,
            usagetype: usagetype,
            year: year,
            brandid: brandid,
            modelid: modelid,
            _token: csrf,
            recaptcha: recaptcha,
        }

        $.ajax({
            url: "/" + language + "/getOfferTraffic",
            method: "POST",
            data: DATA,
            success: function(response) {
                $("#loading").fadeOut();
                if (response.status === false) {

                    response.messages.map(function(message) {
                        swalFire(
                            response.title,
                            message,
                            response.type,
                        );
                    });

                }
                if (response.status === true) {
                    $("#paymentcard").removeClass("d-none")
                    $(".total span").html(response.data.price);
                    $(".policy_no span").text(response.data.proposal_number);

                    $('html, body').animate({
                        scrollTop: $("#price").offset().top
                    }, 1000);
                }
            },
        })
    });
});