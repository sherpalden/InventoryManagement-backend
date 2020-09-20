//String validation
const stringValidation = (str) => {
	if (/^[a-z A-Z]+$/.test(str)) {
		str = str.trim();//trim leading and trailling spaces..
		str = str.replace(/\s\s+/g, ' ');//trim middle spaces more than one.\
		return true;
	}else{
		return false;
	}
}

const numberValidation = (req) => {
	if (/^[0-9]+$/.test(req)){
		return true;
	}else{
		return false;
	}
}

const phoneNumberLengthValidation = (req) => {
	if(req.length == 10) {
		return true;
	}
	else return false;
}

const emailValidation = (req) => {
	if(req == null || req == "") return false;
	if(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(req)){
		return true;
	}else{
		return false;
	}
}

const passwordLengthValidation = (req) => {
	if(req.length >= 8) return true;
	else return false;
}

const noSpaceValidation = (req) => {
	if(req.split(" ").length > 1){
		return false;
	}else{
		return true;
	}
}

module.exports = { 	
	stringValidation,
	numberValidation,
	phoneNumberLengthValidation,
	emailValidation,
	passwordLengthValidation,
	noSpaceValidation
}