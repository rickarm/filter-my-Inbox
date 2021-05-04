# filter-my-Inbox

I have always appreciated how iOS can filter iMessages by "Known" and "Unknown senders". I decided to write a script that will do this for your email (GMail only, sorry). I have put it on GitHub for feedback & improvement. Please feel free to copy the script and use it yourself. 

## How does it work?
* First it pulls your Google Contacts for specific contact Groups. You can change what Groups you want it to match against in the script). The default is `System Group: Friends`.
* Then it goes thru each message in your Inbox and matches message sender's email against the list pulled in first step above (i.e. from your contacts).
* If there is a match, it will apply a label to the message. This is also configurable in the script. The default label is `Contact`.

## How can I use it?
* Create a new Google Apps Script project here: https://script.google.com/u/0/home
* Copy and paste the script code into a new or existing file in this new project
* Edit script variables as needed for you
* Test script (this will prompt you to give your script permission to your Gmail and Google Contacts)
	* NOTE: I HAVE NO ACCESS TO YOUR DATA. THIS IS YOU GIVING YOUR NEW SCRIPT ACCESS TO YOUR DATA.
* Set a time-based trigger so script runs on regular basis. FWIW my is set to every 5 minutes.

I hope you find it useful. Please feel free to share with anyone who may find useful.
