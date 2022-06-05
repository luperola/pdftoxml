let nbrPages,
  drumsListNO,
  manDateNO,
  CO2NO,
  N2ONO,
  NO2NO,
  H2ONO,
  N2NO,
  expiryDateforNO,
  shipmentNumberNO,
  drumsNOArray = [],
  mfgDateNO = [],
  expDateNO = [],
  CO2NOArray = [],
  N2ONOArray = [],
  NO2NOArray = [],
  H2ONOArray = [],
  N2NOArray = [],
  shNumberNO = [],
  oggiNO = [];

function NONumberOfPages() {
  nbrPages = document.getElementById("NOPages").value;

  if (nbrPages === "1") {
    document.getElementById("pagina1").style.display = "inline";
  }
  if (nbrPages === "2") {
    //window.location.href = "NOPage2.html";
    window.open("NOPage2.html", "_blank").focus();
  }
  if (parseInt(nbrPages) > 2) {
    alert(
      "Si possono fare due pagine alla volta. Fai le prime due e poi ricomincia"
    );
    window.location.href("NO.html");
    //window.open("NO.html", "_blank").focus();
  }
}

function NODrumsPag1() {
  drumsListNO = document.getElementById("NODrums").value;
  manDateNO = document.getElementById("ManDateNO").value;
  CO2NO = document.getElementById("CO2NO").value;
  N2ONO = document.getElementById("N2ONO").value;
  NO2NO = document.getElementById("NO2NO").value;
  H2ONO = document.getElementById("H2ONO").value;
  N2NO = document.getElementById("N2NO").value;

  document.getElementById("btnInvia").style.display = "none";
  document.getElementById("pagina1").style.display = "none";

  document.getElementById("testoCorretto").innerHTML =
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
  ReadNOText();
  async function ReadNOText() {
    //Counter per shipment Number progressivo
    for (let index = 0; index < drumsNOArray.length; index++) {
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

    var year = manDateNO.substring(0, 4);
    var month = manDateNO.substring(5, 7);
    var day = manDateNO.substring(8, 10);
    manDateNO = day + "-" + monthNameMan[parseInt(month) - 1] + "-" + year;

    var dataMonths = parseInt(month) + 6;

    if (dataMonths > 12) {
      var realDataMonths = dataMonths - 13;
      expiryDateforNO =
        day + "-" + monthNameMan[realDataMonths] + "-" + (parseInt(year) + 1);
    }

    if (dataMonths <= 12) {
      expiryDateforNO =
        day + "-" + monthNameMan[parseInt(dataMonths) - 1] + "-" + year;
    }

    for (let index = 0; index < drumsNOArray.length; index++) {
      //drumsNOArray[index] = drumsNOArray[index].replace(/\//g, "-");
      mfgDateNO.push(manDateNO);
      expDateNO.push(expiryDateforNO);
      CO2NOArray.push(CO2NO);
      N2ONOArray.push(N2ONO);
      NO2NOArray.push(NO2NO);
      H2ONOArray.push(H2ONO);
      N2NOArray.push(N2NO);
      oggiNO.push(today);
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
