fetch(` https://api.lyrics.ovh/suggest/hello`)
.then(res=>res.json())
.then(data=>console.log(data))