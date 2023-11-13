import Catalogue from '@/app/HomePageComponents/CatalogueForHome/Catalogue'
import { ChooseUsMessage } from './HomePageComponents/ChooseUsMessage/ChooseUsMessage';
import { OurLatestTechnologies } from './HomePageComponents/OurLatestTechnologies/OurLatestTechnologies';
import { GetInTouch } from './HomePageComponents/GetInTouch/GetInTouch';
import ReviewSection from './HomePageComponents/ReviewSection/ReviewSection';
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
