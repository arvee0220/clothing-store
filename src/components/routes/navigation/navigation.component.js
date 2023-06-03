import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../../Assets/crown.svg";
import "./navigation.styles.scss";

const Navigation = () => {
    return (
        <>
            <div className="navigation">
                <div className="logo-container" to="/">
                    <Link>
                        <CrwnLogo className="logo" />
                    </Link>
                </div>

                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        SHOP
                    </Link>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;
