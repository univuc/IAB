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

import stackTrace from 'stack-trace';
import winston from 'winston';
import JSON from '../extensions/JSON';

const {format, createLogger, transports} = winston;

const logger = createLogger({
    level: 'verbose',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.json(),
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf((info) => `${info.timestamp} ${info.level}: ${info.message.trim()}`),
            ),
        }),
    ],
});

function formatLog(message, showCaller=true) {
    const caller = stackTrace.get()[2]; /* to get a real caller */

    if (showCaller) {
        return `${caller.getFileName()}:` +
            `${caller.getFunctionName()}:` +
            `${caller.getLineNumber()}:` +
            `${caller.getColumnNumber()}:` +
            `${JSON.safeStringify(message)}`;
    } else {
        return `${JSON.safeStringify(message)}`;
    }
}

export default {

    verbose(message) {
        logger.verbose(formatLog(message));
    },

    info(message) {
        logger.info(formatLog(message));
    },

    warn(message) {
        logger.warn(formatLog(message));
    },

    error(message) {
        logger.error(formatLog(message));
    },

};
