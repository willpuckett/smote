---
title:  "Collaborative Book Authoring"
tags: [ ios, keebs ]
cover_html: <img src='images/writer.webp'/>
publish_date: 2020-02-27

---

When I used to use [Atom](https://atom.io), there was a great collaborative
writing tool called [Teletype](https://teletype.atom.io/). It allowed multiple
people to be editing the same files at the same time. I've been working on a
book lately and wanted to get another one in progress with a group of authors,
so I tried to find something that would duplicate Teletype's functionality
iThonically.

There weren't a lot of options. Both [HackMD](http://hackmd.io) and
[StackEdit](https://stackedit.io/) seemed decently put together, worked nicely
in the browser, but I wanted a stand alone app that would load quickly so I
could jot ideas on the train/bus as well as have longer sessions at home and on
the go. I wanted to be able to collaboratively edit a bunch of Markdown
documents and then build them into an ePub.

The only option was Apple Notes.

So, the Saturday morning before last, I sat around for a half an hour and
patched a [Pandoc](https://pandoc.org) build script together. This takes a
folder of Notes and pulls it out of Apple Notes in plaintext, then makes a table
of contents out of the Markdown chapters, then adds the front matter.

## File and Directory Structure

You'll need to use a folder structure something like:

```bash
mybook/
    templates/
        gfm.template
        epub.template
    css/
    fonts/
    chapters/
    publish.sh
```

I have modified Pandoc templates to control the Table of Contents Page, but you
may or may not find that necessary. In case you do, here are the two templates I
reference later in the publish script. Place them in the templates directory.

#### gfm.template

```bash
$if(titleblock)$
$titleblock$

$endif$
$for(header-includes)$
$header-includes$

$endfor$
$for(include-before)$
$include-before$

$endfor$
$if(toc)$
$if(toc-title)$
# $toc-title$
$endif$
$table-of-contents$

$endif$
$body$
$for(include-after)$

$include-after$
$endfor$
```

#### epub.template

```html
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"$if(lang)$ xml:lang="$lang$"$endif$>
<head>
  <meta charset="utf-8" />
  <meta name="generator" content="pandoc" />
  <title>$pagetitle$</title>
$if(highlighting-css)$
  <style>
$highlighting-css$
  </style>
$endif$
$for(css)$
  <link rel="stylesheet" type="text/css" href="$css$" />
$endfor$
$for(header-includes)$
  $header-includes$
$endfor$
</head>
<body$if(coverpage)$ id="cover"$endif$$if(body-type)$ epub:type="$body-type$"$endif$>
$if(coverpage)$
<div id="cover-image">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="100%" viewBox="0 0 $cover-image-width$ $cover-image-height$" preserveAspectRatio="xMidYMid meet">
<image border="5" width="$cover-image-width$" height="$cover-image-height$" xlink:href="../media/$cover-image$" />
</svg>
</div>
$else$
$for(include-before)$
$include-before$
$endfor$
$body$
$for(include-after)$
$include-after$
$endfor$
$endif$
</body>
</html>
```

## publish.sh

I like to place this script in the root of my project directory for easy access.

```bash
#!/bin/bash

# change to working directory
cd ~/icloud/mybook/chapters

# sanitize the directory from any previous runs
rm *.md


# bring in a fresh copy of chapters/front matter from Notes
osascript <<EOF

# get a list of all the chapters

tell application "Notes"

	set myList to the name of every note of folder "mybook" of account "iCloud"

# Loop through the results

	repeat with a from 1 to length of myList
		set theCurrentListItem to item a of myList

# get title and content of each chapter

		tell folder "mybook" of account "iCloud"
				set myName to name of note theCurrentListItem
				set myText to plaintext of note theCurrentListItem
		end tell

# set textFile variable to the appropriate .md file

		set textFile to "~/icloud/mybook/chapters/" & myName & ".md"

# export title and content to build directory

# (the awk command removes the heading line)

		do shell script "echo  " & quoted form of myText & " | awk '{if(NR>1)print}'  >  " & quoted form of textFile

	end repeat

end tell

EOF


# stitch chapters and add TOC
/usr/local/bin/pandoc -s -t gfm --toc --toc-depth=2 -V toc-title:"Contents" --template=../templates/gfm.template ?hapter* > toc.chapters.md

# strip bullets from the table of contents (the $ in the sed
# command uses a string literal to pass the new line character)
# the rough syntax is:
# sed -e /start/,/end/$'s/find/replace'
sed -e /Contents/,/-----/$'s/  - \[/\\\n\[/' toc.chapters.md > debulleted.toc.chapters.md

# stitch title, front/back matters, and chapters
/usr/local/bin/pandoc -s --to=epub3 --template=../templates/epub.template --epub-embed-font='../fonts/*.otf' title.txt front-matter.md debulleted.toc.chapters.md > ../mybook.epub

# clean up the directory
rm *.md
```

With the build script in place, you're ready to assemble the
[Markdown](https://www.markdowntutorial.com/) you've written in Apple Notes into
an epub. I like to make a Shortcut to run the build script and leave it in my
shortcuts widget so I can just tap on it from the home screen of my iPad.
