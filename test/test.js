const SimpleCache = require('../dist/index')

//set up
var simpleCache = new SimpleCache().init('./test/cache')

//set key
simpleCache.set('test1key', 'test1value').then((res) => {
	console.log(res)	
}).catch(console.log)

//get key
simpleCache.get('test1key').then((cachedFile) => {
	console.log(cachedFile.data)
})

//get invalid key
simpleCache.get('invalid key').then(console.log).catch((err) => {
	console.log('err invalid key!', err)
})

//delete key
simpleCache.delete('test1key').then((res) => {
	if(res) console.log('deleted test1key successfully')
	if(!res) console.log('unsuccessful in deleting test1key')
})