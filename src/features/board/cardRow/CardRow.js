import React from "react";
import { Card } from "./card/Card";

// CardRow renders a row of Card components
export const CardRow = ({ cards }) => {
    const content = cards.map(card => 
        <Card
            key={card.id}
            id={card.id}
            contents={card.contents}
        />    
    );
    return <>{content}</>
}