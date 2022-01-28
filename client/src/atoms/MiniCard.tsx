import { ReactChild, ReactFragment, ReactPortal } from "react";
import "./MiniCard.scss"
import { Icon } from '@iconify/react';

function MiniCard (props: { name: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; actions: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) {
    return (
        <div className="mini-card">
            <div className="mini-card__actions"><Icon  inline={true} icon="mdi:dots-vertical"/></div>  
            <div className="mini-card__content" > { props.name } </div>
        </div>
    )
}

export default MiniCard;
