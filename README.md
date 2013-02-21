SimplerShowNotes
================

A quick form with a script to create a new RSS &lt;item&gt; for Podcasts. It can create show notes so you don't have to. You can find a fully functioning example live [here](http://simplershownotes.com).

I wrote up this little script to get podcast information from a form and output code to speed up the production of RSS podcast episodes. It supports URL schemes to recieve data from [Drafts](http://agiletortoise.com/drafts) in addition to direct input. It **will not** write the entire RSS feed for you. If you need a wireframe to start with, look [here](http://www.podcast411.com/howto_1.html). 

Podcast feeds are pretty standard so the XML output should work well for most podcasts with little to no editing. If you know Javascript, you can change some of the variables to constants to avoid constantly filling in the same info, or even output HTML for your site. Go nuts!

You can get a handle on the Drafts App support with the live example. In Drafts, go to Settings and add a new URL Action. Call it whatever you like. To fill in the Summary and Notes Text sections with the first and second lines you write in Drafts, the URL scheme is:

    http://simplershownotes.com/?summarytext=[[title]]&notestext=[[body]]

To fill in the Show Notes Text and Show Notes URL section with the first and second lines you write in Drafts, the URL scheme is:

    http://simplershownotes.com/?notestext=[[title]]&notesurl=[[body]]

The Drafts support could be explanded to fill in any or all of the fields in the form, but you'd have to set up your own fill-in rules and syntax, as Drafts only supports exporting the first and second lines.