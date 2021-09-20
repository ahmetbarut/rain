$(document).ready(function () {
    $("#btnApp").click(
        function () {
            var number = $("#phoneNumber").val();
            var plate = $("#plate_no").val();
            var email = $("#email").val();
            var contract1 = $("input[name=contract1]");
            var contract2 = $("input[name=contract2]");


            $.ajax({
                method: "POST",
                url: "/sendVerificationCode",
                data: {
                    number: number,
                    plate: plate,
                    email:email,
                    contract1: contract1.is(":checked"),
                    contract2: contract2.is(":checked")
                },
                success: function (response) {
                    console.log(response)
                    if (response.status === true) {
                        $("#appeal-agency").removeClass("d-block");
                        $("#appeal-agency").addClass("d-none");
                        $("#appeal-agency-code").addClass("d-block");
                        $("#appeal-agency-code #phoneNumberVerify").val(number);
                        $("#appeal-agency-code #phoneNumberVerify").attr("disabled",true);
                        $("#RecodeButton, #changeNumberButton").addClass("d-none");
                        var Counter = timerInterval = setInterval(() => {
                            timePassed = timePassed += 1;
                            timeLeft = TIME_LIMIT - timePassed;
                            document.getElementById("base-timer-label").innerHTML = formatTime(
                                timeLeft
                            );
                            setCircleDasharray();
                            setRemainingPathColor(timeLeft);

                            if (timeLeft === 0) {
                                $("#RecodeButton, #changeNumberButton").removeClass("d-none");
                                $("#RecodeButton, #changeNumberButton").prop("disabled",false);
                                onTimesUp();
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
    $("#sendVerifyCode").click(function (){
        var verifyCode = $("#v_code").val();

        $.ajax({
            url: "/sendCode",
            method: "POST",
            data: {code: verifyCode},
            success:function (response)
            {
                console.log(response);
            }
        })
    });
    $("#changeNumberButton").click(function ()
    {
        $("#appeal-agency-code").addClass("d-none");
        $("#appeal-agency").removeClass("d-none");
    });

});
