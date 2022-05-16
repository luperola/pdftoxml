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

      if (
        arraydataHI[index].substring(3, 13) === "Analytical" &&
        arraydataHI[index].substring(16, 23) === "Results"
      ) {
        arrayIndecesMetal.push(index);
      } else {
        alert("Hong In Agrate file troppo grande. Invia pdf a Luigi");
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

      if (
        arraydataHI[index].substring(3, 13) === "Analytical" &&
        arraydataHI[index].substring(16, 23) === "Results"
      ) {
        arrayIndecesMetal.push(index);
      } else {
        alert("Hong In Catania file troppo grande. Invia pdf a Luigi");
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

// //---------------END HONG IN CATANIA ----------------

// ---------------- WACKER ----------------------
let manWacker;
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
    try {
      if (data.length === 35) {
        manWacker = data[22][1];
        var regexManW = RegExp("[0-9]{2}[.][0-9]{2}[.][0-9]{4}", "g");
        if (!regexManW.test(manWacker)) {
          alert(
            "Formato 'Manufacturing date' non corretto. Devi correggere la data manualmente nel formato dd-mmm-year nel file xlm finale"
          );
        }
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

        var expWacker = data[22][3];
        var regexExpW = RegExp("[0-9]{2}[.][0-9]{2}[.][0-9]{4}", "g");
        if (!regexExpW.test(expWacker)) {
          alert(
            "Formato 'Expiry date' non corretto. Devi correggere la data manualmente nel formato dd-mmm-year nel file xlm finale"
          );
        }

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
        var regexShipW = RegExp("[0-9]{2}[.][0-9]{2}[.][0-9]{4}", "g");
        if (!regexShipW.test(shipDateW)) {
          alert(
            "Formato 'Shipment date' non corretto. Devi correggere la data manualmente nel formato dd-mmm-year nel file xlm finale"
          );
        }
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
          shipDateW.substring(0, 3) +
          monthName[month] +
          shipDateW.substring(5, 10);

        var lotNumber = data[24][2];

        var N2valueW = data[27][3];
        N2valueW = N2valueW.replace("< ", "");
        N2valueW = N2valueW.replace(",", ".");
        var O2ArvalueW = data[28][3];
        O2ArvalueW = O2ArvalueW.replace("< ", "");
        O2ArvalueW = O2ArvalueW.replace(",", ".");
        var CO2valueW = data[29][3];
        CO2valueW = CO2valueW.replace("< ", "");
        CO2valueW = CO2valueW.replace(",", ".");
        var COvalueW = data[30][3];
        COvalueW = COvalueW.replace("< ", "");
        COvalueW = COvalueW.replace(",", ".");
        var CH4valueW = data[31][3];
        CH4valueW = CH4valueW.replace("< ", "");
        CH4valueW = CH4valueW.replace(",", ".");
        var H2valueW = data[32][3];
        H2valueW = H2valueW.replace("< ", "");
        H2valueW = H2valueW.replace(",", ".");
        var H2OvalueW = data[33][3];
        H2OvalueW = H2OvalueW.replace("< ", "");
        H2OvalueW = H2OvalueW.replace(",", ".");
        var FevalueW = data[34][3];
        FevalueW = FevalueW.replace("< ", "");
        FevalueW = FevalueW.replace(",", ".");
      } else if (data.length === 34) {
        manWacker = data[21][1];
        var regexManW = RegExp("[0-9]{2}[.][0-9]{2}[.][0-9]{4}", "g");
        if (!regexManW.test(manWacker)) {
          alert(
            "Formato 'Manufacturing date' non corretto. Devi correggere la data manualmente nel formato dd-mmm-year nel file xlm finale"
          );
        }
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

        var expWacker = data[21][3];
        var regexExpW = RegExp("[0-9]{2}[.][0-9]{2}[.][0-9]{4}", "g");
        if (!regexExpW.test(expWacker)) {
          alert(
            "Formato 'Expiry date' non corretto. Devi correggere la data manualmente nel formato dd-mmm-year nel file xlm finale"
          );
        }

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
        var regexShipW = RegExp("[0-9]{2}[.][0-9]{2}[.][0-9]{4}", "g");
        if (!regexShipW.test(shipDateW)) {
          alert(
            "Formato 'Shipment date' non corretto. Devi correggere la data manualmente nel formato dd-mmm-year nel file xlm finale"
          );
        }
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
          shipDateW.substring(0, 3) +
          monthName[month] +
          shipDateW.substring(5, 10);

        var lotNumber = data[23][2];

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
      } else {
        alert("C'è un errore: mandami file .pdf per email - Luigi");
      }
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
      console.log("Wacker data", wackerData);
    } catch (error) {
      alert("C'è un errore: mandami file .pdf per email - Luigi");
    }
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

// async function correctDate() {
//   document.getElementById("HClMfgDateCorrection").style.display = "inline";
// }
// async function MfgHClWackerCorrected() {
//   manWacker = document.getElementById("mfgDateCorrected").value;
//   console.log("Mfg Wacker new", manWacker);
// }
