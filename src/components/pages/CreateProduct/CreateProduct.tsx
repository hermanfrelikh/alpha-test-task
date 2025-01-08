import { useState, ChangeEvent } from 'react';
import styles from './CreateProduct.module.scss';
import Back from '../../ui/Back';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../features/products/productsSlice';
import { Product } from '../../../types';

interface CreateProductProps {}

const CreateProduct: React.FC<CreateProductProps> = () => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setImageError('');
      };
      reader.readAsDataURL(file);
    } else {
      setImageError('Пожалуйста, выберите изображение.');
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
    if (value.length === 0) {
      setTitleError('Название не может быть пустым.');
    } else if (value.length > 50) {
      setTitleError('Название не может превышать 50 символов.');
    } else {
      setTitleError('');
    }
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setDescription(value);
    if (value.length === 0) {
      setDescriptionError('Описание не может быть пустым.');
    } else if (value.length > 200) {
      setDescriptionError('Описание не может превышать 200 символов.');
    } else {
      setDescriptionError('');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let hasErrors = false;

    if (!selectedImage) {
      setImageError('Пожалуйста, загрузите фото.');
      hasErrors = true;
    }

    if (title.length === 0) {
      setTitleError('Название не может быть пустым.');
      hasErrors = true;
    } else if (title.length > 50) {
      setTitleError('Название не может превышать 50 символов.');
      hasErrors = true;
    }

    if (description.length === 0) {
      setDescriptionError('Описание не может быть пустым.');
      hasErrors = true;
    } else if (description.length > 200) {
      setDescriptionError('Описание не может превышать 200 символов.');
      hasErrors = true;
    }

    if (hasErrors) {
      alert('Пожалуйста, исправьте ошибки в форме.');
    } else {
      const newProduct: Product = {
        id: Date.now(),
        title,
        description,
        img: selectedImage!,
        favorites: false,
      };
      dispatch(addProduct(newProduct));
      alert('Карточка создана успешно!');
      setSelectedImage(null);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className={styles.createProduct}>
      <Back />
      <h2 className={styles.createProduct__title}>Создать карточку</h2>
      <form className={styles.createProduct__form} onSubmit={handleSubmit}>
        <label className={styles.createProduct__label} htmlFor="titleInput">
          Название
        </label>
        <input
          className={`${styles.createProduct__titleInput} ${
            titleError ? styles.error : ''
          }`}
          id="titleInput"
          type="text"
          placeholder="Введите название карточки"
          value={title}
          onChange={handleTitleChange}
        />
        {titleError && (
          <p className={styles.createProduct__error}>{titleError}</p>
        )}

        {selectedImage && (
          <div className={styles.createProduct__img}>
            <img
              height="400px"
              width="auto"
              src={selectedImage}
              alt="Preview"
            />
          </div>
        )}

        <label
          className={styles.createProduct__uploadButton}
          htmlFor="fileInput"
        >
          Загрузить фото
        </label>
        <input
          className={styles.createProduct__imgInput}
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imageError && (
          <p className={styles.createProduct__errorImg}>{imageError}</p>
        )}

        <label
          className={styles.createProduct__label}
          htmlFor="descriptionInput"
        >
          Описание
        </label>
        <textarea
          className={`${styles.createProduct__descriptionInput} ${
            descriptionError ? styles.error : ''
          }`}
          id="descriptionInput"
          placeholder="Описание карточки"
          value={description}
          onChange={handleDescriptionChange}
        />
        {descriptionError && (
          <p className={styles.createProduct__error}>{descriptionError}</p>
        )}

        <button className={styles.createProduct__createButton} type="submit">
          Создать
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
