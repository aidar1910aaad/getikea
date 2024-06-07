import React, { useState } from 'react';
import styles from '../styles/HelpPage.module.css';

const FAQItem: React.FC<{ 
  question: string, 
  answer: string, 
  isOpen: boolean, 
  onClick: () => void 
}> = ({ question, answer, isOpen, onClick }) => (
  <div className={styles.faqItem}>
    <div className={styles.question} onClick={onClick}>
      {question}
    </div>
    <div className={`${styles.answerWrapper} ${isOpen ? styles.open : ''}`}>
      <div className={styles.answer}>
        {isOpen && <div className={styles.verticalLine}></div>}
        <div className={styles.answerText}>{answer}</div>
      </div>
    </div>
  </div>
);

const HelpPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    { question: "Где покупать в Америке?", answer: "Рекомендуем покупать только в проверенных интернет-магазинах, мы следим за отзывами и рейтингами всех магазинов." },
    { question: "Как экономить на покупках?", answer: "На нашем складе в штате Delaware (DE) нет налогов, вы экономите до 9% от стоимости заказа. Используйте кэшбэк сервис и получайте возврат до 15% от стоимости заказа." },
    { question: "Сколько времени займет доставка?", answer: "Время доставки зависит от выбранного вами способа доставки и местоположения. Среднее время доставки составляет от 7 до 14 дней." },
    { question: "Сколько стоит доставка?", answer: "Стоимость доставки зависит от веса и габаритов посылки, а также от выбранного способа доставки." },
    { question: "Что запрещено к пересылке?", answer: "Запрещено пересылать опасные и запрещенные товары, такие как оружие, наркотики, легковоспламеняющиеся вещества и т.д." },
    { question: "Будет ли комиссия банка при оплате?", answer: "Комиссия банка зависит от условий вашего банка. Мы рекомендуем уточнить это у вашего банка перед совершением платежа." }
  ];

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <h1>Помощь</h1>
      <h2>Как работает сервис?</h2>
      <p>Shipper позволяет получать товары, заказанные в интернет-магазинах США. Вам предоставляется личный адрес в Америке, на который вы можете оформлять доставку, а Shipper пришлет вам все ваши покупки.</p>
      <div className={styles.faqSection}>
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HelpPage;
