interface ILangProps {
  [key: string]: string;
}

interface ILang {
  [key: string]: ILangProps;
}

export const Lang: ILang = {
  //Menu items
  mainPage: {
    cs: "Hlavní menu",
    en: "Main menu",
  },
  about: {
    cs: "O nás",
    en: "About",
  },

  //Register Component translations
  register: {
    cs: "Registrace",
    en: "Registration",
  },
  name: {
    cs: "Jméno",
    en: "Name",
  },
  surname: {
    cs: "Přijmení",
    en: "Surname",
  },
  form: {
    cz: "Forma",
    en: "Form",
  },
  formValuesDaily: {
    cs: "Denní",
    en: "Daily",
  },
  formValuesDistant: {
    cs: "Dálková",
    en: "Distant",
  },
  level: {
    cs: "Úroveň",
    en: "Level",
  },
  submitBtnRegister: {
    cs: "Zaregistrovat se",
    en: "Register",
  },
  backBtnRegister: {
    cz: "Zpět",
    en: "Back",
  },
  usernameRegister: {
    cs: "Uživatelské jméno",
    en: "User name",
  },
  emailRegister: {
    cs: "Registrační email",
    en: "Register email",
  },
  passwordRegister: {
    cs: "Heslo",
    en: "Password",
  },
  passwordConfirmRegister: {
    cs: "Potvrzení hesla",
    en: "Confirm your password",
  },
  prefferdLanguage: {
    cz: "Jazyk",
    en: "Language",
  },

  //login
  login: {
    cs: "Přihlášení",
    en: "Log In",
  },
  emailLogin: {
    cs: "Přihlašovací email",
    en: "Email address",
  },
  passwordLogin: {
    cs: "Heslo",
    en: "Password",
  },
  submitBtnLogin: {
    cs: "Přihlásit se",
    en: "Sign in",
  },
  registrationText: {
    cs: "Nemáte ještě účet? Zaregistrujte se: ",
    en: "You dont have an account yet? Register:",
  },
  registration: {
    cs: "ZDE",
    en: "HERE",
  },
  credits: {
    cs: "Aplikaci SubjectMan, na které se momentálně nacházíte vytvořil tým: Alan Kováč, Jan Vojáček, Jaroslav Huss a Jiří Hejtmánek.",
    en: "The application on which you are currently using was made by the team of: Alan Kováč, Jan Vojáček, Jaroslav Huss and Jiří Hejtmánek.",
  },

   //App Bar
   btnLogOff: {
    cz: "Odhlásit",
    en: "Log off",
  },
  profileLabel: {
    cz: "Profil",
    en: "Profile",
  },
  profileName: {
    cz: "Jméno",
    en: "Name",
  },
  profileEmail: {
    cz: "Email",
    en: "Email",
  },
  profileForm: {
    cz: "Forma studia",
    en: "Study form",
  },
  profileLevel: {
    cz: "Úroveň",
    en: "Level",
  },
  profileLanguage: {
    cz: "Jazyk",
    en: "Language",
  },
};
