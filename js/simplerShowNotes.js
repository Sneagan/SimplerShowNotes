// BY JACKSON EGAN
// http://sneagan.com
// @Sneagan

// You don't need to customize this script before using it. However, the script is open for customization.

// Triggers if Drafts App sends URL with Summary and Show Notes text without links. You will need to change the URL if you customize.
function ifSummaryFirst(pageURL) {
    var theSummary, theText, summaryDraftsArray, decodedText, remHTTP;
    
    decodedText = decodeURIComponent(pageURL);
    remHTTP = decodedText.replace("http://simplershownotes.com/?summarytext=", ""); // Strips the beginning of the URL
    notesText = remHTTP.replace("&notestext=", ";"); // Separate summary text from notes text with semicolon
    summaryDraftsArray = notesText.split(";"); // Break separate summary and note text into two array elements
    
    if (summaryDraftsArray[0] === "undefined" || summaryDraftsArray[1] === "undefined") {
        summaryDraftsArray[0] = " ";
        summaryDraftsArray[1] = " ";
    };
    document.getElementById("newEpisodeSummary").innerHTML = summaryDraftsArray[0]; // Write summary text element to its form field
    document.getElementById("newNotesText").innerHTML = summaryDraftsArray[1]; // Write notes text element to its form field
};

// Triggers if Drafts App sends Show Notes text and URL. The URL here should be the same as above if you customize.
function ifNotesFirst(pageURL) {
    var theNotesText, decodedText, remHTTP, notesURL, notesDraftsArray;
    
    decodedText = decodeURIComponent(pageURL);
    remHTTP = decodedText.replace("http://simplershownotes.com/?notestext=", ""); // Strips the beginning of the URL
    notesURL = remHTTP.replace("&notesurl=", ";"); // Separate notes text from notes URLs with semicolon
    notesDraftsArray = notesURL.split(";"); // Break notes text and note URLs into two array elements
    
    if (notesDraftsArray[0] === "undefined" || notesDraftsArray[1] === "undefined") {
        notesDraftsArray[0] = " ";
        notesDraftsArray[1] = " ";
    };
    document.getElementById("newNotesText").innerHTML = notesDraftsArray[0]; // Write notes text element to its form field
    document.getElementById("newNotesURL").innerHTML = notesDraftsArray[1]; // Write notes URLs element to its form field
};

