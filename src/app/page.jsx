import Catalogue from '@/app/frontend/HomePageComponents/CatalogueForHome/Catalogue'
import { ChooseUsMessage } from './frontend/HomePageComponents/ChooseUsMessage/ChooseUsMessage';
import { OurLatestTechnologies } from './frontend/HomePageComponents/OurLatestTechnologies/OurLatestTechnologies';
import { GetInTouch } from './frontend/HomePageComponents/GetInTouch/GetInTouch';
import ReviewSection from './frontend/HomePageComponents/ReviewSection/ReviewSection';
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
