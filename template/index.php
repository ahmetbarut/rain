<?php app('view')->extends('layouts/home', compact('menus', 'settings', 'corporates'))->startSection('content');  ?>

<div class="main">
    <script>
        var sliderforhome = 1;
    </script>
    <div class="container">
        <div class="slider">
            <div class="slide_viewer">
                <div class="slide_group" style="margin-top:150px;">

                </div>
            </div>
            <div class="directional_nav">
                <div class="previous_btn" title="{!! __(" pagination.previous") !!}">
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 792 792" class="slider-bg-style" xml:space="preserve">
                        <style type="text/css">
                            .st0 {
                                fill: #ff0000;
                            }
                        </style>
                        <polygon class="st0" points="545.5,761.2 545.5,694.2 305.4,395.3 546.6,97.1 546.5,30.7 245.4,393.4 " />
                    </svg>
                </div>
                <div class="next_btn" title="{!! __(" pagination.next") !!}">
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 792 792" class="slider-bg-style" xml:space="preserve">
                        <style type="text/css">
                            .st0 {
                                fill: #FF0000;
                            }
                        </style>
                        <polygon class="st0" points="246.5,30.7 246.5,97.8 486.6,396.7 245.4,694.8 245.4,761.2 546.6,398.5 " />
                    </svg>
                </div>
            </div>
        </div>
    </div>
    <div class="section-color text-center section-pading">
        <div class="container">
            <div class="arrow oks"></div>
            <div class="row mr-auto">
                <div class="col-md-12 mb-4">
                    <h3 class="con-title" id="get_offer"><?= __("all.quick") ?><strong class="text-primary"> <?= __("all.get_offer") ?></strong></h3>
                    <span class="section-separator mb-3"></span>
                    <h3><?= __("all.offer_description") ?></h3>
                </div>
                <?php foreach ($products as $product) { ?>
                    <?php if ($product["is_act"]) { ?>
                        <div class="col" data-aos="zoom-in">
                            <a data-toggle="modal" href="#<?= $product["slug"] ?>" data-target="#<?= $product["frm_modal_target"] ?>" data-prop="<?= $product["slug"] ?>" class="mdlopen offerbutton hvr-grow" title="<?= $product["title"] ?>">
                                <i class="material-icons"><?= $product["img_maticon"] ?></i>
                            </a>
                            <h3 class="titleh3"><?= $product["title"] ?></h3>
                        </div>
                    <?php } ?>
                <?php } ?>
            </div>
        </div>
    </div>
    <div class="container text-center section-pading">
        <div class="row mr-auto">
            <div class="col-md-12 mb-5">
                <h3 class="con-title"> <?= __("all.solution") ?> <strong class="text-primary"><?= __("all.our_partners") ?></strong></h3>
                <span class="section-separator mb-3"></span>
                <h3><?= __("all.partners_text") ?></h3>
            </div>
            <?php foreach ($partners->d as $partner) { ?>
                <div class="col" data-aos="zoom-out">
                    <a href="<?= $partner["slug"] ?>" class="offerbutton hvr-grow">
                        <?php if (!empty($partner["img_icon"])) : ?>
                            <i class="material-icons"><?= $partner["img_icon"] ?></i>
                        <?php else : ?>
                            <img class="svg partners-svg-img lazy" src="<?= $partner['img_banner'] ?>" data-src="<?= $partner['img_banner'] ?>" alt="<?= $partner["title"] ?>" title="<?= $partner["title"] ?>">
                        <?php endif; ?>
                    </a>
                    <h3 class="titleh3"><?= $partner["title"] ?></h3>
                </div>
            <?php } ?>
        </div>
    </div>
    <div class="section-color section-pading">
        <div class="container">
            <div class="row">
                <div class="col-md-12 mb-5 text-center">
                    <h4 class="con-title"><?= __("all.from_us") ?><strong class="text-primary">
                            <?= __("all.news") ?></strong></h4>
                    <span class="section-separator mb-3"></span>
                    <h5><?= __("all.news_text") ?></h5>
                </div>
            </div>
            <div class="row" id="blogs"></div>
        </div>
    </div>

    <!-- MOBİL -->
    <div class="section-color-red section-pading">
        <div class="container">
            <div class="row text-center">
                <div class="col-md-6 d-flex align-items-center">
                    <div class="row">
                        <div class="col-md-12">
                            <h3 class="mob-text text-left"><?= __("all.app_text_title") ?></h3>
                        </div>
                        <div class="col-md-12">
                            <h3 class="mob-text text-left"><?= __("all.app_text_description") ?></h3>
                        </div>
                        <div class="col-md-12 mt-3 mb-3">
                            <a href="#app-store">
                                <img width="150" height="50" class="app-logo mb-2 lazy" data-src="assets/images/mobile/appstore.webp" src="<?= asset("/") ?>assets/images/mobile/appstore.webp" alt="SigortaTurk App Store" title="SigortaTurk App Store">
                            </a>
                            <a href="#play-store">
                                <img width="150" height="50" class="app-logo mb-2 lazy" src="assets/images/mobile/googleplay.webp" data-src="assets/images/mobile/googleplay.webp" alt="SigortaTurk Google Play Store" title="SigortaTurk Google Play Store">
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 aos-in it aos-animate m-none" data-aos="fade-up">
                    <img width="60%" height="470" class="mobile-app lazy" src="assets/images/mobile/mobil.webp" data-src="assets/images/mobile/mobil.webp" alt="<?= __("all.sigortaturk_mobile_app") ?>" title="<?= __("all.sigortaturk_mobile_app") ?>">
                </div>
            </div>
        </div>
    </div>
    <!-- MOBİL -->
    <div class="section-pading">
        <div class="container">
            <div class="row text-center">
                <div class="col-md-12 mb-5">
                    <h3 class="con-title"><?= __("all.why_text") ?> <strong class="text-primary"><?= __("all.insurance_text") ?></strong></h3>
                    <span class="section-separator mb-3"></span>
                    <h3><?= __("all.our_job_text") ?></h3>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-6">
                    <div class="w-100">
                        <div class="mb-5">
                            <img class="lazy w-100 h-100" src="" data-src="" alt="<?= __("all.why_text") ?>" title="<?= __("all.why_text") ?>">
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 pl-lg-5">
                    <div id="accordion">
                        <?php
                        $count = 0
                        ?>
                        <?php foreach (json_decode($whyus_data->d["veriable"]) as $whyus) :
                            $count++;
                        ?>
                            <div class="cards">
                                <div id="headingYeniden Sigortacılık">
                                    <h5 class="mb-1">
                                        <div class="btn btn-primary accordion-item" data-toggle="collapse" data-target="#<?= $whyus->title ?> Sigortacılık" aria-expanded="true" aria-controls="collapse Yeniden Sigortacılık" style="width:100%;">
                                            <?= $whyus->title ?>
                                        </div>
                                    </h5>
                                </div>
                                <div id="<?= $whyus->title ?> Sigortacılık" class="collapse <?php if ($count == 1) {
                                                                                                echo 'show';
                                                                                            } else {
                                                                                                echo 'hide';
                                                                                            } ?>" aria-labelledby="<?= $whyus->title ?> Sigortacılık" data-parent="#accordion">
                                    <div>
                                        <h4 class="pl-3 pr-3 text-justify coltext">
                                            <?= $whyus->slogan ?>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- MODALS --->
    <div class="modal fade mb-5" id="off_travel">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div>
                    <button class="btn btn-primary btn-fab close" data-dismiss="modal" aria-label="Close"><i class="material-icons">clear</i>
                    </button>
                </div>
                @include("pages.modals.off_travel")
            </div>
        </div>
    </div>
    <div class="modal fade mb-5" id="off_casco">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div>
                    <button class="btn btn-primary btn-fab close" data-dismiss="modal" aria-label="Close"><i class="material-icons">clear</i>
                    </button>
                </div>
                @include("pages.modals.off_casco")
            </div>
        </div>
    </div>
    <div class="modal fade mb-5" id="off_traffic">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div>
                    <button class="btn btn-primary btn-fab close" data-dismiss="modal" aria-label="Close"><i class="material-icons">clear</i>
                    </button>
                </div>
                @include("pages.modals.off_traffic")
            </div>
        </div>
    </div>
    <div class="modal fade mb-5" id="off_home">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div>
                    <button class="btn btn-primary btn-fab close" data-dismiss="modal" aria-label="Close"><i class="material-icons">clear</i></button>
                </div>

                @include("pages.modals.off_home")

            </div>
        </div>
    </div>
    <div class="modal fade mb-5" id="off_personalaccident">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div>
                    <button class="btn btn-primary btn-fab close" data-dismiss="modal" aria-label="Close"><i class="material-icons">clear</i></button>
                </div>

                @include("pages.modals.off_personalaccident")

            </div>
        </div>
    </div>
</div>
<?php app('view')->stopSection() ?>