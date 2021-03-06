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

import Boom from '@hapi/boom';
import config from '../../config';

export function setHapiInternalAuth(server) {
    const internalAuthScheme = (server, options) => {
        return {
            authenticate: (request, h) => {
                const internalAuthenticated = request.headers['internal-auth'] === config.secrets.internal;

                if (internalAuthenticated) {
                    return h.authenticated({credentials: {}});
                } else {
                    throw Boom.unauthorized(null, 'internal-auth');
                }
            },
        };
    };

    server.auth.scheme('internal-auth', internalAuthScheme);
    server.auth.strategy('internal', 'internal-auth');

    server.auth.default('internal');
}
