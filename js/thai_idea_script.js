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
      alert("Please fill all fields before generating.");
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
คุณภาพ: 4K Ultra HD
สไตล์: วิดีโอเหมือนภาพจริง การบันทึกแบบดิบ ไม่มีการปรับสีแบบภาพยนตร์ ใช้สีแสงธรรมชาติเท่านั้น ไม่มีโทนแสงสีทองหรือโทนอุ่น
เสียง: เสียงพูดตามธรรมชาติพร้อมเสียงบรรยากาศรอบข้าง ไม่มีดนตรี

ตัวละคร: ${character}
ลักษณะภายนอก: ${appearance}
สภาพแวดล้อม: ${environment}
บรรยากาศ: ${atmosphere}

คำอธิบายฉาก: ${objectNear}

${cameraTimeline}`;

    $("#outputBox").text(prompt).show();

  });

  $("#copyBtn").on("click", function () {

    const text = $("#outputBox").text().trim();

    if (!text) {
      alert("Generate prompt first.");
      return;
    }

    navigator.clipboard.writeText(text)
      .then(function () {
        alert("Prompt copied.");
      })
      .catch(function () {
        alert("Copy failed. Please copy manually.");
      });

  });

});