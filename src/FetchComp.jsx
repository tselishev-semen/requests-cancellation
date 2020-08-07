import React, {useState} from "react";
import {useAsyncForFetch} from './useAsync';
import {fetchRequestData} from './facade';
import {generateString} from './utils';

export const FetchComp = () => {
    const [p1, setP1] = useState('a');
    const [p2, setP2] = useState('b');
    const [disabled, setDisabled] = useState(false);
    const {value} = useAsyncForFetch(disabled ? null : fetchRequestData, {p1, p2});
    const {value: value2, execute: execute2} = useAsyncForFetch(fetchRequestData, null, {immediate: false, deps: []});
    const onClick = () => {
        setP1(generateString(2));
        setP2(generateString(2));
    };
    const case1 = 'const {value} = useAsync(disabled ? null : fetchFn, {p1, p2});'
    const case2 = 'const {execute} =useAsync(fetchFn, null, {immediate: false, deps: []});\n\n' + '<button type="button" onClick={()=>{ execute({p3, p4})}} />'
    return (
        <div>
            <h2>Fetch</h2>
            <div>
                <div className="flex">
                    <textarea disabled rows={1}>
                        {case1}
                    </textarea>
                    <button onClick={onClick}>send request</button>
                    <button onClick={() => setDisabled(!disabled)}>{disabled ? 'enable' : 'disable'}</button>
                </div>
                <div>
                    <textarea rows="1" disabled value={`response ${JSON.stringify(value)}`}/>
                </div>
                <br/>
                <div className="flex">
                    <textarea disabled rows={3}>
                        {case2}
                    </textarea>
                    <button onClick={() => execute2({p3: generateString(2), p4: generateString(2)})}>send request 2
                    </button>
                </div>
                <div>
                    <textarea rows="1" disabled value={`response ${JSON.stringify(value2)}`}/>
                </div>
            </div>
        </div>
    );
}