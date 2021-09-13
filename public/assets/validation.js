$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    // özel form validasyonu doğru kimlik durumunda valid
    jQuery.validator.addMethod("confirmIdentity", function (value, element) {
        let isSuccessIdentityValidation = false;
        if (value.length >= 10) {
            $.ajax({
                type: 'GET',
                url: 'https://verify.dijitalacentem.workers.dev/' + value,
                async: false,
                success:
                    function (resp) {
                        isSuccessIdentityValidation = resp.m === true
                    }
            });
            return this.optional(element) || isSuccessIdentityValidation;
        }
        return isSuccessIdentityValidation;
    }, lang.falseID);

    setTrafficAndCascoModalFormValidation();
    setDaskAndResidenceModalFormValidation();
    setTravelModalFormValidation();
    setPersonalAccidentModalFormValidation();
    setRegisterFormValidation();

    setCommonSelects();
    setModalSelects();
});

$("form").submit(function () {
    const form = $(this);
    const formid = form.attr('id');

    if (!form.valid()) {
        return false;
    }

    if (formid === "frm_off_traffic") {
    }

    if (formid === "frm_off_dask") {
    }

    if (formid === "frm_off_travel") {
    }
});


handleCities = async () => {
    let cities = [];
    try {
        cities = await getCities();
        if (cities == null || cities === "null") {
            cities = [];
        } else {
            cities = JSON.parse(cities).d;
            cities = cities.map(c => {
                return {
                    id: c.id,
                    text: c.name
                }
            })
        }
    } catch (_) {
        cities = [];
    }

    return cities;
}

setCommonSelects = async () => {
    const citiesEl = $("select[name='cities']");
    const statesEl = $("select[name='states']");
    const brandEl = $("select[name='brand']");

    const cities = await handleCities();

    citiesEl.select2({
        language: "tr",
        placeholder: lang.selectCity,
        data: cities,
    });
    statesEl.select2({
        minimumResultsForSearch: Infinity,
        language: "tr",
        placeholder: lang.selectStates,
        ajax: {
            url: '/com/states',
            type: 'POST',
            data: function (params) {
                return {id: citiesEl.val()};
            },
            processResults: function (data) {
                try {
                    if (data == null || data === "null") {
                        data = [];
                    } else {
                        data = JSON.parse(data).d;
                    }
                } catch (e) {
                    data = [];
                }
                data = data.map(d => {
                    return {
                        id: d.id,
                        text: d.name
                    }
                })
                return {
                    results: data
                };
            },
            delay: 500,
        }
    });

    /*brandEl.select2({
        disabled: true,
        language: "tr",
        placeholder: "Marka Seçimi",
        ajax: {
            url: '/com/marks',
            type: 'POST',
            data: function (params) {
                let searchText = params.term;
                if (!params.term) {
                    searchText = "";
                }

                let usagetypeVal = usagetypeEl.val();
                let yearVal = yearEl.val();
                if (yearVal === "") {
                    yearVal = 2020;
                }
                return {filter: searchText, year: yearVal, usage: usagetypeVal}
            },
            processResults: function (data) {
                try {
                    if (data == null || data === "null") {
                        data = [];
                    } else {
                        data = JSON.parse(data).d;
                    }
                } catch (e) {
                    data = [];
                }
                data = data.map(d => {
                    return {
                        id: d.markakodu,
                        text: d.marka
                    }
                })
                return {
                    results: data
                };
            },
            delay: 500,
        }
    });*/
}

