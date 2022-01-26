import "./FormSelect.scss"

function FormSelect (props: any) {
    return (
        <div>
            <label className="form-field-select__label" htmlFor={ props.htmlFor }>{ props.label }</label>
            <select className="form-field-select" onChange={ props.onChange }>
                { props.options.map(( e: string ) => (
                    <option> {e} </option>
                ))}
            </select>
        </div>
    )
}
export default FormSelect;
