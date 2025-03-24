import React from 'react';
import { FlipCard } from "react-flipme"
function FlippingCard() {
    return ( 
        <FlipCard>
                <FlipCard.Front>
                        Front {/* Any component or element */}
                </FlipCard.Front>
                <FlipCard.Back>
                        Back {/* Any component or element */}
                </FlipCard.Back>
        </FlipCard>
     );
}

export default FlippingCard;
