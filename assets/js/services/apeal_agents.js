$(document).ready(function () {
    let phone, plate;
    csrf = $("input[name=_token]").val();
    $("#btnApp").click(
        function () {
            var number = $("#phoneNumber").val();
            var plate = $("#plate_no").val();
            var email = $("#email").val();
            var contract1 = $("input[name=contract1]");
            var contract2 = $("input[name=contract2]");

            $.ajax({
                method: "POST",
                url: "/"+ language +  "/sendVerificationCode",
                data: {
                    phoneNumber: number,
                    plateRegisterNumber: plate,
                    email:email,
                    contract1: contract1.is(":checked"),
                    contract2: contract2.is(":checked"),
                    _token: csrf,
                },
                success: function (response) {
                    if (response.status === true) {
                        phone = response.data.phoneNumber;
                        plate = response.data.plate;
                        $("#appeal-agency").removeClass("d-block");
                        $("#appeal-agency").addClass("d-none");
                        $("#appeal-agency-code").addClass("d-block");
                        $("#appeal-agency-code #phoneNumberVerify").val(number);
                        $("#appeal-agency-code #phoneNumberVerify").attr("disabled",true);
                        $("#RecodeButton, #changeNumberButton").addClass("d-none");
                        timerInterval = setInterval(() => {
                            timePassed = timePassed += 1;
                            timeLeft = TIME_LIMIT - timePassed;
                            document.getElementById("base-timer-label").innerHTML = formatTime(
                                timeLeft
                            );
                            setCircleDasharray();
                            setRemainingPathColor(timeLeft);

                            if (timeLeft === 0) {
                                $("#RecodeButton").removeClass("d-none");
                                $("#RecodeButton").prop("disabled", false);
                                $("#phoneNumberVerify").prop("disabled", false);
                                clearInterval(this.timerInterval);
                            }
                        }, 1000);
                    }else if(response.status === false)
                    {
                        Swal.fire(response.title, response.message, response.type)
                    }
                }
            });
        }
    );
    $("#RecodeButton").click(function (){

    });
    $("#sendVerifyCode").click(function (){
        var verifyCode = $("#v_code").val();
        var number = $("#phoneNumber").val();
        var plate = $("#plate_no").val();

        $.ajax({
            url: "/"  + language + "/sendCode",
            method: "POST",
            data: {
                phoneNumber: number,
                plateRegisterNumber: plate,
                code: verifyCode,
                _token: csrf
            },
            success:function (response)
            {
                if (response.status === false){
                    swalFire(response.title, response.message, response.type);
                    $("#app_agent").css("display", "none");
                    onTimesUp();
                }

                if (response.status === true)
                {
                    swalFire(response.title, response.message, response.type);
                    $("#appeal-agency-code").addClass("d-block");
                    $("#appeal-agency-code").removeClass("d-none");
                    $("#appeal-agency").removeClass("d-block");
                    $("#Proposal").reset();
                }
            }
        })
    });
    $("#changeNumberButton").click(function ()
    {
        $("#appeal-agency-code").addClass("d-none");
        $("#appeal-agency-code").removeClass("d-block");
        $("#appeal-agency").removeClass("d-none");
    });

});

function circleTime(TIME_LIMIT,timePassed = 0)
{
    return Counter = timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(
            timeLeft
        );
        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            $("#RecodeButton, #changeNumberButton").removeClass("d-none");
            $("#RecodeButton, #changeNumberButton").prop("disabled", false);
            onTimesUp();
        }
    }, 1000);
}
