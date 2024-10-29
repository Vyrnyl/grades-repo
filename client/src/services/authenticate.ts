

const authenticate = async (loginInfo: { email: string, password: string}) =>{
    console.log(loginInfo)
    try {
        const res = await fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });
        
        const data = await res.json();

        if(!res.ok && res.status === 422) {
            return { validationError: data };
        } else if(!res.ok && res.status === 404 && data.error) {
            return { error: data.error };
        } else {
            const atoken = res.headers.get('Authorization');
            localStorage.setItem('atoken', atoken ? atoken : '');
            
            return data;
        };

    } catch(error) {
        console.log('Fetch error: ', error);
    }

}

export default authenticate;