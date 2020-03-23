import Promise from 'bluebird';
import * as apiConfig from '../constants/api.contants';

const TIMEOUT = 10000;

/**
 * GET a path relative to API root url.
 * @param {String}  path Relative path to the configured API endpoint
 * @returns {Promise} of response body
 */
export async function get(path, query_params = null) {
    return bodyOf(request('get', path, null, query_params));
}

/**
 * POST JSON to a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 * @returns {Promise}  of response body
 */
export async function post(path, body) {
    return bodyOf(request('post', path, body));
}

/**
 * PUT JSON to a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 * @returns {Promise}  of response body
 */
export async function put(path, body) {
    return bodyOf(request('put', path, body));
}

/**
 * DELETE a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @returns {Promise}  of response body
 */
export async function del(path) {
    return bodyOf(request('delete', path, null));
}

/**
 * Make arbitrary fetch request to a path relative to API root url
 * @param {String} method One of: get|post|put|delete
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 */
export async function request(method, path, body, query_params = null) {
    try {
        const response = await sendRequest(method, path, body, query_params);
        return handleResponse(
            path,
            response
        );
    }
    catch (error) {
        throw error;
    }
}

/**
* Takes a relative path and makes it a full URL to API server
*/
export function url(path) {

    const apiRoot = apiConfig.api;

    return path.indexOf('/') === 0
        ? apiRoot + path
        : apiRoot + '/' + path;

    // const apiRoot = getConfiguration('BASE_URL');
}

/**
* Constructs and fires a HTTP request
*/
async function sendRequest(method, path, body, query_params = null) {

    try {
        let endpoint = url(path);
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
        const headers = getRequestHeaders(path, body, token);
        let query = null;

        if (query_params) {
            var esc = encodeURIComponent;
            query = Object.keys(query_params)
                .map(k => esc(k) + '=' + esc(query_params[k]))
                .join('&');
        }

        if (query && query.length > 0) {
            // query = query.substring(0, query.length - 1); //chop off last "&"
            endpoint = endpoint + '?' + query;
        }

        const options = body
            ? { method, headers, body: JSON.stringify(body) }
            : { method, headers };
        return timeout(fetch(endpoint, options), TIMEOUT);
    } catch (e) {
        throw new Error(e);
    }
}

/**
* Receives and reads a HTTP response
*/
async function handleResponse(path, response) {
    try {
        const responseBody = await response.text();
        const responseBodyJson = {};
        responseBodyJson.status = response.status;
        try {
            responseBodyJson.data = responseBody
                ? JSON.parse(responseBody)
                : null;
        } catch (error) {
            responseBodyJson.data = null;
        }
        return {
            status: response.status,
            headers: response.headers,
            body: responseBodyJson
                ? responseBodyJson
                : null
        };
    } catch (e) {
        throw e;
    }
}

function getRequestHeaders(path, body, token) {

    const headers = body
        ? { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        : { 'Accept': 'application/json' };

    if (token) {
        return { ...headers, Authorization: 'Bearer ' + token };
    }
    return headers;
}

/**
* Rejects a promise after `ms` number of milliseconds, it is still pending
*/
function timeout(promise, ms) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('timeout')), ms);
        promise
            .then(response => {
                clearTimeout(timer);
                resolve(response);
            })
            .catch(reject);
    });
}

async function bodyOf(requestPromise) {
    try {
        const response = await requestPromise;
        return response.body;
    } catch (e) {
        throw e;
    }
}
