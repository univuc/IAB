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

import config from '../../config';
import axios from 'axios';
import qs from 'qs';
import {createCookieSupportedAxiosInstance} from '../utils/axios';

export async function isAccountValid(userId, password) {
    const options = {
        method: 'POST',
        url: config.urls.login,
        data: qs.stringify({
            username: userId,
            password: password,
        }),
    };
    const response = await createCookieSupportedAxiosInstance().request(options);

    return !isNotAuthenticated(options, response);
}

export function isNotAuthenticated(options, response) {
    console.log(options.url);
    console.log(response.config.url);
    const isRedirected = options.url !== response.config.url;
    const isRedirectedToLoginPage = response.config.url.startsWith(config.urls.kicked);

    return isRedirected && isRedirectedToLoginPage;
}
