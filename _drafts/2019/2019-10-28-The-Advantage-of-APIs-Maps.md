---
layout: post
title: 'The advantage of modern API''s: Maps'
date: 2019-10-28T19:00:00.000+00:00
categories: 
tags:
- html
- native elements
- development
- JavaScript
- API
- geolocation
- maps
permalink: API-Maps
heroImg:
- url: 2019/Maps-API-GPX-Route.png
  alt: Example of a maps API with a GPX Route rendered on it.

---
Last weekend I made just another trip on my [BMW Motorcycle](https://bmwboxer.nl){:data-title="BMW Motorcycle"} and logged my trip with [Scenic by MotorMappers](https://www.motomappers.com/){:data-title="Scenic by MotorMappers"}, almost as usual when I go for a ride longer than an hour.
Sometimes I post about a trip, like te previous trip with a large group. I made a video, some pictures and a log of the route. I added the log as a screenshot to the post.

Sunday I thought this could be different/better _(even for this personal website)_, there are so many great API's to use. Lets see if I can render my <abbr title="GPS Exchange format, an XML scheme for sharing route information.">gpx file</abbr> on a map on the page (along with my post).

For my [Lab API testpage](https://lab.rubenjanssen.nl/api){:data-title="Lab API testpage"} I already used Google Static maps and currently Mapbox to display the user's location.

I used openstreetmap in combination with Mapbox to display the map and render the route. Most API's can't handle the GPX data so I had to convert this file to a readable JSON format for the map API.
Mapbox has a tool called [toGeoJSON](https://mapbox.github.io/togeojson/){:data-title="toGeoJSON"} to do this which I added to the site to do it on the fly.
From a performance perspective this isn't the best way, preferably the JSON is stored and directly given to the API. But if I decide to provide the GPX file as a download within the posts. I can easily add that by modifying the post rendering.

So now you can view [my route from Saturday](https://bmwboxer.nl/Herfstrit-2019/){:data-title="my route from Saturday"} and zoom in as close as you want.