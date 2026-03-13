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

    let durationText = "15 วินาที";
    let cameraTimeline = `ลำดับกล้อง
0:00 – 0:03
ภาพระยะใกล้ของใบหน้าตัวละคร

0:03 – 0:10
ตัวละครมองไปที่กล้องและพูดว่า:
${dialogue1}

0:10 – 0:15
กล้องค่อยๆ ถอยออกเผยให้เห็นสภาพแวดล้อม
ตัวละครพูดจบ:
${dialogue2}`;

    if (videoModel === "2") {
      durationText = "08 วินาที";
      cameraTimeline = `ลำดับกล้อง
0:00 – 0:01
ภาพระยะใกล้ของใบหน้าตัวละคร

0:01 – 0:05
ตัวละครมองไปที่กล้องและพูดว่า:
${dialogue1}

0:05 – 0:08
กล้องค่อยๆ ถอยออกเผยให้เห็นสภาพแวดล้อม
ตัวละครพูดจบ:
${dialogue2}`;
    }

    const prompt = `รูปแบบ: แนวตั้ง 9:16
ระยะเวลา: ${durationText}
คุณภาพ: 4K Ultra HD, วิดีโอภาพจริง การบันทึกแบบดิบ ไม่มีการปรับสีแบบภาพยนตร์ ใช้สีแสงธรรมชาติเท่านั้น เสียงสมจริง สไตล์สารคดี
สไตล์: การเล่าเรื่องเชิงอารมณ์ ภาพเคลื่อนไหวช้าอย่างนุ่มนวล
เสียง: เสียงพูดตามธรรมชาติพร้อมเสียงบรรยากาศรอบข้าง ไม่มีดนตรี

ตัวละคร: ${character}
ลักษณะภายนอก: ${appearance}
สภาพแวดล้อม: ${environment}
บรรยากาศ: ${atmosphere}

คำอธิบายฉาก: ${objectNear}

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
.fadeOut(700, function(){

$("#dialogue1").val("").focus();
$("#dialogue2").val("");
$("#outputBox").text("").hide();

}); // end #copiedMsg

});}); // End #copyBtn

$(document).on("click",".paste-label",function(){

const target = $(this).data("target");

navigator.clipboard.readText().then(function(text){

$("#"+target).val(text).focus();

});

});

});