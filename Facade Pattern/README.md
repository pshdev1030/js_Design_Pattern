Facade Pattern은 간략화된 인터페이스를 제공하는 패턴이다.
복잡한 소프트웨어를 간편하게 사용할 수 있도록 인터페이스를 제공한다.

axios가 fetch API에 Facade Pattern을 적용한 라이브러리이다.

```js
function getUsers() {
  return fetch("https://jsonplaceholder.typicode.com/users", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
}

function getUserPosts(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
}

getUsers().then((users) => {
  users.forEach((user) => {
    getUserPosts(user.id).then((posts) => {
      console.log(user.name);
      console.log(posts.length);
    });
  });
});
```

위의 코드에서 공통된 부분을 추상화하였다.

```js
function getUsers() {
  return getFetch("https://jsonplaceholder.typicode.com/users");
}

function getUserPosts(userId) {
  return getFetch("https://jsonplaceholder.typicode.com/posts", {
    userId: userId,
  });
}

function getFetch(url, params = {}) {
  const queryString = Object.entries(params)
    .map((param) => {
      return `${param[0]}=${param[1]}`;
    })
    .join("&");
  return fetch(`${url}?${queryString}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
}

getUsers().then((users) => {
  users.forEach((user) => {
    getUserPosts(user.id).then((posts) => {
      console.log(user.name);
      console.log(posts.length);
    });
  });
});
```

header를 지정하고 fetch 요청을 보내고 response를 json으로 반환하는 함수이다.

getFetch만 수정하면 되기 때문에 유지보수하기 더 쉽고 깔끔한 코드가 되었다.

```js
function getUsers() {
  return getFetch("https://jsonplaceholder.typicode.com/users");
}

function getUserPosts(userId) {
  return getFetch("https://jsonplaceholder.typicode.com/posts", {
    userId: userId,
  });
}

function getFetch(url, params = {}) {
  return axios({
    url: url,
    method: "GET",
    params: params,
  }).then((res) => res.data);
}

getUsers().then((users) => {
  users.forEach((user) => {
    getUserPosts(user.id).then((posts) => {
      console.log(user.name);
      console.log(posts.length);
    });
  });
});
```

위의 코드는 fetch를 axios로 수정한 코드인데, 다음과 같이 수정을 해야할 경우 getFetch만 수정하면 되기 때문에 유지보수가 쉬워진다.
