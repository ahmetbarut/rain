jQuery.event.special.touchstart = {
    setup: function (_, ns, handle) {
        this.addEventListener("touchstart", handle, {passive: true});
    }
};

$(document).ready(function () {
    $(window).scroll(function () {
        $(".lazy").each(function () {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height() + 100) {
                $(this).attr("src", $(this).attr("data-src"));
            }
        });
    });
});

function number() {
    var t = window.event ? event.keyCode : event.which,
        n = t;
    return n > 31 && (n < 48 || n > 57) ? !1 : !0
}



window.onload = function () {
    $(":input").inputmask();
    $("#phoneNumber").inputmask({"mask": "(999) 999-9999"});
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function htmlSpecialCharsetForJs(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function (m) {
        return map[m];
    });
}

function createContact() {

    var name = document.getElementById("name").value;
    var mail = document.getElementById("mail").value;
    var departman = document.getElementById("departman").value;
    var content = document.getElementById("content").value;
    var recaptcha = document.getElementById("g-recaptcha-response").value;
    if (name != htmlSpecialCharsetForJs(name) || mail != htmlSpecialCharsetForJs(mail) || departman != htmlSpecialCharsetForJs(departman) || content != htmlSpecialCharsetForJs(content)) {
        return alerta(2, lang.unSupportedHtmlCharacter);
    }
    if (recaptcha == "") {
        return alerta(2, lang.verifyRecaptcha);
    }
    if (name == "" || mail == "" || departman == "" || content == "") {
        return alerta(2, lang.pleaseFieldAll);
    }
    if (validateEmail(mail) == false) {
        return alerta(2, lang.pleaseFieldCorrectMail);
    }
    if (typeof departman != 'number' && departman < 1) {
        return alerta(2, lang.pleaseSelectDepertment);
    }
    if (content.length < 50) {
        return alerta(2, lang.pleaseFieldMessage);
    }

    $.ajax({
        type: 'POST',
        url: "/createContact",
        data: "name=" + name + "&mail=" + mail + "&departman=" + departman + "&content=" + content + "&recaptcha=" + recaptcha, //+"&ans="+ans+"&stage="+stage,
        success: function (datas) {
            var d = JSON.parse(datas);

            if (d.s == 2) {
                alerta(2, d.m);
            } else {
                alerta(2, lang.successMessage);

            }

        }

    })


}

function sendRecode() {

    $.ajax({
        type: 'POST',
        url: "/sendRecode",
        data: "", //+"&ans="+ans+"&stage="+stage,
        success: function (datas) {
            var d = JSON.parse(datas);

            if (d.s == 2) {
                alerta(2, lang.pleaseWaitReSendCode)
            } else {
                $('#RecodeButton').prop('disabled', true);
                $('#changeNumberButton').prop('disabled', true);

                reCodeTime();
                changeNumberTime();

            }

        }
    })

}

function sendRecodee() {

    $.ajax({
        type: 'POST',
        url: "/sendRecodeRegister",
        data: "",
        success: function (datas) {
            var d = JSON.parse(datas);

            if (d.s == 2) {
                alerta(2, lang.pleaseWaitReSendCode)
            } else {
                $('#RecodeButtone').prop('disabled', true);
                $('#changeNumberButtone').prop('disabled', true);

                reCodeTimee();
                changeNumberTimee();

            }

        }
    })

}

function sendRecodeee() {

    $.ajax({
        type: 'POST',
        url: "/sendRecodeForForget",
        data: "",
        success: function (datas) {
            var d = JSON.parse(datas);

            if (d.s == 2) {
                alerta(2, lang.pleaseWaitReSendCode)
            } else {
                $('#RecodeButtone').prop('disabled', true);
                reCodeTimeee();
            }

        }
    })

}

function changeNumberTime() {
    var myTimer2, changeNumber = 90;
    $('#changeNumber').html(changeNumber);
    myTimer2 = setInterval(function () {
        --changeNumber;
        $('#changeNumber').html(changeNumber);
        if (changeNumber === 0) {
            clearInterval(myTimer2);
            $('#changeNumber').html('');
            $('#changeNumberButton').prop('disabled', false);
        }
    }, 1000);
}

function reCodeTime() {
    var myTimer, reCodeTime = 90;
    $('#reCodeTime').html(reCodeTime);
    myTimer = setInterval(function () {
        --reCodeTime;
        $('#reCodeTime').html(reCodeTime);
        if (reCodeTime === 0) {
            clearInterval(myTimer);
            $('#reCodeTime').html('');
            $('#RecodeButton').prop('disabled', false);
        }
    }, 1000);
}

