/*
 * @Author: sam.li
 * @Date: 2021-06-01 15:37:30
 * @LastEditors: sam.li
 * @LastEditTime: 2021-06-01 16:37:58
 */
import utils from './utils';

var defaults = {
    timeout: 0,
    headers: {
        common: {},
    },
};
utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
    defaults.headers[method] = {};
});

export default defaults;
