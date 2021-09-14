@extends("layouts.home")
@section("title", __("all.contact"))

@section("content")
    @include('sweetalert::alert', ['cdn' => "https://cdn.jsdelivr.net/npm/sweetalert2@9"])

    @if (Session::has("fail"))
        @php(alert()->warning(Session::get("fail")))

    @elseif (Session::has("success"))
        @php(alert()->success(Session::get("success")))
    @endif

    <div class="container">
        <div class="m-none">
            <div class="hidden-xs page-product header-filter clear-filter purple-filter hidden-xs"
                 style="background-image: url('/assets/images/banner/blog-banner.jpg'); ">
                <div class="container animate__animated animate__backInDown">
                    <div class="brand">
                        <h1 class="banner-title">{{ __("all.contact") }}</h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-none">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="{{ config("app.url") }}">{{ __("all.home") }}</a></li>
                    <li class="breadcrumb-item" aria-current="page"></li>
                    {{ __("all.contact") }}
                </ol>
            </nav>
        </div>

        <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-4 col-xl-4 order-xs-12">
                <div class="sidebar-right-2 sticky">
                    <div class="category-2 widget">
                        <h3 class="sidebar-title">{{ __("all.help_line") }}</h3>
                        <div class="s-border"></div>
                        <div class="m-border"></div>
                        <div class="col-md-12 text-center">
                            <a href="tel:{{ $settings["h_phone"] }}"><span
                                    class="material-icons">phone</span>{{ $settings["h_phone"] }}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-8 col-lg-8 col-xl-8 order-xs-1">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card-2">
                            <div class="row">
                                <div class="col-md-2 col-sm-12 d-flex align-items-center mx-auto">
                                    <img class="logo m-2 text-center d-flex justify-content-center"
                                         src="/assets/images/logo/sigortaturklogored.svg" alt="...">
                                </div>

                                <div class="col-md-10 d-flex align-items-center">
                                    <div class="col-md-12">
                                        <div class="col-md-12 m-2 d-flex align-items-center">
                                            <span class="material-icons mr-1">person_pin</span> Genel Müdürlük
                                        </div>
                                        <div class="col-md-12 m-2 d-flex align-items-center">
                                            <span
                                                class="material-icons mr-1">location_on</span>{{ $settings["adress"] }}
                                        </div>
                                        <div class="col-md-12 m-2 d-flex align-items-center flex-wrap">
                                            <a class="mr-3" href="mailto:{{ $settings["mail"] }}"><span
                                                    class="material-icons mr-1">alternate_email</span>{{ $settings["mail"] }}
                                            </a>
                                            <a class="mr-3" href="tel:0(312) 473 20 30"><span
                                                    class="material-icons mr-1">phone</span>{{ $settings["h_phone"] }}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        @if (Session::has("fail"))
                            <div class="alert-danger alert text-center">
                                {{ Session::get("fail") }}
                            </div>
                        @elseif (Session::has("success"))
                            <div class="alert alert-success text-center">
                                {{ Session::get("success") }}
                            </div>
                        @endif
                        <form role="form" name="Proposal" id="Proposal" class="needs-validation" novalidate="novalidate"
                              method="post" action="{{ route("contact.save") }}">
                            <div class="proposal-form-card">
                                @csrf
                                <h5 style="text-align:center;">{{ __("all.send_us_message") }}</h5>
                                <div class="proposal-widget">
                                    <div class="row ">
                                        <div class="col-12 col-md-6 input-group-2 mb-2">
                                            <span class="bmd-form-group">
                                                <input name="name" id="name" data-toggle="tooltip" data-placement="top" class="form-control btn-validation" placeholder="{{ __("all.name_surname") }}" required="" data-original-title="" title=""></span>
                                            @error("name")
                                            <div class="alert alert-danger text-center">
                                                {{ $message }}
                                            </div>
                                            @enderror
                                        </div>

                                        <div class="col-12 col-md-6 input-group-2 mb-2">
                                            <span class="bmd-form-group"><input name="mail" id="mail"
                                                                                data-toggle="tooltip"
                                                                                data-placement="top"
                                                                                class="form-control btn-validation"
                                                                                placeholder="{{ __("all.email") }}"
                                                                                required="" data-original-title=""
                                                                                title=""></span>
                                            @error("mail")
                                            <div class="alert alert-danger text-center">
                                                {{ $message }}
                                            </div>
                                            @enderror
                                        </div>
                                        <div class="col-12 col-md-12 input-group-2 mb-2">

                                            <select class="selects form-control select2-hidden-accessible"
                                                    name="department" id="departman" data-toggle="tooltip"
                                                    data-placement="top" title="" placeholder="a" min="1" required=""
                                                    data-select2-id="select2-data-departman" tabindex="-1"
                                                    aria-hidden="true" data-original-title="a">
                                                <option value="0"
                                                        data-select2-id="select2-data-2-vhpw">{{ __("all.select_department") }}</option>
                                                <option value="1">Teknik Destek</option>
                                                <option value="2">Yönetim</option>
                                                <option value="3">Muhasebe</option>
                                            </select>
                                            @error("department")
                                            <div class="alert alert-danger text-center">
                                                {{ $message }}
                                            </div>
                                            @enderror
                                        </div>
                                        <div class="col-12 col-md-12 input-group-2 mb-2">
                                            <span class="bmd-form-group"><textarea class="form-control btn-validation"
                                                                                   name="message" id="content" cols="30"
                                                                                   rows="10"
                                                                                   placeholder="{{ __("all.your_message") }}"
                                                                                   required=""></textarea></span>
                                            @error("message")
                                            <div class="alert alert-danger text-center">
                                                {{ $message }}
                                            </div>
                                            @enderror
                                        </div>
                                        <div class="col-12 col-md-12 input-group-2 mb-2">
                                            <center>
                                                <x-recaptcha></x-recaptcha>
                                                @error("g-recaptcha-response")
                                                    <div class="alert alert-danger">
                                                        {{ $message }}
                                                    </div>
                                                @enderror
                                            </center>
                                        </div>
                                        <div class="col-12 col-md-12 input-group-2 mb-2">
                                            <center>
                                                <button type="submit" id="btnProposal"
                                                        class="btn btn-primary hvr-icon-forward"><i
                                                        class="material-icons hvr-icon">chevron_right</i>{{ __("all.send_message") }}
                                                </button>
                                            </center>
                                        </div>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section("scriptjs")
    <script>
        $(document).ready(function (){
            $(".recaptcha-area").removeClass("d-none");
        })
    </script>
@endsection
