import React, { Component } from 'react';
import{Link} from 'react-router-dom';
import  utils from '../../util/util';
import Imagem from '../Imagem';
export default class Products extends Component {
render() {
const productItems = this.props.products.map(product => (
<article key={product._id}>
<div className='picture'>
<Imagem source={product.url}  titulo="dd" />
<div className='des'></div>
</div>
<strong>{product.title}</strong>
<p>{utils.formatCurrency(product.description)}</p>
<Link to={`/products/${product._id}`}>Detalher</Link>
</article>
));
return (
<div  className='product-list'>
{productItems}
</div>
)}}