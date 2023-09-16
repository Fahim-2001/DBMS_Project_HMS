import Catalogue from '@/app/HomePageComponents/CatalogueForHome/Catalogue'
import { ChooseUsMessage } from './HomePageComponents/ChooseUsMessage/ChooseUsMessage';
import { OurLatestTechnologies } from './HomePageComponents/OurLatestTechnologies/OurLatestTechnologies';
import { GetInTouch } from './HomePageComponents/GetInTouch/GetInTouch';
export default function Home() {
  
  return (
    <main>
      <Catalogue></Catalogue>
      <ChooseUsMessage></ChooseUsMessage>
      <OurLatestTechnologies></OurLatestTechnologies>
      <GetInTouch></GetInTouch>
    </main>
  );
}