function reCodeTimee() {
    var myTimer, reCodeTimee = 90;
    $('#reCodeTimee').html(reCodeTimee);
    myTimer = setInterval(function () {
        --reCodeTimee;
        $('#reCodeTimee').html(reCodeTimee);
        if (reCodeTimee === 0) {
            clearInterval(myTimer);
            $('#reCodeTimee').html('');
            $('#RecodeButtone').prop('disabled', false);
        }
    }, 1000);
}

function reCodeTimeee() {
    var myTimer, reCodeTimeee = 90;
    $('#reCodeTimeee').html(reCodeTimeee);
    myTimer = setInterval(function () {
        --reCodeTimeee;
        $('#reCodeTimeee').html(reCodeTimeee);
        if (reCodeTimeee === 0) {
            clearInterval(myTimer);
            $('#reCodeTimeee').html('');
            $('#RecodeButtone').prop('disabled', false);
        }
    }, 1000);
}

function changeNumberTimee() {
    var myTimer2, changeNumbere = 90;
    $('#changeNumbere').html(changeNumbere);
    myTimer2 = setInterval(function () {
        --changeNumbere;
        $('#changeNumbere').html(changeNumbere);
        if (changeNumbere === 0) {
            clearInterval(myTimer2);
            $('#changeNumbere').html('');
            $('#changeNumberButtone').prop('disabled', false);
        }
    }, 1000);
}

function changeNumber() {

    document.getElementById('phonenum').value = '';
    document.getElementById('levha_no').value = '';
    document.getElementById('v_code').value = '';
    var secilenID = document.getElementById("appeal-agency");
    secilenID.style.display = "block";
    var secilenID = document.getElementById("appeal-agency-code");
    secilenID.style.display = "none";
}

function changeNumbere() {

    document.getElementById('usernameforreg').value = '';
    document.getElementById('phonenumforreg').value = '';
    document.getElementById('v_codee').value = '';
    var secilenID = document.getElementById("client-register");
    secilenID.style.display = "block";
    var secilenID = document.getElementById("client-register-code");
    secilenID.style.display = "none";
}

function sendRegAgent() {
    var levha_no = document.getElementById("plate_no");
    var phonenum = document.getElementById("phoneNumber");

    if (levha_no === "" || phonenum === "") {
        Swal.fire(lang.youCantLeaveBlankTaxOrPhone);
    } else {

        if (levha_no.value.length <= 8 || levha_no.value.length >= 13) {
            return Swal.fire(lang.taxNoMustBe8or12Character);
        }

    }

}

function forgetPasswordComplate() {
    var CODE = document.getElementById("forforgetidcode").value;


    if (CODE == "") {
        return alerta(2, lang.noEmptyCode);
    } else {

        $.ajax({
            type: 'POST',
            url: "/sendForgetCode",
            data: "code=" + CODE, //+"&ans="+ans+"&stage="+stage,
            success: function (datas) {
                var d = JSON.parse(datas);
                if (d.s == 2) {
                    alerta(2, lang.wrongCode);
                } else {
                    alerta(1, lang.changePasswordSuccess);
                    var secilenID = document.getElementById("client-forget");
                    secilenID.style.display = "block";
                    document.getElementById('forforgetid').value = '';

                    var secilenID = document.getElementById("client-forget-code");
                    secilenID.style.display = "none";
                    $('#auth_cliforget').modal('hide');
                    $('#auth_clilogin').modal('show');
                }

            }
        })
    }

}

function forgetPassword() {
    var ID = document.getElementById("forforgetid").value;


    if (ID == "") {
        return alerta(2, lang.noEmptyID);
    } else {

        if (ID.length != 11) {
            return alerta(2, lang.falseID);
        }


        $.ajax({
            type: 'POST',
            url: "/sendForget",
            data: "id=" + ID, //+"&ans="+ans+"&stage="+stage,
            success: function (datas) {
                var d = JSON.parse(datas);

                if (d.s == 2) {
                    alerta(2, lang.pleaseTryAfter);
                } else {
                    var secilenID = document.getElementById("client-forget");
                    secilenID.style.display = "none";
                    document.getElementById('forforgetid').value = '';

                    var secilenID = document.getElementById("client-forget-code");
                    secilenID.style.display = "block";
                    document.getElementById('forforgetidcode').value = '';
                    reCodeTimeee();

                }

            }
        })
    }

}

