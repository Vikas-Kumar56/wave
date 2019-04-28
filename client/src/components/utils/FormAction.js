export const generateFormData = (formdata, formName) => {
  let dataToSubmit = {};

  for (let key in formdata) {
    dataToSubmit[key] = formdata[key].value;
  }

  return dataToSubmit;
};

export const validate = (element, formdata = []) => {
  let error = {
    isValid: true,
    message: ""
  };

  if (element.validation.email) {
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    error.isValid = reg.test(element.value.trim());
    error.message = `${
      error.isValid ? "" : "Please enter valid email address"
    } `;

    if (!error.isValid) {
      return error;
    }
  }

  if (element.validation.confirm) {
    error.isValid =
      element.value === formdata[element.validation.confirm].value;
    error.message = `${error.isValid ? "" : "Password does not match"} `;
    if (!error.isValid) {
      return error;
    }
  }
  if (element.validation.required) {
    error.isValid = element.value.trim() !== "";
    error.message = `${error.isValid ? "" : "This field is required."} `;
    return error;
  }
};

export const update = (element, formdata, formName) => {
  let newFormdata = {
    ...formdata
  };

  let newElement = {
    ...newFormdata[element.id]
  };

  newElement.value = element.event.target.value;
  let validationSummary = validate(newElement, formdata);
  newElement.valid = validationSummary.isValid;
  newElement.validationMessage = validationSummary.message;
  newElement.touched = true;
  newFormdata[element.id] = newElement;
  return newFormdata;
};

export const isFormValid = (form, formName) => {
  let isValid = true;

  for (let key in form.formData) {
    isValid = isValid && form.formData[key].valid;
  }
  return isValid;
};
