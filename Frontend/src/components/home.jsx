import React, { useState, useRef } from 'react';
import './home.css';
import Logo from '../assets/logo2.png';
import 'react-toastify/dist/ReactToastify.css';
import UploadBox from './uploadbox';
import { Animation } from 'rsuite';
const Home = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleDialogOpen = () => {
    setIsOpen(true);
  };
  return (

    <div className="body scroll-smooth">
      <header className="fixed flex w-full text-gray-600 body-font z-[2000] space-between">
        <nav className="navbar px-4">
          <a onClick={() => scrollToSection('s1')} className="cursor-pointer navbar-logo flex items-center font-medium ">
            <img className="logo" src={Logo} alt="Logo" />
            <span className="logo-text mr-6 text-4xl font-bold">MOM.AI</span>
          </a>
          <div className="navbar-options">
            <a onClick={() => scrollToSection('s2')}
              className="appearance-none transition group inline-grid grid-flow-col p-3 justify-center items-center rounded-full  font-medium hover:bg-white cursor-pointer text-neutral-1000  xl:gap-2">
              Products
            </a>
            <a onClick={() => scrollToSection('s3')}
              className="appearance-none transition group inline-grid grid-flow-col p-3 justify-center items-center rounded-full  font-medium hover:bg-white cursor-pointer text-neutral-1000  xl:gap-2">
              Products
            </a>
            <a onClick={() => scrollToSection('s4')}
              className="appearance-none transition group inline-grid grid-flow-col p-3 justify-center items-center rounded-full  font-medium hover:bg-white cursor-pointer text-neutral-1000  xl:gap-2">
              Products
            </a>
          </div>
          <UploadBox isOpen={isOpen} onClose={() => setIsOpen(false)} />
          <button onClick={handleDialogOpen}
            className="flex text-white items-center justify-center bg-blue-500 border-0 py-4 px-8 mr-6 focus:outline-none hover:bg-blue-600 rounded-full">
            Upload
            <div className="shadow-neutral-1000/25 -mr-[15px] grid items-center justify-center rounded-full p-1 mx-3 shadow-xl bg-white text-blue-600  rtl:-scale-x-100"
              bis_skin_checked="1">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round"
                strokeLinejoin="round" className="h-[18px] w-[18px]" height="1em" width="1em"
                xmlns="http://www.w3.org/2000/svg">
                <polyline points="16 16 12 12 8 16"></polyline>
                <line x1="12" y1="12" x2="12" y2="21"></line>
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                <polyline points="16 16 12 12 8 16"></polyline>
              </svg>
            </div>
          </button>
        </nav>
      </header>

      <section id='s1' className="text-gray-600 body-font p-16">
        <div className="h-[100vh] container px-5 py-28 mx-auto flex flex-col lg:flex-row items-center justify-center">
          <div className='flex flex-col lg:flex-row items-center justify-center transform scale-100 transition-transform duration-300 ease-in-out hover:scale-110 '>
            <img alt="ecommerce" className="lg:w-1/2 lg:h-auto mb-8 object-cover object-center rounded order-1 lg:order-2" style={{ objectFit: 'contain' }} src="https://cdn-site-assets.veed.io/cdn-cgi/image/width=1280,quality=75,format=auto/Audio_to_Text_26b67a012c/Audio_to_Text_26b67a012c.png" />
            <div className="flex-column text-center lg:p-12 py-2 lg:w-1/2 lg:pr-10 lg:py-6 mb-6 lg:mb-0 justify-center items-center order-2 lg:order-1">
              <h1 className="text-gray-900 lg:text-5xl text-3xl title-font font-bold">Audio to Text</h1>
              <p className="leading-relaxed mb-4 my-4">Transcribe audio to text automatically, using AI. Over +120 languages supported.</p>
              <UploadBox isOpen={isOpen} onClose={() => setIsOpen(false)} />
              <button onClick={handleDialogOpen} className="flex text-white items-center justify-center bg-blue-500 border-0 py-4 px-12 focus:outline-none hover:bg-blue-600 rounded-full mx-auto">Transcribe your audio to text
                <div className="shadow-neutral-1000/25 -mr-[15px] grid items-center justify-center rounded-full p-3 mx-3 shadow-xl bg-white text-blue-600  rtl:-scale-x-100" bis_skin_checked="1">
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="16 16 12 12 8 16"></polyline>
                    <line x1="12" y1="12" x2="12" y2="21"></line>
                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                    <polyline points="16 16 12 12 8 16"></polyline>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>


      <section id='s2' className="text-gray-600 body-font p-16">
        <div className="container px-5 py-24 mx-auto min:h-[100vh] " bis_skin_checked="1">
          <div className="flex flex-col text-center w-full mb-16" bis_skin_checked="1">
            <h1 className="text-gray-900 text-4xl title-font font-medium mb-4">How to transcribe audio to text:</h1>
          </div>
          <div className="lg:flex flex-wrap -m-4" bis_skin_checked="1">
            <div className="p-4 lg:w-1/3 md:w-1/2 transform scale-100 transition-transform duration-300 ease-in-out hover:scale-110" bis_skin_checked="1">
              <div className="h-full flex flex-col items-center text-center" bis_skin_checked="1">
                <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4 " src="https://cdn-site-assets.veed.io/cdn-cgi/image/width=640,quality=75,format=auto/Upload_or_record_d9784e01b0/Upload_or_record_d9784e01b0.png" />
                <div className="w-full" bis_skin_checked="1">
                  <h2 className="title-font font-bold text-2xl text-gray-900">Upload or record</h2>
                  <p className="mb-4">Upload your audio or video.</p>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/3 md:w-1/2 transform scale-100 transition-transform duration-300 ease-in-out hover:scale-110" bis_skin_checked="1">
              <div className="h-full flex flex-col items-center text-center" bis_skin_checked="1">
                <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src="https://cdn-site-assets.veed.io/cdn-cgi/image/width=640,quality=75,format=auto/Auto_transcribe_and_translate_f9f7a99235/Auto_transcribe_and_translate_f9f7a99235.png" />
                <div className="w-full" bis_skin_checked="1">
                  <h2 className="title-font font-bold text-2xl text-gray-900">Auto-transcribe and translate</h2>
                  <p className="mb-4">Auto-transcribe your video from the Subtitles menu. You can also translate your transcript to over 120 languages. Select a language and translate the transcript instantly.</p>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/3 md:w-1/2 transform scale-100 transition-transform duration-300 ease-in-out hover:scale-110" bis_skin_checked="1">
              <div className="h-full flex flex-col items-center text-center" bis_skin_checked="1">
                <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src="https://cdn-site-assets.veed.io/cdn-cgi/image/width=640,quality=75,format=auto/Review_and_export_39508d3634/Review_and_export_39508d3634.png" />
                <div className="w-full" bis_skin_checked="1">
                  <h2 className="title-font font-bold text-2xl text-gray-900">Review and export</h2>
                  <p className="mb-4">Review and edit the transcription if necessary. Just click on a line of text and start typing. Download your transcript in VTT, SRT, or TXT format.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section id='s3' className="text-gray-600 body-font overflow-hidden p-16">
        <div className="transform scale-100 transition-transform duration-300 ease-in-out hover:scale-110 container px-12 py-28 mx-auto min:h-[100vh] flex flex-col lg:flex-row items-center justify-center">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 order-1 lg:order-0">
            <h1 className="text-gray-900 text-2xl title-font font-bold mb-4">Instant transcription downloads for better documentation</h1>
            <p className="leading-relaxed mb-4 my-8">VEED uses cutting-edge technology to transcribe your audio to text at lightning-fast speed. Download your transcript in one click and keep track of your records better—without paying for expensive transcription services. Get a written copy of your recordings instantly and one proofread for 100% accuracy. Downloading transcriptions is available to premium subscribers. Check our pricing page for more info.</p>
          </div>
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto mb-8 object-cover object-center rounded lg:order-1" style={{ objectFit: 'contain' }} src="https://cdn-site-assets.veed.io/cdn-cgi/image/width=1024,quality=75,format=auto/Instant_transcription_downloads_for_better_documentation_ddcb6e11a1/Instant_transcription_downloads_for_better_documentation_ddcb6e11a1.png" />
        </div>
      </section>
      <section id='s4' className="text-gray-600 body-font overflow-hidden p-16">
        <div className="transform scale-100 transition-transform duration-300 ease-in-out hover:scale-110 container px-12 py-28 mx-auto min:h-[100vh] flex flex-col lg:flex-row items-center justify-center">
          <img alt="ecommerce" className="lg:w-1/2 lg:pr-10 w-full lg:h-auto mb-8 object-cover object-center rounded " style={{ objectFit: 'contain' }} src="https://cdn-site-assets.veed.io/cdn-cgi/image/width=1024,quality=75,format=auto/Convert_audio_to_text_and_create_globally_accessible_content_8373047d0a/Convert_audio_to_text_and_create_globally_accessible_content_8373047d0a.png" />
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h1 className="text-gray-900 text-2xl title-font font-bold mb-4">Instant transcription downloads for better documentation</h1>
            <p className="leading-relaxed mb-4 my-8">VEED uses cutting-edge technology to transcribe your audio to text at lightning-fast speed. Download your transcript in one click and keep track of your records better—without paying for expensive transcription services. Get a written copy of your recordings instantly and one proofread for 100% accuracy. Downloading transcriptions is available to premium subscribers. Check our pricing page for more info.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
