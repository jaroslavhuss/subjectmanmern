export interface TopicInterface {
  _id?: string;
  dificulty: number;
  digitalContent: string;
  languages: {
    cs: {
      name: string;
      description: string;
    };
    en: {
      name: string;
      description: string;
    };
  };
}
