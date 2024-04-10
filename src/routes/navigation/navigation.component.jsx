import { Outlet } from 'react-router-dom1';

const Navigation = () => {
    return (
        <>
            <div className='navigation'>
                <h1>Navigation Bar</h1>
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;
