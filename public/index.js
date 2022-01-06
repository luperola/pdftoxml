var myDate,
  expirationDateOne,
  shipmentNumberW,
  shipmentNumberHI,
  shipmentNumberCS,
  shipmentNumberTCSB,
  lotNumberTCSB,
  manDateTCSB;
let testMatrixCS1 = [],
  testMatrixCS2 = [],
  mfgDateCS = [],
  expDateCS = [],
  shipmentLotNumberCS = [],
  yearChangeFormat = [],
  shNumberW = [],
  shNumberCS = [],
  shNumberHI = [],
  shNumberTCS = [],
  arrayHI = [],
  shNumberHICAT = [],
  arrayShN = [],
  arraydataHI = [],
  arrayIndeces = [],
  arrayFinalDataHI = [],
  arrayIndecesMetal = [],
  arrayIndecesMetalRandom = [],
  arrayMetalDataHI = [];

//---------------HONG IN AGRATE----------------

function HongInAGR() {
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  ReadHIText();
  async function ReadHIText() {
    const response = await fetch("/jsonSampleFile2");
    var dataTextHI = await response.text();
    arraydataHI = dataTextHI.split("]");
    //console.log("all arrays", arraydataHI);

    //cerco HXHCL e rilevo gli indici di dove si trovano - lo stesso con Anlaytical Results per i metalli
    for (let index = 0; index < arraydataHI.length; index++) {
      if (arraydataHI[index].indexOf("HXHCL") != -1) {
        arrayIndeces.push(index);
      }

      // if (
      //   arraydataHI[index].indexOf("Analytical") != -1 &&
      //   arraydataHI[index].indexOf("Results") != -1
      // ) {
      //   arrayIndecesMetal.push(index);

      if (
        arraydataHI[index].substring(3, 13) === "Analytical" &&
        arraydataHI[index].substring(16, 23) === "Results"
      ) {
        arrayIndecesMetal.push(index);
      }
    }

    // faccio array random con le Metal Impurities fino a farle = numero drums del CoA
    for (let index = 0; index < arrayIndeces.length; index++) {
      const random = Math.floor(Math.random() * arrayIndecesMetal.length);
      arrayIndecesMetalRandom.push(arrayIndecesMetal[random]);
    }

    //uso gli indici di arrayIndeces per splittare le array dove si trova HXHCL e le impurità dei metals
    for (let index = 0; index < arrayIndeces.length; index++) {
      arrayFinalDataHI[index] = arraydataHI[arrayIndeces[index]];
      arrayFinalDataHI[index] = arrayFinalDataHI[index].split(",");
      arrayMetalDataHI[index] = arraydataHI[arrayIndecesMetalRandom[index]];
      arrayMetalDataHI[index] = arrayMetalDataHI[index].split(",");
    }
    //assegno i vari valori alle array dei dati HongIn
    //shipLotNumberHI è array con i drums /cylinders di HongIn. Dà anche i nomi dei files xml
    let shipLotNumberHI = [],
      //lotNumberHI è l'array HXHCL del lotto
      lotNumberHI = [],
      expirationDateHI = [],
      manufacturingDateHI = [],
      H2valueHI = [],
      O2ArvalueHI = [],
      N2valueHI = [],
      CH4valueHI = [],
      COvalueHI = [],
      CO2valueHI = [],
      H2OvalueHI = [],
      FevalueHI = [];
    for (let i = 0; i < arrayIndeces.length; i++) {
      arrayFinalDataHI[i][1] = arrayFinalDataHI[i][1].replace(
        /[^a-zA-Z0-9]/g,
        ""
      );
      lotNumberHI.push(arrayFinalDataHI[i][1]);
      arrayFinalDataHI[i][2] = arrayFinalDataHI[i][2]
        .replace('"', "")
        .replace('"', "");
      shipLotNumberHI.push(arrayFinalDataHI[i][2]);
      var changeDate = arrayFinalDataHI[i][7].substring(1, 9);
      ExpirationDateFormatOne(changeDate);
      var changeManufacturingDate = arrayFinalDataHI[i][5].substring(1, 9);
      shipmentDateFormat(changeManufacturingDate);
      H2valueHI[i] = arrayFinalDataHI[i][8]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      O2ArvalueHI[i] = arrayFinalDataHI[i][9]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      N2valueHI[i] = arrayFinalDataHI[i][10]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      CH4valueHI[i] = arrayFinalDataHI[i][11]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      COvalueHI[i] = arrayFinalDataHI[i][12]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      CO2valueHI[i] = arrayFinalDataHI[i][13]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      H2OvalueHI[i] = arrayFinalDataHI[i][14]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      FevalueHI[i] = arrayMetalDataHI[i][17]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");

      //--------------HONG IN AGRATE COUNTER ------------
      const testResponse = await fetch("/apicounter");
      var dataTest = await testResponse.text();
      //console.log("dataTest1", dataTest);
      dataTest = parseInt(dataTest);
      dataTest++;
      var dt = new Date();
      var anno = dt.getFullYear().toString();
      anno = anno.substring(2, 4);
      if (dataTest < 10) {
        shipmentNumberHI = "IT/000" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 10 && dataTest < 100) {
        shipmentNumberHI = "IT/00" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 100 && dataTest < 1000) {
        shipmentNumberHI = "IT/0" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 1000) {
        shipmentNumberHI = "IT/" + dataTest.toString() + "/" + anno;
      }
      if (dataTest > 10000) {
        alert("reset counter.txt file");
      }
      shNumberHI.push(shipmentNumberHI);
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
    //--------------END HONG IN AGRATE COUNTER ------------

    function shipmentDateFormat(changeDate) {
      myDate = changeDate;
      const year = myDate.substring(0, 4);
      const month = parseInt(myDate.substring(4, 6)) - 1;
      const months = [
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
      const day = myDate.substring(6, 8);
      myDate = day + "-" + months[month] + "-" + year;
      manufacturingDateHI.push(myDate);
    }

    function ExpirationDateFormatOne(changeDate) {
      expirationDateOne = changeDate;
      const yearOne = expirationDateOne.substring(0, 4);
      const monthOne = parseInt(expirationDateOne.substring(4, 6)) - 1;
      const monthsOne = [
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
      const dayOne = expirationDateOne.substring(6, 8);
      expirationDateOne = dayOne + "-" + monthsOne[monthOne] + "-" + yearOne;
      expirationDateHI.push(expirationDateOne);
    }
    // formo i dati da mandare poi per Hong In AGR & CAT

    const dataHI = {
      lotNumberHI: lotNumberHI,
      filenamesHI: shipLotNumberHI,
      expiryDateHI: expirationDateHI,
      manDateHI: manufacturingDateHI,
      progressivoHI: shNumberHI,
      filetextHI: shipLotNumberHI,
      HIH2value: H2valueHI,
      HIO2Arvalue: O2ArvalueHI,
      HIN2value: N2valueHI,
      HICH4value: CH4valueHI,
      HICOvalue: COvalueHI,
      HICO2value: CO2valueHI,
      HIH2Ovalue: H2OvalueHI,
      HIFevalue: FevalueHI,
    };
    console.log("dataHIAGR", dataHI);

    const HIoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataHI),
    };
    const myresponseHI = await fetch("/apifour", HIoptions);
    var myjsonHI = await myresponseHI.json();
    console.log(myjsonHI);
  }
}
//---------------END HONG IN AGRATE----------------

//---------------HONG IN CATANIA ----------------

function HongInCAT() {
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  ReadHIText();
  async function ReadHIText() {
    const response = await fetch("/jsonSampleFile2");
    var dataTextHI = await response.text();
    arraydataHI = dataTextHI.split("]");
    //console.log("all arrays", arraydataHI);

    //cerco HXHCL e rilevo gli indici di dove si trovano - lo stesso con Anlaytical Results per i metalli
    for (let index = 0; index < arraydataHI.length; index++) {
      if (arraydataHI[index].indexOf("HXHCL") != -1) {
        arrayIndeces.push(index);
      }

      // if (
      //   arraydataHI[index].indexOf("Analytical") != -1 &&
      //   arraydataHI[index].indexOf("Results") != -1
      // ) {
      //   arrayIndecesMetal.push(index);

      if (
        arraydataHI[index].substring(3, 13) === "Analytical" &&
        arraydataHI[index].substring(16, 23) === "Results"
      ) {
        arrayIndecesMetal.push(index);
      }
    }
    //console.log(arrayIndeces);
    // faccio array random con le Metal Impurities fino a farle = numero drums del CoA
    for (let index = 0; index < arrayIndeces.length; index++) {
      const random = Math.floor(Math.random() * arrayIndecesMetal.length);
      arrayIndecesMetalRandom.push(arrayIndecesMetal[random]);
    }

    //uso gli indici di arrayIndeces per splittare le array dove si trova HXHCL e le impurità dei metals
    for (let index = 0; index < arrayIndeces.length; index++) {
      arrayFinalDataHI[index] = arraydataHI[arrayIndeces[index]];
      arrayFinalDataHI[index] = arrayFinalDataHI[index].split(",");
      arrayMetalDataHI[index] = arraydataHI[arrayIndecesMetalRandom[index]];
      arrayMetalDataHI[index] = arrayMetalDataHI[index].split(",");
    }
    //assegno i vari valori alle array dei dati HongIn
    //shipLotNumberHI è array con i drums /cylinders di HongIn. Dà anche i nomi dei files xml
    let shipLotNumberHI = [],
      //lotNumberHI è l'array HXHCL del lotto
      lotNumberHI = [],
      expirationDateHI = [],
      manufacturingDateHI = [],
      H2valueHI = [],
      O2ArvalueHI = [],
      N2valueHI = [],
      CH4valueHI = [],
      COvalueHI = [],
      CO2valueHI = [],
      H2OvalueHI = [],
      FevalueHI = [],
      AlvalueHI = [],
      SbvalueHI = [],
      AsvalueHI = [],
      BivalueHI = [],
      BvalueHI = [],
      CdvalueHI = [],
      CrvalueHI = [],
      CovalueHI = [],
      CuvalueHI = [],
      PbvalueHI = [],
      MovalueHI = [],
      NivalueHI = [],
      PvalueHI = [],
      NavalueHI = [];
    for (let i = 0; i < arrayIndeces.length; i++) {
      arrayFinalDataHI[i][1] = arrayFinalDataHI[i][1]
        //.replace('"', "")
        //.replace('"', "")
        .replace(/[^a-zA-Z0-9]/g, "");
      //.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
      lotNumberHI.push(arrayFinalDataHI[i][1]);
      arrayFinalDataHI[i][2] = arrayFinalDataHI[i][2]
        .replace('"', "")
        .replace('"', "");
      shipLotNumberHI.push(arrayFinalDataHI[i][2]);
      var changeDate = arrayFinalDataHI[i][7].substring(1, 9);
      ExpirationDateFormatOne(changeDate);
      var changeManufacturingDate = arrayFinalDataHI[i][5].substring(1, 9);
      shipmentDateFormat(changeManufacturingDate);
      H2valueHI[i] = arrayFinalDataHI[i][8]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      O2ArvalueHI[i] = arrayFinalDataHI[i][9]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      N2valueHI[i] = arrayFinalDataHI[i][10]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      CH4valueHI[i] = arrayFinalDataHI[i][11]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      COvalueHI[i] = arrayFinalDataHI[i][12]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      CO2valueHI[i] = arrayFinalDataHI[i][13]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      H2OvalueHI[i] = arrayFinalDataHI[i][14]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      FevalueHI[i] = arrayMetalDataHI[i][17]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      AlvalueHI[i] = arrayMetalDataHI[i][5]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      SbvalueHI[i] = arrayMetalDataHI[i][12]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      AsvalueHI[i] = arrayMetalDataHI[i][18]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      BivalueHI[i] = arrayMetalDataHI[i][14]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      BvalueHI[i] = arrayMetalDataHI[i][4]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      CdvalueHI[i] = arrayMetalDataHI[i][11]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      CrvalueHI[i] = arrayMetalDataHI[i][16]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      CovalueHI[i] = arrayMetalDataHI[i][6]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      CuvalueHI[i] = arrayMetalDataHI[i][8]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      PbvalueHI[i] = arrayMetalDataHI[i][13]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      MovalueHI[i] = arrayMetalDataHI[i][10]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      NivalueHI[i] = arrayMetalDataHI[i][7]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      PvalueHI[i] = arrayMetalDataHI[i][3]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      NavalueHI[i] = arrayMetalDataHI[i][15]
        .replace("ND<", "")
        .replace('"', "")
        .replace('"', "");
      //}

      //--------------HONG IN CATANIA COUNTER ------------
      const testResponse = await fetch("/apicounter");
      var dataTest = await testResponse.text();
      //console.log("dataTest1", dataTest);
      dataTest = parseInt(dataTest);
      dataTest++;
      var dt = new Date();
      var anno = dt.getFullYear().toString();
      anno = anno.substring(2, 4);
      if (dataTest < 10) {
        shipmentNumberHI = "IT/000" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 10 && dataTest < 100) {
        shipmentNumberHI = "IT/00" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 100 && dataTest < 1000) {
        shipmentNumberHI = "IT/0" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 1000) {
        shipmentNumberHI = "IT/" + dataTest.toString() + "/" + anno;
      }
      if (dataTest > 10000) {
        alert("reset counter.txt file");
      }
      shNumberHICAT.push(shipmentNumberHI);
      //console.log("shNumberAgrarray", shNumberHICAT);
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
    }
    //--------------END HONG IN CATANIA COUNTER ------------

    function shipmentDateFormat(changeDate) {
      myDate = changeDate;
      const year = myDate.substring(0, 4);
      const month = parseInt(myDate.substring(4, 6)) - 1;
      const months = [
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
      const day = myDate.substring(6, 8);
      myDate = day + "-" + months[month] + "-" + year;
      manufacturingDateHI.push(myDate);
    }

    function ExpirationDateFormatOne(changeDate) {
      expirationDateOne = changeDate;
      const yearOne = expirationDateOne.substring(0, 4);
      const monthOne = parseInt(expirationDateOne.substring(4, 6)) - 1;
      const monthsOne = [
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
      const dayOne = expirationDateOne.substring(6, 8);
      expirationDateOne = dayOne + "-" + monthsOne[monthOne] + "-" + yearOne;
      expirationDateHI.push(expirationDateOne);
    }
    // formo i dati in array da mandare poi per Hong In AGR & CAT

    const dataHICAT = {
      lotNumberHI: lotNumberHI,
      filenamesHI: shipLotNumberHI,
      expiryDateHI: expirationDateHI,
      manDateHI: manufacturingDateHI,
      progressivoHI: shNumberHICAT,
      HIH2value: H2valueHI,
      HIO2Arvalue: O2ArvalueHI,
      HIN2value: N2valueHI,
      HICH4value: CH4valueHI,
      HICOvalue: COvalueHI,
      HICO2value: CO2valueHI,
      HIH2Ovalue: H2OvalueHI,
      HIFevalue: FevalueHI,
      HIAlvalue: AlvalueHI,
      HISbvalue: SbvalueHI,
      HIAsvalue: AsvalueHI,
      HIBivalue: BivalueHI,
      HIBvalue: BvalueHI,
      HICdvalue: CdvalueHI,
      HICrvalue: CrvalueHI,
      HICovalue: CovalueHI,
      HICuvalue: CuvalueHI,
      HIPbvalue: PbvalueHI,
      HIMovalue: MovalueHI,
      HINivalue: NivalueHI,
      HIPvalue: PvalueHI,
      HINavalue: NavalueHI,
    };
    console.log("dataHICAT", dataHICAT);

    const HICAToptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataHICAT),
    };
    const myresponseHI = await fetch("/apifive", HICAToptions);
    var myjsonHI = await myresponseHI.json();
    console.log(myjsonHI);
  }
}

//---------------END HONG IN CATANIA ----------------

// ---------------- WACKER ----------------------
function WackerHClAGR() {
  var receivingPlant = "Agrate";
  var nameSpace = "3GASC250_DM00608712_06.xsd";
  var partNumber = "3GASC250";
  var materialSpec = "DM00608712_06";
  var revisionSpec = "3.0";
  WackerHCl(receivingPlant, nameSpace, partNumber, materialSpec, revisionSpec);
}
function WackerHClCAT() {
  var receivingPlant = "Catania";
  var nameSpace = "3GASCC80_DM00470688_06.xsd";
  var partNumber = "3GASCC80";
  var materialSpec = "DM00470688_06";
  var revisionSpec = "2.0";
  WackerHCl(receivingPlant, nameSpace, partNumber, materialSpec, revisionSpec);
}
function WackerHCl(
  receivingPlant,
  nameSpace,
  partNumber,
  materialSpec,
  revisionSpec
) {
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("supplierWacker").style.display = "inline";
  document.getElementById("modalCS").style.display = "none";
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
      shipmentNumberW = "IT/000" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 10 && dataTest < 100) {
      shipmentNumberW = "IT/00" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 100 && dataTest < 1000) {
      shipmentNumberW = "IT/0" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 1000) {
      shipmentNumberW = "IT/" + dataTest.toString() + "/" + anno;
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

    var manWacker = data[20][7];
    manWacker = manWacker.replaceAll(".", "-");
    const monthMan = parseInt(manWacker.substring(3, 5)) - 1;
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
    manWacker =
      manWacker.substring(0, 3) +
      monthNameMan[monthMan] +
      manWacker.substring(5, 10);

    var expWacker = data[20][9];
    expWacker = expWacker.replaceAll(".", "-");
    const monthExpiry = parseInt(expWacker.substring(3, 5)) - 1;
    const monthNameExpiry = [
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
    expWacker =
      expWacker.substring(0, 3) +
      monthNameExpiry[monthExpiry] +
      expWacker.substring(5, 10);

    var shipDateW = data[7][0];
    shipDateW = shipDateW.replaceAll(".", "-");
    const month = parseInt(shipDateW.substring(3, 5)) - 1;
    const monthName = [
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
    shipDateW =
      shipDateW.substring(0, 3) + monthName[month] + shipDateW.substring(5, 10);
    var lotNumber = data[20][3];
    var N2valueW = data[26][3];
    N2valueW = N2valueW.replace("< ", "");
    N2valueW = N2valueW.replace(",", ".");
    var O2ArvalueW = data[27][3];
    O2ArvalueW = O2ArvalueW.replace("< ", "");
    O2ArvalueW = O2ArvalueW.replace(",", ".");
    var CO2valueW = data[28][3];
    CO2valueW = CO2valueW.replace("< ", "");
    CO2valueW = CO2valueW.replace(",", ".");
    var COvalueW = data[29][3];
    COvalueW = COvalueW.replace("< ", "");
    COvalueW = COvalueW.replace(",", ".");
    var CH4valueW = data[30][3];
    CH4valueW = CH4valueW.replace("< ", "");
    CH4valueW = CH4valueW.replace(",", ".");
    var H2valueW = data[31][3];
    H2valueW = H2valueW.replace("< ", "");
    H2valueW = H2valueW.replace(",", ".");
    var H2OvalueW = data[32][3];
    H2OvalueW = H2OvalueW.replace("< ", "");
    H2OvalueW = H2OvalueW.replace(",", ".");
    var FevalueW = data[33][3];
    FevalueW = FevalueW.replace("< ", "");
    FevalueW = FevalueW.replace(",", ".");

    var wackerData = {
      receivingPlant: receivingPlant,
      nameSpace: nameSpace,
      partNumber: partNumber,
      materialSpec: materialSpec,
      revisionSpec: revisionSpec,
      shipmentNumber: shipmentNumberW,
      shipmentdate: shipDateW,
      lotNumber: lotNumber,
      expiryDate: expWacker,
      manDate: manWacker,
      N2value: N2valueW,
      O2Arvalue: O2ArvalueW,
      CO2value: CO2valueW,
      COvalue: COvalueW,
      CH4value: CH4valueW,
      H2value: H2OvalueW,
      H2Ovalue: H2OvalueW,
      Fevalue: FevalueW,
    };
    //console.log("manDate", wackerData);

    // posto i dati per compilare file xlm

    const woptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wackerData),
    };
    const myresponsew = await fetch("/apitwo", woptions);
    var myjsonw = await myresponsew.json();
    //console.log(myjsonw);
  }
}
//---------------- END WACKER ----------------------

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
  document.getElementById("supplierWacker").style.display = "inline";
  document.getElementById("modalCS").style.display = "none";
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

