// let drumsListNO,
//   manDateNO,
//   CO2NO,
//   N2ONO,
//   NO2NO,
//   H2ONO,
//   N2NO,
//   expiryDateforNO,
//   shipmentNumberNO,
//   drumsNOArray = [],
//   mfgDateNO = [],
//   expDateNO = [],
//   CO2NOArray = [],
//   N2ONOArray = [],
//   NO2NOArray = [],
//   H2ONOArray = [],
//   N2NOArray = [],
//   shNumberNO = [],
//   oggiNO = [],
let drumsListNOP2,
  manDateNOP2,
  CO2NOP2,
  N2ONOP2,
  NO2NOP2,
  H2ONOP2,
  N2NOP2,
  expiryDateforNOP2,
  drumsNOP2Array = [],
  mfgDateNOP2 = [],
  expDateNOP2 = [],
  CO2NOP2Array = [],
  N2ONOP2Array = [],
  NONOP2Array = [],
  H2ONOP2Array = [],
  N2NOP2Array = [],
  shNumberNOP2 = [];
//oggiNOP2 = [];

function NODrumsPag2() {
  drumsListNO = document.getElementById("NODrums").value;
  manDateNO = document.getElementById("ManDateNO").value;
  CO2NO = document.getElementById("CO2NO").value;
  N2ONO = document.getElementById("N2ONO").value;
  NO2NO = document.getElementById("NO2NO").value;
  H2ONO = document.getElementById("H2ONO").value;
  N2NO = document.getElementById("N2NO").value;

  drumsListNOP2 = document.getElementById("NODrumsP2").value;
  manDateNOP2 = document.getElementById("ManDateNOP2").value;
  CO2NOP2 = document.getElementById("CO2NOP2").value;
  N2ONOP2 = document.getElementById("N2ONOP2").value;
  NO2NOP2 = document.getElementById("NO2NOP2").value;
  H2ONOP2 = document.getElementById("H2ONOP2").value;
  N2NOP2 = document.getElementById("N2NOP2").value;

  document.getElementById("btnInvia").style.display = "none";
  document.getElementById("contenitore").style.display = "none";

  document.getElementById("testoCorretto").innerHTML =
    "DATI PAGINA 1 " +
    "<br/>" +
    "Lista # drums: " +
    drumsListNO +
    "<br/>" +
    "Manufacturing date: " +
    manDateNO +
    "<br/>" +
    "valore CO2: " +
    CO2NO +
    "<br/>" +
    "Valore N2O: " +
    N2ONO +
    "<br/>" +
    "Valore NO2: " +
    NO2NO +
    "<br/>" +
    "Valore H2O: " +
    H2ONO +
    "<br/>" +
    "Valore N2: " +
    N2NO +
    "<br/>" +
    "------------" +
    "<br/>" +
    //Pagina 2
    "DATI PAGINA 2 " +
    "<br/>" +
    "Lista # drums: " +
    drumsListNOP2 +
    "<br/>" +
    "Manufacturing date: " +
    manDateNOP2 +
    "<br/>" +
    "valore CO2: " +
    CO2NOP2 +
    "<br/>" +
    "Valore N2O: " +
    N2ONOP2 +
    "<br/>" +
    "Valore NO2: " +
    NO2NOP2 +
    "<br/>" +
    "Valore H2O: " +
    H2ONOP2 +
    "<br/>" +
    "Valore N2: " +
    N2NOP2 +
    "<br/>";

  document.getElementById("btnCorretto").style.display = "inline";
  document.getElementById("btnNonCorretto").style.display = "inline";
}

