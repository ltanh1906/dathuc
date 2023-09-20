var heso_dt1 = [];
var bac_dt1 = [];
var heso_dt2 = [];
var bac_dt2 = [];

var heso_ketqua = [];
var bac_ketqua = [];
var filecontent = "";

function randomUniqueArray(length, minValue, maxValue) {
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
function randomArray(length, minValue, maxValue) {
    const randomArray = [];
    
    while (randomArray.length < length) {
        // Hàm random trong khoảng minmax: https://www.w3schools.com/js/js_random.asp 
      const randomNumber = Math.floor(Math.random() * (maxValue - minValue)) + parseInt(minValue);
      
      randomArray.push(randomNumber);
    }
    
    return randomArray;
}
  
function KhoiTaoDaThuc(){
    const length_dt1 = document.getElementById("sl1").value
    const min_dt1 = document.getElementById("min1").value
    const max_dt1 = document.getElementById("max1").value
    heso_dt1 = randomUniqueArray(length_dt1, min_dt1, max_dt1)
    bac_dt1 = randomUniqueArray(length_dt1, min_dt1, max_dt1)
    const string_dt1 = VeDaThuc(bac_dt1, heso_dt1, length_dt1)
    document.getElementById("dathuc1").innerHTML = string_dt1
    
    console.log("---------------")
    const length_dt2 = document.getElementById("sl2").value
    const min_dt2 = document.getElementById("min2").value
    const max_dt2 = document.getElementById("max2").value
    heso_dt2 = randomUniqueArray(length_dt2, min_dt2, max_dt2)
    bac_dt2 = randomUniqueArray(length_dt2, min_dt2, max_dt2)
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
    let result = StringDT(bac_ketqua,heso_ketqua)

    let dathucChuoi = dt1 + "\n" + dt2+ "\n" + result

    const blob = new Blob([dathucChuoi], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dathuc.txt';
    a.click();
}

function ExportMulti(soluong){
    let dathucChuoi = ""
    for(let i=0; i<soluong;i++){
        let soluongdonthuc = (i+1)*10
        let dt = StringDT(randomArray(soluongdonthuc,-100000,100000),randomArray(soluongdonthuc,-100000,100000))
        dathucChuoi += dt + "\n"
    }

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

var batch_content = {}
function docFileBatch(num) {
    const file = document.getElementById('batch'+num).files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        batch_content[num] = e.target.result;
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
// funtion Sleep tham khao https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
}

// Sử dụng bảng băm..........................
var replay = []

class DaThucHashTable {
    constructor() {
        this.table = {};
    }

    // Thêm một đơn thức
    addDonThuc(bac, heso) {
        let solution = {};
        if (bac in this.table) {
            this.table[bac] += heso;
            solution["bac"] = bac;
            solution["heso"] = heso;
            solution["action"] = "edit"
        } else {
            this.table[bac] = heso;
            solution["bac"] = bac;
            solution["heso"] = heso;
            solution["action"] = "add"
        }
        replay.push(solution);

        // if(this.table[bac]){
        //     this.table[bac] += heso;
        // } else {
        //     this.table[bac] = heso;
        // }


    }

    tachKetqua(){
        for (const bac in this.table) {
            const heso = this.table[bac];
            heso_ketqua.push(parseInt(heso));
            bac_ketqua.push(bac);
        }
    }

    tachKetqua1(){
        let return_bac = []
        let return_heso = []
        for (const bac in this.table) {
            const heso = this.table[bac];
            return_heso.push(parseInt(heso));
            return_bac.push(bac);
        }
        return {return_bac, return_heso}
    }
    
}

function HashTable(){
    let hashtbl_hs1 = heso_dt1
    let hashtbl_bac1 = bac_dt1

    let hashtbl_hs2 = heso_dt2
    let hashtbl_bac2 = bac_dt2

    var start = performance.now()
    var resultHashtable = new DaThucHashTable()
    for(let i = 0; i <hashtbl_hs1.length; i++){
        resultHashtable.addDonThuc(hashtbl_bac1[i], hashtbl_hs1[i])
        // await sleep(1000)
    }
    for(let i = 0; i <hashtbl_hs2.length; i++){
        resultHashtable.addDonThuc(hashtbl_bac2[i], hashtbl_hs2[i])
    }
    console.log(replay)
    var end = performance.now()
    console.log(end-start);
    resultHashtable.tachKetqua();
    let str_kq = VeDaThuc(bac_ketqua, heso_ketqua, heso_ketqua.length)
    document.getElementById("dathuc_ketqua").innerHTML = str_kq
}

async function ReplayHashTable(){

    for(let i = 0; i <replay.length; i++){
        let value = replay[i]
        console.log(value.action)
        if(value.action == "add"){
            WriteLog(`Thêm phần tử key = ${value.bac}; value=${value.heso}`)
            let html = `
                <tr id="bac_${value.bac}" class="high-light">
                    <td class="${value.bac}" >${value.bac}</td>
                    <td class="${value.heso}" id="heso_bac${value.bac}">${value.heso}</td>
                </tr>
            `
            document.getElementById("result-table").innerHTML += html
            await sleep(1000)
            document.getElementById(`bac_${value.bac}`).classList.remove("high-light")
        }else{
            document.getElementById(`bac_${value.bac}`).classList.add("high-light")
            await sleep(1000)
            if(value.heso < 0){
                document.getElementById(`heso_bac${value.bac}`).innerHTML += value.heso
            }else{
                document.getElementById(`heso_bac${value.bac}`).innerHTML += "+" + value.heso
            }
            await sleep(1000)
            document.getElementById(`bac_${value.bac}`).classList.remove("high-light")
        }
        await sleep(1000)
    };

}

function WriteLog(text){
    let html = `
        <tr>
            <td>${text}</td>
        </tr>
    `
    document.getElementById("log-table").innerHTML += html
}

function CaculateBatch(){
    // console.log(batch_content[1].split("\n"));
    let file1 = batch_content[1].split("\n")
    let file2 = batch_content[2].split("\n")
    let string_result ="";
    let labels = []
    let data_chart = []
    for(let i = 0; i < 100; i++) {
        let dathuc1 = tachChuoiThanhMang(file1[i])
        let dathuc2 = tachChuoiThanhMang(file2[i])
        let soluongdonthuc = (i+1)*10
        let start = performance.now()
        let result_batch = new DaThucHashTable();
        for(let m = 0; m <soluongdonthuc; m++){
            result_batch.addDonThuc(dathuc1['array_bac'][m], dathuc1['array_heso'][m])
            // await sleep(1000)
        }
        for(let n = 0; n <soluongdonthuc; n++){
            result_batch.addDonThuc(dathuc2['array_bac'][n], dathuc2['array_heso'][n])
        }
        let ketqua = result_batch.tachKetqua1();
        let end = performance.now()
        let time_exec = end - start
        labels.push(soluongdonthuc)
        data_chart.push(time_exec)
        string_result += soluongdonthuc+"|"+time_exec+"|"+StringDT(ketqua['return_bac'],ketqua['return_heso'])+"\n"
    }
    console.log(string_result);

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'line',
        data: {
        labels: labels,
        datasets: [{
            label: 'Time exec: #s',
            data: data_chart,
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });
}