// ---------------- CHLORGAS ----------------------
function ChlorgasStart() {
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("instructions").style.display = "none";
  //document.getElementById("modalHI").style.display = "none";
  document.getElementById("modalCS").style.display = "none";
  document.getElementById("qtyinputCS").style.display = "inline";
}

function ChlorgasLines() {
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  var coaLinesCS = document.getElementById("CoaLinesCS").value;
  document.getElementById("qtyPagesCS").style.display = "inline";
  document.getElementById("qtyPagesCS").innerHTML =
    "eCOA Chlorgas lines =" + coaLinesCS.toString();
  ChlorgasPdftoTxt(coaLinesCS);
}
function ChlorgasPdftoTxt(coaCS) {
  ReadCSText();
  async function ReadCSText() {
    const res = await fetch("/txt");
    var dataText = await res.text();
    dataText = dataText.replace(/[\r\n]+/g, "\n\n");
    //Counter per shipment Number progressivo
    for (let index = 0; index < coaCS; index++) {
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
    //console.log("progressivo", shNumberCS);

    //creo matrice di dataText - tutti gli elementi
    for (let index = 0; index < dataText.length; index++) {
      var element = dataText[index];
      testMatrixCS1.push(element);
    }
    const test3 = testMatrixCS1.join("");

    // creo matrice .match con i contenuti della matrice sopra
    testMatrixCS2 = test3.match(/.{1,20}/g);
    //console.log(testMatrixCS2);

    //qualche volta è una o l'altra nel file text, allora verifico se esiste 'Nr.' o no
    if (testMatrixCS2.indexOf("Nr.") === -1) {
      for (let index = 0; index < testMatrixCS2.length; index++) {
        if (testMatrixCS2[index] === "Behälter-") {
          for (let i = 1; i < parseInt(coaCS) + 1; i++) {
            shipmentLotNumberCS.push(testMatrixCS2[index + i]);
          }
        }
      }
    }
    if (testMatrixCS2.indexOf("Nr.") != -1) {
      for (let index = 0; index < testMatrixCS2.length; index++) {
        if (testMatrixCS2[index] === "Nr.") {
          for (let i = 1; i < parseInt(coaCS) + 1; i++) {
            shipmentLotNumberCS.push(testMatrixCS2[index + i]);
          }
        }
      }
    }
    for (let index = 0; index < testMatrixCS2.length; index++) {
      if (testMatrixCS2[index] === "Datum") {
        for (let i = 1; i < parseInt(coaCS) + 1; i++) {
          mfgDateCS.push(testMatrixCS2[index + i]);
        }
      }
    }
    mfgMonthChange(mfgDateCS);

    //cambio format mese per CS
    function mfgMonthChange(monthChangeFormat) {
      for (let index = 0; index < coaCS; index++) {
        monthChangeFormat[index] = monthChangeFormat[index].replaceAll(
          ".",
          "-"
        );
        const monthMan = parseInt(monthChangeFormat[index].substring(3, 5)) - 1;
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
        monthChangeFormat[index] = monthChangeFormat[index].replace(
          monthChangeFormat[index].substring(3, 5),
          monthNameMan[monthMan]
        );
        monthChangeFormat[index] = monthChangeFormat[index].substring(0, 7);
        const Anno = "2021";
        const expAnno = "2023";
        expDateCS[index] = monthChangeFormat[index] + expAnno;
        monthChangeFormat[index] = monthChangeFormat[index] + Anno;
      }
    }

    const dataCS = {
      shipment: mfgDateCS,
      lotNumber: shipmentLotNumberCS,
      expiryDate: expDateCS,
      manDate: mfgDateCS,
      progressivoCS: shNumberCS,
      filetext: shipmentLotNumberCS,
    };

    //console.log("dataCS", dataCS);

    const CSoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataCS),
    };
    const myresponseCS = await fetch("/apithree", CSoptions);
    var myjsonCS = await myresponseCS.json();
    console.log(myjsonCS);
  }
}
// ---------------- END CHLORGAS ----------------------

