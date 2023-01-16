import ContactForm from '../components/Contacts/ContactForm';
import ContactList from '../components/Contacts/ContactList';
import "../styles/App.css";
import "../styles/Contacts.css"


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