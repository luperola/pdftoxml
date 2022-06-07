let nbrPages,
  drumsListHF,
  manDateHFUS,
  Cl2HF,
  KHF,
  CuHF,
  FeHF,
  FHF,
  NiHF,
  NaHF,
  PbHF,
  AsHF,
  H2OHF,
  expiryDateforHF,
  shipmentNumberHF,
  drumsHFArray = [],
  mfgDateHF = [],
  expDateHF = [],
  Cl2HFArray = [],
  KHFArray = [],
  CuHFArray = [],
  FeHFArray = [],
  FHFArray = [],
  NiHFArray = [],
  NaHFArray = [],
  PbHFArray = [],
  AsHFArray = [],
  H2OHFArray = [],
  shNumberHF = [],
  oggiHF = [];

function HFNumberOfPages() {
  nbrPages = document.getElementById("HFPages").value;

  if (nbrPages === "1") {
    document.getElementById("pagina1").style.display = "inline";
  }
  if (nbrPages === "2") {
    //window.location.href = "HFPage2.html";
    window.open("HF18USPage2.html", "_blank").focus();
  }
  if (parseInt(nbrPages) > 2) {
    alert(
      "Si possono fare due pagine alla volta. Fai le prime due e poi ricomincia"
    );
    window.location.href("HF18US.html");
    //window.open("HF.html", "_blank").focus();
  }
}

function HFDrumsPag1() {
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

  document.getElementById("btnInvia").style.display = "none";
  document.getElementById("pagina1").style.display = "none";

  document.getElementById("testoCorretto").innerHTML =
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
  ReadHFText();
  async function ReadHFText() {
    //Counter per shipment Number progressivo
    for (let index = 0; index < drumsHFArray.length; index++) {
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
