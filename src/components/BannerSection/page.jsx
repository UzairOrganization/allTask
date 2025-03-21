import { IoLocationSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

export default function BannerSection() {
  return (
    <>
      <section className="banner-section p_relative centred">
        <div className="banner-carousel owl-theme owl-carousel owl-dots-none owl-nav-none">
          <div className="slide-item p_relative">
            <div
              // className="bg-layer"
              // style={{
              //   backgroundImage: "url(assets/images/banner/canva1.png)",
              //   objectFit:"contain"
              // }}
            ></div>
           
            <div className="auto-container">
              <div className="content-box p_relative d_block z_5">
                
                <h2 className="p_relative d_block">
                  Alltasko - Trusted Pros 
                  For Every Task.
                </h2>

                <div className="search-container-parent clearfix p_relative d_block z_5">
                  <h3>Get free quotes within minutes</h3>
                  <div class="search-container">
                    <div className="mainBar">
                    <span style={{marginLeft:"8px"}}>
                        <FaSearch size={25}/>
                      </span>
                      <input
                        type="text"
                        placeholder="What Service are you looking for?"
                      />
                    </div>
                    <div className="postalBar">
                      <span style={{marginLeft:"2px"}}>
                        <IoLocationSharp size={25}/>
                      </span>
                      <input type="text" placeholder="Postcode" />
                    </div>
                    <div className="searchBtn">Search</div>
                  </div>
                  <div>
                    Popular: House Cleaning, Plumbing, Personal Trainers
                  </div>
                </div>
                <div class="popular-services"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- banner-section end -->*/}
    </>
  );
}
