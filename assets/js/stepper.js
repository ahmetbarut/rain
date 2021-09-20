function AjaxPost(n, t, i, r) {
    var u = window.location.origin;
    n = u + n;
    $.ajax({
        type: "POST",
        url: n,
        data: JSON.stringify(t),
        dataType: "json",
        async: !0,
        cache: !1,
        contentType: "application/json; charset=utf-8",
        success: i,
        error: r
    })
}

function campaignsModalShow() {
    var n = new Date,
        t = n.getTime();
    t += 1728e5;
    n.setTime(t);
    document.cookie.split("campaignsname").length == 1 && (App.modal.show("#modal-campaigns"), document.cookie = "campaignsname=traffic;expires=" + n.toUTCString() + "")
}

function SessionTimeoutControlAjax(n) {
    AjaxPost("/Login/SessionTimeoutControl", {
        cookiesModel: n
    }, SessionTimeoutControlSuccess, SessionTimeoutControlError)
}

function SessionTimeoutControlSuccess(n) {
    switch (n.ResultType) {
        case ResultTypes.Message:
            ModalSessionTimeout(langData.Warning, langData.jsTimeOut, langData.msgLoginAgain);
            break;
        case ResultTypes.Data:
            typeof n.ResultValue.Data.UserLoginControl != "undefined" && n.ResultValue.Data.UserLoginControl ? ($("#transactions_active").html("").removeClass("online-transactions-active").html('<li class="left"><a title="' + langData.jsLogIn + '" href="#" data-modal-target="#modal-auth">' + langData.jsLogIn + "<\/a><\/li>"), App.modal.show("#modal-auth", !0)) : typeof n.ResultValue.Data.AgencyLoginControl != "undefined" && n.ResultValue.Data.AgencyLoginControl && App.modal.show("#modal-agency", !0)
    }
}

function SessionTimeoutControlError() {}

function PrefixInstallmentList() {
    $("#creditcard-proposal").on("focusout", function() {
        var i = "0",
            r = $("#radio-ThreeDPaymentExists:checked").val(),
            n, t;
        if (typeof r != "undefined" && r == "3" && (i = "1"), n = $("#creditcard-proposal").val().replace(/ /g, "").split("-").join("").split("_").join(""), n.length <= 15) return !1;
        t = {
            PolicyGrossPremium: WebSiteVersion == WebSiteVersions.V2 ? SelectedProposalPacketPrice.TotalPrice : $("#hdGrossPremium").val(),
            prefixCode: n,
            credicardlength: n.length,
            claimStep: $("#creditcard-proposal").data("claimstep"),
            policyNo: $("#btnApprove").data("policyno"),
            Is3D: i
        };
        t.credicardlength != 16 || isNaN(t.prefixCode.substring(0, 6)) ? errorModal(globalErrorTag, SistemUyarisiBasligi, langData.jsMissingCCNumber) : ($("#loading").append('<b style="position: absolute; z-index: 1001; color:#fffcfc; top:68%; left:42%; ">' + langData.jsBeignInstallmentOpt + "...<\/b>").show(), AjaxPost("/Proposal/PrefixInstallmentList", {
            PrefixValues: t
        }, PrefixInstallmentListSuccess, PrefixInstallmentListError))
    })
}

function PrefixInstallmentListSuccess(n) {
    $("#loading").html("").hide();
    switch (n.ResultType) {
        case ResultTypes.Message:
            errorModal(globalErrorTag, SistemUyarisiBasligi, n.ResultValue);
            break;
        case ResultTypes.Data:
            $("#ddlApproveInstallment option").length > 0 && $("#ddlApproveInstallment option").remove();
            $("#installment-radios").html("");
            var t = 0;
            $.each(n.ResultValue, function(n, i) {
                WebSiteVersion == WebSiteVersions.V2 ? $("#installment-radios").append('<label class="m-radio">                                                    <input type="radio"                                                \t\t    name="taksit"                                                          data-Is3d="' + i.Is3d + '"                                           data-NumberOfInstalment="' + i.NumberOfInstalment + '"               data-CardCode="' + i.CardCode + '"                                      data-BankNo="' + i.BankNo + '"                                          data-VPosID="' + i.VPosID + '"                                          value="' + i.Value + '"                                      \t\t   data-bind-validation>                                                            <span><\/span>                                                                              <b class="installment-radio-title">' + i.Text2 + '<\/b>              <b class="installment-radio-text" style="float:right;">' + i.Text3 + "<\/b>                   <\/label>                                                               ") : $("#ddlApproveInstallment").append("<option data-Is3d='" + i.Is3d + "' data-NumberOfInstalment='" + i.NumberOfInstalment + "' data-CardCode='" + i.CardCode + "' data-BankNo='" + i.BankNo + "' data-VPosID='" + i.VPosID + "' value='" + i.Value + "'>" + i.Text + "<\/option>");
                $("#btnApprove").val("");
                t == 0 && ($("#VPosID").val(i.VPosID), $("#BankNo").val(i.BankNo), InstallmentType3D = i.Is3d == OK ? !0 : !1);
                t++
            });
            $("#ddlApproveInstallment option").attr("selected", !1);
            $("#ddlApproveInstallment option:first").attr("selected", !0);
            $("#ddlApproveInstallment option:first").trigger("change");
            $("#btnApprove").prop("disabled", !1);
            WebSiteVersion == WebSiteVersions.V2 && $("input:radio[name=taksit]:first").attr("checked", !0)
    }
}

function PrefixInstallmentListError() {
    $("#loading").html("").hide()
}

function GetIdentityType(n) {
    var i, t;
    if (typeof n == "undefined" || n == "") return $(".form-hero").find("." + classname).html(""), $(".form-hero").find("." + classname).append('<li class="parsley-required">' + GecerliKimlikUyarisi + "<\/li>"), $(".form-hero").find("." + classname).show(), -1;
    for (i = 0, t = 0; t < n.length - 1; t++) i += parseInt(n[t]);
    return n.length == 10 ? 2 : n.length == 11 && n[0] == 9 ? 3 : n.length == 11 && i % 10 == n[10] ? 1 : ($(".form-hero").find("." + classname).html(""), $(".form-hero").find("." + classname).append('<li class="parsley-required">' + GecerliKimlikUyarisi + "<\/li>"), $(".form-hero").find("." + classname).show(), -1)
}

function IsValidIdentityNo(n, t) {
    var r, i;
    if (typeof n == "undefined" || n == "") return $(".form-hero").find("." + t).html(""), $(".form-hero").find("." + t).append('<li class="parsley-required">' + GecerliKimlikUyarisi + "<\/li>"), $(".form-hero").find("." + t).show(), !1;
    for (r = 0, i = 0; i < n.length - 1; i++) r += parseInt(n[i]);
    return n.length == 10 ? (identityType = "2", !0) : n.length == 11 && n[0] == 9 ? (identityType = "3", !0) : n.length == 11 && r % 10 == n[10] ? (identityType = "1", !0) : ($(".form-hero").find("." + t).html(""), $(".form-hero").find("." + t).append('<li class="parsley-required">' + GecerliKimlikUyarisi + "<\/li>"), $(".form-hero").find("." + t).show(), !1)
}

function LandingPageIsValidIdentityNo(n) {
    for (var i = 0, t = 0; t < n.length - 1; t++) i += parseInt(n[t]);
    return n.length == 10 ? (identityType = "2", !0) : n.length == 11 && n[0] == 9 ? (identityType = "3", !0) : n.length == 11 && i % 10 == n[10] ? (identityType = "1", !0) : !1
}

function IsValidUavtCode(n, t) {
    return typeof n == "undefined" || n == "" || n.length != 10 || !$.isNumeric(n) || parseInt(n) <= 0 || n.startsWith("0") ? ($(".form-hero").find("." + t).html(""), $(".form-hero").find("." + t).append('<li class="parsley-required">' + langData.jsEnterValidUAVTAddressNo + "<\/li>"), $(".form-hero").find("." + t).show(), !1) : ($(".form-hero").find("." + t).html(""), $(".form-hero").find("." + t).hide(), !0)
}

function JustNumeric() {
    var t = window.event ? event.keyCode : event.which,
        n = t;
    return n > 31 && (n < 48 || n > 57) ? !1 : !0
}

function errorModal(n, t, i) {
    var r = getParameterByName("prodNo");
    r != null && r != "" && EmarsysErrorLogs(parseInt(getParameterByName("prodNo")), i);
    $("#loading").hide();
    App.modal.hide(function() {
        App.modal.show("#modal-errors")
    });
    typeof n != "undefined" || n !== null || n.lenght > 0 || n != "" ? $("#modal-errors h3").html(n) : $("#modal-errors h3").html(globalErrorTag);
    $("#modal-errors h4").html(t);
    $("#modal-errors p").html(i)
}

function ModalSessionTimeout(n, t, i) {
    $("#loading").hide();
    App.modal.show("#modal-session-expired", !0);
    typeof n != "undefined" || n !== null || n.lenght > 0 || n != "" ? $("#modal-session-expired h3").html(n) : $("#modal-session-expired h3").html(globalErrorTag);
    $("#modal-session-expired h4").html(t);
    $("#modal-session-expired p").html(i)
}

function printModal(n, t, i) {
    App.modal.show("#modal-policy-print");
    typeof n != "undefined" || n !== null || n.lenght > 0 || n != "" ? $("#modal-policy-print h3").html(n) : $("#modal-policy-print h3").html(globalErrorTag);
    $("#modal-policy-print h4").html(t);
    $("#modal-policy-print p").html(i);
    $(".policy-print p").css("height", wHeight - 160);
    $(".modal-policy-print").css("max-width", "90%")
}

function UserInfoPartialViewReflesh() {
    $.ajax({
        url: "/Proposal/GetUserInfoPartial",
        type: "GET",
        data: null,
        cache: !1,
        contentType: "application/json; charset=utf-8"
    }).done(function(n) {
        switch (n.ResultType) {
            case ResultTypes.Message:
                location.reload();
                break;
            case ResultTypes.Html:
                $(".userInfoPartialRenderHtml").html(n.ResultValue);
                $("#proposal-left-bar-step-3:visible").length != 0 && ($("#step1Text").hide(), $("#step2Text").hide(), $("#step3Text").show())
        }
    })
}

function UserInfoPartialViewRefleshSuccess(n) {
    switch (n.ResultType) {
        case ResultTypes.Message:
            errorModal(globalErrorTag, SistemUyarisiBasligi, n.ResultValue);
            break;
        case ResultTypes.Html:
            $(".userInfoPartialRenderHtml").html(n.ResultValue)
    }
}

function UserInfoPartialViewRefleshError(n) {
    errorModal(globalErrorTag, SistemUyarisiBasligi, n.ResultValue)
}

function SearchDisable(n) {
    var t = $(n.target).data("qid");
    switch (t) {
        case 109:
            $("#txtTescilKod").prop("disabled", !0);
            $("#txtTescilNo").prop("disabled", !0);
            $("#txtAsbisNo").val() == "" && ($("#txtTescilKod").prop("disabled", !1), $("#txtTescilNo").prop("disabled", !1));
            break;
        case 10002:
            $("#txtAsbisNo").prop("disabled", !0);
            ($("#txtTescilKod").val() == "" || $("#txtTescilNo").val() == "") && $("#txtAsbisNo").prop("disabled", !1);
            break;
        case 10003:
            $("#txtAsbisNo").prop("disabled", !0);
            ($("#txtTescilKod").val() == "" || $("#txtTescilNo").val() == "") && $("#txtAsbisNo").prop("disabled", !1)
    }
}

function valid_credit_card(n) {
    var i, f, t;
    if (/[^0-9-\s]+/.test(n)) return !1;
    var u = 0,
        t = 0,
        r = !1;
    for (n = n.replace(/\D/g, ""), i = n.length - 1; i >= 0; i--) f = n.charAt(i), t = parseInt(f, 10), r && (t *= 2) > 9 && (t -= 9), u += t, r = !r;
    return u % 10 == 0
}

function DetectDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? !0 : !1
}

function BeforeSend() {
    $(".button ").attr("disabled", !0);
    $(".btn-submit").attr("disabled", !0)
}

function AjaxCompleted() {
    $(".button ").attr("disabled", !1);
    $(".btn-submit").attr("disabled", !1)
}

function OpenInNewTab(n, t) {
    var i = "";
    DetectDevice() ? (i = '<iframe src="http://docs.google.com/gview?url=' + t + '&embedded=true" width="100%" height="100%" frameborder="0"><\/iframe>', n += '<a style="margin-left: 10px;" class="fa fa-search" href="' + t + '" target="_blank">' + langData.jsDownloadPropImg + "<\/a>") : (i = '<iframe src="' + t + '" width="100%" height="100%"><\/iframe>', n += '<a style="margin-left: 10px;" class="fa fa-search" href="' + t + '" target="_blank"><\/a>');
    printModal("", n, i);
    $("#loading").hide()
}

function IsSameInsurer(n, t) {
    var i, r, u, f, s;
    if (typeof n == "undefined" || $("#" + n.id).val() == "") return !1;
    i = "#" + n.id;
    idLength = i.split("-")[1];
    r = "";
    n.className == "same-person-tcno" && typeof $("#is-same-person").val() != "undefined" ? r = $("#is-same-person").val() : n.form != null && n.form.id == "screenFerdiKaza" ? r = $("#is-same-person-ferdi").val() : WebSiteVersion == WebSiteVersions.V2 && (r = $('[name="sigortaEttiren"]').data("select-insured"));
    var e = $(i).val(),
        h = WebSiteVersion == WebSiteVersions.V2 ? $('[name="eposta"]').val() : $("#email").val(),
        o = $("#thesel-" + idLength).val();
    if (o == "0") return errorModal(langData.ErrorDetailView, "", langData.jsSelectRatingProx), !1;
    if (u = StringToBooleanCast($("#same-person-name").data("ovirredinsure")), typeof u == "undefined" || !u)
        for (f = 0; f < InsurerListControl.length; f++)
            if (InsurerListControl[f].IdentityNum == $(i).val()) return errorModal(globalErrorTag, SistemUyarisiBasligi, langData.jsAlreadyInsuredAdded), App.unblock("body"), !1;
    if (s = IsValidIdentityNo(e, t), s) {
        $("#loading").show();
        var c = $(".txt-same-person-name").data("bmvprodno"),
            l = $(".txt-same-person-name").data("icprodno"),
            a = $(".txt-same-person-name").data("prodname"),
            v = $(".txt-same-person-name").data("iccode"),
            y = $(".txt-same-person-name").data("insuretype"),
            p = {
                IdentityNumber: e,
                CustomerType: identityType,
                MailAdrOrPhoneNum: h,
                InsuredType: y,
                PlateSelector: !0,
                SelectedBmvProd: c,
                IcProdCode: l,
                IcProdName: a,
                IcCode: v,
                Plate: null,
                ParentType: o
            };
        AjaxPost("/Home/InsuredAddResult", {
            userPlateInfo: p,
            overrideInsureObject: u
        }, InsurerCustomerSuccess, InsurerCustomerError)
    } else(typeof t == "undefined" || t == "") && errorModal(langData.ErrorDetailView, "", langData.jsValidTCKNOrYKN)
}

function InsurerCustomerSuccess(n) {
    $("#btnProposal").attr("disabled", !1);
    $("#loading").hide();
    App.unblock("body");
    switch (n.ResultType) {
        case ResultTypes.Message:
            errorModal(globalErrorTag, SistemUyarisiBasligi, n.ResultValue);
            break;
        case ResultTypes.Redirect:
            location.href = n.ResultValue;
            break;
        case ResultTypes.Data:
            var t = n.ResultValue.Name;
            typeof n.ResultValue.Surname != "undefined" && n.ResultValue.Surname != null && (t += " " + n.ResultValue.Surname);
            InsurerListControl[InsurerListControl.length] = {
                IdentityNum: n.ResultValue.TCKN,
                NameSurname: t
            };
            idLength == "person" ? $("#same-person-name").val(t) : $("#thetextname-" + idLength).val(t)
    }
}

function InsurerCustomerError() {
    $("#loading").hide();
    errorModal(globalErrorTag, SistemUyarisiBasligi, langData.jsErrInqueryIdentity);
    $("#btnProposal").attr("disabled", !1)
}

function FerdikazaInsurerRemove(n) {
    if (typeof n != "undefined") {
        InsurerListParent = n;
        var t = "#" + n.id,
            i = t.split("-")[1],
            r = $("#thetexttckn-" + i).val();
        AjaxPost("/Proposal/InsuredListRemove", {
            IdentityNo: r,
            IsSamePerson: "0"
        }, FerdikazaInsurerRemoveSuccess, FerdikazaInsurerRemoveError)
    }
}

function FerdikazaInsurerRemoveSuccess(n) {
    var i, t;
    switch (n.ResultType) {
        case ResultTypes.Message:
            if (i = $(".relative-info").length, $("#thetexttckn-0").val() != "" && i == 1) $("#thetexttckn-0").val(""), $("#thetextname-0").val(""), $("#thesel-0").val("0").change(), errorModal(langData.Information, "", n.ResultValue.Data.Message);
            else
                for ($(InsurerListParent).parent().remove(), t = 0; t < InsurerListControl.length; t++)
                    if (InsurerListControl[t].IdentityNum == n.ResultValue.Data.IdentityNo) return InsurerListControl.splice(t, 1), errorModal(langData.Information, "", n.ResultValue.Data.Message), !1
    }
}

function FerdikazaInsurerRemoveError() {}

function ReplaceTurkishChars(n) {
    return n.replace(/Ü/g, "u").replace(/Ş/g, "s").replace(/I/g, "i").replace(/İ/g, "i").replace(/Ö/g, "o").replace(/Ç/g, "c").replace(/Ğ/g, "g").replace(/ı/g, "i").replace(/ş/g, "s").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ğ/g, "g").replace(/ç/g, "c").toLowerCase()
}

function toUpperTurkishChars(n) {
    return n.replace(/ü/g, "Ü").replace(/ş/g, "Ş").replace(/ı/g, "I").replace(/i/g, "İ").replace(/ö/g, "Ö").replace(/ç/g, "Ç").replace(/ğ/g, "Ğ").toUpperCase()
}

function toUpperCase(n) {
    var t = "#" + n.id,
        i = $(t).val().toUpperCase();
    return $(t).val(i)
}

function toLower(n) {
    var t = "#" + n.id,
        i = ReplaceTurkishChars($(t).val());
    $(t).val(i)
}

function toUpperAsTurkish(n) {
    var t = "#" + n.id,
        i = toUpperTurkishChars($(t).val());
    $(t).val(i)
}

function MailAndPhoneValidation(n, t) {
    var r = "#" + n.id,
        u, i;
    if (mailOrPhoneNum = $(r).val(), u = mailOrPhoneNum.split("@")[1], typeof t == "undefined" && (t = "0"), mailOrPhoneNum == "") return t == "1" ? ($(".form-hero").find(".hero-errors").html(""), $(".form-hero").find(".hero-errors").append('<li class="parsley-required">' + langData.jsValidEmailAddressOrPhoneNumber + "!<\/li>"), $(".form-hero").find(".hero-errors").show(), !1) : !0;
    if (mailOrPhoneNum == "" || myIsNumber(parseInt(mailOrPhoneNum))) {
        if (i = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/, !i.test(mailOrPhoneNum)) return $(".form-hero").find(".hero-errors").html(""), $(".form-hero").find(".hero-errors").append('<li class="parsley-required">' + langData.jsPleaseValidEPost + "<\/li>"), $(".form-hero").find(".hero-errors").show(), !1
    } else if (mailOrPhoneNum.length < 10 || mailOrPhoneNum.length > 14) return $(".form-hero").find(".hero-errors").html(""), $(".form-hero").find(".hero-errors").append('<li class="parsley-required">' + langData.jsPleaseValidEmail + "!<\/li>"), $(".form-hero").find(".hero-errors").show(), !1;
    return $(".form-hero").find(".hero-errors").html(""), $(".form-hero").find(".hero-errors").hide(), !0
}

function IsValidUavtEnteredCode(n) {
    return typeof n == "undefined" || n == "" || n.length != 10 || !$.isNumeric(n) || parseInt(n) <= 0 || n.startsWith("0") ? !1 : !0
}

function LandingPageMailAndPhoneValidation(n, t) {
    var i = "",
        u = "#" + n,
        f, r;
    if (mailOrPhoneNum = $(u).val(), f = mailOrPhoneNum.split("@")[1], typeof t == "undefined" && (t = "0"), mailOrPhoneNum == "") return t == "1" ? langData.jsValidEmailAddressOrPhoneNumber + "!" : i;
    if (mailOrPhoneNum == "" || myIsNumber(parseInt(mailOrPhoneNum))) {
        if (r = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/, !r.test(mailOrPhoneNum)) return langData.jsPleaseValidEPost
    } else if (mailOrPhoneNum.length < 10 || mailOrPhoneNum.length > 14) return langData.jsPleaseValidEmail + "!";
    return i
}

function myIsNumber(n) {
    return typeof n == "number" && isNaN(n)
}

function MailValidation(n) {
    var i = "#" + n.id,
        r, t;
    return (mailOrPhoneNum = $(i).val(), r = mailOrPhoneNum.split("@")[1], $(".form-hero").find(".hero-errors").html(""), t = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/, !t.test(mailOrPhoneNum)) ? ($(".form-hero").find("#" + $(n.parentNode).find("ul")[0].id).html(""), $(".form-hero").find("#" + $(n.parentNode).find("ul")[0].id).append('<li class="parsley-required">' + langData.jsPleaseValidEPost + "<\/li>"), $(".form-hero").find("#" + $(n.parentNode).find("ul")[0].id).show(), n.form != null && $(n.form).find("button")[0].id != "" && $("#" + $(n.form).find("button")[0].id).attr("disabled", !0), $("#loading").hide(), !1) : ($(".form-hero").find("#" + $(n.parentNode).find("ul")[0].id).html(""), $(n.form).find("button")[0].id != "" && $("#" + $(n.form).find("button")[0].id).attr("disabled", !1), !0)
}

function PhoneValidation(n, t) {
    var i = "#" + n.id;
    return (mailOrPhoneNum = $(i).val(), mailOrPhoneNum == "") ? t == "1" ? ($(".form-hero").find(".hero-errors-phone").html(""), $(".form-hero").find(".hero-errors-phone").append('<li class="parsley-required">' + langData.jsPleaseValidEmail + "!<\/li>"), $(".form-hero").find(".hero-errors-phone").show(), !1) : !0 : mailOrPhoneNum == "" || myIsNumber(parseInt(mailOrPhoneNum)) ? ($(".form-hero").find(".hero-errors-phone").html(""), $(".form-hero").find(".hero-errors-phone").append('<li class="parsley-required">' + langData.jsPleaseValidEmail + "!<\/li>"), $(".form-hero").find(".hero-errors-phone").show(), !1) : mailOrPhoneNum.length < 10 || mailOrPhoneNum.length > 14 ? ($(".form-hero").find(".hero-errors-phone").html(""), $(".form-hero").find(".hero-errors-phone").append('<li class="parsley-required">' + langData.jsPleaseValidEmail + "!<\/li>"), $(".form-hero").find(".hero-errors-phone").show(), !1) : ($(".form-hero").find(".hero-errors-phone").html(""), $(".form-hero").find(".hero-errors-phone").hide(), !0)
}

function StringToBooleanCast(n) {
    return n === "False" ? !1 : n === "True" ? !0 : void 0
}

function KonutBinaBedeliHesaplama(n, t) {
    if (typeof t != "undefined" && t != "" && typeof n != "undefined" && n != "") switch (t) {
        case "1":
            return parseInt(n) * 1e3 * (1 - .2);
        case "2":
            return parseInt(n) * 1e3 * (1 - .15);
        case "3":
            return parseInt(n) * 1e3 * (1 - .1);
        case "4":
            return parseInt(n) * 1e3
    }
}

function mySubmitFunction(n) {
    return n.preventDefault(), !1
}

function MakeHatmerQueryForDoctor() {
    $("#loading").show();
    var n = langData.jsEnterValidValue;
    if ($("#radio-doctor-renew").is(":checked")) queryType = "HATMER_QUERY", PrevCompanyCode = $("#prev-company").val(), PrevAgencyCode = $("#prev-agency").val(), PrevPolicyNo = $("#prev-policyno").val(), PrevRenewalNo = $("#prev-renewalno").val(), n = langData.jsCheckPreviousPolInfo;
    else return $("#loading").hide(), !0;
    PrevCompanyCode.length > 0 && PrevAgencyCode.length > 0 && PrevPolicyNo.length > 0 && PrevRenewalNo.length > 0 ? Hatmer.getHatmerPolicyDetails(PrevCompanyCode, PrevAgencyCode, PrevPolicyNo, PrevRenewalNo, queryType) : ($("#loading").hide(), errorModal(langData.Warning, "", n))
}

function GTMMenuClick(n) {
    switch (n) {
        case "trafik":
            dataLayer.push({
                pageView: "/vp/anasayfa/zorunlu-trafik-sigortasi",
                event: "virtualPageView"
            });
            break;
        case "kasko":
            dataLayer.push({
                pageView: "/vp/anasayfa/kasko-sigortasi",
                event: "virtualPageView"
            });
            break;
        case "dask":
            dataLayer.push({
                pageView: "/vp/anasayfa/dask-sigortasi",
                event: "virtualPageView"
            });
            break;
        case "konut":
            dataLayer.push({
                pageView: "/vp/anasayfa/konut-sigortasi",
                event: "virtualPageView"
            });
            break;
        case "ferdiKaza":
            dataLayer.push({
                pageView: "/vp/anasayfa/ferdi-kaza-sigortasi",
                event: "virtualPageView"
            });
            break;
        case "seyahat":
            dataLayer.push({
                pageView: "/vp/anasayfa/seyahat-sigortasi",
                event: "virtualPageView"
            });
            break;
        case "hekim":
            dataLayer.push({
                pageView: "/vp/anasayfa/zorunlu-hekim-sorumluluk",
                event: "virtualPageView"
            });
            break;
        case "motorsiklet":
            dataLayer.push({
                pageView: "/vp/anasayfa/motorsiklet-sigortasi",
                event: "virtualPageView"
            });
            break;
        default:
            console.log(n)
    }
}

function SEMLogin(n) {
    dataLayer.push({
        "cd_musteri_tipi​": n
    })
}

function testtest(n) {
    console.log(n.name)
}

function measuringPurchases(n, t) {
    t.name = t.name.replace("&#252;", "ü").replace("&#220;", "ü");
    t.category = t.category.replace("&#252;", "ü").replace("&#220;", "ü");
    try {
        dataLayer.push({
            event: "eepurchase",
            ecommerce: {
                purchase: {
                    actionField: {
                        id: n.id,
                        revenue: n.revenue,
                        tax: n.tax,
                        shipping: n.shipping,
                        coupon: n.coupon
                    },
                    products: [{
                        name: t.name,
                        id: t.id,
                        price: t.price,
                        brand: t.brand,
                        category: t.category,
                        quantity: 1,
                        dimension1: t.dimension1,
                        dimension3: t.dimension3,
                        dimension4: t.dimension4,
                        dimension5: t.dimension5
                    }]
                }
            }
        })
    } catch (i) {}
}

function EmarsysSuccessEvent(n, t) {
    try {
        ScarabQueue.push(["purchase", {
            orderId: n.id,
            items: [{
                item: t.id,
                price: parseFloat(t.price),
                quantity: 1
            }]
        }]);
        ScarabQueue.push(["go"])
    } catch (i) {
        console.log("*** Hata *** MethodName : EmarsysSuccessEvent")
    }
}

function ChangeWebSiteLanguage() {
    AjaxPost("/Home/ChangeWebSiteLanguage", {
        returnUrl: window.location.href.toString()
    }, redrict, null)
}

function redrict() {
    window.location.href = "/"
}

function EndorFormStepOneSuccess(n) {
    $("#loading").hide();
    n.ResultState ? EndorFormStepOneSuccessDataSet(n) : errorModal(globalErrorTag, SistemUyarisiBasligi, n.Message)
}

function EndorFormStepOneSuccessDataSet(n) {
    var r, u, i, t;
    if (n.RestrictionCode > 0) {
        switch (n.RestrictionCode) {
            case 1:
                r = n.JsonData;
                r != "" && SetAgencyInfoModal(r)
        }
        return !1
    }
    u = n.PlateNo != "" && n.PlateNo != null ? "plateNo" : "policyNo";
    modalPolicyChangeSaleConfirmation.TargetForm = n.TargetFormId + " form";
    i = $(n.TargetFormId);
    i.find("[name=insuredName]").val(n.InsuredNameCapsule);
    i.find("[name=insuredName]").attr("data-insuredName", n.InsuredName);
    t = $(n.TargetFormId + " form");
    t.attr("data-policyNo", n.PolicyNo);
    t.attr("data-plateNo", n.PlateNo);
    t.attr("data-queryWithName", u);
    t.attr("data-CancelReasonCode", n.CancelReasonCode);
    t.attr("data-EndorsNo", n.EndorsNo);
    t.attr("data-RenewalNo", n.RenewalNo);
    switch (n.Process) {
        case "ChangeSaled":
            PolicyDetailForSaledVehicle = JSON.parse(n.PolicyDetail);
            break;
        case "ChangePlate":
            PolicyDetailForChangePlate = JSON.parse(n.PolicyDetail);
            modalPolicyChangeSaleConfirmation.IsNewPlate = n.IsNewPlate;
            n.IsNewPlate ? i.find("#registryInfoBoxs").show() : i.find("#registryInfoBoxs").show();
            i.find("[name=oldPlateNo]").val(n.OldPlateNo)
    }
    OpenEndorsDetailInputsContentPlace(n.TargetFormId)
}

function OpenEndorsDetailInputsContentPlace(n) {
    var t = $(n);
    t.is(":visible") ? t.slideUp(function() {
        t.slideDown(function() {
            $("html, body").animate({
                scrollTop: t.offset().top - App.headerHeight() - 30
            })
        })
    }) : t.slideDown(function() {
        $("html, body").animate({
            scrollTop: t.offset().top - App.headerHeight() - 30
        })
    })
}

function EndorFormStepAfterConfirmCoreSuccess(n) {
    n.ResultState ? EndorFormStepAfterConfirmDataSet(n) : errorModal(globalErrorTag, SistemUyarisiBasligi, n.Message)
}

function EndorFormStepAfterConfirmDataSet(n) {
    var t = "";
    switch (n.Process) {
        case "ChangeSaled":
            t = "#modal-policy-change-sale-confirmation";
            break;
        case "ChangePlate":
            t = "#modal-policy-change-plate-confirmation";
            modalPolicyChangeSaleConfirmation.IsNewPlate ? $(t).find("#plateChangeRegistryBoxs").hide() : $(t).find("#plateChangeRegistryBoxs").show()
    }
    SuccessPolicyChangeSaleConfirmation(n, t);
    App.modal.show(t)
}

function SuccessPolicyChangeSaleConfirmation(n, t) {
    modalPolicyChangeSaleConfirmation.PolicyNo = n.PolicyNo;
    modalPolicyChangeSaleConfirmation.insuredName = n.InsuredName;
    modalPolicyChangeSaleConfirmation.insurerEmail = n.Email;
    modalPolicyChangeSaleConfirmation.insurerGSM = n.GSM;
    modalPolicyChangeSaleConfirmation.PolicySaledDate = n.PolicySaledDate;
    modalPolicyChangeSaleConfirmation.OldPlateNo = n.OldPlateNo;
    modalPolicyChangeSaleConfirmation.NewPlateNo = n.NewPlateNo;
    modalPolicyChangeSaleConfirmation.RegistrySerialCode = n.RegistrySerialCode;
    modalPolicyChangeSaleConfirmation.RegistrySerialNo = n.RegistrySerialNo;
    modalPolicyChangeSaleConfirmation.CCNo = n.CCNo;
    modalPolicyChangeSaleConfirmation.EndorsmentAmount = n.EndorsmentAmount;
    modalPolicyChangeSaleConfirmation.EndorsmentAmountText = n.EndorsmentAmountText;
    FillModalPolicyChangeSaleConfirmationInputs(t)
}

