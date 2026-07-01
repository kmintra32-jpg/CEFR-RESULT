const sheet =
"https://docs.google.com/spreadsheets/d/1_fWF_rEGkNFaRhHH33Ez4ba5CgCElxI-TcCkZnfA_I0/gviz/tq?sheet=Students&tqx=out:json";

let rows = [];

fetch(sheet)
  .then(r => r.text())
  .then(t => {
    const json = JSON.parse(t.substring(47).slice(0, -2));
    rows = json.table.rows;
    console.log("Loaded", rows.length, "students");
  });

function val(r, i) {
  return (r.c[i] && r.c[i].v) ? r.c[i].v : "";
}

function searchStudent() {

  const q = document.getElementById("search").value.trim().toLowerCase();

  const row = rows.find(r => {

    const first = String(val(r,1)).toLowerCase();
    const last = String(val(r,2)).toLowerCase();
    const full = String(val(r,17)).toLowerCase();
    const id = String(val(r,3)).toLowerCase();

    return (
      id.includes(q) ||
      first.includes(q) ||
      last.includes(q) ||
      full.includes(q)
    );

  });

  const result = document.getElementById("result");

  if (!row) {
    result.innerHTML = `
      <div class="card">
        <h2>❌ ไม่พบข้อมูล</h2>
        <p>กรุณาตรวจสอบรหัสนักเรียน หรือชื่ออีกครั้ง</p>
      </div>`;
    return;
  }

  result.innerHTML = `
  <div class="card">

    <h2>${val(row,17)}</h2>

    <p><b>Student ID :</b> ${val(row,3)}</p>

    <p><b>Study Level :</b> ${val(row,4)}</p>

    <hr>

    <p><b>Overall Score :</b> ${val(row,5)}</p>

    <p><b>Overall Time :</b> ${val(row,6)}</p>

    <p><b>CEFR :</b> ${val(row,7)}</p>

    <p><b>Date Taken :</b> ${val(row,8)}</p>

    <hr>

    <h3>Use of English</h3>

    <p>Score : ${val(row,10)}</p>

    <p>Time : ${val(row,11)}</p>

    <p>Level : ${val(row,12)}</p>

    <hr>

    <h3>Listening</h3>

    <p>Score : ${val(row,13)}</p>

    <p>Time : ${val(row,14)}</p>

    <p>Level : ${val(row,15)}</p>

    <hr>

    ${
      val(row,16)
      ? `<a href="${val(row,16)}" target="_blank">📄 ดาวน์โหลดเกียรติบัตร</a>`
      : `<p>📄 อยู่ระหว่างจัดทำเกียรติบัตร</p>`
    }

  </div>
  `;

}