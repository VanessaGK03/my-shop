import { useState } from "react"
import { transformFormObj } from "../utils/useFormUtils";

export default function useForm(formObj, formSbmFunction){
    const [form , updateForm] = useState(formObj)
    const [rememberForm] = useState(formObj);

    function setForm(value, name) {
        updateForm((prevForm) => {
            let newForm = JSON.parse(JSON.stringify(prevForm))
            newForm[name].value = value;
            return newForm;
        })
    }

    function resetForm(){
        updateForm(JSON.parse(JSON.stringify(rememberForm)))
    }
    
    return [transformFormObj(form), setForm, formSbmFunction,resetForm]
}