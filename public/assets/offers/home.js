$(document).ready(function () {
    $("select[name=home_owner]").change(function (){
        if ($(this, " option:selected").val() == 1){
            $("input[name=home_value]").removeClass("d-none")
        }else if ($(this, " option:selected").val() == 2){
            $("input[name=home_value]").addClass("d-none");
        }
    });

    $("#btnProposal").click(function () {
        $("#paymentcard").addClass("d-none")
        $(".total span").text("");
        $(".policy_no span").text("");



        var clino = $("#clino").val();
        var home_value = $("#home_value").val();
        var cliid = $("#cliid").val();
        var identity = $("#identity").val();
        var item_value = $("#item_value").val();

        var home_owner = $("#home_owner option:selected").val()
        var build = $("#build option:selected").val()
        var DATA = {
            clino: clino,
            cliid: cliid,
            identity: identity,
            home_value: home_value,
            item_value: item_value,
            home_owner: home_owner,
            build: build,
        }

        $.ajax({
            url: "/getOfferHome",
            method: "POST",
            data: DATA,
            success: function (response) {
                if (response.status === false) {
                    Swal.fire(
                        'Hata!',
                        response.message,
                        'warning'
                    );
                }
                if (response.status === true) {
                    $("#paymentcard").removeClass("d-none")
                    $(".total span").text(response.data.price);
                    $(".policy_no span").text(response.data.proposal_number);
                }

            }
        })
    });

});