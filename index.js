/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (arrParams = [], arrData = []) => {
    // failover: if the arrParams does not exist,  return arrData;
    if (arrParams.length === 0) {
        return arrData;
    }
    /**
     * use the `in` operator，if the key of arrParams exist in array's object
     * then delete this key
     */
    arrParams.forEach(key => {
        arrData.forEach(value => {
            if (key in value) {
                delete value[key];
            }
        })
    })
    return arrData;
};
exports.excludeByProperty = (key, arrData) => {
    // failover: if the key does not exist,  return arrData;
    if (!key) {
        return arrData;
    }
    // use the `in` operator and filter arrData
    return arrData.filter(item => !(key in item))
};
exports.sumDeep = (arrData) => {
    /**
     * use the map api of the array to traverse  
     * use the reduce of the array to accumulation
     */
    return arrData.map(item => ({
            objects: item.objects.reduce((sum, current) => sum += current.val, 0)
        })
    )
};
exports.applyStatusColor = (objParams, arrData) => {
    const res = [];
    /**
    * use the Object.entries of feature, gain key and value of object
    * when traverse the arrData, if value contains ths status of arrData,
    * then add it to res, and current key is the value of color 
    */
    arrData.forEach(item => {
         Object.entries(objParams).forEach(([key, value]) => {
             if (value.includes(item.status)) {
                 res.push({
                     status: item.status,
                     color: key
                 })
             }
        });
    })
    return res;
};
exports.createGreeting = (cb, greeting) => {
    /**
     * this's just a shorthand way of writing it without the return
     * need to return a function to receive the arguments
     */
    return (name) => cb(greeting, name);
    // return function(name) {
    //     return cb(greeting, name)
    // }
};
exports.setDefaults = (defaultProps = {}) => {
    /**
     * this's just a shorthand way of writing it without the return
     * need to return a function to receive the arguments
     */
    return (params = {}) => ({
        ...defaultProps,
        ...params
    })
    // return (params = {}) => {
    //     return {
    //         ...defaultProps,
    //         ...params
    //     }
    // }
};
exports.fetchUserByNameAndUsersCompany = (name, services) => {
    /**
     * 1.want to get information about a company,  first need the company id
     * 2.want to get information about company id, first get the company id by name
     * 3.so need to get the name information through fetchUsers first
     * 4.but in order to keep the request time to a minimum
     * 5.so by Promise.all send fetchUsers and fetchStatus，they took a total time of 110ms
     * 6.then get the information of the company by the company id
     * 7.finally return a promise
     * 8.so the total work time is 110ms + 50ms = 160ms
     */
    const {fetchStatus, fetchUsers, fetchCompanyById} = services;
    return Promise.all([fetchUsers(), fetchStatus()]).then( async res => {
        const [users, status] = res;
        const user = users.filter(user => user.name === name)[0] || {};
        const company = await fetchCompanyById(user.companyId);
        return Promise.resolve({
            company,
            status,
            user
        })
    }).catch(err => {
        console.error(err);
    }) 
};