function sendRegister() {
    var username = document.getElementById("usernameforreg").value;
    var phonenum = document.getElementById("phonenumforreg").value;
    phonenum = phonenum.replaceAll('_', '');
    phonenum = phonenum.replaceAll(' ', '');
    phonenum = phonenum.replaceAll('-', '');
    phonenum = phonenum.replaceAll('(', '');
    phonenum = phonenum.replaceAll(')', '');


    if (username == "" || phonenum == "") {
        return alerta(2, "");
    } else {

        if (username.length != 11) {
            return alerta(2, lang.falseID);
        }

        if (phonenum.length != 10) {
            return alerta(2, lang.requirementPhoneNumber);

        }

        $.ajax({
            type: 'POST',
            url: "/sendRegister",
            data: "phonenum=" + phonenum + "&username=" + username, //+"&ans="+ans+"&stage="+stage,
            success: function (datas) {
                var d = JSON.parse(datas);

                if (d.s == 2) {
                    alerta(2, d.m)
                } else {
                    var secilenID = document.getElementById("client-register");
                    secilenID.style.display = "none";
                    document.getElementById('usernameforreg').value = '';
                    document.getElementById('phonenumforreg').value = '';

                    var secilenID = document.getElementById("client-register-code");
                    secilenID.style.display = "block";
                    document.getElementById('v_code').value = '';
                    reCodeTimee();
                    changeNumberTimee();

                }

            }
        })
    }

}

function sendRegAgentCode() {
    var v_code = document.getElementById("v_code");
    if (v_code.value == "") {
        alerta(2, lang.emptyCode);
    } else {
        $.ajax({
            type: 'POST',
            url: "/sendRegAgentCode",
            data: "v_code=" + v_code.value, //+"&ans="+ans+"&stage="+stage,
            success: function (datas) {
                var d = JSON.parse(datas);

                if (d.s == 2) {
                    alerta(2, lang.falseCode)
                } else {
                    var secilenID = document.getElementById("appeal-agency");
                    secilenID.style.display = "block";
                    document.getElementById('phonenum').value = '';
                    document.getElementById('levha_no').value = '';
                    var secilenID = document.getElementById("appeal-agency-code");
                    secilenID.style.display = "none";
                    document.getElementById('v_code').value = '';
                    alerta(1, lang.successfulRegister);
                }
            }
        })
    }

}

function sendRegisterCode() {
    var v_code = document.getElementById("v_codee");
    if (v_code.value == "") {
        alerta(2, lang.emptyCode);
    } else {
        $.ajax({
            type: 'POST',
            url: "/sendRegisterCode",
            data: "v_code=" + v_code.value, //+"&ans="+ans+"&stage="+stage,
            success: function (datas) {
                var d = JSON.parse(datas);

                if (d.s == 2) {
                    alerta(2, lang.falseCode);
                } else {
                    closeSpecificModal('#auth_cliregister');
                    -alerta(1, lang.successfulRegister);
                }
            }
        })
    }

}

var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

window.onload = function () {
    $('.loading').fadeOut();
};

$(document).ready(function () {
    $('.selects').select2().click(function () {
        $(this).valid();
    });
    $(":input").inputmask();
    $('input[name$="phoneNumber"]').inputmask({"mask": "(999) 999-9999"});
    $('input[name$="startDate"]').inputmask({"mask": "99/99/9999"});
    $('input[name$="endDate"]').inputmask({"mask": "99/99/9999"});

    // programatic select tooltip ayarlama // sıkıntılı
    /*$(".select2-container").tooltip({
        title: function () {
            return "tooltip";
            // return $(this).prev().attr("title");
        },
        placement: "top"
    });*/
    /*$(".select2-selection span").attr('title', '');*/
});

function JAlert(type, mess) {
    var typ;
    if (type === 1) {
        typ = 'success';
    } else if (type === 2) {
        typ = 'error';
    } else {
        typ = 'warning'
    }
    Swal.fire({
        icon: typ,
        html: '<b>' + mess + '</b>',
        confirmButtonText: lang.OK
    })
}

function toogleInput(id) {
    $("#" + id + "").toggle("slow");
}

function disableBtn(id, type) {
    if (type == 1) {
        vals = true
    } else {
        vals = false
    }
    $('#' + id + '').prop("disabled", vals);
}

