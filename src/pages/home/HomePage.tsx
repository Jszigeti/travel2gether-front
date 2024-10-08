import Header from "../../components/Header";

export default function HomePage() {
  return (
    <>
      <Header />
      <img src="https://images.unsplash.com/photo-1707343848552-893e05dba6ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <main className="flex flex-col px-5 gap-6 py-6">
        <h2>Vos recommandations de groupes</h2>
      </main>
    </>
  );
}
