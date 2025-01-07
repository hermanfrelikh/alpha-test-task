import { Product as ProductType } from '../../../types';

interface ProductProps {
  product: ProductType;
}
export default function Product({ product }: ProductProps) {
  return (
    <div>
      <p>{product.title}</p>
      <img src={product.img} height="250px" alt="фото карточки" />
    </div>
  );
}
