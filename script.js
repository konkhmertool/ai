$(function () {

  $('.tab-btn').on('click', function () {

    const target = $(this).data('tab');

    $('.tab-btn').removeClass('active');
    $(this).addClass('active');

    $('.tab-panel').removeClass('active');
    $('#' + target).addClass('active');

  });


  $("#generateBtn").on("click", function(){

    const character = $("#character").val();
    const appearance = $("#appearance").val();
    const environment = $("#environment").val();
    const atmosphere = $("#atmosphere").val();
    const objectNear = $("#objectNear").val();
    const dialogue1 = $("#dialogue1").val().trim();
    const dialogue2 = $("#dialogue2").val().trim();

    /* VALIDATION */

    if(!character || !appearance || !environment || !atmosphere || !objectNear || !dialogue1 || !dialogue2){
      alert("Please fill all fields before generating.");
      return;
    }

    /* PROMPT TEMPLATE */

    const prompt = `รูปแบบ: แนวตั้ง 9:16
ระยะเวลา: 15 วินาที
คุณภาพ: 4K Ultra HD
สไตล์: วิดีโอเหมือนภาพจริง การบันทึกแบบดิบ ไม่มีการปรับสีแบบภาพยนตร์ ใช้สีแสงธรรมชาติเท่านั้น ไม่มีโทนแสงสีทองหรือโทนอุ่น
เสียง: เสียงพูดตามธรรมชาติพร้อมเสียงบรรยากาศรอบข้าง ไม่มีดนตรี


ตัวละคร: ${character}
ลักษณะภายนอก: ${appearance}
สภาพแวดล้อม: ${environment}
บรรยากาศ: ${atmosphere}

คำอธิบายฉาก: ${objectNear}


ลำดับกล้อง
0:00 – 0:03
ภาพระยะใกล้ของใบหน้าตัวละคร

0:03 – 0:10
ตัวละครมองไปที่กล้องและพูดว่า:
${dialogue1}

0:10 – 0:15
กล้องค่อยๆ ถอยออกเผยให้เห็นสภาพแวดล้อม
ตัวละครพูดจบ:
${dialogue2}
`;

    $("#outputBox").text(prompt).show();

  });


  $("#copyBtn").on("click", function(){

    const text = $("#outputBox").text().trim();

    if(!text){
      alert("Generate prompt first.");
      return;
    }

    navigator.clipboard.writeText(text).then(function(){
      alert("Prompt copied.");
    });

  });

});