<form class="needs-validation" name="frm_off_casco" id="off_casco" method="POST">
    <p style="margin-top:10px; font-size:20px; text-align:center;"><?= __("all.insurance") ?></p>

    <div class="modal-body">
        <div class="input-group mb-2">
            <input name="identity" maxlength="11" value="" autocomplete="off"
                   type="text" class="form-control"
                   placeholder="<?= __("all.identity_number") ?>" data-toggle="tooltip"
                   data-placement="top"
                   title="<?= __("all.identity_number_description") ?>">

        </div>
        <div class="input-group mb-2">
            <select class="form-control plaque @error("plaque")  is-invalid @enderror" name="plaque"
                    data-toggle="tooltip" data-placement="top">
                <option disabled selected><?= __("all.plaque_city_code") ?></option>

            </select>
        </div>
        <div class="input-group mb-2">
            <input name="plateNo" maxlength="6" type="text" data-toggle="tooltip" data-placement="top"
                   title="<?= __("all.plaque_number_description") ?>"
                   class="form-control @error("plateNo")  is-invalid @enderror"
                   placeholder="<?= __("all.plaque_number") ?>">
        </div>
        <div class="input-group mb-2">
            <select class="form-control jobs @error("jobs")  is-invalid @enderror" name="jobs" data-toggle="tooltip"
                    data-placement="top"
                    title="<?= __("all.jobs_select") ?>">
                <option selected disabled><?= __("all.jobs_select") ?></option>
            </select>

        </div>
        <div class="input-group mb-2">
            <input name="phoneNumber" maxlength="14" id="number()" type="text"
                   class="form-control"
                   placeholder="<?= __("all.phone_number") ?>" data-toggle="tooltip" data-placement="top"
                   title="<?= __("all.phone_warning") ?>">
        </div>
        <div class="mt-3">
            <?php 
                app('view')->include("modals/contract");
            ?>
        </div>
    </div>
    <div class="text-center">
        <button type="button" onclick="validateForm('form[name=frm_off_casco]', 'casco', '<?= 'route("offer.casco")' ?>')" class="btn btn-primary mb-3 hvr-icon-forward"><i class="material-icons hvr-icon">chevron_right</i> <?= __("all.get_now_offer") ?>
        </button>
    </div>
</form>

