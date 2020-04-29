

const VOLUNTEERS_DOCUMENT_ID  = '1j5ZpFYOvqEMOb5ATI1ufPE-8jJavjYv1gD9kHqK7XQo'
const VOLUNTEER_SHEET_NAME    = 'Form responses 1'

const FIRST_NAME_COLUMN = 'F';
const LAST_NAME_COLUMN = 'G';
/**** BE CAREFUL EDITING BELOW THIS LINE ****/
var volunteer_sheet = SpreadsheetApp.openById(VOLUNTEERS_DOCUMENT_ID).getSheetByName(VOLUNTEER_SHEET_NAME);

function onSheetUpdate(e){
  Logger.log(e);
    var row = e.range.rowEnd;
    var name = e.values[1];
    var split_name = name.split(' ');
    var first_name = split_name[0];
    var last_name = split_name.slice(1).join(' ');
    updateData(FIRST_NAME_COLUMN + row, first_name); 
    updateData(LAST_NAME_COLUMN + row, last_name); 
  
}

function updateData(cell_address, value){
  volunteer_sheet.getRange(cell_address).setValue(value);
}