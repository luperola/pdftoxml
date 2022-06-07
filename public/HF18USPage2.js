let drumsListHFP2,
  manDateHFUSP2,
  Cl2HFP2,
  KHFP2,
  CuHFP2,
  FeHFP2,
  FHFP2,
  NiHFP2,
  NaHFP2,
  PbHFP2,
  AsHFP2,
  H2OHFP2,
  expiryDateforHFP2,
  shipmentNumberHFP2,
  drumsHFP2Array = [],
  mfgDateHFP2 = [],
  expDateHFP2 = [],
  Cl2HFP2Array = [],
  KHFP2Array = [],
  CuHFP2Array = [],
  FeHFP2Array = [],
  FHFP2Array = [],
  NiHFP2Array = [],
  NaHFP2Array = [],
  PbHFP2Array = [],
  AsHFP2Array = [],
  H2OHFP2Array = [],
  shNumberHFP2 = [];

function HFDrumsPag2() {
  drumsListHF = document.getElementById("HFDrums").value;
  manDateHFUS = document.getElementById("ManDateHF").value;
  Cl2HF = document.getElementById("Cl2HF").value;
  KHF = document.getElementById("KHF").value;
  CuHF = document.getElementById("CuHF").value;
  FeHF = document.getElementById("FeHF").value;
  FHF = document.getElementById("FHF").value;
  NiHF = document.getElementById("NiHF").value;
  NaHF = document.getElementById("NaHF").value;
  PbHF = document.getElementById("PbHF").value;
  AsHF = document.getElementById("AsHF").value;
  H2OHF = document.getElementById("H2OHF").value;

  drumsListHFP2 = document.getElementById("HFDrumsP2").value;
  manDateHFUSP2 = document.getElementById("ManDateHFP2").value;
  Cl2HFP2 = document.getElementById("Cl2HFP2").value;
  KHFP2 = document.getElementById("KHFP2").value;
  CuHFP2 = document.getElementById("CuHFP2").value;
  FeHFP2 = document.getElementById("FeHFP2").value;
  FHFP2 = document.getElementById("FHFP2").value;
  NiHFP2 = document.getElementById("NiHFP2").value;
  NaHFP2 = document.getElementById("NaHFP2").value;
  PbHFP2 = document.getElementById("PbHFP2").value;
  AsHFP2 = document.getElementById("AsHFP2").value;
  H2OHFP2 = document.getElementById("H2OHFP2").value;

  document.getElementById("btnInvia").style.display = "none";
  document.getElementById("contenitore").style.display = "none";

  document.getElementById("testoCorretto").innerHTML =
    "DATI PAGINA 1 " +
    "Lista # drums: " +
    drumsListHF +
    "<br/>" +
    "Manufacturing date: " +
    manDateHFUS +
    "<br/>" +
    "valore Chloride: " +
    Cl2HF +
    "<br/>" +
    "Valore Potassium: " +
    KHF +
    "<br/>" +
    "Valore Iron: " +
    FeHF +
    "<br/>" +
    "Valore Fluorisilic acid: " +
    FHF +
    "<br/>" +
    "Valore Nickel: " +
    NiHF +
    "<br/>" +
    "Valore Sodium: " +
    NaHF +
    "<br/>" +
    "Valore Lead: " +
    PbHF +
    "<br/>" +
    "Valore Arsenic: " +
    AsHF +
    "<br/>" +
    "Valore Moisture: " +
    H2OHF +
    "<br/>" +
    "------------" +
    "<br/>" +
    //Pagina 2
    "DATI PAGINA 2 " +
    "<br/>" +
    "Lista # drums: " +
    drumsListHFP2 +
    "<br/>" +
    "Manufacturing date: " +
    manDateHFUSP2 +
    "<br/>" +
    "valore Chloride: " +
    Cl2HFP2 +
    "<br/>" +
    "Valore Potassium: " +
    KHFP2 +
    "<br/>" +
    "Valore Iron: " +
    FeHFP2 +
    "<br/>" +
    "Valore Fluorisilic acid: " +
    FHFP2 +
    "<br/>" +
    "Valore Nickel: " +
    NiHFP2 +
    "<br/>" +
    "Valore Sodium: " +
    NaHFP2 +
    "<br/>" +
    "Valore Lead: " +
    PbHFP2 +
    "<br/>" +
    "Valore Arsenic: " +
    AsHFP2 +
    "<br/>" +
    "Valore Moisture: " +
    H2OHFP2 +
    "<br/>";

  document.getElementById("btnCorretto").style.display = "inline";
  document.getElementById("btnNonCorretto").style.display = "inline";
}

