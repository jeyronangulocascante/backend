export interface IJson {
  [key: string]:
    | string
    | {
        [key: string]: string;
      };
}
