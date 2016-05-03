

module.exports =  (name, type) => {
    const ST = window[type] ? window[type] : window['localStorage']

    return ({
        watch: store => next => action => {
            const result = next(action)

            ST.setItem(name, JSON.stringify(store.getState()))
            return result
    },

    hydrateState: () => {
        const data = ST.getItem(name)
        return data ? JSON.parse(data) : false
    },

    deleteState: () =>  ST.removeItem(name)

})
}
