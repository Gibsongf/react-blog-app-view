async function setupFetch(url, reqMethod = "get", body) {
    const reqConfig = {
        method: reqMethod,
        headers: {
            "Content-Type": "application/json",
        },
    };
    if (body) {
        reqConfig.body = JSON.stringify(body);
    }
    try {
        const response = await fetch(url, reqConfig);
        console.log(response.status);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
        if (response.status === 401) {
            localStorage.removeItem("token");
            return "Old token";
        }
    } catch (err) {
        throw Error(err);
    }
}
export async function getIndexData() {
    const url = "http://localhost:5000/public";
    const reqConfig = {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await fetch(url, reqConfig);
        console.log(response.status);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
    } catch (err) {
        throw Error(err);
    }
}

export async function getPostDetails(id) {
    const url = `http://localhost:5000/public/post/${id}`;
    const data = await setupFetch(url, "get");
    return data;
}
export async function getAuthorDetails(id) {
    const url = `http://localhost:5000/public/author/${id}`;
    const data = await setupFetch(url, "get");
    return data;
}

export async function newComment(postID, formData) {
    const url = `http://localhost:5000/api/post/${postID}/comment`;
    const data = await setupFetch(url, "post", formData);
    // console.log(data)
    return data;
}
