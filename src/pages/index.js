import Head from "next/head";
import Header from "../component/Header";
import Banner from "../component/Banner";
import ProductFeed from "../component/ProductsFeed";


export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title> Amazon </title>
      </Head>
     
      <Header id="home"/>

      <main className="max-w-screen-2xl mx-auto">
       
          <Banner />

          <ProductFeed products={products} />
          {/* {console.log(products)} */}
      </main>

    <footer>
      <div className="bg-gray-600 h-10 w-full hover:bg-gray-500 cursor-pointer">
        <p className="text-center text-white pt-2" >Back to top</p>
      </div>
      <div className="bg-gray-700 flex space-x-2 px-96 py-10  justify-between" >
          <div >
          <p className='font-extrabold text-gray-100'>Get to Know Us</p>
          <p className=' link text-gray-300'>Amazon</p>
          <p className=' link text-gray-300'>Today's Deals</p>
          <p className=' link text-gray-300 '>Electronics</p>
          <p className=' link text-gray-300 '>Food & Grocery</p>
          </div>

          <div>
          <p className='font-extrabold text-gray-100'>Get to Know Us</p>
          <p className=' link text-gray-300'>Amazon</p>
          <p className=' link text-gray-300'>Today's Deals</p>
          <p className=' link text-gray-300 '>Electronics</p>
          <p className=' link text-gray-300 '>Food & Grocery</p>
          </div>

          <div>
          <p className='font-extrabold text-gray-100'>Get to Know Us</p>
          <p className=' link text-gray-300'>Amazon</p>
          <p className=' link text-gray-300'>Today's Deals</p>
          <p className=' link text-gray-300 '>Electronics</p>
          <p className=' link text-gray-300 '>Food & Grocery</p>
          </div>

          <div>
          <p className='font-extrabold text-gray-100'>Get to Know Us</p>
          <p className=' link text-gray-300'>Amazon</p>
          <p className=' link text-gray-300'>Today's Deals</p>
          <p className=' link text-gray-300 '>Electronics</p>
          <p className=' link text-gray-300 '>Food & Grocery</p>
          </div>
      </div>
    <hr />
  
   <div className="bg-gray-700 px-96 py-10 ">
   <img 
              
              src="https://links.papareact.com/f90"
              alt="Amazon"
              width={80}
              height={40}
              objectFit='contain'
              className='cursor-pointer bg-gray-700 '
            />

              

   </div>
    </footer>
    </div>
  );
}
// GET >> https://fakestoreapi.com/products
export async function getServerSideProps(context) {
  const products = await fetch('https://fakestoreapi.com/products').then(
    (res) => res.json()
  );

return{
  props: {
    products,
  },
 };
}
