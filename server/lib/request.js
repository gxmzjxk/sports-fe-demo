const axios = require('axios');
const URL = require('./url');
function Request(opt = {}) {
    this.opt = opt;
    this.init(opt);
}
Request.prototype = {
    init(config){
        let baseURL = config.baseURL || URL.genSportsDataUrl();
        this.baseURL = baseURL;
        this.axios = axios.create({
            baseURL,
            timeout: 2000,
            withCredentials: false
        });
    },
    fetch(opt = {}){
        let method = opt.method || 'GET';
        let params = opt.params || {};
        return new Promise((resolve, reject) => {
            if (!opt.url) {
                reject({
                    code: 400,
                    msg: 'URL cannnot be empty !'
                })
            } else {
                this.axios.request({
                    url: opt.url,
                    method: method.toUpperCase(),
                    params: params
                }).then((result) => {
                    if (result.status === 200) {
                        resolve(result.data);
                    } else {
                        reject(result);
                    }
                }).catch((err) => {
                    reject(err);
                });
            }
        });
    },
};

module.exports =  Request;