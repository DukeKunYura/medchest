export function getBackupDataFB(text) {
    return new Promise((resolve, reject) => {
        const newPost = { "content": text };
        const data = sendRequest(
            'POST',
            "https://testone-8ac4d-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
            newPost
        );
        resolve(data)
    })

};