Mediator Pattern은 한 객체가 다른 객체들에게 이벤트 발생을 알릴 수 있도록 하는 디자인 패턴이다.

즉 Mediator를 이용하여 통신하는데, Mediator는 객체들이 통신하는 방법을 추상적으로 만들어놓은 객체이다. 객체간에 직접 통신하지 않고 Mediator를 통해서 통신하게 된다.

Mediator를 만들게 되면 Mediator 입장에서는 M:1 통신을 하게 된다.

Mediator를 만듦으로써 객체는 어떻게 통신하는지에 대해 알지 않아도 되기 때문에 (즉 통신 방법이 추상화 되기 때문에) 객체끼리 낮은 결합도를 유지할 수 있어 유지보수가 쉬워진다.

## Player

```js
function Player(name) {
  this.name = name;
  this.points = 0;
}

Player.prototype.play = function () {
  this.points += 1;

  mediator.played();
};
```

플레이어가 작업을 통해 상태를 변경한 다음 Mediator를 통해 함수를 호출한다.

## Scoreboard

```js
var scoreboard = {
    ...
    update: function(score) {
        for (i in score) {
            // 점수 표시
        }
    }
};
```

점수를 표시한다.

## Mediator

```js
var mediator = {
    players: {},

    // 초기 플레이어 설정
    setup: function() {
        var players = this.players;
        players.home = new Player('home');
        players.guest = new Player('guest');
    }

    // 버튼 클릭이 일어났을 경우 보드판 갱신
    played: function() {
        var players = this.players,
            score = {
            Home: players.home.points,
          Guest: players.guest.points
        };

      scoreboard.update(score);
  },

    // key event
    keypress = function(e) {
        if (e.which == "1번 키") {
            mediator.player.home.play();
            return;
        }
        if (e.which == "0번 키") {
            mediator.player.guest.play();
            return;
        }
    }
}
```

플레이어에서 발생한 play 이벤트는 Mediator의 played 이벤트를 호출하고 이는 Scoreboard의 점수를 변경한다. 즉 핵심 로직을 Mediator를 통해 추상화하여 ScoreBoard와 Player 사이의 결합도는 낮아지고 ScoreBoard와 Player는 이에 대해 알 필요가 없다. 때문에 유지보수도 쉬워지고 재사용도 쉬워진다.

## 장점

다대다 통신에서 중재자를 이용한 다대일 통신으로 만든다.

또한 새로운 객체를 추가하기 쉽다.

직접 통신하는 경우에 비해 사이드이펙트가 적다.

## 단점

간접적으로 통신하므로 성능 저하가 발생할 수 있다.
