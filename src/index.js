const md5 = require('md5')
const fs = require('fs')
const path = require('path')

const getHashedFilename = (key) => md5(key) + '.cache'

function suSimpleCache() {
	
	this.dirPath = ''

	/**
	 * initialise the simpleCache instance
	 * @param {string} dpath - path to the cache directory
	 * @return {simpleCache} this instance
	 */
	this.init = (dpath) => {
		this.dirPath = dpath
		if(!fs.existsSync(dpath)) {
			fs.mkdirSync(dpath)
		}
		return this
	}

	/**
	 * sets a key-value pair in a file in the cache directory
	 * @param {string} key - Unique identifier
	 * @param {dynamic} value - JSON serializable data
	 * @return {Promise} resolves into object containing cached file info
	 */
	this.set = (key, value) => {
		return new Promise((resolve, reject) => {
			var hashFilename = getHashedFilename(key)
			fs.writeFile(path.join(this.dirPath, hashFilename), JSON.stringify(value), (err) => {
				if(err) reject(err)
				var cachedFile = {
					key,
					hashFilename,
					data: value
				}
				resolve(cachedFile)
			})
		})
	}

	/**
	 * gets the value given a key by looking up for the corresponding file in the cache directory
	 * @param {string} key - Unique identifier
	 * @return {Promise} resolves into object containing cached file info
	 */
	this.get = (key) => {
		return new Promise((resolve, reject) => {
			var hashFilename = getHashedFilename(key)
			fs.readFile(path.join(this.dirPath, hashFilename), (err, data) => {
				if(err) return reject(err)
				var cachedFile = {
					key,
					hashFilename,
					data: JSON.parse(data.toString())
				}
				resolve(cachedFile)
			})
		})
	}

	/**
	 * asynchronously checks if the file with the given key is cached in the cache directory
	 * @param {string} key - Unique identifier
	 * @return {Promise} boolean
	 */
	this.isCached = (key) => {
		return new Promise((resolve) => {
			var hashFilename = getHashedFilename(key)
			fs.access(path.join(this.dirPath, hashFilename), fs.constants.F_OK, (err) => {
				resolve(!err)
			})
		})
	}

	/**
	 * synchronous version of isCached
	 * @param {string} key - Unique identifier
	 * @return {boolean}
	 */
	this.isCachedSync = (key) => {
		var hashFilename = getHashedFilename(key)
		return fs.existsSync(path.join(this.dirPath, hashFilename))
	}

	/**
	 * deletes the file associated with the given key
	 * @param {string} key - Unique identifier
	 * @return {Promise} resolves to true if successful
	 */
	this.delete = (key) => {
		return new Promise((resolve, reject) => {
			var hashFilename = getHashedFilename(key)
			fs.unlink(path.join(this.dirPath, hashFilename), (err) => {
				if(err) return reject(err)
				resolve(true)
			})
		})
	}

	/**
	 * synchronous version of delete
	 * @param {string} key - Unique identifier
	 * @return {void}
	 */
	this.deleteSync = (key) => {
		var hashFilename = getHashedFilename(key)
		fs.unlinkSync(hashFilename)
	}

	/**
	 * asynchronously deletes cache directory
	 * @return {Promise} resolves to true if successful
	 */
	this.deleteAll = () => {
		return Promise((resolve, reject) => {
			fs.rmdir(this.dirPath, (err) => {
				if(err) return reject(err)
				resolve(true)
			})
		})
	}
}

module.exports = suSimpleCache