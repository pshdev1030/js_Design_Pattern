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
class Observer {
  constructor() {}
  update() {
    // ...
  }
}

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
