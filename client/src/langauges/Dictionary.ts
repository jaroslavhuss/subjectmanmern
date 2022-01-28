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
    cs: "Forma",
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
    cs: "Zpět",
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
    cs: "Jazyk",
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
    cs: "Odhlásit",
    en: "Log off",
  },
  profileLabel: {
    cs: "Profil",
    en: "Profile",
  },
  profileName: {
    cs: "Jméno",
    en: "Name",
  },
  profileEmail: {
    cs: "Email",
    en: "Email",
  },
  profileForm: {
    cs: "Forma studia",
    en: "Study form",
  },
  profileLevel: {
    cs: "Úroveň",
    en: "Level",
  },
  profileLanguage: {
    cs: "Jazyk",
    en: "Language",
  },

  //dahboard
  dashboardSearchTitle: {
    cs: "Vyhledej předměty",
    en: "Search subjects",
  },
  
  dashboardEnrolledSubjects: {
    cs: "Zapsané předměty",
    en: "Enrolled subjects",
  },
};
