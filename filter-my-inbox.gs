const matchList = []; // Storing array of email addresses to match with
const myEmail = ['ADD YOUR EMAIL ADDRESSES']; // Your email addresses to exclude from results 

// GMail label to apply on a matched message
const labelName = "Contact";
var label = GmailApp.getUserLabelByName(labelName);

const groupsToUse = ['System Group: Friends']; // List of Groups in Google Contacts to match on

/** Main Function
*/
function myFunction ()  {
  loadMatchList(groupsToUse);
  checkMail (); 
}

/** Pull email addresses to match against
*/
function loadMatchList(groups) {
  for (var i = 0; i < groups.length; i++) {
    var group  = ContactsApp.getContactGroup(groups[i]);
    var contacts = group.getContacts();
    
    for (var j in contacts) {
      var emails = contacts[j].getEmails();
      for (var k in emails) {
        matchList.push(emails[k].getAddress());
      }
    }
  }
  return false;
}


/** Pull messages via GMail API
  * Store from data from message in messageFrom
  * Remove name information from messageFrom using formatFrom()
  * Exclude any results that include my email with isMyEmail boolean
  * Check for match with didFind
  * Label thread if didFind comes back true
*/ 
function checkMail () {
  var threads = GmailApp.search("-label:" + labelName + " in:inbox");
  var messages = GmailApp.getMessagesForThreads(threads);
     
  for (var i = 0; i < messages.length; i++) {
    for (var j = 0; j < messages[i].length; j++) {
      var messageFrom = messages[i][j].getFrom();
      var messageFromEmail = formatFrom(messageFrom);
      
      // Exit if it is one of my email addresses
      var isMyEmail = myEmail.includes(messageFromEmail);
      if (isMyEmail) { return false; }

      // CHECK if getFrom in Message matches against my email list
      var didFind = matchList.includes(messageFromEmail);
      if (didFind) { markMsg(messages[i][j].getThread()); }
      if (didFind) { Logger.log(messageFromEmail); }
    }
  }
  
  return false;
}

/** Clean up formatting of strings returned by getFrom to only include email addresses 
*/ 
function formatFrom(getFrom) { 
  var name = "";
  var email = "";
  
  var matches = getFrom.match (/\s*"?([^"]*)"?\s+<(.+)>/);
  if (matches) {
    name = matches[1];
    email = matches[2];
  }
  if(email == "") { 
    return getFrom; 
    Logger.log(" BLANK " + getFrom);
  }
  else return email;
}


function markMsg(thd) {
  thd.addLabel(label);
  thd.markImportant();
  return false;
}
