$(document).ready(function () {
    $("#brandid, #modelid, #year").addClass("d-none");
    $("#btnProposal").prop("disabled", true);
    $("#plateNo").prop("disabled", true);
    $("#usagetype").change(function () {
        $("#brandid, #modelid, #year").addClass("d-none");
        $("#brandid select option, #modelid select option").prop("disabled", false).remove();
        var usageType = $(this, "option:selected").val()
        $("#year").removeClass("d-none");
        $("#year select").change(function () {
            let year = $(this, "option:selected").val();

            $.post("/getBrand", {usagetype: usageType, year: year}, function (response) {
                $("#brandid").removeClass("d-none");
                $("#brandid select").prepend(`
                        <option selected disabled>Marka Seçiniz.</option>
                    `)
                response.map(function (elements) {
                    $("select[name=brandid]").prepend(`
                        <option value="${elements.markakodu}">${elements.marka}</option>
                    `)
                });
            });
        })
    });
    $("#year select").change(function () {
        $("#modelid").addClass("d-none");
        $("#brandid select option").prop("disabled", false).prop("selected", true).remove();
        $("#btnProposal").prop("disabled", true);

    });
    $("#brandid select").change(function () {
        $("#modelid select option").prop("disabled", false).remove();
        $("#modelid").removeClass("d-none");
        $("#btnProposal").prop("disabled", false);

        var brandid = $(this, "option:selected").val()
        var year = $("#year select").val();
        $.post("/getModel", {id: brandid, year: year}, function (response) {
            $("#modelid select").prepend(`
                        <option selected disabled>Model Seçiniz.</option>
                    `)
            response.map(function (data) {
                $("#modelid select").prepend(`
                        <option value="${data.tipkodu}">${data.tip}</option>
                    `)
            });
        })
    });
    $("#btnProposal").click(function () {
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
        }

        $.ajax({
            url: "/getOfferCasco",
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

            },
            error: function (data){
                console.log( data)
            }
        })
    });
});