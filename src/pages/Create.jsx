import { useDispatch, useSelector } from 'react-redux';
import UserProfile from '../components/create/UserProfile.jsx'
import { useEffect, useState } from 'react';
import Contact from '../components/create/Contact.jsx';
import Employement from '../components/create/Employment.jsx';
import Financial from '../components/create/Financial.jsx';
import Preferences from '../components/create/Preferences.jsx';
import Summary from '../components/create/Summary.jsx';
import StepProgress from './../components/shareable/StepProgress.jsx';


function Create() {
  const currentStep = useSelector((state) => state.form.step);
  
  const currentComponent = () => {
    switch (currentStep) {
      case 1:
        return <UserProfile />
      case 2:
        return <Contact />
      case 3:
        return <Employement />
      case 4:
        return <Financial />
      case 5:
        return <Preferences />
      case 6:
        return <Summary />
      default:
        return <UserProfile />
    }

  }
  return (
    <div className=' h-[100vh] w-[90vw] mx-auto flex flex-col items-center justify-center'>
      <StepProgress currentStep={currentStep} />
      <div className='md:w-[50vw] w-[80vw] h-[80vh] mx-auto p-4 bg-gray-100 rounded-2xl overflow-y-auto shadow'>
        {
          currentComponent()
        }
      </div>
    </div>
  )
}

export default Create