// ---------------- NITRIC OXIDE TAVLOV --------------

function NitricOxideTavlov() {
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  ReadNOText();
  async function ReadNOText() {
    let arrayNOTavlov = [],
      pageNumbers = [],
      productionDates1 = [],
      productionDates2 = [],
      productionDates3 = [],
      deliveryDates1 = [],
      deliveryDates2 = [],
      deliveryDates3 = [],
      drumNumbers1 = [],
      drumNumbers2 = [],
      drumNumbers3 = [],
      drumQuantities = [],
      expiryDate = [],
      shNumberNOT = [],
      N2parameters1 = [],
      N2parameters2 = [],
      N2parameters3 = [],
      N2Oparameters1 = [],
      N2Oparameters2 = [],
      N2Oparameters3 = [],
      H2Oparameters1 = [],
      H2Oparameters2 = [],
      H2Oparameters3 = [],
      finalDrums = [],
      finalProdDate = [],
      finalDelDate = [],
      finalN2 = [],
      finalN2O = [],
      finalH2O = [],
      NODrums = [],
      drumA,
      drumB,
      drumC,
      prodDateA,
      prodDateB,
      delDateA,
      delDateB,
      N2parA,
      N2parB,
      N2OparA,
      N2OparB,
      H2OparA,
      H2OparB,
      myDrums;

    const res = await fetch("/txt");
    var dataText = await res.text();
    arrayNOTavlov = dataText.split("\n");
    //console.log("array", arrayNOTavlov);

    // formo prima gli indici del numero pagine
    for (let i = 0; i < arrayNOTavlov.length; i++) {
      if (arrayNOTavlov[i].indexOf("Page") != -1) {
        pageNumbers.push(i);
      }
    }

    try {
      var element1 = pageNumbers[0] + 48;
      var element2 = pageNumbers[1] + 48;
      var element3 = pageNumbers[2] + 48;
    } catch (error) {}

    //------------- PAGINA 1 -------------
    for (let i = 0; i < element1; i++) {
      if (arrayNOTavlov[i].indexOf("Includes") != -1) {
        drumNumbers1.push(arrayNOTavlov[i + 1]);
      }
      if (arrayNOTavlov[i].indexOf("Production date(s)") != -1) {
        productionDates1.push(arrayNOTavlov[i + 8]);
      }
      if (arrayNOTavlov[i].indexOf("Date") != -1) {
        deliveryDates1.push(arrayNOTavlov[i]);
      }
      if (arrayNOTavlov[i].indexOf("filling") != -1) {
        N2parameters1.push(arrayNOTavlov[i + 2]);
        N2Oparameters1.push(arrayNOTavlov[i + 3]);
        H2Oparameters1.push(arrayNOTavlov[i + 4]);
      }
    }

    drumA = drumNumbers1.toString().split(";");
    for (let i = 0; i < drumA.length - 1; i++) {
      productionDates1.push(productionDates1[i]);
      deliveryDates1.push(deliveryDates1[i]);
      N2parameters1.push(N2parameters1[i]);
      N2Oparameters1.push(N2Oparameters1[i]);
      H2Oparameters1.push(H2Oparameters1[i]);
    }

    for (let i = 0; i < drumA.length; i++) {
      drumA[i] = drumA[i].replace("Bundle Id's: ", "");
      drumA[i] = drumA[i].replace(/[\n\r]/g, "");
      productionDates1[i] = productionDates1[i].replace(/[\n\r]/g, "");
      deliveryDates1[i] = deliveryDates1[i].replace("Date: ", "");
      deliveryDates1[i] = deliveryDates1[i].replace(/[\n\r]/g, "");
      N2parameters1[i] = N2parameters1[i].replace(/[\n\r]/g, "");
      N2Oparameters1[i] = N2Oparameters1[i].replace(/[\n\r]/g, "");
      H2Oparameters1[i] = H2Oparameters1[i].replace(/[\n\r]/g, "");
    }

    //------------- PAGINA 2 -------------
    if (isNaN(element2)) {
      element2 = 0;
    }

    if (element2 != 0) {
      for (let i = element1; i < element2; i++) {
        if (arrayNOTavlov[i].indexOf("Includes") != -1) {
          drumNumbers2.push(arrayNOTavlov[i + 1]);
        }
        if (arrayNOTavlov[i].indexOf("Production date(s)") != -1) {
          productionDates2.push(arrayNOTavlov[i + 8]);
        }
        if (arrayNOTavlov[i].indexOf("Date") != -1) {
          deliveryDates2.push(arrayNOTavlov[i]);
        }
        if (arrayNOTavlov[i].indexOf("filling") != -1) {
          N2parameters2.push(arrayNOTavlov[i + 2]);
          N2Oparameters2.push(arrayNOTavlov[i + 3]);
          H2Oparameters2.push(arrayNOTavlov[i + 4]);
        }
      }
      drumB = drumNumbers2.toString().split(";");
      for (let i = 0; i < drumB.length - 1; i++) {
        productionDates2.push(productionDates2[i]);
        deliveryDates2.push(deliveryDates2[i]);
        N2parameters2.push(N2parameters2[i]);
        N2Oparameters2.push(N2Oparameters2[i]);
        H2Oparameters2.push(H2Oparameters2[i]);
      }

      for (let i = 0; i < drumB.length; i++) {
        drumB[i] = drumB[i].replace("Bundle Id's: ", "");
        drumB[i] = drumB[i].replace(/[\n\r]/g, "");
        productionDates2[i] = productionDates2[i].replace(/[\n\r]/g, "");
        deliveryDates2[i] = deliveryDates2[i].replace("Date: ", "");
        deliveryDates2[i] = deliveryDates2[i].replace(/[\n\r]/g, "");
        N2parameters2[i] = N2parameters2[i].replace(/[\n\r]/g, "");
        N2Oparameters2[i] = N2Oparameters2[i].replace(/[\n\r]/g, "");
        H2Oparameters2[i] = H2Oparameters2[i].replace(/[\n\r]/g, "");
      }
      prodDateA = productionDates1.concat(productionDates2);
      delDateA = deliveryDates1.concat(deliveryDates2);
      N2parA = N2Oparameters1.concat(N2Oparameters2);
      N2OparA = N2Oparameters1.concat(N2Oparameters2);
      H2OparA = H2Oparameters1.concat(H2Oparameters2);
    }

    //------------- PAGINA 3 -------------

    if (isNaN(element3)) {
      element3 = 0;
    }
    if (element3 != 0) {
      console.log("non dovrei essere qui");
      for (let i = element2; i < element3; i++) {
        if (arrayNOTavlov[i].indexOf("Includes") != -1) {
          drumNumbers3.push(arrayNOTavlov[i + 1]);
        }
        if (arrayNOTavlov[i].indexOf("Production date(s)") != -1) {
          productionDates3.push(arrayNOTavlov[i + 8]);
        }
        if (arrayNOTavlov[i].indexOf("Date") != -1) {
          deliveryDates3.push(arrayNOTavlov[i]);
        }
        if (arrayNOTavlov[i].indexOf("filling") != -1) {
          N2parameters3.push(arrayNOTavlov[i + 2]);
          N2Oparameters3.push(arrayNOTavlov[i + 3]);
          H2Oparameters3.push(arrayNOTavlov[i + 4]);
        }
      }
      drumC = drumNumbers3.toString().split(";");
      for (let i = 0; i < drumC.length - 1; i++) {
        productionDates3.push(productionDates3[i]);
        deliveryDates3.push(deliveryDates3[i]);
        N2parameters3.push(N2parameters3[i]);
        N2Oparameters3.push(N2Oparameters3[i]);
        H2Oparameters3.push(H2Oparameters3[i]);
      }

      for (let i = 0; i < drumC.length; i++) {
        drumC[i] = drumC[i].replace("Bundle Id's: ", "");
        drumC[i] = drumC[i].replace(/[\n\r]/g, "");
        productionDates3[i] = productionDates3[i].replace(/[\n\r]/g, "");
        deliveryDates3[i] = deliveryDates3[i].replace("Date: ", "");
        deliveryDates3[i] = deliveryDates3[i].replace(/[\n\r]/g, "");
        N2parameters3[i] = N2parameters3[i].replace(/[\n\r]/g, "");
        N2Oparameters3[i] = N2Oparameters3[i].replace(/[\n\r]/g, "");
        H2Oparameters3[i] = H2Oparameters3[i].replace(/[\n\r]/g, "");
      }
      prodDateB = prodDateA.concat(productionDates3);
      delDateB = delDateA.concat(deliveryDates3);
      N2parB = N2OparA.concat(N2Oparameters3);
      N2OparB = N2OparA.concat(N2Oparameters3);
      H2OparB = H2OparA.concat(H2Oparameters3);
    }

    if (drumB != undefined) {
      myDrums = drumA.toString() + "," + drumB.toString();
      finalDrums = myDrums.split(",");
      finalDelDate = delDateA;
      finalProdDate = prodDateA;
      finalN2 = N2parA;
      finalN2O = N2OparA;
      finalH2O = H2OparA;
    }

    if (drumC != undefined) {
      myDrums =
        drumA.toString() + "," + drumB.toString() + "," + drumC.toString();
      finalDrums = myDrums.split(",");
      finalDelDate = delDateB;
      finalProdDate = prodDateB;
      finalN2 = N2parB;
      finalN2O = N2OparB;
      finalH2O = H2OparB;
    }

    // Cambio formato dei mesi di production date, expiry date and delivery dates
    for (let index = 0; index < finalDrums.length; index++) {
      expiryDate[index] = finalDelDate[index];
      expiryDate[index] = expiryDate[index].replaceAll(".", "-");
      //deliveryDates[index] = deliveryDates[index].replace("Date: ", "");
      finalDelDate[index] = finalDelDate[index].replaceAll(".", "-");
      var monthExp = parseInt(finalProdDate[index].substring(3, 5)) + 5;
      finalProdDate[index] = finalProdDate[index].replaceAll(".", "-");
      const monthMan = parseInt(finalProdDate[index].substring(3, 5)) - 1;
      const monthDel = parseInt(finalDelDate[index].substring(3, 5)) - 1;
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

      var yearExp = parseInt(finalDelDate[index].substring(6, 10));
      if (monthExp <= 12) {
        expiryDate[index] =
          finalProdDate[index].substring(0, 3) +
          monthNameMan[monthExp] +
          finalProdDate[index].substring(5, 11);
      }
      if (monthExp > 12) {
        monthExp = monthExp - 12;
        yearExp = yearExp + 1;
        expiryDate[index] =
          finalProdDate[index].substring(0, 3) +
          monthNameMan[monthExp] +
          "-" +
          yearExp;
      }

      finalProdDate[index] =
        finalProdDate[index].substring(0, 3) +
        monthNameMan[monthMan] +
        finalProdDate[index].substring(5, 11);

      finalDelDate[index] =
        finalDelDate[index].substring(0, 3) +
        monthNameMan[monthDel] +
        finalDelDate[index].substring(5, 11);
    }

    //Counter per shipment Number progressivo
    for (let index = 0; index < finalDrums.length; index++) {
      const testResponse = await fetch("/apicounter");
      var dataTest = await testResponse.text();
      //console.log("dataTest1", dataTest);
      dataTest = parseInt(dataTest);
      dataTest++;
      var dt = new Date();
      var anno = dt.getFullYear().toString();
      anno = anno.substring(2, 4);
      if (dataTest < 10) {
        shipmentNumberNOT = "IT/000" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 10 && dataTest < 100) {
        shipmentNumberNOT = "IT/00" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 100 && dataTest < 1000) {
        shipmentNumberNOT = "IT/0" + dataTest.toString() + "/" + anno;
      }
      if (dataTest >= 1000) {
        shipmentNumberNOT = "IT/" + dataTest.toString() + "/" + anno;
      }
      if (dataTest > 10000) {
        alert("reset counter.txt file");
      }
      shNumberNOT.push(shipmentNumberNOT);

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
    //console.log("progressivo", shNumberNOT);

    const dataNOT = {
      shipment: finalDelDate,
      lotNumber: finalDrums,
      expiryDate: expiryDate,
      manDate: finalProdDate,
      progressivo: shNumberNOT,
      filetext: finalDrums,
      N2parameters: finalN2,
      N2Oparameters: finalN2O,
      H2Oparameters: finalH2O,
    };

    //console.log("dataNOT", dataNOT);

    const NOToptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataNOT),
    };
    const myresponseNOT = await fetch("/NOTavlov", NOToptions);
    var myjsonNOT = await myresponseNOT.json();
    console.log(myjsonNOT);
  }
}

