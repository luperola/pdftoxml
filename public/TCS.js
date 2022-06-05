let drumsListTCS,
  manDateTCS,
  BTCS,
  AlTCS,
  FeTCS,
  PAsSbTCS,
  CTCS,
  TCSTCS,
  expiryDateforTCS,
  plant,
  expDateTCS = [],
  mfgDateTCS = [],
  drumsTCSArray = [],
  AlTCSArray = [],
  BTCSArray = [],
  PAsSbTCSArray = [],
  FeTCSArray = [],
  CTCSArray = [],
  TCSTCSArray = [],
  oggiTCS = [],
  deliveryPlant = [];

function TCSDrums() {
  drumsListTCS = document.getElementById("TCSDrums").value;
  manDateTCS = document.getElementById("manDateTCS").value;
  BTCS = document.getElementById("BTCS").value;
  AlTCS = document.getElementById("AlTCS").value;
  PAsSbTCS = document.getElementById("PAsSbTCS").value;
  FeTCS = document.getElementById("FeTCS").value;
  CTCS = document.getElementById("CTCS").value;
  TCSTCS = document.getElementById("TCSTCS").value;
  plant = document.getElementById("site").value;
  document.getElementById("dataTCS").style.display = "none";
  document.getElementById("btnInvia").style.display = "none";
  document.getElementById("testoCorretto").innerHTML =
    "Lista # drums: " +
    drumsListTCS +
    "<br/>" +
    "Manufacturing date: " +
    manDateTCS +
    "<br/>" +
    "Valore Boron: " +
    BTCS +
    "<br/>" +
    "Valore Aluminum: " +
    AlTCS +
    "<br/>" +
    "Valore P + As + Sb: " +
    PAsSbTCS +
    "<br/>" +
    "Valore Ferro: " +
    FeTCS +
    "<br/>" +
    "Valore Carbon: " +
    CTCS +
    "<br/>" +
    "Valore TCS % : " +
    TCSTCS +
    "<br/>" +
    "Sito di destinazione: " +
    plant +
    "<br/>";

  document.getElementById("btnCorretto").style.display = "inline";
  document.getElementById("btnNonCorretto").style.display = "inline";
}

function TCSLines() {
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  document.getElementById("btnCorretto").style.display = "none";
  document.getElementById("btnNonCorretto").style.display = "none";

  drumsTCSArray = drumsListTCS.split(",");
  ReadCSText();
  async function ReadCSText() {
    //Counter per shipment Number progressivo
    for (let index = 0; index < drumsTCSArray.length; index++) {
      const testResponse = await fetch("/apicounter");
      var dataTest = await testResponse.text();
      //console.log("dataTest1", dataTest);
      dataTest = parseInt(dataTest);
      dataTest++;
      var dt = new Date();
      var anno = dt.getFullYear().toString();
      anno = anno.substring(2, 4);
      if (dataTest < 10) {
        shipmentNumberTCS = "IT/000" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 10 && dataTest < 100) {
        shipmentNumberTCS = "IT/00" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 100 && dataTest < 1000) {
        shipmentNumberTCS = "IT/0" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 1000) {
        shipmentNumberTCS = "IT/" + dataTest.toString() + "/" + anno;
      }
      if (dataTest > 10000) {
        alert("reset counter.txt file");
      }
      shNumberTCS.push(shipmentNumberTCS);

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
    var year = manDateTCS.substring(0, 4);
    var month = manDateTCS.substring(5, 7);
    var day = manDateTCS.substring(8, 10);
    manDateTCS = day + "-" + monthNameMan[parseInt(month) - 1] + "-" + year;
    expiryDateforTCS =
      day +
      "-" +
      monthNameMan[parseInt(month) - 1] +
      "-" +
      (parseInt(year) + 2).toString();

    for (let index = 0; index < drumsTCSArray.length; index++) {
      mfgDateTCS.push(manDateTCS);
      expDateTCS.push(expiryDateforTCS);
      BTCSArray.push(BTCS);
      AlTCSArray.push(AlTCS);
      PAsSbTCSArray.push(PAsSbTCS);
      FeTCSArray.push(FeTCS);
      CTCSArray.push(CTCS);
      TCSTCSArray.push(TCSTCS);
      oggiTCS.push(today);
      deliveryPlant.push(plant);
    }

    const dataTCS = {
      shipment: oggiTCS,
      lotNumber: drumsTCSArray,
      expiryDate: expDateTCS,
      manDate: mfgDateTCS,
      progressivoTCS: shNumberTCS,
      filetext: drumsTCSArray,
      B: BTCSArray,
      Al: AlTCSArray,
      PAsSb: PAsSbTCSArray,
      Fe: FeTCSArray,
      C: CTCSArray,
      TCSTCS: TCSTCSArray,
      delivery: deliveryPlant,
    };

    console.log("dataTCS", dataTCS);

    const TCSoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataTCS),
    };
    const myresponseTCS = await fetch("/apiTCS", TCSoptions);
    var myjsonTCS = await myresponseTCS.json();
    // console.log(myjsonTCS);
  }
}
