interface IImage {
  id: number;
  name: string;
  url: string;
  uploadDate: string;
  metadata: {
    size: string;
    resolution: string;
  };
  categoryId: number;
}
