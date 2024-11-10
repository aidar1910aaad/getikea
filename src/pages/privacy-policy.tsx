import React, { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    color: "#2a2a2a",
    backgroundColor: "#fdfdfd",
  },
  header: {
    fontSize: "40px",
    fontWeight: "700",
    marginBottom: "30px",
    color: "#222",
    letterSpacing: "-0.5px",
    textAlign: "center",
    borderBottom: "1px solid #e0e0e0",
    paddingBottom: "20px",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "600",
    marginTop: "40px",
    marginBottom: "10px",
    color: "#333",
    textTransform: "uppercase",
    letterSpacing: "0.75px",
  },
  paragraph: {
    fontSize: "18px",
    lineHeight: "1.7",
    marginBottom: "20px",
    color: "#444",
    letterSpacing: "0.3px",
  },
  list: {
    paddingLeft: "20px",
    fontSize: "18px",
    color: "#444",
    lineHeight: "1.7",
  },
  listItem: {
    marginBottom: "12px",
  },
  highlight: {
    fontWeight: "600",
    color: "#1a1a1a",
  },
};

const PrivacyPolicyPage: React.FC = () => (
  <div style={styles.container}>
    <h1 style={styles.header}>Политика конфиденциальности</h1>

    <h2 style={styles.sectionTitle}>1. Общие положения</h2>
    <p style={styles.paragraph}>
      1.1. Настоящая Политика конфиденциальности — официальный документ сайта{" "}
      <a
        href="https://smartshipping.kz"
        style={{ color: "#0070f3", textDecoration: "none" }}
      >
        https://smartshipping.kz
      </a>{" "}
      (далее — Администрация Сайта), который определяет и регулирует порядок
      работы с информацией о физических и юридических лицах, обращающихся за
      любыми услугами.
    </p>
    <p style={styles.paragraph}>
      1.2. Данная Политика регулирует сбор, хранение, распространение и защиту
      информации о пользователях Сайта, а также основана на законодательстве
      Республики Казахстан.
    </p>
    <p style={styles.paragraph}>
      1.3. Основной целью данной Политики является обеспечение защиты информации
      о пользователях, включая их персональные данные.
    </p>

    <h2 style={styles.sectionTitle}>
      2. Порядок действия Политики и изменения
    </h2>
    <p style={styles.paragraph}>
      2.1. Политика вступает в силу с момента утверждения и действует на
      неограниченный срок. Внесение изменений происходит путем публикации новой
      редакции на Сайте.
    </p>
    <p style={styles.paragraph}>
      2.2. Действующая редакция Политики является публичным документом,
      доступным по ссылке{" "}
      <a
        href="https://smartshipping.kz/user-agreement"
        style={{ color: "#0070f3", textDecoration: "none" }}
      >
        https://smartshipping.kz/user-agreement
      </a>
      .
    </p>

    <h2 style={styles.sectionTitle}>
      3. Условия и цели обработки персональных данных
    </h2>
    <p style={styles.paragraph}>
      3.1. Администрация Сайта обрабатывает персональные данные пользователей
      для исполнения условий Соглашения с пользователями, в том числе для
      предоставления услуг.
    </p>
    <p style={styles.paragraph}>
      3.2. Предоставляя свои данные, Пользователь подтверждает, что обладает
      правами на регистрацию и использование Сайта, а также указывает
      достоверную информацию.
    </p>

    <h2 style={styles.sectionTitle}>4. Состав персональных данных</h2>
    <p style={styles.paragraph}>
      4.1. Персональные данные Пользователей включают:
    </p>
    <ul style={styles.list}>
      <li style={styles.listItem}>
        4.1.1. Уникальный идентификатор — адрес электронной почты;
      </li>
      <li style={styles.listItem}>
        4.1.2. Дополнительные данные: имя, дата рождения, номер мобильного
        телефона, адрес доставки;
      </li>
      <li style={styles.listItem}>
        4.1.3. Документы, удостоверяющие личность, для выполнения обязательств
        Администрацией Сайта.
      </li>
    </ul>
    <p style={styles.paragraph}>
      4.2. Администрация Сайта обрабатывает также иную информацию о
      Пользователях, включая IP-адрес, операционную систему, посещаемые страницы
      и файлы Cookie.
    </p>

    <h2 style={styles.sectionTitle}>5. Обработка информации о пользователях</h2>
    <p style={styles.paragraph}>
      5.1. Обработка данных производится на основе принципов законности,
      добросовестности, и строго в рамках цели, для которой данные собираются.
    </p>
    <p style={styles.paragraph}>
      5.2. Сбор персональных данных осуществляется при регистрации на Сайте.
    </p>

    <h2 style={styles.sectionTitle}>
      6. Меры по защите информации о пользователях
    </h2>
    <p style={styles.paragraph}>
      6.1. Администрация Сайта принимает меры для защиты данных от
      несанкционированного доступа и использования, применяя логин и пароль, а
      также 256-битное шифрование.
    </p>
    <p style={styles.paragraph}>
      6.2. Пользователь обязуется хранить свой логин и пароль в безопасности.
    </p>

    <h2 style={styles.sectionTitle}>7. Ограничение действия Политики</h2>
    <p style={styles.paragraph}>
      7.1. Действие настоящей Политики не распространяется на сторонние ресурсы.
    </p>
    <p style={styles.paragraph}>
      7.2. Администрация Сайта не несет ответственности за действия третьих лиц,
      получивших доступ к информации о Пользователе.
    </p>

    <h2 style={styles.sectionTitle}>8. Обращения пользователей</h2>
    <p style={styles.paragraph}>
      8.1. Пользователи могут направлять запросы о своих персональных данных по
      электронному адресу:{" "}
      <a
        href="mailto:support@smartshipping.kz"
        style={{ color: "#0070f3", textDecoration: "none" }}
      >
        support@smartshipping.kz
      </a>
      .
    </p>
    <p style={styles.paragraph}>
      8.2. Запрос должен содержать информацию для подтверждения личности и
      адрес, использованный для регистрации на Сайте.
    </p>
    <p style={styles.paragraph}>
      Администрация Сайта обязуется рассмотреть и ответить на запрос в течение
      14 дней с момента его получения.
    </p>
  </div>
);

export default PrivacyPolicyPage;
