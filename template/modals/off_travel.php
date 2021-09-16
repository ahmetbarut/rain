<form class="needs-validation" name="frm_off_travel" method="post" id="off_travel">
    <p style="margin-top:10px; font-size:20px; text-align:center;"><?= __("all.travel_health_insurance") ?></p>

    <div class="modal-body">
        <div class="input-group mb-2">
            <input name="identity" maxlength="11" autocomplete="off" type="text"
                   class="form-control validate" placeholder="<?= __("all.identity_number") ?>" data-toggle="tooltip" data-placement="top"
                   title="<?= __("all.identity_number_description") ?>">
        </div>
        <div class="input-group mb-2 d-none">
            <select class="selects form-control validate" name="travel_type" data-toggle="tooltip"
                    data-placement="top" title="<?= __("all.type_of_travel") ?>">
                <option disabled><?= __("all.domestic") ?></option>
                <option value="2" selected><?= __("all.abroad") ?></option>
            </select>
        </div>
        <div class="input-group mb-2">
            <select class="selects form-control validate" name="country_travel" data-toggle="tooltip" data-placement="top" title="<?= __("all.travel_country") ?>" data-original-title="<?= __("all.travel_country") ?>">
                <option selected disabled><?= __("all.travel_country") ?></option>
                <option value="840"><?= __("all.travel_all_world") ?></option>
                <option value="840"><?= __("all.travel_cheng_world") ?></option>
            </select>

        </div>
        <div class="input-group mb-2">
            <input name="startDate" maxlength="10" type="text" class="haspattern form-control btn-validation"
                   data-toggle="tooltip" data-placement="top" title="Seyahat Başlama Tarihi Seçiniz"
                   placeholder="<?= __("all.travel_start_date") ?>" data-placeholder="Seyahat Başlama Tarihi Seçiniz"
                   data-pattern="01.12.2020">
        </div>
        <div class="input-group mb-2">
            <input name="endDate" maxlength="10" type="text" class="haspattern form-control btn-validation"
                   data-toggle="tooltip" data-placement="top" title="Seyahat Bitiş Tarihi Seçiniz"
                   placeholder="<?= __("all.travel_end_date") ?>" data-placeholder="Seyahat Bitiş Tarihi Seçiniz"
                   data-pattern="01.12.2020">
        </div>
        <div class="input-group mb-2">
            <select class="form-control validate jobs" name="jobs" data-toggle="tooltip" data-placement="top"
                    title="<?= __("all.jobs_select") ?>">
                <option selected disabled><?= __("all.jobs_select")  ?></option>

            </select>
        </div>
        <div class="input-group">
            <input name="phoneNumber" maxlength="14" onkeypress="number()" type="text"
                   class="form-control btn-validation" data-toggle="tooltip" data-placement="top"
                   title="<?= __("all.phone_warning") ?>" placeholder="<?= __("all.phone_number") ?>">
        </div>

        <div class="mt-3">
            @include("pages.modals.contract")
        </div>
    </div>
    <div class="text-center">
        <button type="button" onclick="validateForm('form[name=frm_off_travel]', 'travel', 'asd')" class="btn btn-primary mb-3 hvr-icon-forward"><i class="material-icons hvr-icon">chevron_right</i>
            <?= __("all.get_offer") ?>
        </button>
    </div>
</form>
