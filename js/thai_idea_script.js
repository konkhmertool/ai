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

    let durationText = "15 Seconds";
    let cameraTimeline = `การกระทำ:
- At 00:00 – 00:03
ภาพระยะใกล้ของใบหน้าตัวละคร
- At 00:03 – 00:10
ตัวละครมองไปที่กล้องและพูดว่า: 
"${dialogue1}"
- At 00:10 – 00:15
กล้องค่อยๆ ถอยออกเผยให้เห็นสภาพแวดล้อม 
ตัวละครยังคงมองไปที่กล้องและพูดจนจบ:
"${dialogue2}"`;

    if (videoModel === "2") {
      durationText = "08 Seconds";
      cameraTimeline = `การกระทำ:
- At 00:00 – 00:01
ภาพระยะใกล้ของใบหน้าตัวละคร
- At 00:01 – 00:05
ตัวละครมองไปที่กล้องและพูดว่า:
"${dialogue1}"
- At 00:05 – 00:08
กล้องค่อยๆ ถอยออกเผยให้เห็นสภาพแวดล้อม. 
ตัวละครยังคงมองไปที่กล้องและพูดจนจบ: 
"${dialogue2}"`;
    }

    const prompt = `ข้อกำหนดหลัก (Global Specs):
- วิดีโอแนวตั้ง 9:16 (1080x1920)
- สไตล์ภาพ GoPro Hero 12 RAW
- ระยะเวลา: ${durationText}
- กล้อง: ถือกล้องด้วยมืออย่างมั่นคง มุมมองเหมือนสายตามนุษย์ตามธรรมชาติ ไม่มีเอฟเฟกต์แบบภาพยนตร์
- สี: โทนสีแสงกลางวันธรรมชาติที่เป็นกลาง สมดุลแสงขาวสมจริง ไม่มีแสงช่วงโกลเดนอะวร์ และไม่มีการปรับสีโทนอุ่นแบบภาพยนตร์
- แสง: แสงกลางวันสีขาวตามธรรมชาติ ไม่มีโทนอุ่น และไม่มีการเกรดสีแบบภาพยนตร์
- เสียง: เสียงพูดตามธรรมชาติพร้อมเสียงบรรยากาศจริง ไม่มีดนตรี

สภาพแวดล้อม: 
- ${environment}

ตัวละคร: 
- ${character}

ลักษณะภายนอก: 
- ${appearance}

บรรยากาศ: ${atmosphere}

คำอธิบายฉาก: 
- ตัวละครอยู่ใน ${environment} มี ${objectNear} อยู่ใกล้ๆ บรรยากาศให้ความรู้สึก ${atmosphere}

${cameraTimeline}`;

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

});