const expect = require('expect');
const {Users} = require('./../../../server/utils/users');

/* global define, it, describe, before, beforeEach, afterEach, after */
describe('Users', () => {
  let usersTest;
  beforeEach('Populate users', () => {
    usersTest = new Users();
    usersTest.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  });
  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: '123',
      name: 'Alberto',
      room: 'Node Architects'
    };
    expect(users.addUser(user.id, user.name, user.room)).toEqual(user);
    expect(users.users).toEqual([ user ]);
  });
  it('should get the two users of the Node Course room', () => {
    expect(usersTest.getUserList('Node Course')).toEqual(['Mike', 'Julie']);
  });
  it('should get the user of the React Course room', () => {
    expect(usersTest.getUserList('React Course')).toEqual([ 'Jen' ]);
  });
  it('should get a user by its id', () => {
    expect(usersTest.getUser('1').name).toEqual('Mike');
  });
  it('should not get a user', () => {
    expect(usersTest.getUser('38yt9wgb')).toBeFalsy();
  });
  it('should remove a user by its id', () => {
    expect(usersTest.removeUser('1').name).toEqual('Mike');
    expect(usersTest.users.length).toBe(2);
  });
  it('should not remove a user by its id because it does not exist', () => {
    expect(usersTest.removeUser('11224')).toBeFalsy();
    expect(usersTest.users.length).toBe(3);
  });
});

