import {
  Header,
  ApiInfo,
  EndpointsList,
  PostmanExamples,
  PostmanSteps,
  HttpMethods,
  Footer,
  Paul  
} from '../components/home';
import { endpoints, postmanExamples } from '../data/homeData';

export default function Home() {

  const edad = 10;
  const nombre = 'Juan';

  const isMayorDeEdad = edad >= 18;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <ApiInfo />
        <EndpointsList endpoints={endpoints} />
        <PostmanExamples examples={postmanExamples} />
        <PostmanSteps />
        <HttpMethods />
        <Paul />
        <Footer />
        
      </div>
    </div>
  );
}
