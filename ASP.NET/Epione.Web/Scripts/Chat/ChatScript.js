//On init
$('.messages').hide();
$('.contact-profile').hide();

$('.message-input').hide();
$('.buttons').hide();
$("#previewImg").hide();
$(".new-message").hide();//+1

var idConversation = -1;
var file = null;
var fileRecord = null;

var fileKey = "#+-*/64168!__)(*&?%#";

var documents = [".doc", ".docx", ".odt", ".ods", ".ppt", ".pptx", ".pdf", ".xls", ".xlsx", ".txt"];
var audios = [".aac", ".mp3", ".wav", ".wma", ".ogg", ".midi", ".aif", ".aifc", ".aiff"];// all chechekd
var videos = [".mp4", ".webm"];
var images = [".tif, .tiff", ".gif", ".jpeg", ".jpg", ".png", ".jif", ".jfif", ".jp2", ".jpx", ".j2k", ".j2c", ".fpx", ".pcd"];// all chechekd

// *********************************************************************************************

var recordS = 0, timeOut = 0;
//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb.
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

// *********************************************************************************************

function startRecording() {
    console.log("recordButton clicked");

    var constraints = { audio: true, video: false };

    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

        audioContext = new AudioContext();
        /*  assign to gumStream for later use  */
        gumStream = stream;
        /* use the stream */
        input = audioContext.createMediaStreamSource(stream);

        /*
            Create the Recorder object and configure to record mono sound (1 channel)
            Recording 2 channels  will double the file size
        */
        rec = new Recorder(input, { numChannels: 1 });

        //start the recording process
        rec.record();

        console.log("Recording started");

    }).catch(function (err) {
        //enable the record button if getUserMedia() fails
       // alert("Please authorize the browser to use your micro");
        $("#modalMsg").text("Please authorize the browser to use your micro");
        $('#modal').modal("toggle");
    });
}





 // *********************************************************************************************
  
// When attachemetn is changed
$('#uploadFile').change(function (event) {
    var fakeUrl = $('#uploadFile').val();
    var name = fakeUrl.substring(fakeUrl.lastIndexOf("\\") + 1);

    if (event.target.files.length > 0) {
       
        if (verifExtension(name.substring(name.lastIndexOf(".")).replace("1", "").trim()) === false){
             //alert("media type not supported !");
            $("#modalMsg").text("Media type not supported !");
            $('#modal').modal("toggle");
             return false;
        }
        extension = name.substring(name.lastIndexOf(".")).replace("1", "").trim();
        file = event.target.files[0];
        path = URL.createObjectURL(event.target.files[0]);
        previewImage(path, extension);
        $(this).val('');
    }

});

// When the user clicks on <span> (x)
$("#previewImg .close").click(function () {
    $("#previewImg").fadeOut(1000);
    $('#uploadFile').val('');
    file = null;
});

// ************************************************************************************************
$("#profile-img").click(function () {
    $("#status-options").toggleClass("active");
});

$("#filterbtn").click(function () {
    $("#filter").toggleClass("active");
});

$("#filter ul li").click(function (e) {
    $("#filter ul li span").hide();
    $(this).children("span").show();
    alert( "id: "+e.currentTarget.attributes.id.value);
    $("#filter").removeClass("active");
});

$(".expand-button").click(function () {
    $("#profile").toggleClass("expanded");
    $("#contacts").toggleClass("expanded");
});

$("#status-options ul li").click(function () {
    $("#profile-img").removeClass();
    $("#status-online").removeClass("active");
    $("#status-away").removeClass("active");
    $("#status-busy").removeClass("active");
    // $("#status-offline").removeClass("active");
    $(this).addClass("active");

    if ($("#status-online").hasClass("active")) {
        $("#profile-img").addClass("online");
    } else if ($("#status-away").hasClass("active")) {
        $("#profile-img").addClass("away");
    } else if ($("#status-busy").hasClass("active")) {
        $("#profile-img").addClass("busy");
        } else {
        $("#profile-img").removeClass();
    }

    $("#status-options").removeClass("active");
});


$(".contact").click(function (e) {
    $(".contact").removeClass("active");
    $(this).addClass("active");

    $('.message-input').show();
    $('.buttons').show();

    $(".emojionearea-editor").empty();
    $("#previewImg").hide();
    $('.contact-profile').hide();
    $('.messages').hide();

    idConversation = e.currentTarget.attributes.id.value;
    let messages = $('#messages-' + idConversation);

    $('#contact-profile-' + idConversation).show();
    messages.show();

    messages.animate({scrollTop: 100000}, "fast");
});



$('#attachment').click(function (e) {
    $(".emojionearea-editor").focus();
    if (!$(".contact").hasClass("active")) {
        e.preventDefault();
    } else
        $('#uploadFile').click();

});

