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

export default function safeStringify(object) {
    if (object.stack) {
        // For error objects.
        return object.stack;
    } else if (object.toString) {
        // For those who can be string.
        return object.toString();
    } else if (object) {
        // For an object.
        return JSON.stringify(object);
    } else {
        // Invalid.
        return typeof object;
    }
}
