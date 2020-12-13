const uuidGenerator = (store) => (next) => (action) => {
  const { shouldGenerateUuidsForFields, ...restAction } = action;

  if (action.shouldGenerateUuidsForFields) {
    const uuids = action.shouldGenerateUuidsForFields.reduce(
      (uuids, fieldName) => ({ ...uuids, [fieldName]: Math.random() + '' }),
      {}
    );
    const newAction = { ...restAction, generatedUuidsMap: uuids };
    return next(newAction);
  }
  next(action);
};

export default uuidGenerator;
