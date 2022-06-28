Mixin Pattern 은 메소드의 재사용을 위해 하위 클래스에서 상속받을 수 있는 메소드를 주입하는 함수이다.

자바스크립트는 단일 상속만 허용하는 언어인데, Mixin을 사용해서 다른 클래스를 상속받을 필요 없이 필요한 메소드를 상속받을 수 있다.

즉 단독으로 쓰이지 않고, 다른 클래스에 메소드를 제공해주는 용도로 사용된다.

자바스크립트에서 클래스는 표현식으로 다룰 수 있다. 이러한 점을 이용해서 클래스에서 새 서브클래스를 생성하는 함수로 정의하면 된다.

```js
const MyMixins = (superclass) =>
  class extends superclass {
    moveUp() {
      console.log("move up");
    }
    moveDown() {
      console.log("move down");
    }
    stop() {
      console.log("stop! in the name of love!");
    }
  };

class CarAnimator {
  moveLeft() {
    console.log("move left");
  }
}
class PersonAnimator {
  moveRandomly() {}
}

class MyAnimator extends MyMixins(CarAnimator) {}

const myAnimator = new MyAnimator();

myAnimator.moveLeft();
myAnimator.moveDown();
myAnimator.stop();
// move left
// move down
// stop! in the name of love!
```
