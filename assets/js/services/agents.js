const unitCode = $("#unitCode").val();
let csrf = $("input[name=_token]").val();
$(document).ready(function() {
    let cityCode;
    let townCode;

    $(".city").change(function() {
        cityCode = $(this, "option:selected").val();
        $(".towns option").remove();
        $("#loading, #loading .loading").fadeIn();
        townCode = "";
        $.ajax({
            method: "POST",
            data: { cityCode: cityCode, _token: csrf },
            url: "/" + language + "/getStates",
            success: function(response) {
                if (response.status === false) {
                    Swal.fire(
                        response.title,
                        response.message,
                        response.type
                    );
                } else if (response.status === true) {

                    response.data.map(function(elements) {
                        $(".states select").prepend(`
                      <option value="${elements.id}">${elements.name}</option>
                    `);
                    });
                    $(".states select").prepend(`
                      <option selected>${response.keys}</option>
                    `);
                    $("#loading").fadeOut();

                }
            }
        })
    });
    $(".towns").change(function() {
        townCode = $(this, "option:selected").val();
    })
    $("#btnServices").click(function() {
        $("#loading").fadeIn();
        $(".proposal-form-card").addClass("d-none");
        $(".card-2").remove();
        $.ajax({
            method: "POST",
            data: { cityCode: cityCode, townCode: townCode, unitCode: unitCode, _token: csrf },
            url: "/" + language + "/getAgents",
            success: function(response) {
                $("#loading").fadeOut();
                if (response.status === false) {
                    Swal.fire(
                        response.title,
                        response.message,
                        response.type
                    );
                    $("#services-list").prepend(`
                    <div class="proposal-form-card">
                        <div class="proposal-widget">
                            <div class="row ">
                                <div class="col-12 col-md-12 input-group-2 mb-2">
                                    <div style="padding: 16.5% 0;">
                                        <p style="text-align:center; font-size:22px;">${response.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `)
                } else if (response.status === true) {
                    response.data.map(function(name) {
                        $("#services-list").prepend(`
                <div class="card-2">
                    <div class="row">
                        <div class="col-md-2 d-flex align-items-center">
                            <span><img class="logo m-2 text-center d-flex justify-content-center" src="/assets/images/logo/sigortaturklogored.svg" alt="..."></span>
                        </div>
                        <div class="col-md-10 d-flex align-items-center">
                            <div class="col-md-12">
                                <div class="col-md-12 m-2 d-flex align-items-center">
                                    <span class="material-icons mr-1">person_pin</span>${name}</div>

                                <div class="col-md-12 m-2 d-flex align-items-center">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
                        scrollTop("#services-list");
                    })
                }
            }
        })
    })

})