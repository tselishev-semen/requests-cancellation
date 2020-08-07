import axios from 'axios';
import {addMessages} from './Logger/service';

export const axiosRequestData = async (token, p1, p2) => {
    const response = await axios.get('/.netlify/functions/data', {params: {p1, p2}, cancelToken: token});
    addMessages(`Axios request with ${JSON.stringify({p1, p2})} completed`);
    return response.data;
}

export const fetchRequestData = async (signal, p1, p2) => {
    const queryString = new URLSearchParams({p1, p2}).toString();
    const response = await fetch(`/.netlify/functions/data?${queryString}`, {signal})
    if (!response.ok) {
        throw response;
    }
    addMessages(`Fetch request with ${JSON.stringify({p1, p2})} completed`);
    return response.json();
}