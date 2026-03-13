$(function () {

  $("#generateBtn").on("click", function () {

    const character = $("#character").val();
    const appearance = $("#appearance").val();
    const environment = $("#environment").val();
    const atmosphere = $("#atmosphere").val();
    const objectNear = $("#objectNear").val();
    const dialogue1 = $("#dialogue1").val().trim();
    const dialogue2 = $("#dialogue2").val().trim();
    const videoModel = $('input[name="video_model"]:checked').val();

    if (!character || !appearance || !environment || !atmosphere || !objectNear || !dialogue1 || !dialogue2 || !videoModel) {
      $("#copiedMsg")
.removeClass("label-success")
.addClass("label-error")
.text("Please fill all the fields before generate.")
.stop(true,true)
.fadeIn(200)
.delay(1600)
.fadeOut(700);

return;
    }

    let durationText = "15 seconds";
    let cameraTimeline = `Action:
- At 00:00 – 00:03
Close-up shot of the character's face.

- At 00:03 – 00:10
The character looks at the camera and speaks:
"${dialogue1}"

At 00:10 – 00:15
Camera slowly pulls back revealing the environment.
The character finishes:
"${dialogue2}"`;

    if (videoModel === "2") {
      durationText = "08 seconds";
      cameraTimeline = `Action:
- At 00:00 – 00:01
Close-up shot of the character's face.

At 00:01 – 00:05
The character looks at the camera and speaks:
"${dialogue1}"

At 00:05 – 00:08
Camera slowly pulls back revealing the environment.
The character still look at camera and finishes:
"${dialogue2}"`;
    }

    const prompt = `Global Specs: Vertical 9:16
Duration: ${durationText}
Quality: 4K Ultra HD, cinematic realism, ultra-detailed
Style: Emotional storytelling, gentle slow motion 
Lighting: Soft natural light
Audio: Natural voice with environmental ambience. No music.

Character:
- ${character}

Appearance:
- ${appearance}

Environment:
- ${environment}

Atmosphere:
- ${atmosphere}

Scene Description: The character is in ${environment}. A ${objectNear} is nearby. The atmosphere feels ${atmosphere}.

${cameraTimeline}`;

    $("#outputBox").text(prompt).show();

  });

$("#copyBtn").off("click").on("click", function () {

const text = $("#outputBox").text().trim();

if (!text) return;

navigator.clipboard.writeText(text).then(function(){

$("#copiedMsg")
.removeClass("label-error")
.addClass("label-success")
.text("Copied.")
.stop(true,true)
.fadeIn(200)
.delay(1200)
.fadeOut(5000, function(){

$("#dialogue1").val("").focus();
$("#dialogue2").val("");

}); // end #copiedMsg

});}); // End #copyBtn

$(document).on("click",".paste-label",function(){

const target = $(this).data("target");

navigator.clipboard.readText().then(function(text){

$("#"+target).val(text).focus();

});

});

});