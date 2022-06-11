//---------------HONG IN AGRATE----------------

function HongInAGR() {
  alert("File troppo grande - Invia pdf a Luigi");
  window.location.href = "index.html";

  // document.getElementById("btndown").style.display = "inline";
  // document.getElementById("btnHome").style.display = "inline";
  // ReadHIText();
  // async function ReadHIText() {
  //   const response = await fetch("/jsonSampleFile2");
  //   const data = await response.json();
  //   //console.log("Hong In data", data);

  //   for (let index = 0; index < data.length; index++) {
  //     if (data[index][0].indexOf("HXHCL") != -1) {
  //       arrayIndeces.push(index);
  //     }
  //   }

  //   for (let index = 0; index < data.length; index++) {
  //     if (data[index][0] === "Analytical" && data[index][1] === "Results") {
  //       arrayIndecesMetal.push(index);
  //     }
  //   }

  //   for (let index = 0; index < arrayIndeces.length; index++) {
  //     const random = Math.floor(Math.random() * arrayIndecesMetal.length);
  //     arrayIndecesMetalRandom.push(arrayIndecesMetal[random]);
  //   }

  //   //shipLotNumberHI è array con i drums /cylinders di HongIn. Dà anche i nomi dei files xml
  //   let shipLotNumberHI = [],
  //     lotNumberHI = [],
  //     manufacturingDateHI = [],
  //     H2valueHI = [],
  //     O2ArvalueHI = [],
  //     N2valueHI = [],
  //     CH4valueHI = [],
  //     COvalueHI = [],
  //     CO2valueHI = [],
  //     H2OvalueHI = [],
  //     FevalueHI = [],
  //     manufacturinDateRightFormat = [],
  //     year = [],
  //     month = [],
  //     day = [],
  //     myDate = [],
  //     myExpDate = [],
  //     months = [],
  //     oggi = [];

  //   for (let i = 0; i < arrayIndeces.length; i++) {
  //     shipLotNumberHI.push(data[arrayIndeces[i]][1]);
  //     lotNumberHI.push(data[arrayIndeces[i]][0]);
  //     manufacturingDateHI.push(data[arrayIndeces[i]][4]);
  //     H2valueHI.push(data[arrayIndeces[i]][7]);
  //     O2ArvalueHI.push(data[arrayIndeces[i]][8]);
  //     N2valueHI.push(data[arrayIndeces[i]][9]);
  //     CH4valueHI.push(data[arrayIndeces[i]][10]);
  //     COvalueHI.push(data[arrayIndeces[i]][11]);
  //     CO2valueHI.push(data[arrayIndeces[i]][12]);
  //     H2OvalueHI.push(data[arrayIndeces[i]][13]);
  //     FevalueHI.push(data[arrayIndecesMetalRandom[i]][16]);
  //     oggi.push(today);

  //     //--------------HONG IN AGRATE COUNTER ------------
  //     const testResponse = await fetch("/apicounter");
  //     var dataTest = await testResponse.text();
  //     //console.log("dataTest1", dataTest);
  //     dataTest = parseInt(dataTest);
  //     dataTest++;
  //     var dt = new Date();
  //     var anno = dt.getFullYear().toString();
  //     anno = anno.substring(2, 4);
  //     if (dataTest < 10) {
  //       shipmentNumberHI = "IT/000" + dataTest.toString() + "/" + anno;
  //     }
  //     if (dataTest >= 10 && dataTest < 100) {
  //       shipmentNumberHI = "IT/00" + dataTest.toString() + "/" + anno;
  //     }
  //     if (dataTest >= 100 && dataTest < 1000) {
  //       shipmentNumberHI = "IT/0" + dataTest.toString() + "/" + anno;
  //     }
  //     if (dataTest >= 1000) {
  //       shipmentNumberHI = "IT/" + dataTest.toString() + "/" + anno;
  //     }
  //     if (dataTest > 10000) {
  //       alert("reset counter.txt file");
  //     }
  //     shNumberHI.push(shipmentNumberHI);
  //     datacounter = { dataTest };
  //     const optionCounter = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(datacounter),
  //     };
  //     const myresponse = await fetch("/newcounter", optionCounter);
  //     var myjson = await myresponse.text();
  //     //console.log("myJson", myjson);
  //   }

  //   // //--------------END HONG IN AGRATE COUNTER ------------

  //   for (let i = 0; i < arrayIndeces.length; i++) {
  //     H2valueHI[i] = H2valueHI[i].trim();
  //     H2valueHI[i] = H2valueHI[i].replace("<", "").replace("ND", "");
  //     O2ArvalueHI[i] = O2ArvalueHI[i].trim();
  //     O2ArvalueHI[i] = O2ArvalueHI[i].replace("<", "").replace("ND", "");
  //     N2valueHI[i] = N2valueHI[i].trim();
  //     N2valueHI[i] = N2valueHI[i].replace("<", "").replace("ND", "");
  //     CH4valueHI[i] = CH4valueHI[i].trim();
  //     CH4valueHI[i] = CH4valueHI[i].replace("<", "").replace("ND", "");
  //     COvalueHI[i] = COvalueHI[i].trim();
  //     COvalueHI[i] = COvalueHI[i].replace("<", "").replace("ND", "");
  //     CO2valueHI[i] = CO2valueHI[i].trim();
  //     CO2valueHI[i] = CO2valueHI[i].replace("<", "").replace("ND", "");
  //     H2OvalueHI[i] = H2OvalueHI[i].trim();
  //     H2OvalueHI[i] = H2OvalueHI[i].replace("<", "").replace("ND", "");
  //     FevalueHI[i] = FevalueHI[i].trim();
  //     FevalueHI[i] = FevalueHI[i].replace("<", "").replace("ND", "");
  //   }

  //   for (let i = 0; i < arrayIndeces.length; i++) {
  //     year[i] = manufacturingDateHI[i].substring(0, 4);
  //     month[i] = parseInt(manufacturingDateHI[i].substring(4, 6)) - 1;
  //     months = [
  //       "Jan",
  //       "Feb",
  //       "Mar",
  //       "Apr",
  //       "May",
  //       "Jun",
  //       "Jul",
  //       "Aug",
  //       "Sep",
  //       "Oct",
  //       "Nov",
  //       "Dec",
  //     ];
  //     day[i] = manufacturingDateHI[i].substring(6, 8);
  //     myDate[i] = day[i] + "-" + months[month[i]] + "-" + year[i];
  //     manufacturinDateRightFormat.push(myDate[i]);
  //     var newExp = parseInt(year[i]) + 2;
  //     myExpDate[i] = day[i] + "-" + months[month[i]] + "-" + newExp;
  //   }

  //   const dataHI = {
  //     lotNumberHI: lotNumberHI,
  //     filenamesHI: shipLotNumberHI,
  //     manDateHI: manufacturinDateRightFormat,
  //     expDateHI: myExpDate,
  //     progressivoHI: shNumberHI,
  //     shipmentDate: oggi,
  //     HIH2value: H2valueHI,
  //     HIO2Arvalue: O2ArvalueHI,
  //     HIN2value: N2valueHI,
  //     HICH4value: CH4valueHI,
  //     HICOvalue: COvalueHI,
  //     HICO2value: CO2valueHI,
  //     HIH2Ovalue: H2OvalueHI,
  //     HIFevalue: FevalueHI,
  //   };
  //   console.log("dataHIAGR", dataHI);
  //   const HIoptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(dataHI),
  //   };
  //   const myresponseHI = await fetch("/apiHIAGR", HIoptions);
  //   var myjsonHI = await myresponseHI.json();
  //   //console.log(myjsonHI);
  // }
}
//---------------END HONG IN AGRATE----------------

