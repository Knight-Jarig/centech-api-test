import get from 'lodash/get';
import find from 'lodash/find';
import map from 'lodash/map';
import reduce from 'lodash/reduce';

const mapKeyValueToCustomAttribute = (key, value) => ({
  attribute_code: key,
  value: value,
  name: key,
});

export const mapObjectToCustomAttributes = o => {
  return reduce(o, (res, v, k) => res.push(mapKeyValueToCustomAttribute(k, v)) && res, []);
};

export const mapCustomAttributesToObject = (array = []) =>
  reduce(
    array,
    (res, attr) => {
      res[attr.attribute_code] = attr.value;
      return res;
    },
    {},
  );

export const getCustomAttribute = (customAttributes, code, defaultValue = null) => {
  return get(
    find(customAttributes, s => s.attribute_code === code),
    'value',
    defaultValue,
  );
};

export const getCustomAttributeOptions = (customAttributeOptions, code, defaultValue = null) => {
  return get(
    find(customAttributeOptions, s => s.attribute_code === code),
    'value',
    defaultValue,
  );
};

export const explode = obj => {
  const customAttrField = get(obj, 'custom_attributes');
  const customAttrOptionField = get(obj, 'custom_attributes_option');
  let dataExploded = obj;

  if (customAttrField) {
    const customAttributeExploded = {};
    map(customAttrField, attr => {
      return (customAttributeExploded[attr.attribute_code] = attr.value);
    });
    dataExploded = {
      ...dataExploded,
      custom_attributes: {
        ...customAttributeExploded,
      },
    };
  }

  if (customAttrOptionField) {
    const optionExploded = {};
    map(customAttrOptionField, attr => {
      return (optionExploded[attr.attribute_code] = attr.value);
    });
    dataExploded = {
      ...dataExploded,
      custom_attributes_option: {
        ...optionExploded,
      },
    };
  }

  return dataExploded;
};

export function filterByKeys(input, allowedKeys, initialValue = {}) {
  return Object.keys(input)
    .filter(key => allowedKeys.includes(key))
    .reduce((all, key) => ({ ...all, [key]: input[key] }), initialValue);
}
