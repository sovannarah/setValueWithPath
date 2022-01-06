export function changeValueWithPathName(data, path, value, currentIndexPath = 0, prevIndex = 0) {
    const arrPath = path.split('.');
    let searchKey = arrPath[currentIndexPath];
    const strIndexArray = searchKey.match(/([[])\w+(])/g);
    let index;
    if (strIndexArray) {
        const extractIndex = strIndexArray[0].match(/([0-9])/g);
        index = extractIndex ? parseInt(extractIndex[0]) : 0;
        searchKey = searchKey.replace(/([[])\w+(])/g, '');
    }
    if (currentIndexPath === arrPath.length - 1) {
        if (Array.isArray(data) && typeof data[prevIndex] === 'object') {
            return [...data.map((d, index) => {
                if(index === prevIndex) {
                    return {...d, [searchKey]: value};
                } else {
                    return d;
                }
            })]
        } else if (Array.isArray(data) && typeof data[prevIndex] !== 'object') {
            return [...data.map((d, index) => {
                if (index === prevIndex) {
                    return value;
                } else {
                    return d;
                }
            })]
        } else if (!Array.isArray(data) && typeof data === 'object') {
            return {...data, [searchKey]: value};
        } else {
            return data;
        }
    }
    if (Array.isArray(data)) {
        return data.map((d, i) => {
            if (i === prevIndex) {
                return {
                    ...d, [searchKey]: changeValueWithPathName(d[searchKey], path, value, currentIndexPath + 1, index)
                }
            } else {
                return d;
            }
        })
    } else {
        return {
            ...data, [searchKey]: changeValueWithPathName(data[searchKey], path, value, currentIndexPath + 1, index)
        }
    }
}


