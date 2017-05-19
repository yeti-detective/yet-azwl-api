const osmosis = require('osmosis')
const fs = require('fs')

let saveData = []

osmosis.get("https://www.amazon.com//dp/1617294438")
  .set({
    'prod': "#productTitle@html",
    'img': ['#mainImageContainer img@src'],
    'price': 'span #priceblock_ourprice@html'
  })
  .log(console.log)
  .data((data)=>{
    console.log(data)
    // saveData.push(data)
  })
  .done((data)=>{
    console.log('done')
  })
