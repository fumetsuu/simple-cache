## 

* [init(dpath)](#init) ⇒ <code>simpleCache</code>
* [set(key, value)](#set) ⇒ <code>Promise</code>
* [get(key)](#get) ⇒ <code>Promise</code>
* [isCached(key)](#isCached) ⇒ <code>Promise</code>
* [isCachedSync(key)](#isCachedSync) ⇒
* [delete(key)](#delete) ⇒ <code>Promise</code>
* [deleteSync(key)](#deleteSync) ⇒ <code>void</code>
* [deleteAll()](#deleteAll) ⇒ <code>Promise</code>

<a name="init"></a>

## init(dpath) ⇒ <code>simpleCache</code>
initialise the simpleCache instance

**Kind**: global function  
**Returns**: <code>simpleCache</code> - this instance  

| Param | Type | Description |
| --- | --- | --- |
| dpath | <code>string</code> | path to the cache directory |

<a name="set"></a>

## set(key, value) ⇒ <code>Promise</code>
sets a key-value pair in a file in the cache directory

**Kind**: global function  
**Returns**: <code>Promise</code> - resolves into object containing cached file info  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Unique identifier |
| value | <code>dynamic</code> | JSON serializable data |

<a name="get"></a>

## get(key) ⇒ <code>Promise</code>
gets the value given a key by looking up for the corresponding file in the cache directory

**Kind**: global function  
**Returns**: <code>Promise</code> - resolves into object containing cached file info  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Unique identifier |

<a name="isCached"></a>

## isCached(key) ⇒ <code>Promise</code>
asynchronously checks if the file with the given key is cached in the cache directory

**Kind**: global function  
**Returns**: <code>Promise</code> - boolean  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Unique identifier |

<a name="isCachedSync"></a>

## isCachedSync(key) ⇒
synchronous version of isCached

**Kind**: global function  
**Returns**: boolean  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Unique identifier |

<a name="delete"></a>

## delete(key) ⇒ <code>Promise</code>
deletes the file associated with the given key

**Kind**: global function  
**Returns**: <code>Promise</code> - resolves to true if successful  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Unique identifier |

<a name="deleteSync"></a>

## deleteSync(key) ⇒ <code>void</code>
synchronous version of delete

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Unique identifier |

<a name="deleteAll"></a>

## deleteAll() ⇒ <code>Promise</code>
asynchronously deletes cache directory

**Kind**: global function  
**Returns**: <code>Promise</code> - resolves to true if successful  
