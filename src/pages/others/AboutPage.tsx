import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";

const AboutPage = () => {
  return (
    <>
      <Header pageTitle="À propos" backLink="/" />
      <main className="flex flex-col px-5 py-6 max-w-screen-xl mx-auto gap-3 min-h-[60vh]">
        <h1 className="mb-4">À propos de Travel2Gether</h1>
        <p className="mb-2">
          Travel2Gether est une application conçue pour connecter les voyageurs
          solitaires ou en petits groupes afin de créer des expériences uniques
          et partagées.
        </p>
        <p className="mb-2">
          Notre mission est de faciliter la planification collaborative,
          l’échange culturel, et de renforcer les liens entre les passionnés de
          voyage du monde entier.
        </p>
        <p className="mb-2">
          Que vous soyez à la recherche d’un compagnon de voyage, de
          recommandations pour votre itinéraire, ou d’un groupe pour partager
          vos aventures, Travel2Gether est là pour vous.
        </p>
        <p className="mt-8">Merci de faire partie de notre communauté !</p>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
