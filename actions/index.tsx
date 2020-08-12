export const addItem = (item) => {
  //console.log('action authUser: ' + JSON.stringify(user));

  return {
    type: 'ADD_ITEM',
    item: item,
  };
};
