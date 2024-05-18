const _ = require('lodash');

const getInfodata = ({fileds = [], data = {}}) => {
    return _.pick(data, fileds);
}


module.exports = {
    getInfodata
}