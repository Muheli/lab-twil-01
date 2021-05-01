import {
  AddEvtListener_ToSubElement,
  SetInnerHTML_OnSubElement,
  IncludeNestedHTML
} from "./dom_tools.js";


console.log("top of file using_thelab.js");

// define variables that reference elements on our page
const TheClientTrustForm   = document.getElementById("TheClientTrustForm");
const TheMuxVideoForm      = document.getElementById("TheMuxVideoForm");
const TheVideoPlayerForm   = document.getElementById("TheVideoPlayerForm");
const TheVideoViewsForm    = document.getElementById("TheVideoViewsForm");


export const TheMuxPb = {
  // Pb = parameter block.
  bIsPbValidated: false, // bIsPbValidated -- Need to initialize or recompute before using.
  bRanTrustCheck: false,
  bIsClientTrusted: false,
  strClientIpApparent: "",
  // ----
  IsReady: function() {
    if (!this.bIsPbValidated) ResetTheMuxPb();
    return this.bIsPbValidated;
  },
  IsClientTrusted: function() {
    if (this.IsReady()) return this.bIsClientTrusted;
  }
};

// ---------
// Kick off
// ---------

InitDomListeners();

// ---------
// DOM Listeners
// ---------

function InitDomListeners() {
  // Adding DOM object listeners
  AddEvtListener_ToSubElement(
    TheClientTrustForm,
    "button",
    "click",
    Handle_TheClientTrustForm_CheckBtn
  );
  TheMuxVideoForm.addEventListener("click", Handle_TheMuxVideoForm_Click);
  TheVideoViewsForm.addEventListener("click", Handle_TheVideoViewsForm_Click);
} // InitDomListeners

// ---------
// TheMuxPb
// ---------

function ResetTheMuxPb() {
  // Invalidate old parameter block fields.
  TheMuxPb.bIsPbValidated = false;
  TheMuxPb.bRanTrustCheck = false;
  TheMuxPb.bIsClientTrusted = false;
  TheMuxPb.strClientIpApparent = "";

  // Ready now.
  TheMuxPb.bIsPbValidated = true;
} // ResetTheMuxPb

// ---------
// Trust check
// ---------

function StartTrustCheck(funcCB) {
  if (! TheMuxPb.IsReady()) {
    console.error(
      "StartTrustCheck() is in trouble. Things got initialized in wrong order."
    );
    // funcCB is unused.
    return;
  }

  fetch("/o?rate_client=all")
    .then(response => response.json()) // parse the JSON from the server
    .then(inParsedList => {
      TheMuxPb.bRanTrustCheck = true;
      TheMuxPb.bIsClientTrusted = !!inParsedList.bTrust;
      TheMuxPb.strClientIpApparent = inParsedList.strClientIpApparent;
      /*--------------------*
      console.log(  "Handle the trust button"
        +           ", trust "     + inParsedList.trust
      );
      console.dir(inParsedList);
      /*--------------------*/
      funcCB(TheMuxPb.IsClientTrusted(), inParsedList.strClientIpApparent);
    })
    .catch(err => {
      funcCB(false, "");
    });
  //fetch("/").then(response => {
  //});
} // StartTrustCheck


function Handle_TheClientTrustForm_CheckBtn(inEvent) {
  // Preempt refresh of the page.
  inEvent.preventDefault();
  //
  StartTrustCheck((inTrust, inIpStr) => {
    // The following is async chained within StartTrustCheck()
    SetInnerHTML_OnSubElement(
      TheClientTrustForm,
      "em",
      inTrust
        ? "This client device at " + inIpStr + " is trusted."
        : !!inIpStr
        ? "This client device at " + inIpStr + " has failed the trust check."
        : "This client device has failed the trust check."
    ); // calling SetInnerHTML_OnSubElement()
  });
  //
  // I think the following should be async chained within StartTrustCheck()
  //
} // Handle_TheClientTrustForm_CheckBtn

// ---------
// TheMuxVideoForm
// ---------

function Handle_TheMuxVideoForm_Click(inEvent) {
  // Preempt refresh of the page.
  inEvent.preventDefault();
  //
  //
  if (inEvent.target.matches("button[name='RunMuxTest']")) {
    if (!TheMuxPb.bIsClientTrusted) {
      SetInnerHTML_OnSubElement(TheMuxVideoForm, "em", "Not available.");
      return;
    }
    SetInnerHTML_OnSubElement(TheMuxVideoForm, "em", "Testing.");
    return;
  }
  //
  if (inEvent.target.matches("button[name='ResetMuxTest']")) {
    SetInnerHTML_OnSubElement(TheMuxVideoForm, "em", "Ready.");
    SetInnerHTML_OnSubElement(TheMuxVideoForm, "pre[name='MuxStatusOutput']", '' );
    return;
  }
} // Handle_TheMuxVideoForm_Click


// ---------
// TheVideoViewsForm
// ---------

function Handle_TheVideoViewsForm_Click(inEvent){
  if (!TheMuxPb.bIsClientTrusted) {
    console.log("Handle_TheVideoViewsForm_Click rejects untrusted client.");
    //SetInnerHTML_OnSubElement(TheMuxVideoForm, "em", "Not available.");
    return;
  }
  //
  if (inEvent.target.matches("button[name='GetLatestVideoView']")) {
    console.log("Handle_TheVideoViewsForm_Click attempting GetLatestVideoView.");
    SetInnerHTML_OnSubElement( TheVideoViewsForm, "em", "Testing." );
    return;
  }
}
