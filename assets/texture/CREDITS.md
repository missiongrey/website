# Documentary imagery: sources and credits

Real, public material used as evidence or context on the site (round
eleven). Every file here is public domain, a US Government work, or
published under a licence that permits reuse with credit. The on-page
credit is printed in the figure's metadata line; the full credit and the
source are recorded here. Acquisition dates live here, not on the pages.

## Home

### suez-ship-backlog-landsat.jpg

- **File**: `assets/texture/suez-ship-backlog-landsat.jpg`, 1800x750, grayscale JPEG, quality 82, 115KB.
- **Where it is used**: the home page, in `#outside`, beside "The cost is often not ignorance. It is delay."
- **Subject**: about a hundred cargo ships and tankers lying at anchor in the Gulf of Suez on 27 March 2021, waiting out the blockage of the Suez Canal. Landsat 8 OLI, via NASA Earth Observatory.
- **Source page**: https://science.nasa.gov/earth/earth-observatory/traffic-jam-on-the-suez-canal-148114/
- **Source file**: https://assets.science.nasa.gov/content/dam/science/esd/eo/images/imagerecords/148000/148114/suezcanal_oli_202186_lrg.jpg (2653x3316, sha256 f891fa0f1d5ba20d6cbc6a613ec1868457dd87e01b47baee86b6b5fc18bc0e93)
- **Licence**: a work of the US federal government, generally not subject to copyright in the United States. NASA Images and Media Usage Guidelines, read at https://www.nasa.gov/nasa-brand-center/images-and-media/ . No NASA insignia or logotype appears in the file.
- **Credit line printed on the page**, in the metadata voice under the plate: NASA Earth Observatory, Landsat data from the U.S. Geological Survey
- **Full credit**, written into the file's own metadata and recorded here: NASA Earth Observatory images by Lauren Dauphin and Joshua Stevens, using Landsat data from the U.S. Geological Survey.
- **Acquired**: 2026-09-20.
- **What was done to it**: one rectangular crop, x 180 to 1980 and y 900 to 1650 of the source, taken at full resolution; converted to grayscale; contrast lifted (sigmoidal 3.5 at 48 percent) with the white point held just under the page ground so the image never prints brighter than the paper. Nothing else: no compositing, no overlay, no retouching, and the geometry inside the crop is the geometry of the source.


## Platform

### `iberian-blackout-black-marble.jpg`

- **Where it is used**: `/platform/`, the `External intelligence` section
  (`#breadth`), beside the head "External change arrives on four levels." Context
  for the words next to it: a real external event, read from outside the
  organization it affected. One moment on the page; there is no second.
- **Subject**: NASA Black Marble nighttime-lights map of Andalusia, southern
  Spain, on the night of the Iberian peninsula power blackout. Acquired
  28 April 2025. The date is recorded here and is printed on no page.
- **Source page**: https://science.nasa.gov/earth/earth-observatory/blackout-in-andalusia-154238/
- **Direct file**: https://assets.science.nasa.gov/content/dam/science/esd/eo/images/imagerecords/154000/154238/spainpowerbm_vir_20250428_lrg.jpg
- **Licence**: US federal government work, not subject to copyright in the
  United States. NASA Images and Media Usage Guidelines,
  https://www.nasa.gov/nasa-brand-center/images-and-media/ . The NASA insignia
  and logotype are not covered by that permission and appear nowhere in this
  file.
- **Full credit line**: `NASA Earth Observatory images by Lauren Dauphin, using
  Black Marble data courtesy of Ranjay Shrestha/NASA Goddard Space Flight
  Center.` Printed in the file's own JPEG metadata together with the source URL.
- **On-page credit (mono metadata line)**: `NASA Black Marble, NASA Goddard
  Space Flight Center`
- **Alt text**: `A nighttime lights map of southern Spain during a regional
  power blackout: scattered white settlement lights on a black field, with the
  south coast drawn as a thin pale line`
- **What was done to the file**: grayscale conversion (the source is already
  near-monochrome: white settlement points on black with one thin cyan
  coastline stroke), resize from 2871x1914 to 1800x1200, a sigmoidal contrast
  curve (5, 18 percent) to lift the settlement points onto a light page, JPEG
  quality 80. `magick <source> -colorspace Gray -resize 1800x1200
  -sigmoidal-contrast 5,18% -quality 80`. **Geometry is untouched: no crop into
  the file, no compositing, no overlay, nothing added to or removed from the
  data.** The page shows a rect of the frame (source y 330 to 1080 at full
  width on the wide layout, y 188 to 1200 under 1101px), stated in stylesheet
  subsection 33.2 the way every other crop on this site is stated.

## About


