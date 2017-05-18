const osmosis = require('osmosis')
const fs = require('fs')

let saveData = []

osmosis.get("https://www.amazon.com/gp/registry/wishlist/1PG248H308KJF/")
  .set({
    "Title": '#profile-list-name',
    "WL_Items": ['#item-page-wrapper a@title'],
    "WL_Imgs": ['#item-page-wrapper img@src']
  })
  .log(console.log)
  .data((data)=>{
    console.log(data)
    saveData.push(data)
  })
  .done((data)=>{
    fs.writeFile('data.json', JSON.stringify( saveData, null, 4), (err)=>{
      if(err) console.error(err)
      else console.log('Data Saved to data.json file')
    })
  })