// ---------------- NITRIC OXIDE TAVLOV --------------

// ---------------- HF GERLING HOLZ -----------------

function HFGH() {
  document.getElementById("dataHF").style.display = "inline";
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("modalCS").style.display = "none";
}
async function miadataHF() {
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  var manDataHF = document.getElementById("start").value;
  //console.log("manuf. Date", manDataHF);

  let H2SiF6array = [],
    SO2array = [],
    H2SO4array = [],
    H2Oarray = [],
    arrayCasual = [];

  H2SiF6array = [
    6.8, 5.6, 8.8, 6, 7.6, 9.6, 5.6, 7.2, 7.6, 8.8, 7.2, 6.4, 5.6, 6, 9.2, 6, 6,
    9.6, 7.6, 5.2, 7.2, 9.6, 6, 10.4, 9.6, 6.8, 7.2, 9.2, 6, 7.6, 10, 8, 7.6, 6,
    9.6, 6, 6.8, 7.6, 8.8, 6.8, 10, 7.6, 7.6, 6.4, 9.2, 6.8, 9.6, 8.4, 7.6,
    10.4, 8.8, 5.6, 5.6, 7.2, 9.6, 7.2, 6,
  ];
  SO2array = [
    6, 4, 3.5, 3, 3, 4, 4.5, 2.5, 3, 6, 4, 2.5, 3, 3.5, 6, 4, 2.5, 3.5, 2.5,
    3.5, 3, 4.5, 6, 4.5, 3.5, 4.5, 6, 3.5, 2.5, 2.5, 3.5, 4, 6.5, 5.5, 3.5, 2.5,
    6, 3.5, 4.5, 5, 4.5, 2.5, 4, 5.5, 4.5, 3.5, 5, 6.5, 4.5, 3.5, 2.5, 3, 4.5,
    3.5, 3, 6.5, 5,
  ];
  (H2SO4array = [
    61.25, 41.25, 35, 23.75, 32.5, 38.75, 46.25, 18.75, 26.25, 60, 42.5, 20,
    31.25, 33.75, 61.25, 40, 23.75, 35, 21.25, 35, 27.5, 45, 57.5, 47.5, 26.25,
    48.75, 58.75, 31.25, 22.5, 18.75, 36.25, 42.5, 65, 53.75, 30, 21.25, 61.25,
    27.5, 43.75, 51.25, 43.75, 23.75, 41.25, 57.5, 47.5, 32.5, 48.75, 65, 43.75,
    32.5, 20, 27.5, 47.5, 35, 26.25, 63.75, 50,
  ]),
    (H2Oarray = [
      27, 30.6, 44.2, 26.4, 25.6, 43, 23.4, 28.2, 42.4, 36.2, 23, 30.4, 35,
      39.8, 42, 37.2, 20.4, 36, 40, 29.8, 44.2, 34.8, 25, 37, 45, 38.6, 25.8,
      43, 44.6, 41.6, 37.2, 21, 24.4, 30.4, 21.6, 44.2, 20, 25.8, 39.6, 42.2,
      35.2, 24.6, 31.2, 42.4, 28.6, 24, 45.2, 36.2, 40.4, 49.6, 34, 24.4, 36.4,
      41.2, 38.4, 35.6, 29,
    ]);

  for (let index = 0; index < 4; index++) {
    const random = Math.floor(Math.random() * 57);
    arrayCasual.push(random);
  }

  const H2SiF6 = H2SiF6array[arrayCasual[0]];
  const SO2 = SO2array[arrayCasual[1]];
  const H2SO4 = H2SO4array[arrayCasual[2]];
  const H2O = H2Oarray[arrayCasual[3]];
  let shipmentNumberHFGH;

  //console.log("H2SiF6:", H2SiF6, "SO2:", SO2, "H2SO4:", H2SO4, "H2O:", H2O);

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

  //console.log("ship #", shipmentNumberHFGH);
  datacounter = { dataTest };
  const optionCounter = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datacounter),
  };
  const myresponse = await fetch("/newcounter", optionCounter);
  var myjsonHF = await myresponse.text();
  //console.log("myJson", myjsonHF);

  const monthMan = parseInt(manDataHF.substring(5, 7)) - 1;
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
  manDataHF =
    manDataHF.substring(8, 11) +
    "-" +
    monthNameMan[monthMan] +
    "-" +
    manDataHF.substring(0, 4);

  var expDataHF = parseInt(manDataHF.substring(7, 11)) + 1;
  expDataHF =
    manDataHF.substring(0, 2) + "-" + monthNameMan[monthMan] + "-" + expDataHF;

  var HFGerlingData = {
    shipmentNumber: shipmentNumberHFGH,
    shipmentdate: manDataHF,
    lotNumber: shipmentNumberHFGH,
    expiryDate: expDataHF,
    manDate: manDataHF,
    H2SiF6value: H2SiF6,
    SO2value: SO2,
    H2SO4value: H2SO4,
    H2Ovalue: H2O,
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
// ---------------- END HF GERLING HOLZ -----------------

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
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("modalCS").style.display = "none";
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

    var manC4F8 = data[21][1];
    var expC4F8 = data[22][1];
    var shipDateC4F8 = manC4F8;
    var lotNumberC4F8 = data[26][1];
    var acidityC4F8 = data[4][2];
    acidityC4F8 = acidityC4F8
      .replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
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
      shipmentdate: shipDateC4F8,
      lotNumber: lotNumberC4F8,
      expiryDate: expC4F8,
      manDate: manC4F8,
      acidityvalue: acidityC4F8,
      H2Ovalue: H2OvalueC4F8,
      N2O2value: N2O2valueC4F8,
      CFCvalue: CFCvalueC4F8,
    };
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

