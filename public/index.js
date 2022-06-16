var myDate, shipmentNumberW, shipmentNumberHI, shipmentNumberCS;
let mfgDateCS = [],
  expDateCS = [],
  shNumberCS = [],
  shNumberHI = [],
  shNumberTCS = [],
  arrayIndeces = [],
  arrayIndecesMetal = [];
// NO Tavlov variables
let expiryDate = [],
  myDrums;

//Shipment date = oggi
var today = new Date();
var yyyy = today.getFullYear();
let mm = today.getMonth();
const monthNameMan = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let dd = today.getDate();
if (dd < 10) dd = "0" + dd;
today = dd + "-" + monthNameMan[mm] + "-" + yyyy;
//console.log("Oggi", today);

//---------------- F2KrNe 3GASC948 AGR + CAT ----------------------
function F2KrNeAGR() {
  var receivingPlant = "Agrate";
  F2KrNe(receivingPlant);
}
function F2KrNeCAT() {
  var receivingPlant = "Catania";
  F2KrNe(receivingPlant);
}
function F2KrNe(receivingPlant) {
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("CSPage").style.display = "none";
  document.getElementById("NOTaulovPage").style.display = "none";
  document.getElementById("TCSPage").style.display = "none";
  document.getElementById("HBrPage").style.display = "none";
  document.getElementById("HF18USPage").style.display = "none";
  document.getElementById("HF36USPage").style.display = "none";
  document.getElementById("HFGHPage").style.display = "none";
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  ReadFileJson();
  async function ReadFileJson() {
    const res = await fetch("/jsonSampleFile2");
    const data = await res.json();
    //console.log("data", data);

    //Counter alimenta e salva il contatore di counter.txt
    const testResponse = await fetch("/apicounter");
    var dataTest = await testResponse.text();
    //console.log("dataTest1", dataTest);
    dataTest = parseInt(dataTest);
    dataTest++;
    var dt = new Date();
    var anno = dt.getFullYear().toString();
    anno = anno.substring(2, 4);
    if (dataTest < 10) {
      shipmentNumberF2KrNe = "IT/000" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 10 && dataTest < 100) {
      shipmentNumberF2KrNe = "IT/00" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 100 && dataTest < 1000) {
      shipmentNumberF2KrNe = "IT/0" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 1000) {
      shipmentNumberF2KrNe = "IT/" + dataTest.toString() + "/" + anno;
    }
    if (dataTest > 10000) {
      alert("reset counter.txt file");
    }
    datacounter = { dataTest };
    const optionCounter = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datacounter),
    };
    const myresponse = await fetch("/newcounter", optionCounter);
    var myjson = await myresponse.text();
    //console.log("myJson", myjson);

    var manF2KrNe = data[33][1];
    var expF2KrNe = data[34][1];
    var shipDateF2KrNe = manF2KrNe;
    var lotNumberF2KrNe = data[38][1];
    var F2Assay = data[2][4];
    F2Assay = F2Assay.replace("%", "");
    F2Assay = F2Assay.trim();
    var CO2valueF2KrNe = data[16][2];
    CO2valueF2KrNe = CO2valueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    CO2valueF2KrNe = CO2valueF2KrNe.trim();
    var COvalueF2KrNe = data[9][2];
    COvalueF2KrNe = COvalueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    COvalueF2KrNe = COvalueF2KrNe.trim();
    var SF6valueF2KrNe = data[13][2];
    SF6valueF2KrNe = SF6valueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    SF6valueF2KrNe = SF6valueF2KrNe.trim();
    var XevalueF2KrNe = data[14][2];
    XevalueF2KrNe = XevalueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    XevalueF2KrNe = XevalueF2KrNe.trim();
    var SiF4valueF2KrNe = data[20][2];
    SiF4valueF2KrNe = SiF4valueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    SiF4valueF2KrNe = SiF4valueF2KrNe.trim();
    var O2valueF2KrNe = data[19][2];
    O2valueF2KrNe = O2valueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    O2valueF2KrNe = O2valueF2KrNe.trim();
    var CH4valueF2KrNe = data[15][2];
    CH4valueF2KrNe = CH4valueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    CH4valueF2KrNe = CH4valueF2KrNe.trim();
    var MoistureAsHFvalueF2KrNe = data[11][2];
    MoistureAsHFvalueF2KrNe = MoistureAsHFvalueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    MoistureAsHFvalueF2KrNe = MoistureAsHFvalueF2KrNe.trim();
    var NF3valueF2KrNe = data[12][2];
    NF3valueF2KrNe = NF3valueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    NF3valueF2KrNe = NF3valueF2KrNe.trim();
    var KrAssay = data[3][4];
    KrAssay = KrAssay.replace("%", "");
    KrAssay = KrAssay.trim();
    var N2valueF2KrNe = data[18][2];
    N2valueF2KrNe = N2valueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    N2valueF2KrNe = N2valueF2KrNe.trim();
    var HevalueF2KrNe = data[17][2];
    HevalueF2KrNe = HevalueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    HevalueF2KrNe = HevalueF2KrNe.trim();
    var COF2valueF2KrNe = data[10][2];
    COF2valueF2KrNe = COF2valueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    COF2valueF2KrNe = COF2valueF2KrNe.trim();
    var CF4valueF2KrNe = data[8][2];
    CF4valueF2KrNe = CF4valueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    CF4valueF2KrNe = CF4valueF2KrNe.trim();

    var F2KrNeData = {
      receivingPlant: receivingPlant,
      shipmentNumber: shipmentNumberF2KrNe,
      shipmentdate: today,
      lotNumber: lotNumberF2KrNe,
      expiryDate: expF2KrNe,
      manDate: manF2KrNe,
      F2percentvalue: F2Assay,
      CO2value: CO2valueF2KrNe,
      COvalue: COvalueF2KrNe,
      SF6value: SF6valueF2KrNe,
      Xevalue: XevalueF2KrNe,
      SiF4value: SiF4valueF2KrNe,
      O2value: O2valueF2KrNe,
      CH4value: CH4valueF2KrNe,
      MoistureAsHFvalue: MoistureAsHFvalueF2KrNe,
      NF3value: NF3valueF2KrNe,
      Krpercentvalue: KrAssay,
      N2value: N2valueF2KrNe,
      Hevalue: HevalueF2KrNe,
      COF2value: COF2valueF2KrNe,
      CF4value: CF4valueF2KrNe,
    };
    console.log("all data", F2KrNeData);

    // posto i dati per compilare file xlm

    const F2KrNeoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(F2KrNeData),
    };
    const myresponseF2KrNe = await fetch("/apiF2KrNe", F2KrNeoptions);
    var myjsonF2KrNe = await myresponseF2KrNe.json();
    // //console.log(myjsonF2KrNe);
  }
}
//---------------- END F2KrNe 3GASC948 AGR + CAT ----------------------