function register() {
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
}

function login() {
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
}

function togglePlaceholder() {
    $('.haspattern').click(function () {
        var dat = $(this).data("pattern");
        $(this).attr('placeholder', dat)
    })
    $('.haspattern').focusout(function () {
        var dat2 = $(this).data("placeholder");
        $(this).attr('placeholder', dat2)
    })
}

function makeSelect() {
    $('.modal-body .selects').each(function () {
        var $p = $(this).parent();
        $(this).select2({
            dropdownParent: $p
        });
    });
}

$(".btncookie").click(function () {
    $(".cookiePolicy").hide();
    setCookie("gdprpolicy", 1, 365)
});

$(".close-offer").click(function () {
    $(".offer-close").fadeOut(500);
});

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


const accordionItem = document.querySelectorAll(".accordion-item");
accordionItem.forEach((el) =>
    el.addEventListener("click", () => {
        if (el.classList.contains("active")) {
            el.classList.remove("active");
        } else {
            accordionItem.forEach((el2) => el2.classList.remove("active"));
            el.classList.add("active");
        }
    })
);


function chklevha(levha) {
    $.ajax({
        url: 'levhano',
        method: 'post',
        data: {levhano: levha},
        dataType: 'json',
        success: function (datas) {
            if (datas.response === 2) {
                disableBtn("btnApp", 1)
                $("#lic_no").addClass("borderfail")
                JAlert(2, "Levha Kaydınız Bulunamadı");
            } else {
                $("#lic_no").toggleClass("bordersuc", "borderfail")
                disableBtn("btnApp", 2)
            }
        },
        complete: function (datas) {
        }
    });
}

$(".mdlopen").click(function () {

    var target = $(this).data('target')
    var root = $(this).data('prop')
    $('#' + target + '').modal('show');
    $('#frm_' + target + '').attr('action', '' + root + '')
    console.log('#frm_' + target + '');
});

$(".mdloffer").click(function () {
    var target = $(this).data('target')
    var root = $(this).data('prop')
    //alert("sdfasdf")

    fetch("/mdl/" + target).then(res => {
        return res.text()
    }).then(function (html) {
        $("#mdlContent").html('').html(html);
        $('#mdlDraft').modal('show');
    });

});

$(".mdlopen2").click(function () {
    var target = $(this).data('target')
    $('#' + target + '').modal('show');
});

$(".mdlopener").click(function () {
    var target = $(this).data('target')
    $('#mdlDraft').modal('show');
    $("#mdlContent").html('').load("/mdl/" + target);
});

function getModals() {
    var target = $(this).data('target')
    alert(target)

    $("#mdIconsCont").load("/panel/modal/icons", function (responseTxt, statusTxt, xhr) {
        if (statusTxt == "success") {
            var elems = document.querySelectorAll('.icon-item-container');
        }
        for (var i = elems.length; i--;) {
            elems[i].addEventListener('click', fn, false);
        }
        if (statusTxt == "error") {
            alert("Error: " + xhr.status + ": " + xhr.statusText);
        }
    });
    togglePlaceholder()
}

function getTraffic(frm, lng) {
    var con1 = $("#contract1").is(":checked");
    var con2 = $("#contract2").is(":checked");
    if (!con1) {
        alerta(2, lang.checkedKVKK)
    } else if (!con2) {
        alerta(2, lang.checkedTIS)
    } else {
        console.log(lng)
        $.ajax({
            url: '/tr/teklif/trafik',
            method: 'post',
            data: $('#' + frm + '').serialize(),
            dataType: 'json',
            success: function (datas) {
                if (datas.s === 2) {
                    disableBtn("btnApp", 1)
                    JAlert(2, datas.m);
                } else {
                    window.location.href = "/tr/stepper";
                }
            }
        });
    }
}

function getCasco(frm, lng) {
    var con1 = $("#contract1").is(":checked");
    var con2 = $("#contract2").is(":checked");
    if (!con1) {
        alerta(2, lang.checkedKVKK)
    } else if (!con2) {
        alerta(2, lang.checkedTIS)
    } else {
        console.log(lng)
        $.ajax({
            url: '/tr/teklif/kasko',
            method: 'post',
            data: $('#' + frm + '').serialize(),
            dataType: 'json',
            success: function (datas) {
                if (datas.s === 2) {
                    disableBtn("btnApp", 1)
                    JAlert(2, datas.m);
                } else {
                    window.location.href = "/tr/stepper";
                }
            }
        });
    }
}

