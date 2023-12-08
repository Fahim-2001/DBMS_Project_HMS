import Catalogue from '@/app/FRONTEND/HomePageComponents/CatalogueForHome/Catalogue'
import { ChooseUsMessage } from './FRONTEND/HomePageComponents/ChooseUsMessage/ChooseUsMessage';
import { OurLatestTechnologies } from './FRONTEND/HomePageComponents/OurLatestTechnologies/OurLatestTechnologies';
import { GetInTouch } from './FRONTEND/HomePageComponents/GetInTouch/GetInTouch';
import ReviewSection from './FRONTEND/HomePageComponents/ReviewSection/ReviewSection';
export default function Home() {
  
  return (
    <main>
      <Catalogue></Catalogue>
      <ChooseUsMessage></ChooseUsMessage>
      <OurLatestTechnologies></OurLatestTechnologies>
      <GetInTouch></GetInTouch>
      <ReviewSection/>
    </main>
  );
}
