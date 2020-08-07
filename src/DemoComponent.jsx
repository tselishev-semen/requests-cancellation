import React, {useState} from "react";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {darcula} from 'react-syntax-highlighter/dist/esm/styles/prism'
import {generateString} from './utils';

export const DemoComponent = ({useAsync, title, requestData}) => {
    const [p1, setP1] = useState('aa');
    const [p2, setP2] = useState('bb');
    const [lazyLoading, setLazyLoading] = useState(false);
    const {value, loading, error} = useAsync(lazyLoading ? null : requestData, [p1, p2]);
    const {value: value2, loading: loading2, error: error2, execute: execute2} = useAsync(requestData, [], [], false);

    const sendImmediateRequest = () => {
        setP1(generateString(2));
        setP2(generateString(2));
    };

    return (
        <div>
            <h2>{title}</h2>
            <div>
                <div className="flex">
                    <SyntaxHighlighter language="jsx" style={darcula}>
                        {`const {value, loading, error} = useAsync(lazyLoading ? null : fetchFn, ['${p1}', '${p2}']);
// lazyLoading:${lazyLoading}, value:${JSON.stringify(value)}, loading:${loading}, error:${error}`}
                    </SyntaxHighlighter>
                    <button onClick={sendImmediateRequest}>send immediate request</button>
                    <button
                        onClick={() => setLazyLoading(!lazyLoading)}>{`Turn lazy load ${lazyLoading ? 'off' : 'on'}`}</button>
                </div>
                <div className="flex">
                    <SyntaxHighlighter language="jsx" style={darcula}>
                        {`const {execute, value, error, loading} = useAsync(fetchFn, [], [], false);
// value:${JSON.stringify(value2)}, loading:${loading2}, error:${error2}
return ( 
    // ..
    <button onClick={()=>execute(p1, p2)} />
)`}
                    </SyntaxHighlighter>
                    <button onClick={() => execute2(generateString(2), generateString(2))}>
                        send on-demand request
                    </button>
                </div>
            </div>
        </div>
    );
}