import { Button } from "antd-mobile";

function Footer() {
  const closeApp = () => {
    window.WindVane.call(
      "WVNavigator",
      "pop",
      {},
      function (e: any) {
        console.log("Close successfully");
      },
      function (e: any) {
        alert("Failed to close");
      }
    );
  };

  return (
    <div id="home-footer-container">
      <Button
        color="warning"
        style={{ width: "96%", marginBottom: "5px" }}
        block
        onClick={closeApp}
      >
        Exit
      </Button>
    </div>
  );
}

export default Footer;
