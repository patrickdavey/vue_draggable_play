export default class MoveLogic {
  constructor (evt) {
    this.dragged = evt.from.getAttribute("class");
    this.related = evt.to.getAttribute("class");
  }

  canMove () {
    if (this.dragged === "normal-container" && this.related.match(/problem-container/)) {
      return false;
    } else if (this.dragged.match(/problem-container/) && this.related.match(/problem-container/)) {
      return true;
    } else if (this.dragged.match(/problem-container/) && this.related.match(/normal-container/) && this.related.match(/no-children/)) {
      return true;
    } else if (this.dragged.match(/normal-container/) && this.related.match(/normal-container/)) {
      return true;
    }
    return false;
  }
};

