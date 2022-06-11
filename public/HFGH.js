// ---------------- HF GERLING HOLZ -----------------
let cylinderListArray = [],
  H2SiF6array = [],
  SO2array = [],
  H2SO4array = [],
  H2Oarray = [],
  arrayCasual = [],
  cylNumbers = [],
  mfgDate = [],
  expDate = [],
  shNumHF = [],
  H2SiF6param = [],
  SO2param = [],
  H2SO4param = [],
  H2Oparam = [],
  cylinderList,
  shipmentNumberHFGH,
  manDateHFGH,
  expDataHF;

function HFHGCylinders() {
  cylinderList = document.getElementById("HFHGCylinders").value;
  manDateHFGH = document.getElementById("ManDateHFGH").value;
  document.getElementById("testoCorretto").innerHTML =
    "Lista # cylinders: " +
    cylinderList +
    "<br/>" +
    "Manufacturing date: " +
    manDateHFGH +
    "<br/>";

  document.getElementById("btnCorretto").style.display = "inline";
  document.getElementById("btnNonCorretto").style.display = "inline";
}

function HFGHLines() {
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  document.getElementById("btnCorretto").style.display = "none";
  document.getElementById("btnNonCorretto").style.display = "none";
  cylinderListArray = cylinderList.split(",");

  HFData();
  async function HFData() {
    //Counter alimenta e salva il contatore di counter.txt
    for (let i = 0; i < cylinderListArray.length; i++) {
      const testResponse = await fetch("/apicounter");
      var dataTest = await testResponse.text();
      //console.log("dataTest1", dataTest);
      dataTest = parseInt(dataTest);
      dataTest++;
      var dt = new Date();
      var anno = dt.getFullYear().toString();
      anno = anno.substring(2, 4);

      if (dataTest < 10) {
        shipmentNumberHFGH = "IT/000" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 10 && dataTest < 100) {
        shipmentNumberHFGH = "IT/00" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 100 && dataTest < 1000) {
        shipmentNumberHFGH = "IT/0" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 1000) {
        shipmentNumberHFGH = "IT/" + dataTest.toString() + "/" + anno;
      }
      if (dataTest > 10000) {
        alert("reset counter.txt file");
      }
      shNumHF.push(shipmentNumberHFGH);
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

    var year = manDateHFGH.substring(0, 4);
    var month = manDateHFGH.substring(5, 7);
    var day = manDateHFGH.substring(8, 10);

    manDateHFGH = day + "-" + monthNameMan[parseInt(month) - 1] + "-" + year;
    expDataHF =
      day +
      "-" +
      monthNameMan[parseInt(month) - 1] +
      "-" +
      (parseInt(year) + 1);

    H2SiF6array = [
      6.8, 5.6, 8.8, 6, 7.6, 9.6, 5.6, 7.2, 7.6, 8.8, 7.2, 6.4, 5.6, 6, 9.2, 6,
      6, 9.6, 7.6, 5.2, 7.2, 9.6, 6, 10.4, 9.6, 6.8, 7.2, 9.2, 6, 7.6, 10, 8,
      7.6, 6, 9.6, 6, 6.8, 7.6, 8.8, 6.8, 10, 7.6, 7.6, 6.4, 9.2, 6.8, 9.6, 8.4,
      7.6, 10.4, 8.8, 5.6, 5.6, 7.2, 9.6, 7.2, 6,
    ];
    SO2array = [
      6, 4, 3.5, 3, 3, 4, 4.5, 2.5, 3, 6, 4, 2.5, 3, 3.5, 6, 4, 2.5, 3.5, 2.5,
      3.5, 3, 4.5, 6, 4.5, 3.5, 4.5, 6, 3.5, 2.5, 2.5, 3.5, 4, 6.5, 5.5, 3.5,
      2.5, 6, 3.5, 4.5, 5, 4.5, 2.5, 4, 5.5, 4.5, 3.5, 5, 6.5, 4.5, 3.5, 2.5, 3,
      4.5, 3.5, 3, 6.5, 5,
    ];
    H2SO4array = [
      61.25, 41.25, 35, 23.75, 32.5, 38.75, 46.25, 18.75, 26.25, 60, 42.5, 20,
      31.25, 33.75, 61.25, 40, 23.75, 35, 21.25, 35, 27.5, 45, 57.5, 47.5,
      26.25, 48.75, 58.75, 31.25, 22.5, 18.75, 36.25, 42.5, 65, 53.75, 30,
      21.25, 61.25, 27.5, 43.75, 51.25, 43.75, 23.75, 41.25, 57.5, 47.5, 32.5,
      48.75, 65, 43.75, 32.5, 20, 27.5, 47.5, 35, 26.25, 63.75, 50,
    ];
    H2Oarray = [
      27, 30.6, 44.2, 26.4, 25.6, 43, 23.4, 28.2, 42.4, 36.2, 23, 30.4, 35,
      39.8, 42, 37.2, 20.4, 36, 40, 29.8, 44.2, 34.8, 25, 37, 45, 38.6, 25.8,
      43, 44.6, 41.6, 37.2, 21, 24.4, 30.4, 21.6, 44.2, 20, 25.8, 39.6, 42.2,
      35.2, 24.6, 31.2, 42.4, 28.6, 24, 45.2, 36.2, 40.4, 49.6, 34, 24.4, 36.4,
      41.2, 38.4, 35.6, 29,
    ];

    for (let i = 0; i < cylinderListArray.length; i++) {
      // random choise of the parameter
      const random = Math.floor(Math.random() * 57);
      H2SiF6param.push(H2SiF6array[random]);
      SO2param.push(SO2array[random]);
      H2SO4param.push(H2SO4array[random]);
      H2Oparam.push(H2Oarray[random]);
      mfgDate.push(manDateHFGH);
      expDate.push(expDataHF);
    }
    var HFGerlingData = {
      lotNumber: cylinderListArray,
      shipmentNumber: shNumHF,
      shipmentdate: today,
      expiryDate: expDate,
      filename: cylinderListArray,
      manDate: mfgDate,
      H2SiF6value: H2SiF6param,
      SO2value: SO2param,
      H2SO4value: H2SO4param,
      H2Ovalue: H2Oparam,
    };
    console.log("DatiHF", HFGerlingData);

    //  posto i dati per compilare file xlm

    const HFoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(HFGerlingData),
    };
    const myresponseHF = await fetch("/apiHFGerling", HFoptions);
    var myjsonHF = await myresponseHF.json();
    //console.log(myjsonHF);
  }
}

// ---------------- END HF GERLING HOLZ -----------------
