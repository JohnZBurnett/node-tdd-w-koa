// 

require('co-mocha'); 
require('should'); 
var fs = require('co-fs'); 
var data = require('../user-data.js'); 
var api = require('../user-web.js'); 
var request = require('co-supertest').agent(api.listen());  

before(function *() {
	yield fs.writeFile('./users.json', '[]'); 
})

describe('user data', function() {
	it('should have +1 user count after saving', function *() {
		var users = yield data.users.get(); 
		yield data.users.save({ name: 'John'});

		var newUsers = yield data.users.get(); 

		newUsers.length.should.equal(users.length + 1);  
	})
});

describe('user web', function () {
	it('should have +1 user count after saving to the web', function *() {  
		var res = yield request.get('/user').expect(200).end();

		var users = data.body; 

		yield data.users.save({ name: 'John'});

		var newRes = yield request.get('/user').expect(200).end(); 
		var newUsers = newRes.body; 

		newUsers.length.should.equal(users.length + 1); 
	})
})