function getServices(uri) {
    const form = $("form[name='Services']");
    const validator = form.validate();
    if (!form.valid()) {
        console.log('form', $("form[name='Services']").serialize())
        let errorMessages = "";
        $.each(validator.errorMap, function (index, value) {
            console.log('Id: ' + index + ' Message: ' + value);
            errorMessages += (value + "<br>");
        });
        // JAlert(3, errorMessages)

        return false;
    }

    preloader(1)
    $.ajax({
        url: '/services/' + uri + '',
        method: 'post',
        data: $('#Services').serialize(),
        dataType: 'json',
        success: function (datas) {

            if (datas.s === 1) {
                var cnmdatam = datas.d
                var html = ''
                if (cnmdatam != null) {
                    cnmdatam.forEach(element => {
                        name = 0;
                        if (element.FIRMNAME == '') {
                            if (element.NAME != '') {
                                name = element.NAME + ' ' + element.NAME;
                            }
                        } else {
                            name = element.FIRMNAME;
                        }
                        if (name != 0) {
                            html = html + `
                        <div class="card-2">
                            <div class="row">
                                <div class="col-md-2 d-flex align-items-center">
                                <center><img class="logo m-2 text-center d-flex justify-content-center" src="/public/assets/assets/images/logo/sigortaturklogored.svg" alt="..."></center>
                                </div>
                            <div class="col-md-10 d-flex align-items-center">
                                <div class="col-md-12">
                                <div class="col-md-12 m-2 d-flex align-items-center">
                                <span class="material-icons mr-1">person_pin</span>` + name + `</div>
                                    
                                    <div class="col-md-12 m-2 d-flex align-items-center">
                                    <!--
                                    <span class="material-icons mr-1">location_on</span> 
                                    </div>                            
                                    <div class="col-md-12 m-2 d-flex align-items-center flex-wrap">
                                    <a class="mr-3" style="color:#000;" href="mailto:">
                                    <span class="material-icons mr-1">alternate_email</span> </a>
                                    <a class="mr-3" style="color:#000;" href="tel:"><span class="material-icons mr-1">phone</span>
                                    </a>
                                    </div>
                                    -->
                                </div>
                            </div>
                            </div>
                        </div>
</div>`;
                        }
                    });

                    $('#services-list').html(html);
                } else {

                    $('#services-list').html(`
                     <div class="proposal-form-card">
                <div class="proposal-widget">
                    <div class="row ">
                        <div class="col-12 col-md-12 input-group-2 mb-2">
                            <div style="padding: 16.5% 0;">
                                <p style="text-align:center; font-size:22px;">` + lang.noFoundAnyInfo + `</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    `);

                }
                //$('.total').html(datas.d.lc_premium_tl)
                /*
                $('.total').html(formattedOutput.format(price).replace(currency_symbol, '') + ' ' + currency_symbol)
                $('#total').val(datas.d.lc_premium_tl)
                $('#policy_no').val(datas.d.proposalno)
                goToByScroll('paymentcard');
                */
            } else {
                JAlert(2, datas.m);
            }
        },
        complete: function (datas) {
            preloader(2)
        }
    });
}

function getCars() {
    const form = $("form[name='CarCasco']");
    const validator = form.validate();
    if (!form.valid()) {
        console.log('form', $("form[name='Proposal']").serialize())
        let errorMessages = "";
        $.each(validator.errorMap, function (index, value) {
            console.log('Id: ' + index + ' Message: ' + value);
            errorMessages += (value + "<br>");
        });

        return false;
    }

    preloader(1)
    $.ajax({
        url: '/CarCasco',
        method: 'post',
        data: $('#Proposal').serialize(),
        dataType: 'json',
        success: function (datas) {
            if (datas.s === 1) {
                var price = datas.d[0].description;
                var currency_symbol = "₺";
                var fiyat = price + currency_symbol;
                html = `
            <div style="padding: 17% 0; text-align:center;">
                <h2>` + lang.selectedCarWorth + `</h2>
                <br>
                <h1 style="color:red; font-weight:bold;">` + fiyat + `</h1>
            </div>
                `;
                $('#CarsCasco').html(html);

            } else {
                JAlert(2, datas.m);
            }
        },
        complete: function (datas) {
            preloader(2)
        }
    });
}

