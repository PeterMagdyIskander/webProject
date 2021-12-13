let users = [
    {
      id: "petermagdy",
      name: "Peter Magdy",
      password: "123456789",
      owner: false,
      itemIds: [],
    },
    {
      id: "petergeorge",
      name: "Peter George",
      password: "12345678",
      owner: true,
      itemIds: ["8xf0y6ziyjabvozdd253nf"],
    },
  ];
  
  let items = {
      "8xf0y6ziyjabvozdd253nf":{
        owner: "petergeorge",
        id: "8xf0y6ziyjabvozdd253nf",
        name: "IPhone36SPropMax",
        category:"Electronics",
        Price:"12000",
        itemsCount:6,
      },
  }
  function binarySearch(ArrayOfUsers, username) {
    let data = ArrayOfUsers;
    data.sort((a, b) => (a.id.toLowerCase() > b.id.toLowerCase() ? 1 : -1));
    let l = 0;
    let r = data.length - 1;
    while (l <= r) {
      let m = l + Math.floor((r - l) / 2);
  
      let res = username.localeCompare(data[m].id);
  
      if (res === 0) return m;
  
      if (res > 0) l = m + 1;
      else r = m - 1;
    }
    return -1;
  }
  
  export function _getItems() {
    return new Promise((res, rej) => {
      setTimeout(() => res(items), 1000);
    });
  }
  
  
  export function _signIn(username, password) {
    let userAccount = null;
    let index = binarySearch(users, username);
    if (index !== -1 && users[index].password === password) {
      userAccount = users[index];
    }
    return new Promise((res, rej) => {
      setTimeout(() => res(userAccount), 1000);
    });
  }
  
  export function _addItem(item){
    items[item.id]=item;
    let index = binarySearch(users, item.owner);
    users[index].itemIds.push(item.id);
    return new Promise((res, rej) => {
      setTimeout(() => res(true), 1000);
    });
  }
  