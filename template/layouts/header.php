<!DOCTYPE html>
<html lang="<?="App::getLocale()"?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="viewport">
    <meta name="keywords" content="<?=$settings['keyw']?>" />
    <meta name="csrf-token" content="<?="csrf_token()"?>">
    <meta name="author" content="SigortaTürk A.Ş">
    <meta name="publisher" content="SigortaTürk A.Ş">
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="<?="App::getLocale()"?>" />
    <meta property="og:title" content="<?=$settings['title']?>" />
    <meta property="og:description" content="<?=$settings['description']?>" />
    <meta property="og:url" content="<?=$settings['url'] . '/' . "App::getLocale()"?>" />
    <meta property="og:site_name" content="<?=$settings['c_name']?>" />
    <meta name="reply-to" content="<?=$settings['mail']?>" />
    <meta name="robots" content="noindex, nofollow" />
    <meta property="article:publisher" content="<?=$settings['face_link']?>" />
    <link rel="apple-touch-icon" href="<?=asset("/")?>assets/favicons/favicon-32x32.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="<?=asset("/")?>assets/favicons/favicon-32x32.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="<?=asset("/")?>assets/favicons/favicon-32x32.png" />
    <link rel="apple-touch-icon" sizes="167x167" href="<?=asset("/")?>assets/favicons/favicon-32x32.png" />
    <meta name="Copyright" content="<?=date('Y')?> Sigorta Türk A.Ş.">
    <title>@yield("title")</title>

    {!! $seo !!}
    <link rel="icon" type="image/png" href="<?=asset("/")?>assets/favicons/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="<?=asset("/")?>assets/favicons/favicon-32x32.png" sizes="16x16" />

    <link rel="preload" type="text/css"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons&display=swap"
        as="style" onload="this.onload=null; this.rel='stylesheet'" />
    <link rel="preload" href="<?=asset("/")?>assets/css/animate.min.css" as="style"
        onload="this.onload=null; this.rel='stylesheet'">
    <link rel="stylesheet" href="<?=asset("/")?>assets/css/hover-css/hover-min.css">
    <link rel="preload" href="https://unpkg.com/aos@2.3.1/dist/aos.css" as="style"
        onload="this.onload=null; this.rel='stylesheet'">
    <noscript id="deferred-styles">
        <link rel="stylesheet" type="text/css"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons&display=swap" />
        <link rel="stylesheet" href="<?=asset("/")?>assets/css/animate.min.css">
        <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/hover.css/2.3.1/css/hover.css">
    </noscript>
    <link rel="stylesheet" href="<?=asset("/")?>assets/TimeCircles/TimeCircles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css">
    <link rel="stylesheet" href="<?=asset("/")?>assets/css/styles.css" />
    <link rel="stylesheet" href="<?=asset("/")?>assets/css/style.css" />
    @yield('stylesheet')
    <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>

</head>

