import React, { useContext } from 'react';
import { FcHome, FcList, FcPaid, FcPlus, FcRedo, FcRules, FcSettings } from "react-icons/fc";
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './styles.css';


interface PropsNavbar {
    navigation: 'home' | 'create' | 'list' | 'mylist' | 'users' | 'userAdd' | 'logout';
}



const Navbar: React.FC<PropsNavbar> = ({ navigation }) => {

    const history = useHistory();

    const { handleLogout } = useContext(AuthContext);
    
    function logout(){
        handleLogout()
    }
    
    return (
        <div className="container menu-container">
            <div className="menu" id="menu">

                <div className={navigation === 'home' ? 'item-checked item' : 'item'}
                    onClick={() => history.push('/')}>
                    <FcHome size={35} />
                    <div className="item-title">Home</div>
                </div>

                <div className={navigation === 'create' ? 'item-checked item' : 'item'}
                    onClick={() => history.push('/create-product')}>
                    <FcPlus size={35} />
                    <div className="item-title">Create Product</div>
                </div>

                <div className={navigation === 'list' ? 'item-checked item' : 'item'}
                    onClick={() => history.push('/list-products')}>
                    <FcPaid size={35} />
                    <div className="item-title">Products Mngmt</div>
                </div>

                <div className={navigation === 'mylist' ? 'item-checked item' : 'item'}
                    onClick={() => history.push('/list-my-products')}>
                    <FcList size={35} />
                    <div className="item-title">My Products</div>
                </div>

                <div className={navigation === 'users' ? 'item-checked item' : 'item'}
                    onClick={() => history.push('/users')}>
                    <FcRules size={35} />
                    <div className="item-title">All Users</div>
                </div>

                <div className={navigation === 'userAdd' ? 'item-checked item' : 'item'}
                    onClick={() => history.push('/create-user')}>
                    <FcSettings size={35} />
                    <div className="item-title">Add User</div>
                </div>

                <div className={navigation === 'logout' ? 'item-checked item' : 'item'}
                    onClick={() => logout()}>
                    <FcRedo size={35} />
                    <div className="item-title">Logout</div>
                </div>

                <div className="blob-container">
                    <div className="blob"></div>
                </div>

            </div>
        </div>

    );
}

export default Navbar;