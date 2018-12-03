'use strict';

var md5 = require('md5');
var fs = require('fs');
var path = require('path');

var getHashedFilename = function getHashedFilename(key) {
	return md5(key) + '.cache';
};

function suSimpleCache() {
	var _this = this;

	this.dirPath = '';

	/**
  * initialise the suSimpleCache instance
  * @param {string} dpath - path to the cache directory
  * @return {suSimpleCache} this instance
  */
	this.init = function (dpath) {
		_this.dirPath = dpath;
		if (!fs.existsSync(dpath)) {
			fs.mkdirSync(dpath);
		}
		return _this;
	};

	/**
  * sets a key-value pair in a file in the cache directory
  * @param {string} key - Unique identifier
  * @param {dynamic} value - JSON serializable data
  * @return {Promise} resolves into object containing cached file info
  */
	this.set = function (key, value) {
		return new Promise(function (resolve, reject) {
			var hashFilename = getHashedFilename(key);
			fs.writeFile(path.join(_this.dirPath, hashFilename), JSON.stringify(value), function (err) {
				if (err) reject(err);
				var cachedFile = {
					key: key,
					hashFilename: hashFilename,
					data: value
				};
				resolve(cachedFile);
			});
		});
	};

	/**
  * gets the value given a key by looking up for the corresponding file in the cache directory
  * @param {string} key - Unique identifier
  * @return {Promise} resolves into object containing cached file info
  */
	this.get = function (key) {
		return new Promise(function (resolve, reject) {
			var hashFilename = getHashedFilename(key);
			fs.readFile(path.join(_this.dirPath, hashFilename), function (err, data) {
				if (err) return reject(err);
				var cachedFile = {
					key: key,
					hashFilename: hashFilename,
					data: JSON.parse(data.toString())
				};
				resolve(cachedFile);
			});
		});
	};

	/**
  * asynchronously checks if the file with the given key is cached in the cache directory
  * @param {string} key - Unique identifier
  * @return {Promise} boolean
  */
	this.isCached = function (key) {
		return new Promise(function (resolve) {
			var hashFilename = getHashedFilename(key);
			fs.access(path.join(_this.dirPath, hashFilename), fs.constants.F_OK, function (err) {
				resolve(!err);
			});
		});
	};

	/**
  * synchronous version of isCached
  * @param {string} key - Unique identifier
  * @return {boolean}
  */
	this.isCachedSync = function (key) {
		var hashFilename = getHashedFilename(key);
		return fs.existsSync(path.join(_this.dirPath, hashFilename));
	};

	/**
  * deletes the file associated with the given key
  * @param {string} key - Unique identifier
  * @return {Promise} resolves to true if successful
  */
	this.delete = function (key) {
		return new Promise(function (resolve, reject) {
			var hashFilename = getHashedFilename(key);
			fs.unlink(path.join(_this.dirPath, hashFilename), function (err) {
				if (err) return reject(err);
				resolve(true);
			});
		});
	};

	/**
  * synchronous version of delete
  * @param {string} key - Unique identifier
  * @return {void}
  */
	this.deleteSync = function (key) {
		var hashFilename = getHashedFilename(key);
		fs.unlinkSync(hashFilename);
	};

	/**
  * asynchronously deletes cache directory
  * @return {Promise} resolves to true if successful
  */
	this.deleteAll = function () {
		return Promise(function (resolve, reject) {
			fs.rmdir(_this.dirPath, function (err) {
				if (err) return reject(err);
				resolve(true);
			});
		});
	};
}

module.exports = suSimpleCache;
//# sourceMappingURL=index.js.map