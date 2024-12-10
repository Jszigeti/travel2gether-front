//import { MessageInterface } from "../../interfaces/Message";
import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import MessageComponent from "../../components/UI/MessageComponent";
import { chatList } from "../../data/messageList";
import MessageBarForm from "../../components/form/MessageBarForm";

function MessagePage() {
  return (
    <>
      <Header pageTitle="Mes messages" backLink="/" />
      <main className="flex flex-col px-5 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        {chatList.map((messages) => (
          <MessageComponent key={messages.id} message={messages.content} />
        ))}
        <MessageBarForm />
      </main>
      <Footer />
    </>
  );
}

export default MessagePage;
