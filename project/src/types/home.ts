export interface Endpoint {
  method: string;
  url: string;
  description: string;
  color: string;
}

export interface PostmanExample {
  method: string;
  url: string;
  body: string;
  description: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface HttpMethod {
  method: string;
  description: string;
  color: string;
}
