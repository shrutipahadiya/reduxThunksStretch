//for mocking the store
const configureMockStore = require('redux-mock-store').default;
const thunk = require('redux-thunk').default;
// For mocking axios
const MockAdapter = require('axios-mock-adapter');
const axios = require('axios');

//This creates the mock store for testing.
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);
const store = mockStore({ desserts: [] });

//Bringing in types and actions
const { GOT_DESSERTS_DATA, NEW_DESSERT_DATA } = require('./types');
const {
  gotDesserts,
  addDessert,
  fetchDesserts,
  postDessert,
} = require('./actions');

describe('Testing dessert thunks', () => {
  beforeEach(() => {
    // Runs before each test in the suite
    store.clearActions();
  });

  it('The got desserts action returns the correct action object.', () => {
    const gotDessertsResult = gotDesserts(['cookie', 'brownie']);

    expect(gotDessertsResult.type).toEqual(GOT_DESSERTS_DATA);
    expect(gotDessertsResult.desserts).toEqual(['cookie', 'brownie']);
  });

  it('The add dessert action returns the correct action object.', () => {
    const addDessertsResult = addDessert(['pudding']);

    expect(addDessertsResult.type).toEqual(NEW_DESSERT_DATA);
    expect(addDessertsResult.newDessert).toEqual(['pudding']);
  });
  it('It dispatches the GOT_DESSERTS action with the fetched desserts.', () => {
    mockAxios.onGet('/api/desserts').reply(200, {
      desserts: ['ice cream', 'pie'],
    });

    const historyOfActions = [
      { type: GOT_DESSERTS_DATA, desserts: ['ice cream', 'pie'] },
    ];

    return store.dispatch(fetchDesserts()).then(() => {
      expect(store.getActions()).toEqual(historyOfActions);
    });
  });
  it('It dispatches the NEW_DESSERT action with the newly created dessert.', () => {
    //Fetch mock to example api for desserts

    mockAxios.onPost('/api/desserts').reply(201, {
      newDessert: ['cream puff'],
    });

    const historyOfActions = [
      { type: NEW_DESSERT_DATA, newDessert: ['cream puff'] },
    ];

    return store.dispatch(postDessert()).then(() => {
      expect(store.getActions()).toEqual(historyOfActions);
    });
  });
});
