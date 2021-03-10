import React, { useState } from "react";

function App2() {
    const [country, setCountry] = useState('Mexico');
    return (
        <>
            <h1>
                Press button to change the {country} data. Press view to change graph.
            </h1>
            <button onClick={() => setCountry('Nicaragua')}>
                Nicaragua
            </button>
            <button onClick={() => setCountry("Costa Rica")}>
                Costa Rica
            </button>

        </>
    );
}

export default App2;