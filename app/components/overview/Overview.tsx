import React, { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Box, TextField } from '@mui/material';
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

    const [data, setData] = useState<Item[]>([])
    const [filterValue, setFilterValue] = useState<string>('')
    const [filteredData, setFilteredData] = useState<Item[]>([])


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

    useEffect(() => {
        const filteredTableData = () => {
            let filtered: any[];
            filtered = data.filter(item => item.title.toLowerCase().includes(filterValue.toLowerCase())
            );
            setFilteredData(filtered)
        }
        filteredTableData();
    }, [filterValue, data])


    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(event.target.value)
    }


    return (
        <>
            <div className="flex justify-between items-center px-4">
                <h1 className="text-2xl font-bold">Overview</h1>
                <input
                    type="text"
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Search your product here"
                    value={filterValue}
                    onChange={handleFilterChange}
                />

            </div>

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
                            (filterValue ? filteredData : data).map(item => (

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
                            ))
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >

        </>

    )
}


export default Overview