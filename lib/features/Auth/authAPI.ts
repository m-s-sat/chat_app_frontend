interface createUserResponse{
    id:string,
    username:string
}
export function createUser(userData:{phoneNumber:Number,username:string,password:string}):Promise<{data:createUserResponse}>{
    return new Promise(async(resolve,reject)=>{
        const response = await fetch('/api/auth/signup',{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(userData),
        })
        if(!response.ok) reject(new Error("Unable to create account"));
        const data = await response.json();
        resolve({data:data});
    })
}

export function loginUser(userData:{username:string,password:string}):Promise<{data:createUserResponse}>{
    return new Promise(async(resolve,reject)=>{
        const response = await fetch('/api/auth/signin',{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(userData),
        })
        if(!response.ok) reject(new Error("Invalid credentials"));
        const data = await response.json();
        resolve({data});
    })
}

export function checkUser():Promise<{data:createUserResponse}>{
    return new Promise(async(resolve,reject)=>{
        const response = await fetch('/api/auth/check');
        if(!response.ok) reject(new Error("Unauthorized"));
        const data = await response.json();
        resolve({data})
    })
}