//---------------HONG IN CATANIA ----------------

function HongInCAT() {
  alert("File troppo grande - Invia pdf a Luigi");
  window.location.href = "index.html";
  // document.getElementById("btndown").style.display = "inline";
  // document.getElementById("btnHome").style.display = "inline";

  // ReadHIText();
  // async function ReadHIText() {
  //   const response = await fetch("/jsonSampleFile2");
  //   const data = await response.json();
  //   //console.log("Hong In data", data);

  //   for (let index = 0; index < data.length; index++) {
  //     if (data[index][0].indexOf("HXHCL") != -1) {
  //       arrayIndeces.push(index);
  //     }
  //   }

  //   for (let index = 0; index < data.length; index++) {
  //     if (data[index][0] === "Analytical" && data[index][1] === "Results") {
  //       arrayIndecesMetal.push(index);
  //     }
  //   }

  //   for (let index = 0; index < arrayIndeces.length; index++) {
  //     const random = Math.floor(Math.random() * arrayIndecesMetal.length);
  //     arrayIndecesMetalRandom.push(arrayIndecesMetal[random]);
  //   }

  //   //shipLotNumberHI è array con i drums /cylinders di HongIn. Dà anche i nomi dei files xml
  //   let shipLotNumberHI = [],
  //     lotNumberHI = [],
  //     manufacturingDateHI = [],
  //     H2valueHI = [],
  //     O2ArvalueHI = [],
  //     N2valueHI = [],
  //     CH4valueHI = [],
  //     COvalueHI = [],
  //     CO2valueHI = [],
  //     H2OvalueHI = [],
  //     FevalueHI = [],
  //     AlvalueHI = [],
  //     SbvalueHI = [],
  //     AsvalueHI = [],
  //     BivalueHI = [],
  //     BvalueHI = [],
  //     CdvalueHI = [],
  //     CrvalueHI = [],
  //     CovalueHI = [],
  //     CuvalueHI = [],
  //     PbvalueHI = [],
  //     MovalueHI = [],
  //     NivalueHI = [],
  //     PvalueHI = [],
  //     NavalueHI = [],
  //     ZnvalueHI = [],
  //     manufacturinDateRightFormat = [],
  //     year = [],
  //     month = [],
  //     day = [],
  //     myDate = [],
  //     myExpDate = [],
  //     months = [],
  //     oggi = [];

  //   for (let i = 0; i < arrayIndeces.length; i++) {
  //     shipLotNumberHI.push(data[arrayIndeces[i]][1]);
  //     lotNumberHI.push(data[arrayIndeces[i]][0]);
  //     manufacturingDateHI.push(data[arrayIndeces[i]][4]);
  //     H2valueHI.push(data[arrayIndeces[i]][7]);
  //     O2ArvalueHI.push(data[arrayIndeces[i]][8]);
  //     N2valueHI.push(data[arrayIndeces[i]][9]);
  //     CH4valueHI.push(data[arrayIndeces[i]][10]);
  //     COvalueHI.push(data[arrayIndeces[i]][11]);
  //     CO2valueHI.push(data[arrayIndeces[i]][12]);
  //     H2OvalueHI.push(data[arrayIndeces[i]][13]);
  //     FevalueHI.push(data[arrayIndecesMetalRandom[i]][16]);
  //     AlvalueHI.push(data[arrayIndecesMetalRandom[i]][4]);
  //     SbvalueHI.push(data[arrayIndecesMetalRandom[i]][11]);
  //     AsvalueHI.push(data[arrayIndecesMetalRandom[i]][17]);
  //     BivalueHI.push(data[arrayIndecesMetalRandom[i]][13]);
  //     CdvalueHI.push(data[arrayIndecesMetalRandom[i]][10]);
  //     CrvalueHI.push(data[arrayIndecesMetalRandom[i]][15]);
  //     CovalueHI.push(data[arrayIndecesMetalRandom[i]][5]);
  //     CuvalueHI.push(data[arrayIndecesMetalRandom[i]][7]);
  //     PbvalueHI.push(data[arrayIndecesMetalRandom[i]][12]);
  //     MovalueHI.push(data[arrayIndecesMetalRandom[i]][9]);
  //     NivalueHI.push(data[arrayIndecesMetalRandom[i]][6]);
  //     PvalueHI.push(data[arrayIndecesMetalRandom[i]][2]);
  //     NavalueHI.push(data[arrayIndecesMetalRandom[i]][14]);
  //     BvalueHI.push(data[arrayIndecesMetalRandom[i]][3]);
  //     ZnvalueHI.push(data[arrayIndecesMetalRandom[i]][8]);
  //     oggi.push(today);

  //     //--------------HONG IN CATANIA COUNTER ------------
  //     const testResponse = await fetch("/apicounter");
  //     var dataTest = await testResponse.text();
  //     //console.log("dataTest1", dataTest);
  //     dataTest = parseInt(dataTest);
  //     dataTest++;
  //     var dt = new Date();
  //     var anno = dt.getFullYear().toString();
  //     anno = anno.substring(2, 4);
  //     if (dataTest < 10) {
  //       shipmentNumberHI = "IT/000" + dataTest.toString() + "/" + anno;
  //     }
  //     if (dataTest >= 10 && dataTest < 100) {
  //       shipmentNumberHI = "IT/00" + dataTest.toString() + "/" + anno;
  //     }
  //     if (dataTest >= 100 && dataTest < 1000) {
  //       shipmentNumberHI = "IT/0" + dataTest.toString() + "/" + anno;
  //     }
  //     if (dataTest >= 1000) {
  //       shipmentNumberHI = "IT/" + dataTest.toString() + "/" + anno;
  //     }
  //     if (dataTest > 10000) {
  //       alert("reset counter.txt file");
  //     }
  //     shNumberHI.push(shipmentNumberHI);
  //     datacounter = { dataTest };
  //     const optionCounter = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(datacounter),
  //     };
  //     const myresponse = await fetch("/newcounter", optionCounter);
  //     var myjson = await myresponse.text();
  //     //console.log("myJson", myjson);
  //   }

  //   // //--------------END HONG IN CATANIA COUNTER ------------

  //   for (let i = 0; i < arrayIndeces.length; i++) {
  //     H2valueHI[i] = H2valueHI[i].trim();
  //     H2valueHI[i] = H2valueHI[i].replace("<", "").replace("ND", "");
  //     O2ArvalueHI[i] = O2ArvalueHI[i].trim();
  //     O2ArvalueHI[i] = O2ArvalueHI[i].replace("<", "").replace("ND", "");
  //     N2valueHI[i] = N2valueHI[i].trim();
  //     N2valueHI[i] = N2valueHI[i].replace("<", "").replace("ND", "");
  //     CH4valueHI[i] = CH4valueHI[i].trim();
  //     CH4valueHI[i] = CH4valueHI[i].replace("<", "").replace("ND", "");
  //     COvalueHI[i] = COvalueHI[i].trim();
  //     COvalueHI[i] = COvalueHI[i].replace("<", "").replace("ND", "");
  //     CO2valueHI[i] = CO2valueHI[i].trim();
  //     CO2valueHI[i] = CO2valueHI[i].replace("<", "").replace("ND", "");
  //     H2OvalueHI[i] = H2OvalueHI[i].trim();
  //     H2OvalueHI[i] = H2OvalueHI[i].replace("<", "").replace("ND", "");
  //     FevalueHI[i] = FevalueHI[i].trim();
  //     FevalueHI[i] = FevalueHI[i].replace("<", "").replace("ND", "");
  //     AlvalueHI[i] = AlvalueHI[i].trim();
  //     AlvalueHI[i] = AlvalueHI[i].replace("<", "").replace("ND", "");
  //     SbvalueHI[i] = SbvalueHI[i].trim();
  //     SbvalueHI[i] = SbvalueHI[i].replace("<", "").replace("ND", "");
  //     AsvalueHI[i] = AsvalueHI[i].trim();
  //     AsvalueHI[i] = AsvalueHI[i].replace("<", "").replace("ND", "");
  //     BivalueHI[i] = BivalueHI[i].trim();
  //     BivalueHI[i] = BivalueHI[i].replace("<", "").replace("ND", "");
  //     CdvalueHI[i] = CdvalueHI[i].trim();
  //     CdvalueHI[i] = CdvalueHI[i].replace("<", "").replace("ND", "");
  //     CrvalueHI[i] = CrvalueHI[i].trim();
  //     CrvalueHI[i] = CrvalueHI[i].replace("<", "").replace("ND", "");
  //     CovalueHI[i] = CovalueHI[i].trim();
  //     CovalueHI[i] = CovalueHI[i].replace("<", "").replace("ND", "");
  //     CrvalueHI[i] = CrvalueHI[i].trim();
  //     CrvalueHI[i] = CrvalueHI[i].replace("<", "").replace("ND", "");
  //     CuvalueHI[i] = CuvalueHI[i].trim();
  //     CuvalueHI[i] = CuvalueHI[i].replace("<", "").replace("ND", "");
  //     PbvalueHI[i] = PbvalueHI[i].trim();
  //     PbvalueHI[i] = PbvalueHI[i].replace("<", "").replace("ND", "");
  //     MovalueHI[i] = MovalueHI[i].trim();
  //     MovalueHI[i] = MovalueHI[i].replace("<", "").replace("ND", "");
  //     NivalueHI[i] = NivalueHI[i].trim();
  //     NivalueHI[i] = NivalueHI[i].replace("<", "").replace("ND", "");
  //     PvalueHI[i] = PvalueHI[i].trim();
  //     PvalueHI[i] = PvalueHI[i].replace("<", "").replace("ND", "");
  //     NavalueHI[i] = NavalueHI[i].trim();
  //     NavalueHI[i] = NavalueHI[i].replace("<", "").replace("ND", "");
  //     BvalueHI[i] = BvalueHI[i].trim();
  //     BvalueHI[i] = BvalueHI[i].replace("<", "").replace("ND", "");
  //     ZnvalueHI[i] = ZnvalueHI[i].trim();
  //     ZnvalueHI[i] = ZnvalueHI[i].replace("<", "").replace("ND", "");
  //   }

  //   for (let i = 0; i < arrayIndeces.length; i++) {
  //     year[i] = manufacturingDateHI[i].substring(0, 4);
  //     month[i] = parseInt(manufacturingDateHI[i].substring(4, 6)) - 1;
  //     months = [
  //       "Jan",
  //       "Feb",
  //       "Mar",
  //       "Apr",
  //       "May",
  //       "Jun",
  //       "Jul",
  //       "Aug",
  //       "Sep",
  //       "Oct",
  //       "Nov",
  //       "Dec",
  //     ];
  //     day[i] = manufacturingDateHI[i].substring(6, 8);
  //     myDate[i] = day[i] + "-" + months[month[i]] + "-" + year[i];
  //     manufacturinDateRightFormat.push(myDate[i]);
  //     var newExp = parseInt(year[i]) + 2;
  //     myExpDate[i] = day[i] + "-" + months[month[i]] + "-" + newExp;
  //   }

  //   const dataHI = {
  //     lotNumberHI: lotNumberHI,
  //     filenamesHI: shipLotNumberHI,
  //     manDateHI: manufacturinDateRightFormat,
  //     expDateHI: myExpDate,
  //     shipmentDate: oggi,
  //     progressivoHI: shNumberHI,
  //     HIH2value: H2valueHI,
  //     HIO2Arvalue: O2ArvalueHI,
  //     HIN2value: N2valueHI,
  //     HICH4value: CH4valueHI,
  //     HICOvalue: COvalueHI,
  //     HICO2value: CO2valueHI,
  //     HIH2Ovalue: H2OvalueHI,
  //     HIFevalue: FevalueHI,
  //     HIAlvalue: AlvalueHI,
  //     HISbvalue: SbvalueHI,
  //     HIAsvalue: AsvalueHI,
  //     HIBivalue: BivalueHI,
  //     HIBvalue: BvalueHI,
  //     HICdvalue: CdvalueHI,
  //     HICrvalue: CrvalueHI,
  //     HICovalue: CovalueHI,
  //     HICuvalue: CuvalueHI,
  //     HIPbvalue: PbvalueHI,
  //     HIMovalue: MovalueHI,
  //     HINivalue: NivalueHI,
  //     HIPvalue: PvalueHI,
  //     HINavalue: NavalueHI,
  //     HiZnvalue: ZnvalueHI,
  //   };
  //   console.log("dataHICAT", dataHI);
  //   const HIoptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(dataHI),
  //   };
  //   const myresponseHI = await fetch("/apiHICAT", HIoptions);
  //   var myjsonHI = await myresponseHI.json();
  //   //console.log(myjsonHI);
  // }
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
  document.getElementById("CSPage").style.display = "none";
  document.getElementById("NOTaulovPage").style.display = "none";
  document.getElementById("TCSPage").style.display = "none";
  document.getElementById("HBrPage").style.display = "none";
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

        // var shipDateW = data[7][0];
        // var regexShipW = RegExp("[0-9]{2}[.][0-9]{2}[.][0-9]{4}", "g");
        // if (!regexShipW.test(shipDateW)) {
        //   alert(
        //     "Formato 'Shipment date' non corretto. Devi correggere la data manualmente nel formato dd-mmm-year nel file xlm finale"
        //   );
        // }
        // shipDateW = shipDateW.replaceAll(".", "-");
        // const month = parseInt(shipDateW.substring(3, 5)) - 1;
        // const monthName = [
        //   "Jan",
        //   "Feb",
        //   "Mar",
        //   "Apr",
        //   "May",
        //   "Jun",
        //   "Jul",
        //   "Aug",
        //   "Sep",
        //   "Oct",
        //   "Nov",
        //   "Dec",
        // ];
        // shipDateW =
        //   shipDateW.substring(0, 3) +
        //   monthName[month] +
        //   shipDateW.substring(5, 10);

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
        window.location.href = "index.html";
      }
      var wackerData = {
        receivingPlant: receivingPlant,
        nameSpace: nameSpace,
        partNumber: partNumber,
        materialSpec: materialSpec,
        revisionSpec: revisionSpec,
        shipmentNumber: shipmentNumberW,
        shipmentdate: today,
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
      window.location.href = "index.html";
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
