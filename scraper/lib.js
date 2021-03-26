const Logstash = require('logstash-client');

const logstash = new Logstash({
    type: 'tcp',
    host: '127.0.0.1',
    port: 1338
})

async function wait(seconds = 1) {
    // Reeee rate limits
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, seconds * 1000)
    })
}

module.exports = {
    wait,
    logstash
}