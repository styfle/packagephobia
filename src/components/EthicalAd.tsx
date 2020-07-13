import React from 'react';

export default function EthicalAd() {
    return (
        <>
            <div
                id="ethicalad"
                className="flat"
                data-ea-publisher="packagephobia"
                data-ea-type="image"
            ></div>
            <script async src="https://media.ethicalads.io/media/client/ethicalads.min.js"></script>
        </>
    );
}
