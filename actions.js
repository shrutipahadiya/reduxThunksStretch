const axios = require('axios');

//TYPES
const { GOT_DESSERTS_DATA, NEW_DESSERT_DATA } = require('./types');

/* YOUR CODE GOES HERE */
const got_desserts = ({desserts}) => ({

    type:GOT_DESSERTS_DATA,
    desserts,
});

const new_dessert = ({newDessert}) => ({

    type:NEW_DESSERT_DATA,
    newDessert,
});

const mapDispatchToProps =(dispatch,newDessert)



module.exports = { gotDesserts, addDessert, fetchDesserts, postDessert };
