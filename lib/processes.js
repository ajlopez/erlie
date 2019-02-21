
function Process() {
    const messages = [];
    const fns = [];
    
    this.send = function (message) {
        if (messages.length == 0 && fns.length) {
            const fn = fns.shift();
            
            return setTimeout(() => fn(message), 0);
        }
        
        messages.push(message);
        
        if (!fns.length)
            return;
        
        const msg = messages.shift();
        const fn = fns.shift();
        
        setTimeout(() => fn(msg), 0);
    };
    
    this.receive = function (fn) {
        if (!messages.length)
            return fns.push(fn);
        
        const msg = messages.shift();
        
        setTimeout(() => fn(msg), 0);
    };
    
    this.size = function () { return messages.length; };
}

function createProcess() {
    return new Process();
}

module.exports = {
    process: createProcess
};

