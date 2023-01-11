/**
 * Отправка CRUD fetch запросов
 */
export default async function sendRequest(method, url, body = null) {

    if (method === 'POST' || method === 'PATCH') { body = JSON.stringify(body) };
    const response = await fetch(url, {
        method: method,
        body: body,
        headers: { 'Content-Type': 'application/json' }
    });
    if (method === 'POST' || method === 'DELETE') {
        const data = await response.json();
        return data
    };

    const data = await response.json();
    if (data !== null) {
        const posts = Object.keys(data).map(key => ({ ...data[key], id: key }));
        return posts
    } else {
        return []
    }


}