@if(\App::getLocale() === "tr")
    <div class="mx-1 mt-1">
        <div class="form-check mb-3 border-danger">
            <label class="form-check-label ctext">
                <input name="contract1" class="form-check-input" type="checkbox" data-toggle="tooltip"
                       data-placement="top" title="{{ __("all.contracts") }}" required=""
                       data-original-title="Lütfen KVKK Sözleşmesini Onaylayınız.">
                <p class="text-justify">Bizimle paylaşacağınız tüm kişisel verileriniz, SigortaTurk A.Ş.
                    tarafından, taleplerinizi yerine getirmek ve ilgili birimlere aktarmak için işlenmektedir.
                    Kişisel verilerinizin işlenmesi ve haklarınız ile ilgili detaylı bilgiye <a href="{{ route("contracts",$contractSlug) }}" target="_blank">buradan
                        ulaşabilirsiniz.</a></p>
                <span class="form-check-sign"><span class="check"></span></span>
            </label>
        </div>

        <div class="form-check mb-3">
            <label class="form-check-label ctext">
                <input name="contract2" class="form-check-input" type="checkbox" data-toggle="tooltip"
                       data-placement="top" title="{{ __("all.contracts") }}" required
                       data-original-title="Lütfen Ticari İleti Sözleşmesini Onaylayınız.">
                <p class="text-justify"><a target="_blank" href="{{ route("contracts",$contractSlug) }}">Ticari
                        İletişim Sözleşmesi</a> okudum ve onaylıyorum.</p>
                <span class="form-check-sign"><span class="check"></span></span>
            </label>
        </div>
    </div>
@elseif(\App::getLocale() === "en")
    <div class="mx-1 mt-1 ">
        <div class="form-check mb-3">
            <label class="form-check-label ctext">
                <input name="contract1" class="form-check-input" type="checkbox"  data-toggle="tooltip"
                       data-placement="top" title="{{ __("all.contracts") }}" required=""
                       data-original-title="Lütfen KVKK Sözleşmesini Onaylayınız.">
                <p class="text-justify">All your personal data you will share with us, SigortaTurk A.Ş. to fulfill
                    your requests and transfer them to the relevant units.
                    You can find detailed information about the processing of your personal data and your rights
                    here.<a href="/en/contract/kvkk" target="_blank">You can reach
                        here</a></p>
                <span class="form-check-sign"><span class="check"></span></span>
            </label>
        </div>
        <div class="form-check mb-3">
            <label class="form-check-label ctext">
                <input name="contract2" class="form-check-input" type="checkbox" data-toggle="tooltip"
                       data-placement="top" title="{{ __("all.contracts") }}" required=""
                       data-original-title="Lütfen Ticari İleti Sözleşmesini Onaylayınız.">
                <p class="text-justify"><a target="_blank" href="/en/contract/kvkk">Commercial
                        Communication Agreement</a> I have read and approve.</p>
                <span class="form-check-sign"><span class="check"></span></span>
            </label>
        </div>
    </div>
@endif
