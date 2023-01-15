import ContactForm from '../components/ContactComponents/ContactForm';
import ContactList from '../components/ContactComponents/ContactList';
import "../styles/App.css";

function Contacts() {
    return (
      <div className='Contacts'>
        <main>
          <section className='contact_form'>
            <ContactForm />
            <ContactList />
          </section>
        </main>
      </div>
    )
}

export default Contacts;