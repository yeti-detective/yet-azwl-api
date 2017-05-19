const fs = require('fs')
const path = require('path')

var wishes = []

fs.readFile(path.join(__dirname + '/data.json'), (err, data)=>{
  if(err) console.error(err)
  // console.log(JSON.parse(data)[0].WL_Links)
  JSON.parse(data)[0].WL_Links.map((wish)=>{
    if(wish.indexOf('/dp/') == 0 && !wishes.includes(wish.substring(0, wish.lastIndexOf('/')))){
      wishes.push('https://www.amazon.com' + wish.substring(0, wish.lastIndexOf('/')))
    }
  })
  fs.writeFile('wishList.txt', wishes.join(','), (err)=>{
    if(err) console.error(err)
    else console.log
  })
})
