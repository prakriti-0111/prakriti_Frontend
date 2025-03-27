import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Row, Col } from 'react-bootstrap';
import aboutImage from 'src/assets/images/about.png';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";

const SearchPage = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    
    const handleSearch = () => {
        if(!search)return;
        navigate("/products?search=" + search)
    }
    const handleBack = () => {
        navigate(-1)
    }

    return (
        <>
            <div className='mobile-search-header'>
                <InputGroup className="">
                    <InputGroup.Text id="basic-addon1"><HiArrowNarrowLeft onClick={handleBack} /></InputGroup.Text>
                    <Form.Control
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <InputGroup.Text id="basic-addon2" onClick={handleSearch}><FiSearch /></InputGroup.Text>
                </InputGroup>
            </div>

        </>
    )
}

export default SearchPage