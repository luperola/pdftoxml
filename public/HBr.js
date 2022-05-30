function HBr() {
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
    console.log("data", data);

    //Counter alimenta e salva il contatore di counter.txt
    const testResponse = await fetch("/apicounter");
    var dataTest = await testResponse.text();
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
    //console.log("myJson", myjson);

    var manHBr = data[2][2];
    manHBr = manHBr.replace(".", "-");
    manHBr = manHBr.replace(".", "-");
    const monthMan = parseInt(manHBr.substring(3, 5)) - 1;
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
    manHBr =
      manHBr.substring(0, 2) +
      "-" +
      monthNameMan[monthMan] +
      "-" +
      manHBr.substring(6, 11);
    var yearExp = parseInt(manHBr.substring(7, 11)) + 2;
    //sostituito 6 momths shelflife con 24 months
    //var monthExp = monthMan + 6;
    let expHBr;
    expHBr =
      manHBr.substring(0, 2) + "-" + monthNameMan[monthMan] + "-" + yearExp;
    // if (monthExp <= 12) {
    //   expHBr =
    //     manHBr.substring(0, 2) +
    //     "-" +
    //     monthNameMan[monthExp] +
    //     "-" +
    //     manHBr.substring(7, 11);
    // }
    // if (monthExp > 12) {
    //   monthExp = monthExp - 12;
    //   yearExp = yearExp + 1;
    //   expHBr =
    //     manHBr.substring(0, 2) + "-" + monthNameMan[monthExp] + "-" + yearExp;
    // }
    var lotNumberHBr = data[16][1];
    var filenameHBr = data[17][1];
    var FevalueHBr = data[10][2];
    var CO2valueHBr = data[8][2];
    var COvalueHBr = data[7][2];
    var HClvalueHBr = "0.2";
    var H2OvalueHBr = data[4][2];
    var N2valueHBr = data[6][2];
    var O2valueHBr = data[5][2];
    var THCvalueHBr = "0.02";

    var HBrData = {
      filename: filenameHBr,
      //shipmentNumber: shipmentNumberHBr,
      shipmentdate: today,
      lotNumber: lotNumberHBr,
      expiryDate: expHBr,
      manDate: manHBr,
      Fevalue: FevalueHBr,
      CO2value: CO2valueHBr,
      COvalue: COvalueHBr,
      HClvalue: HClvalueHBr,
      H2Ovalue: H2OvalueHBr,
      N2value: N2valueHBr,
      O2value: O2valueHBr,
      THCvalue: THCvalueHBr,
    };
    console.log("all data", HBrData);

    // posto i dati per compilare file xlm

    const HBroptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(HBrData),
    };
    const myresponseHBr = await fetch("/apiBromide", HBroptions);
    var myjsonHBr = await myresponseHBr.json();
    //console.log(myjsonHBr);
  }
}
