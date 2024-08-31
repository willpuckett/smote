---
title:  "MWeb: Markdown Editor"
tags: [ ios, keebs ]
cover_html: <img src='/images/MWeb.webp'/>
publish_date: 2019-02-14
---

A few weeks ago, I happened onto
[**MWeb**](https://www.mweb.im/introducing-mweb-for-ios.html) and everything
changed. MWeb has a great preview, a good library that integrates well with its
desktop version, and allows easy editing of files in external folders, including
the git repository that hosts this site.

The support for GFM tables is awesome. The LaTeX support is awesome. It does a
great job with inline flow chart graphics like
[Mermaid](https://mermaidjs.github.io/). The Table of Contents feature works
really well as well.

### Page Breaks

I went around in circles trying to find a way to indicate a hard page break in
GFM (I was outputting a book of haiku to ePub and it wasn't breaking at H1,
maybe too short?). Here's the HTML I needed to insert to get a hard page break:

```html
<div style="page-break-after: always;"></div>
```

But I would still prefer to have a simple Markdown notation for this. Yet
another reason I should improve on my CSS, I suppose...

After several more months of dealing with my css ineptitude, I found the
following code to put at the beginning of the markdown document:

```html
<style>
    hr {
        page-break-before: always;
        border-width: 0px;
        }
    h1 {page-break-before: always;}
    .center {
        text-indent: 0;
        text-align: center;
        }
</style>
```

It effectively allows you to use either an **H1** or a **horizontal rule** as a
page break, and makes the horizontal rule non-visible. I hate seeing an hr, but
I love using it to structure content while I write.

### Wrap Up

MWeb can push directly to a number of publishing platforms including Medium and
Wordpress, and can push images to a third party image site. If I were on a
desert island and could only take one text editor, MWeb would be it. MWeb is a
top of the line GFM editor that you can grow with for years, and it's a pleasure
to write in _every day_.
