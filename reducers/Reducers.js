const initialState = {
  ordersList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      let currentList = state.ordersList.slice();

      currentList.push(item);

      console.log('ADD_ITEM: ' + JSON.stringify(item));

      return {
        ...state,
        ordersList: currentList,
      };

    default:
      return state;
  }
};
