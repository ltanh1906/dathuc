var heso_dt1 = [];
var bac_dt1 = [];

var heso_dt2 = [];
var bac_dt2 = [];
var filecontent = "";

function randomArray(length, minValue, maxValue) {
    const uniqueArray = [];
    
    while (uniqueArray.length < length) {
        // Hàm random trong khoảng minmax: https://www.w3schools.com/js/js_random.asp 
      const randomNumber = Math.floor(Math.random() * (maxValue - minValue)) + parseInt(minValue);
      
      if (!uniqueArray.includes(randomNumber) && randomNumber != 0) {
        uniqueArray.push(randomNumber);
      }
    }
    
    return uniqueArray;
  }
  
function KhoiTaoDaThuc(){
    const length_dt1 = document.getElementById("sl1").value
    const min_dt1 = document.getElementById("min1").value
    const max_dt1 = document.getElementById("max1").value
    heso_dt1 = randomArray(length_dt1, min_dt1, max_dt1)
    bac_dt1 = randomArray(length_dt1, min_dt1, max_dt1)
    const string_dt1 = VeDaThuc(bac_dt1, heso_dt1, length_dt1)
    document.getElementById("dathuc1").innerHTML = string_dt1
    
    console.log("---------------")
    const length_dt2 = document.getElementById("sl2").value
    const min_dt2 = document.getElementById("min2").value
    const max_dt2 = document.getElementById("max2").value
    heso_dt2 = randomArray(length_dt2, min_dt2, max_dt2)
    bac_dt2 = randomArray(length_dt2, min_dt2, max_dt2)
    const string_dt2 = VeDaThuc(bac_dt2, heso_dt2, length_dt2)
    document.getElementById("dathuc2").innerHTML = string_dt2

};

function VeDaThuc(array_bac, array_heso, length){
    let string_dathuc = ""
    for (let i = 0; i < length; i++) {
        if(array_heso[i]>0){
            string_dathuc += "+"+array_heso[i]
        }else{
            string_dathuc+=array_heso[i]
        }
            
        if(array_bac[i] != 0){
            string_dathuc+="x"+`<SUP><SMALL>${array_bac[i]}</SMALL></SUP>`
        }

    }
    return string_dathuc
}

function ExportTxt(){
    let dt1 = StringDT(bac_dt1,heso_dt1)
    let dt2 = StringDT(bac_dt2,heso_dt2)

    let dathucChuoi = dt1 + "\n" + dt2

    const blob = new Blob([dathucChuoi], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dathuc.txt';
    a.click();
}

function StringDT(array_bac, array_heso) {
    let string_dathuc = "";

    for (let i = 0; i < array_heso.length; i++) {
        if (array_heso[i] != 0) {
            if (i != 0) {
                string_dathuc = string_dathuc.concat("+");
            }
            if (array_bac[i] == 0) {
                string_dathuc = string_dathuc.concat(array_heso[i]);
            } else {
                string_dathuc = string_dathuc.concat("("+array_heso[i] + "x" + (array_bac[i] != 0 ? "^" + array_bac[i] : "")+")");
            }
        }
    }

    return string_dathuc;
}

function tachChuoiThanhMang(chuoiDathuc) {
    const array_bac = [];
    const array_heso = [];
    const donthuc_array = chuoiDathuc.split('+');
    console.log(donthuc_array)
    for(const donthuc of donthuc_array) {
        let temp = donthuc.match(/(-?\d*)x\^(-?\d*)/);
        if(temp == null){
            array_heso.push(parseInt(donthuc));
            array_bac.push(0);
        }else{
            array_heso.push(parseInt(temp[1]));
            array_bac.push(parseInt(temp[2]));
        }
    }
    return { array_heso, array_bac };
}

function docFile() {
    const file = document.getElementById('importFile').files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        filecontent = e.target.result;
        generateFromFile(filecontent)
    };
    reader.readAsText(file);
};

function generateFromFile(content) {
    content = content.split('\n')
    let tachdt1 = tachChuoiThanhMang(content[0])
    let tachdt2 = tachChuoiThanhMang(content[1])

    heso_dt1 = tachdt1['array_heso'];
    bac_dt1 = tachdt1['array_bac'];
    const string_dt1 = VeDaThuc(bac_dt1, heso_dt1, heso_dt1.length)
    document.getElementById("dathuc1").innerHTML = string_dt1


    heso_dt2 = tachdt2['array_heso'];
    bac_dt2 = tachdt2['array_bac'];
    const string_dt2 = VeDaThuc(bac_dt2, heso_dt2, heso_dt2.length)
    document.getElementById("dathuc2").innerHTML = string_dt2
}


function LinkedList(){
    let linkedlist_hs1 = heso_dt1
    let linkedlist_bac1 = bac_dt1

    let linkedlist_hs2 = heso_dt2
    let linkedlist_bac2 = bac_dt2

    console.log("Hệ số đt 1: "+ linkedlist_hs1)
    console.log(linkedlist_bac1)
    console.log(linkedlist_hs2)
    console.log(linkedlist_bac2)
}

function Heap(){
    let heap_hs1 = heso_dt1
    let heap_bac1 = bac_dt1

    let heap_hs2 = heso_dt2
    let heap_bac2 = bac_dt2

}

function HashTable(){
    let hashtbl_hs1 = heso_dt1
    let hashtbl_bac1 = bac_dt1

    let hashtbl_hs2 = heso_dt2
    let hashtbl_bac2 = bac_dt2


}