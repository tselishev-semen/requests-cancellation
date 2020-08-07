const messages = [];
const listeners = [];

export const addMessages = (str) => {
    messages.unshift(`${new Date().toUTCString()}:${str}`);
    listeners.forEach((cb) => cb(messages.slice()))
};

export const listenToChanges = (cb) => listeners.push(cb);
