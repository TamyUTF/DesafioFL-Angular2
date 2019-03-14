export interface Contact {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    isFavorite: boolean;
    info: {
      company: string;
      avatar: string;
      address: string;
      phone: string;
      comments: string;
    };
}