setModalSelects = () => {
    $("select[name='jobs'],select[name='ex_50001']").select2({
        language: "tr",
        placeholder: lang.selectJobs,
        ajax: {
            url: '/com/jobs',
            type: 'POST',
            data: function (params) {
                let searchText = params.term;
                if (!params.term) {
                    searchText = "";
                }
                return {filter: searchText}
            },
            processResults: function (data) {
                try {
                    if (data == null || data === "null") {
                        data = [];
                    } else {
                        data = JSON.parse(data).d;
                    }
                } catch (e) {
                    data = [];
                }
                data = data.map(d => {
                    return {
                        id: d.j_code,
                        text: d.j_name
                    }
                })
                return {
                    results: data
                };
            },
            delay: 500,
        }
    });

    const travelTypes = [
        {id: "", text: lang.select},
        {id: 1, text: lang.inCountry},
        {id: 2, text: lang.outCountry},
    ];
    $("select[name='travelType']").select2({
        language: "tr",
        placeholder: lang.travelType,
        data: travelTypes,
    });

    const countries = [
        {id: "", text: lang.select},
        {id: 840, text: lang.AllWorld},
        {id: 840, text: lang.chengen},
    ];
    $("select[name='country']").select2({
        language: "tr",
        placeholder: lang.travelCountry,
        data: countries,
    });

    const plateNumbers = [
    //
    ];
    $("select[name='plate']").select2({
        language: "tr",
        placeholder: lang.plaqueNoCity,
        data: plateNumbers,
    });

    // ferdi kaza limitleri
    const limits = [
        {id: "", text: lang.select},
        {id: "50000", text: "50.000,00 ₺"},
        {id: "100000", text: "100.000,00 ₺"},
        {id: "150000", text: "150.000,00 ₺"},
        {id: "200000", text: "200.000,00 ₺"},
    ];
    $("select[name='ex_51114']").select2({
        language: "tr",
        placeholder: lang.personalAccidientLimit,
        data: limits,
    });
}

