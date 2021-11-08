var dataText,
  myDate,
  shipmentNumber,
  expirationDateOne,
  fillingDate,
  coaPages,
  data;
var lotNumberArray = [],
  testMatrix = [],
  cylinderNumberArray = [],
  cylinderNumberArray1 = [],
  testMatrix1 = [],
  testMatrix2 = [],
  testMatrix3 = [],
  testMatrix4 = [],
  testMatrix5 = [],
  testMatrix6 = [],
  testMatrix7 = [],
  testMatrix8 = [],
  testMatrix9 = [],
  testMatrix10 = [],
  testMatrix11 = [],
  testMatrix12 = [],
  testMatrix13 = [],
  testMatrix14 = [],
  testMatrix15 = [],
  testMatrix16 = [];
/* ReadFileTxt();
async function ReadFileTxt() {
  const response = await fetch("HCl Hongin Coa2.txt");
  dataText = await response.text();
  //dataText è una stringa
} */

try {
  ReadFileJson();
  async function ReadFileJson() {
    const response = await fetch("sample.json");
    data = await response.json();
  }
} catch (error) {
  alert("non fa il fetch del file");
}

//alimenta e salva il contatore di counter.txt
Counter();
async function Counter() {
  const alfa = 1;
  const data = { alfa };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const myresponse = await fetch("/api", options);
  var myjson = await myresponse.json();
  myjson = parseInt(myjson);
  var dt = new Date();
  var anno = dt.getFullYear().toString();
  anno = anno.substring(2, 4);
  if (myjson < 10) {
    shipmentNumber = "IT/000" + myjson.toString() + "/" + anno;
  }
  if (myjson >= 10 && myjson < 100) {
    shipmentNumber = "IT/00" + myjson.toString() + "/" + anno;
  }
  if (myjson >= 100 && myjson < 1000) {
    shipmentNumber = "IT/0" + myjson.toString() + "/" + anno;
  }
  if (myjson >= 1000) {
    shipmentNumber = "IT/" + myjson.toString() + "/" + anno;
  }
  if (myjson > 10000) {
    alert("reset counter.txt file");
  }
}

//cambio format dello shipment-date da CoA
function shipmentDateFormat() {
  myDate = `${data.formImage.Pages[0].Texts[106].R[0].T}`;
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
}

function ExirationDateFormatOne() {
  expirationDateOne = `${data.formImage.Pages[0].Texts[9].R[0].T}`;
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
}

