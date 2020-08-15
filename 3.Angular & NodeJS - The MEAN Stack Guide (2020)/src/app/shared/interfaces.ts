export interface Post {
  id:        string;
  title:     string;
  content:   string;
  imagePath: string;
  creator:   string;
}

export interface AuthData {
  email:     string;
  password:  string;
}