function FillModalPolicyChangeSaleConfirmationInputs(n) {
    var t = $(n);
    t.find("[name=policyNo]").text(modalPolicyChangeSaleConfirmation.PolicyNo);
    t.find("[name=insuredName]").text(modalPolicyChangeSaleConfirmation.insuredName);
    t.find("[name=insurerEmail]").text(modalPolicyChangeSaleConfirmation.insurerEmail);
    t.find("[name=insurerGSM]").text(modalPolicyChangeSaleConfirmation.insurerGSM);
    t.find("[name=policySaledDate]").text(modalPolicyChangeSaleConfirmation.PolicySaledDate);
    t.find("[name=oldPlateCode]").text(modalPolicyChangeSaleConfirmation.OldPlateNo);
    t.find("[name=newPlateCode]").text(modalPolicyChangeSaleConfirmation.NewPlateNo);
    t.find("[name=vehicleSerialCode]").text(modalPolicyChangeSaleConfirmation.RegistrySerialCode);
    t.find("[name=vehicleSerialNo]").text(modalPolicyChangeSaleConfirmation.RegistrySerialNo);
    t.find("[name=CCNo]").text(modalPolicyChangeSaleConfirmation.CCNo);
    t.find("[name=EndorsmentAmount]").text(modalPolicyChangeSaleConfirmation.EndorsmentAmountText)
}

function EndorsmentConfirmSuccess(n) {
    $("#loading").hide();
    EventFlags.EndorsmentConfirmationChangePlateEvent = !1;
    EventFlags.EndorsmentConfirmationChangeSaleEvent = !1;
    n.ResultState ? EndorsmentConfirmSuccessDataSet(n) : EndorsmentConfirmException(n)
}

function EndorsmentConfirmSuccessDataSet(n) {
    OpenEndorsmentConfirmationSuccessWithTargetId(n.TargetFormId)
}

function EndorsmentConfirmException(n) {
    modalPolicyChangeSaleConfirmation.ServiceErrorMessage = n.ServiceErrorMessage;
    switch (n.Process) {
        case "ChangePlate":
            $("#modal-policy-change-plate-confirmation").fadeOut(function() {
                var t = "#modal-policy-change-plate-file";
                $(t).find('[name="policyNo"]').text(n.PolicyNo);
                $(t).find('[name="insuredName"]').text(n.InsuredName);
                $(t).find('[name="insurerGSM"]').text(n.GSM);
                $(t).find('[name="insurerEmail"]').text(n.Email);
                $(t).find('[name="oldPlateCode"]').text(n.OldPlateNo);
                $(t).find('[name="newPlateCode"]').text(n.NewPlateNo);
                $(t).find('[name="vehicleSerialCode"]').text(n.RegistrySerialCode);
                $(t).find('[name="vehicleSerialNo"]').text(n.RegistrySerialNo);
                modalPolicyChangeSaleConfirmation.IsNewPlate ? $(t).find("#changePlateConfErrRegistryBoxs").hide() : $(t).find("#changePlateConfErrRegistryBoxs").show();
                $(t).fadeIn()
            });
            break;
        case "ChangeSaled":
            $("#modal-policy-change-sale-confirmation").fadeOut(function() {
                var t = "#modal-policy-change-sale-file";
                $(t).find('[name="policyNo"]').text(n.PolicyNo);
                $(t).find('[name="insuredName"]').text(n.InsuredName);
                $(t).find('[name="insurerEmail"]').text(n.Email);
                $(t).find('[name="insurerGSM"]').text(n.GSM);
                $(t).find('[name="policySaledDate"]').text(n.PolicySaledDate);
                $(t).fadeIn()
            })
    }
}

function OpenEndorsmentConfirmationSuccessWithTargetId(n) {
    var t = $(n).parents(".modal-body");
    t.find(".confirmation-content").fadeOut(200, openSuccessPanelCallback(n))
}

function openSuccessPanelCallback(n) {
    var t = $(n).parents(".modal-body");
    t.find(".confirmation-success").fadeIn()
}

function OpenEndorsmentConfirmationSuccess(n) {
    var t = n;
    t.find(".confirmation-content").fadeOut(function() {
        t.find(".confirmation-success").fadeIn()
    })
}

function FormDataImageUpload(n) {
    window.FormData !== undefined && FormDataImages !== undefined ? (FormDataImages.append("Process", n.Process), FormDataImages.append("PolicyNo", n.PolicyNo), FormDataImages.append("PolicyNo", n.PolicyNo), FormDataImages.append("InsuredName", n.InsuredName), FormDataImages.append("GSM", n.GSM), FormDataImages.append("Email", n.Email), FormDataImages.append("OldPlateNo", n.OldPlateNo), FormDataImages.append("NewPlateNo", n.NewPlateNo), FormDataImages.append("RegistrySerialCode", n.RegistrySerialCode), FormDataImages.append("RegistrySerialNo", n.RegistrySerialNo), FormDataImages.append("EndorsmentAmount", n.EndorsmentAmount), FormDataImages.append("TargetFormId", n.TargetFormId), FormDataImages.append("IsNewPlate", n.IsNewPlate), FormDataImages.append("PolicySaledDate", n.PolicySaledDate), FormDataImages.append("ServiceErrorMessage", modalPolicyChangeSaleConfirmation.ServiceErrorMessage), $("#loading").show(), $.ajax({
        url: "/Products/EndorsmentConfirmationError",
        type: "POST",
        contentType: !1,
        processData: !1,
        data: FormDataImages,
        success: function(n) {
            EndorsmentConfirmSuccessErrorAfter(n)
        },
        error: function(n) {
            App.Modal.hide();
            errorModal(globalErrorTag, SistemUyarisiBasligi, responseModel.Message + " _ StatusCode : " + n.statusText)
        }
    })) : console.log("FormData is not supported.")
}

function EndorsmentConfirmSuccessErrorAfter(n) {
    if ($("#loading").hide(), n.ResultState) EndorsmentConfirmSuccessDataSet(n);
    else {
        var t = n.TargetFormId.replace("form", "modal");
        $(t).fadeOut(function() {
            errorModal(globalErrorTag, SistemUyarisiBasligi, n.Message)
        })
    }
}

function objectifyForm(n) {
    for (var i = {}, t = 0; t < n.length; t++) i[n[t].name] = n[t].value;
    return i
}

function ThisPageRefresh(n) {
    errorModal(langData.Warning, SistemUyarisiBasligi, n);
    return setTimeout(function() {
        location.reload()
    }, 7e3), !1
}

function ThisPageRefresh(n, t) {
    errorModal(langData.Warning, SistemUyarisiBasligi, n);
    var i = t;
    return setTimeout(function() {
        location.reload()
    }, i), !1
}

function PrintEndorsmentDoc(n) {
    $(n).fadeOut(200, PostPrintEndorsment)
}

function PostPrintEndorsment() {
    $("#loading").show();
    AjaxPost("/Products/PrintEndorsment", {
        PolicyNo: modalPolicyChangeSaleConfirmation.PolicyNo,
        BmvProductCode: BMVProdCodes.Traffic,
        ICProdNo: ICProdCodes.Traffic,
        RenewalNo: modalPolicyChangeSaleConfirmation.RenewalNo,
        EndorsNo: modalPolicyChangeSaleConfirmation.EndorsNo
    }, GetProposalOutputSuccess, GetProposalOutputError);
    EmarSysPrintProposal(IcNoAndProdNo)
}

function CustomersAgencySearchFormSuccess(n) {
    var t, r, i;
    if ($("#loading").hide(), t = $("#my-agent"), n.IsOK) {
        for (r = !1, i = 0; i < n.PolicyAndAgencyCol.length; i++)
            if (parseInt(n.PolicyAndAgencyCol[i].PolICprodCode) == ICProdCodes.Traffic) {
                r = !0;
                break
            } r ? ($("#my-agent").css("display", ""), t.is(":visible") ? t.slideUp(function() {
            try {
                t.slideDown(function() {
                    try {
                        CreatePolicyInfoCart(n.PolicyAndAgencyCol)
                    } catch (i) {
                        console.log(i)
                    }
                    $("html, body").animate({
                        scrollTop: t.offset().top - App.headerHeight()
                    })
                })
            } catch (i) {
                console.log(i)
            }
        }) : t.slideDown(function() {
            try {
                CreatePolicyInfoCart(n.PolicyAndAgencyCol)
            } catch (i) {
                console.log(i)
            }
            $("html, body").animate({
                scrollTop: t.offset().top - App.headerHeight()
            })
        })) : (t.is(":visible") && t.slideUp(function() {}), $('[data-groupName="searchKeyValue"]').val(""), errorModal(globalErrorTag, SistemUyarisiBasligi, langData.jsNotFoundPolyAllowedProd))
    } else t.is(":visible") && t.slideUp(function() {}), $('[data-groupName="searchKeyValue"]').val(""), errorModal(globalErrorTag, SistemUyarisiBasligi, n.Message)
}

function CreatePolicyInfoCart(n) {
    var f, r, i, u;
    for ($(".policy-cards").html(""), f = "", r = groupBy(n, function(n) {
        return [n.AgencyCode, n.PolICprodCode]
    }), i = 0; i < r.length; i++)
        if (u = parseInt(r[i].PolICprodCode), u == ICProdCodes.Traffic) {
            var e = GetProductsInfo(u),
                o = r[i],
                t = SetUsableDataModel(u, JSON.stringify(o));
            try {
                f += '    <div class="card-grid-item">                                                                                                                               <div class="card policy-card">                                                                                                                             <div class="card-header">                                                                                                                                  <h3>' + e.Name + '<\/h3>                                                                                                                         <i class="' + e.Path + '"><\/i>                                                                                                              <\/div>                                                                                                                                                 <div class="card-body">                                                                                                                                    <div class="card-columns--md">                                                                                                                             <div class="card-column column--policy" style="display:none !important">                                                                                  <div class="policy-info">                                                                                                                                  <div class="policy-info-item">                                                                                                                             <label>' + langData.PolicyNo + "<\/label>                                                                                                               <p>" + t.PolNo + '<\/p>                                                                                                                       <\/div>                                                                                                                                                 <div class="policy-info-item">                                                                                                                             <label>' + langData.Insured + "<\/label>                                                                                                                <p>" + t.PolInsuredName + '<\/p>                                                                                                              <\/div>                                                                                                                                                 <div class="policy-info-item">                                                                                                                             <label>' + e.CommonValueTitle + "<\/label>                                                                                                       <p>" + t.PolCommonValue + '<\/p>                                                                                                              <\/div>                                                                                                                                                 <div class="policy-info-item">                                                                                                                             <label>' + langData.StartDateView + "<\/label>                                                                                                          <p>" + t.PolBeginDate + '<\/p>                                                                                                                <\/div>                                                                                                                                                 <div class="policy-info-item">                                                                                                                             <label>' + langData.EndDateView + "<\/label>                                                                                                            <p>" + t.PolEndDate + '<\/p>                                                                                                                  <\/div>                                                                                                                                             <\/div>                                                                                                                                             <\/div>                                                                                                                                                 <div class="card-column column--agency">                                                                                                                   <div class="agency-info">                                                                                                                                  <div class="agency-info-box">                                                                                                                              <div class="agency-info-title">                                                                                                                            <h4>' + t.ChannelName + '<\/h4>                                                                                                               <\/div>                                                                                                                                                 <div class="agency-info-item">                                                                                                                             <b title="' + langData.jsOpenAddress + '">A<\/b> <span>' + t.ChannelAddress + '<\/span>                                                        <\/div>                                                                                                                                                 <div class="agency-info-item">                                                                                                                             <b title="' + langData.jsPhoneNumber + '">T<\/b> <span>' + t.ChannelPhone + '<\/span>                                                          <\/div>                                                                                                                                                 <div class="agency-info-item">                                                                                                                             <b title="' + langData.EMail + '">E<\/b> <a href="mailto:' + t.ChannelEposta + '">' + t.ChannelEposta + '<\/a>                                   <\/div>                                                                                                                                                 <a href="tel:' + t.ChannelPhone + '" class="qs-btn qs-btn-block qs-btn-green qs-btn-glow">' + langData.jsCallAgency + "<\/a>                                   <\/div>                                                                                                                                             <\/div>                                                                                                                                             <\/div>                                                                                                                                             <\/div>                                                                                                                                             <\/div>                                                                                                                                             <\/div>                                                                                                                                             <\/div>"
            } catch (s) {
                console.log(s)
            }
        } $(".policy-cards").html(f)
}

function SetUsableDataModel(n, t) {
    var i = JSON.parse(t);
    i.ChannelName = i.PolChannelName;
    i.ChannelAddress = GetAgencyAddress(t);
    i.ChannelPhone = GetAgencyPhoneNumber(t);
    i.ChannelEposta = GetAgencyEposta(t);
    try {
        switch (n) {
            case 100:
            case 103:
                i.PolCommonValue = i.PolPlate;
                break;
            case 101:
                i.PolCommonValue = i.PolPlate;
                break;
            case 201:
                i.PolCommonValue = i.PolUAVT;
                break;
            case 202:
                i.PolCommonValue = i.PolUAVT;
                break;
            case 500:
                i.PolCommonValue = "";
                break;
            case 504:
                i.PolCommonValue = "";
                break;
            case 600:
                i.PolCommonValue = ""
        }
        return i
    } catch (r) {
        return i
    }
}

function GetAgencyAddress(n) {
    try {
        var t = JSON.parse(n);
        return t.PolChannelAddress1 !== null && t.PolChannelAddress1 !== "" && typeof t.PolChannelAddress1 != "undefined" ? t.PolChannelAddress1 : t.PolChannelAddress2 !== null && t.PolChannelAddress2 !== "" && typeof t.PolChannelAddress2 != "undefined" ? t.PolChannelAddress2 : t.PolChannelAddress3 !== null && t.PolChannelAddress3 !== "" && typeof t.PolChannelAddress3 != "undefined" ? t.PolChannelAddress3 : t.PolChannelAddress4 !== null && t.PolChannelAddress4 !== "" && typeof t.PolChannelAddress4 != "undefined" ? t.PolChannelAddress4 : langData.jsNotReturnAddressInfo
    } catch (i) {
        return ""
    }
}

function GetAgencyPhoneNumber(n) {
    try {
        var t = JSON.parse(n);
        return t.PolChannelPhone1 !== null && t.PolChannelPhone1 !== "" && typeof t.PolChannelPhone1 != "undefined" ? t.PolChannelPhone1 : t.PolChannelPhone2 !== null && t.PolChannelPhone2 !== "" && typeof t.PolChannelPhone2 != "undefined" ? t.PolChannelPhone2 : t.PolChannelPhone3 !== null && t.PolChannelPhone3 !== "" && typeof t.PolChannelPhone3 != "undefined" ? t.PolChannelPhone3 : t.PolChannelPhone4 !== null && t.PolChannelPhone4 !== "" && typeof t.PolChannelPhone4 != "undefined" ? t.PolChannelPhone4 : ""
    } catch (i) {
        return ""
    }
}

function GetAgencyEposta(n) {
    try {
        var t = JSON.parse(n);
        return t.PolChannelEmailAddress1 !== null && t.PolChannelEmailAddress1 !== "" && typeof t.PolChannelEmailAddress1 != "undefined" ? t.PolChannelEmailAddress1 : t.PolChannelEmailAddress2 !== null && t.PolChannelEmailAddress2 !== "" && typeof t.PolChannelEmailAddress2 != "undefined" ? t.PolChannelEmailAddress2 : ""
    } catch (i) {
        return ""
    }
}

function RenewalSearchFormSuccess(n) {
    $("#loading").hide();
    var t = $("#renewal-policies");
    n.IsOK ? n.SfsRenewals.length == 0 ? (t.is(":visible") && t.slideUp(function() {}), $('[name="tckn"]').val(""), errorModal(globalErrorTag, SistemUyarisiBasligi, langData.jsNotFoundRecordInSystem)) : t.is(":visible") ? t.slideUp(function() {
        try {
            t.slideDown(function() {
                try {
                    RenewalsTableAddRow(n.SfsRenewals)
                } catch (i) {
                    console.log(i)
                }
                $("html, body").animate({
                    scrollTop: t.offset().top - App.headerHeight() - 30
                })
            })
        } catch (i) {
            console.log(i)
        }
    }) : t.slideDown(function() {
        try {
            RenewalsTableAddRow(n.SfsRenewals)
        } catch (i) {
            console.log(i)
        }
        $("html, body").animate({
            scrollTop: t.offset().top - App.headerHeight() - 30
        })
    }) : (t.is(":visible") && t.slideUp(function() {}), $('[name="tckn"]').val(""), errorModal(globalErrorTag, SistemUyarisiBasligi, response.Message))
}

function ClearTableRows(n) {
    for (var t = document.getElementById(n).getElementsByTagName("tbody")[0], r = t.rows.length, i = 1; i < r; i++) t.deleteRow(1);
    return t
}

function RenewalsTableAddRow(n) {
    for (var o, r, u, i, f, s = n.length, e = ClearTableRows("testPolicyTable"), h = e.rows[0].cells.length, t = 0; t < s; t++)
        for (o = e.insertRow(t + 1), r = 0; r < h; r++) {
            u = o.insertCell(r);
            i = document.createTextNode(r.toString());
            switch (r) {
                case 0:
                    i = document.createTextNode(n[t].POLICY_NO);
                    break;
                case 1:
                    i = document.createTextNode(n[t].RENEWAL_NO);
                    break;
                case 2:
                    i = document.createTextNode(n[t].PRODUCT_NAME);
                    break;
                case 3:
                    i = document.createTextNode(n[t].MAIN_INSURED);
                    break;
                case 4:
                    i = document.createTextNode(n[t].LC_GROSS_PREMIUM);
                    break;
                case 5:
                    i = document.createTextNode(n[t].BEG_DATE);
                    break;
                case 6:
                    i = document.createTextNode(n[t].END_DATE);
                    break;
                case 7:
                    f = '<a href="javascript:void(0)" onclick="SaleRenewalWithProposal(' + n[t].POLICY_NO + ", " + n[t].PRODUCT_NO + ", " + n[t].RENEWAL_NO + ", " + n[t].ENDORS_NO + ')" class="qs-btn qs-btn-block qs-btn-blue qs-btn-glow" style="padding:6px;">' + langData.Buy + "<\/a>";
                    f += '<br /><a href="javascript:void(0)" onclick="RenewalPrintProposal(' + n[t].POLICY_NO + ", " + n[t].PRODUCT_NO + ", " + n[t].RENEWAL_NO + ", " + n[t].ENDORS_NO + ')" class="qs-btn qs-btn-sm qs-btn-block qs-btn-green qs-btn-glow" style="padding:5px;">' + langData.ShowproposalView + "<\/a>";
                    u.innerHTML = f
            }
            r != 7 && u.appendChild(i)
        }
    console.log("table add done")
}

function SaleRenewalWithProposal(n, t, i, r) {
    $("#loading").show();
    $('[name="sectionRenewal"]').addClass("displayNone");
    var u = {
        CompanyCode: "110",
        PolicyNo: n,
        IC_NO: IC_No,
        ProductNo: t,
        RENEWAL_NO: i,
        ENDORS_NO: r
    };
    AjaxPost("/Products/GetProposalWithIcProposalNo?rnd=" + Math.floor(Math.random() * 9999999999), u, SaleRenewalWithProposalSuccess, null)
}

function SaleRenewalWithProposalSuccess(n) {
    if ($("#loading").hide(), n.IsOK) {
        camePage = camePages.RenewalPage;
        $("#proposalDiv, #paymentSuccess").removeClass("displayNone");
        var t = IC_No.toString() + "_" + n.ProductNo.toString();
        TeklifSatinAl(t, 1, "H", n.BMV_PRODUCT_NO, n.BmvPolicyNo)
    } else ThisPageRefresh(n.Message, 3e3)
}

function RenewalPrintProposal(n, t, i, r) {
    $("#loading").show();
    var u = {
        CompanyCode: "110",
        PolicyNo: n,
        IC_NO: IC_No,
        ProductNo: t,
        RENEWAL_NO: i,
        ENDORS_NO: r
    };
    AjaxPost("/Products/GetProposalWithIcProposalNo", u, RenewalPrintProposalSuccess, null)
}

function RenewalPrintProposalSuccess(n) {
    if ($("#loading").hide(), n.IsOK) {
        var t = IC_No.toString() + "_" + n.ProductNo.toString();
        PrintProposal(t, 1, "H", n.BmvPolicyNo)
    } else errorModal(globalErrorTag, SistemUyarisiBasligi, n.Message)
}

function AgencyRequestControl() {
    return agencyCanEnterEndors ? !0 : (errorModal(globalErrorTag, SistemUyarisiBasligi, langData.jsContactYourAgency), !1)
}

function YKPlateControl(n) {
    if (n.indexOf("YK") !== -1) {
        var t = n.substring(n.indexOf("YK") + 2, n.length).trim();
        return t == "" ? (errorModal(globalErrorTag, SistemUyarisiBasligi, langData.ksYKPlateInqueries), !1) : !0
    }
    return !0
}

function getParameterByName(n, t) {
    t || (t = window.location.href);
    n = n.replace(/[\[\]]/g, "\\$&");
    var r = new RegExp("[?&]" + n + "(=([^&#]*)|&|#|$)"),
        i = r.exec(t);
    return i ? i[2] ? n == "utm_campaign" && i[2].length >= 50 ? i[2] : decodeURIComponent(i[2].replace(/\+/g, " ")) : "" : null
}

function UTF8_to_B64(n) {
    return window.btoa(unescape(encodeURIComponent(n)))
}

function B64_to_UTF8(n) {
    return decodeURIComponent(escape(window.atob(n)))
}

function CloseModal3DPage(n) {
    try {
        if (threeDPaymentModalIsOpen) {
            threeDPaymentModalIsOpen = !1;
            App.modal.hide("#modal3DPage");
            var t = {
                errMessage: ""
            };
            t.errMessage = typeof n == "undefined" ? "" : n;
            AjaxPost("/Proposal/SaveCloseLog3DWindow", t, null, null);
            setTimeout(function() {}, 500)
        }
    } catch (i) {}
}

function GetProductsInfo(n) {
    try {
        return $.grep(ProductsInfo, function(t) {
            return t.Code == n
        })[0]
    } catch (i) {
        return null
    }
}

function GetProductsInfoOnBmvProdCode(n) {
    try {
        return $.grep(ProductsInfo, function(t) {
            return t.BmvProdCode == n
        })[0]
    } catch (i) {
        return null
    }
}

function SetAgencyInfoModal(n) {
    var t = JSON.parse(n),
        i, r;
    t.IsOK ? ($('div[data-result-id="company-name"]').text(t.Name), t.District.trim() != "" && t.City.trim() != "" ? $('div[data-result-id="address"]').html(t.Address + "<br>" + t.District + " / " + t.City) : $('div[data-result-id="address"]').html(t.Address), i = t.Phone.replace(" ", "").trim(), i.length == 10 ? $('a[data-result-id="call"]').attr("href", "tel:0" + i) : $('a[data-result-id="call"]').attr("href", "tel:" + i), $('div[data-result-id="phone-number"]').text(t.Phone.trim() != "" ? t.Phone : "-"), $('div[data-result-id="email"]').text(t.Eposta.trim() != "" ? t.Eposta : "-"), t.Phone.trim() == "" && $("#template-modal-policy-change-agency").find(".confirmation-content-actions-no-map").remove()) : ($("#template-modal-policy-change-agency").find(".confirmation-content-actions-map, .map-item").remove(), $("#template-modal-policy-change-agency").find(".modal-top>h3").html(langData.Warning), $("#template-modal-policy-change-agency").find(".modal-body").html(langData.jsContactYourAgency + "<br />" + t.Message));
    r = parseInt(t.Code);
    App.policy.agencyModal(r)
}

function NotRecommendedBrowsersControl() {
    typeof Storage != "undefined" ? localStorage.browserWarningCounter = localStorage.browserWarningCounter ? parseInt(localStorage.browserWarningCounter) + 1 : 1 : localStorage.setItem("browserWarningCounter", 1);
    ["I", "E", "IE"].indexOf(navigator.sayswho[0]) > -1 && (localStorage.setItem("browserWarningCounter", parseInt(localStorage.getItem("browserWarningCounter"))), parseInt(localStorage.getItem("browserWarningCounter")) < 3 && errorModal(langData.Warning, "", "Quick " + langData.InsuranceView + ", " + langData.jsBestExp + ' <a href="https://www.google.com/chrome/" target="_blank" title="Google Chrome Download">Google Chorome<\/a> ' + langData.jsRecommendUseIt))
}

function groupBy(n, t) {
    var i = {};
    return n.forEach(function(n) {
        var r = JSON.stringify(t(n));
        i[r] = i[r] || [];
        i[r].push(n)
    }), Object.keys(i).map(function(n) {
        return i[n][0]
    })
}

function BlockErrorMessage(n, t) {
    App.block(n, {
        message: t
    });
    setTimeout(function() {
        App.unblock(n)
    }, 3e3)
}

function BlockErrorMessageUnlimited(n, t) {
    App.block(n, {
        message: t
    });
    setTimeout(function() {
        App.unblock(n)
    }, 3e3)
}

function ChangeKaskoFormInputs(n, t) {
    var u = n,
        f, i, v;
    App.block("#form-kasko-deger", {
        message: ""
    });
    f = t.attr("name");
    i = t.val();
    KaskoDegerListesiPageModel.PostAddress = "/Products/GetCarBrandAndModelInDef110VehicleValues";
    switch (f) {
        case "year":
            KaskoDegerListesiPageModel.TargetElmName = "make";
            KaskoDegerListesiPageModel.ElementValue = i;
            $('[name="make"], [name="trim"]').html($("<option><\/option>").attr("value", 0).text(langData.SelectView));
            AjaxPost(KaskoDegerListesiPageModel.PostAddress, KaskoDegerListesiPageModel, FillSelectionBoxSuccess, null);
            break;
        case "make":
            $('[name="trim"]').html($("<option><\/option>").attr("value", 0).text(langData.SelectView));
            KaskoDegerListesiPageModel.TargetElmName = "trim";
            KaskoDegerListesiPageModel.ElementMakeValue = i;
            AjaxPost(KaskoDegerListesiPageModel.PostAddress, KaskoDegerListesiPageModel, FillSelectionBoxSuccess, null)
    }
    var r = ["", "0"],
        e = $('[name="year"]').val(),
        o = $('[name="make"]').val(),
        s = $('[name="trim"]').val(),
        h = r.indexOf(e),
        c = r.indexOf(o),
        l = r.indexOf(s),
        a = h == -1 && c == -1 && l == -1 ? !0 : !1;
    if (!a) return u.find(".calculation-price").addClass("invisible"), !1;
    v = u.find("input, select, textarea").filter(function() {
        return this.value === ""
    });
    KaskoDegerListesiPageModel.TargetElmName = "queries";
    KaskoDegerListesiPageModel.ElementValue = e;
    KaskoDegerListesiPageModel.ElementMakeValue = o;
    KaskoDegerListesiPageModel.TrimValue = s;
    AjaxPost(KaskoDegerListesiPageModel.PostAddress, KaskoDegerListesiPageModel, FillSelectionBoxSuccess, null)
}

function FillSelectionBoxSuccess(n) {
    var t, i;
    if (App.unblock("#form-kasko-deger"), n.HasError) return $('[name="make"], [name="trim"]').html($("<option><\/option>").attr("value", 0).text(langData.SelectView)), errorModal(langData.Warning, "", n.Message), !1;
    t = JSON.parse(n.DataCollection);
    switch (n.TargetElmName) {
        case "make":
            $('[name="make"], [name="trim"]').html($("<option><\/option>").attr("value", 0).text(langData.SelectView));
            $.each(t, function(n, t) {
                $('[name="make"]').append($("<option><\/option>").attr("value", t[0].BRAND_CODE).text(t[0].BRAND_NAME))
            });
            break;
        case "trim":
            $('[name="trim"]').html($("<option><\/option>").attr("value", 0).text(langData.SelectView));
            $.each(t, function(n, t) {
                $('[name="trim"]').append($("<option><\/option>").attr("value", t.MODEL_CODE).text(t.MODEL_NAME))
            });
            break;
        case "queries":
            i = t[0].TL_VALUE_OF_VEHICLE;
            $(".calculation-price_amount>span").text(t[0].DESCRIPTION);
            $(".calculation-price").removeClass("invisible")
    }
}

function OpenDocumentInModal(n, t) {
    var i = '<iframe src="' + t + '" width="100%" height="100%"><\/iframe>';
    n += '<a style="margin-left: 10px;" class="fa fa-search" href="' + t + '" target="_blank"><\/a>';
    printModal("", n, i);
    $("#loading").hide()
}

function AsLoginControl() {
    try {
        AjaxPost("/Products/LoadSessionMasterObject", {}, null, null)
    } catch (n) {}
}

function GetRenewalDASKPolicySuccess(n) {
    var f = "UAVT_NO",
        i, r, t, e, u, o, s, h;
    $("#IsLiveAlertMessage").hide();
    App.unblock("#loadingRenewalBlock", {
        message: ""
    });
    $("#loadingRenewalBlock").hide();
    i = n.UAVTCode.toString();
    i = i.substring(0, 3) + "*****" + i.substring(i.length, 8);
    r = "UAVT : " + i;
    n.DaskPolicyNo != "" && typeof n.DaskPolicyNo != "undefined" && n.DaskPolicyNo != null && (r += "<br />" + langData.RenewalPolicyNo + " : " + n.DaskPolicyNo + "<br />" + langData.EndDateView + " : " + n.DaskEndDate);
    $("#daskPolNo_bitisTarihi").html(r.toString()).show();
    n.IsOK ? (t = JSON.parse(n.ProposalJsonData), e = t[0].HasError, e ? DaskRenewErrorState(n.UAVTCode, f, n.IsLivePolicy) : (u = Number(t[0].PolicyNo), o = Number(t[0].ICProposalNo), FlagProposalInfo.PolicyNo = u, FlagProposalInfo.ICProdCode = 202, FlagProposalInfo.RenewalNo = 0, FlagProposalInfo.EndorsNo = 0, $("#110_202_1_loading_icon_NEW").hide(), $("#110_202_1_fiyat_NEW, #110_202_1_NEW").text("").html(t[0].GrossPremium + " &#x20BA;").show(), $("#110_202_1_proposal-item_NEW").show(), s = t[0].ICProdNoPacketType.split("_"), h = Number(s[2]), TeklifSatinAlDataModel = {
        ICNo_ICProdNo: t[0].ICNo + "_202",
        PaketSecim: h,
        ClaimType: "H",
        BmvProductCode: BMVProdCodes.DASK,
        PolicySerialNo: u,
        CaprazSatisPayment: !1,
        ClaimStep: null,
        CustomerType: EnumsCustomerTypes.TCKN.toString(),
        BmvPolicyNo: o
    }, $(".dask-information").slideUp(400, function() {
        $("body").stop(!0, !0).animate({
            scrollTop: $(".dask-information").offset().top - App.headerHeight() - 20
        }, 300)
    }), App.sizer.resize())) : (typeof n.DaskEndDate != "undefined" && n.DaskEndDate != null && n.DaskEndDate != "" && (r += "<br />" + langData.EndDateView + " : " + n.DaskEndDate), $("#daskPolNo_bitisTarihi").html(r.toString()).show(), DaskRenewErrorState(n.UAVTCode, f, n.IsLivePolicy), $(".dask-information").hide())
}

function DaskRenewErrorState(n, t, i) {
    i && $("#IsLiveAlertMessage").show();
    FlagProposalInfo.PolicyNo = 0;
    $("#110_202_1_proposal-item_NEW").hide();
    Adress.getAdressCode(n, t, !0)
}

function ShowDaskStepOneFirstPolicy() {
    try {
        $(".dask-information").slideDown(400, function() {
            $("body").stop(!0, !0).animate({
                scrollTop: $(".dask-information").offset().top - App.headerHeight() - 20
            }, 300)
        });
        App.sizer.resize()
    } catch (n) {}
}

function RecaptchaProtection() {
    "use strict";
    try {
        captchaEnabled ? EnvironmentController.IsCaptchaValidate ? (grecaptcha.render("recaptcha", {
            sitekey: sitekey,
            theme: "light",
            type: "image",
            callback: correctCaptchaNew
        }), $("#recaptcha").attr("data-isLoad-CaptchaLib", "true"), grecaptcha.execute(), grecaptcha.reset()) : correctCaptchaNew("IsCaptchaValidate") : correctCaptchaNew("CaptchaDisable")
    } catch (n) {}
    App.modal.show("#modal-recaptcha");
    $(this).find(".hero-errors").hide()
}

