export interface Volume {
  volumeId: string;
  title: string;
  isbn10: string;
  isbn13: string;
  authors: string[];
  categories: string[];
  publishedDate: string;
  language: string
}

export interface LibraryUser{
  login: String;
  password: String;
}

export interface UserToken{
  token: String;
}
