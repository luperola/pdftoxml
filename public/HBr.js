function hydrogenBromide() {
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
    //   //Counter alimenta e salva il contatore di counter.txt
    //   const testResponse = await fetch("/apicounter");
    //   var dataTest = await testResponse.text();
    //   //console.log("dataTest1", dataTest);
    //   dataTest = parseInt(dataTest);
    //   dataTest++;
    //   var dt = new Date();
    //   var anno = dt.getFullYear().toString();
    //   anno = anno.substring(2, 4);
    //   if (dataTest < 10) {
    //     shipmentNumberW = "IT/000" + dataTest.toString() + "/" + anno;
    //   }
    //   if (dataTest >= 10 && dataTest < 100) {
    //     shipmentNumberW = "IT/00" + dataTest.toString() + "/" + anno;
    //   }
    //   if (dataTest >= 100 && dataTest < 1000) {
    //     shipmentNumberW = "IT/0" + dataTest.toString() + "/" + anno;
    //   }
    //   if (dataTest >= 1000) {
    //     shipmentNumberW = "IT/" + dataTest.toString() + "/" + anno;
    //   }
    //   if (dataTest > 10000) {
    //     alert("reset counter.txt file");
    //   }
    //   datacounter = { dataTest };
    //   const optionCounter = {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(datacounter),
    //   };
    //   const myresponse = await fetch("/newcounter", optionCounter);
    //   var myjson = await myresponse.text();
    //   //console.log("myJson", myjson);
    //   try {
    //     if (data.length === 35) {
    //       manWacker = data[22][1];
    //       var regexManW = RegExp("[0-9]{2}[.][0-9]{2}[.][0-9]{4}", "g");
    //       if (!regexManW.test(manWacker)) {
    //         alert(
    //           "Formato 'Manufacturing date' non corretto. Devi correggere la data manualmente nel formato dd-mmm-year nel file xlm finale"
    //         );
    //       }
    //       manWacker = manWacker.replaceAll(".", "-");
    //       const monthMan = parseInt(manWacker.substring(3, 5)) - 1;
    //       const monthNameMan = [
    //         "Jan",
    //         "Feb",
    //         "Mar",
    //         "Apr",
    //         "May",
    //         "Jun",
    //         "Jul",
    //         "Aug",
    //         "Sep",
    //         "Oct",
    //         "Nov",
    //         "Dec",
    //       ];
    //       manWacker =
    //         manWacker.substring(0, 3) +
    //         monthNameMan[monthMan] +
    //         manWacker.substring(5, 10);

    //       var expWacker = data[22][3];
    //       var regexExpW = RegExp("[0-9]{2}[.][0-9]{2}[.][0-9]{4}", "g");
    //       if (!regexExpW.test(expWacker)) {
    //         alert(
    //           "Formato 'Expiry date' non corretto. Devi correggere la data manualmente nel formato dd-mmm-year nel file xlm finale"
    //         );
    //       }

    //       expWacker = expWacker.replaceAll(".", "-");
    //       const monthExpiry = parseInt(expWacker.substring(3, 5)) - 1;
    //       const monthNameExpiry = [
    //         "Jan",
    //         "Feb",
    //         "Mar",
    //         "Apr",
    //         "May",
    //         "Jun",
    //         "Jul",
    //         "Aug",
    //         "Sep",
    //         "Oct",
    //         "Nov",
    //         "Dec",
    //       ];
    //       expWacker =
    //         expWacker.substring(0, 3) +
    //         monthNameExpiry[monthExpiry] +
    //         expWacker.substring(5, 10);

    //       var lotNumber = data[24][2];

    //       var N2valueW = data[27][3];
    //       N2valueW = N2valueW.replace("< ", "");
    //       N2valueW = N2valueW.replace(",", ".");
    //       var O2ArvalueW = data[28][3];
    //       O2ArvalueW = O2ArvalueW.replace("< ", "");
    //       O2ArvalueW = O2ArvalueW.replace(",", ".");
    //       var CO2valueW = data[29][3];
    //       CO2valueW = CO2valueW.replace("< ", "");
    //       CO2valueW = CO2valueW.replace(",", ".");
    //       var COvalueW = data[30][3];
    //       COvalueW = COvalueW.replace("< ", "");
    //       COvalueW = COvalueW.replace(",", ".");
    //       var CH4valueW = data[31][3];
    //       CH4valueW = CH4valueW.replace("< ", "");
    //       CH4valueW = CH4valueW.replace(",", ".");
    //       var H2valueW = data[32][3];
    //       H2valueW = H2valueW.replace("< ", "");
    //       H2valueW = H2valueW.replace(",", ".");
    //       var H2OvalueW = data[33][3];
    //       H2OvalueW = H2OvalueW.replace("< ", "");
    //       H2OvalueW = H2OvalueW.replace(",", ".");
    //       var FevalueW = data[34][3];
    //       FevalueW = FevalueW.replace("< ", "");
    //       FevalueW = FevalueW.replace(",", ".");
    //     } else if (data.length === 34) {
    //       manWacker = data[21][1];
    //       var regexManW = RegExp("[0-9]{2}[.][0-9]{2}[.][0-9]{4}", "g");
    //       if (!regexManW.test(manWacker)) {
    //         alert(
    //           "Formato 'Manufacturing date' non corretto. Devi correggere la data manualmente nel formato dd-mmm-year nel file xlm finale"
    //         );
    //       }
    //       manWacker = manWacker.replaceAll(".", "-");
    //       const monthMan = parseInt(manWacker.substring(3, 5)) - 1;
    //       const monthNameMan = [
    //         "Jan",
    //         "Feb",
    //         "Mar",
    //         "Apr",
    //         "May",
    //         "Jun",
    //         "Jul",
    //         "Aug",
    //         "Sep",
    //         "Oct",
    //         "Nov",
    //         "Dec",
    //       ];
    //       manWacker =
    //         manWacker.substring(0, 3) +
    //         monthNameMan[monthMan] +
    //         manWacker.substring(5, 10);

    //       var expWacker = data[21][3];
    //       var regexExpW = RegExp("[0-9]{2}[.][0-9]{2}[.][0-9]{4}", "g");
    //       if (!regexExpW.test(expWacker)) {
    //         alert(
    //           "Formato 'Expiry date' non corretto. Devi correggere la data manualmente nel formato dd-mmm-year nel file xlm finale"
    //         );
    //       }

    //       expWacker = expWacker.replaceAll(".", "-");
    //       const monthExpiry = parseInt(expWacker.substring(3, 5)) - 1;
    //       const monthNameExpiry = [
    //         "Jan",
    //         "Feb",
    //         "Mar",
    //         "Apr",
    //         "May",
    //         "Jun",
    //         "Jul",
    //         "Aug",
    //         "Sep",
    //         "Oct",
    //         "Nov",
    //         "Dec",
    //       ];
    //       expWacker =
    //         expWacker.substring(0, 3) +
    //         monthNameExpiry[monthExpiry] +
    //         expWacker.substring(5, 10);

    //       // var shipDateW = data[7][0];
    //       // var regexShipW = RegExp("[0-9]{2}[.][0-9]{2}[.][0-9]{4}", "g");
    //       // if (!regexShipW.test(shipDateW)) {
    //       //   alert(
    //       //     "Formato 'Shipment date' non corretto. Devi correggere la data manualmente nel formato dd-mmm-year nel file xlm finale"
    //       //   );
    //       // }
    //       // shipDateW = shipDateW.replaceAll(".", "-");
    //       // const month = parseInt(shipDateW.substring(3, 5)) - 1;
    //       // const monthName = [
    //       //   "Jan",
    //       //   "Feb",
    //       //   "Mar",
    //       //   "Apr",
    //       //   "May",
    //       //   "Jun",
    //       //   "Jul",
    //       //   "Aug",
    //       //   "Sep",
    //       //   "Oct",
    //       //   "Nov",
    //       //   "Dec",
    //       // ];
    //       // shipDateW =
    //       //   shipDateW.substring(0, 3) +
    //       //   monthName[month] +
    //       //   shipDateW.substring(5, 10);

    //       var lotNumber = data[23][2];

    //       var N2valueW = data[26][3];
    //       N2valueW = N2valueW.replace("< ", "");
    //       N2valueW = N2valueW.replace(",", ".");
    //       var O2ArvalueW = data[27][3];
    //       O2ArvalueW = O2ArvalueW.replace("< ", "");
    //       O2ArvalueW = O2ArvalueW.replace(",", ".");
    //       var CO2valueW = data[28][3];
    //       CO2valueW = CO2valueW.replace("< ", "");
    //       CO2valueW = CO2valueW.replace(",", ".");
    //       var COvalueW = data[29][3];
    //       COvalueW = COvalueW.replace("< ", "");
    //       COvalueW = COvalueW.replace(",", ".");
    //       var CH4valueW = data[30][3];
    //       CH4valueW = CH4valueW.replace("< ", "");
    //       CH4valueW = CH4valueW.replace(",", ".");
    //       var H2valueW = data[31][3];
    //       H2valueW = H2valueW.replace("< ", "");
    //       H2valueW = H2valueW.replace(",", ".");
    //       var H2OvalueW = data[32][3];
    //       H2OvalueW = H2OvalueW.replace("< ", "");
    //       H2OvalueW = H2OvalueW.replace(",", ".");
    //       var FevalueW = data[33][3];
    //       FevalueW = FevalueW.replace("< ", "");
    //       FevalueW = FevalueW.replace(",", ".");
    //     } else {
    //       alert("C'è un errore: mandami file .pdf per email - Luigi");
    //       window.location.href = "index.html";
    //     }
    //     var wackerData = {
    //       receivingPlant: receivingPlant,
    //       nameSpace: nameSpace,
    //       partNumber: partNumber,
    //       materialSpec: materialSpec,
    //       revisionSpec: revisionSpec,
    //       shipmentNumber: shipmentNumberW,
    //       shipmentdate: today,
    //       lotNumber: lotNumber,
    //       expiryDate: expWacker,
    //       manDate: manWacker,
    //       N2value: N2valueW,
    //       O2Arvalue: O2ArvalueW,
    //       CO2value: CO2valueW,
    //       COvalue: COvalueW,
    //       CH4value: CH4valueW,
    //       H2value: H2OvalueW,
    //       H2Ovalue: H2OvalueW,
    //       Fevalue: FevalueW,
    //     };
    //     console.log("Wacker data", wackerData);
    //   } catch (error) {
    //     alert("C'è un errore: mandami file .pdf per email - Luigi");
    //     window.location.href = "index.html";
    //   }
    //   // posto i dati per compilare file xlm

    //   const woptions = {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(wackerData),
    //   };
    //   const myresponsew = await fetch("/apitwo", woptions);
    //   var myjsonw = await myresponsew.json();
    //   //console.log(myjsonw);
  }
}
