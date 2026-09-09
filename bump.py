#!/usr/bin/env python3
"""Stamp a new cache-busting version onto every script URL.

The site has no build step, so the browser decides for itself how long to
hold on to js/*.js. GitHub Pages sends max-age=600, but browsers keep ES
modules well past that, which means a visitor can sit on old JavaScript
after a deploy and see none of the change.

Appending ?v=<version> to every script URL gives the new files new URLs,
so a stale copy can never be reused. Run this once after editing anything
under js/ and before pushing:

    python3 bump.py

It rewrites the <script src> in the HTML pages and every relative import
inside js/, then prints the version it used.
"""

import datetime
import pathlib
import re

ROOT = pathlib.Path(__file__).parent
VERSION = datetime.datetime.now().strftime("%Y%m%d%H%M")

# ?v=... on a relative .js URL, whether in an import or a <script src>.
SPECIFIER = re.compile(r'(?P<url>(?:\./|\.\./|js/)[\w./-]+\.js)(?:\?v=[\w.-]+)?')


def stamp(text):
    return SPECIFIER.sub(lambda m: f"{m.group('url')}?v={VERSION}", text)


def main():
    targets = sorted(ROOT.glob("*.html")) + sorted(ROOT.glob("js/**/*.js"))
    changed = 0
    for path in targets:
        original = path.read_text()
        updated = stamp(original)
        if updated != original:
            path.write_text(updated)
            changed += 1
    print(f"stamped v={VERSION} onto {changed} file(s)")


if __name__ == "__main__":
    main()
