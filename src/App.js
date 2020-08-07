import React, {useState} from 'react';
import cn from 'classname';
import {DemoComponent} from './DemoComponent';
import {Logger} from './Logger/Logger';
import {useAsyncForFetch, useAsyncForAxios} from './useAsync';
import {fetchRequestData, axiosRequestData} from './facade';

function App() {
    const [tab, setTab] = useState('Axios');
    return (
        <div className="app">
            <div>
                <div className="app__tabs">
                    <button
                        className={cn('app__toggle', {'app__toggle--active': tab === 'Axios'})}
                        type="button"
                        onClick={() => setTab('Axios')}>
                        axios
                    </button>
                    <button
                        className={cn('app__toggle', {'app__toggle--active': tab === 'Fetch'})}
                        type="button" onClick={() => setTab('Fetch')}>
                        fetch
                    </button>
                </div>
            </div>
            <pre>
                <h2>How to use this site?</h2>
                * <i>You can switch between 2 transport: axios and fetch</i>
                <br/>
                <br/>
                1. Open a <b>network tab</b> in the dev tools
                <br/>
                2. Click multiple times on <b>'send immediate request'</b>
                <br/>
                3. See some cancelled requests
                <br/>
                4. Click <b>'Turn lazy load on/off'</b> button to switch the loading behavior. If it's false, the request will not be sent
                <hr/>
                5. Click multiple times on <b>'send on-demand request'</b> button
                <br/>
                6. See some cancelled requests
            </pre>
            <div className="app__content">
                <DemoComponent
                    key={tab}
                    title={tab}
                    useAsync={tab === 'Axios' ? useAsyncForAxios : useAsyncForFetch}
                    requestData={tab === 'Axios' ? axiosRequestData : fetchRequestData}
                />
            </div>
            <Logger/>
        </div>
    );
}

export default App;
