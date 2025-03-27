import React, { useState, useEffect } from 'react'
import '../../../App.css'
import ModalVideo from 'react-modal-video'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilterLeft, BsFillPlayFill } from "react-icons/bs";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import sImage from 'src/assets/images/s-product-1.png';
import { BiHeart } from "react-icons/bi";
import withRouter from "helpers/withRouter";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { productList } from "actions/Customer/product.actions";
import { categoryList } from "actions/Customer/categories.actions";
import { AddToCart, CartList } from "actions/Customer/addcart.actions";
import { WishListAdd, WishListData } from "actions/Customer/wishlist.actions"
import { toast } from "react-toastify";
import Loader from '../Loader';

const SearchResult = (props) => {
    const [load, setLoad] = useState(true);
    let params = useParams();
    const navigate = useNavigate();
    const categoriesList = useSelector((state) => state.categories)
    const productList = useSelector((state) => state.product)
    const addCartList = useSelector((state) => state.addCart)
    const whistList = useSelector((state) => state.whistList)
    const [filterProduct, setFilterProduct] = React.useState({
        By_price: "",
        By_type: "",
        By_metal: "",
        popular: "",
        price_low_to_high: "",
        price_high_to_low: ""
    })
    const [productDetail, setProductDetail] = React.useState([])
    const [categoriesDetail, setCategoriesDetail] = React.useState([])
    //const [size,setSize]=React.useState('')
    const [search, setSearch] = React.useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const handleSearch = (e) => {
        const { name, value } = e.target
        setSearch(value)
    }

    const handleFind = () => {

        // const productArray= productList.items?.filter((item)=>(item.name.toLowerCase().includes(search.toLowerCase())))
        // if(productArray?.length>0){
        //     let resUser = productArray?.filter((e) => {
        //         let dataFilter = e.name.toLowerCase()
        //         return dataFilter.indexOf(search.toLowerCase()) !== -1
        //     })
        //     setProductDetail(resUser || resUser || [])
        // } else {
        //     setProductDetail([])
        // }
    }
    // const handleSizeChange = (key, event) => {
    //     setSize(key)
    // }
    const onProductMove = (id) => {
        // navigate(`/product-details/${id}`)
        setLoad(true)
        window.location.href = `/product-details/${id}`
    }
    useEffect(() => {
        if (whistList?.createSuccess) {
            setLoad(true)
            toast.success(whistList?.successMessage)
        }
    }, [whistList?.createSuccess])
    const addWhistList = (val) => {
        let data = {
            product_id: val.id,
            size_id: parseInt(size) || null
        }
        setLoad(false)
        props.actions.WishListAdd(data)
        props.actions.WishListData()

        // navigate(`/wishlist`)
    }
    useEffect(() => {
        if (addCartList?.createSuccess) {
            toast.success(addCartList?.successMessage)
            // props.actions.CartList()
        }
    }, [addCartList?.successMessage])


    const onCart = (val) => {
        const data = {
            product_id: val.id,
            size_id: parseInt(val.size) || 1,
            type: val?.type
        }
        setLoad(false)
        props.actions.AddToCart(data)
    }

    const handleFilter = async (e) => {
        const { name, value } = e.target;
        await setFilterProduct({ ...filterProduct, [name]: value })
        if (name === "By_price") {
            const sorted = productDetail?.slice().sort(function (firstUser, secondUser) {
                if (firstUser.name < secondUser.name) return 1;
                if (firstUser.name > secondUser.name) return -1;
                return 0;
            });
            setProductDetail(sorted)
        }
        if (name === "By_type") {
            const sorted = productDetail?.slice().sort(function (firstUser, secondUser) {
                if (firstUser.name < secondUser.name) return 1;
                if (firstUser.name > secondUser.name) return -1;
                return 0;
            });
            setProductDetail(sorted)
        }
    }

    React.useEffect(() => {
        if (productList?.getItemsSuccess) {
            setProductDetail(productList.items)
        }
    }, [productList])
    const getProductDetail = async () => {
        setLoad(false)
        return props.actions.productList(params.id);
    }

    React.useEffect(() => {
        if (categoriesList?.getItemsSuccess) {
            setCategoriesDetail(categoriesList?.items)
        }
    }, [categoriesList])

    const getCategories = async (id) => {
        setLoad(false)
        return props.actions.categoryList();
    }
    React.useEffect(() => {
        getCategories(parseInt(params.id));
    }, [])

    React.useEffect(() => {
        setLoad(false)
        //props.actions.WishListData()
        getProductDetail()
    }, [categoriesDetail])



    return (
        <>
            {load ? <Loader /> :

                <div className='search-wrapper'>
                    <Container>
                        <div className='breadcrumb-wrapper'>
                            <Breadcrumb>
                                <Breadcrumb.Item href=''>Search</Breadcrumb.Item>
                                <Breadcrumb.Item active>Pendants</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className='search-area desktop-search'>
                            <InputGroup className="">
                                <Form.Control
                                    placeholder="Search here..."                                    //"Pendants"
                                    aria-label="Pendants"
                                    aria-describedby="basic-addon2"
                                    name='search'
                                    onChange={event => { setSearchTerm(event.target.value) }}      //handleSearch(e)
                                />
                                <InputGroup.Text id="basic-addon2" onClick={handleFind}><BiSearchAlt2 /></InputGroup.Text>
                            </InputGroup>
                            <div className='filter-button'>

                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic" className='filter-icon'>
                                        Sort & Filter <BsFilterLeft />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <h5>Filter</h5>
                                        <Dropdown.Item href="#/action-1" onClick={(e) => handleFilter(e)} value={filterProduct.By_price} name='By_price'>By Price</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2" onClick={(e) => handleFilter(e)} value={filterProduct.By_type} name='By_type'>By Type</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3" onClick={(e) => handleFilter(e)} value={filterProduct.By_metal} name='By_metal'>By Metal</Dropdown.Item>
                                        <h5>Sort By</h5>
                                        <Dropdown.Item href="#/action-1" onClick={(e) => handleFilter(e)} value={filterProduct.popular} name='popular'>Popular</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2" onClick={(e) => handleFilter(e)} value={filterProduct.price_low_to_high} name='price_low_to_high'>Price Low to High</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3" onClick={(e) => handleFilter(e)} value={filterProduct.price_high_to_low} name='price_high_to_low'>Price High to Low</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <div className='search_header'>
                            <h1>Jewellery <span>| 2103 DESIGNS </span></h1>
                        </div>
                        <div className='mobile-search'>
                            <InputGroup className="">
                                <Form.Control
                                    placeholder="Pendants"
                                    aria-label="Pendants"
                                    aria-describedby="basic-addon2"
                                />
                                <InputGroup.Text id="basic-addon2"><BiSearchAlt2 /></InputGroup.Text>
                            </InputGroup>

                        </div>
                        <div className='mobile-dropdown'>
                            <div className='mobile-dropdown-wrapper'>
                                <h5>showing 564 results</h5>
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary" id="dropdown-basic" className='filter-icon'>
                                        Sort & Filter <BsFilterLeft />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <h5>Filter</h5>
                                        <Dropdown.Item href="#/action-1">By Price</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">By Type</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">By Metal</Dropdown.Item>
                                        <h5>Sort By</h5>
                                        <Dropdown.Item href="#/action-1">Popular</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Price Low to High</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Price High to Low</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <div className='search-slider'>
                        {
                            productDetail.length > 0 ?
                                productDetail && productDetail.filter((val) => {
                                    if (searchTerm === "") {
                                        return val
                                    }
                                    else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return val
                                    }
                                }).map((val, index) => (                     //------changed
                                     
                                        <div className='search-inner' key={index}>
                                            <div className='s-slider-image'>
                                                <img className="swap-on-hover__front-image" src={val?.images[0]?.path || sImage} alt='feature product' onClick={() => onProductMove(val.id)} />
                                                <div className='swap-on-hover__back-image'>
                                                    <img src="https://kinclimg1.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BISR0756S15_RAA18DIG6SYRUSYG9_ABCD00-BP-PICS-00000-1024-55775.png" />
                                                    <div className='wishlist' onClick={() => addWhistList(val)}>
                                                        <BiHeart />
                                                    </div>
                                                    <h1>asdasda</h1>
                                                    <div className='video_button' onClick={() => setOpen(true)}>
                                                        <BsFillPlayFill onClick={() => { val.video }} />
                                                    </div>
                                                </div>
                                                <div className='making-chrg-offer'>
                                                <h4>10% Off</h4>
                                                </div>
                                            </div>
                                            <div className='s-slider-content'>
                                                {/* <h2>{val.name}</h2> */}
                                                <div className='ring-price'>
                                                    <span className='offer-price'> {val?.display_price || 6999} </span>
                                                    <span className='item-price'>  3999</span>
                                                </div>
                                                {/*{val?.sizes?.length > 0 ?*/}
                                                {/*    <>*/}
                                                {/*    <DropdownButton title={size.length>0?size:'Select Size'} name='size'*/}
                                                {/*                    key={'Secondary'}*/}
                                                {/*                    id={`dropdown-variants-Secondary`}*/}
                                                {/*                    variant={'Secondary'}*/}
                                                {/*                    value={size} onSelect={handleSizeChange}>*/}

                                                {/*        {*/}
                                                {/*            val?.sizes?.map((item,index) =>*/}
                                                {/*                (<div key={index}>*/}
                                                {/*                    <Dropdown.Item key={item.id}*/}
                                                {/*                                   eventKey={item.id}>{item.name}</Dropdown.Item>*/}
                                                {/*                </div>)*/}
                                                {/*            )}*/}
                                                {/*    </DropdownButton>*/}
                                                {/*    < div className = 'product-buttons' >*/}
                                                {/*        < Button variant="secondary" disabled={size > 0? false : true} onClick={()=>onCart(val,index)}>ADD to cart</Button>*/}
                                                {/*    <Button variant="success" onClick={() => onProductMove(index+1)}>Try at home</Button>*/}
                                                {/*    </div>*/}
                                                {/*    </>*/}
                                                {/*     :*/}
                                                < div className='product-buttons' >
                                                    < Button variant="secondary" onClick={() => onCart(val)}>ADD to cart</Button>
                                                </div>
                                                {/*}*/}
                                            </div>
                                        </div>
                                    
                                ))
                                :
                                <center>
                                    <h5 htmlFor="inputPassword5">Data not Available</h5>
                                </center>
                        }
                        </div>
                        <div>

                        </div>
                    </Container>
                </div>

            }
        </>
    )
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    categoryList: state.categories,
    addCart: state.addCart
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ productList, categoryList, AddToCart, CartList, WishListAdd, WishListData }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResult));
