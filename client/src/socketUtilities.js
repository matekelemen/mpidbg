// --- Internal Imports ---
import network from "./network.json"


export function makeSocket(address, port)
{
    return new WebSocket(`ws://${address}:${port}`);
}


export function promiseSocket(address, port)
{
    return new Promise(function(resolve, reject) {
        var socket = makeSocket(address, port);
        socket.onopen = () => {
            resolve(socket);
        };
        socket.onerror = (exception) => {
            reject(exception);
        };
    });
}