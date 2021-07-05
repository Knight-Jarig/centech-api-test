export function customAttributes(value: any[] = []) {
  return value.reduce((all, item) => ({ ...all, [item.attribute_code]: item.value }), {});
}

export function fromCustomAttributes<T = any>({
  key,
  defaultValue,
  transform,
}: {
  key: string;
  defaultValue?: T;
  transform?: (v: any) => any;
}) {
  return (_, obj) => {
    const value = obj.custom_attributes?.find(({ attribute_code }) => attribute_code === key)?.value;

    if (typeof value === 'undefined') return defaultValue;

    return transform?.(value) ?? value;
  };
}
