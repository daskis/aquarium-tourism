import {Navigate, Route, Routes} from 'react-router-dom';
import {App, Landing, Login, Register, User} from '@pages';
import {Navbar} from '@widgets/ui/App';
import {AuthProvider} from "@shared/lib";

export const RouterProvider = () => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Landing/>}/>
                <Route element={<AuthProvider/>} path="app">
                    <Route element={<Navbar/>}>
                        <Route index element={<App/>}/>
                        <Route path="user" element={<User/>}/>
                    </Route>
                </Route>
                <Route path="auth">
                    <Route index element={<Navigate to="/auth/login" replace/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                </Route>
            </Route>
        </Routes>
    );
};