//---------------- CF4 TETRAFLUOROMETHANE ----------------------
function CF4() {
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("modalCS").style.display = "none";
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
    var shipDateCF4 = manCF4;
    var lotNumberCF4 = data[13][2];
    var percentCF4 = data[3][4];
    var N2valueCF4 = data[6][6];
    var O2ArvalueCF4 = data[7][10];
    var CH4valueCF4 = data[10][11];
    var H2OvalueCF4 = data[7][11];
    var CO2valueCF4 = data[10][10];
    var COvalueCF4 = data[9][10];
    var SF6valueCF4 = data[11][10];

    var CF4Data = {
      shipmentNumber: shipmentNumberCF4,
      shipmentdate: shipDateCF4,
      lotNumber: lotNumberCF4,
      expiryDate: expCF4,
      manDate: manCF4,
      HCvalue: percentCF4,
      N2value: N2valueCF4,
      O2Arvalue: O2ArvalueCF4,
      CH4value: CH4valueCF4,
      H2Ovalue: H2OvalueCF4,
      CO2value: CO2valueCF4,
      COvalue: COvalueCF4,
      SF6value: SF6valueCF4,
    };
    //console.log("all data", CF4Data);

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

//---------------- F2KrNe 3GASC948 AGR + CAT ----------------------
function F2KrNeAGR() {
  var receivingPlant = "Agrate";
  F2KrNe(receivingPlant);
}
function F2KrNeCAT() {
  var receivingPlant = "Catania";
  F2KrNe(receivingPlant);
}
function F2KrNe(receivingPlant) {
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("modalCS").style.display = "none";
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
      shipmentNumberF2KrNe = "IT/000" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 10 && dataTest < 100) {
      shipmentNumberF2KrNe = "IT/00" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 100 && dataTest < 1000) {
      shipmentNumberF2KrNe = "IT/0" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 1000) {
      shipmentNumberF2KrNe = "IT/" + dataTest.toString() + "/" + anno;
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

    var manF2KrNe = data[33][1];
    var expF2KrNe = data[34][1];
    var shipDateF2KrNe = manF2KrNe;
    var lotNumberF2KrNe = data[38][1];
    var F2Assay = data[2][4];
    F2Assay = F2Assay.replace("%", "");
    F2Assay = F2Assay.trim();
    var CO2valueF2KrNe = data[16][2];
    CO2valueF2KrNe = CO2valueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    CO2valueF2KrNe = CO2valueF2KrNe.trim();
    var COvalueF2KrNe = data[9][2];
    COvalueF2KrNe = COvalueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    COvalueF2KrNe = COvalueF2KrNe.trim();
    var SF6valueF2KrNe = data[13][2];
    SF6valueF2KrNe = SF6valueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    SF6valueF2KrNe = SF6valueF2KrNe.trim();
    var XevalueF2KrNe = data[14][2];
    XevalueF2KrNe = XevalueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    XevalueF2KrNe = XevalueF2KrNe.trim();
    var SiF4valueF2KrNe = data[20][2];
    SiF4valueF2KrNe = SiF4valueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    SiF4valueF2KrNe = SiF4valueF2KrNe.trim();
    var O2valueF2KrNe = data[19][2];
    O2valueF2KrNe = O2valueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    O2valueF2KrNe = O2valueF2KrNe.trim();
    var CH4valueF2KrNe = data[15][2];
    CH4valueF2KrNe = CH4valueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    CH4valueF2KrNe = CH4valueF2KrNe.trim();
    var MoistureAsHFvalueF2KrNe = data[11][2];
    MoistureAsHFvalueF2KrNe = MoistureAsHFvalueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    MoistureAsHFvalueF2KrNe = MoistureAsHFvalueF2KrNe.trim();
    var NF3valueF2KrNe = data[12][2];
    NF3valueF2KrNe = NF3valueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    NF3valueF2KrNe = NF3valueF2KrNe.trim();
    var KrAssay = data[3][4];
    KrAssay = KrAssay.replace("%", "");
    KrAssay = KrAssay.trim();
    var N2valueF2KrNe = data[18][2];
    N2valueF2KrNe = N2valueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    N2valueF2KrNe = N2valueF2KrNe.trim();
    var HevalueF2KrNe = data[17][2];
    HevalueF2KrNe = HevalueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    HevalueF2KrNe = HevalueF2KrNe.trim();
    var COF2valueF2KrNe = data[10][2];
    COF2valueF2KrNe = COF2valueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    COF2valueF2KrNe = COF2valueF2KrNe.trim();
    var CF4valueF2KrNe = data[8][2];
    CF4valueF2KrNe = CF4valueF2KrNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    CF4valueF2KrNe = CF4valueF2KrNe.trim();

    var F2KrNeData = {
      receivingPlant: receivingPlant,
      shipmentNumber: shipmentNumberF2KrNe,
      shipmentdate: shipDateF2KrNe,
      lotNumber: lotNumberF2KrNe,
      expiryDate: expF2KrNe,
      manDate: manF2KrNe,
      F2percentvalue: F2Assay,
      CO2value: CO2valueF2KrNe,
      COvalue: COvalueF2KrNe,
      SF6value: SF6valueF2KrNe,
      Xevalue: XevalueF2KrNe,
      SiF4value: SiF4valueF2KrNe,
      O2value: O2valueF2KrNe,
      CH4value: CH4valueF2KrNe,
      MoistureAsHFvalue: MoistureAsHFvalueF2KrNe,
      NF3value: NF3valueF2KrNe,
      Krpercentvalue: KrAssay,
      N2value: N2valueF2KrNe,
      Hevalue: HevalueF2KrNe,
      COF2value: COF2valueF2KrNe,
      CF4value: CF4valueF2KrNe,
    };
    //console.log("all data", F2KrNeData);

    // posto i dati per compilare file xlm

    const F2KrNeoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(F2KrNeData),
    };
    const myresponseF2KrNe = await fetch("/apiF2KrNe", F2KrNeoptions);
    var myjsonF2KrNe = await myresponseF2KrNe.json();
    // //console.log(myjsonF2KrNe);
  }
}
//---------------- END F2KrNe 3GASC948 AGR + CAT ----------------------

