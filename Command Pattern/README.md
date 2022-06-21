Command Pattern은 메소드 호출과 같은 작업을 단일 객체로 캡슐화 하기 위한 패턴이다.

캡슐화함에 따라 기능의 실행을 요구하는 호출자와 실제 기능을 실행하는 수신자 클래스 사이의 의존성을 제거한다.

따라서 기능의 수정에도 호출자의 수정없이 그대로 사용할 수 있다.

추상클래스와 유사하다고 생각하면 된다.

다시말해 재사용성이 높은 클래스를 설계하기에 좋다.

구현 측면에서 Command 객체는 작업과 작업을 호출하려는 객체 모두를 바인딩한다. 여기에는 실행하는 함수( `run()` 이나 `excute()`같은) 함수들이 일관되게 포함된다.

```js
const carManager = {
  requestInfo(model, id) {
    return `The information for ${model} with ID ${id} is foobar`;
  },

  buyVehicle(model, id) {
    return `You have successfully purchased Item ${id}, a ${model}`;
  },

  arrangeViewing(model, id) {
    return `You have successfully booked a viewing of ${model} ( ${id} ) `;
  },
};
```

다음과 같이 carManager 객체를 설계할 경우 carManager 객체가 수정이 될 때 carManager 작업을 호출하려는 객체도 같이 수정되어야 한다. 이는 carManager와 작업을 호출하려는 객체간의 의존성이 크다는 것을 의미한다.

Command Pattern을 적용하여 이런 의존성을 없앨 수 있다.

```js
carManager.execute = function (name) {
  return (
    carManager[name] &&
    carManager[name].apply(carManager, [].slice.call(arguments, 1))
  );
};

carManager.execute("arrangeViewing", "Ferrari", "14523");
carManager.execute("requestInfo", "Ford Mondeo", "54323");
carManager.execute("requestInfo", "Ford Escort", "34232");
carManager.execute("buyVehicle", "Ford Escort", "34232");
```

carManager에 명령을 내릴 수 있는 execute 함수를 제공하고 이를 통해 둘 사이의 의존성을 없애 carManager 객체가 수정되더라도 작업을 호출하는 객체들을 수정할 필요가 없어졌다.
