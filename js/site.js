function validateInput(val) {
  const text = document.getElementById("text");
  if (val.length === 0) {
    text.innerHTML = "Type to start";
    return false;
  }
  if (val.length < 10) {
    text.innerHTML = "yymmdd-nnnn or nnnnnnnnnn";
    return false;
  }
  const { valid, isSammordningsNum, isOrg, msg } =
    validateOrgOrPersonalNumber(val);
  if (valid) {
    text.innerHTML = `is a valid ${
      isOrg
        ? "organisationsnummer"
        : isSammordningsNum
        ? "personnummer/sammordningsnummer"
        : "personnummer"
    }.`;
  } else {
    text.innerHTML = `is not a organisation or personal number.<br />- ${msg}`;
  }
}

function keyCode(event, input) {
  const text = document.getElementById("text");
  var key = event.keyCode;
  if (key === 27) {
    input.value = "";
    text.innerHTML = "Type to start";
    return false;
  }
}
