const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening server at ${port}`);
});
app.use(express.static(__dirname + "/public"));
app.use(express.json({ limit: "10mb" }));

const fs = require("fs");
//const PDFParser = require("pdf2json");
const multer = require("multer");
const path = require("path");
var XMLWriter = require("xml-writer");
var AdmZip = require("adm-zip");
var pdf2table = require("pdf2table");
//const hummus = require("hummus");
var jsonConcat = require("json-concat");
const { dirname } = require("path");
var fileOriginale;

// Uso multer per caricare file a scelta dalla mia directory. Solo pdf
const storageMultiple = multer.diskStorage({
  destination: function (req, file, cb) {
    //var dir = "public";
    var dir = __dirname;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    //cb(null, Date.now() + path.extname(file.originalname));
    cb(null, file.originalname + path.extname(file.originalname));
  },
});

const uploadMultiple = multer({
  storage: storageMultiple,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("image", 12);

// Set storage engine
const storage = multer.diskStorage({
  //destination: "public",
  destination: __dirname,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//il nome in single("") deve essere identico al name dell'input
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("myFile");

// Check file Type
function checkFileType(file, cb) {
  const fileTypes = path.extname(file.originalname).toLowerCase();
  if (fileTypes == ".txt" || fileTypes == ".pdf") {
    return cb(null, true);
  } else {
    cb("Error: Pdf or txt files only !!!");
  }
}

// carico files pdf & txt, per pdf lo trasformo in sample.json, per txt lo copio come sample.txt
try {
  app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
      }
      if (req.file == undefined) {
        res.redirect("index.html");
      } else {
        fileOriginale = req.file.originalname;
        var test = fileOriginale
          .substring(fileOriginale.length - 4)
          .toLowerCase();
        if (test === ".pdf") {
          //if (test === ".pdf" && found === null) {
          // const pdfParser = new PDFParser();
          // pdfParser.on("pdfParser_dataError", (errData) =>
          //   console.error(errData.parserError)
          // );
          // pdfParser.on("pdfParser_dataReady", (pdfData) => {
          //   const id = __dirname + "/sample.json";
          //   fs.writeFile(id, JSON.stringify(pdfData), (err) =>
          //     console.error(err)
          //   );
          //   //res.json(pdfData);
          // });
          // pdfParser.loadPDF(__dirname + "/" + fileOriginale.toString());
          //}
          // -----------------pdf2table-----------------
          //console.log("file", __dirname + "/" + fileOriginale.toString());
          fs.readFile(
            __dirname + "/" + fileOriginale.toString(),
            function (err, buffer) {
              if (err) return console.log(err);
              pdf2table.parse(buffer, function (err, rows, rowsdebug) {
                if (err) return console.log(err);
                fs.writeFileSync("sample2.json", JSON.stringify(rows));
              });
            }
          );
          //-----------------end pdf2table-------------------------
        }

        if (test === ".txt") {
          const readTxtFile = fs.readFileSync(fileOriginale, "utf-8");
          //console.log("readTxtFile", readTxtFile);
          fs.writeFileSync("sample.txt", readTxtFile);
        }
        res.redirect("index.html");
        res.end();
        return;
      }
    });
  });
} catch (err) {
  console.log(err);
  //return;
}

// Alimenta il contatore per 'shipmentNumber'

app.get("/apicounter", (req, res) => {
  var testReadCounter = fs.readFileSync("counter.txt", "utf8");
  res.send(testReadCounter);
});

app.post("/newcounter", (req, res) => {
  const newCounter = req.body;
  fs.writeFileSync("counter.txt", newCounter.dataTest.toString());
  res.json(newCounter.dataTest.toString());
});

// ----------WACKER POST-----------------
app.post("/apitwo", (req, res) => {
  const dataWacker = req.body;
  //console.log(dataWacker);
  xw = new XMLWriter(true);
  xw.startDocument("1.0", "UTF-8");
  xw.startElement("GasesShipment");
  xw.writeAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
  xw.writeAttribute("xsi:noNamespaceSchemaLocation", dataWacker.nameSpace);
  xw.writeAttribute("MaterialCode", dataWacker.partNumber);
  xw.writeAttribute("SupplierHoldingDesc", "LINDE PLC");
  xw.writeAttribute("ReceivingStPlant", dataWacker.receivingPlant);
  xw.writeAttribute("MpsSpecNo", dataWacker.materialSpec);
  xw.writeAttribute("MpsSpecRev", dataWacker.revisionSpec);
  xw.writeAttribute("ShipmentDate", dataWacker.shipmentdate);
  xw.writeAttribute("ShipmentNumber", dataWacker.shipmentNumber);
  xw.writeAttribute("ShipQty", 1);
  xw.startElement("Lot");
  xw.writeAttribute("SupplierSupplyChainSeqCode", "LINDE PLC-BURGHAUSEN-1585");
  xw.writeAttribute("ShipLotNo", dataWacker.lotNumber);
  xw.writeAttribute("ExpiryDate", dataWacker.expiryDate);
  xw.writeAttribute("MfgDate", dataWacker.manDate);
  xw.writeAttribute("LotQty", 1);
  if (dataWacker.receivingPlant === "Agrate") {
    xw.startElement("DIM_Carbon_dioxide_CO2");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataWacker.CO2value);
    xw.endElement();
    xw.endElement("DIM_Carbon_dioxide_CO2");
    xw.startElement("DIM_Carbon_monoxide_CO");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataWacker.COvalue);
    xw.endElement();
    xw.endElement("DIM_Carbon_monoxide_CO");
    xw.startElement("DIM_Iron_Fe");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataWacker.Fevalue);
    xw.endElement();
    xw.endElement("DIM_Iron_Fe");
    xw.startElement("DIM_Moisture_H2O");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataWacker.H2Ovalue);
    xw.endElement();
    xw.endElement("DIM_Moisture_H2O");
    xw.startElement("DIM_Nitrogen_N2 ");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataWacker.N2value);
    xw.endElement();
    xw.endElement("DIM_Nitrogen_N2 ");
    xw.startElement("DIM_Oxygen_plus_argon_O2_plus_Ar ");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataWacker.O2Arvalue);
    xw.endElement();
    xw.endElement("DIM_Oxygen_plus_argon_O2_plus_Ar ");
    xw.startElement("DIM_Total_hydrocarbon_as_CH4 ");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataWacker.CH4value);
    xw.endElement();
    xw.endElement("DIM_Total_hydrocarbon_as_CH4 ");
    xw.endDocument();
  }

  if (dataWacker.receivingPlant === "Catania") {
    xw.startElement("DIM_Nitrogen_N2 ");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataWacker.N2value);
    xw.endElement();
    xw.endElement("DIM_Nitrogen_N2 ");
    xw.startElement("DIM_Carbon_dioxide_CO2");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataWacker.CO2value);
    xw.endElement();
    xw.endElement("DIM_Carbon_dioxide_CO2");
    xw.startElement("DIM_Carbon_monoxide_CO");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataWacker.COvalue);
    xw.endElement();
    xw.endElement("DIM_Carbon_monoxide_CO");
    xw.startElement("DIM_Total_hydrocarbon_as_CH4 ");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataWacker.CH4value);
    xw.endElement();
    xw.endElement("DIM_Total_hydrocarbon_as_CH4 ");
    xw.startElement("DIM_Moisture_H2O");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataWacker.H2Ovalue);
    xw.endElement();
    xw.endElement("DIM_Moisture_H2O");
    xw.startElement("DIM_Oxygen_plus_argon_O2_plus_Ar ");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataWacker.O2Arvalue);
    xw.endElement();
    xw.endElement("DIM_Oxygen_plus_argon_O2_plus_Ar ");
    xw.startElement("DIM_Iron_Fe");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataWacker.Fevalue);
    xw.endElement();
    xw.endElement("DIM_Iron_Fe");
    xw.endDocument();
  }

  try {
    fs.writeFileSync("sourcename.txt", "Wacker");
    fileToBeDownloaded = dataWacker.lotNumber.toString() + ".xml";
    res.json(xw.toString());
    fs.writeFileSync(fileToBeDownloaded, xw.toString());
    fs.writeFileSync("Wfilename.txt", fileToBeDownloaded);
  } catch (e) {
    console.log("Error:", e.stack);
  }
});
//------------END WACKER POST------------

//-----------CHLORGAS POST-------------
app.post("/apiCS", (req, res) => {
  const dataCSPost = req.body;
  //console.log(dataCSPost);
  var zipCS = new AdmZip();
  for (let i = 0; i < dataCSPost.lotNumber.length; i++) {
    xw = new XMLWriter(true);
    xw.startDocument("1.0", "UTF-8");
    xw.startElement("GasesShipment");
    xw.writeAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    xw.writeAttribute(
      "xsi:noNamespaceSchemaLocation",
      "3GASCD43_DM00848634_06.xsd"
    );
    xw.writeAttribute("MaterialCode", "3GASCD43");
    xw.writeAttribute("SupplierHoldingDesc", "LINDE PLC");
    xw.writeAttribute("ReceivingStPlant", "Agrate");
    xw.writeAttribute("MpsSpecNo", "DM00848634_06");
    xw.writeAttribute("MpsSpecRev", "1.0");
    xw.writeAttribute("ShipmentDate", dataCSPost.shipment[i]);
    xw.writeAttribute("ShipmentNumber", dataCSPost.progressivoCS[i]);
    xw.writeAttribute("ShipQty", 1);
    xw.startElement("Lot");
    xw.writeAttribute(
      "SupplierSupplyChainSeqCode",
      "LINDE PLC-S/ CHLORGAS - Bitterfeld-Wolfen-1784"
    );
    xw.writeAttribute("ShipLotNo", dataCSPost.lotNumber[i]);
    xw.writeAttribute("ExpiryDate", dataCSPost.expiryDate[i]);
    xw.writeAttribute("MfgDate", dataCSPost.shipment[i]);
    xw.writeAttribute("LotQty", 1);
    xw.startElement("DIM_Carbon_dioxide_CO2");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataCSPost.CO2[i]);
    xw.endElement();
    xw.endElement("DIM_Carbon_dioxide_CO2");
    xw.startElement("DIM_Carbon_monoxide_CO");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataCSPost.CO[i]);
    xw.endElement();
    xw.endElement("DIM_Carbon_monoxide_CO");
    xw.startElement("DIM_Chlorine_CL2");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataCSPost.Cl2[i]);
    xw.endElement();
    xw.endElement("DIM_Chlorine_CL2");
    xw.startElement("DIM_Chlorinated_Hydrogencarbons_CXHYCL2");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataCSPost.CHCl2[i]);
    xw.endElement();
    xw.endElement("DIM_Chlorinated_Hydrogencarbons_CXHYCL2");
    xw.startElement("DIM_Iron_Fe");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", "0.4");
    xw.endElement();
    xw.endElement("DIM_Iron_Fe");
    xw.startElement("DIM_Methane_CH4 ");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", "0.8");
    xw.endElement();
    xw.endElement("DIM_Methane_CH4 ");
    xw.startElement("DIM_Moisture_H2O");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataCSPost.H2O[i]);
    xw.endElement();
    xw.endElement("DIM_Moisture_H2O");
    xw.startElement("DIM_Nitrogen_plus_Oxygen_plus_Argon_N2_plus_O2_plus_Ar ");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataCSPost.N2ArO2[i]);
    xw.endElement();
    xw.endElement("DIM_Nitrogen_plus_Oxygen_plus_Argon_N2_plus_O2_plus_Ar ");
    xw.startElement("DIM_Hydrogen_H2 ");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataCSPost.H2CS[i]);
    xw.endElement();
    xw.endElement("DIM_Hydrogen_H2 ");
    xw.endDocument();

    try {
      var fileToBeDownloaded = dataCSPost.filetext[i];
      //fileToBeDownloaded = fileToBeDownloaded.replace("/", "-");
      fileToBeDownloaded = fileToBeDownloaded + ".xml";
      //console.log("file to be dw", fileToBeDownloaded);
      fs.writeFileSync(fileToBeDownloaded, xw.toString());
      zipCS.addLocalFile(fileToBeDownloaded);
    } catch (e) {
      console.log("Error:", e.stack);
    }
  }
  fs.writeFileSync("sourcename.txt", "Chlorgas");
  zipCS.writeZip(/*target file name*/ "filesCS.zip");
});
//-----------END CHLORGAS POST-------------

//-----------POST from Hongin AGR-------------
app.post("/apiHIAGR", (req, res) => {
  const dataHIPost = req.body;
  //console.log(dataHIPost);
  var zipHI = new AdmZip();
  for (let i = 0; i < dataHIPost.filenamesHI.length; i++) {
    xw = new XMLWriter(true);
    xw.startDocument("1.0", "UTF-8");
    xw.startElement("GasesShipment");
    xw.writeAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    xw.writeAttribute(
      "xsi:noNamespaceSchemaLocation",
      "3GASCD26_DM0000775807_06.xsd"
    );
    xw.writeAttribute("MaterialCode", "3GASCD26");
    xw.writeAttribute("SupplierHoldingDesc", "LINDE PLC");
    xw.writeAttribute("ReceivingStPlant", "Agrate");
    xw.writeAttribute("MpsSpecNo", "DM0000775807_06");
    xw.writeAttribute("MpsSpecRev", "2.0");
    xw.writeAttribute("ShipmentDate", dataHIPost.shipmentDate[i]);
    xw.writeAttribute("ShipmentNumber", dataHIPost.progressivoHI[i]);
    xw.writeAttribute("ShipQty", 1);
    xw.startElement("Lot");
    xw.writeAttribute(
      "SupplierSupplyChainSeqCode",
      "LINDE PLC-HONG-IN CHEMICAL / Ulsan-1684"
    );
    xw.writeAttribute("ShipLotNo", dataHIPost.lotNumberHI[i]);
    xw.writeAttribute("ExpiryDate", dataHIPost.expDateHI[i]);
    xw.writeAttribute("MfgDate", dataHIPost.manDateHI[i]);
    xw.writeAttribute("LotQty", 1);
    xw.startElement("DIM_Carbon_dioxide_CO2");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPost.HICO2value[i]);
    xw.endElement();
    xw.endElement("DIM_Carbon_dioxide_CO2");
    xw.startElement("DIM_Carbon_monoxide_CO");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPost.HICOvalue[i]);
    xw.endElement();
    xw.endElement("DIM_Carbon_monoxide_CO");
    xw.startElement("DIM_Hydrogen_H2 ");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPost.HIH2value[i]);
    xw.endElement();
    xw.endElement("DIM_Hydrogen_H2 ");
    xw.startElement("DIM_Iron_Fe");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPost.HIFevalue[i]);
    xw.endElement();
    xw.endElement("DIM_Iron_Fe");
    xw.startElement("DIM_Moisture_H2O");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPost.HIH2Ovalue[i]);
    xw.endElement();
    xw.endElement("DIM_Moisture_H2O");
    xw.startElement("DIM_Nitrogen_N2 ");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPost.HIN2value[i]);
    xw.endElement();
    xw.endElement("DIM_Nitrogen_N2 ");
    xw.startElement("DIM_Oxygen_plus_argon_O2_plus_Ar ");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPost.HIO2Arvalue[i]);
    xw.endElement();
    xw.endElement("DIM_Oxygen_plus_argon_O2_plus_Ar ");
    xw.startElement("DIM_Total_hydrocarbon_as_CH4");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPost.HICH4value[i]);
    xw.endElement();
    xw.endElement("DIM_Total_hydrocarbon_as_CH4");
    xw.endDocument();
    //console.log("AGR eCOA", xw.toString());

    try {
      var HIfileToBeDownloaded = dataHIPost.filenamesHI[i];
      HIfileToBeDownloaded = HIfileToBeDownloaded.replace("/", "-");
      HIfileToBeDownloaded = HIfileToBeDownloaded + ".xml";
      //console.log("file to be dw", HIfileToBeDownloaded);
      fs.writeFileSync(HIfileToBeDownloaded, xw.toString());
      zipHI.addLocalFile(HIfileToBeDownloaded);
    } catch (e) {
      console.log("Error:", e.stack);
    }
  }
  fs.writeFileSync("sourcename.txt", "HongInAGR");
  zipHI.writeZip(/*target file name*/ "filesHIAGR.zip");
});
//-----------END POST from Hongin AGR-------------

//-----------POST from Hongin CAT-------------

app.post("/apiHICAT", (req, res) => {
  const dataHIPostCAT = req.body;
  //console.log(dataHIPostCAT);
  var zipHI = new AdmZip();
  for (let i = 0; i < dataHIPostCAT.filenamesHI.length; i++) {
    xw = new XMLWriter(true);
    xw.startDocument("1.0", "UTF-8");
    xw.startElement("GasesShipment");
    xw.writeAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    xw.writeAttribute(
      "xsi:noNamespaceSchemaLocation",
      "3GASCD35_DM00811559_06.xsd"
    );
    xw.writeAttribute("MaterialCode", "3GASCD35");
    xw.writeAttribute("SupplierHoldingDesc", "LINDE PLC");
    xw.writeAttribute("ReceivingStPlant", "Catania");
    xw.writeAttribute("MpsSpecNo", "DM00811559_06");
    xw.writeAttribute("MpsSpecRev", "1.0");
    xw.writeAttribute("ShipmentDate", dataHIPostCAT.shipmentDate[i]);
    xw.writeAttribute("ShipmentNumber", dataHIPostCAT.progressivoHI[i]);
    xw.writeAttribute("ShipQty", 1);
    xw.startElement("Lot");
    xw.writeAttribute(
      "SupplierSupplyChainSeqCode",
      "LINDE PLC-HONG-IN CHEMICAL / Ulsan-1684"
    );
    xw.writeAttribute("ShipLotNo", dataHIPostCAT.lotNumberHI[i]);
    xw.writeAttribute("ExpiryDate", dataHIPostCAT.expDateHI[i]);
    xw.writeAttribute("MfgDate", dataHIPostCAT.manDateHI[i]);
    xw.writeAttribute("LotQty", 1);
    xw.startElement("DIM_Aluminum_Al");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HIAlvalue[i]);
    xw.endElement();
    xw.endElement("DIM_Aluminum_Al");

    xw.startElement("DIM_Antimony_Sb");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HISbvalue[i]);
    xw.endElement();
    xw.endElement("DIM_Antimony_Sb");

    xw.startElement("DIM_Arsenic_As");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HIAsvalue[i]);
    xw.endElement();
    xw.endElement("DIM_Arsenic_As");

    xw.startElement("DIM_Bismuth_Bi");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HIBivalue[i]);
    xw.endElement();
    xw.endElement("DIM_Bismuth_Bi");

    xw.startElement("DIM_Boron_B");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HIBvalue[i]);
    xw.endElement();
    xw.endElement("DIM_Boron_B");

    xw.startElement("DIM_Cadmium_Cd");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HICdvalue[i]);
    xw.endElement();
    xw.endElement("DIM_Cadmium_Cd");

    xw.startElement("DIM_Carbon_dioxide_CO2");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HICO2value[i]);
    xw.endElement();
    xw.endElement("DIM_Carbon_dioxide_CO2");

    xw.startElement("DIM_Carbon_monoxide_CO");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HICOvalue[i]);
    xw.endElement();
    xw.endElement("DIM_Carbon_monoxide_CO");

    xw.startElement("DIM_Chromium_Cr");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HICrvalue[i]);
    xw.endElement();
    xw.endElement("DIM_Chromium_Cr");

    xw.startElement("DIM_Cobalt_Co");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HICovalue[i]);
    xw.endElement();
    xw.endElement("DIM_Cobalt_Co");

    xw.startElement("DIM_Copper_Cu");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HICuvalue[i]);
    xw.endElement();
    xw.endElement("DIM_Copper_Cu");

    xw.startElement("DIM_Hydrogen_H2 ");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HIH2value[i]);
    xw.endElement();
    xw.endElement("DIM_Hydrogen_H2 ");

    xw.startElement("DIM_Iron_Fe");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HIFevalue[i]);
    xw.endElement();
    xw.endElement("DIM_Iron_Fe");

    xw.startElement("DIM_Lead_Pb");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HIPbvalue[i]);
    xw.endElement();
    xw.endElement("DIM_Lead_Pb");

    xw.startElement("DIM_Moisture_H2O");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HIH2Ovalue[i]);
    xw.endElement();
    xw.endElement("DIM_Moisture_H2O");

    xw.startElement("DIM_Molybdenum_Mo");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HIMovalue[i]);
    xw.endElement();
    xw.endElement("DIM_Molybdenum_Mo");

    xw.startElement("DIM_Nickel_Ni");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HINivalue[i]);
    xw.endElement();
    xw.endElement("DIM_Nickel_Ni");

    xw.startElement("DIM_Nitrogen_N2 ");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HIN2value[i]);
    xw.endElement();
    xw.endElement("DIM_Nitrogen_N2 ");

    xw.startElement("DIM_Oxygen_plus_argon_O2_plus_Ar ");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HIO2Arvalue[i]);
    xw.endElement();
    xw.endElement("DIM_Oxygen_plus_argon_O2_plus_Ar ");

    xw.startElement("DIM_Phosphorus_P");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HIPvalue[i]);
    xw.endElement();
    xw.endElement("DIM_Phosphorus_P");

    xw.startElement("DIM_Sodium_Na");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HINavalue[i]);
    xw.endElement();
    xw.endElement("DIM_Sodium_Na");

    xw.startElement("DIM_Total_hydrocarbon_as_CH4");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HICH4value[i]);
    xw.endElement();
    xw.endElement("DIM_Total_hydrocarbon_as_CH4");

    xw.startElement("DIM_Zinc_Zn");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHIPostCAT.HiZnvalue[i]);
    xw.endElement();
    xw.endElement("DIM_Zinc_Zn");
    xw.endDocument();

    //console.log("CAT eCOA", xw.toString());

    try {
      var HIfileToBeDownloaded = dataHIPostCAT.filenamesHI[i];
      HIfileToBeDownloaded = HIfileToBeDownloaded.replace("/", "-");
      HIfileToBeDownloaded = HIfileToBeDownloaded + ".xml";
      //console.log("file to be dw", HIfileToBeDownloaded);
      fs.writeFileSync(HIfileToBeDownloaded, xw.toString());
      zipHI.addLocalFile(HIfileToBeDownloaded);
    } catch (e) {
      console.log("Error:", e.stack);
    }
  }
  fs.writeFileSync("sourcename.txt", "HongInCAT");
  zipHI.writeZip(/*target file name*/ "filesHICAT.zip");
});

//-----------END POST from Hongin CAT-------------

//-----------POST from TCS BURGHUASEN-------------

app.post("/apiTCS", (req, res) => {
  const dataTCSPost = req.body;
  //console.log(dataTCSPost);
  var zipTCS = new AdmZip();
  for (let i = 0; i < dataTCSPost.lotNumber.length; i++) {
    xw = new XMLWriter(true);
    xw.startDocument("1.0", "UTF-8");
    xw.startElement("GasesShipment");
    xw.writeAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    xw.writeAttribute(
      "xsi:noNamespaceSchemaLocation",
      "2CAG1211_DM00423514_09.xsd"
    );
    xw.writeAttribute("MaterialCode", "2CAG1211");
    xw.writeAttribute("SupplierHoldingDesc", "LINDE PLC");
    xw.writeAttribute("ReceivingStPlant", dataTCSPost.delivery[i]);
    xw.writeAttribute("MpsSpecNo", "DM00423514_09");
    xw.writeAttribute("MpsSpecRev", "4.0");
    xw.writeAttribute("ShipmentDate", dataTCSPost.shipment[i]);
    xw.writeAttribute("ShipmentNumber", dataTCSPost.progressivoTCS[i]);
    xw.writeAttribute("ShipQty", 1);
    xw.startElement("Lot");
    xw.writeAttribute(
      "SupplierSupplyChainSeqCode",
      "LINDE PLC-BURGHAUSEN-1282"
    );
    xw.writeAttribute("ShipLotNo", dataTCSPost.filetext[i]);
    xw.writeAttribute("ExpiryDate", dataTCSPost.expiryDate[i]);
    xw.writeAttribute("MfgDate", dataTCSPost.manDate[i]);
    xw.writeAttribute("LotQty", 1);

    xw.startElement("DIM_Acceptors_B");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataTCSPost.B[i]);
    xw.endElement();
    xw.endElement("DIM_Acceptors_B");

    xw.startElement("DIM_Aluminum_Al");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataTCSPost.Al[i]);
    xw.endElement();
    xw.endElement("DIM_Aluminum_Al");

    xw.startElement("DIM_Donors_P_As_Sb");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataTCSPost.PAsSb[i]);
    xw.endElement();
    xw.endElement("DIM_Donors_P_As_Sb");

    xw.startElement("DIM_Iron_Fe_Liquid_phase");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataTCSPost.Fe[i]);
    xw.endElement();
    xw.endElement("DIM_Iron_Fe_Liquid_phase");

    xw.startElement("DIM_Carbon_C");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataTCSPost.C[i]);
    xw.endElement();
    xw.endElement("DIM_Carbon_C");

    xw.startElement("DIM_Trichlorosilane_HSiCl3_Assay");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataTCSPost.TCSTCS[i]);
    xw.endElement();
    xw.endElement("DIM_Trichlorosilane_HSiCl3_Assay");
    xw.endDocument();

    //console.log("TCS eCOA", xw.toString());

    try {
      var TCSfileToBeDownloaded = dataTCSPost.filetext[i];
      TCSfileToBeDownloaded = TCSfileToBeDownloaded.replace("/", "-");
      TCSfileToBeDownloaded = TCSfileToBeDownloaded + ".xml";
      //console.log("file to be dw", HIfileToBeDownloaded);
      fs.writeFileSync(TCSfileToBeDownloaded, xw.toString());
      zipTCS.addLocalFile(TCSfileToBeDownloaded);
    } catch (e) {
      console.log("Error:", e.stack);
    }
  }
  fs.writeFileSync("sourcename.txt", "TCS Burghausen");
  zipTCS.writeZip(/*target file name*/ "filesTCS.zip");
});

//-----------END POST from TCS BURGHAUSEN-------------

//-----------POST from NO Taulov----------------

app.post("/apiNOTaulov", (req, res) => {
  const dataNOTPost = req.body;
  //console.log("dataNOTPost", dataNOTPost);
  var zipNOT = new AdmZip();
  for (let id = 0; id < dataNOTPost.filetext.length; id++) {
    xw = new XMLWriter(true);
    xw.startDocument("1.0", "UTF-8");
    xw.startElement("GasesShipment");
    xw.writeAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    xw.writeAttribute(
      "xsi:noNamespaceSchemaLocation",
      "3GASTD32_DM00798836_06.xsd"
    );
    xw.writeAttribute("MaterialCode", "3GASTD32");
    xw.writeAttribute("SupplierHoldingDesc", "LINDE PLC");
    xw.writeAttribute("ReceivingStPlant", "Catania");
    xw.writeAttribute("MpsSpecNo", "DM00798836_06");
    xw.writeAttribute("MpsSpecRev", "3.0");
    xw.writeAttribute("ShipmentDate", dataNOTPost.shipment[id]);
    xw.writeAttribute("ShipmentNumber", dataNOTPost.progressivoNO[id]);
    xw.writeAttribute("ShipQty", 1);
    xw.startElement("Lot");
    xw.writeAttribute("SupplierSupplyChainSeqCode", "LINDE PLC-TAULOV-1604");
    xw.writeAttribute("ShipLotNo", dataNOTPost.lotNumber[id]);
    xw.writeAttribute("ExpiryDate", dataNOTPost.expiryDate[id]);
    xw.writeAttribute("MfgDate", dataNOTPost.manDate[id]);
    xw.writeAttribute("LotQty", 1);
    xw.startElement("DIM_Carbon_dioxide_CO2");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataNOTPost.CO2[id]);
    xw.endElement();
    xw.endElement("DIM_Carbon_dioxide_CO2");
    xw.startElement("DIM_Moisture_H2O");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataNOTPost.H2O[id]);
    xw.endElement();
    xw.endElement("DIM_Moisture_H2O");
    xw.startElement("DIM_Nitrous_oxide_N2O");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataNOTPost.N2O[id]);
    xw.endElement();
    xw.endElement("DIM_Nitrous_oxide_N2O");
    xw.startElement("DIM_Nitrogen_dioxide_NO2");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataNOTPost.NO2[id]);
    xw.endElement();
    xw.endElement("DIM_Nitrogen_dioxide_NO2");
    xw.startElement("DIM_Nitrogen_N2");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataNOTPost.N2[id]);
    xw.endElement();
    xw.endElement("DIM_Nitrogen_N2");
    xw.endDocument();

    //console.log("xw", xw.toString());

    try {
      var fileToBeDownloaded = dataNOTPost.filetext[id];
      fileToBeDownloaded = fileToBeDownloaded.replace("/", "-");
      fileToBeDownloaded = fileToBeDownloaded + ".xml";
      //console.log("file to be dw", fileToBeDownloaded);
      fs.writeFileSync(fileToBeDownloaded, xw.toString());
      zipNOT.addLocalFile(fileToBeDownloaded);
    } catch (e) {
      console.log("Error:", e.stack);
    }
  }
  fs.writeFileSync("sourcename.txt", "Taulov");
  zipNOT.writeZip(/*target file name*/ "filesNOT.zip");
});

//-----------END POST from NO Taulov----------------

//-----------POST from HF Gerling Holz----------------
app.post("/apiHFGerling", (req, res) => {
  const dataHF = req.body;
  //console.log(dataHF);
  var zipHF = new AdmZip();
  for (let i = 0; i < dataHF.lotNumber.length; i++) {
    xw = new XMLWriter(true);
    xw.startDocument("1.0", "UTF-8");
    xw.startElement("GasesShipment");
    xw.writeAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    xw.writeAttribute(
      "xsi:noNamespaceSchemaLocation",
      "3GASCC21_DM00318670_06.xsd"
    );
    xw.writeAttribute("MaterialCode", "3GASCC21");
    xw.writeAttribute("SupplierHoldingDesc", "LINDE PLC");
    xw.writeAttribute("ReceivingStPlant", "Agrate");
    xw.writeAttribute("MpsSpecNo", "DM00318670_06");
    xw.writeAttribute("MpsSpecRev", "3.0");
    xw.writeAttribute("ShipmentDate", dataHF.shipmentdate);
    xw.writeAttribute("ShipmentNumber", dataHF.shipmentNumber[i]);
    xw.writeAttribute("ShipQty", 1);
    xw.startElement("Lot");
    xw.writeAttribute(
      "SupplierSupplyChainSeqCode",
      "LINDE PLC-S/ GERLING HOLZ -  Dormagen-1679"
    );
    xw.writeAttribute("ShipLotNo", dataHF.lotNumber[i]);
    xw.writeAttribute("ExpiryDate", dataHF.expiryDate[i]);
    xw.writeAttribute("MfgDate", dataHF.manDate[i]);
    xw.writeAttribute("LotQty", 1);
    xw.startElement("DIM_X_Assay ");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", "99.96");
    xw.endElement();
    xw.endElement("DIM_X_Assay");
    xw.startElement("DIM_Hexafluorosilic_acid_H2SIF6");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHF.H2SiF6value[i]);
    xw.endElement();
    xw.endElement("DIM_Hexafluorosilic_acid_H2SIF6");
    xw.startElement("DIM_Sulfur_dioxide_SO2");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHF.SO2value[i]);
    xw.endElement();
    xw.endElement("DIM_Sulfur_dioxide_SO2");
    xw.startElement("DIM_Sulfuric_acid_H2SO4");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHF.H2SO4value[i]);
    xw.endElement();
    xw.endElement("DIM_Sulfuric_acid_H2SO4");
    xw.startElement("DIM_Water_H2O");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHF.H2Ovalue[i]);
    xw.endElement();
    xw.endElement("DIM_Water_H2O");
    xw.endDocument();
    //console.log("xw", xw.toString());

    try {
      var fileToBeDownloaded = dataHF.filename[i];
      fileToBeDownloaded = fileToBeDownloaded.replace("/", "-");
      fileToBeDownloaded = fileToBeDownloaded + ".xml";
      //console.log("file to be dw", fileToBeDownloaded);
      fs.writeFileSync(fileToBeDownloaded, xw.toString());
      zipHF.addLocalFile(fileToBeDownloaded);
    } catch (e) {
      console.log("Error:", e.stack);
    }
  }
  fs.writeFileSync("sourcename.txt", "HFGerling");
  zipHF.writeZip(/*target file name*/ "filesHF.zip");
});

//-----------END POST HF Gerling Holz----------------

// ----------C4F8 POST-----------------
app.post("/apiC4F8", (req, res) => {
  const dataC4F8 = req.body;
  //console.log(dataC4F8);
  xw = new XMLWriter(true);
  xw.startDocument("1.0", "UTF-8");
  xw.startElement("GasesShipment");
  xw.writeAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
  xw.writeAttribute(
    "xsi:noNamespaceSchemaLocation",
    "3GASNC09_DM00614291_09.xsd"
  );
  xw.writeAttribute("MaterialCode", "3GASNC09");
  xw.writeAttribute("SupplierHoldingDesc", "LINDE PLC");
  xw.writeAttribute("ReceivingStPlant", dataC4F8.receivingPlant);
  xw.writeAttribute("MpsSpecNo", "DM00614291_09");
  xw.writeAttribute("MpsSpecRev", "1.0");
  xw.writeAttribute("ShipmentDate", dataC4F8.shipmentdate);
  xw.writeAttribute("ShipmentNumber", dataC4F8.shipmentNumber);
  xw.writeAttribute("ShipQty", 1);
  xw.startElement("Lot");
  xw.writeAttribute("SupplierSupplyChainSeqCode", "LINDE PLC-ALPHA-282");
  xw.writeAttribute("ShipLotNo", dataC4F8.lotNumber);
  xw.writeAttribute("ExpiryDate", dataC4F8.expiryDate);
  xw.writeAttribute("MfgDate", dataC4F8.manDate);
  xw.writeAttribute("LotQty", 1);
  xw.startElement("DIM_Acidity_as_HF");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataC4F8.acidityvalue);
  xw.endElement();
  xw.endElement("DIM_Acidity_as_HF");
  xw.startElement("DIM_Moisture_H2O");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataC4F8.H2Ovalue);
  xw.endElement();
  xw.endElement("DIM_Moisture_H2O");
  xw.startElement("DIM_Nitrogen_plus_Oxygen_N2_plus_O2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataC4F8.N2O2value);
  xw.endElement();
  xw.endElement("DIM_Nitrogen_plus_Oxygen_N2_plus_O2");
  xw.startElement("DIM_Other_CFC");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataC4F8.CFCvalue);
  xw.endElement();
  xw.endElement("DIM_Other_CFC");
  xw.endDocument();

  try {
    fs.writeFileSync("sourcename.txt", "C4F8Alpha");
    fileToBeDownloaded = dataC4F8.lotNumber.toString() + ".xml";
    res.json(xw.toString());
    fs.writeFileSync(fileToBeDownloaded, xw.toString());
    fs.writeFileSync("C4F8filename.txt", fileToBeDownloaded);
  } catch (e) {
    console.log("Error:", e.stack);
  }
});
//------------END C4F8 POST------------

//------------CF4 POST------------
app.post("/apiCF4", (req, res) => {
  const dataCF4 = req.body;
  //console.log(dataCF4);
  xw = new XMLWriter(true);
  xw.startDocument("1.0", "UTF-8");
  xw.startElement("GasesShipment");
  xw.writeAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
  xw.writeAttribute(
    "xsi:noNamespaceSchemaLocation",
    "3GASN409_DM00215312_06.xsd"
  );
  xw.writeAttribute("MaterialCode", "3GASN409");
  xw.writeAttribute("SupplierHoldingDesc", "LINDE PLC");
  xw.writeAttribute("ReceivingStPlant", "Agrate");
  xw.writeAttribute("MpsSpecNo", "DM00215312_06");
  xw.writeAttribute("MpsSpecRev", "4.0");
  xw.writeAttribute("ShipmentDate", dataCF4.shipmentdate);
  xw.writeAttribute("ShipmentNumber", dataCF4.shipmentNumber);
  xw.writeAttribute("ShipQty", 1);
  xw.startElement("Lot");
  xw.writeAttribute("SupplierSupplyChainSeqCode", "LINDE PLC-IMMINGHAM-285");
  xw.writeAttribute("ShipLotNo", dataCF4.lotNumber);
  xw.writeAttribute("ExpiryDate", dataCF4.expiryDate);
  xw.writeAttribute("MfgDate", dataCF4.manDate);
  xw.writeAttribute("LotQty", 1);
  xw.startElement("DIM_Carbon_monoxide_CO");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataCF4.COvalue);
  xw.endElement();
  xw.endElement("DIM_Carbon_monoxide_CO");
  xw.startElement("DIM_Nitrogen_N2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataCF4.N2value);
  xw.endElement();
  xw.endElement("DIM_Nitrogen_N2");
  xw.startElement("DIM_Oxygen_plus_argon_O2_plus_Ar");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataCF4.O2Arvalue);
  xw.endElement();
  xw.endElement("DIM_Oxygen_plus_argon_O2_plus_Ar");
  xw.startElement("DIM_Moisture_H2O");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataCF4.H2Ovalue);
  xw.endElement();
  xw.endElement("DIM_Moisture_H2O");
  xw.startElement("DIM_Carbon_dioxide_CO2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataCF4.CO2value);
  xw.endElement();
  xw.endElement("DIM_Carbon_dioxide_CO2");
  xw.startElement("DIM_Methane_CH4");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataCF4.CH4value);
  xw.endElement();
  xw.endElement("DIM_Methane_CH4");
  xw.startElement("DIM_Sulfur_hexafluoride_SF6");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataCF4.SF6value);
  xw.endElement();
  xw.endElement("DIM_Sulfur_hexafluoride_SF6");
  xw.startElement("DIM_Other_halocarbon_OHC");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataCF4.otherHCvalue);
  xw.endElement();
  xw.endElement("DIM_Other_halocarbon_OHC");
  xw.startElement("DIM_Acidity");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataCF4.acidityvalue);
  xw.endElement();
  xw.endElement("DIM_Acidity");
  xw.endDocument();

  try {
    fs.writeFileSync("sourcename.txt", "CF4BOC");
    fileToBeDownloaded = dataCF4.lotNumber.toString() + ".xml";
    res.json(xw.toString());
    fs.writeFileSync(fileToBeDownloaded, xw.toString());
    fs.writeFileSync("CF4filename.txt", fileToBeDownloaded);
  } catch (e) {
    console.log("Error:", e.stack);
  }
});
//------------END CF4 POST------------

//------------ F2KrNe POST------------

app.post("/apiF2KrNe", (req, res) => {
  const dataF2KrNe = req.body;
  //console.log(dataF2KrNe);
  xw = new XMLWriter(true);
  xw.startDocument("1.0", "UTF-8");
  xw.startElement("GasesShipment");
  xw.writeAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
  xw.writeAttribute(
    "xsi:noNamespaceSchemaLocation",
    "3GASC948_DM00249796_06.xsd"
  );
  xw.writeAttribute("MaterialCode", "3GASC948");
  xw.writeAttribute("SupplierHoldingDesc", "LINDE PLC");
  xw.writeAttribute("ReceivingStPlant", dataF2KrNe.receivingPlant);
  xw.writeAttribute("MpsSpecNo", "DM00249796_06");
  xw.writeAttribute("MpsSpecRev", "6.0");
  xw.writeAttribute("ShipmentDate", dataF2KrNe.shipmentdate);
  xw.writeAttribute("ShipmentNumber", dataF2KrNe.shipmentNumber);
  xw.writeAttribute("ShipQty", 1);
  xw.startElement("Lot");
  xw.writeAttribute("SupplierSupplyChainSeqCode", "LINDE PLC-ALPHA-282");
  xw.writeAttribute("ShipLotNo", dataF2KrNe.lotNumber);
  xw.writeAttribute("ExpiryDate", dataF2KrNe.expiryDate);
  xw.writeAttribute("MfgDate", dataF2KrNe.manDate);
  xw.writeAttribute("LotQty", 1);
  xw.startElement("DIM_Fluorine_F2_Assay");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2KrNe.F2percentvalue);
  xw.endElement();
  xw.endElement("DIM_Fluorine_F2_Assay");
  xw.startElement("DIM_Carbon_dioxide_CO2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2KrNe.CO2value);
  xw.endElement();
  xw.endElement("DIM_Carbon_dioxide_CO2");
  xw.startElement("DIM_Carbon_monoxide_CO");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2KrNe.COvalue);
  xw.endElement();
  xw.endElement("DIM_Carbon_monoxide_CO");
  xw.startElement("DIM_Sulfur_hexafluoride_SF6");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2KrNe.SF6value);
  xw.endElement();
  xw.endElement("DIM_Sulfur_hexafluoride_SF6");
  xw.startElement("DIM_Xenon_Xe");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2KrNe.Xevalue);
  xw.endElement();
  xw.endElement("DIM_Xenon_Xe");
  xw.startElement("DIM_Silicon_tetrafluoride_SiF4");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2KrNe.SiF4value);
  xw.endElement();
  xw.endElement("DIM_Silicon_tetrafluoride_SiF4");
  xw.startElement("DIM_Oxygen_O2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2KrNe.O2value);
  xw.endElement();
  xw.endElement("DIM_Oxygen_O2");
  xw.startElement("DIM_Methane_CH4");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2KrNe.CH4value);
  xw.endElement();
  xw.endElement("DIM_Methane_CH4");
  xw.startElement("DIM_Moisture_as_HF");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2KrNe.MoistureAsHFvalue);
  xw.endElement();
  xw.endElement("DIM_Moisture_as_HF4");
  xw.startElement("DIM_Nitrogen_trifluoride_NF3");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2KrNe.NF3value);
  xw.endElement();
  xw.endElement("DIM_Nitrogen_trifluoride_NF3");
  xw.startElement("DIM_Krypton_Kr_Assay");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2KrNe.Krpercentvalue);
  xw.endElement();
  xw.endElement("DIM_Krypton_Kr_Assay");
  xw.startElement("DIM_Nitrogen_N2 ");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2KrNe.N2value);
  xw.endElement();
  xw.endElement("DIM_Nitrogen_N2 ");
  xw.startElement("DIM_Helium_He");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2KrNe.Hevalue);
  xw.endElement();
  xw.endElement("DIM_Helium_He");
  xw.startElement("DIM_Carbonyl_fluoride_COF2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2KrNe.COF2value);
  xw.endElement();
  xw.endElement("DIM_Carbonyl_fluoride_COF2");
  xw.startElement("DIM_Carbon_tetrafluoride_CF4");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2KrNe.CF4value);
  xw.endElement();
  xw.endElement("DIM_Carbon_tetrafluoride_CF4");
  xw.endDocument();

  try {
    fs.writeFileSync("sourcename.txt", "F2KrNe");
    fileToBeDownloaded = dataF2KrNe.lotNumber.toString() + ".xml";
    res.json(xw.toString());
    fs.writeFileSync(fileToBeDownloaded, xw.toString());
    fs.writeFileSync("F2KrNefilename.txt", fileToBeDownloaded);
  } catch (e) {
    console.log("Error:", e.stack);
  }
});
//------------ END F2KrNe POST------------

//------------ F2ArNe POST------------

app.post("/apiF2ArNe", (req, res) => {
  const dataF2ArNe = req.body;
  //console.log(dataF2ArNe);
  xw = new XMLWriter(true);
  xw.startDocument("1.0", "UTF-8");
  xw.startElement("GasesShipment");
  xw.writeAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
  xw.writeAttribute(
    "xsi:noNamespaceSchemaLocation",
    "3GASC949_DM00233164_06.xsd"
  );
  xw.writeAttribute("MaterialCode", "3GASC949");
  xw.writeAttribute("SupplierHoldingDesc", "LINDE PLC");
  xw.writeAttribute("ReceivingStPlant", "Agrate");
  xw.writeAttribute("MpsSpecNo", "DM00233164_06");
  xw.writeAttribute("MpsSpecRev", "4.0");
  xw.writeAttribute("ShipmentDate", dataF2ArNe.shipmentdate);
  xw.writeAttribute("ShipmentNumber", dataF2ArNe.shipmentNumber);
  xw.writeAttribute("ShipQty", 1);
  xw.startElement("Lot");
  xw.writeAttribute("SupplierSupplyChainSeqCode", "LINDE PLC-ALPHA-282");
  xw.writeAttribute("ShipLotNo", dataF2ArNe.lotNumber);
  xw.writeAttribute("ExpiryDate", dataF2ArNe.expiryDate);
  xw.writeAttribute("MfgDate", dataF2ArNe.manDate);
  xw.writeAttribute("LotQty", 1);
  xw.startElement("DIM_Fluorine_F2_Assay");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2ArNe.F2percentvalue);
  xw.endElement();
  xw.endElement("DIM_Fluorine_F2_Assay");
  xw.startElement("DIM_Carbon_dioxide_CO2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2ArNe.CO2value);
  xw.endElement();
  xw.endElement("DIM_Carbon_dioxide_CO2");
  xw.startElement("DIM_Carbon_monoxide_CO");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2ArNe.COvalue);
  xw.endElement();
  xw.endElement("DIM_Carbon_monoxide_CO");
  xw.startElement("DIM_Sulfur_hexafluoride_SF6");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2ArNe.SF6value);
  xw.endElement();
  xw.endElement("DIM_Sulfur_hexafluoride_SF6");
  xw.startElement("DIM_Xenon_Xe");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2ArNe.Xevalue);
  xw.endElement();
  xw.endElement("DIM_Xenon_Xe");
  xw.startElement("DIM_Oxygen_O2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2ArNe.O2value);
  xw.endElement();
  xw.endElement("DIM_Oxygen_O2");
  xw.startElement("DIM_Moisture_as_HF");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2ArNe.MoistureAsHFvalue);
  xw.endElement();
  xw.endElement("DIM_Moisture_as_HF4");
  xw.startElement("DIM_Nitrogen_trifluoride_NF3");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2ArNe.NF3value);
  xw.endElement();
  xw.endElement("DIM_Nitrogen_trifluoride_NF3");
  xw.startElement("DIM_Carbon_tetrafluoride_CF4");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2ArNe.CF4value);
  xw.endElement();
  xw.endElement("DIM_Carbon_tetrafluoride_CF4");
  xw.startElement("DIM_Nitrogen_N2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2ArNe.N2value);
  xw.endElement();
  xw.endElement("DIM_Nitrogen_N2");
  xw.startElement("DIM_Argon_Ar_Assay");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2ArNe.Arpercentvalue);
  xw.endElement();
  xw.endElement("DIM_Argon_Ar_Assay");
  xw.startElement("DIM_Total_hydrocarbon_THC");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2ArNe.THCvalue);
  xw.endElement();
  xw.endElement("DIM_Total_hydrocarbon_THC");
  xw.startElement("DIM_Helium_He");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2ArNe.Hevalue);
  xw.endElement();
  xw.endElement("DIM_Helium_He");
  xw.startElement("DIM_Carbonyl_fluoride_COF2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2ArNe.COF2value);
  xw.endElement();
  xw.endElement("DIM_Carbonyl_fluoride_COF2");
  xw.startElement("DIM_Silicon_tetrafluoride_SiF4");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataF2ArNe.SiF4value);
  xw.endElement();
  xw.endElement("DIM_Silicon_tetrafluoride_SiF4");
  xw.endDocument();

  try {
    fs.writeFileSync("sourcename.txt", "F2ArNe");
    fileToBeDownloaded = dataF2ArNe.lotNumber.toString() + ".xml";
    res.json(xw.toString());
    fs.writeFileSync(fileToBeDownloaded, xw.toString());
    fs.writeFileSync("F2ArNefilename.txt", fileToBeDownloaded);
  } catch (e) {
    console.log("Error:", e.stack);
  }
});

//------------ END F2ArNe POST------------

//------------ HBr POST------------
app.post("/apiHBr", (req, res) => {
  const dataHBr = req.body;
  //console.log(dataHBr);
  xw = new XMLWriter(true);
  xw.startDocument("1.0", "UTF-8");
  xw.startElement("GasesShipment");
  xw.writeAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
  xw.writeAttribute(
    "xsi:noNamespaceSchemaLocation",
    "3GASCD07_DM00598023_06.xsd"
  );
  xw.writeAttribute("MaterialCode", "3GASCD07");
  xw.writeAttribute("SupplierHoldingDesc", "LINDE PLC");
  xw.writeAttribute("ReceivingStPlant", "Catania");
  xw.writeAttribute("MpsSpecNo", "DM00598023_06");
  xw.writeAttribute("MpsSpecRev", "2.0");
  xw.writeAttribute("ShipmentDate", dataHBr.shipment);
  xw.writeAttribute("ShipmentNumber", dataHBr.progressivoHBr);
  xw.writeAttribute("ShipQty", 1);
  xw.startElement("Lot");
  xw.writeAttribute(
    "SupplierSupplyChainSeqCode",
    "LINDE PLC-UNTERSCHLEISSHEIM-290"
  );
  xw.writeAttribute("ShipLotNo", dataHBr.lotNumber);
  xw.writeAttribute("ExpiryDate", dataHBr.expiryDate);
  xw.writeAttribute("MfgDate", dataHBr.manDate);
  xw.writeAttribute("LotQty", 1);
  xw.startElement("DIM_Iron_Fe");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataHBr.Fe);
  xw.endElement();
  xw.endElement("DIM_Iron_Fe");
  xw.startElement("DIM_Carbon_dioxide_CO2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataHBr.CO2);
  xw.endElement();
  xw.endElement("DIM_Carbon_dioxide_CO2");
  xw.startElement("DIM_Carbon_monoxide_CO");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataHBr.CO);
  xw.endElement();
  xw.endElement("DIM_Carbon_monoxide_CO");
  xw.startElement("DIM_Moisture_H2O");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataHBr.H2O);
  xw.endElement();
  xw.endElement("DIM_Moisture_H2O");
  xw.startElement("DIM_Nitrogen_N2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataHBr.N2);
  xw.endElement();
  xw.endElement("DIM_Nitrogen_N2");
  xw.startElement("DIM_Oxygen_O2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataHBr.O2);
  xw.endElement();
  xw.endElement("DIM_Oxygen_O2");
  xw.startElement("DIM_Total_hydrocarbon_as_CH4");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataHBr.CH4);
  xw.endElement();
  xw.endElement("DIM_Total_hydrocarbon_as_CH4");
  xw.startElement("DIM_Hydrogen_chloride_HCl");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", "2000");
  xw.endElement();
  xw.endElement("DIM_Hydrogen_chloride_HCl");
  xw.endDocument();

  try {
    fs.writeFileSync("sourcename.txt", "HBr");
    fileToBeDownloaded = dataHBr.filetext.toString() + ".xml";
    //res.json(xw.toString());
    fs.writeFileSync(fileToBeDownloaded, xw.toString());
    fs.writeFileSync("HBrfilename.txt", fileToBeDownloaded);
  } catch (e) {
    console.log("Error:", e.stack);
  }
});
//------------ END HBr POST------------

//------------ Kr/Ne POST------------

app.post("/apiKrNe", (req, res) => {
  const dataKrNe = req.body;
  //console.log(dataKrNe);
  xw = new XMLWriter(true);
  xw.startDocument("1.0", "UTF-8");
  xw.startElement("GasesShipment");
  xw.writeAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
  xw.writeAttribute(
    "xsi:noNamespaceSchemaLocation",
    "3GASN997_DM00403479_09.xsd"
  );
  xw.writeAttribute("MaterialCode", "3GASN997");
  xw.writeAttribute("SupplierHoldingDesc", "LINDE PLC");
  xw.writeAttribute("ReceivingStPlant", dataKrNe.receivingPlant);
  xw.writeAttribute("MpsSpecNo", "DM00403479_09");
  xw.writeAttribute("MpsSpecRev", "3.0");
  xw.writeAttribute("ShipmentDate", dataKrNe.shipmentdate);
  xw.writeAttribute("ShipmentNumber", dataKrNe.shipmentNumber);
  xw.writeAttribute("ShipQty", 1);
  xw.startElement("Lot");
  xw.writeAttribute("SupplierSupplyChainSeqCode", "LINDE PLC-ALPHA-282");
  xw.writeAttribute("ShipLotNo", dataKrNe.lotNumber);
  xw.writeAttribute("ExpiryDate", dataKrNe.expiryDate);
  xw.writeAttribute("MfgDate", dataKrNe.manDate);
  xw.writeAttribute("LotQty", 1);
  xw.startElement("DIM_Carbon_tetrafluoride_CF4");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataKrNe.CF4value);
  xw.endElement();
  xw.endElement("DIM_Carbon_tetrafluoride_CF4");
  xw.startElement("DIM_Carbon_dioxide_CO2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataKrNe.CO2value);
  xw.endElement();
  xw.endElement("DIM_Carbon_dioxide_CO2");
  xw.startElement("DIM_Carbon_monoxide_CO");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataKrNe.COvalue);
  xw.endElement();
  xw.endElement("DIM_Carbon_monoxide_CO");
  xw.startElement("DIM_Krypton_Kr_Assay");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataKrNe.Krpercentvalue);
  xw.endElement();
  xw.endElement("DDIM_Krypton_Kr_Assay");
  xw.startElement("DIM_Xenon_Xe");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataKrNe.Xevalue);
  xw.endElement();
  xw.endElement("DIM_Xenon_Xe");
  xw.startElement("DIM_Oxygen_O2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataKrNe.O2value);
  xw.endElement();
  xw.endElement("DIM_Oxygen_O2");
  xw.startElement("DIM_Nitrogen_N2 ");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataKrNe.N2value);
  xw.endElement();
  xw.endElement("DIM_Nitrogen_N2 ");
  xw.startElement("DIM_Helium_He");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataKrNe.Hevalue);
  xw.endElement();
  xw.endElement("DIM_Helium_He");
  xw.startElement("DIM_Moisture_H2O");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataKrNe.H2Ovalue);
  xw.endElement();
  xw.endElement("DIM_Moisture_H2O");
  xw.startElement("DIM_Methane_CH4");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataKrNe.CH4value);
  xw.endElement();
  xw.endElement("DIM_Methane_CH4");
  xw.endDocument();

  try {
    fs.writeFileSync("sourcename.txt", "KrNe");
    fileToBeDownloaded = dataKrNe.filename.toString() + ".xml";
    res.json(xw.toString());
    fs.writeFileSync(fileToBeDownloaded, xw.toString());
    fs.writeFileSync("KrNefilename.txt", fileToBeDownloaded);
  } catch (e) {
    console.log("Error:", e.stack);
  }
});

//------------ END Kr/Ne POST------------

//------------SF6 LEL/US 3GASN906 CAT POST------------
app.post("/apiSF6US", (req, res) => {
  const dataSF6US = req.body;
  //console.log(dataSF6US);
  xw = new XMLWriter(true);
  xw.startDocument("1.0", "UTF-8");
  xw.startElement("GasesShipment");
  xw.writeAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
  xw.writeAttribute(
    "xsi:noNamespaceSchemaLocation",
    "3GASN906_DM00599701_06.xsd"
  );
  xw.writeAttribute("MaterialCode", "3GASN906");
  xw.writeAttribute("SupplierHoldingDesc", "LINDE PLC");
  xw.writeAttribute("ReceivingStPlant", "Catania");
  xw.writeAttribute("MpsSpecNo", "DM00599701_06");
  xw.writeAttribute("MpsSpecRev", "1.0");
  xw.writeAttribute("ShipmentDate", dataSF6US.shipmentdate);
  xw.writeAttribute("ShipmentNumber", dataSF6US.shipmentNumber);
  xw.writeAttribute("ShipQty", 1);
  xw.startElement("Lot");
  xw.writeAttribute("SupplierSupplyChainSeqCode", "LINDE PLC-ALPHA-282");
  xw.writeAttribute("ShipLotNo", dataSF6US.lotNumber);
  xw.writeAttribute("ExpiryDate", dataSF6US.expiryDate);
  xw.writeAttribute("MfgDate", dataSF6US.manDate);
  xw.writeAttribute("LotQty", 1);
  xw.startElement("DIM_Sulfur_hexafluoride_SF6_Assay ");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataSF6US.SF6percentvalue);
  xw.endElement();
  xw.endElement("DIM_Sulfur_hexafluoride_SF6_Assay C");
  xw.startElement("DIM_Carbon_dioxide_CO2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataSF6US.CO2value);
  xw.endElement();
  xw.endElement("DIM_Carbon_dioxide_CO2");
  xw.startElement("DIM_Carbon_monoxide_CO");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataSF6US.COvalue);
  xw.endElement();
  xw.endElement("DIM_Carbon_monoxide_CO");
  xw.startElement("DIM_Moisture_H2O");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataSF6US.H2Ovalue);
  xw.endElement();
  xw.endElement("DIM_Moisture_H2O");
  xw.startElement("DIM_Nitrogen_N2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataSF6US.N2value);
  xw.endElement();
  xw.endElement("DIM_Nitrogen_N2");
  xw.startElement("DIM_Oxygen_plus_argon_O2_plus_Ar");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataSF6US.O2Arvalue);
  xw.endElement();
  xw.endElement("DIM_Oxygen_plus_argon_O2_plus_Ar");
  xw.startElement("DIM_Tetrafluoromethane_CF4 ");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataSF6US.CF4value);
  xw.endElement();
  xw.endElement("DIM_Tetrafluoromethane_CF4 ");
  xw.endDocument();

  try {
    fs.writeFileSync("sourcename.txt", "SF6US");
    fileToBeDownloaded = dataSF6US.filename.toString() + ".xml";
    res.json(xw.toString());
    fs.writeFileSync(fileToBeDownloaded, xw.toString());
    fs.writeFileSync("SF6USfilename.txt", fileToBeDownloaded);
  } catch (e) {
    console.log("Error:", e.stack);
  }
});
//------------END SF6 LEL/US 3GASN906 CAT POST------------

//------------SF6 BOC 3GASN326 CAT POST------------
app.post("/apiSF6BOC", (req, res) => {
  const dataSF6BOC = req.body;
  //console.log(dataSF6BOC);
  xw = new XMLWriter(true);
  xw.startDocument("1.0", "UTF-8");
  xw.startElement("GasesShipment");
  xw.writeAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
  xw.writeAttribute(
    "xsi:noNamespaceSchemaLocation",
    "3GASN326_DM00568217_06.xsd"
  );
  xw.writeAttribute("MaterialCode", "3GASN326");
  xw.writeAttribute("SupplierHoldingDesc", "LINDE PLC");
  xw.writeAttribute("ReceivingStPlant", "Catania");
  xw.writeAttribute("MpsSpecNo", "DM00568217_06");
  xw.writeAttribute("MpsSpecRev", "2.0");
  xw.writeAttribute("ShipmentDate", dataSF6BOC.shipmentdate);
  xw.writeAttribute("ShipmentNumber", dataSF6BOC.shipmentNumber);
  xw.writeAttribute("ShipQty", 1);
  xw.startElement("Lot");
  xw.writeAttribute("SupplierSupplyChainSeqCode", "LINDE PLC-IMMINGHAM-285");
  xw.writeAttribute("ShipLotNo", dataSF6BOC.lotNumber);
  xw.writeAttribute("ExpiryDate", dataSF6BOC.expiryDate);
  xw.writeAttribute("MfgDate", dataSF6BOC.manDate);
  xw.writeAttribute("LotQty", 1);
  xw.startElement("DIM_Carbon_dioxide_CO2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataSF6BOC.CO2value);
  xw.endElement();
  xw.endElement("DIM_Carbon_dioxide_CO2");
  xw.startElement("DIM_Carbon_monoxide_CO");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataSF6BOC.COvalue);
  xw.endElement();
  xw.endElement("DIM_Carbon_monoxide_CO");
  xw.startElement("DIM_Carbon_tetrafluoride_CF4");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataSF6BOC.CF4value);
  xw.endElement();
  xw.endElement("DIM_Carbon_tetrafluoride_CF4");
  xw.startElement("DIM_Moisture_H2O");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataSF6BOC.H2Ovalue);
  xw.endElement();
  xw.endElement("DIM_Moisture_H2O");
  xw.startElement("DIM_Nitrogen_N2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataSF6BOC.N2value);
  xw.endElement();
  xw.endElement("DIM_Nitrogen_N2");
  xw.startElement("DIM_Oxygen_plus_argon_O2_plus_Ar");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataSF6BOC.O2Arvalue);
  xw.endElement();
  xw.endElement("DIM_Oxygen_plus_argon_O2_plus_Ar");
  xw.startElement("DIM_Sulfur_hexafluoride_SF6");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataSF6BOC.SF6percentvalue);
  xw.endElement();
  xw.endElement("DIM_Sulfur_hexafluoride_SF6");
  xw.endDocument();

  try {
    fs.writeFileSync("sourcename.txt", "SF6BOC");
    fileToBeDownloaded = dataSF6BOC.filename.toString() + ".xml";
    res.json(xw.toString());
    fs.writeFileSync(fileToBeDownloaded, xw.toString());
    fs.writeFileSync("SF6BOCfilename.txt", fileToBeDownloaded);
  } catch (e) {
    console.log("Error:", e.stack);
  }
});
//------------END SF6 BOC 3GASN326 CAT POST------------

//------------HF Medford 1.8Kg 3GASC254 AGR  POST------------

app.post("/apiHF18US", (req, res) => {
  const dataHFUSPost = req.body;
  //console.log("dataHFUSPost", dataHFUSPost);
  var zipHFUS = new AdmZip();
  for (let id = 0; id < dataHFUSPost.filetext.length; id++) {
    xw = new XMLWriter(true);
    xw.startDocument("1.0", "UTF-8");
    xw.startElement("GasesShipment");
    xw.writeAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    xw.writeAttribute(
      "xsi:noNamespaceSchemaLocation",
      "3GASC254_DM00403787_06.xsd"
    );
    xw.writeAttribute("MaterialCode", "3GASC254");
    xw.writeAttribute("SupplierHoldingDesc", "LINDE PLC");
    xw.writeAttribute("ReceivingStPlant", "Agrate");
    xw.writeAttribute("MpsSpecNo", "DM00403787_06");
    xw.writeAttribute("MpsSpecRev", "3.0");
    xw.writeAttribute("ShipmentDate", dataHFUSPost.shipment[id]);
    xw.writeAttribute("ShipmentNumber", dataHFUSPost.progressivoHF[id]);
    xw.writeAttribute("ShipQty", 1);
    xw.startElement("Lot");
    xw.writeAttribute(
      "SupplierSupplyChainSeqCode",
      "LINDE PLC-WHITE CITY (MEDFORD)-291"
    );
    xw.writeAttribute("ShipLotNo", dataHFUSPost.lotNumber[id]);
    xw.writeAttribute("ExpiryDate", dataHFUSPost.expiryDate[id]);
    xw.writeAttribute("MfgDate", dataHFUSPost.manDate[id]);
    xw.writeAttribute("LotQty", 1);
    xw.writeAttribute("ContainerID", dataHFUSPost.lotNumber[id]);
    xw.startElement("DIM_Chloride_CL");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.Cl2HF[id]);
    xw.endElement();
    xw.endElement("DIM_Chloride_CL");

    xw.startElement("DIM_Phosphate_PO4");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", "0.04");
    xw.endElement();
    xw.endElement("DIM_Phosphate_PO4");
    xw.startElement("DIM_Potassium_K");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.KHF[id]);
    xw.endElement();
    xw.endElement("DIM_Potassium_K");
    xw.startElement("DIM_Copper_Cu");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.CuHF[id]);
    xw.endElement();
    xw.endElement("DIM_Copper_Cu");
    xw.startElement("DIM_Nitrate_NO3");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", "0.03");
    xw.endElement();
    xw.endElement("DIM_Nitrate_NO3");

    xw.startElement("DIM_Iron_Fe");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.FeHF[id]);
    xw.endElement();
    xw.endElement("DIM_Iron_Fe");

    xw.startElement("DIM_Fluorosilicic_Acid_H2Si2F6");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.FHF[id]);
    xw.endElement();
    xw.endElement("DIM_Fluorosilicic_Acid_H2Si2F6");

    xw.startElement("DIM_Sulfate_SO4");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", "0.016");
    xw.endElement();
    xw.endElement("DIM_Sulfate_SO4");

    xw.startElement("DIM_Nickel_Ni");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.NiHF[id]);
    xw.endElement();
    xw.endElement("DIM_Nickel_Ni");

    xw.startElement("DIM_Sodium_Na");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.NaHF[id]);
    xw.endElement();
    xw.endElement("DIM_Sodium_Na");

    xw.startElement("DIM_Lead_Pb");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.PbHF[id]);
    xw.endElement();
    xw.endElement("DIM_Lead_Pb");

    xw.startElement("DIM_Arsenic_As");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.AsHF[id]);
    xw.endElement();
    xw.endElement("DIM_Arsenic_As");

    xw.startElement("DIM_Moisture_H2O");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.H2OHF[id]);
    xw.endElement();
    xw.endElement("DIM_Moisture_H2O");
    xw.endDocument();

    //console.log("xw", xw.toString());

    try {
      var fileToBeDownloaded = dataHFUSPost.filetext[id];
      fileToBeDownloaded = fileToBeDownloaded.replace("/", "-");
      fileToBeDownloaded = fileToBeDownloaded + ".xml";
      //console.log("file to be dw", fileToBeDownloaded);
      fs.writeFileSync(fileToBeDownloaded, xw.toString());
      zipHFUS.addLocalFile(fileToBeDownloaded);
    } catch (e) {
      console.log("Error:", e.stack);
    }
  }
  fs.writeFileSync("sourcename.txt", "HF18US");
  zipHFUS.writeZip(/*target file name*/ "filesHFUS.zip");
});

app.post("/apiHF36US", (req, res) => {
  const dataHFUSPost = req.body;
  //console.log("dataHFUSPost", dataHFUSPost);
  var zipHFUS = new AdmZip();
  for (let id = 0; id < dataHFUSPost.filetext.length; id++) {
    xw = new XMLWriter(true);
    xw.startDocument("1.0", "UTF-8");
    xw.startElement("GasesShipment");
    xw.writeAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    xw.writeAttribute(
      "xsi:noNamespaceSchemaLocation",
      "3GASCB78_DM00650121_06.xsd"
    );
    xw.writeAttribute("MaterialCode", "3GASCB78");
    xw.writeAttribute("SupplierHoldingDesc", "LINDE PLC");
    xw.writeAttribute("ReceivingStPlant", "Agrate");
    xw.writeAttribute("MpsSpecNo", "DM00650121_06");
    xw.writeAttribute("MpsSpecRev", "1.0");
    xw.writeAttribute("ShipmentDate", dataHFUSPost.shipment[id]);
    xw.writeAttribute("ShipmentNumber", dataHFUSPost.progressivoHF[id]);
    xw.writeAttribute("ShipQty", 1);
    xw.startElement("Lot");
    xw.writeAttribute(
      "SupplierSupplyChainSeqCode",
      "LINDE PLC-WHITE CITY (MEDFORD)-291"
    );
    xw.writeAttribute("ShipLotNo", dataHFUSPost.lotNumber[id]);
    xw.writeAttribute("ExpiryDate", dataHFUSPost.expiryDate[id]);
    xw.writeAttribute("MfgDate", dataHFUSPost.manDate[id]);
    xw.writeAttribute("LotQty", 1);

    xw.startElement("DIM_Acidity_as_HF");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.acidHF[id]);
    xw.endElement();
    xw.endElement("DIM_Acidity_as_HF");

    xw.startElement("DIM_Arsenic_As");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.AsHF[id]);
    xw.endElement();
    xw.endElement("DIM_Arsenic_As");

    xw.startElement("DIM_Chloride_Cl");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.Cl2HF[id]);
    xw.endElement();
    xw.endElement("DIM_Chloride_Cl");

    xw.startElement("DIM_Copper_Cu");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.CuHF[id]);
    xw.endElement();
    xw.endElement("DIM_Copper_Cu");

    xw.startElement("DIM_Fluorosilicic_Acid_H2Si2F6");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.FHF[id]);
    xw.endElement();
    xw.endElement("DIM_Fluorosilicic_Acid_H2Si2F6");

    xw.startElement("DIM_Hydrogen_fluoride_HF");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.HFHF[id]);
    xw.endElement();
    xw.endElement("DIM_Hydrogen_fluoride_HF");

    xw.startElement("DIM_Iron_Fe");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.FeHF[id]);
    xw.endElement();
    xw.endElement("DIM_Iron_Fe");

    xw.startElement("DIM_Lead_Pb");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.PbHF[id]);
    xw.endElement();
    xw.endElement("DIM_Lead_Pb");

    xw.startElement("DIM_Moisture_as_HF");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.H2OHF[id]);
    xw.endElement();
    xw.endElement("DIM_Moisture_as_HF");

    xw.startElement("DIM_Nickel_Ni");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.NiHF[id]);
    xw.endElement();
    xw.endElement("DIM_Nickel_Ni");

    xw.startElement("DIM_Potassium_K");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.KHF[id]);
    xw.endElement();
    xw.endElement("DIM_Potassium_K");

    xw.startElement("DIM_Sodium_Na");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.NaHF[id]);
    xw.endElement();
    xw.endElement("DIM_Sodium_Na");

    xw.startElement("DIM_Sulfur_dioxide_SO2");
    xw.startElement("RAW");
    xw.writeAttribute("VALUE", dataHFUSPost.SO2HF[id]);
    xw.endElement();
    xw.endElement("DIM_Sulfur_dioxide_SO2");

    xw.endDocument();

    //console.log("xw", xw.toString());

    try {
      var fileToBeDownloaded = dataHFUSPost.filetext[id];
      fileToBeDownloaded = fileToBeDownloaded.replace("/", "-");
      fileToBeDownloaded = fileToBeDownloaded + ".xml";
      //console.log("file to be dw", fileToBeDownloaded);
      fs.writeFileSync(fileToBeDownloaded, xw.toString());
      zipHFUS.addLocalFile(fileToBeDownloaded);
    } catch (e) {
      console.log("Error:", e.stack);
    }
  }
  fs.writeFileSync("sourcename.txt", "HF36US");
  zipHFUS.writeZip(/*target file name*/ "filesHFUS.zip");
});

//------------ ArXeNe POST------------

app.post("/apiArXeNe", (req, res) => {
  const dataArXeNe = req.body;
  //console.log(dataArXeNe);
  xw = new XMLWriter(true);
  xw.startDocument("1.0", "UTF-8");
  xw.startElement("GasesShipment");
  xw.writeAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
  xw.writeAttribute(
    "xsi:noNamespaceSchemaLocation",
    "3GASN934_DM00443847_09.xsd"
  );
  xw.writeAttribute("MaterialCode", "3GASN934");
  xw.writeAttribute("SupplierHoldingDesc", "LINDE PLC");
  xw.writeAttribute("ReceivingStPlant", "Agrate");
  xw.writeAttribute("MpsSpecNo", "DM00443847_09");
  xw.writeAttribute("MpsSpecRev", "3.0");
  xw.writeAttribute("ShipmentDate", dataArXeNe.shipmentdate);
  xw.writeAttribute("ShipmentNumber", dataArXeNe.shipmentNumber);
  xw.writeAttribute("ShipQty", 1);
  xw.startElement("Lot");
  xw.writeAttribute("SupplierSupplyChainSeqCode", "LINDE PLC-ALPHA-282");
  xw.writeAttribute("ShipLotNo", dataArXeNe.lotNumber);
  xw.writeAttribute("ExpiryDate", dataArXeNe.expiryDate);
  xw.writeAttribute("MfgDate", dataArXeNe.manDate);
  xw.writeAttribute("LotQty", 1);

  xw.startElement("DIM_Carbon_dioxide_CO2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataArXeNe.CO2value);
  xw.endElement();
  xw.endElement("DIM_Carbon_dioxide_CO2");

  xw.startElement("DIM_Carbon_monoxide_CO");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataArXeNe.COvalue);
  xw.endElement();
  xw.endElement("DIM_Carbon_monoxide_CO");

  xw.startElement("DIM_Oxygen_O2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataArXeNe.O2value);
  xw.endElement();
  xw.endElement("DIM_Oxygen_O2");

  xw.startElement("DIM_Total_hydrocarbon_as_CH4");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataArXeNe.THCvalue);
  xw.endElement();
  xw.endElement("DIM_Total_hydrocarbon_as_CH4");

  xw.startElement("DIM_Methane_CH4");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataArXeNe.CH4value);
  xw.endElement();
  xw.endElement("DIM_Methane_CH4");

  xw.startElement("DIM_Nitrogen_trifluoride_NF3");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataArXeNe.NF3value);
  xw.endElement();
  xw.endElement("DIM_Nitrogen_trifluoride_NF3");

  xw.startElement("DIM_Carbon_tetrafluoride_CF4");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataArXeNe.CF4value);
  xw.endElement();
  xw.endElement("DIM_Carbon_tetrafluoride_CF4");

  xw.startElement("DIM_Nitrogen_N2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataArXeNe.N2value);
  xw.endElement();
  xw.endElement("DIM_Nitrogen_N2");

  xw.startElement("DIM_Argon_Ar_Assay");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataArXeNe.Arpercentvalue);
  xw.endElement();
  xw.endElement("DIM_Argon_Ar_Assay");

  xw.startElement("DIM_Helium_He");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataArXeNe.Hevalue);
  xw.endElement();
  xw.endElement("DIM_Helium_He");

  xw.startElement("DIM_Moisture_H2O");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataArXeNe.H2Ovalue);
  xw.endElement();
  xw.endElement("DIM_Moisture_H2O");

  xw.startElement("DIM_Carbonyl_fluoride_COF2");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataArXeNe.COF2value);
  xw.endElement();
  xw.endElement("DIM_Carbonyl_fluoride_COF2");

  xw.startElement("DIM_Xenon_Xe_Assay");
  xw.startElement("RAW");
  xw.writeAttribute("VALUE", dataArXeNe.Xepercentvalue);
  xw.endElement();
  xw.endElement("DIM_Xenon_Xe_Assay");

  xw.endDocument();

  try {
    fs.writeFileSync("sourcename.txt", "ArXeNe");
    fileToBeDownloaded = dataArXeNe.filename.toString() + ".xml";
    res.json(xw.toString());
    fs.writeFileSync(fileToBeDownloaded, xw.toString());
    fs.writeFileSync("ArXeNefilename.txt", fileToBeDownloaded);
  } catch (e) {
    console.log("Error:", e.stack);
  }
});

//------------ END ArXeNe POST------------

app.get("/download", function (req, res) {
  var sourceName = fs.readFileSync("sourcename.txt", "utf-8");
  //console.log("sourcename", sourceName);
  if (sourceName === "Chlorgas") {
    res.download("filesCS.zip", function (err) {
      if (err) {
        console.log("file not downloaded");
      } else {
        console.log("Download succesfull");
      }
    });
  }
  if (sourceName === "HongInAGR") {
    res.download("filesHIAGR.zip", function (err) {
      if (err) {
        console.log("file not downloaded");
      } else {
        console.log("Download succesfull");
      }
    });
  }
  if (sourceName === "HongInCAT") {
    res.download("filesHICAT.zip", function (err) {
      if (err) {
        console.log("file not downloaded");
      } else {
        console.log("Download succesfull");
      }
    });
  }
  if (sourceName === "TCS Burghausen") {
    res.download("filesTCS.zip", function (err) {
      if (err) {
        console.log("file not downloaded");
      } else {
        console.log("Download succesfull");
      }
    });
  }
  if (sourceName === "Wacker") {
    var WfileName = fs.readFileSync("Wfilename.txt", "utf-8");
    //console.log("Nome file Wacker", WfileName);
    res.download(WfileName, function (err) {
      if (err) {
        console.log("file not downloaded");
      } else {
        console.log("Download succesfull");
      }
    });
  }
  if (sourceName === "Taulov") {
    res.download("filesNOT.zip", function (err) {
      if (err) {
        console.log("file not downloaded");
      } else {
        console.log("Download succesfull");
      }
    });
  }
  if (sourceName === "HFGerling") {
    res.download("filesHF.zip", function (err) {
      if (err) {
        console.log("file not downloaded");
      } else {
        console.log("Download succesfull");
      }
    });
  }
  if (sourceName === "C4F8Alpha") {
    var C4F8fileName = fs.readFileSync("C4F8filename.txt", "utf-8");
    res.download(C4F8fileName, function (err) {
      if (err) {
        console.log("file not downloaded");
      } else {
        console.log("Download succesfull");
      }
    });
  }
  if (sourceName === "CF4BOC") {
    var CF4fileName = fs.readFileSync("CF4filename.txt", "utf-8");
    res.download(CF4fileName, function (err) {
      if (err) {
        console.log("file not downloaded");
      } else {
        console.log("Download succesfull");
      }
    });
  }
  if (sourceName === "F2KrNe") {
    var F2KrNefileName = fs.readFileSync("F2KrNefilename.txt", "utf-8");
    res.download(F2KrNefileName, function (err) {
      if (err) {
        console.log("file not downloaded");
      } else {
        console.log("Download succesfull");
      }
    });
  }
  if (sourceName === "F2ArNe") {
    var F2ArNefileName = fs.readFileSync("F2ArNefilename.txt", "utf-8");
    res.download(F2ArNefileName, function (err) {
      if (err) {
        console.log("file not downloaded");
      } else {
        console.log("Download succesfull");
      }
    });
  }

  if (sourceName === "ArXeNe") {
    var ArXeNefileName = fs.readFileSync("ArXeNefilename.txt", "utf-8");
    res.download(ArXeNefileName, function (err) {
      if (err) {
        console.log("file not downloaded");
      } else {
        console.log("Download succesfull");
      }
    });
  }
  if (sourceName === "HBr") {
    var HBrfileName = fs.readFileSync("HBrfilename.txt", "utf-8");
    res.download(HBrfileName, function (err) {
      if (err) {
        console.log("file not downloaded");
      } else {
        console.log("Download succesfull");
      }
    });
  }
  if (sourceName === "KrNe") {
    var KrNefileName = fs.readFileSync("KrNefilename.txt", "utf-8");
    res.download(KrNefileName, function (err) {
      if (err) {
        console.log("file not downloaded");
      } else {
        console.log("Download succesfull");
      }
    });
  }
  if (sourceName === "SF6US") {
    var SF6USfileName = fs.readFileSync("SF6USfilename.txt", "utf-8");
    res.download(SF6USfileName, function (err) {
      if (err) {
        console.log("file not downloaded");
      } else {
        console.log("Download succesfull");
      }
    });
  }
  if (sourceName === "SF6BOC") {
    var SF6BOCfileName = fs.readFileSync("SF6BOCfilename.txt", "utf-8");
    res.download(SF6BOCfileName, function (err) {
      if (err) {
        console.log("file not downloaded");
      } else {
        console.log("Download succesfull");
      }
    });
  }
  if (sourceName === "HF18US") {
    res.download("filesHFUS.zip", function (err) {
      if (err) {
        console.log("file not downloaded");
      } else {
        console.log("Download succesfull");
      }
    });
  }

  if (sourceName === "HF36US") {
    res.download("filesHFUS.zip", function (err) {
      if (err) {
        console.log("file not downloaded");
      } else {
        console.log("Download succesfull");
      }
    });
  }
});

// legge il file sample.json e lo manda a public/index.js
app.get("/jsonSampleFile", (req, res) => {
  let jsonData = fs.readFileSync("sample.json");
  let jsonFile = JSON.parse(jsonData);
  //console.log(jsonFile);
  res.send(jsonFile);
});

// get dei file da pdf to json
app.get("/jsonSampleFile2", (req, res) => {
  let jsonData2 = fs.readFileSync("sample2.json");
  let jsonFile2 = JSON.parse(jsonData2);
  //console.log(jsonFile2);
  res.send(jsonFile2);
});

//get the files da txt (Taulov / Chlorgas )
app.get("/txt", (req, res) => {
  const readTxtFile1 = fs.readFileSync("sample.txt", "utf-8");
  //console.log("writeTxtFile", readTxtFile1);
  res.send(readTxtFile1);
});
