let uniqueId = 0;

export const getUniqueId = () => {
  uniqueId += 1;
  return uniqueId;
};