//---------------- F2ArNe 3GASC949 AGR ----------------------

function F2ArNe() {
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("CSPage").style.display = "none";
  document.getElementById("NOTaulovPage").style.display = "none";
  document.getElementById("TCSPage").style.display = "none";
  document.getElementById("HBrPage").style.display = "none";
  document.getElementById("HF18USPage").style.display = "none";
  document.getElementById("HF36USPage").style.display = "none";
  document.getElementById("HFGHPage").style.display = "none";
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  ReadFileJson();
  async function ReadFileJson() {
    const res = await fetch("/jsonSampleFile2");
    const data = await res.json();
    console.log("data", data);

    //Counter alimenta e salva il contatore di counter.txt
    const testResponse = await fetch("/apicounter");
    var dataTest = await testResponse.text();
    //console.log("dataTest1", dataTest);
    dataTest = parseInt(dataTest);
    dataTest++;
    var dt = new Date();
    var anno = dt.getFullYear().toString();
    anno = anno.substring(2, 4);
    if (dataTest < 10) {
      shipmentNumberF2ArNe = "IT/000" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 10 && dataTest < 100) {
      shipmentNumberF2ArNe = "IT/00" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 100 && dataTest < 1000) {
      shipmentNumberF2ArNe = "IT/0" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 1000) {
      shipmentNumberF2ArNe = "IT/" + dataTest.toString() + "/" + anno;
    }
    if (dataTest > 10000) {
      alert("reset counter.txt file");
    }
    datacounter = { dataTest };
    const optionCounter = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datacounter),
    };
    const myresponse = await fetch("/newcounter", optionCounter);
    var myjson = await myresponse.text();
    //console.log("myJson", myjson);

    var manF2ArNe = data[33][1];
    var expF2ArNe = data[34][1];
    var shipDateF2ArNe = today;
    var lotNumberF2ArNe = data[38][1];
    var F2Assay = data[2][4];
    F2Assay = F2Assay.replace("%", "");
    F2Assay = F2Assay.trim();
    var CO2valueF2ArNe = data[12][2];
    CO2valueF2ArNe = CO2valueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    CO2valueF2ArNe = CO2valueF2ArNe.trim();
    var COvalueF2ArNe = data[11][2];
    COvalueF2ArNe = COvalueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    COvalueF2ArNe = COvalueF2ArNe.trim();
    var SF6valueF2ArNe = data[19][2];
    SF6valueF2ArNe = SF6valueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    SF6valueF2ArNe = SF6valueF2ArNe.trim();
    var XevalueF2ArNe = data[8][2];
    XevalueF2ArNe = XevalueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    XevalueF2ArNe = XevalueF2ArNe.trim();
    var O2valueF2ArNe = data[18][2];
    O2valueF2ArNe = O2valueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    O2valueF2ArNe = O2valueF2ArNe.trim();
    var MoistureAsHFvalueF2ArNe = data[15][2];
    MoistureAsHFvalueF2ArNe = MoistureAsHFvalueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    MoistureAsHFvalueF2ArNe = MoistureAsHFvalueF2ArNe.trim();
    var NF3valueF2ArNe = data[17][2];
    NF3valueF2ArNe = NF3valueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    NF3valueF2ArNe = NF3valueF2ArNe.trim();
    var CF4valueF2ArNe = data[9][2];
    CF4valueF2ArNe = CF4valueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    CF4valueF2ArNe = CF4valueF2ArNe.trim();
    var N2valueF2ArNe = data[16][2];
    N2valueF2ArNe = N2valueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    N2valueF2ArNe = N2valueF2ArNe.trim();
    var ArAssay = data[3][4];
    ArAssay = ArAssay.replace("%", "");
    ArAssay = ArAssay.trim();
    var THCvalueF2ArNe = data[10][2];
    THCvalueF2ArNe = THCvalueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    THCvalueF2ArNe = THCvalueF2ArNe.trim();
    var HevalueF2ArNe = data[14][2];
    HevalueF2ArNe = HevalueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    HevalueF2ArNe = HevalueF2ArNe.trim();
    var COF2valueF2ArNe = data[13][2];
    COF2valueF2ArNe = COF2valueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    COF2valueF2ArNe = COF2valueF2ArNe.trim();
    var SiF4valueF2ArNe = data[20][2];
    SiF4valueF2ArNe = SiF4valueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    SiF4valueF2ArNe = SiF4valueF2ArNe.trim();

    var F2ArNeData = {
      shipmentNumber: shipmentNumberF2ArNe,
      shipmentdate: shipDateF2ArNe,
      lotNumber: lotNumberF2ArNe,
      expiryDate: expF2ArNe,
      manDate: manF2ArNe,
      F2percentvalue: F2Assay,
      CO2value: CO2valueF2ArNe,
      COvalue: COvalueF2ArNe,
      SF6value: SF6valueF2ArNe,
      Xevalue: XevalueF2ArNe,
      SiF4value: SiF4valueF2ArNe,
      O2value: O2valueF2ArNe,
      THCvalue: THCvalueF2ArNe,
      MoistureAsHFvalue: MoistureAsHFvalueF2ArNe,
      NF3value: NF3valueF2ArNe,
      Arpercentvalue: ArAssay,
      N2value: N2valueF2ArNe,
      Hevalue: HevalueF2ArNe,
      COF2value: COF2valueF2ArNe,
      CF4value: CF4valueF2ArNe,
    };
    console.log("all data", F2ArNeData);

    // posto i dati per compilare file xlm

    const F2ArNeoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(F2ArNeData),
    };
    const myresponseF2ArNe = await fetch("/apiF2ArNe", F2ArNeoptions);
    var myjsonF2ArNe = await myresponseF2ArNe.json();
    //console.log(myjsonF2ArNe);
  }
}
//---------------- F2ArNe 3GASC949 AGR ----------------------

