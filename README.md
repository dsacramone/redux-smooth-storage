# redux-smooth-storage

## Synopsis

This middelware script saves your redux state to either localStorage or sessionStorage. It will also rehydrate your state tree if you leave and come back. I am currently using it against 6 stores with a bit of api/storage needs, and its' not slow. I think we are good on performance. Though it should be known, I just want to make clear that you can always blow out the storage by running: window.sessionStorage.removeItem("YOUR STORAGE NAME") or, window.localStorage..etc..

## Usage
Please go to npm, and pick up the package.
<ul>
  <li> In your "store" creation file - the file where you instantiate your middleware.
  <li> Pass in the method "watch" as middleware, for the middleware arrray.
  <li> Use "hydrateState()" for the initial load of the store. If it exists (your storage), lets hydrate the state, otherwise give initial state (which should be your default. I have it here in the initial store file. You will also have that varialble in each of your reducer files. Just being clear.
</ul>
<pre><code>
import { createStore,
         applyMiddleware } from 'redux'
import logger              from 'redux-logger'
import thunk               from 'redux-thunk'
import smoothStorage       from 'redux-smooth-storage'

// All reducers
import rootReducer         from '../reducers'

import { STORAGE_NAME,
         STORAGE_TYPE }    from '../constants/global'

const storage = smoothStorage(STORAGE_NAME, STORAGE_TYPE)
const initialState = {}
// destructure here
const {  watch,
         hydrateState
      } = storage

const middleware = process.env.NODE_ENV === 'production' ?
    [watch, thunk] :
    [watch, logger(), thunk ]


const store = applyMiddleware(...middleware)(createStore)(rootReducer, hydrateState() || initialState )

export default store
</code></pre>

## Tests
TODO: this is immensely important, but I just didn't have the time to implement atm.
I will revisit shortly.

## License
MIT

--------------------------------------------------------------------------------------------
## Methods

## watch
   This is the method in the middleware creation. It grabs the current state, stringifies it, and puts it into storage.
   
## hydrateState
   We try to retrieve the storage. If not there, return false. We should use initialState.

## delete
   Standard way to programmatically delete the storage, for whatever reason you may have - within your app. Perhaps on page exit, or onunload -  you can delete it.
   
--------------------------------------------------------------------------------------------
## How to use?
  In the example above, I have constants from another file, BUT - you do not have to. You can just pass
  in the string names etc.. right there, like so
  
<pre><code>
If you do not pass a second arg, it will default to: localStorage
  const storage = smoothStorage("mySmoothStorage")

If you want sessionStorage, passs it in like so:
  const storage = smoothStorage("mySmoothStorage", "sessionStorage")
  
You can pass in "localStorage", you just don't have to:
  const storage = smoothStorage("mySmoothStorage", "localStorage")
</code></pre>

I then destructure -> ES6, and pluck off the method and use that. But you can, of course, use the obj.methodName reference too:

 -> so, watch, goes in your middleware array, like so, if destructuring

<pre><code>
const {  watch,
         hydrateState
      } = storage
      
const middleware = process.env.NODE_ENV === 'production' ?
    [watch, thunk] :
    [watch, logger(), thunk ]      
  </code></pre>

 or, if you didn't destruct, you'd use:
 <pre><code>

 const middleware = process.env.NODE_ENV === 'production' ?
    [storage.watch, thunk] :
    [storage.watch, logger(), thunk ]
 </code></pre>

please note: I am using "thunk, logger()", for example purposes only as "other" middleware. Your own app will have others.

#TODO:
  Run storage on promises, for situations in where larger datasets are used.


    

