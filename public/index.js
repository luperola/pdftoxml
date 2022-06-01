var myDate,
  expirationDateOne,
  shipmentNumberW,
  shipmentNumberHI,
  shipmentNumberCS,
  shipmentNumberTCSB,
  lotNumberTCSB,
  manDateTCSB;
let testMatrixCS1 = [],
  testMatrixCS2 = [],
  mfgDateCS = [],
  expDateCS = [],
  shipmentLotNumberCS = [],
  yearChangeFormat = [],
  shNumberW = [],
  shNumberCS = [],
  shNumberHI = [],
  shNumberTCS = [],
  arrayHI = [],
  shNumberHICAT = [],
  arrayShN = [],
  arraydataHI = [],
  arrayIndeces = [],
  arrayFinalDataHI = [],
  arrayIndecesMetal = [],
  arrayIndecesMetalRandom = [],
  arrayMetalDataHI = [];
// NO Tavlov variables
let arrayNOTavlov = [],
  pageNumbers = [],
  productionDates1 = [],
  productionDates2 = [],
  productionDates3 = [],
  deliveryDates1 = [],
  deliveryDates2 = [],
  deliveryDates3 = [],
  expDates1 = [],
  expDates2 = [],
  expDates3 = [],
  drumNumbers1 = [],
  drumNumbers2 = [],
  drumNumbers3 = [],
  //drumQuantities = [],
  expiryDate = [],
  shNumberNOT = [],
  N2parameters1 = [],
  N2parameters2 = [],
  N2parameters3 = [],
  N2Oparameters1 = [],
  N2Oparameters2 = [],
  N2Oparameters3 = [],
  H2Oparameters1 = [],
  H2Oparameters2 = [],
  H2Oparameters3 = [],
  finalDrums = [],
  finalProdDate = [],
  finalDelDate = [],
  finalN2 = [],
  finalN2O = [],
  finalH2O = [],
  finalExpDate = [],
  drumA,
  drumB,
  drumC,
  prodDate1,
  prodDateA,
  prodDateB,
  delDateA,
  delDateB,
  N2parA,
  N2parB,
  N2OparA,
  N2OparB,
  H2OparA,
  H2OparB,
  myDrums,
  delDate1,
  N2OTav1,
  H2OTav1,
  //manDateNOT,
  expDataNOT,
  mfgDateNewFormat,
  delDateNewFormat,
  expDateNewFormat,
  wrongFormat;
//Shipment date = oggi
var today = new Date();
var yyyy = today.getFullYear();
//let mm = today.getMonth() + 1; // Months start at 0!
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
//if (mm < 10) mm = "0" + mm;

today = dd + "-" + monthNameMan[mm] + "-" + yyyy;
//console.log("Oggi", today);

// ---------------- NITRIC OXIDE TAVLOV --------------
function mfgDateNOTavlov() {
  document.getElementById("MfgDateTav1").style.display = "inline";
}

