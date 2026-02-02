import React from 'react'
import hero from '../images/heroo.png'
import '../styles/hero.css'
import { Link } from 'react-router-dom'

// ✅ Import chatbot
import WomenSafetyBot from '../Components/WomenSafetyBot'

const Hero = () => {
  return (
    <div>

      {/* 🔴 HERO SECTION (relative) */}
      <section className='banner_wrapper position-relative'>
        <div className='container'>
          <div className='row align-items-center'>

            {/* LEFT IMAGE */}
            <div className='col-md-6 header-img-section position-relative'>
              <img src={hero} alt='Women Safety Hero' />

              {/* 🤖 CHATBOT FLOATING ON HERO IMAGE */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '-20px',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                }}
              >
                <WomenSafetyBot />
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="col-md-6 my-5 my-md-0 text-center text-md-start">
              <p className="banner-subtitle">Your Safety our Priority</p>
              <h1 className="banner-title">
                Help us bring <span>Women Safety</span> to Reality with us
              </h1>
              <div className="learn-more-btn-section">
                <Link
                  to='/emergency'
                  style={{ backgroundColor: "red" }}
                  className="nav-link learn-more-btn btn-header"
                >
                  Emergency
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SHAPE DIVIDER */}
      <div className="custom-shape-divider-bottom-1695048439">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          />
        </svg>
      </div>

    </div>
  )
}

export default Hero