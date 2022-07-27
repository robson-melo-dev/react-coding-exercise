import React from 'react';
import "./Loader.css"
// style


const Loader = () => (
    <div className="loading">
        <p>
            <span role="img" aria-label="rocket" className="mission">
                🚀
            </span>
            Loading data through wormholes...
        </p>
        <div className="loader__dots--animation">
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </div>
    </div>
);

export default Loader;
