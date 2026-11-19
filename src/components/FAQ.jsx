import { useState } from "react";
import Icon from "./Icon.jsx";
import Reveal from "./Reveal.jsx";

const faqData = [
  {
    q: "Do you deliver across India?",
    a: "Yes, we deliver our cattle feed products across India through our trusted logistics partners.",
  },
  {
    q: "Which feed suits my animal?",
    a: "You can explore our animal-specific feeds for Cattle, Buffalo, Poultry, and Goats, or consult our free veterinary nutritionist helpline for customized ration charts based on your herd's milk yield and lactation stage.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept all major payment methods including Cash on Delivery (COD), UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, and Net Banking.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="faq-section-ref" aria-labelledby="faq-ref-title">
      <Reveal variant="fade-up">
        <div className="faq-header-ref">
          <h2 id="faq-ref-title" className="faq-title-ref">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="faq-sub-ref">
          Quick answers to common queries about our products, delivery and payments.
        </p>
      </Reveal>

      <div className="faq-list-ref">
        {faqData.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <Reveal key={item.q} variant="fade-up" delay={`${idx * 80}ms`}>
              <div className={`faq-item-ref ${isOpen ? "open" : ""}`}>
                <button
                  type="button"
                  className="faq-summary-btn"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <div className="faq-question-left">
                    <span className="faq-chevron" aria-hidden="true">
                      {isOpen ? <Icon name="down" size={15} /> : <Icon name="chevronRight" size={15} />}
                    </span>
                    <span className="faq-q-text">{item.q}</span>
                  </div>
                  {isOpen && <span className="faq-squiggle" aria-hidden="true">~</span>}
                </button>
                {isOpen && (
                  <div className="faq-answer-body">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
