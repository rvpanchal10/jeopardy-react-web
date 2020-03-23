import { Map } from 'immutable';

let configuration = Map();

export function setConfiguration(name, value) {
    configuration = configuration.set(name, value);
}

export function getConfiguration(key) {
    console.log(key);
    if (!configuration.has(key)) {
        throw new Error('Undefined configuration key: ' + key);
    }
    return configuration.get(key);
}
