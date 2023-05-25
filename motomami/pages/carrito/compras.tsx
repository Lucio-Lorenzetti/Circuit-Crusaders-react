import { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../../componentes/Layout';
import Motos from '../../componentes/Motos';

const Compras: NextPage = () => {
    return (
        <Layout >
            <h1>Motos</h1>
            <Motos />
            
            <h2>
                <Link href="/">Back to home</Link>
            </h2>
        </Layout>)
        
}

export default Compras;