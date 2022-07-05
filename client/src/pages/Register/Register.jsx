import { useState, useRef } from "react";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        passwrd: ''
    });
    
     const usernameRef = useRef();
     const emailRef = useRef();
     const passwordRef = useRef();

     const handleSubmit = (e) => {
        e.preventDefault();

        setFormData({
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        })
     };

    return ( 
        <div className="Register">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username"
                    name="username"
                    required={true}
                    ref={usernameRef}
                />
                <input 
                    type="email" 
                    placeholder="Email"
                    name="email"
                    required={true}
                    ref={emailRef}

                />
                <input 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    required={true}
                    ref={passwordRef}

                />
                <input type="submit" value="Register"/>
            </form>

        </div>
     );
}
 
export default Register;