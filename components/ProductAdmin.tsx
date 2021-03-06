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
  const [urlText2, setUrlText2] = useState<string>('');
  const [imgSrc, setImgSrc] = useState<string>(
    'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg',
  );
  const [imgSrc2, setImgSrc2] = useState<string>(
    'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg',
  );
  const [price, setPrice] = useState<number>(0);
  const [sizeInputValues, setSizeInputValues] = useState<string[]>(['']);
  const [colorInputValues, setColorInputValues] = useState<string[]>(['']);
  const [category, setCategory] = useState('');

  function colorInputHandler(e: ChangeEvent<HTMLInputElement>, index: number) {
    const colorStateCopy = [...colorInputValues];
    colorStateCopy[index] = e.currentTarget.value;
    setColorInputValues(colorStateCopy);
  }

  function addNewColor(e: MouseEvent) {
    e.preventDefault();
    setColorInputValues([...colorInputValues, '']);
  }
  function substractNewColor(e: MouseEvent) {
    e.preventDefault();
    const copyColorInputs = colorInputValues;
    copyColorInputs.length = copyColorInputs.length - 1;
    setSizeInputValues([...copyColorInputs]);
  }

  function nameHandler(e: ChangeEvent<HTMLInputElement>) {
    setNewProductName(e.currentTarget.value);
  }

  function setImage(e: MouseEvent) {
    e.preventDefault();
    setImgSrc(urlText);
  }

  function setImage2(e: MouseEvent) {
    e.preventDefault();
    setImgSrc2(urlText2);
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
    const colorNonEmptyInputValues = colorInputValues.filter(
      (value) => value !== '',
    );
    const newProduct = {
      name: newProductName,
      img: imgSrc,
      img2: imgSrc2,
      category,
      price,
      sizeOptions: [...new Set(sizeNonEmptyInputValues)],
      colorOptions: [...new Set(colorNonEmptyInputValues)],
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
          <ProductImage src={imgSrc} alt="imagen 2 de producto" />
          <br /> <br />
        </div>
        <button onClick={setImage}>Vista Previa</button>
        <br />
        <label>
          URL2:
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUrlText2(e.currentTarget.value)
            }
            type="text"
            value={urlText2}
          />
        </label>
        <div>
          <ProductImage src={imgSrc2} alt="imagen de producto" />
          <br /> <br />
        </div>
        <button onClick={setImage2}>Vista Previa</button>
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
          {sizeInputValues.map((sizeString, index) => (
            <input
              key={`${index}_sizeOption`}
              name={`input_${sizeString}`}
              type="text"
              value={sizeString}
              onChange={(e) => sizesInputHandler(e, index)}
            />
          ))}
          <button onClick={addNewSize}>+</button>
          <button onClick={substractNewSize}>-</button>
        </label>
        <label>
          Colores Disponibles: <br />
          {colorInputValues.map((color, index) => (
            <input
              key={`${index}_colorOption`}
              type="color"
              value={color}
              onChange={(e) => colorInputHandler(e, index)}
            />
          ))}
          <button onClick={addNewColor}>+</button>
          <button onClick={substractNewColor}>-</button>
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default ProductAdmin;