function nitricOxideLines() {
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  document.getElementById("btnCorretto").style.display = "none";
  document.getElementById("btnNonCorretto").style.display = "none";

  drumsNOArray = drumsListNO.split(",");
  drumsNOP2Array = drumsListNOP2.split(",");

  ReadNOText();
  async function ReadNOText() {
    //Counter per shipment Number progressivo
    for (
      let index = 0;
      index < drumsNOArray.length + drumsNOP2Array.length;
      index++
    ) {
      const testResponse = await fetch("/apicounter");
      var dataTest = await testResponse.text();
      //console.log("dataTest1", dataTest);
      dataTest = parseInt(dataTest);
      dataTest++;
      var dt = new Date();
      var anno = dt.getFullYear().toString();
      anno = anno.substring(2, 4);
      if (dataTest < 10) {
        shipmentNumberNO = "IT/000" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 10 && dataTest < 100) {
        shipmentNumberNO = "IT/00" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 100 && dataTest < 1000) {
        shipmentNumberNO = "IT/0" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 1000) {
        shipmentNumberNO = "IT/" + dataTest.toString() + "/" + anno;
      }
      if (dataTest > 10000) {
        alert("reset counter.txt file");
      }
      shNumberNO.push(shipmentNumberNO);

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
    var expiryMonth = manDateNO.substring(3, 6);
    switch (expiryMonth) {
      case "Jan":
        expiryDateforNO = 0;
        break;
      case "Feb":
        expiryDateforNO = 1;
        break;
      case "Mar":
        expiryDateforNO = 2;
        break;
      case "Apr":
        expiryDateforNO = 3;
        break;
      case "May":
        expiryDateforNO = 4;
        break;
      case "Jun":
        expiryDateforNO = 5;
        break;
      case "Jul":
        expiryDateforNO = 6;
        break;
      case "Aug":
        expiryDateforNO = 7;
        break;
      case "Sep":
        expiryDateforNO = 8;
        break;
      case "Oct":
        expiryDateforNO = 9;
        break;
      case "Nov":
        expiryDateforNO = 10;
        break;
      case "Dec":
        expiryDateforNO = 11;
        break;

      default:
        alert(
          "Formato data non corretto - Deve essere gg-Mmm-yyyy, tipo 06-Jun-2022"
        );
        window.location.href = "NO.html";
    }
    //console.log("expiryDateforNo", expiryDateforNO);
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

    var dataMonths = expiryDateforNO + 6;

    if (dataMonths >= 11) {
      var realDataMonths = dataMonths - 12;
      var yearNO = parseInt(manDateNO.substring(7, 11));
      var newexpiryDateforNO =
        manDateNO.substring(0, 3) +
        monthNameMan[realDataMonths] +
        "-" +
        (yearNO + 1).toString();
      //console.log("exp", newexpiryDateforNOP2);
    }

    if (dataMonths < 11) {
      var yearNO = parseInt(manDateNO.substring(7, 11));
      var newexpiryDateforNO =
        manDateNO.substring(0, 3) + monthNameMan[dataMonths] + "-" + yearNO;
    }

    // PAGINA 2

    var expiryMonthP2 = manDateNOP2.substring(3, 6);
    switch (expiryMonthP2) {
      case "Jan":
        expiryDateforNOP2 = 0;
        break;
      case "Feb":
        expiryDateforNOP2 = 1;
        break;
      case "Mar":
        expiryDateforNOP2 = 2;
        break;
      case "Apr":
        expiryDateforNOP2 = 3;
        break;
      case "May":
        expiryDateforNOP2 = 4;
        break;
      case "Jun":
        expiryDateforNOP2 = 5;
        break;
      case "Jul":
        expiryDateforNOP2 = 6;
        break;
      case "Aug":
        expiryDateforNOP2 = 7;
        break;
      case "Sep":
        expiryDateforNOP2 = 8;
        break;
      case "Oct":
        expiryDateforNOP2 = 9;
        break;
      case "NOv":
        expiryDateforNOP2 = 10;
        break;
      case "Dec":
        expiryDateforNOP2 = 11;
        break;

      default:
        alert(
          "Formato data non corretto - Deve essere gg-Mmm-yyyy, tipo 06-Jun-2022"
        );
        window.location.href = "NO.html";
    }
    console.log("expiryDateforNo2", expiryDateforNOP2);
    const monthNameManP2 = [
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

    var dataMonthsP2 = expiryDateforNOP2 + 6;

    if (dataMonthsP2 >= 11) {
      var realDataMonthsP2 = dataMonthsP2 - 12;
      var yearNOP2 = parseInt(manDateNOP2.substring(7, 11));
      var newexpiryDateforNOP2 =
        manDateNOP2.substring(0, 3) +
        monthNameManP2[realDataMonthsP2] +
        "-" +
        (yearNOP2 + 1).toString();
    }

    if (dataMonthsP2 < 11) {
      var yearNOP2 = parseInt(manDateNOP2.substring(7, 11));
      var newexpiryDateforNOP2 =
        manDateNOP2.substring(0, 3) +
        monthNameManP2[dataMonthsP2] +
        "-" +
        yearNOP2;
    }

    for (let index = 0; index < drumsNOArray.length; index++) {
      //drumsNOArray[index] = drumsNOArray[index].replace(/\//g, "-");
      mfgDateNO.push(manDateNO);
      expDateNO.push(newexpiryDateforNO);
      CO2NOArray.push(CO2NO);
      N2ONOArray.push(N2ONO);
      NO2NOArray.push(NO2NO);
      H2ONOArray.push(H2ONO);
      N2NOArray.push(N2NO);
      oggiNO.push(today);
    }

    for (let index = 0; index < drumsNOP2Array.length; index++) {
      mfgDateNO.push(manDateNOP2);
      expDateNO.push(newexpiryDateforNOP2);
      CO2NOArray.push(CO2NOP2);
      N2ONOArray.push(N2ONOP2);
      NO2NOArray.push(NO2NOP2);
      H2ONOArray.push(H2ONOP2);
      N2NOArray.push(N2NOP2);
      oggiNO.push(today);
      drumsNOArray.push(drumsNOP2Array[index]);
    }

    const dataNO = {
      shipment: oggiNO,
      lotNumber: drumsNOArray,
      expiryDate: expDateNO,
      manDate: mfgDateNO,
      progressivoNO: shNumberNO,
      filetext: drumsNOArray,
      CO2: CO2NOArray,
      N2O: N2ONOArray,
      NO2: NO2NOArray,
      H2O: H2ONOArray,
      N2: N2NOArray,
    };

    console.log("dataNO", dataNO);

    const NOoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataNO),
    };
    const myresponseNO = await fetch("/apiNOTaulov", NOoptions);
    var myjsonNO = await myresponseNO.json();
    // console.log(myjsonNO);
  }
}
