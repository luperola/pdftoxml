//--------------TCS Burghausen-----------------------
function TCSBurghausenAGR() {
  var receivingPlant = "Agrate";
  TCSBurghausen(receivingPlant);
}
function TCSBurghausenCAT() {
  var receivingPlant = "Catania";
  TCSBurghausen(receivingPlant);
}
function TCSBurghausen(receivingPlant) {
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("CSPage").style.display = "none";
  document.getElementById("NOTaulovPage").style.display = "none";
  //document.getElementById("modalCS").style.display = "none";
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  ReadTCSB();
  async function ReadTCSB() {
    const response = await fetch("/jsonSampleFile2");
    var dataTCSB = await response.json();
    //console.log("data TCSB", dataTCSB);

    var test = dataTCSB[21].length;

    if (test === 13) {
      lotNumberTCSB = dataTCSB[21][10] + dataTCSB[21][11] + dataTCSB[21][12];
      manDateTCSB =
        dataTCSB[21][3] + dataTCSB[21][4] + dataTCSB[21][5] + dataTCSB[21][6];
    }
    if (test === 14) {
      lotNumberTCSB = dataTCSB[21][11] + dataTCSB[21][12] + dataTCSB[21][13];
      manDateTCSB =
        dataTCSB[21][3] +
        dataTCSB[21][4] +
        dataTCSB[21][5] +
        dataTCSB[21][6] +
        dataTCSB[21][7];
    }

    manDateTCSB = manDateTCSB.replaceAll(".", "-");
    const monthMan = parseInt(manDateTCSB.substring(3, 5)) - 1;
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
    manDateTCSB =
      manDateTCSB.substring(0, 3) +
      monthNameMan[monthMan] +
      manDateTCSB.substring(5, 10);

    var exp = parseInt(manDateTCSB.substring(7, 11)) + 2;
    var expDateTCSB =
      manDateTCSB.substring(0, 3) +
      monthNameMan[monthMan] +
      "-" +
      exp.toString();

    // ricavo % di TCS (assayTCS)
    var assayTCS = dataTCSB[5].join("");
    assayTCS = assayTCS.replace(",", ".");
    assayTCS = assayTCS.match(/\d./g);
    assayTCS = assayTCS.join(".");
    //console.log("assay TCS", assayTCS);

    // ricavo i drums numbers unendo e splittando le due stringhe
    var str1 = dataTCSB[19].join("");
    const str2 = dataTCSB[20].join("");
    str1 = str1.concat(",", str2);
    str1 = str1
      .replace("Drum-No(s):", "")
      .replace(".", ",")
      .replace(".", ",")
      .replace(",,", ",")
      .replace(",,", ",");

    let drumNumberTCSB = [];
    drumNumberTCSB = str1.split(",");
    for (let i = 0; i < drumNumberTCSB.length; i++) {
      drumNumberTCSB[i] = drumNumberTCSB[i].trim();
    }

    // ricavo i parametri degli elementi in specifica
    //Boron
    var str3 = dataTCSB[9].join("");
    str3 = str3.replace(",", ".").replace(",", ".");
    let BvalueMake = [];
    BvalueMake = str3.split("atomic");
    var BvalueTCS = BvalueMake[1];
    BvalueTCS = BvalueTCS.trim();
    BvalueTCS = BvalueTCS.replace("ppb", "");
    //Aluminum
    var str4 = dataTCSB[10].join("");
    str4 = str4.replace(",", ".").replace(",", ".");
    let AlvalueMake = [];
    AlvalueMake = str4.split("atomic");
    var AlvalueTCS = AlvalueMake[1];
    AlvalueTCS = AlvalueTCS.trim();
    AlvalueTCS = AlvalueTCS.replace("ppb", "");
    // Phosporous + Arsenic + Antimony
    var str5 = dataTCSB[13].join("");
    str5 = str5.replace(",", ".").replace(",", ".");
    let PAsSbvalueMake = [];
    PAsSbvalueMake = str5.split("atomic");
    var PAsSbvalueTCS = PAsSbvalueMake[1];
    PAsSbvalueTCS = PAsSbvalueTCS.trim();
    PAsSbvalueTCS = PAsSbvalueTCS.replace("ppb", "");
    // Carbon
    var str6 = dataTCSB[14].join("");
    str6 = str6.replace(",", ".").replace(",", ".");
    let CvalueMake = [];
    CvalueMake = str6.split("atomic");
    var CvalueTCS = CvalueMake[1];
    CvalueTCS = CvalueTCS.trim();
    CvalueTCS = CvalueTCS.replace("ppm", "");
    // Iron
    var str7 = dataTCSB[16].join("");
    str7 = str7.replace(",", ".").replace(",", ".");
    let FevalueMake = [];
    FevalueMake = str7.split("by weight");
    var FevalueTCS = FevalueMake[1];
    FevalueTCS = FevalueTCS.trim();
    FevalueTCS = FevalueTCS.replace("ppb", "").replace("<", "");

    //--------------TCS BURGHAUSEN COUNTER ------------
    for (let i = 0; i < drumNumberTCSB.length; i++) {
      const testResponse = await fetch("/apicounter");
      var dataTest = await testResponse.text();
      //console.log("dataTest1", dataTest);
      dataTest = parseInt(dataTest);
      dataTest++;
      var dt = new Date();
      var anno = dt.getFullYear().toString();
      anno = anno.substring(2, 4);
      if (dataTest < 10) {
        shipmentNumberTCSB = "IT/000" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 10 && dataTest < 100) {
        shipmentNumberTCSB = "IT/00" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 100 && dataTest < 1000) {
        shipmentNumberTCSB = "IT/0" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 1000) {
        shipmentNumberTCSB = "IT/" + dataTest.toString() + "/" + anno;
      }
      if (dataTest > 10000) {
        alert("reset counter.txt file");
      }
      shNumberTCS.push(shipmentNumberTCSB);
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
    }
    //--------------END TCS BURGHAUSEN  COUNTER ------------

    //dati TCS Burghausen da postare

    const dataTCS = {
      lotNumberTCSB: lotNumberTCSB,
      shipmentDateTCSB: manDateTCSB,
      plant: receivingPlant,
      filenamesTCSB: drumNumberTCSB,
      expiryDateTCSB: expDateTCSB,
      manDateTCSB: manDateTCSB,
      progressivoTCSB: shNumberTCS,
      TCSBvalue: BvalueTCS,
      TCSAlvalue: AlvalueTCS,
      TCSPAsSbvalue: PAsSbvalueTCS,
      TCSCvalue: CvalueTCS,
      TCSFevalue: FevalueTCS,
      TCSAssay: assayTCS,
    };
    console.log("dataTCS", dataTCS);

    const TCSoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataTCS),
    };
    const myresponseTCS = await fetch("/TCS", TCSoptions);
    //var myjsonTCS = await myresponseTCS.json();
    //console.log(myjsonTCS);
  }
}
//--------------END TCS Burghausen-----------------------
