import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";

const ContactPage = () => {
  return (
    <>
      <Header pageTitle="Contactez-nous" backLink="/" />
      <main className="flex flex-col px-5 py-6 max-w-screen-xl mx-auto gap-3 min-h-[60vh]">
        <h1 className="mb-4">Contactez-nous</h1>
        <p className="mb-2">
          Vous avez une question, une suggestion ou besoin d’aide ? N’hésitez
          pas à nous contacter, nous sommes là pour vous aider !
        </p>
        <p className="mb-2">Voici comment vous pouvez nous joindre :</p>
        <ul className="list-disc pl-6 mb-2">
          <li>
            <strong>Email :</strong>{" "}
            <a
              href="mailto:app.travel2gether@gmail.com"
              className="text-blue underline"
            >
              app.travel2gether@gmail.com
            </a>
          </li>
          <li>
            <strong>Téléphone :</strong> +33 1 23 45 67 89
          </li>
          <li>
            <strong>Adresse :</strong> 123 Rue des Voyageurs, 75000 Paris,
            France
          </li>
        </ul>
        <p className="mt-8">
          Nous ferons de notre mieux pour vous répondre dans les plus brefs
          délais. Merci de votre confiance !
        </p>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
