import React from 'react'

export const ChooseUsMessage = () => {
  return (
    <section className='my-5'>
        <div>
          <h1 className='text-center text-3xl lg:text-4xl text-primary font-bold px-2 py-3 my-2 drop-shadow-md'>Why Choose Us ?</h1>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 mx-[5%] text-center'>
          <div className='my-3 mx-5'>
            <h1 className='text-center text-xl text-primary font-semibold my-2'>We Have Specialized Doctors</h1>
            <p>
            Our core strength is to appoint the best doctor in Bangladesh. You will find certified medical professionals & qualified personnel like medical consultants, nurses and medical technicians. 
            </p>
          </div>
          <div className='my-3 mx-5'>
            <h1 className='text-center text-xl text-primary font-semibold my-2'>We Have best equipments</h1>
            <p>
            To provide you A-one service, we have included most updated equipments. Our motive is to give you a fastest service with 100% accuracy.
            </p>
          </div>
          <div className='my-3 mx-5'>
            <h1 className='text-center text-xl text-primary font-semibold my-2'>Affordability</h1>
            <p>
            We think of every stages of people and that's why we try to serve you with an affordablity of you. ur flexible budget-friendly options will help you to cover the comprehensive treatment plan including health checkup packages. . 
            </p>
          </div>
        </div>
    </section>
  )
}
