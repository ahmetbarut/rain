<?php
    app('view')->extends('layouts/home', ['title' => "Anasayfa"])->startSection('content');
?>
<div class="container">
    <div class="m-none">
        <div class="hidden-xs page-product header-filter clear-filter purple-filter hidden-xs"
             style="background-image: url('<?=$products["d"]["img_banner"]?>'); ">
        <div class="container animate__animated animate__backInDown">
            <div class="brand">
                <h1 class="banner-title"><?= $products["d"]["title"] ?></h1>
            </div>
        </div>
    </div>
</div>
<div class="m-none">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="<?= asset(App::getLocale()) ?>"><?= __("all.home") ?></a></li>
            <li class="breadcrumb-item" aria-current="page"><?= __("all.products") ?></li>
            <li class="breadcrumb-item" aria-current="page"></li>
            <?= $products["d"]["title"] ?>
        </ol>
    </nav>
</div>
<div class="row" style="margin-top: 20px">
    <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 m-none">
        <div class="proposal-form-card sticky">
            <div class="category-2 proposal-widget">
                <h3 class="sidebar-title"><?= __("all.your_informations") ?></h3>
                <div class="s-border"></div>
                <div class="m-border"></div>
                <div class="row mt-3">
                    <table class="table">
                        <tbody>
                        <tr>
                            <td><?= __("all.identity_number") ?></td>
                            <td>:</td>
                            <td><?= strMask($user_data['identity']) ?></td>
                        </tr>
                        <tr>
                            <td><?= __("all.u_title") ?></td>
                            <td>:</td>
                            <td><?= $response["d"]['name'] ?></td>
                        </tr>
                        <tr>
                            <td><?= __("all.phone_number") ?></td>
                            <td>:</td>
                            <td><?= $user_data['phoneNumber'] ?></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8">
        <form role="form" name="Proposal" id="Proposal" class="needs-validation">
            @csrf
            <input type="hidden" name="product_no" id="product_no" value="101">
            <input type="hidden" name="clino" id="clino" value="<?= $response['d']['unitno'] ?>">
            <input type="hidden" name="cliid" id="cliid" value="1">
            <input type="hidden" name="identity" id="identity" value="<?= $user_data['identity'] ?>">
            <div class="proposal-form-card">
                <div class="proposal-widget">
                    <div class="row ">
                        <div class="col-12 col-md-6 input-group-2 mb-2">
                            <select class="selects form-control" name="plate1" id="plate1" data-toggle="tooltip"
                                    data-placement="top" title="a" placeholder="a" required>
                                @foreach($cities["d"] as  $city)
                                <option value="<?= $city["id"] ?>"
                                @if($city["id"] ==  $user_data["plaque"]) selected @endif><?= $city["id"] . " - " . $city["name"] ?></option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-12 col-md-6 input-group-2 mb-2">
                            <input name="plateNo" id="plateNo" value="<?= $user_data['plateNo'] ?>" maxlength="6"
                                   type="text"
                                   data-toggle="tooltip" data-placement="top"
                                   title="<?= __("all.plaque_number") ?>"
                            class="form-control btn-validation" data-pattern="SGRT06"
                            placeholder="<?= __("all.plaque_number") ?>">
                        </div>
                    </div>
                    <div class="row ">
                        <div class="col-12 col-md-6 input-group-2 mb-2">
                            <select name="usagetype" id="usagetype" class="selects form-control validate"
                                    required>
                                <option disabled selected><?= __("all.select_usage_type") ?></option>
                                @foreach($usageTypes["d"] as $usageType)
                                <option value="<?= $usageType["typer"] ?>"><?= $usageType["type_nm"] ?></option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-12 col-md-6 input-group-2 mb-2" id="year">
                            <select name="year" id="year" class="selects form-control validate" required>
                                <option selected disabled><?= __("all.select_year") ?></option>
                                @if(!empty($plaque_number))
                                @foreach(getYears(0) as $key => $year)
                                <option value="<?= $year ?>"><?= $year ?></option>
                                @endforeach
                                @else
                                @foreach(getYears(1,1) as $key => $year)
                                <option value="<?= $year ?>"><?= $year ?></option>
                                @endforeach
                                @endif
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 col-md-6 input-group-2 mb-2" id="brandid">
                            <select name="brandid" id="brandid" class="selects form-control validate" required>
                                <!--                                        <option selected disabled>__("all.select_brand") ?></option> !--->
                            </select>
                        </div>
                        <div class="col-12 col-md-6 input-group-2 mb-2" id="modelid">
                            <select name="modelid" id="modelid" class="selects form-control validate" required>
                                <option selected disabled><?= __("all.select_model") ?></option>
                            </select>
                        </div>
                    </div>
                    <center>
                        <x-recaptcha></x-recaptcha>
                        @error("g-recaptcha-response")
                        <div class="alert alert-danger">
                            <?= $message ?>
                        </div>
                        @enderror
                    </center>
                    <div class="row mt-3">
                        <button type="button" id="btnProposal" class="btn btn-primary hvr-icon-forward"><i
                                    class="material-icons hvr-icon">chevron_right</i><?= __("all.get_offer") ?>
                        </button>
                    </div>

                </div>
            </div>
        </form>

        <div class="sidebar-right-2 payment mt-3 d-none" id="paymentcard">
            <div class="mb-4">
                <div class="text-center">
                    <h2><?= __("all.special_for_you") ?> <strong class="text-primary"></strong></h2>
                    <div class="mb-3">
                        <strong class="text-primary total"><span></span> ₺</strong><br>
                        <p class="text-primary policy_no"><?=__("all.policy_number")?> <span class="text"></span>
                        </p>
                        <?=__("all.offer_message")?> <?= $settings["h_phone"] ?>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
</div>
<?php
    app('view')->stopSection();
?>
