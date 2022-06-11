// ---------------- C4F8 PERFLUOROCYCLOBUTANE ----------------------
function C4F8AGR() {
  var receivingPlant = "Agrate";
  C4F8(receivingPlant);
}
function C4F8CAT() {
  var receivingPlant = "Catania";
  C4F8(receivingPlant);
}
function C4F8(receivingPlant) {
  document.getElementById("CSPage").style.display = "none";
  document.getElementById("NOTaulovPage").style.display = "none";
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
      shipmentNumberC4F8 = "IT/000" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 10 && dataTest < 100) {
      shipmentNumberC4F8 = "IT/00" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 100 && dataTest < 1000) {
      shipmentNumberC4F8 = "IT/0" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 1000) {
      shipmentNumberC4F8 = "IT/" + dataTest.toString() + "/" + anno;
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
    if (data.length === 32) {
      var manC4F8 = data[21][1];
      var expC4F8 = data[22][1];
      var lotNumberC4F8 = data[26][1];
      var acidityC4F8 = data[4][2];
      acidityC4F8 = acidityC4F8
        .replace("<", "")
        .replace("ppm", "")
        .replace("DL", "")
        .replace(" (w)", "");
      acidityC4F8 = acidityC4F8.trim();
      var H2OvalueC4F8 = data[3][2];
      H2OvalueC4F8 = H2OvalueC4F8.replace("<", "")
        .replace("ppm", "")
        .replace("DL", "");
      H2OvalueC4F8 = H2OvalueC4F8.trim();
      var N2O2valueC4F8 = data[7][2];
      N2O2valueC4F8 = N2O2valueC4F8.replace("< ", "")
        .replace("ppm", "")
        .replace("DL", "");
      N2O2valueC4F8 = N2O2valueC4F8.trim();
      var CFCvalueC4F8 = data[6][2];
      CFCvalueC4F8 = CFCvalueC4F8.replace("<", "")
        .replace("ppm", "")
        .replace("DL", "");
      CFCvalueC4F8 = CFCvalueC4F8.trim();
      var C4F8Data = {
        receivingPlant: receivingPlant,
        shipmentNumber: shipmentNumberC4F8,
        shipmentdate: today,
        lotNumber: lotNumberC4F8,
        expiryDate: expC4F8,
        manDate: manC4F8,
        acidityvalue: acidityC4F8,
        H2Ovalue: H2OvalueC4F8,
        N2O2value: N2O2valueC4F8,
        CFCvalue: CFCvalueC4F8,
      };
    }
    if (data.length === 31) {
      var manC4F8 = data[20][1];
      var expC4F8 = data[21][1];
      var lotNumberC4F8 = data[25][1];
      var acidityC4F8 = data[7][2];
      acidityC4F8 = acidityC4F8
        .replace("<", "")
        .replace("ppm", "")
        .replace("DL", "")
        .replace(" (w)", "");
      acidityC4F8 = acidityC4F8.trim();
      var H2OvalueC4F8 = data[6][2];
      H2OvalueC4F8 = H2OvalueC4F8.replace("<", "")
        .replace("ppm", "")
        .replace("DL", "");
      H2OvalueC4F8 = H2OvalueC4F8.trim();
      var N2O2valueC4F8 = data[3][2];
      N2O2valueC4F8 = N2O2valueC4F8.replace("< ", "")
        .replace("ppm", "")
        .replace("DL", "");
      N2O2valueC4F8 = N2O2valueC4F8.trim();
      var CFCvalueC4F8 = data[5][2];
      CFCvalueC4F8 = CFCvalueC4F8.replace("<", "")
        .replace("ppm", "")
        .replace("DL", "");
      CFCvalueC4F8 = CFCvalueC4F8.trim();

      var C4F8Data = {
        receivingPlant: receivingPlant,
        shipmentNumber: shipmentNumberC4F8,
        shipmentdate: today,
        lotNumber: lotNumberC4F8,
        expiryDate: expC4F8,
        manDate: manC4F8,
        acidityvalue: acidityC4F8,
        H2Ovalue: H2OvalueC4F8,
        N2O2value: N2O2valueC4F8,
        CFCvalue: CFCvalueC4F8,
      };
    }
    console.log("all data", C4F8Data);

    // posto i dati per compilare file xlm

    const C4F8options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(C4F8Data),
    };
    const myresponseC4F8 = await fetch("/apiC4F8", C4F8options);
    var myjsonC4F8 = await myresponseC4F8.json();
    //console.log(myjsonC4F8);
  }
}
//---------------- END C4F8 PERFLUOROCYCLOBUTANE ----------------------
