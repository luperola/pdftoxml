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

let fileOriginale;

// Uso multer per caricare file a scelta dall mia directory. Solo pdf
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
    //cb(null, Date.now() + path.extname(file.originalname));
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
app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      if (req.file == undefined) {
        res.redirect("index.html");
      } else {
        //console.log("file =", req.file);
        fileOriginale = req.file.originalname;
        //console.log(fileOriginale.toString());
        const pdfParser = new PDFParser();
        pdfParser.on("pdfParser_dataError", (errData) =>
          console.error(errData.parserError)
        );
        pdfParser.on("pdfParser_dataReady", (pdfData) => {
          //var nomeFile = __dirname + `${fileOriginale}`;
          //nomeFile = nomeFile.replace(".pdf", ".json");
          //console.log(nomeFile);
          fs.writeFile(
            "D:/VS Code files/Module_pdf2json/public/sample.json",
            //nomeFile
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

//try {
/* const jsonString = fs.readFileSync(
  "D:/VS Code files/Module_pdf2json/public/sample.json",
  "utf8",
  (err) => {
    //if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }
  //}
);
const customer = JSON.parse(jsonString);
const data = {
  CO2: "dim CO2",
};
console.log(customer.formImage.Pages[0].Texts[14].R[0].T);
console.log(data.CO2); */
//} catch (err) {
//console.log(err);
// return;
//}

/* // Send uploaded file names to client
app.get("/filename", (req, resp) => {
  const testFolder = "./public";
  fs.readdir(testFolder, (err, files) => {
    files.forEach((file) => {});
    //console.log("files=", files);
    resp.json(files);
  });
}); */
