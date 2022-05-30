const postData = async (url, data) => { //внутри фун есть асинхр опрерации
        
    let res = await fetch(url, { //булет записыв тут promise каторый вернет серевер Нужно дождатся выполенения запроса
        method: "POST",
        body: data
    });
    return await res.text(); //js ждет выполенеие этой операции
};

const getResource = async (url) => { //внутри фун есть асинхр опрерации
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.text(); 
    //return await res.json(); 
};

export {postData, getResource};