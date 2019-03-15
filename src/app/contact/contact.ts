export interface Contact {
    id: string;
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
