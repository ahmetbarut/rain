<?php 
    app('view')->extends('layouts/home', ['title' => 'Urun'])->startSection('content');
?>

    <meta name="description" content="<?= $products->d["descr"] ?>">
    <meta name="keyword" content="<?= $products->d["keyw"] ?>">

    <div class="container">
        <div class="m-none">
            <div class="hidden-xs page-product header-filter clear-filter purple-filter hidden-xs" style="background-image: url('<?= $products->d["img_banner"] ?>');">
                <div class="container animate__animated animate__backInDown">
                    <div class="brand">
                        <h1 class="banner-title"><?= $products->d["title"] ?></h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-none">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="<?= asset() ?>"><?= __("all.home") ?></a></li>
                    <li class="breadcrumb-item" aria-current="page"><?= __("all.products") ?></li>
                    <li class="breadcrumb-item" aria-current="page"></li>
                    <?= $products->d["title"] ?>
                </ol>
            </nav>
        </div>
        <div class="row">
            <div class="col-md-8">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-12">
                            <?= $products->d["cont"] ?>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 order-xs-12">
                <div class="card sticky">
                    <?php app('view')->include("modals/" . $products->d["frm_modal_target"]);?>
                </div>
            </div>
        </div>
    </div>

    <script>
        $.ajax({
            method: "POST",
            url: "/getCity",
            data:{
                _token: $("meta[name=csrf-token]").attr("content"),
            },
            success: function(response) {
                $(".plaque").prepend(`<option selected disabled>${response.key}</option>`);
                response.data.map(function(cities) {
                    $(".plaque").prepend(`
                    <option value="${cities.id}">${cities.id} - ${cities.name}</option>
                `)
                });
            }
        });
        $.ajax({
            method: "POST",
            url: "/getJobs",
            data:{
                _token: $("meta[name=csrf-token]").attr("content"),
            },
            success: function (response) {
                $(".jobs").prepend(`<option selected disabled>${response.key}</option>`);
                response.data.map(function (jobs) {
                    $(".jobs").prepend(`
                    <option value="${jobs.j_code}">${jobs.j_name}</option>
                `)
                });
            },
        });
    </script>

<?php app('view')->stopSection()?>