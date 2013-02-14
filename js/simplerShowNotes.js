// BY JACKSON EGAN
// http://sneagan.com
// @Sneagan

// You need to customize this script before using it. I've marked the bare minimum you need to look at.

function episodeProcessor(form) {
    // All variables
    var podcastSite, itunesAuthorDisplay, itunesExplicit, itunesSubtitle, currentTime, day, date, year, rawHours, rawMinutes, rawSeconds, hours, minutes, seconds, monthNames, dayNames, rssTime, newTitle, newBook, bookNameArray, bookFirstWord, newAuthor, newSummary, episodeNumber, newShowNotesTextString, newShowNotesURLString, phl, pml, psl, podcastLength, showNotesIterator, finalNotesArray, hostsArray, finalHostsArray, showNotesTextArray, showNotesURLArray, showNotesNumber, hostsNum, hostsIterator, host1, host2, host3, host4, host1Value, host2Value, host3Value, host4Value, mediumRadio, hostsToWrite, notesToWrite, newEpisodeHTML, newEpisodeXML, episodeKeywords, episodeFileSize, showHide;

// EDIT THIS
    podcastSite = "thePodcast"; // A link to your podcast site
    itunesAuthorDisplay = "Space Butterfly" // Who goes in the iTunes author box?
    itunesSubtitle = "Podcasts Rock" // Self explanatory, no?
    itunesExplicit = "Maybe" // Only accepts Yes or No.
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
    // Set mediumRadio so that we can determine the new title in the next section. If your podcast is not about books, you'll need to edit this as well as the radio input on the HTML page.
    if (document.getElementById("bookSelected").checked === true) {
        mediumRadio = "Book";
    } else if (document.getElementById("comicSelected").checked ===true) {
        mediumRadio = "Comic";
    };
// END

// EDIT THIS
    // Create initial variables for the functions to follow. You podcast may need other form input. Remember to change both the HTML form and these variables
    newTitle = mediumRadio + " - " + form.bookTitle.value;
    newBook = form.bookTitle.value;
    newAuthor = form.authorName.value;
    newSummary = form.newEpisodeSummary.value;
    episodeNumber = form.newEpisodeNumber.value;
    newShowNotesTextString = form.newNotesText.value;
    newShowNotesURLString = form.newNotesURL.value;
    episodeFileSize = form.newFileSize.value;
    episodeKeywords = form.newKeywords.value;
    phl = form.lengthHours.value;
    pml = form.lengthMinutes.value;
    psl = form.lengthSecond.value;
    bookNameArray = newBook.split(" ");
// END

// EDIT THIS
    // This handles the hosts. Remember to make sure your changes here are reflected in the form.
    host1 = document.getElementById("host1").checked;
    host2 = document.getElementById("host2").checked;
    host3 = document.getElementById("host3").checked;
    host4 = document.getElementById("host4").checked;
    host1Value = document.getElementById("host1").value;
    host2Value = document.getElementById("host2").value;
    host3Value = document.getElementById("host3").value;
    host4Value = document.getElementById("host4").value;
    hostsArray = new Array();
    finalHostsArray = new Array();
    finalNotesArray = new Array();

    // Populate array with hosts
    if (host1) {hostsArray.push(host1Value); };
    if (host2) {hostsArray.push(host2Value); };
    if (host3) {hostsArray.push(host3Value); };
    if (host4) {hostsArray.push(host4Value); };
//END

    hostsNum = hostsArray.length;
    hostsIterator = -1;
    showNotesIterator = -1;

    // Populate Show Notes arrays
    showNotesTextArray = newShowNotesTextString.split(", ");
    showNotesURLArray = newShowNotesURLString.split(", ");

    // Make sure there are an equal number of show note text and urls added
    if (showNotesTextArray.length === showNotesURLArray.length) {
        showNotesNumber = showNotesTextArray.length;
    } else {
        console.log("Your show notes links and text don't match up");
    };

// EDIT THIS
    // Populate new Hosts array. It currently links to App.net accounts, but you can change it to whatever.
    for (i = 0; i < hostsNum; i++) {
    hostsIterator = hostsIterator + 1;
    hostsToWrite = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;a href=\"https://alpha.app.net/" + hostsArray[hostsIterator] + "\"&gt;" + hostsArray[hostsIterator] + "&lt;/a&gt;<br>";
        finalHostsArray.push(hostsToWrite);
    };
// END

    // Populate new Show Notes array
    for (i = 0; i < showNotesNumber; i++) {
        showNotesIterator = showNotesIterator + 1;
        notesToWrite = "&amp;lt;p&amp;gt;&amp;lt;a href=\"" + showNotesURLArray[showNotesIterator] + "\"&amp;gt;" + showNotesTextArray[showNotesIterator] + "&amp;lt;/a&amp;gt;&amp;lt;/p&amp;gt;";
        finalNotesArray.push(notesToWrite);
    };

    //Set variable to write audio file url and length
    if (bookNameArray.length > 1) {bookFirstWord = bookNameArray[0]} else {bookFirstWord = newBook};
    if (phl === "undefined") {phl = "0"};
    if (phl.length < 2) {phl = "0" + phl};
    if (pml === "undefined") {pml = "0"};
    if (pml.length < 2) {pml = "0" + pml};
    if (psl === "undefined") {psl = "0"};
    if (psl.length < 2) {psl = "0" + psl};
    podcastLength = phl + ":" + pml + ":" + psl;

// EDIT THIS
    // This stuff is no fun and ugly. The most editing you'll have to do is with the HTML. You can delete the whole newEpisodeHTML variable if you don't want it written up for you.
    newEpisodeHTML = "&lt;div class=\"entry episode\" id=\"episode-" + episodeNumber + "\"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"header\"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;h3 class=\"number\"&gt;" + episodeNumber + "&lt;/h3&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;h3 class=\"title\"&gt;&lt;a href=\"episodes/" + episodeNumber + "\"&gt;" + newTitle + "&lt;/a&gt;&lt;/h3&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;h3 class=\"part\"&gt;by " + newAuthor + "&lt;/h3&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>&lt;!-- .header ends --&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"meta-data\"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;span&gt;Hosts:&lt;/span&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"hosts\"&gt;<br>" + finalHostsArray.sort().join(" ") + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>&lt;!-- .speakers ends --&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>&lt;!-- .meta-data ends --&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class=\"text\"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;" + newSummary + "&lt;/p&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br>&lt;!-- .text ends --&gt;<br>&lt;/div&gt;<br>&lt;!-- #episode-" + episodeNumber + " ends --&gt;<br>";

    newEpisodeXML = "&lt;item&gt;<br>&nbsp;&nbsp;&lt;title&gt;Ep. " + episodeNumber + ": " + newTitle + "&lt;/title&gt;<br>&nbsp;&nbsp;&lt;link>" + podcastSite + "&lt;/link&gt;<br>&nbsp;&nbsp;&lt;guid&gt;000" + episodeNumber + "&lt;/guid&gt;<br>&nbsp;&nbsp;&lt;description&gt;&amp;lt;p&amp;gt;" + newSummary + "&amp;lt;/p&amp;gt;" + finalNotesArray.sort().join("") + "&lt;/description&gt;<br>&lt;enclosure url=\"https://directory-to-episodes/ep" + episodeNumber + "-" + bookFirstWord + ".m4a\" length=\"" + episodeFileSize + "\" type=\"audio/mpeg\"&gt;<br>&nbsp;&nbsp;&lt;category&gt;Podcasts&lt;/category&gt;<br>&nbsp;&nbsp;&lt;pubDate&gt;" + rssTime + "&lt;/pubDate&gt;<br>&nbsp;&nbsp;&lt;itunes:author&gt;" + itunesAuthorDisplay + "&lt;/itunes:author&gt;<br>&nbsp;&nbsp;&lt;itunes:explicit&gt;" + itunesExplicit + "&lt;/itunes:explicit&gt;<br>&nbsp;&nbsp;&lt;itunes:subtitle&gt;" + itunesSubtitle + "&lt;/itunes:subtitle&gt;<br>&nbsp;&nbsp;&lt;itunes:summary&gt;&amp;lt;p&amp;gt;" + newSummary + "&amp;lt;/p&amp;gt; " + finalNotesArray.sort().join("") + "&lt;/itunes:summary&gt;<br>&nbsp;&nbsp;&lt;itunes:duration&gt;" + podcastLength + "&lt;/itunes:duration&gt;<br>&nbsp;&nbsp;&lt;itunes:keywords&gt;" + episodeKeywords + "&lt;/itunes:keywords&gt;<br>&lt;/item&gt;";
// END
    
    showHide = document.getElementById("outputContainer");
    showHide.style.display = "block";
    document.getElementById("xmlOutput").innerHTML = newEpisodeXML;
    document.getElementById("htmlOutput").innerHTML = newEpisodeHTML;
    document.getElementById("submitButton").scrollIntoView();
};