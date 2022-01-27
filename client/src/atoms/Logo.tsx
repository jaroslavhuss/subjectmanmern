import "./Logo.scss"

interface ILogo {
    useSmall?: boolean
}

function Logo (props: ILogo) {
    return (
        <div className="logo">
            <div>
                <h1>
                    <span className={ props.useSmall ? 'logo__S-small': "logo__S"}>S</span>
                    <span className={ props.useSmall ? 'logo__text-small': "logo__text"}>UBJECT </span>
                    <span className={ props.useSmall ? 'logo__M-small': "logo__M"}>M</span>
                    <span className={ props.useSmall ? 'logo__text-small': "logo__text"}>AN</span>
                </h1>
            </div>
        </div>
    )
}

export default Logo;