import "./Box.scss"

function Box (props: any) {
    return (
        <div className={props.useBig ? 'big-box box': "box"}>
            <div className="box__glass"></div>
                <div className="box__header">
                    <h3>{props.header}</h3>
                    <h1>{props.useBig}</h1>
                </div>
                <div>
                    {props.children}
                </div>
                <div>{props.footer}</div>     
        </div>
    )
}

export default Box;