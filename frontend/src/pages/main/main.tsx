import Navbar from '../../widgets/nav/navbar';
import useLoginStore from '../../shared/store/useLoginStore';
import useUserStore from '../../shared/store/useUserStore';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import main1 from '../../assets/images/main1.png';
import main2 from '../../assets/images/main2.png';
import main3 from '../../assets/images/main3.jpg';
import './main.css';

const Main = () => {
  const loginStore = useLoginStore();
  const userStore = useUserStore();

  const images = [main3, main2, main1];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto px-36">
        <div className="hero min-h-screen bg-base-200 lg:flex lg:flex-row justify-between items-center gap-8 lg:gap-0">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl font-bold text-center">오늘의 코디는?</h1>
            <p className="py-6 flex justify-center">추천 받으세요</p>
          </div>
          <div className="lg:w-1/2">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index} className="image-wrapper">
                  <img src={image} alt={`slide-${index}`} className="img" />
                </div>

              ))}
            </Slider>
          </div>
        </div>

      </div>
    </>
  );
};

export default Main;