//---------------- Kr/Ne 3GASN997 to AGR & CAT ----------------------
function KrNeAGR() {
  var receivingPlant = "Agrate";
  KrNe(receivingPlant);
}
function KrNeCAT() {
  var receivingPlant = "Catania";
  KrNe(receivingPlant);
}
function KrNe(receivingPlant) {
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("CSPage").style.display = "none";
  document.getElementById("NOTaulovPage").style.display = "none";
  document.getElementById("TCSPage").style.display = "none";
  document.getElementById("HBrPage").style.display = "none";
  document.getElementById("HF18USPage").style.display = "none";
  document.getElementById("HF36USPage").style.display = "none";
  document.getElementById("HFGHPage").style.display = "none";
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  ReadFileJson();
  async function ReadFileJson() {
    const res = await fetch("/jsonSampleFile2");
    const data = await res.json();
    //console.log("data", data);

    //Counter alimenta e salva il contatore di counter.txt
    const testResponse = await fetch("/apicounter");
    var dataTest = await testResponse.text();
    //console.log("dataTest1", dataTest);
    dataTest = parseInt(dataTest);
    dataTest++;
    var dt = new Date();
    var anno = dt.getFullYear().toString();
    anno = anno.substring(2, 4);
    if (dataTest < 10) {
      shipmentNumberKrNe = "IT/000" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 10 && dataTest < 100) {
      shipmentNumberKrNe = "IT/00" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 100 && dataTest < 1000) {
      shipmentNumberKrNe = "IT/0" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 1000) {
      shipmentNumberKrNe = "IT/" + dataTest.toString() + "/" + anno;
    }
    if (dataTest > 10000) {
      alert("reset counter.txt file");
    }
    datacounter = { dataTest };
    const optionCounter = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datacounter),
    };
    const myresponse = await fetch("/newcounter", optionCounter);
    var myjson = await myresponse.text();
    //console.log("myJson", myjson);

    var manKrNe = data[27][1];
    var expKrNe = data[28][1];
    var shipDateKrNe = manKrNe;
    var lotNumberKrNe = data[29][1];
    var fileNameKr = data[32][1];
    var CF4valueKrNe = data[6][2];
    CF4valueKrNe = CF4valueKrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    CF4valueKrNe = CF4valueKrNe.trim();
    var CO2valueKrNe = data[12][2];
    CO2valueKrNe = CO2valueKrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    CO2valueKrNe = CO2valueKrNe.trim();
    var COvalueKrNe = data[7][2];
    COvalueKrNe = COvalueKrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    COvalueKrNe = COvalueKrNe.trim();
    var KrAssay = data[2][4];
    KrAssay = KrAssay.replace("%", "");
    KrAssay = KrAssay.trim();
    var XevalueKrNe = data[10][2];
    XevalueKrNe = XevalueKrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    XevalueKrNe = XevalueKrNe.trim();
    var O2valueKrNe = data[14][2];
    O2valueKrNe = O2valueKrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    O2valueKrNe = O2valueKrNe.trim();
    var N2valueKrNe = data[9][2];
    N2valueKrNe = N2valueKrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    N2valueKrNe = N2valueKrNe.trim();
    var HevalueKrNe = data[13][2];
    HevalueKrNe = HevalueKrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    HevalueKrNe = HevalueKrNe.trim();
    var H2OvalueKrNe = data[8][2];
    H2OvalueKrNe = H2OvalueKrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    H2OvalueKrNe = H2OvalueKrNe.trim();
    var CH4valueKrNe = data[11][2];
    CH4valueKrNe = CH4valueKrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    CH4valueKrNe = CH4valueKrNe.trim();

    var KrNeData = {
      filename: fileNameKr,
      receivingPlant: receivingPlant,
      shipmentNumber: shipmentNumberKrNe,
      shipmentdate: today,
      lotNumber: lotNumberKrNe,
      expiryDate: expKrNe,
      manDate: manKrNe,
      CO2value: CO2valueKrNe,
      COvalue: COvalueKrNe,
      Xevalue: XevalueKrNe,
      O2value: O2valueKrNe,
      H2Ovalue: H2OvalueKrNe,
      CH4value: CH4valueKrNe,
      Krpercentvalue: KrAssay,
      N2value: N2valueKrNe,
      Hevalue: HevalueKrNe,
      CF4value: CF4valueKrNe,
    };

    console.log("all data", KrNeData);

    // posto i dati per compilare file xlm

    const KrNeoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(KrNeData),
    };
    const myresponseKrNe = await fetch("/apiKrNe", KrNeoptions);
    var myjsonKrNe = await myresponseKrNe.json();
    //console.log(myjsonKrNe);
  }
}

