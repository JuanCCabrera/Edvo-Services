//validate string with accents no space
function validateNoSpace( toValidate ) {
    var str = toValidate;
    var patt = new RegExp(/^[a-zA-ZÀ-ÿ]*$/);
    var patt1= new RegExp(/^\s/);
    if (str == "" || patt1.test(str) ){
        return true;
      }else{
        return !patt.test(str);
      }
  }
 //validate strings no number
function validateStrings( toValidate ) {
    var str = toValidate;
    var patt = new RegExp(/^[a-zA-ZÀ-ÿ\s]*$/);
    var patt1= new RegExp(/^\s/);
    if (str == "" || patt1.test(str) ){
        return true;
    }else{
        return !patt.test(str);
    }
  }
  
  //validate location type
  function validateStringLocation( toValidate ) {
    var str = toValidate;
    var patt = new RegExp(/^[a-zA-ZÀ-ÿ\s\,\.]*$/);
    var patt1= new RegExp(/^\s/);
    if (str == "" || patt1.test(str) ){
        return true;
    }else{
        return !patt.test(str);
    }
  }

  //validate rate
  function validateRate( toValidate ) {
    var str = toValidate;
    var patt = new RegExp(/^[0-9]{1}$/);
    var patt1= new RegExp(/^\s/);
    if (str == "" || patt1.test(str) ){
        return true;
    }else{
        return !patt.test(str);
    }
  }
  
  //validate integer
  function validateInt( toValidate ) {
    var str = toValidate;
    var patt = new RegExp(/^[0-9]*$/);
    var patt1= new RegExp(/^\s/);
    if (str == "" || patt1.test(str) ){
        return true;
    }else{
        return !patt.test(str);
    }
  }
  
  //validate token
  function validatetoken( toValidate ) {
    var str = toValidate;
    var patt = new RegExp(/^[a-zA-Z0-9\_]*$/);
    var patt1= new RegExp(/^\s/);
    if (str == "" || patt1.test(str) ){
      return true;
    }else{
      return !patt.test(str);
    }
  }
  
//validate userid
function validateUserID( toValidate ) {
    var str = toValidate.toString();
    var patt = new RegExp(/^[a-zA-Z0-9\|]*$/);
    var patt1= new RegExp(/^\s/);
    if (str == "" || patt1.test(str) ){
      return true;
    }else{
      return !patt.test(str);
    }
}
  
//validate boolean
function validateBool( toValidate ) {
    var str = toValidate;
    var patt = new RegExp(/^(true|false)*$/);
    var patt1= new RegExp(/^\s/);
    if (str == "" || patt1.test(str) ){
        return true;
      }else{
        return !patt.test(str);
      }
}
  
//validate education
function validateEd( toValidate ) {
    var str = toValidate;
    var patt = new RegExp(/^[a-zA-Z\'\s]*$/);
    var patt1= new RegExp(/^\s/);
    if (str == "" || patt1.test(str) ){
      return true;
    }else{
      return !patt.test(str);
    }
}
  //validate email
function validateEmail( toValidate ) {
    var str = toValidate;
    var patt = new RegExp(/[a-zA-Z0-9._%+-]@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    var patt1= new RegExp(/^\s/);
    if (str == "" || patt1.test(str) ){
      return true;
    }else{
      return !patt.test(str);
    }
}
  //validate Date
function validateDate( toValidate ) {
    var str = toValidate;
    var patt = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
    var patt1= new RegExp(/^\s/);
    if (str == "" || patt1.test(str) ){
      return true;
    }else{
      return !patt.test(str);
    }
  }
//validate timestamp
function validateTime( toValidate ) {
    var str = toValidate;
    var patt = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}[\s]{1}[0-9]{2}\:[0-9]{2}:[0-9]{2}$/);
    var patt1= new RegExp(/^\s/);
    if (str == "" || patt1.test(str) ){
        return true;
    }else{
        return !patt.test(str);
    }
}

//validate Level
function validateLevel( toValidate ) {
    var str = toValidate;
    var patt = new RegExp(/^[a-zA-Z0-9\-\/\s]*$/);
    var patt1= new RegExp(/^\s/);
    if (str == "" || patt1.test(str) ){
      return true;
    }else{
      return !patt.test(str);
    }
  }

//validate group size
function validateGroup( toValidate ) {
    var str = toValidate;
    var patt = new RegExp(/^[0-9\-\+\s]*$/);
    var patt1= new RegExp(/^\s/);
    if (str == "" || patt1.test(str) ){
      return true;
    }else{
      return !patt.test(str);
    }
}

function validateLongText( toValidate){
    var str = toValidate;
    var patt1= new RegExp(/^\s/);
    if (str == "" || patt1.test(str) ){
      return true;
    }else{
      return false;
    }
}
  
  module.exports = {
    validateUserID:validateUserID,
    validateBool:validateBool,
    validateEd:validateEd,
    validateEmail:validateEmail,
    validateInt:validateInt,
    validateNoSpace:validateNoSpace,
    validateRate,validateRate,
    validateStringLocation:validateStringLocation,
    validateStrings:validateStrings,
    validatetoken:validatetoken,
    validateDate:validateDate,
    validateLevel:validateLevel,
    validateGroup:validateGroup,
    validateTime:validateTime,
    validateLongText:validateLongText
}
  //var patt = new RegExp(/^[a-zA-Z\s]*$/);
  //var res = patt.test(str);
  //À-ÿ  accents
  //^[a-zA-Z\s]{0,35}$  with limit of characters
  //^[a-zA-Z]*$  regex just letters
  //^[a-zA-Z\s]*$ regex just leters and spaces
  //^[a-zA-Z\s\,]*$ regex just letters space and commas