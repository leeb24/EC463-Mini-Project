

const rn = require('random-number');

module.exports.number_generated = () => {
var options = {
  min:  60
, max:  100
, integer: true
}
return rn(options);
};

