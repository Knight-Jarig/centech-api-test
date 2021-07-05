export const getFieldsFromDocumentNode = (node): [] => {
  return node.definitions[0].selectionSet.selections[0].selectionSet.selections.map(item => {
    return item.name.value;
  });
};
