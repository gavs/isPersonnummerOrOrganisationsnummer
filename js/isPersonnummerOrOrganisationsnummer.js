
function getCurrentShortYear() {
  const d = new Date();
  return d.getFullYear().toString().substr(-2);
}

function isDate(year, month, day) {
  // months have number 0-11 in JavaScript
  const m = month - 1;
  const tmpDate = new Date(year, m, day);
  if (
    (parseInt(tmpDate.getFullYear(), 10) === parseInt(year, 10)) &&
    (parseInt(tmpDate.getMonth(), 10) === parseInt(m, 10)) &&
    (parseInt(tmpDate.getDate(), 10) === parseInt(day, 10))
  ) {
    return true;
  }
  return false;
}

function validateOrgOrPersonalNumber(input) {
  // check if number matches a swedish personal identity number or an organization number
  if (typeof input === 'undefined' || !input.match(/^(\d{6}|\d{8})(-|\+|\s)?(\d{4})$/)) {
    return { valid: false, isOrg: undefined, msg: 'does not match input rule' };
  }

  const group = RegExp.$1;
  const separator = RegExp.$2;
  const controldigits = RegExp.$3;
  let number = group + controldigits;

  // assume it is an organization number
  let isOrgNum = true;

  // check if number is a personal number
  if (group.length === 8) {
    isOrgNum = false;
    // personal number can't be before 1900's
    if (number.substring(0,2) < 19) {
      return { valid: false, isOrg: isOrgNum, msg: 'year is less than 1900' };
    }
  }
  // third number in an org number can not be less than 2
  if (isOrgNum && number.substring(2, 3) < 2) {
    isOrgNum = false;
  }

  // adjust personal number to format YYYYMMDDNNNN
  if (!isOrgNum && group.length === 6) {
    // append the year 1900 or 2000
    if (separator === '+') {
      // person is over 100 years old so we can assume was born in th 1900s
      number = `19${number}`
    }
    else if (number.substring(0,2) > getCurrentShortYear()) {
      // person was born in the 1900s
      number = `19${number}`;
    }
    else {
      // person was born in the 2000s
      number = `20${number}`;
    }
  }

  // check if personal id number is a fake date
  if (!isOrgNum && !isDate(number.substring(0,4), number.substring(4,6), number.substring(6,8))) {
    return { valid: false, isOrg: isOrgNum, msg: 'fake date' };

  }

  // check if birth date is in the future
  if (!isOrgNum && new Date(number.substring(0,4), number.substring(4,6), number.substring(6,8)) > new Date()) {
    return { valid: false, isOrg: isOrgNum, msg: 'future date' };
  }

  // calculate and validate checksum with Luhn algorithm
  let luhnSerie = "";
  const numIndex = number.length === 12 ? 2 : 0;
  for (let n = numIndex; n < number.length; n += 1) {
    luhnSerie += ((((n + 1) % 2) + 1) * number.substring(n, n + 1));
  }

  let checksum = 0;

  for (let n = 0; n < luhnSerie.length; n += 1) {
    checksum += luhnSerie.substring(n, n + 1) * 1;
  }

  return { valid: checksum % 10 === 0, isOrg: isOrgNum, msg: checksum % 10 === 0 ? 'all good' : 'wrong checksum' };
}

module.exports = {
  validateOrgOrPersonalNumber: validateOrgOrPersonalNumber,
}
