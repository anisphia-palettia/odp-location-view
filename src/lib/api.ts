export async function getData<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
}

export async function postData<T>(url: string, {arg}: { arg: any }): Promise<T> {
    const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(arg),
    });
    if (!res.ok) throw new Error('Failed to send data');
    return res.json();
}


export async function putData<T>(url: string, {arg}: { arg: any }): Promise<T> {
    const res = await fetch(url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(arg),
    });
    if (!res.ok) throw new Error('Failed to update data');
    return res.json();
}

export async function deleteData<T>(url: string): Promise<T> {
    const res = await fetch(url, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete data');
    return res.json();
}