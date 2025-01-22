import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Header pageTitle="Confidentialité" backLink="/" />
      <main className="flex flex-col px-5 py-6 max-w-screen-xl mx-auto gap-3 min-h-[60vh]">
        <h1 className="mb-4">Politique de Confidentialité</h1>
        <p className="mb-2">
          Cette application respecte votre vie privée. Nous collectons
          uniquement les informations strictement nécessaires au fonctionnement
          de l'application. Toutes les données collectées sont stockées de
          manière sécurisée, ne sont jamais utilisées à des fins marketing et ne
          sont ni partagées, ni revendues à des tiers.
        </p>
        <p className="mb-2">
          Nous utilisons uniquement des cookies essentiels pour garantir le bon
          fonctionnement de l'application. Ces cookies sont nécessaires à
          l'authentification sécurisée et à la protection de votre compte contre
          les accès non autorisés. Ces cookies ne collectent aucune information
          personnelle à des fins marketing et ne sont jamais partagés avec des
          tiers.
        </p>
        <p className="mb-2">
          Si vous avez des questions, vous pouvez nous contacter à :{" "}
          <a
            href="mailto:app.travel2gether@gmail.com"
            className="text-blue underline"
          >
            app.travel2gether@gmail.com
          </a>
        </p>
        <p className="mt-8">Merci d'utiliser notre application !</p>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
