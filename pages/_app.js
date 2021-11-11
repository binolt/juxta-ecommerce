import App from 'next/app';
import Layout from '../components/layout';
import { AuthContext } from '../context/AuthContext'
import '../styles/styles.scss';

class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props;
    return (
      <AuthContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContext>
    )
  }
}

export default MyApp;