//---------------- END Kr/Ne 3GASN997 to AGR & CAT ----------------------

//---------------- Ar/ Xe/ Ne 3GASN934 to AGR ----------------------

function ArXeNe() {
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("CSPage").style.display = "none";
  document.getElementById("NOTaulovPage").style.display = "none";
  document.getElementById("TCSPage").style.display = "none";
  document.getElementById("HBrPage").style.display = "none";
  document.getElementById("HF18USPage").style.display = "none";
  document.getElementById("HF36USPage").style.display = "none";
  document.getElementById("HFGHPage").style.display = "none";
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  ReadFileJson();
  async function ReadFileJson() {
    const res = await fetch("/jsonSampleFile2");
    const data = await res.json();
    console.log("data", data);

    //Counter alimenta e salva il contatore di counter.txt
    const testResponse = await fetch("/apicounter");
    var dataTest = await testResponse.text();
    //console.log("dataTest1", dataTest);
    dataTest = parseInt(dataTest);
    dataTest++;
    var dt = new Date();
    var anno = dt.getFullYear().toString();
    anno = anno.substring(2, 4);
    if (dataTest < 10) {
      shipmentNumberArXeNe = "IT/000" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 10 && dataTest < 100) {
      shipmentNumberArXeNe = "IT/00" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 100 && dataTest < 1000) {
      shipmentNumberArXeNe = "IT/0" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 1000) {
      shipmentNumberArXeNe = "IT/" + dataTest.toString() + "/" + anno;
    }
    if (dataTest > 10000) {
      alert("reset counter.txt file");
    }
    datacounter = { dataTest };
    const optionCounter = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datacounter),
    };
    const myresponse = await fetch("/newcounter", optionCounter);
    var myjson = await myresponse.text();
    //console.log("myJson", myjson);

    var manArXeNe = data[31][1];
    var expArXeNe = data[32][1];
    var lotNumberArXeNe = data[33][1];
    var fileNameArXeNe = data[36][1];
    var CO2valueArXeNe = data[16][2];
    CO2valueArXeNe = CO2valueArXeNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    CO2valueArXeNe = CO2valueArXeNe.trim();

    var COvalueArXeNe = data[11][2];
    COvalueArXeNe = COvalueArXeNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    COvalueArXeNe = COvalueArXeNe.trim();

    var O2valueArXeNe = data[18][2];
    O2valueArXeNe = O2valueArXeNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    O2valueArXeNe = O2valueArXeNe.trim();

    var CH4valueArXeNe = data[15][2];
    CH4valueArXeNe = CH4valueArXeNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    CH4valueArXeNe = CH4valueArXeNe.trim();

    var totCH4valueArXeNe = data[14][2];
    totCH4valueArXeNe = totCH4valueArXeNe
      .replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    totCH4valueArXeNe = totCH4valueArXeNe.trim();

    var NF3valueArXeNe = data[17][2];
    NF3valueArXeNe = NF3valueArXeNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    NF3valueArXeNe = NF3valueArXeNe.trim();

    var CF4valueArXeNe = data[10][2];
    CF4valueArXeNe = CF4valueArXeNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    CF4valueArXeNe = CF4valueArXeNe.trim();

    var N2valueArXeNe = data[13][2];
    N2valueArXeNe = N2valueArXeNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    N2valueArXeNe = N2valueArXeNe.trim();

    var ArAssay = data[2][4];
    ArAssay = ArAssay.replace("%", "");
    ArAssay = ArAssay.trim();

    var HevalueArXeNe = data[9][2];
    HevalueArXeNe = HevalueArXeNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    HevalueArXeNe = HevalueArXeNe.trim();

    var H2OvalueArXeNe = data[8][2];
    H2OvalueArXeNe = H2OvalueArXeNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    H2OvalueArXeNe = H2OvalueArXeNe.trim();

    var COF2valueArXeNe = data[12][2];
    COF2valueArXeNe = COF2valueArXeNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    COF2valueArXeNe = COF2valueArXeNe.trim();

    var XeAssay = data[3][4];
    XeAssay = XeAssay.replace("ppm", "");
    XeAssay = XeAssay.trim();

    var ArXeNeData = {
      filename: fileNameArXeNe,
      shipmentNumber: shipmentNumberArXeNe,
      shipmentdate: today,
      lotNumber: lotNumberArXeNe,
      expiryDate: expArXeNe,
      manDate: manArXeNe,
      CO2value: CO2valueArXeNe,
      COvalue: COvalueArXeNe,
      O2value: O2valueArXeNe,
      H2Ovalue: H2OvalueArXeNe,
      THCvalue: totCH4valueArXeNe,
      CH4value: CH4valueArXeNe,
      NF3value: NF3valueArXeNe,
      Arpercentvalue: ArAssay,
      N2value: N2valueArXeNe,
      Hevalue: HevalueArXeNe,
      CF4value: CF4valueArXeNe,
      COF2value: COF2valueArXeNe,
      Xepercentvalue: XeAssay,
    };

    console.log("all data", ArXeNeData);

    // posto i dati per compilare file xlm

    const ArXeNeoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ArXeNeData),
    };
    const myresponseArXeNe = await fetch("/apiArXeNe", ArXeNeoptions);
    var myjsonArXeNe = await myresponseArXeNe.json();
    //console.log(myjsonArXeNe);
  }
}
//---------------- END Ar/ Xe/ Ne 3GASN934 to AGR ----------------------

