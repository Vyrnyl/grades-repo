

const authenticate = async () =>{

    try {
        const res = await fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: "ashleyshkl@gmail.com",
                password: "ashle15"
            })
        });
        
        const data = await res.json();

        if(!res.ok && res.status === 422) {
            return { validationError: data };
        } else if(!res.ok && data.error) {
            return data;
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