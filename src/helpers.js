export const getIds = (data) => {
  return data.map((item) => item.id.replace(':', '-'));
};

export const extractIds = (data) => {
  // extract all the ids from child and parent
};
