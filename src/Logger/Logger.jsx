import React, {useEffect, useState} from 'react';
import {listenToChanges} from './service';

export const Logger = () => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        listenToChanges(setMessages);
    }, []);

    return (
        <textarea value={messages.join('\n')} disabled style={{height: 500}}/>
    )
};