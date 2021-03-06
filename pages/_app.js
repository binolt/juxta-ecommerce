import App from 'next/app';
import Layout from '../components/layout';
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext';
import '../styles/styles.scss';

class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props;
    return (
      <AuthContext>
        <CartContext>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartContext>
      </AuthContext>
    )
  }
}

export default MyApp;
