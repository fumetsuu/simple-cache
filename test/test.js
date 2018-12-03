const SuSimpleCache = require('../dist/index')

//set up
var suSimpleCache = new SuSimpleCache().init('./test/cache')

//set key
suSimpleCache.set('test1key', 'test1value').then((res) => {
	console.log(res)	
}).catch(console.log)

//get key
suSimpleCache.get('test1key').then((cachedFile) => {
	console.log(cachedFile.data)
})

//get invalid key
suSimpleCache.get('invalid key').then(console.log).catch((err) => {
	console.log('err invalid key!', err)
})

//delete key
suSimpleCache.delete('test1key').then((res) => {
	if(res) console.log('deleted test1key successfully')
	if(!res) console.log('unsuccessful in deleting test1key')
})