function getProposal(uri) {
    const form = $("form[name='Proposal']");
    const validator = form.validate();
    if (!form.valid()) {
        let errorMessages = "";
        $.each(validator.errorMap, function (index, value) {
            console.log('Id: ' + index + ' Message: ' + value);
            errorMessages += (value + "<br>");
        });
        // JAlert(3, errorMessages)

        return false;
    }

    preloader(1)
    $.ajax({
        url: '/proposal/' + uri + '',
        method: 'post',
        data: $('#Proposal').serialize(),
        dataType: 'json',
        success: function (datas) {
            if (datas.s === 1) {
                var price = datas.d.lc_premium_tl
                var policy_no = datas.d.proposal_no

                var currency_symbol = "₺"
                var formattedOutput = new Intl.NumberFormat('tr-TR', {
                    style: 'currency',
                    currency: 'TRY',
                    minimumFractionDigits: 2,
                });
                $('.payment').removeClass("hiddenelem")
                //$('.total').html(datas.d.lc_premium_tl)
                $('.total').html(formattedOutput.format(price).replace(currency_symbol, '') + ' ' + currency_symbol)
                $('.policy_no').html(lang.yourOfferNo + ': ' + policy_no)

                $('#total').val(datas.d.lc_premium_tl)
                // document.getElementById("policy_no").value = datas.d.proposal_no;
                goToByScroll('paymentcard');
            } else {
                JAlert(2, datas.m);
            }
        },
        complete: function (datas) {
            preloader(2)
        }
    });
}

function makePayment() {
    var cardno = document.getElementById("cardno").value;
    var holder = document.getElementById("holder").value;
    var expire1 = document.getElementById("expire1").value;
    var cvc = document.getElementById("cvc").value;
    cardno = cardno.replaceAll('_', '');
    cardno = cardno.replaceAll(' ', '');
    expire1 = expire1.replaceAll('/', '');
    expire1 = expire1.replaceAll('_', '');
    if (cardno == "" || holder == "" || expire1 == "" || cvc == "" || cardno.length < 16 || holder.length < 3 || expire1.length < 6) {
        return alerta(2, lang.pleaseFieldEveryThing);
    }
    if (expire1.substring(2) < 2021) {
        return alerta(2, lang.falseSKT);
    }
    if (expire1.substring(2) == 2021 && expire1.substring(0, 2) < 3) {
        return alerta(2, lang.falseSKT);
    }
    preloader(1)

    $.ajax({
        url: '/tr/payment/make',
        method: 'post',
        data: $('#Payment').serialize(),
        dataType: 'json',
        success: function (datas) {
            if (datas.s === 1) {
                $('#lateststage').removeClass("hiddenelem")
                $('#Proposal, #paymentcard').hide()
                goToByScroll('lateststage');
            } else {
                JAlert(2, datas.m);
            }
        },
        complete: function (datas) {
            preloader(2)
        }
    });
}

function getPrintDoc(type) {
    if (type != 1 && type != 2) {
        return
    }
    var baslik;
    if (type == 2) {
        type = 7;
        baslik = lang.informationForm;

    } else {
        type = 1;
        baslik = lang.offerForm;
    }

    preloader(1)
    var product_no = $("#product_no").val();
    var policy_no = $("#policy_no").val();
    $.ajax({
        url: '/print/make',
        method: 'post',
        data: {product_no: product_no, policy_no: policy_no, type: type},
        dataType: 'json',
        success: function (datas) {
            if (datas.s === 1) {
                $('#lateststage').removeClass("hiddenelem")
                $('#Proposal, #paymentcard').hide()
                goToByScroll('lateststage');
                $('#pdf').html('<h5 style="text-align: center;">' + baslik + '</h5><iframe src="https://test.inscockpit.net/api/proposal/print/download?src=2&id=' + datas.d + '" style="width:100%; height: 650px;"></iframe>');

            } else {
                JAlert(2, datas.m);
            }
        },
        complete: function (datas) {
            preloader(2)
        }
    });
}

function getCities() {
    var dropDown = document.getElementById("states");
    dropDown.selectedIndex = 0;
    return $.ajax({
        type: 'POST',
        data: {},
        url: '/com/cities',
    });
}

function getStates(id) {
    return $.ajax({
        type: 'POST',
        data: {id},
        url: '/com/states',
    });

}

