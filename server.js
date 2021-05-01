// server.js
// where your node app starts

const ctorCliSrvTrust = require("./server/ss_ctor_CliSrvTrust.js");
const TheCliSrvTrust = new ctorCliSrvTrust();

const filesys = require("fs");
const express = require("express");

const app = express();

// Joe's recent IP: 73.92.165.235'


// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
//app.use(express.static("js_c"));

// Configure settings per http://expressjs.com/en/5x/api.html#app.settings.table
app.enable('trust proxy');


app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/privacy", (request, response) => {
  response.sendFile(__dirname + "/views/privacy.html");
});

app.get("/contact", (request, response) => {
  response.sendFile(__dirname + "/views/contact.html");
});

app.get("/lab_mux", (request, response) => {
  response.sendFile(__dirname + "/views/lab_mux.html");
});

app.get("/o", (request, response) => {
  // unexpected lack of query param
  if (! request.query){
    response.end();
    return;
  }
  // md
  if (!! request.query.m){
    let strProposedFullPath = __dirname + "/md/" + request.query.m + ".md";
    if (filesys.existsSync(strProposedFullPath)){
      response.sendFile(strProposedFullPath);
      return;
    }
    response.sendFile(__dirname + "/md/Err404.md");
    return;
  }
  // ht
  if (!! request.query.h){
    let strProposedFullPath = __dirname + "/ht/" + request.query.h + ".ht";
    if (filesys.existsSync(strProposedFullPath)){
      response.sendFile(strProposedFullPath);
      console.log( "§ ht-found");
      return;
    }
    response.sendFile(__dirname + "/ht/inert.ht");
    console.log( "§ ht-not-found");
    return;
  }
  // rate_client
  if (!! request.query.trustcheck){
    var strClientIp = request.ip;
    var oResponsePayload = {
      bTrust               : TheSsMuxHelper.IsTrustedIpAddr(strClientIp),
      strClientIpApparent  : strClientIp
    };
    response.json(oResponsePayload);
    return;
  }
  // mux
  if (!! request.query.mux){
    if (! TheSsMuxHelper.IsTrustedClientRequest(request)) return;
    TheSsMuxHelper.DispatchMuxRequest(request, response);
    return;
  }
  // diag
  if (!! request.query.diag){
    console.log( "§"
      + ", diag param: " + request.query.diag
      + ", DIAG_ID: " + process.env.DIAG_ID
      + ", trust proxy: " + app.enabled('trust proxy')
      //+ ", ss_mux: " + ss_mux.greet()
      + ", ss_mux: " + TheSsMuxHelper.FetchGreeting()
    );
    console.dir(TheSsMuxHelper);
    //console.dir(request.ip);
    //console.dir(ss_mux);
    //
    response.end();
    return;
  }
  // unrecognized query param
  response.end();
  return;
}); // get "/o"


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});


