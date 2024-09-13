import React, { useState, useEffect } from 'react';

const styles = {
  container: {
    padding: '20px',
  },
  faqItem: {
    marginBottom: '10px',
  },
  question: {
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  answerWrapper: {
    overflow: 'hidden',
    transition: 'max-height 0.5s ease',
    maxHeight: '0', // Закрыто по умолчанию
  },
  open: {
    maxHeight: '1000px', // Открыто
  },
  answer: {
    display: 'flex',
    alignItems: 'center',
  },
  verticalLine: {
    width: '2px',
    height: '100%',
    backgroundColor: '#000',
    marginRight: '10px',
  },
  answerText: {
    color: '#000',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  linkHover: {
    textDecoration: 'underline',
  },
};

const FAQItem: React.FC<{ 
  question: string, 
  answer: string, 
  isOpen: boolean, 
  onClick: () => void 
}> = ({ question, answer, isOpen, onClick }) => (
  <div style={styles.faqItem}>
    <div style={styles.question} onClick={onClick}>
      {question}
    </div>
    <div style={{ ...styles.answerWrapper, ...(isOpen ? styles.open : {}) }}>
      <div style={styles.answer}>
        <div style={styles.verticalLine}></div>
        <div 
          style={styles.answerText} 
          dangerouslySetInnerHTML={{ 
            __html: answer.replace(/href="([^"]*)"/g, `href="$1" style="color: inherit; text-decoration: none;"`) 
          }} 
        />
      </div>
    </div>
  </div>
);

const HelpPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [closingIndex, setClosingIndex] = useState<number | null>(null);

  const faqData = [
    { 
      question: "Как работает сервис по покупке?", 
      answer: `
        1. Находите товар в интернет-магазине 
        <a href="https://www.ikea.cn/cn/en/" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none;">ikea.cn/cn/en/</a> и копируете ссылку.<br />
        2. Мы помогаем вам оплатить покупку.<br />
        3. Посылки прибывают в Алматы.<br />
        4. Оплачиваете доставку в Алматы и можете забрать самовывозом.
      `
    },
    { 
      question: "Сколько времени занимает доставка?", 
      answer: "Доставка в Казахстан занимает в среднем 15-20 дней с момента отправки посылки с нашего склада в Китае. Иногда из-за задержки таможни, праздничных дней срок может увеличиться. При любых изменениях сроков мы пришлем уведомление с объяснением причины. Задержки случаются редко, тем не менее мы рекомендуем позаботиться о временном запасе, если нужно получить посылку к определенному дню. Постарайтесь просто сделать заказ немного раньше." 
    },
    { 
      question: "Как мне оплатить доставку?", 
      answer: "Оплатить доставку нужно банковской картой или наличными после прибытия посылки в Казахстан. Обратите внимание, что нам оплачивается доставка посылки от нашего склада в Китае до Казахстана. Если магазин включает в покупку стоимость доставки до нашего склада в Китае, то она оплачивается вами самостоятельно вместе с самим товаром. Доставка внутри Казахстана также оплачивается отдельно местным курьерским службам согласно их тарифам и условиям оплаты." 
    },
    { 
      question: "Как рассчитать стоимость доставки?", 
      answer: "Стоимость доставки из Китая в Казахстан зависит от веса посылки - 5 долларов США за килограмм с округление до 100 грамм. Например, если вес посылки составляет 200 грамм то стоимость посылки составит 1 доллар США. Точную стоимость доставки вы узнаете после прибытия посылки в Казахстан. Рассчитать примерную стоимость можно при помощи калькулятора на сайте. Обратите внимание, что стоимость может быть рассчитана по объемному весу, если он превышает фактический. Объемный вес рассчитывается по формуле: Длина(см)*Ширина(см)*Высота(см)/6000" 
    },
    { 
      question: "Как вернуть приобретенный товар?", 
      answer: "Возврат товара осуществляется на условиях магазина, у которого был приобретен товар. Мы можем помочь с возвратом посылки до момента отправления ее из Китая в Казахстан" 
    },
    { 
      question: "Какие таможенные лимиты?", 
      answer: "При покупке товаров за рубежом, необходимо помнить о таможенной пошлине, которая оплачивается, если стоимость товара превышает 200 евро и составляет 15% от суммы превышения установленного лимита или если вес превышает 31 кг и составляет 2 евро за килограмм веса в части превышения стоимостной и/или весовой норм. К примеру, если товар весит 41 кг и перевес товара будет 10 кг, то размер пошлины будет составлять 20 евро." 
    },
  ];

  useEffect(() => {
    if (closingIndex !== null) {
      const timer = setTimeout(() => {
        setClosingIndex(null);
      }, 10000); // Длительность анимации закрытия должна совпадать со значением в CSS

      return () => clearTimeout(timer);
    }
  }, [closingIndex]);

  const handleClick = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setClosingIndex(openIndex);
      setOpenIndex(index);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Помощь</h1>
      <p style={{ color: '#777' }}>Как покупать с помощью сервиса Smart shipping. Если вы новичок шоппинга, давайте начнем с азов. Как купить в магазине, оформить доставку и отправить покупки.</p>
      <div>
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