function getJobs(dats) {
    $.ajax({
        url: '/com/jobs',
        method: 'post',
        data: {lang: "tr", filter: dats},
        dataType: 'json',
        success: function (datas) {
            if (datas.response === 2) {
                JAlert(2, "Levha Kaydınız Bulunamadı");
            } else {
                const select = document.getElementById("brandid");
                for (const option of datas) {
                    const el = document.createElement("option");
                    el.textContent = option.marka;
                    el.value = option.markakodu + '#' + year;
                    select.appendChild(el);
                }
            }
        },
        complete: function (datas) {
        }
    });
}

function getBrand(year) {
    var usagetype = $("#usagetype").val()
    $.ajax({
        url: '/com/marks',
        method: 'post',
        data: {year: year, usage: usagetype},
        dataType: 'json',
        success: function (datas) {
            if (datas.response === 2) {
                JAlert(2, lang.noFoundTax);
            } else {
                const select = document.getElementById("brandid");
                for (const option of datas) {
                    const el = document.createElement("option");
                    el.textContent = option.marka;
                    el.value = option.markakodu + '#' + year;
                    select.appendChild(el);
                }
            }
        },
        complete: function (datas) {
        }
    });
}

function getModel(brand) {
    $.ajax({
        url: '/com/models',
        method: 'post',
        data: {brand: brand},
        dataType: 'json',
        success: function (datas) {
            if (datas.response === 2) {
                JAlert(2, lang.noFoundTax);
            } else {
                const select = document.getElementById("modelid");
                for (const option of datas) {
                    const el = document.createElement("option");
                    el.textContent = option.tip;
                    el.value = option.tipkodu;
                    select.appendChild(el);
                }
            }
        },
        complete: function (datas) {
        }
    });
}

function goToByScroll(id) {
    $('html,body').animate({
        scrollTop: ($("#" + id).offset().top - 80)
    }, 'slow');
}

function preloader(type) {
    if (type === 1) {
        $('.loading').show();
        if (document.getElementById("btnProposal") != null) document.getElementById("btnProposal").style.display = "none"
    } else {
        $('.loading').fadeOut();
        if (document.getElementById("btnProposal") != null) document.getElementById("btnProposal").style.display = "block"
    }
}

function vldteCTexts(frm) {
    // burada titlelar tooltip için ayarlanabilir.
    if ($("input[type='checkbox'][name='contract1']").is(":checked")) {
    } else {
        $("input[type='checkbox'][name='contract1']").attr("data-original-title", lang.falseID);
    }
    if ($("input[type='checkbox'][name='contract2']").is(":checked")) {
        //alert("Check box in Checked");
    } else {
        //alert("Check box is Unchecked");
    }

    // form valid değilse false dön
    if (!$("form[name='frm_off_traffic']").valid()) {
        return false;
    }

    // form valid devam et actiona
    // console.log('form', $("form[name='frm_off_traffic']").serialize())
}

function agentApplyButton() {
    $('#agentPrincipal').click(function () {
        $('#agentPrincipal').modal('hide');
        Swal.fire({
            title: lang.success,
            titleFontSize: 12,
            text: lang.successfulRegisterAgent,
            icon: 'success',
            confirmButtonColor: 'red',
            confirmButtonText: 'Kapat',
            width: 250,
            height: 200,
        })

    })
}

function onLoginModalClose() {
    $('#auth_cliregister').modal('show');
}

function openForgetPassword() {
    $('#auth_clilogin').modal('hide');
    $('#auth_cliforget').modal('show');
}

function onRegisterModalClose() {
    $('#auth_clilogin').modal('show');
}

function showSpecificModal(id) {
    $(id).modal('show');
}

function closeSpecificModal(id) {
    $(id).modal('hide');
}