function delDateNOTavlov() {
  document.getElementById("CSPage").style.display = "none";
  document.getElementById("NOTaulovPage").style.display = "none";
  mfgDateNewFormat = document.getElementById("MfgTav1").value;
  const monthMan = parseInt(mfgDateNewFormat.substring(5, 7)) - 1;
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
  mfgDateNewFormat =
    mfgDateNewFormat.substring(8, 11) +
    "-" +
    monthNameMan[monthMan] +
    "-" +
    mfgDateNewFormat.substring(0, 4);

  expDateNewFormat = parseInt(mfgDateNewFormat.substring(7, 11));
  var monthExp = monthMan + 6;

  if (monthExp <= 12) {
    expDateNewFormat =
      mfgDateNewFormat.substring(0, 3) +
      monthNameMan[monthExp] +
      mfgDateNewFormat.substring(6, 11);
  }
  if (monthExp > 12) {
    monthExp = monthExp - 12;
    var yearExp = parseInt(mfgDateNewFormat.substring(7, 11)) + 1;
    expDateNewFormat =
      mfgDateNewFormat.substring(0, 3) + monthNameMan[monthExp] + yearExp;
  }

  document.getElementById("delDateTav1").style.display = "inline";
  document.getElementById("MfgDateTav1").style.display = "none";
}
function NitricOxideTavlov() {
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  delDateNewFormat = document.getElementById("delTav1").value;
  console.log("delDate", delDateNewFormat);
  const monthMan = parseInt(delDateNewFormat.substring(5, 7)) - 1;
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
  delDateNewFormat =
    delDateNewFormat.substring(8, 11) +
    "-" +
    monthNameMan[monthMan] +
    "-" +
    delDateNewFormat.substring(0, 4);
  document.getElementById("delDateTav1").style.display = "none";
  console.log(
    "mfg + exp dates+ del date",
    mfgDateNewFormat,
    expDateNewFormat,
    delDateNewFormat
  );

  ReadNOText();
  async function ReadNOText() {
    const res = await fetch("/txt");
    var dataText = await res.text();
    arrayNOTavlov = dataText.split("\n");
    //console.log("array", arrayNOTavlov);

    // formo prima gli indici del numero pagine
    for (let i = 0; i < arrayNOTavlov.length; i++) {
      if (arrayNOTavlov[i].indexOf("Page") != -1) {
        pageNumbers.push(i);
      }
    }

    try {
      var element1 = pageNumbers[0] + 48;
      var element2 = pageNumbers[1] + 48;
      var element3 = pageNumbers[2] + 48;
    } catch (error) {}

    //------------- PAGINA 1 -------------
    for (let i = 0; i < element1; i++) {
      if (arrayNOTavlov[i].indexOf("Includes") != -1) {
        drumA = arrayNOTavlov[i + 1];
      }

      if (arrayNOTavlov[i].indexOf("filling") != -1) {
        N2OTav1 = arrayNOTavlov[i + 3];
        H2OTav1 = arrayNOTavlov[i + 4];
      }
    }
    drumA = drumA
      .replace("Bundle Id's: ", "")
      .replace(".", "")
      .replace(/[\n\r]/g, "");
    drumNumbers1 = drumA.split(",");
    for (let i = 0; i < drumNumbers1.length; i++) {
      productionDates1.push(mfgDateNewFormat);
      deliveryDates1.push(delDateNewFormat);
      expDates1.push(expDateNewFormat);
      N2Oparameters1.push(N2OTav1);
      H2Oparameters1.push(H2OTav1);
    }

    for (let i = 0; i < drumNumbers1.length; i++) {
      N2Oparameters1[i] = N2Oparameters1[i].replace(/[\n\r]/g, "");
      H2Oparameters1[i] = H2Oparameters1[i].replace(/[\n\r]/g, "");
    }

    console.log(
      "prod",
      productionDates1,
      "del",
      deliveryDates1,
      "exp",
      expDates1
    );
    console.log("N2O", N2Oparameters1, "H2O", H2Oparameters1);

    //------------- PAGINA 2 -------------
    if (isNaN(element2)) {
      element2 = 0;
    }

    if (element2 != 0) {
      for (let i = element1; i < element2; i++) {
        if (arrayNOTavlov[i].indexOf("Includes") != -1) {
          drumNumbers2.push(arrayNOTavlov[i + 1]);
        }
        if (arrayNOTavlov[i].indexOf("Production date(s)") != -1) {
          productionDates2.push(arrayNOTavlov[i + 8]);
        }
        if (arrayNOTavlov[i].indexOf("Date") != -1) {
          deliveryDates2.push(arrayNOTavlov[i]);
        }
        if (arrayNOTavlov[i].indexOf("filling") != -1) {
          N2parameters2.push(arrayNOTavlov[i + 2]);
          N2Oparameters2.push(arrayNOTavlov[i + 3]);
          H2Oparameters2.push(arrayNOTavlov[i + 4]);
        }
      }
      drumB = drumNumbers2.toString().split(";");
      for (let i = 0; i < drumB.length - 1; i++) {
        productionDates2.push(productionDates2[i]);
        deliveryDates2.push(deliveryDates2[i]);
        N2parameters2.push(N2parameters2[i]);
        N2Oparameters2.push(N2Oparameters2[i]);
        H2Oparameters2.push(H2Oparameters2[i]);
      }

      for (let i = 0; i < drumB.length; i++) {
        drumB[i] = drumB[i].replace("Bundle Id's: ", "");
        drumB[i] = drumB[i].replace(/[\n\r]/g, "");
        productionDates2[i] = productionDates2[i].replace(/[\n\r]/g, "");
        deliveryDates2[i] = deliveryDates2[i].replace("Date: ", "");
        deliveryDates2[i] = deliveryDates2[i].replace(/[\n\r]/g, "");
        N2parameters2[i] = N2parameters2[i].replace(/[\n\r]/g, "");
        N2Oparameters2[i] = N2Oparameters2[i].replace(/[\n\r]/g, "");
        H2Oparameters2[i] = H2Oparameters2[i].replace(/[\n\r]/g, "");
      }
      prodDateA = productionDates1.concat(productionDates2);
      delDateA = deliveryDates1.concat(deliveryDates2);
      N2parA = N2Oparameters1.concat(N2Oparameters2);
      N2OparA = N2Oparameters1.concat(N2Oparameters2);
      H2OparA = H2Oparameters1.concat(H2Oparameters2);
    }

    //------------- PAGINA 3 -------------

    if (isNaN(element3)) {
      element3 = 0;
    }
    if (element3 != 0) {
      console.log("non dovrei essere qui");
      for (let i = element2; i < element3; i++) {
        if (arrayNOTavlov[i].indexOf("Includes") != -1) {
          drumNumbers3.push(arrayNOTavlov[i + 1]);
        }
        if (arrayNOTavlov[i].indexOf("Production date(s)") != -1) {
          productionDates3.push(arrayNOTavlov[i + 8]);
        }
        if (arrayNOTavlov[i].indexOf("Date") != -1) {
          deliveryDates3.push(arrayNOTavlov[i]);
        }
        if (arrayNOTavlov[i].indexOf("filling") != -1) {
          N2parameters3.push(arrayNOTavlov[i + 2]);
          N2Oparameters3.push(arrayNOTavlov[i + 3]);
          H2Oparameters3.push(arrayNOTavlov[i + 4]);
        }
      }
      drumC = drumNumbers3.toString().split(";");
      for (let i = 0; i < drumC.length - 1; i++) {
        productionDates3.push(productionDates3[i]);
        deliveryDates3.push(deliveryDates3[i]);
        N2parameters3.push(N2parameters3[i]);
        N2Oparameters3.push(N2Oparameters3[i]);
        H2Oparameters3.push(H2Oparameters3[i]);
      }

      for (let i = 0; i < drumC.length; i++) {
        drumC[i] = drumC[i].replace("Bundle Id's: ", "");
        drumC[i] = drumC[i].replace(/[\n\r]/g, "");
        productionDates3[i] = productionDates3[i].replace(/[\n\r]/g, "");
        deliveryDates3[i] = deliveryDates3[i].replace("Date: ", "");
        deliveryDates3[i] = deliveryDates3[i].replace(/[\n\r]/g, "");
        N2parameters3[i] = N2parameters3[i].replace(/[\n\r]/g, "");
        N2Oparameters3[i] = N2Oparameters3[i].replace(/[\n\r]/g, "");
        H2Oparameters3[i] = H2Oparameters3[i].replace(/[\n\r]/g, "");
      }
      prodDateB = prodDateA.concat(productionDates3);
      delDateB = delDateA.concat(deliveryDates3);
      N2parB = N2OparA.concat(N2Oparameters3);
      N2OparB = N2OparA.concat(N2Oparameters3);
      H2OparB = H2OparA.concat(H2Oparameters3);
    }

    myDrums = drumA.toString();
    finalDrums = myDrums.split(",");
    finalDelDate = deliveryDates1;
    finalProdDate = productionDates1;
    finalExpDate = expDates1;
    finalN2 = N2parameters1;
    finalN2O = N2Oparameters1;
    finalH2O = H2Oparameters1;

    if (drumB != undefined && wrongFormat != 1) {
      myDrums = drumA.toString() + "," + drumB.toString();
      finalDrums = myDrums.split(",");
      finalDelDate = delDateA;
      finalProdDate = prodDateA;
      finalN2 = N2parA;
      finalN2O = N2OparA;
      finalH2O = H2OparA;
    }

    if (drumC != undefined && wrongFormat != 1) {
      myDrums =
        drumA.toString() + "," + drumB.toString() + "," + drumC.toString();
      finalDrums = myDrums.split(",");
      finalDelDate = delDateB;
      finalProdDate = prodDateB;
      finalN2 = N2parB;
      finalN2O = N2OparB;
      finalH2O = H2OparB;
    }

    //Counter per shipment Number progressivo
    for (let index = 0; index < finalDrums.length; index++) {
      const testResponse = await fetch("/apicounter");
      var dataTest = await testResponse.text();
      //console.log("dataTest1", dataTest);
      dataTest = parseInt(dataTest);
      dataTest++;
      var dt = new Date();
      var anno = dt.getFullYear().toString();
      anno = anno.substring(2, 4);
      if (dataTest < 10) {
        shipmentNumberNOT = "IT/000" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 10 && dataTest < 100) {
        shipmentNumberNOT = "IT/00" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 100 && dataTest < 1000) {
        shipmentNumberNOT = "IT/0" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 1000) {
        shipmentNumberNOT = "IT/" + dataTest.toString() + "/" + anno;
      }
      if (dataTest > 10000) {
        alert("reset counter.txt file");
      }
      shNumberNOT.push(shipmentNumberNOT);

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
      //console.log("myjson", myjson);
    }
    //console.log("progressivo", shNumberNOT);

    // Input data manufacturing se non è leggibile da OCR del pdf

    const dataNOT = {
      shipment: finalDelDate,
      lotNumber: finalDrums,
      expiryDate: finalExpDate,
      manDate: finalProdDate,
      progressivo: shNumberNOT,
      filetext: finalDrums,
      N2Oparameters: finalN2O,
      H2Oparameters: finalH2O,
    };

    console.log("dataNOT", dataNOT);

    const NOToptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataNOT),
    };
    const myresponseNOT = await fetch("/NOTavlov", NOToptions);
    var myjsonNOT = await myresponseNOT.json();
    console.log(myjsonNOT);
  }
}

