export interface DietType {
  id: number;
  name: {
    title: string;
    comment: string;
  };
  image: string;
  timeline?: number;
}
