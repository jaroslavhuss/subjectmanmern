import "./InputText.scss"

function InputText (props: any) {
    return (
        <div className="form-field">
            <label className="form-field__label" htmlFor={ props.htmlFor }>{ props?.label }</label>
            <br />
            <input 
                value={ props.value }  
                className={ props.useSmall === true ? "form-field__input form-field__input-small" : "form-field__input form-field__input-big" } 
                required 
                onChange={ props.onChange }
                type={ props.type } 
                name={ props.name} />
        </div>
    )
}

export default InputText;