//---------------- SF6 3GASN906 from US to CAT ----------------------
function SF6US() {
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("CSPage").style.display = "none";
  document.getElementById("NOTaulovPage").style.display = "none";
  document.getElementById("TCSPage").style.display = "none";
  document.getElementById("HBrPage").style.display = "none";
  document.getElementById("HF18USPage").style.display = "none";
  document.getElementById("HF36USPage").style.display = "none";
  document.getElementById("HFGHPage").style.display = "none";
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  ReadFileJson();
  async function ReadFileJson() {
    const res = await fetch("/jsonSampleFile2");
    const data = await res.json();
    //console.log("data", data);

    //Counter alimenta e salva il contatore di counter.txt
    const testResponse = await fetch("/apicounter");
    var dataTest = await testResponse.text();
    dataTest = parseInt(dataTest);
    dataTest++;
    var dt = new Date();
    var anno = dt.getFullYear().toString();
    anno = anno.substring(2, 4);
    if (dataTest < 10) {
      shipmentNumberSF6US = "IT/000" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 10 && dataTest < 100) {
      shipmentNumberSF6US = "IT/00" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 100 && dataTest < 1000) {
      shipmentNumberSF6US = "IT/0" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 1000) {
      shipmentNumberSF6US = "IT/" + dataTest.toString() + "/" + anno;
    }
    if (dataTest > 10000) {
      alert("reset counter.txt file");
    }
    datacounter = { dataTest };
    const optionCounter = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datacounter),
    };
    const myresponse = await fetch("/newcounter", optionCounter);
    var myjson = await myresponse.text();
    //console.log("myJson", myjson);

    var manSF6US = data[23][1];
    var manSF6US = manSF6US;

    var expSF6US = data[24][1];
    var filenameSF6US = data[28][1];
    var lotNumberSF6US = data[25][1];
    var percentSF6US = data[2][2];
    percentSF6US = percentSF6US.replace("%", "");
    var CO2valueSF6US = data[5][2];
    CO2valueSF6US = CO2valueSF6US.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    CO2valueSF6US = CO2valueSF6US.trim();
    var COvalueSF6US = data[4][2];
    COvalueSF6US = COvalueSF6US.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    COvalueSF6US = COvalueSF6US.trim();
    var H2OvalueSF6US = data[3][2];
    H2OvalueSF6US = H2OvalueSF6US.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    H2OvalueSF6US = H2OvalueSF6US.trim();
    var N2valueSF6US = data[6][2];
    N2valueSF6US = N2valueSF6US.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    N2valueSF6US = N2valueSF6US.trim();
    var O2ArvalueSF6US = data[8][2];
    O2ArvalueSF6US = O2ArvalueSF6US.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    O2ArvalueSF6US = O2ArvalueSF6US.trim();
    var CF4valueSF6US = data[7][2];
    CF4valueSF6US = CF4valueSF6US.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    CF4valueSF6US = CF4valueSF6US.trim();

    var SF6USData = {
      filename: filenameSF6US,
      shipmentNumber: shipmentNumberSF6US,
      shipmentdate: today,
      lotNumber: lotNumberSF6US,
      expiryDate: expSF6US,
      manDate: manSF6US,
      SF6percentvalue: percentSF6US,
      N2value: N2valueSF6US,
      O2Arvalue: O2ArvalueSF6US,
      CF4value: CF4valueSF6US,
      H2Ovalue: H2OvalueSF6US,
      CO2value: CO2valueSF6US,
      COvalue: COvalueSF6US,
    };
    console.log("all data", SF6USData);

    // posto i dati per compilare file xlm

    const SF6USoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(SF6USData),
    };
    const myresponseSF6US = await fetch("/apiSF6US", SF6USoptions);
    var myjsonSF6US = await myresponseSF6US.json();
    //console.log(myjsonSF6US);
  }
}
//---------------- END SF6 3GASN906 from US to CAT ----------------------

