
const EMAIL_REGEX =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const MAX_WEIGHT = 1400
const MAX_HEIGHT = 108


module.exports = {
  verifyString(str, variableName = undefined){
    /**
     * Verifies there's content in the string
     * @param str a string
     * @param variableName (optional) If an error is thrown, adds name of variable to error message
     * @return str valid string
     * @throws Will throw a string if string is empty or undefined
     */
    if (typeof variableName === 'undefined'){
        variableName = "String";
    }
    if (typeof str === "undefined") throw `${variableName} must be provided`;
        if (typeof str !== "string") throw `${variableName} must be a string`;
        str = str.trim();
        if (str.length === 0) throw `${variableName} cannot be an empty string or just spaces`;
        return str;
  },
  /**
   * Verifies number
   * @param {Number} number a number of type numberType
   * @param {String} [variableName=Number] (optional) If an error is thrown, adds name of variable to error message
   * @param {String} [numberType=undefined] (optional) specify 'int' if number is an int, if not specified, just checks if number
   * @param {Number} [lowerBound=undefined] (optional) lower bound for number (inclusive)
   * @param {Number} [upperBound=undefined] (optional) upper bound for number (inclusive)
   * @returns {Number} number valid number of numberType
   * @throws Will throw a string if number is invalid or undefined
   */
  verifyNumber(number, variableName = undefined, numberType = undefined, lowerBound = undefined, upperBound = undefined) {
    if (typeof variableName === 'undefined') {
      variableName = 'number';
    }
    if (typeof number === 'undefined') throw `${variableName} must be provided`;
    if (typeof numberType === 'undefined') {
      if (typeof number !== 'number') throw `${variableName} must be a number`;
    } else if (numberType === 'int') {
      if (!Number.isInteger(number)) throw `${variableName} must be an integer`;
    } else throw 'numberType can only have value "int" or "undefined"';
    if (typeof lowerBound !== 'undefined') {
      if (number < lowerBound) throw `${variableName} cannot be below ${lowerBound}`;
    }
    if (typeof upperBound !== 'undefined') {
      if (number > upperBound) throw `${variableName} cannot be above ${upperBound}`;
    }
    
    return number;
  },
  verifyEmail(email){
    /**
     * Verifies a valid email.
     * @param {String} email valid email
     * @return {String} valid email
     * @throws Will throw an exception if email is invalid
     */
    email = this.verifyString(email, "Email").toLowerCase();
    if (email.match(EMAIL_REGEX)) return email;
    else throw "Email is invalid";
  },
  verifyWeight(weight){
    /**
     * Verifies weight is an integer.
     * @param {Integer} weight a non-empty integer
     * @return {Integer} integer
     * @throws Will throw an exception if weight is invalid
     */
    return this.verifyNumber(weight, "Weight", "int", 0, MAX_WEIGHT);
  },
  verifyHeight(height){
    /**
     * Verifies height is an integer.
     * @param {Integer} height a non-empty integer
     * @return {Integer} integer
     * @throws Will throw an exception if height is invalid
     */
    return this.verifyNumber(height, "Height", "int", 0, MAX_HEIGHT);
  },
  verifyDate(obj, variableName = undefined){
    /**
     * Verify a date object is of type date
     * @param {Date} obj Date Object
     * @param variableName (optional) If an error is thrown, adds name of variable to error message
     * @return {Date} Date Object
     * @throws Will throw an exception if object is not type Date
     */
    if (variableName === "undefind") {
        variableName = "Date";
    }
    if (typeof obj === "undefined") throw "Object must be provided";
    if (Object.prototype.toString.call(obj) !== '[object Date]') throw `${variableName} must be a date object`;

    //make sure date isn't in the future
    let today = new Date();
    if (obj > today) throw 'date cannot be in the future';

    return obj
  },
  verifyBirthDate(birthDate){
    /**
     * Verifies birthDate is a date object.
     * @param {Date} birthDate a date object
     * @return {Date} date object
     * @throws Will throw an exception if birthDate is invalid
     */
    if (typeof birthDate !== "object") throw "Birth Date must be a Date object";
    
    birthDate = this.verifyDate(birthDate, "Birth Date");
    //see if user is at least 13 years old and not above 120
    let today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
        years--;
    }
    if (years < 13) {
        throw 'user\'s birthdate is below 13 years of age';
    }
    if (years > 120) {
        throw 'user\'s birthdate is above 120 years of age';
    }

    return birthDate;
  },
}
