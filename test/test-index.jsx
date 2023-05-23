import ReactDOM from 'react-dom/client';
import React from 'react';

function render() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <div>
            <h1>👋 Welcome to the Extension's Component Test</h1>
            {/* PLACE YOUR COMPONENT HERE */}
            {/* ex. <Component /> */}
        </div>
    );
}

render();