//---------------- SF6 3GASN326 from BOC to CAT ----------------------
function SF6BOC() {
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("CSPage").style.display = "none";
  document.getElementById("NOTaulovPage").style.display = "none";
  document.getElementById("TCSPage").style.display = "none";
  document.getElementById("HBrPage").style.display = "none";
  document.getElementById("HF18USPage").style.display = "none";
  document.getElementById("HF36USPage").style.display = "none";
  document.getElementById("HFGHPage").style.display = "none";
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  ReadFileJson();
  async function ReadFileJson() {
    const res = await fetch("/jsonSampleFile2");
    const data = await res.json();
    //console.log("data", data);

    //Counter alimenta e salva il contatore di counter.txt
    const testResponse = await fetch("/apicounter");
    var dataTest = await testResponse.text();
    dataTest = parseInt(dataTest);
    dataTest++;
    var dt = new Date();
    var anno = dt.getFullYear().toString();
    anno = anno.substring(2, 4);
    if (dataTest < 10) {
      shipmentNumberSF6BOC = "IT/000" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 10 && dataTest < 100) {
      shipmentNumberSF6BOC = "IT/00" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 100 && dataTest < 1000) {
      shipmentNumberSF6BOC = "IT/0" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 1000) {
      shipmentNumberSF6BOC = "IT/" + dataTest.toString() + "/" + anno;
    }
    if (dataTest > 10000) {
      alert("reset counter.txt file");
    }
    datacounter = { dataTest };
    const optionCounter = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datacounter),
    };
    const myresponse = await fetch("/newcounter", optionCounter);
    var myjson = await myresponse.text();
    //console.log("myJson", myjson);

    var manSF6BOC = data[14][1];
    var manSF6BOC = manSF6BOC.trim();
    var manSF6BOC = manSF6BOC.replaceAll(" ", "-");
    var expSF6BOC = data[14][3];
    expSF6BOC = expSF6BOC.trim();
    expSF6BOC = expSF6BOC.replaceAll(" ", "-");
    var filenameSF6BOC = data[13][2];
    var lotNumberSF6BOC = data[13][0];
    var percentSF6BOC = data[3][4];
    var CO2valueSF6BOC = data[8][11];
    var COvalueSF6BOC = data[8][10];
    var H2OvalueSF6BOC = data[7][10];
    var N2valueSF6BOC = data[9][11];
    var O2ArvalueSF6BOC = data[6][6];
    var CF4valueSF6BOC = data[10][11];

    var SF6BOCData = {
      filename: filenameSF6BOC,
      shipmentNumber: shipmentNumberSF6BOC,
      shipmentdate: today,
      lotNumber: lotNumberSF6BOC,
      expiryDate: expSF6BOC,
      manDate: manSF6BOC,
      SF6percentvalue: percentSF6BOC,
      N2value: N2valueSF6BOC,
      O2Arvalue: O2ArvalueSF6BOC,
      CF4value: CF4valueSF6BOC,
      H2Ovalue: H2OvalueSF6BOC,
      CO2value: CO2valueSF6BOC,
      COvalue: COvalueSF6BOC,
    };
    console.log("all data", SF6BOCData);

    // posto i dati per compilare file xlm

    const SF6BOCoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(SF6BOCData),
    };
    const myresponseSF6BOC = await fetch("/apiSF6BOC", SF6BOCoptions);
    var myjsonSF6BOC = await myresponseSF6BOC.json();
    //console.log(myjsonSF6BOC);
  }
}
//---------------- END SF6 3GASN326 from BOC to CAT ----------------------
