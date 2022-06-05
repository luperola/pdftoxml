let drumsListCS,
  manDateCS,
  COCS,
  CO2CS,
  //FeCS,
  Cl2CS,
  N2ArO2CS,
  H2CS,
  H2OCS,
  CHCl2CS,
  //CH4CS,
  expiryDateforCS,
  drumsCSArray = [],
  CO2CSArray = [],
  COCSArray = [],
  Cl2CSArray = [],
  CHCl2CSArray = [],
  //FeCSArray = [],
  //CH4CSArray = [],
  H2OCSArray = [],
  N2ArO2CSArray = [],
  H2CSArray = [],
  oggi = [];

function CSDrums() {
  drumsListCS = document.getElementById("CSDrums").value;
  manDateCS = document.getElementById("ManDateCS").value;
  COCS = document.getElementById("COCS").value;
  CO2CS = document.getElementById("CO2CS").value;
  Cl2CS = document.getElementById("Cl2CS").value;
  CHCl2CS = document.getElementById("CXHYCl2CS").value;
  //CH4CS = document.getElementById("CH4CS").value;
  //FeCS = document.getElementById("FeCS").value;
  N2ArO2CS = document.getElementById("O2ArN2CS").value;
  H2CS = document.getElementById("H2CS").value;
  H2OCS = document.getElementById("H2OCS").value;

  document.getElementById("dataCS").style.display = "none";
  document.getElementById("btnInvia").style.display = "none";

  document.getElementById("testoCorretto").innerHTML =
    "Lista # drums: " +
    drumsListCS +
    "<br/>" +
    "Manufacturing date: " +
    manDateCS +
    "<br/>" +
    "valore CO: " +
    COCS +
    "<br/>" +
    "Valore CO2: " +
    CO2CS +
    "<br/>" +
    "Valore Cl2: " +
    Cl2CS +
    "<br/>" +
    "Valore CxHyCl2: " +
    CHCl2CS +
    "<br/>" +
    "Valore H2O: " +
    H2OCS +
    "<br/>" +
    "Valore N2 + O2 + Ar: " +
    N2ArO2CS +
    "<br/>" +
    "Valore H2: " +
    H2CS +
    "<br/>";

  document.getElementById("btnCorretto").style.display = "inline";
  document.getElementById("btnNonCorretto").style.display = "inline";
}

function ChlorgasLines() {
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  document.getElementById("btnCorretto").style.display = "none";
  document.getElementById("btnNonCorretto").style.display = "none";

  drumsCSArray = drumsListCS.split(",");
  ReadCSText();
  async function ReadCSText() {
    //Counter per shipment Number progressivo
    for (let index = 0; index < drumsCSArray.length; index++) {
      const testResponse = await fetch("/apicounter");
      var dataTest = await testResponse.text();
      //console.log("dataTest1", dataTest);
      dataTest = parseInt(dataTest);
      dataTest++;
      var dt = new Date();
      var anno = dt.getFullYear().toString();
      anno = anno.substring(2, 4);
      if (dataTest < 10) {
        shipmentNumberCS = "IT/000" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 10 && dataTest < 100) {
        shipmentNumberCS = "IT/00" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 100 && dataTest < 1000) {
        shipmentNumberCS = "IT/0" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 1000) {
        shipmentNumberCS = "IT/" + dataTest.toString() + "/" + anno;
      }
      if (dataTest > 10000) {
        alert("reset counter.txt file");
      }
      shNumberCS.push(shipmentNumberCS);

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
    var year = manDateCS.substring(0, 4);
    var month = manDateCS.substring(5, 7);
    var day = manDateCS.substring(8, 10);
    manDateCS = day + "-" + monthNameMan[parseInt(month) - 1] + "-" + year;
    expiryDateforCS =
      day +
      "-" +
      monthNameMan[parseInt(month) - 1] +
      "-" +
      (parseInt(year) + 2).toString();

    for (let index = 0; index < drumsCSArray.length; index++) {
      drumsCSArray[index] = drumsCSArray[index].replace(/\//g, "-");
      mfgDateCS.push(manDateCS);
      expDateCS.push(expiryDateforCS);
      CO2CSArray.push(CO2CS);
      COCSArray.push(COCS);
      Cl2CSArray.push(Cl2CS);
      CHCl2CSArray.push(CHCl2CS);
      // FeCSArray.push(FeCS);
      // CH4CSArray.push(CH4CS);
      H2OCSArray.push(H2OCS);
      N2ArO2CSArray.push(N2ArO2CS);
      H2CSArray.push(H2CS);
      oggi.push(today);
    }

    const dataCS = {
      shipment: oggi,
      lotNumber: drumsCSArray,
      expiryDate: expDateCS,
      manDate: mfgDateCS,
      progressivoCS: shNumberCS,
      filetext: drumsCSArray,
      CO2: CO2CSArray,
      CO: COCSArray,
      Cl2: Cl2CSArray,
      CHCl2: CHCl2CSArray,
      // Fe: FeCSArray,
      // CH4: CH4CSArray,
      H2O: H2OCSArray,
      N2ArO2: N2ArO2CSArray,
      H2CS: H2CSArray,
    };

    console.log("dataCS", dataCS);

    const CSoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataCS),
    };
    const myresponseCS = await fetch("/apiCS", CSoptions);
    var myjsonCS = await myresponseCS.json();
    // console.log(myjsonCS);
  }
}
