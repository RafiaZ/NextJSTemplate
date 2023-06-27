import React, { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import axios from 'axios';

interface Item {
    id: any
    title: string
    thumbnail: string
    description: string
    price: string
    category: string
    brand: string
    stock: string

}

const Overview = () => {

    const [data, setData] = useState<Item[]>([]);
    useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then(response => {
                setData(response.data.products);
                console.log(response.data, 'the data ')
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <>

            <h1 className="font-bold text-xl uppercase text-center mb-5" > Overview</h1>

            <TableContainer component={Paper} sx={{
                borderRadius: '10px',
                boxShadow: '0 20px 27px 0 rgba(0,0,0,.05)'
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="font-bold text-sm uppercase">ID</TableCell>
                            <TableCell className="font-bold text-sm uppercase">Thumbnail</TableCell>
                            <TableCell className="font-bold text-sm uppercase">Title</TableCell>
                            <TableCell className="font-bold text-sm uppercase">Description</TableCell>
                            <TableCell className="font-bold text-sm uppercase">Price</TableCell>
                            <TableCell className="font-bold text-sm uppercase">Catagory</TableCell>
                            <TableCell className="font-bold text-sm uppercase">Brand</TableCell>
                            <TableCell className="font-bold text-sm uppercase">Stock</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell><img src={item.thumbnail} alt='hjh' height={80} width={80} /></TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>{item.brand}</TableCell>
                                <TableCell>{item.stock}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >

        </>

    )
}


export default Overview