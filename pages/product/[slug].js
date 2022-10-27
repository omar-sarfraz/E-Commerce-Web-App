import React, { useEffect, useState } from "react";
import Link from "next/link";

import { client, urlFor } from "../../lib/client";
import SingleProduct from "../../components/SingleProduct";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";
import styles from "../../styles/productPage.module.css";
import { addProduct } from "../../redux/slices/cartSlice";
import { setCartOpen } from "../../redux/slices/cartOpen";

export default function ProductDetails({ product, products }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [productToAdd, setProductToAdd] = useState({ ...product, quantity: 1 });

  const dispatch = useDispatch();

  useEffect(() => {
    setProductToAdd({ ...product, quantity: 1 });
  }, [product]);

  const increaseQuantity = () => {
    setProductToAdd((prev) => ({
      ...prev,
      quantity: prev.quantity + 1,
    }));
  };

  const decreaseQuantity = () => {
    setProductToAdd((prev) => ({
      ...prev,
      quantity: prev.quantity - 1,
    }));
  };

  const addProductToCart = () => {
    dispatch(addProduct(productToAdd));
    toast(
      `${productToAdd.quantity} ${
        productToAdd.name || productToAdd.productName
      } added to cart ☑️`
    );
  };

  const buyNow = () => {
    dispatch(addProduct(productToAdd));
    toast(
      `${productToAdd.quantity} ${
        productToAdd.name || productToAdd.productName
      } added to cart ☑️`
    );
    dispatch(setCartOpen(true));
  };

  return (
    <div className={styles.productPageMain}>
      <div className="container">
        <div className={styles.main}>
          <div className={styles.pictureSection}>
            <div>
              <div className={styles.mainImageContainer}>
                <img
                  className={styles.mainImage}
                  src={urlFor(product.image[imageIndex])}
                  alt="Product Image"
                />
              </div>
              <div className={styles.imagesContainer}>
                {product.image.map((url, index) => (
                  <div className={styles.imageContainer} key={index}>
                    <img
                      src={urlFor(url)}
                      alt="Product Image"
                      className={styles.smallImage}
                      onMouseEnter={() => setImageIndex(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.contentSection}>
            <h1 className={styles.name}>
              {product.name || product.productName}
            </h1>
            <h4 className={styles.desc}>
              {product.details || product.description}
            </h4>
            <h2 className={styles.price}>Price: {product.price}$</h2>
            <div className={styles.quantity}>
              <button onClick={decreaseQuantity}>-</button>
              <span>{productToAdd.quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>
            <div className={styles.buttons}>
              <button onClick={addProductToCart} className={styles.cartButton}>
                <a>Add to Cart</a>
              </button>
              <button onClick={buyNow} className={styles.buyButton}>
                <a>Buy Now</a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.recommendation}>
        <h1>You might also like</h1>
        <div className={styles.productsContainer}>
          {products.map((item, index) => (
            <SingleProduct product={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const query = `*[_type in ["product", "banner"]]{
        slug{
            current
        }
    }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const query1 = `*[_type in ["product", "banner"] && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query1);

  return {
    props: { product, products },
  };
};
