function Header() {
  return (
    <div id="home-header-container">
      <img alt="ic_home_top" src={require("../../assets/img/banner.png")} />
      <div className="info-card user-info-card">
        <span>Welcome to EMAS.</span>
      </div>
    </div>
  );
}

export default Header;