// Preview image
function previewImage(path, extension) {

    //$("#previewImg .close").click();
    $("#previewImg").hide();
    var pathFilePreview = verifExtension(extension);
    if (pathFilePreview !== "image") {
        $("#previewImg img").attr('src', pathFilePreview);
    } else {
        $("#previewImg img").attr('src', path);
    }
    $("#previewImg").slideDown("slow");
}


// Filter contact by Name
$("#searchInput").on("keyup", function () {
    var value = $(this).val().toLowerCase().trim();

    if (value.length > 0) {

        $("#contacts .contact").each(function () {
            console.log($(this).find(".name").text().toLowerCase());
            if ($(this).find(".name").text().toLowerCase().indexOf(value) > -1)
                $(this).slideDown("fast");
            else
                $(this).slideUp("fast");
        });
    } else {
        $("#contacts .contact").each(function () {
            $(this).show();
        });
    }
});

function updateNbrAlreadyMessages(idConv) {
    var nbrMsg = parseInt($("#contact-profile-" + idConv + " .chat-num-messages").text().replace(/[^0-9\.]/g, ''), 10);
    nbrMsg++;
    //alert("new nbr = " + nbrMsg);
    $("#contact-profile-" + idConv+" .chat-num-messages").text('already ' + nbrMsg + ' messages');
}

function updatePlusNewMessages(idConv) {
    var m = $("#" + idConv + " .wrap .new-message");
    var nbrMsg = parseInt(m.text().replace(/[^0-9\.]/g, ''), 10);
    if (nbrMsg > 0) {
        nbrMsg++;
        m.text('+' + nbrMsg);
    } else if (nbrMsg >= 99)
        m.text('+99');
    else {
        m.text('+1');
    }
    m.fadeIn(300);
}

function getNbrMsgNotSeen(idConv) {
    r = $("#messages-" + idConv + " .replies").length;
    s = $("#messages-" + idConv + " .replies .seen").length;
    //r = rep.length;
    //s = 0;
    //rep.children().each(function() {
    //    if ($(this).attr("class") === "seen")
    //        s++;
    //});
    return r - s;
    //var m = $("#" + idConv + " .wrap .new-message");
    //var nbr = parseInt(m.text().replace(/[^0-9\.]/g, ''), 10);
    //if (nbr < 0)
    //    return 0;
    //return nbr;
}

function getPreviewMsgFile(fileNameDB) {
    var pathFilePreview = verifExtension(fileNameDB.substr(fileNameDB.lastIndexOf(".")));

    if (pathFilePreview.includes("no_prev")) {// it's a document
        return '<a href="' + fileNameDB + '" target="_blank" class="tooltip-test" ' +
            'title="Click to view in new tab"><img src="' + pathFilePreview + '"></a>';
    } else if (pathFilePreview.includes("audio")) {
       return '<audio class="player" controls>' +
            ' <source src="' + fileNameDB + '" type="audio/mp3"></audio>';
    } else if (pathFilePreview.includes("video")) {
       return ' <video controls crossorigin playsinline poster="' + pathFilePreview + '" class="player">' +
           '<source src="' + fileNameDB + '" type="video/' + fileNameDB.substr(fileNameDB.lastIndexOf(".")).substr(1) + '" size="576">' +
            ' <a href="' + fileNameDB + '" download>Download</a></video>';
    } else {// it's an image
        return '<a href="' + fileNameDB + '" target="_blank"><img src="' + fileNameDB + '"></a>';
    }
}

function verifExtension(extension) {
    extension = extension.toLowerCase();
    if (documents.includes(extension))
        return "/Content/Files/no_preview.png";
    else if (audios.includes(extension))
        return "/Content/Files/audio_preview.jpg";
    else if (videos.includes(extension))
        return "/Content/Files/video_preview.png";
    else if (images.includes(extension))
        return "image";
    else
        return false;
}




// Reset
$("#delete").on('mouseout', function () {
    if ($(this).hasClass("confirm") || $(this).hasClass("done")) {
        setTimeout(function () {
            $("#delete").removeClass("confirm").removeClass("done");
            $("#delete span").text("Delete");
        }, 3000);
    }
});

function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}

var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
    timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
    timezoneClip = /[^-+\dA-Z]/g,
    pad = function (val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) val = "0" + val;
        return val;
    };