function registerUser(type) {


    if (type == undefined) type = 1;
    preloader(1);

    if (type == 1) {
        $.ajax({
            url: '/auth/register',
            method: 'post',
            data: $("form[name='frm_auth_userregister']").serialize(),
            dataType: 'json',
            success: function (datas) {
                closeSpecificModal('#auth_userregister');
                showSpecificModal('#auth_otp');
            },
            complete: function (datas) {
                preloader(0);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
    } else {

        $.ajax({
            url: '/auth/register',
            method: 'post',
            data: $("form[name='auth_otp']").serialize(),
            dataType: 'json',
            success: function (datas) {
                if (datas.s == 2) {
                    showSpecificModal('#otp_warn');
                    return;
                }
                showSpecificModal('#otp_success');
                closeSpecificModal('#auth_otp');
            },
            complete: function (datas) {
                preloader(0);
                closeSpecificModal('')
            },
            error: function (xhr, ajaxOptions, thrownError) {
                showSpecificModal('#otp_warn');
                console.log('!');
                console.log(xhr);
                alert(xhr.status);
                alert(thrownError);
            }
        });
    }
}


function agentApply() {
    preloader(1);
    //agent/check
    $.ajax({
        url: 'agent/apply',
        method: 'post',
        data: $("form[name='agentPrincipal']").serialize(),
        dataType: 'json',
        success: function (datas) {
            if (datas.s == 2) {
                document.getElementById('agent_warn_msg').innerText = datas.m;
                showSpecificModal('#agent_warn');
                return;
            }
            closeSpecificModal('#agentPrincipal')
            showSpecificModal('#agent_otp');

        },
        complete: function (datas) {
            preloader(0);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log('qq');
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

function agentOtp() {
    preloader(1);
    $.ajax({
        url: 'agent/otpcheck',
        method: 'post',
        data: $("form[name='agent_otp']").serialize(),
        dataType: 'json',
        success: function (datas) {
            if (datas.s == 2) {
                document.getElementById('agent_warn_msg').innerText = datas.m;
                showSpecificModal('#agent_warn');
                return;
            }
            showSpecificModal('#otp_success');
            closeSpecificModal('#agent_otp');
        },
        complete: function (datas) {
            preloader(0);
            closeSpecificModal('')
        },
        error: function (xhr, ajaxOptions, thrownError) {
            showSpecificModal('#otp_warn');
            console.log('!');
            console.log(xhr);
            alert(xhr.status);
            alert(thrownError);
        }
    });

}


$('#agent_otp').on('shown.bs.modal', function () {
    timeout = 120;

    myVar = setInterval(function () {

        document.getElementById('timer').innerText = '' + timeout + '';
        timeout--;
        if (timeout == 0) {
            clearInterval(myVar);
            return;
        }
    }, 1000);


});
var sessCard = 1;

function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for (i = L; i >= 0; i--) {
        selectElement.remove(i);
    }
}

$('#installment').prop('disabled', true);

function checkInstallment(card) {

    var cardno = document.getElementById("cardno").value;
    var policy_no = document.getElementById("policy_no").value;
    var product_no = document.getElementById("product_no").value;
    var renewal_no = document.getElementById("renewal_no").value;
    var endors_no = document.getElementById("endors_no").value;
    if (renewal_no == "") {
        renewal_no = 0;
    }
    if (endors_no == "") {
        endors_no = 0;
    }

    cardno = cardno.replaceAll('_', '');
    cardno = cardno.replaceAll(' ', '');
    console.log(policy_no);
    if (cardno.length > 5) {
        $('#installment').prop('disabled', false);

        if (sessCard == 1) {
            sessCard = cardno.substring(0, 6);
            var a = 1;
        }
        if (a == 1 || sessCard != cardno.substring(0, 6)) {


            $.ajax({
                url: '/getInstallment',
                method: 'post',
                data: "cardno=" + cardno.substring(0, 6) + "&product_no=" + product_no + "&renewal_no=" + renewal_no + "&endors_no=" + endors_no + "&policy_no=" + policy_no,
                dataType: 'json',
                success: function (datas) {
                    console.log(datas.d.count);
                    const installment = document.getElementById("installment");
                    var i;


                    for (i = 0; i < datas.d.count; i++) {
                        const el = document.createElement("option");


                        if (i == 0) {
                            removeOptions(document.getElementById('installment'));
                            el.textContent = 'Taksit Seçiniz';
                            el.value = i;
                            installment.appendChild(el);
                            el.textContent = 'Peşin';
                            el.value = i + 1;
                            installment.appendChild(el);
                        } else {
                            el.textContent = i + 1 + ' Taksit';
                            el.value = i + 1;
                            installment.appendChild(el);
                        }

                    }


                },

            });

            sessCard = cardno.substring(0, 6);
            a = 1 + 1;
        }
    } else {
        removeOptions(document.getElementById('installment'));
        $('#installment').prop('disabled', true);
        const installment = document.getElementById("installment");
        const el = document.createElement("option");
        el.textContent = lang.selectInstalliment;
        el.value = 0;
        installment.appendChild(el);
        sessCard = 1
    }

}

