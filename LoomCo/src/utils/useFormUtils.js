export function checkForErrors(form) {
    for (const input in form) {
        if (form[input].error) return true;
    }
    return false;
}


export function transformFormObj(formObj) {
    let newObj = {}

    for (const input in formObj) {
        newObj[input] = {};
        newObj[input].value = formObj[input].value

        if (formObj[input].required && formObj[input].value.length === 0) {
            if (formObj[input].alternativeName) {
                newObj[input].error = `${formObj[input].alternativeName} is required`
                continue
            }
            newObj[input].error = `${input} is required`
            continue
        }

        if(formObj[input].link){
            if(formObj[input].value.match(/^https?:\/\//) === null){
                newObj[input].error = `url is invalid`
            }
        }

        if (formObj[input].match) {
            if (formObj[input].value !== formObj.password.value) {
                newObj[input].error = `Passwords must match`
                continue
            }
        }

         if(formObj[input].email){
            if(formObj[input].value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) === null){
                newObj[input].error = `email is invalid`
            }
        }

        if(!formObj[input].administration && formObj[input].administration !== undefined){            
            if (formObj[input].value === "Admin" || formObj[input].value === "admin") {
                newObj[input].error = `${input} cant be Admin/admin`
                continue
            } 
        }

        if (formObj[input].maxL === formObj[input].minL && formObj[input].value.length !== formObj[input].maxL) {
            if (formObj[input].maxL !== undefined) {
                newObj[input].error = `${input} must beaaaa between ${formObj[input].minL} and ${formObj[input].maxL} characters`;
                continue
            }
        }

        if (formObj[input].maxL && formObj[input].minL) {
            if (formObj[input].value.length > formObj[input].maxL || formObj[input].value.length < formObj[input].minL) {
                if (formObj[input].alternativeName) {
                    newObj[input].error = `${formObj[input].alternativeName} must be between ${formObj[input].minL} and ${formObj[input].maxL} characters`;
                    continue
                }
                newObj[input].error = `${input} must be between ${formObj[input].minL} and ${formObj[input].maxL} characters`;
                continue
            }
        }

        if(formObj[input].maxNL && formObj[input].minNL){
            if (Number(formObj[input].value) > Number(formObj[input].maxNL) || Number(formObj[input].value) < Number(formObj[input].minNL)) {
                if (formObj[input].alternativeName) {
                    newObj[input].error = `${formObj[input].alternativeName} must be in the range ${formObj[input].minNL} - ${formObj[input].maxNL}`;
                    continue
                }
                newObj[input].error = `${input} must be in the range ${formObj[input].minNL} - ${formObj[input].maxNL}`;
                continue
            }
        }
    }

    return newObj
}