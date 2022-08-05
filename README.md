![icon](artwork/RegexToolbox-icon-100.png)

# RegexToolbox.js [![CircleCI](https://img.shields.io/circleci/build/gh/markwhitaker/RegexToolbox.JS)](https://circleci.com/gh/markwhitaker/RegexToolbox.JS) [![npm](https://img.shields.io/npm/v/regextoolbox)](https://www.npmjs.com/package/regextoolbox) [![npm](https://img.shields.io/npm/dw/regextoolbox)](https://www.npmjs.com/package/regextoolbox)

Regular expression tools for JavaScript developers.

## Installation

```
npm i regextoolbox
```

## RegexBuilder

`RegexBuilder` is a class for building regular expressions in a more human-readable way using a fluent API. It offers a number of benefits over using raw regex syntax in strings:

 - No knowledge of regular expression syntax is required: just use simple, intuitively-named classes and methods.
 - Code is easier to read, understand and maintain.
 - Code is safer and far less prone to regular expression syntax errors and programmer errors.

It is fully documented in the [project wiki](https://github.com/markwhitaker/RegexToolbox.JS/wiki).

## ⚠️ Breaking changes in 2.0

### Improved group syntax

The grouping methods have been totally overhauled in version 2.0 to make them easier to use and less error-prone.

Go from this:

```javascript
const regex = new RegexBuilder()
    .startGroup()
    .digit()
    .letter()
    .buildRegex(); // ERROR: forgot to call endGroup()
```

To this:

```javascript
const regex = new RegexBuilder()
    .group(r => r
        .digit()
        .letter()
    )
    .buildRegex();
```

Details of breaking changes:

| Removed                                   | Replaced with         |
|-------------------------------------------|-----------------------|
| `startGroup() ... endGroup()`             | `group()`             |
| `startNonCapturingGroup() ... endGroup()` | `nonCapturingGroup()` |

### `butAsFewAsPossible` is now a getter

Go from this:

```javascript
RegexQuantifier.oneOrMore.butAsFewAsPossible()
```

to this:

```javascript
RegexQuantifier.oneOrMore.butAsFewAsPossible
```

## Also new in 2.0

### Support for named groups

Support for named groups has been added. Where the captured values for regular groups are retrieved like this:

```javascript
const regex = new RegexBuilder()
    .group(r => r
        .uppercaseLetter()
    )
    .lowercaseLetter(RegexQuantifier.oneOrMore)
    .buildRegex();

const initial = regex.exec("Mark")[1]; // "M"
```

the captured values for named groups are retrieved like this:

```javascript
// Get a number using a group of digits
const regex = new RegexBuilder()
    .namedGroup("initialLetter", r => r
        .uppercaseLetter()
    )
    .lowercaseLetter(RegexQuantifier.oneOrMore)
    .buildRegex();

const initial = regex.exec(input).groups.initialLetter; // "M"
```

## Also for JavaScript developers

![icon](https://raw.githubusercontent.com/markwhitaker/MimeTypes.js/main/artwork/MimeTypes-icon-32.png) [MimeTypes.js](https://github.com/markwhitaker/MimeTypes.js): MIME type constants for your JavaScript projects

## RegexToolbox for other languages

![icon](https://raw.githubusercontent.com/markwhitaker/RegexToolbox.NET/master/Artwork/RegexToolbox-icon-32.png) [RegexToolbox for .NET](https://github.com/markwhitaker/RegexToolbox.NET)

![icon](https://raw.githubusercontent.com/markwhitaker/RegexToolbox.Java/master/artwork/RegexToolbox-icon-32.png) [RegexToolbox for Java](https://github.com/markwhitaker/RegexToolbox.Java)

![icon](https://raw.githubusercontent.com/markwhitaker/RegexToolbox.kt/master/artwork/RegexToolbox-icon-32.png) [RegexToolbox for Kotlin](https://github.com/markwhitaker/RegexToolbox.kt).

---
###### **RegexToolbox:** Now you can be a [hero](https://xkcd.com/208/) without knowing regular expressions.
