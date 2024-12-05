import { conversationList } from "../../data/conversationList";
//import { ChatComponentInterface } from "../../interfaces/Message";
import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import ChatComponent from "../../components/UI/ChatComponent";
//import { ProfileInterface } from "../../interfaces/Profile";

function MessagePage() {
  return (
    <>
      <Header pageTitle="Mes messages" backLink="/" />
      <main className="flex flex-col px-5 gap-6 py-6 max-w-screen-xl mx-auto lg:gap-12">
        {conversationList.map((chat) => (
          <ChatComponent
            key={
              chat.user_receiver_id
                ? chat.user_receiver_id
                : chat.group_receiver_id
            }
            chat={chat}
          />
        ))}
      </main>
      <Footer />
    </>
  );
}

export default MessagePage;
