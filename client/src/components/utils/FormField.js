import React from "react";

const FormField = ({ formData, id, change }) => {
  const showError = () => {
    let errorMessage = "";

    if (formData.validation && !formData.valid) {
      errorMessage = (
        <div className="error_label">{formData.validationMessage}</div>
      );
    }

    return errorMessage;
  };
  const renderTemplate = () => {
    let template = "";
    switch (formData.element) {
      case "input":
        template = (
          <div className="formBlock">
            {formData.label ? (
              <label className="label_inputs">{formData.label}</label>
            ) : null}
            <input
              className={
                !formData.valid && formData.touched
                  ? "error_border"
                  : formData.touched
                  ? "success_border"
                  : ""
              }
              {...formData.config}
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      case "textarea":
        template = (
          <div className="formBlock">
            {formData.label ? (
              <label className="label_inputs">{formData.label}</label>
            ) : null}
            <textarea
              className={
                !formData.valid && formData.touched
                  ? "error_border"
                  : formData.touched
                  ? "success_border"
                  : ""
              }
              {...formData.config}
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      case "select":
        template = (
          <div className="formBlock">
            {formData.label ? (
              <label className="label_inputs">{formData.label}</label>
            ) : null}
            <select
              className={
                !formData.valid && formData.touched
                  ? "error_border"
                  : formData.touched
                  ? "success_border"
                  : ""
              }
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            >
              <option value="">Select One</option>
              {formData.config.options.map(opt => {
                return (
                  <option key={opt.key} value={opt.key}>
                    {opt.value}
                  </option>
                );
              })}
            </select>
            {showError()}
          </div>
        );
        break;
      default:
        template = "";
    }
    return template;
  };
  return <div>{renderTemplate()}</div>;
};

export default FormField;