setTrafficAndCascoModalFormValidation = () => {
    const rules = {
        identity: {
            required: true,
            confirmIdentity: true,
            minlength: 10,
            maxlength: 11
        },
        plate: {
            required: true,
        },
        plateNo: {
            required: false,
            minlength: 1,
            maxlength: 8
        },
        jobs: {
            required: false,
        },
        phoneNumber: {
            required: true,
            minlength: 14,
            maxlength: 14
        },
        contract1: "required",
        contract2: "required",
    };
    const messages = {
        identity: {
            required: lang.noEmptyID,
            minlength: lang.minlengthID,
            maxlength: lang.maxlengthID,
        },
        plate: lang.noEmptyPlateCityCode,
        plateNo: lang.noEmptyPlateNo,
        jobs: lang.noEmptyJob,
        phoneNumber: {
            required: lang.noEmptyPhone,
            minlength: lang.minLenghtPhone,
            maxlength: lang.maxLenghtPhone,
        },
        contract1: lang.checkedKVKK,
        contract2: lang.checkedTIS,
    };
    const errorPlacement = function (error, element) {
        if (element.parent('.input-group').length) {
            error.insertAfter(element.parent());
            // element.parent('.input-group').removeClass("mb-10");
        } else {
            error.insertAfter(element);
        }
    };

    $("form[name='frm_off_traffic']").validate({
        // ignore: [], // for hidden elements *dont ignore*
        rules: rules,
        messages: messages,
        errorPlacement: errorPlacement,
    });
    $("form[name='frm_off_casco']").validate({
        // ignore: [], // for hidden elements *dont ignore*
        rules: rules,
        messages: messages,
        errorPlacement: errorPlacement,
    });
}
setTrafficAndCascoFormValidation = () => {
    const rules = {
        plate: {
            required: true,
        },
        plateNo: {
            required: false,
            minlength: 1,
            maxlength: 8
        },
        usagetype: {
            required: true,
        },
        year: {
            required: true,
        },
        brandid: {
            required: true,
        },
        modelid: {
            required: true,
        },
    };
    const messages = {
        plate: lang.noEmptyPlateCityCode,
        plateNo: lang.noEmptyPlateNo,
        usagetype: lang.noEmptyUsageType,
        year: lang.noEmptyModelYear,
        brandid: lang.noEmptyBrandID,
        modelid: lang.noEmptyModelID,
    };
    const errorPlacement = function (error, element) {
        if (element.parent('.input-group-2').length) {
            error.insertAfter(element.parent());
            // element.parent('.input-group').removeClass("mb-10");
        } else {
            error.insertAfter(element);
        }
    };

    $("form[name='Proposal']").validate({
        // ignore: [], // for hidden elements *dont ignore*
        rules: rules,
        messages: messages,
        errorPlacement: errorPlacement,
    });
}
setTrafficAndCascoFormSelects = () => {
    const plateEl = $("#Proposal select[name='plate']");
    const plateNoEl = $("#Proposal input[name='plateNo']");
    const usagetypeEl = $("#Proposal select[name='usagetype']");
    const yearEl = $("#Proposal select[name='year']");
    const brandidEl = $("#Proposal select[name='brandid']");
    const modelidEl = $("#Proposal select[name='modelid']");

    // const plateNumbers = [
    //     {id: "", text: lang.select},
    //     {id: "01", text: "01 - ADANA"},
    //     {id: "02", text: "02 - ADIYAMAN"},
    //     {id: "03", text: "03 - AFYONKARAHİSAR"},
    //     {id: "04", text: "04 - AĞRI"},
    //     {id: "68", text: "68 - AKSARAY"},
    //     {id: "05", text: "05 - AMASYA"},
    //     {id: "06", text: "06 - ANKARA"},
    //     {id: "07", text: "07 - ANTALYA"},
    //     {id: "75", text: "75 - ARDAHAN"},
    //     {id: "08", text: "08 - ARTVİN"},
    //     {id: "09", text: "09 - AYDIN"},
    //     {id: "10", text: "10 - BALIKESİR"},
    //     {id: "74", text: "74 - BARTIN"},
    //     {id: "72", text: "72 - BATMAN"},
    //     {id: "69", text: "69 - BAYBURT"},
    //     {id: "11", text: "11 - BİLECİK"},
    //     {id: "12", text: "12 - BİNGÖL"},
    //     {id: "13", text: "13 - BİTLİS"},
    //     {id: "14", text: "14 - BOLU"},
    //     {id: "15", text: "15 - BURDUR"},
    //     {id: "16", text: "16 - BURSA"},
    //     {id: "17", text: "17 - ÇANAKKALE"},
    //     {id: "18", text: "18 - ÇANKIRI"},
    //     {id: "19", text: "19 - ÇORUM"},
    //     {id: "20", text: "20 - DENİZLİ"},
    //     {id: "21", text: "21 - DİYARBAKIR"},
    //     {id: "81", text: "81 - DÜZCE"},
    //     {id: "22", text: "22 - EDİRNE"},
    //     {id: "23", text: "23 - ELAZIĞ"},
    //     {id: "24", text: "24 - ERZİNCAN"},
    //     {id: "25", text: "25 - ERZURUM"},
    //     {id: "26", text: "26 - ESKİŞEHİR"},
    //     {id: "27", text: "27 - GAZİANTEP"},
    //     {id: "28", text: "28 - GİRESUN"},
    //     {id: "29", text: "29 - GÜMÜŞHANE"},
    //     {id: "30", text: "30 - HAKKARİ"},
    //     {id: "31", text: "31 - HATAY"},
    //     {id: "76", text: "76 - IĞDIR"},
    //     {id: "32", text: "32 - ISPARTA"},
    //     {id: "34", text: "34 - İSTANBUL"},
    //     {id: "35", text: "35 - İZMİR"},
    //     {id: "46", text: "46 - KAHRAMANMARAŞ"},
    //     {id: "78", text: "78 - KARABÜK"},
    //     {id: "70", text: "70 - KARAMAN"},
    //     {id: "36", text: "36 - KARS"},
    //     {id: "37", text: "37 - KASTAMONU"},
    //     {id: "38", text: "38 - KAYSERİ"},
    //     {id: "71", text: "71 - KIRIKKALE"},
    //     {id: "39", text: "39 - KIRKLARELİ"},
    //     {id: "40", text: "40 - KIRŞEHİR"},
    //     {id: "79", text: "79 - KİLİS"},
    //     {id: "41", text: "41 - KOCAELİ"},
    //     {id: "42", text: "42 - KONYA"},
    //     {id: "43", text: "43 - KÜTAHYA"},
    //     {id: "44", text: "44 - MALATYA"},
    //     {id: "45", text: "45 - MANİSA"},
    //     {id: "47", text: "47 - MARDİN"},
    //     {id: "33", text: "33 - MERSİN"},
    //     {id: "48", text: "48 - MUĞLA"},
    //     {id: "49", text: "49 - MUŞ"},
    //     {id: "50", text: "50 - NEVŞEHİR"},
    //     {id: "51", text: "51 - NİĞDE"},
    //     {id: "52", text: "52 - ORDU"},
    //     {id: "80", text: "80 - OSMANİYE"},
    //     {id: "53", text: "53 - RİZE"},
    //     {id: "54", text: "54 - SAKARYA"},
    //     {id: "55", text: "55 - SAMSUN"},
    //     {id: "56", text: "56 - SİİRT"},
    //     {id: "57", text: "57 - SİNOP"},
    //     {id: "58", text: "58 - SİVAS"},
    //     {id: "63", text: "63 - ŞANLIURFA"},
    //     {id: "73", text: "73 - ŞIRNAK"},
    //     {id: "59", text: "59 - TEKİRDAĞ"},
    //     {id: "60", text: "60 - TOKAT"},
    //     {id: "61", text: "61 - TRABZON"},
    //     {id: "62", text: "62 - TUNCELİ"},
    //     {id: "64", text: "64 - UŞAK"},
    //     {id: "65", text: "65 - VAN"},
    //     {id: "77", text: "77 - YALOVA"},
    //     {id: "66", text: "66 - YOZGAT"},
    //     {id: "67", text: "67 - ZONGULDAK"},
    // ];
    plateEl.select2({
        language: "tr",
        placeholder: lang.plaqueNoCity,
        data: plateNumbers,
    });

    plateEl.on("change", function (e) {
        let plateVal = plateEl.select2('data')[0]?.id;
        if (plateVal != null && plateVal !== "") {
            plateNoEl.tooltip("show");
        }
    });

    const usageTypes = [
        {id: "", text: lang.select},
        {id: "1", text: "OTOMOBİL"},
        {id: "2", text: "TAKSİ"},
        {id: "3", text: "MİNİBÜS (SÜRÜCÜ DÂHİL 10-17 KOLTUK)"},
        {id: "4", text: "OTOBÜS (SÜRÜCÜ DÂHİL 18-30 KOLTUK) "},
        {id: "5", text: "OTOBÜS (SÜRÜCÜ DÂHİL 31 VE ÜSTÜ KOLTUK)"},
        {id: "6", text: "KAMYONET"},
        {id: "7", text: "KAMYON"},
        {id: "8", text: "İŞ MAKİNESİ"},
        {id: "9", text: "TRAKTÖR"},
        {id: "10", text: "RÖMORK"},
        {id: "11", text: "MOTOSİKLET VE YÜK MOTOSİKLETİ"},
        {id: "12", text: "TANKER"},
        {id: "13", text: "ÇEKİCİ"},
        {id: "14", text: "ÖZEL AMAÇLI TAŞITLAR"},
        {id: "15", text: "TARIM MAKİNESİ"},
    ]
    usagetypeEl.select2({
        language: "tr",
        placeholder: lang.selectUsageType,
        data: usageTypes,
    });
    usagetypeEl.on("change", function (e) {
        yearEl.val(null).trigger('change');

        let usageType = usagetypeEl.select2('data')[0]?.id;
        if (usageType != null && usageType !== "") {
            yearEl.select2("enable");

            setTimeout(function () {
                yearEl.select2("open");
            }, 1);
        }
    });

    const years = [
        {id: "", text: lang.select},
    ];
    const today = new Date();
    const year = today.getFullYear();
    for ($i = year; $i >= year - 2; $i--) {
        years.push({id: $i, text: $i})
    }
    yearEl.select2({
        disabled: true,
        language: "tr",
        placeholder: lang.noEmptyModelYear,
        data: years,
    });
    yearEl.on("change", function (e) {
        brandidEl.val(null).trigger('change');

        let yearVal = yearEl.select2('data')[0]?.id;
        if (yearVal != null && yearVal !== "") {
            brandidEl.select2("enable");

            setTimeout(function () {
                brandidEl.select2("open");
            }, 1);
        }
    });

    brandidEl.select2({
        disabled: true,
        language: "tr",
        placeholder: lang.selectMark,
        ajax: {
            url: '/com/marks',
            type: 'POST',
            data: function (params) {
                let searchText = params.term;
                if (!params.term) {
                    searchText = "";
                }

                let usagetypeVal = usagetypeEl.val();
                let yearVal = yearEl.val();
                if (yearVal === "") {
                    yearVal = 2020;
                }
                return {filter: searchText, year: yearVal, usage: usagetypeVal}
            },
            processResults: function (data) {
                try {
                    if (data == null || data === "null") {
                        data = [];
                    } else {
                        data = JSON.parse(data).d;
                    }
                } catch (e) {
                    data = [];
                }
                data = data.map(d => {
                    return {
                        id: d.markakodu,
                        text: d.marka
                    }
                })
                return {
                    results: data
                };
            },
            delay: 500,
        }
    });
    brandidEl.on("change", function (e) {
        modelidEl.val(null).trigger('change');

        let carBrand = brandidEl.select2('data')[0]?.id;
        if (carBrand != null) {
            modelidEl.select2("enable");

            setTimeout(function () {
                modelidEl.select2("open");
            }, 1);
        }
    });

    modelidEl.select2({
        disabled: true,
        language: "tr",
        placeholder: lang.selectModel,
        ajax: {
            url: '/com/models',
            type: 'POST',
            data: function (params) {
                let searchText = params.term;
                if (!params.term) {
                    searchText = "";
                }

                let brandVal = brandidEl.val();
                let yearVal = yearEl.val();
                if (yearVal === "") {
                    yearVal = 2020;
                }
                return {filter: searchText, brand: brandVal + "#" + yearVal}
            },
            processResults: function (data) {
                try {
                    if (data == null || data === "null") {
                        data = [];
                    } else {
                        data = JSON.parse(data).d;
                    }
                } catch (e) {
                    data = [];
                }
                data = data.map(d => {
                    return {
                        id: d.tipkodu,
                        text: d.tip
                    }
                })
                return {
                    results: data
                };
            },
            delay: 500,
        }
    });
}

