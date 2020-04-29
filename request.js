const TWILIO_ACCOUNT_SID = 'AC'
const TWILIO_AUTH_TOKEN  = ''
const MESSAGING_ID       = 'MG'

const VOLUNTEERS_DOCUMENT_ID  = '1j5ZpFYOvqEMOb5ATI1ufPE-8jJavjYv1gD9kHqK7XQo'
const VOLUNTEER_SHEET_NAME    = 'Form responses 1'
const CUSTOMER_DOCUMENT_ID    = '1OMjiAkW5URfvXoA4UfzQTzvygbJ-YgxO-BR0bDTToFg'
const CUSTOMER_SHEET_NAME     = 'Form responses 1'
const LINK_TO_GOOGLE_FORM     = "https://docs.google.com/forms/d/e/1FAIpQLSdltlTPEP97A_2srQ2vesduwZcgINKAy3cyLBKc3rr2l3Du8A/viewform?usp=pp_url&entry.1228756114={name}&entry.1564496894={email}&entry.843213743={mobile_number}&entry.1882479024={request_id}"


const COUNTRY_CODE = '+1';

const CUSTOMER_ROW_MAPPING = {
	'timestamp' : 0, //'A'
	'customer_name' : 1, //'B'
	'house_number_or_name' : 2,// 'C'
	'road_name' : 3,//'D'
	'post_code' : 4,//'E'
	'mobile_numer' : 5,//'F'
	'landline_number' : 6,//'G'
	'delivery_date' : 7,//'H'
	'earliest_delivery_time' : 8,//'I'
	'latest_delivery_time' : 9,//'J'
	'is_car_needed' : 10,//'K'
	'payment_details' : 11,//'L'
	'shopping_left_location' : 12,//'M'
	'additional_comment' : 13 //'N',
}

const MESSAGE_SENT_STATUS_COLUMN = 'O';

const VOLUNTEER_ROW_MAPPING = {
    'name': 1,
	'mobile_number' : 2, //'C'
    'email': 3
}
/**** BE CAREFUL EDITING BELOW THIS LINE ****/

var customer_sheet = SpreadsheetApp.openById(CUSTOMER_DOCUMENT_ID).getSheetByName(CUSTOMER_SHEET_NAME);

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


function onSheetUpdate(e){
  if (!e.oldValue && e.value !== ''){
    var row = e.range.rowEnd;
    message = prepare_message(e.values); 
    try{
      //sendSMS(message); 
      send_to_volunteers(e.values, message, row);
      updateData(MESSAGE_SENT_STATUS_COLUMN + row, 'SENT'); 
    } catch(error){
      updateData(MESSAGE_SENT_STATUS_COLUMN + row, error); 
    }
  }
}

function prepare_message(row){
	return "SVE Delivery Request\n\nAre you available to deliver shopping to " 
	 + row[CUSTOMER_ROW_MAPPING['road_name']] + " " + row[CUSTOMER_ROW_MAPPING['post_code']] 
	 + " between " + row[CUSTOMER_ROW_MAPPING['earliest_delivery_time']] 
	 + " and " + row[CUSTOMER_ROW_MAPPING['latest_delivery_time']] + " on " 
	 + row[CUSTOMER_ROW_MAPPING['delivery_date']] + "?\n\nIf so, please click on this link: " 
     + LINK_TO_GOOGLE_FORM 
     + " \n\nIf you are not available, please ignore this message."
}


function send_to_volunteers(data, message, request_id){
	var volunteer_sheet = SpreadsheetApp.openById(VOLUNTEERS_DOCUMENT_ID).getSheetByName(VOLUNTEER_SHEET_NAME);
    var num_rows        = volunteer_sheet.getLastRow() - 1; 
    var num_columns     = volunteer_sheet.getLastColumn() - 1;
  
    var data_range      = volunteer_sheet.getRange(2, 1, num_rows, num_columns);
    var data            = data_range.getValues();
  console.log(data);
    var numbers = [];
    data.forEach( function(row) {
      // Removing leading 0's
      var phone_number = row[2].toString().replace(/^0+/, '');
      if (phone_number == '') return true;
      // Add country code if not present
      if (phone_number[0] != '+') phone_number = COUNTRY_CODE + phone_number;
      try {
        sendSMS(phone_number, get_final_message(message, row, request_id));
      } catch (error) {
        Logger.log(error);
      }
      Logger.log(phone_number + ": " + get_final_message(message, row, request_id));
      //numbers.push(JSON.stringify({"binding_type":"sms","address":phone_number}))
    });
  return true;
  //return numbers.join(',');
}

function get_final_message(message, row, request_id){
  return message.replace('{request_id}', request_id).replace('{name}', encodeURIComponent(row[VOLUNTEER_ROW_MAPPING['name']])).replace('{mobile_number}',encodeURIComponent(row[VOLUNTEER_ROW_MAPPING['mobile_number']])).replace('{email}',encodeURIComponent(row[VOLUNTEER_ROW_MAPPING['email']]));
}

function updateData(cell_address, value){
  customer_sheet.getRange(cell_address).setValue(value);
}