class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    this.users.push({id, name, room});
    return {id, name, room};
  }
  removeUser(id) {
    const user = this.getUser(id);
    if (user) {
      this.users = this.users.filter(element => element.id !== user.id);
    }
    return user;
  }
  getUser(id) {
    return this.users.find(user => user.id === id);
  }
  getUserList(room) {
    return this.users
      .filter(user => user.room === room)
      .map(user => user.name);
  }
}

module.exports = {Users};