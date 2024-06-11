import bannerBg from '../../../assets/banner-bg.jpg';

const Banner = () => {
    return (
        <div>
            <div className="hero min-h-screen rounded-xl" style={{ backgroundImage: `url(${bannerBg})` }}>
                <div className="hero-overlay bg-opacity-30 rounded-xl"></div>
                <div className="hero-content">
                    <div className="text-center">
                        <h1 className='text-6xl font-bold max-w-3xl mb-4'>Create Powerful Surveys with Ease</h1>
                        <p className="mb-5 text-base">Engage your audience, gather insights, and make informed decisions.</p>
                        <button className='btn btn-primary' useRef="#Surveys">Explore Surveys</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Banner;