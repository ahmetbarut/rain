</div>
<!-- Çerezler -->
<div class="row justify-content-center mt-5 p-3 bg-transparent rounded cookie_contract" style="display:none;">
    <div class="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
        <div class="d-flex bg-white flex-column flex-xl-row flex-lg-row align-items-center shadow rounded p-4">
            <div class="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9" style="font-size: 12px">
                <strong>SİGORTA TÜRK</strong> web sitesinde size daha iyi bir hizmet sunabilmek için çerezler kullanıyoruz.
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                <button class="btn btn-primary rounded btn-sm float-right" id="cookie-contract-btn">TAMAM</button>
            </div>
        </div>
    </div>
</div>
<!-- Çerezler -->
<div
    style=" padding:20px 20px ;margin-top: 64px;background-color: #f7f7f7; display: flex;flex-direction: row;background-color: #ececec;display: flex;flex-direction: row;justify-content: space-evenly;align-items: center;"
    class="col-12">
    <div class="container">
        <div class="row" style="text-align:center;">
            <div class="col-md-4" style="text-align:center;">
                <img class="lazy" src="<?=asset("/")?>assets/images/mastercard.webp"
                     data-src="<?=asset("/")?>assets/images/mastercard.webp" alt="mastercard" title="mastercard" height="50" width="84"/>
            </div>
            <div class="col-md-4">
                <img class="lazy" src="<?=asset("/")?>assets/images/visa.webp"
                     data-src="<?=asset("/")?>assets/images/visa.webp" alt="visa" title="visa" height="50" width="89"/>
            </div>
            <div class="col-md-4">
                <img style="max-width:150px;" src="<?=asset("/")?>assets/images/american-express.webp" class="lazy"
                     data-src="<?=asset("/")?>assets/images/american-express.webp" alt="american express" title="american express" height="50" width="150"/>
            </div>
        </div>
    </div>
</div>
</div>
<!--  Footer  -->
<footer class="footer-color">
    <div class="container">
        <div class="mb-3">
            <div class="row">
                <!--About -->
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <h3 class="mt-3 mb-3"><?= __("all.corporate") ?></h3>
                    <ul class="links">
                        @foreach($corporates["d"] as $corporate)
                            <li>
                                <a class="hvr-icon-forward"
                                   href="{{ route("corporates", $corporate["slug"]) }}"><span
                                        class="material-icons hvr-icon">chevron_right</span>
                                    {{ $corporate["title"] }}</a>
                            </li>
                        @endforeach
                    </ul>
                </div>
                <!--/About-->

                <!--Sitemap-->
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <h3 class="mt-3 mb-3"><?= __("all.site_map") ?></h3>
                    <ul class="links" id="sitemap">
                        <li>
                            <a class="hvr-icon-forward"
                               href="{{ route( "services", __("all.slug_agents")) }}"><span
                                    class="material-icons hvr-icon">chevron_right</span> <?= __("all.agents") ?>
                            </a>
                        </li>
                        <li>
                            <a class="hvr-icon-forward"
                               href="{{ route("services" , __("all.slug_glass")) }}"><span
                                    class="material-icons hvr-icon">chevron_right</span> <?= __("all.controacted-glass-?>rvices") ?>
                            </a>
                        </li>
                        <li>
                            <a class="hvr-icon-forward"
                               href="{{ route("contact") }}"><span
                                    class="material-icons hvr-icon">chevron_right</span> <?= __("all.contact") ?>
                            </a>
                        </li>
                        <li>
                            <a class="hvr-icon-forward"
                               href="{{ route("blog") }}"><span
                                    class="material-icons hvr-icon">chevron_right</span> <?= __("Blog") ?>