//---------------- F2ArNe 3GASC949 AGR ----------------------

function F2ArNe() {
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("modalCS").style.display = "none";
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
      shipmentNumberF2ArNe = "IT/000" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 10 && dataTest < 100) {
      shipmentNumberF2ArNe = "IT/00" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 100 && dataTest < 1000) {
      shipmentNumberF2ArNe = "IT/0" + dataTest.toString() + "/" + anno;
    }
    if (dataTest >= 1000) {
      shipmentNumberF2ArNe = "IT/" + dataTest.toString() + "/" + anno;
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

    var manF2ArNe = data[33][1];
    var expF2ArNe = data[34][1];
    var shipDateF2ArNe = manF2ArNe;
    var lotNumberF2ArNe = data[38][1];
    var F2Assay = data[2][4];
    F2Assay = F2Assay.replace("%", "");
    F2Assay = F2Assay.trim();
    var CO2valueF2ArNe = data[12][2];
    CO2valueF2ArNe = CO2valueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    CO2valueF2ArNe = CO2valueF2ArNe.trim();
    var COvalueF2ArNe = data[11][2];
    COvalueF2ArNe = COvalueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    COvalueF2ArNe = COvalueF2ArNe.trim();
    var SF6valueF2ArNe = data[19][2];
    SF6valueF2ArNe = SF6valueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    SF6valueF2ArNe = SF6valueF2ArNe.trim();
    var XevalueF2ArNe = data[8][2];
    XevalueF2ArNe = XevalueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    XevalueF2ArNe = XevalueF2ArNe.trim();
    var O2valueF2ArNe = data[18][2];
    O2valueF2ArNe = O2valueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    O2valueF2ArNe = O2valueF2ArNe.trim();
    var MoistureAsHFvalueF2ArNe = data[15][2];
    MoistureAsHFvalueF2ArNe = MoistureAsHFvalueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    MoistureAsHFvalueF2ArNe = MoistureAsHFvalueF2ArNe.trim();
    var NF3valueF2ArNe = data[17][2];
    NF3valueF2ArNe = NF3valueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    NF3valueF2ArNe = NF3valueF2ArNe.trim();
    var CF4valueF2ArNe = data[9][2];
    CF4valueF2ArNe = CF4valueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    CF4valueF2ArNe = CF4valueF2ArNe.trim();
    var N2valueF2ArNe = data[16][2];
    N2valueF2ArNe = N2valueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    N2valueF2ArNe = N2valueF2ArNe.trim();
    var ArAssay = data[3][4];
    ArAssay = ArAssay.replace("%", "");
    ArAssay = ArAssay.trim();
    var THCvalueF2ArNe = data[10][2];
    THCvalueF2ArNe = THCvalueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    THCvalueF2ArNe = THCvalueF2ArNe.trim();
    var HevalueF2ArNe = data[14][2];
    HevalueF2ArNe = HevalueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    HevalueF2ArNe = HevalueF2ArNe.trim();
    var COF2valueF2ArNe = data[13][2];
    COF2valueF2ArNe = COF2valueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    COF2valueF2ArNe = COF2valueF2ArNe.trim();
    var SiF4valueF2ArNe = data[20][2];
    SiF4valueF2ArNe = SiF4valueF2ArNe.replace("<", "")
      .replace("ppm", "")
      .replace("DL", "");
    SiF4valueF2ArNe = SiF4valueF2ArNe.trim();

    var F2ArNeData = {
      shipmentNumber: shipmentNumberF2ArNe,
      shipmentdate: shipDateF2ArNe,
      lotNumber: lotNumberF2ArNe,
      expiryDate: expF2ArNe,
      manDate: manF2ArNe,
      F2percentvalue: F2Assay,
      CO2value: CO2valueF2ArNe,
      COvalue: COvalueF2ArNe,
      SF6value: SF6valueF2ArNe,
      Xevalue: XevalueF2ArNe,
      SiF4value: SiF4valueF2ArNe,
      O2value: O2valueF2ArNe,
      THCvalue: THCvalueF2ArNe,
      MoistureAsHFvalue: MoistureAsHFvalueF2ArNe,
      NF3value: NF3valueF2ArNe,
      Arpercentvalue: ArAssay,
      N2value: N2valueF2ArNe,
      Hevalue: HevalueF2ArNe,
      COF2value: COF2valueF2ArNe,
      CF4value: CF4valueF2ArNe,
    };
    console.log("all data", F2ArNeData);

    // posto i dati per compilare file xlm

    const F2ArNeoptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(F2ArNeData),
    };
    const myresponseF2ArNe = await fetch("/apiF2ArNe", F2ArNeoptions);
    var myjsonF2ArNe = await myresponseF2ArNe.json();
    //console.log(myjsonF2ArNe);
  }
}
//---------------- F2ArNe 3GASC949 AGR ----------------------

