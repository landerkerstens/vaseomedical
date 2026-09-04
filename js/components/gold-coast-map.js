/* =========================================================
   <gold-coast-map> — "we are Gold Coast based" locator
   ---------------------------------------------------------
   A minimal outline of Australia with the Vaseo mark pinned on
   the Gold Coast. The two coastline paths are not hand-drawn:
   they are real longitude/latitude coordinates projected with an
   equirectangular projection (x scaled by cos 25°S, the mid
   latitude of the continent), so the mark sits where the Gold
   Coast actually is rather than roughly where it looks right.

   The coordinate list keeps only the defining features — Cape
   York, the Gulf, the Top End, the Kimberley, the Bight, the
   south-east corner — and is drawn as a closed Catmull-Rom
   spline, so the coastline reads as a soft outline rather than a
   faceted polygon. Detail finer than that (the narrow South
   Australian gulfs, individual headlands) is deliberately gone.

   Projection used for the numbers below:
     x = (lon - 112.9) * cos(25°) * 12
     y = (-10.0 - lat) * -12
   ========================================================= */

import { Component, define } from "../lib/component.js";

/* Gold Coast — 153.43°E, 28.02°S — through the projection above. */
const GC_X = 440.8;
const GC_Y = 216.2;

const MAINLAND =
  "M321.9 8.4 C327.7 7.8 346.7 44.7 352.4 58.8 C356 67.9 354.3 74.2 357.8 82.8 " +
  "C362.6 94.5 373.6 109.8 381.7 121.2 C388.8 131.1 396.2 138.8 403.5 147.6 " +
  "C410.7 156.4 419.4 165.2 425.2 174 C430.3 181.6 434.4 189.2 437.2 196.8 " +
  "C439.8 203.8 442 210.5 442.1 218 C442.2 226.7 438.6 236.9 436.1 246.0 " +
  "C433.7 255 431 265.1 427.4 272.4 C424.6 278.2 420.9 280.9 417.6 286.8 " +
  "C413.2 294.8 406.7 308.5 404.6 316.8 C403.1 322.3 406.2 327.2 403.2 331.2 " +
  "C398.3 337.6 380 342.8 368.7 344.4 C358.4 345.9 348.6 343 338.2 342.0 " +
  "C327.5 341 313.9 343.3 305.6 338.4 C298 333.9 295.8 321.9 289.3 315.6 " +
  "C283 309.6 275.1 304.4 267.5 301.2 C260.6 298.2 252.4 300.5 245.8 296.4 " +
  "C237.5 291.2 232.7 275 224 268.8 C216.2 263.2 206 260.4 196.9 259.2 " +
  "C187.9 258.1 179 259.8 169.7 261.6 C159.2 263.6 146.4 266.4 137 271.2 " +
  "C128.6 275.5 124.2 285 115.3 288 C104.8 291.6 88.6 285.4 77.2 288.0 " +
  "C67.1 290.3 58.8 301.1 50 301.2 C41.8 301.3 29.5 296.7 26.1 290.4 " +
  "C22.5 283.8 31.4 271.4 30.5 261.6 C29.4 250.7 22.3 239.1 18.5 228.0 " +
  "C14.7 217.1 8.5 206.1 7.6 195.6 C6.8 186.1 12.4 176 12 168.0 " +
  "C11.7 161.7 7 155.9 7.6 151.2 C8.1 147.4 9.9 144.6 13.1 141.6 " +
  "C18.2 136.7 30.5 131.4 39.2 128.4 C46.8 125.7 53.9 126.1 62 123.6 " +
  "C71.8 120.5 87.1 116.3 93.5 110.4 C98 106.3 97.4 100.2 101.1 96.0 " +
  "C105.4 91.2 113 89.2 118.5 84 C125.1 77.7 129.8 66.3 137 60.0 " +
  "C143.7 54.1 153.2 46.2 159.9 46.8 C165.7 47.4 170.8 60.7 175.1 60.0 " +
  "C179.6 59.2 182.3 46.2 186 40.8 C189 36.4 191.1 32 195.2 29.4 " +
  "C199.7 26.6 206 26.1 212.1 25.2 C219.1 24.2 227.1 23.8 234.9 24.0 " +
  "C243.1 24.2 257.4 22.2 259.9 26.4 C262.4 30.4 254.2 42.1 251.2 48.0 " +
  "C249.1 52.3 244 55.1 244.7 58.8 C245.8 64.3 259.9 70.5 267.5 75.6 " +
  "C274.8 80.4 282.4 86.6 289.3 88.8 C294.6 90.5 300.8 92.5 304.5 90.0 " +
  "C309.3 86.8 310.9 74.1 312.1 66 C313.4 58.1 311.3 49.4 312.1 42.0 " +
  "C312.9 35.5 314.8 29.7 316.5 24 C318.1 18.6 318.9 8.7 321.9 8.4 Z";

