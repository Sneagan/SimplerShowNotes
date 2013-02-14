SimplerShowNotes
================

A quick and dirty JS script to create a new RSS &lt;item&gt; for Podcasts (some assembly required). It creates show notes so you don't have to.

I wrote up this little script to get podcast information from a form and output code to speed up the production of RSS podcast episodes. It **will not** write the entire RSS feed for you. If you need a wireframe to start with, look [here](http://www.podcast411.com/howto_1.html). 

Podcast feeds are pretty standard so the XML portion of the script should work well for most podcasts with minimal editing. It also supports the output of HTML for a site, but that will vary much more from podcast to podcast and will require more customization. The nice thing about doing it this way is that you can very easily add in dropdowns if you work on multiple podcasts, or make more information in the JS file fixed instead of variable if you find yourself filling in the same information a lot. Go nuts!

Eventually, I'd like to have this be part of a system to automatically append the output code to an RSS file.