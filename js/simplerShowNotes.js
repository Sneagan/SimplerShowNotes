// BY JACKSON EGAN
// http://sneagan.com
// @Sneagan

// You need to customize this script before using it. I've marked the bare minimum you need to look at.
// EDIT
// Runs if Drafts App sends URL with Summary and Show Notes text without links. You will need to change the URL at least

function ifSummaryFirst(pageURL) {
    var theSummary, theText, summaryDraftsArray, decodedText, remHTTP;
    
    decodedText = decodeURIComponent(pageURL);
    remHTTP = decodedText.replace("http://simplershownotes.com/?summarytext=", "");
    notesText = remHTTP.replace("&notestext=", ";");
    summaryDraftsArray = notesText.split(";");
    
    if (summaryDraftsArray[0] === "undefined" || summaryDraftsArray[1] === "undefined") {
        summaryDraftsArray[0] = " ";
        summaryDraftsArray[1] = " ";
    };
    document.getElementById("newEpisodeSummary").innerHTML = summaryDraftsArray[0];
    document.getElementById("newNotesText").innerHTML = summaryDraftsArray[1];
};
// END

// EDIT
// Run if Drafts App sends Show Notes text and URL. The URL here should be the same as above.
function ifNotesFirst(pageURL) {
    var theNotesText, decodedText, remHTTP, notesURL, notesDraftsArray;
    
    decodedText = decodeURIComponent(pageURL);
    remHTTP = decodedText.replace("http://simplershownotes.com/?notestext=", "");
    notesURL = remHTTP.replace("&notesurl=", ";");
    notesDraftsArray = notesURL.split(";");
    
    if (notesDraftsArray[0] === "undefined" || notesDraftsArray[1] === "undefined") {
        notesDraftsArray[0] = " ";
        notesDraftsArray[1] = " ";
    };
    document.getElementById("newNotesText").innerHTML = notesDraftsArray[0];
    document.getElementById("newNotesURL").innerHTML = notesDraftsArray[1];
};
// END


