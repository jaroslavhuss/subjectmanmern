import "./FormErrors.scss"
import { Icon } from '@iconify/react';

interface IFormErrors {
    error: string;
}

function FormErrors (props: IFormErrors) {
    return (
             <div className="form-error">
                <Icon className="form-error__icon" icon="mdi:alert-circle-outline"  />
                <span className="form-error__text">{ props.error } </span>
            </div>
    )
}

export default FormErrors;
