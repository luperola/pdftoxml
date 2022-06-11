function CF4() {
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
      shipmentNumberCF4 = "IT/000" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 10 && dataTest < 100) {
      shipmentNumberCF4 = "IT/00" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 100 && dataTest < 1000) {
      shipmentNumberCF4 = "IT/0" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 1000) {
      shipmentNumberCF4 = "IT/" + dataTest.toString() + "/" + anno;
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

    var manCF4 = data[14][1];
    var expCF4 = data[14][3];
    manCF4 = manCF4.replaceAll(" ", "-");
    expCF4 = expCF4.replaceAll(" ", "-");
    var lotNumberCF4 = data[13][2];
    var HCvalueCF4 = data[17][5];
    var N2valueCF4 = data[6][6];
    var O2ArvalueCF4 = data[7][10];
    var CH4valueCF4 = data[10][11];
    var H2OvalueCF4 = data[7][11];
    var CO2valueCF4 = data[10][10];
    var COvalueCF4 = data[9][10];
    var SF6valueCF4 = data[11][10];
    var acidityCF4 = data[11][11];

    var CF4Data = {
      shipmentNumber: shipmentNumberCF4,
      shipmentdate: today,
      lotNumber: lotNumberCF4,
      expiryDate: expCF4,
      manDate: manCF4,
      otherHCvalue: HCvalueCF4,
      N2value: N2valueCF4,
      O2Arvalue: O2ArvalueCF4,
      CH4value: CH4valueCF4,
      H2Ovalue: H2OvalueCF4,
      CO2value: CO2valueCF4,
      COvalue: COvalueCF4,
      SF6value: SF6valueCF4,
      acidityvalue: acidityCF4,
    };
    console.log("all data", CF4Data);

    // posto i dati per compilare file xlm

    const CF4options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(CF4Data),
    };
    const myresponseCF4 = await fetch("/apiCF4", CF4options);
    var myjsonCF4 = await myresponseCF4.json();
    //console.log(myjsonCF4);
  }
}
//---------------- END CF4 TETRAFLUOROMETHANE ----------------------
