/*
 * @Author: sam.li
 * @Date: 2021-06-01 15:37:25
 * @LastEditors: sam.li
 * @LastEditTime: 2021-06-01 17:09:25
 */
import InterceptorManger from './interceptorManger';
import dispatchRequest from './dispatchRequest';
import utils from './utils';
/**
 * @class Wxios
 * @param {Object} config 请求配置
 */
function Wxios(config) {
    this.defaults = config;
    this.interceptors = {
        request: new InterceptorManger(),
        response: new InterceptorManger(),
    };
}

/**
 * 请求方法
 * @param {Object} config
 */
Wxios.prototype.request = function request(config) {
    if (typeof config === 'string') {
        config = Object.assign(
            {
                url: arguments[0],
            },
            arguments[1] || {},
        );
    }

    config = utils.merge(
        {},
        this.defaults,
        {
            method: 'get',
        },
        config,
    );
    config.method = config.method.toLowerCase();

    var chain = [dispatchRequest, undefined];
    var promise = Promise.resolve(config);

    this.interceptors.request.forEach((interceptor) => {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    this.interceptors.response.forEach((interceptor) => {
        chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
};

['delete', 'get', 'head', 'options', 'post', 'put', 'patch'].forEach((method) => {
    Wxios.prototype[method] = function (url, data, config) {
        const _config = Object.assign(config || {}, { method: method, url: url, data: data });
        return this.request(_config);
    };
});

export default Wxios;
