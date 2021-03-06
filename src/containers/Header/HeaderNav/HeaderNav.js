import React, { useEffect, useRef, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { AiOutlineLogin } from 'react-icons/ai';
import { BsChevronCompactDown } from 'react-icons/bs';
import { IoBagCheckOutline } from 'react-icons/io5';
import { withRouter } from 'react-router-dom';
import { ReactComponent as CartIcon } from '../../../assets/svg/cart-outline.svg';
import { ReactComponent as PersonIcon } from '../../../assets/svg/person-circle-outline.svg';
import styles from './HeaderNav.module.scss';

const HeaderNav = (props) => {
    const {
        userDisplayName,
        showModal,
        isAuthenticated,
        cartItemCount,
        cartShow,
        onToggleCartUI,
        history,
    } = props;
    const navUserRef = useRef(null);
    const navUserMenuRef = useRef(null);
    const navUserMenuToggleRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        // do something when component did mount
        // close user menu dropdown when click outside
        const handleClickOutside = (e) => {
            if (navUserRef.current && !navUserRef.current.contains(e.target)) {
                setShowDropdown(false);
                navUserMenuRef.current.classList.remove(styles.navUser__menuShow);
                navUserMenuToggleRef.current.classList.remove(styles.navUser__dropdownToggle);
            }
        };
        if (showDropdown) {
            window.addEventListener('click', handleClickOutside);
        }

        // cleanup work when component will unmount
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [showDropdown]);

    const navUser = (
        <ul className={styles.navUser__menu} ref={navUserMenuRef}>
            <Dropdown.Item
                className="pointer py-2"
                eventKey="2"
                onClick={() => history.push('./my-orders')}
            >
                <IoBagCheckOutline /> &nbsp; My orders
            </Dropdown.Item>
            <Dropdown.Item className="pointer py-2" onClick={showModal} eventKey="1">
                <AiOutlineLogin /> &nbsp; Logout
            </Dropdown.Item>
        </ul>
    );

    const toggleUserMenu = () => {
        setShowDropdown((show) => !show);
        navUserMenuRef.current.classList.toggle(styles.navUser__menuShow);
        navUserMenuToggleRef.current.classList.toggle(styles.navUser__dropdownToggle);
    };

    const navItems = [
        {
            id: 1,
            icon: <PersonIcon fill="#D60E64" width="32" height="32" />,
            title: isAuthenticated ? (
                <>
                    {userDisplayName}
                    <span className="ml-2" ref={navUserMenuToggleRef}>
                        <BsChevronCompactDown />
                    </span>
                </>
            ) : (
                'Login'
            ),
            classes: `order-1 order-md-2 ${styles.navUser}`,
            dropdown: navUser,
            ref: navUserRef,
            clicked: !isAuthenticated ? showModal : toggleUserMenu,
        },
        {
            id: 'cartToggler',
            icon: <CartIcon width="32" height="32" />,
            classes: `order-3 ${styles.cartIcon}`,
            clicked: () => onToggleCartUI(!cartShow),
            child: (
                <div
                    className={[
                        styles.cartItemCount,
                        cartItemCount && styles.cartItemCountShow,
                    ].join(' ')}
                >
                    {cartItemCount && cartItemCount.toString()}{' '}
                </div>
            ),
        },
    ];

    return navItems.map((el) => (
        <div
            id={el.id}
            className={`d-flex align-items-center pr-sm-4 pr-sm pointer outline-none ${el.classes}`}
            key={el.id}
            onClick={el.clicked}
            role="link"
            tabIndex={0}
            ref={el.ref}
        >
            {el.icon}
            <div className="d-none d-sm-flex align-items-center"> {el.title} </div>
            {el.dropdown}
            {el.child}
        </div>
    ));
};

export default withRouter(HeaderNav);
