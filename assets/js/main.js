var url = {
    "tr": "gonderi",
    "en": "post",
}
const language = splitUrl();

jQuery.event.special.touchstart = {
    setup: function(_, ns, handle) {
        this.addEventListener("touchstart", handle, {
            passive: true
        });
    }
};

counter = 0;
$(".material-icons").click(function() {
    counter++;
    console.log(counter);
});

$("#loading").css("display", "none");

$(document).ready(function() {
    setTimeout(function() {
        AOS.init();

    }, 1000);
    $("#loading").fadeOut();
    $(".offerbutton, .close").bind("click", function() {
        if ($(window).width() < 1000) {
            var modal = $("body").hasClass("modal-open");
            if (!modal) {
                $(".navbar").fadeOut();
            } else {
                $(".navbar").fadeIn();
            }
        }
    });
    $("input[name=phoneNumber]").mask("(000)-000-0000");
    $("input[name=startDate], input[name=endDate]").mask("00/00/0000");

    $('.jobs, .plaque, .building, .towns, #usagetype, #year select, .selects').select2();
    var first = $(".slider .slide_viewer .slide").first().css("display", "block");

    $("#auth_forgetpassword_btn").click(function() {
        var identity = $("input[name=identityForget]").val();

        $.ajax({
            method: "POST",
            url: "/" + language + "/resetPassword",
            data: {
                identity: identity,
                _token: csrf
            },
            success: function(response) {
                if (response.status) {
                    swalFire(
                        response.title,
                        response.message,
                        response.type
                    );
                    $("#auth_forgetpassword_form").addClass("d-none");
                    $("#auth_forgetpassword_code").removeClass("d-none");
                    $("input[name=identity]").val(identity).prop("disabled", true);
                    $("input[name=phoneNumber]").val(phoneNumber).prop("disabled", true);
                    timerInterval = setInterval(() => {
                        // TIME_LIMIT = 120;
                        timePassed = timePassed += 1;
                        timeLeft = TIME_LIMIT - timePassed;
                        document.getElementById("base-timer-label_2").innerHTML = formatTime(
                            timeLeft
                        );

                        setCircleDasharray();
                        setRemainingPathColor(timeLeft);
                        if (timeLeft === 0) {
                            onTimesUp();
                            $("#client-register-code input[name=phoneNumber]").prop("disabled", false)
                        }
                    }, 1000);
                } else {
                    swalFire(
                        response.title,
                        response.message,
                        response.type
                    );
                }
            }
        })
    });
    $("#auth_forgetpassword_btn_code").click(function() {
        var identity = $("input[name=identityForget]").val();
        var verifyCode = $("input[name=verifyCode]").val();

        $.ajax({
            method: "POST",
            url: "/" + language + "/resetPasswordCode",
            data: {
                identity: identity,
                verifyCode: verifyCode,
                _token: csrf
            },
            success: function(response) {
                if (response.status) {
                    swalFire(
                        response.title,
                        response.message,
                        response.type
                    );
                    onTimesUp();
                    $("#auth_forgetpassword").addClass("hide");
                    $("#auth_forgetpassword").removeClass("show");
                    $("input[name=identity]").val(identity).prop("disabled", true);
                    $("input[name=phoneNumber]").val(phoneNumber).prop("disabled", true);

                } else {
                    swalFire(
                        response.title,
                        response.message,
                        response.type
                    );
                }
            }
        })
    });




});

function swalFire(title, message, type = "warning") {
    return Swal.fire(title, message, type);
}

function splitUrl(isLang = true, segment = 0) {
    var url = window.location.pathname;

    if (isLang) {
        var first = url.split("/")[0];
        if (first.length == 2) {
            return first;
        } else if (first.length == 0 || first.length > 2) {
            return url.split("/")[1];
        }
    } else {
        return url.split("/")[segment]
    }
}

/**
 * Çoklu dil blog url'ni döndürür
 */
function getMlBlogUrl(lang, page) {
    var method = {
        "blog": {
            "en": "post",
            "tr": "gonderi"
        },
        "product": {
            "en": "products",
            "tr": "urunler"
        },
        "readmore": {
            "en": "Read More",
            "tr": "Devamını Oku"
        }
    }
    return method[page][lang];
}


function hideModal(selector) {
    $(selector).removeClass("show");
}


function scrollTop(selector) {
    $('html, body').animate({
        scrollTop: $(selector).offset().top
    }, 1000);
}

function TCKNo(tcno) {
    tcno = String(tcno);

    if (tcno.substring(0, 1) === '0') {
        return false;
    }
    if (tcno.length !== 11) {
        return false;
    }
    var ilkon_array = tcno.substr(0, 10).split('');
    var ilkon_total = hane_tek = hane_cift = 0;

    for (var i = j = 0; i < 9; ++i) {
        j = parseInt(ilkon_array[i], 10);
        if (i & 1) { // tek ise, tcnin çift haneleri toplanmalı!
            hane_cift += j;
        } else {
            hane_tek += j;
        }
        ilkon_total += j;
    }

    if ((hane_tek * 7 - hane_cift) % 10 !== parseInt(tcno.substr(-2, 1), 10)) {
        return false;
    }

    ilkon_total += parseInt(ilkon_array[9], 10);
    if (ilkon_total % 10 !== parseInt(tcno.substr(-1), 10)) {
        return false;
    }
    return true;
}

/**
 * Form kontrolünü hızlı bir şekilde yapmayı sağlar
 * @param selector Genel kapsayıcı
 * @param uri Kontrolün yapılacağı form
 * @param sendForm formun gönderileceği adres
 */
function validateForm(selector, uri, sendForm) {
    $("#loading").fadeIn();
    $(".alert").remove();
    $.ajax({
        method: "POST",
        url: "/product/" + uri,
        data: $(selector).serialize(),
        success: function(response) {
            if (JSON.parse(response).status === false) {
                $("#loading").fadeOut();
                $(selector).attr("method", "POST");
                $(selector).attr("action", sendForm);
                $(selector).submit();
            }
        },
        error: function(xhr) {
            JSON.parse(xhr.responseText).errors.map(function(error) {
                $("#loading").fadeOut();
                $(selector + " .form-control[name=" + error.rule + "], .form-check-input[name=" + error.rule + "]").parent().append(`
                 <div class="alert alert-danger text-center alert-dismissible fade show" role="alert">
                       ${error.message}
                     <button type="button" class="d-none" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                 </div>
            `);
            });
        }

    });
}