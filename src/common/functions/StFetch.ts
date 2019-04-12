export async function StFetch<T>(url: string): Promise<T> {
    // const baseUrl = "https://sin-iti.github.io/ft_zhnydp_react/public/res_data";
    const baseUrl = "http://127.0.0.1:9000";
    if (url[0] === "/") {
        url = url.slice(1);
    }
    const fullUrl = baseUrl + "/" + url;
    const result = await fetch(fullUrl);
    return result.json();
}
