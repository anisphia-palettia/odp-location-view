export async function getFetcher<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
}

export async function postData<T>(
    url: string,
    {arg}: { arg: any }
): Promise<T> {
    const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(arg),
    });

    if (!res.ok) throw new Error('Failed to send data');
    return res.json();
}
