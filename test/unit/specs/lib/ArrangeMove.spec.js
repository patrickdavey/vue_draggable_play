import Vue from 'vue'
import ArrangeMoveLogic from '@/lib/ArrangeMoveLogic.js'

describe('ArrangeMoveLogic', () => {
  it('returns false if from is "normal" and to is "problem" ', () => {
    let evt = {
      from: {
         getAttribute: sinon.stub().returns("normal-container")
      },
      to: {
         getAttribute: sinon.stub().returns("problem-container")
      }
    };

    let logic = new ArrangeMoveLogic(evt);
    expect(logic.canMove()).to.be.false;
  });

  it('returns true if from is "problem" and to is "problem" ', () => {
    let evt = {
      from: {
         getAttribute: sinon.stub().returns("problem-container")
      },
      to: {
         getAttribute: sinon.stub().returns("problem-container")
      }
    };

    let logic = new ArrangeMoveLogic(evt);
    expect(logic.canMove()).to.be.true;
  });

  it('returns true if from is "problem" and to is "normal" and to is also "no-children"', () => {
    let evt = {
      from: {
         getAttribute: sinon.stub().returns("problem-container")
      },
      to: {
         getAttribute: sinon.stub().returns("normal-container no-children")
      }
    };

    let logic = new ArrangeMoveLogic(evt);
    expect(logic.canMove()).to.be.true;
  });

  it('returns true if they are both normal containers', () => {
    let evt = {
      from: {
         getAttribute: sinon.stub().returns("normal-container")
      },
      to: {
         getAttribute: sinon.stub().returns("normal-container")
      }
    };

    let logic = new ArrangeMoveLogic(evt);
    expect(logic.canMove()).to.be.true;
  });

  it('returns false otherwise', () => {
    let evt = {
      from: {
         getAttribute: sinon.stub().returns("blah")
      },
      to: {
         getAttribute: sinon.stub().returns("wibble")
      }
    };

    let logic = new ArrangeMoveLogic(evt);
    expect(logic.canMove()).to.be.false;
  });

})
