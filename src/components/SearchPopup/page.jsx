export default function SearchPopup() {
  return(
    <>
    <div id="search-popup" className="search-popup">
<div className="popup-inner">
  <div className="upper-box clearfix">
    <figure className="logo-box pull-left">
      <a href="index.html">
        <img src="assets/images/logoMain.png" alt="" />
      </a>
    </figure>
    <div className="close-search pull-right">
      <span className="far fa-times"></span>
    </div>
  </div>
  <div className="overlay-layer"></div>
  <div className="auto-container">
    <div className="search-form">
      <form method="post" action="index.html">
        <div className="form-group">
          <fieldset>
            <input
              type="search"
              className="form-control"
              name="search-input"
              defaultValue=""
              placeholder="Type your keyword and hit"
              required
            />
            <button type="submit">
              <i className="far fa-search"></i>
            </button>
          </fieldset>
        </div>
      </form>
    </div>
  </div>
</div>
</div></>
  )
}