// ---------------- NITRIC OXIDE TAVLOV --------------

// ---------------- HF GERLING HOLZ -----------------
let values = [],
  H2SiF6array = [],
  SO2array = [],
  H2SO4array = [],
  H2Oarray = [],
  arrayCasual = [],
  cylNumbers = [],
  mfgDate = [],
  expDate = [],
  delDate = [],
  shNumHF = [],
  H2SiF6param = [],
  SO2param = [],
  H2SO4param = [],
  H2Oparam = [],
  shipmentNumberHFGH,
  manDateHFGH,
  expDataHF,
  cylQty,
  batchNbr,
  delDateHFGH,
  cylOne,
  cyltwo,
  cylThree,
  cylFour,
  cylFive,
  cylSix,
  cylSeven,
  cylEight;

// async function getCheckedCheckboxesFor(checkboxName) {
//   var checkboxes = document.querySelectorAll(
//     'input[name="' + checkboxName + '"]:checked'
//   );
//   Array.prototype.forEach.call(checkboxes, function (el) {
//     values.push(el.value);
//   });
//   console.log("Cyl selected", values);
// }

function HFGH() {
  document.getElementById("dataHF").style.display = "inline";
  document.getElementById("CSPage").style.display = "none";
  document.getElementById("NOTaulovPage").style.display = "none";
  document.getElementById("cylDelivered").style.display = "none";
  document.getElementById("btndropdown").style.display = "none";
  //document.getElementById("modalCS").style.display = "none";
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
}
function manDateHF() {
  manDateHFGH = document.getElementById("start").value;
  const monthMan = parseInt(manDateHFGH.substring(5, 7)) - 1;
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
  manDateHFGH =
    manDateHFGH.substring(8, 11) +
    "-" +
    monthNameMan[monthMan] +
    "-" +
    manDateHFGH.substring(0, 4);

  expDataHF = parseInt(manDateHFGH.substring(7, 11)) + 1;
  expDataHF =
    manDateHFGH.substring(0, 2) +
    "-" +
    monthNameMan[monthMan] +
    "-" +
    expDataHF;
  document.getElementById("dataHF").style.display = "none";
  document.getElementById("deliveryDate").style.display = "inline";
}
function delDateHF() {
  delDateHFGH = document.getElementById("delivery").value;
  const monthMan1 = parseInt(delDateHFGH.substring(5, 7)) - 1;
  const monthNameMan1 = [
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
  delDateHFGH =
    delDateHFGH.substring(8, 11) +
    "-" +
    monthNameMan1[monthMan1] +
    "-" +
    delDateHFGH.substring(0, 4);
  document.getElementById("deliveryDate").style.display = "none";
  document.getElementById("cylDelivered").style.display = "inline";
}

function cylQtyHF() {
  cylQty = document.getElementById("nbrCyl").value;
  document.getElementById("cylDelivered").style.display = "none";
  document.getElementById("nbrCyl").style.display = "none";
  document.getElementById("batch").style.display = "inline";
}
function batchHF() {
  batchNbr = document.getElementById("batchNbr").value;
  document.getElementById("cyl1").style.display = "inline";
  document.getElementById("batch").style.display = "none";
}
function cylOneHF() {
  cylOne = document.getElementById("cylOne").value;
  cylNumbers.push(cylOne);
  document.getElementById("cyl1").style.display = "none";
  document.getElementById("cyl2").style.display = "inline";
  document.getElementById("HF").style.display = "inline";
}
function cylTwoHF() {
  cylTwo = document.getElementById("cylTwo").value;
  cylNumbers.push(cylTwo);
  document.getElementById("cyl2").style.display = "none";
  document.getElementById("cyl3").style.display = "inline";
}
function cylThreeHF() {
  cylThree = document.getElementById("cylThree").value;
  cylNumbers.push(cylThree);
  document.getElementById("cyl3").style.display = "none";
  document.getElementById("cyl4").style.display = "inline";
}
function cylFourHF() {
  cylFour = document.getElementById("cylFour").value;
  cylNumbers.push(cylFour);
  document.getElementById("cyl4").style.display = "none";
  document.getElementById("cyl5").style.display = "inline";
}
function cylFiveHF() {
  cylFive = document.getElementById("cylFive").value;
  cylNumbers.push(cylFive);
  document.getElementById("cyl5").style.display = "none";
  document.getElementById("cyl6").style.display = "inline";
}
function cylSixHF() {
  cylSix = document.getElementById("cylSix").value;
  cylNumbers.push(cylSix);
  document.getElementById("cyl6").style.display = "none";
  document.getElementById("cyl7").style.display = "inline";
}
function cylSevenHF() {
  cylSeven = document.getElementById("cylSeven").value;
  cylNumbers.push(cylSeven);
  document.getElementById("cyl7").style.display = "none";
  document.getElementById("cyl8").style.display = "inline";
}
function cylEightHF() {
  cylEight = document.getElementById("cylEight").value;
  cylNumbers.push(cylEight);
  document.getElementById("cyl8").style.display = "none";
}

async function HFData() {
  for (let i = 1; i < 8; i++) {
    document.getElementById("cyl" + i.toString()).style.display = "none";
  }
  document.getElementById("HF").style.display = "none";
  //Counter alimenta e salva il contatore di counter.txt
  for (let i = 0; i < cylNumbers.length; i++) {
    mfgDate.push(manDateHFGH);
    expDate.push(expDataHF);
    delDate.push(delDateHFGH);
    const testResponse = await fetch("/apicounter");
    var dataTest = await testResponse.text();
    //console.log("dataTest1", dataTest);
    dataTest = parseInt(dataTest);
    dataTest++;
    var dt = new Date();
    var anno = dt.getFullYear().toString();
    anno = anno.substring(2, 4);

    if (dataTest < 10) {
      shipmentNumberHFGH = "IT/000" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 10 && dataTest < 100) {
      shipmentNumberHFGH = "IT/00" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 100 && dataTest < 1000) {
      shipmentNumberHFGH = "IT/0" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 1000) {
      shipmentNumberHFGH = "IT/" + dataTest.toString() + "/" + anno;
    }
    if (dataTest > 10000) {
      alert("reset counter.txt file");
    }
    shNumHF.push(shipmentNumberHFGH);
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

    //console.log("mfg", mfgDate, "exp", expDate, "del", delDate, "sh#", shNumHF);
    // let H2SiF6array = [
    //   6.8, 5.6, 8.8, 6, 7.6, 9.6, 5.6, 7.2, 7.6, 8.8, 7.2, 6.4, 5.6, 6, 9.2, 6,
    //   6, 9.6, 7.6, 5.2, 7.2, 9.6, 6, 10.4, 9.6, 6.8, 7.2, 9.2, 6, 7.6, 10, 8,
    //   7.6, 6, 9.6, 6, 6.8, 7.6, 8.8, 6.8, 10, 7.6, 7.6, 6.4, 9.2, 6.8, 9.6, 8.4,
    //   7.6, 10.4, 8.8, 5.6, 5.6, 7.2, 9.6, 7.2, 6,
    // ];
    // SO2array = [
    //   6, 4, 3.5, 3, 3, 4, 4.5, 2.5, 3, 6, 4, 2.5, 3, 3.5, 6, 4, 2.5, 3.5, 2.5,
    //   3.5, 3, 4.5, 6, 4.5, 3.5, 4.5, 6, 3.5, 2.5, 2.5, 3.5, 4, 6.5, 5.5, 3.5,
    //   2.5, 6, 3.5, 4.5, 5, 4.5, 2.5, 4, 5.5, 4.5, 3.5, 5, 6.5, 4.5, 3.5, 2.5, 3,
    //   4.5, 3.5, 3, 6.5, 5,
    // ];
    // (H2SO4array = [
    //   61.25, 41.25, 35, 23.75, 32.5, 38.75, 46.25, 18.75, 26.25, 60, 42.5, 20,
    //   31.25, 33.75, 61.25, 40, 23.75, 35, 21.25, 35, 27.5, 45, 57.5, 47.5,
    //   26.25, 48.75, 58.75, 31.25, 22.5, 18.75, 36.25, 42.5, 65, 53.75, 30,
    //   21.25, 61.25, 27.5, 43.75, 51.25, 43.75, 23.75, 41.25, 57.5, 47.5, 32.5,
    //   48.75, 65, 43.75, 32.5, 20, 27.5, 47.5, 35, 26.25, 63.75, 50,
    // ]),
    //   (H2Oarray = [
    //     27, 30.6, 44.2, 26.4, 25.6, 43, 23.4, 28.2, 42.4, 36.2, 23, 30.4, 35,
    //     39.8, 42, 37.2, 20.4, 36, 40, 29.8, 44.2, 34.8, 25, 37, 45, 38.6, 25.8,
    //     43, 44.6, 41.6, 37.2, 21, 24.4, 30.4, 21.6, 44.2, 20, 25.8, 39.6, 42.2,
    //     35.2, 24.6, 31.2, 42.4, 28.6, 24, 45.2, 36.2, 40.4, 49.6, 34, 24.4,
    //     36.4, 41.2, 38.4, 35.6, 29,
    //   ]);
    // // random choise of the parameter
    // const random = Math.floor(Math.random() * 57);
    // H2SiF6param.push(H2SiF6array[random]);
    // SO2param.push(SO2array[random]);
    // H2SO4param.push(H2SO4array[random]);
    // H2Oparam.push(H2Oarray[random]);
  }

  var HFGerlingData = {
    lotNumber: batchNbr,
    qty: cylQty,
    shipmentNumber: shNumHF,
    shipmentdate: delDate,
    expiryDate: expDate,
    filename: cylNumbers,
    manDate: mfgDate,
    // H2SiF6value: H2SiF6param,
    // SO2value: SO2param,
    // H2SO4value: H2SO4param,
    // H2Ovalue: H2Oparam,
  };
  console.log("DatiHF", HFGerlingData);

  //  posto i dati per compilare file xlm

  const HFoptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(HFGerlingData),
  };
  const myresponseHF = await fetch("/apiHFGerling", HFoptions);
  var myjsonHF = await myresponseHF.json();
  //console.log(myjsonHF);
}

