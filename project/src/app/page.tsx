import {
  Header,
  ApiInfo,
  EndpointsList,
  PostmanExamples,
  PostmanSteps,
  HttpMethods,
  Footer
} from '../components/home';
import { endpoints, postmanExamples } from '../data/homeData';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <ApiInfo />
        <EndpointsList endpoints={endpoints} />
        <PostmanExamples examples={postmanExamples} />
        <PostmanSteps />
        <HttpMethods />
        <Footer />
      </div>
    </div>
  );
}
