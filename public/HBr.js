let HBrCylinderNumber,
  manDateHBr,
  expDateHBr,
  H2OHBr,
  O2HBr,
  N2HBr,
  COHBr,
  CO2HBr,
  CH4HBr,
  FeHBr,
  shipmentNumberHBr;

function HBrCylinder() {
  HBrCylinderNumber = document.getElementById("HBrCyl#").value;
  manDateHBr = document.getElementById("ManDateHBr").value;
  H2OHBr = "1";
  O2HBr = "1";
  N2HBr = "2";
  COHBr = "1";
  CO2HBr = "5";
  CH4HBr = "1";
  FeHBr = "1";
  document.getElementById("dataHBr").style.display = "none";
  document.getElementById("btnInvia").style.display = "none";

  document.getElementById("testoCorretto").innerHTML =
    "Cylinder #: " +
    HBrCylinderNumber +
    "<br/>" +
    "Manufacturing date: " +
    manDateHBr +
    "<br/>" +
    "valore H2O: " +
    H2OHBr +
    "<br/>" +
    "Valore O2: " +
    O2HBr +
    "<br/>" +
    "Valore N2: " +
    N2HBr +
    "<br/>" +
    "Valore CO: " +
    COHBr +
    "<br/>" +
    "Valore CO2: " +
    CO2HBr +
    "<br/>" +
    "Valore CH4: " +
    CH4HBr +
    "<br/>" +
    "Valore Iron: " +
    FeHBr +
    "<br/>";

  document.getElementById("btnCorretto").style.display = "inline";
  document.getElementById("btnNonCorretto").style.display = "inline";
}

function hydrogenBromide() {
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  document.getElementById("btnCorretto").style.display = "none";
  document.getElementById("btnNonCorretto").style.display = "none";

  ReadCSText();
  async function ReadCSText() {
    //Counter per shipment Number progressivo
    const testResponse = await fetch("/apicounter");
    var dataTest = await testResponse.text();
    //console.log("dataTest1", dataTest);
    dataTest = parseInt(dataTest);
    dataTest++;
    var dt = new Date();
    var anno = dt.getFullYear().toString();
    anno = anno.substring(2, 4);
    if (dataTest < 10) {
      shipmentNumberHBr = "IT/000" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 10 && dataTest < 100) {
      shipmentNumberHBr = "IT/00" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 100 && dataTest < 1000) {
      shipmentNumberHBr = "IT/0" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 1000) {
      shipmentNumberHBr = "IT/" + dataTest.toString() + "/" + anno;
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
    //console.log("myjson", myjson);

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
    var year = manDateHBr.substring(0, 4);
    var month = manDateHBr.substring(5, 7);
    var day = manDateHBr.substring(8, 10);
    manDateHBr = day + "-" + monthNameMan[parseInt(month) - 1] + "-" + year;
    expDateHBr =
      day +
      "-" +
      monthNameMan[parseInt(month) - 1] +
      "-" +
      (parseInt(year) + 2).toString();

    const dataHBr = {
      shipment: today,
      lotNumber: HBrCylinderNumber,
      expiryDate: expDateHBr,
      manDate: manDateHBr,
      progressivoHBr: shipmentNumberHBr,
      filetext: HBrCylinderNumber,
      H2O: H2OHBr,
      O2: O2HBr,
      N2: N2HBr,
      CO: COHBr,
      CO2: CO2HBr,
      CH4: CH4HBr,
      Fe: FeHBr,
    };

    console.log("dataCS", dataHBr);

    const HBroptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataHBr),
    };
    const myresponseCS = await fetch("/apiHBr", HBroptions);
    var myjsonCS = await myresponseCS.json();
    // console.log(myjsonCS);
  }
}

// function hydrogenBromide() {
//   document.getElementById("btndown").style.display = "inline";
//   document.getElementById("btnHome").style.display = "inline";
//   ReadFileJson();
//   async function ReadFileJson() {
//     const resp = await fetch("/jsonSampleFile2");
//     const data = await resp.json();
//     console.log("data", data);

//     //Counter alimenta e salva il contatore di counter.txt
//     const testResponse = await fetch("/apicounter");
//     var dataTest = await testResponse.text();
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
//     manHBr = manHBr.replace(".", "-");
//     manHBr = manHBr.replace(".", "-");
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
//       filenameB: filenameHBr,
//       //shipmentNumber: shipmentNumberHBr,
//       shipmentdateB: today,
//       lotNumberB: lotNumberHBr,
//       expiryDateB: expHBr,
//       manDateB: manHBr,
//       FevalueB: FevalueHBr,
//       CO2valueB: CO2valueHBr,
//       COvalueB: COvalueHBr,
//       HClvalueB: HClvalueHBr,
//       H2OvalueB: H2OvalueHBr,
//       N2valueB: N2valueHBr,
//       O2valueB: O2valueHBr,
//       THCvalueB: THCvalueHBr,
//     };
//     console.log("all data", HBrData);

//     // posto i dati per compilare file xlm

//     const HBroptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(HBrData),
//     };
//     const myresponseHBr = await fetch("/apiHBr", HBroptions);
//     var myjsonHBr = await myresponseHBr.json();
//     //console.log(myjsonHBr);
//   }
// }
