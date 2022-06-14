Revealing Module Pattern은 모듈 패턴과 유사한 패턴이다.

모듈 패턴의 경우 객체 리터럴을 이용하기 떄문에 `객체이름.함수`의 형태로 멤버에 접근해야 했다.

Revealing Module Pattern은 모든 함수와 변수를 private 범위에 정의하고 공개하고자 하는 private 함수의 포인터를 가진 익명의 객체를 반환하도록 수정한 패턴이다.

```js
let privateVar = "Ben Cherry";
const publicVar = "Hey there!";

const privateFunction = () => {
  console.log(`Name:${privateVar}`);
};

const publicSetName = (strName) => {
  privateVar = strName;
};

const publicGetName = () => {
  privateFunction();
};

const myRevealingModule = {
  setName: publicSetName,
  greeting: publicVar,
  getName: publicGetName,
};

export default myRevealingModule;

import myRevealingModule from "./myRevealingModule";

myRevealingModule.setName("Paul Kinlan");
```

get과 set 메소드를 통해 private 변수에 접근할 수 있다.

## 장점

코드가 일관되어있다.(모두 private영역에 선언하기 때문에)

공개적으로 액세스 할 수 있는 범위가 명확하다.

즉 가독성이 좋다.

## 단점

로직을 재정의하는 것이 불가능하다(모두 private이기 때문)
