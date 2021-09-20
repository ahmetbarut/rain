$(document).ready(function () {
    let phone;
    let identity;
    $("#register-btn").click(function () {

        identity = $("#usernameforreg").val()
        var phoneNumber = $("#phonenumforreg").val()
        var contract1 = $("input[name=contract1]").val()
        var contract2 = $("input[name=contract2]").val()

        $.ajax({
            url: "/" + language + "/register",
            method: "POST",
            data: {
                _token: $("meta[name=csrf-token]").attr("content"),
                identity: identity,
                phoneNumber: phoneNumber,
                contract1: contract1,
                contract2: contract2,
            },
            success: function (response) {
                if (response.status) {
                    swalFire(
                        response.title,
                        response.message,
                        response.type
                    )
                    $("#reg-resend-btn").addClass("d-none");
                    $("#reg-resend-btn").prop("disabled", true);
                    $("#client-register-code input[name=phoneNumber]").prop("disabled", true)
                    phone = response.data.phoneNumber
                    identity = response.data.identity
                     timerInterval = setInterval(() => {
                        timePassed = timePassed += 1;
                        timeLeft = TIME_LIMIT - timePassed;

                         console.log(timeLeft)
                        document.getElementById("base-timer-label_3").innerHTML = formatTime(
                            timeLeft
                        );

                        setCircleDasharray();
                        setRemainingPathColor(timeLeft);
                        if (timeLeft === 0) {
                            $("#reg-resend-btn").removeClass("d-none");
                            $("#reg-resend-btn").prop("disabled", false);
                            onTimesUp();
                            $("#client-register-code input[name=phoneNumber]").prop("disabled", false)
                        }
                    }, 1000);
                    $("#client-register-code input[name=phoneNumber]").val(phone)
                    $("#client-register").css("display", "none");
                    $("#client-register-code").css("display","block");
                }else {
                    swalFire(
                        response.title,
                        response.message,
                        response.type
                    )
                }
            }
        })



    })

    $("#reg-resend-btn").click(function () {
        $("#client-register-code input[name=phoneNumber]").prop("disabled", true)
        $("#reg-resend-btn").addClass("d-none");

        data = $("#client-register").serialize();
        phoneNumber = $("#phonenumforreg").val();
        $.ajax({
            url: "/" + language + "/register",
            method: "POST",
            data: {
                identity: identity,
                phoneNumber: phone,
                _token: $("meta[name=csrf-token]").attr("content"),
                contract1: "on",
                contract2: "on",
            },
            success: function (response) {
                if (response.status) {
                    timerInterval = setInterval(() => {
                        TIME_LIMIT = 120;
                        timePassed = timePassed += 1;
                        timeLeft = TIME_LIMIT - timePassed;
                        document.getElementById("base-timer-label_2").innerHTML = formatTime(
                            timeLeft
                        );
                        setCircleDasharray();
                        setRemainingPathColor(timeLeft);
                        if (timeLeft === 0) {
                            $("#reg-resend-btn").removeClass("d-none");
                            $("#reg-resend-btn").prop("disabled", false);
                            onTimesUp();
                            $("#client-register-code input[name=phoneNumber]").prop("disabled", false)
                        }
                    }, 1000);
                    $("#client-register-code input[name=phoneNumber]").val()
                    $("#client-register").css("display", "none");
                    $("#client-register-code").css("display","block");
                }
            }
        })
    });

    $("#btn-reg").click(function (){
        code = $("#auth_cliregister #register_v_code").val();

        $.ajax({
            url: "/" + language + "/registerVerify",
            method: "POST",
            data: {
                identity: identity,
                code: code,
                phoneNumber: phone,
                _token: $("meta[name=csrf-token]").attr("content")
            },
            success: function (response)
            {
                if (response.status)
                {
                    swalFire(
                        response.title,
                        response.message,
                        response.type
                    );
                    $("#auth_cliregister").removeClass("show");
                }else {
                    swalFire(
                        response.title,
                        response.message,
                        response.type
                    )
                }
            }

        })
    });
});
