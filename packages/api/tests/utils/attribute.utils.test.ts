import {
  mapObjectToCustomAttributes,
  mapCustomAttributesToObject,
  getCustomAttribute,
  getCustomAttributeOptions,
  explode,
  filterByKeys,
} from '../../src/utils/attribute.utils';

const exampleDataWithCustomAttribute = {
  custom_attributes: [
    {
      attribute_code: 'field_1',
      value: 'value 1',
      name: 'field_1',
    },
    {
      attribute_code: 'field_2',
      value: 'value 2',
      name: 'field_2',
    },
    {
      attribute_code: 'field_3',
      value: 3,
      name: 'field_3',
    },
    {
      attribute_code: 'field_4',
      value: [1, 2, 3],
      name: 'field_4',
    },
    {
      attribute_code: 'field_5',
      value: null,
      name: 'field_5',
    },
  ],
  custom_attributes_option: [
    {
      attribute_code: 'option_1',
      value: 'value_of_option_1',
      name: 'option_1',
    },
    {
      attribute_code: 'option_2',
      value: 'value_of_option_2',
      name: 'option_2',
    },
  ],
};

const expectCustomAttributeObject = {
  custom_attributes: {
    field_1: 'value 1',
    field_2: 'value 2',
    field_3: 3,
    field_4: [1, 2, 3],
    field_5: null,
  },
  custom_attributes_option: {
    option_1: 'value_of_option_1',
    option_2: 'value_of_option_2',
  },
};

describe('mapObjectToCustomAttributes', () => {
  it(`should create custom attribute array`, async () => {
    const transformedCustomAtteibutes = mapObjectToCustomAttributes(expectCustomAttributeObject.custom_attributes);
    expect(transformedCustomAtteibutes).toEqual(exampleDataWithCustomAttribute.custom_attributes);
  });
});

describe('mapCustomAttributesToObject', () => {
  it(`should create object from custom attribute`, async () => {
    const transformedCustomAtteibutes = mapCustomAttributesToObject(exampleDataWithCustomAttribute.custom_attributes);
    expect(transformedCustomAtteibutes).toEqual(expectCustomAttributeObject.custom_attributes);
  });
});

describe('getCustomAttribute', () => {
  it(`should return value of custom attribute by input field`, async () => {
    const customAttributeValue = getCustomAttribute(exampleDataWithCustomAttribute.custom_attributes, 'field_1');
    expect(customAttributeValue).toEqual('value 1');
  });
  it(`should return default value of custom attribute by input field`, async () => {
    const customAttributeValueWithDefault = getCustomAttribute(
      exampleDataWithCustomAttribute.custom_attributes,
      'field_6',
      '',
    );
    expect(customAttributeValueWithDefault).toEqual('');
  });
});

describe('getCustomAttributeOptions', () => {
  it(`should return value of custom attribute option`, async () => {
    const transformedCustomAtteibutesOption = getCustomAttributeOptions(
      exampleDataWithCustomAttribute.custom_attributes_option,
      'option_1',
    );
    expect(transformedCustomAtteibutesOption).toEqual('value_of_option_1');
  });
});

describe('explode', () => {
  it(`should return custom attribute and option in object type`, async () => {
    const explodedData = explode(exampleDataWithCustomAttribute);
    expect(explodedData).toEqual(expectCustomAttributeObject);
  });
});

describe('filterByKeys', () => {
  it(`should return empty`, async () => {
    const input = {};
    const result = filterByKeys(input, ['is_subscribed']);
    expect(result).toEqual({});
  });

  it(`should return only is_subscribed`, async () => {
    const input = { is_subscribed: true, optional: true };
    const result = filterByKeys(input, ['is_subscribed']);
    expect(result).toEqual({ is_subscribed: true });
  });

  it(`should return filterKey with initialValue`, async () => {
    const input = { is_subscribed: true, optional: true };
    const result = filterByKeys(input, ['is_subscribed'], {
      initialValue: true,
    });
    expect(result).toEqual({ is_subscribed: true, initialValue: true });
  });

  it(`should return is_subscribed from initialValue`, async () => {
    const input = { extension_attributes: { is_subscribed: true } };
    const result = filterByKeys(input, ['is_subscribed'], input.extension_attributes);
    expect(result).toEqual({ is_subscribed: true });
  });

  it(`should return replace initialValue with rootValue`, async () => {
    const input = { is_subscribed: false, extension_attributes: { is_subscribed: true } };
    const result = filterByKeys(input, ['is_subscribed'], input.extension_attributes);
    expect(result).toEqual({ is_subscribed: false });
  });
});