// ---------------- END HF GERLING HOLZ -----------------

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
  //document.getElementById("modalCS").style.display = "none";
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
    var shipDateF2ArNe = manF2ArNe;
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

// //---------------- HBr CAT ----------------------

// function HBr() {
//   //alert("in costruzione. Spediscimi file pdf");
//   document.getElementById("btndropdown").style.display = "none";
//   document.getElementById("CSPage").style.display = "none";
//   document.getElementById("NOTaulovPage").style.display = "none";
//   //document.getElementById("modalCS").style.display = "none";
//   document.getElementById("btndown").style.display = "inline";
//   document.getElementById("btnHome").style.display = "inline";
//   ReadFileJson();
//   async function ReadFileJson() {
//     const res = await fetch("/jsonSampleFile2");
//     const data = await res.json();
//     console.log("data", data);

//     //Counter alimenta e salva il contatore di counter.txt
//     const testResponse = await fetch("/apicounter");
//     var dataTest = await testResponse.text();
//     //console.log("dataTest1", dataTest);
//     dataTest = parseInt(dataTest);
//     dataTest++;
//     var dt = new Date();
//     var anno = dt.getFullYear().toString();
//     anno = anno.substring(2, 4);
//     if (dataTest < 10) {
//       shipmentNumberHBr = "IT/000" + dataTest.toString() + "/" + anno;
//     }
//     if (dataTest >= 10 && dataTest < 100) {
//       shipmentNumberHBr = "IT/00" + dataTest.toString() + "/" + anno;
//     }
//     if (dataTest >= 100 && dataTest < 1000) {
//       shipmentNumberHBr = "IT/0" + dataTest.toString() + "/" + anno;
//     }
//     if (dataTest >= 1000) {
//       shipmentNumberHBr = "IT/" + dataTest.toString() + "/" + anno;
//     }
//     if (dataTest > 10000) {
//       alert("reset counter.txt file");
//     }
//     datacounter = { dataTest };
//     const optionCounter = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(datacounter),
//     };
//     const myresponse = await fetch("/newcounter", optionCounter);
//     var myjson = await myresponse.text();
//     //console.log("myJson", myjson);

