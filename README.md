SimplerShowNotes
================

A quick and dirty JS script to create a new RSS &lt;item&gt; for Podcasts (some assembly required). It can create show notes so you don't have to. You can find an example live [here](http://bookbytes.tv/simpler-show-notes-example). The mobile version has currently only been tested on iOS devices.

I wrote up this little script to get podcast information from a form and output code to speed up the production of RSS podcast episodes. It supports URL schemes to recieve data from [Drafts](http://agiletortoise.com/drafts) in addition to direct input. It **will not** write the entire RSS feed for you. If you need a wireframe to start with, look [here](http://www.podcast411.com/howto_1.html). 

Podcast feeds are pretty standard so the XML portion of the script should work well for most podcasts with minimal editing. It also supports the output of HTML for a site, but that will vary much more from podcast to podcast and will require more customization. The nice thing about doing it this way is that you can very easily add in dropdowns if you work on multiple podcasts, or make more information in the JS file fixed instead of variable if you find yourself filling in the same information a lot. Go nuts!

You can get a handle on the Drafts App support with the live example. In Drafts, go to Settings and add a new URL Action. Call it whatever you like. To fill in the Summary and Notes Text sections with the first and second lines you write in Drafts, the URL scheme is:

    http://bookbytes.tv/simpler-show-notes-example/?summarytext=[[title]]&notestext=[[body]]

To fill in the Show Notes Text and Show Notes URL section with the first and second lines you write in Drafts, the URL scheme is:

    http://bookbytes.tv/simpler-show-notes-example/?notestext=[[title]]&notesurl=[[body]]

The Drafts support could be explanded to fill in any or all of the fields in the form, but you'd have to set up your own fill-in rules, as Drafts only supports first and second line export syntax.