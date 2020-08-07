import React, {useState} from 'react';
import cn from 'classname';
import {AxiosComp} from './AxiosComp';
import {FetchComp} from './FetchComp';
import {Logger} from './Logger/Logger';
import './App.css';

function App() {
    const [tab, setTab] = useState('axios');
    return (
        <div className="app">
            <div>
                <header>Switch view</header>
                <div className="app__tabs">
                    <button
                        className={cn('app__toggle', {'app__toggle--active': tab === 'axios'})}
                        type="button"
                        onClick={() => setTab('axios')}>
                        axios
                    </button>
                    <button
                        className={cn('app__toggle', {'app__toggle--active': tab === 'fetch'})}
                        type="button" onClick={() => setTab('fetch')}>
                        fetch
                    </button>
                </div>
            </div>
            <pre>
                1. Open a network tab in the dev tools
                <br/>
                2. Click multiple times on 'send an immediate request'
                <br />
                3. See some cancelled requests
                <br/>
                4. `Sel lazy load on/off` button change the lazy-loading behavior. If it's false request will not be sent
                <br/>
                2*.  Click multiple times on 'send a on-demand request'
                <br />
                3*. See some cancelled requests
            </pre>
            <div className="app__content">
                {tab === 'axios' && <AxiosComp/>}
                {tab === 'fetch' && <FetchComp/>}
            </div>
            <br/>
            <div>
                <Logger/>
            </div>
        </div>
    );
}

export default App;