function FillingDateFormatOne() {
  fillingDate = `${data.formImage.Pages[0].Texts[20].R[0].T}`;
  const yearTwo = fillingDate.substring(0, 4);
  const monthTwo = parseInt(fillingDate.substring(4, 6)) - 1;
  const monthsTwo = [
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
  const dayTwo = fillingDate.substring(6, 8);
  fillingDate = dayTwo + "-" + monthsTwo[monthTwo] + "-" + yearTwo;
}

/* function HongIn() {
  document.getElementById("qtyinput").style.display = "inline";
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("supplierHongIn").style.display = "inline";
  coaPages = document.getElementById("CoAPages").value;
  if (coaPages > 1) {
    document.getElementById("separa").style.display = "inline";
    HongInArrayMaker("HXHCL", coaPages);
  }
  /* var hongInData1 = {
    shipmentNumber: shipmentNumber,
    shipmentdate: data.formImage.Pages[0].Texts[22].R[0].T,
    lotNumber: data.formImage.Pages[0].Texts[42].R[0].T,
    expiryDate: data.formImage.Pages[0].Texts[50].R[0].T,
    manDate: data.formImage.Pages[0].Texts[47].R[0].T,
    N2value: data.formImage.Pages[0].Texts[79].R[0].T,
    O2Arvalue: data.formImage.Pages[0].Texts[86].R[0].T,
    CO2value: data.formImage.Pages[0].Texts[93].R[0].T,
    COvalue: data.formImage.Pages[0].Texts[100].R[0].T,
    CH4value: data.formImage.Pages[0].Texts[107].R[0].T,
    H2value: data.formImage.Pages[0].Texts[114].R[0].T,
    H2Ovalue: data.formImage.Pages[0].Texts[121].R[0].T,
    Fevalue: data.formImage.Pages[0].Texts[128].R[0].T,
  }; */
//shipmentDateFormat();
//ExirationDateFormatOne();
//FillingDateFormatOne();
//document.getElementById("supplierHongIn").appendChild(linebreak);
//document.getElementById("supplierHongIn").appendChild(linebreak1);
/* document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  return;
} */
/* function HongInArrayMaker(needle, lessThan) {
  splitOnFound = dataText
    .split(needle)
    .map(
      function (culm) {
        return (this.pos += culm.length + needle.length);
      },
      { pos: -needle.length }
    )
    .slice(0, -1); // {pos: ...} – Object wich is used as this
  //console.log(splitOnFound);
  //splitOnFound dà la posizione di tutti i lot numbers HXHCL...
  for (let ind = 0; ind < lessThan; ind++) {
    for (let index = 0; index < 11; index++) {
      testMatrix.push(dataText[splitOnFound[ind] + index]);
    }
  }
  //console.log(testMatrix);
  const test = testMatrix.join("");
  // lotNumberArray è un object
  for (var i = 0, charsLength = test.length; i < charsLength; i += 11) {
    lotNumberArray.push(test.substring(i, i + 11));
  }
  //console.log(lotNumberArray);

  //sommando 13 a splitOnFound formiamo l'oggetto 'Cyl No'.
  for (let index = 0; index < lessThan; index++) {
    testMatrix1.push(splitOnFound[index] + 13);
  }
  //console.log("cylinderNumberArray- indexes", testMatrix1);

  for (let ind = 0; ind < lessThan; ind++) {
    for (let index = 0; index < 8; index++) {
      testMatrix2.push(dataText[testMatrix1[ind] + index]);
    }
  }
  console.log("cylinders #:", testMatrix2);
  const test1 = testMatrix2.join("");
  // lotNumberArray è un object
  for (var i = 0, charsLength = test1.length; i < charsLength; i += 8) {
    cylinderNumberArray.push(test1.substring(i, i + 8));
  }
  for (let index = 0; index < 11; index++) {
    cylinderNumberArray[index].replace(/\\n/g, " ");
  }
}
console.log("cyl No", cylinderNumberArray[0]);
 */
// Wacker
function WackerHCl() {
  document.getElementById("btndropdown").style.display = "none";
  document.getElementById("supplierWacker").style.display = "inline";
  console.log("data in Wacker function", data);
  console.log(
    "data in Wacker function2",
    data.formImage.Pages[0].Texts[22].R[0].T
  );
  var wackerData = {
    shipmentNumber: shipmentNumber,
    shipmentdate: data.formImage.Pages[0].Texts[22].R[0].T,
    lotNumber: data.formImage.Pages[0].Texts[42].R[0].T,
    expiryDate: data.formImage.Pages[0].Texts[50].R[0].T,
    manDate: data.formImage.Pages[0].Texts[47].R[0].T,
    N2value: data.formImage.Pages[0].Texts[79].R[0].T,
    O2Arvalue: data.formImage.Pages[0].Texts[86].R[0].T,
    CO2value: data.formImage.Pages[0].Texts[93].R[0].T,
    COvalue: data.formImage.Pages[0].Texts[100].R[0].T,
    CH4value: data.formImage.Pages[0].Texts[107].R[0].T,
    H2value: data.formImage.Pages[0].Texts[114].R[0].T,
    H2Ovalue: data.formImage.Pages[0].Texts[121].R[0].T,
    Fevalue: data.formImage.Pages[0].Texts[128].R[0].T,
  };
  wackerData.shipmentdate = wackerData.shipmentdate.replace(
    "date%20of%20issue%3A%20",
    ""
  );
  wackerData.shipmentdate = wackerData.shipmentdate.replaceAll(".", "-");
  const month = parseInt(wackerData.shipmentdate.substring(3, 5)) - 1;
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
  wackerData.shipmentdate = wackerData.shipmentdate.replace(
    wackerData.shipmentdate.substring(3, 5),
    monthName[month]
  );

  wackerData.expiryDate = wackerData.expiryDate.replaceAll(".", "-");
  const monthExpiry = parseInt(wackerData.expiryDate.substring(3, 5)) - 1;
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
  wackerData.expiryDate = wackerData.expiryDate.replace(
    wackerData.expiryDate.substring(3, 5),
    monthNameExpiry[monthExpiry]
  );

  wackerData.manDate = wackerData.manDate.replaceAll(".", "-");
  const monthMan = parseInt(wackerData.manDate.substring(3, 5)) - 1;
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
  wackerData.manDate = wackerData.manDate.replace(
    wackerData.manDate.substring(3, 5),
    monthNameMan[monthMan]
  );

  wackerData.N2value = wackerData.N2value.replace("%3C%20", "");
  wackerData.O2Arvalue = wackerData.O2Arvalue.replace("%3C%20", "");
  wackerData.CO2value = wackerData.CO2value.replace("%3C%20", "");
  wackerData.COvalue = wackerData.COvalue.replace("%3C%20", "");
  wackerData.CH4value = wackerData.CH4value.replace("%3C%20", "");
  wackerData.H2value = wackerData.H2value.replace("%3C%20", "");
  wackerData.H2Ovalue = wackerData.H2Ovalue.replace("%3C%20", "");
  wackerData.Fevalue = wackerData.Fevalue.replace("%3C%20", "");
  wackerData.N2value = wackerData.N2value.replace("%2C", ".");
  wackerData.O2Arvalue = wackerData.O2Arvalue.replace("%2C", ".");
  wackerData.CO2value = wackerData.CO2value.replace("%2C", ".");
  wackerData.COvalue = wackerData.COvalue.replace("%2C", ".");
  wackerData.CH4value = wackerData.CH4value.replace("%2C", ".");
  wackerData.H2value = wackerData.H2value.replace("%2C", ".");
  wackerData.H2Ovalue = wackerData.H2Ovalue.replace("%2C", ".");
  wackerData.Fevalue = wackerData.Fevalue.replace("%2C", ".");

  const wData = {
    shipmentNumber: wackerData.shipmentNumber,
    shipment: wackerData.shipmentdate,
    lotNumber: data.formImage.Pages[0].Texts[42].R[0].T,
    expiryDate: wackerData.expiryDate,
    manDate: wackerData.manDate,
    N2value: wackerData.N2value,
    O2Arvalue: wackerData.O2Arvalue,
    CO2value: wackerData.CO2value,
    COvalue: wackerData.COvalue,
    CH4value: wackerData.CH4value,
    H2value: wackerData.H2value,
    H2Ovalue: wackerData.H2Ovalue,
    Fevalue: wackerData.Fevalue,
  };
  console.log(wData);
  // contatore per
  Counter2();
  async function Counter2() {
    const woptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wData),
    };
    const myresponsew = await fetch("/apitwo", woptions);
    var myjsonw = await myresponsew.json();
    console.log(myjsonw);
  }
  document.getElementById("btndown").style.display = "inline";
  document.getElementById("btnHome").style.display = "inline";
  return;
}

/* function toArray(list) {
  return Array.prototype.slice.call(list);
}

var albums = toArray(document.getElementsById(btnMatrix[index]));
albums.forEach(function (album) {
  document.getElementById(album.id).addEventListener("click", function () {
      goAlbum(album.id);
  }, false);
}); */
