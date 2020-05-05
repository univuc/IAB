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
import String from '../extensions/String';

import {internalGet, internalPost} from '../utils/axios';
import constructUrl from '../utils/url';
import config from '../../config';
import logger from '../utils/logger';

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
 * @return {Promise<User|null>}
 */
export async function getUser(id) {
    if (!id) {
        logger.warn('Id cannot be null or undefined');
        return null;
    }

    const targetUrl = constructUrl(config.hosts.UIP).appendUrl(`users/${id}`);

    const rawUser = await internalGet(targetUrl);
    if (!rawUser) {
        return null;
    }

    return new User({
        id: rawUser.id,
        password: rawUser.password,
        slackUserId: rawUser.slackUserId,
    });
}

/**
 * Add user to UIP database.
 * @param user
 * @return {Promise<User|null>}
 */
export async function addUser(user) {
    if (!user) {
        logger.warn('User cannot be null or undefined');
        return null;
    }

    const targetUrl = constructUrl(config.hosts.UIP).appendUrl('add-user');

    logger.verbose(`Add user ${user.id}`);

    const rawUser = await internalPost(targetUrl, user/* json */);
    if (!rawUser) {
        return null;
    }

    return new User({
        id: rawUser.id,
        password: rawUser.password,
        slackUserId: rawUser.slackUserId,
    });
}

/**
 * Update user in UIP database.
 * @param user
 * @return {Promise<User|null>}
 */
export async function updateUser(user) {
    if (!user) {
        logger.warn('User cannot be null or undefined');
        return null;
    }

    const targetUrl = constructUrl(config.hosts.UIP).appendUrl('update-user');

    logger.verbose(`Add user ${user.id}`);

    const rawUser = await internalPost(targetUrl, user/* json */);
    if (!rawUser) {
        return null;
    }

    return new User({
        id: rawUser.id,
        password: rawUser.password,
        slackUserId: rawUser.slackUserId,
    });
}
