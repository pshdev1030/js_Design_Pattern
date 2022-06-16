Observer Pattern은 객체가 종속성을 지닌 항목들에 대한 정보를 알 필요 없이 다른 객체가 변경될 때 하나의 객체가 알림을 받을 수 있도록 하는 디자인 패턴이다.

객체(Subject)와 그 객체에 종속성을 지닌 객체 목록(Observers)을 유지하며 Subject의 state에 변화가 생겼을 때 자동으로 Observers에게 알리도록 하는 패턴이다.

현대의 프레임워크에서 Observer Pattern은 상태변화를 컴포넌트에게 알리기 위해 많이 사용한다.

Observer Pattern을 구현하기 위해 위에서 언급한 내용을 다음과 같은 컴포넌트들로 확장할 수 있다.

1. Subject: Observers의 목록을 유지하고 Observer를 추가하거나 제거할 수 있도록 한다.

2. Observer: Subject의 state 변화를 알려야하는 객체에 대한 업데이트 인터페이스를 제공한다.

3. Concrete Subject : 상태 변화에 대한 알림을 관찰자에게 알리고 ConcreteObservers의 state를 저장한다.

4. ConcreteObserver : ConcreteSubject에 대한 참조를 저장하고, Observer의 업데이트 인터페이스를 구현하여 state가 Subject와 일치하는지 확인한다.

ES2015+에서는 javascript 클래스를 사용하여 Observer Pattern을 구현할 수 있다.

먼저 Subject Class에서 가질 수 있는 ObserverList를 정의하면 다음과 같다.

```js
class ObserverList {
  constructor() {
    this.observerList = [];
  }

  add(obj) {
    return this.observerList.push(obj);
  }
  // 추가

  count() {
    return this.observerList.length;
  }
  // 길이

  get(index) {
    if (index > -1 && index < this.observerList.length) {
      return this.observerList[index];
    }
  }

  // get

  indexOf(obj, startIndex) {
    let i = startIndex;

    while (i < this.observerList.length) {
      if (this.observerList[i] === obj) {
        return i;
      }
      i++;
    }

    return -1;
  }
  // index

  removeAt(index) {
    this.observerList.splice(index, 1);
  }
  // 지우기
}
```

다음으로 ObserverList에 Observer를 추가, 제거 그리고 state 변화를 알리는 Subject Class를 정의하면 다음과 같다.

```js
class Subject {
  constructor() {
    this.observers = new ObserverList();
  }

  addObserver(observer) {
    this.observers.add(observer);
  }

  removeObserver(observer) {
    this.observers.removeAt(this.observers.indexOf(observer, 0));
  }

  notify(context) {
    const observerCount = this.observers.count();
    for (let i = 0; i < observerCount; i++) {
      this.observers.get(i).update(context);
    }
  }
}
```

다음으로 Observer를 정의하면 다음과 같다.

Observer마다 Subject의 state 변화시 취해야 할 동작이 다르므로 추상 인터페이스의 형태로 작성한다.

```js
class Observer {
  constructor() {}
  update() {
    // ...
  }
}
```

다음을 포함한 HTML을 작성한다.

- 새로운 Obserable한 checkbox를 추가하기 위한 `button`
- 다른 checkbox에 체크해야 함을 알리는 Subject의 역할을 하는 checkbox
- 추가되는 새 checkbox의 container(Subject에 의존성을 지닌 Object)
- 위에서 작성한 Subject, ObjectList를 포함한 script 파일

```html
<body>
  <button id="addNewObserver">Add New Observer checkbox</button>
  <input id="mainCheckbox" type="checkbox" />
  <div id="observersContainer"></div>
  <script src="./app.js"></script>
  <script>
    class ConcreteSubject extends Subject {
      constructor(element) {
        super();
        this.element = element;

        this.element.onclick = () => {
          this.notify(this.element.checked);
        };
      }
    }

    class ConcreteObserver extends Observer {
      constructor(element) {
        super();
        this.element = element;
      }

      update(value) {
        this.element.checked = value;
      }
    }
    const addBtn = document.getElementById("addNewObserver");
    const container = document.getElementById("observersContainer");
    const controlCheckbox = new ConcreteSubject(
      document.getElementById("mainCheckbox")
    );

    const addNewObserver = () => {
      const check = document.createElement("input");
      check.type = "checkbox";
      const checkObserver = new ConcreteObserver(check);

      controlCheckbox.addObserver(checkObserver);

      container.appendChild(check);
    };

    addBtn.onclick = addNewObserver;
  </script>
</body>
```

위 예제에서 버튼을 누르며 추가된 Observer checkbox는 각자 별개의 state를 가진다.

하지만 Subject checkbox가 클릭되어 checked 상태가 바뀌면 Subject Class의 notify를 호출한다.

notify 내부에선 ObserverList를 순회하며 update를 호출된다.

ConcreteObserver에선 Observer Class를 상속받아 update 메소드를 value를 받아 checked를 value로 하도록 구현하였다.

때문에 Observer checkbox는 Subject checkbox의 state(checked)와 동기화된다.
