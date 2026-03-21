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
	const captionOnvideo = +$('#chb_captiononvideo').prop('checked');
	const captionStroke = $('input[name="lbl_captionStroke"]:checked').val();

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
	let captionOnVideoText = "";
    let durationText = "15 Seconds";
    let cameraTimeline = `CAMERA & ACTION FLOW
• Start with close-up of character face  
• Character breathes naturally, slight micro-movements  
• Character looks at camera and begins speaking  
• Camera remains stable with slight handheld motion  

• As speech continues:
- Maintain eye contact with camera  
- Natural pauses and breathing included  

• Toward the end:
- Camera slowly pulls back revealing environment  
- Character finishes speech naturally  
--------------------------------------------------
NARRATION
"${dialogue1}
"${dialogue2}"
--------------------------------------------------
`;

    if (videoModel === "2") {
      durationText = "08 Seconds";      
    }
	
	if(captionOnvideo === 1){
		captionOnVideoText = `CAPTION OVERLAY (STRICT — MUST FOLLOW)

• Always display captions (NOT optional)  
• Must be embedded into video (NOT subtitle bar)

TEXT STYLE:
• Font size: small-medium (~16px equivalent on mobile, not oversized, consistent size)
• Font color: ${captionStroke}
• Outline: thick black stroke (bold, high contrast)
• Font: bold, rounded, clean sans-serif
• Shadow: subtle dark shadow for readability
• Text must remain clear and readable but NOT large or dominant

COLOR RULE:
• Each caption phrase can randomly use a different color from the allowed palette
• Do NOT use colors outside ${captionStroke}
• Maintain strong contrast with background at all times

BEHAVIOR:
• Dynamic placement (follow composition / character position)  
• Smooth fade / pop animation  
• Slight scale emphasis on key words  
--------------------------------------------------
AUTO LIP-SYNC CAPTION SYSTEM (DYNAMIC — CORE ENGINE)

• Caption timing must follow speech automatically (NO fixed timestamps)

SEGMENTATION RULE:
• Break narration into natural speaking phrases  
• Each phrase short and readable (natural Thai pauses)

SYNC RULE:
• Caption appears EXACTLY when phrase is spoken  
• Caption disappears when phrase ends  
• No early or delayed captions  
• No overlapping captions  

DISPLAY RULE:
• Only ONE phrase visible at a time  
• Do NOT show full paragraph  
• Do NOT merge phrases  

TIMING BEHAVIOR:
• Follow real human speech rhythm  
• Respect pauses and breathing  
• Faster speech = shorter caption  
• Slower speech = longer caption  

LIP-SYNC REQUIREMENT:
• Character mouth movement must match Thai speech naturally  
• Caption must feel locked to lip movement timing  
--------------------------------------------------
THAI SPEECH RHYTHM PRIORITY

• Break captions at natural Thai phrasing  
• Keep emotional flow  
• Avoid unnatural cuts  
--------------------------------------------------
CAPTION TIMING RULE

• Do NOT shorten or summarize narration  
• All spoken words must appear as captions  
• Maintain readability (2–4 seconds depending on speech)
--------------------------------------------------
STRICT ENFORCEMENT (CRITICAL)
• Do NOT remove captions  
• Do NOT change allowed color palette  
• Do NOT remove black stroke  
• Do NOT replace with white subtitles  
• Do NOT display full paragraph at once  
• Do NOT desync captions  

Captions MUST be dynamically synchronized with speech and lip movement.  
If captions are missing, incorrect, or not synchronized, the output is INVALID.`;
	}
	
    const prompt = `VIDEO SPECIFICATION (STRICT):
• Aspect Ratio: Vertical 9:16  
• Duration: ${durationText} (STRICT)  
• Camera: 4K raw footage, stable handheld, natural human perspective  
• No cinematic effects, no dramatic lens, no stylization  
• Color: clean neutral daylight, realistic white balance  
• Lighting: natural white daylight only (NO warm tone, NO golden hour, NO cinematic grading)  
• Audio: natural voice + real ambient sound only (NO music)
--------------------------------------------------
ENVIRONMENT 
- ${environment}
--------------------------------------------------
CHARACTER 
- ${character}
- ${appearance}
--------------------------------------------------
SCENE SETUP
- The character is in ${environment} 
- Have ${objectNear} nearby 
- The atmosphere evokes a certain feeling. ${atmosphere}
--------------------------------------------------
${cameraTimeline}
${captionOnVideoText}`;

    $("#outputBox").text(prompt).show();

  });

$("#copyBtn").off("click").on("click", function () {

const text = $("#outputBox").text().trim();

if (!text){$("#dialogue1").val("").focus(); return;}

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

$('#dialogue1').on('input', function() {
        // Split by spaces and filter out empty strings
        var words = this.value.match(/\S+/g);
        var count = words ? words.length : 0;
		var tmpLength = $(this).val().length;
		if (tmpLength > 100) {
			$('.spn_wordcount').text("Limit 100 characters only.");
			return;
		}
        $('.spn_wordcount').text((tmpLength) + " Words/100");
    });
	$('#dialogue2').on('input', function() {
        // Split by spaces and filter out empty strings
        var words = this.value.match(/\S+/g);
        var count = words ? words.length : 0;
		var tmpLength = $(this).val().length;
		if (tmpLength > 100) {
			$('.spn_wordcount2').text("Limit 100 characters only.");
			return;
		}
        $('.spn_wordcount2').text((tmpLength) +" Words/100");
    });
	
$('#chb_captiononvideo').change(function() {	
	if ($(this).is(':checked')) {
		$('#dv_optStroke').css('display', 'flex');
	}else{
		$('#dv_optStroke').css('display', 'none');
	}    
 });

});