<body>
    <div class="m-none" id="loading" style="display: block">
        <div class="loading"></div>
    </div>
    <!-- Nav -->
    <nav class="navbar fixed-top navbar-expand-lg d-md-block2" id="sectionsNav">
        <div class="container">
            <div class="navbar-translate">
                <div class="mr-md-5">
                    <a href="<?=('home')?>"><img width="150" height="50" class="logo"
                            src="<?=asset("/")?>assets/images/logo/sigortaturklogo.png"
                            alt="Sigorta Türk Logo"></a>
                </div>
                <div class="d-flex align-items-center justify-content-end">
                    <div class="text-primary center-align mr-2 tel display-none2" id="tel">
                        <a href="tel:<?=$settings['h_phone']?>">
                            <span class="material-icons">phone</span>
                            <span class="fs-s"></span>
                            <span class="fs-m"> <?=$settings['h_phone']?> <br>
                                <small class="d-flex justify-content-end"
                                    style="font-size: 0.6em;"><?=__('all.help_line')?></small>
                            </span>
                        </a>
                    </div>
                    <div class="vl sep display-none" id="sep"></div>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false"
                        aria-label="Sigorta Turk togle navigation">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="navbar-toggler-icon"></span>
                        <span class="navbar-toggler-icon"></span>
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
            <nav class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <?php foreach ($menus as $menu){ ?>
                        <li class="dropdown nav-item">
                            <a href="@if ($menu['slug'] == __('all.slug_contact'))<?=asset("App::getLocale()" . '/' . $menu['slug'])?>@else#<?=$menu['slug']?>@endif"
                                class="
                        <?php if (isset($menu['sub'])) {
                                    echo "dropdown-toggle";
                                };
                            ?>
                               nav-link grey-color"
                                <?php if (isset($menu['sub'])){
                                    echo  'data-toggle="dropdown"';
                                } ?>>
                                <?= $menu['title'] ?> </a>
                            <?php if (isset($menu['sub'])){ ?>
                                <nav class="dropdown-menu dropdown_menu-5 dropdown-with-icons">
                                    <?php foreach ($menu['sub'] as $subMenu){?>
                                        <?php if ($subMenu['lnkstyle'] == 1) {?>
                                            <a id="right-arrow"
                                                href="<?=""?>"
                                                class="dropdown-item mdlopener hvr-icon-forward dropdown_item">
                                                <i
                                                    class="material-icons hvr-icon">chevron_right</i><?=$subMenu['title']?>
                                            </a>
                                            <?php }else {?>
                                            <a data-toggle="modal" id="right-arrow" href="#<?=$subMenu['slug']?>"
                                                data-target="#<?=$subMenu['slug']?>"
                                                class="dropdown-item mdlopener hvr-icon-forward">
                                                <i
                                                    class="material-icons hvr-icon">chevron_right</i><?=$subMenu['title']?>
                                            </a>
                                            <?php }?>
                                    <?php }?>
                                </nav>
                            <?php }?>
                        </li>
                    <?php }?>
                    @if (!User::check())
                        <li class="dropdown nav-item dropdown-nav-lang d-md-none d-xl-none d-sm-block d-block"
                            id="login2">
                            <a href="#" class="dropdown-toggle nav-link grey-color"
                                data-toggle="dropdown"><?=__('all.user_login')?></a>

                            <div class="dropdown-menu dropdown-with-icons">
                                <a href="https://www.sfs.com.tr" data-toggle="modal" data-target="#alogin"
                                    class="dropdown-item hvr-icon-forward">
                                    <i class="material-icons hvr-icon">chevron_right</i> <?=__('all.agent_login')?>
                                </a>
                                <a href="#" data-target="#auth_clilogin" data-toggle="modal"
                                    class="mdlopen dropdown-item hvr-icon-forward"
                                    title="<?=__('all.insurance_login')?>">
                                    <i
                                        class="material-icons hvr-icon">chevron_right</i><?=__('all.insurance_login')?>
                                </a>
                            </div>
                        </li>
                    @else
                        <li class="dropdown nav-item dropdown-nav-style  d-m-none d-xl-none d-block">
                            <a href="#" class="dropdown-toggle nav-link grey-color" data-toggle="dropdown">
                                <?=__('all.profile')?>
                                <div class="ripple-container"></div>
                            </a>
                            <div class="dropdown-menu dropdown-with-icons">
                                <a href="<?=('profil.home')?>" class="dropdown-item hvr-icon-forward"><i
                                        class="material-icons hvr-icon">chevron_right</i><?=__('all.profile')?></a>
                                <a href="<?=('logout')?>" class="dropdown-item hvr-icon-forward"
                                    title="<?=__('all.logout')?>"><i
                                        class="material-icons hvr-icon">chevron_right</i><?=__('all.logout')?></a>
                            </div>
                        </li>
                    @endif
                </ul>
                <div class="d-flex align-items-center justify-content-end side_menu">
                    <div class="text-primary mr-2">
                        <a href="tel:<?=$settings['h_phone']?>"><span class="material-icons">phone</span>
                            <span class="fs-s">
                                <?=$settings['h_phone']?> </span><span class="fs-m"> <br>
                                <small class="d-flex justify-content-end"
                                    style="font-size: 0.6em;"><?=__('all.help_line')?></small>
                            </span>
                        </a>
                    </div>
                    <div class="vl"></div>
                    <div id="login" class="d-md-block d-sm-none">
                        @if (!User::check())
                            <li class="dropdown nav-item dropdown-nav-style">
                                <a href="#" class="dropdown-toggle nav-link grey-color" data-toggle="dropdown">
                                    <?=__('all.user_login')?>
                                    <div class="ripple-container"></div>
                                </a>
                                <div class="dropdown-menu dropdown-with-icons">
                                    <a target="_blank" rel="nofollow" href="https://www.sfs.com.tr/"
                                        class="mdlopen dropdown-item hvr-icon-forward"
                                        title="<?=__('all.agent_login')?>"><i
                                            class="material-icons hvr-icon">chevron_right</i><?=__('all.agent_login')?></a>
                                    <a href="#" data-target="#auth_clilogin" data-toggle="modal"
                                        class="mdlopen dropdown-item hvr-icon-forward"
                                        title="<?=__('all.insurance_login')?>"><i
                                            class="material-icons hvr-icon">chevron_right</i>
                                        <div class="ripple-container">
                                            <div class="ripple-decorator ripple-on ripple-out"
                                                style="left: 76.6167px; top: 16.85px; background-color: rgb(255, 255, 255); transform: scale(21.2);">
                                            </div>
                                        </div>
                                        <?=__('all.insurance_login')?>
                                    </a>
                                </div>
                            </li>
                        @else
                            <li class="dropdown nav-item dropdown-nav-style">
                                <a href="#" class="dropdown-toggle nav-link grey-color" data-toggle="dropdown">
                                    <?=__('all.profile')?>
                                    <div class="ripple-container"></div>
                                </a>
                                <div class="dropdown-menu dropdown-with-icons">
                                    <a href="<?=('profil.home')?>" class="dropdown-item hvr-icon-forward"><i
                                            class="material-icons hvr-icon">chevron_right</i><?=__('all.profile')?></a>
                                    <a href="<?=('logout')?>" class="dropdown-item hvr-icon-forward"
                                        title="<?=__('all.logout')?>"><i
                                            class="material-icons hvr-icon">chevron_right</i><?=__('all.logout')?></a>
                                </div>
                            </li>
                        @endif
                    </div>
                </div>
            </nav>
        </div>

        </div>
        <div class="modal fade" id="app_agent" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div>
                        <button class="btn btn-primary btn-fab close" data-dismiss="modal" aria-label="Close"><i
                                class="material-icons">clear</i></button>
                    </div>

                    <p style="margin-top:-30px; font-size:20px; text-align:center;"><?=__('all.agency_app')?></p>

                    <div class="d-block" id="appeal-agency">
                        <div class="modal-body">

                            <form name="app_agent" id="app_agent" class="needs-validation d-flex flex-column"
                                role="form">
                                <input minlength="9" maxlength="12" autocomplete="off" type="text" id="plate_no"
                                    name="lic_no" class="haspattern form-control btn-validation mb-1"
                                    placeholder="<?=__('all.plate_reg_number')?>"
                                    data-placeholder="<?=__('all.plate_reg_number')?>" required="">
                                <input id="phoneNumber" name="phoneNumber" maxlength="14" type="text"
                                    class="form-control btn-validation" placeholder="<?=__('all.phone_number')?>"
                                    required="">
                                <input id="email" name="email" type="email" class="form-control btn-validation"
                                    placeholder="<?=__('all.email')?>" required="">
                            </form>
                        </div>
                        <div class="ml-4 mt-4 mr-4">
                            @include("pages.modals.contract")
                        </div>
                        <div class="text-center">
                            <button type="button" id="btnApp" class="btn btn-primary mb-3 hvr-icon-forward">
                                <i class="material-icons hvr-icon">chevron_right</i>
                                <?=__('all.complete_app')?>
                            </button>

                        </div>
                    </div>

                    <div class="d-none" id="appeal-agency-code">
                        <div class="modal-body">
                            <div id="app" class="mb-2">

                            </div>
                            <form name="app_agent_code needs-validation" id="app_agent_code" role="form"
                                onsubmit="return false;">
                                <input id="phoneNumberVerify" name="phoneNumber" maxlength="14" type="text"
                                    class="form-control btn-validation mb-3"
                                    placeholder="<?=__('all.phone_number')?>" required="">
                                <input type="text" id="v_code" name="v_code" maxlength="6"
                                    class="form-control btn-validation mt-1"
                                    placeholder="<?=__('all.verification_code')?>">
                            </form>

                            <div class="text-center">
                                <button type="button" id="sendVerifyCode" class="btn btn-primary mb-3 hvr-icon-forward">
                                    <i class="material-icons hvr-icon">chevron_right</i>
                                    <?=__('all.complete_app')?>
                                </button>
                                <button style="height: 22px;  padding-top: 0px;" type="button" id="RecodeButton"
                                    class="btn btn-primary mb-1 hvr-icon-forward" disabled>
                                    <?=__('all.re_send')?>
                                </button>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
        <div class="modal fade" id="auth_clilogin" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">

                <div class="modal-content">
                    <div>
                        <button class="btn btn-primary btn-fab close" data-dismiss="modal" aria-label="Close"><i
                                class="material-icons">clear</i></button>
                    </div>

                    <form class="needs-validation" novalidate role="form" name="auth_userlogin" id="auth_userlogin"
                        action="<?=('login')?>" method="post">
                        @csrf
                        <div class="modal-body">
                            <center>
                                <div class="mb-2">
                                    <div class="offerbutton hvr-grow"><i class="material-icons">how_to_reg</i></div>
                                </div>
                                <div class="text-center mb-4"><?=__('all.insured_entry')?></div>
                                <input name="identity" maxlength="11" type="text"
                                    class="form-control btn-validation mb-1"
                                    placeholder="<?=__('all.identity_number')?>" required>
                                <input name="password" maxlength="50" type="password"
                                    class="form-control btn-validation" placeholder="<?=__('all.password')?>"
                                    required>
                                <div class="mt-4">
                                    <a href="#auth_forgetpassword" data-target="#auth_forgetpassword"
                                        class="mdlopen" onclick="hideModal('#auth_clilogin')"
                                        data-toggle="modal"><?=__('all.forget_password')?>
                                        <div class="ripple-container"></div>
                                    </a>
                                </div>
                                @if (Session::has('error'))
                                    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8.2.6/dist/sweetalert2.all.js"></script>
                                    <script>
                                        Swal.fire("<?=__('all.warning')?>", "<?="Session::get('error')"?>", "warning")
                                    </script>
                                @endif
                            </center>

                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-primary mb-3 hvr-icon-forward"><i
                                    class="material-icons hvr-icon">chevron_right</i>
                                <?=__('all.login')?>
                            </button>
                        </div>
                        <center>
                            <p> <?=__('all.dont_have_account')?><a href="#" data-target="#auth_cliregister"
                                    class="mdlopen" data-toggle="modal" data-dismiss="modal"
                                    aria-label="Close"><?=__('all.register')?></a></p>
                        </center>
                    </form>

                </div>
            </div>
        </div>
        <?= "Forget Password"  ?> 
        <div class="modal fade" id="auth_forgetpassword" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div>
                        <button class="btn btn-primary btn-fab close" data-dismiss="modal" aria-label="Close"><i
                                class="material-icons">clear</i></button>
                    </div>
                    <form class="needs-validation" novalidate id="auth_forgetpassword_form">
                        @csrf
                        <div class="modal-body">
                            <center>
                                <div class="mb-2">
                                    <div class="offerbutton hvr-grow"><i class="material-icons">how_to_reg</i></div>
                                </div>
                                <div class="text-center mb-4"><?=__('all.password_reset')?></div>
                                <input name="identityForget" maxlength="11" type="text"
                                    class="form-control btn-validation mb-1"
                                    placeholder="<?=__('all.identity_number')?>" required>
                                @if (Session::has('error'))
                                    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8.2.6/dist/sweetalert2.all.js"></script>
                                    <script>
                                        Swal.fire("<?=__('all.warning')?>", "<?="Session::get('error')"?>", "warning")
                                    </script>
                                @endif
                            </center>
                        </div>
                        <div class="text-center">
                            <button type="button" id="auth_forgetpassword_btn"
                                class="btn btn-primary mb-3 hvr-icon-forward">
                                <i class="material-icons hvr-icon">chevron_right</i>
                                <?=__('all.send_verification_code')?>
                            </button>
                        </div>
                        <center>
                            <p class="py-3"> <?=__('all.dont_have_account')?>&nbsp;<a href="#"
                                    data-target="#auth_cliregister" class="mdlopen" data-toggle="modal"
                                    data-dismiss="modal" aria-label="Close"><?=__('all.register')?></a>
                            </p>
                        </center>
                    </form>
                    <form class="needs-validation d-none" novalidate id="auth_forgetpassword_code">
                        @csrf
                        <div class="modal-body">
                            <div id="app" class="mb-2">
                                <div class="base-timer">
                                    <svg class="base-timer__svg" viewBox="0 0 100 100"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g class="base-timer__circle">
                                            <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                                            <path id="base-timer-path-remaining" stroke-dasharray="283"
                                                class="base-timer__path-remaining red"
                                                d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"></path>
                                        </g>
                                    </svg>
                                    <span id="base-timer-label_2" class="base-timer__label"></span>
                                </div>
                            </div>
                            <center>
                                <div class="text-center mb-4"><?=__('all.password_reset')?></div>
                                <input name="identity" maxlength="11" type="text" class="form-control mb-1"
                                    placeholder="<?=__('all.identity_number')?>" required>
                                <input name="verifyCode" maxlength="50" type="text" class="form-control"
                                    placeholder="<?=__('all.verification_code')?>" required>

                            </center>
                        </div>
                        <div class="text-center">
                            <button type="button" id="auth_forgetpassword_btn_code"
                                class="btn btn-primary mb-3 hvr-icon-forward">
                                <i class="material-icons hvr-icon">chevron_right</i>
                                <?=__('all.apply')?>
                            </button>
                        </div>
                        <center>
                            <p class="py-3"> <?=__('all.dont_have_account')?>&nbsp;<a href="#"
                                    data-target="#auth_cliregister" class="mdlopen" data-toggle="modal"
                                    data-dismiss="modal" aria-label="Close"><?=__('all.register')?></a>
                            </p>
                        </center>
                    </form>
                </div>
            </div>
        </div>
        <?= "End Forget Password " ?> 
        <div class="modal fade" id="auth_cliregister" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div>
                        <button class="btn btn-primary btn-fab close" data-dismiss="modal" aria-label="Close"><i
                                class="material-icons">clear</i></button>
                    </div>

                    <div class="client-register" id="">
                        <form class="needs-validation" novalidate role="form" name="client-register"
                            id="client-register" method="post">
                            <div class="modal-body">
                                <div style="text-align: center;" class="mb-2">
                                    <div class="mb-2">
                                        <div class="offerbutton hvr-grow"><i class="material-icons">how_to_reg</i>
                                        </div>
                                    </div>
                                    <div class="text-center mb-4"><?=__('all.register')?></div>
                                    <input name="identity" id="usernameforreg" maxlength="11" type="text"
                                        class="form-control btn-validation mb-1"
                                        placeholder="<?=__('all.identity_number')?>" required="">
                                    <input id="phonenumforreg" name="phoneNumber" maxlength="14" type="text"
                                        class="form-control btn-validation"
                                        placeholder="<?=__('all.phone_number')?>" required="">
                                </div>
                                @include("pages.modals.contract")

                            </div>
                            <div class="text-center mb-3">
                                <button type="button" id="register-btn"
                                    class="btn btn-primary mb-3 hvr-icon-forward"><i
                                        class="material-icons hvr-icon">chevron_right</i> <?=__('all.register')?>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="client-register-code" id="client-register-code">
                        <div class="modal-body">
                            <div id="app" class="mb-2">
                                <div class="base-timer">
                                    <svg class="base-timer__svg" viewBox="0 0 100 100"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g class="base-timer__circle">
                                            <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                                            <path id="base-timer-path-remaining" stroke-dasharray="283"
                                                class="base-timer__path-remaining red"
                                                d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"></path>
                                        </g>
                                    </svg>
                                    <span id="base-timer-label_3" class="base-timer__label"></span>
                                </div>
                            </div>

                            <form name="client-register-code" id="client-register-code" role="form"
                                onsubmit="return false;">
                                <input type="text" name="phoneNumber" maxlength="6"
                                    class="form-control btn-validation mt-1"
                                    placeholder="<?=__('all.phone_number')?>" disabled>
                                <input type="text" id="register_v_code" name="v_code" maxlength="6"
                                    class="form-control btn-validation mt-1"
                                    placeholder="<?=__('all.verification_code')?>">
                            </form>

                            <div class="text-center">
                                <button type="button" id="btn-reg" class="btn btn-primary mb-2 hvr-icon-forward">
                                    <i class="material-icons hvr-icon">chevron_right</i>
                                    <?=__('all.verify_code')?>
                                </button>
                                <a href="#" id="reg-resend-btn" class="my-2 hvr-icon-forward d-none" disabled>
                                    <?=__('all.re_send')?>
                                </a>

                            </div>
                        </div>
                    </div>
                    <center>
                        <p class="mb-3"> <?=__('all.do_have_account')?> <a href="#" data-toggle="modal"
                                data-target="#auth_clilogin" data-dismiss="modal" aria-label="Close">
                                <?=__('all.login')?></a></p>
                    </center>
                </div>
            </div>
        </div>
    </nav>
    <!-- End Nav -->
    <div class="main">
        