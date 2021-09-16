<form class="needs-validation" name="frm_off_personalaccident" id="off_personalaccident" method="post">
    <p style="margin-top:10px; font-size:20px; text-align:center;"><?= __("all.personal_accident") ?></p>
    <div class="modal-body">
        <div class="input-group mb-2">
            <input name="identity" maxlength="11" autocomplete="off" type="text"
                   class="form-control" placeholder="<?= __("all.identity_number") ?>" data-toggle="tooltip" data-placement="top"
                   title="<?= __("all.identity_number_description") ?>">
        </div>
        <div class="input-group mb-2">
            <select class="selects form-control" name="limit" data-toggle="tooltip" data-placement="top"
                    title="<?= __("all.personal_accident_limit") ?>">
                <option selected disabled><?= __("all.personal_accident_limit") ?></option>
                <option value="50000">50.000,00 ₺</option>
                <option value="100000">100.000,00 ₺</option>
                <option value="150000">150.000,00 ₺</option>
                <option value="200000">200.000,00 ₺</option>
            </select>
        </div>
        <div class="input-group mb-2">
            <select class="selects form-control jobs" name="jobs" data-toggle="tooltip" data-placement="top"  title="<?= __("all.jobs_select") ?>">
                <option selected disabled><?= __("all.jobs_select") ?></option>
            </select>
        </div>
        <div class="input-group mb-2">
            <input name="phoneNumber" maxlength="14" type="text" class="form-control btn-validation" placeholder="<?= __("all.phone_number") ?>" data-toggle="tooltip"
                   data-placement="top" title="<?= __("all.phone_warning") ?>">
        </div>
        <div class="mt-3">
            @include("pages.modals.contract")
        </div>
    </div>
    <div class="text-center">
        <button type="button" onclick="validateForm('form[name=frm_off_personalaccident]', 'personalaccident', '<?= ("offer.personalaccident") ?>')" class="btn btn-primary mb-3 hvr-icon-forward"><i class="material-icons hvr-icon">chevron_right</i>
            <?= __("all.get_offer") ?>
        </button>
    </div>
</form>
