const fusion = (obj1, obj2) => {
    let newObj = { ...obj1 }
    Object.keys(obj2).forEach((key) => {
        if (newObj[key] != undefined && typeof obj2[key] != undefined && typeof newObj[key] != typeof obj2[key]) {
            newObj[key] = obj2[key]
        } else if (Array.isArray(newObj[key])) {
            newObj[key].push(...obj2[key])
        } else if (typeof newObj[key] == "string") {
            newObj[key] = newObj[key] + " " + obj2[key]
        } else if (typeof newObj[key] == "number") {
            newObj[key] = newObj[key] + obj2[key]
        } else if (typeof newObj[key] == "object") {
            newObj[key] = fusion(newObj[key], obj2[key])
        } else {
            newObj[key] = obj2[key]
        }
    })
    return newObj
}