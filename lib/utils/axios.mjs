/**
 * This file is part of Univuc/IAB.
 *
 * Copyright (C) 2020 Univuc <potados99@gmail.com>
 *
 * Univuc/IAB is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Univuc/IAB is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import commonJsModules from './cjs';
import logger from './logger';
import axios from 'axios';
import tough from 'tough-cookie';
import config from '../../config';

const {axiosCookieJarSupport} = commonJsModules;

export function createCookieSupportedAxiosInstance() {
    const jar = new tough.CookieJar();

    const axiosInstance = axios.create();

    axiosCookieJarSupport(axiosInstance);

    axiosInstance.defaults.jar = jar;
    axiosInstance.defaults.withCredentials = true;

    return axiosInstance;
}

export async function internalGet(url) {
    return await requestInternal({method: 'GET', url});
}

export async function internalPost(url, data) {
    return await requestInternal({method: 'POST', url, data});
}

export async function get(url) {
    return await request({method: 'GET', url});
}

export async function post(url, data) {
    return await request({method: 'POST', url, data});
}

export async function request(options) {
    return await safeRequest(options);
}

async function requestInternal(options) {
    if (!options.headers) {
        options.headers = {};
    }

    options.headers['Internal-Auth'] = config.secrets.internal;

    return await safeRequest(options);
}

async function safeRequest(options) {
    logger.verbose(`${options.method} ${options.url}`);

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (e) {
        logger.warn(`Request failed: ${e.toString()}`);
        return null;
    }
}
