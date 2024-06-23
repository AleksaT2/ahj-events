export default class GamePlay {
  constructor(fields) {
    this.fields = fields;
    this.size = 4;
    this.board = null;
    this.position = 0;
    this.miss = 0;
    this.hit = 0;
  }

  init() {
    this.board = this.fields.createField()
    this.updatePoints('.miss', 'Промахи', this.miss = 0);
    this.updatePoints('.hit', 'Попадания', this.hit = 0);
    this.board.addEventListener("click", this.onCellClick.bind(this));
    this.start();
  }

  changePosition () {
    this.board.classList.add('hammer');
    this.board.classList.remove('hammerhit');
    const position = Math.floor(Math.random() * this.size ** 2);
    this.deletePosition(this.position);
    if (position === this.position) {
      this.changePosition();
      return;
    }
    else {
      this.board.children[position].classList.add('moll');
      this.position = position;      
    }
  }

  deletePosition (position) {
    this.board.children[position].classList.remove('moll');
  }

  onCellClick(e) {
    e.preventDefault();
    if (e.target.classList.contains('moll')) {
      ++this.hit;
      this.board.classList.remove('hammer');
      this.updatePoints('.hit', 'Попадания', this.hit);
      this.deletePosition(this.position);
    }
    else {
      ++this.miss;
      this.updatePoints('.miss', 'Промахи', this.miss);
    }

    if (this.miss == 5) {
      alert ("Вы проиграли!");
      this.updatePoints('.miss', 'Промахи', this.miss = 0);
      this.updatePoints('.hit', 'Попадания', this.hit = 0);
    }

  }
  updatePoints(className, status, score) {
    const res = document.querySelector(className);
    res.innerHTML = `${status} = ${score}`;
  }

  start() {
    setInterval(() => {
      this.changePosition();
    }, 1000);
  }
}