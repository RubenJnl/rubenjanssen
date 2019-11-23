---
layout: post
title:  "HTML element and usage: Details disclosure"
date:   2019-10-16 19:00:00 +0200
categories:
tags: [html, native elements, development, JavaScript]
permalink: details-disclosure
---

You might have seen it, I've used this element on top of the pages for some time now*.
The details disclosure element is quite a nifty new _(read: not fully supported)_ element.
It has a wide variety of uses, for example a tooltip like implementation or FAQ.

– In my opinion – however, there is a slight flaw in de default implementation when you look at it from an end user perspective.
It doesn't auto-close upon clicking somewhere else then in the summary. Adding this isn't that hard but you still need to add JavaScript to do so, thus adding unnecessary complexity.
I might come back at improving user interaction of this element another time.

For now a few examples.

**Example 1**
```
<details>
  <summary> The summary or title </summary>
  <p>
    Initially hidden content...
  </p>
</details>
```

**Demo 1 _(without styles)_:**
<details markdown="1">
  <summary> The summary or title </summary>
  <p>
    Initially hidden content...
  </p>
</details>

---

**Example 2**
```
<details open>
  <summary> The summary or title </summary>
  <p>
    Added the open attribute to show this content initially...
  </p>
</details>
```

**Demo 2 _(without styles)_:**
<details open markdown="1">
  <summary> The summary or title </summary>
  <p>
    Added the open attribute to show this content initially...
  </p>
</details>


<p>&nbsp;</p>
___

_* I Didn't add polyfill for older browsers. If not working correctly please try to use a more modern browser. This is my playground, not intended to support everything fully._