//---------------- HBr CAT ----------------------

function HBr() {
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("modalCS").style.display = "none";
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
    manHBr = manHBr.replaceAll(".", "-");
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
    var shipDateHBr = manHBr;
    var yearExp = parseInt(manHBr.substring(7, 11));
    var monthExp = monthMan + 6;
    let expHBr;
    if (monthExp <= 12) {
      expHBr =
        manHBr.substring(0, 2) +
        "-" +
        monthNameMan[monthExp] +
        "-" +
        manHBr.substring(7, 11);
    }
    if (monthExp > 12) {
      monthExp = monthExp - 12;
      yearExp = yearExp + 1;
      expHBr =
        manHBr.substring(0, 2) + "-" + monthNameMan[monthExp] + "-" + yearExp;
    }
    var lotNumberHBr = data[17][1];

    var FevalueHBr = "0.8";
    var CO2valueHBr = "3.0";
    var COvalueHBr = "0.8";
    var HClvalueHBr = "500";
    var H2OvalueHBr = "0.8";
    var N2valueHBr = "1.5";
    var O2valueHBr = "0.8";
    var THCvalueHBr = "0.8";

    var HBrData = {
      shipmentNumber: shipmentNumberHBr,
      shipmentdate: shipDateHBr,
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
    const myresponseHBr = await fetch("/apiHBr", HBroptions);
    var myjsonHBr = await myresponseHBr.json();
    //console.log(myjsonHBr);
  }
}

