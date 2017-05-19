"use strict"

const osmosis = require('osmosis')
const fs = require('fs')

// let saveData = []
let WL = {}
let titles = []
let links = []
let imgs = []
// let prices = []

osmosis.get("https://www.amazon.com/gp/registry/wishlist/1PG248H308KJF/")
  .set({
    "Title": '#profile-list-name',
    "WL_Items": ['#item-page-wrapper a@title'],
    "WL_Links": ['#item-page-wrapper a@href'],
    "WL_Imgs": ['#item-page-wrapper img@src'],
    // "WL_prices": ['.a-color-price']
  })
  .log(console.log)
  .data((data)=>{
    // saveData.push(data)
    WL.title = data.Title
    data.WL_Items.map((name)=>{
      if(!titles.includes(name)){
        titles.push(name)
      }
    })
    data.WL_Links.map((link)=>{
      if(link.indexOf('/dp/') == 0 && !links.includes('https://www.amazon.com' + link.substring(0, link.lastIndexOf('/')))){
        links.push('https://www.amazon.com' + link.substring(0, link.lastIndexOf('/')))
      }
    })
    data.WL_Imgs.map((pic)=>{
      imgs.push(pic)
    })
  })
  .done((data)=>{
    for(var i = 0; i < titles.length; i++){
      WL[i] = {
        title: titles[i],
        url: links[i],
        img: imgs[i]
      }

    }
    console.log(JSON.stringify(WL))
  


    /*
    fs.writeFile('data.json', JSON.stringify( saveData, null, 4), (err)=>{
      if(err) console.error(err)
      else console.log('Data Saved to data.json file')
    })
    */
  })
