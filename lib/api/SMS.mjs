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

import constructUrl from '../utils/url';
import config from '../../config';
import logger from '../utils/logger';
import {post} from '../utils/axios';
import qs from 'qs';

export async function sendChat(text, channel) {
    if (!text || !channel) {
        logger.warn('Text and channel both cannot be null or undefined');
        return null;
    }

    const targetUrl = constructUrl(config.hosts.SMS)
        .appendUrl('send-chat');
    const data = {text, channel};

    logger.verbose(`Send chat '${text}' to ${channel}`);

    return await post(targetUrl, qs.stringify(data)/* form-urlencoded */);
}
