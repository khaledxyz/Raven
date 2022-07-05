import { useState, useRef } from "react";

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        passwrd: ''
    });
    
     const usernameRef = useRef();
     const emailRef = useRef();
     const passwordRef = useRef();

     const handleSubmit = (e) => {
        e.preventDefault();

        setFormData({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        })
     };

    return ( 
        <div className="Register">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email"
                    name="email"
                    required="true"
                    ref={emailRef}

                />
                <input 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    required="true"
                    ref={passwordRef}

                />
                <input type="submit" value="Login"/>
            </form>

        </div>
     );
}
 
export default Register;