function episodeProcessor(form) {
    // All variables
    var podcastSite, itunesAuthor, itunesSubtitle, currentTime, day, date, year, rawHours, rawMinutes, rawSeconds, hours, minutes, seconds, monthNames, dayNames, rssTime, newTitle, newBook, bookNameArray, bookFirstWord, newAuthor, newSummary, episodeNumber, newShowNotesTextString, newShowNotesURLString, phl, pml, psl, podcastLength, showNotesIterator, finalNotesArray, hostsArray, finalHostsArray, showNotesTextArray, showNotesURLArray, showNotesNumber, hostsNum, hostsIterator, explicitRadio, hostsToWrite, notesToWrite, newEpisodeHTML, newEpisodeXML, episodeKeywords, episodeFileSize, showHide, mediaSourceURL, hostsURLArray, hostsTextArray;

// EDIT THIS
    podcastSite = document.getElementById("podcastSite").value;
    itunesAuthor = document.getElementById("itunesAuthor").value;
    itunesSubtitle = document.getElementById("itunesSubtitle").value;
    mediaSourceURL = document.getElementById("mediaSourceURL").value;
// END

    // This gets the current time and sets the variable to use later. Was using + currentTime.getTimezoneOffset() to get UTC offset, but was off by 2 hours. Set it manually or fix as you like. It's "-0500" in rssTime.
    currentTime = new Date();
    day = currentTime.getDay();
    date = currentTime.getDate();
    year = currentTime.getFullYear();
    rawHours = currentTime.getHours();
    rawMinutes = currentTime.getMinutes();
    rawSeconds = currentTime.getSeconds();

    // Prepare variables for RSS datetime format
    monthNames = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    dayNames = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
    if (rawHours.toString().length < 2) {hours = "0" + rawHours} else {hours = rawHours};
    if (rawMinutes.toString().length < 2) {minutes = "0" + rawMinutes} else {minutes = rawMinutes};
    if (rawSeconds.toString().length < 2) {seconds = "0" + rawSeconds} else {seconds = rawSeconds};

    rssTime = dayNames[currentTime.getDay()] + ", " + date + " " + monthNames[currentTime.getMonth()] + " " + year + " " + hours + ":" + minutes + ":" + seconds + " -0500";
    // RSS time format: Tues, 22 Jan 2013 00:16:00 -0500
//END

// EDIT THIS
    // Set mediumRadio
    if (document.getElementById("explicitSelected").checked === true) {
        explicitRadio = "Yes";
    } else if (document.getElementById("explicitDeselected").checked ===true) {
        explicitRadio = "No";
    };
// END

// EDIT THIS
    // Create initial variables for the functions to follow.
    newTitle = document.getElementById("itunesTitle").value;
    newSummary = form.newEpisodeSummary.value;
    episodeNumber = form.newEpisodeNumber.value;
    newShowNotesTextString = form.newNotesText.value;
    newShowNotesURLString = form.newNotesURL.value;
    newHostsTextString = form.hostsText.value;
    newHostsURLString = form.hostsURL.value;
    episodeFileSize = form.newFileSize.value;
    episodeKeywords = form.newKeywords.value;
    phl = form.lengthHours.value;
    pml = form.lengthMinutes.value;
    psl = form.lengthSecond.value;
// END

// EDIT THIS
    // This handles the hosts. Remember to make sure your changes here are reflected in the form.
    // Make some Arrays
    hostsArray = new Array();
    finalHostsArray = new Array();
    finalNotesArray = new Array();
    // Populate Hosts arrays
    hostsTextArray = newHostsTextString.split(", ");
    hostsURLArray = newHostsURLString.split(", ");
    // Make sure there are an equal number of show note text and urls added
    if (hostsTextArray.length === hostsURLArray.length) {
        hostsNum = hostsTextArray.length;
    } else {
        alert("Your show notes links and text don't match up");
    };
    hostsIterator = -1;
    showNotesIterator = -1;
    // Populate new Show Notes array
    for (i = 0; i < hostsNum; i++) {
        hostsIterator = hostsIterator + 1;
        hostsToWrite = "&amp;lt;p&amp;gt;&amp;lt;a href=\"" + hostsURLArray[hostsIterator] + "\"&amp;gt;" + hostsTextArray[hostsIterator] + "&amp;lt;/a&amp;gt;&amp;lt;/p&amp;gt;";
        finalHostsArray.push(hostsToWrite);
    };
    // Populate Show Notes arrays
    showNotesTextArray = newShowNotesTextString.split(", ");
    showNotesURLArray = newShowNotesURLString.split(", ");
    // Make sure there are an equal number of show note text and urls added
    if (showNotesTextArray.length === showNotesURLArray.length) {
        showNotesNumber = showNotesTextArray.length;
    } else {
        alert("Your show notes links and text don't match up");
    };
    // Populate new Show Notes array
    for (i = 0; i < showNotesNumber; i++) {
        showNotesIterator = showNotesIterator + 1;
        notesToWrite = "&amp;lt;p&amp;gt;&amp;lt;a href=\"" + showNotesURLArray[showNotesIterator] + "\"&amp;gt;" + showNotesTextArray[showNotesIterator] + "&amp;lt;/a&amp;gt;&amp;lt;/p&amp;gt;";
        finalNotesArray.push(notesToWrite);
    };

    //Set variable to write audio file url and length
    if (phl === "undefined") {phl = "0"};
    if (phl.length < 2) {phl = "0" + phl};
    if (pml === "undefined") {pml = "0"};
    if (pml.length < 2) {pml = "0" + pml};
    if (psl === "undefined") {psl = "0"};
    if (psl.length < 2) {psl = "0" + psl};
    podcastLength = phl + ":" + pml + ":" + psl;

// EDIT THIS
    // This stuff is no fun and ugly.
    newEpisodeXML = "&lt;item&gt;<br>&nbsp;&nbsp;&lt;title&gt;" + newTitle + "&lt;/title&gt;<br>&nbsp;&nbsp;&lt;link>" + podcastSite + "&lt;/link&gt;<br>&nbsp;&nbsp;&lt;guid&gt;000" + episodeNumber + "&lt;/guid&gt;<br>&nbsp;&nbsp;&lt;description&gt;&amp;lt;p&amp;gt;" + newSummary + "&amp;lt;/p&amp;gt;&lt;p&gt;" + finalNotesArray.join("") + "&lt;/p&gt;" + finalHostsArray.join("") + "&lt;/description&gt;<br>&lt;enclosure url=\"" + mediaSourceURL + "\" length=\"" + episodeFileSize + "\" type=\"audio/mpeg\"&gt;<br>&nbsp;&nbsp;&lt;category&gt;Podcasts&lt;/category&gt;<br>&nbsp;&nbsp;&lt;pubDate&gt;" + rssTime + "&lt;/pubDate&gt;<br>&nbsp;&nbsp;&lt;itunes:author&gt;" + itunesAuthor + "&lt;/itunes:author&gt;<br>&nbsp;&nbsp;&lt;itunes:explicit&gt;" + explicitRadio + "&lt;/itunes:explicit&gt;<br>&nbsp;&nbsp;&lt;itunes:subtitle&gt;" + itunesSubtitle + "&lt;/itunes:subtitle&gt;<br>&nbsp;&nbsp;&lt;itunes:summary&gt;&amp;lt;p&amp;gt;" + newSummary + "&amp;lt;/p&amp;gt; " + finalNotesArray.join("") + "&lt;/p&gt;" + finalHostsArray.join("") + "&lt;/itunes:summary&gt;<br>&nbsp;&nbsp;&lt;itunes:duration&gt;" + podcastLength + "&lt;/itunes:duration&gt;<br>&nbsp;&nbsp;&lt;itunes:keywords&gt;" + episodeKeywords + "&lt;/itunes:keywords&gt;<br>&lt;/item&gt;";
// END
    
    showHide = document.getElementById("outputContainer");
    showHide.style.display = "block";
    document.getElementById("xmlOutput").innerHTML = newEpisodeXML;
    document.getElementById("newKeywords").scrollIntoView();
};