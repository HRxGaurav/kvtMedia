import React, { useState, useEffect } from 'react';
import style from './Navbar.module.css';
import walletIcon from '../assets/icon/wallet.svg';
import SelectedWalletIcon from '../assets/icon/selectedWallet.svg';
import homeIcon from '../assets/icon/home.svg';
import selectedHomeIcon from '../assets/icon/selectedHome.svg';
import assetsIcon from '../assets/icon/assets.svg';
import selectedAssetsIcon from '../assets/icon/selectedAssets.svg';
import forwardIcon from '../assets/icon/forward.svg';
import hamburgerIcon from '../assets/icon/hamburger.svg';
import crossIcon from '../assets/icon/cross.svg';
import Home from './Home';
import AnotherPage from './AnotherPage';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Home');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1111);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 1111);
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setMobileMenuOpen(false); 
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={style.container}>
      {!isMobileView ? (
        <div className={`${style.mainDiv} ${menuOpen ? style.open : style.closed}`}>
          <div className={style.collapse} onClick={toggleMenu}>
            <img src={forwardIcon} alt="forwardIcon" className={`${style.forwardIcon} ${menuOpen ? style.rotated : ''}`} />
          </div>
          <div className={style.content}>
            <div className={style.nameDiv}>
              <div className={style.namelogo}>ST</div>
              {menuOpen && <div className={style.name}>ShihaanTech</div>}
            </div>
            <div>
              <div className={style.iconDiv} onClick={() => handleMenuItemClick('Home')}>
                <div><img src={selectedMenuItem === 'Home' ? selectedHomeIcon : homeIcon} alt='homeIcon' className={style.icon} /></div>
                {menuOpen && <div className={selectedMenuItem === 'Home' ? style.selectedNavLabel : style.navLabel}>Home</div>}
              </div>
              <div className={style.iconDiv} onClick={() => handleMenuItemClick('Assets')}>
                <div><img src={selectedMenuItem === 'Assets' ? selectedAssetsIcon : assetsIcon} alt='assetsIcon' className={style.icon} /></div>
                {menuOpen && <div className={selectedMenuItem === 'Assets' ? style.selectedNavLabel : style.navLabel}>Assets</div>}
              </div>
              <div className={style.iconDiv} onClick={() => handleMenuItemClick('Wallet')}>
                <div><img src={selectedMenuItem === 'Wallet' ? SelectedWalletIcon : walletIcon} alt='walletIcon' className={style.icon} /></div>
                {menuOpen && <div className={selectedMenuItem === 'Wallet' ? style.selectedNavLabel : style.navLabel}>Wallet</div>}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={style.mobileNav}>
          <div className={style.hamburger} onClick={toggleMobileMenu}>
            <div className={style.mobileText}>Hello, User 👋</div>
            <div><img src={mobileMenuOpen ? crossIcon : hamburgerIcon} alt="menuIcon" className={style.menuIcon} /></div>
          </div>
          {mobileMenuOpen && (
            <div className={style.dropdownMenu}>
              <div className={style.menuItem} onClick={() => handleMenuItemClick('Home')}>Home</div>
              <div className={style.menuItem} onClick={() => handleMenuItemClick('Assets')}>Assets</div>
              <div className={style.menuItem} onClick={() => handleMenuItemClick('Wallet')}>Wallet</div>
            </div>
          )}
        </div>
      )}
      <div className={style.mainContent}>
        {selectedMenuItem === 'Home' && <Home />}
        {selectedMenuItem === 'Assets' && <AnotherPage text="Assets Page will displayed here !"/>}
        {selectedMenuItem === 'Wallet' && <AnotherPage text="Wallet Page will displayed here !"/>}
      </div>
    </div>
  );
}

export default Navbar;
