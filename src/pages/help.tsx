import React, { useState, useEffect } from "react";

const styles = {
  container: {
    padding: "20px",
  },
  faqItem: {
    marginBottom: "10px",
  },
  question: {
    fontWeight: "bold",
    cursor: "pointer",
  },
  answerWrapper: {
    overflow: "hidden",
    transition: "max-height 0.5s ease",
    maxHeight: "0", // Закрыто по умолчанию
  },
  open: {
    maxHeight: "1000px", // Открыто
  },
  answer: {
    display: "flex",
    alignItems: "center",
  },
  verticalLine: {
    width: "2px",
    height: "100%",
    backgroundColor: "#000",
    marginRight: "10px",
  },
  answerText: {
    color: "#000",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
  linkHover: {
    textDecoration: "underline",
  },
};

const FAQItem: React.FC<{
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
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
            __html: answer
              .replace(
                /href="([^"]*)"/g,
                `href="$1" style="color: inherit; text-decoration: none;"`
              )
              // Add this line to preserve line breaks and list formatting
              .replace(/\n/g, "<br />"),
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
        <a href="https://www.ikea.cn/cn/en/" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline; text-decoration-color: #FDC503;">ikea.cn/cn/en/</a> и копируете ссылку.<br />
        2. Скачиваете AliPay по инструкции ниже<br />
        3. Мы помогаем оплатить ваш заказ <br/>
        4. Посылки прибывают в Алматы <br />
        5. Оплачиваете доставку в Алматы и можете забрать самовывозом.
      `,
    },
    {
      question: "Инструкция по регистрации Alipay",
      answer: `1. Загрузите приложение Alipay (ссылки Google Play и App Store), указав свой номер телефона, чтобы получить код;
2. Прочтите условия и нажмите кнопку Agree;
3. Введите полученный код в соответствующее поле;
4. Когда приложение откроется, выберите кнопку, которая приведет Вас на Вашу личную страницу в правой части нижней панели;
5. Выберите кнопку Bank Cards;
6. Нажмите кнопку Add Card, чтобы заполнить данные своей банковской карты;
7. Придумайте условный пароль, который в дальнейшем будете использовать для подтверждения покупки;
8. Введите номер Вашей банковской карты;
9. Заполните остальные данные карты, и нажмите кнопку Next Step;
10. Выберите значок настроек в правом верхнем углу личной страницы;
11. Затем нажмите Payment Settings;
12. Далее:Payment Priority Order;
13. Активируйте кнопку Custom payment priorities;
14. В разделе Settings нажмите Security settings;
15. Затем Login Password;
16. Введите код подтверждения, полученный на Ваш номер телефона;
17. Создайте пароль для входа в Alipay;
18. В конце в приложении выберите международную версию пррограммы.
 
Все, Вы уже зарегистрированы!
`,
    },
    {
      question: "Сколько времени занимает доставка?",
      answer:
        "Доставка в Казахстан занимает в среднем 15-20 дней с момента отправки посылки с нашего склада в Китае. Иногда из-за задержки таможни, праздничных дней срок может увеличиться. При любых изменениях сроков мы пришлем уведомление с объяснением причины. Задержки случаются редко, тем не менее мы рекомендуем позаботиться о временном запасе, если нужно получить посылку к определенному дню. Постарайтесь просто сделать заказ немного раньше.",
    },
    {
      question: "Как мне оплатить доставку?",
      answer:
        "Оплатить доставку нужно банковской картой или наличными после прибытия посылки в Казахстан. Обратите внимание, что нам оплачивается доставка посылки от нашего склада в Китае до Казахстана. Если магазин включает в покупку стоимость доставки до нашего склада в Китае, то она оплачивается вами самостоятельно вместе с самим товаром. Доставка внутри Казахстана также оплачивается отдельно местным курьерским службам согласно их тарифам и условиям оплаты.",
    },
    {
      question: "Как вернуть приобретенный товар?",
      answer:
        "Возврат товара осуществляется на условиях магазина, у которого был приобретен товар. Мы можем помочь с возвратом посылки до момента отправления ее из Китая в Казахстан",
    },
    {
      question: "Какие таможенные лимиты?",
      answer:
        "При покупке товаров за рубежом, необходимо помнить о таможенной пошлине, которая оплачивается, если стоимость товара превышает 200 евро и составляет 15% от суммы превышения установленного лимита или если вес превышает 31 кг и составляет 2 евро за килограмм веса в части превышения стоимостной и/или весовой норм. К примеру, если товар весит 41 кг и перевес товара будет 10 кг, то размер пошлины будет составлять 20 евро.",
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
      <p style={{ color: "#777" }}>
        Как покупать с помощью сервиса Smart shipping. Если вы новичок шоппинга,
        давайте начнем с азов. Как купить в магазине, оформить доставку и
        отправить покупки.
      </p>
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
