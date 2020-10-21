import { useState, ChangeEvent, MouseEvent, FormEvent } from 'react';
import styled from 'styled-components';

type CategoryInputProps = {
  visible?: boolean;
};

type Props = {
  categoryList: string[];
  getFormInfo: Function;
};

const CategoryInput = styled.input<CategoryInputProps>`
  transition: all 0.4s;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};
`;

const ProductImage = styled.img`
  width: 200px;
`;

const ProductAdmin = (props: Props) => {
  const [isCategoryInputVisible, setIsCategoryInputVisible] = useState(true);
  const [newProductName, setNewProductName] = useState('');
  const [urlText, setUrlText] = useState<string>('');
  const [imgSrc, setImgSrc] = useState<string>(
    'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg',
  );
  const [price, setPrice] = useState<number>(0);
  const [sizeInputValues, setSizeInputValues] = useState<string[]>(['']);
  const [category, setCategory] = useState('');

  function nameHandler(e: ChangeEvent<HTMLInputElement>) {
    setNewProductName(e.currentTarget.value);
  }

  function setImage(e: MouseEvent) {
    e.preventDefault();
    setImgSrc(urlText);
  }

  function toggleNewCategoryInput(e: ChangeEvent<HTMLSelectElement>) {
    if (e.currentTarget.value === 'Categoria') {
      setCategory('');
      setIsCategoryInputVisible(true);
      return;
    }
    setIsCategoryInputVisible(false);
    setCategory(e.currentTarget.value.toLowerCase());
  }

  function priceHandler(e: ChangeEvent<HTMLInputElement>) {
    setPrice(parseInt(e.currentTarget.value));
  }

  function sizesInputHandler(e: ChangeEvent<HTMLInputElement>, index: number) {
    const inputValuesCopy = sizeInputValues;
    inputValuesCopy[index] = e.currentTarget.value.toUpperCase();
    setSizeInputValues([...inputValuesCopy]);
  }

  function addNewSize(e: MouseEvent) {
    e.preventDefault();
    setSizeInputValues([...sizeInputValues, '']);
  }

  function substractNewSize(e: MouseEvent) {
    e.preventDefault();
    const copySizeInputs = sizeInputValues;
    copySizeInputs.length = copySizeInputs.length - 1;
    setSizeInputValues([...copySizeInputs]);
  }

  function submitHandler(e: FormEvent) {
    e.preventDefault();
    const sizeNonEmptyInputValues = sizeInputValues.filter(
      (value) => value !== '',
    );
    const newProduct = {
      name: newProductName,
      img: imgSrc,
      category,
      price,
      sizeOptions: [...new Set(sizeNonEmptyInputValues)],
    };

    props.getFormInfo(newProduct);
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>
          Nombre:{' '}
          <input type="text" value={newProductName} onChange={nameHandler} />
        </label>
        <br />
        <label>
          URL:
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUrlText(e.currentTarget.value)
            }
            type="text"
            value={urlText}
          />
        </label>
        <div>
          <ProductImage src={imgSrc} alt="imagen de producto" />
          <br /> <br />
        </div>
        <button onClick={setImage}>Vista Previa</button>
        <br />
        <label>
          Precio: $<input type="number" value={price} onChange={priceHandler} />
        </label>
        <br />
        <label>
          Categoria:
          <select
            onChange={toggleNewCategoryInput}
            name="category"
            id="category"
            onBlur={(e) => {}}
          >
            <option value="Categoria">Nueva</option>
            {props.categoryList.map((categoryOpt) => (
              <option key={categoryOpt} value={categoryOpt}>
                {categoryOpt}
              </option>
            ))}
          </select>
          <CategoryInput
            visible={isCategoryInputVisible}
            value={category}
            onChange={(e) =>
              setCategory(
                e.currentTarget.value
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, ''),
              )
            }
            type="text"
          />
        </label>
        <br />
        <label>
          Tallas Disponibles: <br />
          {sizeInputValues.map((num, index) => (
            <input
              key={index}
              name={`input_${num}`}
              type="text"
              value={sizeInputValues[index]}
              onChange={(e) => sizesInputHandler(e, index)}
            />
          ))}
          <button onClick={addNewSize}>+</button>
          <button onClick={substractNewSize}>-</button>
          <button type="submit">submit</button>
        </label>
      </form>
    </div>
  );
};

export default ProductAdmin;