//---------------- END HBr CAT ----------------------

// ---------------- HF Medford 1.8Kg - Bombola Piccola --------------

function HFSmall() {
  document.getElementById("dataHFSmall").style.display = "inline";
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("modalCS").style.display = "none";
}
async function miadataHFSmall() {
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  var manDataHFSmall = document.getElementById("startHFSmall").value;
  //console.log("manuf. Date", manDataHF);

  let H2SiF6array = [],
    SO2array = [],
    H2SO4array = [],
    H2Oarray = [],
    arrayCasual = [];

  H2SiF6array = [
    6.8, 5.6, 8.8, 6, 7.6, 9.6, 5.6, 7.2, 7.6, 8.8, 7.2, 6.4, 5.6, 6, 9.2, 6, 6,
    9.6, 7.6, 5.2, 7.2, 9.6, 6, 10.4, 9.6, 6.8, 7.2, 9.2, 6, 7.6, 10, 8, 7.6, 6,
    9.6, 6, 6.8, 7.6, 8.8, 6.8, 10, 7.6, 7.6, 6.4, 9.2, 6.8, 9.6, 8.4, 7.6,
    10.4, 8.8, 5.6, 5.6, 7.2, 9.6, 7.2, 6,
  ];
  SO2array = [
    6, 4, 3.5, 3, 3, 4, 4.5, 2.5, 3, 6, 4, 2.5, 3, 3.5, 6, 4, 2.5, 3.5, 2.5,
    3.5, 3, 4.5, 6, 4.5, 3.5, 4.5, 6, 3.5, 2.5, 2.5, 3.5, 4, 6.5, 5.5, 3.5, 2.5,
    6, 3.5, 4.5, 5, 4.5, 2.5, 4, 5.5, 4.5, 3.5, 5, 6.5, 4.5, 3.5, 2.5, 3, 4.5,
    3.5, 3, 6.5, 5,
  ];
  (H2SO4array = [
    61.25, 41.25, 35, 23.75, 32.5, 38.75, 46.25, 18.75, 26.25, 60, 42.5, 20,
    31.25, 33.75, 61.25, 40, 23.75, 35, 21.25, 35, 27.5, 45, 57.5, 47.5, 26.25,
    48.75, 58.75, 31.25, 22.5, 18.75, 36.25, 42.5, 65, 53.75, 30, 21.25, 61.25,
    27.5, 43.75, 51.25, 43.75, 23.75, 41.25, 57.5, 47.5, 32.5, 48.75, 65, 43.75,
    32.5, 20, 27.5, 47.5, 35, 26.25, 63.75, 50,
  ]),
    (H2Oarray = [
      27, 30.6, 44.2, 26.4, 25.6, 43, 23.4, 28.2, 42.4, 36.2, 23, 30.4, 35,
      39.8, 42, 37.2, 20.4, 36, 40, 29.8, 44.2, 34.8, 25, 37, 45, 38.6, 25.8,
      43, 44.6, 41.6, 37.2, 21, 24.4, 30.4, 21.6, 44.2, 20, 25.8, 39.6, 42.2,
      35.2, 24.6, 31.2, 42.4, 28.6, 24, 45.2, 36.2, 40.4, 49.6, 34, 24.4, 36.4,
      41.2, 38.4, 35.6, 29,
    ]);

  for (let index = 0; index < 4; index++) {
    const random = Math.floor(Math.random() * 57);
    arrayCasual.push(random);
  }

  const H2SiF6 = H2SiF6array[arrayCasual[0]];
  const SO2 = SO2array[arrayCasual[1]];
  const H2SO4 = H2SO4array[arrayCasual[2]];
  const H2O = H2Oarray[arrayCasual[3]];
  let shipmentNumberHFGH;

  //console.log("H2SiF6:", H2SiF6, "SO2:", SO2, "H2SO4:", H2SO4, "H2O:", H2O);

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

  //console.log("ship #", shipmentNumberHFGH);
  datacounter = { dataTest };
  const optionCounter = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datacounter),
  };
  const myresponse = await fetch("/newcounter", optionCounter);
  var myjsonHF = await myresponse.text();
  //console.log("myJson", myjsonHF);

  const monthMan = parseInt(manDataHFSmall.substring(5, 7)) - 1;
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
  manDataHFSmall =
    manDataHFSmall.substring(8, 11) +
    "-" +
    monthNameMan[monthMan] +
    "-" +
    manDataHFSmall.substring(0, 4);

  var expDataHF = parseInt(manDataHFSmall.substring(7, 11)) + 1;
  expDataHF =
    manDataHFSmall.substring(0, 2) +
    "-" +
    monthNameMan[monthMan] +
    "-" +
    expDataHF;

  var HFGerlingData = {
    shipmentNumber: shipmentNumberHFGH,
    shipmentdate: manDataHFSmall,
    lotNumber: shipmentNumberHFGH,
    expiryDate: expDataHF,
    manDate: manDataHFSmall,
    H2SiF6value: H2SiF6,
    SO2value: SO2,
    H2SO4value: H2SO4,
    H2Ovalue: H2O,
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

// ---------------- HF Medford 1.8Kg - Bombola Piccola --------------
