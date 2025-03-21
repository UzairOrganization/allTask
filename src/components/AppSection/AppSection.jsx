import React from 'react'

const AppSection = () => {
    return (
        <div className="appBannerParent">

            <div className="appBanner">
                <div className="text-section">
                    <h1>DOWNLOAD THE APP</h1>
                    <p>Alltasko gets your home and office tasks done for less. Request a service through the app without any
                        hassle. It’s quick, convenient, and works on both iOS and Android.</p>
                    <div className="">
                        <a href="/" tabIndex="0"><img className="bn45"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                            alt="bn45" /></a>

                        <a href="/" tabIndex="0"><img className="bn46"
                            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                            alt="bn45" /></a>

                    </div>
                </div>
                <div className="image-section">
                    <img src="assets/images/resource/jpeg-03.png" alt="Alltasko Promo Image" />
                </div>
            </div>
        </div>
    )
}

export default AppSection