function HFLines() {
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  document.getElementById("btnCorretto").style.display = "none";
  document.getElementById("btnNonCorretto").style.display = "none";

  drumsHFArray = drumsListHF.split(",");
  drumsHFP2Array = drumsListHFP2.split(",");

  ReadHFText();
  async function ReadHFText() {
    //Counter per shipment Number progressivo
    for (
      let index = 0;
      index < drumsHFArray.length + drumsHFP2Array.length;
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
        shipmentNumberHF = "IT/000" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 10 && dataTest < 100) {
        shipmentNumberHF = "IT/00" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 100 && dataTest < 1000) {
        shipmentNumberHF = "IT/0" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 1000) {
        shipmentNumberHF = "IT/" + dataTest.toString() + "/" + anno;
      }
      if (dataTest > 10000) {
        alert("reset counter.txt file");
      }
      shNumberHF.push(shipmentNumberHF);

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

    var year = manDateHFUS.substring(0, 4);
    var month = manDateHFUS.substring(5, 7);
    var day = manDateHFUS.substring(8, 10);
    manDateHFUS = day + "-" + monthNameMan[parseInt(month) - 1] + "-" + year;
    expiryDateforHF =
      day +
      "-" +
      monthNameMan[parseInt(month) - 1] +
      "-" +
      (parseInt(year) + 2);

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

    var year = manDateHFUSP2.substring(0, 4);
    var month = manDateHFUSP2.substring(5, 7);
    var day = manDateHFUSP2.substring(8, 10);
    manDateHFUSP2 =
      day + "-" + monthNameManP2[parseInt(month) - 1] + "-" + year;
    expiryDateforHFP2 =
      day +
      "-" +
      monthNameManP2[parseInt(month) - 1] +
      "-" +
      (parseInt(year) + 2);

    for (let index = 0; index < drumsHFArray.length; index++) {
      //drumsHFArray[index] = drumsHFArray[index].replace(/\//g, "-");
      mfgDateHF.push(manDateHFUS);
      expDateHF.push(expiryDateforHF);
      Cl2HFArray.push(Cl2HF);
      KHFArray.push(KHF);
      CuHFArray.push(CuHF);
      FeHFArray.push(FeHF);
      FHFArray.push(FHF);
      NiHFArray.push(NiHF);
      NaHFArray.push(NaHF);
      PbHFArray.push(PbHF);
      AsHFArray.push(AsHF);
      H2OHFArray.push(H2OHF);
      oggiHF.push(today);
    }

    for (let index = 0; index < drumsHFP2Array.length; index++) {
      //drumsHFArray[index] = drumsHFArray[index].replace(/\//g, "-");
      mfgDateHF.push(manDateHFUSP2);
      expDateHF.push(expiryDateforHFP2);
      Cl2HFArray.push(Cl2HFP2);
      KHFArray.push(KHFP2);
      CuHFArray.push(CuHFP2);
      FeHFArray.push(FeHFP2);
      FHFArray.push(FHFP2);
      NiHFArray.push(NiHFP2);
      NaHFArray.push(NaHFP2);
      PbHFArray.push(PbHFP2);
      AsHFArray.push(AsHFP2);
      H2OHFArray.push(H2OHFP2);
      oggiHF.push(today);
      drumsHFArray.push(drumsHFP2Array[index]);
    }

    const dataHF = {
      shipment: oggiHF,
      lotNumber: drumsHFArray,
      expiryDate: expDateHF,
      manDate: mfgDateHF,
      progressivoHF: shNumberHF,
      filetext: drumsHFArray,
      Cl2HF: Cl2HFArray,
      KHF: KHFArray,
      CuHF: CuHFArray,
      FeHF: FeHFArray,
      FHF: FHFArray,
      NiHF: NiHFArray,
      NaHF: NaHFArray,
      PbHF: PbHFArray,
      AsHF: AsHFArray,
      H2OHF: H2OHFArray,
    };

    console.log("dataHF", dataHF);

    const HFoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataHF),
    };
    const myresponseHF = await fetch("/apiHF18US", HFoptions);
    var myjsonHF = await myresponseHF.json();
    // console.log(myjsonHF);
  }
}
