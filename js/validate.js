const success = "\x1b[32m%s\x1b[0m";
const warning = "\x1b[33m%s\x1b[0m";
const error = "\x1b[31m%s\x1b[0m";

if (!process.argv[2]) {
  console.log(warning, "Enter a number like YYYYMMDDNNNN or NNNNNN-NNNN");
  process.exit(1);
}

const number = process.argv.slice(2, process.argv.length).join("");

const validateOrgOrPersonalNumber = require("ispersonnummerororganisationsnummer");
const { valid, isOrg, msg } = validateOrgOrPersonalNumber(number);

const type = isOrg ? "organisationsnummer" : "personnummer";
console.log(
  valid ? success : error,
  valid ? `${number} is a valid ${type}` : "Number is invalid"
);
if (!valid) {
  console.log(warning, msg);
}

process.exit(0);