//     var manHBr = data[2][2];
//     console.log("mfg HBr", manHBr);
//     manHBr = manHBr.replace(".", "-").replace(".", "-");
//     const monthMan = parseInt(manHBr.substring(3, 5)) - 1;
//     const monthNameMan = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];
//     manHBr =
//       manHBr.substring(0, 2) +
//       "-" +
//       monthNameMan[monthMan] +
//       "-" +
//       manHBr.substring(6, 11);
//     var shipDateHBr = manHBr;
//     var yearExp = parseInt(manHBr.substring(7, 11)) + 2;
//     //sostituito 6 momths shelflife con 24 months
//     //var monthExp = monthMan + 6;
//     let expHBr;
//     expHBr =
//       manHBr.substring(0, 2) + "-" + monthNameMan[monthMan] + "-" + yearExp;
//     // if (monthExp <= 12) {
//     //   expHBr =
//     //     manHBr.substring(0, 2) +
//     //     "-" +
//     //     monthNameMan[monthExp] +
//     //     "-" +
//     //     manHBr.substring(7, 11);
//     // }
//     // if (monthExp > 12) {
//     //   monthExp = monthExp - 12;
//     //   yearExp = yearExp + 1;
//     //   expHBr =
//     //     manHBr.substring(0, 2) + "-" + monthNameMan[monthExp] + "-" + yearExp;
//     // }
//     var lotNumberHBr = data[16][1];
//     var filenameHBr = data[17][1];
//     var FevalueHBr = data[10][2];
//     var CO2valueHBr = data[8][2];
//     var COvalueHBr = data[7][2];
//     var HClvalueHBr = "0.2";
//     var H2OvalueHBr = data[4][2];
//     var N2valueHBr = data[6][2];
//     var O2valueHBr = data[5][2];
//     var THCvalueHBr = "0.02";

