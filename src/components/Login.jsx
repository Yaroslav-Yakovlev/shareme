import React, { useEffect } from 'react';
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'

import { client } from "../client";

const Login = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const initClient = () => {
            gapi.auth2.init({
                clientId: `${process.env.REACT_APP_GOOGLE_TOKEN}`,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    }, []);

    const responseGoogle = (response) => {
        localStorage.setItem('user', JSON.stringify(response.profileObj));

        const {name, googleId, imageUrl} = response.profileObj

        const doc = {
            _id: googleId,
            _type: 'user',
            userName: name,
            image: imageUrl,
        }
        client.createIfNotExists(doc).then(() => {
            navigate('/', {replace: true});
        });

    }

    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className=" relative w-full h-full">
                <video
                    src={shareVideo}
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                />

                <div
                    className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src={logo} width="130px" alt='logo-image'/>
                    </div>
                    <div className="shadow-2xl">
                        <GoogleLogin
                            clientId={`${process.env.REACT_APP_GOOGLE_TOKEN}`}
                            buttonText="Sign in with Google"
                            onSuccess={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;