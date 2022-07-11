import { useRouter } from 'next/dist/client/router';
import React from 'react'
import Loading from '../layout/Loading';
import useAuth from './AuthHook'


export function withPublic(Component) {
    return function WithPublic(props){
        const auth = useAuth();
        const router = useRouter();
        if(auth.user){
            router.replace('/dashboard');
            return <Loading />
        }
        return <Component auth={auth} {...props} />;
    };
}

export function withProtected(Component) {
    return function WithProtected(props){
        const auth = useAuth();
        const router = useRouter();
        if(!auth.user){
            router.replace('/');
            return <Loading />
        }
        return <Component auth={auth} {...props} />;
    };
}