//     var HBrData = {
//       filename: filenameHBr,
//       shipmentNumber: shipmentNumberHBr,
//       shipmentdate: shipDateHBr,
//       lotNumber: lotNumberHBr,
//       expiryDate: expHBr,
//       manDate: manHBr,
//       Fevalue: FevalueHBr,
//       CO2value: CO2valueHBr,
//       COvalue: COvalueHBr,
//       HClvalue: HClvalueHBr,
//       H2Ovalue: H2OvalueHBr,
//       N2value: N2valueHBr,
//       O2value: O2valueHBr,
//       THCvalue: THCvalueHBr,
//     };
//     console.log("all data", HBrData.HClvalue);

//     // posto i dati per compilare file xlm

//     const HBroptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(HBrData),
//     };
//     const myresponseHBr = await fetch("/apiBromide", HBroptions);
//     var myjsonHBr = await myresponseHBr.json();
//     console.log(myjsonHBr);
//   }
// }

// //---------------- END HBr CAT ----------------------

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
  //document.getElementById("modalCS").style.display = "none";
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
      shipmentdate: shipDateKrNe,
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

//---------------- Ar/ Xe/ Ne 3GASN934 to CAT ----------------------

function ArXeNe() {
  alert("in costruzione");
  // document.getElementById("btndropdown").style.display = "none";
  //   document.getElementById("CSPage").style.display = "none";
  // document.getElementById("NOTaulovPage").style.display = "none";
  // //document.getElementById("modalCS").style.display = "none";
  // document.getElementById("btndown").style.display = "inline";
  // document.getElementById("btnHome").style.display = "inline";
  // ReadFileJson();
  // async function ReadFileJson() {
  //   const res = await fetch("/jsonSampleFile2");
  //   const data = await res.json();
  //   console.log("data", data);

  //   //Counter alimenta e salva il contatore di counter.txt
  //   const testResponse = await fetch("/apicounter");
  //   var dataTest = await testResponse.text();
  //   //console.log("dataTest1", dataTest);
  //   dataTest = parseInt(dataTest);
  //   dataTest++;
  //   var dt = new Date();
  //   var anno = dt.getFullYear().toString();
  //   anno = anno.substring(2, 4);
  //   if (dataTest < 10) {
  //     shipmentNumberArXeNe = "IT/000" + dataTest.toString() + "/" + anno;
  //   }
  //   if (dataTest >= 10 && dataTest < 100) {
  //     shipmentNumberArXeNe = "IT/00" + dataTest.toString() + "/" + anno;
  //   }
  //   if (dataTest >= 100 && dataTest < 1000) {
  //     shipmentNumberArXeNe = "IT/0" + dataTest.toString() + "/" + anno;
  //   }
  //   if (dataTest >= 1000) {
  //     shipmentNumberArXeNe = "IT/" + dataTest.toString() + "/" + anno;
  //   }
  //   if (dataTest > 10000) {
  //     alert("reset counter.txt file");
  //   }
  //   datacounter = { dataTest };
  //   const optionCounter = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(datacounter),
  //   };
  //   const myresponse = await fetch("/newcounter", optionCounter);
  //   var myjson = await myresponse.text();
  //console.log("myJson", myjson);

  // var manArXeNe = data[27][1];
  // var expArXeNe = data[28][1];
  // var shipDateArXeNe = manArXeNe;
  // var lotNumberArXeNe = data[29][1];
  // var fileNameKr = data[32][1];
  // var CF4valueArXeNe = data[6][2];
  // CF4valueArXeNe = CF4valueArXeNe.replace("<", "")
  //   .replace("ppm", "")
  //   .replace("DL", "");
  // CF4valueArXeNe = CF4valueArXeNe.trim();
  // var CO2valueArXeNe = data[12][2];
  // CO2valueArXeNe = CO2valueArXeNe.replace("<", "")
  //   .replace("ppm", "")
  //   .replace("DL", "");
  // CO2valueArXeNe = CO2valueArXeNe.trim();
  // var COvalueArXeNe = data[7][2];
  // COvalueArXeNe = COvalueArXeNe.replace("<", "")
  //   .replace("ppm", "")
  //   .replace("DL", "");
  // COvalueArXeNe = COvalueArXeNe.trim();
  // var KrAssay = data[2][4];
  // KrAssay = KrAssay.replace("%", "");
  // KrAssay = KrAssay.trim();
  // var XevalueArXeNe = data[10][2];
  // XevalueArXeNe = XevalueArXeNe.replace("<", "")
  //   .replace("ppm", "")
  //   .replace("DL", "");
  // XevalueArXeNe = XevalueArXeNe.trim();
  // var O2valueArXeNe = data[14][2];
  // O2valueArXeNe = O2valueArXeNe.replace("<", "")
  //   .replace("ppm", "")
  //   .replace("DL", "");
  // O2valueArXeNe = O2valueArXeNe.trim();
  // var N2valueArXeNe = data[9][2];
  // N2valueArXeNe = N2valueArXeNe.replace("<", "")
  //   .replace("ppm", "")
  //   .replace("DL", "");
  // N2valueArXeNe = N2valueArXeNe.trim();
  // var HevalueArXeNe = data[13][2];
  // HevalueArXeNe = HevalueArXeNe.replace("<", "")
  //   .replace("ppm", "")
  //   .replace("DL", "");
  // HevalueArXeNe = HevalueArXeNe.trim();
  // var H2OvalueArXeNe = data[8][2];
  // H2OvalueArXeNe = H2OvalueArXeNe.replace("<", "")
  //   .replace("ppm", "")
  //   .replace("DL", "");
  // H2OvalueArXeNe = H2OvalueArXeNe.trim();
  // var CH4valueArXeNe = data[11][2];
  // CH4valueArXeNe = CH4valueArXeNe.replace("<", "")
  //   .replace("ppm", "")
  //   .replace("DL", "");
  // CH4valueArXeNe = CH4valueArXeNe.trim();

  // var ArXeNeData = {
  //   filename: fileNameKr,
  //   receivingPlant: receivingPlant,
  //   shipmentNumber: shipmentNumberArXeNe,
  //   shipmentdate: shipDateArXeNe,
  //   lotNumber: lotNumberArXeNe,
  //   expiryDate: expArXeNe,
  //   manDate: manArXeNe,
  //   CO2value: CO2valueArXeNe,
  //   COvalue: COvalueArXeNe,
  //   Xevalue: XevalueArXeNe,
  //   O2value: O2valueArXeNe,
  //   H2Ovalue: H2OvalueArXeNe,
  //   CH4value: CH4valueArXeNe,
  //   Krpercentvalue: KrAssay,
  //   N2value: N2valueArXeNe,
  //   Hevalue: HevalueArXeNe,
  //   CF4value: CF4valueArXeNe,
  // };

  // console.log("all data", ArXeNeData);

  // // posto i dati per compilare file xlm

  // const ArXeNeoptions = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(ArXeNeData),
  // };
  // const myresponseArXeNe = await fetch("/apiArXeNe", ArXeNeoptions);
  // var myjsonArXeNe = await myresponseArXeNe.json();
  // //console.log(myjsonArXeNe);
  //}
}
//---------------- END Ar/ Xe/ Ne 3GASN934 to CAT ----------------------