// Regexes and supporting functions are cached through closure
function dateFormat(date, mask, utc) {
    // var dF = dateFormat;

    // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
    if (arguments.length === 1 && Object.prototype.toString.call(date) === "[object String]" && !/\d/.test(date)) {
        mask = date;
        date = undefined;
    }

    // Passing date through Date applies Date.parse, if necessary
    date = date ? new Date(date) : new Date;
    if (isNaN(date)) throw SyntaxError("invalid date");

    mask = String(masks[mask] || mask || masks["default"]);

    // Allow setting the utc argument via the mask
    if (mask.slice(0, 4) === "UTC:") {
        mask = mask.slice(4);
        utc = true;
    }

    var _ = utc ? "getUTC" : "get",
        d = date[_ + "Date"](),
        D = date[_ + "Day"](),
        m = date[_ + "Month"](),
        y = date[_ + "FullYear"](),
        H = date[_ + "Hours"](),
        M = date[_ + "Minutes"](),
        s = date[_ + "Seconds"](),
        L = date[_ + "Milliseconds"](),
        o = utc ? 0 : date.getTimezoneOffset(),
        flags = {
            d: d,
            dd: pad(d),
            ddd: i18n.dayNames[D],
            dddd: i18n.dayNames[D + 7],
            m: m + 1,
            mm: pad(m + 1),
            mmm: i18n.monthNames[m],
            mmmm: i18n.monthNames[m + 12],
            yy: String(y).slice(2),
            yyyy: y,
            h: H % 12 || 12,
            hh: pad(H % 12 || 12),
            H: H,
            HH: pad(H),
            M: M,
            MM: pad(M),
            s: s,
            ss: pad(s),
            l: pad(L, 3),
            L: pad(L > 99 ? Math.round(L / 10) : L),
            t: H < 12 ? "a" : "p",
            tt: H < 12 ? "am" : "pm",
            T: H < 12 ? "A" : "P",
            TT: H < 12 ? "AM" : "PM",
            Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
            o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
            S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 !== 10) * d % 10]
        };

    return mask.replace(token, function ($0) {
        return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
    });
}
// Some common format strings
var masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};
// Internationalization strings
var i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};



/*
function getCaret(el) {
    if (el.selectionStart) {
        return el.selectionStart;
    } else if (document.selection) {
        el.focus();
        var r = document.selection.createRange();
        if (r == null) {
            return 0;
        }
        var re = el.createTextRange(), rc = re.duplicate();
        re.moveToBookmark(r.getBookmark());
        rc.setEndPoint('EndToStart', re);
        return rc.text.length;
    }
    return 0;
}

function convertCharStr2SelectiveCPs(str, parameters, pad, before, after, base) {
    // converts a string of characters to code points or code point based escapes
    // str: string, the string to convert
    // parameters: string enum [ascii, latin1], a set of characters to not convert
    // pad: boolean, if true, hex numbers lower than 1000 are padded with zeros
    // before: string, any characters to include before a code point (eg. &#x for NCRs)
    // after: string, any characters to include after (eg. ; for NCRs)
    // base: string enum [hex, dec], hex or decimal output
    // Usage :
    //          result = convertCharStr2SelectiveCPs( message, 'ascii',  false, '&#', ';', 'dec' );
    //          result = convertCharStr2SelectiveCPs( str, 'ascii', true, '&#x', ';', 'hex' );
    var haut = 0;
    var n = 0;
    var cp;
    var CPstring = '';
    for (var i = 0; i < str.length; i++) {
        var b = str.charCodeAt(i);
        if (b < 0 || b > 0xFFFF) {
            CPstring += 'Error in convertCharStr2SelectiveCPs: byte out of range ' + dec2hex(b) + '!';
        }
        if (haut != 0) {
            if (0xDC00 <= b && b <= 0xDFFF) {
                if (base == 'hex') {
                    CPstring += before + dec2hex(0x10000 + ((haut - 0xD800) << 10) + (b - 0xDC00)) + after;
                }
                else {
                    cp = 0x10000 + ((haut - 0xD800) << 10) + (b - 0xDC00);
                    CPstring += before + cp + after;
                }
                haut = 0;
                continue;
            }
            else {
                // CPstring += 'Error in convertCharStr2SelectiveCPs: surrogate out of range ' + dec2hex(haut) + '!';
                haut = 0;
            }
        }
        if (0xD800 <= b && b <= 0xDBFF) {
            haut = b;
        }
        else {
            if (parameters.match(/ascii/) && b <= 127) { //  && b != 0x3E && b != 0x3C &&  b != 0x26) {
                CPstring += str.charAt(i);
            }
            else if (b <= 255 && parameters.match(/latin1/)) { // && b != 0x3E && b != 0x3C &&  b != 0x26) {
                CPstring += str.charAt(i);
            }
            else {
                if (base == 'hex') {
                    cp = dec2hex(b);
                    if (pad) {
                        while (cp.length < 4) {
                            cp = '0' + cp;
                        }
                    }
                }
                else {
                    cp = b;
                }
                CPstring += before + cp + after;
            }
        }
    }
    return CPstring;
}

function dec2hex(textString) {
    return (textString + 0).toString(16).toUpperCase();
}
    */
