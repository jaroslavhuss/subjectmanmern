import { ReactChild, ReactFragment, ReactPortal, useState } from "react";
import "./MiniCard.scss"
import { Icon } from '@iconify/react';

function MiniCard (props: { dropDownContent: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; name: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) {
    
    const [show, setShow] = useState<boolean>(false);
    
    return (
        <div className="mini-card">
            <div className="dropdown" onClick={() => setShow(!show)} >
                <span className="mini-card__actions">
                    <Icon inline={true} icon="mdi:dots-vertical"/>
                </span>         
            </div>

            <div className={ show ? "mini-card__content-opened" : "mini-card__content"} > { props.name } </div>

            <div className={ show ? "mini-card__drop-down-content-show" : "mini-card__drop-down-content-hide" }>
                { props.dropDownContent }
            </div>  
        </div>
    )
}

export default MiniCard;
