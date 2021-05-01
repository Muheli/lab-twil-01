// Export this module as one Constructor Function
module.exports = SsMuxHelper_Ctor;

function SsMuxHelper_Ctor(){
  //console.log("Hello from ss_mux.");
  this.strGreeting = "Hello from ss_mux.";
}


const TheAllowedClientIps =
  [ '73.92.165.235'
  , '73.92.165.235'
  ];


//----------------
// mux integration helper methods
//---------------- 

SsMuxHelper_Ctor.prototype.FetchGreeting = function(){return this.strGreeting;};


SsMuxHelper_Ctor.prototype.IsTrustedIpAddr = function (inIpAddrStr){
  var idx;
  //var strClientIp = inRequest.ip;
  var nListLen = TheAllowedClientIps.length;
  //
  for (idx = 0; idx < nListLen; ++idx){
    if (inIpAddrStr === TheAllowedClientIps[idx]){
      /*
      console.log( "§ in IsTrustedClient() idx" + idx);
      console.dir(inRequest.ip);
      console.dir(TheAllowedClientIps);
      */
      return true;
    }
  }
  return false;
}// IsTrustedClient


SsMuxHelper_Ctor.prototype.IsTrustedClientRequest = function (inClientRequest){
  return (   inClientRequest
    &&       inClientRequest.ip
    &&       this.IsTrustedIpAddr(inClientRequest.ip)
  );
}// IsTrustedClientRequest




//----------------
// more functions
//---------------- 