const TASMANIA =
  "M345.8 369.6 C348.2 367.7 358.9 373 365.4 373.2 " +
  "C371.9 373.4 381.9 367.9 385 370.8 C388 373.6 386 384.6 383.9 390.0 " +
  "C382 394.8 378.2 400.3 374.1 402 C370.2 403.7 363.6 403.1 360 400.8 " +
  "C356.3 398.4 354.8 391.9 352.4 387.6 C350.1 383.5 346.7 379 345.8 375.6 " +
  "C345.3 373.3 344.6 370.7 345.8 369.6 Z";

/* The Vaseo mark, lifted from favicon.svg so the pin carries the
   logo itself rather than a generic dot. */
const MARK_VIEWBOX = "11.15 2.88 157.78 157.78";
const MARK_PATH =
  "M72.798,49.285 L77.713,44.37 C93.368,28.715 107.412,36.187 116.436,45.212 L118.451,47.227 " +
  "L113.517,52.161 C100.045,65.633 83.463,59.245 72.798,49.285 M67.106,33.764 L51.565,49.305 " +
  "L61.01,58.75 C70.097,67.837 81.015,73.487 91.754,74.657 C103.834,75.974 115.028,71.863 " +
  "124.123,62.768 L129.058,57.833 L133.151,61.926 C142.176,70.951 149.648,84.995 133.992,100.65 " +
  "L115.465,119.178 C99.81,134.833 85.766,127.361 76.741,118.336 L29.686,71.281 L24.112,76.854 " +
  "C21.332,79.634 21.332,84.141 24.112,86.92 L66.134,128.943 C84.879,147.688 107.846,148.01 " +
  "126.072,129.784 L144.599,111.257 C162.825,93.031 162.502,70.065 143.758,51.32 L127.043,34.605 " +
  "C108.298,15.86 85.332,15.538 67.106,33.764";

class GoldCoastMap extends Component {
  render() {
    const markSize = 30;
    return `
      <figure class="aumap reveal">
        <svg class="aumap__svg" viewBox="-10 -14 745 444" role="img"
             aria-labelledby="aumap-title aumap-desc">
          <title id="aumap-title">Map of Australia</title>
          <desc id="aumap-desc">Vaseo Medical is based on the Gold Coast, Queensland, on the east coast of Australia.</desc>

          <g class="aumap__land">
            <path d="${MAINLAND}" />
            <path d="${TASMANIA}" />
          </g>

          <g class="aumap__callout" aria-hidden="true">
            <path class="aumap__leader" d="M${GC_X + 17} ${GC_Y - 17} L492 152 L512 152" />
            <text class="aumap__label" x="522" y="146">Gold Coast</text>
            <text class="aumap__sub" x="522" y="170">Queensland, Australia</text>
          </g>

          <g class="aumap__pin" aria-hidden="true">
            <circle class="aumap__pulse" cx="${GC_X}" cy="${GC_Y}" r="24" />
            <circle class="aumap__disc" cx="${GC_X}" cy="${GC_Y}" r="23" />
            <svg class="aumap__mark" x="${GC_X - markSize / 2}" y="${GC_Y - markSize / 2}"
                 width="${markSize}" height="${markSize}" viewBox="${MARK_VIEWBOX}">
              <path d="${MARK_PATH}" fill-rule="nonzero" />
            </svg>
          </g>
        </svg>
        <figcaption class="aumap__caption">Gold Coast based &mdash; supporting hospitals and specialists Australia-wide.</figcaption>
      </figure>
    `;
  }
}

define("gold-coast-map", GoldCoastMap);
