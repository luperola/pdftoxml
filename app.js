const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening server at ${port}`);
});
app.use(express.static(__dirname + "/public"));
app.use(express.json({ limit: "10mb" }));

const fs = require("fs");
const PDFParser = require("pdf2json");
const multer = require("multer");
const path = require("path");
var XMLWriter = require("xml-writer");

var fileOriginale;

// Uso multer per caricare file a scelta dalla mia directory. Solo pdf
const storageMultiple = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = "public";
    //var dir = __dirname;
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
  destination: "public",
  //destination: __dirname,
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
  // Allowed ext
  //const fileTypes = /jpeg|jpg|png|gif/;
  const fileTypes = /pdf/;
  // Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: Pdf files Only !!!");
  }
}

// trasformo il file in json e lo invio nella directory public
try {
  app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
      } else {
        if (req.file == undefined) {
          res.redirect("index.html");
        } else {
          fileOriginale = req.file.originalname;
          const pdfParser = new PDFParser();
          pdfParser.on("pdfParser_dataError", (errData) =>
            console.error(errData.parserError)
          );
          pdfParser.on("pdfParser_dataReady", (pdfData) => {
            fs.writeFile(
              "D:/VS Code files/Module_pdf2json/public/sample.json",
              JSON.stringify(pdfData),
              (err) => console.error(err)
            );
          });
          pdfParser.loadPDF("./public/" + fileOriginale.toString());
          res.redirect("index.html");
          res.end();
          return;
        }
      }
    });
  });
} catch (err) {
  console.log(err);
  return;
}

// Alimenta il contatore per 'shipmentNumber'
app.post("/api", (request, response) => {
  console.log("I am in counter api");
  const data = request.body;
  try {
    var prevCounter = fs.readFileSync("./public/counter.txt", "utf8");
    //console.log(prevCounter);
    prevCounter++;
    fs.writeFileSync("./public/counter.txt", prevCounter.toString());
    var afterCounter = fs.readFileSync("./public/counter.txt", "utf8");
    //console.log(afterCounter);
  } catch (e) {
    console.log("Error:", e.stack);
  }
  response.json(afterCounter);
});

/* try {
  const path = "./public/";
  // Read the directory given in `path`
  fs.readdirSync(path).forEach((file) => {
    // Check if the file is with a PDF extension, remove it
    if (file.split(".").pop().toLowerCase() === "pdf") {
      console.log(`Deleting file: ${file}`);
      fs.unlinkSync(path + file);
    }
  });
  console.log("Deleted all the pdf files");
  return true;
} catch (err) {
  console.error("Error in deleting files", err);
} */
// Wacker data
app.post("/apitwo", (req, res) => {
  const dataWacker = req.body;
  //console.log(dataWacker);
  const test = "my test";
  xw = new XMLWriter(true);
  xw.startDocument("1.0", "UTF-8");
  xw.startElement("GasesShipment");
  xw.writeAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
  xw.writeAttribute(
    "xsi:noNamespaceSchemaLocation",
    "3GASC250_DM00608712_06.xsd"
  );
  xw.writeAttribute("MaterialCode", "3GASC250");
  xw.writeAttribute("SupplierHoldingDesc", "LINDE PLC");
  xw.writeAttribute("ReceivingStPlant", "Agrate");
  xw.writeAttribute("MpsSpecNo", "DM00608712_06");
  xw.writeAttribute("MpsSpecRev", "3.0");
  xw.writeAttribute("ShipmentDate", dataWacker.shipment);
  xw.writeAttribute("ShipmentNumber", dataWacker.shipmentNumber);
  xw.writeAttribute("ShipQty", 1);
  xw.startElement("Lot");
  xw.writeAttribute("SupplierSupplyChainSeqCode", "LINDE PLC-BURGHAUSEN-1585");
  xw.writeAttribute("ShipLotNo", dataWacker.lotNumber);
  xw.writeAttribute("ExpiryDate", dataWacker.expiryDate);
  xw.writeAttribute("MfgDate", dataWacker.manDate);
  xw.writeAttribute("LotQty", 1);
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

  try {
    //const wacker = JSON.stringify(dataWacker);
    //console.log(wacker);
    res.json(xw.toString());
    fs.writeFileSync("sample.xml", xw.toString());
  } catch (e) {
    console.log("Error:", e.stack);
  }
});

app.get("/download", function (req, res) {
  res.download("sample.xml", function (err) {
    if (err) {
      error;
    } else {
      console.log("Download succesfull");
    }
  });
});

//Send uploaded file names to client
/* app.get("/filename", (req, resp) => {
  const testFolder = "./public";
  fs.readdir(testFolder, (err, files) => {
    files.forEach((file) => {});
    //console.log("files=", files);
    resp.json(files);
  });
}); */
