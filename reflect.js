var reflect = require('reflect-node');

var reflectSecretKey = "a1b2c3d-your-secure-api-token-4e5f6g7";

var usernameParam = {
  field: "Username",
  op: "=",
  value: "tonydanza"
};

var tokenParams = [
  usernameParam
];

var token = reflect.generateToken(reflectSecretKey, tokenParams);

exports.handler = function(event, context) {
  var userData = {
    username: 'foo',
    token: token
  };

  context.succeed(userData);
}
