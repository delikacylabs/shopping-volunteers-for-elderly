const TWILIO_ACCOUNT_SID = 'AC'
const TWILIO_AUTH_TOKEN  = ''
const MESSAGING_ID       = 'MG'

const CUSTOMER_DOCUMENT_ID    = '1OMjiAkW5URfvXoA4UfzQTzvygbJ-YgxO-BR0bDTToFg'
const CUSTOMER_SHEET_NAME     = 'Form responses 1'
const OFFER_FULFILLED_COLUMN  = 'P'
const CUSTOMER_PHONE_COLUMN   = 'E'
const CUSTOMER_NAME_COLUMN   = 'B'


const VOLUNTEER_DOCUMENT_ID    = '1OMjiAkW5URfvXoA4UfzQTzvygbJ-YgxO-BR0bDTToFg'
const VOLUNTEER_SHEET_NAME     = 'Form responses 1'
const VOLUNTEER_PHONE_COLUMN  = 'C'


const VOLUNTEERS_OFFER_DOCUMENT_ID  = '1UPtjUP2vuMgGGwWJL9A1zxTppN0LxKkXZ0_RkPcaLms'
const VOLUNTEER_OFFER_SHEET_NAME    = 'Form responses 1'
const ACCEPT_REJECT_COLUMN    = 'H'

/**** BE CAREFUL EDITING BELOW THIS LINE ****/
var offer_sheet = SpreadsheetApp.openById(VOLUNTEERS_OFFER_DOCUMENT_ID).getSheetByName(VOLUNTEER_OFFER_SHEET_NAME);
var customer_sheet = SpreadsheetApp.openById(CUSTOMER_DOCUMENT_ID).getSheetByName(CUSTOMER_SHEET_NAME);

function onSheetUpdate(e){
  Logger.log(JSON.stringify(e));
    var row = e.range.rowEnd;

    var request_id = e.values[6];  
  
  Logger.log(e.values);
  Logger.log(request_id);
  var check_offer_status = readRequestData(request_id);
  var volunteer_mobile = e.values[3];
  var is_offer_already_accepted = isOfferAlreadyAccepted(request_id);
  if (check_offer_status != 'Yes' && is_offer_already_accepted == false) {
    updateData(customer_sheet, OFFER_FULFILLED_COLUMN + request_id, 'Yes'); 
    updateData(offer_sheet, ACCEPT_REJECT_COLUMN + row, 'Accept'); 
    
    var customer_mobile = readCustomerPhone(request_id).toString();
    var customer_name   = readCustomerName(request_id);
    var volunteer_name = e.values[1];
    sendAcceptMessageToVolunteer(volunteer_mobile, customer_name, customer_mobile);
    sendMessageToCustomer(customer_mobile, volunteer_name, volunteer_mobile);
  } else {
    updateData(offer_sheet, ACCEPT_REJECT_COLUMN + row, 'Reject');
    sendRejectMessageToVolunteer(volunteer_mobile);
  } 
  
}

function sendSMS(to, body){
  
  var messages_url = "https://api.twilio.com/2010-04-01/Accounts/" + TWILIO_ACCOUNT_SID + "/Messages.json";
  var payload = {
    "To": to,
    "Body" : body,
    "MessagingServiceSid" : MESSAGING_ID
  };
 
  var options = {
    "method" : "post",
    "payload" : payload
  };
  
  options.headers = { 
    "Authorization" : "Basic " + Utilities.base64Encode(TWILIO_ACCOUNT_SID+":"+TWILIO_AUTH_TOKEN)
  };
  UrlFetchApp.fetch(messages_url, options); 
}

function sendAcceptMessageToVolunteer(to, customer_name, customer_mobile){
  
  var body = "Awesome! Please connect with customer if needed. The name of the person is " + customer_name + '. The contact number is ' + customer_mobile;
  sendSMS(to, body);
  
}

function sendRejectMessageToVolunteer(to){
  var body = "This request is already accepted by another volunteer.";
  sendSMS(to, body);
}

function test1(){
  var to = readCustomerPhone(3).toString();
  var volunteer_name = 'sushil';
  var volunteer_mobile = '2823932';
  Logger.log(to.toString());
  sendMessageToCustomer(to, volunteer_name, volunteer_mobile)
}
function sendMessageToCustomer(to, volunteer_name, volunteer_mobile){
  var body = "You request will be served by " + volunteer_name + ". The mobile number of the volunteer is " + volunteer_mobile + ". Please connect with volunteer if needed";
  sendSMS(to, body);
}

function isOfferAlreadyAccepted(request_id){
  var data = offer_sheet.getDataRange().getValues();
  for(var i=0;i<data.length;i++){
    var row = data[i];
    if (row[7] == 'Accept' && row[6] == request_id) return true;
  }
  return false;
}

function test(){
  Logger.log(isOfferAlreadyAccepted(1));
  Logger.log(isOfferAlreadyAccepted(2));
  Logger.log(isOfferAlreadyAccepted(11));
  Logger.log(isOfferAlreadyAccepted(20));
}

function readRequestData(row){
  var cell_address = OFFER_FULFILLED_COLUMN + row;
  return customer_sheet.getRange(cell_address).getValue(); 
}

function readCustomerPhone(row){
  var cell_address = CUSTOMER_PHONE_COLUMN + row;
  return customer_sheet.getRange(cell_address).getValue(); 
}

function readVolunteerPhone(row){
  var cell_address = CUSTOMER_PHONE_COLUMN + row;
  return customer_sheet.getRange(cell_address).getValue(); 
}

function readCustomerName(row){
  var cell_address = CUSTOMER_NAME_COLUMN + row;
  return customer_sheet.getRange(cell_address).getValue(); 
}
function updateData(sheet, cell_address, value){
  sheet.getRange(cell_address).setValue(value);
}