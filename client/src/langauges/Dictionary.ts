interface ILangProps {
  [key: string]: string
}

interface ILang {
  [key: string]: ILangProps;
}

export const Lang : ILang  = {

  //Menu items
  mainPage: {
    cz: "Hlavní menu",
    en: "Main menu",
  },
  about: {
    cz: "O nás",
    en: "About",
  },

  //Register Component translations
  register: {
    cz: "Registrace",
    en: "Registration",
  },
  name: {
    cz: "Jméno",
    en: "Name",
  },
  surname: {
    cz: "Přijmení",
    en: "Surname",
  },
  form: {
    cz: "Forma studia",
    en: "Study form",
  },
  formValuesDaily: {
    cz: "Denní",
    en: "Daily",
  },
  formValuesDistant: {
    cz: "Dálková",
    en: "Distant",
  },
  level: {
    cz: "Úroveň",
    en: "Level",
  },
  submitBtnRegister: {
    cz: "Zaregistrovat se",
    en: "Register",
  },
  usernameRegister: {
    cz: "Uživatelské jméno",
    en: "User name",
  },
  emailRegister: {
    cz: "Registrační email",
    en: "Register email",
  },
  passwordRegister: {
    cz: "Heslo",
    en: "Password",
  },
  passwordConfirmRegister: {
    cz: "Potvrzení hesla",
    en: "Confirm your password",
  },
  prefferdLanguage: {
    cz: "Preferovaný Jazyk",
    en: "Preffered Language",
  },

  //login
  login: {
    cz: "Přihlášení",
    en: "Log In",
  },
  emailLogin: {
    cz: "Přihlašovací email",
    en: "Email address",
  },
  passwordLogin: {
    cz: "Heslo",
    en: "Password",
  },
  submitBtnLogin: {
    cz: "Přihlásit se",
    en: "Sign in",
  },
  registrationText: {
    cz: "Nemáte ještě účet? Zaregistrujte se: ",
    en: "You dont have an account yet? Register:",
  },
  registration: {
    cz: "ZDE",
    en: "HERE",
  },
  credits: {
    cz: "Aplikaci SubjectMan, na které se momentálně nacházíte vytvořil tým: Alan Kováč, Jan Vojáček, Jaroslav Huss a Jiří Hejtmánek.",
    en: "The application on which you are currently using was made by the team of: Alan Kováč, Jan Vojáček, Jaroslav Huss and Jiří Hejtmánek.",
  }
};
