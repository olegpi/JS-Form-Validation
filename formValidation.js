var formValidationComponent = function() {
	var Self = this,
		defaults = {
			'labnameError': 'Error labname',
			'labemailError': 'Error labemail',
			'labphoneError': 'Error labphone',
			'labForm': document.getElementById('labForm'),
		};

	Self.init = function() {
		Self.attachEvents();
	};
	
	Self.attachEvents = function(){
		defaults.labForm.addEventListener("submit", Self.formValidation);
	};

	Self.formValidation = function(e) {
		e.preventDefault();
		
		let el = defaults.labForm.elements,
			submitFlag = true,
			validateFlag = true;
			
		for (i = 0; i < el.length; i++) {
			let errorMsg = document.querySelector('.' + el[i].name + 'Error');
			errorMsg ? errorMsg.innerHTML = "" : null ;
			switch (el[i].name) {
				case 'labname':
					validateFlag = Self.validateInputEmpty(el[i].value, errorMsg, defaults.labnameError);
					(submitFlag && validateFlag) ? submitFlag = true : submitFlag = false;
					break;
				case 'labemail':
					validateFlag = Self.validateInputEmail(el[i].value, errorMsg, defaults.labemailError);
					(submitFlag && validateFlag) ? submitFlag = true : submitFlag = false;
					break;
				case 'labphone':
					validateFlag = Self.validateInputPhone(el[i].value, errorMsg, defaults.labphoneError);
					(submitFlag && validateFlag) ? submitFlag = true : submitFlag = false;
					break;
			}
		}

		submitFlag === true ? Self.submitForm(defaults.labForm) : null;
	}
	
	Self.submitForm = function(form) {
		let submitFormFunction = Object.getPrototypeOf(form).submit;
        submitFormFunction.call(form);
    }
	
	Self.validateInputEmpty = function(elValue, error, msg) {
		if(elValue.length <= 0){
			error.innerHTML = msg;
			return false;
		}
		return true;
	}
	
	Self.validateInputEmail = function(elValue, error, msg) {
		let re = /^([\-\w+\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if(elValue.length <= 0 || !re.test(elValue)){
			error.innerHTML = msg;
			return false;
		}		
		return true;
	}
	
	Self.validateInputPhone = function(elValue, error, msg) {
		let re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
		if(elValue.length <= 0 || !re.test(elValue)){
			error.innerHTML = msg;
			return false;
		}		
		return true;
	}		
};
