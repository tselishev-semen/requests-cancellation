import React, {useState} from "react";
import {useAsync} from './useAsync';
import {axiosRequestData} from './facade';
import {generateString} from './utils';

export const AxiosComp = () => {
    const [p1, setP1] = useState('a');
    const [p2, setP2] = useState('b');
    const [disabled, setDisabled] = useState(false);


    const {value} = useAsync(disabled ? null : axiosRequestData, [p1, p2]);


    const {value: value2, execute: execute2} = useAsync(axiosRequestData, [], [], false);
    const onClick = () => {
        setP1(generateString(2));
        setP2(generateString(2));
    };
    const case1 = 'const {value} = useAsync(disabled ? null : fetchFn, [p1, p2]);'
    const case2 = 'const {execute} =useAsync(fetchFn, [], [], false);\n\n' + '<button type="button" onClick={()=>{ execute(p3, p4)}} />'
    return (
        <div>
            <h2>Axios</h2>
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
                    <button onClick={() => execute2(generateString(2), generateString(2))}>
                        send request 2
                    </button>
                </div>
                <div>
                    <textarea rows="1" disabled value={`response ${JSON.stringify(value2)}`}/>
                </div>
            </div>
        </div>
    );
}