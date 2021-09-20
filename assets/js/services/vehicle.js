$(document).ready(function () {
    let csrf = $("input[name=_token]").val();
    let brandid;
    let year;
    $(".row div select").not(":first").prop("disabled", true);
    $(".row div select option:eq(0)").prop("disabled", true).prop("selected", true);
    $("#usagetype").change(function () {
        $("#year").prop("disabled", false);
        $("#year").change(function () {
            var usagetype = $("#usagetype").val();
            year = $("#year").val();
            $.ajax({
                url: "/" + language + "/getBrand",
                method: "POST",
                data: {
                    year: year,
                    _token: csrf,
                    usagetype: usagetype,
                },
                success: function (response) {
                    if (response.status === false) {
                        swalFire(response.title, response.message, response.type);
                    }
                    if (response.status === true) {
                        $("#brandid").prop("disabled", false);
                        response.data.map(function (element) {
                            $("#brandid").prepend(`
                            <option value="${element.markakodu}">${element.marka}</option>
                        `);
                        });
                    }
                }
            });
        });
    });

    $("#brandid").change(function () {
        brandid = $(this).val();
        $.ajax({
            url: "/" + language + "/getModel",
            method: "POST",
            data: {
                id: brandid,
                year: year,
                _token: csrf,
            },
            success: function (response) {
                if (response.status === true) {
                    $("#modelid").prop("disabled", false);
                    response.data.map(function (element) {
                        $("#modelid").prepend(`
                            <option value="${element.tipkodu}">${element.tip}</option>
                       `)
                    });
                }
                if (response.status === false) {
                    swalFire(response.title, response.message, response.type);
                }
            }
        });
    });

    $("#btnProposal").click(function () {
        $("#loading").fadeIn();
        $.post("/" + language + "/getVehicleValue", $("#Proposal").serialize(), function (response) {
            $("#loading").fadeOut();
            $("#CarsCasco div").remove();
            if (response.status) {
                $("#CarsCasco").prepend(`
                    <div style="text-align: center; padding: 17%">
                        <h2>${response.keyword}</h2>
                        <br>
                        <h1 style="color:red; font-weight:bold;">${response.price} ₺</h1>
                    </div>
            `);
                scrollTop("#CarsCasco");
            } else {
                swalFire(
                    response.title, response.message, response.type
                )
            }
        })
    });
})
