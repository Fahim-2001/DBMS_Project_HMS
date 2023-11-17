import React from 'react'
import styles from './LatestTechnologies.module.css'

export const OurLatestTechnologies = () => {
    const images =[
        {
            id:1,
            src:"https://www.fsh.health.wa.gov.au/~/media/Images/Hospitals/FSH/News-pictures/Siemens-Artis-Zeego-at-FSH.jpg?h=250&mh=250&mw=400&w=383&hash=1F5142EE3F8814549DA7C085B4BC3A69",
            altMsg:"Operation Equipment",
            tooltip:"Operation Equipment",
        },
        {
            id:2,
            src:"https://bloximages.chicago2.vip.townnews.com/stcatharinesstandard.ca/content/tncms/assets/v3/editorial/5/85/585f2d5a-2f01-5ae3-b574-dff3787480ee/63d9f3d003e7d.image.jpg?resize=1200%2C800",
            altMsg:"MRI equipment",
            tooltip:"MRI equipment",
        },
        {
            id:3,
            src:"https://img.freepik.com/premium-photo/equipment-roentgen-modern-clinic-remote-controlled-xray-machine-modern-clinic-focus-part-roentgen-apparatus_116317-11917.jpg",
            altMsg:"X-Ray Equipment",
            tooltip:"X-Ray Equipment",
        },
        {
            id:4,
            src:"https://www.ipn.md/storage/ckfinder/images/cover_images/2023_08_16/1098872__64dc9f875c60c.png",
            altMsg:"Ultrasonography Equipment",
            tooltip:"Ultrasonography Equipment",
        }
    ]
  return (
    <section>
        <div>
          <h1 className='text-center text-3xl lg:text-4xl text-primary font-bold px-2 py-3 my-2 drop-shadow-md'>Our Latest Technologies</h1>
        </div>
        <div className='mx-[10%] lg:mx-0  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center'>
            {
                images.map(img =>(
                    <img src={img.src} alt={img.altMsg} key={img.id} className='px-1 my-3 w-96 h-72 '/>
                ))
            }
        </div>
    </section>
  )
}
