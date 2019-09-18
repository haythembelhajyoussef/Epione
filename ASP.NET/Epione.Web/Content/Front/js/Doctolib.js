    $(document).ready(function () {
        $("#pathFeedback").css("display", "none")
        $("#passwordFeedback").hide();
        $(".otherinputs").hide();
    });

/* $("#continueBtn").click(function () {
     var password = $("#password").val();
     var passwordC = $("#passwordC").val();
     var path = $("#path").val();
     var email = $("#email").val();
     if (password != passwordC) {
         $("#passwordFeedback").show();
     } else {
         $("#passwordFeedback").hide();
         window.location.href = "/Doctolib/addDoctorDoctolib/" + path;
     }
});*/
$("#path").keyup(function () {
    var path = $("#path").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var passwordC = $("#passwordC").val();

    var btnContinue = $("#continueBtn");
    $.ajax({
        url: 'http://localhost:8089/Epione-web/rest/doctolib/checkpath/' + path,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        jsonType: 'json',
        statusCode: {
            500: function () {
                btnContinue.prop('disabled', true);
                $("#pathFeedback").css("display", "block")
            }
        },
        success: function (rep) {
            if (rep.value != null) {
                //if (path != "" && email != "" && password != "" && passwordC != "") {
                btnContinue.prop('disabled', false);
                //}
                $("#path").removeClass("is-invalid");
                $("#path").addClass("is-valid");
                $("#pathFeedback").css("display", "none");
                $("#fullName").html(rep.value);
                $(".otherinputs").show();
            } else {
                btnContinue.prop('disabled', true);
                $("#pathFeedback").css("display", "block");
                $(".otherinputs").hide();
                $("#fullName").html("");
            }
        }
    })
});