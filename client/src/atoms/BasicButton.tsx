import React from "react";
import "./BasicButton.scss"

function BasicButton (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (<button className="button-custom button-custom-big" {...props}>{props.children}</button>);
}

export default BasicButton;
