import get from 'lodash/get';
import { getCustomAttribute } from './attribute.utils';

/**
 * Set Data Model
 * @param {Object} data
 * @return {Object}
 */
export const setModel = data => ({
  string: (path, defaultValue = '') => String(get(data, path, defaultValue || '')),
  number: (path, defaultValue = 0) => Number(get(data, path, defaultValue || 0)),
  object: (path, defaultValue = {}) => get(data, path, defaultValue || {}),
  array: (path, defaultValue = []) => get(data, path, defaultValue || []),
  bool: (path, defaultValue = false) => Boolean(get(data, path, defaultValue || false)),
  timestamp: (path, defaultValue = 0) => get(data, path, defaultValue || 0),
  condition: (path, callback) => {
    const item = get(data, path, null);
    return callback(item);
  },
  customAttribute: (path: string, defaultValue: any) => getCustomAttribute(data.custom_attributes, path, defaultValue),
});
