import ContactForm from "../components/ContactComponents/ContactForm";
import ContactList from "../components/ContactComponents/ContactList";
import "../styles/App.css";
import "../styles/Contacts.css";

function Contacts() {
  return (
    <div className="Contacts">
      <main>
        <section className="contact_form">
          <ContactForm />
          <ContactList />
        </section>
        <br />
        <br />
      </main>
    </div>
  );
}

export default Contacts;
