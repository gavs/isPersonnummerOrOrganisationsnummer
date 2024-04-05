function validateInput() {
    const number = document.getElementById('org').value;
    const text = document.getElementById("text");
    if (number.length === 0) {
        text.innerHTML="Type to start";
        return false;
    }
    if (number.length < 10) {
        text.innerHTML="yymmdd-nnnn or nnnnnnnnnn";
        return false;
    }
    const { valid, isOrg, msg } = validateOrgOrPersonalNumber(number);
    if(valid) {
        text.innerHTML=`is a valid ${isOrg ? 'organisation' : 'personal'} number.`;
    } else {
        text.innerHTML=`is not a organisation or personal number.<br />- ${msg}`;
    }
}