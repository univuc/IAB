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

import getEnv from './lib/utils/env';

export default {
    hosts: {
        UIP: {
            host: 'localhost',
            port: getEnv('UIP_PORT'),
        },
        SMS: {
            host: 'localhost',
            port: getEnv('SMS_PORT'),
        },
    },

    urls: {
        login: 'https://cyber.inu.ac.kr/login/index.php',
        kicked: 'https://cyber.inu.ac.kr/login.php',
    },

    secrets: {
        internal: getEnv('INTERNAL_SECRET'),
    },
};