function LandingIncomingFormSuccess(n) {
    var t, i;
    if ($("#loading").hide(), n.IsError) return errorModal(langData.Warning, "", n.Message), !1;
    if (t = JSON.parse(n.ProposalResponseDataModel), t == null || t[0] == null || t[0].HasError || t[0].PolicyNo == "") return $("#proposalDiv, #paymentSuccess").hide(), $("#landing, .landing").show(), i = t == null || t[0] == null ? langData.jsUnableCreateProp + "!" : t[0].ErrorMessage, errorModal(langData.Warning, "", i), !1;
    LandingIncomingFormPolicyResult = {};
    LandingIncomingFormPolicyResult = t[0];
    $("#landing, .landing").hide();
    TeklifSatinAl("110_600", 1, "H", "5", t[0].PolicyNo, !1, null, "4")
}

function ProposalProcessPrintOrSale(n) {
    switch (n) {
        case 1:
            PrintProposal(TeklifSatinAlDataModel.ICNo_ICProdNo, TeklifSatinAlDataModel.PaketSecim, TeklifSatinAlDataModel.ClaimType, TeklifSatinAlDataModel.BmvPolicyNo);
            break;
        case 2:
            TeklifSatinAl(TeklifSatinAlDataModel.ICNo_ICProdNo, TeklifSatinAlDataModel.PaketSecim, TeklifSatinAlDataModel.ClaimType, TeklifSatinAlDataModel.BmvProductCode.toString(), TeklifSatinAlDataModel.PolicySerialNo, !1, null, "4")
    }
}

