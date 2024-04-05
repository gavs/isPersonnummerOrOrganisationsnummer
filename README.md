# isPersonnummerOrOrganisationsnummer

Validate if a number is a Swedish personal ID number or an organisation number.

Try the [demo](https://gavs.github.io/isPersonnummerOrOrganisationsnummer/).

Personal ID number supports the following formats:
* YYMMDDNNNN
* YYMMDD NNNN
* YYMMDD-NNNN
* YYMMDD+NNNN
* YYYYMMDDNNNN
* YYYYMMDD NNNN
* YYYYMMDD-NNNN
* YYYYMMDD+NNNN

Organisation number supports the following formats:
* NNNNNNNNNN
* NNNNNN NNNN
* NNNNNN-NNNN
* NNNNNN+NNNN

## Installation
```
$ npm install ispersonnummerororganisationsnummer
```

## Example
```js
const validateOrgOrPersonalNumber = require("ispersonnummerororganisationsnummer");
console.log(validateOrgOrPersonalNumber("YYMMDDNNNN"));
```

## Output

Example output:

```js
{ valid: true, isSammordningsNum: false, isOrg: true, msg: "all good" }
```

`valid: true` number is a valid input

`valid: true && isSammordningsNum: true` is personnummer/sammordningsnummer

`valid: true && isOrg: false` is personnummer

`valid: true && isOrg: true` is organisationsnummer

`msg` additional info
