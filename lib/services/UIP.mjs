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

// eslint-disable-next-line no-unused-vars
import String from '../common/extensions/String';

import axiosInstance from '../common/utils/axios';
import constructUrl from '../common/utils/url';
import config from '../../config';

export class User {
    constructor({id, password, slackUserId}) {
        this.id = id;
        this.password = password;
        this.slackUserId = slackUserId;
    }
}

/**
 * Ask UIP to provide user info.
 * @param id userId of slackUserId
 * @return {Promise<User>}
 */
export async function getUser(id) {
    const targetUrl = constructUrl(config.hosts.UIP)
        .appendPath('users')
        .appendPath(`${id}`);

    return await axiosInstance.get(targetUrl);
}

/**
 * Add user to UIP database.
 * @param user
 * @return {Promise<void>}
 */
export async function addUser(user) {
    const targetUrl = constructUrl(config.hosts.UIP).appendPath('add-user');

    return await axiosInstance.post(targetUrl, user);
}
