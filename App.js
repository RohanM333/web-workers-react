import React, { useState } from 'react';

function App() {
    const [result1, setResult1] = useState(null);
    const [result2, setResult2] = useState(null);
    const [result3, setResult3] = useState(null);
    const [result4, setResult4] = useState(null);

    const startWorkers = () => {
        const worker1 = new Worker(`${process.env.PUBLIC_URL}/worker1.js`);
        const worker2 = new Worker(`${process.env.PUBLIC_URL}/worker2.js`);
        const worker3 = new Worker(`${process.env.PUBLIC_URL}/worker3.js`);
        const worker4 = new Worker(`${process.env.PUBLIC_URL}/worker4.js`);

        worker1.onmessage = function(e) {
            setResult1(e.data);
            worker1.terminate();
        };
        worker2.onmessage = function(e) {
            setResult2(e.data);
            worker2.terminate();
        };
        worker3.onmessage = function(e) {
            setResult3(e.data);
            worker3.terminate();
        };
        worker4.onmessage = function(e) {
            setResult4(e.data);
            worker4.terminate();
        };

        worker1.postMessage(100000000); // Send data to worker1
        worker2.postMessage(200000000); // Send data to worker2
        worker3.postMessage(300000000); // Send data to worker3
        worker4.postMessage(400000000); // Send data to worker4
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>React Multiple Web Workers Example</h1>
                <button onClick={startWorkers}>Start Workers</button>
                {result1 !== null && <p>Worker 1 Result: {result1}</p>}
                {result2 !== null && <p>Worker 2 Result: {result2}</p>}
                {result3 !== null && <p>Worker 3 Result: {result3}</p>}
                {result4 !== null && <p>Worker 4 Result: {result4}</p>}
            </header>
        </div>
    );
}

export default App;
