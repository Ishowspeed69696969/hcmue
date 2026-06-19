const data = {


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
},


"X07LI":{
dg:"Vật lý",
hb1:"Toán",
hb2:"Công nghệ"
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
},


"D07HO":{
dg:"Hóa học",
hb1:"Toán",
hb2:"Tiếng Anh"
}



}


},







"7140213": {

name:"Sư phạm Sinh học",

combos:{


"B00SI":{
dg:"Sinh học",
hb1:"Toán",
hb2:"Hóa học"
},


"D08SI":{
dg:"Sinh học",
hb1:"Toán",
hb2:"Tiếng Anh"
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







"7220201":{


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




// phân hiệu dùng chung dữ liệu

data.SPT = data.SPS;

data.SPG = data.SPS;





const school =
document.getElementById("school");


const major =
document.getElementById("major");


const combo =
document.getElementById("combo");



school.onchange=function(){


major.innerHTML="";

combo.innerHTML="";


if(!this.value){

major.disabled=true;

combo.disabled=true;

return;

}



for(let id in data[this.value]){


let option =
document.createElement("option");


option.value=id;

option.textContent =
data[this.value][id].name;


major.appendChild(option);


}



major.disabled=false;


loadCombo();


};







major.onchange=loadCombo;


combo.onchange=showInput;






function loadCombo(){


combo.innerHTML="";


let s=school.value;

let m=major.value;


let list =
data[s][m].combos;



for(let id in list){


let option =
document.createElement("option");


option.value=id;


option.textContent=id;


combo.appendChild(option);


}


combo.disabled=false;


showInput();


}






function showInput(){


let c =
data[school.value]
[major.value]
.combos[combo.value];



document.getElementById("scoreArea").innerHTML=


`

<div class="score-box">

<h3>
ĐMC × 0.5
</h3>

<p>
Môn: ${c.dg}
</p>

<input 
id="dgnl"
type="number"
step="0.01"
placeholder="Nhập điểm ${c.dg}"
>


</div>





<div class="score-box">

<h3>
Học bạ 1 × 0.35
</h3>

<p>
Môn: ${c.hb1}
</p>

<input 
id="hb1"
type="number"
step="0.01"
placeholder="Nhập điểm ${c.hb1}"
>


</div>





<div class="score-box">

<h3>
Học bạ 2 × 0.15
</h3>

<p>
Môn: ${c.hb2}
</p>

<input 
id="hb2"
type="number"
step="0.01"
placeholder="Nhập điểm ${c.hb2}"
>


</div>

`;




document.getElementById("detail").innerHTML=

`

<span class="badge">
${combo.value}
</span>


<br><br>

ĐGNL:
${c.dg}

<br>

HB1:
${c.hb1}

<br>

HB2:
${c.hb2}

`;



}
const calculateBtn =
document.getElementById("calculateBtn");



calculateBtn.onclick=function(){


let dgnl =
parseFloat(
document.getElementById("dgnl").value
);



let hb1 =
parseFloat(
document.getElementById("hb1").value
);



let hb2 =
parseFloat(
document.getElementById("hb2").value
);




if(
isNaN(dgnl) ||
isNaN(hb1) ||
isNaN(hb2)
){

alert(
"Vui lòng nhập đầy đủ điểm"
);

return;

}





// điểm trước ưu tiên

let diemTruocUT =

(
0.5*dgnl
+
0.35*hb1
+
0.15*hb2

)*3;






// lấy ưu tiên

let region =
parseFloat(
document.getElementById("region").value
);



let object =
parseFloat(
document.getElementById("object").value
);





// điểm ưu tiên gốc

let uuTienGoc =
region + object;






let uuTienThuc;




// quy đổi ưu tiên 2026


if(diemTruocUT >= 22.5){


uuTienThuc =

(
(30-diemTruocUT)
/7.5
)

*

uuTienGoc;



}

else{


uuTienThuc =
uuTienGoc;


}






if(uuTienThuc<0){

uuTienThuc=0;

}






let finalScore =

diemTruocUT
+
uuTienThuc;






document.getElementById("priorityBox")
.innerHTML=

`

Điểm ưu tiên gốc:

<b>${uuTienGoc.toFixed(2)}</b>

<br>


Điểm ưu tiên thực tế:

<b>${uuTienThuc.toFixed(2)}</b>

`;







let result =
document.getElementById("result");



result.classList.remove("hidden");



result.innerHTML=

`

Điểm xét tuyển:

<br>

${finalScore.toFixed(2)}


<br><br>


<div style="font-size:16px">


Điểm trước ưu tiên:
${diemTruocUT.toFixed(2)}


<br>


Ưu tiên quy đổi:
${uuTienThựcFormat(uuTienThuc)}


</div>


`;




};








function uuTienThựcFormat(value){

return value.toFixed(2);

}
