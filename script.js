// ===============================
// DATABASE
// Cấu trúc:
// trường -> ngành -> tổ hợp
// ===============================


const admissionData = {


SPS: {


"7140209": {

name:"Sư phạm Toán học",

combos:{


"A00TO":{
dg:"Toán",
hb1:"Vật lý",
hb2:"Hóa học"
},


"A01TO":{
dg:"Toán",
hb1:"Vật lý",
hb2:"Tiếng Anh"
},


"X06TO":{
dg:"Toán",
hb1:"Vật lý",
hb2:"Tin học"
}


}

},




"7140211": {

name:"Sư phạm Vật lý",

combos:{


"A00LI":{
dg:"Vật lý",
hb1:"Toán",
hb2:"Hóa học"
},


"A01LI":{
dg:"Vật lý",
hb1:"Toán",
hb2:"Tiếng Anh"
}


}

},




"7140212": {

name:"Sư phạm Hóa học",

combos:{


"A00HO":{
dg:"Hóa học",
hb1:"Toán",
hb2:"Vật lý"
},


"B00HO":{
dg:"Hóa học",
hb1:"Toán",
hb2:"Sinh học"
}


}

},




"7140231": {

name:"Sư phạm Tiếng Anh",

combos:{


"D01TA":{
dg:"Tiếng Anh",
hb1:"Ngữ văn",
hb2:"Toán"
},


"X79TA":{
dg:"Tiếng Anh",
hb1:"Ngữ văn",
hb2:"Tin học"
}


}

},




"7220201": {

name:"Ngôn ngữ Anh",

combos:{


"D01TA":{
dg:"Tiếng Anh",
hb1:"Ngữ văn",
hb2:"Toán"
}


}

}



}

};




// Phân hiệu dùng cùng cấu trúc
admissionData.SPT = structuredClone(admissionData.SPS);
admissionData.SPG = structuredClone(admissionData.SPS);





// ===============================
// DOM
// ===============================


const schoolSelect =
document.getElementById("school");


const majorSelect =
document.getElementById("major");


const comboSelect =
document.getElementById("combo");



const scoreArea =
document.getElementById("scoreArea");





// ===============================
// CHỌN TRƯỜNG
// ===============================


schoolSelect.addEventListener(
"change",
()=>{


majorSelect.innerHTML="";

comboSelect.innerHTML="";


majorSelect.disabled=true;

comboSelect.disabled=true;



let school =
schoolSelect.value;



if(!school)
return;



let majors =
admissionData[school];



Object.keys(majors)
.forEach(id=>{


let option =
document.createElement("option");


option.value=id;

option.textContent =
majors[id].name;


majorSelect.appendChild(option);



});



majorSelect.disabled=false;


loadCombos();



}

);







// ===============================
// CHỌN NGÀNH
// ===============================


majorSelect.addEventListener(
"change",
loadCombos
);





function loadCombos(){


comboSelect.innerHTML="";


let school =
schoolSelect.value;


let major =
majorSelect.value;



if(!school || !major)
return;



let combos =
admissionData
[school]
[major]
.combos;



Object.keys(combos)
.forEach(code=>{


let option =
document.createElement("option");


option.value=code;

option.textContent=code;


comboSelect.appendChild(option);


});



comboSelect.disabled=false;


renderInputs();


}






// ===============================
// CHỌN TỔ HỢP
// ===============================


comboSelect.addEventListener(
"change",
renderInputs
);






function renderInputs(){


let school =
schoolSelect.value;


let major =
majorSelect.value;


let combo =
comboSelect.value;



if(!combo)
return;



let info =
admissionData
[school]
[major]
.combos[combo];




scoreArea.innerHTML=


`

<div class="score-box">

<h3>
ĐMC × 0.5
</h3>

<p>Môn: ${info.dg}</p>


<input

id="dgScore"

type="number"

step="0.01"

placeholder="Điểm ${info.dg}"

>


</div>




<div class="score-box">

<h3>
Học bạ 1 × 0.35
</h3>

<p>Môn: ${info.hb1}</p>


<input

id="hb1Score"

type="number"

step="0.01"

placeholder="Điểm ${info.hb1}"

>


</div>





<div class="score-box">

<h3>
Học bạ 2 × 0.15
</h3>


<p>Môn: ${info.hb2}</p>


<input

id="hb2Score"

type="number"

step="0.01"

placeholder="Điểm ${info.hb2}"

>


</div>

`;



document.getElementById("detail")
.innerHTML =


`

<b>${combo}</b>

<br><br>

ĐGNL: ${info.dg}

<br>

HB1: ${info.hb1}

<br>

HB2: ${info.hb2}

`;



}







// ===============================
// TÍNH ĐIỂM
// ===============================


document
.getElementById("calculateBtn")
.addEventListener(
"click",
calculate
);







function calculate(){


let dg =
Number(
document.getElementById("dgScore").value
);



let hb1 =
Number(
document.getElementById("hb1Score").value
);



let hb2 =
Number(
document.getElementById("hb2Score").value
);




if(
!dg ||
!hb1 ||
!hb2
){

alert(
"Vui lòng nhập đủ điểm"
);

return;

}





let beforePriority =

(
0.5*dg
+
0.35*hb1
+
0.15*hb2

)*3;





let region =
Number(
document.getElementById("region").value
);



let object =
Number(
document.getElementById("object").value
);





let priorityBase =
region + object;



let priorityFinal;





if(beforePriority >=22.5){


priorityFinal =

((30-beforePriority)/7.5)
*
priorityBase;



}

else{


priorityFinal =
priorityBase;


}




if(priorityFinal<0)
priorityFinal=0;





let finalScore =
beforePriority + priorityFinal;





document.getElementById("priorityBox")
.innerHTML =


`

Điểm ưu tiên gốc:

<b>${priorityBase.toFixed(2)}</b>

<br>

Điểm ưu tiên thực tế:

<b>${priorityFinal.toFixed(2)}</b>

`;





let result =
document.getElementById("result");


result.classList.remove("hidden");



result.innerHTML =


`

Điểm xét tuyển:

<br>

${finalScore.toFixed(2)}

<br><br>

<small>

Điểm trước ưu tiên:
${beforePriority.toFixed(2)}

</small>

`;



}
