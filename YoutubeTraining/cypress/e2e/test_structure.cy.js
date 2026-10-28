//topics
//1.- Describe and context
//2.- it and specify
//3.- Unit testing demo

let add = (a, b) => a + b;
let sub = (a, b) => a - b;
let mul = (a, b) => a * b;
let div = (a, b) => a / b;

//Describe or context
describe('Unis testing for a sample application', () => {
  
  //it or specify
  context('Math with positive numbers', () => {
    specify('It should add positive numbers', () => {
      expect(add(1, 2)).to.equal(3);
    });

    it('It should subtract positive numbers', () => {
      expect(sub(2, 1)).to.equal(1);
    });

    it('It should multiply positive numbers', () => {
      expect(mul(1, 2)).to.equal(2);
    });

    it('It should divide positive numbers', () => {
      expect(div(3, 1)).to.equal(3);
    });
  });

  context('Math with decimal numbers', () => {

    it('It should add decimal numbers', () => {
      expect(add(1.5, 2.5)).to.equal(4.0);
    });

    it('It should subtract decimal numbers', () => {
      expect(sub(1.5, 0.5)).to.equal(1.0);
    });

    it('It should multiply decimal numbers', () => {
      expect(mul(1.5, 2)).to.equal(3.0);
    });

    it('It should divide decimal numbers', () => {
      expect(div(4.4, 2.2)).to.equal(2);
    });
    
  });

});