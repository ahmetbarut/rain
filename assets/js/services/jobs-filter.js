$(document).ready(function () {
    // $(".jobs option").remove();


    let query;
    var q = $(".jobs").select2({
        ajax: {
            method: "POST",
            url: "/tr/jobs",
            dataType: "Json",
            processResults: function (response, params) {
                   response.map(function (elements){
                       $(".jobs").prepend(`
                            <option value="${elements.j_code}">${elements.j_name}</option>
                       `)
                   });
            }
        }
    // $(".jobs").change(function (){
    //     console.log($(".jobs option:selected").text());
    })

});

