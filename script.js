// ==========================================
// SCRIPT.JS
// Xử lý giao diện + tính điểm xét tuyển
// Data nằm riêng trong data.js
// ==========================================


// lấy element

const schoolSelect = document.getElementById("school");
const majorSelect = document.getElementById("major");
const comboSelect = document.getElementById("combo");

const scoreArea = document.getElementById("scoreArea");
const detailBox = document.getElementById("detail");

const calculateBtn =
document.getElementById("calculateBtn");



// ===============================
// 1. CHỌN TRƯỜNG
// ===============================

schoolSelect.addEventListener(
"change",
loadMajors
);



function loadMajors(){


majorSelect.innerHTML =
`
<option>
-- Chọn ngành --
</option>
`;


comboSelect.innerHTML =
`
<option>
-- Chọn tổ hợp --
</option>
`;



scoreArea.innerHTML =
`
<p>
Vui lòng chọn tổ hợp
</p>
`;



majorSelect.disabled=true;
comboSelect.disabled=true;



const school =
schoolSelect.value;



if(!school)
return;



const majors =
admissionData[school];



Object.keys(majors)
.forEach(code=>{


const option =
document.createElement("option");


option.value = code;


option.textContent =
majors[code].name;


majorSelect.appendChild(option);



});



majorSelect.disabled=false;


}




// ===============================
// 2. CHỌN NGÀNH
// ===============================


majorSelect.addEventListener(
"change",
loadCombos
);





function loadCombos(){


comboSelect.innerHTML =
`
<option>
-- Chọn tổ hợp --
</option>
`;



const school =
schoolSelect.value;


const major =
majorSelect.value;



if(!major)
return;



const combos =
admissionData[school][major].combos;




Object.keys(combos)
.forEach(code=>{


const option =
document.createElement("option");


option.value = code;


option.textContent =
code;


comboSelect.appendChild(option);


});



comboSelect.disabled=false;


}





// ===============================
// 3. CHỌN TỔ HỢP
// ===============================


comboSelect.addEventListener(
"change",
renderScoreInput
);





function renderScoreInput(){


const school =
schoolSelect.value;


const major =
majorSelect.value;


const combo =
comboSelect.value;



if(!combo)
return;



const info =
admissionData
[school]
[major]
.combos[combo];





scoreArea.innerHTML = `


<div class="score-box">


<h3>
ĐGNL chuyên biệt × 0.5
</h3>


<p>
Môn: <b>${info.dg}</b>
</p>


<input

id="dgScore"

type="number"

step="0.01"

placeholder="Nhập điểm ${info.dg}"

>


</div>





<div class="score-box">


<h3>
Học bạ 1 × 0.35
</h3>


<p>
Môn: <b>${info.hb1}</b>
</p>


<input

id="hb1Score"

type="number"

step="0.01"

placeholder="Nhập điểm ${info.hb1}"

>


</div>






<div class="score-box">


<h3>
Học bạ 2 × 0.15
</h3>


<p>
Môn: <b>${info.hb2}</b>
</p>


<input

id="hb2Score"

type="number"

step="0.01"

placeholder="Nhập điểm ${info.hb2}"

>


</div>



`;





detailBox.innerHTML = `


<span class="badge">

${combo}

</span>


<br><br>


Mã tổ hợp gốc:
<b>${info.base}</b>


<br>


ĐGNL:
${info.dg}


<br>


HB1:
${info.hb1}


<br>


HB2:
${info.hb2}


`;



}





// ===============================
// 4. TÍNH ĐIỂM
// ===============================


calculateBtn.addEventListener(
"click",
calculateScore
);






function calculateScore(){


const dg =
Number(
document.getElementById("dgScore")?.value
);



const hb1 =
Number(
document.getElementById("hb1Score")?.value
);



const hb2 =
Number(
document.getElementById("hb2Score")?.value
);



if(
isNaN(dg) ||
isNaN(hb1) ||
isNaN(hb2)
){

alert(
"Vui lòng nhập đủ điểm"
);

return;

}






// điểm chưa ưu tiên


const beforePriority =

(
0.5 * dg
+
0.35 * hb1
+
0.15 * hb2

)
*3;







// ưu tiên


const region =
Number(
document.getElementById("region").value
);



const object =
Number(
document.getElementById("object").value
);





const priorityOriginal =
region + object;





let priorityReal;



if(beforePriority >=22.5){


priorityReal =

((30-beforePriority)/7.5)
*
priorityOriginal;


}
else{


priorityReal =
priorityOriginal;


}





if(priorityReal<0)
priorityReal=0;





const finalScore =

beforePriority
+
priorityReal;







document.getElementById("priorityBox")
.innerHTML = `


Điểm ưu tiên gốc:

<b>
${priorityOriginal.toFixed(2)}
</b>


<br>


Điểm ưu tiên thực:

<b>
${priorityReal.toFixed(2)}
</b>


`;






const result =
document.getElementById("result");



result.classList.remove("hidden");



result.innerHTML = `


Điểm xét tuyển:


<br>


<strong>
${finalScore.toFixed(2)}
</strong>



<br><br>


<small>


Điểm trước ưu tiên:
${beforePriority.toFixed(2)}


<br>


Ưu tiên:
${priorityReal.toFixed(2)}


</small>


`;



}
