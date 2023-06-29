import React, { useEffect, useState } from 'react';
import { XYPlot, VerticalBarSeries, XAxis, YAxis } from 'react-vis';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const ProductChart: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products')
      .then(response => {
        setData(response.data.products);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const generateChartData = (products: Product[]) => {
    const countMap: { [key: string]: number } = {};

    products.forEach(product => {
      const category = product.category;
      countMap[category] = countMap[category] ? countMap[category] + 1 : 1;
    });

    const labels = Object.keys(countMap);
    const counts = labels.map(category => countMap[category]);

    return { labels, counts };
  };

  const { labels, counts } = generateChartData(data);

  return (
    <div>
      <h2 className='heading text-4xl font-bold text-gray-80'>Product Count Chart</h2>
      {labels.length > 0 && counts.length > 0 ? (
        <XYPlot width={700} height={300} xType="ordinal">
          <VerticalBarSeries data={labels.map((label, index) => ({ x: label, y: counts[index] }))} barWidth={0.5} />
          <XAxis />
          <YAxis />
        </XYPlot>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default ProductChart;
