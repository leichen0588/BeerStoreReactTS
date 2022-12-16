import React, { useState } from 'react';
import './App.css';

class Beer {
  name: string;
  price: number;
  imgUrl: string;

  public constructor(name: string,price: number,imgUrl: string) {
    this.name = name;
    this.price = price;
    this.imgUrl = imgUrl;
  }
}

function App() {

  const beers: Beer[] = [new Beer("Molson Canadian",5,"beer1.png"), new Beer("Labatt Blue",8,"beer2.png"), new Beer("Moosehead Lager",10,"beer3.png")];

  let beerCounter = [
    0, 0, 0
  ];
  const [quans, setQuans] = useState(beerCounter);

  
  const decQuan = (index: number) => {
    const nextCounters = quans.map((c, i) => {
      if ((i === index)&&quans[i]>0) {
        return c - 1;
      } else {
        return c;
      }
    });
    setQuans(nextCounters);
  }

  const addQuan = (index: number) => {
    const nextCounters = quans.map((c, i) => {
      if (i === index) {
        return c + 1;
      } else {
        return c;
      }
    });
    setQuans(nextCounters);
  }

  const beerAdded: string[] = [];
  let totalPrice: number = 0;
  for (let i = 0; i < Object.keys(quans).length; i++) {
      if (quans[i]>0){
        beerAdded.push((beers[i].name +"($"+beers[i].price+")").padEnd(80,".")+" X "+quans[i])
        totalPrice+=beers[i].price*quans[i];
      }
  }
  if (totalPrice>0){
    beerAdded.push("TOTAL".padEnd(90,".")+" $"+totalPrice);
  }

  const clear = () => {
    const nextCounters = quans.map((c, i) => {
        return 0;
    });
    setQuans(nextCounters);
  }

  const checkout = () => {
    if (totalPrice<=0){
      window.confirm("You have not buy anything.");
    } else if (totalPrice<=100){
        window.confirm("Please enjoy your drinks!");
    }else{
        window.alert("That is a lot of alcohol! Enjoy but do not over-consume.");
    }
    const nextCounters = quans.map((c, i) => {
        return 0;
    });
    setQuans(nextCounters);
  }

  return (
    <div className="App">
    <h1>Welcome to Canadian Beer Store</h1>
      <div className="cardBeers">
          {quans.map((value, i) => (
            
          <div key={i+10} className="cardBeer" style={{border:"2px solid black"}}>
            <ul>
                <li key={i}>
                  <img src={beers[i].imgUrl} alt=""></img> 
                  <h4><b>{beers[i].name} ${beers[i].price}</b></h4>
                  <button type="button" onClick={() => {decQuan(i)}}>-</button>
                  <span>{value}</span>
                  <button type="button" onClick={() => {addQuan(i)}}>+</button>
                </li>
              </ul>
          </div>
          ))}
      </div>

      
      <div className="shopList">
          <h4 className="listHead"><b>Your Shopping List: </b></h4>
          <div className="cartBeer">
          {beerAdded.map((value, i) => (
            <div key={i+10}>
                <ul>
                    <li key={i}>
                      <label>{value}</label>
                    </li>
                  </ul>
              </div>
          ))}
          </div>
          <button className="checkoutButton" type="button" onClick={checkout}>Checkout</button>
          <button className="clearButton" type="button" onClick={clear}>Clear</button>

      </div>


    </div>
  );
}

export default App;