//---------------- SF6 3GASN906 from US to CAT ----------------------
function SF6US() {
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("CSPage").style.display = "none";
  document.getElementById("NOTaulovPage").style.display = "none";
  //document.getElementById("modalCS").style.display = "none";
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
    var shipDateSF6US = manSF6US;
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
      shipmentdate: shipDateSF6US,
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
  //document.getElementById("modalCS").style.display = "none";
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
    var shipDateSF6BOC = manSF6BOC;
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
      shipmentdate: shipDateSF6BOC,
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

// ---------------- HF Medford 1.8Kg - Bombola Piccola --------------

function HFSmall() {
  matriceHF = [];
  //alert("under construction");
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("CSPage").style.display = "none";
  document.getElementById("NOTaulovPage").style.display = "none";
  //document.getElementById("modalCS").style.display = "none";
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";

  ReadHFPages();
  async function ReadHFPages() {
    let HFarray = [],
      matrice = [],
      batchNbr = [];
    const arrayHFSmallDimension = await fetch("/arrayHFSmall");
    var dimension = await arrayHFSmallDimension.text();
    dimension = parseInt(dimension);
    //console.log("dimension", dimension);
    if (dimension > 5) {
      alert("Max 5 pagine. Si deve 'splittare' il file pdf");
    }
    for (let i = 0; i < dimension; i++) {
      const fileToFetch = "/HFoutput" + i.toString();
      const readHF = await fetch(fileToFetch);
      var dataHF = await readHF.json();
      matrice.push(dataHF);
      var test = matrice[i][0][1];
      HFarray = test.split(",");
      batchNbr.push(HFarray);
      for (let ind = 0; ind < batchNbr[i].length; ind++) {
        console.log("ind", matrice[i][3]);
      }
    }
    console.log("test", matrice);
    // console.log("HFarray", HFarray);
  }
}

// async function ShNbr(dimension) {
//   for (let i = 0; i < dimension; i++) {
//     //Counter alimenta e salva il contatore di counter.txt
//     const testResponse = await fetch("/apicounter");
//     var dataTest = await testResponse.text();
//     //console.log("dataTest1", dataTest);
//     dataTest = parseInt(dataTest);
//     dataTest++;
//     var dt = new Date();
//     var anno = dt.getFullYear().toString();
//     anno = anno.substring(2, 4);
//     if (dataTest < 10) {
//       shipmentNumberHFSmall = "IT/000" + dataTest.toString() + "/" + anno;
//     }
//     if (dataTest >= 10 && dataTest < 100) {
//       shipmentNumberHFSmall = "IT/00" + dataTest.toString() + "/" + anno;
//     }
//     if (dataTest >= 100 && dataTest < 1000) {
//       shipmentNumberHFSmall = "IT/0" + dataTest.toString() + "/" + anno;
//     }
//     if (dataTest >= 1000) {
//       shipmentNumberHFSmall = "IT/" + dataTest.toString() + "/" + anno;
//     }
//     if (dataTest > 10000) {
//       alert("reset counter.txt file");
//     }
//     shNbrHFSmall.push(shipmentNumberHFSmall);

//     datacounter = { dataTest };
//     const optionCounter = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(datacounter),
//     };
//     const myresponse = await fetch("/newcounter", optionCounter);
//     var myjson = await myresponse.text();
//     //console.log("myJson", myjson);
//     return shNbrHFSmall;
//   }
// }
//   var manHBr = data[2][2];
//   manHBr = manHBr.replaceAll(".", "-");
//   const monthMan = parseInt(manHBr.substring(3, 5)) - 1;
//   const monthNameMan = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];
//   manHBr =
//     manHBr.substring(0, 2) +
//     "-" +
//     monthNameMan[monthMan] +
//     "-" +
//     manHBr.substring(6, 11);
//   var shipDateHBr = manHBr;
//   var yearExp = parseInt(manHBr.substring(7, 11));
//   var monthExp = monthMan + 6;
//   let expHBr;
//   if (monthExp <= 12) {
//     expHBr =
//       manHBr.substring(0, 2) +
//       "-" +
//       monthNameMan[monthExp] +
//       "-" +
//       manHBr.substring(7, 11);
//   }
//   if (monthExp > 12) {
//     monthExp = monthExp - 12;
//     yearExp = yearExp + 1;
//     expHBr =
//       manHBr.substring(0, 2) + "-" + monthNameMan[monthExp] + "-" + yearExp;
//   }
//   var lotNumberHBr = data[17][1];
//   var FevalueHBr = "0.8";
//   var CO2valueHBr = "3.0";
//   var COvalueHBr = "0.8";
//   var HClvalueHBr = "500";
//   var H2OvalueHBr = "0.8";
//   var N2valueHBr = "1.5";
//   var O2valueHBr = "0.8";
//   var THCvalueHBr = "0.8";
//   var HBrData = {
//     shipmentNumber: shipmentNumberHBr,
//     shipmentdate: shipDateHBr,
//     lotNumber: lotNumberHBr,
//     expiryDate: expHBr,
//     manDate: manHBr,
//     Fevalue: FevalueHBr,
//     CO2value: CO2valueHBr,
//     COvalue: COvalueHBr,
//     HClvalue: HClvalueHBr,
//     H2Ovalue: H2OvalueHBr,
//     N2value: N2valueHBr,
//     O2value: O2valueHBr,
//     THCvalue: THCvalueHBr,
//   };
//   console.log("all data", HBrData);
//}

//   // posto i dati per compilare file xlm

//   const HBroptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(HBrData),
//   };
//   const myresponseHBr = await fetch("/apiHBr", HBroptions);
//   var myjsonHBr = await myresponseHBr.json();
//   //console.log(myjsonHBr);
//   }
// }

// ---------------- END HF Medford 1.8Kg - Bombola Piccola --------------

// Exercise for checkbox
// var list = ["Car", "Bike", "Scooter"];
// for (var value of list) {
//   checkbox = document.createElement("input");
//   checkbox.type = "checkbox";
//   //checkbox.id = `${value}`;
//   checkbox.id = value;
//   checkbox.name = "cylinderNumber";
//   checkbox.value = value;
//   checkbox.style = "margin-left:20px; margin-right:10px";
//   label = document.createElement("label");
//   label.htmlFor = value;
//   label.appendChild(document.createTextNode(`${value}`));
//   var br = document.createElement("br");
//   var container = document.getElementById("container");
//   container.appendChild(checkbox);
//   container.appendChild(label);
//   container.appendChild(br);
// }

// function getCheckedCheckboxesFor(checkboxName) {
//   var checkboxes = document.querySelectorAll(
//     'input[name="' + checkboxName + '"]:checked'
//   );
//   Array.prototype.forEach.call(checkboxes, function (el) {
//     values.push(el.value);
//   });
//   console.log("Cyl selected", values);
// }
