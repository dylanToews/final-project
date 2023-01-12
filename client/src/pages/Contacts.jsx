import React from 'react';
import ContactForm from '../components/ContactComponents/ContactForm'
import "../App.css";
import ContactList from '../components/ContactComponents/ContactList';

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