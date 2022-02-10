import {hieuAxios} from '../../config/axios'
const loginApi = {}
loginApi.createNewUser = (input) => {
        fetch('http://localhost:3003/auth/signup',{
            method:"POST",
            body:JSON.stringify(
                {
                   email: input.email,
                   password: input.password,
                   name: input.name,
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res=>{ 
            // if(res.status === 422){\
            //     throw new Error("Validation failed. Make sure the email address isn't used yet");
            // }
            // if(res.status !== 200 && res.status !== 201 ){
            //     throw new Error('Create a user failed')
            // }
            return res.json()
        })
        .then(json=>console.log(json))
}
loginApi.getUsers = async() => {
    try {
        const users = await hieuAxios.get('https://fakestoreapi.com/users')
        return users;
    } catch (error) {
        return error
    }
}
loginApi.loginAcc = async(input) => {
    const result = await fetch('http://localhost:3003/auth/login',{
            method:'POST',
            body: JSON.stringify({
                ...input
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status === 422){
                throw new Error("Validation failed. Make sure the email address isn't used yet");
            }
            if(res.status !== 200 && res.status !== 201 ){
                throw new Error('Create a user failed')
            }
            return res.json()
        })
        .catch(err => { console.log(err) });
    return result;
}
export default loginApi;