setDaskAndResidenceModalFormValidation = () => {
    const rules = {
        identity: {
            required: true,
            confirmIdentity: true,
            minlength: 10,
            maxlength: 11
        },
        jobs: {
            required: false,
        },
        phoneNumber: {
            required: true,
            minlength: 14,
            maxlength: 14
        },
        contract1: "required",
        contract2: "required",
    };
    const messages = {
        identity: {
            required: lang.noEmptyID,
            minlength: lang.minlengthID,
            maxlength: lang.maxlengthID,
        },
        jobs: lang.noEmptyJob,
        phoneNumber: {
            required: lang.noEmptyPhone,
            minlength: lang.minLenghtPhone,
            maxlength: lang.maxLenghtPhone,
        },
        contract1: lang.checkedKVKK,
        contract2: lang.checkedTIS,
    };
    const errorPlacement = function (error, element) {
        if (element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    };

    $("form[name='frm_off_dask']").validate({
        rules: rules,
        messages: messages,
        errorPlacement: errorPlacement,
    });

    $("form[name='frm_off_home']").validate({
        rules: rules,
        messages: messages,
        errorPlacement: errorPlacement,
    });
}
setDaskAndResidenceFormValidation = () => {
    const rules = {
        identity: {
            required: true,
            confirmIdentity: true,
            minlength: 10,
            maxlength: 11
        },
        jobs: {
            required: false,
        },
        phoneNumber: {
            required: true,
            minlength: 14,
            maxlength: 14
        },
        contract1: "required",
        contract2: "required",
    };
    const messages = {
        identity: {
            required: lang.noEmptyID,
            minlength: lang.minlengthID,
            maxlength: lang.maxlengthID,
        },
        jobs: lang.noEmptyJob,
        phoneNumber: {
            required: lang.noEmptyPhone,
            minlength: lang.minLenghtPhone,
            maxlength: lang.maxLenghtPhone,
        },
        contract1: lang.checkedKVKK,
        contract2: lang.checkedTIS,
    };
    const errorPlacement = function (error, element) {
        if (element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    };

    $("form[name='Proposal']").validate({
        rules: rules,
        messages: messages,
        errorPlacement: errorPlacement,
    });

    $("form[name='Proposal']").validate({
        rules: rules,
        messages: messages,
        errorPlacement: errorPlacement,
    });
}

setPersonalAccidentModalFormValidation = () => {
    $("form[name='frm_off_personalaccident']").validate({
        rules: {
            identity: {
                required: true,
                confirmIdentity: true,
                minlength: 10,
                maxlength: 11
            },
            personalAccidentLimits: {
                required: false,
            },
            jobs: {
                required: false,
            },
            phoneNumber: {
                required: true,
                minlength: 14,
                maxlength: 14
            },
            contract1: "required",
            contract2: "required",
        },
        messages: {
            identity: {
                required: lang.noEmptyID,
                minlength: lang.minlengthID,
                maxlength: lang.maxlengthID,
            },
            personalAccidentLimits: lang.noEmptyPersonalAccidientLimit,
            jobs: lang.noEmptyJob,
            phoneNumber: {
                required: lang.noEmptyPhone,
                minlength: lang.minLenghtPhone,
                maxlength: lang.maxLenghtPhone,
            },
            contract1: lang.checkedKVKK,
            contract2: lang.checkedTIS,
        },
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
}
setPersonalAccidentFormValidation = () => {
    $("form[name='Proposal']").validate({
        rules: {
            ex_51114: { // personalAccidentLimits
                required: true,
            },
            ex_50001: { // jobs
                required: true,
            },
            ex_50090: { // Deprem, Sel, Terör, Yanardağ Püskürmesi, Yer Kayması
                required: false,
            },
            ex_50091: { // Kayak ve Patinaj Sporu
                required: false,
            },
            ex_50092: { // Dağcılık ve Trekking
                required: false,
            },
            ex_50093: { // Dalış / Dalgıçlık Sporu
                required: false,
            },
            ex_50094: { // Yelken Sporu
                required: false,
            },
            ex_50095: { // Motosiklet ve takma motorlu bisiklet kullanmak ve bunlara binmek
                required: false,
            },
            ex_50096: { // Kara ve Deniz Avcılığı
                required: false,
            },
        },
        messages: {
            ex_51114: lang.noEmptyPersonalAccidientLimit,
            ex_50001: lang.noEmptyJob,
            ex_50090: "",
            ex_50091: "",
            ex_50092: "",
            ex_50093: "",
            ex_50094: "",
            ex_50095: "",
            ex_50096: "",
        },
        errorPlacement: function (error, element) {
            if (element.parent('.input-group-2').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
}
setPersonalAccidentFormSelects = () => {
    const limits = [
        {id: "", text: lang.select},
        {id: "50000", text: "50.000,00 ₺"},
        {id: "100000", text: "100.000,00 ₺"},
        {id: "150000", text: "150.000,00 ₺"},
        {id: "200000", text: "200.000,00 ₺"},
    ];

    $("#Proposal select[name='ex_51114']").select2({
        language: "tr",
        placeholder: lang.personalAccidientLimit,
        data: limits,
    });
}

setTravelModalFormValidation = () => {
    $("form[name='frm_off_travel']").validate({
        rules: {
            identity: {
                required: true,
                confirmIdentity: true,
                minlength: 10,
                maxlength: 11
            },
            travelType: "required",
            country: "required",
            startDate: "required",
            endDate: "required",
            jobs: {
                required: false,
            },
            phoneNumber: {
                required: true,
                minlength: 14,
                maxlength: 14
            },
            contract1: "required",
            contract2: "required",
        },
        messages: {
            identity: {
                required: lang.noEmptyID,
                minlength: lang.minlengthID,
                maxlength: lang.maxlengthID,
            },
            travelType: lang.noEmptyTravelType,
            country: lang.noEmptyTravelCountry,
            startDate: lang.noEmptyTravelStartDate,
            endDate: lang.noEmptyTravelEndDate,
            jobs: lang.noEmptyJob,
            phoneNumber: {
                required: lang.noEmptyPhone,
                minlength: lang.minLenghtPhone,
                maxlength: lang.maxLenghtPhone,
            },
            contract1: lang.checkedKVKK,
            contract2: lang.checkedTIS,
        },
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
}


setRegisterFormValidation = () => {
    $("form[name='frm_auth_userregister']").validate({
        rules: {
            identity: {
                required: true,
                confirmIdentity: true,
                minlength: 10,
                maxlength: 11
            }

        },
        messages: {
            identity: {
                required: lang.noEmptyID,
                minlength: lang.minlengthID,
                maxlength: lang.maxlengthID,
            }

        },
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
}

setTravelFormValidation = () => {
    $("form[name='Proposal']").validate({
        rules: {
            travelType: "required",
            country: "required",
            startDate: "required",
            endDate: "required",
            jobs: {
                required: false,
            },
        },
        messages: {
            travelType: lang.noEmptyTravelType,
            country: lang.noEmptyTravelCountry,
            startDate: lang.noEmptyTravelStartDate,
            endDate: lang.noEmptyTravelEndDate,
            jobs: lang.noEmptyJob,
        },
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
}