function DiscountActionControllerOnOutLink() {
    var r;
    if (SeeThePriceFormPageModel != null) {
        var u = document.referrer.replace("http://", "").replace("https://", "").split(/[/?#]/)[0],
            n = getParameterByName("utm_campaign"),
            i = 0,
            t = getParameterByName("security_level");
        typeof t != "undefined" && t != null && (i = parseInt(t));
        n != "" && n != null && (BannerLinkProcessDone || (r = {
            ROW_ID: n,
            SecurityLevel: i
        }, AjaxPost("/Proposal/AddQuestionGenericModel", r, AddQuestionGenericModelSuccess, null)))
    }
}

function AddQuestionGenericModelSuccess(n) {
    if (BannerLinkProcessDone = n.IsOK, n.IsOK) {
        var t = window.location.origin.toString(),
            i = window.location.href.toString(),
            r = i.replace(t, ""),
            u = getParameterByName("GUID_CODE");
        u == null && window.history.pushState("", "", r + "&GUID_CODE=campaign")
    }
}

function GetDDLApproveInstallmentDatas() {
    var n = {
            BankNo: "",
            VPosID: "",
            Is3d: !1,
            Is3dValue: "",
            NumberOfInstalment: "",
            CardCode: ""
        },
        t;
    try {
        return t = WebSiteVersion == WebSiteVersions.V2 ? $('input[name="taksit"]:checked') : $("#ddlApproveInstallment option:selected"), n.BankNo = t.attr("data-BankNo"), n.VPosID = t.attr("data-VPosID"), n.CCVPosID = t.attr("data-VPosID"), n.NumberOfInstalment = t.attr("data-NumberOfInstalment"), n.CardCode = t.attr("data-CardCode"), n.Is3d = t.attr("data-Is3d") == "1" ? !0 : !1, n.Is3dValue = t.attr("data-Is3d"), n
    } catch (i) {
        return n
    }
}

function EmarsysPushTagData(n) {
    try {
        ScarabQueue.push(["tag", n]);
        ScarabQueue.push(["go"])
    } catch (t) {}
}

function CaptchaRenewalController() {
    var n = getParameterByName("policyRowKey"),
        t;
    n != "" && n != null && (captchaEnabled = !0, t = {}, CaptchaDataModel.AjaxPostProcessCode = AjaxPostProcessCodes.RenewalOnUrl, CaptchaDataModel.PostAddress = "", CaptchaDataModel.DataModel = {}, CaptchaDataModel.DataModel = t, RecaptchaProtection())
}

function RenewalPolicyOnOutLink() {
    var n = getParameterByName("policyRowKey"),
        t, i;
    n != "" && n != null ? (App.block("body", {
        message: '<b style="color:#eb1c74;"><br/>' + langData.msgPleaseWaitingSearchRenPol + "<br/><br/><br/><b>"
    }), t = {
        CompanyCode: "110",
        IC_NO: IC_No,
        PolicyRowKey: n
    }, i = parseInt(SeeThePriceFormPageModel.ICProdCode), window.history.pushState("", "", window.location.pathname), AjaxPost("/Products/GetProposalWithIcProposalNoOnUrl?rnd=" + Math.floor(Math.random() * 9999999999), t, SaleRenewalWithProposalSuccessOnUrl, null)) : (App.unblock("body"), ThisPageRefresh(langData.jsIncorrentLinkUrl, 5e3))
}

function SaleRenewalWithProposalSuccessOnUrl(n) {
    if (App.unblock("body"), n.IsOK) {
        camePage = camePages.RenewalPageOnOutLink;
        MasterUserModel.CurrentAgencyCode = n.CurrentAgencyCode;
        MasterUserModel.CurrentUsername = n.CurrentUsername;
        $(".landing, .landing-content").hide();
        $("#proposalDiv, #paymentSuccess").removeClass("displayNone");
        var t = IC_No.toString() + "_" + n.ProductNo.toString();
        TeklifSatinAl(t, 1, "H", n.BMV_PRODUCT_NO, n.BmvPolicyNo)
    } else ThisPageRefresh(n.Message, 3e3)
}

function SuccessRemoveCustomerInUnsuredList(n) {
    TravelInsureds = _.without(TravelInsureds, _.findWhere(TravelInsureds, {
        IdentityNumber: n.IDENTITY_NO
    }))
}

function GetTotalDaysBetweenDate(n, t) {
    var i = 0,
        r, u;
    try {
        r = new Date(n.split(".")[2], (parseInt(n.split(".")[1]) - 1).toString(), n.split(".")[0]);
        u = new Date(t.split(".")[2], (parseInt(t.split(".")[1]) - 1).toString(), t.split(".")[0]);
        i = Math.ceil(Math.abs(r.getTime() - u.getTime()) / 864e5)
    } catch (f) {
        i = 0
    }
    return i
}

function LoadQuotesFormPeople() {
    AjaxPost("/Proposal/GetQuotesFormPeople", null, function(n) {
        if (App.unblock("body"), n.ResultType != ResultTypes.Message) {
            var t = createSubProdQueryUrl(),
                i = window.location.href.split("=")[1];
            window.history.pushState("", "", "/Proposal/Index?prodNo=" + i + "=sigortali-bilgileri" + t);
            $("#proposalStep1, #proposalStep2, #proposalStep3").hide();
            $("#proposalStep0").css("display", "block").find(".renderhtml").html(n.ResultValue)
        } else BlockErrorMessage("body", '<b style="color:#eb1c74">' + n.ResultValue + "<\/b>");
        $(window).trigger("resize")
    }, function() {
        App.unblock("body");
        $(window).trigger("resize")
    })
}

function GoShoppingStep() {
    TeklifSatinAl(SelectedProposalPacketPrice.ParamProductCode, SelectedProposalPacketPrice.ParamTravelPackageType, SelectedProposalPacketPrice.ParamClaimType, SelectedProposalPacketPrice.ParamBmvProductCode)
}

function TravelOpenStepFour() {}

function OpenpaymentInfoBar(n) {
    var t = n.getAttribute("data-target-payment-type-group-code");
    $('[data-payment-info-group-code="paymentInfoBar"]').css("display", "none");
    $('[data-payment-type-group-code="' + t + '"]').css("display", "block")
}

function GetCardType(n) {
    var t = "",
        i;
    try {
        i = Payment.getCardArray();
        for (let r = 0; r < i.length; r += 1) i[r].pattern.test(n) && (t = i[r].type);
        t.indexOf("mastercard") > -1 && (t = t.replace("mastercard", "master"));
        t == "" && n.length == 16 && n.startsWith("5") && (t = "master")
    } catch (r) {
        t = ""
    }
    return t
}

function EmarsysErrorLogs(n, t) {
    var i, r;
    try {
        i = "";
        switch (n) {
            case BMVProdCodes.Traffic:
            case BMVProdCodes.Motorcycles:
                i = "Zorunlu trafik sigortası | Hata: " + t;
                break;
            case BMVProdCodes.Kasko:
            case BMVProdCodes.Kasko_V2:
            case BMVProdCodes.KaskoMoto:
                r = "Kasko";
                n == BMVProdCodes.KaskoMoto && (r = "KaskoMoto");
                i = r + " | Hata: " + t;
                break;
            case BMVProdCodes.DASK:
                i = "DASK | Hata: " + t;
                break;
            case BMVProdCodes.Build:
                i = "Konut Sigortası | Hata: " + t;
                break;
            case BMVProdCodes.PersonalAccident:
            case BMVProdCodes.ExtremSports:
                i = "Ferdi Kaza | Hata: " + t;
                break;
            case BMVProdCodes.Travel:
                i = "Seyahat sigortası | Hata: " + t;
                break;
            case BMVProdCodes.Doctor:
                i = "Hekim Sorumluluk sigortası | Hata: " + t
        }
        ScarabQueue.push(["tag", i]);
        ScarabQueue.push(["go"])
    } catch (u) {
        console.log("EmarsysErrorLogs: method içerisinde hata oluştu.")
    }
}

function QueryUAVTCodeGoStepFive() {
    var t = $('input[data-fv-field="uavt"]').val(),
        n, i;
    t.length > 5 && (n = {
        TargetStep: 5,
        StreetName: "",
        Type: "",
        AddressEntryType: 3
    }, i = {
        adressCode: t,
        targetStep: n.TargetStep,
        AddressEntryType: n.AddressEntryType
    }, AjaxPost("/UavtFinder/getFullAdressbyAdressNum", i, function(n) {
        var t = $("#uavt-form");
        $('[data-uavt-result-id="address"]').html(n.result.FullAddress);
        $('[data-uavt-result-id="building-code"]').html(n.result.AddressBuildingNo);
        $('[data-uavt-result-id="uavt-code"]').html(n.result.AddressUAVT);
        t.data("wizard").go(5)
    }, null))
}

function minmax(n, t, i) {
    if (n.length == 3) {
        if (parseInt(n) < t || isNaN(parseInt(n))) return t;
        if (parseInt(n) > i) return i
    }
    return n
}

function minmaxFocusOut(n, t, i) {
    return parseInt(n) < t || isNaN(parseInt(n)) ? t : parseInt(n) > i ? i : n
}

function RefreshUAVTPannel() {
    try {
        $("#uavt-form").data("wizard").go(1)
    } catch (n) {}
}

function CheckReviseProposal() {
    var n = {
            ProposalIsRevise: !1,
            Model: {}
        },
        c = parseInt(IcProductCode),
        i = [],
        o, s, h, r;
    SelectedProposalPacketPrice.Coverages.length != 0 && $.each(SelectedProposalPacketPrice.Coverages, function(n, t) {
        i.push({
            Id: t.CoverageCode,
            Value: t.CoverageValue,
            Name: t.Name
        })
    });
    var t = !1,
        u = !1,
        f = BeforePackageTypes.length + 1,
        e = {
            GroupKey: f,
            PackageType: SelectedProposalPacketPrice.ParamTravelPackageType,
            Package: SelectedProposalPacketPrice.Package
        };
    return BeforePackageTypes.push(e), BeforePackageTypes.length > 1 && (o = _.find(BeforePackageTypes, function(n) {
        return n.GroupKey == f - 1
    }), u = o.PackageType != e.PackageType), BeforeQuestions.length >= 1 ? (s = _.filter(BeforeQuestions, function(n) {
        return n.GroupKey == _.max(BeforeQuestions, function(n) {
            return n.GroupKey
        }).GroupKey
    }), $.each(s, function(n, r) {
        var u = _.find(i, function(n) {
            return n.Id == r.Id
        });
        return t || (t = u.Value != r.Value), t ? !1 : void 0
    })) : t = _.filter(SelectedProposalPacketPrice.Coverages, function(n) {
        return n.IsChecked == !0
    }).length >= 1, h = BeforeQuestions.length + 1, $.each(i, function(n, t) {
        BeforeQuestions.push({
            GroupKey: h,
            Id: t.Id,
            Value: t.Value,
            Name: t.Name
        })
    }), r = {
        ICProdNo: c,
        Questions: i
    }, t || u ? (App.block("body", {
        message: '<b style="color:#eb1c74;">' + langData.msgProposalBeignRevised + "...<\/b>"
    }), IsFirstRequest = !1, n.ProposalIsRevise = !0, n.Model = r, n) : (n.ProposalIsRevise = !1, n.Model = r, n)
}

function ControlAfterLoadStepShoppingNew() {
    QuestionsValuePost()
}

function ShowTheShoppingStep(n) {
    GoShoppingStep();
    $("#proposal-seyahat").data("wizard").go(n)
}

function ClearTempDataPageModel() {
    ClearFirstRequestParameters()
}

function ClearFirstRequestParameters() {
    IsFirstRequest = !0;
    FirstProposalResults = [];
    BeforeQuestions = [];
    BeforePackageTypes = [];
    SelectedProposalPacketPrice.Coverages = [];
    SelectedProposalPacketPrice.ClickLabelId = "";
    $(".proposal-continue-container").is(":visible") && $(".proposal-continue-container").slideUp()
}

function SetSelectedProposalStepInputDOMObject() {
    try {
        IsFirstRequest || (console.log("Paket seçimi yapıldı."), SelectedProposalPacketPrice.Coverages.length != 0 && $.each(SelectedProposalPacketPrice.Coverages, function(n, t) {
            $('[name="' + t.InputName + '"]').prop("checked", t.IsChecked)
        }), $(SelectedProposalPacketPrice.ClickLabelId).prop("checked", !0).trigger("click"), $('.package-selector input[type="radio"]:checked').trigger("click"), ShowTheShoppingStep(4))
    } catch (n) {
        console.log("*** func: SetSelectedInputDOMObject kodunda hata oluştu.")
    }
}

function GoProposal() {
    var f, n, e, o, r;
    $("#loading").show();
    $(".btnProposal ").attr("disabled", !0);
    var u = $(".insurance-type").find(".active").data("bmvprodno"),
        s = $(".insurance-type").find(".active").data("icprodno"),
        t = $(".insurance-type").find(".active").data("prodname"),
        h = $(".insurance-type").find(".active").data("iccode"),
        i = "";
    t == "ekstrem" && (i = $("#extremeTabs").find(".active").data("value"));
    t == "Seyahat" && (i = $("#TravelTabs").find(".active").data("value"));
    switch (u) {
        case BMVProdCodes.Traffic:
            f = 1 === $(".insurance-type").find(".active").data("isprodmotor");
            f && EmarsysPushTagData("Zorunlu trafik sigortası | kullanım: MOTOSİKLET VE YÜK MOTOSİKLETİ | plaka: " + plate.split(" ").join("") + "  | fiyatı gör")
    }
    n = $(".insurance-type").find(".active").data("product-specific-value");
    typeof n == "undefined" && (n = "");
    e = "Insured";
    o = "1";
    mailOrPhoneNum = ReplaceTurkishChars(mailOrPhoneNum);
    r = {
        Plate: plate.split(" ").join(""),
        IdentityNumber: IdentityNo,
        MailAdrOrPhoneNum: mailOrPhoneNum,
        CustomerType: identityType,
        PlateSelector: plateMode,
        UavtQueryType: uavtType,
        UavtAdressCode: uavtAddressCode,
        SelectedBmvProd: u,
        IcProdCode: s,
        IcProdName: t,
        IcCode: h,
        InsuredType: e,
        ParentType: o,
        ActiveExtremeTab: i,
        ProductSpecificValue: n
    };
    ProposalController.PushScarabQueueByGetQuotesForm(r);
    AjaxPost("/Home/GetSearchResult", {
        userPlateInfo: r,
        IsMarketingEnabled: isMarketing
    }, CustomerAndPlateSuccess, CustomerAndPlateError)
}

function getCapthaScreenError() {
    $("#loading").hide();
    console.log("captcha hata")
}

function createRecaptcha() {
    "use strict";
    var n = $("#recaptcha").attr("data-isLoad-CaptchaLib");
    if (n == "false") try {
        EnvironmentController.IsCaptchaValidate ? (grecaptcha.render("recaptcha", {
            sitekey: sitekey,
            theme: "light",
            type: "image",
            callback: correctCaptcha
        }), $("#recaptcha").attr("data-isLoad-CaptchaLib", "true"), grecaptcha.execute()) : correctCaptcha("IsCaptchaValidate")
    } catch (t) {}
    App.modal.show("#modal-recaptcha");
    $(this).find(".hero-errors").hide()
}

function getCapthaScreenSuccess() {
    App.modal.hide("#modal-recaptcha");
    $("#loading").show();
    GoProposal()
}

function CustomerAndPlateSuccess(n) {
    $(".btnProposal").attr("disabled", !1);
    switch (n.ResultType) {
        case 1:
            $("#loading").hide();
            IsValidIdentityNo(IdentityNo) ? errorModal(SistemUyarisiBasligi, "", n.ResultValue) : errorModal(SistemUyarisiBasligi, "", GecerliKimlikUyarisi);
            captchaEnabled && grecaptcha.reset();
            break;
        case 2:
            $("#loading").hide();
            $("#proposalStep1").find("form").remove();
            $("#proposalStep1").css("display", "block").find(".bas").html(n.ResultValue);
            break;
        case 3:
            location.href = n.ResultValue
    }
}

function CustomerAndPlateError(n) {
    $(".btnProposal").attr("disabled", !1);
    $("#loading").hide();
    errorModal(langData.Warning, SistemUyarisiBasligi, SorgulamaUyarisi + n);
    captchaEnabled && grecaptcha.reset()
}

function CreateAccount() {
    var n = {
            NameSurname: $("#name-surname").val().trim(),
            EMail: $("#email").val().trim(),
            Password: $("#password").val().trim(),
            PasswordConfirm: $("#passwordConfirm").val().trim()
        },
        r = $("#agreement-signin-1")[0].checked,
        i, t;
    if ($("#parsley-name-valid").html(""), n.NameSurname.split(" ")[1] == null || typeof n.NameSurname.split(" ")[1] == "undefined") return $("#loading").hide(), $(".auth-form").find("#parsley-name-valid").append('<li class="parsley-required">' + langData.jsEnterLastAndFirstName + "!<\/li>"), $(".auth-form").find("#parsley-name-valid").show(), !1;
    if (n.Password.length < 6) return $("#loading").hide(), !1;
    if ($("#parsley-password-valid").html(""), n.Password.length > 40) return $("#loading").hide(), $(".auth-form").find("#parsley-password-valid").append('<li class="parsley-required">' + langData.jsCanBeUpCipherFourtyChar + "!<\/li>"), $(".auth-form").find("#parsley-password-valid").show(), !1;
    if ($("#parsley-password1-valid").html(""), n.Password != n.PasswordConfirm) return $("#loading").hide(), $(".auth-form").find("#parsley-password1-valid").append('<li class="parsley-required">' + langData.msgEqualsPassandConfPass + "!<\/li>"), $(".auth-form").find("#parsley-password1-valid").show(), !1;
    if (document.getElementById("agreement-signup").checked == !1) return i = document.getElementById("parsley-agreement-signup-valid"), i.innerHTML = "", t = document.createElement("li"), t.appendChild(document.createTextNode(langData.jsRequiredAcceptAgrAndPolInfoForm)), t.setAttribute("class", "parsley-required"), i.appendChild(t), !1;
    $("#loading").show();
    AjaxPost("/Login/CreateAccount", {
        NameSurname: n.NameSurname,
        EMail: n.EMail,
        Password: n.Password,
        PasswordConfirm: n.PasswordConfirm,
        IsMarketingEnabled: r
    }, CreateAccountSuccess, CreateAccountError)
}

function CreateAccountSuccess(n) {
    $("#loading").hide();
    switch (n.ResultType) {
        case 1:
            $("#modal-auth").hide();
            errorModal(langData.Information + "!", "", n.ResultValue);
            break;
        case 3:
            location.href = n.ResultValue;
            break;
        case 4:
            n.ResultValue.Data.success ? loginInfo.RememberMe.is(":checked") && console.log("checkbox checked") : console.log("checkbox unchecked")
    }
}

function CreateAccountError() {
    $("#modal-auth").hide();
    errorModal(langData.ErrorDetailView, "", langData.jsErrDuringRegistryTryAgain)
}

function Login() {
    var r, t, i, n;
    if ($(".formErrorContent").remove(), $(".formErrorArrow").remove(), $("#parsley-login-email-valid").html(""), r = document.getElementById("parsley-login-password-valid"), r.innerHTML = "", t = $("#emailLogin").val(), i = $("#passwordLogin").val(), t == "" || i == "") return !1;
    LoginCustomerType = "Bireysel";
    $("#loading").show();
    n = {
        EMail: t,
        UsersLogin: !0,
        AgencyLogin: !1,
        Password: i,
        RememberMe: document.getElementById("remember-me").checked
    };
    AjaxPost("/Login/Login", {
        EMail: n.EMail,
        Password: n.Password,
        UsersLogin: n.UsersLogin,
        RememberMe: n.RememberMe
    }, B2CLoginSuccess, B2CLoginError)
}

function AgencyLogin() {
    $("#parsley-agencylogin-email-valid").html("");
    $("#parsley-agencylogin-password-valid").html("");
    $("#loading").show();
    var n = {
        EMail: "",
        AgencyLogin: !0,
        UsersLogin: !1,
        Username: $("#agencyLoginUsername").val(),
        Password: $("#agencyLoginPassword").val(),
        AgencyPassword: $("#agencyLoginPassword").val(),
        RememberMeOfAgency: document.getElementById("agencyLoginRememberMe").checked
    };
    LoginCustomerType = "Acente";
    AjaxPost("/Login/Login", {
        EMail: n.EMail,
        Password: n.Password,
        AgencyLogin: n.AgencyLogin,
        Username: n.Username,
        RememberMeOfAgency: n.RememberMeOfAgency,
        AgencyPassword: n.AgencyPassword
    }, B2CLoginSuccess, B2CLoginError)
}

function B2CLoginSuccess(n) {
    switch (n.ResultType) {
        case 1:
            $("#loading").hide();
            n.ResultData ? ($("#parsley-agencylogin-email-valid").html(""), $(".auth-form").find("#parsley-agencylogin-email-valid").append('<li class="parsley-required">' + n.ResultValue + "<\/li>"), $(".auth-form").find("#parsley-agencylogin-email-valid").show()) : ($("#parsley-login-email-valid").html(""), $(".auth-form").find("#parsley-login-email-valid").append('<li class="parsley-required">' + n.ResultValue + "<\/li>"), $(".auth-form").find("#parsley-login-email-valid").show());
            break;
        case 2:
            $("#loading").hide();
            break;
        case 3:
            SEMLogin(LoginCustomerType);
            location.href = "../" + n.ResultValue;
            $("#loading").hide();
            break;
        case 4:
            $("#loading").hide();
            n.ResultValue.Data.success ? loginInfo.RememberMe.is(":checked") && console.log("checkbox checked") : console.log("checkbox unchecked")
    }
}

function B2CLoginError() {
    $("#modal-auth").hide();
    $("#modal-agency").hide();
    errorModal(langData.ErrorDetailView, "", langData.msgTryAgain)
}

function ChangePassword() {
    $("#loading").show();
    var n = {
        OldPassword: $("#oldPassword").val(),
        NewPassword: $("#newPassword").val(),
        NewPasswordConfirm: $("#newPasswordConfirm").val()
    };
    if ($("#parsley-onlinetrans-oldpass").html(""), $("#parsley-onlinetrans-newpass").html(""), $("#parsley-onlinetrans-newpassConfirm").html(""), n.OldPassword == "") return $(".form-row").find("#parsley-onlinetrans-oldpass").append('<li class="parsley-required">' + langData.jsNotBeEmptyOldPassword + "<\/li>"), $(".form-row").find("#parsley-onlinetrans-oldpass").show(), !1;
    if (n.NewPassword == "") return $(".form-row").find("#parsley-onlinetrans-newpass").append('<li class="parsley-required">' + langData.jsNotBeEmptyNewPassword + "<\/li>"), $(".form-row").find("#parsley-onlinetrans-newpass").show(), !1;
    if (n.NewPasswordConfirm == "") return $(".form-row").find("#parsley-onlinetrans-newpassConfirm").append('<li class="parsley-required">' + langData.jsNotBeEmptyConfirmPassword + "<\/li>"), $(".form-row").find("#parsley-onlinetrans-newpassConfirm").show(), !1;
    if (n.NewPassword != n.NewPasswordConfirm) return $(".form-row").find("#parsley-onlinetrans-newpassConfirm").append('<li class="parsley-required">' + langData.jsPassAndConfPassEquals + "<\/li>"), $(".form-row").find("#parsley-onlinetrans-newpassConfirm").show(), !1;
    AjaxPost("/OnlineTransactions/ChangePassword", {
        OldPassword: n.OldPassword,
        NewPassword: n.NewPassword,
        NewPasswordConfirm: n.NewPasswordConfirm
    }, ChangePasswordSuccess, ChangePasswordError)
}

function ChangePasswordSuccess(n) {
    $("#loading").hide();
    $("#modal-auth").hide();
    switch (n.ResultType) {
        case 1:
            $(".form-row").find("#parsley-onlinetrans-newpassConfirm").append('<li class="parsley-required">' + n.ResultValue + "<\/li>");
            $(".form-row").find("#parsley-onlinetrans-newpassConfirm").show();
            break;
        case 3:
            location.href = "../" + n.ResultValue;
            break;
        case 4:
            errorModal(langData.ErrorDetailView, "", n.ResultValue)
    }
}

function ChangePasswordError() {
    $("#loading").hide();
    $("#modal-auth").hide();
    errorModal(langData.ErrorDetailView, "", langData.jsErrChangePassOper)
}

function RemoveProfilePicture() {
    var n = {
        ProfilePicture: $("#profilePicture").val()
    };
    AjaxPost("/OnlineTransactions/RemoveProfilePicture", {
        ProfilePicture: n.ProfilePicture
    }, RemoveProfilePictureSuccess, RemoveProfilePictureError)
}

function RemoveProfilePictureSuccess() {
    console.log("RemoveProfilePictureSuccess")
}

function RemoveProfilePictureError() {
    console.log("RemoveProfilePictureError")
}

function GetEmailForResetPassword() {
    $("#loading").show();
    var n = {
            Email: $("#emailForResetPassword").val()
        },
        t = MailValidation($("#emailForResetPassword")[0], ModalEnable);
    if (!t) return $("#loading").hide(), $("#parsley-reset-email-valid").html(""), $(".auth-form").find("#parsley-reset-email-valid").append('<li class="parsley-required">' + langData.jsPleaseValidEPost + "<\/li>"), $(".auth-form").find("#parsley-reset-email-valid").show(), !1;
    AjaxPost("/OnlineTransactions/ResetPassword", {
        email: n.Email
    }, GetEmailForResetPasswordSuccess, GetEmailForResetPasswordError)
}

function GetEmailForResetPasswordSuccess(n) {
    $("#loading").hide();
    $("#modal-auth").hide();
    switch (n.ResultType) {
        case 1:
            errorModal(langData.Information + "!", "", n.ResultValue);
            break;
        case 3:
            location.href = "../" + n.ResultValue;
            break;
        case 4:
            errorModal(langData.ErrorDetailView, "", n.ResultValue)
    }
}

function GetEmailForResetPasswordError() {
    $("#loading").hide();
    $("#modal-auth").hide();
    errorModal(langData.jsErrOcc, "", langData.jsErrSendingRenewalPassMail)
}

function getURIParameter(n, t) {
    return document.location.search.substring(1).split("&").reduce(function(i, r) {
        var u = r.split("=", 2).map(function(n) {
            return decodeURIComponent(n)
        });
        return u.length == 0 || u[0] != n ? i instanceof Array && !t ? null : i : t ? i.concat(u.concat(!0)[1]) : u.concat(!0)[1]
    }, [])
}

function ResetPassword() {
    $("#loading").show();
    var n = {
        TokenId: getURIParameter("Token"),
        NewPassword: $("#newPassword").val(),
        NewPasswordConfirm: $("#newPasswordConfirm").val()
    };
    if (n.NewPassword != n.NewPasswordConfirm) return errorModal(langData.ErrorDetailView, "", langData.msgEqualsPassandConfPass + " !"), !1;
    AjaxPost("/Login/ResetPassword", {
        TokenId: n.TokenId,
        NewPassword: n.NewPassword,
        NewPasswordConfirm: n.NewPasswordConfirm
    }, ResetPasswordSuccess, ResetPasswordError)
}

function ResetPasswordSuccess(n) {
    $("#loading").hide();
    $("#modal-auth").hide();
    switch (n.ResultType) {
        case 1:
            errorModal(langData.Information + "!", "", n.ResultValue);
            break;
        case 3:
            errorModal(langData.Information, "", langData.jsSuccessChangePassRedirectOnlinePage + "..");
            location.href = "../" + n.ResultValue;
            break;
        case 4:
            errorModal(langData.ErrorDetailView, "", n.ResultValue)
    }
}

function ResetPasswordError() {
    $("#loading").hide();
    $("#modal-auth").hide();
    errorModal(langData.ErrorDetailView, "", langData.jsErrRenewalPassTryAgain)
}

function SendClaimRequest(n) {
    var t, h, w;
    $("#loading").show();
    claimProdName = $(".insurance-selector").find(".active").data("type");
    var i = "",
        e = "",
        r = "",
        c = "",
        l = "",
        u = "",
        o = "",
        a = "",
        v = "",
        y = "",
        p = "",
        f = !1,
        s = !0;
    claimFormType = n;
    n == "service" ? u = "2" : n == "quick" ? u = "1" : n == "other" && (u = "3");
    t = $('.insurance-forms .insurance-form[data-damaged-type="' + n + '"][data-insurance-type="' + claimProdName + '"]');
    switch (claimProdName) {
        case "trafik":
            i = "1";
            break;
        case "kasko":
            i = "12";
            break;
        case "konut":
            i = "4";
            s = !1;
            break;
        case "ekstrem":
        case "ferdi-kaza":
            i = "6";
            s = !1
    }
    if (h = "", h = typeof $(t).find(".kazaAciklamasi").val() == "undefined" ? $(t).find(".hasar").val() : $(t).find(".kazaAciklamasi").val(), r = $(t).find(".gsm").val(), o = $(t).find(".policeno").val(), e = $(t).find(".tckn").val(), a = $(t).find(".email").val(), v = $(t).find(".name").val(), y = $(t).find(".surname").val(), c = $(t).find(".plate").val(), l = $(t).find("#datepicker-txtClaimDate-" + n + "-" + claimProdName).val(), p = h, $(".parsley-phone-valid-damage").html(""), $("#parsley-police-valid").html(""), IsValidIdentityNo(e) || ($("#loading").hide(), $(t).find("#parsley-tckn-valid").append('<li class="parsley-required">' + GecerliKimlikUyarisi + "<\/li>"), $(t).find("#parsley-tckn-valid").show(), f = !0), s & o == "" && ($("#loading").hide(), $(t).find("#parsley-police-valid").append('<li class="parsley-required">' + langData.jsEnterYourPolNo + "<\/li>"), $(t).find("#parsley-police-valid").show(), f = !0), r == "" && PhoneValidation(r) && ($("#loading").hide(), $(t).find(".parsley-phone-valid-damage").append('<li class="parsley-required">' + langData.jsEnterYourMobilePhoneNo + "<\/li>"), $(t).find(".parsley-phone-valid-damage").show(), f = !0), f) return $("#loading").hide(), errorModal(langData.jsErrOcc, "", langData.jsCheckAllFields + " !"), !1;
    w = {
        BmvProductNo: i,
        IdentityNo: e,
        IdentityType: "",
        MobilePhone: r,
        VehiclePlate: c,
        ClaimDate: l,
        PolicyNo: o,
        Email: a,
        Firstname: v,
        Surname: y,
        ClaimDescription: p,
        ClaimType: u
    };
    AjaxPost("/Claim/AddCustomerClaim", {
        claimModel: w
    }, B2CClaimSuccess, B2CClaimError)
}

function SendClaimRequestKasko(n) {
    var t, p;
    $("#loading").show();
    claimProdName = $(".insurance-selector").find(".active").data("type");
    var i = "",
        e = "",
        r = "",
        h = "",
        c = "",
        u = "",
        o = "",
        l = "",
        a = "",
        v = "",
        y = "",
        f = !1,
        s = !0;
    claimFormType = n;
    n == "service" ? u = "2" : n == "quick" ? u = "1" : n == "other" && (u = "3");
    t = $('.insurance-forms .insurance-form[data-damaged-type="' + n + '"][data-insurance-type="' + claimProdName + '"]');
    switch (claimProdName) {
        case "trafik":
            i = "1";
            break;
        case "kasko":
            i = "2";
            break;
        case "konut":
            i = "4";
            s = !1;
            break;
        case "ekstrem":
        case "ferdi-kaza":
            i = "6";
            s = !1
    }
    if (r = $(t).find("#txtMobilePhoneKasko").val(), o = $(t).find("#txtPolicyNo").val(), e = $(t).find("#txtIdentityNo").val(), l = $(t).find("#txtEmail").val(), a = $(t).find("#txtFirstname").val(), v = $(t).find("#txtSurname").val(), h = $(t).find("#txtPlate").val(), c = $(t).find("#datepicker-txtClaimDate-" + n + "-" + claimProdName).val(), y = $(t).find("#txtClaimDescription").val(), $(".parsley-phone-valid-damage").html(""), $("#parsley-police-valid").html(""), IsValidIdentityNo(e) || ($("#loading").hide(), $(t).find("#parsley-tckn-valid").append('<li class="parsley-required">' + GecerliKimlikUyarisi + "<\/li>"), $(t).find("#parsley-tckn-valid").show(), f = !0), s & o == "" && ($("#loading").hide(), $(t).find("#parsley-police-valid").append('<li class="parsley-required">' + langData.jsEnterYourPolNo + "<\/li>"), $(t).find("#parsley-police-valid").show(), f = !0), r == "" && PhoneValidation(r) && ($("#loading").hide(), $(t).find(".parsley-phone-valid-damage").append('<li class="parsley-required">' + langData.jsEnterYourMobilePhoneNo + "<\/li>"), $(t).find(".parsley-phone-valid-damage").show(), f = !0), f) return $("#loading").hide(), errorModal(langData.jsErrOcc, "", langData.jsCheckAllFields + " !"), !1;
    p = {
        BmvProductNo: i,
        IdentityNo: e,
        IdentityType: "",
        MobilePhone: r,
        VehiclePlate: h,
        ClaimDate: c,
        PolicyNo: o,
        Email: l,
        Firstname: a,
        Surname: v,
        ClaimDescription: y,
        ClaimType: u
    };
    AjaxPost("/Claim/AddCustomerClaim", {
        claimModel: p
    }, B2CClaimSuccess, B2CClaimError)
}

function B2CClaimSuccess(n) {
    $("#loading").hide();
    $("#modal-damage").hide();
    var t = $('.insurance-forms .insurance-form[data-damaged-type="' + claimFormType + '"][data-insurance-type="' + claimProdName + '"]');
    if (t != null) try {
        $(t).closest("form").find("input[type=text], textarea").val("")
    } catch (i) {
        console.log(i)
    }
    switch (n.ResultType) {
        case 1:
            errorModal(langData.jsThankYou, "", n.ResultValue);
            break;
        case 3:
            location.href = "../" + n.ResultValue;
            break;
        case 4:
            n.ResultValue.Data.success && errorModal(langData.jsThankYou, "", n.ResultValue)
    }
}

function B2CClaimError() {
    $("#modal-damage").hide();
    $("#loading").hide();
    errorModal(langData.ErrorDetailView, "", langData.msgTryAgain)
}

function dynamicQuestion() {
    $(".dynamicQuestion").on("click", function(n) {
        var l = ProposalOperationStartingControl(),
            r, t, a, v, u, f, e, o;
        if (!l.IsOK) return errorModal(langData.Warning, "", l.Message), n.preventDefault(), !1;
        if (r = $(this).closest("form").attr("id"), t = $(".form-row").validationEngine("validate"), EmarSysDynamicQuestion(r), $(".formErrorContent").remove(), $(".formErrorArrow").remove(), WebSiteVersion == 1 && r == "screenSeyahat") {
            if (a = $("#ddlQuestion10566 option:selected").val(), v = $("#ddlQuestion10567 option:selected").val(), a == "0") return errorModal("Uyarı", "", "Lütfen seyahet edeceğiniz ülkeyi seçin."), !1;
            if (v == "0") return errorModal("Uyarı", "", "Lütfen vize başvurusu yapacağınız ükleyi seçin."), !1
        }
        if (t) {
            if (typeof $("input[name=destinationtype]").val() == "undefined" || $("input[name=destinationtype]:checked").val()) {
                if (typeof $("input[name=destinationtype]").val() != "undefined")
                    if ($("#radio-yurtici").is(":checked")) {
                        if (u = $("#ddlQuestion10565").val(), u === "0" || u === "") return $("#loading").hide(), errorModal(globalErrorTag, "", langData.jsChooseTravelCity), !1
                    } else if ($("#radio-yurtdisi").is(":checked") && (f = $("#ddlQuestion10566").val(), e = $("#ddlQuestion10567").val(), f === "0" || f === "" || e === "0" || e === "")) return $("#loading").hide(), errorModal(globalErrorTag, "", langData.jsSelectRegionAndCountry), !1
            } else return $("#loading").hide(), errorModal(globalErrorTag, "", langData.jsSelectTravelLocation), !1;
            if (typeof $("input[name=txtQuestion310]").val() != "undefined" && (o = $("#txtQuestion310").val(), o === "" || parseInt(o) < MinM2)) return $("#loading").hide(), $("#txtQuestion310").focus(), $('p[data-err="310"]').removeClass("displayNone").addClass("show").html(MinM2Uyarisi), setTimeout(function() {
                $('p[data-err="310"]').addClass("displayNone")
            }, 5e3), !1;
            if (typeof $("input[name=datepicker-proposal-start-date]").val() != "undefined") {
                var y = $("#datepicker-proposal-start-date").val(),
                    p = new Date,
                    s = y.split("/"),
                    i = new Date(s[2], s[1] - 1, s[0]);
                if (p.addDays(90) < i) return $("#loading").hide(), errorModal(globalErrorTag, "", langData.jsUpdateDaysBeyond.replace("{0}", SeyahatAraligi)), !1;
                if (p.getDate() > i) return $("#loading").hide(), errorModal(globalErrorTag, "", langData.jsTripStartThisDay), !1
            }
            if (typeof $("input[name=datepicker-proposal-end-date]").val() != "undefined") {
                var y = $("#datepicker-proposal-start-date").val(),
                    g = $("#datepicker-proposal-end-date").val(),
                    p = new Date,
                    h = y.split("/"),
                    c = g.split("/"),
                    i = new Date(h[2], h[1] - 1, h[0]),
                    w = new Date(c[2], c[1] - 1, c[0]);
                if (i > w) return $("#loading").hide(), errorModal(globalErrorTag, "", langData.jsReturnDateLeast), !1;
                if (i.addDays(SeyahatAraligiMax) < w) return $("#loading").hide(), errorModal(globalErrorTag, "", langData.jsReturnDateMinParameter.replace("{0}", SeyahatAraligiMax)), !1
            }
        }
        if (typeof $("#konut-type").val() != "undefined" && $("#txtBinaOrDekor").val() == "" && $("#txtesyabedeli").val() == "") return $(".parsley-binaveesya-bedeli-valid").html(""), $("#screenKonut").find(".parsley-binaveesya-bedeli-valid").append('<li class="parsley-required">' + BinaveEsyaUyarisi + "<\/li>"), $("#screenKonut").find(".parsley-binaveesya-bedeli-valid").show(), !1;
        var b = $("#txtTescilKod").val(),
            k = $("#txtTescilNo").val(),
            d = $("#txtAsbisNo").val();
        b != "" && b != undefined && k != "" && k != undefined || d != "" && d != undefined ? t ? plakaSorgula() : $("#loading").hide() : t ? ($(".btn-submit").attr("disabled", !0), QuestionsValuePost()) : $("#loading").hide()
    })
}

function VersionRouterController(n) {
    switch (WebSiteVersion) {
        case WebSiteVersions.V1:
            GetProposalPriceSuccess(n);
            break;
        case WebSiteVersions.V2:
            GetProposalPriceSuccessV2(n);
            break;
        case WebSiteVersions.V3:
            GetProposalPriceSuccessV3(n);
            break;
        default:
            GetProposalPriceSuccess(n)
    }
}

function GetProposalPriceSuccessV2(n) {
    var l, i, b, a, s, u, h, v, y, c, p;
    if ($("#loading").hide(), l = "", $("#step1Text").hide(), App.unblock(".package-price"), App.unblock("body"), App.unblock(".travel-package"), $(".package-selector").hide(), n.length > 0) {
        for (i = 0; i < n.length; i++) switch (n[i].ResultType) {
            case 1:
                u = n[i].ResultValue.Data.Ic_ProdNo_PacketType.split("_");
                $("#TravelPackagePrice_" + u[2] + "_error .package-selector-group").html(n[i].ResultValue.Data.ErrorMessage);
                $("#TravelPackagePrice_" + u[2] + "_error").show();
                ProposalGeneralError(n[i].ResultValue.Data.Ic_ProdNo_PacketType, n[i].ResultValue.Data.ErrorMessage);
                n[i].ResultValue.Data.ErrorMessage.indexOf("ENTEGRASYON") > -1 && (l = n[i].ResultValue.Data.Ic_ProdNo_PacketType, EmarSysErrorMessage(l));
                break;
            case 4:
                SelectedProposalPacketPrice.PureProposals.push(n[i].ResultValue.Data);
                var f = n[i].ResultValue.Data.ICNo,
                    t = n[i].ResultValue.Data.Ic_ProdNo_PacketType,
                    e = parseInt(t.split("_")[2]),
                    w = parseInt(f.split("_")[1]),
                    o = n[i].ResultValue.Data.ClaimType,
                    r = parseFloat(n[i].ResultValue.Data.GrossPremium).toFixed(2).replace(",", ".");
                w == ICProdCodes.Travel && (r = parseFloat(n[i].ResultValue.Data.GrossPremiumWithCurType).toFixed(2).replace(",", "."));
                b = n[i].ResultValue.Data.ProductName;
                a = n[i].ResultValue.Data.PolicyNo;
                DiscountIsApply || OrjinalPriceLog.push({
                    IC_ProdNo_PackageType: t,
                    GrossPremium: r
                });
                s = parseFloat(r).toFixed(2).replace(".", ",");
                IsFirstRequest && FirstProposalResults.push({
                    Ic_ProdNo_PacketType: t,
                    IC_CODE: parseInt(t.split("_")[0]),
                    ICProdNo: parseInt(t.split("_")[1]),
                    PackageType: parseInt(t.split("_")[2]),
                    GrossPremiumText: s,
                    GrossPremium: r,
                    ICPolicyNo: a
                });
                u = n[i].ResultValue.Data.Ic_ProdNo_PacketType.split("_");
                switch (w) {
                    case ICProdCodes.Travel:
                        $("#TravelPackagePrice_" + u[2] + "_success").show();
                        h = ' <i class="icon-eur"><\/i>';
                        TravelCountries.ActiveTravelTab == Enums.TravelActiveTabs.Domestic && (h = ' <i class="icon-icon-try"><\/i>');
                        IsFirstRequest ? ($('[data-package-type="' + e + '"]').attr("data-price", s), $("#TravelPackagePrice_" + e).html(s + h)) : (v = _.find(FirstProposalResults, function(n) {
                            return n.Ic_ProdNo_PacketType == t
                        }), $('[data-package-type="' + e + '"]').attr("data-price", v.GrossPremiumText), $("#TravelPackagePrice_" + e).html(v.GrossPremiumText + h))
                }
                $("#txtIndirimKodu").prop("disabled", !1);
                $("#selectPesinHas").prop("disabled", !1);
                y = $(".actions").find("a").data("icno");
                typeof y != "undefined" && y == f && $("#step2Text").show();
                $(".hdn_" + t).show();
                $("#" + t).show();
                $("#" + t + "_fiyat").show();
                $("#" + t + "_loading_icon").hide();
                $("#fiyat_btnSeeProposal_" + t).show();
                $("#btnSeeProposal_" + t).show();
                t == "110_101_1" ? (isProdMotor == "True" ? $("#" + t + "_desc").html(langData.jsMost + ' <a href="#" data-modal-target="#modal-ek-teminatlar-motor">' + langData.jsSupplementaryCov + "<\/a> " + langData.jsExpandedTrafficPolReady) : $("#" + t + "_desc").html(langData.jsMost + ' <a href="#" data-modal-target="#modal-ek-teminatlar">' + langData.jsSupplementaryCov + "<\/a> " + langData.jsExpandedTrafficPolReady), App.modal.init()) : t == "110_101_5" ? $("#" + t + "_desc").html(langData.jsExpandedTrafficPolReadyBuyItNow) : t != "110_202_1" && $("#" + t + "_desc").html(b + " " + langData.jsPolIsReadyBuyItNow);
                $("#PolicyNo_" + t).val(a);
                t == "110_100_1" && o == HAYIR || t == "110_103_1" && o == HAYIR ? (oldPrice = r, $("#" + t).html(r + "<span id='" + t + "_fiyat' class='try'>&#x20BA;<\/span><br>")) : f == "110_100" && DiscountIsApply || f == "110_101" && DiscountIsApply ? (c = OrjinalPriceLog.filter(function(n) {
                    return n.IC_ProdNo_PackageType == t
                }), r != c[0].GrossPremium && c.length == 1 ? ($("#step2Text").show(), $("#" + t).html(r + "<span id='" + t + "_fiyat' class='try'>&#x20BA;<\/span><br> <span id='" + t + "_indirimli_fiyat' class='old-price'>" + c[0].GrossPremium + "<span class='try'>&#x20BA;<\/span>")) : errorModal(globalErrorTag, "", langData.jsNoActiveDisc)) : t == "110_100_1" && o == EVET || t == "110_103_1" && o == EVET ? r != oldPrice ? ($("#step2Text").show(), $("#" + t).html(r + "<span id='" + t + "_fiyat' class='try'>&#x20BA;<\/span><br> <span id='" + t + "_indirimli_fiyat' class='old-price'>" + oldPrice + "<span class='try'>&#x20BA;<\/span>")) : errorModal(globalErrorTag, "", langData.jsNoActiveDisc) : $("#" + t).html(r + "<span id='" + t + "_fiyat' class='try'>&#x20BA;<\/span><br>")
        }
        SetSelectedProposalStepInputDOMObject();
        WebSiteVersion == WebSiteVersions.V2 && parseInt(getParameterByName("prodNo")) == BMVProdCodes.Travel && (SFSHelperController.SetTravelTariffs(), p = _.where(n, {
            ResultType: ResultTypes.Data
        }), p != null && TravelCountries.ActiveTravelTab == Enums.TravelActiveTabs.Abroad && p.length >= 1 && ($(".proposal-guarantee").removeClass("displayNoneImport"), $('[data-proposal-guarantee="iflas"]').show(), SFSHelperController.TravelQuestionAnswer.TotalDays <= 15 && $('[data-proposal-guarantee="covid"]').show()))
    }
}

function GetProposalPriceSuccess(n) {
    var e, o, h, f, i;
    if ($("#loading").hide(), e = "", $("#step1Text").hide(), document.querySelector('[name="percentage-rate"]') != null && (o = $('[name="percentage-rate"]').val(), typeof o != "undefined" && o != "" && $('[name="DiscountForAutoIns"]').prop("disabled", !1)), n.length > 0)
        for (i = 0; i < n.length; i++) switch (n[i].ResultType) {
            case 1:
                ProposalGeneralError(n[i].ResultValue.Data.Ic_ProdNo_PacketType, n[i].ResultValue.Data.ErrorMessage);
                n[i].ResultValue.Data.ErrorMessage.indexOf("ENTEGRASYON") > -1 && (e = n[i].ResultValue.Data.Ic_ProdNo_PacketType, EmarSysErrorMessage(e));
                break;
            case 2:
                $("#loading").hide();
                $("#proposalStep1").find("form").remove();
                $("#proposalStep1").show();
                $("#proposalStep2").hide();
                $("#proposalStep1").css("display", "block").find(".renderhtml").html(n[i].ResultValue);
                App.customSelect.init();
                App.radioSelect.init();
                App.form.init();
                dynamicQuestion();
                $("#screen-yenileme").length != 0 && $("#step1Text > p").html(langData.jsEnterLicanceSerialNo);
                break;
            case 3:
                break;
            case 4:
                var s = n[i].ResultValue.Data.ICNo,
                    t = n[i].ResultValue.Data.Ic_ProdNo_PacketType,
                    u = n[i].ResultValue.Data.ClaimType,
                    r = parseFloat(n[i].ResultValue.Data.GrossPremium).toFixed(2).replace(",", "."),
                    p = n[i].ResultValue.Data.ProductName,
                    c = n[i].ResultValue.Data.PolicyNo;
                DiscountIsApply || OrjinalPriceLog.push({
                    IC_ProdNo_PackageType: t,
                    GrossPremium: r
                });
                $("#txtIndirimKodu").prop("disabled", !1);
                $("#selectPesinHas").prop("disabled", !1);
                $('[name="DiscountForAutoIns"]').prop("disabled", !1);
                CommonHelper.AutoInsuranceCoveragesModalOper(t);
                h = $(".actions").find("a").data("icno");
                typeof h != "undefined" && h == s && $("#step2Text").show();
                $(".hdn_" + t).show();
                $("#" + t).show();
                $("#" + t + "_fiyat").show();
                $("#" + t + "_loading_icon").hide();
                $("#fiyat_btnSeeProposal_" + t).show();
                $("#btnSeeProposal_" + t).show();
                t == "110_101_1" ? (isProdMotor == "True" ? $("#" + t + "_desc").html(langData.jsMost + ' <a href="#" data-modal-target="#modal-ek-teminatlar-motor">' + langData.jsSupplementaryCov + "<\/a> " + langData.jsExpandedTrafficPolReady) : $("#" + t + "_desc").html(langData.jsMost + ' <a href="#" data-modal-target="#modal-ek-teminatlar">' + langData.jsSupplementaryCov + "<\/a> " + langData.jsExpandedTrafficPolReady), App.modal.init()) : t == "110_101_5" ? $("#" + t + "_desc").html(langData.jsExpandedTrafficPolReadyBuyItNow) : t != "110_202_1" && $("#" + t + "_desc").html(langData.jsPolIsReadyBuyItNow);
                $("#PolicyNo_" + t).val(c);
                t == "110_100_1" && u == HAYIR || t == "110_103_1" && u == HAYIR ? (oldPrice = r, $("#" + t).html(r + "<span id='" + t + "_fiyat' class='try'>&#x20BA;<\/span><br>")) : s == "110_100" && DiscountIsApply || s == "110_101" && DiscountIsApply ? (f = OrjinalPriceLog.filter(function(n) {
                    return n.IC_ProdNo_PackageType == t
                }), r != f[0].GrossPremium && f.length == 1 ? ($("#step2Text").show(), $("#" + t).html(r + "<span id='" + t + "_fiyat' class='try'>&#x20BA;<\/span><br> <span id='" + t + "_indirimli_fiyat' class='old-price'>" + f[0].GrossPremium + "<span class='try'>&#x20BA;<\/span>")) : errorModal(globalErrorTag, "", langData.jsNoActiveDisc)) : t == "110_100_1" && u == EVET || t == "110_103_1" && u == EVET ? r != oldPrice ? ($("#step2Text").show(), $("#" + t).html(r + "<span id='" + t + "_fiyat' class='try'>&#x20BA;<\/span><br> <span id='" + t + "_indirimli_fiyat' class='old-price'>" + oldPrice + "<span class='try'>&#x20BA;<\/span>")) : errorModal(globalErrorTag, "", langData.jsNoActiveDisc) : $("#" + t).html(r + "<span id='" + t + "_fiyat' class='try'>&#x20BA;<\/span><br>");
                break;
            case 6:
                typeof n.ResultValue.Data.UserLoginControl != "undefined" && n.ResultValue.Data.UserLoginControl ? App.modal.show("#modal-auth", !0) : typeof n.ResultValue.Data.AgencyLoginControl != "undefined" && n.ResultValue.Data.AgencyLoginControl && App.modal.show("#modal-agency", !0);
                break;
            default:
                $("#loading").hide()
        } else {
        for (errMessage = TeklifGenelHataMesaji, i = 0; i < productArr.length; i++) {
            var l = productArr[i].split("_")[0],
                a = productArr[i].split("_")[1],
                v = productArr[i].split("_")[2],
                y = l + "_" + a + "_" + v;
            ProposalGeneralError(y, errMessage)
        }
        ScarabQueue.push(["tag", "zorunlu trafik sigortası | teklif: boş| satın al"]);
        ScarabQueue.push(["go"])
    }
}

function GetProposalPriceError(n) {
    var i, t;
    for ($("#txtIndirimKodu").prop("disabled", !1), console.log("GetProposalPriceError = " + n), $("#loading").hide(), errorModal(globalErrorTag, "", langData.jsErrOcc), i = "", i = n.statusText == "timeout" ? TimeoutHataMesaji : TeklifGenelHataMesaji, t = 0; t < productArr.length; t++) {
        var r = productArr[t].split("_")[0],
            u = productArr[t].split("_")[1],
            f = productArr[t].split("_")[2],
            e = r + "_" + u + "_" + f;
        ProposalGeneralError(e, i)
    }
}

function ProposalGeneralError(n, t) {
    $("#loading").hide();
    $("#" + n + "_proposal-item").addClass("no-offer");
    $("#" + n + "_loading_icon").removeClass("quick-loader");
    $("#" + n + "_error_icon").show();
    $("#" + n + "_loading_icon").hide();
    $("#" + n + "_fiyat").hide();
    $("#" + n + "_desc").html(t)
}

function PageLoadChange() {
    var n = $($("#selectVehicleYears")[0]).data("qid");
    switch (n) {
        case 112:
            $("#selectBrand option:selected").text() != Seciniz ? $(".model").text($("#selectBrand option:selected").text()) : $(".model").text("");
            break;
        case 114:
            $("#selectBrand option:selected").text() != Seciniz && $("#selectBrandCode option:selected").text() != Seciniz ? ($(".model").text($("#selectBrand option:selected").text() + " " + $("#selectBrandCode option:selected").text()), $("#selectVehicleYears option:selected").text() != "" ? $(".model-detail").text($("#selectVehicleYears option:selected").text()) : $(".model-detail").text($("#txtModelYears").val())) : $(".model").text("")
    }
    $('[data-masterid="' + n + '"]').each(function(t, i) {
        var u, f, r, e;
        $(i).data("functionname") != undefined && $(i).data("functionname") != "" && (u = [], f = $(i).data("functionparamlist"), typeof f != typeof undefined && f !== !1 ? $(f).each(function(n, t) {
            var r = $('[data-qid="' + t + '"] option:selected').text(),
                i = $('[data-qid="' + t + '"]').val();
            i != null && (typeof i == "string" || i instanceof String) && (i = i.trim());
            u.push({
                Id: t,
                Value: i,
                ValueText: r
            })
        }) : (r = $('[data-qid="' + i + '"]').val(), r != null && (typeof r == "string" || r instanceof String) && (r = r.trim()), u.push({
            Id: n,
            Value: r
        })), e = $('[data-fieldset_qid="' + n + '"]'), AjaxPost("/Proposal/" + $(i).data("functionname"), {
            qList: u,
            QId: n,
            dQId: $(i).data("qid")
        }, ddlChangeSucess, ddlChangeError))
    });
    $('[data-masterid1="' + n + '"]').each(function(t, i) {
        var u, f, r, e;
        $(i).data("functionname") != undefined && $(i).data("functionname") != "" && (u = [], f = $(i).data("functionparamlist"), typeof f != typeof undefined && f !== !1 ? $(f).each(function(n, t) {
            var r = $('[data-qid="' + t + '"] option:selected').text(),
                i = $('[data-qid="' + t + '"]').val();
            i != null && (typeof i == "string" || i instanceof String) && (i = i.trim());
            u.push({
                Id: t,
                Value: i,
                ValueText: r
            })
        }) : (r = $('[data-qid="' + i + '"]').val(), r != null && (typeof r == "string" || r instanceof String) && (r = r.trim()), u.push({
            Id: n,
            Value: r
        })), e = $('[data-fieldset_qid="' + n + '"]'), AjaxPost("/Proposal/" + $(i).data("functionname"), {
            qList: u,
            QId: n,
            dQId: $(i).data("qid")
        }, ddlChangeSucess, ddlChangeError))
    })
}

function ddlChange(n) {
    var t = $(n.target).data("qid");
    switch (t) {
        case 112:
            $("#selectBrand option:selected").text() != Seciniz ? $(".model").text($("#selectBrand option:selected").text()) : $(".model").text("");
            break;
        case 114:
            $("#selectBrand option:selected").text() != Seciniz && $("#selectBrandCode option:selected").text() != Seciniz ? ($(".model").text($("#selectBrand option:selected").text() + " " + $("#selectBrandCode option:selected").text()), $("#selectVehicleYears option:selected").text() != "" ? $(".model-detail").text($("#selectVehicleYears option:selected").text()) : $(".model-detail").text($("#txtModelYears").val())) : $(".model").text("")
    }
    $('[data-masterid="' + t + '"]').each(function(n, i) {
        var u, f, r, e;
        $(i).data("functionname") != undefined && $(i).data("functionname") != "" && (u = [], f = $(i).data("functionparamlist"), typeof f != typeof undefined && f !== !1 ? $(f).each(function(n, t) {
            var r = $('[data-qid="' + t + '"] option:selected').text(),
                i = $('[data-qid="' + t + '"]').val();
            i != null && (typeof i == "string" || i instanceof String) && (i = i.trim());
            u.push({
                Id: t,
                Value: i,
                ValueText: r
            })
        }) : (r = $('[data-qid="' + i + '"]').val(), r != null && (typeof r == "string" || r instanceof String) && (r = r.trim()), u.push({
            Id: t,
            Value: r
        })), e = $('[data-fieldset_qid="' + t + '"]'), AjaxPost("/Proposal/" + $(i).data("functionname"), {
            qList: u,
            QId: t,
            dQId: $(i).data("qid")
        }, ddlChangeSucess, ddlChangeError))
    });
    $('[data-masterid1="' + t + '"]').each(function(n, i) {
        var u, f, r, e;
        $(i).data("functionname") != undefined && $(i).data("functionname") != "" && (u = [], f = $(i).data("functionparamlist"), typeof f != typeof undefined && f !== !1 ? $(f).each(function(n, t) {
            var r = $('[data-qid="' + t + '"] option:selected').text(),
                i = $('[data-qid="' + t + '"]').val();
            i != null && (typeof i == "string" || i instanceof String) && (i = i.trim());
            u.push({
                Id: t,
                Value: i,
                ValueText: r
            })
        }) : (r = $('[data-qid="' + i + '"]').val(), r != null && (typeof r == "string" || r instanceof String) && (r = r.trim()), u.push({
            Id: t,
            Value: r
        })), e = $('[data-fieldset_qid="' + t + '"]'), AjaxPost("/Proposal/" + $(i).data("functionname"), {
            qList: u,
            QId: t,
            dQId: $(i).data("qid")
        }, ddlChangeSucess, ddlChangeError))
    })
}

function ddlChangeSucess(n) {
    $("#loading").hide();
    switch (n.ResultType) {
        case 1:
            errorModal(langData.jsErrOcc, langData.jsAttention, n.ResultValue);
            break;
        case 3:
            location.href = n.ResultValue;
            break;
        case 4:
            var t = n.ResultValue.DQId;
            switch (n.ResultValue.Type) {
                case "List":
                    $('[data-qid="' + t + '"]').each(function(t, i) {
                        $(i).find("option").remove();
                        $("#selectBrandCode").find("option").remove();
                        FillSelectOne(i, n.ResultValue.List)
                    })
            }
    }
}

function ddlChangeError() {
    $("#loading").hide();
    errorModal(globalErrorTag, SistemUyarisiBasligi, GenelSistemUyarisi)
}

function FillSelectOne(n, t) {
    $("#" + $(n).attr("id") + " option").length > 0 && $("#" + $(n).attr("id") + " option").remove();
    $.each(t, function(i, r) {
        t.length == 2 ? r.Text != Seciniz ? $(n).append("<option " + (r.Selected ? 'selected="selected"' : "selected") + " value='" + r.Value + "'>" + r.Text + "<\/option>") : $(n).append("<option value='" + r.Value + "'>" + r.Text + "<\/option>") : $(n).append("<option value='" + r.Value + "'>" + r.Text + "<\/option>")
    })
}

function FillSelect11(n, t) {
    parseInt($(n).val()) > 0 || ($("#" + $(n).attr("id") + " option").length > 0 && $("#" + $(n).attr("id") + " option").remove(), $.each(t, function(i, r) {
        t.length == 2 ? r.Text != language.Select ? $(n).append("<option " + (r.Selected ? 'selected="selected"' : "selected") + " value='" + r.Value + "'>" + r.Text + "<\/option>") : $(n).append("<option value='" + r.Value + "'>" + r.Text + "<\/option>") : $(n).append("<option value='" + r.Value + "'>" + r.Text + "<\/option>")
    }))
}

function QuestionsValuePost() {
    var t;
    try {
        var n = [],
            i = typeof $("#phone").val() != "undefined" && $("#phone").val() != "" ? $("#phone").val() : $("input[name=phone]").val(),
            r = typeof $("#email").val() != "undefined" && $("#email").val() != "" ? $("#email").val() : $("input[name=email]").val();
        $("#loading").show();
        t = "#proposalStep1";
        $(t + ' [data-dynamic="true"]').each(function(t, i) {
            var r, u, f;
            i.type == "checkbox" ? elmValue = $(i)[0].checked == !0 ? "E" : "H" : i.type == "select-multiple" ? (r = "", $("#" + i.id + " option:selected").each(function() {
                var n = $(this);
                n.length && (r += n.val() + "¨")
            }), r != "" && (elmValue = r.substring(0, r.length - 1))) : elmValue = WebSiteVersion == WebSiteVersions.V2 && i.type == "radio" ? $('input[name="' + i.name + '"]:checked').val().toUpperCase() : $(i).val().toUpperCase();
            typeof $("#konut-type").val() != "undefined" && $("#konut-type").val() != "" ? n[n.length] = $("#konut-type").val() == "1" && i.id == "txtBinaOrDekor" ? {
                Id: "20501",
                Value: elmValue,
                Name: $(i).data("qname"),
                ValueText: $("#" + i.id + " option:selected").text().toUpperCase()
            } : i.id == "txtBinaOrDekor" ? {
                Id: "20503",
                Value: elmValue,
                Name: $(i).data("qname"),
                ValueText: $("#" + i.id + " option:selected").text().toUpperCase()
            } : {
                Id: $(i).data("qid"),
                Value: elmValue,
                Name: $(i).data("qname"),
                ValueText: $("#" + i.id + " option:selected").text().toUpperCase()
            } : (u = $("#" + i.id + " option:selected").text().toUpperCase(), f = $(i).data("qid"), i.type == "radio" && (u = $("input[name=" + i.name + "]:checked").data("keytext").toUpperCase(), f = $("input[name=" + i.name + "]:checked").data("qid")), n[n.length] = {
                Id: f,
                Value: elmValue,
                Name: $(i).data("qname"),
                ValueText: u
            })
        });
        ($("#txtTescilKod").val() != undefined || $("#txtTescilNo").val() != undefined) && n.push({
            Id: 102,
            Value: $("#txtTescilKod").val().toUpperCase() + "" + $("#txtTescilNo").val().toUpperCase(),
            Name: ""
        });
        SFSHelperController.QuestionAnswers = n;
        AjaxPost("/Proposal/GetProposalsScreenDynamic", {
            values: n,
            cookiesModel: cookiesModel,
            PhoneNum: i,
            MailAdd: r
        }, Next.ProposalsScreenSuccess, Next.Fail)
    } catch (u) {
        console.log("-------|-------");
        console.log(u);
        console.log("-------|-------");
        $(".btn-submit").attr("disabled", !1);
        $("#loading").hide()
    }
}

function getInsertUrl() {
    var t = window.location.href.toString(),
        n = "";
    return t.indexOf("&prodName=motosiklet") != -1 && (n = "&prodName=motosiklet"), n
}

function createSubProdQueryUrl() {
    return ""
}

function PesinHasarsizlik() {
    $("#selectPesinHas").change(function() {
        var n = $("#selectPesinHas").val();
        propArr = [];
        $("#loading").show();
        propArr.push("110_100_" + GenisPaket + "_" + n);
        GetProposalPriceB2C(propArr)
    })
}

function TeklifSatinAl(n, t, i, r, u, f, e, o) {
    var s, l, h, c;
    $("#loading").show();
    bmvprodcodeOnlineTras = r;
    s = "";
    l = "";
    s = u != null ? u : $("#PolicyNo_" + n + "_" + t).val();
    EmarSysTeklifSatinAl(n);
    h = window.location.href.indexOf("getproposal") >= 0;
    c = {
        ICNoAndProdNo: n,
        paymentOption: 0,
        paymentBankName: "",
        paymentOptionText: "",
        policyNo: s,
        packetType: t,
        bmvProductCode: r,
        claimStep: e,
        caprazSatisPayment: Boolean(f),
        CustomerType: o,
        IsLoginPannel: h
    };
    $(".btn-fill").attr("disabled", !0);
    $("#hdnClaimType").val($("#selectPesinHas option:selected").text());
    AjaxPost("/Proposal/GetProposalApproveDynamicScreen", {
        proposalApproveModel: c,
        cookiesModel: cookiesModel
    }, GetProposalApproveScreenSuccess, GetProposalApproveScreenError)
}

function GetProposalApproveScreenSuccess(n) {
    var t, i, r;
    $("#loading").hide();
    $(".btn-fill").attr("disabled", !1);
    switch (n.ResultType) {
        case 1:
            typeof n.ResultValue.Data != "undefined" && n.ResultValue.Data.TimeoutMessage ? typeof cookiesModel.cookieAgency != "undefined" ? ModalSessionTimeout(globalErrorTag, SistemUyarisiBasligi, n.ResultValue.Data.ErrorMessage) : typeof cookiesModel.cookieUser != "undefined" ? ModalSessionTimeout(globalErrorTag, SistemUyarisiBasligi, n.ResultValue.Data.ErrorMessage) : ModalSessionTimeout(globalErrorTag, SistemUyarisiBasligi, n.ResultValue.Data.ErrorMessage) : errorModal(globalErrorTag, SistemUyarisiBasligi, n.ResultValue);
            break;
        case 2:
            if ($("#step2").removeClass("active"), $("#step2").addClass("visited"), $("#step3").removeClass("passive"), $("#step3").addClass("active"), $("#step2ActiveArrow").show(), $("#step2PassiveArrow").hide(), $("#proposalStep1").hide(), $("#proposalStep2").hide(), $("#paymentSuccess").hide(), $("#onlineTransactionGetProposalScreen").hide(), $(".landing-proposal").hide(), $("#proposalStep3").css("display", "block").find(".renderhtml").html(n.ResultValue), t = window.location.href.split("=")[1], typeof t == "undefined" ? window.history.pushState("", "", "/Proposal/Index?prodNo=" + bmvprodcodeOnlineTras + "&step=satin-al") : (i = createSubProdQueryUrl(), window.history.pushState("", "", "/Proposal/Index?prodNo=" + t + "=satin-al" + i)), WebSiteVersion == WebSiteVersions.V2) {
                switch (bmvprodcodeOnlineTras) {
                    case BMVProdCodes.Travel:
                        TravelOpenStepFour(n)
                }
                r = $("#proposalStep3").find(".renderhtml");
                App.plugins.reload(r);
                PrefixInstallmentList()
            } else App.customSelect.init(), App.radioSelect.init(), App.form.init(), PrefixInstallmentList(), $("#policy-address-mapper").data("insuredtype") == "VKN" && (TuzelKargoAdresiKopyala(), $("#txtCommunicationAddress").change(function() {
                $("#policy-address-mapper").removeAttr("disabled")
            })), $("#txtSetClaimType").val($("#hdnClaimType").val()), $("#step3Discountcode").val($("#txtIndirimKodu").val()), $("#selectPaketGrossPrem").text($("#hdnPolicyGrossPrem").val()), $("#loading").hide(), UserInfoPartialViewReflesh(), $("#proposalDiv").show(), $("#paymentSuccess").html("");
            break;
        case 6:
            typeof n.ResultValue.Data.UserLoginControl != "undefined" && n.ResultValue.Data.UserLoginControl ? App.modal.show("#modal-auth", !0) : typeof n.ResultValue.Data.AgencyLoginControl != "undefined" && n.ResultValue.Data.AgencyLoginControl && App.modal.show("#modal-agency", !0)
    }
}

function TuzelKargoAdresiKopyala() {
    $("#policy-address-mapper").change(function() {
        var t = $("#policy-address-mapper")[0].checked,
            n;
        t && ($("#selectIlKodu").val() != "" && $("#dropDistrict").val() != "0" ? (n = $("#txtCommunicationAddress").val() + " " + $("#dropDistrict option:selected").text() + "/" + $("#selectIlKodu option:selected").text().substr(5), $("#contact-address").val(n)) : (n = $("#txtCommunicationAddress").val(), $("#contact-address").val(n)))
    })
}

function GetProposalApproveScreenError() {
    $("#loading").hide();
    $(".btn-fill").attr("disabled", !1);
    window.location.href = "../../Home/Index"
}

function err() {
    alert("Error")
}

function timeo() {
    alert("Time off")
}

function loadd() {
    alert("Response: " + xdr.responseText)
}

function stopdata() {
    xdr.abort()
}

function GetProposalPriceB2C(n, t) {
    var i, r, u, f;
    for ($("#txtIndirimKodu").prop("disabled", !0), $("#selectPesinHas").prop("disabled", !0), i = 0; i < n.length; i++) productArr.push(n[i]);
    $("#proposalPriceDiv").length != 0 && $("#step1Text").hide();
    r = !0;
    typeof t != "undefined" && (r = t);
    u = "GetProposalPriceDynamic";
    f = JSON.stringify({
        icProdCodeList: n,
        cookiesModel: cookiesModel
    });
    $.ajax({
        type: "POST",
        url: "/Proposal/" + u + "?rnd=" + Math.floor(Math.random() * 9999999999),
        async: !0,
        cache: !1,
        data: f,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: VersionRouterController,
        error: GetProposalPriceError,
        timeout: 2e5,
        statusCode: {
            500: function() {
                var t;
                for (console.log("GetProposalPriceDynamic =  500 hatası"), $("#loading").hide(), t = 0; t < n.length; t++) {
                    var i = n[t].split("_")[0],
                        r = n[t].split("_")[1],
                        u = n[t].split("_")[2],
                        f = i + "_" + r + "_" + u,
                        e = TeklifGenelHataMesaji;
                    ProposalGeneralError(f, e)
                }
            },
            302: function() {
                console.log("GetProposalPriceDynamic =  302 hatası");
                $("#loading").hide()
            }
        }
    })
}

function GetPolicyApprovedScreenSuccess(n) {
    if ($("#loading").hide(), EventFlags.PolicyApproveEvent = !1, n.ResultType != null || n.ResultType != "undefined") {
        switch (n.ResultType) {
            case 1:
                $("#loading").hide();
                errorModal(globalErrorTag, SistemUyarisiBasligi, n.ResultValue);
                App.modal.show("#modal-errors");
                break;
            case 2:
                $("#loading").hide();
                $("#proposalStep3").hide();
                $(".inspect").hide();
                $(".proposal-left-bar").hide();
                $(".proposal-steps").hide();
                $("#proposalDiv").hide();
                WebSiteVersion == WebSiteVersions.V2 ? ($("#paymentSuccess").hide(), $(".proposal-aside-success").html(n.ResultValue), $(".proposal-aside").trigger("sticky:detach"), $("html, body").stop(!0, !1).animate({
                    scrollTop: 0
                }, 1e3, function() {
                    $(".proposal-container").addClass("success");
                    $(".proposal-aside-success").fadeIn(400)
                })) : ($("#paymentSuccess").html(n.ResultValue), $("#paymentSuccess").show());
                $("#hdnOnlineIslemlertext").hide();
                window.scrollTo(0, 0);
                var t = createSubProdQueryUrl(),
                    i = window.location.href.split("=")[1];
                window.history.pushState("", "", "/Proposal/Index?prodNo=" + i + "=police-bilgileri" + t);
                break;
            case 3:
                location.href = n.ResultValue;
                break;
            case 6:
                typeof n.ResultValue.Data.UserLoginControl != "undefined" && n.ResultValue.Data.UserLoginControl ? App.modal.show("#modal-auth", !0) : typeof n.ResultValue.Data.AgencyLoginControl != "undefined" && n.ResultValue.Data.AgencyLoginControl && App.modal.show("#modal-agency", !0)
        }
        return !1
    }
}

function GetPolicyApprovedScreenError(n, t, i) {
    var r = "";
    return r = i.statusText == "timeout" ? TimeoutHataMesaji : PoliceGenelHataMesaji, r != "" ? errorModal(globalErrorTag, SistemHatasiBasligi, r + JSON.stringify(i.statusText)) : errorModal(globalErrorTag, SistemHatasiBasligi, langData.jsUnknownErrDurProcess), $("#loading").hide(), !1
}

function plakaSorgula() {
    $("#loading").show();
    var i = $("#hdnPlate").val(),
        t = "",
        n = "";
    $("#hdnSelectProduct").val() == "Trafik" ? n = 1 : $("#hdnSelectProduct").val() == "Kasko" ? n = 2 : $("#hdnSelectProduct").val() == "Kasko_V2" ? n = 12 : $("#hdnSelectProduct").val() == "KaskoMoto" && (n = 13);
    $("#txtTescilNo").val() != "" ? t = $("#txtTescilKod").val() + "-" + $("#txtTescilNo").val() : $("#txtAsbisNo").val() != "" && (t = $("#txtAsbisNo").val());
    AjaxPost("/Proposal/GetSearchResult", {
        plaka: i,
        tescilNo: t,
        bmvProductCode: n
    }, Next.ProposalsScreenSuccess, Next.Fail)
}

function btnApproveB2C_Click() {
    var n = null,
        ht = !1,
        b = $("#bank-name").val() + $("#bank-office").val(),
        k = $("#credit").val(),
        y = $("#btnApprove").data("icno"),
        l = $("#btnApprove").data("prodno"),
        vt, yt, pt, h, t, e, a, v, c, i, wt, bt, kt, o;
    EmarSysApprove(l);
    var p = $("#btnApprove").data("packettype"),
        d = $("#btnApprove").data("claimtype"),
        g = $("#btnApprove").data("bmvproductcode"),
        f = $("#btnApprove").data("policyno"),
        nt = $("#btnApprove").data("policyno"),
        tt = StringToBooleanCast($("#btnApprove").data("caprazsatis")),
        u = "",
        it = $("#policy-address-mapper").is(":checked"),
        rt = $("#marketing-approval").is(":checked"),
        ut = $("#contact-address").val(),
        dt = $("#selectIlKodu option:selected").text().substr(5),
        ct = $("#dropDistrict option:selected").text(),
        lt = $("#txtCommunicationAddress").val(),
        s = ReplaceTurkishChars($("#email-step3").val());
    s == "default@quick.com.tr" && (s = "", $("#email-step3").val(""));
    var gt = $("#phoneNum").val().replace("(", "").replace(")", ""),
        w = gt.split(" ").join(""),
        r = "",
        at = SFSHelperController.MobilePhoneControlInClientSide(w);
    if (at.ErrOccurred) return $(".form-hero").find(".hero-errors-phone").html(""), $(".form-hero").find(".hero-errors-phone").append('<li class="parsley-required">' + at.Message + "<\/li>"), $(".form-hero").find(".hero-errors-phone").show(), $("#phoneNum").focus(), FocusElement("#phoneNum"), !1;
    if (s == "") return $(".form-hero").find("#parsley-step4-email-valid").html(""), $(".form-hero").find("#parsley-step4-email-valid").append('<li class="parsley-required">' + langData.jsCanNotLeftBlank + "<\/li>"), $(".form-hero").find("#parsley-step4-email-valid").show(), $("#email-step3").focus(), FocusElement("#email"), !1;
    typeof $("#selectIlKodu").val() != "undefined" && $("#selectIlKodu").val() != "" && ct != Seciniz && lt != "" && (ht = !0);
    tuzelAddress = {
        Province: dt,
        District: ct,
        AdressDetail: lt,
        TuzelAddressUpdateControl: ht
    };
    var ft = $("#radio-bankdeposit:checked").val(),
        et = $("#radio-creditcard:checked").val(),
        ot = $("#radio-compay:checked").val(),
        st = $("#radio-ThreeDPaymentExists:checked").val();
    if (typeof ft == "undefined" && typeof et == "undefined" && typeof ot == "undefined" && typeof st == "undefined") return errorModal(globalErrorTag, langData.ErrorDetailView, langData.jsSelectPaymentType), !1;
    if (typeof et != "undefined" && et == "0" && (r = 1, vt = WebSiteVersion == WebSiteVersions.V2 ? $('[name="taksit"]:checked') : $("#ddlApproveInstallment option:selected"), yt = vt.attr("data-Is3d") == "1" ? !0 : !1, yt && (r = 2)), typeof ft != "undefined" && ft == "1" && (r = 0), typeof ot != "undefined" && ot == "2" && (r = 3), typeof st != "undefined" && st == "3" && (r = 2), r == 1) {
        if (valid_credit_card($("#creditcard-proposal").val())) return ($(".card-master-card").css("display") == "block" ? u = "master" : $(".card-visa").css("display") == "block" && (u = "visa"), WebSiteVersion == WebSiteVersions.V2 ? (i = $('input[name="kartTarih"]').val().replace(/-/g, "").replace(" ", "").replace("_", "").replace("_", "").replace(/\s/g, "").split("/"), a = $("#creditcard-proposal").val().replace(/-/g, "").replace(" ", "").replace(/\s/g, ""), u = GetCardType(a), n = {
            CCType: u,
            CCName: $("#txtNameSurname").val(),
            CCNumber: a,
            CCMonth: i[0],
            CCYear: i[1].length == 2 ? i[1] = "20" + i[1] : i[1],
            CVV: $("#txtCVC").val()
        }) : n = {
            CCType: u,
            CCName: $("#txtNameSurname").val(),
            CCNumber: $("#creditcard-proposal").val().replace(/-/g, "").replace(" ", "").replace(/\s/g, ""),
            CCMonth: $("#ddlMonth").val(),
            CCYear: $("#ddlYear").val(),
            CVV: $("#txtCVC").val()
        }, v = new Date, n.CCName == "") ? (errorModal(globalErrorTag, langData.jsAttention, langData.jsCardHolderCanNotBeEmpty), !1) : n.CCNumber == "" || n.CCNumber.lenght < 15 ? (errorModal(globalErrorTag, langData.jsAttention, langData.jsNotNullCCNumber), !1) : n.CVV == "" ? (errorModal(globalErrorTag, langData.jsAttention, langData.jsNotNullSecurityCode), !1) : n.CCYear == "" || n.CCMonth == "" ? (errorModal(globalErrorTag, langData.jsAttention, langData.jsCardYearNotNull), !1) : n.CCYear == v.getFullYear() && n.CCMonth < v.getMonth() + 1 ? (errorModal(globalErrorTag, langData.jsAttention, langData.jsInvalidCardInfoCAllBank), !1) : $("#ddlApproveInstallment").has("option").length == 0 && WebSiteVersion != WebSiteVersions.V2 ? (errorModal("", langData.ErrorDetailView, langData.jsNotPayInstallmentCC), !1) : $('input[name="taksit"]:checked').length == 0 && WebSiteVersion == WebSiteVersions.V2 ? (errorModal("", langData.ErrorDetailView, langData.jsNotPayInstallmentCC), !1) : document.getElementById("distant-sale-contract").checked == !1 ? (errorModal(globalErrorTag, langData.jsAttention, langData.ApproveTheDistanceSales), !1) : ($("#loading").show(), pt = GetDDLApproveInstallmentDatas(), t = {
            paymentOption: "",
            paymentBankName: "",
            paymentOptionText: ""
        }, WebSiteVersion == WebSiteVersions.V2 ? (e = $('input[name="taksit"]:checked').val().split("|").length, t.paymentOption = pt.NumberOfInstalment, t.paymentBankName = e > 1 ? $('input[name="taksit"]:checked').val().split("|")[1] : "", t.paymentOptionText = $('input[name="taksit"]:checked').parent("label").find("b").text() + " = " + SelectedProposalPacketPrice.TotalPrice) : (e = $("#ddlApproveInstallment").val().split("|").length, t.paymentOption = $("#ddlApproveInstallment").val().split("|")[0], t.paymentBankName = e > 1 ? $("#ddlApproveInstallment").val().split("|")[1] : "", t.paymentOptionText = $("#ddlApproveInstallment option:selected").text()), o = {
            ICNo: y,
            ICprodNo: l,
            CInfo: n,
            paymentType: r,
            paymentOption: t.paymentOption,
            paymentBankName: t.paymentBankName,
            paymentOptionText: t.paymentOptionText,
            packetType: p,
            claimType: d,
            bmvProductCode: g,
            MortgagerUnitNo: b,
            MortgagerControl: k,
            PhoneNum: w,
            MailAdd: s,
            PolicyNo: f,
            IsCargoEnabled: it,
            CargoAddress: ut,
            CusTuzelAddress: tuzelAddress,
            IsMarketingEnabled: rt,
            CaprazSatisPayment: tt,
            CamePage: camePage,
            CurrentAgencyCode: MasterUserModel.CurrentAgencyCode,
            CurrentUsername: MasterUserModel.CurrentUsername,
            PolicySerialNo: nt
        }, AjaxPost("/Proposal/GetPolicyApprovedDynamicScreenB2C", {
            paymentModel: o,
            cookiesModel: cookiesModel
        }, GetPolicyApprovedScreenSuccess, GetPolicyApprovedScreenError), !1);
        errorModal("", langData.ErrorDetailView, langData.jsUseValidCC)
    } else {
        if (r == 0) return $("#ddlApproveInstallmentForCash").has("option").length == 0 ? (errorModal("", langData.ErrorDetailView, langData.jsNotFoundPaymentOptions), !1) : document.getElementById("distant-sale-contract").checked == !1 ? (errorModal(globalErrorTag, langData.jsAttention, langData.ApproveTheDistanceSales), !1) : ($("#loading").show(), o = {
            ICNo: y,
            ICprodNo: l,
            CInfo: n,
            paymentType: r,
            paymentOption: $("#ddlApproveInstallmentForCash").val(),
            paymentBankName: "",
            paymentOptionText: $("#ddlApproveInstallmentForCash option:selected").text(),
            packetType: p,
            claimType: d,
            bmvProductCode: g,
            MortgagerUnitNo: b,
            MortgagerControl: k,
            PhoneNum: w,
            MailAdd: s,
            PolicyNo: f,
            IsCargoEnabled: it,
            CargoAddress: ut,
            CusTuzelAddress: tuzelAddress,
            IsMarketingEnabled: rt,
            CaprazSatisPayment: tt,
            CamePage: camePage,
            CurrentAgencyCode: MasterUserModel.CurrentAgencyCode,
            CurrentUsername: MasterUserModel.CurrentUsername,
            PolicySerialNo: nt
        }, AjaxPost("/Proposal/GetPolicyApprovedDynamicScreenB2C", {
            paymentModel: o,
            cookiesModel: cookiesModel
        }, GetPolicyApprovedScreenSuccess, GetPolicyApprovedScreenError), !1);
        if (r == 2) {
            if (valid_credit_card($("#creditcard-proposal").val())) return (f = $("#PolicyNo_" + y + "_" + l + "_" + p).val(), (typeof f == "undefined" || f == null || f == "") && (f = $("#btnApprove").data("policyno")), h = GetDDLApproveInstallmentDatas(), t = {
                paymentOption: "",
                paymentBankName: "",
                paymentOptionText: ""
            }, WebSiteVersion == WebSiteVersions.V2 ? (e = $('input[name="taksit"]:checked').val().split("|").length, t.paymentOption = h.NumberOfInstalment, t.paymentBankName = e > 1 ? $('input[name="taksit"]:checked').val().split("|")[1] : "", t.paymentOptionText = $('input[name="taksit"]:checked').parent("label").find("b").text() + " = " + SelectedProposalPacketPrice.TotalPrice) : (e = $("#ddlApproveInstallment").val().split("|").length, t.paymentOption = $("#ddlApproveInstallment").val().split("|")[0], t.paymentBankName = e > 1 ? $("#ddlApproveInstallment").val().split("|")[1] : "", t.paymentOptionText = $("#ddlApproveInstallment option:selected").text()), $(".card-master-card").css("display") == "block" ? u = "master" : $(".card-visa").css("display") == "block" && (u = "visa"), WebSiteVersion == WebSiteVersions.V2 ? (i = $('input[name="kartTarih"]').val().replace(/-/g, "").replace(" ", "").replace("_", "").replace("_", "").replace(/\s/g, "").split("/"), a = $("#creditcard-proposal").val().replace(/-/g, "").replace(" ", "").replace(/\s/g, ""), u = GetCardType(a), n = {
                CCType: u,
                CCName: $("#txtNameSurname").val(),
                CCNumber: a,
                CCMonth: i[0],
                CCYear: i[1].length == 2 ? i[1] = "20" + i[1] : i[1],
                CVV: $("#txtCVC").val()
            }) : n = {
                CCType: u,
                CCName: $("#txtNameSurname").val(),
                CCNumber: $("#creditcard-proposal").val().replace(/-/g, "").replace(" ", "").replace(/\s/g, ""),
                CCMonth: $("#ddlMonth").val(),
                CCYear: $("#ddlYear").val(),
                CVV: $("#txtCVC").val()
            }, v = new Date, n.CCName == "") ? (errorModal(globalErrorTag, langData.jsAttention, langData.jsCardHolderCanNotBeEmpty), !1) : n.CCNumber == "" || n.CCNumber.lenght < 15 ? (errorModal(globalErrorTag, langData.jsAttention, langData.jsNotNullCCNumber), !1) : n.CVV == "" ? (errorModal(globalErrorTag, langData.jsAttention, langData.jsNotNullSecurityCode), !1) : n.CCYear == "" || n.CCMonth == "" ? (errorModal(globalErrorTag, langData.jsAttention, langData.jsCardYearNotNull), !1) : n.CCYear == v.getFullYear() && n.CCMonth < v.getMonth() + 1 ? (errorModal(globalErrorTag, langData.jsAttention, langData.jsInvalidCardInfoCAllBank), !1) : $("#ddlApproveInstallment").has("option").length == 0 && WebSiteVersion != WebSiteVersions.V2 ? (errorModal("", langData.ErrorDetailView, langData.jsNotPayInstallmentCC), !1) : $('input[name="taksit"]:checked').length == 0 && WebSiteVersion == WebSiteVersions.V2 ? (errorModal("", langData.ErrorDetailView, langData.jsNotPayInstallmentCC), !1) : document.getElementById("distant-sale-contract").checked == !1 ? (errorModal(globalErrorTag, langData.jsAttention, langData.ApproveTheDistanceSales), !1) : ($("#loading").show(), o = {
                ICNo: y,
                ICprodNo: l,
                CInfo: n,
                paymentType: r,
                paymentOption: t.paymentOption,
                paymentBankName: t.paymentBankName,
                paymentOptionText: t.paymentOptionText,
                packetType: p,
                claimType: d,
                bmvProductCode: g,
                MortgagerUnitNo: b,
                MortgagerControl: k,
                PhoneNum: w,
                MailAdd: s,
                PolicyNo: f,
                IsCargoEnabled: it,
                CargoAddress: ut,
                CusTuzelAddress: tuzelAddress,
                IsMarketingEnabled: rt,
                CaprazSatisPayment: tt,
                VPosID: h.VPosID,
                CCVPosID: h.VPosID,
                BankNo: h.BankNo,
                NumberOfInstalment: h.NumberOfInstalment,
                CardCode: h.CardCode,
                CamePage: camePage,
                CurrentAgencyCode: MasterUserModel.CurrentAgencyCode,
                CurrentUsername: MasterUserModel.CurrentUsername,
                PolicySerialNo: nt
            }, c = {
                Month: "",
                Year: ""
            }, WebSiteVersion == WebSiteVersions.V2 ? (i = $('input[name="kartTarih"]').val().replace(/-/g, "").replace(" ", "").replace("_", "").replace("_", "").replace(/\s/g, "").split("/"), c.Month = i[0], c.Year = i[1].length == 2 ? i[1] = "20" + i[1] : i[1]) : (c.Month = $("#ddlMonth").val(), c.Year = $("#ddlYear").val()), wt = {
                CardNumber: $("#creditcard-proposal").val().replace(/-/g, "").replace(" ", "").replace(/\s/g, ""),
                CardOwnerName: $("#txtNameSurname").val(),
                CardExpireYear: c.Year,
                CardExpireMonth: c.Month,
                CardCvv: $("#txtCVC").val(),
                CurrencyType: "TL",
                Method: "Post",
                Target: "sfsPostToNewWindow"
            }, threeDPayRequestCounter += 1, threeDPayRequestCounter >= 50) ? (threeDPayRequestCounter = 0, errorModal(globalErrorTag, SistemUyarisiBasligi, langData.jsFaultyIncreasedRedirect + " >>> "), bt = 7e3, setTimeout(function() {
                location.reload()
            }, bt), !1) : EventFlags.PolicyApproveThreeDEvent ? ($("#loading").hide(), !1) : PaymentHelper.PendingApproveResponse ? ($("#loading").hide(), !1) : (kt = SFSHelperController.GetBrowserInfo(), AjaxPost("/Proposal/PaymentBankInfo", {
                paymentModel: o,
                cookiesModel: cookiesModel,
                userAgenctInfoModel: kt,
                paymentBankPOS: wt
            }, ThreeDsuccess, GetPolicyApprovedScreenError), !1);
            errorModal("", langData.ErrorDetailView, langData.jsUseValidCC)
        } else if (r == 3) return $("#loading").show(), o = {
            ICNo: y,
            ICprodNo: l,
            CInfo: n,
            paymentType: r,
            paymentOption: "0",
            paymentBankName: "",
            paymentOptionText: "Peşin",
            packetType: p,
            claimType: d,
            bmvProductCode: g,
            MortgagerUnitNo: b,
            MortgagerControl: k,
            PhoneNum: w,
            MailAdd: s,
            PolicyNo: f,
            IsCargoEnabled: it,
            CargoAddress: ut,
            CusTuzelAddress: tuzelAddress,
            IsMarketingEnabled: rt,
            CaprazSatisPayment: tt,
            CamePage: camePage,
            PolicySerialNo: nt
        }, AjaxPost("/Payment/ProcessPayment", {
            paymentModel: o,
            cookiesModel: cookiesModel
        }, GetPolicyApprovedScreenSuccess, GetPolicyApprovedScreenError), !1
    }
}

function FocusElement(n) {
    var t = $("html," + n + "");
    t.stop().animate({
        scrollTop: 50
    }, 500, "swing", function() {})
}

function ThreeDsuccess(n) {
    var r, i, t;
    if (typeof n.ErrorOccurred == "undefined" || n.ErrorOccurred) GetPolicyApprovedScreenSuccess(n);
    else {
        $("#loading").hide();
        threeDPaymentModalIsOpen = !0;
        approveProcessIsWaiting = !1;
        App.modal.show("#modal3DPage");
        try {
            r = !1;
            document.contains(document.getElementById("ifrPayment3D")) && document.getElementById("ifrPayment3D").remove();
            i = n.HtmlResult;
            i.indexOf("<div") >= 0 && (r = !0, i = '<!DOCTYPE html><html><head><meta charset="UTF-8"><\/head><body>' + i + "<\/body><\/html>");
            t = document.createElement("iframe");
            t.id = "ifrPayment3D";
            t.name = "ifrPayment3D";
            t.className = "ifrPayment3D";
            r ? (t.src = "about:blank", t.onload = function() {
                var n = t.contentDocument || t.contentWindow.document;
                n.body.innerHTML = i
            }) : t.src = "data:text/html;charset=utf-8," + encodeURI(i);
            document.getElementById("ifrPayment3DDiv").appendChild(t)
        } catch (u) {
            PaymentHelper.PendingApproveResponse = !1;
            threeDPaymentModalIsOpen = !0;
            CloseModal3DPage(u.message)
        }
    }
}

function processResult() {
    alert(langData.jsErrOcc)
}

function ThreeReturn(n) {
    try {
        $("#loading").hide();
        threeDPaymentModalIsOpen = !1;
        approveProcessIsWaiting = !1;
        App.modal.hide("#modal3DPage");
        $(".modal-overlay").fadeOut();
        $(".modal-overlay").hide();
        typeof n.ResultValueTwo != "undefined" && n.ResultValueTwo == "CE" && (EventFlags.PolicyApproveThreeDEvent = !0);
        PaymentHelper.PendingApproveResponse = !1
    } catch (t) {}
    GetPolicyApprovedScreenSuccess(n)
}

function ThreeDCancelPayment(n) {
    ThreeDCancelPaymentSubMethod(n.statusText)
}

function ThreeDCancelPaymentSubMethod(n) {
    try {
        $("#loading").hide();
        threeDPaymentModalIsOpen = !1;
        approveProcessIsWaiting = !1;
        App.modal.hide("#modal3DPage");
        $(".modal-overlay").fadeOut();
        $(".modal-overlay").hide();
        PaymentHelper.PendingApproveResponse = !1
    } catch (t) {
        $("#loading").hide()
    }
    AjaxPost("/Proposal/ThreeDCancelPayment", {
        VPosOrderID: "",
        ErrorMessage: n
    }, function(n) {
        try {
            $("#loading").hide();
            errorModal(globalErrorTag, SistemHatasiBasligi, n.ResultValue)
        } catch (t) {}
    }, GetProposalOutputError)
}

function PrintProposal(n, t, i, r) {
    $("#loading").show();
    var u = "";
    console.log(t);
    u = r != null ? r : $("#PolicyNo_" + n + "_" + t).val();
    $("#hdnClaimType").val($("#selectPesinHas option:selected").text());
    AjaxPost("/Proposal/GetPrintInfo", {
        ICNoAndProdNo: n,
        printInfoType: 1,
        policyNo: u,
        packageType: t,
        claimType: i
    }, GetProposalOutputSuccess, GetProposalOutputError);
    EmarSysPrintProposal(n)
}

function GetProposalOutputSuccess(n) {
    $("#loading").hide();
    switch (n.ResultType) {
        case 1:
            errorModal(globalErrorTag, SistemHatasiBasligi, n.ResultValue.Data.Message);
            break;
        case 3:
            location.href = n.ResultValue;
            break;
        case 4:
            OpenInNewTab(langData.jsYourBiddingEdition, n.ResultValue.Data.Link)
    }
}

function GetProposalOutputError() {
    $("#loading").hide();
    errorModal(globalErrorTag, langData.jsAttention, langData.jsErrOcc)
}

function PrintPolicy(n, t, i, r, u) {
    typeof u != "undefined" && u || $("#loading").show();
    asyncPrint = u;
    AjaxPost("/Proposal/GetPrintInfo", {
        ICNoAndProdNo: n,
        printInfoType: 2,
        policyNo: r,
        packageType: t,
        claimType: i
    }, GetPolicyPrintSuccess, GetPolicyPrintError)
}

function GetPolicyPrintSuccess(n) {
    $("#loading").hide();
    switch (n.ResultType) {
        case 1:
            errorModal(globalErrorTag, SistemHatasiBasligi, n.ResultValue.Data.Message);
            $("#btnPoliceBasim").prop("disabled", !1);
            $("#btnPoliceBasim").html(langData.jsShowMyPolicy);
            break;
        case 3:
            location.href = n.ResultValue;
            break;
        case 4:
            globalErrorTag = langData.jsReadyForYourPol;
            typeof asyncPrint != "undefined" && asyncPrint ? ($("#btnPoliceBasim").html(langData.jsShowMyPolicy), $("#btnPoliceBasim").prop("disabled", !1)) : ($("#btnPoliceBasim").prop("disabled", !1), OpenInNewTab(langData.jsReadyForYourPol, n.ResultValue.Data.Link))
    }
}

function GetPolicyPrintError() {
    $("#loading").hide();
    errorModal(globalErrorTag, SistemHatasiBasligi, GenelSistemUyarisi2)
}

function EmarSysTeklifSatinAl(n) {
    try {
        var i = n.split("_"),
            t = "";
        switch (i[1]) {
            case "100":
            case "103":
                t = "Kasko | teklif: Quick Süper Trafik| satın al";
                break;
            case "101":
                t = "Zorunlu trafik sigortası | teklif: Quick Süper Trafik| satın al";
                isProdMotor === "True" && (t = "Zorunlu trafik sigortası | kullanım: MOTOSİKLET VE YÜK MOTOSİKLETİ | teklif: Quick Süper Trafik| satın al");
                break;
            case "202":
                t = "DASK | satın al";
                break;
            case "201":
                t = "Konut Sigortası | sigortalı sıfatı: " + $("#konut-type option:selected").text() + " | kullanım şekli:" + $("#daire-kullanim-sekli option:selected").text() + "  | inşa tarzı:" + $("#bina-insa-tarzi option:selected").text() + " | satın al";
                break;
            case "500":
                t = "Ferdi Kaza | meslek: " + $("#sel1 option:selected").text() + "  | yakınlık derecesi: " + $("#thesel-0 option:selected").text() + " | ek teminat: " + EkTeminatList() + " | satın al";
                ActiveExtremeTab != "" && (t = "Ferdi Kaza | sigorta: Quick Ekstrem Sporlar Sigortası | meslek: " + $("#sel1 option:selected").text() + "  | yakınlık derecesi: " + $("#thesel-0 option:selected").text() + " | ek teminat: " + EkTeminatList() + " | satın al");
                break;
            case "600":
                t = "Seyahat sigortası | satın al";
                break;
            case "504":
                t = "Hekim Sorumluluk sigortası | satın al"
        }
        ScarabQueue.push(["tag", t]);
        ScarabQueue.push(["go"])
    } catch (r) {
        console.log("Emarsys kodunda hata oluştu....")
    }
}

function EkTeminatList() {
    var n = "";
    return $("form#screenFerdiKaza input[type=checkbox]:checked").each(function() {
        n += $(this).next("label").text() + ","
    }), n
}

function EmarSysPrintProposal(n) {
    var i = n.split("_"),
        t = "";
    switch (i[1]) {
        case "100":
        case "103":
            t = "Kasko | teklif: Quick Süper Trafik| teklifi incele";
            break;
        case "101":
            t = "Zorunlu trafik sigortası | teklif: Quick Süper Trafik| teklifi incele";
            isProdMotor === "True" && (t = "Zorunlu trafik sigortası |kullanım: MOTOSİKLET VE YÜK MOTOSİKLETİ | teklif: Quick Süper Trafik| teklifi incele");
            break;
        case "202":
            t = "DASK | teklifi incele";
            break;
        case "201":
            t = "Konut Sigortası | sigortalı sıfatı: " + $("#konut-type option:selected").text() + " | kullanım şekli:" + $("#daire-kullanim-sekli option:selected").text() + "  | inşa tarzı:" + $("#bina-insa-tarzi option:selected").text() + " |  teklifi incele";
            break;
        case "500":
            t = "Ferdi Kaza | meslek: " + $("#sel1 option:selected").text() + "  | yakınlık derecesi: " + $("#thesel-0 option:selected").text() + " | ek teminat: " + EkTeminatList() + " |  teklifi incele";
            ActiveExtremeTab != "" && (t = "Ferdi Kaza | sigorta: Quick Ekstrem Sporlar | meslek: " + $("#sel1 option:selected").text() + "  | yakınlık derecesi: " + $("#thesel-0 option:selected").text() + " | ek teminat: " + EkTeminatList() + " |  teklifi incele");
            break;
        case "600":
            t = "Seyahat sigortası | teklifi incele";
            break;
        case "504":
            t = "Hekim Sorumluluk sigortası | teklifi incele"
    }
    ScarabQueue.push(["tag", t]);
    ScarabQueue.push(["go"])
}

function EmarSysDynamicQuestion(n) {
    var t = "",
        i, r;
    switch (n) {
        case "screenDask":
            t = $("input[name=payment-method]:checked").val() == "1" ? "DASK | sepet" : "DASK | teklifi incele";
            break;
        case "screenFerdiKaza":
            t = ActiveExtremeTab != "" ? "Ferdi Kaza | sigorta: Quick Ekstrem Sporlar Sigortası | meslek: " + $("#sel1 option:selected").text() + " | yakınlık derecesi: " + $("#thesel-0 option:selected").text() + " | ek teminat: " + EkTeminatList() + " | sepet " : "Ferdi Kaza | meslek: " + $("#sel1 option:selected").text() + "  | yakınlık derecesi: " + $("#thesel-0 option:selected").text() + " | ek teminat: " + EkTeminatList() + " | sepet";
            break;
        case "screenKonut":
            t = "Konut Sigortası | sigortalı sıfatı: " + $("#konut-type option:selected").text() + " | kullanım şekli:" + $("#daire-kullanim-sekli option:selected").text() + "  | inşa tarzı:" + $("#bina-insa-tarzi option:selected").text() + " | sepet";
            break;
        case "screenTrafik":
            i = $("#" + n).attr("data-thisplate");
            r = "1" === $("#" + n).attr("data-ismotorcycled");
            t = r ? "Zorunlu trafik sigortası | kullanım: " + $("#kullanimTarzi option:selected").text() + " | plaka: " + i + "  | fiyatı gör" : "Zorunlu trafik sigortası | kullanım: " + $("#kullanimTarzi option:selected").text() + " | yılı: " + $("#selectVehicleYears option:selected").text() + " | marka: " + $("#selectBrand option:selected").text() + " | model:" + $("#selectBrandCode option:selected").text() + "  | sepet";
            break;
        case "screenKasko":
            t = "Kasko | kullanım: " + $("#kullanimTarzi option:selected").text() + " | yılı: " + $("#selectVehicleYears option:selected").text() + " | marka:" + $("#selectBrand option:selected").text() + " | model:" + $("#selectBrandCode option:selected").text() + "  | sepet";
            break;
        case "screenSeyahat":
        case "proposal-seyahat":
            t = "Seyahat sigortası | sepet";
            break;
        case "screenDoctor":
            t = "Hekim Sorumluluk sigortası | sepet"
    }
    ScarabQueue.push(["tag", t]);
    ScarabQueue.push(["go"])
}

function EmarSysErrorMessage(n) {
    var i = n.split("_"),
        t = "";
    switch (i[1]) {
        case "100":
        case "103":
            t = "Kasko | teklif: boş| satın al";
            break;
        case "101":
            t = "Zorunlu trafik sigortası | teklif: boş| satın al";
            isProdMotor === "True" && (t = "Zorunlu trafik sigortası |kullanım: MOTOSİKLET VE YÜK MOTOSİKLETİ | teklif: boş| satın al");
            break;
        case "202":
            t = "DASK| teklif: boş| satın al";
            break;
        case "201":
            t = "Konut Sigortası | teklif: boş| satın al";
            break;
        case "500":
            t = "Ferdi Kaza  | teklif: boş| satın al";
            ActiveExtremeTab != "" && (t = "Ferdi Kaza | sigorta: Quick Ekstrem Sporlar Sigortası | teklif: boş| satın al");
            break;
        case "600":
            t = "Seyahat sigortası | teklif: boş| satın al";
            break;
        case "504":
            t = "Hekim sorumluluk sigortası | teklif: boş| satın al"
    }
    ScarabQueue.push(["tag", t]);
    ScarabQueue.push(["go"])
}

function EmarSysApprove(n) {
    var t = "";
    switch (n) {
        case 100:
        case 103:
            t = "Kasko | teklif: Quick Kasko | ödeme yap";
            break;
        case 101:
            t = "Zorunlu trafik sigortası | teklif: Quick Süper Trafik| ödeme yap";
            isProdMotor === "True" && (t = "Zorunlu trafik sigortası |kullanım: MOTOSİKLET VE YÜK MOTOSİKLETİ | teklif: Quick Süper Trafik| ödeme yap");
            break;
        case 202:
            t = "DASK | ödeme yap";
            break;
        case 201:
            t = "Konut Sigortası | sigortalı sıfatı: " + $("#konut-type option:selected").text() + " | kullanım şekli:" + $("#daire-kullanim-sekli option:selected").text() + "  | inşa tarzı:" + $("#bina-insa-tarzi option:selected").text() + " |  ödeme yap";
            break;
        case 500:
            t = "Ferdi Kaza | meslek: " + $("#sel1 option:selected").text() + "  | yakınlık derecesi: " + $("#thesel-0 option:selected").text() + " | ek teminat: " + EkTeminatList() + " |  ödeme yap";
            ActiveExtremeTab != "" && (t = "Ferdi Kaza | sigorta: Quick Ekstrem Sporlar Sigortası | meslek: " + $("#sel1 option:selected").text() + "  | yakınlık derecesi: " + $("#thesel-0 option:selected").text() + " | ek teminat: " + EkTeminatList() + " |  ödeme yap");
            break;
        case 600:
            t = "Seyahat sigortası | ödeme yap";
            break;
        case 504:
            t = "Hekim Sorumluluk sigortası | ödeme yap"
    }
    ScarabQueue.push(["tag", t]);
    ScarabQueue.push(["go"])
}

function AddQueAnswerDiscountCode(n) {
    var u = "",
        r = "",
        t, i, f;
    switch (n) {
        case ICProdCodes.Traffic:
            u = "#txtTrafikIndirimKodu";
            r = "#Error101DiscountCode";
            break;
        case ICProdCodes.Kasko:
        case ICProdCodes.Kasko_V2:
        case ICProdCodes.KaskoMoto:
            u = "#txtIndirimKodu";
            r = "#Error100DiscountCode"
    }
    if (t = $(u), i = $.trim(t.val()), t.val(i), i == "") return $(r).css("display", "block").html(t.attr("data-nullMessage")), !1;
    $(r).css("display", "none").html(t.attr("data-nullMessage"));
    f = {
        Id: t.data("qid"),
        Name: "",
        ValueText: "",
        Value: i,
        CampaignCode: i,
        IC_ProdNo: n.toString()
    };
    AjaxPost("/Proposal/AddQueAnswerDiscountCode", f, AddQueAnswerDiscountCodeSuccess, null)
}

function AddQueAnswerDiscountCodeSuccess(n) {
    if (n.IsOK) {
        $("#loading").show();
        DiscountIsApply = !0;
        var t = jQuery.grep(propArr, function(t) {
            return t.toLowerCase().indexOf(n.model.IC_ProdNo) >= 0
        });
        GetProposalPriceB2C(t)
    } else ErrorCountForDiscount += 1, ErrorCountForDiscount >= 10 ? ThisPageRefresh(langData.jsWrongDiscAgain + " >>>") : errorModal(langData.Warning, SistemUyarisiBasligi, n.Message)
}

function ProposalOperationStartingControl() {
    var i, f, e, r, u, o;
    try {
        var n = !0,
            t = "",
            s = parseInt(getParameterByName("prodNo"));
        switch (s) {
            case BMVProdCodes.Kasko_V2:
                i = $("#kullanimTarzi option:selected").val();
                i != "" && (f = [1, 6], e = _.contains(f, parseInt(i)), e && (r = $("#AutoInsuredJob option:selected").val(), (r == "" || r == "0") && (t = langData.msgPleaseChoosePro, n = !1)));
                break;
            case BMVProdCodes.DASK:
                u = $("#hdnDaskUavtNo").val();
                (typeof u == "undefined" || u == "") && (t = langData.jsEnterRizikoAddress, n = !1)
        }
        return {
            IsOK: n,
            Message: t
        }
    } catch (h) {
        return o = {
            IsOK: !0,
            Message: ""
        }
    }
}

function GetProposalPriceSuccessV3(n) {
    $("#loading").hide();
    $("#step1Text").hide();
    App.unblock(".package-price");
    App.unblock("body");
    $(".package-selector").hide();
    var t = n[0].ResultData;
    typeof t != "undefined" && $.each(t, function(n, t) {
        console.log("Key: " + n);
        console.log("Value: " + t);
        GetProposalPriceB2C([n], !1)
    })
}
var ResultTypes = {
        Message: 1,
        Html: 2,
        Redirect: 3,
        Data: 4
    },
    TCKN = 1,
    VKN = 2,
    YKN = 3,
    Seciniz = langData.SelectView,
    MinM2 = 10,
    SeyahatAraligi = 90,
    SeyahatAraligiMax = 365,
    EVET = "E",
    HAYIR = "H",
    GizlilikMetniUyarisi = langData.jsAgreementPriPol,
    BilgilendirmeFormuUyarisi = langData.jsAcceptPolInfoForm,
    GecerliPlakaUyarisi = langData.jsEnterValidPlate,
    YKPlakaUyarisi = langData.jsSelectNoPlate,
    PlakaIlKoduUyarisi = langData.jsSelectTheCityCode,
    SistemUyarisiBasligi = langData.jsSystemAlert,
    SistemHatasiBasligi = langData.jsSystemFailure,
    GecerliKimlikUyarisi = langData.jsEnterValidIDNumber,
    BinaveEsyaUyarisi = langData.jsEnterAmountBuildOrHouse,
    SorgulamaUyarisi = langData.jsErrQuery,
    TimeoutHataMesaji = langData.jsOperTimeOutTryAgain,
    TeklifGenelHataMesaji = langData.jsErrCreatePropTryAgain,
    PoliceGenelHataMesaji = langData.jsErrCreatePolTryAgain,
    GenelSistemUyarisi = langData.jsNotProcTransactionTryAgain,
    GenelSistemUyarisi2 = langData.jsErrOccurredDuring,
    MinM2Uyarisi = langData.jsSmallerSquare.replace("{0}", MinM2),
    captchaEnabled = !1,
    isMarketing = !1,
    plateMode = !1,
    plate = "",
    identityType = "",
    agreementControl = !1,
    IdentityNo = "",
    IdentityLen = 0,
    mailOrPhoneNum = "",
    canRun = !1,
    AddressInformation, addressEntryType, queryType, code = "",
    defaultClaimType = "H",
    GenisPaket = 1,
    DarPaket = 5,
    TrafikStandartPaket = 1,
    TrafikGenisPaket = 2,
    seyahatDarPaket = 1,
    seyahatGenisPaket = 2,
    propArr = [],
    productArr = [],
    uavtType = "",
    uavtAddressCode = "",
    asyncPrint = !1,
    cookieAgency = "",
    cookieUser = "",
    cookiesModel = null,
    PrevCompanyCode = "",
    PrevAgencyCode = "",
    PrevPolicyNo = "",
    PrevRenewalNo = "",
    urlOrigin = window.location.origin,
    staticFileUrl = urlOrigin + "/staticfiles",
    gizlilikPdfLink = staticFileUrl + "/GIZLILIK_KISISEL_VERI_FORMU.pdf",
    kaskoDarBilgilendirmeLink = staticFileUrl + "/bilgilendirme_formlari/KASKO_DAR_BILGILENDIRME_FORMU.pdf",
    kaskoGenisBilgilendirmeLink = staticFileUrl + "/bilgilendirme_formlari/KASKO_GENIS_BILGILENDIRME_FORMU.pdf",
    kaskoDarTeminatKlozLink = staticFileUrl + "/KASKO_DAR_TEMINAT_VE_KLOZLAR.pdf",
    kaskoGenisTeminatKlozLink = staticFileUrl + "/KASKO_GENIS_TEMINAT_VE_KLOZLAR.pdf",
    kaskoSigortasiLink = staticFileUrl + "//bilgilendirme_formlari/KASKO_SIGORTALARI_BILGILENDIRME_FORMU.pdf",
    kullaniciSozlesmesi = staticFileUrl + "/KULLANICI_SOZLESMESI.pdf",
    trafikGenisBilgilendirmeLink = staticFileUrl + "/bilgilendirme_formlari/TRAFIK_GENIS_BILGILENDIRME_FORMU.pdf",
    trafikDarBilgilendirmeLink = staticFileUrl + "/bilgilendirme_formlari/TRAFIK_DAR_BILGILENDIRME_FORMU.pdf",
    trafikTeminatKlozLink = staticFileUrl + "/TRAFIK_TEMINAT_VE_KLOZLAR.pdf",
    daskTeminatLink = staticFileUrl + "/DASK_TEMINAT_KLOZLAR.pdf",
    ferdiKazaBilgilendirmeLink = staticFileUrl + "/bilgilendirme_formlari/FERDI_KAZA_BILGILENDIRME_FORMU.pdf",
    daskBilgilendirmeLink = staticFileUrl + "/bilgilendirme_formlari/DASK_BILGILENDIRME_FORMU.pdf",
    daskTeminatKlozLink = staticFileUrl + "/DASK_TEMINAT_KLOZLAR.pdf",
    konutBilgilendirmeLink = staticFileUrl + "/bilgilendirme_formlari/KONUT_YANGIN_BILGILENDIRME_FORMU.pdf",
    seyahatBilgilendirmeLink = staticFileUrl + "/bilgilendirme_formlari/SEYAHAT_SAGLIK_BILGILENDIRME_FORMU.pdf",
    hekimSorumlulukBilgilendirmeLink = staticFileUrl + "/bilgilendirme_formlari/HEKIM_SORUMLULUK_BILGILENDIRME_FORMU.pdf",
    seyahatTeminatKlozLink = staticFileUrl + "/SEYAHAT_KLOZLARI.pdf",
    kaskoSikcaSorulanSorular = staticFileUrl + "/sikca_sorulan_sorular/KASKO_SIGORTALARI_SORULAR.pdf",
    trafikSikcaSorulanSorular = staticFileUrl + "/sikca_sorulan_sorular/TRAFIK_SIGORTALARI_SORULAR.pdf",
    daskSikcaSorulanSorular = staticFileUrl + "/sikca_sorulan_sorular/DASK_SIGORTASI_SORULAR.pdf",
    konutSikcaSorulanSorular = staticFileUrl + "/sikca_sorulan_sorular/KONUT_SIGORTALARI_SORULAR.pdf",
    konutTeminatKlozlink = staticFileUrl + "/KONUT_TEMINAT_VE_KLOZLAR.pdf",
    ferdikazaSikcaSorulanSorular = staticFileUrl + "/sikca_sorulan_sorular/FERDI_KAZA_SIGORTASI_SORULAR.pdf",
    ferdikazaTeminatKlozLink = staticFileUrl + "/FERDI_KAZA_TEMİNAT_VE_KLOZLAR.pdf",
    seyahatSikcaSorulanSorular = staticFileUrl + "/sikca_sorulan_sorular/YURTDISI_SEYAHAT_SORULAR.pdf",
    qKimlikBilgilendirmeFormu = staticFileUrl + "/bilgilendirme_formlari/qkimlik-koruma-sigortasi-bilgilendirme-formu.pdf",
    autoInsCoveragesAndClauses = urlOrigin + "/Content/pdf/kasko-teminat-aciklamalari-ve-klozlari.pdf",
    autoInsMottoCoveragesAndClauses = staticFileUrl + "/MOTO_KASKO_KLOZLAR.pdf",
    kefaletSigortasiBilFormLink = staticFileUrl + "/bilgilendirme_formlari/quick-sigorta-kefalet-sigortasi-bilgilendirme-formu.pdf",
    kaskoYenibilgilendirmeFormuLink = staticFileUrl + "/bilgilendirme_formlari/kasko-sigortalari-bilgilendirme-formu.pdf",
    kaskoNewAsistansCoverages = staticFileUrl + "/quick-kasko-asistans-teminatlari.pdf",
    studentTravelCoverages = staticFileUrl + "/ogrenci-seyahat-saglik-sigortasi-teminat-aciklamalari-ve-klozlari.pdf",
    travelCoveragesInfoForm = staticFileUrl + "/bilgilendirme_formlari/seyahat-saglik-sigortasi-bilgilendirme-formu.pdf",
    travelAbroadCoverages = staticFileUrl + "/yurtdisi-seyahat-saglik-sigortasi-teminat-aciklamalari-ve-klozlari.pdf",
    travelVizeCoverages = staticFileUrl + "/vize-seyahat-saglik-sigortasi-teminat-aciklamalari-ve-klozlari.pdf",
    TravelHealtyCoverages = staticFileUrl + "/incoming-seyahat-saglik-sigortasi-teminat-aciklamalari-ve-klozlari.pdf",
    travelDomesticCoverages = staticFileUrl + "/yurtici-seyahat-saglik-sigortasi-teminat-aciklamalari-ve-klozlari.pdf",
    DataOwnerApplicantForm = urlOrigin + "/Content/pdf/veri-sahibi-basvuru-formu.pdf",
    buildingComletionGeneralCondition = staticFileUrl + "/bina-tamamlama-sigortasi-genel-sartlari.pdf",
    buildingComletionInformationForm = staticFileUrl + "/bilgilendirme_formlari/bina-tamamlama-sigortasi-bilgilendirme-formu.pdf",
    isyeriYanginPaketSigBilgiFormu = staticFileUrl + "/bilgilendirme_formlari/isyeri-yangin-paket-sigortasi-bilgilendirme-formu.pdf",
    threeDPaymentModalIsOpen = !1,
    approveProcessIsWaiting = !1,
    manualCaptchaIsEnabled = !1,
    threeDPayRequestCounter = 0,
    capthaCodeCache = [],
    ErrorCountForDiscount = 0,
    IC_No = 110,
    DEFAULT_WEB_AGENCY_CODE = 11e4,
    ICProdCodes = {
        Traffic: 101,
        Kasko: 100,
        Kasko_V2: 103,
        DASK: 202,
        Build: 201,
        PersonalAccident: 500,
        Travel: 600,
        Doctor: 504,
        KaskoMoto: 102
    },
    BMVProdCodes = {
        Traffic: 1,
        Kasko: 2,
        Kasko_V2: 12,
        DASK: 3,
        Build: 4,
        PersonalAccident: 6,
        Travel: 5,
        Doctor: 11,
        ExtremSports: 98,
        Motorcycles: 99,
        KaskoTractor: 88,
        KaskoMoto: 13
    },
    AutoInsurancePackageTypes = {
        DarKasko: 1,
        Kasko: 2,
        GenisletilmisKasko: 3,
        TamKasko: 4,
        EsnekKasko: 5
    },
    DiscountIsApply = !1,
    OrjinalPriceLog = [],
    endorsmentClientIsLogin = !1,
    agencyCanEnterEndors = !1,
    camePages = {
        Null: 0,
        RenewalPage: 1,
        RenewalPageOnOutLink: 2
    },
    camePage = 0,
    MasterUserModel = {
        CurrentAgencyCode: DEFAULT_WEB_AGENCY_CODE,
        CurrentUsername: "WEB"
    },
    InstallmentType3D = !1,
    OK = "1",
    NONE = "0",
    ActiveExtremeTab = "",
    mailLogo = urlOrigin + "/Content/images/mail_logo.png",
    EnumsCustomerTypes = {
        TCKN: 1,
        VKN: 2,
        YKN: 3,
        Passport: 4
    },
    Enums = {
        LoginResult: {
            Nothing: -1,
            Successful: 1,
            InvalidUserOrPassword: 2,
            PasswordExpired: 3,
            UserAccountDisabled: 4
        },
        TravelActiveTabs: {
            None: 0,
            Abroad: 1,
            Domestic: 2,
            Incoming: 3,
            Student: 4
        },
        PersonalAccidentTabs: {
            None: 0,
            Ski: 1,
            Mountaineering: 2,
            Dive: 3,
            Sail: 4,
            XXL: 5
        }
    },
    ProductsInfo = [{
        Code: 101,
        BmvProdCode: 1,
        Name: langData.jsCompulsoryTrafficIns,
        CommonValueTitle: langData.plate,
        Path: "icon-icon-trafik-2",
        TRLandingPageUrl: "/zorunlu-trafik-sigortasi",
        ENLandingPageUrl: ""
    }, {
        Code: 100,
        BmvProdCode: 2,
        Name: langData.jsAutoIns,
        CommonValueTitle: langData.plate,
        Path: "icon-icon-kasko-2",
        TRLandingPageUrl: "/kasko-sigortasi",
        ENLandingPageUrl: ""
    }, {
        Code: 103,
        BmvProdCode: 12,
        Name: langData.jsAutoIns,
        CommonValueTitle: langData.plate,
        Path: "icon-icon-kasko-2",
        TRLandingPageUrl: "/kasko-sigortasi",
        ENLandingPageUrl: ""
    }, {
        Code: 202,
        BmvProdCode: 3,
        Name: langData.jsDASKIns,
        CommonValueTitle: "UAVT",
        Path: "icon-icon-dask",
        TRLandingPageUrl: "/dask-sigortasi",
        ENLandingPageUrl: ""
    }, {
        Code: 201,
        BmvProdCode: 4,
        Name: langData.jsHomeIns,
        CommonValueTitle: "UAVT",
        Path: "icon-icon-konut",
        TRLandingPageUrl: "/konut-sigortasi",
        ENLandingPageUrl: ""
    }, {
        Code: 500,
        BmvProdCode: 6,
        Name: langData.jsPersonalAccidentIns,
        CommonValueTitle: "--",
        Path: "icon-icon-ferdi-kaza",
        TRLandingPageUrl: "/ferdi-kaza-sigortasi",
        ENLandingPageUrl: ""
    }, {
        Code: 600,
        BmvProdCode: 5,
        Name: langData.jsTravelIns,
        CommonValueTitle: "--",
        Path: "icon-icon-seyahat",
        TRLandingPageUrl: "/seyahat-sigortasi",
        ENLandingPageUrl: ""
    }, {
        Code: 504,
        BmvProdCode: 11,
        Name: langData.jsCompulsoryDoctorLiaIns,
        CommonValueTitle: "--",
        Path: "icon-icon-doctor",
        TRLandingPageUrl: "/hekim-sorumluluk-sigortasi",
        ENLandingPageUrl: ""
    }],
    AjaxPostProcessCodes = {
        OtherPage: 0,
        IncomingPageForm: 1,
        EndorsmentFromChangeSale: 2,
        EndorsmentFromChangePlate: 3,
        RenewalList: 4,
        SearchAgency: 5,
        RenewalOnUrl: 6
    },
    CaptchaDataModel = {
        AjaxPostProcessCode: "",
        PostAddress: "",
        DataModel: {},
        Response: {}
    },
    KaskoDegerListesiPageModel = {
        TargetElmName: "queries",
        PostAddress: "/Products/GetCarBrandAndModelInDef110VehicleValues",
        ElementValue: "",
        TrimValue: "",
        ElementMakeValue: "",
        TargetDOMKey: ""
    },
    endorsmentPageModel = {
        CurrentAgencyCode: "0"
    },
    modalPolicyChangeSaleConfirmation = {
        PolicyNo: "",
        insuredName: "",
        insurerEmail: "",
        insurerGSM: "",
        PolicySaledDate: "",
        CCNo: "",
        Amount: "",
        BmvProductCode: 1,
        Email: "",
        GSM: "",
        Message: "",
        NewPlateNo: "",
        OldPlateNo: "",
        PlateNo: "",
        Process: "",
        RegistrySerialCode: "",
        RegistrySerialNo: "",
        ResultState: !0,
        TargetFormId: "",
        EndorsmentAmount: 0,
        EndorsmentAmountText: "",
        IsPayBack: !0,
        IsNewPlate: !0,
        insuredNameHidden: "",
        TargetForm: "",
        RenewalNo: "",
        EndorsNo: "",
        ServiceErrorMessage: "",
        PolicyBeginDate: "",
        PolicyEndDate: ""
    },
    PolicyDetailForChangePlate = {},
    PolicyDetailForSaledVehicle = {},
    FormDataImages, FlagProposalInfo = {
        PolicyNo: 100001,
        ICProdCode: 101,
        RenewalNo: 0,
        EndorsNo: 0
    },
    TeklifSatinAlDataModel = {
        ICNo_ICProdNo: "110_600",
        PaketSecim: 1,
        ClaimType: "H",
        BmvProductCode: BMVProdCodes.DASK,
        PolicySerialNo: 0,
        CaprazSatisPayment: !1,
        ClaimStep: null,
        CustomerType: EnumsCustomerTypes.TCKN.toString(),
        BmvPolicyNo: 0
    },
    Address = {
        AddressUAVT: "",
        AddressFull: ""
    },
    Insured = {
        Address: Address
    },
    SeeThePriceFormPageModel = {},
    BannerLinkProcessDone = !1,
    LandingIncomingFormPolicyResult = {},
    TravelInsureds = [],
    WebSiteVersions = {
        None: 0,
        V1: 1,
        V2: 2,
        V3: 3
    },
    WebSiteVersion = WebSiteVersions.V1,
    SehayatQuickPackageTypes = {
        DAR: 1,
        GENIS: 2,
        Student: 3,
        Domestic: 4,
        Incoming: 99
    },
    SelectedProposalPacketPriceTemp, SelectedProposalPacketPrice = {
        PureProposals: [],
        ClickLabelId: "",
        Package: "",
        TotalPrice: 0,
        Price: 0,
        ParamProductCode: "",
        ParamTravelPackageType: "",
        ParamClaimType: "",
        ParamBmvProductCode: "",
        BmvProductCode: "",
        IcNo: "",
        CssClassKey: "",
        Coverages: []
    },
    SelectedProposalPacketPriceCurrent = null,
    ParentTypes = {
        None: 0,
        MainInsured: 1,
        Spouse: 2,
        Child: 3,
        Other: 9
    },
    IsFirstRequest = !0,
    FirstProposalResults = [],
    BeforeQuestions = [],
    BeforePackageTypes = [],
    OutReferrerUrls = ["limak.com.tr", "www.limak.com.tr"],
    EventFlags = {
        EndorsmentConfirmationChangePlateEvent: !1,
        EndorsmentConfirmationChangeSaleEvent: !1,
        PolicyApproveEvent: !1,
        PolicyApproveThreeDEvent: !1
    },
    TravelCountries = {},
    sitekey = "",
    InsurerListControl, idLength, InsurerListParent, correctCaptchaNew, PaymentHelper, OnlineTransactionsController, correctCaptcha, LoginCustomerType, ModalEnable, imageUploadControl, claimFormType, claimProdName, Next, bmvprodcodeOnlineTras, xdr, SFSPostToNewWindow, PrintHelper, Bank, District;
sitekey = location.hostname === "localhost" || location.hostname === "127.0.0.1" ? "6Lf-zAkUAAAAAMd2q0rcCWLzpYQtdwMhtNpIyDuM " : $("#captchaSiteKey").val();
$(function() {
    function u() {
        $("#loading").show();
        var n = langData.jsEnterValidValue;
        if ($("#radio-dask-renew").is(":checked")) queryType = "POLICY_NO", code = $("#dask-police-no").val(), n = langData.jsEnterValidDASKPolNo;
        else if (queryType = "UAVT_NO", code = $("#uavt").val(), n = langData.jsEnterValidUAVTAddressNo, !IsValidUavtCode(code, "hero-errors")) return $("#uavt").focus(), $("#loading").hide(), !1;
        code.length > 0 ? Adress.getAdressCode(code, queryType) : ($("#loading").hide(), errorModal(langData.Warning, "", n))
    }
    var e = $("#sessionTimeout").val(),
        r = e * 6e4 + 3e4,
        t, i = !1,
        n, f;
    cookiesModel = {
        cookieAgency: Cookies.get("QuickAgencyLogin"),
        cookieUser: Cookies.get("QuickLogin")
    };
    t = setTimeout(function() {
        i = !0;
        SessionTimeoutControlAjax(cookiesModel)
    }, r);
    $(document).on("click", function() {
        i || (clearTimeout(t), t = setTimeout(function() {
            i = !0;
            SessionTimeoutControlAjax(cookiesModel)
        }, r))
    });
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
    $(".model").text("");
    $(".model-detail").text("");
    n = $(window);
    wHeight = n.height();
    n.resize(function() {
        wHeight = n.height()
    });
    captchaEnabled = StringToBooleanCast($("#captchaEnabled").val());
    $('select[data-dynamic="true"]').change(ddlChange);
    dynamicQuestion();
    $("#passwordConfirm").keyup(function() {
        $("#password").val() == $(this).val() && $("#parsley-password1-valid").html("")
    });
    $(".icon-icon-trafik-2, .icon-icon-kasko-2").click(function() {
        $("#modal-products").hide();
        $(".modal-overlay").hide()
    });
    $(".btnSessionTimeout").on("click", function() {
        location.href = SFSHelperController.GetRedirectUrl()
    });
    $("#plate-present").focusout(function() {
        var n = $("#plate-present").val().toUpperCase().search("YK");
        return n >= 0 && $("#plate-present").val().length >= 1 && $("#plate-present").val().length <= 4 ? (errorModal(langData.Warning, "", YKPlakaUyarisi), !1) : $("#plate-present").val().length > 0 && $("#plate-present").val().length <= 4 ? (errorModal(langData.Warning, "", langData.jsInvalidPlateNumber), !1) : void 0
    });
    $("#plate-present-2").focusout(function() {
        var n = $("#plate-present-2").val().toUpperCase().search("YK");
        return n >= 0 && $("#plate-present-2").val().length <= 4 ? (errorModal(langData.Warning, "", langData.YKPlakaUyarisi), !1) : $("#plate-present-2").val().length > 0 && $("#plate-present-2").val().length <= 4 ? (errorModal(langData.Warning, "", langData.jsInvalidPlateNumber), !1) : void 0
    });
    $("#step1").click(function() {
        var n = $("#proposalStep1").find(".renderhtml").html().length,
            t = $(this).hasClass("passive");
        $("#proposal-left-bar-step-3").hide();
        n != 0 && t == !1 && (SFSHelperController.DataLayerPushStepVirtualPath(2), $("#proposalStep1").show(), $("#proposalStep2").hide(), $("#proposalStep3").hide(), $("#step2, #step3").removeClass("visited"), $("#step2, #step3").removeClass("active"), $("#step2, #step3").addClass("passive"), $("#step1Text").show(), $("#step2Text").hide(), $("#step3Text").hide())
    });
    $("#step2").click(function() {
        var n = $("#proposalStep2").find(".renderhtml").html().length,
            t = $(this).hasClass("passive");
        $("#proposal-left-bar-step-3").hide();
        n != 0 && t == !1 && (SFSHelperController.DataLayerPushStepVirtualPath(3), $("#proposalStep2").show(), $("#proposalStep1").hide(), $("#proposalStep3").hide(), $("#step3").removeClass("visited"), $("#step3").removeClass("active"), $("#step3").addClass("passive"), $("#step1Text").hide(), $("#step2Text").show(), $("#step3Text").hide())
    });
    $("#step3").click(function() {
        var n = $("#proposalStep3").find(".renderhtml").html().length,
            t = $(this).hasClass("passive");
        n != 0 && t == !1 && (SFSHelperController.DataLayerPushStepVirtualPath(4), $("#proposalStep3").show(), $("#proposalStep1").hide(), $("#proposalStep2").hide(), $("#step1Text").hide(), $("#step2Text").hide(), $("#step3Text").show())
    });
    addressEntryType = 2;
    $(".btn-query-dask").on("click", function() {
        UAVTClearStepOne();
        $("#uavt-form").data("wizard").go(1);
        u()
    });
    $(".btn-query-dask").keypress(function(n) {
        (n.keyCode == 13 || n.which == 13) && (n.preventDefault(), u())
    });
    $("#radio-dask-first").on("click", function() {
        $("#ddlQuestion1001, #ddlQuestion311, #ddlQuestion1002").val("01").trigger("change");
        $("#txtQuestion310, #ddlQuestion312").val("0").trigger("change");
        $("#ddlQuestion1003").val("1").trigger("change");
        $("#ddlQuestion1004").val("5").trigger("change");
        $("#dask-police-no").val("");
        $("#ddlQuestion1001").val(01).change();
        $("#txtQuestion310").val(0);
        $("#ddlQuestion1003").val(1).change();
        $("#ddlQuestion1004").val(5).change();
        $("#ddlQuestion311").val(01).change();
        $("#ddlQuestion1002").val(01).change();
        $("#ddlQuestion312").val(0).change();
        $("#dvFullAddress").html("<span>" + langData.jsRizikoAddress + ":<\/span>&nbsp;");
        $("#dask-police-no").attr("disabled", !1)
    });
    $("#radio-dask-renew").on("click", function() {
        $("#uavt").val("");
        $("#ddlQuestion1001").val(01).change();
        $("#txtQuestion310").val(0);
        $("#ddlQuestion1003").val(1).change();
        $("#ddlQuestion1004").val(5).change();
        $("#ddlQuestion311").val(01).change();
        $("#ddlQuestion1002").val(01).change();
        $("#ddlQuestion312").val(0).change();
        $("#dvFullAddress").html("<span>" + langData.jsRizikoAddress + ":<\/span>&nbsp;");
        $("#uavt").attr("disabled", !1)
    });
    $("#is-same-person-ferdi").on("change", function() {
        var n = $(this).val(),
            t = $(".relative-info").length;
        n == 1 && t == 1 ? ($(".same-person-name-ferdi").attr("data-parsley-required", "false").parsley().reset(), $(".same-person-tcno-ferdi").attr("data-parsley-required", "false").parsley().reset(), $("#same-person-wrapper-ferdi").fadeOut()) : n == 0 && t == 1 && ($(".same-person-name-ferdi").attr("data-parsley-required", "true").parsley().reset(), $(".same-person-tcno-ferdi").attr("data-parsley-required", "true").parsley().reset(), $("#same-person-wrapper-ferdi").fadeIn())
    });
    $(".btn-add-relative-info").on("click", function() {
        var n = $(".relative-info").length - 1,
            t;
        $("#thetextname-" + n).val() != "" ? ($(".relative-info").find(".custom-select2").select2("destroy"), $(".relative-info").find(".custom-select2-searchable").select2("destroy"), $(".relative-info:last").clone().insertBefore(".btn-add-relative-info"), $(".relative-info").find(".custom-select2").select2({
            width: "100%",
            minimumResultsForSearch: -1
        }), $(".relative-info").find(".custom-select2-searchable").select2({
            width: "100%"
        }), $(".relative-info:last .btn-remove-relative-info").show(), $(".relative-info:last").find("input").val(""), App.sizer.resize(), n = $(".relative-info").length - 1, t = $(".relative-info"), t.eq(n).find(".sel-family").attr("id", "thesel-" + n), t.eq(n).find(".txt-same-person-name").attr("id", "thetextname-" + n), t.eq(n).find(".txt-same-person-tckn").attr("id", "thetexttckn-" + n), t.eq(n).find(".btn-remove-relative-info").attr("id", "thebtnremove-" + n)) : errorModal(langData.ErrorDetailView, "", langData.jsAlreadyAddedUser)
    });
    $("#konut-type").on("change", function() {
        $("#konut-type").val() == "1" ? ($("#txtBinaOrDekor").removeAttr("data-qid"), $("#txtBinaOrDekor").attr("data-qid", "20501"), $("#txtBinaOrDekor").attr("class", "validate[required]"), $("#txtesyabedeli").attr("class", "validate[required]")) : ($("#txtBinaOrDekor").removeAttr("data-qid"), $("#txtBinaOrDekor").attr("data-qid", "20503"), $("#txtBinaOrDekor").attr("class", "validate[required]"), $("#txtesyabedeli").attr("class", "validate[required]"))
    });
    $("#txtBinaOrDekor").keyup(function() {
        $("#txtesyabedeli").removeClass("validate[required]")
    });
    $("#txtesyabedeli").keyup(function() {
        $("#txtBinaOrDekor").removeClass("validate[required]")
    });
    f = 0;
    $("#ddlQuestion10567").val("0").change();
    $("#ddlQuestion10566").change(function() {
        var t = $("#ddlQuestion10566").val(),
            n = $("#ddlQuestion10567"),
            i, r;
        document.getElementById("ddlQuestion10567").innerHTML = "";
        switch (t) {
            case "2":
                i = _.filter(TravelCountries.Data, function(n) {
                    return n.Text2 != ""
                });
                i.forEach(t => {
                    n.prepend("<option value='" + t.Value + "'>" + t.Text + "<\/option>").val("")
                });
                break;
            case "3":
                r = _.filter(TravelCountries.Data, function(n) {
                    return n.Text2 == "Avrupa Schengen"
                });
                r.forEach(t => {
                    n.prepend("<option value='" + t.Value + "'>" + t.Text + "<\/option>").val("")
                })
        }
        n.prepend("<option value='0'>" + langData.jsChooseVisaCountry + "<\/option>").val("");
        n.val("0").change();
        $("#ddlQuestion10567").append($("#ddlQuestion10567 option").remove().sort(function(n, t) {
            var i = ReplaceTurkishChars($(n).text()),
                r = ReplaceTurkishChars($(t).text());
            return i > r ? 1 : i < r ? -1 : 0
        }));
        switch (t) {
            case "2":
                $("#ddlQuestion10567 option[value='792']").remove();
                $("#ddlQuestion10567").prepend("<option value='0'>" + langData.jsChooseVisaCountry + "<\/option>").val("");
                $("#ddlQuestion10567").val("0").change();
                break;
            case "3":
                $("#ddlQuestion10567 option[value='840']").remove();
                $("#ddlQuestion10567 option[value='124']").remove();
                $("#ddlQuestion10567 option[value='392']").remove();
                $("#ddlQuestion10567 option[value='31']").remove();
                $("#ddlQuestion10567 option[value='792']").remove();
                $("#ddlQuestion10567 option[value='0']").remove();
                $("#ddlQuestion10567").prepend("<option value='0'>" + langData.jsChooseVisaCountry + "<\/option>").val("");
                $("#ddlQuestion10567").val("0").change();
                f++
        }
    });
    $("#daireyuzolcumu").on("focusout", function() {
        if ($("#konut-type").val() == "1") {
            var n = KonutBinaBedeliHesaplama($(this).val(), $("#bina-insa-yili").val());
            isNaN(n) || ($("#txtBinaOrDekor").val(parseInt(n)), $("#txtesyabedeli").removeClass("validate[required]"))
        }
    });
    $("#bina-insa-yili").on("change", function() {
        if ($("#konut-type").val() == "1" && $("#daireyuzolcumu").val() != "") {
            var n = KonutBinaBedeliHesaplama($("#daireyuzolcumu").val(), $("#bina-insa-yili").val());
            isNaN(n) || ($("#txtBinaOrDekor").val(parseInt(n)), $("#txtesyabedeli").removeClass("validate[required]"))
        }
    })
});
InsurerListControl = [];
idLength = 0;
$("#is-same-person-ferdi").on("change", function() {
    var n = $(".relative-info").length;
    $("#thetexttckn-0").val() != "" && n == 1 ? FerdikazaInsurerRemove($("#thetexttckn-0")[0]) : n > 1 && errorModal(langData.ErrorDetailView, SistemUyarisiBasligi, langData.jsRemoveOtherFamilyMember)
});
InsurerListParent = null;
$(".tcno").on("keypress blur", function(n) {
    if (n.type === "keypress") return !!String.fromCharCode(n.which).match(/^\d$/);
    this.value = this.value.replace(/[^\d].+/, "")
});
$(".justnumeric").on("keypress blur", function(n) {
    if (n.type === "keypress") return !!String.fromCharCode(n.which).match(/^\d$/);
    this.value = this.value.replace(/[^\d].+/, "")
});
$(".uavtcode").on("keypress blur", function(n) {
    if (n.type === "keypress") return !!String.fromCharCode(n.which).match(/^\d$/);
    this.value = this.value.replace(/[^\d].+/, "")
});
$("#query-doctor").on("click", function() {
    var n = !0;
    $("#type-doctor-renew input, #type-doctor-renew select").each(function() {
        var t = $(this).parsley();
        t.validate();
        t.isValid() == !1 && (n = !1)
    });
    n && MakeHatmerQueryForDoctor()
});
$("#query-doctor").keypress(function(n) {
    (n.keyCode == 13 || n.which == 13) && n.preventDefault()
});
$("#PlateChangeFileUpload, #CarSaledPolicyFileUpload").change(function(n) {
    var t, i;
    for (FormDataImages = new FormData, t = 0; t < this.files.length; t++) i = this.files[t], FormDataImages.append(i.name, i);
    return n.preventDefault(), !0
});
$(function() {
    $(document).ready(function() {
        var n = !1,
            t = 17,
            i = 91,
            r = 86,
            u = 67;
        $(document).keydown(function(r) {
            (r.keyCode == t || r.keyCode == i) && (n = !0)
        }).keyup(function(r) {
            (r.keyCode == t || r.keyCode == i) && (n = !1)
        });
        $("#plate-present-2").keydown(function(t) {
            if (n && (t.keyCode == r || t.keyCode == u)) return !1
        });
        $("#plate-present").keydown(function(t) {
            if (n && (t.keyCode == r || t.keyCode == u)) return !1
        })
    })
});
$(".btn-close").on("click", function() {
    CloseModal3DPage()
});
navigator.sayswho = function() {
    var i = navigator.userAgent,
        t, n = i.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    return /trident/i.test(n[1]) ? (t = /\brv[ :]+(\d+)/g.exec(i) || [], "IE " + (t[1] || "")) : n[1] === "Chrome" && (t = i.match(/\b(OPR|Edge)\/(\d+)/), t != null) ? t.slice(1).join(" ").replace("OPR", "Opera") : (n = n[2] ? [n[1], n[2]] : [navigator.appName, navigator.appVersion, "-?"], (t = i.match(/version\/(\d+)/i)) != null && n.splice(1, 1, t[1]), n)
}();
correctCaptchaNew = function() {
    captchaEnabled && grecaptcha.reset();
    App.modal.hide("#modal-recaptcha");
    $("#loading").show();
    switch (CaptchaDataModel.AjaxPostProcessCode) {
        case AjaxPostProcessCodes.OtherPage:
            $("#loading").hide();
            break;
        case AjaxPostProcessCodes.IncomingPageForm:
            AjaxPost(CaptchaDataModel.PostAddress, CaptchaDataModel.DataModel, LandingIncomingFormSuccess, null);
            break;
        case AjaxPostProcessCodes.EndorsmentFromChangeSale:
            AjaxPost(CaptchaDataModel.PostAddress, CaptchaDataModel.DataModel, EndorFormStepOneSuccess, null);
            break;
        case AjaxPostProcessCodes.EndorsmentFromChangePlate:
            AjaxPost(CaptchaDataModel.PostAddress, CaptchaDataModel.DataModel, EndorFormStepOneSuccess, null);
            break;
        case AjaxPostProcessCodes.RenewalList:
            AjaxPost(CaptchaDataModel.PostAddress, CaptchaDataModel.DataModel, RenewalSearchFormSuccess, null);
            break;
        case AjaxPostProcessCodes.SearchAgency:
            AjaxPost(CaptchaDataModel.PostAddress, CaptchaDataModel.DataModel, CustomersAgencySearchFormSuccess, null);
            break;
        case AjaxPostProcessCodes.RenewalOnUrl:
            RenewalPolicyOnOutLink()
    }
};
var EnvironmentController = {
        IsCaptchaValidate: !0,
        IPBaseCaptchaControl: function() {
            try {
                AjaxPost("/Base/IPBaseCaptchaControl", {}, EnvironmentControllerResults.IPBaseCaptchaControl, null)
            } catch (n) {
                EnvironmentController.IsCaptchaValidate = !0;
                console.log()
            }
        }
    },
    EnvironmentControllerResults = {
        IPBaseCaptchaControl: function(n) {
            EnvironmentController.IsCaptchaValidate = !n.Any;
            console.log(n.Ip)
        }
    },
    ProposalController = {
        AddDiscountForAutoInsIsEvent: !1,
        PushScarabQueueByGetQuotesForm: function(n) {
            var t, r, i;
            try {
                t = "";
                switch (n.IcProdCode) {
                    case ICProdCodes.Build:
                        t = "Konut Sigortası | fiyatı gör";
                        break;
                    case ICProdCodes.PersonalAccident:
                        t = n.IcProdName == "ekstrem" ? "Ekstrem Spor | Fiyat Gör" : "Ferdi Kaza | fiyatı gör";
                        break;
                    case ICProdCodes.Travel:
                        t = "Seyahat sigortası | fiyatı gör";
                        break;
                    case ICProdCodes.DASK:
                        t = "DASK | fiyatı gör";
                        break;
                    case ICProdCodes.Kasko:
                    case ICProdCodes.Kasko_V2:
                    case ICProdCodes.KaskoMoto:
                        i = $("#plate-present-2").val() == "" ? $("#kaskoilkodu option:selected").val() : $("#plate-present-2").val();
                        r = "KASKO";
                        n.IcProdCode == ICProdCodes.KaskoMoto && (r = "KaskoMoto");
                        t = r + " | plaka:" + i + "| fiyatı gör";
                        break;
                    case ICProdCodes.Traffic:
                        i = $("#plate-present").val() == "" ? $("#trafikilkodu option:selected").val() : $("#plate-present").val();
                        t = "Zorunlu trafik sigortası | plaka: " + i + " | fiyatı gör";
                        break;
                    case ICProdCodes.Doctor:
                        t = "Hekim Sorumluluk Sigortası | fiyatı gör"
                }
                t != "" && (ScarabQueue.push(["tag", t]), ScarabQueue.push(["go"]))
            } catch (u) {}
        },
        AddDiscountForAutoIns: function() {
            var t;
            try {
                if (ProposalController.AddDiscountForAutoInsIsEvent) return !1;
                ProposalController.AddDiscountForAutoInsIsEvent = !0;
                var i = $('select[name="percentType"] option:selected').val(),
                    n = $('input[name="percentage-rate"]').val(),
                    r = parseInt(IcProductCode);
                typeof n != "undefined" && n != "" && n != "0" ? (t = {
                    ICProdNo: r,
                    Questions: [{
                        Id: 10593,
                        Value: i + n,
                        Name: "Discount"
                    }]
                }, AjaxPost("/Proposal/SetQuestionAnswerOutParameters", t, ProposalController.AddDiscountForAutoInsSucc, null)) : (ProposalController.AddDiscountForAutoInsIsEvent = !1, BlockErrorMessage("body", '<b style="color:#eb1c74">' + langData.PleaseSpecifyDiscountRate + "<\/b>"))
            } catch (u) {
                console.log("ProposalController.AddDiscountForAutoIns | does not work.")
            }
        },
        AddDiscountForAutoInsSucc: function(n) {
            ProposalController.AddDiscountForAutoInsIsEvent = !1;
            n.IsOK && QuestionsValuePost()
        }
    },
    SFSHelperController = {
        CurrentBmvProdNo: 0,
        QuestionAnswers: [],
        Year: "2019",
        FormExcelImportData: null,
        NetworkConnErrViewCounter: 0,
        TravelCurrentPackage: 0,
        PersonalAccidentTab: 0,
        StepInfos: [{
            StepCode: 1,
            StepTrUrl: "SigortaliBilgileri",
            StepEnUrl: "InsuredInformation"
        }, {
            StepCode: 2,
            StepTrUrl: "BilgiGirisi",
            StepEnUrl: "EntryInfo"
        }, {
            StepCode: 3,
            StepTrUrl: "FiyatTeklifi",
            StepEnUrl: "Bid"
        }, {
            StepCode: 4,
            StepTrUrl: "Odeme",
            StepEnUrl: "Payment"
        }, {
            StepCode: 5,
            StepTrUrl: "Onay",
            StepEnUrl: "Approval"
        }, {
            StepCode: 6,
            StepTrUrl: "IkinciElIlk",
            StepEnUrl: "SecondHandFirst"
        }, {
            StepCode: 7,
            StepTrUrl: "IkinciElYenileme",
            StepEnUrl: "Renewal"
        }],
        LoadDOMUsageType: function(n, t) {
            switch (n) {
                case BMVProdCodes.Traffic:
                    SFSHelperController.LoadTrafficSpecifyDOMValues(t.landingPageCode, t.year);
                    break;
                case BMVProdCodes.Kasko:
                case BMVProdCodes.Kasko_V2:
                    SFSHelperController.LoadAutoInsUsageType(t.landingPageCode, t.year);
                    break;
                case BMVProdCodes.KaskoMoto:
                    SFSHelperController.LoadAutoInsMotto(t)
            }
        },
        LoadTrafficSpecifyDOMValues: function(n, t) {
            n == "1" && (SFSHelperController.Year = t, SFSHelperController.GetCarBrands(t))
        },
        GetCarBrands: function() {
            var n = [],
                r = {
                    Id: 113,
                    Value: SFSHelperController.Year,
                    ValueText: SFSHelperController.Year
                },
                t, i;
            n.push(r);
            n.push({
                Id: 144,
                Value: "11",
                ValueText: "MOTOSİKLET VE YÜK MOTOSİKLETİ"
            });
            t = 113;
            i = 112;
            AjaxPost("/Proposal/GetCarBrands", {
                qList: n,
                QId: t,
                dQId: i
            }, SFSHelperController.GetCarBrandsSuccess, ddlChangeError)
        },
        GetCarBrandsSuccess: function(n) {
            SFSHelperController.SetCarBrands(n.ResultValue.List);
            SFSHelperController.GetCarTypes()
        },
        SetCarBrands: function(n) {
            var t = $("#selectBrand"),
                i = "";
            $.each(n, function(r, u) {
                n[r].Selected ? (t.append('<option selected="selected" value="' + u.Value + '">' + u.Text + "<\/option>"), i = u.Value) : t.append("<option value='" + u.Value + "'>" + u.Text + "<\/option>")
            });
            t.val(i).trigger("change")
        },
        GetCarTypes: function() {
            var n = [],
                r = {
                    Id: 113,
                    Value: SFSHelperController.Year,
                    ValueText: SFSHelperController.Year
                },
                t, i;
            n.push(r);
            n.push({
                Id: 144,
                Value: "11",
                ValueText: "MOTOSİKLET VE YÜK MOTOSİKLETİ"
            });
            n.push({
                Id: 112,
                Value: "600",
                ValueText: "MOTORSIKLET"
            });
            t = 112;
            i = 114;
            AjaxPost("/Proposal/GetCarTypes", {
                qList: n,
                QId: t,
                dQId: i
            }, SFSHelperController.GetCarTypesSuccess, ddlChangeError)
        },
        GetCarTypesSuccess: function(n) {
            SFSHelperController.SetCarTypes(n.ResultValue.List)
        },
        SetCarTypes: function(n) {
            var t = $("#selectBrandCode"),
                u = "",
                i, f, r, e;
            $.each(n, function(i, r) {
                n[i].Selected ? (t.append('<option selected="selected" value="' + r.Value + '">' + r.Text + "<\/option>"), u = r.Value) : t.append("<option value='" + r.Value + "'>" + r.Text + "<\/option>")
            });
            t.val(u).trigger("change");
            t.trigger("change");
            i = $("#kullanimTarzi");
            i.attr("disabled", !0);
            f = i.find("option:selected").text();
            i.closest(".custom-select").find("span").text(f);
            r = $("#selectVehicleYears");
            e = r.find("option:selected").text();
            r.closest(".custom-select").find("span").text(e)
        },
        LoadAutoInsUsageType: function(n, t) {
            SFSHelperController.Year = t;
            switch (n) {
                case "9":
                    SFSHelperController.GetKaskoCarBrands()
            }
        },
        GetKaskoCarBrands: function() {
            var t = $("#kullanimTarzi"),
                i, r;
            t.val("9").trigger("change");
            t.attr("disabled", !0);
            var n = [],
                u = {
                    Id: 113,
                    Value: SFSHelperController.Year,
                    ValueText: SFSHelperController.Year
                };
            n.push({
                Id: 144,
                Value: "9",
                ValueText: "TRAKTÖR"
            });
            n.push(u);
            i = 113;
            r = 112;
            AjaxPost("/Proposal/GetCarBrands", {
                qList: n,
                QId: i,
                dQId: r
            }, SFSHelperController.GetCarKaskoBrandsSuccess, ddlChangeError)
        },
        GetCarKaskoBrandsSuccess: function(n) {
            SFSHelperController.SetCarBrands(n.ResultValue.List);
            SFSHelperController.GetCarKaskoTypes()
        },
        GetCarKaskoTypes: function() {
            var n = [],
                r = {
                    Id: 113,
                    Value: SFSHelperController.Year,
                    ValueText: SFSHelperController.Year
                },
                t, i;
            n.push({
                Id: 144,
                Value: "9",
                ValueText: "TRAKTÖR"
            });
            n.push(r);
            n.push({
                Id: 112,
                Value: "400",
                ValueText: "ZIRAI TRAKTOR"
            });
            t = 112;
            i = 114;
            AjaxPost("/Proposal/GetCarTypes", {
                qList: n,
                QId: t,
                dQId: i
            }, SFSHelperController.GetCarKaskoTypesSuccess, ddlChangeError)
        },
        GetCarKaskoTypesSuccess: function(n) {
            SFSHelperController.SetCarKaskoTypes(n.ResultValue.List)
        },
        SetCarKaskoTypes: function(n) {
            var t = $("#selectBrandCode"),
                r = "",
                i, u;
            $.each(n, function(i, u) {
                n[i].Selected ? (t.append('<option selected="selected" value="' + u.Value + '">' + u.Text + "<\/option>"), r = u.Value) : t.append("<option value='" + u.Value + "'>" + u.Text + "<\/option>")
            });
            t.val(r).trigger("change");
            t.trigger("change");
            DetectDevice() && (i = $("#kullanimTarzi"), u = i.find('option[value="9"]').text(), i.closest(".custom-select").find("span").text(u))
        },
        InvalidPhoneNumbers: ["1111111", "2222222", "3333333", "4444444", "5555555", "6666666", "7777777", "8888888", "9999999", "1234567", "2345678", "3456789", "9876543", "8765432", "7654321"],
        MobilePhoneControlInClientSide: function(n) {
            var t = {
                    ErrOccurred: !1,
                    Message: "OK"
                },
                i, u, r, f;
            try {
                typeof n != "undefined" && n != "" && (i = n.substring(0, 1) == "0" ? n.substring(1, n.lenght - 1) : n, i.length != 10 ? t.ErrOccurred = !0 : (u = parseInt(i.substring(0, 3)), r = _.contains(operatorCodes, u), r ? (f = n.substring(3, n.lenght), t.ErrOccurred = _.contains(SFSHelperController.InvalidPhoneNumbers, f)) : t.ErrOccurred = !r), t.ErrOccurred && (t.Message = langData.jsEnterValidPhoneNumber))
            } catch (e) {
                t.ErrOccurred = !0;
                t.Message = langData.jsCanNotLeftBlank
            }
            return t
        },
        TravelQuestionAnswer: {
            BeginDate: "",
            EndDate: "",
            TotalDays: 0,
            CountryCode: 0,
            RegionCode: 0,
            CommisionRate: parseFloat(.25)
        },
        IsChangePrimium: !0,
        DOMProposalGuarantee: null,
        TravelCalcPremium: function(n) {
            try {
                if (WebSiteVersion == WebSiteVersions.V2 && SFSHelperController.IsChangePrimium) {
                    SFSHelperController.DOMProposalGuarantee = n;
                    var t = {
                        BmvProductCode: SelectedProposalPacketPrice.BmvProductCode,
                        PackageCode: SelectedProposalPacketPrice.ParamTravelPackageType,
                        Day: SFSHelperController.TravelQuestionAnswer.TotalDays,
                        RegionCode: SFSHelperController.TravelQuestionAnswer.RegionCode,
                        CountryCode: SFSHelperController.TravelQuestionAnswer.CountryCode,
                        CommisionRate: SFSHelperController.TravelQuestionAnswer.CommisionRate
                    }
                }
            } catch (i) {}
        },
        TravelCalcPremiumResult: function(n) {
            var i, t;
            console.log(n);
            i = SFSHelperController.DOMProposalGuarantee;
            n.HasError || (t = SelectedProposalPacketPrice.TotalPrice + n.TravelTariff.EK_FIYAT, $('[data-proposal-package-change-id="price"]').text(t.toFixed(2).replace(".", ",")))
        },
        TravelTariffs: [],
        SetTravelTariffs: function() {
            try {
                if (WebSiteVersion == WebSiteVersions.V2) {
                    SFSHelperController.TravelTariffs = [];
                    var n = {};
                    switch (TravelCountries.ActiveTravelTab) {
                        case Enums.TravelActiveTabs.Abroad:
                            n[0] = SehayatQuickPackageTypes.DAR;
                            n[1] = SehayatQuickPackageTypes.GENIS;
                            break;
                        case Enums.TravelActiveTabs.Domestic:
                            n[0] = SehayatQuickPackageTypes.Domestic;
                            break;
                        case Enums.TravelActiveTabs.Student:
                            n[0] = SehayatQuickPackageTypes.Student
                    }
                    $.each(n, function(n, t) {
                        $(".proposal-guarantee-selection").each(function() {
                            try {
                                var r = $(this).attr("name"),
                                    u = $(this).data("id"),
                                    n = parseInt($(this).data("qcode")),
                                    f = $(this).data("qvalue"),
                                    e = $(this).data("defvalue"),
                                    i = {
                                        CoverageCode: n,
                                        BmvProductCode: 5,
                                        PackageCode: t,
                                        Day: SFSHelperController.TravelQuestionAnswer.TotalDays,
                                        RegionCode: SFSHelperController.TravelQuestionAnswer.RegionCode,
                                        CountryCode: SFSHelperController.TravelQuestionAnswer.CountryCode,
                                        CommisionRate: SFSHelperController.TravelQuestionAnswer.CommisionRate
                                    };
                                AjaxPost("/Proposal/TravelCalcPremium", i, SFSHelperController.TravelCalcPremiumAddListResult, null)
                            } catch (o) {
                                console.log("Ex: 20190827_err0038")
                            }
                        })
                    })
                }
            } catch (t) {}
        },
        TravelCalcPremiumAddListResult: function(n) {
            n.HasError || SFSHelperController.TravelTariffs.push(n.TravelTariff)
        },
        SetTravelGrossPremium: function() {
            var r, n, t, i;
            try {
                r = parseInt(IcProductCode);
                n = 0;
                SelectedProposalPacketPrice.Coverages.length != 0 && (t = _.where(SelectedProposalPacketPrice.Coverages, {
                    IsChecked: !0
                }), n = SelectedProposalPacketPrice.Price, _.findWhere(t, {
                    CoverageCode: 6078
                }) !== undefined && (i = _.where(SFSHelperController.TravelTariffs, {
                    QuestionCode: 6078,
                    PAKET: SelectedProposalPacketPrice.ParamTravelPackageType
                }), n = i[0].TOPLAM_FIYAT * (TravelInsureds.length + 1)), $.each(t, function(t, i) {
                    var r = _.where(SFSHelperController.TravelTariffs, {
                        QuestionCode: i.CoverageCode,
                        PAKET: SelectedProposalPacketPrice.ParamTravelPackageType
                    });
                    i.CoverageCode == 6079 && (n += r[0].COVID_PRICE * (TravelInsureds.length + 1))
                }));
                SelectedProposalPacketPrice.TotalPrice = n
            } catch (u) {}
        },
        FindQuestionAnswer: function(n) {
            return _.find(SFSHelperController.QuestionAnswers, function(t) {
                return t.Id == n
            })
        },
        GetQuestionValue: function(n) {
            var t = "";
            try {
                t = SFSHelperController.FindQuestionAnswer(n).Value
            } catch (i) {
                t = ""
            }
            return t
        },
        GetQuestionValueText: function(n) {
            var t = "";
            try {
                t = SFSHelperController.FindQuestionAnswer(n).ValueText
            } catch (i) {
                t = ""
            }
            return t
        },
        SetNewUrlByUsageType: function(n) {
            try {
                var t = parseInt(getParameterByName("prodNo"));
                switch (t) {
                    case BMVProdCodes.Kasko:
                    case BMVProdCodes.Kasko_V2:
                        n == 9 && window.history.pushState("", "", "/Proposal/Index?prodNo=" + BMVProdCodes.KaskoTractor + "=bilgi-girisi");
                        break;
                    case BMVProdCodes.KaskoTractor:
                        n != 9 && window.history.pushState("", "", "/Proposal/Index?prodNo=" + SFSHelperController.CurrentBmvProdNo + "=bilgi-girisi")
                }
            } catch (i) {
                console.log("Exc:SetNewUrlByUsageType")
            }
        },
        LoadAutoInsMotto: function(n) {
            var t, i;
            try {
                Insured.Address = n.Address;
                SFSHelperController.GetCarBrands("");
                t = $("#kullanimTarzi");
                t.val("11").trigger("change");
                t.attr("disabled", !0);
                i = t.find("option:selected").text();
                t.closest(".custom-select").find("span").text(i)
            } catch (r) {
                console.log("Exc.LoadAutoInsMotto")
            }
        },
        GetCustomerInfo: function(n) {
            try {
                App.block("body", {
                    message: langData.jsQuestioned
                });
                AjaxPost("/Proposal/GetCustomerInfo", n, function(n) {
                    App.unblock("body");
                    n.success ? ($("#person-name").val(n.data.name + " " + n.data.surname), $('input[data-qid="3601"]').val(n.data.UnitNo)) : ($("#person-name").val(""), $('input[data-qid="3601"]').val(""), BlockErrorMessage("body", '<b style="color:#eb1c74">' + n.Messages + "<\/b>"))
                }, null)
            } catch (t) {}
        },
        CustomerIDInputChangeEvent: function() {
            var n = $(this).val(),
                i = $(".parsley-trigger"),
                t;
            n.length == 11 ? (t = {
                IDENTITY_NO: n,
                ICProdNo: ICProdCodes.KaskoMoto.toString(),
                BMV_PRODUCT_NO: BMVProdCodes.KaskoMoto.toString(),
                InsuredType: "Insured",
                ParentType: ParentTypes.None
            }, SFSHelperController.GetCustomerInfo(t)) : i.find(".parsley-errors-list").fadeIn()
        },
        PageScrooling: function(n) {
            try {
                $("html, body").animate({
                    scrollTop: $(n).offset().top - App.headerHeight() - 200
                }, 1e3)
            } catch (t) {}
        },
        ClearSessionData: function(n) {
            try {
                App.block("body", {
                    message: ""
                });
                AjaxPost("/Home/ClearSessionData", n, function(n) {
                    App.unblock("body");
                    n.ErrorOccurred || (InsurerListControl = [])
                }, null)
            } catch (t) {}
        },
        LoadVehicleValues: function() {
            try {
                AjaxPost(KaskoDegerListesiPageModel.PostAddress, KaskoDegerListesiPageModel, SFSHelperController.LoadVehicleValuesResult, null)
            } catch (n) {
                $("#vehicle-cost").fadeIn()
            }
        },
        LoadVehicleValuesResult: function(n) {
            var t, i, r;
            try {
                t = $(n.TargetDOMKey);
                n.HasError ? t.fadeOut() : (i = n.VehicleBrands, i.length == 1 && (r = i[0].DESCRIPTION + " TL", t.find(".vehicle-card-price")[0].innerHTML = r, t.fadeIn()))
            } catch (u) {}
        },
        TRLocaleString: function(n) {
            var t = n.toString(),
                i, r;
            try {
                i = new Number(n);
                r = {
                    style: "currency",
                    currency: "TRY"
                };
                t = i.toLocaleString("tr-TR", r)
            } catch (u) {
                t = n.toString()
            }
            return t
        },
        GetBrowserInfo: function() {
            var n = {
                    ErrorOccurred: !1
                },
                t;
            try {
                n.IsMobile = DetectDevice();
                n.UserAgent = navigator.userAgent;
                t = navigator.connection;
                typeof t != "undefined" && t != null && (n.NetDownlink = t.downlink, n.NetEffectiveType = t.effectiveType, n.NetRtt = t.rtt)
            } catch (i) {
                n.ErrorOccurred = !0
            }
            return n
        },
        SetBrowserInfo: function() {
            try {
                var n = SFSHelperController.GetBrowserInfo();
                !n.ErrorOccurred
            } catch (t) {}
        },
        GetRedirectUrl: function() {
            var n = "/",
                i, r, t;
            try {
                if (i = _.find(ProductsInfo, function(n) {
                    return n.BmvProdCode == SFSHelperController.CurrentBmvProdNo
                }), typeof i != "undefined" && i != null) {
                    if (n = i.TRLandingPageUrl, SFSHelperController.CurrentBmvProdNo == BMVProdCodes.Travel) switch (SFSHelperController.TravelCurrentPackage) {
                        case Enums.TravelActiveTabs.Abroad:
                            n = "/seyahat-sigortasi";
                            break;
                        case Enums.TravelActiveTabs.Domestic:
                            n = "/seyahat-sigortasi-yurtici";
                            break;
                        case Enums.TravelActiveTabs.Incoming:
                            n = "/seyahat-sigortasi-incoming";
                            break;
                        case Enums.TravelActiveTabs.Student:
                            n = "/ogrenci-seyahat-sigortasi"
                    }
                    if ((SFSHelperController.CurrentBmvProdNo == BMVProdCodes.ExtremSports || SFSHelperController.CurrentBmvProdNo == BMVProdCodes.PersonalAccident) && (t = parseInt(getURIParameter("prodNo")), t == BMVProdCodes.ExtremSports)) {
                        n = "/Ferdi-Kaza-Sigortasi-ekstrem";
                        switch (SFSHelperController.PersonalAccidentTab) {
                            case Enums.PersonalAccidentTabs.Ski:
                                n = "/Ferdi-Kaza-Sigortasi-ekstrem-kayak";
                                break;
                            case Enums.PersonalAccidentTabs.Mountaineering:
                                n = "/Ferdi-Kaza-Sigortasi-ekstrem-dagcilik";
                                break;
                            case Enums.PersonalAccidentTabs.Dive:
                                n = "/Ferdi-Kaza-Sigortasi-ekstrem-dalis";
                                break;
                            case Enums.PersonalAccidentTabs.Sail:
                                n = "/Ferdi-Kaza-Sigortasi-ekstrem-yelken";
                                break;
                            case Enums.PersonalAccidentTabs.XXL:
                                n = "/Ferdi-Kaza-Sigortasi-ekstrem-xxl"
                        }
                    }(SFSHelperController.CurrentBmvProdNo == BMVProdCodes.Kasko_V2 || SFSHelperController.CurrentBmvProdNo == BMVProdCodes.Kasko) && (t = parseInt(getURIParameter("prodNo")), t == 88 && (n = "/traktor-kasko"));
                    SFSHelperController.CurrentBmvProdNo == BMVProdCodes.Traffic && (t = parseInt(getURIParameter("prodNo")), t == 99 && (n = "/motosiklet-sigortasi"))
                } else if (r = parseInt(getURIParameter("prodNo")), typeof r != "undefined" && r != null) {
                    if (t = parseInt(getURIParameter("prodNo")), t == BMVProdCodes.ExtremSports) {
                        n = "/Ferdi-Kaza-Sigortasi-ekstrem";
                        switch (SFSHelperController.PersonalAccidentTab) {
                            case Enums.PersonalAccidentTabs.Ski:
                                n = "/Ferdi-Kaza-Sigortasi-ekstrem-kayak";
                                break;
                            case Enums.PersonalAccidentTabs.Mountaineering:
                                n = "/Ferdi-Kaza-Sigortasi-ekstrem-dagcilik";
                                break;
                            case Enums.PersonalAccidentTabs.Dive:
                                n = "/Ferdi-Kaza-Sigortasi-ekstrem-dalis";
                                break;
                            case Enums.PersonalAccidentTabs.Sail:
                                n = "/Ferdi-Kaza-Sigortasi-ekstrem-yelken";
                                break;
                            case Enums.PersonalAccidentTabs.XXL:
                                n = "/Ferdi-Kaza-Sigortasi-ekstrem-xxl"
                        }
                    }
                    t == 88 && (n = "/traktor-kasko");
                    t == 99 && (n = "/motosiklet-sigortasi")
                }
            } catch (u) {
                n = "/"
            }
            return n
        },
        DataLayerPushUserType: function() {
            try {
                var t = "Bireysel",
                    n = $("[data-login-user-type]").attr("data-login-user-type");
                typeof n != "undefined" && n != null && n != "" && n != "" && (t = n);
                dataLayer.push({
                    acente_musteri_tipi: t
                })
            } catch (i) {}
        }(),
        DataLayerPushVirtualPageView: function(n) {
            try {
                dataLayer.push({
                    pageView: n,
                    event: "virtualPageView"
                })
            } catch (t) {}
        },
        DataLayerPushStepVirtualPath: function(n) {
            var t, i;
            try {
                t = "";
                SFSHelperController.CurrentBmvProdNo != 0 && (t = SFSHelperController.GetRedirectUrl(), i = _.find(SFSHelperController.StepInfos, function(t) {
                    return t.StepCode == n
                }), typeof i != "undefined" && i != null && t != "" && (t += "/" + i.StepTrUrl));
                t != "" && SFSHelperController.DataLayerPushVirtualPageView(t)
            } catch (r) {}
        },
        DataLayerAutoPushThisStep: function() {
            try {
                var t = 2,
                    n = getURIParameter("step");
                typeof n != "undefined" && n != null && (SFSHelperController.CurrentBmvProdNo = parseInt(getURIParameter("prodNo")), n == "satin-al" && (t = 4));
                SFSHelperController.DataLayerPushStepVirtualPath(t)
            } catch (i) {}
        },
        LoadOtherInsuranceExcel: function() {
            try {
                var n = new FormData;
                n = CommonHelper.InjectFormDataEntries(n, SFSHelperController.FormExcelImportData);
                n.append("ExcelFile", $("#LoadOtherInsurance").val().trim().toString());
                AjaxPost("/Products/LoadOtherInsuranceExcel", n, CommonHelper.LoadOtherInsuranceExcelResult, null)
            } catch (t) {}
        },
        GoPaymentStepBySetCoverages: function() {
            var n = $($("#BtnGoPaymentPage").data("steps"));
            App.seyahat.changeStep(n, 4)
        }
    },
    CommonHelper = {
        InjectFormDataEntries: function(n, t) {
            try {
                for (var i of t.entries()) n.append(i[0], i[1])
            } catch (r) {
                console.log("Hata: " + t)
            }
            return n
        },
        LoadOtherInsuranceExcelResult: function(n) {
            var f, t, i, r;
            try {
                if (App.unblock("body"), n.HasError) BlockErrorMessage("body", '<b style="color:#eb1c74">' + n.Message + "<\/b>");
                else if (document.getElementById("excelErrorUlObj").innerHTML = "", f = '<li class="list-group-item sfsBorderBottom"><b class="col-md-4">{0}<\/b> : {1}<\/li>', t = "", n.OtherInsureds.length >= 1 && (i = _.filter(n.OtherInsureds, function(n) {
                    return n.HasError == !0
                }), r = _.filter(n.OtherInsureds, function(n) {
                    return n.HasError == !1
                }), i.length >= 1 && (i.forEach(n => {
                    var i = f;
                    t += i.replace("{0}", n.IdentityNo).replace("{1}", n.ErrorMessage)
                }), document.getElementById("excelErrorUlObj").innerHTML = t, App.modal.show("#modal-excel-errors")), r.length >= 1)) {
                    var u = $("[data-query-traveler]"),
                        o = u.parents("form"),
                        s = u.parents(".input-group").find("input"),
                        e = $(u.data("clone"));
                    r.forEach(n => {
                        var r = _.filter(TravelInsureds, function(t) {
                                return t.IdentityNumber === n.IdentityNo && _.has(t, "IdentityNumber")
                            }).length > 0 ? !0 : !1,
                            i, t;
                        r || TravelInsureds.push({
                            IdentityNumber: n.IdentityNo,
                            Name: n.name,
                            Surname: n.surname
                        });
                        t = $("#traveler-items .traveler-item").length;
                        i = e.clone();
                        i.attr("id", "");
                        i.removeClass("hidden");
                        i.find("input, select").each(function() {
                            $(this).attr("name", $(this).attr("name").replace(/[0-9]/, n.IdentityNo));
                            $(this).val("");
                            $(this).hasClass("select-dynamic") && $(this).select2({
                                placeholder: "Seçiniz",
                                width: "100%",
                                theme: "qs"
                            })
                        });
                        $appended = i.appendTo("#traveler-items");
                        $appended.find(".traveler-result-name").text(n.name + " " + n.surname);
                        $appended.attr("data-traveler-key", n.IdentityNo);
                        $appended.attr("data-traveler-identity", n.IdentityNo);
                        $item = $('<div class="travelers-list-item text-block" data-traveler-key="' + n.IdentityNo + '" data-traveler-identity="' + n.IdentityNo + '"><div class="text-block-title"><span class="traveler-number">' + (t + 2) + '<\/span>. Sigortalı<\/div><div class="text-block-text">' + n.name + " " + n.surname + "<\/div>NaN");
                        $item.appendTo("#travelers-list");
                        t = $("#traveler-items .traveler-item").length;
                        $("[data-traveler-count]").text(t + 1);
                        t > 0 ? $("#traveler-list").fadeIn(function() {
                            $(window).trigger("resize")
                        }) : $("#traveler-list").fadeOut(function() {
                            $(window).trigger("resize")
                        })
                    })
                }
            } catch (h) {
                App.unblock("body")
            }
            $("#LoadOtherInsurance").val("")
        },
        AutoInsuranceCoveragesModalOper: function(n) {
            try {
                switch (n) {
                    case "110_103_1":
                        CommonHelper.ShowTableColumn("#table-assurance-casco", 4);
                        break;
                    case "110_103_2":
                        CommonHelper.ShowTableColumn("#table-assurance-casco", 3);
                        break;
                    case "110_103_3":
                        CommonHelper.ShowTableColumn("#table-assurance-casco", 2);
                        break;
                    case "110_103_4":
                        CommonHelper.ShowTableColumn("#table-assurance-casco", 1)
                }
                $('a[name="a-assurance-btn"]').hasClass("displayNoneImport") && $('a[name="a-assurance-btn"]').removeClass("displayNoneImport")
            } catch (t) {
                console.log("CommonHelper.AutoInsuranceCoveragesModalOper() | It did not work.")
            }
        },
        HideTableColumn: function(n, t) {
            try {
                $(n + " td:nth-child(" + (t + 1) + ")").hide()
            } catch (i) {
                console.log("CommonHelper.HideTableColumn() | It did not work.")
            }
        },
        ShowTableColumn: function(n, t) {
            try {
                $(n + " td:nth-child(" + (t + 1) + ")").show()
            } catch (i) {
                console.log("CommonHelper.ShowTableColumn() | It did not work.")
            }
        }
    };
(function(n) {
    n('select[data-change-event-listen="true"]').on("change", function() {
        var r, t;
        try {
            var i = n(this),
                u = i.attr("data-change-event-listen-key"),
                f = i.val();
            switch (u) {
                case "#AutoInsUsageTypes":
                    SFSHelperController.CurrentBmvProdNo == BMVProdCodes.Kasko_V2 && (r = [1, 6], t = _.contains(r, parseInt(f)), n("#AutoInsuredJob").prop("disabled", !t), t || n("#AutoInsuredJob").val(0).trigger("change"))
            }
        } catch (e) {}
    })
})(window.jQuery);
$("body").on("change", 'input[type=radio][name="payment-method"]', function() {
    try {
        $("#creditcard-proposal").trigger("focusout")
    } catch (n) {}
});
$('input[name="sigortaEttiren"]').on("click", function() {
    var t = $(this).val() == "no",
        n;
    t && InsurerListControl.length > 0 && (n = {
        stateKey: 1
    }, SFSHelperController.ClearSessionData(n))
});
$("#LoadOtherInsurance").change(function(n) {
    if (n.preventDefault(), window.FormData !== undefined) {
        var i = this.files[0],
            t = new FormData;
        t.append(i.name, i);
        t.append("ExcelFile", "this.xls");
        App.block("body", {
            message: langData.jsQuestioned
        });
        $.ajax({
            url: "/Products/LoadOtherInsuranceExcel",
            type: "POST",
            contentType: !1,
            processData: !1,
            data: t,
            success: CommonHelper.LoadOtherInsuranceExcelResult,
            error: function(n) {
                console.log(n.statusText)
            }
        })
    } else console.log("FormData is not supported.");
    return !0
});
PaymentHelper = {
    PendingApproveResponse: !1,
    PaymentTestMethod: function() {
        AjaxPost("/Proposal/PaymentTestMethod", {}, PaymentHelper.ThreeDPaymentOperationCompletedTest, null)
    },
    ThreeDPaymentOperationCompletedTest: function(n) {
        document.contains(document.getElementById("ifrPayment3D")) && document.getElementById("ifrPayment3D").remove();
        var t = document.createElement("iframe");
        t.id = "ifrPayment3D";
        t.name = "ifrPayment3D";
        t.src = "about:blank";
        t.className = "ifrPayment3D";
        t.onload = function() {
            var i = t.contentDocument || t.contentWindow.document;
            i.body.innerHTML = n.HtmlResult
        };
        document.getElementById("testFrameContent").appendChild(t)
    },
    ThreeDPaymentOperationCompleted: function() {
        try {
            PaymentHelper.PendingApproveResponse = !0;
            var n = $("#ifrPayment3D")[0];
            n.contentWindow.document.getElementsByTagName("form")[0].submit()
        } catch (t) {
            console.log(t)
        }
    },
    ApprovePolicyOnbeforeunload: function(n) {
        try {
            if (PaymentHelper.PendingApproveResponse) {
                var t = langData.msgProcessingPleaseWait;
                return (n || window.event).returnValue = t, t
            }
        } catch (n) {}
    },
    MessageEventListenerInFrame: function() {
        try {
            var n = window.addEventListener ? "addEventListener" : "attachEvent",
                t = window[n],
                i = n === "attachEvent" ? "onmessage" : "message";
            t(i, function(n) {
                var r = !1,
                    t, i;
                try {
                    (n.data === "PendingApproveResponse" || n.message === "PendingApproveResponse" || n.data.startsWith("[PaymentErrorCatch]")) && (PaymentHelper.PendingApproveResponse = !0);
                    n.data !== null && (t = n.data.toString(), t.startsWith("[PaymentErrorCatch]") && (r = !0, t = t.replace("[PaymentErrorCatch]", "").split("[-]"), i = JSON.parse(t[0]), i.IsClientRequest = !0, i.ClientSideErrorMessage = t[1], AjaxPost("/Proposal/ApproveWithPayment3D", i, ThreeReturn, ThreeDCancelPayment)))
                } catch (n) {
                    r && ThreeDCancelPaymentSubMethod("EventListenerError: " + n.message)
                }
            })
        } catch (r) {
            PaymentHelper.PendingApproveResponse = !1
        }
    }
};
OnlineTransactionsController = {
    Repository: {
        PolicyProposalCollection: []
    },
    GetPolicyProposalList: function(n) {
        OnlineTransactionsController.Repository.PolicyProposalCollection = [];
        $('section[data-list-box-id="policies"]').html("");
        App.block("body", {
            message: '<b style="color:#eb1c74;">Sorgulanıyor...<\/b>'
        });
        AjaxPost("/OnlineTransactions/GetPolicyProposalList", n, OnlineTransactionsController.GetPolicyProposalListSucc, null)
    },
    GetPolicyProposalListSucc: function(n) {
        var t, i, r;
        App.unblock("body");
        t = $('section[data-list-box-id="policies"]');
        t.html("");
        n.ResultType != ResultTypes.Message ? (i = n.ResultValue, OnlineTransactionsController.Repository.PolicyProposalCollection = i, r = "", $.each(i, function(n, t) {
            var u = $('div[data-list-box-id="content"]').clone(),
                i = u.html();
            i = i.replace("{PRODUCT_NAME}", t.PRODUCT_NAME);
            i = i.replace("{PRODUCT_NO}", t.PRODUCT_NO);
            i = i.replace("{CONFIRM_DATE}", t.CONFIRM_DATE);
            i = i.replace("{POLICY_NO}", t.POLICY_NO);
            i = i.replace("{RENEWAL_NO}", t.RENEWAL_NO);
            i = i.replace("{ENDORS_NO}", t.ENDORS_NO);
            i = t.CUR_TYPE == "TL" ? i.replace("{LC_GROSS_PREMIUM}", t.LC_GROSS_PREMIUM) : i.replace("{LC_GROSS_PREMIUM}", t.GROSS_PREMIUM);
            i = i.replace("{CUR_TYPE}", t.CUR_TYPE);
            i = i.replace("{ROW_ID}", t.ROW_ID);
            r += i
        }), t.html(r)) : BlockErrorMessage("body", '<b style="color:#eb1c74">' + n.ResultValue + "<\/b>")
    },
    PrintPolicyByKeys: function(n) {
        try {
            var t = _.find(OnlineTransactionsController.Repository.PolicyProposalCollection, function(t) {
                return t.ROW_ID == n
            });
            App.block("body", {
                message: '<b style="color:#eb1c74;">Lütfen bekleyin...<\/b>'
            });
            AjaxPost("/OnlineTransactions/PrintPolicyByKeys", t, OnlineTransactionsController.PrintPolicyByKeysSucc, null)
        } catch (i) {
            BlockErrorMessage("body", '<b style="color:#eb1c74">Browser tarafından teknik bir sorun oluştu.<\/b>')
        }
    },
    PrintPolicyByKeysSucc: function(n) {
        if (App.unblock("body"), n.ResultType != ResultTypes.Message) {
            var t = n.ResultValue,
                i = {
                    ResultType: ResultTypes.Data
                };
            OpenInNewTab(langData.jsReadyForYourPol, n.ResultValue.Link)
        } else BlockErrorMessage("body", '<b style="color:#eb1c74">' + n.ResultValue + "<\/b>")
    }
};
$(".btn-traffic").click(function() {
    $("#plate-present").val($("#plate-present-2").val());
    $("#trafiktcno").val($("#kaskotcno").val());
    $("#trafikemail").val($("#kaskoemail").val())
});
$(".btn-insurance").click(function() {
    $("#plate-present-2").val($("#plate-present").val());
    $("#kaskotcno").val($("#trafiktcno").val());
    $("#kaskoemail").val($("#trafikemail").val())
});
correctCaptcha = function() {
    AjaxPost("/Home/GetCaptchaControl", {
        response: $(".g-recaptcha-response").val(),
        challange: ""
    }, getCapthaScreenSuccess, getCapthaScreenError)
};
LoginCustomerType = "Bireysel";
$(".CreateAccount").on("click", function() {
    var n = $("#modal-auth > .signup-form > .form-row").validationEngine("validate");
    $(".formErrorContent").remove();
    $(".formErrorArrow").remove();
    n && CreateAccount(this)
});
$(".Login").on("click", function() {
    var n = $("#modal-auth > .login-form > .form-row").validationEngine("validate");
    $(".formErrorContent").remove();
    $(".formErrorArrow").remove();
    n && Login(this)
});
ModalEnable = !1;
$(".AgencyLogin").on("click", function() {
    var n = $("#modal-agency > .form-row").validationEngine("validate");
    $(".formErrorContent").remove();
    $(".formErrorArrow").remove();
    n && AgencyLogin()
});
imageUploadControl = !1;
$("#ImageSaved").change(function() {
    if (window.FormData !== undefined) {
        var n = this.files[0],
            t = new FormData;
        t.append(n.name, n);
        $.ajax({
            url: "/OnlineTransactions/UploadUserPhoto",
            type: "POST",
            contentType: !1,
            processData: !1,
            data: t,
            success: function(n) {
                n.isError ? errorModal(globalErrorTag, SistemUyarisiBasligi, n.message) : (imageUploadControl = !0, $("#profilePicture").attr({
                    src: n.img
                }))
            },
            error: function(n) {
                console.log(n.statusText)
            }
        })
    } else console.log("FormData is not supported.")
});
claimFormType = "";
claimProdName = "";
var wHeight = 500,
    globalErrorTag = langData.Error,
    oldPrice = "";
Next = {
    ProposalsScreenSuccess: function(n) {
        var t, u, i, r;
        $("#loading").hide();
        $(".btn-submit").attr("disabled", !1);
        console.log("*** ProposalsScreenSuccess ***");
        switch (n.ResultType) {
            case 1:
                t = !1;
                typeof n.ResultValue.Data != "undefined" && n.ResultValue.Data.TimeoutMessage ? typeof cookiesModel.cookieAgency != "undefined" ? (ModalSessionTimeout(globalErrorTag, SistemUyarisiBasligi, n.ResultValue.Data.ErrorMessage), t = !0) : typeof cookiesModel.cookieUser != "undefined" ? (ModalSessionTimeout(globalErrorTag, SistemUyarisiBasligi, n.ResultValue.Data.ErrorMessage), t = !0) : (n.ResultValue.Data.ErrorMessage.indexOf("Oturum") >= 0 ? ModalSessionTimeout(globalErrorTag, SistemUyarisiBasligi, n.ResultValue.Data.ErrorMessage) : SFSHelperController.CurrentBmvProdNo == BMVProdCodes.Travel && TravelCountries.ActiveTravelTab == Enums.TravelActiveTabs.Student && ($("#proposal-seyahat").data("wizard").go(2, function() {
                    $('div[data-step="3"')[1].style.display = null
                }), errorModal(globalErrorTag, SistemUyarisiBasligi, n.ResultValue.Data.ErrorMessage)), t = !0) : (u = GenelSistemUyarisi, typeof n.ResultValue == "string" && n.ResultValue != "" && (u = n.ResultValue), errorModal(globalErrorTag, SistemUyarisiBasligi, u), t = !0);
                n.ResultType == "undefined" || n.ResultValue == "" || t || errorModal(globalErrorTag, SistemUyarisiBasligi, n.ResultValue);
                break;
            case 2:
                $("#proposalStep1").find(".QustionScreen").remove();
                $("#proposalStep1").css("display", "block").find(".renderhtml").html(n.ResultValue);
                console.log("Case: 2");
                i = window.location.href.split("=")[1];
                r = createSubProdQueryUrl();
                window.history.pushState("", "", "/Proposal/Index?prodNo=" + i + "=bilgi-girisi" + r);
                App.customSelect.init();
                App.radioSelect.init();
                App.form.init();
                $('select[data-dynamic="true"]').change(ddlChange);
                dynamicQuestion();
                $("#step1").removeClass("active");
                $("#step1").addClass("visited");
                $("#step2").removeClass("passive");
                $("#step2").addClass("active");
                $("#step2PassiveArrow").hide();
                $("#step2ActiveArrow").show();
                $("#screen-ikinciel").length != 0 && ($("#step1Text > p").html(langData.jsFillFormAfterSpecialInst.replace("{0}", '<a data-modal-target="#modal-installment-plan-9">')), $("#step1Text > p").html(langData.jsRegistrySerialLicenceNo), App.modal.init());
                break;
            case 3:
                location.href = n.ResultValue;
                break;
            case 4:
                $("#hdnVehicleBrandYears").val(n.ResultValue.Data.ListData.Model);
                $("#hdnMotorNo").val(n.ResultValue.Data.ListData.MotorNo);
                $("#hdnSasiNo").val(n.ResultValue.Data.ListData.SasiNo);
                QuestionsValuePost();
                break;
            case 5:
                i = window.location.href.split("=")[1];
                $("#proposalStep1").hide();
                $("#proposalStep2").css("display", "block").find(".renderhtml").html("").html(n.ResultValue);
                $(".proposal-guarantee").addClass("displayNoneImport");
                $(".proposal-guarantee").hide();
                r = createSubProdQueryUrl();
                window.history.pushState("", "", "/Proposal/Index?prodNo=" + i + "=fiyat-gor" + r);
                window.scrollTo(0, 0);
                App.customSelect.init();
                App.radioSelect.init();
                PesinHasarsizlik();
                $("#step1").removeClass("active");
                $("#step1").addClass("visited");
                $("#step2").removeClass("passive");
                $("#step2").addClass("active");
                $("#step2PassiveArrow").hide();
                $("#step2ActiveArrow").show();
                break;
            case 6:
                typeof n.ResultValue.Data.UserLoginControl != "undefined" && n.ResultValue.Data.UserLoginControl ? App.modal.show("#modal-auth", !0) : typeof n.ResultValue.Data.AgencyLoginControl != "undefined" && n.ResultValue.Data.AgencyLoginControl && App.modal.show("#modal-agency", !0);
                break;
            default:
                window.location.href = n.ResultValue
        }
    },
    Fail: function() {
        $("#loading").hide();
        $(".btn-submit").attr("disabled", !1);
        errorModal(globalErrorTag, SistemUyarisiBasligi, GenelSistemUyarisi)
    }
};
bmvprodcodeOnlineTras = "";
SFSPostToNewWindow = function(n, t) {
    $("#loading").hide();
    var u = this,
        r = n,
        i = {},
        f = t || {};
    this.setPostValue = function(n, t) {
        i[n] = t
    };
    this.submit = function() {
        var n = document.createElement("form"),
            t;
        n.setAttribute("method", "post");
        n.setAttribute("action", r);
        n.setAttribute("target", "ifrPayment3D");
        for (name in i) t = document.createElement("input"), t.setAttribute("type", "hidden"), t.setAttribute("name", name), t.value = i[name], n.appendChild(t);
        document.getElementsByTagName("body")[0].appendChild(n);
        n.submit();
        document.getElementsByTagName("body")[0].removeChild(n)
    }
};
PrintHelper = {
    PrintDocumentClickFlag: !1,
    PrintDocument: function(n, t, i, r, u, f) {
        try {
            if (PrintHelper.PrintDocumentClickFlag) return !1;
            PrintHelper.PrintDocumentClickFlag = !0;
            typeof f != "undefined" && f || $("#loading").show();
            asyncPrint = f;
            AjaxPost("/Proposal/PrintDocument", {
                ICNoAndProdNo: n,
                documentTypeCode: u,
                icPolicyNo: r,
                packageType: t,
                claimType: i
            }, PrintHelper.PrintDocumentResult, PrintHelper.PrintDocumentServerErrorResult)
        } catch (e) {
            PrintHelper.PrintDocumentClickFlag = !1;
            console.log("Client Side Exc.: PrintHelper.PrintDocument.Exc.")
        }
    },
    PrintDocumentResult: function(n) {
        $("#loading").hide();
        PrintHelper.PrintDocumentClickFlag = !1;
        switch (n.ResultType) {
            case 1:
                errorModal(globalErrorTag, SistemHatasiBasligi, n.ResultValue.Data.Message);
                break;
            case 4:
                globalErrorTag = langData.jsReadyForYourPol;
                OpenInNewTab(langData.jsReadyForYourPol, n.ResultValue.Data.Link)
        }
    },
    PrintDocumentServerErrorResult: function() {
        PrintHelper.PrintDocumentClickFlag = !1;
        $("#loading").hide();
        errorModal(globalErrorTag, SistemHatasiBasligi, GenelSistemUyarisi2)
    }
};
Bank = {
    GetBanks: function() {
        AjaxPost("/Proposal/GetAllBanks", null, Bank.BankSuccess, Bank.BankFail)
    },
    BankSuccess: function(n) {
        console.log("BankSuccess");
        n.ResultType == 4 ? FillSelectNotStartWithSharp("#bank-name", n.ResultValue) : window.location.href = n.ResultValue
    },
    BankFail: function() {},
    GetBranches: function(n) {
        var t = $(n).val();
        AjaxPost("/Proposal/GetBranchOfThisBank", {
            BANK_ID: t
        }, Bank.BranchesSuccess, Bank.BranchesFail)
    },
    BranchesSuccess: function(n) {
        if (n.ResultType == 4) {
            $("#bank-office option").length > 0 && $("#bank-office option").remove();
            for (var t = 0; t < n.ResultValue.length; t++) $("#bank-office").append('<option value="' + n.ResultValue[t].Value + '">' + n.ResultValue[t].Text + "<\/option>");
            $("#bank-office").parent(".custom-select").find("span.select-mobile-wrap-3").html(n.ResultValue[0].Text)
        } else window.location.href = n.ResultValue
    },
    BranchesFail: function() {
        $("#ddl307_chosen").attr("disabled", !1)
    }
};
District = {
    listActiveCurrentCityDistricts: function(n) {
        var t = parseInt($(n).val());
        t >= 0 && AjaxPost("/Proposal/listActiveCurrentCityDistrict", {
            cityCode: t
        }, District.Success, District.Fail)
    },
    Success: function(n) {
        FillSelectNotStartWithSharp("#dropDistrict", n);
        $("#dropDistrict").prop("disabled", !1)
    },
    Fail: function(n) {
        console.log(n)
    }
};
$("#ddlApproveInstallment").change(function() {
    $("#VPosID").val($(this).val())
})
