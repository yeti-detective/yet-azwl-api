"use strict"

// npm packages
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const osmosis = require('osmosis')

var port = process.env.PORT || 8000

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/:wishlist', cors(), (req, res)=>{

  let WL = {}
  let titles = []
  let links = []
  let imgs = []
  // let prices = []

  osmosis.get("https://www.amazon.com/gp/registry/wishlist/" + req.params.wishlist)
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
      for(var i = 1; i < titles.length + 1; i++){
        WL[i] = {
          title: titles[i],
          url: links[i],
          img: imgs[i]
        }

      }
      res.json(JSON.stringify(WL))
    })

})

app.listen(port, ()=>{
  console.log('listening on ' + port)
})
