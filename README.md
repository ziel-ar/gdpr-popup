# gdpr-popup

A tool to display popup in which the user can decide whether to agree to the collection of cookies by third parties.

### [View the demo](https://ziel-ar.github.io/gdpr-popup/)

Features of the demo version:
- The cookie that saves information about the user's decision (accept / reject) expires after 5 seconds. Refreshing the page after this time will display the popup again.
- The cookie that records information about what vendros we have accepted expires after 10 seconds. This means that within 6-10 seconds of acceptance, the popup will show saved vendors.
- You can also press the button to force generating popup and loading vendors.
- The vendors list contains test data.

## Table of Contents
- [Installation](#installation)
- [Features](#features)
- [Limitations](#limitations)

## Installation
Just embed files from the assets folder into your page's head or body.
```html
<link rel="stylesheet" href="styles.css" class="stylesheet" />
<script src="script.js"></script>
```

## Features

- written in vanilla JavaScript
- popup, when displayed, blocks the ability to scroll the page
- delivered vendors will be sorted alphabetically
- each vendor has a link to its privacy policy and the option to accept it
- popup opens only on pages with the https protocol
- the popup contains two buttons (accept and reject) and the user's decision with the list of accepted vendors is saved in (separate) cookies
>By default the decision cookie expires after 24 hours, the vendors list cookie expires after 48 hours. Thanks to this, after a day the user will see the popup again, but will also see their saved choices. After two days, the popup will return to the default form - all vendors selected for acceptance.

- CSS prefixes generated using https://autoprefixer.github.io/
- compiled for ES5 using https://babeljs.io/en/repl

## Limitations

- at the moment popup displays vendors list with test data but you can point to any json file (by editing requestURL) whose structure looks like this:
```json
{
    "vendors": [
        {
            "id": 1,
            "name": "First Company",
            "policyUrl": "https://firstcompanywebpage.com/privacy-policy/"
        },
        {
            "id": 2,
            "name": "Second Company",
            "policyUrl": "https://secondcompanywebpage.com/privacy-policy/"
        },
        {
            "id": 3,
            "name": "Third Company",
            "policyUrl": "https://thirdcompanywebpage.com/privacy-policy/"
        }
        (...)
    ]
}
```
- the list of accepted vendors is saved in cookies as a list of their IDs in one long, comma-separated string
>Why not json? This way we do not save unnecessary tags in cookies and the entire available size (4096 Bytes) can be used to save a maximum of 1,300 IDs (0-1029 comma-separated).
>However, we should be aware of this limitation and for larger collections it would be necessary to split their IDs into more cookies.

>Another consequence of this solution is the fact that a given ID can be used only once. Assigning ID after a former vendor will result in errors for existing cookies.

- popup has the css z-index property set to 1, increase this value if you have other items of the same or greater value on the page to make sure that the popup appears on top of everything

## Motivation

Creating such a tool was a recruitment task.
