
const fetchData = async (route: string) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('atoken');

    try {
        const res = await fetch(`${apiUrl}/${route}`, {
            method: 'GET',
            headers: {
                'Authorization': token ? token : '',
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    } catch(e) {
        console.log('Fetch Error')
    }

}

export default fetchData