?>                          </a>
                        </li>
                        <li>
                            <a class="hvr-icon-forward"
                               href="{{ route("vehicle.show", "kasko-deger-listesi") }}"><span
                                    class="material-icons hvr-icon">chevron_right</span> <?= __("all.insurance_value_list") ?>
                            </a>
                        </li>

                    </ul>
                </div>
                <!--/Sitemap-->


                <!--Useful Links-->
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <h3 class="mt-3 mb-3"><?= __("all.use_full_links") ?></h3>
                    <ul class="links">
                        <li>
                            <a class="hvr-icon-forward" href="https://www.tsb.org.tr/" rel="noopener"
                               target="_blank"><span class="material-icons hvr-icon">chevron_right</span>
                                <?= __("all.turkish_insurance_association") ?>
                            </a>
                        </li>
                        <li>
                            <a class="hvr-icon-forward" href="https://www.egm.org.tr/" rel="noopener"
                               target="_blank"><span class="material-icons hvr-icon">chevron_right</span>
                                <?= __("all.retirement_surveillance_system") ?>

                            </a>
                        </li>
                        <li>
                            <a class="hvr-icon-forward"
                               href="https://www.tsb.org.tr/default.aspx?pageID=654&yid=193" rel="noopener"
                               target="_blank"><span class="material-icons hvr-icon">chevron_right</span>
                                <?= __("all.insurance_law") ?>
                            </a>
                        </li>
                    </ul>
                </div>
                <!--/Useful Links-->

                <!--Contact -->
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <div class="align-content-start">
                        <h3 class="mt-3 mb-3"><?= __("all.contact") ?></h3>
                        <ul class="links">
                            <li>
                                <a class="hvr-icon-forward" href="tel:{{ $settings ["h_phone"] }}">
                                    <span class="material-icons hvr-icon">chevron_right</span>
                                    {{ $settings["m_phone"] }} </a>
                            </li>
                            <li>
                                <a class="hvr-icon-forward" href="mailto:{{ $settings["mail"] }}">
                                    <span class="material-icons hvr-icon">chevron_right</span>
                                    {{ $settings["mail"] }}                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    {{ $settings["adress"] ?? "Girilmedi" }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--/Contact-->
            </div>
        </div>

    </div>
    <!--copyright -->
    <div class="footer-bottom">
        <div class="container">
            <div class="d-flex align-content-center justify-content-between flex-wrap">
                <div class="copyright mt-3">
                    <p>Copyright © - 2021 <a href="<?=asset("/")?>">{{ $settings["c_name"] }}</a></p>
                </div>
                <div class="mb-3 mt-3">
                    <a class="mr-4 kvkk"
                       href="{{ route("contracts", $contractSlug) }}"><?= __("all.contracts") ?></a>
                </div>
            </div>
        </div>
    </div>
    <!--/copyright -->
</footer>
<!--  End Footer  -->

<!--Mobile Menu-->
<nav class="mobile-nav mt-5 d-inline-block d-sm-none">
    <div class="container">
        <nav class="bottom-nav">
            <a href="{{ isActive(asset("/". App::getLocale())) ? "#not-active" :asset("/" . App::getLocale(), true)  }}" class="bottom-nav-item" >
                <div class="bottom-nav-link" @if (isActive(asset("/". App::getLocale())))
                    style="color: red"
                @endif>
                    <i class="material-icons">home</i>
                    <?= __("all.home") ?>
                </div>
            </a>

            <a href="tel:{{ $settings["m_phone"] }}" class="bottom-nav-item">
                <div class="bottom-nav-link">
                    <i class="material-icons">phone</i>
                    <?= __("all.damage_notice") ?>
                </div>
            </a>
            <a href="@if(isActive(asset("/". App::getLocale()))){{ "#" }}@else{{ asset("/#get_offer") }}@endif" class="bottom-nav-item @if(isActive(asset("/" . App::getLocale()))) goToOffer @endif">
                <div class="bottom-nav-link">
                    <i class="material-icons">policy</i>
                    <?= __("all.get_offer") ?>
                </div>
            </a>
            <a href="{{ (isActive(route("services", __("all.slug_agents")))) ? "" : route("services", __("all.slug_agents")) }}" class="bottom-nav-item">
                <div class="bottom-nav-link "@if (isActive(route("services", __("all.slug_agents"))))
                style="color: red"@endif>
                    <i class="material-icons">how_to_reg</i>
                    <?= __("all.agents") ?>
                </div>
            </a>
        </nav>
    </div>
</nav>
<!--/Mobile Menu-->

<script src="<?=asset("/")?>assets/js/jquery.js"></script>
<script src="<?=asset("/")?>assets/js/popper.min.js"></script>
<script src="<?=asset("/")?>assets/js/select2.min.js"></script>
<script src="<?=asset("/")?>assets/js/sweetalert2.all.min.js"></script>
<script src="<?=asset("/")?>assets/js/core/bootstrap-material-design.min.js"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>


<script src="<?=asset("/")?>assets/js/mask.min.js"></script>
<script src="<?=asset("/")?>assets/TimeCircles/TimeCircles.js"></script>
<script src="<?=asset("/")?>assets/js/main.js"></script>
<script src="<?=asset("/")?>assets/js/services/apeal_agents.js"></script>
<script src="<?=asset("/")?>assets/js/services/register.js"></script>
<script src="<?=asset("/")?>assets/js/kit.min.js"></script>
<script src="<?=asset("/")?>assets/js/cookie.js"></script>
  
<script src="assets/js/services/apeal_agents.js"></script>
    <script src="assets/js/services/index.js"></script>

    <script>
        $(document).ready(function() {
            $.ajax({
                method: "",
                url: "/getCitys",
                data: {
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
                data: {
                    _token: $("meta[name=csrf-token]").attr("content"),
                },
                success: function(response) {
                    $(".jobs").prepend(`<option selected disabled>${response.key}</option>`);
                    response.data.map(function(jobs) {
                        $(".jobs").prepend(`
                    <option value="${jobs.j_code}">${jobs.j_name}</option>
                `)
                    });
                },
            });
        });
    </script>
<script>
    $(".goToOffer").click(function (event){
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $("#get_offer").offset().top
        }, 2000);
    });


</script>

</body>

</html>