// This is main episode <item> generator that is trigger when the form is submitted
function episodeProcessor(form) {
    // All variables
    var podcastSite, itunesAuthor, itunesSubtitle, currentTime, day, date, year, rawHours, rawMinutes, rawSeconds, hours, minutes, seconds, monthNames, dayNames, rssTime, newTitle, newBook, bookNameArray, bookFirstWord, newAuthor, newSummary, episodeNumber, newShowNotesTextString, newShowNotesURLString, phl, pml, psl, podcastLength, showNotesIterator, finalNotesArray, hostsArray, finalHostsArray, showNotesTextArray, showNotesURLArray, showNotesNumber, hostsNum, hostsIterator, explicitRadio, hostsToWrite, notesToWrite, newEpisodeHTML, newEpisodeXML, episodeKeywords, episodeFileSize, showHide, mediaSourceURL, hostsURLArray, hostsTextArray;

    // Grabbing those form variables!
    podcastSite = document.getElementById("podcastSite").value;
    itunesAuthor = document.getElementById("itunesAuthor").value;
    itunesSubtitle = document.getElementById("itunesSubtitle").value;
    mediaSourceURL = document.getElementById("mediaSourceURL").value;
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

    // Gets the current time and sets the variable
    currentTime = new Date();
    day = currentTime.getDay();
    date = currentTime.getDate();
    year = currentTime.getFullYear();
    rawHours = currentTime.getHours();
    rawMinutes = currentTime.getMinutes();
    rawSeconds = currentTime.getSeconds();

    // Prepare time for RSS time format: Tues, 22 Jan 2013 00:16:00 -0500
    monthNames = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    dayNames = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
    if (rawHours.toString().length < 2) {hours = "0" + rawHours} else {hours = rawHours};
    if (rawMinutes.toString().length < 2) {minutes = "0" + rawMinutes} else {minutes = rawMinutes};
    if (rawSeconds.toString().length < 2) {seconds = "0" + rawSeconds} else {seconds = rawSeconds};
    rssTime = dayNames[currentTime.getDay()] + ", " + date + " " + monthNames[currentTime.getMonth()] + " " + year + " " + hours + ":" + minutes + ":" + seconds + " -0500"; // I was using + currentTime.getTimezoneOffset() to get UTC offset, but was off by 2 hours. Working on a way to get it right.

    // Set explicit or not
    if (document.getElementById("explicitSelected").checked === true) {
        explicitRadio = "Yes";
    } else if (document.getElementById("explicitDeselected").checked ===true) {
        explicitRadio = "No";
    };

    // This handles the hosts. A form selector would be better, but this is more generic
    // Make some Arrays
    hostsArray = new Array();
    finalHostsArray = new Array();
    finalNotesArray = new Array();
    // Populate Hosts arrays
    hostsTextArray = newHostsTextString.split(", ");
    hostsURLArray = newHostsURLString.split(", ");
    // Make sure there are an equal number of hosts and host urls in the field
    if (hostsTextArray.length === hostsURLArray.length) {
        hostsNum = hostsTextArray.length;
    } else {
        alert("Your show notes links and text don't match up");
    };
    hostsIterator = -1;
    showNotesIterator = -1;
    // Populate hosts array
    for (i = 0; i < hostsNum; i++) {
        hostsIterator = hostsIterator + 1;
        hostsToWrite = "&amp;lt;p&amp;gt;&amp;lt;a href=\"" + hostsURLArray[hostsIterator] + "\"&amp;gt;" + hostsTextArray[hostsIterator] + "&amp;lt;/a&amp;gt;&amp;lt;/p&amp;gt;";
        finalHostsArray.push(hostsToWrite); // Filling an array with hosts and their URLs wrapped in that nasty Unicode
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
    // Populate new show notes array
    for (i = 0; i < showNotesNumber; i++) {
        showNotesIterator = showNotesIterator + 1;
        notesToWrite = "&amp;lt;p&amp;gt;&amp;lt;a href=\"" + showNotesURLArray[showNotesIterator] + "\"&amp;gt;" + showNotesTextArray[showNotesIterator] + "&amp;lt;/a&amp;gt;&amp;lt;/p&amp;gt;";
        finalNotesArray.push(notesToWrite); // Filling an array with show notes and their URLs wrapped in that nasty Unicode
    };

    //Set variable to write audio file url and length
    if (phl === "undefined") {phl = "0"};
    if (phl.length < 2) {phl = "0" + phl};
    if (pml === "undefined") {pml = "0"};
    if (pml.length < 2) {pml = "0" + pml};
    if (psl === "undefined") {psl = "0"};
    if (psl.length < 2) {psl = "0" + psl};
    podcastLength = phl + ":" + pml + ":" + psl;

    // This mess is why we're here. This is the final RSS <item> generator. There are non breaking spaces in there for aesthetics and to try to keep the code readable even though we dont want to read it.
    newEpisodeXML = "&lt;item&gt;<br>&nbsp;&nbsp;&lt;title&gt;" + newTitle + "&lt;/title&gt;<br>&nbsp;&nbsp;&lt;link>" + podcastSite + "&lt;/link&gt;<br>&nbsp;&nbsp;&lt;guid&gt;000" + episodeNumber + "&lt;/guid&gt;<br>&nbsp;&nbsp;&lt;description&gt;&amp;lt;p&amp;gt;" + newSummary + "&amp;lt;/p&amp;gt;&lt;p&gt;" + finalNotesArray.join("") + "&lt;/p&gt;" + finalHostsArray.join("") + "&lt;/description&gt;<br>&lt;enclosure url=\"" + mediaSourceURL + "\" length=\"" + episodeFileSize + "\" type=\"audio/mpeg\"&gt;<br>&nbsp;&nbsp;&lt;category&gt;Podcasts&lt;/category&gt;<br>&nbsp;&nbsp;&lt;pubDate&gt;" + rssTime + "&lt;/pubDate&gt;<br>&nbsp;&nbsp;&lt;itunes:author&gt;" + itunesAuthor + "&lt;/itunes:author&gt;<br>&nbsp;&nbsp;&lt;itunes:explicit&gt;" + explicitRadio + "&lt;/itunes:explicit&gt;<br>&nbsp;&nbsp;&lt;itunes:subtitle&gt;" + itunesSubtitle + "&lt;/itunes:subtitle&gt;<br>&nbsp;&nbsp;&lt;itunes:summary&gt;&amp;lt;p&amp;gt;" + newSummary + "&amp;lt;/p&amp;gt; " + finalNotesArray.join("") + "&lt;/p&gt;" + finalHostsArray.join("") + "&lt;/itunes:summary&gt;<br>&nbsp;&nbsp;&lt;itunes:duration&gt;" + podcastLength + "&lt;/itunes:duration&gt;<br>&nbsp;&nbsp;&lt;itunes:keywords&gt;" + episodeKeywords + "&lt;/itunes:keywords&gt;<br>&lt;/item&gt;";
 
    showHide = document.getElementById("outputContainer");
    showHide.style.display = "block"; // Make the <item> container visible
    document.getElementById("xmlOutput").innerHTML = newEpisodeXML; // Write the new <item>
    document.getElementById("newKeywords").scrollIntoView(); // Scroll up so the new content is in view. If you change this, keep a significant element in view to keep from disorienting the user.
};